import {Component, OnInit, Output, NgZone, Injectable, EventEmitter} from '@angular/core';

import {PresetService, Preset} from './preset-service';

declare var electron: any;

const template = require('./presets-form.html');

@Injectable()
@Component({
  selector: 'ae-presets-form',
  template: template
})
export class PresetsFormComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter();

  private currentPreset: Preset;
  private newPresetName: string = '';
  private modelToEdit: string = '';
  private alerts: Array<Object> = [];

  constructor(private _ngZone: NgZone, private presets: PresetService) {
  }

  ngOnInit() {
    this.currentPreset = this.presets.getItems()[0];

    electron.ipcRenderer.on('presets-export-end', (event, err) => {
      this._ngZone.run(() => {
        if (!err) {
          this.addAlert(`Presets was exported`, 'success');
        }

        if (err) {
          this.addAlert(`Presets was NOT exported`, 'danger');
        }
      });
    });

    electron.ipcRenderer.on('presets-import', (event, data) => {
      this._ngZone.run(() => {
        if (!data.err) {
          const isOk = this.presets.setContent(data.content);

          if (isOk) {
            this.addAlert(`Presets was imported`, 'success');
          }

          if (!isOk) {
            this.addAlert(`Presets was NOT imported: bad JSON`, 'danger');
          }
        }

        if (data.err) {
          this.addAlert(`Presets was NOT imported: perhaps import file does not exists`, 'danger');
        }
      });
    });
  }

  onPresetSelect(presetName) {
    this._ngZone.run(() => {
      const currentPreset =
        this.presets.getItems()
          .filter(presetItem => presetItem.name === presetName)[0];

      if (currentPreset) {
        this.currentPreset = currentPreset;

        if (!this.currentPreset.isReadOnly) {
          this.modelToEdit = JSON.stringify(this.currentPreset.model, null, '\t');
        }
      }
    });
  }

  saveNewPreset() {
    const presetToAdd = this.currentPreset.clone(this.newPresetName);
    const newPreset = this.presets.addPreset(presetToAdd);

    if (newPreset) {
      this.currentPreset = newPreset;
      this.modelToEdit = this.currentPreset.originalModelString;
      this.newPresetName = '';
      this.addAlert(`Preset ${this.currentPreset.name} was saved`, 'success');
    }

    if (!newPreset) {
      this.addAlert(`Preset ${this.currentPreset.name} was NOT saved: wrong model name`, 'danger');
    }
  }

  saveModel() {
    try {
      const model = JSON.parse(this.modelToEdit);

      this.currentPreset.changeModel(model);
      this.addAlert(`Model for ${this.currentPreset.name} was saved`, 'success');
    } catch (e) {
      this.addAlert(`Model for ${this.currentPreset.name} was NOT saved: bad JSON`, 'danger');
    }
  }

  // todo: change to lodash
  isFoo() {
    return this.modelToEdit == this.currentPreset.originalModelString;
  }

  close() {
    this.done.emit({});
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  public addAlert(msg, type) {
    this.alerts.push({msg, type, closable: true});
  }

  presetsExport() {
    electron.ipcRenderer.send('presets-export', this.presets.getContent());
  }

  presetsImport() {
    electron.ipcRenderer.send('do-presets-import', this.presets.getContent());
  }
}

import { desktopCapturer } from 'electron';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { MessageService } from '../../message.service';
import { ALERT, CLOSE_SCREEN_RECORDER } from '../../constants';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from '../../providers/localization.service';

declare const navigator;

interface CurrentMediaSource {
  id: string;
}

let blobs = [];
let recorder;

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit, OnDestroy {
  private readonly recentVideoPathSetting: string;

  constructor(public ls: LocalizationService,
              private es: ElectronService,
              private ms: MessageService,
              private ts: TranslateService) {
    this.recentVideoPathSetting = this.es.path.resolve(this.es.userDataPath, 'recent-video-path');
  }

  ngOnInit() {
    (async () => {

      await this.start();
    })();
  }

  ngOnDestroy() {
    this.stop();
  }

  async start() {
    if (this.isRecording()) {
      return;
    }

    try {
      blobs = [];

      if (!recorder) {
        const currentSource = await this.getCurrentWindowMediaSource();
        const stream = await this.getUserMediaStream(currentSource);

        recorder = new MediaRecorder(stream, {mimeType: 'video/x-matroska;codecs=avc1'});

        recorder.ondataavailable = (event) => {
          blobs.push(event.data);
        };

        recorder.onstop = () => {
          toArrayBuffer(new Blob(blobs), async (ab) => {
            const buffer = toBuffer(ab);

            try {
              const file = await this.getSelectedFileFromDialog();

              this.es.fs.writeFile(file, buffer, 'binary', async err => {
                if (err) {
                  const message = this.ts.instant('Failed to save video', {err});

                  console.error(message);
                  this.ms.sendMessage(ALERT, {message, type: 'danger'});
                } else {
                  const message = this.ts.instant('Saved video', {file});

                  console.log(message);
                  this.ms.sendMessage(ALERT, {message, type: 'success', timeout: 3000});
                  await this.writeCurrentVideoDir(file);
                }
              });
            } catch (e) {
              const message = this.ts.instant('No files are chosen');

              this.ms.sendMessage(ALERT, {message, type: 'warning', timeout: 3000});
            } finally {
              this.ms.sendMessage(CLOSE_SCREEN_RECORDER);
            }
          });
          this.ms.sendMessage(CLOSE_SCREEN_RECORDER);
        };
      }

      recorder.start();
    } catch (e) {
      console.log(e);
      this.ms.sendMessage(ALERT, {message: e.message, type: 'danger'});
    }
  }

  stop() {
    if (this.isRecording()) {
      recorder.stop();
    }
  }

  isRecording(): boolean {
    if (!recorder) {
      return false;
    }

    return recorder.state === 'recording';
  }

  private async readCurrentVideoDir(): Promise<string> {
    return new Promise((resolve: Function) => {
      this.es.fs.readFile(this.recentVideoPathSetting, 'utf8', (err, data) => {
        if (err) {
          return resolve(this.es.path.resolve(require('os').homedir()));
        }

        resolve(data);
      });
    });
  }

  private async writeCurrentVideoDir(file: string): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      const customPath = this.es.path.dirname(file);

      this.es.fs.writeFile(this.recentVideoPathSetting, customPath, 'utf8', (err) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  }

  private async getSelectedFileFromDialog(): Promise<string> {
    return new Promise(async (resolve: Function, reject: Function) => {
      const filename = this.getFileName();
      const defaultPath = await this.readCurrentVideoDir();

      this.es.remote.dialog.showSaveDialog({
        title: this.ts.instant('Save video as'),
        defaultPath: this.es.path.resolve(defaultPath, `${filename}.mkv`),
        filters: [{name: 'MKV video', extensions: ['mkv']}]
      }).then(({filePath: file}) => {
        if (!file) {
          return reject(this.ts.instant('No files are chosen'));
        }

        resolve(file);
      });
    });
  }

  private getFileName(): string {
    const dateNow = new Date();
    const y = dateNow.getFullYear();
    const m = ('0' + (dateNow.getMonth() + 1)).slice(-2);
    const d = ('0' + dateNow.getDate()).slice(-2);
    const hh = ('0' + dateNow.getHours()).slice(-2);
    const mm = ('0' + dateNow.getMinutes()).slice(-2);
    const ss = ('0' + dateNow.getSeconds()).slice(-2);
    const dateString = `${y}${m}${d}-${hh}${mm}${ss}`;
    return `Gapminder Offline Screen-${dateString}`;
  }

  private async getCurrentWindowMediaSource(): Promise<CurrentMediaSource> {
    return new Promise((resolve: Function, reject: Function) => {
      const nativeWindowPrefix = 'Gapminder Offline v';

      desktopCapturer.getSources({types: ['window']}).then((sources) => {
        let currentSource;

        for (const source of sources as any) {
          if (source.name.indexOf(nativeWindowPrefix) === 0 && currentSource) {
            return reject('Too many native windows');
          } else if (source.name.indexOf(nativeWindowPrefix) === 0 && !currentSource) {
            currentSource = source;
          }
        }

        if (currentSource) {
          resolve(currentSource);
        } else {
          reject('Native window is not found');
        }
      });
    });
  }

  private async getUserMediaStream(currentSource: CurrentMediaSource): Promise<MediaStream> {
    return new Promise((resolve: Function, reject: Function) => {
      navigator.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: currentSource.id
          }
        }
      }, resolve, reject);
    });
  }
}

function toArrayBuffer(blob, cb: Function) {
  const fileReader = new FileReader();

  fileReader.onload = function () {
    const arrayBuffer = this.result;

    cb(arrayBuffer);
  };

  fileReader.readAsArrayBuffer(blob);
}

function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);

  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }

  return buf;
}

import { ExtendedElementFinder, _$, _$$ } from "../../helpers/ExtendedElementFinder";
import { safeDragAndDrop, waitForSpinner } from "../../helpers/helper";
import { browser } from "protractor";

export class DialogModal {
  rootSelector: ExtendedElementFinder = _$('.vzb-active.vzb-top-dialog');

  pinIcon: ExtendedElementFinder = this.rootSelector._$$('[data-click="pinDialog"]').first();
  dragIcon: ExtendedElementFinder = this.rootSelector._$$('[data-click="dragDialog"]').first();

  opacity: ExtendedElementFinder = this.rootSelector._$('[data-dlg="opacity"]');
  speed: ExtendedElementFinder = this.rootSelector._$('[data-dlg="speed"]');
  xAndY: ExtendedElementFinder = this.rootSelector._$('[data-dlg="axes"]');

  // Group
  group: ExtendedElementFinder = this.rootSelector._$('[data-dlg="grouping"]');
  groupSliderHangle: ExtendedElementFinder = this.group._$$('.handle--e').first();
  secondGroup: ExtendedElementFinder = this.group._$$('.vzb-dialog-groups [class=".vzb-dialog-groups-title"]').get(2);

  // Size
  size: ExtendedElementFinder = this.rootSelector._$('[data-dlg="size"]');
  sizeDropdown: ExtendedElementFinder = this.size._$('.vzb-ip-select');
  
  // Color
  color: ExtendedElementFinder = this.rootSelector._$('[data-dlg="colors"]');
  labels: ExtendedElementFinder = this.rootSelector._$('[data-dlg="label"]');
  zoom: ExtendedElementFinder = this.rootSelector._$('[data-dlg="zoom"]');
  presentation: ExtendedElementFinder = this.rootSelector._$('[data-dlg="presentation"]');
  about: ExtendedElementFinder = this.rootSelector._$('[data-dlg="about"]');

  okButton: ExtendedElementFinder = this.rootSelector._$$('[data-click="closeDialog"]').last() // TODO it might not works, maybe add some hint to vizabi

  close() {
    this.okButton.safeClick();
  }

  async moveGroupSlider(): Promise<void> {
    await safeDragAndDrop(this.groupSliderHangle, this.secondGroup);
    await waitForSpinner();
  }
}

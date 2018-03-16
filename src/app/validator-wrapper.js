const validationApi = require('ddf-validation');

exports.DdfValidatorWrapper = class DdfValidatorWrapper {

  start(event, params) {
    this.event = event;
    this.params = params;

    const {exists} = validationApi.getDataPackageInfo(this.params.ddfFolder);

    if (!exists || (exists && this.params.dataPackageMode === this.params.createNewDataPackage)) {
      const dataPackageCreationParameters = {
        ddfRootFolder: params.ddfFolder,
        newDataPackagePriority: true,
        externalSettings: this.params.options
      };
      validationApi.createDataPackage(dataPackageCreationParameters, message => {
        this.event.sender.send('validation-message', message);
      }, error => {
        if (error) {
          this.event.sender.send('validation-error', error);
          return;
        }

        this.validationProcess();
      }, true);
    } else {
      this.validationProcess();
    }
  }

  validationProcess() {
    this.validator = new validationApi.StreamValidator(this.params.ddfFolder, this.params.options);

    this.validator.onMessage(message => {
      this.event.sender.send('validation-message', message);
    });

    this.validator.on('issue', issue => {
      this.event.sender.send('validation-issue', issue);
    });

    this.validator.on('finish', err => {
      if (err) {
        this.event.sender.send('validation-error', error);
      }

      this.event.sender.send('validation-completed', {
        doesValidationRunning: false,
        isResultReady: !this.validator.isAbandoned()
      });
    });

    validationApi.validate(this.validator);
  }

  abandon() {
    this.validator.abandon();
  }
}

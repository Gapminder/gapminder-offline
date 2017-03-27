const ua = require('universal-analytics');
const isOnline = require('is-online');

class GoogleAnalytics {
  constructor(trackingId, version) {
    this.trackingId = trackingId;
    this.visitor = ua(this.trackingId);
    this.version = version;
  }

  event(category, action) {
    isOnline().then(online => {
      if (online) {
        this.visitor.pageview('/').event(category, action, this.version).send();
      }
    });
  }

  error(message) {
    this.visitor.exception(message).send();
  }

  runEvent(isAutoUpdateFinishing) {
    const action = isAutoUpdateFinishing ? 'finish Auto Update during the app started' : 'start Main Application';

    this.event('Run', action);
  }

  chartEvent(type) {
    this.event('Chart created', type);
  }

  chartChangingEvent(action) {
    this.event('Chart changed', action);
  }
}

module.exports = GoogleAnalytics;

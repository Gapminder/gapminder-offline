import * as ua from 'universal-analytics';
import * as isOnline from 'is-online';

export class GoogleAnalytics {
  visitor;

  constructor(private trackingId: string, private version: string) {
    this.visitor = ua(this.trackingId);
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

import Controller from '@ember/controller';

export default Controller.extend({
  sortProperties: ['timestamp'],
  sortAscending: false,
  actions: {
    publishPost() {
      return this.store.createRecord('post', {
        title: this.get('title'),
        body: this.get('body'),
        timestamp: new Date().getTime()
      }).save();
    }
  }
});

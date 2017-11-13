import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('user');
  },
  firebaseApp: Ember.inject.service(),
  actions: {
    delete(id) {
      const db = this.get('firebaseApp').database();

      db.ref("admin_invoke/users/delete")
        .push()
        .set(id);

      /**
       *  Hack around to get force refresh.
       */
      this.store
        .findRecord('user', id)
        .then(record => {
          record.destroyRecord();
        })
    }
  }
});

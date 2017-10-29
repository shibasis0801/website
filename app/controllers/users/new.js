import Controller from '@ember/controller';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),
  actions: {
    create() {
      const self = this;
      const db = this.get('firebaseApp').database();

      db.ref("admin_invoke/users/create")
        .push()
        .set({
          displayName: this.get('displayName'),
          phoneNumber: this.get('phoneNumber'),
          email: this.get('email')
        })
        .then(() => {
          self.transitionToRoute('users');
        });
    },
    cancel() {
      transitionToRoute('users');
    }
  }
});

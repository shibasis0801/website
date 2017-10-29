import Controller from '@ember/controller';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),
  users: [],
  actions: {
    create() {
      const db = this.get('firebaseApp').database();

      /**
       * EmberFire stores default by pushID.
       * I need here by valveID.
       *
       * So, i use normal firebase instead.
       */
      function format(users) {
        if (users == null)
          return null;
        let result = {};

        users.forEach(user => {
          result[user] = true;
        });
        return result;
      }

      db.ref("valves" + "/" + this.get('id'))
        .set({
          name: this.get('name'),
          description: this.get('description'),
          users: format(this.get('users'))
        })
        .then(() => {
          this.transitionToRoute('valves');
        });
    },
    cancel() {
      transitionToRoute('valves');
    }
  }
});

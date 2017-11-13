import Controller from '@ember/controller';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),
  users: [],
  actions: {
    selectionChanged(newSelection, value, operation) {
      this.set('users', newSelection);
    },
    create() {
      const db = this.get('firebaseApp').database();

      /**
       * EmberFire stores default by pushID.
       * I need here by valveID.
       *
       * So, i use normal firebase instead.
       */
      function idEmail(users) {

        if (users == null)
          return null;

        let result = {};

        users.forEach(user => {
          //Hackery Promises didnot work.
          result[user.id] = user._internalModel.__data.email;
        });

        return result;
      }

      const valve = db.ref("valves" + "/ID_" + this.get('id'));

      valve.set({
        name: this.get('name'),
        description: this.get('description'),
        users: idEmail(this.get('users'))
      })
        .then(() => {
          return db.ref("valveUser/ID_" + this.get('id'))
            .set("DEFAULT_LOCK")
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

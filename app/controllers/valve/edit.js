import Controller from '@ember/controller';

export default Controller.extend({
  firebaseApp: Ember.inject.service(),
  users: [],
  actions: {
    selectionChanged(newSelection, value, operation) {
      this.set('users', newSelection);
    },
    save(valve) {
      const db = this.get('firebaseApp').database();
      console.log(valve);

      function getData(emberData, key) {
        return emberData._internalModel.__data;
      }

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
          result[user.id] = getData(user).email;
        });

        return result;
      }

      //To prevent firebase autoconverting back to array, IDs start with ID_
      const valveRef = db.ref("valves/ID_" + valve.id);

      valveRef.set({
        name: getData(valve).name,
        description: getData(valve).description,
        users: idEmail(this.get('users'))
      }).then(() => {
        return db.ref("valveUser/ID_" + this.get('id'))
          .set("DEFAULT_LOCK")
      }).then(() => {
          this.transitionToRoute('valves');
      });
    },
    cancel() {
      transitionToRoute('valves');
    }
  }
});

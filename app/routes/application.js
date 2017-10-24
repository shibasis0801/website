import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service(),
  firebase: Ember.inject.service(),
  firebase_app: Ember.inject.service("firebase-app"),
  beforeModel() {
    return this.get('session').fetch().catch(function(){});
  },
  model() {
    return Ember.RSVP.hash({
      credentials: this.store.createRecord('credentials')
    })
  },
  actions: {
    signIn(model, email, password) {
      this.get('session')
        .open('firebase', {
          provider: 'password',
          password: password,
          email: email
        })
        .then(data => {
          model.credentials.destroyRecord();
        })
    },
    signOut() {
      this.get('session').close();
    }
  }
});

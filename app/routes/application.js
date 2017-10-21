import Route from '@ember/routing/route';

export default Route.extend({
  session: Ember.inject.service(),
  beforeModel() {
    return this.get('session').fetch().catch(function(){});
  },
  model() {
    return Ember.RSVP.hash({
      credentials: this.store.createRecord('credentials')
    })
  },
  actions: {
    signIn() {
      console.log(this.get('model.credentials').);

      this.get('session')
        .open('firebase', {
          provider: 'password',
          password: this.get('password'),
          email: this.get('email')
        })
        .then(data => {
          alert(data.currentUser);
        })
        .then(

        )
    },
    signOut() {
      this.get('session').close();
    }
  }
});

import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return Ember.RSVP.hash({
      valve: this.store.createRecord('valve'),
      users: this.store.findAll('user')
    })
  }
});

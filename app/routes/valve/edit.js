import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    function filter(allUsers, valveCurrentUsers) {
      let notSelected = [];
      allUsers.forEach(user => {
        if (! (user.id in valveCurrentUsers) )
          notSelected.push(user)
      });


      console.log(notSelected);
      return notSelected;
    }

    return this.store.findRecord('valve', params.valve_id)
      .then(valve => {
          return Ember.RSVP.hash({
            valve: valve,
            users: this.store.findAll('user')
              .then(allUsers => {
                return filter(allUsers, valve.users)
              })
          })
      });
  }
});

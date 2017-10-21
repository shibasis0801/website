import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('valve');
  },
  actions: {
    switch(valve, on) {
      console.log(valve);
      valve.set('state', on).save();
    }
  }
});

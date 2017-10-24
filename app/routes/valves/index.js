import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('valve');
  },
  actions: {
    switch(id, on) {
      this.store.findRecord('valve', id)
        .then(valve => {
          valve.set('state', on);
          valve.save();
        });
    }
  }
});

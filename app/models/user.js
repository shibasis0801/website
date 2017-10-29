import DS from 'ember-data';

export default DS.Model.extend({
  valves: DS.hasMany('valve'),
  email: DS.attr('string'),
  displayName: DS.attr('string'),
  phoneNumber: DS.attr('string')
});

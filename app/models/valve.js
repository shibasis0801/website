import DS from 'ember-data';

export default DS.Model.extend({
  //EMBERFIRE.To-Do Remove Later
  valveID: DS.attr('string'),
  name: DS.attr('string'),
  description: DS.attr('string'),
  state: DS.attr('boolean'),
  status: DS.attr('number'),
  users: DS.hasMany('user')
});

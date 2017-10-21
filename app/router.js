import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('valves', function() {
    this.route('new');
  });
  this.route('users', function() {
    this.route('new');
  });
  this.route('valve', {path: '/valve/:valve_id'}, function() {
    this.route('edit');
  });
  this.route('user', {path: '/user/:user_id'}, function() {
    this.route('edit');
  });
  this.route('admin', function() {
    this.route('new');
  });
  this.route('about');
  this.route('invalid', {path: '/*path'});
  this.route('posts');
});

export default Router;

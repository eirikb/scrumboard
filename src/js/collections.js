app.TaskList = Backbone.Collection.extend({
  model: app.Task,
  localStorage: Backbone.LocalStorage && new Backbone.LocalStorage('Tasks')
});

app.StatusList = Backbone.Collection.extend({
  model: app.Status,
  localStorage: Backbone.LocalStorage && new Backbone.LocalStorage('Statuses')
});

app.UserList = Backbone.Collection.extend({
  model: app.User,
  localStorage: Backbone.LocalStorage && new Backbone.LocalStorage('Users')
});

app.Users = new app.UserList();
app.Tasks = new app.TaskList();
app.Statuses = new app.StatusList();

$(function() {

  app.View = Backbone.View.extend({
    el: $('body'),
    events: {
      'click #add-task': 'createTask',
      'click #add-status': 'createStatus',
      'click #add-user': 'createUser'
    },

    createTask: function() {
      var lastTask = app.Tasks.last();
      var id = lastTask ? lastTask.id + 1 : 1;

      app.Tasks.create({
        id: id
      });
    },

    createStatus: function() {
      app.Statuses.create({});
    },

    removeStatus: function() {
      app.Statuses.last().destroy();
    },

    createUser: function() {
      var lastUser = app.Users.last();
      var id = lastUser ? lastUser.id + 1 : 1;
      var title = prompt('User name:');
      if (title === null) return;
      if (!title) title = null;

      app.Users.create({
        id: id,
        title: title
      });
    }
  });

  new app.View();
  new app.UserCollectionView({
    collection: app.Users
  });
  new app.StatusCollectionView({
    collection: app.Statuses
  });
  new app.TaskCollectionView({
    collection: app.Tasks
  });
});

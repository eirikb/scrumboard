$(function() {

    var AppView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click #add-task': 'createTask',
            'click #add-status': 'createStatus',
            'click #remove-status': 'removeStatus',
            'click #add-user': 'createUser'
        },

        initialize: function() {
            this.listenTo(app.Tasks, 'reset', this.addTasks);
            this.listenTo(app.Tasks, 'add', this.addTask);
            this.listenTo(app.Statuses, 'reset', this.addStatuses);
            this.listenTo(app.Statuses, 'add', this.addStatus);
            this.listenTo(app.Users, 'reset', this.addUsers);
            this.listenTo(app.Users, 'add', this.addUser);

            app.Statuses.fetch();
            app.Tasks.fetch();
            app.Users.fetch();
        },

        addTasks: function() {
            this.$('#tasks').empty();
            app.Tasks.forEach(this.addTask, this);
        },

        addTask: function(task) {
            var view = new app.TaskView({
                model: task
            });
            var $view = view.render().el;

            var status = app.Statuses.get(task.get('status'));
            if (status) status.trigger('addTask', $view);
            else this.$('#tasks').append($view);
        },

        createTask: function() {
            var lastTask = app.Tasks.last();
            var id = lastTask ? lastTask.id + 1 : 1;
            app.Tasks.create({ id: id });
        },

        addStatuses: function() {
            this.$('#main').empty();
            app.Statuses.forEach(this.addStatus, this);
        },

        addStatus: function(status) {
            var view = new app.StatusView({
                model: status
            });
            this.$('#main').append(view.render().el);
        },

        createStatus: function() {
            app.Statuses.create({});
        },

        removeStatus: function() {
            app.Statuses.last().destroy();
        },

        addUsers: function() {
            this.$('#users').empty();
            app.Users.forEach(this.addUser, this);
        },

        addUser: function(user) {
            var view = new app.UserListView({
                model: user
            });
            var $view = view.render().el;

            var task = app.Tasks.get(user.get('task'));
            if (task) {
                view = new app.UserView({
                    model: user
                });
                $view = view.render().el;
                task.trigger('addUser', $view);
            } else {
                this.$('#users').append($view);
            }
        },

        createUser: function() {
            var lastUser = app.Users.last();
            var id = lastUser ? lastUser.id + 1 : 1;
            app.Tasks.create({ id: id });
        }
    });

    app.Users = new app.UserList();
    app.Tasks = new app.TaskList();
    app.Statuses = new app.StatusList();
    new AppView();
});
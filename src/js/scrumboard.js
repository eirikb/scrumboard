$(function() {

    var AppView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click #add-task': 'createTask',
            'click #add-status': 'createStatus',
            'click #remove-status': 'removeStatus'
        },

        initialize: function() {
            this.listenTo(app.Tasks, 'reset', this.addTasks);
            this.listenTo(app.Tasks, 'add', this.addTask);
            this.listenTo(app.Statuses, 'reset', this.addStatuses);
            this.listenTo(app.Statuses, 'add', this.addStatus);

            app.Tasks.fetch();
            app.Statuses.fetch();
        },

        addTasks: function() {
            this.$('#tasks').empty();
            app.Tasks.forEach(this.addTask, this);
        },

        addTask: function(task) {
            var view = new app.TaskView({
                model: task
            });
            this.$('#tasks').append(view.render().el);
        },

        createTask: function() {
            var taskView = app.Tasks.create({});
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
            var statusView = app.Statuses.create({});
        },

        removeStatus: function() {
            app.Statuses.last().destroy();
        }
    });

    app.Tasks = new app.TaskList();
    app.Statuses = new app.StatusList();
    new AppView();
});

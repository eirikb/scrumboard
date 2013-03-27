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

            app.Statuses.fetch();
            app.Tasks.fetch();
        },

        addTasks: function () {
            this.$('#tasks').empty();
            app.Tasks.forEach(this.addTask, this);
        },

        addTask: function (task) {
            var view = new app.TaskView({
                model: task,
                status: 'wat'
            });
            var $view = view.render().el;

            var status = app.Statuses.get(task.get('status'));
            if (status) status.trigger('addTask', $view);
            else this.$('#tasks').append($view);
        },

        createTask: function() {
            var lastTask = app.Tasks.last();
            var id = lastTask ? lastTask.id + 1 : 1;
            app.Tasks.add({
                id: id
            });
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
            app.Statuses.add({});
        },

        removeStatus: function() {
            app.Statuses.last().destroy();
        }
    });

    app.Tasks = new app.TaskList();
    app.Statuses = new app.StatusList();
    new AppView();
});
$(function() {

    app.TaskList = Backbone.Collection.extend({
        model: app.Task,
        url: window.config && config.taskUrl,
        localStorage: Backbone.LocalStorage && new Backbone.LocalStorage('Tasks')
    });

    app.StatusList = Backbone.Collection.extend({
        model: app.Status,
        url: window.config && config.statusUrl,
        localStorage: Backbone.LocalStorage && new Backbone.LocalStorage('Statuses')
    });

    app.UserList = Backbone.Collection.extend({
        model: app.User,
        url: window.config && config.userUrl,
        localStorage: Backbone.LocalStorage && new Backbone.LocalStorage('Users')
    });
});
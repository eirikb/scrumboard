$(function() {

    app.TaskList = Backbone.Collection.extend({
        model: app.Task,
        localStorage: new Backbone.LocalStorage('Tasks')
    });

    app.StatusList = Backbone.Collection.extend({
        model: app.Status,
        localStorage: new Backbone.LocalStorage('Statuses')
    });

    app.UserList = Backbone.Collection.extend({
        model: app.User,
        localStorage: new Backbone.LocalStorage('Users')
    });
});
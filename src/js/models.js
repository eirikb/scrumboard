var app = {};

$(function() {

    app.Task = Backbone.Model.extend({
        defaults: {
            title: 'Double-click to edit',
        }
    });

    app.Status = Backbone.Model.extend({
        defaults: {
            title: 'Double-click to edit'
        }
    });
});

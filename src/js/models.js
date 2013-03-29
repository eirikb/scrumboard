var app = {};

$(function() {

    app.Status = Backbone.Model.extend({
        defaults: {
            title: 'Double-click to edit'
        }
    });

    app.Task = Backbone.Model.extend({
        defaults: {
            title: 'Double-click to edit',
        },

        initialize: function() {
            this.listenTo(app.Statuses, 'destroy', this.statusDestroy);
        },

        statusDestroy: function(status) {
            if (this.get('status') === status.id) this.destroy();
        }
    });
});
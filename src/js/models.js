var app = {};

$(function() {

    app.Status = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasMany,
            key: 'tasks',
            relatedModel: 'app.Task',
            collectionType: 'app.TaskList',
            reverseRelation: {
                key: 'status'
            }
        }],
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


var app = {};

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

app.User = Backbone.Model.extend({
    defaults: {
        title: 'No Name'
    },

    initialize: function() {
        this.on('change:title', this.setInitials);
        this.setInitials();
    },

    setInitials: function() {
        var initials = _.map(this.get('title').split(' '), function(part) {
            return ('' + part).slice(0, 1).toUpperCase();
        }).join('');
        this.set('initials', initials);
    }
});
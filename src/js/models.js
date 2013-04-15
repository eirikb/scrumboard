var app = {};

app.Status = Backbone.RelationalModel.extend({
  defaults: {
    title: 'Double-click to edit'
  }
});

app.Task = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasOne,
    key: 'status',
    relatedModel: 'app.Status'
  }, {
    type: Backbone.HasMany,
    key: 'users',
    relatedModel: 'app.User',
    collectionType: 'app.UserList'
  }],

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

app.User = Backbone.RelationalModel.extend({
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

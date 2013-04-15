$(function() {

  app.StatusCollectionView = Backbone.View.extend({
    el: '#main',

    initialize: function() {
      this.listenTo(this.collection, 'reset', this.addStatuses);
      this.listenTo(this.collection, 'add', this.addStatus);

      this.collection.fetch();
    },

    addStatuses: function() {
      this.$el.empty();
      app.Statuses.forEach(this.addStatus, this);
    },

    addStatus: function(status) {
      var view = new app.StatusView({
        model: status
      });
      this.$el.append(view.render().el);
    },
  });

  app.StatusView = Backbone.View.extend({
    template: _.template($('#status-template').html()),

    events: {
      'dblclick h2': 'edit',
      'blur h2': 'doneedit',
      'click .remove': 'destroy',
      'drop': 'drop'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'addTask', this.addTask);
    },

    edit: function(e) {
      $(e.target).attr('contenteditable', true).focus();
    },

    doneedit: function() {
      var title = this.$('h2').text().trim();
      this.model.save({
        title: title
      });
    },

    render: function() {
      var tpl = this.template(this.model.toJSON()).trim();
      this.setElement(tpl.trim(), true);
      this.$el.droppable({
        accept: '.task'
      });
      return this;
    },

    destroy: function() {
      this.model.destroy();
    },

    drop: function(e, ui) {
      if (!ui.draggable.hasClass('task')) return;

      var task = app.Tasks.get(ui.draggable.data('id'));
      var pos = {
        left: ui.offset.left - this.$el.offset().left,
        top: ui.offset.top - this.$el.offset().top
      };
      this.addTask(ui.draggable);
      task.trigger('setStatus', this.model.id, pos);
    },

    addTask: function($task) {
      this.$el.append($task);
    }
  });
});

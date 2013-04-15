$(function() {
  var colors = ['blue', 'white', 'yellow', 'green'];

  app.TaskCollectionView = Backbone.View.extend({
    el: '#tasks',

    initialize: function() {
      this.listenTo(this.collection, 'reset', this.addTasks);
      this.listenTo(this.collection, 'add', this.addTask);

      this.collection.fetch();
    },

    addTasks: function() {
      this.$el.empty();
      app.Tasks.forEach(this.addTask, this);
    },

    addTask: function(task) {
      var view = new app.TaskView({
        model: task
      });
      var $view = view.render().el;

      var status = app.Statuses.get(task.get('status'));
      if (status) status.trigger('addTask', $view);
      else this.$el.append($view);
    },

  });

  app.TaskView = Backbone.View.extend({
    template: _.template($('#task-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'setStatus', this.setStatus);
      this.listenTo(this.model, 'addUser', this.addUser);
      this.listenTo(this.model, 'change', this.change);
    },

    events: {
      'dblclick p': 'edit',
      'blur p': 'doneedit',
      'click .remove': 'destroy',
      'drop': 'drop'
    },

    change: function(model) {
      var changed = _.keys(model.changed);
      if (_.contains(changed, 'changed')) return;

      model.set('changed', changed);
      model.save();
    },

    render: function() {
      var tpl = this.template(this.model.toJSON()).trim();
      this.setElement(tpl.trim(), true);
      this.$el.draggable();
      this.$el.css({
        left: this.model.get('left') + '%',
        top: this.model.get('top') + '%'
      });
      this.$el.droppable({
        accept: '.user'
      });

      this.rotate();
      this.setColor();
      return this;
    },

    rotate: function() {
      var deg = this.model.get('deg');
      if (!deg) deg = -6 + (Math.random() * 12);
      var rot = 'rotate(' + deg + 'deg)';
      this.$el.css({
        WebkitTransform: rot,
        MozTransform: rot
      });
      this.model.set('deg', deg);
    },

    setColor: function() {
      var color = this.model.get('color');
      if (!color) color = colors[Math.floor(Math.random() * colors.length)];
      this.$el.addClass(color);
      this.model.set('color', color);
    },

    edit: function(e) {
      $(e.target).attr('contenteditable', true).focus();
      this.$el.draggable('disable');
    },

    doneedit: function() {
      this.$el.draggable('enable');
      var title = this.$('p').text().trim();
      this.model.set('title', title);
    },

    destroy: function() {
      this.model.destroy();
    },

    setPos: function(pos) {
      var $parent = this.$el.parent();
      var width = $parent.width();
      var height = $parent.height();

      pos.left *= 100 / width;
      pos.top *= 100 / height;

      this.$el.css({
        left: pos.left + '%',
        top: pos.top + '%'
      });
      this.model.set(pos);
    },

    setStatus: function(status, pos) {
      this.setPos(pos);
      var val = pos;
      val.status = status;
      this.model.set(val);
    },

    drop: function(e, ui) {
      var $user = ui.draggable;
      var user = app.Users.get($user.data('id'));
      var pos = {
        left: ui.offset.left - this.$el.offset().left,
        top: ui.offset.top - this.$el.offset().top
      };

      if ($user.hasClass('clone')) {
        var userView = new app.UserView({
          model: user
        });
        $user = userView.render().$el;
      }

      this.addUser($user);
      user.trigger('setTask', this.model.id, pos);
    },

    addUser: function($user) {
      this.$el.append($user);
    }
  });
});

$(function() {

  app.UserCollectionView = Backbone.View.extend({
    el: '#users',

    initialize: function() {
      this.listenTo(this.collection, 'reset', this.addUsers);
      this.listenTo(this.collection, 'add', this.addUser);

      this.collection.fetch();
    },

    addUsers: function() {
      this.$el.empty();
      this.collection.forEach(this.addUser, this);
    },

    addUser: function(user) {
      var view = new app.UserListView({
        model: user
      });
      var $view = view.render().el;

      /*
      var task = app.Tasks.get(user.get('task'));
      if (task) {
        view = new app.UserView({
          model: user
        });
        task.trigger('addUser', view.render().$el);
      }
     */
      this.$el.append($view);
    }
  });

  app.UserListView = Backbone.View.extend({
    template: _.template($('#user-list-template').html()),

    render: function() {
      var tpl = this.template(this.model.toJSON()).trim();
      this.setElement(tpl.trim(), true);

      this.$el.draggable({
        helper: 'clone'
      });
      return this;
    }
  });

  app.UserView = Backbone.View.extend({
    template: _.template($('#user-template').html()),

    initialize: function() {
      this.listenTo(this.model, 'setTask', this.setTask);
    },

    setTask: function(task, pos) {
      this.setPos(pos);
      var val = pos;
      val.task = task;
      this.model.save(val);
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
      this.model.save(pos);
    },

    render: function() {
      var tpl = this.template(this.model.toJSON()).trim();
      this.setElement(tpl.trim(), true);
      this.$el.draggable();
      return this;
    }
  });
});

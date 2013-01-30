$(function() {
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

        doneedit: function(e) {
            var title = this.$('h2').text().trim();
            this.model.save({
                title: title
            });
        },

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            this.$el.droppable();
            return this;
        },

        destroy: function() {
            this.model.destroy();
        },

        drop: function(e, ui) {
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

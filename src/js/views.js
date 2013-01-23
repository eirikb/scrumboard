$(function() {

    app.TaskView = Backbone.View.extend({
        template: _.template($('#task-template').html()),

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            this.$el.addClass('blue').draggable();
            return this;
        }
    });

    app.StatusView = Backbone.View.extend({
        template: _.template($('#status-template').html()),

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            return this;
        }
    });
});

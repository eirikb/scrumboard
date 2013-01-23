$(function() {

    app.TaskView = Backbone.View.extend({
        template: _.template($('#task-template').html()),

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            this.$el.addClass('blue').draggable();

            this.rotate();
            return this;
        },

        rotate: function() {
            var deg = -4 + (Math.random() * 8);
            var rot = 'rotate(' + deg + 'deg)';
            this.$el.css({
                WebkitTransform: rot,
                MozTransform: rot
            });
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

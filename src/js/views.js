$(function() {

    app.TaskView = Backbone.View.extend({
        template: _.template($('#task-template').html()),

        events: {
            'dblclick h3': 'edit',
            'blur h3': 'doneedit'
        },

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
        },

        edit: function(e) {
            $(e.target).attr('contenteditable', true).focus();
            this.$el.draggable('disable');
        },

        doneedit: function(e) {
            this.$el.draggable('enable');
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

$(function() {
    var colors = ['blue', 'white', 'yellow', 'green'];

    app.TaskView = Backbone.View.extend({
        template: _.template($('#task-template').html()),

        events: {
            'dblclick h3': 'edit',
            'blur h3': 'doneedit',
            'dragstop': 'dragstop'
        },

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            this.$el.draggable();
            this.$el.css({
                left: this.model.get('left'),
                top: this.model.get('top')
            });

            this.rotate();
            this.setColor();
            return this;
        },

        rotate: function() {
            var deg = this.model.get('deg');
            if (!deg) deg = -4 + (Math.random() * 8);
            var rot = 'rotate(' + deg + 'deg)';
            this.$el.css({
                WebkitTransform: rot,
                MozTransform: rot
            });
            this.model.save({
                deg: deg
            });
        },

        setColor: function() {
            var color = this.model.get('color');
            if (!color) color = colors[Math.floor(Math.random() * colors.length)];
            this.$el.addClass(color);
            this.model.save({
                color: color
            });
        },

        edit: function(e) {
            $(e.target).attr('contenteditable', true).focus();
            this.$el.draggable('disable');
        },

        doneedit: function(e) {
            this.$el.draggable('enable');
            var title = this.$('h3').text().trim();
            this.model.save({
                title: title
            });
        },

        dragstop: function() {
            var pos = this.$el.position();
            this.model.save(pos);
        }
    });
});

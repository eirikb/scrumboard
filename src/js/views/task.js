$(function() {
    var colors = ['blue', 'white', 'yellow', 'green'];

    app.TaskView = Backbone.View.extend({
        template: _.template($('#task-template').html()),

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'setStatus', this.setStatus);
        },

        events: {
            'dblclick p': 'edit',
            'blur p': 'doneedit',
            'click .remove': 'destroy'
        },

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            this.$el.draggable();
            this.$el.css({
                left: this.model.get('left') + '%',
                top: this.model.get('top') + '%'
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
            var title = this.$('p').text().trim();
            this.model.save({
                title: title
            });
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
            this.model.save(pos);
        },

        setStatus: function(status, pos) {
            this.setPos(pos);
            var val = pos;
            val.status = status;
            this.model.save(val);
        }
    });
});

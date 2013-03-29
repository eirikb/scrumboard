$(function() {

    app.UserView = Backbone.View.extend({
        template: _.template($('#user-template').html()),

        initialize: function() {
        },

        events: {
        },

        render: function() {
            var tpl = this.template(this.model.toJSON()).trim();
            this.setElement(tpl.trim(), true);
            this.$el.draggable();
            //this.$el.css({
            //    left: this.model.get('left') + '%',
            //    top: this.model.get('top') + '%'
            //});
            return this;
        }
    });
});

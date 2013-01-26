$(function() {
    app.StatusView = Backbone.View.extend({
        template: _.template($('#status-template').html()),

        events: {
            'dblclick h2': 'edit',
            'blur h2': 'doneedit',
        },

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
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
            return this;
        }
    });
});

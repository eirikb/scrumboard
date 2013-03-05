var app = {};

$(function() {

    app.Status = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasMany,
            key: 'tasks',
            relatedModel: 'Task',
            collectionType: 'Tasks',
            reverseRelation: {
                key: 'status'
            }
        }],
        defaults: {
            title: 'Double-click to edit'
        }
    });

    app.Task = Backbone.Model.extend({
        defaults: {
            title: 'Double-click to edit',
        },

        initialize: function() {
            this.listenTo(app.Statuses, 'destroy', this.statusDestroy);
        },

        statusDestroy: function(status) {
            if (this.get('status') === status.id) this.destroy();
        }
    });












    Zoo = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasMany,
            key: 'animals',
            relatedModel: 'Animal',
            collectionType: 'AnimalCollection',
            reverseRelation: {
                key: 'livesIn'
            }
        }]
    });

    Animal = Backbone.RelationalModel.extend({
    });

    AnimalCollection = Backbone.Collection.extend({
        model: Animal
    });

    var artis = new Zoo({
        name: 'Artis'
    });
    var lion = new Animal({
        species: 'Lion',
        livesIn: artis
    });

    console.log(artis.get('animals').pluck('species'));

    var amersfoort = new Zoo({
        name: 'Dierenpark Amersfoort',
        animals: [lion]
    });

    console.log(lion.get('livesIn').get('name'), artis.get('animals'));
});


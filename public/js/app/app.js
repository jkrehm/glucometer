define(['backbone', 'moment', 'jquery', 'handlebars', 'templates'], function(Backbone, moment, $, Handlebars, templates) {

    var Record = Backbone.Model.extend({
        defaults: {
 
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm')
 
        },

        url: 'index.php/record'
    });


    var RecordList = Backbone.Collection.extend({
        model: Record,
        url: 'index.php/records/recent'
    });


    var NewRecordView = Backbone.View.extend({
        tagName: 'form',

        events: {
            'submit': 'submit'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(templates['form']({

                date: this.model.get('date'),
                time: this.model.get('time')

            }));

            return this;
        },

        submit: function(e) {
            e.preventDefault();

            records.create({

                date:  this.$el.find('[name="date"]').val(),
                time:  this.$el.find('[name="time"]').val(),
                level: this.$el.find('[name="level"]').val(),
                food:  this.$el.find('[name="food"]').val()

            });
        }
    });


    var RecordView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(templates['recent']({

                date:  this.model.get('date'),
                time:  this.model.get('time'),
                level: this.model.get('level'),
                food:  this.model.get('food')

            }));

            return this;
        }
    });


    var records = new RecordList();


    var App = Backbone.View.extend({
        el: $('.container-fluid'),

        initialize: function() {

            this.listenTo(records, 'add', this.addRecord);

            var view = new NewRecordView({ model: new Record() });
            this.$el.prepend( view.render().el );

            records.fetch();
        },

        addRecord: function(record) {

            var view = new RecordView({ model: record });
            this.$('#previous-saves').prepend( view.render().el );

        }
    });

    return App;

});
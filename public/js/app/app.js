define(['backbone', 'moment', 'jquery', 'handlebars', 'templates'], function(Backbone, moment, $, Handlebars, templates) {

    var Record = Backbone.Model.extend({
        defaults: {
 
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm')
 
        },

        url: '/record'
    });


    var RecordList = Backbone.Collection.extend({
        model: Record
    });


    var records = new RecordList();
    $.getJSON('index.php/records/recent', function(data) {

        _.each(data, function(recordData) {

            var food = '';

            for (i in recordData.foods) {
                food += recordData.foods[i].food + ',';
            }
            recordData.food = food.slice(0, food.length-1);

            var record = new Record(recordData);
            var view = new RecordView({ model: record });

            records.push( record );

            $('#previous-saves').prepend( view.render().el );

        });
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

            this.model.set({

                date:  this.$el.find('[name="date"]').val(),
                time:  this.$el.find('[name="time"]').val(),
                level: this.$el.find('[name="level"]').val(),
                food:  this.$el.find('[name="food"]').val()

            }).save();

            var view = new RecordView({ model: this.model });

            records.push( this.model );

            $('#previous-saves').prepend( view.render().el );
        }
    });


    var RecordView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function() {
            // this.listenTo(this.model, 'change', this.render);
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


    var App = Backbone.View.extend({
        el: $('.container-fluid'),

        initialize: function() {

            this.listenTo(records, 'change', this.render);

            var view = new NewRecordView({ model: new Record() });
            this.$el.prepend( view.render().el );

        }
    });

    return App;

});
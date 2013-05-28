define([

    'backbone',
    'moment',
    'jquery',
    'handlebars',
    'handlebars-helpers',
    'templates'

], function(

    Backbone,
    moment,
    $,
    Handlebars,
    helpers,
    templates

) {

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

        attributes: {
            method: 'post',
            class: ['form-horizontal']
        },

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

        reset: function() {

            date:  this.$el.find('[name="date"]').val( moment().format('YYYY-MM-DD') );
            time:  this.$el.find('[name="time"]').val( moment().format('HH:mm') );
            level: this.$el.find('[name="level"]').val('');
            food:  this.$el.find('[name="food"]').val('');

        },

        submit: function(e) {
            e.preventDefault();

            var food = this.$el.find('[name="food"]').val().split(',');

            records.create({

                date:  this.$el.find('[name="date"]').val(),
                time:  this.$el.find('[name="time"]').val(),
                level: this.$el.find('[name="level"]').val(),
                food:  food

            });

            this.reset();
        }
    });


    var RecordView = Backbone.View.extend({
        tagName: 'tr',

        events: {
            // 'blur': 'close',
            'click': 'edit',
            'keyup': 'updateOrCancel'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html(templates['recent']({

                date:     this.model.get('date'),
                time:     this.model.get('time'),
                datetime: this.model.get('date') + ' ' + this.model.get('time'),
                level:    this.model.get('level'),
                food:     this.model.get('food')

            }));

            return this;
        },

        close: function() {
            this.$el.removeClass('editing');
        },

        edit: function() {
            this.$el.addClass('editing');
            // this.$el.find('input').first().focus();
        },

        save: function() {

            var food = this.$el.find('[name="food"]').val().split(',');

            this.model.save({

                date:  this.$el.find('[name="date"]').val(),
                time:  this.$el.find('[name="time"]').val(),
                level: this.$el.find('[name="level"]').val(),
                food:  food

            });

            this.close();

        },

        updateOrCancel: function(e) {

            if (e.keyCode === 13) this.save();
            if (e.keyCode === 27) this.close();

        }
    });


    var records = new RecordList();


    var App = Backbone.View.extend({
        el: $('#previous-saves'),

        initialize: function() {

            this.listenTo(records, 'add', this.addRecord);

            var view = new NewRecordView({ model: new Record() });
            $('#new-record').html( view.render().el );

            records.fetch();
        },

        addRecord: function(record) {

            var view = new RecordView({ model: record });
            this.$el.find('tr').first().after( view.render().el );
        }
    });

    return App;

});
$(function () {
    var RepositoryItemView = Backbone.View.extend({
        tagName: 'tr',
        className: 'repository-row',    
        template: $('#rowTemplate').html(),

        render: function () {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    var RepositoryListView = Backbone.View.extend({
        el: $("table#repositories tbody"),

        initialize: function () {
            this.collection = new RepositoryList();
            this.listenTo( this.collection, 'reset add change remove', this.render, this );
            this.collection.fetch();
        },

        render: function () {
            console.log('render list view');
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            console.log('render contact');
            var contactView = new RepositoryItemView({
                model: item
            });
            var val = contactView.render().el;
            console.log(val);
            this.$el.append(val);
        }
    });

    var Repository = Backbone.Model.extend({ });

    var RepositoryList = Backbone.Collection.extend({
        model: Repository,
        url: 'https://api.github.com/users/benkiefer/repos',
        parse: function (response) {
            console.log('done parsing');
            return response;
        }
    });

    var listView = new RepositoryListView();

});
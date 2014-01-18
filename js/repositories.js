var RepositoryItemView = Backbone.View.extend({
    tagName: 'a',
    className: 'list-group-item',
    attributes: {"href": "#"},
    template: $('#rowTemplate').html(),

    render: function () {
        var tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});

var RepositoryListView = Backbone.View.extend({
    el: $("div#repositories"),

    initialize: function () {
        this.collection = new RepositoryList();
        this.collection.bind('reset', this.render, this);
        this.collection.fetch({reset: true});
    },

    render: function () {
        var that = this;
        _.each(this.collection.models, function (item) {
            that.renderRepo(item);
        }, this);
        return this;
    },

    renderRepo: function (item) {
        var repoView = new RepositoryItemView({
            model: item
        });
        this.$el.append(repoView.render().el);
    }
});

var Repository = Backbone.Model.extend({ });

var RepositoryList = Backbone.Collection.extend({
    model: Repository,
    url: 'https://api.github.com/users/benkiefer/repos',
    parse: function (response) {
        return response;
    }
});

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
            this.listenTo(this.collection, 'reset add change remove', this.render, this);
            this.collection.fetch();
        },

        render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderRepo(item);
            }, this);
        },

        renderRepo: function (item) {
            var repoView = new RepositoryItemView({
                model: item
            });
            var val = repoView.render().el;
            this.$el.append(val);
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

Kelp.Routers.AppRouter = Backbone.Router.extend({
	routes: {
		'': 'businessesIndex',
		'businesses/:id': 'businessesShow',
		'users': 'usersIndex',
		'users/:id': 'usersShow'
	},
	
	initialize: function($rootEl) {
		this.$roolEl = $rootEl;
	},
	
	_swapView: function(newView) {
		if (this._currentView) this._currentView.remove();
		$('#content').html(newView.render().$el);
		this._currentView = newView;
	},
	
	businessesIndex: function() {
		Kelp.businesses.fetch();
		var businessesIndexView = new Kelp.Views.BusinessesIndex({
			collection: Kelp.businesses
		});
		this._swapView(businessesIndexView);
	},
	
	businessesShow: function(id) {
		var business = Kelp.businesses.getOrFetch(id);
		var businessShowView = new Kelp.Views.BusinessesShow({
			model: business
		});
		this._swapView(businessShowView);
	},
	
	usersIndex: function() {
		var usersIndexView = new Kelp.Views.UsersIndex({
			collection: Kelp.users
		});
		Kelp.users.fetch();
		this._swapView(usersIndexView);
	},
	
	usersShow: function(id) {
		var user = Kelp.users.getOrFetch(id);
		var userShowView = new Kelp.Views.UsersShow({
			model: user
		});
		this._swapView(userShowView);
	}
});
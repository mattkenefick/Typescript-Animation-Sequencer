

  var EventDispatcher = Backbone.EventDispatcher = function(options) {
    this.initialize.apply(this, arguments);
  };

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(EventDispatcher.prototype, Backbone.Events, {

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){}

  });
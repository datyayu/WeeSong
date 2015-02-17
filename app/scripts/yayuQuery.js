(function(window) {
  // Constructor
  var yayuQuery = function (selector) {
    return new YayuQuery(selector);
  };

  // Selector-search.
  YayuQuery = function(selector) {
    var nodes = document.querySelectorAll(selector);

    for(var i = 0; i < nodes.length; i++) {
      this[i] = nodes[i];
    }

    this.length = nodes.length;
    return this;
  }

  // Core-stuff.
  yayuQuery.fn = YayuQuery.prototype = {
    splice: [].splice
  }

  // Extends the core to add funcionalities.
  yayuQuery.extend = yayuQuery.fn.extend = function (options) {
    for (var prop in options) {
      this.fn[prop] = options[prop];
    }

    return this.fn;
  }.bind(yayuQuery);

  // DOM Stuff
  yayuQuery.onLoad = function (callback) {
    window.onload = callback;
  };


  // API Methods.
  yayuQuery.extend({
    // Toggle a class.
    toggleClass: function (myClass) {
      for (var i = 0; i < this.length; i++) {
        this[i].classList.toggle(myClass);
      }
      return this;
    },

    on: function(eventName, callback) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener(eventName, callback);
      }
      return this;
    }
  });


  return (window.yayuQuery = window.$ = yayuQuery);
})(window);
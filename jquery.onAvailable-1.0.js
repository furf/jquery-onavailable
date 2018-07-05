(function($) {
  $.extend({

    /**
     * NOTE: If element is last the child of its parent node, include at 
     * least one character of whitespace or onContentReady will not fire
     * until DOMReady.
     */      

    /**
     * Executes the supplied callback when the item with the supplied
     * id is found.  This is meant to be used to execute behavior as
     * soon as possible as the page loads.  If you use this after the
     * initial page load it will poll for a fixed time for the element.
     * The number of times it will poll and the frequency are
     * configurable.  By default it will poll for 40 seconds at a rate
     * of 50 times per second.
     *
     * <p>The callback is executed with a single parameter:
     * the custom object parameter, if provided.</p>
     *
     * @method onAvailable
     * @param {String||Array} el id (or array of ids) of element(s) to look for
     * @param {Function} callback method to execute when element is found
     * @param {Object} obj optional object to passed as parameter to callback
     * @param {Boolean|Object} override If set to true, callback will execute in
     *                   the scope of obj. If set to an object, callback will
     *                   execute in the scope of that object
     * @param checkContent {Boolean} check child node readiness (onContentReady)
     * @static
     */
    onAvailable: function(el, callback /*, obj, override, checkContent */) {

      /**
       * Validate callback
       */
      if (typeof callback !== 'function') {
        throw new TypeError();
      }

      var _this = $.onAvailable;

      /**
       * Wrap single element in array
       */
      if (!(el instanceof Array)) {
        el = [el];
      }

      /**
       * Push listeners onto the stack
       */
      for (var i = 0, n = el.length; i < n; ++i) {
        _this.listeners.push({
          id:           el[i],
          callback:     callback,
          obj:          arguments[2],
          override:     arguments[3],
          checkContent: !!arguments[4]
        });
      }

      /**
       * Begin polling for DOM elements
       */
      if (!_this.interval) {
        _this.interval = window.setInterval(_this.checkAvailable, _this.POLL_INTERVAL);
      }

      return this;
    },


    /**
     * Works the same way as onAvailable, but additionally checks the
     * state of sibling elements to determine if the content of the
     * available element is safe to modify.
     *
     * <p>The callback is executed with a single parameter:
     * the custom object parameter, if provided.</p>
     *
     * @method onContentReady
     * @param {String||Array} el id (or array of ids) of element(s) to look for
     * @param {Function} callback method to execute when element is found
     * @param {Object} obj optional object to passed as parameter to callback
     * @param {Boolean|Object} override If set to true, callback will execute in
     *                   the scope of obj. If set to an object, callback will
     *                   execute in the scope of that object
     * @static
     */
    onContentReady: function(el, callback, obj, override) {
      $.onAvailable(el, callback, obj, override, true);
    }

  });

  $.extend($.onAvailable, {


    /**
     * Number of attempts to locate element
     */
    POLL_RETRIES: 2000,


    /**
     * Milliseconds between retries
     */
    POLL_INTERVAL: 20,


    /**
     * setInterval timer
     */
    interval: null,


    /**
     * Array of listeners
     */
    listeners: [],


    /**
     * Fires the callback method of the listener in its proper scope
     *
     * @method executeCallback
     * @param {DOMElement} el The discovered element
     * @param {Object} listener The listener object
     * @return {void}
     */
    executeCallback: function(el, listener) {

      /**
       * Resolve the scope of the callback (the DOM element is the default)
       */
      var scope = el;

      if (listener.override) {
        if (listener.override === true) {

          /**
           * Override the scope with obj
           */
          scope = listener.obj;

        } else {

          /**
           * Override the scope with the value of override
           */
          scope = listener.override;
        }
      }

      /**
       * Fire the listener's callback function
       */
      listener.callback.call(scope, listener.obj);
    },


    /**
     * Polls the DOM for an element matching the supplied id and fires the
     * associated callback method
     *
     * @method checkAvailable
     * @return {void}
     */
    checkAvailable: function() {

      var _this = $.onAvailable;
      var listeners = _this.listeners;

      /**
       * Iterate through listener stack
       */
      for (var i = 0; i < listeners.length; ++i) {

        var listener = listeners[i];

        /**
         * Attempt to find the specified element in the DOM
         */
        var el = $(listener.id);

        /**
         * If the DOM element is found, execute callbacks for all related
         * $.onAvailable listeners. If the DOM is ready or the next sibling
         * is detected, execute callbacks for all $.onContentReady listeners.
         */          
        if (el && (!listener.checkContent || (listener.checkContent &&
          (el.nextSibling || el.parentNode.nextSibling || $.isReady)))) {

          _this.executeCallback(el, listener);

          /**
           * Remove the listener from the stack
           */
          listeners.splice(i, 1);
          
          /**
           *  Decrement the pointer to compensate for the spliced listener
           */
          --i;
        }

        /**
         * If all listeners have been executed or the retry limit has been
         * reached, clear the interval.
         */
        if (listeners.length === 0 || --_this.POLL_RETRIES === 0) {
          _this.interval = window.clearInterval(_this.interval);
        }
          
      }
    }
  });

})(jQuery);

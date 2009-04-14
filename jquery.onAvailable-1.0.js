/**
 *
 * @author Dave Furfero <furf@furf.com>
 * @version 1.0
 */
(function($) {
  $.extend({


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

      var self = $.onAvailable;

      if (!(el instanceof Array)) {
        el = [el];
      }

      // Validate typeof callback
      if (typeof callback !== 'function') {
        throw new TypeError();
      }

      var obj          = arguments[2];
      var override     = arguments[3];
      var checkContent = !!arguments[4];

      // Push listeners onto the stack
      var listeners = self.listeners;

      $.each(el, function(i, id) {
        listeners.push({
          id:           id,
          callback:     callback,
          obj:          obj,
          override:     override,
          checkContent: checkContent
        });
      });

      // Begin polling for DOM elements
      if (!self.interval) {
        self.interval = window.setInterval(self.checkAvailable, self.POLL_INTERVAL);
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

      // Resolve the scope of the callback
      // (set the value of the "this" keyword inside the callback)
      var scope = el;

      if (listener.override) {
        if (listener.override === true) {

          // Override the scope with obj
          scope = listener.obj;

        } else {

          // Override the scope with override
          scope = listener.override;
        }
      }

      // Fire the listener's callback function
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

      var self = $.onAvailable;
      var listeners = self.listeners;

      // Iterate through listener stack
      $.each(listeners, function(i, listener) {
        if (listener) {

          // Attempt to find the element in the DOM
          var el = document.getElementById(listener.id);

          // If element is found and we don't need to check children (onAvailable)
          // or DOM is loaded or nextSibling is loaded, then execute the callback
          // and remove the listener from the stack

          if (el) {
            if (listener.checkContent) {
              if ($.isReady || el.nextSibling) {
                listeners.splice(i, 1);
                self.executeCallback(el, listener);
              }
            } else {
              listeners.splice(i, 1);
              self.executeCallback(el, listener);
            }
          }

          // Clear interval if all listeners have been executed
          // or the retry limit has been reached
          if (listeners.length === 0 || --self.POLL_RETRIES === 0) {
            self.interval = window.clearInterval(self.interval);
          }
        }
      });
    }
  });

})(jQuery);

;(function($) {
  'use strict';

  var Notifications = function(element, options) {
    this.$notifications = $(element);
    this.options = options || {};
  };

  Notifications.prototype.add = function(notification) {
    var $notification = $(this.options.template).appendTo(this.$notifications);

    // Get title and message
    $.when(
      this.getOption(notification.title, $notification),
      this.getOption(notification.message, $notification)
    )
      .done(function(title, message) {
        // Show event
        var showEvent = $.Event('show.lt.notification', {
          relatedTarget: $notification
        });
        this.$notifications.trigger(showEvent);

        // Allow event to be prevented
        if (showEvent.isDefaultPrevented()) { return; }

        // Update notification data and show
        $notification.find('.notification-title').text(title);
        $notification.find('.notification-message').text(message);
        $notification.show();

        // Shown event
        var shownEvent = $.Event('shown.lt.notification', {
          relatedTarget: $notification
        });
        this.$notifications.trigger(shownEvent);
      }.bind(this))
      .fail(function(err) {
        throw new Error(err);
      });

    // Add closing timer
    var duration = this.options.duration;

    if (typeof notification.duration !== 'undefined') {
      duration = notification.duration;
    }

    $.when(
      this.getOption(duration, $notification)
    )
      .done(function(timeout) {
        var timer = (typeof timeout === 'number') ? timeout : 0;
        setTimeout(function() {
          this.close($notification);
        }.bind(this), timer);
      }.bind(this));
  };

  Notifications.prototype.close = function($notification) {
    // Close event
    var closeEvent = $.Event('close.lt.notification', {
      relatedTarget: $notification
    });
    this.$notifications.trigger(closeEvent);

    // Allow event to be prevented
    if (closeEvent.isDefaultPrevented()) { return; }

    // Close notification
    $notification.remove();

    // Closed event
    var closedEvent = $.Event('closed.lt.notification', {
      relatedTarget: $notification
    });
    this.$notifications.trigger(closedEvent);
  };

  Notifications.prototype.getOption = function(option, $notification) {
    var deferred = $.Deferred();

    if (typeof option === 'string' || typeof option === 'number') {
      deferred.resolve(option);
    }
    else if (typeof option === 'function') {
      $.when(option.call(this, $notification)).then(function(result) {
        deferred.resolve(result);
      }, function(err) {
        deferred.reject(err);
      });
    }
    else if (typeof option === 'object') {
      $.when(option).then(function(result) {
        deferred.resolve(result);
      }, function(err) {
        deferred.reject(err);
      });
    }

    return deferred;
  };

  // Define jQuery plugin
  function Plugin(method, options) {
    return this.each(function() {
      var $notifications = $(this);
      var settings = $.extend({}, Plugin.defaults, $notifications.data(), typeof method === 'object' && method);

      var data = $notifications.data('lt.notifications');

      if (!data) {
        data = new Notifications(this, settings);
        $notifications.data('lt.notifications', data);
      }

      if (typeof method === 'string') {
        data[method](options);
      }
    });
  }

  Plugin.defaults = {
    duration: 30000,
    template: [
      '<div class="notification" data-toggle="notification-close">',
        '<h1 class="notification-title"></h1>',
        '<p class="notification-message"></p>',
        '<button type="button" class="notification-close" data-toggle="notification-close" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
      '</div>'
    ].join('')
  };

  $.fn.notifications = Plugin;

  $(document).on(
    'click.lt.notification.data-attr',
    '[data-toggle="notification-close"]',
    function (e) {
      var $trigger = $(this);

      if ($trigger.is('a')) {
        e.preventDefault();
      }

      var $notification = $trigger.closest('.notification');
      var notifications = $notification.closest('.notifications').data('lt.notifications');
      notifications.close($notification);
    }
  );

})(jQuery);

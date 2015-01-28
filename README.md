lintel-contrib-notifications
============================

> Notifications for lintel.

[![npm](https://img.shields.io/npm/v/lintel-contrib-notifications.svg)](https://www.npmjs.com/package/lintel-contrib-notifications)
[![Bower](https://img.shields.io/bower/v/lintel-contrib-notifications.svg)](https://github.com/lintelio/lintel-contrib-notifications)


## Getting Started
This module requires Lintel.

If you haven't used [Lintel](http://lintel.io/) before, be sure to check out the [Getting Started](http://lintel.io/getting-started) guide, as it explains how to install and use this module. Once you're familiar with that process, you may install this module with this command:

```shell
bower install lintel-contrib-notifications --save
```

Once the module has been installed, you will have to load it in your main SASS file:

```scss
@import "bower_components/lintel-contrib-notifications/sass/notifications.scss"
```

This module also includes a JavaScript component, which you will have to load separately.

```html
<script src="bower_components/lintel-contrib-notifications/dist/notifications.min.js" type="text/javascript"></script>
```

You can use [wiredep](https://github.com/taptapship/wiredep) or [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep) to automatically inject files in your build process.


## Variables
Check the vars file in the `sass` folder to see the full list of variables you can customize.

#### $notification-padding-y
Default value: `$cushion-y-md`  

#### $notification-padding-x
Default value: `$cushion-x-md`  

#### $notification-bg
Default value: `transparentize($bg-light, 0.1)`  

#### $notification-border
Default value: `transparentize($border-base, 0.1)`  

#### $notification-border-radius
Default value: `$border-radius-base`  

#### $notification-text
Default value: `$text-base`  

#### $notification-width
Default value: `280px`  

#### $notification-title-font-size
Default value: `$notification-title-font-size`  

#### $notification-title-margin-y
Default value: `0.33em`  

#### $notification-close-font-size
Default value: `15px`  

#### $notification-close-padding-y
Default value: `$notification-padding-y`  

#### $notification-close-padding-x
Default value: `$notification-padding-x`  

#### $notification-*-bg
Default value: `transparentize($state-*, 0.2)`  

#### $notification-*-border
Default value: `transparentize($state-*, 0.2)`  

#### $notification-*-text
Default value: `#fff`  

#### $notification-*-text-shadow
Default value: `$notification-states-shadow`  


## Mixins
Check the mixins file in the `sass` folder to see how you can extend this module.

#### notification-state($bg, $border, $text, $text-shadow)
Creates notification states.

```scss
.notification-primary {
  @include notification-state(
    $bg: $notification-primary-bg,
    $border: $notification-primary-border,
    $text: $notification-primary-text,
    $text-shadow: $notification-primary-text-shadow
  );
}
```


## JavaScript

### Options

Name      | Type                           | Default             | Description
--------- | ------------------------------ | ------------------- | -----------
global    | boolean                        | false               | Display browser notification if available. Falls back to html notification if browser does not support notifications.
state     | string                         |                     | Notification type.
duration  | number / $.Deferred            | 5000 (ms)           | Determines when to remove html notification. If jQuery deferred, notification closes when resolved.
template  | string                         | see js file         | Notification template.


### Methods

Name      | Parameters  | Description
--------- | ----------  | -----------
add       | (options)   | Adds notification.


### Events

Event                  | Description
---------------------- | ------------------------------
show.lt.notification   | Fires immediately before notification is shown. Can prevent notification from showing here. Target notification can be accessed under `relatedTarget`.
shown.lt.notification  | Fires immediately after notification is shown.
close.lt.notification  | Fires immediately before notification is closed. Can prevent notification from hiding here.
closed.lt.notification | Fires immediately after notification is closed.


### jQuery
Call the jQuery plugin on the notifications container, passing in any options.

```js
$('#myBtn').click(function() {
  $('.notifications').notifications('add', {
    title: 'Success Notification',
    body: 'Congrats!',
    state: 'success'
  });
});
```


## Examples

#### HTML
```html
<div class="notifications">
  <article class="notification" data-toggle="notification-close">
    <h1 class="notification-title">Default Notification</h1>
    <p class="notification-message">Calculon is gonna kill us and it's all everybody else's fault! No, just a regular mistake.</p>
    <button type="button" class="notification-close" data-toggle="notification-close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  </article>
</div>
```

#### Primary Notification
```html
<article class="notification notification-primary">...</article>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2015 Marius Craciunoiu. Licensed under the MIT license.

# $.onAvailable and $.onContentReady

A plugin for the [jQuery JavaScript framework](http://jquery.com) which adds two useful DOM events - onAvailable and onContentReady - to allow the detection and retrieval of DOM nodes before the DOM has finished loading. These methods help to enable advanced functionality while keeping markup clean and unobtruded.

*Thanks to [YUI's Event.onAvailable and Event.onContentReady](http://developer.yahoo.com/yui/event/#onavailable) and [Bennett McElwee's $.elementReady](http://www.thunderguy.com/semicolon/2007/08/14/elementready-jquery-plugin/) for inspiration (and code (and documentation)).*


## Quick Start: Installation & Usage

Add jQuery and the onAvailable plugin to the head of your HTML document.

    <script src="path/to/jquery/jquery.js" type="text/javascript"></script>
    <script src="path/to/onavailable/jquery.onavailable.pack.js" type="text/javascript"></script>

Add your detection code the head of your document.

    <script type="text/javascript"> 

    var callback = function() {
      alert(this.id + ' is available.');
    };
    
    $.onAvailable('myelementid', callback);
    
    </script>

Add the markup to body of your document.
    
    <div id="myelementid">my element</div> 

## Description

The $.onAvailable method takes five arguments: two required and *three optional*. The fifth argument **checkContent** is used by $.onContentReady and can be ignored.

    $.onAvailable(el, callback /*, obj, override, checkContent */);
    
1. **el** An element ID (or an array of element IDs)
2. **callback** The function to execute when the element is detected
3. ***obj*** An object to pass as an argument to the callback method
4. ***override*** Either a boolean (true) or another object. If true, the callback will execute in the scope of *obj*, meaning the **this** keyword will refer to *obj* inside the callback. If an object, the callback will execute in the scope of *override*, meaning the **this** keyword will refer to *override* inside the callback.

### Passing an object as an argument

    var p1 = {
      name:  'Dave',
      hobby: 'snowboarding'
    };
  
    var callback = function(obj) {
      alert(obj.name + ' enjoys ' + obj.hobby);
      alert(this.name + ' really enjoys ' + this.hobby);
    };
  
    $.onAvailable('myelementid', callback, p1);
      
This example will alert "Dave enjoys snowboarding" and "undefined really enjoys undefined" since **this** refers to the DOM element (and DOM elements rarely have hobbies).

### Overriding the scope

    $.onAvailable('myelementid', callback, p1, true);

This example will alert "Dave enjoys snowboarding" and "Dave really enjoys snowboarding".

### Overriding the scope with a second object

    var p2 = {
      name:  'Nick',
      hobby: 'photography'
    };

    $.onAvailable('myelementid', callback, p1, p2);

This example will alert "Dave enjoys snowboarding" and "Nick really enjoys photography".

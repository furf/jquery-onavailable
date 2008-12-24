# $.onAvailable and $.onContentReady

A plugin for the [jQuery JavaScript framework](http://jquery.com) which adds two useful DOM events - onAvailable and onContentReady - to allow the detection and retrieval of DOM nodes before the DOM has finished loading. These methods help to enable advanced functionality while keeping markup clean and unobtruded.

*Thanks to [YUI's Event.onAvailable and Event.onContentReady](http://developer.yahoo.com/yui/event/#onavailable) and [Bennett McElwee's $.elementReady](http://www.thunderguy.com/semicolon/2007/08/14/elementready-jquery-plugin/) for inspiration (and code (and documentation)).*


## Quick Start: Installation & Usage

Add jQuery and the onAvailable plugin to the <head> of your HTML document.

    <script src="path/to/jquery/jquery.js" type="text/javascript"></script>
    <script src="path/to/onavailable/jquery.onavailable.pack.js" type="text/javascript"></script>

Add your detection code the <head> of your document.

    <script type="text/javascript"> 

    var callback = function() {
      alert(this.id + ' is available.');
    };
    
    $.onAvailable('myelementid', callback);
    
    </script>

Add the markup to <body> of your document.
    
    <div id="myelementid">my element</div> 

## Advanced

The onAvailable method takes four parameters: two required and *two optional*.

1. **el** An element ID (or an array of element IDs)
2. **callback** The function to execute when the element is detected
3. ***obj*** An object to pass as a parameter to the callback method
4. ***override*** Either a boolean (true) or another object. If true, the callback will execute in the scope of *obj*, meaning the **this** keyword will refer to *obj* inside the callback. If an object, the callback will execute in the scope of *override*, meaning the **this** keyword will refer to *override* inside the callback.


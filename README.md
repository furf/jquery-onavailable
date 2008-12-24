# $.onAvailable and $.onContentReady

A plugin for the [jQuery JavaScript framework](http://jquery.com) which adds two useful DOM events - onAvailable and onContentReady - to allow the detection and retrieval of DOM nodes before the DOM has finished loading. These methods help to enable advanced functionality while keeping markup clean and unobtruded.

*Thanks to [YUI's Event.onAvailable and Event.onContentReady](http://developer.yahoo.com/yui/event/#onavailable) and [Bennett McElwee's $.elementReady](http://www.thunderguy.com/semicolon/2007/08/14/elementready-jquery-plugin/) for inspiration (and code (and documentation)).*


## Installation & Usage
1. Add jQuery and the onAvailable plugin to the top of your HTML document.

    <script src="path/to/jquery/jquery.js" type="text/javascript"></script>
    <script src="path/to/onavailable/jquery.onavailable.pack.js" type="text/javascript"></script>

1. Add your

    <script type="text/javascript"> 

    var callback = function() {
      alert(this.id + ' is available.');
    };
    
    $.onAvailable('myelementid', callback);
    
    </script>

1. Add the markup to the page
    
    <div id="myelementid">my element</div> 

# $.onAvailable and $.onContentReady

A plugin for the [jQuery JavaScript framework](http://jquery.com) which adds two useful DOM events - onAvailable and onContentReady - to allow retrieval of DOM nodes before the DOM has finished loading. These methods help you enable advanced functionality while keeping your markup clean and unobtruded.

*Thanks to [Yahoo! for YUI's Event.onAvailable and Event.onContentReady](http://developer.yahoo.com/yui/event/#onavailable) and [Bennett McElwee's $.elementReady](http://www.thunderguy.com/semicolon/2007/08/14/elementready-jquery-plugin/) for inspiration.*


## Installation

Add the script to the top of your HTML document.

    <script src="path/to/script/jquery.onavailable.pack.js" type="text/javascript"></script>
    
## Usage

    <a href="pretty.jpg"><img src="pretty_thumb.jpg"/></a>


    $.onAvailable('foo', function() {

      $(this).onclick(function() {

        var src = this.href;
        
      });
          
    });

$.onAvailable and $.onContentReady

Two new DOM events for jQuery which allow the retrieval of DOM nodes before the DOM has finished loading.

Installation
------------

Add the script to the top of your HTML document.

    <script src="path/to/script/jquery.onavailable.pack.js" type="text/javascript"></script>
    
Usage
-----

    <a href="http://furf.com">Go to furf.com</a>


    $.onAvailable('foo', function() {
    
      return confirm('Are you sure you want to go there?')'
          
    });

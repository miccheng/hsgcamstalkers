var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [];

// define options (if needed)
var options = {
  // optionName: 'option value'
  // for example:
  index: 0 // start at first slide
};

var photoPush = function(photo){
  if (photo == 'noop') return;

  var photoObj = {
    src: 'http://cam.hackerspace.sg/'+photo
  }

  if ( photo.match(/\d{10}/) ) {
    var unixTime = photo.match(/\d{10}/)[0];
    photoObj.title = moment.unix(unixTime).tz('Asia/Singapore').format('MMMM Do YYYY, h:mm:ss a');
  }

  if ( photo.match(/^pi/g) ) {
    photoObj.w = 2592;
    photoObj.h = 1944;
  }
  else if ( photo.match(/^hsgcam/g) )
  {
    photoObj.w = 800;
    photoObj.h = 600;
  }

  items.push(photoObj);
}

var initGallery = function() {
  $.getJSON( "http://cam.hackerspace.sg/json.cgi", function( data ) {
    _.map(data, photoPush);
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  });
}

$(document).ready(function(){/* smooth scrolling for scroll to top */
  // Initializes and opens PhotoSwipe
  initGallery();
});

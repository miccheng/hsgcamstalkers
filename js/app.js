var gallery;

var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
var items = [];

// define options (if needed)
var options = {
  // optionName: 'option value'
  // for example:
  index: 0 // start at first slide
};

moment.tz.add(
  "Asia/Singapore|SMT MALT MALST MALT MALT JST SGT SGT|-6T.p -70 -7k -7k -7u -90 -7u -80|012345467|-2Bg6T.p 17anT.p 7hXE dM00 17bO 8Fyu Mspu DTA0"
);

var photoPush = function(photo){
  if (photo == 'noop') return;

  var photoObj = {
    src: 'http://cam.hackerspace.sg/'+photo,
    orgSrc: photo
  }

  if ( photo.match(/\d{10}/) ) {
    var unixTime = photo.match(/\d{10}/)[0];
    photoObj.title = moment.unix(unixTime).tz('Asia/Singapore').format('MMM D, YYYY, h:mm a');
  }

  if ( photo.match(/^pi/g) ) {
    photoObj.cam = 'pi';
    photoObj.w = 2592;
    photoObj.h = 1944;
  }
  else if ( photo.match(/^hsgcam/g) )
  {
    photoObj.cam = 'hsgcam';
    photoObj.w = 800;
    photoObj.h = 600;
  }

  items.push(photoObj);
}

var buildList = function(photo, key) {
  var link = $('<a>').attr('href', photo.src).data('photo-idx', key).text(photo.title + ' (' + photo.cam + ')');
  link.click(function(e){
    e.preventDefault();
    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
    gallery.goTo(key);
  });
  var item = $('<li>').append(link);
  $('#photosList').append(item);
}

var initGallery = function() {
  $.getJSON( "http://cam.hackerspace.sg/json.cgi", function( data ) {
    _.map(data, photoPush);
    _.map(items, buildList);
    $('h3').text("HackerspaceSG Camera Feed")
    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  });
}

$(document).ready(function(){/* smooth scrolling for scroll to top */
  // Initializes and opens PhotoSwipe
  initGallery();
});

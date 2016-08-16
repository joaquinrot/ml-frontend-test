function qS(selector) { return document.querySelector(selector); };

window.addEventListener('load', function(e) {

var zoom = new ch.Zoom(qS('#zoom-default'), {
  'offsetX': 0,
  'offsetY': 0
});

zoom.container.style.height = '500px';
zoom.container.style.width = '400px';

var carousel = new ch.Carousel(qS('#carousel'), {
    'limitPerPage': 3
});

}, false);
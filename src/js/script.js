var ripple = document.querySelectorAll('.ripple-container');
[].forEach.call(ripple, function(e) {
  e.addEventListener('click', rippleEffect, false);
  e.parentNode.addEventListener('keypress', rippleEffectKeyboard, false);

  e.addEventListener('animationend', removeAnimation);
  e.addEventListener('webkitAnimationEnd', removeAnimation);
  e.addEventListener('oanimationend', removeAnimation);
  e.addEventListener('MSAnimationEnd', removeAnimation);
});

function rippleEffect(e){
    var offset = this.parentNode.getBoundingClientRect();
    var effect = this.querySelector('.ripple-effect');
    effect.style.top = (e.pageY - offset.top) + "px";
    effect.style.left = (e.pageX - offset.left) + "px";

    this.classList.add('ripple-effect-animation');
};

function rippleEffectKeyboard(e){
    var offset = this.parentNode.getBoundingClientRect();
    var effect = this.querySelector('.ripple-effect');
    effect.style.top = 50 + "%";
    effect.style.left = 50 + "%";

    effect.parentNode.classList.add('ripple-effect-animation');
};

function removeAnimation() {
  if (this.classList) {
    this.classList.remove('ripple-effect-animation');
  } else {
    this.className = this.className.replace(new RegExp('(^|\\b)' + 'ripple-effect-animation'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

var checkboxs = document.querySelectorAll('.materialCHECKBOX');
[].forEach.call(checkboxs, function(e) {
  e.addEventListener('mousedown', function(event) {
    //no dejo que el evento se propage al focus
    event.preventDefault();
    this.blur();
  }, false);
});

var botones = document.querySelectorAll('.materialBOTON');
[].forEach.call(botones, function(e) {
  e.addEventListener('mousedown', function(event) {
    //no dejo que el evento se propage al focus
    event.preventDefault();
    this.blur();
  }, false);
});

var radios = document.querySelectorAll('.materialRADIO');
[].forEach.call(radios, function(e) {
  e.addEventListener('mousedown', function(event) {
    //no dejo que el evento se propage al focus
    event.preventDefault();
    this.blur();
  }, false);
});

var toggles = document.querySelectorAll('.materialTOGGLE');
[].forEach.call(toggles, function(e) {
  e.addEventListener('mousedown', function(event) {
    //no dejo que el evento se propage al focus
    event.preventDefault();
    this.blur();
  }, false);
});

var toggles = document.querySelectorAll('.materialINPUT');
[].forEach.call(toggles, function(e) {
  e.addEventListener('focus', function(e){

  }, false);
});

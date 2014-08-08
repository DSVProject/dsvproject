function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
}

$('#help-btn').on('click', function () {
  $("#div-control-buttons").popover('toggle');
  $("#div-panels").popover('toggle');
  $("#div-media-buttons").popover('toggle');
  $("#chk-learn").popover('toggle');
});

$('#log-btn').on('click', function () {
  $(this).toggleClass('active ');
  $("#log-panel").toggle();
});

$('#variables-btn').on('click', function () {
  $(this).toggleClass('active ');
  $("#variables-panel").toggle();
});

$('#pseudocode-btn').on('click', function () {
  $(this).toggleClass('active ');
  $("#pseudocode-panel").toggle();
});

$('#chk-learn').on('click', function () {
  $(this).toggleClass('btn-default btn-success');
});

$('.dropdown-menu').find('form').click(function (e) {
  e.stopPropagation();
});

$(function () { 
  $("[data-toggle='tooltip']").tooltip({container: 'body'}); 
});

$(function () { 
  $("[data-popover='popover']").popover(); 
});

$('.popover-dismiss').popover({
  trigger: 'manual'
})

$(document).ready(function() {
  $('#animation-duration').slider({
    formater: function(value) {
      return 'Animation Speed: ' + value;
    }
  });
});
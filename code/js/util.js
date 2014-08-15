/**
  * Deep copy the obj passed as parameter.
  */
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

/**
  * Enables moving a d3 selection to front. In svg the object are rendered in the same order as the code is executed.
  * In a for loop, a square created in the first iteraction will appear behind one created in the second iteraction, 
  * in case they are overlapped.
  */
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
}

// THE CODE BELOW IS USED IN THE HTML PAGES. DO NOT REMOVE.

$.fn.toggleDisabled = function () {
  return this.each(function () { this.disabled = !this.disabled; });
}

/**
  * Show or hide the help popovers.
  */
$('#help-btn').on('click', function () {
  $("#div-control-buttons").popover('toggle');
  $("#div-panels").popover('toggle');
  $("#div-media-buttons").popover('toggle');
  $("#div-learning-buttons").popover('toggle');
});

/**
  * Show or hide the log panel.
  */
$('#log-btn').on('click', function () {
  $(this).toggleClass('active ');
  $("#log-panel").toggle();
});

/**
  * Show or hide the variable watch panel.
  */
$('#variables-btn').on('click', function () {
  $(this).toggleClass('active ');
  $("#variables-panel").toggle();
});

/**
  * Show or hide the pseudocode panel.
  */
$('#pseudocode-btn').on('click', function () {
  $(this).toggleClass('active ');
  $("#pseudocode-panel").toggle();
});

/**
  * Enable or disable the Learning Mode.
  */
$('#chk-learn').on('click', function () {
  $(this).toggleClass('btn-default btn-success');
  $(this).toggleClass('active');
  
  $('#chk-answer-btn').toggleDisabled();
  $('#restart-btn').toggleDisabled();
  $('#cancel-btn').toggleDisabled();
  $('#div-media-buttons :input').toggleDisabled();
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
// Overview: Clicking next or previous advances/steps back the "current" counter. Zooming, caption and overlay all controlled by counter.
var caption;
var current = 0;
var current_caption;
var current_zoom;
var current_overlay;
var img;
var height;
var width;
var window_width;
var zoomViewport_height;
var window_height;
var margin_top;
var margin;
var zoom;

// set length of zoom animation with duration. Milliseconds. 
var duration = 1800;

// Easing controls animation easing. Alternate values are "linear" "ease" "ease-in" "ease-out" "ease-in-out"
var easing = "ease";

// // Make an array of all the captions.
var captions = $(".caption");
var max = captions.length - 1;

// Advance
$("#next").click(function(){
  if (current < max) {
    current = current + 1;
    // console.log("current = " + current);
  } else {
    current = 0;
    // console.log("current = " + current);
  }
  display_caption(current);
  display_overlay(current);
  zoom(current);
});

// Previous
$("#prev").click(function(){
  if (current == 0) {
    current = max;
    // console.log("current = " + current);
    display_caption(current);
  } else {
    current = current - 1;
    // console.log("current = " + current);
    display_caption(current);
  }
  display_overlay(current);
  zoom(current);
});

function display_caption(i) {
  current_caption = captions[i];
  $('.caption-frame').html(current_caption);
  // console.log(current_caption);
}

function display_overlay(i) {

  // fade in and fade out can be fine-tuned here-- you can change "fast" 
  // to a value in milliseconds to set a specific duration.
  $(".overlay").fadeOut("500");
  $(".overlay[data-index='" + i +"']").fadeIn();
}

// zoomViewport and drawing should be the same size.
function resize() {
  height = $("#drawing").height();
  width = $("#drawing").width();
  window_width = $(window).width();
  console.log("resized to: " + height, width);

  $("#container").width(width);
  $("#container").height(height);

  zoomViewport_height = $(".zoomViewport").height();
  window_height = $(window).height();

  margin_top = (zoomViewport_height - height) / 2;
  if (width > height) {
    $("#container").css("margin-top", margin_top + "px");
  }
    
  margin = (window_width - width) / 2;
  $("#container").css("margin-left", margin + "px");
}

$(document).ready(function(){

  $('.zoomTarget').attr("data-duration", duration);
  $('.zoomTarget').attr("data-easing", easing);
  $('#container').attr("data-duration", duration);
  $('#container').attr("data-easing", easing);

  console.log("current = " + current);
  console.log("max =" + max);

  display_caption(current);
  display_overlay(current);

  resize();

  $(".overlay").hide();

  zoom(current);

  $( window ).resize(function() {
    resize();
  });
});
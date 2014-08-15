/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães, Trinity College Dublin. All rights reserved.
  *
  * The views and conclusions contained in the software and documentation are those of the
  * authors and should not be interpreted as representing official policies, either expressed
  * or implied, of Trinity College Dublin.
  */

var zoom = d3.behavior.zoom();

/**
  * Create the svg container.
  */
var svgContainer = d3.select("#viz").append("svg")
    .attr("width", MAIN_SVG_WIDTH)
    .attr("height", MAIN_SVG_HEIGHT)
    .attr("pointer-events", "all")
    //.style("border", "1px solid black");
    .call(zoom.on("zoom", rescale))
    .on("dblclick.zoom", null)
    .on("dblclick.", null);


// this code enables panning and zooming
var panGroup = svgContainer.append("g")
    .attr("id", "g-holder")
  .append("g")
    .attr("id", "g-main");
  
// reposition g
function rescale() {
  d3.select("#g-main").attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
}

/**
  * Reset any changes made when dragging or zooming the svg container.
  */
function resetPos() {
  d3.select("#g-main").attr('transform', null);
  zoom.scale(1);
  zoom.translate([0, 0]);
}
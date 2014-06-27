var zoom = d3.behavior.zoom();

// layout code      
var svgContainer = d3.select("#viz").append("svg")
    .attr("width", MAIN_SVG_WIDTH)
    .attr("height", MAIN_SVG_HEIGHT)
    .attr("pointer-events", "all")
    .style("border", "1px solid black");
    //.call(zoom.on("zoom", rescale)); 

// this code enables panning and zooming
var panGroup = svgContainer.append("g")
    .attr("id", "g-holder")
  .append("g")
    .attr("id", "g-main");

/*
panGroup.append("rect")
    .attr("width", MAIN_SVG_WIDTH)
    .attr("height", MAIN_SVG_HEIGHT)
    .attr("fill", "white");
*/
  
// reposition g
function rescale() {
  d3.select("#g-main").attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
}

function resetPos() {
  d3.select("#g-main").attr('transform', null);
  zoom.scale(1);
  zoom.translate([0, 0]);
}
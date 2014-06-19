// Default properties are defined on 'animation/constant.js'


/**
  * Defines an edge graphic unit.
  * This 'class' will hold all the properties and methods regarding this single unit. 
  *
  * @param {String || Number} id : the id of this object.
  * @param {Number} x1 : the x coordinate of the origin of this object on the screen.
  * @param {Number} y1 : the y coordinate of the origin of this object on the screen.
  * @param {Number} x2 : the x coordinate of the destination of this object on the screen.
  * @param {Number} y2 : the y coordinate of the destination of this object on the screen.
  * @param {String} edgeClass : the CSS class of the line svg element.
  */
var EdgeObject = function(id, x1, y1, x2, y2, edgeClass){
  var propObj = {
    "id": null,
    
    "edge": {
      "class": null,
      "x1": null,
      "y1": null,
      "x2": null,
      "y2": null,
      "stroke": null,
      "strokeWidth": null
    }
  }
  
  initPropObj();

  function initPropObj(){
    propObj["id"] = id;
    
    propObj["edge"]["class"] = edgeClass;
    propObj["edge"]["x1"] = x1;
    propObj["edge"]["y1"] = y1;
    propObj["edge"]["x2"] = x2;
    propObj["edge"]["y2"] = y2;
    propObj["edge"]["stroke"] = animProperties["edge"]["stroke"];
    propObj["edge"]["strokeWidth"] = animProperties["edge"]["strokeWidth"];
  }
  
  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function(){
    return propObj;
  }
  
  /**
    * @return {String || Number} : the id of this object.
    */
  this.getID = function(){
    return propObj["id"];
  }
  
  /**
    * Set the CSS class of the line svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setEdgeClass = function(newClass){
    propObj["edge"]["class"] = newClass;
  }
  
  /**
    * @return {Number} : the x1 coordinate of the line svg element.
    */
  this.getCoordinateX1 = function(){
    return propObj["edge"]["x1"];
  }
  
  /**
    * @return {Number} : the y1 coordinate of the line svg element.
    */
  this.getCoordinateY1 = function(){
    return propObj["edge"]["y1"];
  }  
  
  /**
    * @return {Number} : the x2 coordinate of the line svg element.
    */
  this.getCoordinateX2 = function(){
    return propObj["edge"]["x2"];
  }
  
  /**
    * @return {Number} : the y2 coordinate of the line svg element.
    */
  this.getCoordinateY2 = function(){
    return propObj["edge"]["y2"];
  }

  /**
    * Set the stroke color of the line svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function(newStroke){
    propObj["edge"]["stroke"] = newStroke;
  }
  
  /**
    * Set the stroke width of the line svg element.
    *
    * @param {Number} newOpacity : the new stroke width value.
    */
  this.setStrokeWidth = function(newStrokeWidth){
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    propObj["edge"]["strokeWidth"] = newStrokeWidth;
  }
  
  /**
    * Change the destination of the edge.
    *
    * @param {Number} x : the new x coordinate of the edge.
    * @param {Number} y : the new x coordinate of the edge.
    */
  this.moveEdge = function(x, y){
    if(x == null || isNaN(x) || y == null || isNaN(y)) return;
    propObj["edge"]["x2"] = x;
    propObj["edge"]["y2"] = y;
  }
  
  /**
    * Draw this object properties on the screen.
    * If the object is new, it will appear; if any property has changed, it will be updated.
    *
    * @param {Number} dur : the duration in miliseconds of this animation.
    */
  this.draw = function(dur){
    if(dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(propObj);
  
    var edge = d3.select("#g-edge").selectAll(SVG_LINE)
        .data(json, function (d) {return d.id;});
      
    edge.enter().append(SVG_LINE)        
        .attr("id", function (d) {return "edge-" + d.id;})
        .attr("class", function (d) {return d.edge.class})
    edge.transition()
        .duration(dur)
        .attr("x1", function (d) {return d.edge.x1 + 25;})
        .attr("y1", function (d) {return d.edge.y1 + 100;})
        .attr("x2", function (d) {return d.edge.x2 + 25;})
        .attr("y2", function (d) {return d.edge.y2;})
        .style("stroke", function (d) {return d.edge.stroke;})
        .style("stroke-width", function (d) {return d.edge.strokeWidth;});
  }
}
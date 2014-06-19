// Default properties are defined on 'animation/constant.js'


/**
  * Defines a square graphic unit.
  * This 'class' will hold all the properties and methods regarding this single unit. 
  *
  * @param {String || Number} id : the id of this object.
  * @param {Number} x : the x coordinate of this object on the screen.
  * @param {Number} y : the y coordinate of this object on the screen.
  * @param {String} text : the inner text of this object, that will be displayed on the screen.
  * @param {String} rectClass : the CSS class of the rect svg element.
  * @param {String} textClass : the CSS class of the text svg element.
  */
var SquareObject = function(id, x, y, text, rectClass, textClass){
  var propObj = {
    "id": null,
    
    "label": null,
    
    "rect": {
      "class": null,
      "x": null,
      "y": null,
      "width": null,
      "height": null,
      "fill": null,
      "fillOpacity":null,
      "stroke": null,
      "strokeWidth": null
    },

    "text": {
      "class": null,
      "x": null,
      "y": null,
      "fill": null,
      "fontFamily": null,
      "fontWeight": null,
      "fontSize": null,
      "textAnchor": null,
      "text": null
    }
  }
  
  initArrayObj();

  /**
    * Initialise the element, with the provided parameters and other default properties.
    */
  function initArrayObj(){
    propObj["id"] = id;
    
    propObj["rect"]["class"] = rectClass;
    propObj["rect"]["x"] = x;
    propObj["rect"]["y"] = y;
    propObj["rect"]["width"] = CELL_WIDTH_DEFAULT;
    propObj["rect"]["height"] = CELL_HEIGHT_DEFAULT;
    propObj["rect"]["fill"] = CELL_FILL_DEFAULT;
    propObj["rect"]["fillOpacity"] = animProperties["cell"]["default"]["fill-opacity"];
    propObj["rect"]["stroke"] = animProperties["cell"]["default"]["stroke"];
    propObj["rect"]["strokeWidth"] = animProperties["cell"]["default"]["stroke-width"];
    
    propObj["text"]["class"] = textClass;
    propObj["text"]["x"] = x + 25;
    propObj["text"]["y"] = y + 30;
    propObj["text"]["fill"] = animProperties["text"]["fill"];
    propObj["text"]["fontFamily"] = animProperties["text"]["font-family"];
    propObj["text"]["fontWeight"] = animProperties["text"]["font-weight"];
    propObj["text"]["fontSize"] = animProperties["text"]["font-size"];
    propObj["text"]["textAnchor"] = animProperties["text"]["text-anchor"];
    propObj["text"]["text"] = text;
  }
  
  /**
    * @return {arrayObj} : the content of this object property map.
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
    * @return {String} : the type of this object.
    */
  this.getType = function(){
    return "SquareObject";
  }
  
  /**
    * Set the CSS class of the rect svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setRectClass = function(newClass){
    propObj["rect"]["class"] = newClass;
  }
  
  /**
    * @return {Number} : the x coordinate of the rect svg element.
    */
  this.getCoordinateX = function(){
    return propObj["rect"]["x"];
  }
  
  /**
    * @return {Number} : the y coordinate of the rect svg element.
    */
  this.getCoordinateY = function(){
    return propObj["rect"]["y"];
  }
  
  /**
    * Set the fill color of the rect svg element.
    *
    * @param {String} newFill : the new CSS or svg color.
    */
  this.setFill = function(newFill){
    if(newFill == null) return;
    propObj["rect"]["fill"] = newFill;
  }
  
  /**
    * Set the fill opacity of the rect svg element.
    *
    * @param {Number} newOpacity : the new opacity value.
    */
  this.setFillOpacity = function(newOpacity){
    if(newOpacity == null|| isNaN(newOpacity)) return;
    if(newOpacity < 0) newOpacity = 0.0;
    
    propObj["rect"]["fillOpacity"] = newOpacity;
  }
  
  /**
    * Set the stroke color of the rect svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function(newStroke){
    propObj["rect"]["stroke"] = newStroke;
  }
  
  /**
    * Set the stroke width of the rect svg element.
    *
    * @param {Number} newOpacity : the new stroke width value.
    */
  this.setStrokeWidth = function(newStrokeWidth){
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    propObj["rect"]["strokeWidth"] = newStrokeWidth;
  }
  
  /**
    * Move this object from its current position to a new position.
    *
    * @param {Number} x : the destination x coordinate.
    * @param {Number} y : the destination y coordinate.
    */
  this.moveShape = function(x, y){
    if(x == null || y == null || isNaN(x) || isNaN(y)) return;
  
    propObj["rect"]["x"] = x;
    propObj["rect"]["y"] = y;

    propObj["text"]["x"] = x + 25;
    propObj["text"]["y"] = y + 30;
    
    for(key in edgeList){
      edgeList[key].refreshPath();
    }
  }
  
  /**
    * Set the text of the text svg element.
    *
    * @param {String} newText : the new text.
    */
  this.setText = function(newText){
    propObj["text"]["text"] = newText;
  }
  
  this.getText = function(){
    return propObj["text"]["text"];
  }
  
  /**
    * Set the text color of the text svg element.
    *
    * @param {String} newColor : the new CSS or svg color.
    */
  this.setFontColor = function(newColor){
    propObj["text"]["fill"] = newColor;
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
  
    var shape = d3.select("#g-shape").selectAll(".shape")
        .data(json, function (d) {return d.id;});
      
    shape.enter().append(SVG_RECT)        
        .attr("id", function (d) {return "shape-" + d.id;})
        .attr("class", function (d) {return d.rect.class});
    shape.transition()
        .duration(dur)
        .attr("x", function (d) {return d.rect.x;})
        .attr("y", function (d) {return d.rect.y;})
        .attr("height", function (d) {return d.rect.height;})
        .attr("width", function (d) {return d.rect.width;})
        .style("fill", function (d) {return d.rect.fill;})
        .style("fill-opacity", function (d) {return d.rect.fillOpacity;})
        .style("stroke", function (d) {return d.rect.stroke;})
        .style("stroke-width", function (d) {return d.rect.strokeWidth;});
     
    var label = d3.select("#g-label").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    label.enter().append("text")
        .attr("class", "label")
        .attr("x", function (d) {return d.rect.x + 25;})
        .attr("y", function (d) {return d.rect.y + 80;})
        .text(function (d) { return d.id; });
      
    var text = d3.select("#g-text").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    text.enter().append("text")
        .attr("id", function (d) {return "text-" + d.id; })
        .attr("class", function (d) {return d.text.class});
    text.transition()
        .duration(dur)
        .attr("x", function (d) {return d.text.x;})
        .attr("y", function (d) {return d.text.y;})
        .style("fill", function (d) {return d.text.fill;})
        .style("font-family", function (d) {return d.text.fontFamily;})
        .style("font-weigh", function (d) {return d.text.fontWeight;})
        .style("font-size", function (d) {return d.text.fontSize;})
        .style("text-anchor", function (d) {return d.text.textAnchor;})   
        .text(function (d) {return d.text.text;});
  }
  
  /**
    * Remove this object from the screen.
    *
    * @param {Number} dur : the duration in miliseconds of this animation.
    */
  this.remove = function(dur){
    if(dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(propObj);
    
    var shape = d3.select("#g-shape").selectAll(".shape")
        .data(json, function (d) {return d.id;});
    
    shape.transition()
        .duration(dur)
        .remove();
    
    var label = d3.select("#g-label").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    label.transition()
        .duration(dur)
        .remove();
    
    var text = d3.select("#g-text").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    text.transition()
        .duration(dur)
        .remove();
    
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the properties
    * from the orignal object, without the reference, allowing the animationg to happen step by step.
    *
    * @param {propObj} prop : a propObj from the Object to be cloned.
    */
  this.cloneProperties = function(prop){
      propObj = clone(prop);
  }
}
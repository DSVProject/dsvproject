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
var ArrayCellObject = function(id, x, y, text, rectClass, textClass){
  var arrayObj = {
    "id": null,
    
    "shape": "rect",
    
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
    arrayObj["id"] = id;
    
    arrayObj["rect"]["class"] = rectClass;
    arrayObj["rect"]["x"] = x;
    arrayObj["rect"]["y"] = y;
    arrayObj["rect"]["width"] = CELL_WIDTH_DEFAULT;
    arrayObj["rect"]["height"] = CELL_HEIGHT_DEFAULT;
    arrayObj["rect"]["fill"] = CELL_FILL_DEFAULT;
    arrayObj["rect"]["fillOpacity"] = animProperties["cell"]["default"]["fill-opacity"];
    arrayObj["rect"]["stroke"] = animProperties["cell"]["default"]["stroke"];
    arrayObj["rect"]["strokeWidth"] = animProperties["cell"]["default"]["stroke-width"];
    
    arrayObj["text"]["class"] = textClass;
    arrayObj["text"]["x"] = x + 25;
    arrayObj["text"]["y"] = y + 30;
    arrayObj["text"]["fill"] = animProperties["text"]["fill"];
    arrayObj["text"]["fontFamily"] = animProperties["text"]["font-family"];
    arrayObj["text"]["fontWeight"] = animProperties["text"]["font-weight"];
    arrayObj["text"]["fontSize"] = animProperties["text"]["font-size"];
    arrayObj["text"]["textAnchor"] = animProperties["text"]["text-anchor"];
    arrayObj["text"]["text"] = text;
  }
  
  /**
    * @return {arrayObj} : the content of this object property map.
    */
  this.getAttributes = function(){
    return arrayObj;
  }
  
  /**
    * @return {String || Number} : the id of this object.
    */
  this.getID = function(){
    return arrayObj["id"];
  }
  
  /**
    * Set the CSS class of the rect svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setCellClass = function(newClass){
    arrayObj["rect"]["class"] = newClass;
  }
  
  /**
    * @return {Number} : the x coordinate of the rect svg element.
    */
  this.getCoordinateX = function(){
    return arrayObj["rect"]["x"];
  }
  
  /**
    * @return {Number} : the y coordinate of the rect svg element.
    */
  this.getCoordinateY = function(){
    return arrayObj["rect"]["y"];
  }
  
  /**
    * Set the fill color of the rect svg element.
    *
    * @param {String} newFill : the new CSS or svg color.
    */
  this.setFill = function(newFill){
    if(newFill == null) return;
    arrayObj["rect"]["fill"] = newFill;
  }
  
  /**
    * Set the fill opacity of the rect svg element.
    *
    * @param {Number} newOpacity : the new opacity value.
    */
  this.setFillOpacity = function(newOpacity){
    if(newOpacity == null|| isNaN(newOpacity)) return;
    if(newOpacity < 0) newOpacity = 0.0;
    
    arrayObj["rect"]["fillOpacity"] = newOpacity;
  }
  
  /**
    * Set the stroke color of the rect svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function(newStroke){
    arrayObj["rect"]["stroke"] = newStroke;
  }
  
  /**
    * Set the stroke width of the rect svg element.
    *
    * @param {Number} newOpacity : the new stroke width value.
    */
  this.setStrokeWidth = function(newStrokeWidth){
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    arrayObj["rect"]["strokeWidth"] = newStrokeWidth;
  }
  
  /**
    * Move this object from its current position to a new position.
    *
    * @param {Number} x : the destination x coordinate.
    * @param {Number} y : the destination y coordinate.
    */
  this.moveShape = function(x, y){
    if(x == null || y == null || isNaN(x) || isNaN(y)) return;
  
    arrayObj["rect"]["x"] = x;
    arrayObj["rect"]["y"] = y;

    arrayObj["text"]["x"] = x + 25;
    arrayObj["text"]["y"] = y + 30;
  }
  
  /**
    * Set the text of the text svg element.
    *
    * @param {String} newText : the new text.
    */
  this.setText = function(newText){
    arrayObj["text"]["text"] = newText;
  }
  
  /**
    * Set the text color of the text svg element.
    *
    * @param {String} newColor : the new CSS or svg color.
    */
  this.setFontColor = function(newColor){
    arrayObj["text"]["fill"] = newColor;
  }
}
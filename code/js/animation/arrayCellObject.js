// Defines a graphic unit called 'Cell'. In this implementation the array is made of Cells.
// Each instance of this file will contain all the graphic properties of the current Cell.
// Default properties are defined on 'animation/constant.js'

var ArrayCellObject = function(id, x, y, text, cellClass, textClass){
  var arrayObj = {
    "id": null,

    "cell": {
      "class": null,
      "cx": null,
      "cy": null,
      "x": null,
      "y": null,
      "r": null,
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

  function initArrayObj(){
    arrayObj["id"] = id;
    
    arrayObj["cell"]["class"] = cellClass;
    arrayObj["cell"]["x"] = x;
    arrayObj["cell"]["y"] = y;
    arrayObj["cell"]["width"] = CELL_WIDTH_DEFAULT;
    arrayObj["cell"]["height"] = CELL_HEIGHT_DEFAULT;
    arrayObj["cell"]["fill"] = CELL_FILL_DEFAULT;
    arrayObj["cell"]["fillOpacity"] = animProperties["cell"]["default"]["fill-opacity"];
    arrayObj["cell"]["stroke"] = animProperties["cell"]["default"]["stroke"];
    arrayObj["cell"]["strokeWidth"] = animProperties["cell"]["default"]["stroke-width"];
    
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
  
  this.getAttributes = function(){
    return arrayObj;
  }
  
  this.getID = function(){
    return arrayObj["id"];
  }
  
  this.setCellClass = function(newClass){
    arrayObj["cell"]["class"] = newClass;
  }
  
  this.getCoordinateX = function(){
    return arrayObj["cell"]["x"];
  }
  
  this.getCoordinateY = function(){
    return arrayObj["cell"]["y"];
  }
  
  this.setFill = function(newFill){
    if(newFill == null) return;
    arrayObj["cell"]["fill"] = newFill;
  }
  
  this.setFillOpacity = function(newOpacity){
    if(newOpacity < 0) newOpacity = 0.0;
    arrayObj["cell"]["fillOpacity"] = newOpacity;
  }
  
  this.setStroke = function(newStroke){
    if(newStroke == null || isNaN(newStroke)) return;
    arrayObj["cell"]["stroke"] = newStroke;
  }
  
  this.setStrokeWidth = function(newStrokeWidth){
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    arrayObj["cell"]["strokeWidth"] = newStrokeWidth;
  }
  
  this.moveCell = function(x, y){
    arrayObj["cell"]["x"] = x;
    arrayObj["cell"]["y"] = y;

    arrayObj["text"]["x"] = x + 25;
    arrayObj["text"]["y"] = y + 30;
  }
  
  this.setText = function(newCellText){
    arrayObj["text"]["text"] = newCellText;
  }
  
  this.setFontColor = function(newColor){
    arrayObj["text"]["fill"] = newColor;
  }
  
  this.changeCellProperty = function(property, newPropertyValue){
    arrayObj["cell"][property] = newPropertyValue;
  }
  
  this.changeTextProperty = function(property, newPropertyValue){
    arrayObj["text"][property] = newPropertyValue;
  }
}
// Defines a graphic unit called 'Edge', which connects points A and B.
// Each instance of this file will contain all the graphic properties of the current Edge.
// Default properties are defined on 'animation/constant.js'

var EdgeObject = function(id, x1, y1, x2, y2, edgeClass){
  var edgeObj = {
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
  
  initArrayObj();

  function initArrayObj(){
    edgeObj["id"] = id;
    
    edgeObj["edge"]["class"] = cellClass;
    edgeObj["edge"]["x1"] = x1;
    edgeObj["edge"]["y1"] = y1;
    edgeObj["edge"]["x2"] = x2;
    edgeObj["edge"]["y2"] = y2;
    edgeObj["edge"]["stroke"] = animProperties["edge"]["stroke"];
    edgeObj["edge"]["strokeWidth"] = animProperties["edge"]["stroke-width"];
  }
  
  this.getAttributes = function(){
    return edgeObj;
  }
  
  this.getID = function(){
    return edgeObj["id"];
  }
  
  this.changeText = function(newCellText){
    arrayObj["text"]["text"] = newCellText;
  }
  
  this.changeStroke = function(newStroke){
    if(newStroke == null || isNaN(newStroke)) return;
    arrayObj["cell"]["stroke"] = newStroke;
  }
  
  this.changeStrokeWidth = function(newStrokeWidth){
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    arrayObj["cell"]["strokeWidth"] = newStrokeWidth;
  }
  
  this.moveOrigin = function(x, y){
    if(x == null || isNaN(x) || y == null || isNaN(y)) return;
    edgeObj["edge"]["x1"] = x;
    edgeObj["edge"]["y1"] = y;
  }
  
  this.changeCellProperty = function(property, newPropertyValue){
    arrayObj["cell"][property] = newPropertyValue;
  }
  
  this.changeTextProperty = function(property, newPropertyValue){
    arrayObj["text"][property] = newPropertyValue;
  }
}
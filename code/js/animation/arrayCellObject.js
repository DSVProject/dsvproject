// Defines a graphic unit called 'Cell'. In this implementation the array is made of Cells.
// Each Cell will contain all the properties regarding structure and graphics.
// Default properties are defined on animation/constant.js

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
    arrayObj["cell"]["width"] = animProperties["cell"]["width"];
    arrayObj["cell"]["height"] = animProperties["cell"]["height"];
    arrayObj["cell"]["fill"] = animProperties["cell"]["default"]["fill"];
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
  
  this.changeText = function(newCellText){
    arrayObj["text"]["text"] = newCellText;
  }
  
  this.changeFill = function(newFill){
    if(newFill == null || isNaN(newFill)) return;
    arrayObj["cell"]["fill"] = newFill;
  }
  
  this.changeFillOpacity = function(newOpacity){
    if(newOpacity < 0) newOpacity = 0.0;
    arrayObj["cell"]["fillOpacity"] = newOpacity;
  }
  
  this.changeStroke = function(newStroke){
    if(newStroke == null || isNaN(newStroke)) return;
    arrayObj["cell"]["stroke"] = newStroke;
  }
  
  this.changeStrokeWidth = function(newStrokeWidth){
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    arrayObj["cell"]["strokeWidth"] = newStrokeWidth;
  }
  
  this.moveCell = function(x, y){
    attributeList["cell"]["x"] = x;
    attributeList["cell"]["y"] = y;

    attributeList["text"]["x"] = x + 25;
    attributeList["text"]["y"] = y + 30;
  }
  
  this.changeCellProperty = function(property, newPropertyValue){
    arrayObj["cell"][property] = newPropertyValue;
  }
  
  this.changeTextProperty = function(property, newPropertyValue){
    arrayObj["text"][property] = newPropertyValue;
  }
}
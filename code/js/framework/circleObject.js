/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães.
  *
  * This file is part of DSVProject.
  *
  * DSVProject is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.
  *
  * DSVProject is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * Redistribution and use in source and binary forms, with or without modification, are
  * permitted provided that the above copyright notice, license and this disclaimer are retained.
  *
  * This project was started as summer internship project in Trinity College Dublin.
  * The views and conclusions contained in the software and documentation are those of the
  * authors and should not be interpreted as representing official policies, either expressed
  * or implied, of Trinity College Dublin.
  */

// Default properties are defined on 'animation/constant.js'

/**
  * Defines a circle graphic unit.
  * The instance of this class contains all the attributes and methods regarding graphic changes to this object.
  *
  * @constructor
  *
  * @param {!CoreAnimObject} coreObj : instance of the CoreAnimObject class.
  * @param {!(String|Number)} id : the id of this object.
  * @param {!Number} cx : the cx coordinate of this object inside the svg element.
  * @param {!Number} cy : the cy coordinate of this object inside the svg element.
  * @param {!Number} radius : the radius of this object.
  * @param {?String=} text : the inner text of this object, that will be displayed on the screen.
  * @param {?String=} label : the text underneath this object, that will be displayed on the screen.
  * @param {?String=} shapeClass : the CSS class of the rect svg element.
  * @param {?String=} textClass : the CSS class of the text svg element (inside the shape).
  * @param {?String=} labelClass : the CSS class of the text svg element (underneath the shape).
  */
var CircleObject = function (coreObj, id, cx, cy, radius, text, label, shapeClass, textClass, labelClass) {
  var self = this;

  if (coreObj == null) {
    throw new Error("Invalid null parameter.");
    return;
  }

  this.coreObj = coreObj;
  
  /**
    * Offset values for the text elements.
    */
  this.textAdjust = defaultProperties.text["font-size"]/3;
  this.labelAdjust = defaultProperties.shape.radius + 30;

  /**
    * This object map of attributes.
    */
  this.propObj = {
    "id": id,
    
    "shape": {
      "class": shapeClass,
      "cx": cx,
      "cy": cy,
      "r": radius,
      "fill": defaultProperties.shape.fill.default,
      "fillOpacity": defaultProperties.shape["fill-opacity"].default,
      "stroke": defaultProperties.shape.stroke.default,
      "strokeWidth": defaultProperties.shape["stroke-width"].default
    },

    "text": {
      "class": textClass,
      "x": cx,
      "y": cy + this.textAdjust,
      "fill": defaultProperties.text.stroke.default,
      "fontFamily": defaultProperties.text["font-family"],
      "fontWeight": defaultProperties.text["font-weight"],
      "fontSize": defaultProperties.text["font-size"],
      "textAnchor": defaultProperties.text["text-anchor"],
      "text": text
    },
    
    "label": {
      "class": labelClass,
      "x": cx,
      "y": cy + this.labelAdjust,
      "text": label
    },
    
    "toRemove": false,
    
    "isValidTarget": false
  }
  
  /**
    * This object edge list.
    */
  this.edgeList = [];
  
  /**
    * Offset values to adjust the position of the shapes on the screen
    */
  this.widthAdjust = [];
  
  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function () {
    return this.propObj;
  }
  
  /**
    * @return {Array} : the edgeList[] of this object.
    */
  this.getEdges = function () {
    return this.edgeList;
  }
  
  /**
    * @return {(String|Number)} : the id of this object.
    */
  this.getID = function () {
    return this.propObj.id;
  }
  
  /**
    * Set the CSS class of the shape svg element.
    *
    * @param {?String} newClass : the new CSS class.
    */
  this.setShapeClass = function (newClass) {
    this.propObj.shape.class = newClass;
  }
  
  /**
    * @return {String} : the class of the shape svg element.
    */
  this.getShapeClass = function () {
    return this.propObj.shape.class;
  }
  
  /**
    * Move this object from its current position to a new position.
    *
    * @param {!Number} x : the destination x coordinate.
    * @param {!Number} y : the destination y coordinate.
    */
  this.moveShape = function (cx, cy) {
    if(cx == null || cy == null || isNaN(cx) || isNaN(cy)) return;
  
    this.propObj.shape.cx = cx;
    this.propObj.shape.cy = cy;

    this.propObj.text.x = cx;
    this.propObj.text.y = cy + this.textAdjust;
    
    this.propObj.label.x = cx;
    this.propObj.label.y = cy + this.labelAdjust;
    
    for (var key in this.edgeList) {
      this.edgeList[key].calculatePath();
    }
  }
  
  /**
    * @return {Number} : the cx coordinate of the shape svg element.
    */
  this.getCoordinateCX = function () {
    return this.propObj.shape.cx;
  }
  
  /**
    * @param {!Const} point : at which position the Edge who is calling this function is going to be placed (const defined at 'animation/constant.js' : EDGE_POSITION).
    *
    * @return {Number} : the x coordinate of the shape svg element, with offset adjust (for edge use).
    */
  this.getEdgeCoordinateX = function (point) {
    var coord = this.propObj.shape.cx;
    
    if (point == EDGE_POSITION.RIGHT) {
      return coord + this.propObj.shape.r;
    } else if (point == EDGE_POSITION.LEFT) { 
      return coord - this.propObj.shape.r;
    } else { // TOP, CENTER OR BOTTOM
      return coord;
    }
  }
  
  /**
    * @return {Number} : the cy coordinate of the circle svg element.
    */
  this.getCoordinateCY = function () {
    return this.propObj.shape.cy;
  }
  
  /**
    * @param {!Const} point : at which position the Edge who is calling this function is going to be placed (const defined at 'animation/constant.js' : EDGE_POSITION).
    *
    * @return {Number} : the y coordinate of the shape svg element, with offset adjust (for edge use).
    */
  this.getEdgeCoordinateY = function (point) {
    var coord = this.propObj.shape.cy;
    
    if (point == EDGE_POSITION.TOP) {
      return coord - this.propObj.shape.r;
    } else if (point == EDGE_POSITION.BOTTOM) { 
      if (this.propObj.label.text == null) {
        return coord + + this.propObj.shape.r;
      } else {
        return coord + this.propObj.shape.r + 50;
      }
    } else { // LEFT, CENTER OR RIGHT
      return coord;
    }
  }
  
  /**
    * Set the radius of the shape svg element.
    *
    * @param {!Number} newRadius : the new radius.
    */
  this.setRadius = function (newRadius) {
    if (newRadius == null || isNaN(newRadius)) return;
    this.propObj.shape.r = newRadius;
  }
  
  /**
    * @return {Number} : the radius of the shape svg element.
    */
  this.getRadius = function () {
    return this.propObj.shape.radius;
  }
  
  /**
    * Set the fill color of the shape svg element.
    *
    * @param {!String} newFill : the new CSS or svg color.
    */
  this.setFill = function (newFill) {
    if(newFill == null) return;
    this.propObj.shape.fill = newFill;
  }
  
  /**
    * Set the fill opacity of the shape svg element.
    *
    * @param {!Number} newOpacity : the new opacity value.
    */
  this.setFillOpacity = function (newOpacity) {
    if(newOpacity == null || isNaN(newOpacity)) return;
    if(newOpacity < 0) newOpacity = 0.0;
    
    this.propObj.shape.fillOpacity = newOpacity;
  }
  
  /**
    * Set the stroke color of the shape svg element.
    *
    * @param {!String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function (newStroke) {
    if(newStroke == null) return;
    this.propObj.shape.stroke = newStroke;
  }
  
  /**
    * Set the stroke width of the shape svg element.
    *
    * @param {!Number} newStrokeWidth : the new stroke width value.
    */
  this.setStrokeWidth = function (newStrokeWidth) {
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    this.propObj.shape.strokeWidth = newStrokeWidth;
  }
  
  /**
    * Set the text of the text svg element.
    *
    * @param {?String} newText : the new text.
    */
  this.setText = function (newText) {
    this.propObj.text.text = newText;
  }
  
  /**
    * @return {String} : the text of the text svg element (located inside the shape).
    */ 
  this.getText = function () {
    return this.propObj.text.text;
  }

  /**
    * Set the CSS class of the text svg element.
    *
    * @param {?String} newClass : the new CSS class.
    */
  this.setTextClass = function (newClass) {
    this.propObj.text.class = newClass;
  }
  
  /**
    * @return {String} : the CSS class of the text svg element.
    */
  this.getTextClass = function () {
    return this.propObj.text.class;
  }

  /**
    * Set the text color of the text svg element.
    *
    * @param {!String} newColor : the new CSS or svg color.
    */
  this.setFontColor = function (newColor) {
    if(newColor == null) return;
    this.propObj.text.fill = newColor;
  }
  
  /**
    * Set the label of the text svg element (beneath the object).
    *
    * @param {?String} newLabel : the new label.
    */
  this.setLabel = function (newLabel) {
    this.propObj.label.text = newLabel;
  }
  
  /**
    * Set the CSS class of the text svg element (used as label).
    *
    * @param {?String} newClass : the new CSS class.
    */
  this.setLabelClass = function (newClass) {
    this.propObj.label.class = newClass;
  }
  
  /**
    * @return {String} : the CSS class of the text svg element (used as label).
    */
  this.getLabelClass = function () {
    return this.propObj.label.class;
  }
  
  /**
    * Set this object to be removed on the next iteration.
    *
    * @param {!Boolean} bool : if true, the object will be removed.
    */
  this.setToRemove = function (bool) {
    if (bool == null) return;
    this.propObj.toRemove = bool;
  }
  
  /**
    * @return {Boolean} : the toRemove property.
    */ 
  this.getToRemove = function () {
    return this.propObj.toRemove;
  }
  
  /**
    * Set this object as a valid target for the learning mode interactions.
    *
    * @param {!Boolean} bool : if true, the object will be a valid target.
    */
  this.setIsValidTarget = function (bool) {
    if (bool == null) return;
    this.propObj.isValidTarget = bool;
  }
  
  /**
    * @return {Boolean} : the isValidTarget property.
    */ 
  this.getIsValidTarget = function () {
    return this.propObj.isValidTarget;
  }
  
  /**
    * Add an EdgeObject to this object edgeList[].
    *
    * @param {!EdgeObject} edgeObj : the instance of the EdgeObject.
    */
  this.addEdge = function (edgeObj) {
    if (edgeObj == null) return;
    this.edgeList[edgeObj.getID()] = edgeObj;
  }
  
  this.getEdgeCount = function () {
    return Object.keys(this.edgeList).length;
  }
  
  this.reposition = function(x, y, side, orientation) {
    var counter = 0;
    var midPoint = this.getEdgeCount()/2;
    var leftAdjust = this.widthAdjust[Math.ceil(midPoint)];
    var rightAdjust = this.widthAdjust[Math.floor(midPoint) - 1];

    if (x == null) x = this.propObj.shape.cx;
    if (y == null) y = this.propObj.shape.cy;

    if (orientation == ORIENTATION.TOP) {
      if (side == -1) {
        x = x - leftAdjust;
      } else if (side == 1) {
        x = x + rightAdjust;
      }
    } else if (orientation == ORIENTATION.LEFT) {
      if (side == -1) {
        y = y - leftAdjust;
      } else if (side == 1) {
        y = y + rightAdjust;
      }
    } else if (orientation == ORIENTATION.BOTTOM) {
      if (side == -1) {
        x = x - leftAdjust;
      } else if (side == 1) {
        x = x + rightAdjust;
      }
    } else if (orientation == ORIENTATION.RIGHT) {
      if (side == -1) {
        y = y + leftAdjust;
      } else if (side == 1) {
        y = y - rightAdjust;
      }
    }

    this.moveShape(x, y);

    for (var key in this.edgeList) {
      if (this.getEdgeCount() == 1) {
        this.edgeList[key].reposition(x, y, 0, 0, 0, orientation);

        continue;
      }

      if (counter < midPoint) {
        this.edgeList[key].reposition(x, y, -1, this.widthAdjust[Math.ceil(midPoint)], null, orientation);
      } else {
        this.edgeList[key].reposition(x, y, 1, null, this.widthAdjust[Math.floor(midPoint) - 1], orientation);
      }
      counter++;
    }
  }
  
  /**
    * Draw this object attributes on the screen.
    * If the object is new, it will be generated; if any property has changed, it will be updated.
    *
    * @param {!Number=} duration : the duration in miliseconds of this animation.
    */
  this.draw = function (duration) {    
    if(duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
    
    var shape = d3.select("#" + DEFAULT_IDS.SVG_GROUP.SHAPE).selectAll(SVG_CIRCLE)
        .data(json, function (d) {return d.id;});
      
    shape.enter().append(SVG_CIRCLE)        
        .attr("id", function (d) {return DEFAULT_IDS.SVG_ELEMENT.SHAPE + d.id;});
    shape.transition()
        .duration(duration)
        .attr("class", function (d) {return d.shape.class;})
        .attr("cx", function (d) {return d.shape.cx;})
        .attr("cy", function (d) {return d.shape.cy;})
        .attr("r", function (d) {return d.shape.r;})
        .attr("fill", function (d) {return d.shape.fill;})
        .attr("fill-opacity", function (d) {return d.shape.fillOpacity;})
        .attr("stroke", function (d) {return d.shape.stroke;})
        .attr("stroke-width", function (d) {return d.shape.strokeWidth;});
      
    var text = d3.select("#" + DEFAULT_IDS.SVG_GROUP.TEXT).selectAll(SVG_TEXT)
        .data(json, function (d) {return d.id;});
        
    text.enter().append(SVG_TEXT)
        .attr("id", function (d) {return DEFAULT_IDS.SVG_ELEMENT.TEXT + d.id; });
    text.transition()
        .duration(duration)
        .attr("class", function (d) {return d.text.class})
        .attr("x", function (d) {return d.text.x;})
        .attr("y", function (d) {return d.text.y;})
        .attr("fill", function (d) {return d.text.fill;})
        .attr("font-family", function (d) {return d.text.fontFamily;})
        .attr("font-weigh", function (d) {return d.text.fontWeight;})
        .attr("font-size", function (d) {return d.text.fontSize;})
        .attr("text-anchor", function (d) {return d.text.textAnchor;})   
        .text(function (d) {return d.text.text;});
    
    var label = d3.select("#" + DEFAULT_IDS.SVG_GROUP.LABEL).selectAll(SVG_TEXT)
        .data(json, function (d) {return d.id;});
        
    label.enter().append(SVG_TEXT)
        .attr("id", function (d) {return DEFAULT_IDS.SVG_ELEMENT.LABEL + d.id;})
    label.transition()
        .duration(duration)
        .attr("class", function (d) {return d.label.class;})
        .attr("x", function (d) {return d.label.x;})
        .attr("y", function (d) {return d.label.y;})
        .text(function (d) { return d.label.text; });
    
    for(var key in this.edgeList){
      this.edgeList[key].draw(duration);
    }
  }
  
  /**
    * Remove this object from the screen.
    *
    * @param {!Number=} dur : the duration in miliseconds of this animation.
    */
  this.remove = function (duration) {
    if(duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
    
    var shape = d3.select("#" + DEFAULT_IDS.SVG_GROUP.SHAPE).selectAll(SVG_CIRCLE)
        .data(json, function (d) {return d.id;});
    
    shape.transition()
        .duration(duration)
        .remove();
    
    var text = d3.select("#" + DEFAULT_IDS.SVG_GROUP.TEXT).selectAll(SVG_TEXT)
        .data(json, function (d) {return d.id;});
        
    text.transition()
        .duration(duration)
        .remove();
    
    var label = d3.select("#" + DEFAULT_IDS.SVG_GROUP.LABEL).selectAll(SVG_TEXT)
        .data(json, function (d) {return d.id;});
        
    label.transition()
        .duration(duration)
        .remove();
    
    for (var key in this.edgeList) {
      this.edgeList[key].remove(duration); 
    }
  }
  
  /**
    * This function should be called when creating a new state. This function will clone this entire object,
    * returning a new instance, without the references, allowing the animation to happen step by step.
    */
  this.cloneObject = function () {
    var clone = new CircleObject(this.coreObj);
    clone.cloneProperties(this.propObj);
    clone.cloneEdges(this.edgeList);
    
    return clone;
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the properties
    * from the orignal object, without the references, allowing the animation to happen step by step.
    *
    * @param {!propObj} prop : a propObj from the Object to be cloned.
    */
  this.cloneProperties = function (prop) {
    this.propObj = clone(prop);
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the edges
    * from the orignal object, without the references, allowing the animationg to happen step by step.
    *
    * @param {!edgeList} edges : the edgeList[] from the Object to be cloned.
    */
  this.cloneEdges = function (edges) {
    var newList = [];
    var clone;
    
    for (var key in edges) {
      clone = new EdgeObject(this.coreObj);
      clone.cloneProperties(edges[key].getAttributes());
      
      newList[key] = clone;
    }
    
    this.edgeList = newList;
  }
  
  /**
    * When in the Learning Mode, objects on the screen classified as valid targets will have place holders. This function creates them.
    * When clicked, the place holder will apply the changes according to the UserObject who created them:
    *     -If it was a VALUE UserObject, this object will have its inner text changed to the same inner text as the UserObject.
    *     -If it was a MOVEMENT UserObject (user for edges), the binded edge tip will be moved to this object. 
    *
    * @param {!Bool=} allowSwap: if true this object's text will be swapped with the active UserObject's text (only for VALUE type UserObject).
    */
  this.createPlaceHolder = function (allowSwap, updateShapeValue, updateTextSource) {
    d3.select("#" + DEFAULT_IDS.SVG_GROUP.SHAPE)
        .append(SVG_CIRCLE)
        .attr("class", DEFAULT_CLASSES.LEARNING_MODE.PLACE_HOLDER)
        .attr("cx", this.propObj.shape.cx)
        .attr("cy", this.propObj.shape.cy)
        .attr("r", 10)
        .on("click", function (d) {
          var activeObject = self.coreObj.getActiveUserObject();
          var activeObjectText = activeObject.getText();
          
          if (activeObject.getType() == USER_OBJ_TYPE.VALUE) {
            if (allowSwap == true) {
              activeObject.setText(self.propObj.text.text);
              activeObject.redraw();
            }
            
            self.propObj.text.text = activeObjectText;
            self.draw();
          } else if (activeObject.getType() == USER_OBJ_TYPE.MOVEMENT) {
            var edge = self.coreObj.getUserObjectBindedItem(activeObject.getBindedObjID());
            
            edge.setIdObjectB(self.propObj.id);
            edge.draw();
            
            if (updateShapeValue == true) {
              if (updateTextSource == USER_TEXT_SOURCE.TEXT) {
                self.coreObj.objectList[edge.getIdObjectA()].setText(self.propObj.text.text);
              } else if (updateTextSource == USER_TEXT_SOURCE.LABEL) {
                self.coreObj.objectList[edge.getIdObjectA()].setText(self.propObj.label.text); 
              }
              self.coreObj.objectList[edge.getIdObjectA()].draw();
            }
            
            activeObject.moveShape(edge.getCoordinateX2(), edge.getCoordinateY2());
            activeObject.redraw();
          }
          
          self.coreObj.setActiveUserObject();
          self.coreObj.removePlaceHolders();
        });
  }
}
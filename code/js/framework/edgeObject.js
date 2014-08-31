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
  * Defines a graphic edge.
  * The instance of this class contains all the attributes and methods regarding graphical changes to this object.
  *
  * @constructor
  *
  * @param {!CoreAnimObject} coreObj : instance of the CoreAnimObject class.
  * @param {!(String|Number)} id : the id of this object.
  * @param {!String} idObjectA : the id of the origin object.
  * @param {?String=} idObjectB : the id of the destination object. If null a small edge will be created following the orientation of the origin point.
  * @param {?String=} edgeClass : the CSS class of the line svg element.
  * @param {!Const} edgeType : a constant value (defined at 'animation/constant.js' : EDGE_TYPE) indicating wether the vertex is unidirectional (from A -> B), bidirectional or has no direction.
  * @param {?Const=} outboundPoint : a constant value (defined at 'animation/constant.js' : EDGE_POSITION) indicating from which point of the shape the edge will originate. If null the CENTER position will be used.
  * @param {?Const=} inboundPoint : a constant value (defined at 'animation/constant.js' : EDGE_POSITION) indicating at which point of the shape the edge will arrive. If null the CENTER position will be used.
  */
var EdgeObject = function (coreObj, id, idObjectA, idObjectB, edgeClass, edgeType, outboundPoint, inboundPoint) {
  var self = this;

  if (coreObj == null) {
    throw new Error("Invalid null parameter.");
    return;
  }

  /**
    * Local reference of CoreObject from the algorithm javascript file, used for interactions with other existing shapes
    */
  this.coreObj = coreObj;
  
  /**
    * This object map of attributes.
    *
    */
  this.propObj = {
    "id": id,
    
    "idObjectA": idObjectA,
    
    "idObjectB": idObjectB,
    
    "type": edgeType,
    
    "outboundPoint": outboundPoint != null ? outboundPoint : EDGE_POSITION.CENTER,
    
    "inboundPoint": inboundPoint != null ? inboundPoint : EDGE_POSITION.CENTER,
    
    "markerStart": idObjectB != null ? defaultProperties.marker.start.default : defaultProperties.marker.start.null,
    
    "markerEnd": idObjectB != null ? defaultProperties.marker.end.default : defaultProperties.marker.end.null,
    
    "edge": {
      "class": edgeClass,
      "x1": null,
      "y1": null,
      "x2": null,
      "y2": null,
      "stroke": idObjectB != null ? defaultProperties.edge.stroke.default : defaultProperties.edge.stroke.null,
      "strokeWidth": idObjectB != null ? defaultProperties.edge["stroke-width"].default : defaultProperties.edge["stroke-width"].null
    }
  }

  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function () {
    return this.propObj;
  }
  
  /**
    * @return {(String|Number)} : the id of this object.
    */
  this.getID = function () {
    return this.propObj.id;
  }
  
  /**
    * @return {(String|Number)} : the id of ObjectA binded to this edge.
    */
  this.getIdObjectA = function () {
    return this.propObj.idObjectA;
  }
  
  /**
    * Set the id of the object that is the origin of the edge.
    *
    * @param {!(String|Number)} newID : the id of the new origin.
    */
  this.setIdObjectA = function (newID) {
    if (newID == null) return;
    // TEST THIS
    if (typeof this.coreObj.objectList[newID] == 'undefined') return;

    this.coreObj.updateEdgeList(this.propObj.idObjectA, newID, this.propObj.id);
    this.propObj.idObjectA = newID;
    
    this.calculatePath();
  }
  
  /**
    * @return {(String|Number)} : the id of ObjectB binded to this edge.
    */
  this.getIdObjectB = function () {
    return this.propObj.idObjectB;
  }
  
  /**
    * Set the id of the object that is the origin of the edge.
    * The aspect of the edge will be changed according to the parameter sent:
    *   -If null it will be red;
    *   -If not null it will be black;
    *
    * @param {(String|Number)} newID : the id of the new origin.
    */
  this.setIdObjectB = function (newID) {
    this.propObj.idObjectB = newID;
    
    if (newID == null) {
      this.propObj.edge.stroke = defaultProperties.edge.stroke.null;
      this.propObj.edge.strokeWidth = defaultProperties.edge["stroke-width"].null;
      this.propObj.markerEnd = defaultProperties.marker.end.null;
    } else {
      this.propObj.edge.stroke = defaultProperties.edge.stroke.default;
      this.propObj.edge.strokeWidth = defaultProperties.edge["stroke-width"].default;
      this.propObj.markerEnd = defaultProperties.marker.end.default;
    }
    
    this.calculatePath();
  }
  
  /**
    * @return {Const} : the type of the edge (defined at 'animation/constant.js' : EDGE_TYPE).
    */
  this.getType = function () {
    return this.propObj.type;
  }
  
  /**
    * Set the type of the edge
    *
    * @param {!Const} newType : the new value of the type (defined at 'animation/constant.js' : EDGE_TYPE.
    */
  this.setType = function (newType) {
    if (newType == null) return;
    this.propObj.type = newType;
  }
  
  /**
    * Set from which point of the object the edge will originate.
    *
    * @param {!Const} newValue : a constant value (defined at 'animation/constant.js'), EDGE_POSITION.
    */
  this.setOutboundPoint = function (newValue) {
    if (newValue == null) return;
    this.propObj.outboundPoint = newValue;
  }
  
  /**
    * @return {Const} : the outboundPoint property.
    */ 
  this.getOutboundPoint = function () {
    return this.propObj.outboundPoint;
  }
  
  /**
    * Set at which point of the object the edge will arrive.
    *
    * @param {!Const} newValue : a constant value (defined at 'animation/constant.js'), EDGE_POSITION.
    */
  this.setInboundPoint = function (newValue) {
    if (newValue == null) return;
    this.propObj.inboundPoint = newValue;
  }
  
  /**
    * @return {Const} : the inboundPoint property.
    */ 
  this.getInboundPoint = function () {
    return this.propObj.inboundPoint;
  }
  
  /**
    * Set the marker of the start of the edge.
    *
    * @param {!Const} newMarker : the new value of the marker (defined at 'animation/constant.js' : defaultProperties.marker).
    */
  this.setMarkerStart = function (newMarker) {
    if (newMarker == null) return;
    this.propObj.markerStart = newMarker;
  }
  
  /**
    * Set the marker of the end of the edge.
    *
    * @param {!Const} newMarker : the new value of the marker (defined at 'animation/constant.js' : defaultProperties.marker).
    */
  this.setMarkerEnd = function (newMarker) {
    if (newMarker == null) return;
    this.propObj.markerEnd = newMarker;
  }
  
  /**
    * Set the CSS class of the line svg element.
    *
    * @param {?String=} newClass : the new CSS class.
    */
  this.setEdgeClass = function (newClass) {
    this.propObj.edge.class = newClass;
  }
  
  /**
    * @return {Number} : the x1 coordinate of the line svg element.
    */
  this.getCoordinateX1 = function () {
    return this.propObj.edge.x1;
  }
  
  /**
    * @return {Number} : the y1 coordinate of the line svg element.
    */
  this.getCoordinateY1 = function () {
    return this.propObj.edge.y1;
  }  
  
  /**
    * @return {Number} : the x2 coordinate of the line svg element.
    */
  this.getCoordinateX2 = function () {
    return this.propObj.edge.x2;
  }
  
  /**
    * @return {Number} : the y2 coordinate of the line svg element.
    */
  this.getCoordinateY2 = function () {
    return this.propObj.edge.y2;
  }

  /**
    * Set the stroke color of the line svg element.
    *
    * @param {!String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function (newStroke) {
    if(newStroke == null) return;
    this.propObj.edge.stroke = newStroke;
  }
  
  /**
    * Set the stroke width of the line svg element.
    *
    * @param {!Number} newStrokeWidth : the new stroke width value.
    */
  this.setStrokeWidth = function (newStrokeWidth) {
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    this.propObj.edge.strokeWidth = newStrokeWidth;
  }
  
  /**
    * Update the coordinates of this path, based on the movement of the objects it is binded to.
    *
    * @param {Boolean=} isClone : if true, it won't remove the adjustments made by repositionDAG. Should only be true when calling cloning this object.
    */
  this.calculatePath = function (isClone) {
    var point;
    
    try {
      this.propObj.edge.x1 = this.coreObj.objectList[this.propObj.idObjectA].getEdgeCoordinateX(this.getOutboundPoint());
      this.propObj.edge.y1 = this.coreObj.objectList[this.propObj.idObjectA].getEdgeCoordinateY(this.getOutboundPoint());

      if (this.propObj.idObjectB != null) {
        this.propObj.edge.x2 = this.coreObj.objectList[this.propObj.idObjectB].getEdgeCoordinateX(this.getInboundPoint());
        this.propObj.edge.y2 = this.coreObj.objectList[this.propObj.idObjectB].getEdgeCoordinateY(this.getInboundPoint());
      } else {
        if (!isClone) {
          point = this.getOutboundPoint();

          if (point == EDGE_POSITION.CENTER) {
            this.propObj.edge.x2 = this.propObj.edge.x1;
            this.propObj.edge.y2 = this.propObj.edge.y1 + 45;
          } else if (point == EDGE_POSITION.BOTTOM) {
            this.propObj.edge.x2 = this.propObj.edge.x1;
            this.propObj.edge.y2 = this.propObj.edge.y1 + 25;
          } else if (point == EDGE_POSITION.RIGHT) {
            this.propObj.edge.x2 = this.propObj.edge.x1 + 25;
            this.propObj.edge.y2 = this.propObj.edge.y1;
          } else if (point == EDGE_POSITION.TOP) {
            this.propObj.edge.x2 = this.propObj.edge.x1;
            this.propObj.edge.y2 = this.propObj.edge.y1 - 25;
          } else if (point == EDGE_POSITION.LEFT) {
            this.propObj.edge.x2 = this.propObj.edge.x1 - 25;
            this.propObj.edge.y2 = this.propObj.edge.y1;
          }
        }
      }
    } catch (err) {}
  }
  
  /**
    * Add offsets to the position of the shape this edge is pointing to. This function only works for Directed acyclic graph.
    *
    * @param {!Number} x : the x coordinate of who called this.
    * @param {!Number} y : the y coordinate of who called this.
    * @param {!Number} side : left offset (-1), right offset (1) or middle (0), with parent as reference.
    * @param {?Number} adjustLeft : offset to left side.
    * @param {?Number} adjustRight : offset to right side.
    * @param {!Const=} orientation : to where the graph is heading (const defined at 'animation/constant.js' : EDGE_POSITION).
    */
  this.repositionDAG = function (x, y, side, adjustLeft, adjustRight, orientation) {
    var edgeX = this.propObj.edge.x2;
    var edgeY = this.propObj.edge.y2;
    
    if (orientation == ORIENTATION.TOP) {
      if (side == -1) {
        edgeX = x - adjustLeft;
        x = x - adjustLeft;
      } else if (side == 1) {
        edgeX = x + adjustRight;
        x = x + adjustRight;
      }
      y = y - SHAPE_POSITION.DISTANCE;
    } else if (orientation == ORIENTATION.LEFT) {
      if (side == -1) {
        edgeY = y - adjustLeft;
        y = y - adjustLeft;
      } else if (side == 1) {
        edgeY = y + adjustRight;
        y = y + adjustRight;
      }
      x = x - SHAPE_POSITION.DISTANCE;
    } else if (orientation == ORIENTATION.BOTTOM) {
      if (side == -1) {
        edgeX = x - adjustLeft;
        x = x - adjustLeft;
      } else if (side == 1) {
        edgeX = x + adjustRight;
        x = x + adjustRight;
      }
      y = y + SHAPE_POSITION.DISTANCE;
    } else if (orientation == ORIENTATION.RIGHT) {
      if (side == -1) {
        edgeY = y + adjustLeft;
        y = y + adjustLeft;
      } else if (side == 1) {
        edgeY = y - adjustRight;
        y = y - adjustRight;
      }
      x = x + SHAPE_POSITION.DISTANCE;
    }

    if (this.propObj.idObjectB != null) {
      this.coreObj.objectList[this.propObj.idObjectB].repositionDAG(x, y, side, orientation);
    } else {
      this.propObj.edge.x2 = edgeX;
      this.propObj.edge.y2 = edgeY;
    }
  }
  
  /**
    * Draw this object attributes on the screen.
    * If the object is new, it will be generated; if any property has changed, it will be updated.
    *
    * @param {!Number=} duration : the duration in miliseconds of this animation.
    */
  this.draw = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
  
    var edge = d3.select("#" + DEFAULT_IDS.SVG_GROUP.EDGE).selectAll(SVG_LINE)
        .data(json, function (d) {return d.id;});
      
    edge.enter().append(SVG_LINE)        
        .attr("id", function (d) {return DEFAULT_IDS.SVG_ELEMENT.EDGE + d.id;});
    edge.transition()
        .duration(duration)
        .attr("class", function (d) {return d.edge.class;})
        .attr("x1", function (d) {return d.edge.x1;})
        .attr("y1", function (d) {return d.edge.y1;})
        .attr("x2", function (d) {return d.edge.x2;})
        .attr("y2", function (d) {return d.edge.y2;})
        .attr("marker-start", function (d) {
          if (d.type === EDGE_TYPE.BIDIRECTIONAL) return d.markerStart;
          return null;
        })
        .attr("marker-end", function (d) {
          if (d.type === EDGE_TYPE.UNDIRECTED) return null;
          if (d.type === EDGE_TYPE.UNIDIRECTIONAL || d.type === EDGE_TYPE.BIDIRECTIONAL) return d.markerEnd;
          return null;
        })
        .attr("stroke", function (d) {return d.edge.stroke;})
        .attr("stroke-width", function (d) {return d.edge.strokeWidth;});
  }
  
  /**
    * Remove this object from the screen.
    *
    * @param {!Number=} duration : the duration in miliseconds of this animation.
    */
  this.remove = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
    
    var edge = d3.select("#" + DEFAULT_IDS.SVG_GROUP.EDGE).selectAll(SVG_LINE)
        .data(json, function (d) {return d.id;});
    
    edge.transition()
        .duration(duration)
        .remove();
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the properties
    * from the orignal object, without the reference, allowing the animation to happen step by step.
    *
    * @param {!propObj} prop : a propObj from the Object to be cloned.
    */
  this.cloneProperties = function (prop) {
    this.propObj = clone(prop);
    this.calculatePath(true);
  }

  // CODE TO BE EXECUTED BY CONSTRUCTOR
  
  /**
    * Calculate the path when the object is created.
    */
  this.calculatePath();
}
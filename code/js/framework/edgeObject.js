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
  * @param {?Const=} typeObjCreated : a constant value (defined at 'animation/constant.js' : USER_TYPE_OBJ_CREATED) indicating which object should be created to insert a new value in the learning mode.
  */
var EdgeObject = function (coreObj, id, idObjectA, idObjectB, edgeClass, edgeType, outboundPoint, inboundPoint, typeObjCreated) {
  var self = this;

  if (coreObj == null) {
    throw new Error("Invalid null parameter.");
    return;
  }

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
    },
    
    "isValidTarget": false,
    
    "typeObjCreated": typeObjCreated
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
    * Update the coordinates of this path, based on the movement of the objects it is binded to.
    */
  this.calculatePath = function () {
    var point;
    
    try {
      this.propObj.edge.x1 = this.coreObj.objectList[this.propObj.idObjectA].getEdgeCoordinateX(this.getOutboundPoint());
      this.propObj.edge.y1 = this.coreObj.objectList[this.propObj.idObjectA].getEdgeCoordinateY(this.getOutboundPoint());

      if (this.propObj.idObjectB != null) {
        this.propObj.edge.x2 = this.coreObj.objectList[this.propObj.idObjectB].getEdgeCoordinateX(this.getInboundPoint());
        this.propObj.edge.y2 = this.coreObj.objectList[this.propObj.idObjectB].getEdgeCoordinateY(this.getInboundPoint());
      } else {
        point = this.getOutboundPoint();

        if (point == EDGE_POSITION.CENTER) {
          this.propObj.edge.x2 = this.propObj.edge.x1;
          this.propObj.edge.y2 = this.propObj.edge.y1 + 35;
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
    } catch (err) {}
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
        .style("stroke", function (d) {return d.edge.stroke;})
        .style("stroke-width", function (d) {return d.edge.strokeWidth;});
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
    this.calculatePath();
  }
  
  /**
    * When in the Learning Mode, objects on the screen classified as valid targets will have place holders. This function creates them.
    * When clicked, the place holder will apply the changes according to the UserObject who created them:
    *     -If it was a VALUE UserObject, a new object will be created at the end of this edge.
    *     -If it was a MOVEMENT UserObject nothing will happen. 
    */
  this.createPlaceHolder = function () {
    d3.select("#" + DEFAULT_IDS.SVG_GROUP.SHAPE)
        .append(SVG_CIRCLE)
        .attr("class", DEFAULT_CLASSES.LEARNING_MODE.PLACE_HOLDER)
        .attr("cx", self.getCoordinateX2())
        .attr("cy", self.getCoordinateY2())
        .attr("r", 10)
        .on("click", function (d) {
          var activeObject = self.coreObj.getActiveUserObject();
          var activeObjectText = activeObject.getText();
          var newObj = {
            drawing: null,
            edge1: null,
            edge2: null
          };
          
          if (activeObject.getType() == USER_OBJ_TYPE.VALUE) {
            if (self.propObj.typeObjCreated == USER_TYPE_OBJ_CREATED.SQUARE_EDGE_0) {


            } else if (self.propObj.typeObjCreated == USER_TYPE_OBJ_CREATED.SQUARE_EDGE_1) {
              newObj.drawing = new SquareObject(self.coreObj, DEFAULT_IDS.SVG_ELEMENT.USER_NEW_OBJ, self.getCoordinateX2(), self.getCoordinateY2() - 25, activeObjectText, null, null, null, null);
              newObj.edge1 = new EdgeObject(self.coreObj, DEFAULT_IDS.SVG_ELEMENT.USER_NEW_OBJ, newObj.drawing.getID(), null, null, self.getType(), self.getOutboundPoint(), self.getInboundPoint(), null);
            } else if (self.propObj.typeObjCreated == USER_TYPE_OBJ_CREATED.CIRCLE_EDGE_0) {

            } else if (self.propObj.typeObjCreated == USER_TYPE_OBJ_CREATED.CIRCLE_EDGE_1) {

            } else if (self.propObj.typeObjCreated == USER_TYPE_OBJ_CREATED.CIRCLE_EDGE_2) {

            }
            
            newObj.drawing.draw();
            if (newObj.edge1 != null) newObj.edge1.draw();
            if (newObj.edge2 != null) newObj.edge2.draw();
            
            activeObject.setText();
            activeObject.redraw();
            
            self.setIdObjectB(newObj.drawing.getID());
            self.draw();
          }
          
          self.coreObj.setActiveUserObject();
          self.coreObj.removePlaceHolders();
        });
  }

  // CODE TO BE EXECUTED BY CONSTRUCTOR
  
  /**
    * Calculate the path when the object is created.
    */
  this.calculatePath();
}
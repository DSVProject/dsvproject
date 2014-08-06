// Default properties are defined on 'animation/constant.js'

/**
  * Defines a square graphic unit.
  * The instance of this class contains all the attributes and methods regarding graphical changes to this object.
  *
  * @constructor
  *
  * @param {CoreAnimObject} coreObj : instance of the CoreAnimObject class.
  * @param {String|Number} id : the id of this object.
  * @param {Number} cx : the cx coordinate of this object inside the svg element.
  * @param {Number} cy : the cy coordinate of this object inside the svg element.
  * @param {String} text : the inner text of this object, that will be displayed on the screen.
  * @param {String} label : the beneath text of this object, that will be displayed on the screen.
  * @param {String} shapeClass : the CSS class of the rect svg element.
  * @param {String} textClass : the CSS class of the text svg element (inside the shape).
  * @param {String} labelClass : the CSS class of the text svg element (underneath the shape).
  * @param {Const=} outgoingPoint : a constant value (defined at 'animation/constant.js') indicating from which point of the shape the edge will originate.
  * @param {Const=} incomingPoint : a constant value (defined at 'animation/constant.js') indicating at which point of the shape the edge will arrive.
  */
var CircleObject = function (coreObj, id, cx, cy, radius, text, label, shapeClass, textClass, labelClass, outgoingPoint, incomingPoint) {
  var self = this;
  this.coreObj = coreObj;
  
  this.textAdjust = defaultProperties["font-size"]/3;
  this.labelAdjust = defaultProperties.radius + 30;

  /**
    * This object map of attributes.
    *
    */
  this.propObj = {
    "id": id,
    
    "shape": {
      "class": shapeClass,
      "cx": cx,
      "cy": cy,
      "r": radius,
      "fill": defaultProperties.shape.default.fill,
      "fillOpacity": defaultProperties.shape.default["fill-opacity"],
      "stroke": defaultProperties.shape.default.stroke,
      "strokeWidth": defaultProperties.shape.default["stroke-width"]
    },

    "text": {
      "class": textClass,
      "x": cx,
      "y": cy + this.textAdjust,
      "fill": defaultProperties.text.default.stroke,
      "fontFamily": defaultProperties["font-family"],
      "fontWeight": defaultProperties["font-weight"],
      "fontSize": defaultProperties["font-size"],
      "textAnchor": defaultProperties["text-anchor"],
      "text": text
    },
    
    "label": {
      "class": labelClass,
      "x": cx + this.textAdjust,
      "y": cy + this.labelAdjust,
      "text": label
    },
    
    "toRemove": false,
    
    "isValidTarget": false,
    
    "outgoingPoint": (outgoingPoint != null) ? outgoingPoint : EDGE_POSITION.CENTER,
    
    "incomingPoint": (incomingPoint != null) ? incomingPoint : EDGE_POSITION.CENTER
  }
  
  this.edgeList = {};
  
  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function () {
    return this.propObj;
  }
  
  /**
    * @return {Array} : the edges of the current object.
    */
  this.getEdges = function () {
    return this.edgeList;
  }
  
  /**
    * @return {String|Number} : the id of this object.
    */
  this.getID = function () {
    return this.propObj.id;
  }
  
  /**
    * Set the CSS class of the circle svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setShapeClass = function (newClass) {
    this.propObj.shape.class = newClass;
  }
  
  /**
    * @return {String} : the class of the circle svg element.
    */
  this.getShapeClass = function () {
    return this.propObj.shape.class;
  }
  
  /**
    * Move this object from its current position to a new position.
    *
    * @param {Number} x : the destination x coordinate.
    * @param {Number} y : the destination y coordinate.
    */
  this.moveShape = function (cx, cy) {
    if(cx == null || cy == null || isNaN(cx) || isNaN(cy)) return;
  
    this.propObj.shape.cx = cx;
    this.propObj.shape.cy = cy;

    this.propObj.text.x = cx;
    this.propObj.text.y = cy + this.textAdjust;
    
    this.propObj.label.x = cx;
    this.propObj.label.y = cy + this.labelAdjust;
  }
  
  /**
    * @return {Number} : the cx coordinate of the circle svg element.
    */
  this.getCoordinateCX = function () {
    return this.propObj.shape.cx;
  }
  
  /**
    * @return {Number} : the x coordinate of the svg element, with offset adjust (for edge use).
    */
  this.getEdgeCoordinateX = function (inout) {
    var coord = this.propObj.shape.cx;
    var point = (inout == EDGE_INOUT.INCOMING) ? this.propObj.incomingPoint : this.propObj.outgoingPoint;
    
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
    * @return {Number} : the y coordinate of the svg element, with offset adjust (for edge use).
    */
  this.getEdgeCoordinateY = function (inout) {
    var coord = this.propObj.shape.cy;
    var point = (inout == EDGE_INOUT.INCOMING) ? this.propObj.incomingPoint : this.propObj.outgoingPoint;
    
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
    * Set the radius of the circle svg element.
    *
    * @param {Number} newRadius : the new radius.
    */
  this.setRadius = function (newRadius) {
    if (newRadius == null || isNaN(newRadius)) return;
    this.propObj.shape.r = newRadius;
  }
  
  /**
    * @return {Number} : the radius of the circle svg element.
    */
  this.getRadius = function () {
    return this.propObj.shape.radius;
  }
  
  /**
    * Set the fill color of the circle svg element.
    *
    * @param {String} newFill : the new CSS or svg color.
    */
  this.setFill = function (newFill) {
    if(newFill == null) return;
    this.propObj.shape.fill = newFill;
  }
  
  /**
    * Set the fill opacity of the circle svg element.
    *
    * @param {Number} newOpacity : the new opacity value.
    */
  this.setFillOpacity = function (newOpacity) {
    if(newOpacity == null || isNaN(newOpacity)) return;
    if(newOpacity < 0) newOpacity = 0.0;
    
    this.propObj.shape.fillOpacity = newOpacity;
  }
  
  /**
    * Set the stroke color of the circle svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function (newStroke) {
    this.propObj.shape.stroke = newStroke;
  }
  
  /**
    * Set the stroke width of the circle svg element.
    *
    * @param {Number} newOpacity : the new stroke width value.
    */
  this.setStrokeWidth = function (newStrokeWidth) {
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    this.propObj.shape.strokeWidth = newStrokeWidth;
  }
  
  /**
    * Set the text of the text svg element.
    *
    * @param {String} newText : the new text.
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
    * Set the label of the text svg element (beneath the object).
    *
    * @param {String} newLabel : the new label.
    */
  this.setLabel = function (newLabel) {
    this.propObj.label.text = newLabel;
  }
  
  /**
    * Set the text color of the text svg element.
    *
    * @param {String} newColor : the new CSS or svg color.
    */
  this.setFontColor = function (newColor) {
    this.propObj.text.fill = newColor;
  }
  
  /**
    * Set this object to be removed on the next iteration.
    *
    * @param {Boolean} bool : if true, the object will be removed.
    */
  this.setToRemove = function (bool) {
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
    * @param {Boolean} bool : if true, the object will be a valid target.
    */
  this.setIsValidTarget = function (bool) {
    this.propObj.isValidTarget = bool;
  }
  
  /**
    * @return {Boolean} : the isValidTarget property.
    */ 
  this.getIsValidTarget = function () {
    return this.propObj.isValidTarget;
  }
  
  /**
    * Set from which point of the object the edge will originate.
    *
    * @param {Const} newValue : a constant value (defined at 'animation/constant.js'), EDGE_POSITION.
    */
  this.setOutgoingPoint = function (newValue) {
    this.propObj.outgoingPoint = newValue;
  }
  
  /**
    * @return {Const} : the outgoingPoint property.
    */ 
  this.getOutgoingPoint = function () {
    return this.propObj.outgoingPoint;
  }
  
  /**
    * Set at which point of the object the edge will arrive.
    *
    * @param {Const} newValue : a constant value (defined at 'animation/constant.js'), EDGE_POSITION.
    */
  this.setIncomingPoint = function (newValue) {
    this.propObj.incomingPoint = newValue;
  }
  
  /**
    * Add an EdgeObject to this object edgeList.
    *
    * @param {EdgeObject} edgeObj : the instance of the EdgeObject.
    */
  this.addEdge = function (edgeObj) {
    this.edgeList[edgeObj.getID()] = edgeObj;
  }

  /**
    * Draw this object properties on the screen.
    * If the object is new, it will appear; if any property has changed, it will be updated.
    *
    * @param {Number} dur : the duration in miliseconds of this animation.
    */
  this.draw = function (dur) {    
    if(dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
    
    var shape = d3.select("#g-shape").selectAll(SVG_CIRCLE)
        .data(json, function (d) {return d.id;});
      
    shape.enter().append(SVG_CIRCLE)        
        .attr("id", function (d) {return "u-shape-" + d.id;});
    shape.transition()
        .duration(dur)
        .attr("class", function (d) {return d.shape.class;})
        .attr("cx", function (d) {return d.shape.cx;})
        .attr("cy", function (d) {return d.shape.cy;})
        .attr("r", function (d) {return d.shape.r;})
        .attr("fill", function (d) {return d.shape.fill;})
        .attr("fill-opacity", function (d) {return d.shape.fillOpacity;})
        .attr("stroke", function (d) {return d.shape.stroke;})
        .attr("stroke-width", function (d) {return d.shape.strokeWidth;});
      
    var text = d3.select("#g-text").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    text.enter().append("text")
        .attr("id", function (d) {return "u-text-" + d.id; });
    text.transition()
        .duration(dur)
        .attr("class", function (d) {return d.text.class})
        .attr("x", function (d) {return d.text.x;})
        .attr("y", function (d) {return d.text.y;})
        .attr("fill", function (d) {return d.text.fill;})
        .attr("font-family", function (d) {return d.text.fontFamily;})
        .attr("font-weigh", function (d) {return d.text.fontWeight;})
        .attr("font-size", function (d) {return d.text.fontSize;})
        .attr("text-anchor", function (d) {return d.text.textAnchor;})   
        .text(function (d) {return d.text.text;});
    
    var label = d3.select("#g-label").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    label.enter().append("text")
        .attr("id", function (d) {return "label-" + d.id;})
    label.transition()
        .attr("class", function (d) {return d.label.class;})
        .attr("x", function (d) {return d.label.x;})
        .attr("y", function (d) {return d.label.y;})
        .text(function (d) { return d.label.text; });
    
    for(var key in this.edgeList){
      this.edgeList[key].draw(dur);
    }
  }
  
  /**
    * Remove this object from the screen.
    *
    * @param {Number} dur : the duration in miliseconds of this animation.
    */
  this.remove = function (dur) {
    if(dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
    
    var shape = d3.select("#g-shape").selectAll(SVG_CIRCLE)
        .data(json, function (d) {return d.id;});
    
    shape.transition()
        .duration(dur)
        .remove();
    
    var text = d3.select("#g-text").selectAll(SVG_TEXT)
        .data(json, function (d) {return d.id;});
        
    text.transition()
        .duration(dur)
        .remove();
    
    for (var key in this.edgeList) {
      this.edgeList[key].remove(dur); 
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
    * @param {propObj} prop : a propObj from the Object to be cloned.
    */
  this.cloneProperties = function (prop) {
    this.propObj = clone(prop);
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the edges
    * from the orignal object, without the references, allowing the animationg to happen step by step.
    *
    * @param {edgeList} edges : the edgeList{} from the Object to be cloned.
    */
  this.cloneEdges = function (edges) {
    var newList = [];
    var clone;
    
    for (var key in edges) {
      clone = new EdgeObject();
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
    * @param {Bool} allowSwap: if true this object's text will be swapped with the active UserObject's text (only for VALUE UserObject).
    */
  this.createPlaceHolder = function (allowSwap) {
    d3.select("#g-shape")
        .append(SVG_CIRCLE)
        .attr("class", "placeHolder")
        .attr("cx", this.propObj.shape.cx)
        .attr("cy", this.propObj.shape.cy)
        .attr("r", 10)
        .on("click", function (d) {
          var activeObject = self.coreObj.getActiveUserObject();
          var activeObjectText = activeObject.getText();
          
          if (activeObject.getType() == USER_OBJ_TYPE.VALUE) {
            if (allowSwap == true) {
              activeObject.setText(self.propObj.text.text);
              activeObject.draw();
            }
            
            self.propObj.text.text = activeObjectText;
            self.draw();
          } else if (activeObject.getType() == USER_OBJ_TYPE.MOVEMENT) {
            var edge = self.coreObj.getUserObjectBindedItem(activeObject.getBindedObjID());

            edge.setIdObjectB(self.propObj.id);
            edge.draw();
            
            activeObject.moveShape(edge.getCoordinateX2(), edge.getCoordinateY2());
            
            d3.select("#u-shape-" + activeObject.getID())
                .transition()
                .duration(DEFAULT_ANIMATION_DURATION)
                .attr("cx", edge.getCoordinateX2())
                .attr("cy", edge.getCoordinateY2());
          }
          
          self.coreObj.setActiveUserObject();
          self.coreObj.removePlaceHolders();
        });
  }
}
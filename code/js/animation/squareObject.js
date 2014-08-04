// Default properties are defined on 'animation/constant.js'

/**
  * Defines a square graphic unit.
  * This 'class' will hold all the properties and methods regarding this single unit. 
  * @constructor
  *
  * @param {coreAnimObject} coreObj : instance of the class coreAnimObject.
  * @param {String|Number} id : the id of this object.
  * @param {Number} x : the x coordinate of this object on the screen.
  * @param {Number} y : the y coordinate of this object on the screen.
  * @param {String} text : the inner text of this object, that will be displayed on the screen.
  * @param {String} label : the underneath text of this object, that will be displayed on the screen.
  * @param {String} shapeClass : the CSS class of the rect svg element.
  * @param {String} textClass : the CSS class of the text svg element (inside the shape).
  * @param {String} labelClass : the CSS class of the text svg element (beneath the shape).
  * @param {Const=} outgoingPoint : a constant value (defined at 'animation/constant.js') indicating from which point of the shape the edge will originate.
  * @param {Const=} incomingPoint : a constant value (defined at 'animation/constant.js') indicating at which point of the shape the edge will arrive.
  *
  */
var SquareObject = function (coreObj, id, x, y, text, label, shapeClass, textClass, labelClass, outgoingPoint, incomingPoint) {
  var self = this;
  this.coreObj = coreObj;
  
  this.textAdjustX = defaultProperties.width/2;
  this.textAdjustY = defaultProperties.height/1.75;
  this.labelAdjustY = defaultProperties.height + 30;
  
  this.propObj = {
    "id": id,
    
    "shape": {
      "class": shapeClass,
      "x": x,
      "y": y,
      "width": defaultProperties.width,
      "height": defaultProperties.height,
      "fill": defaultProperties.shape.default.fill,
      "fillOpacity": defaultProperties.shape.default["fill-opacity"],
      "stroke": defaultProperties.shape.default.stroke,
      "strokeWidth": defaultProperties.shape.default["stroke-width"]
    },

    "text": {
      "class": textClass,
      "x": x + this.textAdjustX,
      "y": y + this.textAdjustY,
      "fill": defaultProperties.text.default.stroke,
      "fontFamily": defaultProperties["font-family"],
      "fontWeight": defaultProperties["font-weight"],
      "fontSize": defaultProperties["font-size"],
      "textAnchor": defaultProperties["text-anchor"],
      "text": text
    },
    
    "label": {
      "class": labelClass,
      "x": x + this.textAdjustX,
      "y": y + this.labelAdjustY,
      "text": label
    },
    
    "toRemove": false,
    
    "isValidTarget": false,
    
    "outgoingPoint": (outgoingPoint != null) ? outgoingPoint : EDGE_POSITION.CENTER,
    
    "incomingPoint": (incomingPoint != null) ? incomingPoint : EDGE_POSITION.CENTER
  }
  
  this.edgeList = [];
  
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
    * @return {String || Number} : the id of this object.
    */
  this.getID = function () {
    return this.propObj.id;
  }
  
  /**
    * Set the CSS class of the rect svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setShapeClass = function(newClass){
    this.propObj.shape.class = newClass;
  }
  
  /**
    * @return {String} : the class of the rect svg element.
    */
  this.getShapeClass = function () {
    return this.propObj.shape.class;
  }
  
  /**
    * @return {Number} : the x coordinate of the rect svg element.
    */
  this.getCoordinateX = function () {
    return this.propObj.shape.x;
  }
  
  /**
    * @return {Number} : the x coordinate of the svg element, with offset adjust (for edge use).
    */
  this.getEdgeCoordinateX = function (inout) {
    var coord = this.propObj.shape.x;
    var point = (inout == EDGE_INOUT.INCOMING) ? this.propObj.incomingPoint : this.propObj.outgoingPoint;
    
    if (point == EDGE_POSITION.RIGHT) {
      return coord + this.propObj.shape.width;
    } else if (point == EDGE_POSITION.LEFT) { 
      return coord;
    } else { // TOP, CENTER OR BOTTOM
      return coord + (this.propObj.shape.width/2);
    }
  }
  
  /**
    * @return {Number} : the y coordinate of the rect svg element.
    */
  this.getCoordinateY = function () {
    return this.propObj.shape.y;
  }
  
  /**
    * @return {Number} : the y coordinate of the svg element, with offset adjust (for edge use).
    */
  this.getEdgeCoordinateY = function (inout) {
    var coord = this.propObj.shape.y;
    var point = (inout == EDGE_INOUT.INCOMING) ? this.propObj.incomingPoint : this.propObj.outgoingPoint;
    
    if (point == EDGE_POSITION.TOP) {
      return coord;
    } else if (point == EDGE_POSITION.BOTTOM) { 
      if (this.propObj.label.text == null) {
        return coord + this.propObj.shape.height;
      } else {
        return coord + this.propObj.shape.height + 50;
      }
    } else { // LEFT, CENTER OR RIGHT
      return coord + (this.propObj.shape.height/2);
    }
  }
  
  /**
    * Set the width of the rect svg element.
    *
    * @param {Number} newWidth : the new width.
    */
  this.setWidth = function (newWidth) {
    if(newWidth == null || isNaN(newWidth)) return;
    this.propObj.shape.width = newWidth;
  }
  
  /**
    * @return {Number} : the width of the rect svg element.
    */
  this.getWidth = function () {
    return this.propObj.shape.width;
  }
  
  /**
    * Set the height of the rect svg element.
    *
    * @param {Number} newHeight : the new height.
    */
  this.setHeight = function (newHeight) {
    if(newHeight == null || isNaN(newHeight)) return;
    this.propObj.shape.height = newHeight;
  }
  
  /**
    * @return {Number} : the height of the rect svg element.
    */
  this.getHeight = function () {
    return this.propObj.shape.height;
  }
  
  /**
    * Set the fill color of the rect svg element.
    *
    * @param {String} newFill : the new CSS or svg color.
    */
  this.setFill = function (newFill) {
    if(newFill == null) return;
    this.propObj.shape.fill = newFill;
  }
  
  /**
    * Set the fill opacity of the rect svg element.
    *
    * @param {Number} newOpacity : the new opacity value.
    */
  this.setFillOpacity = function (newOpacity) {
    if(newOpacity == null || isNaN(newOpacity)) return;
    if(newOpacity < 0) newOpacity = 0.0;
    
    this.propObj.shape.fillOpacity = newOpacity;
  }
  
  /**
    * Set the stroke color of the rect svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function (newStroke) {
    this.propObj.shape.stroke = newStroke;
  }
  
  /**
    * Set the stroke width of the rect svg element.
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
    * Move this object from its current position to a new position.
    *
    * @param {Number} x : the destination x coordinate.
    * @param {Number} y : the destination y coordinate.
    */
  this.moveShape = function (x, y) {
    if(x == null || y == null || isNaN(x) || isNaN(y)) return;
  
    this.propObj.shape.x = x;
    this.propObj.shape.y = y;

    this.propObj.text.x = x + this.textAdjustX;
    this.propObj.text.y = y + this.textAdjustY;
    
    this.propObj.label.x = x + this.textAdjustX;
    this.propObj.label.y = y + this.labelAdjustY;
    
    /*
    for(var key in this.edgeList) {
      this.edgeList[key].calculatePath();
    }
    */
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
  
    var shape = d3.select("#g-shape").selectAll(SVG_RECT)
        .data(json, function (d) {return d.id;});
      
    shape.enter().append(SVG_RECT)        
        .attr("id", function (d) {return "shape-" + d.id;});
    shape.transition()
        .duration(dur)
        .attr("class", function (d) {return d.shape.class})
        .attr("x", function (d) {return d.shape.x;})
        .attr("y", function (d) {return d.shape.y;})
        .attr("height", function (d) {return d.shape.height;})
        .attr("width", function (d) {return d.shape.width;})
        .attr("fill", function (d) {return d.shape.fill;})
        .attr("fill-opacity", function (d) {return d.shape.fillOpacity;})
        .attr("stroke", function (d) {return d.shape.stroke;})
        .attr("stroke-width", function (d) {return d.shape.strokeWidth;});
     
    var label = d3.select("#g-label").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    label.enter().append("text")
        .attr("id", function (d) {return "label-" + d.id;})
    label.transition()
        .attr("class", function (d) {return d.label.class;})
        .attr("x", function (d) {return d.label.x;})
        .attr("y", function (d) {return d.label.y;})
        .text(function (d) { return d.label.text; });
      
    var text = d3.select("#g-text").selectAll("text")
        .data(json, function (d) {return d.id;});
        
    text.enter().append("text")
        .attr("id", function (d) {return "text-" + d.id; });
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
    
    var shape = d3.select("#g-shape").selectAll(SVG_RECT)
        .data(json, function (d) {return d.id;});
    
    shape.transition()
        .duration(dur)
        .remove();
    
    var label = d3.select("#g-label").selectAll(SVG_TEXT)
        .data(json, function (d) {return d.id;});
        
    label.transition()
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
    var clone = new SquareObject(this.coreObj);
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
      clone = new EdgeObject2(this.coreObj);
      clone.cloneProperties(edges[key].getAttributes());
      
      newList[key] = clone;
    }
    
    this.edgeList = newList;
  }
  
  this.createPlaceHolder = function () {
    d3.select("#g-shape")
        .append(SVG_CIRCLE)
        .attr("class", "placeHolder")
        .attr("cx", this.propObj.shape.x + this.textAdjustX)
        .attr("cy", this.propObj.shape.y + this.textAdjustY)
        .attr("r", 10)
        .on("click", function (d) {
          var activeObject = self.coreObj.getActiveUserObject();
          
          if (activeObject.getType() == USER_OBJ_TYPE.VALUE) {
            self.propObj.text.text = activeObject.getText();
            self.draw();
            //d3.select("#text-" + self.propObj.id).text(activeObject.getText());
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
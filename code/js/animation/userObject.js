// Default properties are defined on 'animation/constant.js'

/**
  * Defines a user graphic unit, used only for the learning mode.
  * The instance of this class contains all the attributes and methods regarding graphical changes to this object.
  *
  * @constructor
  *
  * @param {CoreAnimObject} coreObj : instance of the CoreAnimObject class.
  * @param {String|Number} id : the id of this object.
  * @param {Number} cx : the cx coordinate of this object inside the svg element.
  * @param {Number} cy : the cy coordinate of this object inside the svg element.
  * @param {String} text : the inner text of this object, that will be displayed on the screen.
  * @param {String} shapeClass : the CSS class of the rect svg element.
  * @param {String} textClass : the CSS class of the text svg element (inside the shape).
  * @param {Const} type : the type of this userObject (defined at 'animation/constant.js' : USER_OBJ_TYPE).
  * @param {Bool=} allowSwap: if this instance is a VALUE type object, this parameter should be passed. If true, this object's text will be swapped during the   *                           interactions.
  * @param {String|Number=} bindedObjID : if this instance is a MOVEMENT type object, it should be binded to another object.
  */
var UserObject = function (coreObj, id, cx, cy, radius, text, shapeClass, textClass, type, allowSwap, bindedObjID) {
  var self = this;
  this.coreObj = coreObj;
  
  this.textAdjust = defaultProperties["font-size"]/3;

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
    
    "toRemove": false,
    
    "isActive": false,
    
    "type": type,
    
    "allowSwap": allowSwap != null ? allowSwap : false,
    
    "bindedObjID": bindedObjID
  }
  
  this.edgeList = {};
  
  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function () {
    return this.propObj;
  }
  
  /**
    * @return {Array} : the edges of this object.
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
    * @param {Number} cx : the destination x coordinate.
    * @param {Number} cy : the destination y coordinate.
    */
  this.moveShape = function (cx, cy) {
    if(cx == null || cy == null || isNaN(cx) || isNaN(cy)) return;
  
    this.propObj.shape.cx = cx;
    this.propObj.shape.cy = cy;

    this.propObj.text.x = cx;
    this.propObj.text.y = cy + this.textAdjust;
  }
  
  /**
    * @return {Number} : the cx coordinate of the circle svg element.
    */
  this.getCoordinateCX = function () {
    return this.propObj.shape.cx;
  }
  
  /**
    * @return {Number} : the cy coordinate of the circle svg element.
    */
  this.getCoordinateCY = function () {
    return this.propObj.shape.cy;
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
    * Set this object as the one active for the learning mode interaction. Only one object shall be active at a time..
    *
    * @param {Boolean} bool : if true, the object is active.
    */
  this.setIsActive = function (bool) {
    this.propObj.isActive = bool;

    d3.select("#u-shape-" + this.propObj.id).classed("selected", bool);
  }
  
  /**
    * @return {Boolean} : the isActive property.
    */ 
  this.getIsActive = function () {
    return this.propObj.isActive;
  }
  
  /**
    * @return {Const} : the type property.
    */ 
  this.getType = function () {
    return this.propObj.type;
  }
  
  /**
    * @return {String|Number} : the bindedObjID property.
    */ 
  this.getBindedObjID = function () {
    return this.propObj.bindedObjID;
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
    * Draw this object attributes on the screen.
    * If the object is new, it will be generated; if any property has changed, it will be updated.
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
        .attr("id", function (d) {return "u-shape-" + d.id;})
        .on("click", function (d) {
          var activeObject = self.coreObj.getActiveUserObject();

          if (activeObject == null) {
            self.coreObj.setActiveUserObject(self.propObj.id);

            self.coreObj.createPlaceHolders(self.propObj.allowSwap);
          } else {
            self.coreObj.setActiveUserObject();

            self.coreObj.removePlaceHolders();
          }
        });
    
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
    var clone = new UserObject(this.coreObj);
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
}
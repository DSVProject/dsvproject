// Default properties are defined at 'animation/constant.js'

/**
  * Defines an edge graphic unit.
  * This 'class' will hold all the properties and methods regarding this single unit. 
  * @constructor
  *
  * @param {coreAnimObject} coreObj : instance of the class coreAnimObject.
  * @param {String} id : the id of this object.
  * @param {String} idObjectA : the id of the origin object.
  * @param {String=} idObjectB : the id of the destination object.
  * @param {String} edgeClass : the CSS class of the line svg element.
  * @param {Const} edgeType : a constant value (defined at 'animation/constant.js') indicating wether the vertex is unidirectional (from A -> B), bidirectional or has no direction.
  */
var EdgeObject2 = function (coreObj, id, idObjectA, idObjectB, edgeClass, edgeType) {
  var self = this;
  this.coreObj = coreObj;
  
  this.propObj = {
    "id": id,
    
    "idObjectA": idObjectA,
    
    "idObjectB": idObjectB,
    
    "type": edgeType,
    
    "markerStart": defaultProperties.marker.null.start,
    
    "markerEnd": defaultProperties.marker.null.end,
    
    "edge": {
      "class": edgeClass,
      "x1": null,
      "y1": null,
      "x2": null,
      "y2": null,
      //"orientation": (orientation != null) ? orientation : ORIENTATION.DOWN,
      "stroke": defaultProperties.edge.default.stroke,
      "strokeWidth": defaultProperties.edge.default["stroke-width"]
    }
  }

  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function () {
    return this.propObj;
  }
  
  /**
    * @return {String|Number} : the id of this object.
    */
  this.getID = function () {
    return this.propObj.id;
  }
  
  /**
    * @return {Number} : the x1 coordinate of the line svg element.
    */
  this.getIdObjectA = function () {
    return this.propObj.idObjectA;
  }
  
  /**
    * Set the id of the object that is the origin of the edge.
    *
    * @param {String} newID : the id of the new origin.
    */
  this.setIdObjectA = function (newID) {
    this.coreObj.updateEdgeList(this.propObj.idObjectA, newID, this.propObj.id);
    this.propObj.idObjectA = newID;
    
    this.calculatePath();
  }
  
  /**
    * @return {Number} : the y1 coordinate of the line svg element.
    */
  this.getIdObjectB = function () {
    return this.propObj.idObjectB;
  }
  
  /**
    * Set the id of the object that is the destination of the edge.
    *
    * @param {String} newID : the id of the new destination.
    */
  this.setIdObjectB = function (newID) {
    this.propObj.idObjectB = newID;
    
    this.calculatePath();
  }
  
  /**
    * @return {Const} : the type of the edge (defined at 'animation/constant.js').
    */
  this.getType = function () {
    return this.propObj.type;
  }
  
  /**
    * Set the type of the edge
    *
    * @param {Const} newType : the new value of the type (defined at 'animation/constant.js').
    */
  this.setType = function (newType) {
    this.propObj.type = newType;
  }
  
  /**
    * Set the marker of the start of the edge.
    *
    * @param {Const} newMarker : the new value of the marker (defined at 'animation/constant.js').
    */
  this.setMarkerStart = function (newMarker) {
    this.propObj.markerStart = newMarker;
  }
  
  /**
    * Set the marker of the end of the edge.
    *
    * @param {Const} newMarker : the new value of the marker (defined at 'animation/constant.js').
    */
  this.setMarkerEnd = function (newMarker) {
    this.propObj.markerEnd = newMarker;
  }
  
  /**
    * Set the CSS class of the line svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setEdgeClass = function (newClass) {
    this.propObj.edge.class = newClass;
  }
  
  /**
    * @return {Number} : the x1 coordinate of the line svg element.
    */
  this.getCoordinateX1 = function(){
    return this.propObj.edge.x1;
  }
  
  /**
    * @return {Number} : the y1 coordinate of the line svg element.
    */
  this.getCoordinateY1 = function(){
    return this.propObj.edge.y1;
  }  
  
  /**
    * @return {Number} : the x2 coordinate of the line svg element.
    */
  this.getCoordinateX2 = function(){
    return this.propObj.edge.x2;
  }
  
  /**
    * @return {Number} : the y2 coordinate of the line svg element.
    */
  this.getCoordinateY2 = function(){
    return this.propObj.edge.y2;
  }

  /**
    * Set the stroke color of the line svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function (newStroke) {
    this.propObj.edge.stroke = newStroke;
  }
  
  /**
    * Set the stroke width of the line svg element.
    *
    * @param {Number} newOpacity : the new stroke width value.
    */
  this.setStrokeWidth = function (newStrokeWidth) {
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    this.propObj.edge.strokeWidth = newStrokeWidth;
  }
  
  this.calculatePath = function () {
    var point;
    
    this.propObj.edge.x1 = this.coreObj.objectList[this.propObj.idObjectA].getEdgeCoordinateX(EDGE_INOUT.OUTGOING);
    this.propObj.edge.y1 = this.coreObj.objectList[this.propObj.idObjectA].getEdgeCoordinateY(EDGE_INOUT.OUTGOING);
    
    //alert(this.propObj.idObjectB);
    if (this.propObj.idObjectB != null) {
      this.propObj.edge.x2 = this.coreObj.objectList[this.propObj.idObjectB].getEdgeCoordinateX(EDGE_INOUT.INCOMING);
      this.propObj.edge.y2 = this.coreObj.objectList[this.propObj.idObjectB].getEdgeCoordinateY(EDGE_INOUT.INCOMING);
    } else {
      point = this.coreObj.objectList[this.propObj.idObjectA].getOutgoingPoint();
      
      if (point == EDGE_POSITION.BOTTOM) {
        this.propObj.edge.x2 = this.propObj.edge.x1;
        this.propObj.edge.y2 = this.propObj.edge.y1 + 50;
      } else if (point == EDGE_POSITION.RIGHT) {
        this.propObj.edge.x2 = this.propObj.edge.x1 + 50;
        this.propObj.edge.y2 = this.propObj.edge.y1;
      } else if (point == EDGE_POSITION.TOP) {
        this.propObj.edge.x2 = this.propObj.edge.x1;
        this.propObj.edge.y2 = this.propObj.edge.y1 - 50;
      } else if (point == EDGE_POSITION.LEFT) {
        this.propObj.edge.x2 = this.propObj.edge.x1 - 50;
        this.propObj.edge.y2 = this.propObj.edge.y1;
      }
    }
  }
  
  /**
    * Draw this object properties on the screen.
    * If the object is new, it will appear; if any property has changed, it will be updated.
    *
    * @param {Number} dur : the duration in miliseconds of this animation.
    */
  this.draw = function (dur) {
    if (dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
    
    //this.calculatePath();
    
    var json = [];
    json.push(this.propObj);
  
    var edge = d3.select("#g-edge").selectAll(SVG_LINE)
        .data(json, function (d) {return d.id;});
      
    edge.enter().append(SVG_LINE)        
        .attr("id", function (d) {return "edge-" + d.id;});
    edge.transition()
        .duration(dur)
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
    * @param {Number} dur : the duration in miliseconds of this animation.
    */
  this.remove = function (dur) {
    if (dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
    
    var json = [];
    json.push(this.propObj);
    
    var edge = d3.select("#g-edge").selectAll(SVG_LINE)
        .data(json, function (d) {return d.id;});
    
    edge.transition()
        .duration(dur)
        .remove();
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the properties
    * from the orignal object, without the reference, allowing the animation to happen step by step.
    *
    * @param {propObj} prop : a propObj from the Object to be cloned.
    */
  this.cloneProperties = function (prop) {
    this.propObj = clone(prop);
  }
  
  //this.calculatePath();
}
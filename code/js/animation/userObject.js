// Default properties are defined on 'animation/constant.js'


/**
  * Defines a user graphic unit, used for the learning mode interactions.
  * This 'class' will hold all the properties and methods regarding this single unit. 
  *
  * @param {String || Number} id : the id of this object.
  * @param {Number} x : the x coordinate of this object on the screen.
  * @param {Number} y : the y coordinate of this object on the screen.
  * @param {String} text : the inner text of this object, that will be displayed on the screen.
  * @param {String} rectClass : the CSS class of the rect svg element.
  * @param {String} textClass : the CSS class of the text svg element.
  */
var UserObject = function (id, cx, cy, radius, text, circleClass, textClass) {
  var propObj = {
    "id": null,
    
    "circle": {
      "class": null,
      "cx": null,
      "cy": null,
      "r": null,
      "fill": null,
      "fillOpacity": null,
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
    },
    
    "toRemove": false
  }
  
  var edgeList = {};
  
  var textAdjust = defaultProperties["font-size"]/3;
  
  initPropObj();

  /**
    * Initialise the element, with the provided parameters and other default properties.
    */
  function initPropObj() {
    propObj.id = id;
    
    propObj.circle.class = circleClass;
    propObj.circle.cx = cx;
    propObj.circle.cy = cy;
    propObj.circle.r = radius;
    propObj.circle.fill = defaultProperties["shape"]["default"]["fill"];
    propObj.circle.fillOpacity = defaultProperties["shape"]["default"]["fill-opacity"];
    propObj.circle.stroke = defaultProperties["shape"]["default"]["stroke"];
    propObj.circle.strokeWidth = defaultProperties["shape"]["default"]["stroke-width"];
    
    propObj.text.class = textClass;
    propObj.text.x = cx;
    propObj.text.y = cy + textAdjust;
    propObj.text.fill = defaultProperties["text"]["default"]["stroke"];
    propObj.text.fontFamily = defaultProperties["font-family"];
    propObj.text.fontWeight = defaultProperties["font-weight"];
    propObj.text.fontSize = defaultProperties["font-size"];
    propObj.text.textAnchor = defaultProperties["text-anchor"];
    propObj.text.text = text;
    
    edgeList = {};
  }
  
  /**
    * @return {propObj} : the content of this object property map.
    */
  this.getAttributes = function () {
    return propObj;
  }
  
  /**
    * @return {Array} : the edges of the current object.
    */
  this.getEdges = function () {
    return edgeList;
  }
  
  /**
    * @return {String || Number} : the id of this object.
    */
  this.getID = function () {
    return propObj.id;
  }
  
  /**
    * Set the CSS class of the circle svg element.
    *
    * @param {String} newClass : the new CSS class.
    */
  this.setCircleClass = function(newClass){
    propObj.circle.class = newClass;
  }
  
  /**
    * @return {String} : the class of the circle svg element.
    */
  this.getCircleClass = function () {
    return propObj.circle.class;
  }
  
  /**
    * @return {Number} : the cx coordinate of the circle svg element.
    */
  this.getCoordinateCX = function () {
    return propObj.circle.cx;
  }
  
  /**
    * @return {Number} : the cy coordinate of the circle svg element.
    */
  this.getCoordinateCY = function () {
    return propObj.circle.cy;
  }
  
  /**
    * Set the radius of the circle svg element.
    *
    * @param {Number} newRadius : the new radius.
    */
  this.setRadius = function (newRadius) {
    if (newRadius == null || isNaN(newRadius)) return;
    propObj.circle.r = newRadius;
  }
  
  /**
    * @return {Number} : the radius of the circle svg element.
    */
  this.getRadius = function () {
    return propObj.circle.radius;
  }
  
  /**
    * Set the fill color of the circle svg element.
    *
    * @param {String} newFill : the new CSS or svg color.
    */
  this.setFill = function (newFill) {
    if(newFill == null) return;
    propObj.circle.fill = newFill;
  }
  
  /**
    * Set the fill opacity of the circle svg element.
    *
    * @param {Number} newOpacity : the new opacity value.
    */
  this.setFillOpacity = function (newOpacity) {
    if(newOpacity == null || isNaN(newOpacity)) return;
    if(newOpacity < 0) newOpacity = 0.0;
    
    propObj.circle.fillOpacity = newOpacity;
  }
  
  /**
    * Set the stroke color of the circle svg element.
    *
    * @param {String} newStroke : the new CSS or svg stroke color.
    */
  this.setStroke = function (newStroke) {
    propObj.circle.stroke = newStroke;
  }
  
  /**
    * Set the stroke width of the circle svg element.
    *
    * @param {Number} newOpacity : the new stroke width value.
    */
  this.setStrokeWidth = function (newStrokeWidth) {
    if(newStrokeWidth == null || isNaN(newStrokeWidth)) return;
    if(newStrokeWidth < 0) newStrokeWidth = 0;
    
    propObj.circle.strokeWidth = newStrokeWidth;
  }
  
  /**
    * Move this object from its current position to a new position.
    *
    * @param {Number} x : the destination x coordinate.
    * @param {Number} y : the destination y coordinate.
    */
  this.moveShape = function (x, y) {
    if(x == null || y == null || isNaN(x) || isNaN(y)) return;
  
    propObj.circle.cx = x;
    propObj.circle.cy = y;

    propObj.text.x = x + 25;
    propObj.text.y = y + 30;
    
    for(var key in edgeList){
      edgeList[key].moveEdgeStart(x, y);
      //edgeList[key].moveEdgeEnd(x + propObj.rect.width + 50, y + 25);
    }
  }
  
  /**
    * Set the text of the text svg element.
    *
    * @param {String} newText : the new text.
    */
  this.setText = function (newText) {
    propObj.text.text = newText;
  }
  
  /**
    * @return {String} : the text of the text svg element (located inside the shape).
    */ 
  this.getText = function () {
    return propObj.text.text;
  }
  
  /**
    * Set the text color of the text svg element.
    *
    * @param {String} newColor : the new CSS or svg color.
    */
  this.setFontColor = function (newColor) {
    propObj.text.fill = newColor;
  }
  
  /**
    * Set this object to be removed on the next iteration.
    *
    * @param {Boolean} bool : if true, the object will be removed.
    */
  this.setToRemove = function (bool) {
    propObj.toRemove = bool;
  }
  
  /**
    * @return {Boolean} : the toRemove property.
    */ 
  this.getToRemove = function () {
    return propObj.toRemove;
  }
  
  this.addEdge = function (edgeObj) {
    edgeList[edgeObj.getID()] = edgeObj;
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
    json.push(propObj);
  
    var shape = d3.select("#g-shape").selectAll(SVG_CIRCLE)
        .data(json, function (d) {return d.id;});
      
    shape.enter().append(SVG_CIRCLE)        
        .attr("id", function (d) {return "u-shape-" + d.id;})
        .call(drag);
    shape.transition()
        .duration(dur)
        .attr("class", function (d) {return d.circle.class;})
        .attr("cx", function (d) {return d.circle.cx;})
        .attr("cy", function (d) {return d.circle.cy;})
        .attr("r", function (d) {return d.circle.r;})
        .attr("fill", function (d) {return d.circle.fill;})
        .attr("fill-opacity", function (d) {return d.circle.fillOpacity;})
        .attr("stroke", function (d) {return d.circle.stroke;})
        .attr("stroke-width", function (d) {return d.circle.strokeWidth;});
      
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
    
    for(var key in edgeList){
      edgeList[key].draw(dur);
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
    json.push(propObj);
    
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
    
    for (var key in edgeList) {
      edgeList[key].remove(dur); 
    }
  }
  
  
  /**
    * This function should be called when creating a new state. This function will clone this entire object,
    * returning a new instance, without the references, allowing the animation to happen step by step.
    */
  this.cloneObject = function () {
    var clone = new UserObject();
    clone.cloneProperties(propObj);
    clone.cloneEdges(edgeList);
    
    return clone;
  }
  
  /**
    * This function should be called when creating a new state. This function will clone the properties
    * from the orignal object, without the references, allowing the animation to happen step by step.
    *
    * @param {propObj} prop : a propObj from the Object to be cloned.
    */
  this.cloneProperties = function (prop) {
    propObj = clone(prop);
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
    
    edgeList = newList;
  }
  
  // This functions are used for the learning mode
  
  this.setTransform = function (x, y) {
    d3.select("#shape-" + propObj.id)   
        .attr("transform", "translate(" + [x , y] + ")");
    d3.select("#text-" + propObj.id)        
        .attr("transform", "translate(" + [x , y] + ")");
  }
  
  var drag = d3.behavior.drag()
      .on("drag", dragmove)
      .on("dragstart", dragstart)
      .on("dragend", dragend);
  
  function isValidDestination () {
    return false;
  }
  
  function dragstart (d) {
    d3.select(this).moveToFront();
    
    d.circle.cx = Number(d3.select(this).attr("cx"));
    d.circle.cy = Number(d3.select(this).attr("cy"));
  }
  
  function dragmove (d) {
    var initX = Number(d3.select(this).attr("cx"));
    var initY = Number(d3.select(this).attr("cy"));
    
    d.circle.cx += d3.event.dx;
    d.circle.cy += d3.event.dy;
  
    d3.select("#u-shape-" + d.id).attr("transform", function(d){
      return "translate(" + [d.circle.cx - initX, d.circle.cy - initY] + ")"
    });
    
    d3.select("#u-text-" + d.id).attr("transform", function(d){
      return "translate(" + [d.circle.cx - initX, d.circle.cy - initY] + ")"
    });
    
    
  
    /*
    var initX = Number(d3.select(this).attr("x"));
    var initY = Number(d3.select(this).attr("y"))

    d3.select("#shape-" + d.id).attr("transform", function(d,i){
      return "translate(" + [d3.event.x - (initX + 25) , d3.event.y - (initY + 35)] + ")"
    });
    
    //d3.select("#label-" + d.id).text(null);
    
    d3.select("#text-" + d.id).attr("transform", function(d,i){
      return "translate(" + [d3.event.x - (initX + 25) , d3.event.y - (initY + 35)] + ")"
    });
    
    d.rect.x = d3.event.x;
    d.rect.y = d3.event.y;
    */
  }
  
  function dragend (d) {
    var data, obj;
    
    $('.validTarget').hover(function () {
      //data = $(this).data();
      
      alert($(this).data());
      //alert(data);
      
      //$(this).text(d.text.text);
    });
    
    d3.select("#u-shape-" + d.id).attr("transform", function(d,i){
      return "translate(0,0)";
    });

    d3.select("#u-text-" + d.id).attr("transform", function(d,i){
      return "translate(0,0)";
    });
    
    /*
    var x = d.rect.x;
    var y = d.rect.y;
  
    if(y > -35 && y < 10 && x > -25 && x < 770){
      if(y > -35 && y < 10 && x > -25 && x < 25){
        d3.select("#shape-" + d.id)
            .attr("transform", function(d,i){
              return "translate([0,0])";
              })            
            .style("fill", "palegreen")
            .transition()
            .duration(2000)
            .style("fill", "white");
        
        d3.select("#text-" + d.id)
            .attr("transform", function(d,i){
              return "translate([0,0])";
              });
        
        d3.select("#shape-newValue")
            .remove();
      }else{
        
      }
    }else{
      d3.select("#shape-" + d.id).attr("transform", function(d,i){
        return "translate(" + [500-(Number(d.id)*50),-250] + ")";
      });
      
      d3.select("#text-" + d.id).attr("transform", function(d,i){
        return "translate(" + [500-(Number(d.id)*50),-250] + ")";
      });
    }
    */
  }
}
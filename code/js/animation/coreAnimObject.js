/**
  * Defines the unit the will control the animation main actions.
  *
  * When initiated it will create the svg groups that will hold the graphic elements:
  *   #g-marker: holds all the svg markers (arrow heads for the edges)
  *   #g-shape: holds all the svg circles and squares
  *   #g-text: holds all the svg texts, that will appear inside the shapes
  *   #g-label: holds all the svg texts that are acting like labels, appearing beneath the shapes
  *   #g-edge: holds all the svg lines and paths, used to conect the elements
  *
  */
var CoreAnimObject = function () {
  var selfie = this;
  
  // Internal array that keeps an instance of all objects on the screen
  var objectList = [];
  
  // Array to control the steps of the animation
  var stateList = [];
  
  // Variables used to navigate through the stateList
  var iterationCount = 0;       // Total count of iterations
  var iterationAnimation = 0;   // Used for the media controls
  var iterationCurrent = 0;     // Checkpoint of the last action performed by the user
  
  var animationStatus = ANIMATION_STOP;
  
  this.tryAlert = function () {
    alert("funcionou");
  }
  
  this.init = function () {
    createGroups();
    createMarkers();
  }
  
  function createGroups() {
    var markerGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-marker")
        .attr("class", "marker");
    
    var edgeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-edge")
        .attr("class", "edge");
        
    var labelGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-label")
        .attr("class", "label");
             
    var shapeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-shape")
        .attr("class", "shape");
      
    var textGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-text")
        .attr("class", "innerText");
  }
  
  function createMarkers() {
    var markerGroup = d3.select("#g-marker");
    
    markerGroup.append("marker")
        .attr("id", "arrowNull")
        .attr("orient", "auto")
        .attr("markerWidth", "5")
        .attr("markerHeight", "3")
        .attr("refX", "7")
        .attr("viewBox", "0 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L10,0 L0,5")
            .attr("fill", defaultProperties.edge.null.stroke);
    
    markerGroup.append("marker")
        .attr("id", "arrowDefault")
        .attr("orient", "auto")
        .attr("markerWidth", "5")
        .attr("markerHeight", "3")
        .attr("refX", "7")
        .attr("viewBox", "0 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L10,0 L0,5")
            .attr("fill", defaultProperties.edge.default.stroke);
    
    markerGroup.append("marker")
        .attr("id", "reverseArrowNull")
        .attr("orient", "auto")
        .attr("markerWidth", "5")
        .attr("markerHeight", "3")
        .attr("refX", "-7")
        .attr("viewBox", "-10 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L-10,0 L0,5")
            .attr("fill", defaultProperties.edge.null.stroke);
    
    markerGroup.append("marker")
        .attr("id", "reverseArrowDefault")
        .attr("orient", "auto")
        .attr("markerWidth", "5")
        .attr("markerHeight", "3")
        .attr("refX", "-7")
        .attr("viewBox", "-10 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L-10,0 L0,5")
            .attr("fill", defaultProperties.edge.default.stroke);
  }
  
  /**
    * Creates a snapshot of the current state of all the objects on the screen.
    * All other functions that change any property of a graphic element should call this function as a last instruction. 
    *
    * @param {String} status : an optional message about the changes, that will appear on the screen log.
    */
  this.saveState = function (status) {
    var state = {}; // The current state being created
    var newList = []; // The copy of the current objectList
    var clone;  // The instance for the cloned Object
    
    for (var key in objectList){
      clone = objectList[key].cloneObject();
      newList[key] = clone; 
    }
    
    // Each state will hold the "data" which is a copy of objectList, and a "status" which will appear on the log.
    state.data = newList;
    state.status = status;
    
    // When assigning a state for a position in this array you should use parseInt, otherwise when using other
    // variables (such as iterationAnimation) to access the content, the function will return undefined.
    stateList[parseInt(iterationCount)] = state;
    iterationCount++;
  }
  
  /**
    * Reset the state list.
    */
  this.newStateList = function () {
    stateList = [];
    iterationCount = 0; 
    iterationAnimation = 0; 
  }

  /**
    * Pause the current animation.
    */
  this.pause = function () {
    animationStatus = ANIMATION_PAUSE;
  }
  
  /**
    * Draw the next state of the stateList
    *
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.next = function (duration) {
    if (iterationAnimation < 0) iterationAnimation = 0;
    
    iterationAnimation++;

    if (iterationAnimation >= Object.keys(stateList).length) animationStatus = ANIMATION_STOP;

    if (animationStatus !== ANIMATION_STOP) {
      draw(stateList[parseInt(iterationAnimation)], duration);	
      if (animationStatus === ANIMATION_PLAY) {
        setTimeout(function(){
          selfie.next(duration);
        }, duration);
      }
    }
  }
  
  /**
    * Draw the previous state of the stateList
    *
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.previous = function () {
    if (iterationAnimation >= Object.keys(stateList).length) iterationAnimation = Object.keys(stateList).length - 1;
    
    iterationAnimation--;
    
    if (iterationAnimation < 0) iterationAnimation = 0;
    
    $('#log ul:last-child').remove()
    
    if (iterationAnimation < Object.keys(stateList).length) {
      animationStatus = ANIMATION_PAUSE;
      draw(stateList[parseInt(iterationAnimation)], 0);  
    }
  }
  
  /**
    * Start playing all the states saved in StateList.
    * 
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.play = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    if (stateList == null) return;
    if (animationStatus != ANIMATION_PLAY) animationStatus = ANIMATION_PLAY;

    draw(stateList[parseInt(iterationAnimation)], duration);
    
    setTimeout(function(){
      selfie.next(duration);
    }, duration);
  }
  
  /**
    * Create a square graphic element.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value to be displayed inside the item.
    * @param {String} label : the label which will appear beneath the item.
    * @param {String} shapeClass : the class of the svg rect element, used for styling and functionality.
    *
    * @return {SquareObject} : the new object.
    */
  this.newSquareObject = function (id, x, y, value, label, shapeClass) {
    objectList[id] = new SquareObject(id, x, y, value, label, shapeClass, "innerText", "label");
    
    return objectList[id];
  }
  
  /**
    * Create a double square graphic element.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value1 : the value to be displayed inside the first square.
    * @param {String} value1 : the value to be displayed inside the second square.
    * @param {String} label : the label which will appear beneath the item.
    * @param {String} shapeClass : the class of the svg element, used for styling and functionality.
    *
    * @return {SquareObject} : the new object.
    */
  this.newDoubleSquareObject = function (id, x, y, value1, value2, label, shapeClass) {
    objectList[id] = new DoubleSquareObject(id, x, y, value1, value2, label, shapeClass, "innerText", "label");
    
    return objectList[id];
  }
  
  /**
    * Create a user graphic element (used for the learning mode).
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} cx : the cx coordinate of the item.
    * @param {Number} cy : the cy coordinate of the item.
    * @param {Number} radius : the radius of the item.
    * @param {String} text : the text which will appear inside the item.
    * @param {String} circleClass : the class of the svg circle element, used for styling and functionality.
    *
    * @return {userObject} : the new object.
    */
  this.newUserObject = function (id, cx, cy, radius, text, circleClass) {
    objectList[id] = new UserObject(id, cx, cy, radius, text, circleClass, "innerText");
    
    return objectList[id];
  }
  
  /**
    * Create an edge graphic element, that will be owned by the origin object.
    *
    * @param {String || Number} id : the id of the item.
    * @param {String || Number} idObjectA : the id of the origin object of the edge.
    * @param {Number} ax : the x coordinate of the start of the edge, with necessary adjustments.
    * @param {Number} ay : the y coordinate of the start of the edge, with necessary adjustments.
    * @param {Number} bx : the x coordinate of the end of the edge, with necessary adjustments.
    * @param {Number} by : the y coordinate of the end of the edge, with necessary adjustments.
    * @param {Const} edgeType : a constant value (defined at 'animation/constant.js') indicating wether the vertex
    *                           is unidirectional (from A -> B), bidirectional or has no direction.
    * @param {String} orientation : if there's yet no current target for edge (with bx and by equal to null),
    *                             an edge will be created in this direction, using ax and ay as base.
    *
    * @return {EdgeObject} : the new object.
    */
  this.newEdgeObject = function (id, idObjectA, ax, ay, bx, by, edgeType, orientation) {
    if (bx == null || by == null) {
      if (orientation === "right") {
          bx = ax + 50;
          by = ay;
      } else if (orientation === "down") {
        bx = ax;
        by = ay + 50;
      }
    }
    
    var newEdge = new EdgeObject(id, ax, ay, bx, by, "edge", edgeType);

    objectList[idObjectA].addEdge(newEdge);
    
    return newEdge;
  }
  
  /**
    * Set a flag for the object to be removed on the next draw action.
    *
    * @param {String || Number} id : the id of the item to be removed.
    */
  this.removeShape = function (id) {
    objectList[id].setToRemove(true);
  }
  
  /**
    * Set a flag for all objects of the selected class to be removed on the next draw action.
    *
    * @param {String} selectedClass : the class of the items to be removed.
    * @param {Number} duration : the duration of the animation.
    */
  this.removeAll = function (selectedClass, duration) {
    for (var key in objectList) { 
      if (objectList[key].getRectClass() == selectedClass) {
        
        objectList[key].setToRemove(true);
      }
    }
  }
  
  /*
  this.createArrayHighlight = function(id){
    objectList["highlight"] = new SquareObject("highlight", objectList[id].getCoordinateX(), objectList[id].getCoordinateY(), null, "shape", "innerText");
    
    objectList["highlight"].setFillOpacity(animProperties["cell"]["highlight"]["fill-opacity"]);
    objectList["highlight"].setStroke(animProperties["cell"]["highlight"]["stroke"]);
    objectList["highlight"].setStrokeWidth(animProperties["cell"]["highlight"]["stroke-width"]);
  
    //internalJson.push(objectList["highlight"].getAttributes());
    
    this.saveState("The current " + id + " index.");
  };
  
  this.moveHighlight = function(insertedIndex){
    objectList["highlight"].moveShape(objectList[insertedIndex].getCoordinateX(), objectList[insertedIndex].getCoordinateY());
    this.saveState("Where the new value should be inserted.");
  }
  
  this.deleteHighlight = function(){
    for(var k in internalJson) {
      if (internalJson[k].id == "highlight") {
        internalJson.splice(k,1);
        break;
      }
    }
    
    this.saveState();
  }
  */
  
  /**
    * Clear the message log.
    */
  this.clearLog = function () {
    d3.select("#log").selectAll("ul")
        .remove();
  }
  
  /**
    * Clear the pseudocode.
    */
  this.clearPseudocode = function () {
    d3.select("#pseudocode").selectAll("ul")
        .remove();
  }
  
  /**
    * Insert a code line in the Pseudocode pannel.
    *
    * @param {Integer} id : a numeric id of the instruction, used to highlight the right line.
    * @param {String} instruction : the description of the instruction.
    */
  this.addPseudocodeLine = function (id, instruction) {
    d3.select("#pseudocode")
        .append("ul")
        .attr("id", "line" + id)
        .text(instruction);
  }
  
  /**
    * Highlight a line from the pseudocode pannel.
    *
    * @param {Integer} lineNumber : the line number to be highlighted.
    */
  this.highlightPseudocode = function (lineNumber) {
    d3.select("#pseudocode").selectAll("ul")
        .classed("pseudocodeHighlight", false);
    
    d3.select("#line" + lineNumber)
        .classe("pseudocodeHighlight", true);
  }
  
  /**
    * Iterate through all items of objectList, drawing the changes on the screen.
    *
    * @param {state} currentState : a state containing the ["data"], which is a copy of objectList and a ["status"] to be printed on the log.
    * @param {Number} dur : the duration in miliseconds of the total animation.
    */
  function draw(currentState, dur){
    var currentObjectList = currentState.data;
    var allObjectsJson = [];
    
    // Send the message to the log
    if (typeof currentState.status != 'undefined'){
      d3.select("#log")
          .append("ul")
          .transition()
          .duration(dur)
          .text(currentState.status);
    }
    
    // Draw the objects on the screen
    for (var key in currentObjectList){
      if (currentObjectList[key].getToRemove()){
        currentObjectList[key].remove(0);
        delete objectList[key];
      } else {
        currentObjectList[key].draw(dur);
      }
    
      if (typeof objectList[key] != 'undefined') allObjectsJson.push(objectList[key].getAttributes());
    }
    
    // Remove from the screen objects that did not existed in a previous state
    var shape = d3.select("#g-shape").selectAll("*")
        .data(allObjectsJson, function (d) {return d.id;});
    
    shape.exit()
        .each(function(d) {
          if (typeof objectList[d.id] != 'undefined') objectList[d.id].remove(0);
        });
  }
  
  this.isLearningMode = function(){
    return $("#chk-learn").is(":checked");
  }
}
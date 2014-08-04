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
  var self = this;
  
  // Internal array that keeps an instance of all objects on the screen
  this.objectList = [];
  
  // Array to control the steps of the animation
  this.stateList = [];
  
  // Variables used to navigate through the stateList
  this.iterationCount = 0;       // Total count of iterations
  this.iterationAnimation = 0;   // Used for the media controls
  
  this.iterationActions = {};
  this.iterationActCount = 0;     // Checkpoint of the last action performed by the user
  
  this.animationStatus = ANIMATION_STATUS.STOP;
  
  this.getIterationCount = function () {
    return iterationCount;
  }
  
  this.incrementIterationCount = function () {
    iterationCount++;
  }
  
  this.decrementIterationCount = function () {
    iterationCount--;
  }
  
  this.getIterationAnimation= function () {
    return iterationAnimation;
  }
  
  this.incrementIterationAnimation = function () {
    iterationAnimation++;
  }
  
  this.decrementIterationAnimation = function () {
    iterationAnimation--;
  }
  
  this.getIterationActions = function (pos) {
    return iterationActions[pos];
  }
  
  this.setIterationActions = function (pos, newValue) {
    iterationActions[pos] = newValue;
  }
  
  this.getIterationActCount = function () {
    return iterationActCount;
  }
  
  this.incrementIterationActCount = function () {
    iterationActCount++;
  }
  
  this.decrementIterationActCount = function () {
    iterationActCounter--;
  }
  
  this.getAnimationStatus = function () {
    return animationStatus;
  }
  
  this.setAnimationStatus = function (newValue) {
    animationStatus = newValue;
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
        .attr("class", "labelText");
             
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
  this.saveState = function (status, pseudocodeLine) {
    var state = {}; // The current state being created
    var newList = []; // The copy of the current objectList
    var clone;  // The instance for the cloned Object
    
    for (var key in this.objectList){
      clone = this.objectList[key].cloneObject();
      newList[key] = clone; 
    }
    
    // Each state will hold the "data" which is a copy of objectList, a "status" which will appear on the log
    // and a "pseudocodeLine" that will be highlighted on running time.
    state.data = newList;
    state.status = status;
    state.pseudocodeLine = pseudocodeLine;
    
    // When assigning a state for a position in this array you should use parseInt, otherwise when using other
    // variables (such as iterationAnimation) to access the content, the function will return undefined.
    this.stateList[parseInt(this.iterationCount)] = state;
    this.iterationCount++;
  }
  
  /**
    * Reset the state list, used when reseting all actions..
    */
  this.newStateList = function () {
    this.stateList = [];
    this.iterationCount = 0; 
    this.iterationAnimation = 0; 
  }
  
  /**
    * Create a checkpoint of each user action, used for the undo and redo process.
    */
  this.newAction = function () {
    this.iterationActions[this.iterationActCount] = this.iterationCount;
    this.iterationActCount++;
    this.saveState();
  }
  
  /**
    * Iterate through all items of objectList, drawing the changes on the screen.
    *
    * @param {state} currentState : a state containing the ["data"], which is a copy of objectList and a ["status"] to be printed on the log.
    * @param {Number} dur : the duration in miliseconds of the total animation.
    */
  this.draw = function (currentState, dur) {
    var currentObjectList = currentState.data;
    var allObjectsJson = [];
    
    if (typeof currentState.status != 'undefined') {
      self.printLog(currentState.status);
    }
    
    if (typeof currentState.pseudocodeLine != 'undefined') {
      self.highlightPseudocode(currentState.pseudocodeLine);
    }
    
    for (var key in currentObjectList){
      if (currentObjectList[key].getToRemove()){
        currentObjectList[key].remove(0);
        delete this.objectList[key];
      } else {
        currentObjectList[key].draw(dur);
      }
    
      if (typeof self.objectList[key] != 'undefined') allObjectsJson.push(self.objectList[key].getAttributes());
    }
    
    // Remove from the screen objects that did not existed in a previous state
    var shape = d3.select("#g-shape").selectAll("*")
        .data(allObjectsJson, function (d) {return d.id;});
    
    shape.exit()
        .each(function(d) {
          if (typeof self.objectList[d.id] != 'undefined') self.objectList[d.id].remove(0);
        });
  }

  /**
    * Pause the current animation.
    */
  this.pause = function () {
    this.animationStatus = ANIMATION_STATUS.PAUSE;
  }
  
  /**
    * Draw the next state of the stateList
    *
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.next = function (duration) {
    if (this.iterationAnimation < 0) this.iterationAnimation = 0;
    
    this.iterationAnimation++;

    if (this.iterationAnimation >= Object.keys(this.stateList).length) this.animationStatus = ANIMATION_STATUS.STOP;

    if (this.animationStatus !== ANIMATION_STATUS.STOP) {
      this.draw(this.stateList[parseInt(this.iterationAnimation)], duration);	
      if (this.animationStatus === ANIMATION_STATUS.PLAY) {
        setTimeout(function(){
          self.next(duration);
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
    if (this.iterationAnimation >= Object.keys(this.stateList).length) this.iterationAnimation = Object.keys(this.stateList).length - 1;
    
    this.iterationAnimation--;
    
    if (this.iterationAnimation < 0) this.iterationAnimation = 0;
    
    $('#log tr:last-child').remove()
    
    if (this.iterationAnimation < Object.keys(this.stateList).length) {
      this.animationStatus = ANIMATION_STATUS.PAUSE;
      this.draw(this.stateList[parseInt(this.iterationAnimation)], 0);  
    }
  }
  
  /**
    * Start playing all the states saved in StateList.
    * 
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.play = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    if (this.stateList == null) return;
    if (this.animationStatus != ANIMATION_STATUS.PLAY) this.animationStatus = ANIMATION_STATUS.PLAY;
    if (typeof this.stateList[parseInt(this.iterationAnimation)] == 'undefined') {
      this.iterationAnimation = this.iterationActions[0];
    }
    
    this.draw(this.stateList[parseInt(this.iterationAnimation)], duration);
    
    setTimeout(function(){
      self.next(duration);
    }, duration);
  }
  
  this.undo = function () {
    this.iterationActCount--;
    
    if (this.iterationActCount < 0) this.iterationActCount = 0;
    
    this.iterationCount = this.iterationActions[this.iterationActCount];
    
    this.draw(this.stateList[parseInt(this.iterationCount)], 0);  
  }
  
  this.redo = function (duration) {
    if (iterationCurrent < 0) iterationCurrent = 0;
    
    iterationCurrent++;
    
    if (typeof iterationActions[iterationCurrent] != 'undefined') {
      iterationCount = parseInt(iterationActions[iterationCurrent]);
      draw(stateList[parseInt(iterationCount)], duration); 
    }
  }
  
  /**
    * Create a square graphic element.
    *
    * @param {coreAnimObject} coreObj : instance of the class coreAnimObject.
    * @param {String|Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value to be displayed inside the item.
    * @param {String} label : the label which will appear beneath the item.
    * @param {String} shapeClass : the class of the svg rect element, used for styling and functionality.
    * @param {Const=} outgoingPoint : a constant value (defined at 'animation/constant.js') indicating from which point of the shape the edge will originate.
    * @param {Const=} incomingPoint : a constant value (defined at 'animation/constant.js') indicating at which point of the shape the edge will arrive.
    *
    * @return {SquareObject} : the new object.
    */
  this.newSquareObject = function (id, x, y, value, label, shapeClass, outgoingPoint, incomingPoint) {
    this.objectList[id] = new SquareObject(this, id, x, y, value, label, shapeClass, "innerText", "labelText", outgoingPoint, incomingPoint);
    
    return this.objectList[id];
  }
  
  /**
    * Create a double square graphic element.
    *
    * @param {String|Number} id : the id of the item.
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
    this.objectList[id] = new DoubleSquareObject(id, x, y, value1, value2, label, shapeClass, "innerText", "labelText");
    
    return this.objectList[id];
  }
  
  /**
    * Create a user graphic element (used for the learning mode).
    *
    * @param {coreAnimObject} coreObj : instance of the class coreAnimObject.
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
    this.objectList[id] = new UserObject(this, id, cx, cy, radius, text, circleClass, "innerText");
    
    return this.objectList[id];
  }
  
  /**
    * Create an edge graphic element, that will be owned by the origin object.
    *
    * @param {String|Number} id : the id of the item.
    * @param {String|Number} idObjectA : the id of the origin object of the edge.
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

    this.objectList[idObjectA].addEdge(newEdge);
    
    return newEdge;
  }
  
  this.newEdgeObject2 = function (id, idObjectA, idObjectB, edgeType) {
    var newEdge = new EdgeObject2(this, id, idObjectA, idObjectB, "edge", edgeType);
    newEdge.calculatePath();

    this.objectList[idObjectA].addEdge(newEdge);
    
    return newEdge;
  }
  
  /**
    * Set a flag for the object to be removed on the next draw action.
    *
    * @param {String|Number} id : the id of the item to be removed.
    */
  this.removeShape = function (id) {
    this.objectList[id].setToRemove(true);
  }
  
  /**
    * Set a flag for all objects of the selected class to be removed on the next draw action.
    *
    * @param {String} selectedClass : the class of the items to be removed.
    * @param {Number} duration : the duration of the animation.
    */
  this.removeAll = function (selectedClass, duration) {
    for (var key in this.objectList) { 
      if (this.objectList[key].getRectClass() == selectedClass) {
        
        this.objectList[key].setToRemove(true);
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
  this.clearLog = function(){
    d3.select("#log").selectAll("tr")
        .remove();
  }
  
  /**
    * Print a message on the log panel.
    *
    * @param {String} message : the message to be printed.
    */
  this.printLog = function (message) {
    if (message == "" || message == null) return;
      
    d3.select("#log")
        .append("tr")
        .append("td")
        .text(message);
  }
  
  /**
    * Clear the pseudocode panel.
    */
  this.clearPseudocode = function () {
    d3.select("#pseudocode").selectAll("tr")
        .remove();
  }
  
  /**
    * Add an instruction on the pseudocode panel.
    *
    * @param {Integer} id : the id o the html element that will hold the line.
    * @param {String} instruction : the instruction to be added.
    */
  this.addPseudocodeLine = function (id, instruction) {
    d3.select("#pseudocode")
        .append("tr")
        .attr("id", "line" + id)
        .append("td")
        .text(instruction);
  }
  
  /**
    * Print a message on the log panel.
    *
    * @param {Integer} lineNumber : the line number to be highlighted (same used as id when the line was created).
    */
  this.highlightPseudocode = function (lineNumber) {
    if(lineNumber == null || isNaN(lineNumber)) return;
    
    d3.select("#pseudocode").selectAll("tr")
        .attr("class", "");
    
    d3.select("#line" + lineNumber)
        .classed("codeHighlight", "true");
  }
  
  this.createPlaceHolders = function () {
    for (var key in this.objectList) {
      if (this.objectList[key] instanceof UserObject) continue; // skips the userObject as they are never valid targets.
      
      if (this.objectList[key].getIsValidTarget() == true) {
        this.objectList[key].createPlaceHolder();
      }
    }
  }
  
  this.removePlaceHolders = function () {
    d3.selectAll(".placeHolder")
        .remove();
  }
  
  this.isLearningMode = function () {
    return $("#chk-learn").hasClass("active");
  }
  
  /**
    * Change the userObject which is currently active.
    *
    * @param {String=} id : the id of the object. If null all the objects will be set as inactive.
    */
  this.setActiveUserObject = function (id) {
    if (id != null) {
      this.objectList[id].setIsActive(true);
    } else {
      for (var key in this.objectList) {
        if (this.objectList[key] instanceof UserObject) this.objectList[key].setIsActive(false);
      }
    }
  }
  
  /**
    * @return {userObject} : the userObject which active. Null if there's any.
    *
    */
  this.getActiveUserObject = function () {
    for (var key in this.objectList) {
      if (this.objectList[key] instanceof UserObject) {
        if (this.objectList[key].getIsActive() == true) {
          return this.objectList[key];
        }
      }
    }
    return null;
  }
  
  this.updateEdgeList = function (oldObjID, newObjID, edgeID) {
    var edge = this.objectList[oldObjID].edgeList[edgeID];
    
    this.objectList[oldObjID].edgeList[edgeID].remove();
    this.objectList[newObjID].addEdge(edge); 
  }
}
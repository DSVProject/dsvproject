/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães, Trinity College Dublin. All rights reserved.
  *
  * The views and conclusions contained in the software and documentation are those of the
  * authors and should not be interpreted as representing official policies, either expressed
  * or implied, of Trinity College Dublin.
  */

/**
  * Defines the class the will control the animation main actions.
  *
  * When initiated it will create the svg groups that will hold the graphic elements:
  *   #g-marker: holds all the svg markers (arrow heads for the edges)
  *   #g-shape: holds all the svg circles and squares
  *   #g-text: holds all the svg texts, that will appear inside the shapes
  *   #g-label: holds all the svg texts that are acting like labels, appearing beneath the shapes
  *   #g-edge: holds all the svg lines and paths, used to conect the elements
  *
  * @constructor
  */
var CoreObject = function () {
  var self = this;
  
  // Internal array that keeps an instance of all objects on the screen
  this.objectList = [];
  
  // Array to control the steps of the animation
  this.stateList = [];
  
  // Variables used to navigate through the stateList
  this.stateCount = 0;       // Total count of states
  this.stateAnimation = 0;   // Used for the media controls
  
  this.actionArray = [];    // Checkpoints of user actions (used for undo and redo functions)
  this.actionCount = 0;     // Count of user actions
  
  // Variable to control animation playing
  this.animationStatus = ANIMATION_STATUS.STOP;
  
  // Arrays to store variables and log messages that will be printed in the panels
  this.variableWatchList = [];
  this.logList = [];
  
  /**
    * Verify if the Learning Mode is active.
    *
    * @return {Boolean} : true if "#chk-learn" has class "active", false other wise.
    */
  this.isLearningMode = function () {
    return $("#" + DEFAULT_IDS.PAGE.LEARNING_MODE).hasClass(DEFAULT_CLASSES.LEARNING_MODE.ACTIVE);
  }
  
  /**
    * If any UserObject exists no new action is enabled until the current one is finished.
    *
    * @return {Boolean} : false if a UserObject exists, true other wise.
    */
  this.newActionEnabled = function () {
    for (var key in this.objectList) {
      if (this.objectList[key] instanceof UserObject) {
        this.displayAlert("Please finish or cancel the current action before making any further changes.");
        
        return false;
      }
    }
    
    return true;
  }
  
  /**
    * Display an error alert.
    *
    * @param {!String} message: the message to be displayed inside the alert.
    */
  this.displayAlert = function (message) {
    $('#' + DEFAULT_IDS.PAGE.ALERT_PLACEHOLDER).html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' + message + '</div>')
  }
  
  /**
    * Reset the state list, used when reseting all actions.
    */
  this.newStateList = function () {
    this.stateList = [];
    this.stateCount = 0; 
    this.stateAnimation = 0; 
    this.actionArray = [];
    this.actionCount = 0;
  }
  
  /**
    * Creates a snapshot of the current state of all the objects on the screen.
    *
    * @param {?String=} logMessage : an optional message about the changes, that will appear on the log panel.
    * @param {?Number=} pseudocodeLine : the pseudocode line to be highlighted during the exuction of this iteration.
    */
  this.saveState = function (logMessage, pseudocodeLine) {
    // The current state being created
    var state = {
      data : null,
      log : null,
      variables : null,
      pseudocodeLine : null
    };
    
    // Create a "snapshot" of the current state of objectList[]
    var newList = []; // The copy of the current objectList
    var copy;  // The instance for the cloned Object
    for (var key in this.objectList){
      copy = this.objectList[key].cloneObject();
      newList[key] = copy;
    }
    
    this.saveLogMessageToList(logMessage);
    
    // Save each item to this state
    state.data = newList;
    state.log = clone(self.logList);
    state.variables = clone(self.variableWatchList);
    state.pseudocodeLine = pseudocodeLine;
    
    // Save the generated state to the list.
    // Important: When assigning a state for a position in this array you should use parseInt, otherwise when using other
    // variables (such as stateAnimation) to access the content, the function will return undefined.
    this.stateList[parseInt(this.stateCount)] = state;
    
    // Update the stateCount
    this.stateCount++;
    
    this.variableWatchList = [];
  }
  
  /**
    * Creates a learn state, that will be used to check the answer at a later stage.
    *
    */
  this.learnState = function () {
    // The current state being created
    var state = {
      data : null,
      log : null,
      variables : null,
      pseudocodeLine : null
    };
    
    // Create a "snapshot" of the current state of objectList[]
    var newList = []; // The copy of the current objectList
    var copy;  // The instance for the cloned Object
    for (var key in this.objectList){
      copy = this.objectList[key].cloneObject();
      newList[key] = copy;
    }
    
    state.data = newList;
    
    this.saveLogMessageToList("Use the grey circles to create the final state.")
    
    state.log = clone(this.logList);
    
    this.stateList["learn"] = state;
    
    this.draw(this.stateList["learn"], 0);
  }
  
  this.checkAnswer = function () {
    DEFERRED.resolve();
  }
  
  this.restartLearn = function () {
    this.draw(this.stateList["learn"], 0);
  }
  
  this.cancelLearn = function () {
    for (var key in this.objectList) {
      if (this.objectList[key] instanceof UserObject) { 
        this.objectList[key].setToRemove(true);
      } else {
        this.objectList[key].setIsValidTarget(false);
        
        for (var edgeKey in this.objectList[key].edgeList) {
          this.objectList[key].edgeList[edgeKey].setIsValidTarget(false);
        }
      }
    }
    
    this.toggelLearningMode();
    this.learnState();
  }
  
  this.toggelLearningMode = function () {
    $('#chk-learn').toggleClass('btn-default btn-success');
    $('#chk-learn').toggleClass('active');
  
    $('#chk-answer-btn').toggleDisabled();
    $('#restart-btn').toggleDisabled();
    $('#cancel-btn').toggleDisabled();
    $('#div-media-buttons :input').toggleDisabled();
  }
  
  // ANIMATION METHODS
  
  /**
    * @return {Number} : the duration in miliseconds of each animation, based on user's choice.
    */
  this.getAnimationDuration = function () {
    var dur = $('#' + DEFAULT_IDS.PAGE.ANIMATION_DURATION).val();
    
    return 1100 - dur;
  }
  
  /**
    * This function will begin the animation. When executing a method, this will be the last instruction called, after saving all the necessary states.
    *
    * @param {?Number=} duration : the duration in miliseconds of the entire animation, if null the default animation duration value will be used.
    */
  this.begin = function (duration) {
    var copyList = [];
    
    // Create "checkpoints" of the actions to enable undo and redo
    for (var key in this.objectList){
      copy = this.objectList[key].cloneObject();
      copyList[key] = copy;
    }
    this.actionArray[this.actionCount] = copyList;
    this.actionCount++;
    
    this.clearLog();
    this.clearVariableWatch();
    this.play(duration);
  }
  
  /**
    * Iterate through all items of objectList, drawing the changes on the screen.
    *
    * @param {!state} currentState : a state defined in this.saveState
    * @param {?Number=} duration : the duration in miliseconds of the entire animation, if null the default animation duration value will be used.
    */
  this.draw = function (currentState, duration) {
    var currentObjectList = currentState.data;
    var allObjectsJson = [];
    
    if (duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    // Update the panels
    if (currentState.log != null) {
      self.printLog(currentState.log);
    }
    
    if (currentState.variables != null) {
      self.printVariableWatch(currentState.variables)
    }
    
    if (currentState.pseudocodeLine != null) {
      self.highlightPseudocode(currentState.pseudocodeLine);
    }
    
    // Draw the objects
    for (var key in currentObjectList){
      if (currentObjectList[key].getToRemove()){
        currentObjectList[key].remove(0);
        delete this.objectList[key];
      } else {
        currentObjectList[key].draw(duration);
      }
    
      if (typeof self.objectList[key] != 'undefined') allObjectsJson.push(self.objectList[key].getAttributes());
    }
    
    // Remove from the screen objects that did not existed in a previous state
    var shape = d3.select("#" + DEFAULT_IDS.SVG_GROUP.SHAPE).selectAll("*")
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
    * @param {?Number=} duration : the duration in miliseconds of the entire animation, if null the function getAnimationDuration will be called.
    */
  this.next = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = this.getAnimationDuration();
    if (this.stateAnimation < 0) this.stateAnimation = 0;
    
    this.stateAnimation++;

    if (this.stateAnimation >= Object.keys(this.stateList).length) this.animationStatus = ANIMATION_STATUS.STOP;

    if (this.animationStatus !== ANIMATION_STATUS.STOP) {
      this.draw(this.stateList[parseInt(this.stateAnimation)], duration);	
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
    * @param {?Number=} duration : the duration in miliseconds of the entire animation, if null the default animation duration value will be used.
    */
  this.previous = function () {
    if (this.stateAnimation >= Object.keys(this.stateList).length) this.stateAnimation = Object.keys(this.stateList).length - 1;
    
    this.stateAnimation--;
    
    if (this.stateAnimation < 0) this.stateAnimation = 0;
    
    if (this.stateAnimation < Object.keys(this.stateList).length) {
      this.animationStatus = ANIMATION_STATUS.PAUSE;
      this.draw(this.stateList[parseInt(this.stateAnimation)], 0);  
    }
  }
  
  /**
    * Start playing all the states saved in StateList.
    *
    * @param {?Number=} duration : the duration in miliseconds of the entire animation, if null the default animation duration value will be used.
    */
  this.play = function (duration) {
    if (duration == null || isNaN(duration) || duration < 0) duration = this.getAnimationDuration();
    if (this.stateList == null) return;
    if (this.animationStatus != ANIMATION_STATUS.PLAY) this.animationStatus = ANIMATION_STATUS.PLAY;
    
    this.draw(this.stateList[parseInt(this.stateAnimation)], duration);
    
    setTimeout(function(){
      self.next(duration);
    }, duration);
  }
  
  /**
    * Undo the last action.
    */
  this.undo = function () {
    this.actionCount--;
    
    if (this.actionCount < 0) this.actionCount = 0;
    
    for (var key in this.objectList) {
      if (typeof this.actionArray[this.actionCount - 1][key] == 'undefined') {
        this.objectList[key].remove();
        delete this.objectList[key];
      } else {
        this.objectList[key].cloneProperties(this.actionArray[this.actionCount - 1][key].getAttributes());
        this.objectList[key].cloneEdges(this.actionArray[this.actionCount - 1][key].getEdges());
      }
    }
    
    this.saveState();
    
    this.play(0); 
  }
  
  /**
    * Undo the previous action.
    */
  this.redo = function (duration) {
    if (this.actionCount < 0) this.actionCount = 0;
    
    this.actionCount++;
    
    if (typeof actionArray[iterationCurrent] != 'undefined') {
      stateCount = parseInt(actionArray[iterationCurrent]);
      draw(stateList[parseInt(stateCount)], duration); 
    }
  }
  
  /**
    * Clear the message log panel.
    */
  this.clearLog = function () {
    this.logList = [];
    
    d3.select("#" + DEFAULT_IDS.PAGE.LOG).selectAll("tr")
        .remove();
  }
  
  /**
    * Save a message to be printed on the log panel
    *
    * @param {!String} message : the message to be saved.
    */
  this.saveLogMessageToList = function (message) {
    var log = {
      message: message,
    };
    this.logList.push(log);
  }
  
  /**
    * Print all saved messages to the log panel.
    *
    * @param {Array} logObj : the value of this.logList;
    */
  this.printLog = function (logObj) {
    var varLines = d3.select("#" + DEFAULT_IDS.PAGE.LOG).selectAll("tr")
        .data(logObj, function (d) {return d.message;});
    
    varLines.enter()
        .append("tr")
        .append("td");
    
    varLines.transition()
        .text(function (d) {return d.message;});
    
    varLines.exit()
        .remove();
  }
  
  /**
    * Clear the variable watch panel.
    */
  this.clearVariableWatch = function(){
    d3.select("#" + DEFAULT_IDS.PAGE.VARIABLE).selectAll("tr")
        .remove();
  }
  
  /**
    * Save the current value of a variable to be printed on the Variable Watch panel.
    *
    * @param {!String} variableName : the name of the variable to be printed.
    * @param {!(String|Number)} variableValue : the current value of the variable.
    */
  this.saveVariableToWatch = function (variableName, variableValue) {
    if (variableName == "" || variableName == null) return;
    
    var variable = {
      name: variableName,
      value: variableValue
    };
    
    self.variableWatchList.push(variable);
  }
  
  /**
    * Print all saved variables to the Variable Watch panel.
    *
    * @param {Array} variablesObj : the value of this.variableWatchList;
    */
  this.printVariableWatch = function (variablesObj) {
    var varLines = d3.select("#" + DEFAULT_IDS.PAGE.VARIABLE).selectAll("tr")
        .data(variablesObj, function (d) {return d.name;});
    
    varLines.enter()
        .append("tr")
        .append("td");
    
    varLines.transition()
        .text(function (d) {return d.name + " : " + d.value;});
  }
  
  /**
    * Clear the pseudocode panel.
    */
  this.clearPseudocode = function () {
    d3.select("#" + DEFAULT_IDS.PAGE.PSEUDOCODE).selectAll("tr")
        .remove();
  }
  
  /**
    * Add an instruction on the pseudocode panel.
    *
    * @param {!Integer} id : the id o the html element that will hold the line.
    * @param {!String} instruction : the instruction to be added.
    */
  this.addPseudocodeLine = function (id, instruction) {
    d3.select("#" + DEFAULT_IDS.PAGE.PSEUDOCODE)
        .append("tr")
        .attr("id", DEFAULT_IDS.HTML_ELEMENT.PSEUDOCODE_LINE + id)
        .append("td")
        .text(instruction);
  }
  
  /**
    * Highlight one line of the pseudoCode panel.
    *
    * @param {!Integer} lineNumber : the line number to be highlighted (same used as id when the line was created).
    */
  this.highlightPseudocode = function (lineNumber) {
    if(lineNumber == null || isNaN(lineNumber)) return;
    
    d3.select("#" + DEFAULT_IDS.PAGE.PSEUDOCODE).selectAll("tr")
        .attr("class", "");
    
    d3.select("#" + DEFAULT_IDS.HTML_ELEMENT.PSEUDOCODE_LINE + lineNumber)
        .classed(DEFAULT_CLASSES.PAGE.PSEUDOCODE.HIGHLIGHT, "true");
  }
  
  // OBJECT CONSTRUCTORS
  
  /**
    * Create a square graphic element.
    *
    * @param {!(String|Number)} id : the id of this object.
    * @param {!Number} x : the x coordinate of this object inside the svg element.
    * @param {!Number} y : the y coordinate of this object inside the svg element.
    * @param {?String=} text : the inner text of this object, that will be displayed on the screen.
    * @param {?String=} label : the text underneath this object, that will be displayed on the screen.
    * @param {?String=} shapeClass : the CSS class of the shape svg element.
    * @param {?String=} textClass : the CSS class of the text svg element (inside the shape).
    * @param {?String=} labelClass : the CSS class of the text svg element (underneath the shape).
    *
    * @return {SquareObject} : the new object.
    */
  this.newSquareObject = function (id, x, y, text, label, shapeClass, textClass, labelClass) {
    this.objectList[id] = new SquareObject(this, id, x, y, text, label, shapeClass, textClass, labelClass);
    
    return this.objectList[id];
  }
  
  /**
    * Create a circle graphic element.
    *
    * @param {!(String|Number)} id : the id of this object.
    * @param {!Number} cx : the cx coordinate of this object inside the svg element.
    * @param {!Number} cy : the cy coordinate of this object inside the svg element.
    * @param {!Number} radius : the radius of this object.
    * @param {?String=} text : the inner text of this object, that will be displayed on the screen.
    * @param {?String=} label : the text underneath this object, that will be displayed on the screen.
    * @param {?String=} shapeClass : the CSS class of the rect svg element.
    * @param {?String=} textClass : the CSS class of the text svg element (inside the shape).
    * @param {?String=} labelClass : the CSS class of the text svg element (underneath the shape).
    *
    * @return {CircleObject} : the new object.
    */
  this.newCircleObject = function (id, cx, cy, radius, text, label, shapeClass, textClass, labelClass) {
    this.objectList[id] = new CircleObject(this, id, cx, cy, radius, text, label, shapeClass, textClass, labelClass);
    
    return this.objectList[id];
  }
  
  /**
    * Create a user graphic element (used for the learning mode).
    *
    * @param {!(String|Number)} id : the id of this object.
    * @param {!Number} cx : the cx coordinate of this object inside the svg element.
    * @param {!Number} cy : the cy coordinate of this object inside the svg element.
    * @param {!Number} radius : the radius of this object.
    * @param {?String=} text : the inner text of this object, that will be displayed on the screen.
    * @param {?String=} shapeClass : the CSS class of the rect svg element.
    * @param {?String=} textClass : the CSS class of the text svg element (inside the shape).
    * @param {!Const} type : the type of this userObject (defined at 'animation/constant.js' : USER_OBJ_TYPE).
    * @param {!Bool=} allowSwap: if this instance is a VALUE type object, this parameter should be passed. If true, this object's text will be swapped during the interactions.
    * @param {!(String|Number)=} bindedObjID : if this instance is a MOVEMENT type object, it should be binded to another object.
    *
    * @return {userObject} : the new object.
    */
  this.newUserObject = function (id, cx, cy, radius, text, shapeClass, textClass, type, allowSwap, bindedObjID) {
    this.objectList[id] = new UserObject(this, id, cx, cy, radius, text, shapeClass, textClass, type, allowSwap, bindedObjID);
    
    return this.objectList[id];
  }
  
  /**
    * Create an edge graphic element, that will be stored in the origin object edgelist[].
    *
    * @param {!(String|Number)} id : the id of this object.
    * @param {!String} idObjectA : the id of the origin object.
    * @param {?String=} idObjectB : the id of the destination object. If null a small edge will be created following the orientation of the origin point.
    * @param {?String=} edgeClass : the CSS class of the line svg element.
    * @param {!Const} edgeType : a constant value (defined at 'animation/constant.js' : EDGE_TYPE) indicating wether the vertex is unidirectional (from A -> B), bidirectional or has no direction.
    * @param {?Const=} outboundPoint : a constant value (defined at 'animation/constant.js' : EDGE_POSITION) indicating from which point of the shape the edge will originate. If null the CENTER position will be used.
    * @param {?Const=} inboundPoint : a constant value (defined at 'animation/constant.js' : EDGE_POSITION) indicating at which point of the shape the edge will arrive. If null the CENTER position will be used.
    * @param {?Const=} typeObjCreated : a constant value (defined at 'animation/constant.js' : USER_TYPE_OBJ_CREATED) indicating which object should be created to insert a new value in the learning mode.
    *
    * @return {EdgeObject} : the new object.
    */
  this.newEdgeObject = function (id, idObjectA, idObjectB, edgeClass, edgeType, outboundPoint, inboundPoint, typeObjCreated) {
    var newEdge = new EdgeObject(this, id, idObjectA, idObjectB, edgeClass, edgeType, outboundPoint, inboundPoint, typeObjCreated);
    
    this.objectList[idObjectA].addEdge(newEdge);
    
    return newEdge;
  }
  
  /**
    * Set a flag for the object to be removed on the next draw action.
    *
    * @param {!(String|Number)} id : the id of the item to be removed.
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
      if (this.objectList[key].getShapeClass() == selectedClass) {
        
        this.objectList[key].setToRemove(true);
      }
    }
  }
  
  // FUNCTIONS CALLED FROM INSIDE SHAPE INSTANCES
  
  /**
    * Iterate through the objects classified as valid targets creating a place holder on them.
    * This function should only be called from inside an UserObject instance.
    *
    * @param {!Bool} allowSwap: if true this object's text will be swapped with the active UserObject's text (only for VALUE UserObject).
    */
  this.createPlaceHolders = function (allowSwap) {
    for (var key in this.objectList) {
      if (this.objectList[key] instanceof UserObject) continue; // skips the userObject as they are never valid targets.
      
      if (this.objectList[key].getIsValidTarget() == true) {
        this.objectList[key].createPlaceHolder(allowSwap);
      }
      
      for (var edgeKey in this.objectList[key].edgeList) {
        if (this.objectList[key].edgeList[edgeKey].getIsValidTarget() == true) {
          this.objectList[key].edgeList[edgeKey].createPlaceHolder();
        } 
      }
    }
  }
  
  /**
    * Remove all the place holders.
    * This function is only called from other object instances.
    */
  this.removePlaceHolders = function () {
    d3.selectAll("." + DEFAULT_CLASSES.LEARNING_MODE.PLACE_HOLDER)
        .remove();
  }
  
  /**
    * Change the userObject which is currently active.
    * This function should only be called from inside an UserObject instance.
    *
    * @param {?String=} id : the id of the object. If null all the objects will be set as inactive.
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
    * This function should only be called from inside object instances.
    *
    * @return {userObject} : the userObject which active. Null if there's any.
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
  
  /**
    * @param {!(String|Number)} id : the id of the binded object.
    *
    * @return {EdgeObject} : the edgeObject that is binded to the userObject.
    */
  this.getUserObjectBindedItem = function (id) {
    for (var key in this.objectList) {
      if (Object.keys(this.objectList[key].edgeList).length > 0) {
        for (var edgeKey in this.objectList[key].edgeList) {
          if (this.objectList[key].edgeList[edgeKey].getID() == id) return this.objectList[key].edgeList[edgeKey];
        }
      }
    }
    return null;
  }
  
  /**
    * Move an edge object from one shape object to another. This function is only called from inside an edgeObject instance.
    *
    * @param {!(String|Number)} oldObjID : the id of the object to have the edge removed.
    * @param {!(String|Number)} newObjID : the id of the object to have the edge added.
    * @param {!(String|Number)} edgeID : the id of the edge object.
    */
  this.updateEdgeList = function (oldObjID, newObjID, edgeID) {
    var edge = this.objectList[oldObjID].edgeList[edgeID];
    
    this.objectList[oldObjID].edgeList[edgeID].remove();
    this.objectList[newObjID].addEdge(edge); 
  }
  
  // CODE TO BE EXECUTED BY CONSTRUCTOR
  /**
    * Creates the groups that will contain all the graphic elements.
    */
  this.createGroups = function () {
    var markerGroup = d3.select("#" + DEFAULT_IDS.SVG_GROUP.MAIN)
        .append("g")
        .attr("id", DEFAULT_IDS.SVG_GROUP.MARKER)
        .attr("class", DEFAULT_CLASSES.MARKER);
    
    var edgeGroup = d3.select("#" + DEFAULT_IDS.SVG_GROUP.MAIN)
        .append("g")
        .attr("id", DEFAULT_IDS.SVG_GROUP.EDGE)
        .attr("class", DEFAULT_CLASSES.EDGE);
        
    var labelGroup = d3.select("#" + DEFAULT_IDS.SVG_GROUP.MAIN)
        .append("g")
        .attr("id", DEFAULT_IDS.SVG_GROUP.LABEL)
        .attr("class", DEFAULT_CLASSES.TEXT.LABEL);
             
    var shapeGroup = d3.select("#" + DEFAULT_IDS.SVG_GROUP.MAIN)
        .append("g")
        .attr("id", DEFAULT_IDS.SVG_GROUP.SHAPE)
        .attr("class", DEFAULT_CLASSES.SHAPE);
      
    var textGroup = d3.select("#" + DEFAULT_IDS.SVG_GROUP.MAIN)
        .append("g")
        .attr("id", DEFAULT_IDS.SVG_GROUP.TEXT)
        .attr("class", DEFAULT_CLASSES.TEXT.INNER);
  }
  
  /**
    * Creates the marker object references, to be used by the edges.
    */
  this.createMarkers = function () {
    var markerGroup = d3.select("#" + DEFAULT_IDS.SVG_GROUP.MARKER);
    
    markerGroup.append(SVG_MARKER)
        .attr("id", DEFAULT_IDS.SVG_MARKER.END.NULL)
        .attr("orient", "auto")
        .attr("markerWidth", defaultProperties.marker.width)
        .attr("markerHeight", defaultProperties.marker.height)
        .attr("refX", defaultProperties.marker.refX.end)
        .attr("viewBox", "0 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L10,0 L0,5")
            .attr("fill", defaultProperties.edge.stroke.null);
    
    markerGroup.append(SVG_MARKER)
        .attr("id", DEFAULT_IDS.SVG_MARKER.END.DEFAULT)
        .attr("orient", "auto")
        .attr("markerWidth", defaultProperties.marker.width)
        .attr("markerHeight", defaultProperties.marker.height)
        .attr("refX", defaultProperties.marker.refX.end)
        .attr("viewBox", "0 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L10,0 L0,5")
            .attr("fill", defaultProperties.edge.stroke.default);
    
    markerGroup.append(SVG_MARKER)
        .attr("id", DEFAULT_IDS.SVG_MARKER.START.NULL)
        .attr("orient", "auto")
        .attr("markerWidth", defaultProperties.marker.width)
        .attr("markerHeight", defaultProperties.marker.height)
        .attr("refX", defaultProperties.marker.refX.start)
        .attr("viewBox", "-10 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L-10,0 L0,5")
            .attr("fill", defaultProperties.edge.stroke.null);
    
    markerGroup.append(SVG_MARKER)
        .attr("id", DEFAULT_IDS.SVG_MARKER.START.DEFAULT)
        .attr("orient", "auto")
        .attr("markerWidth", defaultProperties.marker.width)
        .attr("markerHeight", defaultProperties.marker.height)
        .attr("refX", defaultProperties.marker.refX.start)
        .attr("viewBox", "-10 -5 10 10")
        .append("path")
            .attr("d", "M0,-5 L-10,0 L0,5")
            .attr("fill", defaultProperties.edge.stroke.default);
  }
  
  this.createGroups();
  this.createMarkers();
}
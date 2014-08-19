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

/**
  * ********* IMPORTANT! *********
  *
  * This is a template file to be used when creating new visualisations.
  * In it you'll find examples of structures to manage the data and the graphics (line 24), default fields (lines 34 to 41),
  * methods (lines 66 to 81) that need to be declared and examples of initial items to displayed on the screen as soon as the page load.
  * In this template we used the StackArray.js file, for which reason the initial items and particular methods refer to this visualisation.
  */

/**
  * Defines a Pointer object, that contains:
  *   {Number} value
  *   {Object} drawing : an instace of one of the basic shapes (squareObject, nodeObject, etc)
  *   {Object} edge : an instace of the edgeObject
  */
var Pointer = function () {
  var value;
  var drawing;
  var edge;
}

/**
  * Defines a Stack object (Array implementation). Used to keep track of the object internally and to interact with the animations.
  */
var Template = function(){
  var self = this;
  var coreObj = new CoreObject();
  
  // ARRAY TO STORE LEARNING MODE OBJECTS
  var learnObj = [];
  
  // CONSTANTS FOR PSEUDOCODE GENERATION
  const PUSH = 0,
        POP = 1;
  
  // CREATE INITIAL ITEMS IF ANY
  coreObj.newStateList();

  var cap = 16;
  var top = new Pointer();
  var mArray = [];
  
  for (var i=0; i<16; i++){
    mArray[i] = coreObj.newSquareObject(i, (i+1)*50, 300, null, i, null, null, null);  
  }
  
  top.value = 0;
  top.drawing = coreObj.newSquareObject("top", 50, 50, 0, "top", null, null, null);

  top.edge = coreObj.newEdgeObject("top", top.drawing.getID(), mArray[top.value].getID(), null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.BOTTOM, EDGE_POSITION.TOP);
  
  coreObj.saveState();
  coreObj.begin(0);

  // DEFAULT METHODS
  this.getCore = function () {
    return coreObj;
  }
  
  this.generatePseudocode = function (command) {
    coreObj.clearPseudocode();
    
    switch (command) {
        case PUSH:
          coreObj.addPseudocodeLine(lineNo, "Instruction");
          break;
        case POP:
          coreObj.addPseudocodeLine(lineNo, "Instruction");
          break;
    }
  }
  
  // PARTICULAR METHODS
  
  this.init = function() {...}
  
  this.isEmpty = function () {...}
  
  this.push = function (item) {...}
  
  this.pop = function () {...}
}
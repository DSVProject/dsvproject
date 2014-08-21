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
  * Defines a Pointer object, that contains:
  *   {Number} value
  *   {Object} drawing : an instace of one of the basic shapes (squareObject, nodeObject, etc)
  *   {Object} edge : an instace of the edgeObject
  */
var Node = function () {
  var item,
    pointer,
    drawing,
    edge;
}

/**
  * Defines an Array of Squares with pointers.
  *
  * @param {!CoreAnimObject} coreObj : instance of the CoreAnimObject class.
  * @param {!Number} positions : number of positions of the array.
  */
var ArrayPointer = function (coreObj, positions) {
  var self = this;
  this.coreObj = coreObj;
  
  var mArray = [];
  
  for (var i=0; i<positions; i++){
    mArray[i] = new Node();
    
    mArray[i].item = null; 
    mArray[i].drawing = coreObj.newSquareObject("a" + i, (i+1)*50, 400, null, i, null, null, null);
    mArray[i].edge = coreObj.newEdgeObject("a" + i, mArray[i].drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.TOP, EDGE_POSITION.BOTTOM);
  }
  
  return mArray;
}
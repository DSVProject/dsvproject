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

var Node = function () {
  var item,
    pointer,
    drawing,
    edge;
}

var Node2 = function (){
  var value;
  var key;
  var leftChild;
  var rightChild;
  
  var drawing;
  var leftEdge;
  var rightEdge;
}

var Hashtable = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  coreObj.newStateList();
  coreObj.saveState();

  var N = 0;
  var counterID = 0;
  
  var mArray;
  
  mArray = new ArrayPointer(coreObj, 15);

  /*
  coreObj.saveState();
  
  var test = new Node();
  
  test.item = 0;
  test.drawing = coreObj.newSquareObject("test", 50, 300, "test", null, null, null, null, EDGE_POSITION.TOP, EDGE_POSITION.BOTTOM);
  test.edge = coreObj.newEdgeObject("test", test.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL);
  
  //mArray[0].pointer = test;
  
  mArray[0].edge.setIdObjectB(test.drawing.getID());
  mArray[0].edge.setStroke(defaultProperties.edge.default.stroke);
  mArray[0].edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  coreObj.saveState();
  
  var test2 = new Node();
  test2.drawing = coreObj.newSquareObject("test2", 50, 200, "test2", null, null, null, null, EDGE_POSITION.TOP, EDGE_POSITION.BOTTOM);
  test.edge.setIdObjectB(test2.drawing.getID());
  */
  //test.pointer = test2;
  
  coreObj.saveState();
  
  coreObj.begin(0);
  
  this.getCore = function () {
    return coreObj;
  }
}
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

// Defines a Binary Search Tree. Used to keep track of the object internally and to interact with the animations

var Node = function () {
  var key,
    leftChild,
    rightChild,
    N,
    
    drawing,
    leftEdge,
    rightEdge;
}

var BinarySearchTree = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  const INSERT = 0,
        DELETE = 1;

  this.root = null;
  var counterID = 0;
  
  this.getCore = function () {
    return coreObj;
  }
  
  this.generatePseudocode = function (command) {
    coreObj.clearPseudocode();
    
    switch (command) {
        case INSERT:
          coreObj.addPseudocodeLine(0, "Node temp = value;");
          coreObj.addPseudocodeLine(1, "last = temp;");
          coreObj.addPseudocodeLine(2, "if (isEmpty()) first = last;");
          coreObj.addPseudocodeLine(3, "else oldlast.next = last;");
          break;
        case DELETE:
          coreObj.addPseudocodeLine(0, "first = first.next;");
          coreObj.addPseudocodeLine(1, "if (isEmpty()) last = null;");
          break;
    }
  }
  
  this.init = function () {
    coreObj.newStateList();
    
    root = null;
    counterID = 0;

    coreObj.removeAll("node");
    
    coreObj.saveState();
    coreObj.begin();
  }

  this.isEmpty = function () { return root == null; }
  
  this.insert = function (newKey) {
    if (newKey.trim() == "") {
      coreObj.displayAlert("The input should not be empty.");
      return false;
    }
    
    this.root = this.insertTreeWithRoot(this.root, newKey);
    coreObj.reposition(this.root.drawing, 300, 100, ORIENTATION.BOTTOM);
    coreObj.saveState();
    
    coreObj.clearCustomClasses();
    coreObj.saveState();
    coreObj.begin();
  }
  
  this.insertTreeWithRoot = function (rootNode, newKey) {
    if (rootNode == null) { // we need to insert the new key/value in this (empty) subtree and return the new root of the subtree
      var newNode = new Node();
      
      newNode.key = newKey;
      newNode.leftChild = null;
      newNode.rightChild = null;
      newNode.N = 0;
      
      newNode.drawing = coreObj.newCircleObject(counterID, null, null, defaultProperties.shape.radius, newKey, null, "node", null, null);
      newNode.leftEdge = coreObj.newEdgeObject(counterID + "l", counterID, null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.CENTER, EDGE_POSITION.TOP, USER_TYPE_OBJ_CREATED.CIRCLE_EDGE_2);
      newNode.rightEdge = coreObj.newEdgeObject(counterID + "r", counterID, null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.CENTER, EDGE_POSITION.TOP, USER_TYPE_OBJ_CREATED.CIRCLE_EDGE_2);
      
      counterID++;
      
      return newNode;
    } else { 	// rootNode contains data
      rootNode.drawing.setShapeClass("traversed");
      coreObj.saveState();
      
      // we need to insert the new key/value in one of the left/right subtrees
      var cmp = newKey.localeCompare(rootNode.key);
      
      if (cmp < 0) { // newKey < rootNode.data -> we need to insert to the left subtree
        rootNode.leftEdge.setEdgeClass("traversed");
        
        rootNode.left = this.insertTreeWithRoot(rootNode.left, newKey);
        rootNode.leftEdge.setIdObjectB(rootNode.left.drawing.getID());
      } else if (cmp > 0) { // newKey > rootNode.data -> we need to insert to the right subtree
        rootNode.rightEdge.setEdgeClass("traversed");
        
        rootNode.right = this.insertTreeWithRoot(rootNode.right, newKey);
        rootNode.rightEdge.setIdObjectB(rootNode.right.drawing.getID());
      } else { 	// cmp == 0
          // -> newKey == rootNode.key -> newKey is already in the tree // -> update value
          rootNode.key = newKey;
      }
      
      rootNode.N = 1 + this.getSizeOfTreeWithRoot(rootNode.left) + this.getSizeOfTreeWithRoot(rootNode.right);
      return rootNode;
    }
  }
  
  this.getSizeOfTreeWithRoot = function (node) {
    if (node == null) return 0;
    return node.N;
  }
  
  this.height = function () {
    return this.getHeightOfTreeWithRoot(this.root);
  }
	
  this.getHeightOfTreeWithRoot = function (rootNode) {
    if (rootNode == null) return 0;
    var leftHeight = this.getHeightOfTreeWithRoot(rootNode.leftChild);
    var rightHeight = this.getHeightOfTreeWithRoot(rootNode.rightChild);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }
          
  this.enqueue = function(item, duration) {
    if (item.trim() == "") {
      coreObj.displayAlert("The input should not be empty.");
      return false;
    }
    
    var oldlast = last;

    if (coreObj.isLearningMode()) {
      coreObj.clearPseudocode();
      
      learnObj["newValue"] = coreObj.newUserObject("newValue", 500, 75, 25, item, "learning", null, USER_OBJ_TYPE.VALUE, true, null, null, null);
      
      var iterator = first;
      while(iterator != null) {
        iterator.drawing.setIsValidTarget(true);
        
        if (iterator.edge.getIdObjectB() == null) {
          iterator.edge.setIsValidTarget(true);
          
          //learnObj[iterator.edge.getID()] = coreObj.newUserObject("c" + iterator.edge.getID(), iterator.edge.getCoordinateX2(), iterator.edge.getCoordinateY2(), 10, null, "learning creator", null, USER_OBJ_TYPE.CREATOR, null, null, null, null);
        }

        iterator = iterator.next;
      }
      
      coreObj.learnState("Use the grey circles to create the final state.");
      
      DEFERRED.done(function() {
        coreObj.cancelLearn();
        coreObj.displayAlert("Correct solution!");
        self.enqueue(item, 0);
      });
      
    } else {
      this.generatePseudocode(ENQUEUE);
    
      if (oldlast != null) oldlast.drawing.setLabel("oldLast");

      last = new Node();
      last.item = item;
      last.next = null;
      
      last.drawing = coreObj.newSquareObject(++counterID, 200, 200, item, null, "node", null, null);
      last.edge = coreObj.newEdgeObject(counterID, last.drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT, USER_TYPE_OBJ_CREATED.SQUARE_EDGE_1);

      coreObj.saveState("Inserting new node.", 0);

      edgeLastD.setIdObjectB(last.drawing.getID());

      coreObj.saveState("Update the last pointer.", 1);

      last.drawing.moveShape((N+1)*100, 300);
      coreObj.saveState();

      if (this.isEmpty()) {
        first = last;

        edgeFirstD.setIdObjectB(last.drawing.getID());

        coreObj.saveState("If the list was empty, update the first pointer too.", 2);
      } else {
        oldlast.next = last;
      }

      if (oldlast != null) {
        oldlast.edge.setIdObjectB(last.drawing.getID());

        oldlast.drawing.setLabel();

        coreObj.saveState("Update the pointer of the previous node.", 3)
      }

      N++;
      
      coreObj.begin(duration);
    }
  }
  
  this.dequeue = function() {
    if (this.isEmpty()) {
      return false;
      coreObj.displayAlert("The queue is already empty.");
    }
    
    this.generatePseudocode(DEQUEUE);
    
    var item = first.item;
    
    coreObj.removeShape(first.drawing.getID());
    coreObj.saveState();

    first = first.next;
    
    if (first != null){
      edgeFirstD.setIdObjectB(first.drawing.getID());
      coreObj.saveState("Dequeue the first position.");
    }
    
    var iterator = first;
    
    while(iterator != null) {
      iterator.drawing.moveShape(iterator.drawing.getCoordinateX()-100, iterator.drawing.getCoordinateY());
      
      iterator = iterator.next;
    }
    
    if (this.isEmpty()){
      last = null;
      
      edgeFirstD.setIdObjectB(null);
      coreObj.saveState("Update the first pointer.", 0);
      edgeLastD.setIdObjectB(null);
      coreObj.saveState("Update the last pointer.", 1);
    } else {
      coreObj.saveState("Update the first pointer.", 0);
    }
    
    N--;
    
    coreObj.begin();
    return item;
  }
}
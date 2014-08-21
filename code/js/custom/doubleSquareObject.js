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

var DoubleSquareObject = function (coreObj, id, x, y, text1, text2, label, shapeClass, textClass, labelClass) {
  var self = this;
  
  this.coreObj = coreObj;
  
  // ELEMENTS THAT COMPOSE THIS CUSTOM SHAPE
  this.firstSquare = coreObj.newSquareObject(id + "-0", x, y, text1, label, shapeClass, textClass, labelClass);
  this.secondSquare = coreObj.newSquareObject(id + "-1", x + this.firstSquare.getWidth(), y, text2, null, shapeClass, textClass, labelClass);
  
  // DEFAULT METHODS
  
  this.getAttributes = function () {
    var json = [];
    
    json.push(this.firstSquare.getAttributes());
    json.push(this.secondSquare.getAttributes());
    
    return json;
  }
  
  this.draw = function (dur) {
    this.firstSquare.draw();
    this.secondSquare.draw();
  }
  
  this.getToRemove = function () {
    return this.firstSquare.getToRemove();
  }
  
  this.setToRemove = function (bool) {
    this.firstSquare.setToRemove(bool);
    this.secondSquare.setToRemove(bool);
  }
  
  this.cloneObject = function () {
    var clone = new DoubleSquareObject(this.coreObj);
    clone.cloneFirstSquare(this.firstSquare);
    clone.cloneSecondSquare(this.secondSquare);
    
    return clone;
  }
  
  this.cloneFirstSquare = function (source) {
    this.firstSquare = source.cloneObject();
  }
    
  this.cloneSecondSquare = function (source) {
    this.secondSquare = source.cloneObject();
  }
  
  // PARTICULAR METHODS
  
  this.moveShape = function (x, y) {
    this.firstSquare.moveShape(x, y);
    this.secondSquare.moveShape(x + this.firstSquare.getWidth(), y);
  }
}
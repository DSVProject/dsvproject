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
var DoubleSquareObject = function (id, x, y, text1, text2, label, rectClass, textClass, labelClass) {
  var firstSquare = new SquareObject(id + "-0", x, y, text1, label, rectClass, textClass, labelClass);
  var secondSquare = new SquareObject(id + "-1", x + firstSquare.getWidth(), y, text2, label, rectClass, textClass, labelClass);
  
  this.draw = function (dur) {
    firstSquare.draw();
    secondSquare.draw();
  }
  
  this.getToRemove = function () {
    return firstSquare.getToRemove();
  }
  
  this.remove = function (dur) {
    firstSquare.remove();
    secondSquare.remove();
  }
  
  this.cloneObject = function () {
    var clone = new DoubleSquareObject();
    clone.cloneFirstSquare(firstSquare);
    clone.cloneSecondSquare(secondSquare);
    
    return clone;
  }
  
  this.cloneFirstSquare = function(source) {
    firstSquare = source.cloneObject();
  }
    
  this.cloneSecondSquare = function(source) {
    secondSquare = source.cloneObject();
  }
  
  this.moveShape = function (x, y) {
    firstSquare.moveShape(x, y);
    secondSquare.moveShape(x+firstSquare.getWidth(), y);
  }
  
}
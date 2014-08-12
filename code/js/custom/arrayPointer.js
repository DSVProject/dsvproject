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
    mArray[i].drawing = coreObj.newSquareObject("a" + i, (i+1)*50, 400, null, i, null, null, null, EDGE_POSITION.TOP, EDGE_POSITION.TOP);
    mArray[i].edge = coreObj.newEdgeObject("a" + i, mArray[i].drawing.getID(), null, null, EDGE_TYPE.UNIDIRECTIONAL);
    mArray[i].edge.setStroke(defaultProperties.edge.null.stroke);
    mArray[i].edge.setMarkerEnd(defaultProperties.marker.null.end);
  }
  
  return mArray;
}
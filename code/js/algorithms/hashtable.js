var Node = function () {
  var item,
    pointer,
    drawing,
    edge;
}

var Hashtable = function () {
  var self = this;
  var coreObj = new CoreObject();
  
  coreObj.newStateList();
  coreObj.saveState();

  var N = 0;
  var counterID = 0;
  
  var mArray;
  
  mArray = new ArrayPointer(coreObj, 10);
  
  /*
  var test = [];
  
  test[0] = new Node();
  test[0].drawing = coreObj.newSquareObject("test0", 50, 50, "00", null, null, null, null, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
  
  test[1] = new Node();
  test[1].drawing = coreObj.newSquareObject("test1", 150, 50, "01", null, null, null, null, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
  
  test[0].edge = coreObj.newEdgeObject("test0", test[0].drawing.getID(), test[1].drawing.getID(), null, EDGE_TYPE.UNDIRECTED);
  test[0].edge.setStroke(defaultProperties.edge.default.stroke);
  
  test[2] = new Node();
  test[2].drawing = coreObj.newSquareObject("test2", 250, 50, "02", null, null, null, null, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
  
  test[3] = new Node();
  test[3].drawing = coreObj.newSquareObject("test3", 350, 50, "03", null, null, null, null, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
  
  test[2].edge = coreObj.newEdgeObject("test2", test[2].drawing.getID(), test[3].drawing.getID(), null, EDGE_TYPE.UNIDIRECTIONAL);
  test[2].edge.setStroke(defaultProperties.edge.default.stroke);
  test[2].edge.setMarkerEnd(defaultProperties.marker.default.end);
  
  test[4] = new Node();
  test[4].drawing = coreObj.newSquareObject("test4", 450, 50, "04", null, null, null, null, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
  
  test[5] = new Node();
  test[5].drawing = coreObj.newSquareObject("test5", 550, 50, "05", null, null, null, null, EDGE_POSITION.RIGHT, EDGE_POSITION.LEFT);
  
  test[4].edge = coreObj.newEdgeObject("test4", test[4].drawing.getID(), test[5].drawing.getID(), null, EDGE_TYPE.BIDIRECTIONAL);
  test[4].edge.setStroke(defaultProperties.edge.default.stroke);
  test[4].edge.setMarkerStart(defaultProperties.marker.default.start);
  test[4].edge.setMarkerEnd(defaultProperties.marker.default.end);
  */


  coreObj.saveState();
  coreObj.play(0);
  
  this.getAnim = function () {
    return coreObj;
  }
}
// Defines an Array of "Cells".
// All the animations are controled from this file.

var ArrayObject = function(){
  var coreAnim = new CoreAnimObject();

  this.init = function(type){
    coreAnim.init("array", type);
  }
  /*
  // General global variables
  var arrayCapacity = 16;
  
  // Json object that will be used to change the graphics on the screen
  var internalArray = [];
  
  // Internal array that keeps a copy of the properties of all objects on the screen
  var cellList = {};
  
  // Array to control the steps of the current animation
  var stateList = {};
  
  // Number of iterations of the current animation
  var iterationNumber = 0;
  
  // Initiliase the graphic objects related to this implementation
  this.init = function(type){
    // This groups will hold the graphic elements          
    var arrayGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-array");
      
    var labelGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-label");
      
    var textGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-text");
        
    var edgeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-edge");
    
    // Generate the properties of the specific Cell elements
    if (type == "stack"){
      cellList["top"] = new ArrayCellObject("top", 50, 50, 0, "cell", "innerText");
      internalArray.push(cellList["top"].getAttributes());
      
    } else { //queue
      cellList["head"] = new ArrayCellObject("head", 50, 50, 0, "cell", "innerText");
      internalArray.push(cellList["head"].getAttributes());
      
      cellList["tail"] = new ArrayCellObject("tail", 150, 50, 0, "cell", "innerText");
      internalArray.push(cellList["tail"].getAttributes());
    }
    
    // Generate element properties for each array posisition
    for(var i=0; i<arrayCapacity; i++){
      cellList[i] = new ArrayCellObject(i, (i+1)*50, 300, null, "cell", "innerText");
      internalArray.push(cellList[i].getAttributes());
    }
    
    // Create the graphic elements based on the data contained on internalArray
    var positions = arrayGroup.selectAll(SVG_RECT)
        .data(internalArray, function (d) {return d.id;})
      .enter().append(SVG_RECT)              
        .attr("id", function (d) {return "array-" + d.id;})
        .attr("class", function (d) {return d.cell.class})
        .attr("x", function (d) {return d.cell.x;})
        .attr("y", function (d) {return d.cell.y;})
        .attr("height", function (d) {return d.cell.height;})
        .attr("width", function (d) {return d.cell.width;})
        .attr("fill", function (d) {return d.cell.fill;})
        .attr("fill-opacity", function (d) {return d.cell.fillOpacity;})
        .attr("stroke", function (d) {return d.cell.stroke;})
        .attr("stroke-width", function (d) {return d.cell.strokeWidth;});

      //.on("mouseover", function(){d3.select(this).style("fill", "pink");})
      //.on("mouseout", function(){d3.select(this).style("fill", "white");});
    
    var labels = labelGroup.selectAll("text")
        .data(internalArray, function (d) {return d.id;})
      .enter().append("text")
        .attr("class", "label")
        .attr("x", function (d) {return d.cell.x + 25;})
        .attr("y", function (d) {return d.cell.y + 80;})
        .text(function (d) { return d.id; });
      
    var texts = textGroup.selectAll("text")
        .data(internalArray, function (d) {return d.id;})
      .enter().append("text")
        .attr("id", function (d) {return "text-" + d.id; })
        .attr("class", function (d) {return d.text.class})
        .attr("x", function (d) {return d.text.x;})
        .attr("y", function (d) {return d.text.y;})
        .attr("fill", function (d) {return d.text.fill;})
        .attr("font-family", function (d) {return d.text.fontFamily;})
        .attr("font-weigh", function (d) {return d.text.fontWeight;})
        .attr("font-size", function (d) {return d.text.fontSize;})
        .attr("text-anchor", function (d) {return d.text.textAnchor;})        
        .text(function (d) {return d.text.text;});
  }
  
  // Animation Control Functions
  
  this.newStateList = function(){
    stateList = {};
    iterationNumber = 0;
  }
  
  function saveState(structure, status){
    var state = {};
    
    state["data"] = deepCopy(structure);
    state["status"] = status;
  
    stateList[iterationNumber] = state;
    iterationNumber++;
  }
  
  function play(){
    if(stateList == null) return;
    iterationNumber = 0;
    
    // The first iteration is always the original state, so we send 0 as the duration
    draw(stateList[iterationNumber], 0);
    
    setTimeout(function(){
      animate();
    }, DEFAULT_ANIMATION_DURATION);
  }
  
  function animate(){
    next();

    setTimeout(function(){
      animate();
    }, DEFAULT_ANIMATION_DURATION);
  }
  
  function next(){
    if(iterationNumber < 0) iterationNumber = 0;
    
    iterationNumber++;
    
    if(iterationNumber >= stateList.length) {
		  iterationNumber = stateList.length-1;
		  return;
	  }

    draw(stateList[iterationNumber]);
  }

  // Structure Control Functions
  */
  this.empty = function(){
    coreAnim.clearArray();
  }
  
  // Stack Functions
  
  this.pop = function(removedIndex){
    coreAnim.clearLog();
    
    coreAnim.newStateList();
    
    coreAnim.setCellColor(removedIndex, CELL_FILL_DECREMENT);
    coreAnim.setValue(removedIndex, null);
    coreAnim.setCellColor(removedIndex, CELL_FILL_DEFAULT);
    
    coreAnim.setCellColor("top", CELL_FILL_INCREMENT);
    coreAnim.setValue("top", removedIndex);
    coreAnim.setCellColor("top", CELL_FILL_DEFAULT);
    
    coreAnim.play();
    
    /*
    clearLog();
    
    this.newStateList();
    saveState(internalArray, "The current stack.");
    
    blinkContainer(cellList[removedValue].getID(), CELL_FILL_DECREMENT);
    cellList[removedValue].setText(null);
    saveState(internalArray, "Pop the top position.");
    blinkContainer(cellList[removedValue].getID(), CELL_FILL_DEFAULT);


    blinkContainer("top", CELL_FILL_INCREMENT);
    cellList["top"].setText(removedValue);
    saveState(internalArray, "Update the top index.");
    blinkContainer("top", CELL_FILL_DEFAULT);
    
    play();
    */
  }
  
  this.push = function(insertedValue, insertedIndex, newTop){
    coreAnim.clearLog();
    coreAnim.newStateList();
    coreAnim.createArrayHighlight("top");
    coreAnim.moveHighlight(insertedIndex);
    coreAnim.setValue(insertedIndex, insertedValue);
    coreAnim.deleteHighlight();
    
    coreAnim.setCellColor("top", CELL_FILL_INCREMENT);
    coreAnim.setValue("top", newTop);
    coreAnim.setCellColor("top", CELL_FILL_DEFAULT);
    
    coreAnim.play();
  
    /*
    clearLog();
    
    this.newStateList();
    saveState(internalArray, "The current stack.");
    
    createArrayHighlight("top");
    moveHighlight(insertedIndex);
    alert("cheguei aqui");
    cellList[insertedIndex].setText(insertedValue);
    saveState(internalArray, "Inserting value.");
    deleteHighlight();
    
    blinkContainer("top", CELL_FILL_INCREMENT);
    cellList["top"].setText(newTop);
    saveState(internalArray, "Update the top index.");
    blinkContainer("top", CELL_FILL_DEFAULT);
    
    play();
    */
  }
  
  // Queue Functions
  
  this.enqueue = function(insertedValue, insertedIndex, newTail){
    clearLog();
    
    this.newStateList();
    saveState(internalArray, "The current queue.");
    
    if ($("#chk-learn").is(":checked")){
      createNewValue(insertedValue);
    } else {
      createArrayHighlight("tail");
      moveHighlight(insertedIndex);
      cellList[insertedIndex].setText(insertedValue);
      saveState(internalArray, "Inserting value.");
      deleteHighlight();
      
      blinkContainer("tail", CELL_FILL_INCREMENT);
      cellList["tail"].setText(newTail);
      saveState(internalArray, "Update the tail index.");
      blinkContainer("tail", CELL_FILL_DEFAULT);
    }
    
    play();
  }
  
  this.dequeue = function(removedValue, newHead){
    clearLog();
    
    this.newStateList();
    saveState(internalArray, "The current queue.");
    
    blinkContainer(cellList[removedValue].getID(), CELL_FILL_DECREMENT);
    cellList[removedValue].setText(null);
    saveState(internalArray, "Dequeue the first used position.");
    blinkContainer(cellList[removedValue].getID(), CELL_FILL_DEFAULT);
    
    
    blinkContainer("head", "palegreen");
    updatePointer("head", newHead);
    blinkContainer("head", "white");
    
    play();
  }
  
  /*
  // Other Functions
  function createNewValue(value){
    cellList["newValue"] = new ArrayCellObject("newValue", 500, 50, value, "cell", "innerText");
    
    internalArray.push(cellList["newValue"].getAttributes());
    
    saveState(internalArray, "Testing");
  }
  
  
  function createArrayHighlight(id){
    for(var k in internalArray) {
      if (internalArray[k].id == id){
        cellList["highlight"] = new ArrayCellObject("highlight", internalArray[k]["cell"]["x"], internalArray[k]["cell"]["y"], null, "cell-highlight", "innerText");
        
        
        cellList["highlight"].setFillOpacity(animProperties["cell"]["highlight"]["fill-opacity"]);
        cellList["highlight"].setStroke(animProperties["cell"]["highlight"]["stroke"]);
        cellList["highlight"].setStrokeWidth(animProperties["cell"]["highlight"]["stroke-width"]);
       
        break;
      }
    }
  
    internalArray.push(cellList["highlight"].getAttributes());
    
    saveState(internalArray, "The current " + id + " index.");
  };
  
  function moveHighlight(insertedIndex){
    cellList["highlight"].moveCell(cellList[insertedIndex].getCoordinateX(), cellList[insertedIndex].getCoordinateY());
    saveState(internalArray, "Where the new value should be inserted.");
  }
  
  function deleteHighlight(){
    for(var k in internalArray) {
      if (internalArray[k].id == "highlight") {
        internalArray.splice(k,1);
        break;
      }
    }
    
    saveState(internalArray);
  }
  
  function changeValue(insertedValue, insertedIndex){
    for(var k in internalArray) {
      if (internalArray[k].id == insertedIndex) {
        internalArray[k]["text"]["text"] = insertedValue;
        cellList[insertedIndex].setText(insertedValue);
        break;
      }
    }
    
    saveState(internalArray, "Inserting value.");
  }
  
  function updatePointer(id, newTop){
    for(var k in internalArray) {
      if (internalArray[k].id == id) {
        internalArray[k]["text"]["text"] = newTop;
        cellList[id].setText(newTop);
        break;
      }
    }
    
    saveState(internalArray, "Update the " + id + " index.");
  }
  
  function blinkContainer(id, color){
    for(var k in internalArray) {
      if (internalArray[k].id == id) {
        internalArray[k]["cell"]["fill"] = color;
        break;
      }
    }
    
    saveState(internalArray);
  }
  
  function draw(currentData, dur, del){
    if(dur == null || isNaN(dur) || dur <= 0) dur = DEFAULT_ANIMATION_DURATION;
    if(del == null || isNaN(del) || del <= 0) del = DEFAULT_ANIMATION_DELAY;
  
    var cells = d3.select("#g-array").selectAll(SVG_RECT)
        .data(currentData["data"], function (d) {return d.id;});
      
    cells.enter().append(SVG_RECT)              
        .attr("id", function (d) {return "array-" + d.id;})
        .attr("class", function (d) {return d.cell.class});
    cells.transition()
        .duration(dur)
        .attr("x", function (d) {return d.cell.x;})
        .attr("y", function (d) {return d.cell.y;})
        .attr("height", function (d) {return d.cell.height;})
        .attr("width", function (d) {return d.cell.width;})
        .attr("fill", function (d) {return d.cell.fill;})
        .attr("fill-opacity", function (d) {return d.cell.fillOpacity;})
        .attr("stroke", function (d) {return d.cell.stroke;})
        .attr("stroke-width", function (d) {return d.cell.strokeWidth;});
    cells.exit()
        .remove();
    
    /*   
    var labels = d3.select("#g-label").selectAll("text")
        .data(currentData["data"], function (d) {return d.id;});
        
    labels.enter().append("text")
        .attr("class", "label")
        .attr("x", function (d) {return d.cell.x + 25;})
        .attr("y", function (d) {return d.cell.y + 80;})
        .text(function (d) { return d.id; });
    labels.exit()
        .remove();

      
    var texts = d3.select("#g-text").selectAll("text")
        .data(currentData["data"], function (d) {return d.id;});
        
    texts.enter().append("text")
        .attr("id", function (d) {return "text-" + d.id; })
        .attr("class", function (d) {return d.text.class});
    texts.transition()
        .duration(dur)
        .attr("x", function (d) {return d.text.x;})
        .attr("y", function (d) {return d.text.y;})
        .attr("fill", function (d) {return d.text.fill;})
        .attr("font-family", function (d) {return d.text.fontFamily;})
        .attr("font-weigh", function (d) {return d.text.fontWeight;})
        .attr("font-size", function (d) {return d.text.fontSize;})
        .attr("text-anchor", function (d) {return d.text.textAnchor;})   
        .text(function (d) {return d.text.text;});
    texts.exit()
        .remove();

    if(typeof currentData["status"] != 'undefined'){
      d3.select("#log")
          .append("div")
          .transition()
          .duration(dur)
          .text(currentData["status"]);
    }
  }
  
  function clearLog(){
    d3.select("#log").selectAll("div")
        .remove();
  }
  */
}
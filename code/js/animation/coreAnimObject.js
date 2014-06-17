// All key methods related to animation are located in this file
var CoreAnimObject = function(){
  
  // Json object that will be used to change the graphics on the screen
  var internalJson = [];
  
  // Internal array that keeps an instance of all objects on the screen
  var objectList = {};
  
  // Array to control the steps of the current animation
  var stateList = {};
  
  // Number of iterations of the current animation
  var iterationNumber = 0;
  
  // Initiliase the graphic objects related to this implementation
  this.init = function(type, subtype){
    // This groups will hold the graphic elements          
    var shapeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-shape");
      
    var labelGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-label");
      
    var textGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-text");
        
    var edgeGroup = d3.select("#g-main")
        .append("g")
        .attr("id", "g-edge");
    /**
    if (type == "array") {
      // Generate the properties of the specific Cell elements
      if (subtype == "stack"){
        objectList["top"] = new ArrayCellObject("top", 50, 50, 0, "cell", "innerText");
        internalJson.push(objectList["top"].getAttributes());
        
      } else { //queue
        objectList["head"] = new ArrayCellObject("head", 50, 50, 0, "cell", "innerText");
        internalJson.push(objectList["head"].getAttributes());
        
        objectList["tail"] = new ArrayCellObject("tail", 150, 50, 0, "cell", "innerText");
        internalJson.push(objectList["tail"].getAttributes());
      }
      
      // Generate element properties for each array posisition
      for(var i=0; i<16; i++){
        objectList[i] = new ArrayCellObject(i, (i+1)*50, 300, null, "cell", "innerText");
        internalJson.push(objectList[i].getAttributes());
      }
      
      // Create the graphic elements based on the data contained on internalArray
      var positions = cellGroup.selectAll(SVG_RECT)
          .data(internalJson, function (d) {return d.id;})
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
          .data(internalJson, function (d) {return d.id;})
        .enter().append("text")
          .attr("class", "label")
          .attr("x", function (d) {return d.cell.x + 25;})
          .attr("y", function (d) {return d.cell.y + 80;})
          .text(function (d) { return d.id; });
        
      var texts = textGroup.selectAll("text")
          .data(internalJson, function (d) {return d.id;})
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
    **/
  }
  
  // Animation Control Functions
  /**
    * Creates a snapshot of the current state of all the objects on the screen.
    * All other functions that change any property of a graphic element should call this function as a last instruction. 
    *
    * @param {String} status : an optional message about the changes, that will appear on the screen log.
    */
  this.saveState = function(status){
    var state = {};
    
    state["data"] = deepCopy(internalJson);
    state["status"] = status;
  
    stateList[iterationNumber] = state;
    iterationNumber++;
  }
  
  /**
    * Reset the state list.
    * Called as the first instruction, before making changes on the graphic elements.
    */
  this.newStateList = function(){
    stateList = {};
    iterationNumber = 0;
    
    this.saveState("Initial state.");
  }
  
  /**
    * Start playing all the states saved in StateList.
    * 
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  this.play = function(duration){
    if(duration == null || isNaN(duration) || duration < 0) duration = DEFAULT_ANIMATION_DURATION;
    
    if(stateList == null) return;
    iterationNumber = 0;
    
    draw(stateList[iterationNumber], duration);
    
    setTimeout(function(){
      next(duration);
    }, duration);
  }
  
  /**
    * Call the next item from StateList
    *
    * @param {Number} duration : optional, if null the default animation duration value will be used.
    */
  function next(duration){
    if(iterationNumber < 0) iterationNumber = 0;
    
    iterationNumber++;
    
    if(iterationNumber < Object.keys(stateList).length) {
		  draw(stateList[iterationNumber], duration);
		  
		  setTimeout(function(){
        next(duration);
      }, duration);
	  }
  }
  
  // Structure Control Functions
  
  /**
    * Set the text element of one graphic unit.
    *
    * @param {String || Number} id : the id of the item.
    * @param {String} newValue : the new value that will be set.
    */
  this.setValue = function(id, newValue){
    objectList[id].setText(newValue);
    this.saveState(id + " value set to " + newValue);
  }
  
  this.setCellColor = function(id, color){
    objectList[id].setFill(color);
    this.saveState();
  }
  
  /**
    * Create an initial graphic element, that will appear on the screen when the page is loaded.
    * When calling this function all the animations will happen at once, and not step by step.
    *
    * @param {String || Number} id : the id of the item.
    * @param {Number} x : the x coordinate of the item.
    * @param {Number} y : the y coordinate of the item.
    * @param {String} value : the value of the item.
    */
  this.createNewInitialItem = function(id, x, y, value){
    objectList[id] = new ArrayCellObject(id, x, y, value, "shape", "innerText");
    
    internalJson.push(objectList[id].getAttributes());
    
    return objectList[id];
  }
  
  // Other Functions
  this.createNewCell = function(id, x, y, value){
    objectList[id] = new ArrayCellObject(id, x, y, value, "shape", "innerText");
    
    internalJson.push(objectList[id].getAttributes());
    
    this.saveState("New cell created.");
  }
  
  
  this.createArrayHighlight = function(id){
    objectList["highlight"] = new ArrayCellObject("highlight", objectList[id].getCoordinateX(), objectList[id].getCoordinateY(), null, "highlight", "innerText");
    
    /*
    objectList["highlight"].setFillOpacity(animProperties["cell"]["highlight"]["fill-opacity"]);
    objectList["highlight"].setStroke(animProperties["cell"]["highlight"]["stroke"]);
    objectList["highlight"].setStrokeWidth(animProperties["cell"]["highlight"]["stroke-width"]);
    */
  
    internalJson.push(objectList["highlight"].getAttributes());
    
    this.saveState("The current " + id + " index.");
  };
  
  this.moveHighlight = function(insertedIndex){
    objectList["highlight"].moveShape(objectList[insertedIndex].getCoordinateX(), objectList[insertedIndex].getCoordinateY());
    this.saveState("Where the new value should be inserted.");
  }
  
  this.deleteHighlight = function(){
    for(var k in internalJson) {
      if (internalJson[k].id == "highlight") {
        internalJson.splice(k,1);
        break;
      }
    }
    
    this.saveState();
  }
  
  function draw(currentData, dur){
    if(dur == null || isNaN(dur) || dur < 0) dur = DEFAULT_ANIMATION_DURATION;
  
    var cells = d3.select("#g-shape").selectAll()
        .data(currentData["data"], function (d) {return d.id;});
      
    cells.enter().append(SVG_RECT) 
        .filter(function (d) {return d.shape == SVG_RECT;})           
        .attr("id", function (d) {return "array-" + d.id;})
        .attr("class", function (d) {return d.rect.class});
    cells.transition()
        .duration(dur)
        .attr("x", function (d) {return d.rect.x;})
        .attr("y", function (d) {return d.rect.y;})
        .attr("height", function (d) {return d.rect.height;})
        .attr("width", function (d) {return d.rect.width;})
        .attr("fill", function (d) {return d.rect.fill;})
        .attr("fill-opacity", function (d) {return d.rect.fillOpacity;})
        .attr("stroke", function (d) {return d.rect.stroke;})
        .attr("stroke-width", function (d) {return d.rect.strokeWidth;});
    cells.exit()
        .remove();
     
    var labels = d3.select("#g-label").selectAll("text")
        .data(currentData["data"], function (d) {return d.id;});
        
    labels.enter().append("text")
        .attr("class", "label")
        .attr("x", function (d) {return d.rect.x + 25;})
        .attr("y", function (d) {return d.rect.y + 80;})
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
  
  this.clearLog = function(){
    d3.select("#log").selectAll("div")
        .remove();
  }
}
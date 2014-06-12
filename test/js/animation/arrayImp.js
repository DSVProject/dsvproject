// this groups will hold the graphic elements          
var arrayGroup = panGroup.append("g")
  .attr("id", "g-array");
  
var labelGroup = panGroup.append("g")
  .attr("id", "g-label");
  
var textGroup = panGroup.append("g")
  .attr("id", "g-text");

var ArrayImp = function(){
  var internalArray = {};

  this.init = function(type){
    if (type == "stack"){
      internalArray = [
        {"idx":0,"x":50,"y":300, "value":null},
        {"idx":1,"x":100,"y":300, "value":null},
        {"idx":2,"x":150,"y":300, "value":null},
        {"idx":3,"x":200,"y":300, "value":null},
        {"idx":4,"x":250,"y":300, "value":null},
        {"idx":5,"x":300,"y":300, "value":null},
        {"idx":6,"x":350,"y":300, "value":null},
        {"idx":7,"x":400,"y":300, "value":null},
        {"idx":8,"x":450,"y":300, "value":null},
        {"idx":9,"x":500,"y":300, "value":null},
        {"idx":10,"x":550,"y":300, "value":null},
        {"idx":11,"x":600,"y":300, "value":null},
        {"idx":12,"x":650,"y":300, "value":null},
        {"idx":13,"x":700,"y":300, "value":null},
        {"idx":14,"x":750,"y":300, "value":null},
        {"idx":15,"x":800,"y":300, "value":null},
        {"idx":"top","x":50,"y":50, "value":0}
      ]
    }else{//queue
      internalArray = [
        {"idx":0,"x":50,"y":300, "value":null},
        {"idx":1,"x":100,"y":300, "value":null},
        {"idx":2,"x":150,"y":300, "value":null},
        {"idx":3,"x":200,"y":300, "value":null},
        {"idx":4,"x":250,"y":300, "value":null},
        {"idx":5,"x":300,"y":300, "value":null},
        {"idx":6,"x":350,"y":300, "value":null},
        {"idx":7,"x":400,"y":300, "value":null},
        {"idx":8,"x":450,"y":300, "value":null},
        {"idx":9,"x":500,"y":300, "value":null},
        {"idx":10,"x":550,"y":300, "value":null},
        {"idx":11,"x":600,"y":300, "value":null},
        {"idx":12,"x":650,"y":300, "value":null},
        {"idx":13,"x":700,"y":300, "value":null},
        {"idx":14,"x":750,"y":300, "value":null},
        {"idx":15,"x":800,"y":300, "value":null},
        {"idx":"head","x":50,"y":50, "value":0},
        {"idx":"tail","x":150,"y":50, "value":0}
      ]
    }
    
    // this code create the graphic elements
    var positions = arrayGroup.selectAll(SHAPE_RECT)
      .data(internalArray)
      .enter()
      .append(SHAPE_RECT)              
      .attr("id", function (d) {return "array-" + d.idx; })
      .attr("class", "array-sqr")
      .attr("x", function (d) {return d.x;})
      .attr("y", function (d) {return d.y;})
      .attr("height", 50)
      .attr("width", 50);
      //.on("mouseover", function(){d3.select(this).style("fill", "pink");})
      //.on("mouseout", function(){d3.select(this).style("fill", "white");});
      
    var labels = labelGroup.selectAll("text")
      .data(internalArray)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", function (d) {return d.x + 25;})
      .attr("y", function (d) {return d.y + 80;})
      .text(function (d) { return d.idx; });
      
    var texts = textGroup.selectAll("text")
      .data(internalArray)
      .enter()
      .append("text")
      .attr("id", function (d) {return "text-" + d.idx; })
      .attr("class", "label")
      .attr("x", function (d) {return d.x + 25;})
      .attr("y", function (d) {return d.y + 30;})
      .text(function (d) {return d.value;})
  
    // general functions
  
    // animation functions
    function createHighlight(){        
      d3.select("#array-top")
        .append("rect")
        .attr("id", "array-highlight")
        .attr("class", "array-highlight")
        .attr("x", 50)
        .attr("y", 50)
        .attr("height", 50)
        .attr("width", 50);
    };
  
    function moveHighlight(){
      d3.select("#array-highlight")
        .transition()            
        .delay(100)            
        .duration(1500)
        .attr("x", internalArray[stack.N]["x"])
        .attr("y", internalArray[stack.N]["y"]);
    }
  
    function deleteHighlight(){
      d3.select("#array-highlight")
        .remove();
    } 
  
    function findTop(){        
      var highlight = d3.select("#g-array")
        .append("rect")
        .attr("id", "array-highlight")
        .attr("class", "array-highlight")
        .attr("x", 50)
        .attr("y", 50)
        .attr("height", 50)
        .attr("width", 50)
        
        highlight.transition()            
          .delay(100)            
          .duration(3000)
          .attr("x", internalArray[stack.N]["x"])
          .attr("y", internalArray[stack.N]["y"])
          .remove();
    };
  }
}
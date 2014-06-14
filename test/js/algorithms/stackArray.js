// Defines a Stack object (Array Implementation). Used to keep track of the object internally and to interact with the animations

var StackArray = function(){
    var attributeList = {        
      "rect":{
        "class": null,
        "x": null,
        "y": null,
        "height": null,
        "width": null,
        "fill": null,
        "stroke": null,
        "stroke-width": null
      },
    
      "text":{
        "class": null,
        "x": null,
        "y": null,
        "fill": null,
        "font-family": null,
        "font-size": null,
        "text-anchor": null,
        "text": null
      }
    }

    var anim = new ArrayImp();

    var internalStack = [];
    var cap = 16;
    var N = 0;
    
    this.getAnim = function(){
      return anim;
    }
    
    this.initAttList = function(){
      attributeList["rect"]["class"] = null;
      attributeList["rect"]["x"] = null;
      attributeList["rect"]["y"] = null;
      attributeList["rect"]["height"] = null;
      attributeList["rect"]["width"] = null;
      attributeList["rect"]["fill"] = null;
      attributeList["rect"]["stroke"] = null;
      attributeList["rect"]["stroke-width"] = null;
      
      attributeList["text"]["class"] = null;
      attributeList["text"]["x"] = null;
      attributeList["text"]["y"] = null;
      attributeList["text"]["fill"] = null;
      attributeList["text"]["font-family"] = null;
      attributeList["text"]["text-anchor"] = null;
      attributeList["text"]["text"] = null;
    }
    
    this.init = function() {
      internalStack = [];
      N = 0;
    }
    
    this.isEmpty = function() { return N == 0; }
    
    this.size = function() { return N; }
    
    this.push = function(item) {
      var stateList = [];
      
      anim.createHighlight();
      //anim.moveHighlight();
      
      //alert("test");
      var currentState = this.createState("#array-highlight", SVG_RECT);
      
      //alert(currentState["#array-highlight"]["x"]);
      currentState["status"] = "The current top";
      stateList.push(currentState);
      
      /*

      
      currentState = createState();
      
      currentState["p"]["#array-top"]["state"] = CELL_HIGHLIGHT;
      currentState["p"]["#array-top"]["x"] = x;
      currentState["p"]["#array-top"]["y"] = y;
      currentState["status"] = "The next free position";
      //Move to the next free position of the array
      stateList.push(currentState);
      
      currentState = createState();
      
      currentState["p"]["#array-top"]["state"] = CELL_HIGHLIGHT;
      currentState["p"]["#array-top"]["x"] = x;
      currentState["status"] = "The next free position";
      //Assign the inserted value
      stateList.push(currentState);
      
      //Delete highlight
      
      //Update top value
      
      //Blink top position
      */
      
    
      if(N < cap && item!="") {
        internalStack[N] = item;

        d3.select("#text-"+N)
          .transition()
          //.style("font-size", "0px")
          //.transition()
          .text(item);
          //.transition()
          //.duration(1000)
          //.style("font-size", "18px");
        N++;
        
        d3.select("#text-top")
          .transition()
          .text(N);
      }
      
      return;
    }
    
    this.pop = function() {
      if(!this.isEmpty()){
        N--;
        d3.select("#text-"+N)
          .transition()
          .text(null);
        d3.select("#text-top")
          .transition()
          .text(N);
        return internalStack[N];
      }
    }
    
    this.displayAll = function() { 
      var array = [];
      
      if(isEmpty() == true)
        return null;
      for(i=0;i<N;i++)
        array[i] = internalStack[i];
      return array; 
    }
    
    this.createState = function (id, type){
      this.initAttList()

      if (type == SVG_RECT){
        attributeList[type]["class"] = $(id).attr("class");
        attributeList[type]["x"] = $(id).attr("x");
        attributeList[type]["y"] = $(id).attr("y");
        attributeList[type]["height"] = $(id).attr("height");
        attributeList[type]["width"] = $(id).attr("width");
        //attributeList[type]["fill"] = $(id).attr("fill");
        //attributeList[type]["stroke"] = $(id).attr("stroke");
        //attributeList[type]["stroke-width"] = $(id).attr("stroke-width");
      } else { // type = SVG_TEXT
        attributeList[type]["class"] = $(id).attr("class");
        attributeList[type]["x"] = $(id).attr("x");
        attributeList[type]["y"] = $(id).attr("y");
        //attributeList[type]["fill"] = $(id).attr("fill");
        //attributeList[type]["font-family"] = $(id).attr("font-family");
        //attributeList[type]["text-anchor"] = $(id).attr("text-anchor");
        attributeList[type]["text"] = $(id).text();
      }
      
      var state = {};
      
      state[id] = {};
      
      state[id]["class"] = attributeList[type]["class"];
      state[id]["x"] = attributeList[type]["x"];
      state[id]["y"] = attributeList[type]["y"];
      state[id]["height"] = attributeList[type]["height"];
      state[id]["width"] = attributeList[type]["width"];
      
      state[id]["class"] = attributeList[type]["class"];
      state[id]["x"] = attributeList[type]["x"];
      state[id]["y"] = attributeList[type]["y"];
      state[id]["text"] = attributeList[type]["text"];

      
      return state;
    }
}
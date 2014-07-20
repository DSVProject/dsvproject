const MAIN_SVG_WIDTH = 900;
const MAIN_SVG_HEIGHT = 500;

const SVG_CIRCLE = "circle";
const SVG_RECT = "rect";
const SVG_TEXT = "text";
const SVG_LINE = "line";

const ANIMATION_PAUSE = 0;
const ANIMATION_PLAY = 1;
const ANIMATION_STOP = -1;

//Values in miliseconds
const DEFAULT_ANIMATION_DURATION = 500;

const EDGE_UNDIRECTED = 0;
const EDGE_UNIDIRECTIONAL = 1;
const EDGE_BIDIRECTIONAL = 2;

const defaultProperties = {
  "width":50,
  "height":50,
  "font-family":"sans-serif",
  "font-size":18,
  "text-anchor":"middle",
  
  /*
  "shape":{
    "stroke":{
      "default":"black",
      "draggable":"tomato"
    },
    "stroke-width":{
      "default":2,
      "draggable":2
    },
    "fill":{
      "default":"white",
      "draggable":"grey"
    },
    "fill-opacity":{
      "default":1.0,
      "draggable":0.2
    }
  }
  */
  
  "shape":{
    "default":{
      "stroke":"black",
      "stroke-width":2,
      "fill":"white",
      "fill-opacity":1.0
    },
    "draggable":{
      "stroke":"tomato",
      "stroke-width":2,
      "fill":"grey",
      "fill-opacity":0.2
    },
    "update":{
      "fill":"lightskyblue"
    },
    "delete":{
      "fill":"tomato"
    }
  },
  "text":{
    "default":{
      "stroke":"black"
    },
    "innerTextBlack":{
      "stroke":"black"
    },
    "innerTextWhite":{
      "stroke":"ivory"
    }
  },
  "edge":{
    "default":{
      "stroke":"black",
      "stroke-width":3
    },
    "null":{
      "stroke":"tomato",
      "stroke-width":5
    }
  },
  "marker":{
    "null":{
      "start": "url(#reverseArrowNull)",
      "end": "url(#arrowNull)"
    },
    "default":{
      "start": "url(#reverseArrowDefault)",
      "end": "url(#arrowDefault)"
    }
  }
}
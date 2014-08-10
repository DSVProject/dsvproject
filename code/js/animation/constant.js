const MAIN_SVG_WIDTH = 1200;
const MAIN_SVG_HEIGHT = 500;

const SVG_CIRCLE = "circle";
const SVG_RECT = "rect";
const SVG_TEXT = "text";
const SVG_LINE = "line";
const SVG_MARKER = "marker";

//Values in miliseconds
const DEFAULT_ANIMATION_DURATION = 500;

/**
  * Values used by CoreAnimObject, to control the playing status of the animation.
  *
  * @const 
  */
const ANIMATION_STATUS = {
  PAUSE: 0,
  PLAY: 1,
  STOP: -1
};

/**
  * Values used when creating an instance of EdgeObject.
  *
  * @const 
  */
const EDGE_TYPE = {
  UNDIRECTED: 0,
  UNIDIRECTIONAL: 1,
  BIDIRECTIONAL: 2
};

/**
  * Values used when creating an instance of shapes (SquareObject, CircleObject).
  *
  * @const 
  */
const EDGE_POSITION = {
  CENTER: 0,
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
};

/**
  * Values used when calculating the path of an edge.
  *
  * @const 
  */
const EDGE_INOUT = {
  INCOMING: 0,
  OUTGOING: 1
};

/**
  * Values used when creating an instance of UserObject.
  *
  * @const 
  */
const USER_OBJ_TYPE = {
  VALUE: 0,
  MOVEMENT: 1
};

/**
  * Default class names used across the framework, defined here to improve code abstraction.
  *
  * @const 
  */
const DEFAULT_CLASSES = {
  SHAPE:"shape",
  EDGE:"edge",
  TEXT:{
    INNER:"innerText",
    LABEL:"labelText"
  },
  MARKER:"marker",
  LEARNING_MODE:{
    ACTIVE:"active",
    PLACE_HOLDER:"placeHolder",
    OBJECT_SELECTED:"selected"
  },
  PAGE:{
    PSEUDOCODE:{
      HIGHLIGHT:"codeHighlight"
    }
  }
}

/**
  * Default IDs used across the framework, defined here to improve code abstraction.
  *
  * @const 
  */
const DEFAULT_IDS = {
  PAGE:{
    LOG:"log",
    VARIABLE:"variables",
    PSEUDOCODE:"pseudocode",
    LEARNING_MODE:"chk-learn",
    ANIMATION_DURATION:"animation-duration"
  },
  HTML_ELEMENT:{
    PSEUDOCODE_LINE:"line"
  },
  SVG_GROUP:{
    MAIN:"g-main",
    MARKER:"g-marker",
    SHAPE:"g-shape",
    TEXT:"g-text",
    LABEL:"g-label",
    EDGE:"g-edge"
  },
  SVG_ELEMENT:{
    SHAPE:"shape-",
    USER_SHAPE:"u-shape-",
    TEXT:"text-",
    USER_TEXT:"u-text-",
    LABEL:"label-",
    EDGE:"edge-"
  }
}

/**
  * Default properties used across the framework, defined here to improve code abstraction.
  *
  * @const 
  */
const defaultProperties = {
  "radius":25,
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
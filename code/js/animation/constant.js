const MAIN_SVG_WIDTH = 1200;
const MAIN_SVG_HEIGHT = 500;

const SVG_CIRCLE = "circle";
const SVG_RECT = "rect";
const SVG_TEXT = "text";
const SVG_LINE = "line";

/** @const */
const ANIMATION_STATUS = {
  PAUSE: 0,
  PLAY: 1,
  STOP: -1
};

/** @const */
const EDGE_TYPE = {
  UNDIRECTED: 0,
  UNIDIRECTIONAL: 1,
  BIDIRECTIONAL: 2
};

/** @const */
const EDGE_POSITION = {
  CENTER: 0,
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
};

/** @const */
const EDGE_INOUT = {
  INCOMING: 0,
  OUTGOING: 1
};

/** @const */
const USER_OBJ_TYPE = {
  VALUE: 0,
  MOVEMENT: 1
};

//Values in miliseconds
const DEFAULT_ANIMATION_DURATION = 500;

/** @const */
const DEFAULT_CLASSES = {
  SHAPE: {
    RECT:"shape",
    CIRCLE:"shape"
  },
  EDGE:"",
  TEXT:{
    INNER:"innerText",
    LABEL:"labelText"
  },
  LEARNINGMODE:{
    PLACEHOLDER:"placeHolder",
    VALIDTARGET:"validTarget"
  }
}

/** @const */
const DEFAULT_IDS = {
  GROUP: {
    MARKER:"g-marker",
    SHAPE:"g-shape",
    TEXT:"g-text",
    LABEL:"g-label",
    EDGE:"g-edge"
  }
}

/** @const */
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
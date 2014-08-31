/**
  * Copyright 2014 Filipe Belatti and Laércio Guimarães.
  *
  * This file is part of DSVProject.
  *
  * DSVProject is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.
  *
  * DSVProject is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * Redistribution and use in source and binary forms, with or without modification, are
  * permitted provided that the above copyright notice, license and this disclaimer are retained.
  *
  * This project was started as summer internship project in Trinity College Dublin.
  * The views and conclusions contained in the software and documentation are those of the
  * authors and should not be interpreted as representing official policies, either expressed
  * or implied, of Trinity College Dublin.
  */

const MAIN_SVG_WIDTH = 1024;
const MAIN_SVG_HEIGHT = 500;

/**
  * Values used to reposition automatically objects on the scren.
  * There are pre-defined sets used for the existing visualisations.
  *
  * @const 
  */
const SHAPE_POSITION = {
  DELTA: 50,
  DISTANCE: 100,
  INITIAL_1: {
    // for Trees
    X: 600,
    Y: 50
  },
  INITIAL_2: {
    // for Queues
    X: 100,
    Y: 300
  },
  INITIAL_3: {
    // for Stacks
    X: 250,
    Y: 100
  }
}

/**
  * SVG Shape names.
  *
  * @const 
  */
const SVG_CIRCLE = "circle";
const SVG_RECT = "rect";
const SVG_TEXT = "text";
const SVG_LINE = "line";
const SVG_MARKER = "marker";

// Values in miliseconds
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
  * Values used when creating an instance of EdgeObject.
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
  * Values used when repositioning objects on the screen.
  *
  * @const 
  */
const ORIENTATION = {
  TOP: 1,
  LEFT: 2,
  BOTTOM: 3,
  RIGHT: 4
}

/**
  * Values used when creating an instance of UserObject.
  *
  * @const 
  */
const USER_OBJ_TYPE = {
  VALUE: 0,
  EDGE: 1,
  DELETING: 2
};

// Used in learning mode. Defined here to be used as a global variable.
var DEFERRED;

/**
  * Types of actions that can happen in the learning mode. These codes will be used when generating answer keys and user answers.
  *
  * @const 
  */
const LEARN_ACTION_CODES = {
  NEW_CIRCLE: 0,
  NEW_SQUARE: 1,
  DELETE_ITEM: 2,
  UPDATE_TEXT: 3,
  UPDATE_EDGE_A: 4,
  UPDATE_EDGE_B: 5
}

/**
  * Descripition of the learning mode actions. Used to print feedback to the user.
  *
  * @const 
  */
const LEARN_ACTION_STRINGS = {
  NEW_CIRCLE: "Create new node (Circle)",
  NEW_SQUARE: "Create new node (Square)",
  DELETE_ITEM: "Delete node",
  UPDATE_TEXT: "Update text",
  UPDATE_EDGE_A: "Update edge origin",
  UPDATE_EDGE_B: "Update edge end"
}

/**
  * Types of alerts that can be displayed. Positive is green, Negative is red, information is blue.
  *
  * @const 
  */
const ALERT_TYPES = {
  POSITIVE: "success",
  NEGATIVE: "danger",
  INFORMATION: "info"
}

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
    SHAPE:"learning",
    ACTIVE:"active",
    PLACE_HOLDER:"placeHolder",
    OBJECT_SELECTED:"selected"
  },
  PAGE:{
    ALGORITHM:{
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
    ALGORITHM:"algorithm",
    LEARNING_MODE:"chk-learn",
    ANIMATION_DURATION:"animation-duration",
    ALERT_PLACEHOLDER:"alert_placeholder"
  },
  HTML_ELEMENT:{
    ALGORITHM_LINE:"line"
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
    EDGE:"edge-",
    USER_NEW_OBJ:"protoObj"
  },
  SVG_MARKER:{
    START:{
      DEFAULT:"reverseArrowDefault",
      NULL:"reverseArrowNull"
    },
    END:{
      DEFAULT:"arrowDefault",
      NULL:"arrowNull"
    }
  }
}

/**
  * Default properties used across the framework, defined here to improve code abstraction.
  *
  * @const 
  */
const defaultProperties = {
  shape:{
    "radius":25,
    "width":50,
    "height":50,
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
      "draggable":"grey",
      "update":"lightskyblue",
      "delete":"tomato"
    },
    "fill-opacity":{
      "default":1.0,
      "draggable":0.2
    }
  },
  text:{
    "font-family":"sans-serif",
    "font-size":18,
    "text-anchor":"middle",
    "stroke":{
      "default":"black",
      "innerTextBlack":"black",
      "innerTextWhite":"ivory"
    }
  },
  edge:{
    "stroke":{
      "default":"black",
      "null":"tomato"
    },
    "stroke-width":{
      "default":3,
      "null":4
    }
  },
  marker:{
    "width":5,
    "height":3,
    "refX":{
      "start":-7,
      "end":7
    },
    "start":{
      "default": "url(#reverseArrowDefault)",
      "null": "url(#reverseArrowNull)"
    },
    "end":{
      "default": "url(#arrowDefault)",
      "null": "url(#arrowNull)"
    }
  }
}
const MAIN_SVG_WIDTH = 900;
const MAIN_SVG_HEIGHT = 500;

const SVG_CIRCLE = "circle";
const SVG_RECT = "rect";
const SVG_TEXT = "text";
const SVG_LINE = "line";

//Values in miliseconds
const DEFAULT_ANIMATION_DURATION = 500;
const DEFAULT_ANIMATION_DELAY = 500;

const CELL_WIDTH_DEFAULT = 50;
const CELL_HEIGHT_DEFAULT = 50;

const CELL_FILL_DEFAULT = "white";
const CELL_FILL_INCREMENT = "palegreen";
const CELL_FILL_DECREMENT = "tomato";

const EDGE_STROKE_NULL = "tomato";
const EDGE_STROKE_DEFAULT = "black";

const animProperties = {
  "cell":{
    "width":50,
    "height":50,
    "default":{
      "stroke":"black",
      "stroke-width":2,
      "fill":"white",
      "fill-opacity":100.0
    },
    "highlight":{
      "stroke":"gold",
      "stroke-width":7,
      "fill-opacity":0.0
    },
    "increment":{
      "fill":"palegreen"
    },
    "decrement":{
      "fill":"tomato"
    }
  },
  "text":{
    "fill":"black",
    "font-family":"sans-serif",
    "font-size":18,
    "text-anchor":"middle"
  },
  "edge": {
    "stroke":"black",
    "strokeWidth":3
  }
};
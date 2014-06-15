const MAIN_SVG_WIDTH = 900;
const MAIN_SVG_HEIGHT = 500;

const SVG_CIRCLE = "circle";
const SVG_RECT = "rect";
const SVG_TEXT = "text";

const CELL_DEFAULT = "default";
const CELL_HIGHLIGHT = "highlight";
const CELL_SELECT = "select";

//Values in miliseconds
const DEFAULT_ANIMATION_DURATION = 500;
const DEFAULT_ANIMATION_DELAY = 500;

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
    "select":{
      "fill":"pink"
    }
  },
  "text":{
    "fill":"black",
    "font-family":"sans-serif",
    "font-size":18,
    "text-anchor":"middle"
  }
};
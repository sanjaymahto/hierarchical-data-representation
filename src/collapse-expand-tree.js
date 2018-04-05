let countc = 0;
let counte = 0;
/**
 * @description function to collapse tree according to depth level.
 * @param  {} d
 */
let collapseLevel = (d, level) => {
  if (d.children && d.depth >= level) {
    d._children = d.children;
    d._children.forEach(collapseLevel);
    d.children = null;
  } else if (d.children) {
    d.children.forEach(collapseLevel);
  }
  return d;
};
/**
* @description function to collapse the tree based on siblingArray.
* @param  {} d
*/
let collapseLevelWithSibling = (d, level, siblingArray) => {
  if (d.children && d.depth === level) {
    if (siblingArray[countc] === d.data.name) {
      countc += 1;
      d._children = d.children;
      d._children.forEach(collapseLevelWithSibling);
      d.children = null;
    } else {
      d.children.forEach(collapseLevelWithSibling);
    }
  } else if (d.children) {
    d.children.forEach(collapseLevelWithSibling);
  }
  return d;
};
/**
* @description function to expand tree according to depth level.
* @param  {} d
*/
let expandLevel = (d, level) => {
  if (d._children && d.depth >= level) {
    d.children = d._children;
    d.children.forEach(expandLevel);
    d._children = null;
  } else if (d.children) {
    d.children.forEach(expandLevel);
  }
  return d;
};
/**
* @param  {} d
*/
let expandLevelWithSiblingsforfalse = (d, level) => {
  if (d._children && d.depth >= level) {
    d.children = d._children;
    d.children.forEach(expandLevelWithSiblingsforfalse);
    d._children = null;
  }
};
/**
* @param  {} d
*/
let expandLevelWithSiblings = (d, level, siblingArray, iscollapsed) => {
  if (iscollapsed === true) {
    if (d._children && d.depth === level) {
      if (siblingArray[counte] === d.data.name) {
        counte += 1;
        d.children = d._children;
        d.children.forEach(expandLevelWithSiblings);
        d._children = null;
      } else if (d.children) { d.children.forEach(expandLevelWithSiblings); }
    } else if (d.children) {
      d.children.forEach(expandLevelWithSiblings);
    }
  } else if (d._children && d.depth >= level) {
    if (siblingArray[counte] === d.data.name) {
      counte += 1;
      d.children = d._children;
      d.children.forEach(expandLevelWithSiblingsforfalse, level);
      d._children = null;
    } else if (d.children) { d.children.forEach(expandLevelWithSiblings); }
  } else if (d.children) {
    d.children.forEach(expandLevelWithSiblings);
  }
  return d;
};
/**
 * @description function to reset the value of countc and count e to 0.
 */
let convertvalueToDefault = () => {
  countc = 0;
  counte = 0;
};

export { collapseLevel, collapseLevelWithSibling, expandLevel, expandLevelWithSiblings, convertvalueToDefault };


let collapseExpand = (() => {
  let countc = 0; // counter for collapse function.
  let counte = 0; // counter for expand function.

  /**
 * @description function to collapse tree according to depth level.
 * @param  {} d //tree Data or node Data
 * @param  {} level //depth level of tree
 */
  let collapseLevel = (d, level) => {
    if (d.children && d.depth >= level) {
      d._children = d.children;
      d._children.forEach((dcol) => {
        collapseLevel(dcol, level);
      });
      d.children = null;
    } else if (d.children) {
      d.children.forEach((dcol) => {
        collapseLevel(dcol, level);
      });
    }
    return d;
  };
  /**
 * @description function to collapse the tree based on siblingArray.
 * @param  {} d //tree data or node data
 * @param  {} level // depth level of tree
 * @param  {} siblingArray // array of names of child of that levels parent to  collapse
 */
  let collapseLevelWithSibling = (d, level, siblingArray) => {
    if (d.children && d.depth === level) {
      if (siblingArray[countc] === d.parent.children.indexOf(d)) {
        countc += 1;
        d._children = d.children;
        d._children.forEach((dcol) => {
          collapseLevelWithSibling(dcol, level, siblingArray);
        });
        d.children = null;
      } else {
        d.children.forEach((dcol) => {
          collapseLevelWithSibling(dcol, level, siblingArray);
        });
      }
    } else if (d.children) {
      d.children.forEach((dcol) => {
        collapseLevelWithSibling(dcol, level, siblingArray);
      });
    }
    return d;
  };
  /**
* @description function to expand tree according to depth level.
 * @param  {} d // tree data or node data
 * @param  {} level //depth level of tree
 */
  let expandLevel = (d, level) => {
    if (d._children && d.depth >= level) {
      d.children = d._children;
      d.children.forEach((dex) => {
        expandLevel(dex, level);
      });
      d._children = null;
    } else if (d.children) {
      d.children.forEach((dex) => {
        expandLevel(dex, level);
      });
    }
    return d;
  };
  /**
 * @description function to expand tree based on siblingArray.
 * @param  {} d //tree data or node data
 * @param  {} level // depth level of tree
 * @param  {} siblingArray // array of names of child of that levels parent to expand
 * @param  {} iscollapsed // boolen to decide if all the childs of selected parent to expand or not.
 */
  let expandLevelWithSiblings = (d, level, siblingArray, iscollapsed) => {
    if (iscollapsed === true) {
      if (d._children && d.depth === level) {
        if (siblingArray[counte] === d.parent.children.indexOf(d)) {
          counte += 1;
          d.children = d._children;
          d.children.forEach(expandLevelWithSiblings);
          d._children = null;
        } else if (d.children) { d.children.forEach(expandLevelWithSiblings); }
      } else if (d.children) {
        d.children.forEach(expandLevelWithSiblings);
      }
    } else if (d._children && d.depth >= level) {
      if (siblingArray[counte] === d.parent.children.indexOf(d)) {
        counte += 1;
        d.children = d._children;
        // d.children.forEach(expandLevel, level);
        d.children.forEach(expandLevelWithSiblings);
        d._children = null;
      } else if (d.children) { d.children.forEach(expandLevelWithSiblings); }
    } else if (d.children) {
      d.children.forEach(expandLevelWithSiblings);
    }
    console.log('return d for expand level with siblings: ', d);
    return d;
  };
  /**
 * @description function to reset the value of countc and count e to 0.
 */
  let convertvalueToDefault = () => {
    countc = 0;
    counte = 0;
  };

  return {
    collapseLevel,
    collapseLevelWithSibling,
    expandLevel,
    expandLevelWithSiblings,
    convertvalueToDefault,
  };
})();

export { collapseExpand as default };

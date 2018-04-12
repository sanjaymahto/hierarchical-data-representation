import loadData from './data-loader';
/**
 * @description Function to append SVG element to Selected HTML element.
 * @param  {} mount='body' ex. div,span,id where you want to render the tree visualization.
 */
let mountConfig = {}; // configuration object to define height width of an object.
const dag = (mount = 'body', elemMargin = {
  top: 50, right: 90, bottom: 30, left: 500,
}, elemWidth = 960, elemHeight = 500, elemNodeSize = 30) => {
  mountConfig.divElement = mount;
  // Set the dimensions and margins of the tree
  mountConfig.margin = {
    top: elemMargin.top, right: elemMargin.right, bottom: elemMargin.bottom, left: elemMargin.left,
  };
  mountConfig.width = elemWidth - mountConfig.margin.left - mountConfig.margin.right;
  mountConfig.height = elemHeight - mountConfig.margin.top - mountConfig.margin.bottom;
  mountConfig.nodeSize = elemNodeSize;
  return loadData;
};
export { dag as default };
export { mountConfig };

import loadData from './data-loader';
/**
 * @description Function to append SVG element to Selected Div element.
 * @param  {} mount='body'
 */
let divElement;
let margin;
let width;
let height;
let nodeSize;
const dag = (mount = 'body', elemMargin = {
  top: 50, right: 90, bottom: 30, left: 500,
}, elemWidth = 960, elemHeight = 500, elemNodeSize = 30) => {
  divElement = mount;

  // Set the dimensions and margins of the diagram
  margin = {
    top: elemMargin.top, right: elemMargin.right, bottom: elemMargin.bottom, left: elemMargin.left,
  };
  width = elemWidth - margin.left - margin.right;
  height = elemHeight - margin.top - margin.bottom;
  nodeSize = elemNodeSize;
  return loadData;
};

window.dag = dag;
export { divElement, margin, width, height, nodeSize, dag };

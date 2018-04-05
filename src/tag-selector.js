import loadData from './data-loader';
/**
 * @description Function to append SVG element to Selected Div element.
 * @param  {} mount='body'
 */
let divElement;
let margin;
let width;
let height;
const dag = (mount = 'body', elemMargin = {
  top: 20, right: 90, bottom: 30, left: 90,
}, elemWidth = 960, elemHeight = 500) => {
  divElement = mount;

  // Set the dimensions and margins of the diagram
  margin = {
    top: elemMargin.top, right: elemMargin.right, bottom: elemMargin.bottom, left: elemMargin.left,
  };
  width = elemWidth - margin.left - margin.right;
  height = elemHeight - margin.top - margin.bottom;

  return loadData;
};

window.dag = dag;
export { divElement, margin, width, height, dag };

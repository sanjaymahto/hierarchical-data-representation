import loadData from './data-loader';
/**
 * @description Function to append SVG element to Selected Div element.
 * @param  {} mount='body'
 */
/* eslint import/no-mutable-exports:0 */
let divElement;
let margin;
let width;
let height;
const dag = (mount = 'body') => {
  divElement = mount;
  // Set the dimensions and margins of the diagram
  margin = {
    top: 20, right: 90, bottom: 30, left: 90,
  };
  width = 960 - margin.left - margin.right;
  height = 500 - margin.top - margin.bottom;

  return loadData;
};

window.dag = dag;

export { divElement, margin, width, height };

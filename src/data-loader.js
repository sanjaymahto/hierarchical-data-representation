import Graph from './data-renderer';

let adgData; // variable to store the tree structured data.
let config; // Nodes configuration like color and root.
let csvData; // CSV to JSON converted data or JSON data if not CSV.
/**
 * @description Function to convert the CSV data to JSON tree structure.
 * @param  {} data - take CSV data File or JSON data.
 * @param  {null} conf={root - Configuration object to configure the tree color.
 * @param  {'#F7C7C5'} parentColor - parent node color.
 * @param  {'#FFE2C5'} childColor - child or leaf node color.
 * @param  {'#E9C9C9'} rootColor - root node color.
 * @param  {} object - returns object}
 */
const loadData = (data, conf = {
  parentColor: '#F7C7C5', childColor: '#FFE2C5', rootColor: '#E9C9C9',
}) => {
  config = conf;
  let result = [];
  if (typeof (data) === 'string') {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i += 1) {
      const obj = {};
      const currentline = lines[i].split(',');
      for (let j = 0; j < headers.length; j += 1) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    csvData = [...result];
  } else {
    csvData = data;
    result = data;
  }
  // *********** Convert flat data into a nice tree *************** //
  // create a name: node map
  const dataMap = result.reduce((map, node) => {
    map[node.child] = node;
    return map;
  }, {});
  // create the tree array
  adgData = [];
  result.forEach((node) => {
    // add to parent
    const parent = dataMap[node.parent];
    if (parent) {
      // create child array if it doesn't exist
      (parent.children || (parent.children = []))
        // add node to child array
        .push(node);
    } else {
      // parent is null or missing
      adgData.push(node);
    }
  });
  return new Graph();
};

export default loadData;
export { config, adgData, csvData };


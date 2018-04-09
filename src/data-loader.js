import graph from './data-renderer';

let adgData;
let config;
let csvData;
/**
 * @description Function to convert the CSV data to JSON tree structure.
 * @param  {} data - take CSV data File
 * @param  {null} conf={root - Configuration object to configure the tree color
 * @param  {'#F7C7C5'} parentColor - parent node color
 * @param  {'#FFE2C5'} childColor - child or leaf node color
 * @param  {'#E9C9C9'} rootColor - root node color
 * @param  {} }
 */
const loadData = (data, conf = {
  root: null, parentColor: '#F7C7C5', childColor: '#FFE2C5', rootColor: '#E9C9C9',
}) => {
  config = conf;
  const lines = data.split('\n');
  const result = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i += 1) {
    const obj = {};
    const currentline = lines[i].split(',');
    for (let j = 0; j < headers.length; j += 1) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  if (conf.root == null) {
    result.push({ parent: null, name: result[0].parent });
  } else {
    result.push({ parent: null, name: conf.root });
  }

  csvData = [...result];

  // *********** Convert flat data into a nice tree *************** //
  // create a name: node map
  const dataMap = result.reduce((map, node) => {
    map[node.name] = node;
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
  return graph;
};

export default loadData;
export { config, adgData, csvData };


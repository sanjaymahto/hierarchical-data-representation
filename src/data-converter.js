/**
 * @description Function to convert the CSV data to JSON tree structure.
 * @param  {} data - take CSV data File or JSON data.
 */
export default function convertData(data) {
  let result = [];
  let adgData = [];
  let csvData = [];
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
  return { csvData, adgData };
}


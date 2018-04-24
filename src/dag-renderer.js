import * as d3 from 'd3';
import elemConfig from './element-config';
import createDag from './dag-creator';
import collapseExpand from './collapse-expand-tree';
/**
 *@description Class to render the DAG Graph.
 * @class DAG
 */
class DAG {
  /**
   * @description constructor defined for Graph class.
   */
  constructor(mount, data, csvData, config) {
    this.divElement = mount;
    this.config = Object.assign({}, config, { parentColor: '#F7C7C5', childColor: '#FFE2C5', rootColor: '#E9C9C9' }); // To assign the parent, root and child color to the nodes.
    this.adgData = data; // To add the adg Data.
    this.csvData = csvData; // To add flat JSON data.
  }
  /**
   * @description Function to render the tree
   */
  render() {
    let treeData;
    treeData = [...(this.adgData)];
    // append the svg object to the body of the page
    this.svg = d3.select(this.divElement).append('svg')
      .attr('width', elemConfig.width + elemConfig.margin.right + elemConfig.margin.left)
      .attr('height', elemConfig.height + elemConfig.margin.top + elemConfig.margin.bottom)
      .append('g')
      .attr('transform', `translate(${elemConfig.margin.left},${elemConfig.margin.top})`);

    const rendersvg = this.svg;
    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(treeData[0], d => d.children);
    this.root.y0 = elemConfig.height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;

    // declares a tree layout and assigns the size
    this.treemap = d3.tree()
      .nodeSize([40, 30])
      .separation((a, b) => (a.parent === b.parent ? 3 : 3));
    const renderTreemap = this.treemap;

    this.config.nodeSize = elemConfig.nodeSize;
    this.config.mount = this.divElement;
    // to update the node
    createDag(rendersvg, this.root, rootElement, renderTreemap, this.config);
  }
  /**
   *@description function to  update the data and recreating the tree.
   * @param  {} newData
   */
  updateData(newData) {
    if (this.updatedResult === '' || this.updatedResult === undefined) {
      this.updatedResult = [...this.csvData];
    }
    if (typeof (newData) === 'string') {
      const lines = newData.split('\n');
      const headers = lines[0].split(',');
      for (let i = 1; i < lines.length; i += 1) {
        const obj = {};
        const currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j += 1) {
          obj[headers[j]] = currentline[j];
        }
        this.updatedResult.push(obj);
      }
    } else {
      newData.forEach((element) => {
        this.updatedResult.push(element);
      });
    }

    this.updatedResult.forEach((v) => { delete v.children; });

    // *********** Convert flat data into a nice tree *************** //
    // create a name: node map
    const dataMap = this.updatedResult.reduce((map, node) => {
      map[node.child] = node;
      return map;
    }, {});

    // create the tree array
    this.updatedData = [];
    this.updatedResult.forEach((node) => {
      // add to parent
      const parent = dataMap[node.parent];
      if (parent) {
        // create child array if it doesn't exist
        (parent.children || (parent.children = []))
          // add node to child array
          .push(node);
      } else {
        // parent is null or missing
        this.updatedData.push(node);
      }
    });

    // recreating the tree and Assigning parent, children, height, depth
    this.root = d3.hierarchy(this.updatedData[0], d => d.children);
    this.root.y0 = elemConfig.height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;

    this.config.nodeSize = elemConfig.nodeSize;
    this.config.mount = this.divElement;
    // to update the node
    createDag(this.svg, this.root, rootElement, this.treemap, this.config);
    this.collapse(0); // functions to collapse the tree
    this.expand(0); // function to expand the tree
  }
  /**
   * @description function to collapse the tree node.
   * @param  {} level
   * @param  {} siblingArray
   */
  collapse(level, siblingArray) {
    const { svg, treemap } = this;
    let cd;
    if (siblingArray === undefined || siblingArray === null || siblingArray === '') {
      if (level === 0) {
        cd = collapseExpand.collapseLevel(this.root, level);
        createDag(svg, this.root, cd, treemap, this.config);
      } else {
        this.root.children.forEach((d2) => {
          cd = collapseExpand.collapseLevel(d2, level);
          createDag(svg, this.root, cd, treemap, this.config);
        });
        collapseExpand.convertvalueToDefault();
      }
    } else if (level === 0) {
      cd = collapseExpand.collapseLevel(this.root, level);
      createDag(svg, this.root, cd, treemap, this.config);
    } else {
      this.root.children.forEach((d2) => {
        cd = collapseExpand.collapseLevelWithSibling(d2, level, siblingArray);
        createDag(svg, this.root, cd, treemap, this.config);
      });
      collapseExpand.convertvalueToDefault();
    }
  }
  /**
   * @description function to expand the tree node.
   * @param  {} level
   * @param  {} siblingArray
   * @param  {} iscollapsed=false
   */
  expand(level, siblingArray, iscollapsed = false) {
    const { svg, treemap } = this;
    let ed;
    if (siblingArray === undefined || siblingArray === null || siblingArray === '') {
      if (level === 0) {
        ed = collapseExpand.expandLevel(this.root, level);
        createDag(svg, this.root, ed, treemap, this.config);
      } else {
        this.root.children.forEach((e2) => {
          ed = collapseExpand.expandLevel(e2, level);
          createDag(svg, this.root, ed, treemap, this.config);
        });
        collapseExpand.convertvalueToDefault();
      }
    } else if (level === 0) {
      ed = collapseExpand.expandLevel(this.root, level);
      createDag(svg, this.root, ed, treemap, this.config);
    } else {
      this.root.children.forEach((e2) => {
        ed = collapseExpand.expandLevelWithSiblings(e2, level, siblingArray, iscollapsed);
        createDag(svg, this.root, ed, treemap, this.config);
      });
      collapseExpand.convertvalueToDefault();
    }
  }
}

export default DAG;

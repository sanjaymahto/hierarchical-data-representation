import * as d3 from 'd3';
import { adgData, csvData } from './data-loader';
import { divElement, margin, width, height, nodeSize } from './dag';
import updateNode from './update-node';
import collapseExpand from './collapse-expand-tree';
// import { collapseLevel, collapseLevelWithSibling, expandLevel, expandLevelWithSiblings, convertvalueToDefault } from './collapse-expand-tree';

/**
 *@description Class to render the DAG Graph.
 * @class Graph
 */
class Graph {
  /**
   * @description constructor defined for Graph class.
   */
  constructor() {
    this.root = ''; // To assign parent, children and height to tree
    this.updatedData = ''; // To update the tree data when calling updateData function
    this.svg = ''; // To pass the SVG element to all the other functions
    this.treemap = ''; // declares a tree layout and assigns the size
    this.updatedResult = ''; // to pass the updated result when calling updateData function
  }
  /**
   * @description Function to render the tree
   */
  render() {
    let treeData;
    treeData = [...adgData];
    // append the svg object to the body of the page
    this.svg = d3.select(divElement).append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const rendersvg = this.svg;

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(treeData[0], d => d.children);
    this.root.y0 = height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;

    // declares a tree layout and assigns the size
    this.treemap = d3.tree()
      .nodeSize([35])
      .separation((a, b) => (a.parent === b.parent ? 2 : 3));
    const renderTreemap = this.treemap;

    // to update the node
    updateNode(rendersvg, this.root, rootElement, renderTreemap, nodeSize);
  }
  /**
   *@description function to  update the data and recreating the tree.
   * @param  {} newData
   */
  updateData(newData) {
    if (this.updatedResult === '' || this.updatedResult === undefined) {
      this.updatedResult = [...csvData];
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
      map[node.name] = node;
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
    this.root.y0 = height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;

    // to update the node
    updateNode(this.svg, this.root, rootElement, this.treemap, nodeSize);
    this.collapse(0); // functions to collapse the tree
    this.expand(0); // function to expand the tree
    // this.render();
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
        updateNode(svg, this.root, cd, treemap, nodeSize);
      } else {
        this.root.children.forEach((d2) => {
          cd = collapseExpand.collapseLevel(d2, level);
          updateNode(svg, this.root, cd, treemap, nodeSize);
        });
        collapseExpand.convertvalueToDefault();
      }
    } else if (level === 0) {
      cd = collapseExpand.collapseLevel(this.root, level);
      updateNode(svg, this.root, cd, treemap, nodeSize);
    } else {
      this.root.children.forEach((d2) => {
        cd = collapseExpand.collapseLevelWithSibling(d2, level, siblingArray);
        updateNode(svg, this.root, cd, treemap, nodeSize);
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
        updateNode(svg, this.root, ed, treemap, nodeSize);
      } else {
        this.root.children.forEach((e2) => {
          ed = collapseExpand.expandLevel(e2, level);
          updateNode(svg, this.root, ed, treemap, nodeSize);
        });
        collapseExpand.convertvalueToDefault();
      }
    } else if (level === 0) {
      ed = collapseExpand.expandLevel(this.root, level);
      updateNode(svg, this.root, ed, treemap, nodeSize);
    } else {
      this.root.children.forEach((e2) => {
        ed = collapseExpand.expandLevelWithSiblings(e2, level, siblingArray, iscollapsed);
        updateNode(svg, this.root, ed, treemap, nodeSize);
      });
      collapseExpand.convertvalueToDefault();
    }
  }
}

export default Graph;

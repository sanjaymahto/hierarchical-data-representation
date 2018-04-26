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
  constructor(mount, data, config) {
    this.divElement = mount;
    this.config = Object.assign({}, elemConfig, config); // To assign config to the nodes and DAG.
    this.adgData = data; // To add the adg Data.
  }
  /**
   * @description Function to render the tree
   */
  render() {
    // append the svg object to the body of the page
    this.svg = d3.select(this.divElement).append('svg')
      .attr('width', this.config.width + this.config.margin.right + this.config.margin.left)
      .attr('height', this.config.height + this.config.margin.top + this.config.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`);
    const rendersvg = this.svg;

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(this.adgData, d => d[this.config.children]);
    this.root.y0 = this.config.height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;

    // declares a tree layout and assigns the size
    this.treemap = d3.tree()
      .nodeSize([40, 30])
      .separation((a, b) => (a.parent === b.parent ? 3 : 3));
    const renderTreemap = this.treemap;

    this.config.nodeSize = this.config.nodeSize;
    this.config.mount = this.divElement;
    // to update the node
    createDag(rendersvg, this.root, rootElement, renderTreemap, this.config);
  }
  /**
   *@description function to  update the data and recreating the tree.
   * @param  {} newData
   */
  updateData(newData) {
    this.adgData = newData;
    // recreating the tree and Assigning parent, children, height, depth
    this.root = d3.hierarchy(this.adgData, d => d[this.config.children]);
    this.root.y0 = this.config.height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;
    this.config.nodeSize = this.config.nodeSize;
    this.config.mount = this.divElement;
    // to update the node.
    createDag(this.svg, this.root, rootElement, this.treemap, this.config);
    this.collapse(0); // to collapse the tree.
    this.expand(0); // to expand the tree.
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
  /**
   * @description function to assign name to each node.
   * @param  {} nameFunc //Function as an argument.
   */
  nodeName(nameFunc) {
    this.config.nameFunc = nameFunc;
    const rootElement = this.root;
    createDag(this.svg, this.root, rootElement, this.treemap, this.config);
    this.collapse(0); // to collapse the tree.
    this.expand(0); // to expand the tree.
  }
  /**
   * @description function to assign names to each paths.
   * @param  {} pathKey //identifier for textPath.
   */
  pathName(pathKey) {
    this.config.pathKey = pathKey;
    createDag(this.svg, this.root, this.root, this.treemap, this.config);
    this.collapse(0); // to collapse the tree.
    this.expand(0); // to expand the tree.
  }
  /**
   * @description function to add event listeners to the node in tree.
   * @param  {} event // event Name
   * @param  {} func // event Fucntion
   */
  on(event, func) {
    let tempEvent = {
      eventName: event,
      eventFunc: func,
    };
    this.config.eventFunc.push(tempEvent);
    createDag(this.svg, this.root, this.root, this.treemap, this.config);
    this.collapse(0); // to collapse the tree.
    this.expand(0); // to expand the tree.
  }
  /**
   * @description function to remove event listeners from nodes.
   * @param  {} eventArray //Array of event Names
   */
  removeEvent(eventArray) {
    if (eventArray) {
      eventArray.forEach((event) => {
        this.svg.selectAll('g.node').on(event, null);
      });
    } else {
      this.config.eventFunc.forEach((event) => {
        this.svg.selectAll('g.node').on(event.eventName, null);
      });
    }
  }
}

export default DAG;

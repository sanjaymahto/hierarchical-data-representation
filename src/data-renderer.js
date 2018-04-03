import * as d3 from 'd3';
import { adgData, csvData, config } from './data-loader';
import { divElement, margin, width, height } from './index';

class Instance {
  /**
   * @description constructor defined for Instance class.
   */
  constructor() {
    this.root = '';
    this.updatedData = '';
    this.svg = '';
    this.treemap = '';
    this.data = '';
    this.updatedResult = '';
    this.updateNode = '';
  }
  /**
   * @description Function to render the tree
   */
  render() {
    let treeData;
    const mainThis = this;
    if (this.updatedData === '' || this.updatedData === undefined) {
      treeData = adgData.slice();
    } else {
      treeData = this.updatedData;
    }
    let i = 0;
    const duration = 550;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    if (this.updatedData !== '' || this.updatedData !== undefined) {
      d3.selectAll('svg').remove();
    }

    this.svg = d3.select(divElement).append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${500},${50})`);

    const rendersvg = this.svg;

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(treeData[0], d => d.children);
    this.root.y0 = height / 2;
    this.root.x0 = 0;
    const rootElement = this.root;
    // console.log(rootElement);


    // declares a tree layout and assigns the size
    this.treemap = d3.tree()
      .nodeSize([35])
      .separation((a, b) => (a.parent === b.parent ? 2 : 3));
    const renderTreemap = this.treemap;

    this.updateNode = (source) => {
      // Assigns the x and y position for the nodes
      treeData = renderTreemap(rootElement);

      // Compute the new tree layout.
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach((d) => { d.y = d.depth * 100; });

      // ****************** Nodes section *************************** //

      /* eslint no-return-assign: 0 */
      /* eslint no-multi-assign: 0 */
      // Update the nodes...
      const node = rendersvg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = i += 1));

      /* eslint no-underscore-dangle: 0 */
      // Toggle children on click.
      function click(d) {
        // console.log('d in click:', d);
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        mainThis.updateNode(d);
      }

      // Enter any new modes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .on('click', click);

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 30)
        .style('fill', (d) => {
          if (d.parent === undefined || d.parent === null || d.parent === 'null') {
            return config.rootColor;
          }
          if (d._children === undefined || d._children === null || d._children === '') {
            return config.childColor;
          }

          return config.parentColor;
        });


      // Add labels for the nodes
      nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', d => (d.children || d._children ? -0 : 0))
        .attr('text-anchor', d => (d.children || d._children ? 'end' : 'start'))
        .text(d => d.data.name)
        .attr('text-anchor', 'middle')
        .style('fill-opacity', 1);


      // UPDATE
      const nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.x},${d.y})`);

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', 30)
        .style('fill', (d) => {
          if (d.parent === undefined || d.parent === null || d.parent === 'null') {
            return config.rootColor;
          }
          if (d._children === undefined || d._children === null || d._children === '') {
            return config.childColor;
          }

          return config.parentColor;
        })
        .attr('cursor', 'pointer');


      // Remove any exiting nodes
      const nodeExit = node.exit()
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 30)
        .style('fill', (d) => {
          if (d.parent === undefined || d.parent === null || d.parent === 'null') {
            return config.rootColor;
          }
          if (d._children === undefined || d._children === null || d._children === '') {
            return config.childColor;
          }

          return config.parentColor;
        });


      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1);

      // ****************** links section ***************************

      // Update the links...
      const link = rendersvg.selectAll('path.link')
        .data(links, d => d.id);


      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        const path = `M ${s.x} ${s.y}
      C ${(s.x + d.x) / 2} ${s.y},
        ${(s.x + d.x) / 2} ${d.y},
        ${d.x} ${d.y}`;

        return path;
      }

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // UPDATE
      const linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d, d.parent));

      // Remove any exiting links
      link.exit()
        .remove();

      // Store the old positions for transition.
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };
    this.updateNode(this.root);
  }
  /**
   *@description function to  update the data.
   * @param  {} newData
   */
  updateData(newData) {
    this.data = newData;
    if (this.updatedResult === '' || this.updatedResult === undefined) {
      this.updatedResult = csvData.slice();
    }
    const lines = this.data.split('\n');
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i += 1) {
      const obj = {};
      const currentline = lines[i].split(',');
      for (let j = 0; j < headers.length; j += 1) {
        obj[headers[j]] = currentline[j];
      }
      this.updatedResult.push(obj);
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
    this.render();
  }
  /**
   * @description function to collapse the tree node.
   * @param  {} level
   * @param  {} siblingArray
   */
  collapse(level, siblingArray) {
    const main = this;
    let countj = 0;
    /**
     * @param  {} d
     */
    function collapseLevel(d) {
      if (d.children && d.depth >= level) {
        d._children = d.children;
        d._children.forEach(collapseLevel);
        d.children = null;
      } else if (d.children) {
        d.children.forEach(collapseLevel);
      }
      // console.log('d: ', d);
      main.updateNode(d);
    }
    /**
     * @param  {} d
     */
    function collapseLevelWithSibling(d) {
      if (d.children && d.depth === level) {
        if (siblingArray[countj] === d.data.name) {
          countj += 1;
          d._children = d.children;
          d._children.forEach(collapseLevelWithSibling);
          d.children = null;
        } else {
          d.children.forEach(collapseLevelWithSibling);
        }
      } else if (d.children) {
        d.children.forEach(collapseLevelWithSibling);
      }
      main.updateNode(d);
    }

    if (siblingArray === undefined || siblingArray === null || siblingArray === '') {
      if (level === 0) {
        // console.log(this.root);
        collapseLevel(this.root);
      } else {
        // console.log(this.root);
        this.root.children.forEach(collapseLevel);
      }
    } else if (level === 0) {
      // console.log(this.root);
      collapseLevel(this.root);
    } else {
      // console.log(this.root);
      this.root.children.forEach(collapseLevelWithSibling);
    }
  }
  /**
   * @description function to expand the tree node.
   * @param  {} level
   * @param  {} siblingArray
   * @param  {} iscollapsed=false
   */
  expand(level, siblingArray, iscollapsed = false) {
    const main = this;
    let countj = 0;
    /**
     * @param  {} d
     */
    function expandLevel(d) {
      // console.log('d before:', d);
      if (d._children && d.depth >= level) {
        d.children = d._children;
        d.children.forEach(expandLevel);
        d._children = null;
      } else if (d.children) {
        d.children.forEach(expandLevel);
      }
      main.updateNode(d);
    }
    /**
     * @param  {} d
     */

    function expandLevelWithSiblingsforfalse(d) {
      if (d._children && d.depth >= level) {
        d.children = d._children;
        d.children.forEach(expandLevelWithSiblingsforfalse);
        d._children = null;
      }
    }

    function expandLevelWithSiblings(d) {
      if (iscollapsed === true) {
        // console.log('d: ', d);
        if (d._children && d.depth === level) {
          if (siblingArray[countj] === d.data.name) {
            countj += 1;
            d.children = d._children;
            d.children.forEach(expandLevelWithSiblings);
            d._children = null;
          } else if (d.children) { d.children.forEach(expandLevelWithSiblings); }
        } else if (d.children) {
          d.children.forEach(expandLevelWithSiblings);
        }
      } else if (d._children && d.depth >= level) {
        if (siblingArray[countj] === d.data.name) {
          countj += 1;
          d.children = d._children;
          d.children.forEach(expandLevelWithSiblingsforfalse);
          d._children = null;
        } else if (d.children) { d.children.forEach(expandLevelWithSiblings); }
      } else if (d.children) {
        d.children.forEach(expandLevelWithSiblings);
      }
      main.updateNode(d);
    }

    if (siblingArray === undefined || siblingArray === null || siblingArray === '') {
      if (level === 0) {
        expandLevel(this.root);
      } else {
        this.root.children.forEach(expandLevel);
      }
    } else if (level === 0) {
      expandLevel(this.root);
    } else {
      this.root.children.forEach(expandLevelWithSiblings);
    }
  }
}

export default new Instance();


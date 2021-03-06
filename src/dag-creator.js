import * as d3 from 'd3';
/**
 * @description Creates a curved (diagonal) path from parent to the child nodes
 * @param  {} s - source points for the path.
 * @param  {} d - Destination points for the path.
 */
function diagonal(s, d) {
  // Chaecking if user has provided custom positions for Nodes or not. If provided it will enter else otherwise if.
  if ((s.data.px === undefined || s.data.py === undefined) && (d.data.px === undefined || d.data.py === undefined)) {
    let middleIndex = s.parent.children.length / 2; // Find the middle index
    let index = s.parent.children.indexOf(s); // Find index of the current node
    // If the node is a right node, change the direction of path.

    if (index >= middleIndex) {
      const path = `M ${d.x} ${d.y}
  C ${(s.x + d.x) / 2} ${d.y},
    ${(s.x + d.x) / 2} ${s.y},
    ${s.x} ${s.y}`;
      return path;
    }
    const path = `M ${s.x} ${s.y}
  C ${(s.x + d.x) / 2} ${s.y},
    ${(s.x + d.x) / 2} ${d.y},
    ${d.x} ${d.y}`;
    return path;
  }

  let middleIndex = s.parent.children.length / 2; // Find the middle index
  let index = s.parent.children.indexOf(s); // Find index of the current node
  // If the node is a right node, change the direction of path.
  if (index >= middleIndex) {
    const path = `M ${d.data.px} ${d.data.py}
  L ${s.data.px} ${s.data.py}`;
    return path;
  }
  const path = `M ${s.data.px} ${s.data.py}
  L ${d.data.px} ${d.data.py}`;
  return path;
}
/**
 * @description Function to delete the Node from DAG.
 * @param  {} d - node element to be deleted.
 */
function removeItem(d) {
  if (d.parent === null) {
    return null;
  }
  d.parent.children.splice(d.parent.children.indexOf(d), 1);
  if (d.parent.children.length === 0) {
    d.parent.children = null;
  }
  return d.parent;
}
/**
 * @description function to update the tree nodes.
 * @param  {} rendersvg - Svg tag
 * @param  {} rootElement - tree data or node Data
 * @param  {} renderTreemap - tree layout based on tree data or node data
 * @param  {} nodeSize - node size
 * @param {} config - tree configuration object
 */
export default function createDag(rendersvg, root, rootElement, renderTreemap, config) {
  // remove existing tooltip
  d3.select('div.dagTooltip').remove();
  let i = 0;
  const duration = 500;
  const source = rootElement;

  // Creating Div element for tooltip
  let div = d3.select(config.mount).append('div')
    .attr('class', 'dagTooltip')
    .style('display', 'none');

  // Assigns the x and y position for the nodes
  let treeData = renderTreemap(root);

  // Compute the new tree layout.
  const nodes = treeData.descendants();
  const links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach((d) => { d.y = d.depth * 135; });

  // ****************** Nodes section *************************** //
  // Update the nodes...
  const node = rendersvg.selectAll('g.node')
    .data(nodes, d => d.id || (d.id = i += 1));

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    // .attr('transform', () => `translate(${source.x0},${source.y0})`);
    .attr('transform', (d) => {
      if ((d.data.px === null || d.data.px === undefined) && (d.data.py === null || d.data.py === undefined)) {
        return `translate(${source.x0},${source.y0})`;
      }
      return `translate(${source.data.px},${source.data.py})`;
    });

  // UPDATE THE NODE
  const nodeUpdate = nodeEnter.merge(node);

  // Add Circle for the nodes and making it clickable or non-clickable on Updation of node.
  nodeUpdate.append('circle')
    .attr('class', 'node')
    .attr('r', config.nodeSize)
    .style('fill', (d) => {
      if (d.parent === undefined || d.parent === null) {
        return config.nodeConfig.rootColor;
      }
      return config.nodeConfig.leafColor;
    });
  /** **************************Logic to delete the node with updated data in DAG*********************** */
  // let close = nodeUpdate.append('g')
  //   .attr('class', 'remove-icon-group')
  //   .on('click', function (d) {
  //     let modifiedRoot = removeItem(d);
  //     if (modifiedRoot === null) {
  //       createDag(rendersvg, root, root, renderTreemap, config);
  //     } else {
  //       createDag(rendersvg, root, modifiedRoot, renderTreemap, config);
  //     }
  //   });

  // close.append('circle')
  //   .attr('class', 'remove-icon')
  //   .attr('r', 8)
  //   .attr('transform', d => `translate(${config.nodeSize},${-(config.nodeSize)})`);

  // close.append('line')
  //   .attr('x1', -4)
  //   .attr('x2', 4)
  //   .attr('y1', -4)
  //   .attr('y2', 4)
  //   .attr('stroke', '#a0a0a0')
  //   .attr('stroke-width', 1)
  //   .attr('transform', d => `translate(${config.nodeSize},${-(config.nodeSize)})`);

  // close.append('line')
  //   .attr('x1', 4)
  //   .attr('x2', -4)
  //   .attr('y1', -4)
  //   .attr('y2', 4)
  //   .attr('stroke', '#a0a0a0')
  //   .attr('stroke-width', 1)
  //   .attr('transform', d => `translate(${config.nodeSize},${-(config.nodeSize)})`);

  /** *********************End of Logic to delete the node with updated data in DAG*********************** */

  // condition to add click event listener to the node if foldable is true.
  if (config.foldable) {
    nodeUpdate.on('click', (d) => {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      if (d.depth === 0) {
        createDag(rendersvg, d, d, renderTreemap, config);
      } else {
        createDag(rendersvg, root, d, renderTreemap, config);
      }
    });
  }

  // if condition for custom events in the nodes.
  if (config.eventFunc.length !== 0) {
    config.eventFunc.forEach((event) => {
      nodeUpdate.on(event.eventName, event.eventFunc);
    });
  }

  // update labels of the nodes
  nodeUpdate.selectAll('text').remove();

  nodeUpdate.append('text')
    .attr('dy', '.35em')
    .attr('x', d => (d.children || d._children ? -0 : 0))
    .attr('text-anchor', d => (d.children || d._children ? 'end' : 'start'))
    .text(config.nameFunc)
    .attr('text-anchor', 'middle')
    .style('fill-opacity', 1);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', (d) => {
      if ((d.data.px === null || d.data.px === undefined) && (d.data.py === null || d.data.py === undefined)) {
        return `translate(${d.x},${d.y})`;
      }
      return `translate(${d.data.px},${d.data.py})`;
    });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', config.nodeSize)
    .style('fill', (d) => {
      if (d.parent === undefined || d.parent === null || d.parent === 'null') {
        return config.nodeConfig.rootColor;
      }
      return config.nodeConfig.leafColor;
    })
    .attr('cursor', 'pointer');

  // Remove any exiting nodes
  node.exit()
    .remove();

  // ****************** links section *************************** //

  // Update the links...
  const link = rendersvg.selectAll('path.link')
    .data(links, d => d.id);

  // Enter any new links at the parent's previous position.
  const linkEnter = link.enter().insert('path', 'g')
    .attr('id', d => `${config.pathName}${d.id}`)
    .attr('class', 'link')
    // .attr('d', () => {
    //   let o = { x: source.x0, y: source.y0 };
    //   const path = `M ${o.x} ${o.y}
    //   C ${(o.x + o.x) / 2} ${o.y},
    //     ${(o.x + o.x) / 2} ${o.y},
    //     ${o.x} ${o.y}`;
    //   return path;
    // });
    .attr('d', (d) => {
      if ((d.data.px === null || d.data.px === undefined) && (d.data.py === null || d.data.py === undefined)) {
        let o = { x: source.x0, y: source.y0 };
        const path = `M ${o.x} ${o.y}
      C ${(o.x + o.x) / 2} ${o.y},
        ${(o.x + o.x) / 2} ${o.y},
        ${o.x} ${o.y}`;
        return path;
      }
      let o = { x: source.data.px, y: source.data.py };
      const path = `M ${o.x} ${o.y}
      L ${o.x} ${o.y}`;
      return path;
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

  // Update the link text
  let linktext = rendersvg.selectAll('g.link')
    .data(links, d => d.id);

  let linketextEnter = linktext.enter().append('g')
    .attr('class', 'link');

  // Add arc text for the nodes
  linketextEnter.append('text')
    .attr('dy', '-.25em')
    .style('text-anchor', 'middle') // place the text halfway on the arc
    .on('mouseover', (d) => {
      let arcLength = Math.sqrt((((d.x - d.parent.x) ** 2) + ((d.y - d.parent.y) ** 2)));
      let str;
      if (config.pathKey) {
        if (d.data[config.pathKey]) {
          str = d.data[config.pathKey];
        } else {
          str = '';
        }
      } else {
        str = '';
      }
      let strlen = str.length;
      if ((arcLength - config.nodeSize) < (strlen * 8)) {
        div.transition()
          .duration(200)
          .style('display', 'block');
        div.html(`${str}`)
          .style('left', `${d3.event.pageX - 70}px`)
          .style('top', `${d3.event.pageY - 10}px`);
      }
    })
    .on('mouseout', () => {
      div.transition()
        .duration(500)
        .style('display', 'none');
    })
    .append('textPath')
    .attr('class', 'textpath')
    .attr('startOffset', '50%')
    .attr('xlink:href', d => `${config.pathName}${d.id}`)
    .text((d) => {
      let arcLength = Math.sqrt((((d.x - d.parent.x) ** 2) + ((d.y - d.parent.y) ** 2)));
      let str;
      if (config.pathKey) {
        if (d.data[config.pathKey]) {
          str = d.data[config.pathKey];
        } else {
          str = '';
        }
      } else {
        str = '';
      }
      let strlen = str.length;
      if ((arcLength - config.nodeSize) < (strlen * 8)) {
        let changedStr = str.substring(0, ((arcLength - config.nodeSize - 4) / 8));
        changedStr += '...';
        return changedStr;
      }
      return str;
    });

  // Update the link text
  const linkTextUpdate = linketextEnter.merge(linktext);

  linkTextUpdate.selectAll('textPath')
    .attr('class', 'textpath')
    .attr('startOffset', '50%')
    .attr('xlink:href', d => `#${config.pathName}${d.id}`)
    .text((d) => {
      let arcLength = Math.sqrt((((d.x - d.parent.x) ** 2) + ((d.y - d.parent.y) ** 2)));
      let str;
      if (config.pathKey) {
        if (d.data[config.pathKey]) {
          str = d.data[config.pathKey];
        } else {
          str = '';
        }
      } else {
        str = '';
      }
      let strlen = str.length;
      if ((arcLength - config.nodeSize) < (strlen * 8)) {
        let changedStr = str.substring(0, ((arcLength - config.nodeSize - 4) / 8));
        changedStr += '...';
        return changedStr;
      }
      return str;
    });

  // Transition link text to their new positions
  linkTextUpdate.transition()
    .duration(duration);

  // Transition exiting link text to the parent's new position.
  linktext.exit()
    .remove();

  // Store the old positions for transition.
  nodes.forEach((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

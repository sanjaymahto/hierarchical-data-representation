import * as d3 from 'd3';
import { config } from './data-loader';
import { mountConfig } from './dag';

/**
 * @description Creates a curved (diagonal) path from parent to the child nodes
 * @param  {} s
 * @param  {} d
 */
function diagonal(s, d) {
  const path = `M ${s.x} ${s.y}
  C ${(s.x + d.x) / 2} ${s.y},
    ${(s.x + d.x) / 2} ${d.y},
    ${d.x} ${d.y}`;
  return path;
}
/**
 * @description function to update the tree nodes.
 * @param  {} rendersvg // Svg tag
 * @param  {} rootElement // tree data or node Data
 * @param  {} renderTreemap // tree layout based on tree data or node data
 * @param  {} nodeSize // node size
 */
export default function updateNode(rendersvg, root, rootElement, renderTreemap, nodeSize) {
  let i = 0;
  let treeData;
  const duration = 550;
  const source = rootElement;

  // Creating Div element for tooltip
  let div = d3.select(mountConfig.divElement).append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // Assigns the x and y position for the nodes
  treeData = renderTreemap(root);

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
    .attr('transform', () => `translate(${source.x0},${source.y0})`)
    .on('click', (d) => {
      if (d.depth !== 0) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        updateNode(rendersvg, root, d, renderTreemap, nodeSize);
      }
    });

  // Add Circle for the nodes
  nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', nodeSize)
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
    .text(d => d.data.child)
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
    .attr('r', nodeSize)
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
  node.exit()
    .remove();

  // ****************** links section ***************************

  // Update the links...
  const link = rendersvg.selectAll('path.link')
    .data(links, d => d.id);

  // Enter any new links at the parent's previous position.
  const linkEnter = link.enter().insert('path', 'g')
    .attr('id', d => `edgePath${d.id}`)
    .attr('class', 'link')
    .attr('d', () => {
      let o = { x: source.x0, y: source.y0 };
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
      let str = `Child Of ${d.data.parent}`;
      let strlen = str.length;
      if ((arcLength - nodeSize) < (strlen * 8)) {
        div.transition()
          .duration(200)
          .style('opacity', 0.9);
        div.html(`child of ${d.data.parent}`)
          .style('left', `${d3.event.pageX - 70}px`)
          .style('top', `${d3.event.pageY - 10}px`);
      }
    })
    .on('mouseout', () => {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    })
    .append('textPath')
    .attr('class', 'textpath')
    .attr('startOffset', '50%')
    .attr('xlink:href', d => `#edgePath${d.id}`)
    .text((d) => {
      let arcLength = Math.sqrt((((d.x - d.parent.x) ** 2) + ((d.y - d.parent.y) ** 2)));
      let str = `Child Of ${d.data.parent}`;
      let strlen = str.length;
      if ((arcLength - nodeSize) < (strlen * 8)) {
        let changedStr = str.substring(0, ((arcLength - nodeSize - 4) / 8));
        changedStr += '...';
        return changedStr;
      }
      return str;
    });

  // Update the link text
  const linkTextUpdate = linketextEnter.merge(linktext);

  // Transition link text to their new positions
  linkTextUpdate.transition()
    .duration(duration)
    .attr('transform', (d) => {
      let middleIndex = d.parent.children.length / 2; // Find the middle index
      let index = d.parent.children.indexOf(d); // Find index of the current node
      // If the node is a right node, rotate it
      if (index >= middleIndex) {
        return `rotate(180, ${(d.x + d.parent.x) / 2}, ${(d.y + d.parent.y) / 2})`;
      }
      return `rotate(0, ${(d.x + d.parent.x) / 2}, ${(d.y + d.parent.y) / 2})`;
    });

  // Transition exiting link text to the parent's new position.
  linktext.exit()
    .remove();

  // Store the old positions for transition.
  nodes.forEach((d) => {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

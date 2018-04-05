import { config } from './data-loader';
import { root } from './data-renderer';
/**
 * @description function to update the tree nodes.
 * @param  {} rendersvg
 * @param  {} rootElement
 * @param  {} renderTreemap
 */
export default function updateNode(rendersvg, rootElement, renderTreemap) {
  let i = 0;
  let treeData;
  const duration = 550;
  const source = rootElement;

  // Assigns the x and y position for the nodes
  treeData = renderTreemap(root);

  // Compute the new tree layout.
  const nodes = treeData.descendants();
  const links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach((d) => { d.y = d.depth * 100; });

  // ****************** Nodes section *************************** //
  // Update the nodes...
  const node = rendersvg.selectAll('g.node')
    .data(nodes, d => d.id || (d.id = i += 1));

    // Enter any new modes at the parent's previous position.
  const nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr('transform', () => `translate(${source.x0},${source.y0})`)
    .on('click', (d) => {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      updateNode(rendersvg, d, renderTreemap);
    });

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
}

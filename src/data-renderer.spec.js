/* global describe, it */

import { expect } from 'chai';
import Graph from './data-renderer';

describe('Checking data-renderer file functions', () => {
  it('checking graph object', () => {
    let graph = new Graph();
    expect(Graph).to.be.a('function');
    expect(graph).to.deep.include(graph.render);
    expect(graph).to.deep.include(graph.updateData);
    expect(graph).to.deep.include(graph.collapse);
    expect(graph).to.deep.include(graph.expand);
  });
});

/* global describe, it */

import { expect } from 'chai';
import graph from './data-renderer';

describe('Checking data-renderer file functions', () => {
  it('checking graph object', () => {
    expect(graph).to.be.a('object');
    expect(graph).to.deep.include(graph.render);
    expect(graph).to.deep.include(graph.updateData);
    expect(graph).to.deep.include(graph.collapse);
    expect(graph).to.deep.include(graph.expand);
  });
});

/* global describe, it */

import { expect } from 'chai';
import { divElement, margin, width, height, nodeSize, dag } from './tag-selector';

describe('Checking tag-selector file functions', () => {
  it('Elements values before Initialisation of dag Function', () => {
    expect(divElement).to.be.a('undefined');
    expect(margin).to.be.a('undefined');
    expect(width).to.be.a('undefined');
    expect(height).to.be.a('undefined');
    expect(nodeSize).to.be.a('undefined');
  });
  it('Elements values after initializing dag Function and return of dag function', () => {
    let dagFn = dag();
    expect(dagFn).to.be.a('function');
    expect(divElement).to.equal('body');
    expect(margin).to.be.a('object');
    expect(width).to.equal(370);
    expect(height).to.equal(420);
    expect(nodeSize).to.equal(30);
  });
});

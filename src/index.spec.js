/* global describe, it */

import { expect } from 'chai';
import dag from './dag';

describe('index file unit-test case', () => {
  it('Checking return value of dag function ', () => {
    expect(dag()).to.be.a('function');
  });
});

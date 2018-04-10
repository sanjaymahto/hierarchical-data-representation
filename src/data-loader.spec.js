/* global describe, it */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import loadData, { config, adgData, csvData } from './data-loader';

describe('Checking loadData file functions', () => {
  it('Elements values before Initialisation of loadData Function', () => {
    expect(config).to.be.a('undefined');
    expect(adgData).to.be.a('undefined');
    expect(csvData).to.be.a('undefined');
  });
  it('Elements values after initializing loadData function', () => {
    let loader = loadData(`parent,name
        India,East
        India,West
        India,South
        India,North
        East,Kolkata
        West,Pune
        West,Mumbai
        South,Bengaluru
        North,Delhi
        Delhi,Karol Bagh
        Pune,Khadakwasla
        Kolkata,Salt Lake`);
    expect(loader).to.be.a('object');
    expect(config).to.be.a('object');
    expect(config).to.deep.equal({
      root: null, parentColor: '#F7C7C5', childColor: '#FFE2C5', rootColor: '#E9C9C9',
    });
    expect(adgData).not.to.be.a('undefined');
    expect(csvData).not.to.be.a('undefined');
    expect(csvData).to.be.a('array');
    expect(adgData).to.be.a('array');
  });
});

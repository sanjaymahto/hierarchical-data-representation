/* global describe, it */

import { expect } from 'chai';
import { collapseLevel, collapseLevelWithSibling, expandLevel, expandLevelWithSiblings } from './collapse-expand-tree';

describe('Checking collapse-expand-tree file functions', () => {
  it('function to check collapselevel without sibling Array', () => {
    let level = 0;
    let root =
    {
      name: 'Top Level',
      children: [
        {
          name: 'Level 2: A',
          children: [
            { name: 'Son of A' },
            { name: 'Daughter of A' },
          ],
        },
        { name: 'Level 2: B' },
      ],
    };
    let collapseLvl = collapseLevel(root, level);
    expect(collapseLevel).to.be.a('function');
    expect(collapseLvl).to.be.a('object');
  });
  it('function to check collapselevel with sibling Array', () => {
    let level = 1;
    let root =
    {
      name: 'Top Level',
      children: [
        {
          name: 'Level 2: A',
          children: [
            { name: 'Son of A' },
            { name: 'Daughter of A' },
          ],
        },
        { name: 'Level 2: B' },
      ],
    };
    let siblingArray = ['Level 2: A'];
    let collapseLvlWithSibling = collapseLevelWithSibling(root, level, siblingArray);
    expect(collapseLevelWithSibling).to.be.a('function');
    expect(collapseLvlWithSibling).to.be.a('object');
  });
  it('function to check expandlevel function without sibling Array', () => {
    let level = 0;
    let root =
    {
      name: 'Top Level',
      _children: [
        {
          name: 'Level 2: A',
          children: [
            { name: 'Son of A' },
            { name: 'Daughter of A' },
          ],
        },
        { name: 'Level 2: B' },
      ],
      children: null,
    };
    let expandLvl = expandLevel(root, level);
    expect(expandLevel).to.be.a('function');
    expect(expandLvl).to.be.a('object');
  });
  it('function to check expandlevel function with sibling Array with collpase boolean value as true.', () => {
    let level = 1;
    let root =
    {
      name: 'Top Level',
      children: [
        {
          name: 'Level 2: A',
          _children: [
            { name: 'Son of A' },
            { name: 'Daughter of A' },
          ],
          children: null,
        },
        { name: 'Level 2: B' },
      ],
    };
    let siblingArray = ['Level 2: A'];
    let iscollapsed = true;
    let expanLevlWithSiblings = expandLevelWithSiblings(root, level, siblingArray, iscollapsed);
    expect(expandLevelWithSiblings).to.be.a('function');
    expect(expanLevlWithSiblings).to.be.a('object');
  });
  it('function to check expandlevel function with sibling Array with collpase boolean value as false.', () => {
    let level = 1;
    let root =
    {
      name: 'Top Level',
      children: [
        {
          name: 'Level 2: A',
          _children: [
            { name: 'Son of A' },
            { name: 'Daughter of A' },
          ],
          children: null,
        },
        { name: 'Level 2: B' },
      ],
    };
    let siblingArray = ['Level 2: A'];
    let iscollapsed = true;
    let expanLevlWithSiblings = expandLevelWithSiblings(root, level, siblingArray, iscollapsed);
    expect(expandLevelWithSiblings).to.be.a('function');
    expect(expanLevlWithSiblings).to.be.a('object');
  });
});

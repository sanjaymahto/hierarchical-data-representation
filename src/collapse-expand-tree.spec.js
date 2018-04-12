/* global describe, it */
/* eslint no-undef:0 */

import { expect } from 'chai';
import collapseExpand from './collapse-expand-tree';

describe('Checking collapse-expand-tree file functions', () => {
  let root;
  beforeEach(() => {
    root =
    {
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          _children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    };
  });

  it('function to check collapselevel without sibling Array', () => {
    let level = 0;
    let collapseLvl = collapseExpand.collapseLevel(root, level);
    expect(collapseLvl).to.be.a('object');
    expect(collapseLvl).to.deep.equal({
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      _children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      children: null,
    });
  });
  it('function to check collapselevel with sibling Array', () => {
    let level = 1;
    let siblingArray = ['Level 2: A'];
    let collapseLvlWithSibling = collapseExpand.collapseLevelWithSibling(root, level, siblingArray);
    expect(collapseLvlWithSibling).to.be.a('object');
    expect(collapseLvlWithSibling).to.deep.equal({
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    });
  });
});

describe('Checking expand-tree functions', () => {
  it('function to check expandlevel function without sibling Array', () => {
    let level = 0;
    let root =
    {
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      _children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      children: null,
    };
    let expandLvl = collapseExpand.expandLevel(root, level);
    expect(expandLvl).to.be.a('object');
    expect(expandLvl).to.deep.equal({
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          _children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    });
  });

  it('function to check expandlevel function with sibling Array with iscollpased boolean value as false.', () => {
    let root =
    {
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    };
    let level = 1;
    let siblingArray = ['Level 2: A'];
    let iscollapsed = false;
    let expanLvlWithSiblings = collapseExpand.expandLevelWithSiblings(root, level, siblingArray, iscollapsed);
    expect(expanLvlWithSiblings).to.be.a('object');
    expect(expanLvlWithSiblings).to.deep.equal({
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    });
  });
  it('function to check expandlevel function with sibling Array with collpase boolean value as true.', () => {
    let root =
    {
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              _children: [
                {
                  name: 'Son',
                  data: { name: 'Son' },
                  depth: 3,
                },
                {
                  name: 'Daughter',
                  data: { name: 'Daughter' },
                  depth: 3,
                },
              ],
              children: null,
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    };
    let level = 1;
    let siblingArray = ['Level 2: A'];
    let iscollapsed = true;
    let expanLvlWithSiblings = collapseExpand.expandLevelWithSiblings(root, level, siblingArray, iscollapsed);
    expect(expanLvlWithSiblings).to.be.a('object');
    expect(expanLvlWithSiblings).to.deep.equal({
      name: 'Top Level',
      data: { name: 'Top Level' },
      depth: 0,
      children: [
        {
          name: 'Level 2: A',
          data: { name: 'Level 2: A' },
          depth: 1,
          _children: [
            {
              name: 'Son of A',
              data: { name: 'Son of A' },
              _children: [
                {
                  name: 'Son',
                  data: { name: 'Son' },
                  depth: 3,
                },
                {
                  name: 'Daughter',
                  data: { name: 'Daughter' },
                  depth: 3,
                },
              ],
              children: null,
              depth: 2,
            },
            {
              name: 'Daughter of A',
              data: { name: 'Daughter of A' },
              depth: 2,
            },
          ],
          children: null,
        },
        {
          name: 'Level 2: B',
          data: { name: 'Level 2: B' },
          depth: 1,
        },
      ],
      _children: null,
    });
  });
});

const elemConfig = {
  margin: {
    top: 50,
    right: 90,
    bottom: 30,
    left: 500,
  },
  width: 960,
  height: 500,
  nodeSize: 30,
  nodeConfig: { parentColor: '#F7C7C5', childColor: '#FFE2C5', rootColor: '#FBC7E2' },
  children: 'children',
  foldable: false,
  nameFunc(d) {
    return '';
  },
  eventFunc: [],
};

export { elemConfig as default };

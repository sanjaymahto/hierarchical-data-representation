/* eslint-disable */

const create = dag.default;

let dagFn = create('#dag');

let instance = dagFn({
  "host": null,
  "cut": "v",
  "ratioWeight": 1,
  "nodeid": 1,
  "lanes": [
    {
      "host": null,
      "cut": "h",
      "ratioWeight": 1,
      "nodeid": 2,
      "preferred": true,
      "lanes": [
        {
          "host": {
            "seed": 10,
            "dimensions": {
              "width": 300,
              "height": 300
            },
            "position": null
          },
          "cut": null,
          "ratioWeight": 1,
          "nodeid": 4,
          "preferred": true,
          "lanes": []
        },
        {
          "host": {
            "seed": 10,
            "dimensions": {
              "width": 300,
              "height": 300
            },
            "position": null
          },
          "cut": null,
          "ratioWeight": 1,
          "nodeid": 5,
          "lanes": []
        }
      ]
    },
    {
      "host": null,
      "cut": "h",
      "ratioWeight": 1,
      "nodeid": 3,
      "lanes": [
        {
          "host": {
            "seed": 10,
            "dimensions": {
              "width": 300,
              "height": 300
            },
            "position": null
          },
          "cut": null,
          "ratioWeight": 1,
          "nodeid": 6,
          "lanes": []
        },
        {
          "host": {
            "seed": 10,
            "dimensions": {
              "width": 300,
              "height": 300
            },
            "position": null
          },
          "cut": null,
          "ratioWeight": 1,
          "nodeid": 7,
          "preferred": true,
          "lanes": []
        }
      ]
    }
  ]
},{
    children: 'lanes',
    foldable: true
  });
instance.render();

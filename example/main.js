/* eslint-disable */

const create = dag.default;

let dagFn = create('#dag'); // Mounting DAG mount element.

let instance = dagFn({
  "host": null,
  "cut": "v",
  "ratioWeight": 1,
  "nodeid": 1,
  "pathText": "This is root Node.",
  "px": -150,
  "py": 350,
  "lanes": [
    {
      "host": null,
      "cut": "h",
      "ratioWeight": 1,
      "nodeid": 2,
      "preferred": true,
      "pathText": "This is first Node.",
      "px": 100,
      "py": 120,
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
          "pathText": "This is third Node.",
          "nodeid": 4,
          "preferred": true,
          "px": 170,
          "py": 200,
          "lanes": []
        },
        {
          "host": {
            "seed": 10,
            "dimensions": {
              "width": -200,
              "height": 320
            },
            "position": null
          },
          "cut": null,
          "ratioWeight": 1,
          "pathText": "This is fourth Node.",
          "nodeid": 5,
          "px": -20,
          "py": 350,
          "lanes": []
        }
      ]
    },
    {
      "host": null,
      "cut": "h",
      "ratioWeight": 1,
      "nodeid": 3,
      "pathText": "This is second Node.",
      "px": -50,
      "py": 120,
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
          "pathText": "This is fifth Node.",
          "nodeid": 6,
          "px": -200,
          "py": 200,
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
          "pathText": "This is sixth Node.",
          "nodeid": 7,
          "preferred": true,
          "px": -270,
          "py": 350,
          "lanes": []
        }
      ]
    }
  ]
}, {
    margin: {
      top: 50,
      right: 90,
      bottom: 30,
      left: 700,
    },
    width: 960,
    height: 400,
    nodeSize: 30,
    children: 'lanes',
    foldable: true
  });                       //Creating an instance.

instance.render();          // calling render method to render the DAG graph.

//Function to reset the DAG graph
function reset() {
  location.reload();
}

//Function to add names to the node.
function addName() {
  instance.nodeName((d) => {
    return d.data.nodeid;
  });
};

//function to add path names to the node.
function addpathName() {
  instance.pathName('instance', 'pathText');
};

//function to Update the Data.
function updateData() {
  instance.updateData({
    "host": null,
    "cut": "v",
    "ratioWeight": 1,
    "nodeid": 1,
    "pathText": "This is root Node.",
    "lanes": [
      {
        "host": null,
        "cut": "h",
        "ratioWeight": 1,
        "nodeid": 2,
        "preferred": true,
        "pathText": "This is first Node.",
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
            "pathText": "This is third Node.",
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
            "pathText": "This is fourth Node.",
            "nodeid": 5,
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
            "pathText": "This is fifth Node.",
            "nodeid": 6,
            "lanes": []
          }
        ]
      },
      {
        "host": null,
        "cut": "h",
        "ratioWeight": 1,
        "nodeid": 3,
        "pathText": "This is second Node.",
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
            "pathText": "This is sixth Node.",
            "nodeid": 7,
            "preferred": true,
            "lanes": []
          }
        ]
      }
    ]
  });
}

//Function to add event to nodes.
function addEvent() {
  instance.on('click', (d) => {
    alert(d.data.nodeid);
  })

  instance.on('mouseover', (d) => {
    console.log(d.data);
  })
};

//Function to remove all events to nodes.
function removeAllEvents() {
  instance.removeEvent();
};

//Function to remove event to nodes.
function removeEvents() {
  instance.removeEvent(['click', 'mouseover']);
};

//Function to collapse DAG tree according to levels.
function collapseLevel() {
  instance.expand(0);
  instance.collapse(1);
};

//Function to collapse DAG tree according to levels and sibling nodes.
function collapseLevelwithSibling() {
  instance.expand(0);
  instance.collapse(1, [0]);
}

//Function to expand DAG tree according to levels.
function expandLevel() {
  instance.collapse(1);
  instance.expand(1);
};

//Function to expand DAG tree according to levels and sibling nodes.
function ExpandLevelwithSibling() {
  instance.collapse(1);
  instance.expand(1, [0]);
}
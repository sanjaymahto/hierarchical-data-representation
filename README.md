# hierarchical-data-representation

Hierarchical data representation using Directed Acyclic Graph (DAG). 

## Description
**Hierarchical-Data-Representation** is a Nested JSON Data to
DAG(Directed Acyclic Graph) converter which includes dag, render, collapse, expand, updateData, nodeName, pathName, on, removeEvent APIS.


### Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Using dag API](#using-dag-api)
- [Using render API](#using-render-api)
- [Using collapse API](#using-collapse-api)
- [Using Expand API](#using-expand-api)
- [Using UpdateData API](#using-updatedata-api)
- [Using nodeName API](#using-nodename-api)
- [Using pathName API](#using-pathname-api)
- [Using on API](#using-on-api)
- [Using removeEvent API](#using-removeevent-api)


### Installation

 1. Unzip the downloaded file or clone the Repository.
 2. Open the extracted folder or Cloned Repository. 
 3. Type Command: `npm install` and press enter. This will 
      install all dependencies shown in `package.json` file.
4. Type `npm start` to run dev-server or `npm run build` to create the build.

### Development

1. Fork https://github.com/sanjaymahto/hierarchical-data-representation repo.
2. If there is an actual issue from the [issues](https://github.com/sanjaymahto/hierarchical-data-representation/issues) list you'd like to work on, feel free to assign it yourself or comment on it to avoid collisions (open a new issue if needed).
3. Make your changes.
4. Submit a PR.

For development from the github repository, run `build` command to generate the dag module, and transpile JS code:
 
    1. git clone https://github.com/<your-github-account>/hierarchical-data-representation.git
    2. cd hierarchical-data-representation
    3. npm install
    4. npm run build


### Using dag API

The [dag](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag.js) module allows you to mount SVG element to any HTML element provided. dag is a function which accepts one parameter `mount` which can be any HTML Element like div, span, id etc.
It returns a function to load Nested Tree JSON data with configuration object as parameters to create an Instance of DAG graph.

`Example:`

`Create a mount point for DAG (Directed Acyclic Graph)`

     // The mount point is an normal HTMLElement (div, span, id etc.)
               const dagFn = dag('#chart'); 
 `Pass Nested Tree JSON data and configuration Object to returned function to create an Instance of DAG`     

    // sample input data
    
    let data = {  
    "nodeid":"1",
    "nodename":"India",
    "extarinfo":{},
    "children":[  
      {  
         "nodeid":"2",
         "nodename":"East",
         "extarinfo":{},
         "children":[]
      },
      {  
         "nodeid":"3",
         "nodename":"West",
         "extarinfo":{},
         "children":[]
      },
      {  
         "nodeid":"4",
         "nodename":"North",
         "extarinfo":{},
         "children":[]
      },
      {  
         "nodeid":"5",
         "nodename":"South",
         "extarinfo":{},
         "children":[]
      }
    ]};

    // config object of the dag
    let config ={  
      margin:{    /*margin of the DAG graph*/
        top:50,
        right:90,
        bottom:30,
        left:500,
      },
      width:960, // width of DAG graph
      height:500, //height of DAG graph
      nodeSize:30, //Size of node
      nodeConfig:{         /* node colors for parent, child and root*/
        parentColor:'red',
        childColor:'green',
        rootColor:'blue'
      },
     children:'children',//mandatory field to identify child. default is `children`
     foldable:false, //It should be boolean (true/false).
    };
`Creating an Instance of DAG`    
    
    const instance = dagFn( data, config); //This function will return object.
    
### Using render API

The [render](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you to render the DAG graph out of Nested JSON data structure with your passed Configurations like node colors, child key, node-size, DAG graph dimensions and positions, tree foldability.

`Example:` 

    // API to render the DAG tree
              instance.render();
   
### Using collapse API

The [collpase](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/collapse-expand-tree.js) API allows you to collapse the DAG tree. there are two ways to call this API. first one with only level as a parameter and second is passing level and sibling Array of nodes to collapse. 

1. `Sending only level as parameter`
    `Example:`
        
        instance.collapse(2); /* collapse DAG tree after second level */

2. `Sending level and sibling node array of that level as parameter`
    `Example:`
        
        instance.collapse(2 , [0,1,2]); /* collapse only these siblings (i.e childs of that level) starting from left*/
>Note: Sibling array should be provided Sequentially in ascending order.
example: [0,1,2] or [0,4,7,8].

### Using Expand API

The [expand](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/collapse-expand-tree.js) API allows you to expand the DAG tree. there are two ways to call this API. first one with only level as a parameter and second is passing level and sibling Array of nodes to collapse. 

1. `Sending only level as parameter`
    `Example:`
        
        instance.expand(2); /* expand DAG tree after second level */

2. `Sending level and sibling node array of that level as parameter`
    `Example:`
        
        instance.expand(2 , [0,1]); /* expand only these siblings (i.e childs of that level) starting from left*/
>Note: Sibling array should be provided Sequentially in ascending order.
example: [0,1,2] or [0,4,7,8].

### Using UpdateData API

The [updateData](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you to update the DAG tree.This will update or reduce the node in the tree according to the data provided in the new Nested Tree JSON data. pass new updated Nested tree data as a parameter. It Should update the data only, keeps everything else same.

`Example:`
   
    instance.updateData(newData) /* new Data should be in tree JSON format same as 
                                    uploaded while creating an Instance */

### Using nodeName API

The [nodeName](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you to Name the nodes of DAG tree. This will allow you to change the Names of the Nodes dynamically. You have to pass function as a parameter to assign names to the Nodes of the tree.

`Example:`

    // argument of nodeName should be function type
          instance.nodeName((currentNode) => { 
            return currentNode.data.nodeid; }); /* nodeid is identifier here from the JSON tree data provided.*/

>Note: while accessing the data in the JSON structure. you have to put `.data` in the passed element in the function.
`example:`
currentNode.data.nodeid

### Using pathName API

The [pathName](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you to Name the paths of DAG tree. This will allow you to change the path names of the Nodes dynamically. You have to pass path identifier key from JSON Data as a parameter.

`Example:`

    /* argument of pathName should be string type i.e identifier key from the JSON tree data provided.*/
    
    instance.pathName('textPath'); /* textPath is identifier here from the JSON tree data provided.*/

### Using on API

The [on](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you to add events to the nodes of the tree.This will take two parameters i.e event name and event function on that click event.

`Example:`

    // ataching event listener
             instance.on('click', (evt) => {    
                   let nodeid = evt.data.nodeid;  
                   console.log(nodeid);
                   // do something else
                 });

>Note: If event with same name is created again then the latest event will overwrite the previous event.

### Using removeEvent API

The [removeEvent](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you to remove events from the nodes of the tree.There are two ways to remove an Event from the Nodes. first one is to remove all the events on one call. second is to remove selected events.

1. `calling removeEvent API without any parameter`
    `Example:`
        
        instance.removeEvent(); /* Remove all the Events from the nodes.*/

2. `Calling the removeEvent API with event array as a parameter`
    `Example:`
        
        instance.removeEvent(['click', 'mouseover']); /* remove only click and 
                                                mouseover events from nodes. */

>Note: If there are multiple events with the same name then, The latest one will be removed first.




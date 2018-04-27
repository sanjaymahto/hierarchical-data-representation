# hierarchical-data-representation

Hierarchical data representation using Directed Acyclic Graph (DAG). 

## Description
**Hierarchical-Data-Representation** is a Nested JSON Data to
DAG(Directed Acyclic Graph) converter which includes dag, render, collapse, expand, updateData, nodeName, pathName, on, removeEvent APIS.


### Table of Contents

- [Download](#download)
- [Development](#development)
- [Using dag API](#using-dag-api)
- [Using render API](#using-render-api)
- [Using optimizer API](#using-optimizer-api)
  - [Optimizer ESLint plugin](#optimizer-eslint-plugin)
- [Using compat-transpiler API](#using-compat-transpiler-api)
  - [Compat-transpiler Babel plugin](#compat-transpiler-babel-plugin)
- [RegExp extensions](#regexp-extensions)
  - [RegExp extensions Babel plugin](#regexp-extensions-babel-plugin)
- [Creating RegExp objects](#creating-regexp-objects)
- [Executing regexes](#executing-regexes)
- [Using interpreter API](#using-interpreter-api)
  - [Printing NFA/DFA tables](#printing-nfadfa-tables)
- [AST nodes specification](#ast-nodes-specification)

### Download

 1. Unzip the downloaded file or clone the Repository.
 2. Open the extracted folder or Cloned Repository. 
 3. Type Command: npm install and press enter. This will 
      install all dependencies shown in package.json file.

### Development

1. Fork https://github.com/sanjaymahto/hierarchical-data-representation repo.
2. If there is an actual issue from the [issues](https://github.com/sanjaymahto/hierarchical-data-representation/issues) list you'd like to work on, feel free to assign it yourself or comment on it to avoid collisions (open a new issue if needed).
3. Make your changes.
4. Submit a PR.

For development from the github repository, run `build` command to generate the dag module, and transpile JS code:
 
    1.)git clone https://github.com/<your-github-account>/hierarchical-data-representation.git
    2.)cd hierarchical-data-representation
    3.)npm install
    4.)npm run build


### Using dag API

The [dag](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag.js) module allows you to mount SVG element to any HTML element provided. dag is a function which accepts one parameter `mount` which can be any HTML Element like div, span, id etc.
It returns a function to load Nested Tree JSON data with configuration object as parameters to create an Instance of DAG graph.

`Example:`

`Create a mount point for DAG (Directed Acyclic Graph)`

     // The mount point is an normal HTMLElement (div, span). The 
       mount point height
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

The [render](https://github.com/sanjaymahto/hierarchical-data-representation/blob/origin/feature/refactoring-code/src/dag-renderer.js) API allows you render the DAG graph out of Nested JSON data structure with your passed Configurations like node colors, child key, node-size, DAG graph dimensions and positions, tree foldability.

`Example:` 

    // API to render the DAG tree
              instance.render();
   
## API

Create an instance

    // The mount point is an normal HTMLElement (div, span). The 
       mount point height
    // and width is already set using css or you can assign also.
              const dagFn = dag(mount/* dom node */)
       Example: const dagFn = dag('#chart'); 
                                            

Feed data

    //Pass Nested JSON Data.
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

    // config of the dag
    let config ={  
      margin:{  
        top:50,
        right:90,
        bottom:30,
        left:500,
      },
      width:960,
      height:500,
      nodeSize:30,
      nodeConfig:{  
        parentColor:'red',
        childColor:'green',
        rootColor:'blue'
      },
      children:'children',
      foldable:false,
    };

    const instance = dagFn( data, config); // Creating an Instance.


Render DAG Tree

    // api to render the DAG tree
          instance.render()

Collapse levels

    instance.collapse(
    	2 /* collapse after two level */, 
    	[0,1] /* collapse only these siblings, starting from left, if not 
                  provided collapse with every sibling*/
    );

Expand levels

    instance.expand(
    	2 /* expand level */, 
    	[0,1] /* expand only these siblings, starting from left, if not 
                  provided expand every sibling*/
    )

Update data ( Should update the data only, keeps everything else same.)

    instance.updateData(newData) /* new Data should be in tree 
    JSON format same as uploaded while creating an Instance*/

Naming The Nodes of Tree

    // argument of nodeName should be function type
    instance.nodeName((currentNode) => { 
        return currentNode.data.nodeid; }); /* nodeid is identifier here 
    from the JSON tree data provided.*/

Naming The paths of nodes

    /* argument of pathName should be string type i.e identifier 
       key from the JSON tree data provided.*/
    instance.pathName('textPath'); /* textPath is identifier 
    here from the JSON tree data provided.*/

Adding Event listeners to the nodes

    // ataching event listener
    instance.on('click', (evt) => {    
      let nodeid = evt.data.nodeid;   
       // do something else});

Removing Event listeners from the nodes

    // Removing event listener
    instance.removeEvent(); // To remove all the Events.
                or
    instance.removeEvent(['click','mouseover']); /* To remove click 
    and mouseover events from nodes.*/

## Prerequisites

Git

NodeJs

NPM

## Running

  installing dependencies:
```
    1). Unzip the downloaded file.
    2). Open the extracted folder. 
    3). Type Command: npm install and press enter. This will install all dependencies shown in package.json file.
```
  running project:
```
    1). Run `npm run build` command to run webpack to create a build.
    2). After creating the build Run `npm start` to start the dev-server.
```
  Testing Project:
```
    1).checkout to unit-tests branch.
    2.)Run `npm run test` command in the terminal.
```
## Result Image
![alt_text](https://i.imgur.com/2vvFuhQ.png)


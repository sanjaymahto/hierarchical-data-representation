# hierarchical-data-representation

## Description
Hierarchical data representation using Directed Acyclic Graph (DAG). 

## API

Create an instance

    // The mount point is an normal HTMLElement (div, span). The mount point height
    // and width is already set using css or you can assign also.
    const dagFn = dag(mount/* dom node */)
                or
    const dagFn = dag('#chart');


Feed data
 
    //Pass Nested JSON Data.
    // sample input data
    let data = "nodeid": "1",  "nodename": "India",  "extarinfo": {},  
    "children": [{"nodeid": "2","nodename": "Sandeep",      
    "extarinfo": {}, "children": []},{"nodeid": "3",      
    "nodename": "Sanjay", "extarinfo": {}, "children": []},    
    {"nodeid": "4", "nodename": "Rousan","extarinfo": {},      
    "children": []}]};

    // config of the dag
    let config = {    
    // dimenstions, position and cosmetic config    
    // foldable or not    
    // data children property name (default: children)    
    // etc.}
    const instance = dagFn(
    	data, 
    	config )/* configuration attr for each node, if not passed use default */ 

Render DAG Tree

    // api to render the DAG tree
    instance.render()

Collapse levels

    instance.collapse(
    	2 /* collapse after two level */, 
    	[0,1] /* collapse only these siblings, starting from left, if not provided collapse every siblings */
    )

Expand levels

    instance.expand(
    	2 /* expand level */, 
    	[0,1] /* expand only these siblings, starting from left, if not provided expand every siblings */
    )

Update data ( Should update the data only, keeps everything else same.)

    instance.updateData(newData) /* new Data should be in tree 
    JSON format same as uploaded while creating an Instance*/

Naming The Nodes of Tree

    // argument of nodeName should be function type
    instance.nodeName((currentNode) => { 
        return currentNode.nodeid; }); // nodeid is identifier here from the JSON tree data provided.

Naming The paths of nodes

    // argument of pathName should be string type i.e identifier key from the JSON tree data provided.
    instance.pathName('textPath'); // textPath is identifier here from the JSON tree data provided.

Adding Event listeners to the nodes

    // ataching event listener
    instance.on('click', (evt) => {    
      let nodeid = evt.node.nodeid;   
       // do something else});

Removing Event listeners from the nodes

    // Removing event listener
    instance.removeEvent(); // To remove all the Events.
                or
    instance.removeEvent(['click','mouseover']); // To remove click and mouseover events from nodes.

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


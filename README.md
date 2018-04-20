# hierarchical-data-representation

## Description
Hierarchical data representation using Directed Acyclic Graph (DAG). 

## API

Create an instance

    // The mount point is an normal HTMLElement (div, span). The mount point height
    // and width is already set using css or you can assign also.
    const dagFn = dag(mount/* dom node */)
                or
    const dagFn = dag('body', {
    top: 50, right: 90, bottom: 30, left: 500,
    }, 960, 500, 30);


Feed data
 
    //Load CSV or JSON data.
    //configuration of nodes are optional like nodes color.
    let data = `parent,child,text,textPath
    null,India,parent
    India,East India,child1,child of India
    India,West India
    India,South India
    India,North India`; 
    const instance = dagFn(
    	data, 
    	config )/* configuration attr for each node, if not passed use default */ 

Render

    // api to render the tree
    instance.render()

Collapse levels

    instance.collapse(
    	2 /* collapse after two level */, 
    	['East','West'] /* collapse only these siblings, if not provided collapse every siblings */
    )

Expand levels

    instance.expand(
    	2 /* expand level */, 
    	['East','West'] /* collapse only these siblings, if not provided collapse every siblings */, 
    	true /* if all the level after this level should be collapsed, default false */
    )

Update data. Should update the data only, keeps everything else same.

    instance.updateData(newData) /* new Data should be in CSV or JSON format same as uploaded while 
    creating an Instance*/

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


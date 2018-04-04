# hierarchical-data-representation

## Description
Hierarchical data representation using Directed Acyclic Graph (DAG). 


## API

Create an instance

    // The mount point is an normal HTMLElement (div, span). The mount point height
    // and width is already set using css.
    const dagFn = dag(mount/* dom node */)

Feed data

    const instance = dagFn(
    	data, 
    	config /* configuration attr for each node, if not passed use default */
    )

Render

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

    instance.data(newData)

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
    2). After creating the build Run `npm start` to start the server.
```
## Result Image
![alt_text](https://i.imgur.com/NJXmfnj.png)

## Built With

OS: Mac OS

Editor: VS Code

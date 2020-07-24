
import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfinderVisualizer.scss';


const START_NODE_ROW = 11;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 50;
const ROW_NUMBER = 20;
const COLUMN_NUMBER = 52;

let randomGenerator = false;
let defaultRandomWallGenerator = 0.15;

export default class PathfinderVisualizer extends Component {
  constructor(){
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      startNodeIsPressed: false,
      finishNodeIsPressed: false,
      isVisualizing: false,
      visualizationBeenReset: true,
      path: [],
    };
  }

  /**
   * Function called on init, so as to create 2D grid layout with start and finish node set
   */
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }
  
  /**
   * Function to handle when mouse is clicked at node, so as to start making or make particular node an obstacle
   */
  handleMousePress(row, col){
    if (!this.state.visualizationBeenReset) return;
    if (this.state.isVisualizing) return;

    if (this.state.grid[row][col].isStart){
      this.handleMousePressforStart(row, col);
      return;
    } else if(this.state.grid[row][col].isFinish){
      this.handleMousePressforFinish(row, col);
      return;
    }
    const newGrid = toggleWallResetGrid(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  /**
   * Function to handle when mouse enters node while pressed, so as to make node an obstacle
   */
  handleMouseEnter(row, col){
    if (!this.state.visualizationBeenReset) return;
    if (this.state.isVisualizing) return;
    if ((!this.state.mouseIsPressed) && (!this.state.startNodeIsPressed) && (!this.state.finishNodeIsPressed)) return; //if not pressed already, don't do anything
    if(this.state.startNodeIsPressed){
      this.handleMouseEnterWithStart(row, col);
      return;
    } 
    else if(this.state.finishNodeIsPressed){
      this.handleMouseEnterWithFinish(row, col);
      return;    
    }
    else {
      const newGrid = toggleWallResetGrid(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }
  }

  /**
   * Function to handle when user stops holding down mouse for obstacle creation, so s to stop making walls
   */
  handleStop(row, col){
    if (!this.state.visualizationBeenReset) return;
    if (this.state.isVisualizing) return;
    this.setState({mouseIsPressed: false});
    this.setState({startNodeIsPressed: false});
    this.setState({finishNodeIsPressed: false});
  }

  /**
   * Function to handle when mouse is clicked on start, note that it is start pressed - prep to hold it
   */
  handleMousePressforStart(row, col){
      this.setState({startNodeIsPressed: true});
  }
  /**
   * Function to handle when mouse is clicked on finish, note that it is start pressed - prep to hold it
   */
  handleMousePressforFinish(row, col){
    this.setState({finishNodeIsPressed: true});
}

  /**
   * When mouse enters node while pressed  (holding the start node), make node wall
   */
  handleMouseEnterWithStart(row, col){
    if (!this.state.startNodeIsPressed) return; //if start not pressed already, don't do anything
    const newGrid = toggleStartResetGrid(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  /**
   * Function to handle when mouse enters node while pressed (holding the finish node), make node wall
   */
  handleMouseEnterWithFinish(row, col){
    if (!this.state.finishNodeIsPressed) return; //if finish not pressed already, don't do anything
    const newGrid = toggleFinishResetGrid(this.state.grid, row, col);
    this.setState({grid: newGrid});
  } 

  /**
   * Function to handle when mouse leaves node while pressed, make node wall
   */
  handleMouseLeave(row, col){
    if ((!this.state.startNodeIsPressed) && (!this.state.finishNodeIsPressed)) return; //if not pressed already, don't do anything
    let newGrid;
    if(this.state.startNodeIsPressed){
      newGrid = toggleStartResetGrid(this.state.grid, row, col);
    } 
    else if(this.state.finishNodeIsPressed){
      newGrid = toggleFinishResetGrid(this.state.grid, row, col);
    }
    this.setState({grid: newGrid});
}

  /**
   * Function to get current startNode coordinates for visualization
   */
  getStartNode(){
    const {grid} = this.state;
    let startNode =[]
    grid.forEach(function(row){
      for (let i = 0; i < row.length; i++){
        let node = (row[i]);
        if (node.isStart){
          startNode.push(node)
        }
      }
    });
    return startNode;
  }

    /**
   * Function to get current finishNode coordinates for visualization
   */
  getFinishNode(){
    const {grid} = this.state;
    let finishNode =[]
    grid.forEach(function(row){
      for (let i = 0; i < row.length; i++){
        let node = (row[i]);
        if (node.isFinish){
          finishNode.push(node)
        }
      }
    });
    return finishNode;
  }

 getPath(){
   const {grid} = this.state;
   const start = this.getStartNode()
   const end = this.getFinishNode()
   const sindex1 = [start[0].row, start[0].col]
   const findex1 = [end[0].row, end[0].col]
   const sindex2 = [start[1].row, start[1].col]
   const findex2 = [end[1].row, end[1].col]
   console.log(sindex2)
   let maze=[]
   grid.forEach(function(row){
     let rowm=[]
    for (let i = 0; i < row.length; i++){
      let node = (row[i]);
      if (node.isWall){
        rowm.push(1);
      }
      else{
        rowm.push(0)
      }
    }
    maze.push(rowm)
  });
  
this.getData(sindex1,findex1,sindex2,findex2,maze)
setTimeout(()=>{this.findPath((this.state.path)['path1'])},3000)
setTimeout(()=>{this.findPath((this.state.path)['path2'])},3000)
}
//Final find path
findPath(p){
  const {grid} = this.state;
  if(p[0][0]===-1 && p[0][1]===-2)
{console.log('Ouch')
alert('No path available')}
const shortestpath=[]
setTimeout(()=>{console.log(p)
  for(var i=0;i<p.length;i++){
  for (let row = 0; row <ROW_NUMBER; row++) {
    
    for (let col = 0; col < COLUMN_NUMBER; col++) {
       let node = grid[row][col]
      if(row===p[i][0] && col===p[i][1]){
      shortestpath.push(node)
      }
    }
  }
}
  console.log(shortestpath)
  this.animateShortestPath(shortestpath)
},5000)
}

//For fetching
async getData(sindex1, findex1,sindex2,findex2, maze){
  const {grid} = this.state
  let sendData = { "start1": sindex1,
  "start2":sindex2,
  "end1": findex1,
  "end2": findex2,
  "maze": maze,
  "cost": 1,
  }
  console.log(sendData)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sendData)
};
const response = await fetch('http://127.0.0.1:5000/', requestOptions);
const data = await response.json();
console.log(data);
this.setState({path: await data});
}

animateShortestPath(nodesInShortestPathOrder) {

  for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      if(!node.isFinish && !node.isStart){
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';}
    }, 50 * i);
  }
  this.setState({isVisualizing: false});
  this.setState({visualizationBeenReset: true});
}




  /**
   * Function that changes the obstacke setup
   */
  changeObstacles(){
    if (this.state.isVisualizing) return;
    // if (!this.state.visualizationBeenReset) return;
    randomGenerator = true;
    const grid = getInitialGrid();
    this.setState({grid});
    this.minorResetGrid(grid);
    this.setState({visualizationBeenReset: true});
  }

  /**
   * Function that generates Random Obstacle SetUp given a particular obstacle density
   */
  changeDensity(density){
    if (this.state.isVisualizing) return;
    // if (!this.state.visualizationBeenReset) return;
    randomGenerator = true;
    defaultRandomWallGenerator = density;
    const grid = getInitialGrid();
    this.setState({grid});
    this.minorResetGrid(grid);
    this.setState({visualizationBeenReset: true});

  }
  /**
   * Function to show or hide obstacles On or Off
   */
  toggleObstacles(){
    if (this.state.isVisualizing) return;
    // if (!this.state.visualizationBeenReset) return;
    randomGenerator = !randomGenerator;
    const grid = getInitialGrid();
    this.setState({grid});
    this.minorResetGrid(grid);
    this.setState({visualizationBeenReset: true});
  }

  resetGrid(){
    if (this.state.isVisualizing) return;
    // if (!this.state.visualizationBeenReset) return;
    this.setState({isVisualizing: false});
    const grid = getInitialGrid();
    this.setState({grid});
    grid.forEach(function(row){
      for (let i = 0; i < row.length; i++){
        let node = (row[i]);
        if (!node.isStart && !node.isFinish && !node.isWall){
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
      }
    });
    this.setState({visualizationBeenReset: true});
  }

  minorResetGrid(grid){
    if (this.state.isVisualizing) return;
    grid.forEach(function(row){
      for (let i = 0; i < row.length; i++){
        let node = (row[i]);
        if (!node.isStart && !node.isFinish && !node.isWall){
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
        }
      }
    });
  }

  render(){
    const {grid, mouseIsPressed, startNodeIsPressed, finishNodeIsPressed} = this.state;
    const isVisualizing = this.state.isVisualizing;

    return (
      <div>
        <div id="openModal-about" class="modalDialog">
            <div>
              <a href="#saka" title="Close" className="close">X</a>
              <div class="cPanelContainer">

<div className="cPanelHeader">
  <h1>Welcome to PathFinder</h1>
  <span>A pathfinding algorithm seeks to find the shortest path between two points.</span> <br/>
  <span>This application visualizes various pathfinding algorithms in action on a 2D grid.</span>

<h3>Instruction Guide</h3> 
<hr/>
<p>This particular app finds the most optimized combination of start and end points inspired by a robot task-allotment problem, using the
  A star algorithm to find the shortest path first.
</p>
<hr/>
<p>You can add obstacles to the grid through multiple ways:</p>
<ul>
<p> - &nbsp;<span>Toggle</span>  &nbsp; - &nbsp; You can toggle obstacles on or off</p>
<p> - &nbsp;<span>Obstacle options</span>  &nbsp; - &nbsp;  You can select between three different obstacle densities</p>
<p> - &nbsp;<span>Draw obstacles</span>  &nbsp; - &nbsp;  You can click or click and drag to generate obstacles with the pointer</p>
</ul> 

<h3>Application Key</h3> 
<hr/>
<ul>
<p> - &nbsp;<span>Nodes</span>  &nbsp; - &nbsp; A point in the grid</p>
<p> - &nbsp;<span>Gray nodes</span>  &nbsp; - &nbsp; Obstacles</p>
<p> - &nbsp;<span>Pink nodes</span>  &nbsp; - &nbsp; Nodes that are part of the final path</p>
<p> - &nbsp;<span>Green node</span>  &nbsp; - &nbsp; The starting point</p>
<p> - &nbsp;<span>Red node</span>  &nbsp; - &nbsp; The end point</p>
<p> <b><span>Note</span>  &nbsp; - &nbsp;You can drag the start point (in green) and endpoint (in red) to your desired position</b></p>

</ul> 
</div>

<div className="cPanelFooter">
</div>

</div>
            </div>
        </div>
        <nav>
        <div className="logo" onClick={() => this.resetGrid()}>
        PATH  <br/> FINDER 
        </div>
        <ul className="nav-links">{isVisualizing 
        ? <div>
          <div className="spinner"> 
          <span></span><span></span><span></span>
          </div>
          <div className="label">Visualizing</div>
      </div>
      
        : <ul className="nav-links">
          <label className="dropdown">
              <div className="dd-button">
              Visualize
              </div>
              <input type="checkbox" className="dd-input" id="test"></input>
              <ul className="dd-menu">
                
                <li onClick={() => this.getPath()}>Find the most optimized combination</li>
              </ul>
            </label>
            <li onClick={() => this.resetGrid()}>Reset Grid</li>
            <li onClick={() => this.toggleObstacles()}>Toggle Obstacles</li>  
            <label className="dropdown">
              <div className="dd-button">
                Obstacle Options
              </div>
              <input type="checkbox" className="dd-input" id="test"></input>
              <ul className="dd-menu">
                <li onClick={() => this.changeObstacles()}>Change Obstacles</li>
                <li onClick={() => this.changeDensity(0.095)}>Low Density Obstacles</li>
                <li onClick={() => this.changeDensity(0.13)}>Medium Density Obstacles</li>
                <li onClick={() => this.changeDensity(0.25)}>High Density Obstacles</li>
              </ul>
            </label>

            <li> <a href="#openModal-about">App Info</a> </li>  

          </ul>
      }</ul> <br/> 

      </nav>     

        {/* Render the 2D grid layout */}
        <div className="grid align-middle">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      startNodeIsPressed={startNodeIsPressed}
                      finishNodeIsPressed={finishNodeIsPressed}
                      whileMousePressed={(row, col) => this.handleMousePress(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}   
                      onMouseLeave={(row, col) => this.handleMouseLeave(row, col)}   
                      onMouseUp={()=> this.handleStop(row, col)}                
                      row={row}>
                    </Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

/**
 * function to setup nodes and default position of startpoint and endpoint
 */
const createNode = (col, row) => {
  return {
    col,
    row,
    distance: Infinity,
    isStart: (row === START_NODE_ROW || row === START_NODE_ROW+1) && col === START_NODE_COL,
    isFinish: (row === FINISH_NODE_ROW || row === FINISH_NODE_ROW+1) && col === FINISH_NODE_COL,
    isWall: false,
    isVisited: false,
    previousNode: null,
    f_score: Infinity,
    g_score: Infinity,
    h_score: Infinity,
  };
};

/**
 * function to setup 2D grid layout
 */
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row <ROW_NUMBER; row++) {
    const currentRow = [];
    for (let col = 0; col < COLUMN_NUMBER; col++) {
      let newNode =createNode(col, row);
      //Random wall generator
      if (randomGenerator){
          if (Math.random(1) < defaultRandomWallGenerator){
            newNode.isWall = true;
        }
      }
      currentRow.push(newNode);
    }
    grid.push(currentRow);
  }
  return grid;
};

/**
 * function to make a node a wall
 */
const toggleWallResetGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

/**
 * function to make a node a startPoint or remove it as a startPoint
 */
const toggleStartResetGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

/**
 * function to make a node a endPoint or remove it as a startPoint
 */
const toggleFinishResetGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

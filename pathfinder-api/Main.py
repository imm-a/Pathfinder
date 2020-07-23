from Astar import *
from multiple import *
if __name__ == '__main__':

    maze = [[0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0]]
    
    startpoints = [[0, 0],[3,4]] # starting position
    endpoints = [[4,5],[3,5]] # ending position
    cost = 1 # cost per movement
    
    #path,costf = search(maze,cost, start, end)
    #print(path, costf)
    s = len(startpoints)
    e = len(endpoints)
    p=[]
    x=compare(maze,cost,startpoints,endpoints)
    y=x.index(min(x))
    a=which_path(y,s,e)
    for i in range (s):
      start = startpoints[a[i][0]]
      end = endpoints[a[i][1]]
      path,costf = search(maze,cost, start, end)
      p.append(path)
      #print(path, costf)
      #print('\n'.join([''.join(["{:" ">3d}".format(item) for item in row]) 
      #for row in path]))
    #return p
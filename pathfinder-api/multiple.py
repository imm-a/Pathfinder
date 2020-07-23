from Astar import *

def find_path(maze,cost,start,end):
    path,costf = search(maze,cost, start, end)
    return costf

def compare(maze,cost,startpoints,endpoints):
    s = len(startpoints)
    e = len(endpoints)

    distances=np.zeros((e,e),dtype=int)
    i=j=0
    for spoint in startpoints:
        for epoint in endpoints:
            total_cost=find_path(maze,cost,spoint,epoint)
            distances[i][j]=total_cost 
            j=j+1
        i=i+1
        j=0
    print(distances)
    costs=[]
    for k in range (s):
        c=0
        i=0
        j=k
        for i in range (s-k):
            
            c=c+distances[i][j]
            j=j+1
        j=0
        for i in range (s-k,s):
            c=c+distances[k][j]  
            j=j+1
      
        costs.append(c)
    return costs
    #returns the start-end indices which we use to find the start-end pairs

def which_path(y,s,e):
  arr = np.zeros((s,2),dtype=int) #array with s rows and two columns
  if y==0:
    for i in range (s):
      arr[i][0]=arr[i][1]=i
  else:
    j=0
    for i in range(y,s):
      arr[j][0]=j
      arr[j][1]=i
    j=y
    for i in range(0,y):
      arr[j][0]=j
      arr[j][1]=i
  return arr
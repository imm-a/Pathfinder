from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from flask import jsonify,request
from Astar import search
from multiple import *
import numpy as np
import json
app = Flask(__name__)
api = Api(app)
CORS(app)
class Pathfinder(Resource):

    #def get(self):
     #   path = search(maze,cost, start, end)
      #  return jsonify({'data': path})
    def post(self):
        data = request.get_json()
        param_list= data
        start1 = param_list['start1']
        start2 = param_list['start2']
        end1 = param_list['end1']
        end2 = param_list['end2']
        cost = int(param_list['cost'])
        maze = param_list['maze']
        #startpoints = [start1, start2]
        #endpoints = [end1, end2]
        #x=compare(maze,cost,startpoints,endpoints)
        #y=x.index(min(x))
        #a=which_path(y,s,e)
        #for i in range (s):
        #start = startpoints[a[0][0]]
        #end = endpoints[a[0][1]]
        costs = np.zeros((2,2),dtype=int)
        path,costf=search(maze,cost,start1,end1)
        costs[0][0]=costf
        path,costf=search(maze,cost,start1,end2)
        costs[0][1]=costf
        path,costf=search(maze,cost,start2,end1)
        costs[1][0]=costf
        path,costf=search(maze,cost,start2,end2)
        costs[1][1]=costf

        if((costs[0][0]+costs[1][1])<(costs[0][1]+costs[1][0])):
            path1,costf = search(maze,cost, start1, end1)
            path2,costf = search(maze,cost, start2, end2)
        else:
            path1,costf = search(maze,cost, start2, end1)
            path2,costf = search(maze,cost, start1, end2)
        
        #path,visited = search(maze,cost, start1, end1)
        paths={}
        paths['path1']=path1
        paths['path2']=path2
        #path, costf = search(maze,cost,start,end)
        return json.loads(json.dumps(paths))
        return('Done')
        #return startp
        
    
    def get(self):
        return 'Hi'
api.add_resource(Pathfinder, '/')

if __name__ == '__main__':
    app.run(debug=True)

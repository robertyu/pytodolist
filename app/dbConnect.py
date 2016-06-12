from pymongo import MongoClient

#create connection
client = MongoClient('127.9.129.2',27017)
client.pytodolist.authenticate('admin','rsnhT_QAPbZ_')
#create db as list
db = client.pytodolist

class dbcon(object):
#db(schema).todolist(tablename).method
	def addValue(self, todos, n, ids):
		toDb = {
					'tasks' : str(todos), 'mid' : str(ids)
			   }
		insert = db.todolist.insert(toDb, ids)
		return (todos)

	def displayDB(self, todos):
		queryDb = db.todolist.find()
		qlist = []
		for a in queryDb:
			qlist.append(a)
			#return(qlist[a]['tasks'])
		return(str(qlist))

	def editValue(self, todos, olds):
		result = db.todolist.update(
			{"mid": olds},
			{"$set": {"tasks": todos}})
		return (result)

	def deleteValue(self, ids):
		dlist = ids.split(",")
		for x in dlist:
			result = db.todolist.remove({"mid": x})
		return (ids)

	def deleteallValue(self):
		result = db.todolist.delete({})
		return (todos)

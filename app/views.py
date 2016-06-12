from flask import Flask, render_template, request
from app import app
from app import dbConnect

python = dbConnect.dbcon()
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route("/add", methods=["POST", "GET"])
def addlist():

	task  = request.form["x"]
	ids = request.form["idz"]
	return python.addValue(task, 0, ids)
	return redirect(url_for('index.html'))

@app.route("/edit", methods=["POST", "GET"])
def editlist():
	task  = request.form["x"]
	old = request.form["var"]
	return python.editValue(task, old)
	#return redirect(url_for('index'))

@app.route("/delete", methods=["POST", "GET"])
def deletelist():
	task  = request.form["x"]
	return python.deleteValue(str(task))
	#return redirect(url_for('index'))

@app.route("/deleteAll", methods=["POST", "GET"])
def deletealllist():
	return python.deleteallValue()
	#return redirect(url_for('index'))

@app.route("/select", methods=["POST", "GET"])
def displaylist():
	dbase = request.form["x"]
	return python.displayDB("dbase")
	#return redirect(url_for('index'))
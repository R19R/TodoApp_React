from flask import Flask, jsonify, request, json
from werkzeug.utils import redirect


app = Flask(__name__)
app.secret_key = 'meanttobesecret'


# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///react.db'
# db = SQLAlchemy(app)


# db.init_app(app)
# @app.before_first_request
# def create_table():
#     db.create_all()

with open("task.json", 'r') as rfile:
    data = rfile.read()

myObj = json.loads(data)

@app.route("/")
def home():
    return redirect("/getall")

@app.route("/getall", methods=['GET'])
def getall():
    return jsonify(myObj)

@app.route("/create", methods=['POST'])
def create():
    res = request.get_json(force=True)
    myObj.append(res)
    return jsonify(res)

@app.route("/deletetask", methods=['DELETE'])
def deletetask():
    res = request.get_json(force=True)
    for id, task in enumerate(myObj):
        if task.get('task') == res['task']:
            myObj.pop(id)
            return jsonify(res)
    return jsonify({"info": "Item not Found!!", "id":id}) 

@app.route("/updatetask", methods=['PUT'])
def updatetask():
    res = request.get_json(force=True)
    for id, task in enumerate(myObj):
        if task.get('task') == res['task']:
            myObj.pop(id)
            myObj.insert(id, res)
            break
    return jsonify(res)



if __name__ == "__main__":
    app.run(debug=True)

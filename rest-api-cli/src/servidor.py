from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/', methods=['POST'])
def hi_server():
    return 'Hi, Server'

@app.route('/', methods=['DELETE'])
def bye_server():
    return 'Bye, Server'

@app.route('/', methods=['PUT'])
def update_server():
    return 'Update, Server'

app.run(debug=True)

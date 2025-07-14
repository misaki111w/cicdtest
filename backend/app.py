from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 用于存储待办事项的内存列表
todos = []
next_id = 1

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    global next_id
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({'error': 'Missing todo text'}), 400
    todo = {'id': next_id, 'text': data['text']}
    todos.append(todo)
    next_id += 1
    return jsonify(todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

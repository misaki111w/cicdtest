import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // 获取所有待办事项
  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 添加待办事项
  const addTodo = async () => {
    if (!input.trim()) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    setInput('');
    fetchTodos();
  };

  // 删除待办事项
  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    });
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>待办事项</h2>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="请输入待办事项"
          style={{ flex: 1, marginRight: 8 }}
        />
        <button onClick={addTodo}>添加</button>
      </div>
      {loading ? <div>加载中...</div> : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App; 
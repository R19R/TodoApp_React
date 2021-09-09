import React, {useState, useEffect} from 'react';
import './App.css';
import TodoList from './Component/TodoList';
import TodoForm from './Component/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(()=> {
    const fetchTasks = async () => {
      let request = await fetch("/getall");

      if (request.ok){
        let response = await request.json();
        setTodos(response);
      } else {
        console.log("HTTP Error: "+ request.status )
      }
    }
    fetchTasks();
  }, [])
  return (
    <div className="App">
     <TodoForm addTodo={(todo) => {
        if (todo.task.trim().length > 0) {
          setTodos([...todos, todo]);
        }
     }}/>
    <TodoList todos={todos} updateTodos={(list) => { setTodos(list) }} />

    </div>
  );
}

export default App;

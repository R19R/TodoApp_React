import React from 'react';

async function deleteTask(url="", data={}){
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {'Content-type': "application/json"},
        body: JSON.stringify(data)
    });
    return response.json();
}

async function updateTask(url="", data={}){
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-type': "application/json"},
        body: JSON.stringify(data)
    });
    return response.json();
}

function TodoList({ todos, updateTodos }) {

    const removeTask = async(index, todo) => {
        await deleteTask('/deletetask', todo)
            .then( data => {
                if (data.complete === true || data.info){
                const updatedList = todos.filter((task, taskIndex) => {
                    return taskIndex !== index;
                });
                 updateTodos(updatedList);
                } else{
                    alert("Task not completed yet!");
                }
            })
        }

    const markComplete = async (index, todo) => {
        const updated = { ...todo, complete: !todo.complete }
        await updateTask('/updatetask', updated)
            .then( data => {
                if (data.complete === false){
                    alert("Task not completed yet!");
                } else if(data.complete === true){
                    alert("Task completed!")
                }
                const updatedTask =  todos.map((item, id) => {
                if (index !== id) return item;
                return updated;
            });
            updateTodos(updatedTask);
        })
    }
    return (

        <div className="todo-list">
            {todos.map((todo, index) => (
                <div key={index}>
                    <div
                        className={`todo ${todo.complete ? "taskDone" : ""}`}
                        onClick={() => (markComplete(index, todo))}>
                        {index + 1}: {todo.task}
                    </div>
                    <div>
                        <button className="Deletebutton" 
                        onClick={() => removeTask(index, todo)} >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TodoList;
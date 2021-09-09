import React, { useState } from 'react';


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    });
    return response.json();
 }

function TodoForm({addTodo}){
    const [userInput, setUserInput] = useState("");


    const handleSubmit = async e => {
        e.preventDefault();
        if (!userInput) return;
        await postData('/create',
        {'complete': false, "task":userInput})
        .then(data => {
            addTodo(data)
        });
        setUserInput("");
    }
    return(
    <form onSubmit={handleSubmit} className="todo-form">
        <input
            placeholder="New Task"
            type="text"
            value={userInput}
            onChange={ e => setUserInput(e.target.value)} />
        <button onClick={handleSubmit} 
        className="submitButton">
         Submit
        </button>
    </form>
    );

}

export default TodoForm;
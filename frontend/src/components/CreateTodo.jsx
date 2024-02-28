import { useState } from 'react';
export function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div>
            <input
                type='text'
                placeholder='title'
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></input>

            <input
                type='text'
                placeholder='description'
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            ></input>

            <button
                onClick={() => {
                    fetch('http://localhost:3000/todos', {
                        method: 'POST',
                        headers: {
                            contentType: 'application/json',
                        },
                        body: JSON.stringify({
                            title: title,
                            description: description,
                        }),
                    }).then(async (res) => {
                        await res.json();
                        alert('Todo added');
                    });
                }}
            >
                Add Todo
            </button>
        </div>
    );
}

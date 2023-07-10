import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [todoListData, setTodoListData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, [submitClicked]);

  const fetchData = async () => {
    const url = "/todos";
    try {
      const response = await fetch(url);
      const json = await response.json();
      if(response.status === 200) {
        setTodoListData(json);
      }
      console.log(json, response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const submit = async () => {
    if (!title || !description) {
      alert("Title or Description cannot be blank")
      return;
    }
    // let mainUrl = "http://localhost:5000";

    try {
      const res = await fetch(`/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error('Failed to create a todo');
      }


      setTitle('');
      setDescription('');

      window.alert('Successfully created a todo');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while creating a todo');
    }
    setSubmitClicked(!submitClicked);
  };

  return (
    <div>
      <div className="container my-3">
        <h3>Add a Todo</h3>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Todo Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              aria-describedby="titleHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Todo Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="desc"
            />
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <button type="button" className="btn btn-sm btn-success" onClick={submit}>
            Add Todo
          </button>
        </form>
      </div>

      <div className='todo-list-data'>
        <h3>To Do List </h3>
        <ul>
          {todoListData.length !== 0 ? todoListData.map((item) =>
            <li>{item.title} -- {item.description}</li>
          ) : <li>No Data Found!</li>}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

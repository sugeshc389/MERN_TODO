import { useState } from "react";
import axios from "axios";


const AddTodo = () => {
  const [task, setTask] = useState()
  const handleAdd = () => {

    axios.post('http://localhost:3001/add', { task: task })
      .then(result => console.log(result))
      .catch(err => console.log(err))
      setTask("");
  }

  return (
    <div>
      <input
        onChange={(e) => setTask(e.target.value)}
        type="text"
        className="addTodo"
        value={task}
      />
      <button onClick={handleAdd} >Add Todo</button>

    </div>
  );
};

export default AddTodo;

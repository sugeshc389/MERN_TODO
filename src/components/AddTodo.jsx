import {  useState } from "react";
import axios from "axios";


const AddTodo = ({ props }) => {
  const [task, setTask] = useState();
  const handleAdd = () => {

    axios.post('http://localhost:3001/add', { task: task })
      .then(result => console.log(result))
      .catch(err => console.log(err))
    setTask("");
    props.getTodo();
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

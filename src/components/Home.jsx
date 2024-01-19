import { useEffect, useState } from 'react'
import AddTodo from './AddTodo';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { FaO } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import EditTodo from './EditTodo';





const Home = () => {

    const [todos, setTodos] = useState([]);


    const getTodo = () => {

        axios.get("http://localhost:3001/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))

    }

    useEffect(() => {
        getTodo();
    }, [])
    const handleEdit = (id) => {

        axios.put("http://localhost:3001/update/" + id)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        getTodo();
    }
    const handleDelete = (id) => {
        axios.delete("http://localhost:3001/delete/" + id)
            .then(result => console.log(result))
            .catch(error => console.log(error))
        getTodo();

    }

    const props = {
        getTodo: getTodo
    }

    return (
        <div className='main'>
            <h2>Todo List</h2>
            <AddTodo props={props} />

            {
                todos.length === 0 ?
                    <div><h3>No Records</h3></div>
                    : todos.map(todo => (
                        < div key={todo.id} className='todos'>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ? <CiCircleCheck /> : <FaO className='icon' />}

                            </div>
                           
                            <p className={todo.done ? 'line_through' : ''}>{todo.task}</p>
                            <span><AiFillDelete className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            <EditTodo task={todo} fun={getTodo} />
                        </div>
                    ))
            }

        </div>
    )
}

export default Home
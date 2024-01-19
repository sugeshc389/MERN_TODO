import React, { useRef } from 'react';
import Modal from 'react-modal';
import { FaRegEdit } from "react-icons/fa";
import './EditTodo.css'
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};



function EditTodo({ task, fun }) {


 
    const tskref = useRef()

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {

        subtitle.style.color = 'green';
    }

    function closeModal() {
        setIsOpen(false);
    }
    function handleEdit() {

        const editTodo = tskref.current.value
       
        const body = {
            task: task,
            editTodo: editTodo
        }



        axios.put("http://localhost:3001/edit/ ", body)
            .then(result => console.log(result))
            .catch(error => console.log(error))
        fun();
        closeModal()

    }
    function submitb(e) {
        e.preventDefault()
    }

    return (
        <div>

            <span onClick={openModal}><FaRegEdit /></span>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}

            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Todo</h2>
                <button className='closeBtn' onClick={closeModal}>close</button>

                <form onSubmit={submitb} >
                    <input defaultValue={task.task} ref={tskref} />
                    <button type='submit' onClick={() => handleEdit()} className='editBtn' >Update</button>

                </form>
            </Modal>
        </div>
    );
}


export default EditTodo;



import React, {useContext, useState} from "react";
import {Button, ProgressBar} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/Home.css';
import EditModal from "./EditModal";
import {useTodo} from "../hooks/ApiHooks";
import {MainContext} from "../context/MainContext";

type ListItemProps = {
    todo: Todo;
};

function ListItem({ todo }: ListItemProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const { deleteTodo } = useTodo();
    const {fetchTodos} = useContext(MainContext);

    const handleDelete = async () => {
        try {
            const todoResponse = await deleteTodo(todo.id);
            console.log("Todo deleted:", todoResponse);
            fetchTodos();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleShowEditModal = () => {
        setShowEditModal(true);
    };
    return (
        <ListGroup.Item className="list-item d-flex justify-content-between align-items-center border rounded-5">
            <div style={{ width: '150px' }}>
                <div className="text-start">{todo.title}</div>
            </div>
            <div style={{ width: '200px' }}>
                <ProgressBar now={todo.progress} label={`${todo.progress}%`} />
            </div>
            <div>
                <Button 
                    bsPrefix="btn-outline-green" 
                    className="me-3 rounded-4"
                    onClick={() => handleShowEditModal()}
                >Edit</Button>
                <Button 
                    bsPrefix="btn-outline-pink" 
                    className="rounded-4"
                    onClick={handleDelete}
                >Delete</Button>
            </div>
            {showEditModal && (
                <EditModal
                    todo={todo}
                    handleClose={() => setShowEditModal(false)}
                />
      )}
        </ListGroup.Item>
    );
}

export default ListItem;
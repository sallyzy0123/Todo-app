import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useContext, useState} from 'react';
import {useTodo} from '../hooks/ApiHooks';
import {MainContext} from '../context/MainContext';

export type TodoData = {
    title: string;
    progress: number;
}

type AddNewModalProps = {
    handleClose: () => void;
};

function AddNewModal ({ handleClose }: AddNewModalProps) {
    const [todo, setTodo] = useState('');
    const [progress, setProgress] = useState(0);
    const {addTodo} = useTodo();
    const {fetchTodos} = useContext(MainContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const todoData: TodoData = {
              title: todo,
                progress: progress,
            };

            const todoResponse = await addTodo(todoData);
            
            console.log("Todo added:", todoResponse);

            // for closing the modal
            handleClose();

            // for updating the todo list
            fetchTodos();

            return;
          } catch (error) {
            console.error("Login failed:", error);
          }
    };

    return (
        <Modal show={true} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add new todo!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicTodo">
                        <Form.Label>Todo</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter todo" 
                            value={todo} 
                            onChange={(e) => setTodo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProgress">
                        <Form.Label>Progress</Form.Label>
                        <Form.Range 
                            value={progress} 
                            onChange={(e) => setProgress(parseInt(e.target.value))} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default AddNewModal;
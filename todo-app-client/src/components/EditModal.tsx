import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTodo } from "../hooks/ApiHooks";
import { TodoData } from "./AddNewModal";
import {MainContext} from "../context/MainContext";

type EditModalProps = {
  todo: Todo;
  handleClose: () => void;
};

function EditModal({ todo, handleClose }: EditModalProps) {
  const [updatedTodo, setUpdatedTodo] = useState<TodoData>({
    title: "",
    progress: 0,
  });
  const { updateTodo } = useTodo();
  const {fetchTodos}= useContext(MainContext);

  useEffect(() => {
    // Set the initial value of updatedTodo when todo changes
    setUpdatedTodo({
      title: todo.title,
      progress: todo.progress,
    });
  }, [todo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const todoData: TodoData = {
        title: updatedTodo.title,
        progress: updatedTodo.progress,
      };
      const todoResponse = await updateTodo(todo.id, todoData);
      console.log("Todo updated:", todoResponse);

      // for closing the modal
      handleClose();

      // for updating the todo list
      fetchTodos();

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Title changed:", e.target.value);
    setUpdatedTodo({
      ...updatedTodo,
      title: e.target.value,
    });
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Progress changed:", e.target.value);
    setUpdatedTodo({
      ...updatedTodo,
      progress: parseInt(e.target.value),
    });
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTodo">
            <Form.Label>Todo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter todo"
              value={updatedTodo.title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicProgress">
            <Form.Label>Progress</Form.Label>
            <Form.Range
              value={updatedTodo.progress}
              onChange={handleProgressChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;

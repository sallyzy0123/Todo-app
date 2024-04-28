import Modal from "react-bootstrap/Modal";

type MyModalProps = {
  text: string; 
};


function MyModal({ text }: MyModalProps) {
  return (
    <>
      <Modal show={true}>
        <Modal.Body>
          {text}
          </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;

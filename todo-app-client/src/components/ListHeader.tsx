import {Button} from "react-bootstrap";
import '../css/Home.css';
import { MainContext } from "../context/MainContext";
import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import AddNewModal from "./AddNewModal";

function ListHeader () {
    const { setIsLoggedIn } = useContext(MainContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSignOut = async () => {
        console.log('logout');

        // clear the local storage 
        localStorage.clear();

        // set the login status to false and navigate to the login page
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div className="list-header d-flex justify-content-between py-3">
            <h1 className="font-bold">Todo List</h1>
            <div>
                <Button 
                    bsPrefix="btn-white" 
                    className="me-3" 
                    onClick={handleShowModal}
                >
                    Add new
                </Button>
                <Button bsPrefix="btn-pink" onClick={handleSignOut}>Sign Out</Button>
            </div>
            {showModal && <AddNewModal handleClose={handleCloseModal}/>}
        </div>
    );
}

export default ListHeader;
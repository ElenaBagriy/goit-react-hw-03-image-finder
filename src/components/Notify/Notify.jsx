import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";

const Notify = ( {type, message} ) => {
    toast[type](message);

        return <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        ></ToastContainer>
};

Notify.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
};

export default Notify;
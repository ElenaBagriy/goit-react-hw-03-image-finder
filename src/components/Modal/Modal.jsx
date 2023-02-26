import React, {Component} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onCloseModal);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onCloseModal);
    }

    onCloseModal = (e) => {
        if (e.code === 'Escape' || e.currentTarget === e.target) {
            this.props.onCloseModal();
        }
    }

    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.onCloseModal}>
                <div className={css.modal}>
                    {this.props.children}
                </div>
            </div>, modalRoot)
    }
};

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;

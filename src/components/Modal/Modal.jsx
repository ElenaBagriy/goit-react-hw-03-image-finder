import React, {Component} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root');
let count =0;

export default class Modal extends Component {

    componentDidMount() {
        console.log('componentDidMount');
    
        window.addEventListener('keydown', (e) =>{
            if (e.code === 'Escape') {
                count +=1; 
                console.log(`Количество вызовов коллбек при нажатии на Escape = ${count}`);

                this.props.onCloseModal();
        }
        });
    }

    // componentWillUnmount() {
    //     console.log('Modal componentWillUnmount');
    // }

    // componentDidUpdate() {
    //     console.log('update?');
    // }

    render() {
        return createPortal(
            <div className={css.overlay}>
                <div className={css.modal}>
                {this.props.children}
                </div>
            </div>, modalRoot)
    }

}

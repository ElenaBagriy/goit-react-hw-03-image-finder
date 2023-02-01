import React from "react";
import css from './Button.module.css'

const Button = () => (
    <div className={css.buttonWrapper}><button type="button" className={css.button}>Load more</button></div>
)

export default Button;
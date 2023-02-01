import React from "react";
import css from './Searchbar.module.css'

const Searchbar = () => {
    return (<header className={css.searchbar}>
            <form className={css.form}>
                <button type="submit" className={css.button}>
                    <span className={css.buttonLabel}>Search</span>
                </button>
                <input
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </form>
        </header>)
}

export default Searchbar;
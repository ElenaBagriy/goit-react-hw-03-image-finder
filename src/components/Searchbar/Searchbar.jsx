import React, {Component} from "react";
import css from './Searchbar.module.css'
import {ReactComponent as SearchIcon} from '../../icons/searchIcon.svg';
import PropTypes from "prop-types";

class Searchbar extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onNotify: PropTypes.func.isRequired,
    }

    state= {
        query: '',
    }

    onChange = (e) => {
        this.setState({query: e.currentTarget.value.toLowerCase()})
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.query.trim() === '') {
            return this.props.onNotify('error', 'Please, type something to find images');
        };
        this.props.onSubmit(this.state.query.trim());
        this.setState({query: ''});
    }

    render() {
        return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={this.onSubmit}>
                <button type="submit" className={css.button} aria-label="Search">
                    <SearchIcon width="25" height="25"/>
                </button>
                <label className={css.label}>
                    <input
                    className={css.input}
                    type="text"
                    name="query"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={this.state.query}
                    onChange={this.onChange}
                    />
                </label>
            </form>
        </header>
        )
    }
};

export default Searchbar;
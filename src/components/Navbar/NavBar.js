import {NavLink} from 'react-router-dom';
import './NavBar.css';

import { useDataLayerValue } from '../../util/DataLayer';

const NavBar = () => {

    const[, dispatch] = useDataLayerValue();

    const logout = (e) => {
        dispatch({
            type: 'SET_USER',
            user: null
        })

        dispatch({
            type: 'SET_TOKEN',
            token: null
        })

        dispatch({
            type: 'SET_EXPENSES',
            expenses: []
        })

        dispatch({
            type: 'SET_SAVINGS',
            savings: []
        })

        dispatch({
            type: 'SET_INCOME',
            income: []
        })

        dispatch({
            type: 'SET_TOTALBALANCE',
            totalBalance: 0
        })
    }

    return (
        <nav className="NavBarItems">
            <h1 className="navbar__logo">Finance Manager</h1>
            <ul className="nav__menu">
                <li className="navLink"><NavLink to="/">Home</NavLink></li>
                <li className="navLink"><NavLink to="/expenses">Expense</NavLink></li>
                <li className="navLink"><NavLink to="/income">Income</NavLink></li>
                <li className="navLink" onClick={logout}><NavLink to="/">Logout</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavBar

import './Expense.css';
import { useState, useEffect } from "react"
import { Container, Table } from 'reactstrap';
import {API} from '../../util/API';

import PropTypes from 'prop-types';
import { useDataLayerValue } from '../../util/DataLayer';

const Button = ({color, text, onClick}) => {
    return <button style={{backgroundColor: color}} className="btn__add" onClick={onClick}>{text}</button>
}

Button.defaultProps = {
    color: "steelblue"
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}


const Expense = ({user}) => {

    const initialValues = {
        amount: 0,
        date: '',
        description: ''
    }

    const [showAdd, setShowAdd] = useState(false);
    const [expense, setExpense] = useState(initialValues);
    const [expenseList, setExpenseList] = useState([]);
    const[ {expenses} , dispatch] = useDataLayerValue();

    const onAddToggle = () => {
        setShowAdd(!showAdd);
    }

    useEffect(() => {
        setExpenseList(expenses);
    }, [expenses])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value});
    }

    const postNewExpense = async (newExpense) => {
        const newData = await fetch(`${API}/expense/add/${user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({expense: newExpense})
        })
        .then(data => data.json())
        dispatch({
            type: 'SET_EXPENSES',
            expenses: newData.expenses
        })
        dispatch({
            type: 'SET_TOTALBALANCE',
            totalBalance: newData.totalBalance
        })
    }

    const addExpense = (e) => {
        e.preventDefault();
        let newExpense = {
            amount: expense.amount, 
            date: expense.date, 
            description: expense.description
        };
        postNewExpense(newExpense);
        onAddToggle();
    }

    let rows = expenseList.map(expense =>
        <tr key={expense.date}>
            <td>{expense.description}</td>
            <td>{expense.date}</td>
            <td>{expense.amount}</td>
        </tr>
        )

    return (
        <div className="expense">
            <div className="expense__top">
                <div className="expense__title">
                    Your monthly expenses.
                </div>
                <div className="expense_add">
                    <Button color={showAdd ? 'red' : '#2b8b30'} text={showAdd ? 'Cancel' : 'Add'} onClick={onAddToggle}>
                        Add
                    </Button>
                </div>
            </div>
            {
                showAdd && (
                    <div className="expense__addForm">
                        <form>
                            <div className="form__group">
                                <label>Amount</label>
                                <input type="text" placeholder="₹" name="amount" onChange={handleChange}/>
                            </div>
                            <div className="form__group">
                                <label>Date</label>
                                <input type="text" onChange={handleChange} name="date" placeholder="DD - MM - YY"/>
                            </div>
                            <div className="form__group">
                                <label>Description</label>
                                <input type="text" onChange={handleChange} name="description" placeholder="Groceries / Movie / Bills etc."/>
                            </div>
                            <div className="form__addBtn">
                                <button onClick={addExpense}>Add</button>
                            </div>
                        </form>
                    </div>
                )
            }

            <Container>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="50%">Description</th>
                                <th width="30%">Date</th>
                                <th width="20%">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
        </div>
    )
}

export default Expense

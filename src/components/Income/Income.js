import './Income.css';
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

const Income = ({user}) => {

    const initialValues = {
        amount: 0,
        date: '',
        description: ''
    }

    const [showAdd, setShowAdd] = useState(false);
    const [incomeNew, setIncomeNew] = useState(initialValues);
    const [incomeList, setIncomeList] = useState([]);
    const[ {income} , dispatch] = useDataLayerValue();

    const onAddToggle = () => {
        setShowAdd(!showAdd);
    }

    useEffect(() => {
        setIncomeList(income);
    }, [income])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncomeNew({...incomeNew, [name]: value});
    }

    const postNewIncome = async (newIncome) => {
        const newData = await fetch(`${API}/income/add/${user._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({income: newIncome})
        })
        .then(data => data.json())
        dispatch({
            type: 'SET_INCOME',
            income: newData.income
        })
        dispatch({
            type: 'SET_TOTALBALANCE',
            totalBalance: newData.totalBalance
        })
    }

    const addIncome= (e) => {
        e.preventDefault();
        let newIncome = {
            amount: incomeNew.amount, 
            date: incomeNew.date, 
            description: incomeNew.description
        };
        postNewIncome(newIncome);
        onAddToggle();
    }

    let rows = incomeList.map(inc =>
        <tr key={inc.date}>
            <td>{inc.description}</td>
            <td>{inc.date}</td>
            <td>{inc.amount}</td>
        </tr>
        )

    return (
        <div className="expense">
            <div className="expense__top">
                <div className="expense__title">
                    Your Income record.
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
                                <input type="text" onChange={handleChange} name="description" placeholder="Salart / Dividend Income etc."/>
                            </div>
                            <div className="form__addBtn">
                                <button onClick={addIncome}>Add</button>
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

export default Income

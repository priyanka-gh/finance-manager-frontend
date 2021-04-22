import './Login.css';
import {useState} from 'react'
import homeGrowthImage from '../../images/homeGrowthImage.png';
import { useDataLayerValue } from '../../util/DataLayer';
import {API} from '../../util/API';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [, dispatch] = useDataLayerValue();

    const loginUser = async (credentials) => {
        return await fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => {
            if(data.status !== 200) {
                alert('Invalid Credentials! Login Failed!');
                return null;
            }
            return data.json()
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email === undefined || password === undefined) {
            alert('Please enter username and password!');
            return;
        }

        const user = await loginUser({
            email: email,
            password: password
        });

        if(!user) {
            return;
        }

        dispatch({
            type: 'SET_TOKEN',
            token: user.token
        })

        dispatch({
            type: 'SET_USER',
            user: user.user
        })

        dispatch({
            type: 'SET_EXPENSES',
            expenses: user.user.expenses
        })

        dispatch({
            type: 'SET_INCOME',
            income: user.user.income
        })

        dispatch({
            type: 'SET_TOTALBALANCE',
            totalBalance: user.user.totalBalance
        })

    }

  return (
    <div className="login">
        <div className="login__left">
            <h1 className="login__title">Welcome to Finance Manager</h1>
            <div className="login__form">
                <div className="group">
                    <label htmlFor="user" className="label">Email</label>
                    <input id="user" type="text" className="input" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input id="pass" type="password" className="input" data-type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="group">
                    <input type="submit" className="button" value="Sign In" onClick={handleSubmit} />
                </div>
                <a href="/signup" className="createAccount">Not registered? Signup now</a>
                <div className="login__footer">
                    <p>Copyright© Priyanka Ghansela.</p>
                </div>
            </div>
        </div>
        <div className="login__right">
            <img src={homeGrowthImage} alt=""/>
        </div>
    </div>
  );
};

export default Login;

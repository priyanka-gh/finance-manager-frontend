import './Signup.css';
import {useState} from 'react'
import homeGrowthImage from '../../images/homeGrowthImage.png';
import {API} from '../../util/API';

const Signup = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const sigupUser = async (credentials) => {
        return await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => {
            data.json();
            window.location.pathname = '/';
        })
        .catch(err => alert('Unknown error occurred!'))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sigupUser({
            name: name,
            email: email,
            password: password
        });
    }

  return (
    <div className="login">
        <div className="login__left">
            <h1 className="login__title">Welcome to Finance Manager</h1>
            <div className="login__form">
                <div className="group">
                    <label htmlFor="user" className="label">Full Name</label>
                    <input id="user" type="text" className="input" onChange={e => setName(e.target.value)}/>
                </div>
                <div className="group">
                    <label htmlFor="email" className="label">Email</label>
                    <input id="email" type="text" className="input" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="group">
                    <label htmlFor="pass" className="label">Password</label>
                    <input id="pass" type="password" className="input" data-type="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="group">
                    <input type="submit" className="button" value="Sign Up" onClick={handleSubmit}/>
                </div>
                <a href="/" className="createAccount">Already have an account? Login here</a>
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

export default Signup;

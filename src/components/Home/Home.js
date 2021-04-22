import './Home.css';
import homeGrowthImage from '../../images/homeGrowthImage.png';
import {Link} from 'react-router-dom'
import { useDataLayerValue } from '../../util/DataLayer';

const Home = ({user}) => {

    const [{totalBalance}] = useDataLayerValue();

    return (
        <div className="home">
            <div className="home__left">
                <div className="home__welcomeMsg">
                    <div className="home__text1">Welcome</div>
                    <div className="home__text2">{user.name}</div>
                </div>
                <div className="home__financeData">
                    <div className="home__currentNetAssets financeData">
                        Your total net worth is: <span className="netAsset">₹ {totalBalance}</span>
                    </div>
                </div>
                <div className="home__checkSavings navButton">
                    <Link to="/income">
                        <h3>Track Income</h3>
                    </Link>
                </div>
                <div className="home__checkExpenses navButton">
                    <Link to="/expenses">
                        <h3>Track Expenses</h3>
                    </Link>
                </div>
            </div>
            <div className="home__right">
                <img src={homeGrowthImage} alt="groww"/>
            </div>
        </div>
    )
}

export default Home

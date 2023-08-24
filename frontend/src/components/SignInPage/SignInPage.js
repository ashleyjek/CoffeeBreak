import SignInForm from "./SignInForm"
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './SignInPage.css';
import '../SignUpForm/SignUpModal.css';

const SignInPage = ({currentUser}) => {
    const history = useHistory();
    const modal = useSelector(state => state.ui.modal);
    
    if (currentUser) {
        history.push("/");
    }
 
    return (
    <>
        <div className="signin-container">
            <div className="signin-page">
                <div className="logo-box">
                    {/* <h1>coffeebook</h1> */}
                    <img src="https://coffeebook-dev.s3.amazonaws.com/Screenshot+2023-08-23+at+11.11.04+PM.png"/>
                    <h2>Connect with coffee lovers around</h2>
                    <h2>the world on Coffeebook.</h2>
                </div>
                <SignInForm/>
            </div>
            <div className="footer">
                <p>
                    &copy; Miriam (Ashley) Kim 2023 |
                    <span onClick={() => window.open('https://www.linkedin.com/in/ashleyjek/')}> LinkedIn |</span>
                    <span onClick={() => window.open('https://github.com/ashleyjek')}> GitHub |</span>
                    <span onClick={() => window.open('https://github.com/ashleyjek/Coffeebook')}> Coffeebook Repo</span>
                </p>
            </div>
                <Modal modal={modal}/>
        </div>
    </>
    )
};

export default SignInPage;
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
                    <h1>coffeebook</h1>
                    <h2>Connect with coffee lovers around</h2>
                    <h2>the world on Coffeebook.</h2>
                </div>
                <SignInForm/>
            </div>
            <div className="footer">
                <p>
                    &copy; Miriam (Ashley) Kim 2023 |
                    <a href="https://www.linkedin.com/in/ashleyjek/"> LinkedIn</a> |
                    <a href="https://github.com/ashleyjek"> GitHub </a>|
                    <a href="https://github.com/ashleyjek/Coffeebook"> Coffeebook Repo</a>
                </p>
            </div>
                <Modal modal={modal}/>
        </div>
    </>
    )
};

export default SignInPage;
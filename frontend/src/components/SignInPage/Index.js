import StartUpLogo from "../Logo/Index";
import SignInForm from "./SignInForm"
import SignUpModal from "../SignUpModal/Index"
import './SignInPage.css';

const SignInPage = () => {
    return (
    <>
        <div className="signin-container">
            <div className="signin-page">
                <StartUpLogo/>
                <SignInForm/>
            </div>
        <SignUpModal/>
        </div>
    </>
    )
};

export default SignInPage;
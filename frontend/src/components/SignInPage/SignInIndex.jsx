import SignInForm from "./SignInForm";
import StartUpLogo from "../Logo/StartupLogo";

const SignInIndex = () => {

    return (
        <>
        <div className="signin-modal">
            <StartUpLogo/>
            <SignInForm/>
        </div>
        </>
    )
}

export default SignInIndex;
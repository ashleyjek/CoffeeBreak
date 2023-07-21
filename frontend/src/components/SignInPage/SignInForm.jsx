import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SignUpModal from '../SignUpModal/SignUpModal';
import { openModal } from "../../store/ui";


const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    // const openModal = () => {
    //     setShowModal(showModal => !showModal);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email: email, password: password}))
            .then(() => history.push("/"));
    }

    const handleDemoUser = () => {
        dispatch(login({email: "ashley@email.com", password: "password"}))
            .then(() => history.push("/"))
    }


    return (
        <>
            <div className="signin-container">
                <form className="signin-form">
                    <p className="signin-email-input"><input type="text" name={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></p>
                    <p className="signin-password-input"><input type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></p>
                </form>
                <button className="login-button" onClick={handleSubmit}>Log In</button>
                <button className="handle-demo-button" onClick={handleDemoUser}>Demo Login</button>
                <button className="create-acct-button" onClick={() => dispatch(openModal('sign-up'))}>Create new account</button>
            </div>
            {/* <SignUpModal showModal={showModal} setShowModal={setShowModal}/> */}
        </>
    )
};

export default SignInForm;
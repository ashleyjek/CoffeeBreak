import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { openModal } from "../../store/ui";

const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email: email, password: password}))
            // .then(() => 
        if (currentUser) {
            history.push("/");
        }

    }

    const handleDemoUser = () => {
        dispatch(login({email: "ashley@email.com", password: "password"}))
            .then(() => history.push("/"))
    }


    return (
        <>
            <div className="signin-form-container">
                <div className="signin-form-box">
                    <form className="signin-form">
                        <p className="signin-email-input"><input type="text" name={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></p>
                        <p className="signin-password-input"><input type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></p>
                    </form>
                    <button className="login-button" onClick={handleSubmit}>Log In</button>
                    <button className="handle-demo-button" onClick={handleDemoUser}>Demo Login</button>
                    <button className="create-acct-button" onClick={() => dispatch(openModal('sign-up'))}>Create new account</button>
                </div>
            </div>
        </>
    )
};

export default SignInForm;
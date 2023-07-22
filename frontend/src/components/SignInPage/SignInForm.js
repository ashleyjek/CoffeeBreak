import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { openModal } from "../../store/ui";

const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login({email: email, password: password}))
            history.push("/");
        }
        catch (err) { 
                setErrors(err.errors);
                setEmail("");
                setPassword("");
            };
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
                        <p className="login-error">{errors[0]}</p>
                        <p><input className="signin-email-input" type="text" name={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></p>
                        <p><input className="signin-password-input" type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></p>
                    </form>
                    <button className="login-button" onClick={handleSubmit}>Log In</button>
                    <button className="demo-login-button" onClick={handleDemoUser}>Demo Login</button>
                    <p className="divider">____________________________________________</p>
                    <button className="create-acct-button" onClick={() => dispatch(openModal('sign-up'))}>Create new account</button>
                </div>
            </div>
        </>
    )
};

export default SignInForm;
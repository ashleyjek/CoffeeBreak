import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { openModal } from "../../store/ui";
import { removeErrors } from "../../store/errors";

const SignInForm = () => {
    const errors = useSelector(state => state.errors);
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [inputClass, setInputClass] = useState("");

    useEffect(() => {
        if (errors[0]) {
            setInputClass("errors-input-container");
        } else {
            setInputClass("signin-input-container")
        }
    }, [errors[0]])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({
                email: email.toLowerCase(), 
                password: password
            })).then((resp) => {
                if (resp.ok) {
                    setEmail("");
                    setPassword("");
                    setInputClass("");
                    dispatch(removeErrors());
                    history.push("/");
                }
        })
    };
    
    const handleEnterKey = (e) =>{
        if (e.key === 'Enter'){
            handleSubmit(e)
        }
    };
    
    const handleDemoUser = () => {
        dispatch(login({
            email: "sebastianw@email.com", 
            password: "password"
        })).then(() => history.push("/"));
        dispatch(removeErrors());
    };
    
    return (
        <>
            <div className="signin-form-container">
                <div className="signin-form-box">
                    <form 
                        onKeyDown={handleEnterKey}
                        className="signin-form">
                        <p className={inputClass}>{errors[0]}
                            <input 
                                className="signin-input"
                                type="text" 
                                name={email} 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}/>                              
                                {errors[0] && <i className="fa-solid fa-triangle-exclamation"></i>}
                            <input 
                                className="signin-input"
                                type="password" 
                                name={password} 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}/>
                                {errors[0] && <i className="fa-solid fa-triangle-exclamation"></i>}
                        </p>
                    </form>
                    <button 
                        className="login-button" 
                        onClick={handleSubmit}>
                            Log In</button>
                    <button 
                        className="demo-login-button" 
                        onClick={handleDemoUser}>
                            Demo Login</button>
                    <p className="divider"></p>
                    <button 
                        className="create-acct-button" 
                        onClick={() => dispatch(openModal('sign-up'))}>
                            Create new account</button>
                </div>
            </div>
        </>
    )
};

export default SignInForm;
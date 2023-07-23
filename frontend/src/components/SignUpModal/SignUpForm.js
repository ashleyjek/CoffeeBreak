import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { closeModal } from "../../store/ui";

const SignInForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp({
            email: email, 
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            gender: gender
        }))
        // .then(() =>
        if (currentUser) {
            history.push("/");
        }
    }

    return (
        <>
            <div className="signup-container">
                <div className="form-header">
                    <h1 className="signup-header">Sign Up</h1>
                    <p className="close-button"><button onClick={() => dispatch(closeModal())} >x</button></p>
                </div>
                <div className="form-sub-header">
                    <h2 className="signup-desc">It's quick and easy.</h2>
                </div>
                    <form className="signup-form">
                        <label className="signup-input-name">
                            <input className="signup-input-f-name" type="text" name={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                            <input className="signup-input-l-name" type="text" name={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/></label>
                        <input className="signup-input-email" type="text" name={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input className="signup-input-password" type="password" name={password} placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
                        <div className="sign-up-input-bday">
                            <label>Birthday</label>
                        </div>
                    <p>Gender</p>
                        <input type="radio" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
                </form>
                <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
            </div>
        </>
    )
}

export default SignInForm;
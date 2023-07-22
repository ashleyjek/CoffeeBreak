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
            <button onClick={() => dispatch(closeModal())} >CLOSE MODAL</button>
            <div className="signup-container">
                <form className="signup-form">
                    <p className="signup-name">

                        <input type="text" name={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                        <input type="text" name={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                    </p>
                    <p className="signup-email-input"><input type="text" name={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></p>
                    <p className="signup-password-input"><input type="password" name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></p>
                    <p>Birthday</p>
                    <p>Gender</p>
                    <label></label>
                    <input type="radio" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
                </form>
                <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
            </div>
        </>
    )
}

export default SignInForm;
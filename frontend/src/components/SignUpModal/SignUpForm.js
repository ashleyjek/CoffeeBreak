import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { closeModal } from "../../store/ui";
import { removeErrors } from "../../store/errors";

const SignUpForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const todaysDate = new Date();
    const todaysMonth = todaysDate.getMonth();
    const todaysDay = todaysDate.getDate();
    const todaysYear = todaysDate.getFullYear();
    const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    let days = Array.from( { length: 31 }, (x, i) => i + 1 );
    const years = Array.from( { length: 100 }, (x, i) => todaysYear - i );
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [month, setMonth] = useState(todaysMonth);
    const [day, setDay] = useState(todaysDay);
    const [year, setYear] = useState(todaysMonth);
    const [gender, setGender] = useState("");
    const [fieldStatus, setFieldStatus] = useState(false);
    const errors = useSelector(state => state.errors);

    useEffect(() => {
        console.log("re-rendering")
    }, [errors])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp({
            email: email, 
            password: password,
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
            birthday: new Date(`${year}-${month}-${day}`),
            gender: gender
        })).then((resp) => {
            if (resp.ok) {
                dispatch(closeModal()); 
                dispatch(removeErrors());
                history.push("/");
            }

        })
    };

    return (
        <>
            <div className="signup-form-container">
                <div className="signup-form-header">
                    <h1 className="signup-header">Sign Up</h1>
                    <p className="signup-form-close-button">
                        <button onClick={() => dispatch(closeModal())} >x</button>
                    </p>
                </div>
                <div className="signup-form-sub-header">
                    <h2 className="signup-desc">It's quick and easy.</h2>
                </div>
                    <form className="signup-form">
                            {errors.first_name ? 
                            <p className="fname-error">
                                First name {errors.first_name[0]}
                            </p> : null}
                            {errors.last_name ? 
                            <p className="lname-error"> 
                                Last name {errors.last_name[0]}
                            </p> : null}
                        <label className="signup-input-name">
                            <input 
                                className="signup-input-f-name" 
                                type="text" 
                                name={firstName} 
                                placeholder="First Name" 
                                onChange={(e) => setFirstName(e.target.value)}/>
                            <input 
                                className="signup-input-l-name" 
                                type="text" 
                                name={lastName} 
                                placeholder="Last Name" 
                                onChange={(e) => setLastName(e.target.value)}/></label>
                            {errors.email ? 
                            <p className="email-error">Email {errors.email[0]}</p> : null}
                            <input 
                                className="signup-input-email" 
                                type="text" 
                                name={email} 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}/>
                            {errors.password ? 
                            <p className="password-error">Password {errors.password[0]}</p> : null}
                            <input 
                                className="signup-input-password" 
                                type="password" 
                                name={password} 
                                placeholder="New Password" 
                                onChange={(e) => setPassword(e.target.value)}/>
                        <label className="signup-label-bday">Birthday </label>
                        {errors.birthday ? 
                        <p className="birthday-error"> {errors.birthday[0]}</p> : null}
                        <div className="signup-input-bday">
                                <select 
                                    name="month" 
                                    defaultValue={todaysDate.toLocaleString('en-US', {month: 'short'})}
                                    onChange={(e) => setMonth(e.target.value)}>
                                    {Object.values(months).map((month) => <option key={month}>{month}</option>)}
                                </select>
                                <select n
                                    ame="day" 
                                    defaultValue={todaysDay} 
                                    onChange={(e) => setDay(e.target.value)}>
                                    {days.map((day) => <option key={day}>{day}</option>)}
                                </select>
                                <select 
                                    name="year" 
                                    onChange={(e) => {setYear(e.target.value)}}>
                                    {years.map((year) => <option key={year}>{year}</option>)}
                                </select>
                        </div>
                        <label className="signup-label-gender">Gender 
                        {errors.gender ? <p className="gender-error">Please choose a gender</p> : null}
                        
                        </label>

                        <div className="signup-input-gender">
                                <label>Female
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Female" 
                                        onClick={(e) => {
                                            setGender(e.target.value);
                                            setFieldStatus(false);
                                        }}/>
                                </label>
                                <label>Male
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Male"
                                        onClick={(e) => {
                                            setGender(e.target.value);
                                            setFieldStatus(false);
                                        }}/>
                                </label>
                                <label>Custom
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="Custom" 
                                        onClick={((e) => setFieldStatus(true))}/>
                                    </label>
                        </div>
                            {fieldStatus ? 
                            <>
                                <select 
                                    className="signup-form-custom-gender"
                                    name="gender"
                                    defaultValue="Select your pronoun">
                                        <option disabled={true}>Select your pronoun</option>
                                        <option>She: "Wish her a happy birthday!</option>
                                        <option>He: "Wish him a happy birthday!</option>
                                        <option>They: "Wish them a happy birthday!</option>
                                </select> <br></br>
                                <label className="custom-gender-label">Your pronoun is visible to everyone.</label>
                                <input 
                                    className="signup-gender-text-box" 
                                    type="text" 
                                    placeholder="Gender (optional)"
                                    onChange={((e) => setGender(e.target.value))}></input>
                            </> : null}
    
                    </form>
                    <button className="signup-button" onClick={handleSubmit} >Sign Up</button>
            </div>
        </>
    )
}

export default SignUpForm;
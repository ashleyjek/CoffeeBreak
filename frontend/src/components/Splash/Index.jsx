import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SplashPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    if (currentUser === null) {
        history.push('/login');        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logout()).then(() => history.push("/login"));
    }
    
    return (
        <button onClick={(handleSubmit)}>Log Out</button>
    )
}

export default SplashPage;
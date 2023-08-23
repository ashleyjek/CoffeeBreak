import Navigation from '../Navigation/Navigation';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const history = useHistory();

    return (
        <>
        <Navigation/>
        <div
            className="not-found-bg">
                <div className="not-found-container">
                    <img src="/brokenlink.png"/>
                    <div className="not-found-desc">
                        <h1>This Page Isn't Available</h1>
                        <p>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</p>
                    </div>
                    <button
                        onClick={() => history.push("/")} 
                        className="go-to-newsfeed">
                            Go to News Feed
                        </button>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage;
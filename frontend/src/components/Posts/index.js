
import './Posts.css';

const Posts = ({currentUser}) => {
    const allPosts = ['post1', 'post2']
    return (
        <>
            <div className="create-post-container">
                <a><img className="create-post-profile-icon"></img></a>
                <input 
                    className="create-post-input"
                    placeholder={`What's on your mind, ${currentUser.firstName}?`}/>
            </div>
            {allPosts.map((post) => 
            <div className="post-container">
                {/* post container */}
                <div className="post-header-container">
                    {/* * post-header-container */}
                    <div className="post-profile-icon"> 
                        ** post-profile-icon
                    </div>
                    <div className="post-details-container">
                        ** post-details-container
                        <div className="post-author">*** post-author</div>
                        <div className="post-date-time">*** post-date-time</div>
                    </div>
                    <div className="post-edit-button">** post-edit-button</div>
                    <div className="post-close-button">** post-close-button</div>
                </div>
                <div className="post-body-container">
                    * post-body-container
                    <div className="post-body-text">
                        ** post-body-text
                    </div>
                </div>
                <div className="post-photo-container">
                    * post-photo-container
                    <div className="post-photo-source">
                        ** post-photo-source
                    </div>
                </div>
                <div className="posts-cmts-ctr-container">
                    * posts-cmts-ctr-container
                    <div className="likes-count">
                        ** like-count
                    </div>
                    <div className="comments-count">
                        ** comments-count
                    </div>
                </div>
                <div className="post-reaction-container">
                    * post-reaction-container
                    <div className="like-button"/>
                        ** like-button
                    <div className="comment-button"/>
                        ** comment-button
                </div>
                <div className="comments-container">
                    COMMENTS COMPONENT
                </div>
            </div>)}
        </>
    )
}

export default Posts;
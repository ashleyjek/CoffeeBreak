import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateUserBio } from '../../store/users';
import { closeModal } from '../../store/ui';
import TextareaAutoSize from 'react-textarea-autosize';

const ProfileEditModal = ({currentUser}) => {
    const dispatch = useDispatch();
    const [bio, setBio] = useState("");
    const allUsers = useSelector(state => state.entities.users)

    useEffect(() => {
        if (allUsers[currentUser.id].bio) {
            setBio(allUsers[currentUser.id].bio)
        };
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserBio({
            id: currentUser.id,
            bio: bio
        })).then((resp) => {
            if (resp.ok) {
                setBio("");
                dispatch(closeModal());
            }
        });
    };

    return (
        <form className="edit-profile-form-container">
            <div className="edit-profile-form-header">
                <h1>Edit Bio</h1>
                <button><i class="fa-solid fa-circle-xmark"></i></button>
            </div>
            <div className="edit-profile-body-container">
                <TextareaAutoSize
                    minRows="4"
                    maxRows="10"
                    type="text"
                    placeholder={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="edit-bio-input"/>
            </div>
            <button 
                onClick={handleSubmit}
                className="edit-profile-submit">Save</button>
        </form>
    )
}

export default ProfileEditModal;
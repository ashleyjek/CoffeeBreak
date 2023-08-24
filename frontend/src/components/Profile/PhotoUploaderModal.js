import { useState, useEffect } from "react";
import { closeModal } from "../../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/users"

const PhotoUploaderModal = ({modal, user}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.entities.users[user.id])
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [formType, setFormType] = useState("profile");
    const [previewClassName, setPreviewClassName] = useState("avatar")

    useEffect(() => {
        if (modal === "update-cover") {
            setFormType("cover");
            setPhotoUrl(currentUser?.coverSrc);
            setPreviewClassName("cover")
        } else {
            setPhotoUrl(currentUser?.avatarSrc);
        }
    }, [modal])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPhoto = new FormData();
        newPhoto.append('user[id]', user.id);
        if (modal === "update-cover") {
            newPhoto.append('user[cover]', photoFile);
        } else {
            newPhoto.append('user[avatar]', photoFile);
        }
        dispatch(updateUser(newPhoto))
        setPhotoFile(null);
        dispatch(closeModal());
        setPhotoUrl(newPhoto);
    };

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => 
                setPhotoUrl(fileReader.result);
        } else {
            setPhotoUrl(null);
        }
    };

    let preview = null;
    if (photoUrl) {
        preview = <img className={previewClassName} src={photoUrl} alt=""/>;
    }

    return (
        <>
            <div className="profile-photo-selector-bg">
                <div className="close-pp-modal-button">
                    <button onClick={() => dispatch(closeModal())}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
                <div className="pp-modal-header">
                    Update {formType} photo
                </div>
                { preview && 
                    <div className="pp-preview-container">
                        {preview}
                    </div>
                }
                <div className="file-input-container">
                    <label id="file-input-label">
                            Upload photo
                    <input
                        onChange={handleFile} 
                        type="file" id="file-input" name="file-input" />
                    </label>
                </div>
                { preview && 
                <button
                    onClick={handleSubmit} 
                    className="pp-photo-save">Save</button>
                }
            </div>
            <div 
                className="post-upload-close-bg"
                onClick={() => dispatch(closeModal())}/>
        </>
    )
}

export default PhotoUploaderModal;
import { useRef, useEffect, useState } from 'react';

const OutsideAlerter = () => {
    const [clickedOutside, setClickedOutside] = useState(true);
    const ref = useRef();
    const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };
    
    const handleClickInside = () => setClickedOutside(false);
    
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });
    
    
    return { ref, handleClickInside, clickedOutside }

}

export default OutsideAlerter;

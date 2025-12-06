import { useEffect, useState } from 'react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        
        window.addEventListener('scroll', toggleVisibility);
        
        // return () => {
        //     window.removeEventListener('scroll', toggleVisibility);
        // };
        
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button 
                    onClick={scrollToTop} 
                    className="btn btn-primary back-to-top"
                    style={{ display: isVisible ? 'block' : 'none' }}
                >
                    <i className="fa fa-angle-double-up"></i>
                </button>
            )}
        </>
    );
}

import { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
    // update size state when window resize
    const [size, setSize] = useState([0, 0]);
    function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
    }
    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

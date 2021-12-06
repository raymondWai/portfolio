import { RefObject } from "react";

export const getDisplayType = (
    container: RefObject<HTMLDivElement>,
    element: RefObject<HTMLDivElement>
) => {
    if(container.current && element.current) {
        //if the container is smaller then the child, return block else flex
        if (container.current.clientHeight < element.current.clientHeight) {
            return 'block'
        }
    }
    return 'flex'
};

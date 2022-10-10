import React, {useState} from "react";
import {IoChevronDownOutline, IoChevronForwardOutline} from "react-icons/io5";

interface AccordionProps {
    header: React.ReactNode,
    children: React.ReactNode,
    isOpen?: boolean
}

const Accordion = ({ header, children, isOpen }: AccordionProps) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(isOpen);

    return (
        <div>
            <div className="shadow-md px-2 py-1 rounded-md flex items-center">
                <button onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
                    { !isAccordionOpen && <IoChevronForwardOutline /> }
                    { isAccordionOpen && <IoChevronDownOutline /> }
                </button>
                <div className="px-1">
                    {header}
                </div>
            </div>
            {
                isAccordionOpen &&
                <div className="shadow-sm px-3 py-2 rounded-b-md">
                    {children}
                </div>
            }
        </div>
    );
};

export default Accordion;

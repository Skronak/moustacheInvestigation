import React, {useState} from 'react';
import './tooltip.css';
import ModalWrapper from "../modal/ModalWrapper";

function TooltipCustom(props) {
    const [tooltip, showTooltip] = useState(false);

    return (
        <div>
            <div className={'tooltip'} onClick={()=> showTooltip(true)}>?
            {tooltip && (
                <ModalWrapper hideClose={props.hideClose} onclose={()=> showTooltip(false)}>
                    <span className={'tooltiptext'} >{props.text}</span>
                </ModalWrapper>)}
            </div>
        </div>
);
}

export default Tooltip;

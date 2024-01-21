import React from "react";
import "./modal.css"

export default function ModalWrapper(props) {

    return (
        <div className="modal-underlay" onClick={props.onClose}>
            <div className="modal active-modal">
                <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                    <div className="modal-header">
                        {props.title}
                        {!props.hideClose && (
                            <button className="close-modal" onClick={props.onClose}>X</button>
                        )}
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
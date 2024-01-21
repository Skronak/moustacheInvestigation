import React from "react";
import ModalWrapper from "../modal/ModalWrapper";

export default function PreviewModal(props) {

    return (
        <ModalWrapper title={props.case.key} onClose={()=> props.onClose(false)}>
            <div>
                {props.case.label}
            </div>
        </ModalWrapper>
    );
}
import React from 'react';

export default function Board(props) {

    return (
        <div className={'front'}>
            <div className="date-label">{props.data.date}</div>
            <div>{props.label}</div>
            {props.children}
        </div>
    );
}

import React from 'react';

const Filter = (props) => {


    let {onChangeParam, filter_field, val, description} = props
    return (
        <div className="selector" id={`selector-${props.filter_field}`}>
            <h4>{filter_field}</h4>
            <p>{description}</p>
            <div>
                Value:
                {/*
                <input
                    type="textbox"
                    className="number-input"
                    value={val}
                    onChange={(e) => onChangeParam(props.filter_field, e.target.value)}
                />
                */}
                <p>{val}</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => onChangeParam(props.filter_field, e.target.value)}
                />
            </div>
         </div>
    )
}

export default Filter

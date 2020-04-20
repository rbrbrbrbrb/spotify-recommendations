import React from 'react';

const Filter = (props) => {


    let {onChangeParam, filter_field, min, max, description} = props
    return (
        <div className="selector" id={`selector-${props.filter_field}`}>
            <h4>{filter_field}</h4>
            <p>{description}</p>
            <div>
                Minimum:
                <input
                    type="textbox"
                    className="number-input"
                    value={props.min}
                    onChange={(e) => onChangeParam(`min_${props.filter_field}`, e.target.value)}
                />
            </div>
            <div>
                Maximum:
                <input
                    type="textbox"
                    className="number-input"
                    value={props.max}
                    onChange={(e) => onChangeParam(`max_${props.filter_field}`, e.target.value)}
                />
            </div>
         </div>
    )
}

export default Filter

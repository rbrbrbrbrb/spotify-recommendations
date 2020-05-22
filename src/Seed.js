import React from 'react';

const Seed = (props) => {

    let {onChangeSeed, filter_field, val} = props

    return (
        <div className="selector">
            <p>
                {filter_field.split('_').join(' ')}
            </p>
            <input
                type="text"
                onChange={(e) => onChangeSeed(filter_field, e.target.value)}
                value={val}
            />
        </div>
    )
}

export default Seed
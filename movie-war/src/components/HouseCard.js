import React from 'react'

function HouseCard(props) {

    // console.log(props)
    return (
        <div>
            <img src={`https://img.omdbapi.com/?i=${props.id}&h=600&apikey=6a23e601`} alt='' />
            <h4>Title: {props.title}</h4>

        </div>
    )

}

export default HouseCard
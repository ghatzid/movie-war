import React from 'react'

class DeckBuilderContainer extends React.Component {

    state = { title: "", movie: [] }

    // findMovie = (searchTerm) => {
    //     fetch("http://localhost:3000/api/v1/cards")
    //         .then(resp => resp.json())
    //         .then(data => )
    // }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state.title)
        //put a function call here that takes the title and queries the database for it
        this.setState({ name: "" }) //returns state title to blank
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

        return (
            <div>
                <h1>Build your deck</h1>
                <div className="game-container">
                    Search for movie by title
                <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="title" value={this.state.title} name="title" onChange={this.changeHandler} />
                        <input type="submit" value="submit" />


                    </form>


                </div>
            </div>
        )
    }



}

export default DeckBuilderContainer
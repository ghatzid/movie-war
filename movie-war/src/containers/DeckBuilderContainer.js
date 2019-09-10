import React from "react";
import DeckContainer from "./DeckContainer";
import { Link } from "react-router-dom";

class DeckBuilderContainer extends React.Component {
  state = {
    title: "",
    potentialMovies: [],
    addedMovies: [],
    createDeckLink: ""
  };

  submitHandler = e => {
    e.preventDefault();
    this.setState({ title: "" });
    fetch(`http://localhost:3000/api/v1/cards/search/${this.state.title}`)
      .then(resp => resp.json())
      .then(searchResults =>
        this.setState({ potentialMovies: searchResults }, () =>
          console.log(this.state.potentialMovies)
        )
      );
  };

  addHandler = movie => {
    this.setState({
      addedMovies: [movie, ...this.state.addedMovies],
      potentialMovies: this.state.potentialMovies.filter(movie => !movie)
    });
    if (this.state.addedMovies.length === 9) {
      this.setState({ createDeckLink: "Create deck" });
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Build your deck</h1>
        <div className="game-container">
          Search for movie by title
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              placeholder="title"
              value={this.state.title}
              name="title"
              onChange={this.changeHandler}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
        <DeckContainer
          clickHandler={this.addHandler}
          deck={this.state.potentialMovies}
          header={"Search results"}
          subHeader={""}
        />
        <DeckContainer
          deck={this.state.addedMovies}
          header={"Your deck"}
          subHeader={this.state.addedMovies.length + "/10 movies"}
        />
        <Link
          className="submit-deck-button"
          onClick={() => this.props.newDeckHandler(this.state.addedMovies)}
          to={"/game"}
        >
          <h4>{this.state.createDeckLink}</h4>
        </Link>

        {/* <button onClick={() => this.props.newDeckHandler(this.state.addedMovies)}>Submit Deck</button> */}
      </div>
    );
  }
}

export default DeckBuilderContainer;

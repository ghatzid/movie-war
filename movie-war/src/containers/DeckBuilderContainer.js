import React from "react";
import DeckContainer from "./DeckContainer";
import { Link } from "react-router-dom";

const DeckBuilderContainer = (props) => {
//   state = {
//     title: "",
//     potentialMovies: [],
//     addedMovies: [],
//     createDeckLink: ""
//   };

  const [title, changeTitle] = useState("")
  const [potentialMovies, changePotentialMoves] = useState([])
  const [addedMovies, changeAddedMovies] = useState([])
  const [createDeckLink, changeCreateDeckLink] = useState("")

  submitHandler = e => {
    e.preventDefault();
    this.setState({ title: "" });
    fetch(`http://localhost:3000/api/v1/cards/search/${this.state.title}`)
      .then(resp => resp.json())
      .then(searchResults => this.setState({ potentialMovies: searchResults }));
  };

  addHandler = movie => {
    console.log('movie', movie)
    console.log('this.state.addedMovies:', this.state.addedMovies)
    if(!this.state.addedMovies.includes(movie)) { 
        this.setState({
        addedMovies: [movie, ...this.state.addedMovies],
        potentialMovies: this.state.potentialMovies.filter(movie => !movie)
        }, () => {});
    }
    else {
        alert("No duplicate movies")
    }
    if (this.state.addedMovies.length === 9) {
      this.setState({ createDeckLink: "Create deck" });
    }
  };

  duplicateCheck = array => {

  }

  removeHandler = movie => {
    console.log("doink");
    console.log(movie.title);
    let newArray = this.state.addedMovies.filter(
      obj => obj.title != movie.title
    );
    this.setState({ addedMovies: newArray });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

    return (
      <div>
        <h1>Build your deck</h1>
        <div className="form-container">
          <p>Search for movie by title </p>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="title"
              value={title}
              name="title"
              onChange={changeHandler}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
        <DeckContainer
          clickHandler={addHandler}
          deck={potentialMovies}
          header={"Search results"}
          subHeader={""}
        />
        <DeckContainer
          clickHandler={removeHandler}
          deck={addedMovies}
          header={"Your deck"}
          subHeader={this.state.addedMovies.length + "/10 movies"}
        />
        <Link
          className="submit-deck-button"
          onClick={() => this.props.newDeckHandler(addedMovies)}
          to={"/game"}
        >
          <h4>{createDeckLink}</h4>
        </Link>

        {/* <button onClick={() => this.props.newDeckHandler(this.state.addedMovies)}>Submit Deck</button> */}
      </div>
    );
}

export default DeckBuilderContainer;

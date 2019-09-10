import React from "react";
import DeckContainer from "./containers/DeckContainer";
import GameContainer from "./containers/GameContainer";
import DeckBuilderContainer from "./containers/DeckBuilderContainer";
import WelcomeContainer from "./containers/WelcomeContainer";

import { Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  state = {
    round: 1,
    comparatorHigher: true,
    playerDeck: [],
    AIDeck: [],
    playerCard: {},
    AICard: {}
  };

  componentDidMount() {
    this.newGame();
  }

  newGame = () => {
    console.log("starting new game");
    this.setState({ playerCard: {} });
    // if(this.state.playerDeck === []) {
    fetch("http://localhost:3000/api/v1/cards/random/10")
      .then(resp => resp.json())
      .then(data =>
        this.setState({ playerDeck: data }, () =>
          console.log("Player Deck:", this.state.playerDeck)
        )
      );
    // .then(data => this.setState({playerDeck: data.slice(0,10), AIDeck: data.slice(12,22), AICard: data[Math.floor(Math.random()*data.length)]}, () =>     console.log("Player Deck:", this.state.playerDeck.length, "AIDeck:", this.state.AIDeck.length)
    // }
    fetch("http://localhost:3000/api/v1/cards/random/10")
      .then(resp => resp.json())
      .then(data => this.setState({ AIDeck: data }, () => this.newRound()));
  };

  newRound = () => {
    console.log("starting new round");
    console.log("AI deck:", this.state.AIDeck);
    this.setState({
      comparatorHigher: !this.state.comparatorHigher,
      playerCard: {},
      AICard: this.state.AIDeck[
        Math.floor(Math.random() * this.state.AIDeck.length)
      ]
    });
  };

  checkWinCondition = () => {
    // console.log('checking win condition')
    // console.log("house deck cards:", this.state.AIDeck.length)
    console.log(
      "Player Deck:",
      this.state.playerDeck.length,
      "AIDeck:",
      this.state.AIDeck.length
    );
    if (this.state.playerDeck.length === 0) {
      alert("Player loses, starting new game");
      window.location.href = "/";
      // this.newGame()
    } else if (this.state.AIDeck.length === 0) {
      // this.newGame()
      window.location.href = "/";
      alert("House loses, starting new game");
    } else {
      this.newRound();
    }
  };

  comparatorHighVictory = (playerCard, AICard) =>{
    console.log('AI Rating:', AICard.rating)
    if(playerCard.rating - AICard.rating <= 1.0) {
      alert(`You win! It looks like ${playerCard.title} is a marginally better movie than ${AICard.title}`)
    }
    else if(playerCard.rating - AICard.rating > 1.0) {
      alert(`You win! It looks like ${playerCard.title} is a pretty good movie compared to ${AICard.title}`)
    }
    else if(playerCard.rating - AICard.rating > 2.0) {
      alert(`You win! It looks like ${playerCard.title} is a far superior movie compared to ${AICard.title}`)
    }
    else {
      console.log(playerCard.rating - AICard.rating)
      alert('You win!')
    }
  }
  comparatorHighDefeat = (playerCard, AICard) =>{
    console.log('AI Rating:', AICard.rating)
    if(AICard.rating - playerCard.rating <= 1.0) {
      alert(`You lose! Unfortuntately it seems ${playerCard.title} is just a little worse than ${AICard.title}`)
    }
    else if(AICard- playerCard.rating > 1.0) {
      alert(`You lose! Everyone seems to think ${playerCard.title} is a mess compared to ${AICard.title}`)
    }
    else if(AICard.rating - playerCard.rating > 2.0) {
      alert(`You lose! It looks like ${AICard.title} is a masterpiece compared to the dumpster fire that is ${playerCard.title}`)
    }
    else {
      console.log(playerCard.rating - AICard.rating)
      alert('You lose!')
    }
  }
  comparatorLowVictory = (playerCard, AICard) =>{
    console.log('AI Rating:', AICard.rating)
    if(AICard.rating - playerCard.rating <= 1.0) {
      alert(`You win! It looks like ${playerCard.title} is a marginally worse movie than ${AICard.title}.`)
    }
    else if(AICard.rating - playerCard.rating > 1.0) {
      alert(`You win! Consensus seems to be ${playerCard.title} loses out to ${AICard.title} every time.`)
    }
    else if(AICard.rating - playerCard.rating > 2.0) {
      alert(`You win! It looks like ${playerCard.title} is about as fun as huffing farts compared to ${AICard.title}.`)
    }
    else {
      console.log(AICard.rating - playerCard.rating)
      alert('You win!')
    }
  }
  comparatorLowDefeat = (playerCard, AICard) =>{
    console.log('AI Rating:', AICard.rating)
    if(playerCard.rating - AICard.rating <= 1.0) {
      alert(`You lose! It looks like ${playerCard.title} is, sadly, slightly better than ${AICard.title}`)
    }
    else if(playerCard.rating - AICard.rating > 1.0) {
      alert(`You lose! Regardless of how you feel, IMDb seems to think ${playerCard.title} is a little better than ${AICard.title}`)
    }
    else if(playerCard.rating - AICard.rating > 2.0) {
      alert(`You lose! It looks like ${playerCard.title} isn't the dumpster fire that ${AICard.title} is`)
    }
    else {
      console.log(playerCard.rating - AICard.rating)
      alert('You lose!')
    }
  }

  commitHandler = (playerCard = this.state.playerCard, AICard = this.state.AICard) => {
    //if comparator is set to higher, victory condition is to possess higher rating
    if (this.state.comparatorHigher === true) {
      if (playerCard.rating > AICard.rating) {
        let newArray = this.state.AIDeck.filter(movie => movie !== AICard)
        this.setState({AIDeck: newArray}, () => this.checkWinCondition())
      //   alert('player wins')
        this.comparatorHighVictory(playerCard, AICard)
      }
      else if (playerCard.rating < AICard.rating) {
        let newArray = this.state.playerDeck.filter(movie => movie.tconst !== playerCard.tconst)
        this.setState({playerDeck: newArray}, () => this.checkWinCondition())
        this.comparatorHighDefeat(playerCard, AICard)
      }
      else {
        alert('Oh my goodness its a tie!')
        this.checkWinCondition()
      }
    }
    //if comparator is set to lower, victory condition is to possess lower rating
    else if (this.state.comparatorHigher === false) {
      if (playerCard.rating < AICard.rating) {
        let newArray = this.state.AIDeck.filter(movie => movie.tconst !== AICard.tconst)
        this.setState({AIDeck: newArray}, () => this.checkWinCondition())
        // alert('player wins')
        this.comparatorLowVictory(playerCard, AICard)
      }
      else if (playerCard.rating > AICard.rating) {
        let newArray = this.state.playerDeck.filter(movie => movie.tconst !== playerCard.tconst)
        this.setState({playerDeck: newArray}, () => this.checkWinCondition())
        // alert('player loses')
        this.comparatorLowDefeat(playerCard, AICard)
    
      }
      else {
        alert('tie!')
        this.checkWinCondition()
      }
    }
  };

  slamHandler = movie => {
    this.setState({ playerCard: movie });
  };

  newDeckHandler = array => {
    if (array.length === 10) {
      this.setState(
        { playerDeck: array },
        console.log("player deck set to:", array)
      );
    } else {
      alert("not enough movies yet!");
    }
  };

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div className="app">
                <div>
                  <WelcomeContainer />
                </div>
              </div>
            );
          }}
        />
        <Route
          exact
          path="/game"
          render={() => {
            return (
              <div className="app">
                <div>
                  <GameContainer
                    clickHandler={this.commitHandler}
                    cards={this.state}
                    comparatorHigher={this.state.comparatorHigher}
                  />
                </div>
                <div>
                  <DeckContainer
                    clickHandler={this.slamHandler}
                    deck={this.state.playerDeck}
                    header="Your deck"
                    subHeader={""}
                  />
                </div>
              </div>
            );
          }}
        />
        <Route
          exact
          path="/deckbuilder"
          render={() => {
            return (
              <div className="app">
                <div>
                  <DeckBuilderContainer newDeckHandler={this.newDeckHandler} />
                </div>
              </div>
            );
          }}
        />
      </Router>
    );
  }
}

export default App;

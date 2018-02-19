import React, { Component } from 'react';
import './App.css';
import { Username } from './Username';
import { GameScreen } from './GameScreen';
import { KeyListenerFactory } from './KeyListenerFactory';
import { getScores, createUser, updateScores, getScoresRanked } from './services';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            bestScores: 0,
            scoresRanked: "",
            start: false,
            login: false,
            gameOver: 0,
            gameWidth: 800,
            gameHeight: document.documentElement.clientHeight,
            inputStyle: {
                top: document.documentElement.clientHeight/2,
                width: 120,
                height: 20,
                visibility: ""
            },
            keys: ""
        };    
    }
    //create KeyListener to monitor the keyboard event
    componentWillMount() {    
        const keysListener = KeyListenerFactory();
        document.addEventListener("keydown", keysListener.keydown.bind(keysListener));
        document.addEventListener("keyup", keysListener.keyup.bind(keysListener));
        this.setKeys(keysListener);
    }
    //retrieve data using service call to get the score of a specific user name
    retrieveData() {
        if (this.state.username && this.state.username !== "") 
        {
            getScores(this.state.username).then( (response) => {
                if (response.scores === -1) {
                    this.createData();
                }
                else{
                    this.setBestScores(response.scores);
                }  
            });
        }
    }
    //retrieve data using service call to get the three users whose scores are in top 3
    retrieveDataRanked() {
        getScoresRanked().then( (response) => {
            if(response.users === "false"){
                console.log("no data");
            }
            else{
                this.setScoresRanked(response.users);
            } 
        });
    }
    //create data using service call to create a user name with score into database
    createData(){
        createUser({name: this.state.username}).then( (response) => {
            console.log(response.success);
        });
    }
    //update data using service call to update the score for a specific user name
    updateData(){
        updateScores({
            name: this.state.username,
            scores: this.state.bestScores
        }).then( (response) => {
            console.log(response.success);
            this.retrieveDataRanked();
        });
    }
    //when user submitted the username, this method would update the game information state to provide the instructions
    setLogin() {
        if (this.state.username !== "" ) {
            this.setState({
                login: true,
                inputStyle: {
                    top: document.documentElement.clientHeight/2,
                    width: 120,
                    height: 20,
                    visibility: "hidden"
                }
            });
            this.retrieveData();
            this.retrieveDataRanked();
        }
    }
    //when the game was finished, this method would be update the best score and update the game information state to provide the instructions
    setGameOver(score, gameOverNumber){
        if (score > this.state.bestScores){
            this.setBestScores(score);
            this.updateData();
        }
        this.setState({
            start: false,
            gameOver: gameOverNumber
        }); 
    }
    //when the keyListener was initialized, the method would set the it to be the keys state that would be used by child components.
    setKeys(keysListener){
        this.setState({
            keys: keysListener
        });
    }
    //when the space bar was tapped, this method would update the game information state to start the game
    setGameStart(){
        this.setState({
            start: true,
            gameOver: 0
        });    
    }
    //update the best score state
    setBestScores(score){
        this.setState({bestScores: score});
    }
    //update the username state
    setUsername(event) {
        if (this.state.login === false) {
            this.setState({username: event.target.value});
        }   
    }
    //update the score ranked state
    setScoresRanked(scores) {
        this.setState({scoresRanked: scores});
    }
    //received the data from child components when the game statue was changed. Then processing it
    setGameStatus(data) {
        if(data.result === "login"){
            this.setLogin();
        }
        else if (data.result === "gameOver"){
            this.setGameOver(data.score, 1);
        }
        else if (data.result === "gameWin"){
            this.setGameOver(data.score, 2);
        }
        else if (data.result === "gameStart")
        {
            this.setGameStart();
        }
    }

    render() {
        return (
            <div id="container" width={ this.state.gameWidth } height={ this.state.gameHeight } >
                <GameScreen width={ this.state.gameWidth } height={ this.state.gameHeight } gameInfo={ this.state } onStateChange={ this.setGameStatus.bind(this) } />
                <Username style={ this.state.inputStyle } username={this.state.username} onInput={ this.setUsername.bind(this) } />
            </div>
        );
    }
}

export default App;
import React from 'react';
import { drawGame } from './Draw';
import { generateBricks, resetGame, destroyBrick } from './GameData';
import { move } from './KeyboardProcess';

export class GameScreen extends React.Component {
    //when the component was mounted, execute the setup method to initialize game content
    componentDidMount() {
        this.setup();
    }
    //initialize game content and start animation frame to draw the game content, then game started
    setup()
    {   
        this.gameContent = {
            ball: {},
            paddle1: {},
            bricks: [],
            brickWidth: this.props.gameInfo.gameWidth / 5 - 2.5,
            bricksColors: ["#0c905d", "#00c78e", "#33dbff", "#3375ff"],
            gameScore: 0
        }
        resetGame(this.props.gameInfo, this.gameContent);
        requestAnimationFrame(this.update.bind(this));
    }
    //carry out game and refresh the game content 
    update() {
        let res = move(this.props.gameInfo, this.gameContent);
        let data = {
            result: res,
            score: this.gameContent.gameScore
        }
        this.props.onStateChange(data);

        if (this.props.gameInfo.start === true){
            destroyBrick(this.gameContent);
        }
        else{
            resetGame(this.props.gameInfo, this.gameContent);
            generateBricks(this.props.gameInfo, this.gameContent);
        }
        drawGame(this.canvas.getContext('2d'), this.props.gameInfo, this.gameContent);
        
        requestAnimationFrame(this.update.bind(this));
    }
    
    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} ref={(canvas) => { this.canvas = canvas; }} />
        );
    }
}


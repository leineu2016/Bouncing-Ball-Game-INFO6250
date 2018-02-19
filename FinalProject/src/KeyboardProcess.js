//set the track of ball‘s movement, and check whether it hits boundary or paddle
const ballMoves = (gameInfo, gameContent) => {
    gameContent.ball.x += gameContent.ball.speedX;
    gameContent.ball.y += gameContent.ball.speedY;
    // check ball hit ceiling
    if (gameContent.ball.y - gameContent.ball.radius <= 0) {
        gameContent.ball.speedY = -gameContent.ball.speedY;
    }
    // check ball hit paddle and angle
    if ((gameContent.ball.y + gameContent.ball.radius >= gameContent.paddle1.y) && (gameContent.ball.x + gameContent.ball.radius >= gameContent.paddle1.x) && (gameContent.ball.x - gameContent.ball.radius <= gameContent.paddle1.x + gameContent.paddle1.w)) {
        gameContent.ball.speedY = -gameContent.ball.speedY;
        const deltaX = gameContent.ball.x - (gameContent.paddle1.x + gameContent.paddle1.w / 2);
        gameContent.ball.speedX = deltaX * 0.15;
    }
    // check ball hit wall left-right
    if ((gameContent.ball.x + gameContent.ball.radius >= gameInfo.gameWidth) || (gameContent.ball.x - gameContent.ball.radius <= 0)) {
        gameContent.ball.speedX = -gameContent.ball.speedX;
    }
    // check if lost
    if (gameContent.ball.y - gameContent.ball.radius > gameInfo.gameHeight) {
        return "gameOver";
    }
    // check if win
    if (gameContent.bricks.length < 1) {
        return "gameWin";
    }
};

//set the track of paddle's movement and check whether it hits boundary
const paddleMoves = (gameInfo, gameContent) => {
    // paddle movement
    if ((gameInfo.keys.isPressed(37)) && gameContent.paddle1.x > 0) {
        // LEFT
        gameContent.paddle1.x -= gameContent.paddle1.speed;
    } else if ((gameInfo.keys.isPressed(39)) && (gameContent.paddle1.x + gameContent.paddle1.w < gameInfo.gameWidth)) {
        // RIGHT
        gameContent.paddle1.x += gameContent.paddle1.speed;
    }
};

export const move = (gameInfo, gameContent) => {
    //paddle movement
    paddleMoves(gameInfo, gameContent);
     // submit user name on enter key
    if (gameInfo.keys.isPressed(13) && gameInfo.login === false) {
        return "login";
    }
    // start game on space bar
    if (gameInfo.keys.isPressed(32) && gameInfo.login === true && gameInfo.start === false) {
        gameContent.gameScore = 0;
        return "gameStart";
    }
    // ball movement
    if (gameInfo.start === true) {
        return ballMoves(gameInfo, gameContent);
    }
};

//calculate the parameters of the bricks and push all bricks to the game content
export const generateBricks = (gameInfo, gameContent) => {
    let brickX = 2;
    let brickY = 10;
    let colorIndex = 0;

    for (let i = 0; i < 20; i++) {
        const brick = {
            x: brickX,
            y: brickY,
            w: gameContent.brickWidth,
            h: 10,
            color: gameContent.bricksColors[colorIndex]
        };

        gameContent.bricks.push(brick);
        brickX += gameContent.brickWidth + 2;
        if (brickX + gameContent.brickWidth + 2 > gameInfo.gameWidth) {
            brickY += 12;
            brickX = 2;
            colorIndex++;
        }
    }
};
//checking collision between ball and brick
const checkCollision = (ball, brick) => {
    if (ball.y + ball.radius >= brick.y && ball.y - ball.radius <= brick.y + brick.h && ball.x + ball.radius >= brick.x && ball.x - ball.radius <= brick.x + brick.w) {
        return true;
    }
};
//when the ball hits a brick, the brick would be removed
export const destroyBrick = (gameContent) => {
    for (let i = 0; i < gameContent.bricks.length; i++) {
        if (checkCollision(gameContent.ball, gameContent.bricks[i])) {
            gameContent.ball.speedY = -gameContent.ball.speedY;
            gameContent.bricks.splice(i, 1);
            gameContent.gameScore += 1; 
        }
    }
};
//reset the parameters of the game content (bricks, ball and paddle)
export const resetGame = (gameInfo, gameContent) => {
    gameContent.bricks = [];
    gameContent.ball = {
        x: gameInfo.gameWidth / 2,
        y: gameInfo.gameHeight / 2 + 80,
        radius: 6,
        speedX: 0,
        speedY: 4
    };
    gameContent.paddle1 = {
        w: 100,
        h: 10,
        x: gameInfo.gameWidth / 2 - 100 / 2, // 100 is paddle.w
        y: gameInfo.gameHeight - 10,
        speed: 6
    };
};
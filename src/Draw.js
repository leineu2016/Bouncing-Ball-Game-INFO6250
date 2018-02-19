//draw gameOver content
const drawGameOver = (ctx, gameInfo, gameContent) => {
    ctx.fillText(`${gameInfo.username}, you lost!`, gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 - 130);
    ctx.fillText(`Your socre is ${gameContent.gameScore}, and your best socre is ${gameInfo.bestScores}`, gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 - 105);
    ctx.fillText("Keep trying!", gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 - 80);
};
//draw gameWin content
const drawGameWin = (ctx, gameInfo, gameContent) => {
    ctx.fillText(`${gameInfo.username}, YOU WON!`, gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 - 130);
    ctx.fillText(`Your current socre is ${gameContent.gameScore} !`, gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 - 105);
    ctx.fillText("Game will be accelerated!", gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 - 80);
};
//clear screen and draw background
const resetDrawCanvas = (ctx, gameInfo) => {
    ctx.clearRect(0, 0, gameInfo.gameWidth, gameInfo.gameHeight);
    ctx.fillStyle = "#fbe9d7";
    ctx.fillRect(0, 0, gameInfo.gameWidth, gameInfo.gameHeight);
    ctx.fillStyle = "#ffae3e";
};
//draw login content
const drawLogin = (ctx, gameInfo) => {
    ctx.textAlign = "center";
    ctx.font="20px Arial";
    ctx.fillText("Please enter your name: ", gameInfo.gameWidth / 2-115, gameInfo.gameHeight / 2+20);
    ctx.fillText("Then press enter to submit.", gameInfo.gameWidth / 2, gameInfo.gameHeight / 2+45);
};
//draw scores ranked content
const drawScoresRanked = (ctx, gameInfo) => {
    const yPos = -40;
    for (let i = 0; i < gameInfo.scoresRanked.length; i++) {
        let data = JSON.parse(gameInfo.scoresRanked[i]);
        let index = i + 1;
        ctx.fillText(`Rank ${index}. name: ${data.name}, socres: ${data.scores}`, gameInfo.gameWidth / 2, gameInfo.gameHeight / 2+yPos+i*25);
    }
};
//draw game instructions content after logigng in
const drawInstructions = (ctx, gameInfo, gameContent) => {
    if (gameInfo.start === false) {
        ctx.textAlign = "center";
        ctx.font="20px Arial";
        drawScoresRanked(ctx, gameInfo);
        ctx.fillText("Then press space bar to start a game.", gameInfo.gameWidth / 2, gameInfo.gameHeight / 2+45);
        ctx.fillText("Move with arrow keys.", gameInfo.gameWidth / 2, gameInfo.gameHeight / 2 + 70);
        if (gameInfo.gameOver === 1) {
            drawGameOver(ctx, gameInfo, gameContent);
        } else if (gameInfo.gameOver === 2) {
            drawGameWin(ctx, gameInfo, gameContent);
        }
    }
};
//draw game content such as bricks, ball and paddle
const drawGameContent = (ctx, gameContent) => {
    // paddle
    ctx.fillRect(gameContent.paddle1.x, gameContent.paddle1.y, gameContent.paddle1.w, gameContent.paddle1.h);
    
    // ball
    ctx.beginPath();
    ctx.arc(gameContent.ball.x, gameContent.ball.y, gameContent.ball.radius, 0, Math.PI * 2);
    ctx.fill();
    //bricks
    for (let i = 0; i < gameContent.bricks.length; i++) {
        ctx.fillStyle = gameContent.bricks[i].color;
        ctx.fillRect(gameContent.bricks[i].x, gameContent.bricks[i].y, gameContent.bricks[i].w, gameContent.bricks[i].h);
    }
};
//invoked by GameScreen component to draw the whole game content
export const drawGame = (ctx, gameInfo, gameContent) => {

    resetDrawCanvas(ctx, gameInfo);

    if (gameInfo.login === false) 
    {
        drawLogin(ctx, gameInfo);
    }
    else
    {
        drawInstructions(ctx, gameInfo, gameContent);
        drawGameContent(ctx, gameContent);   
    }
};


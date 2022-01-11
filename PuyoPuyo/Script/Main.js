
let game;

// 初期化
function setup()
{
    createCanvas(640,480);
    
    game = new Game();
}



// 描画
function draw()
{
    background(127);        //背景色

    game.Update();
    game.Renderer();
}
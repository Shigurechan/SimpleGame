
let game;   //基底ループ

//初期化
function setup()
{
      createCanvas(1000,800); //キャンバスサイズ
      frameRate(60);
      game = new Game();
}

//描画
function draw()
{
      background(0);        //背景色

      game.Update();
      game.Renderer();



}



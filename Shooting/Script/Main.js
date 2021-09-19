


const  game = new Game();   //基底ループ

//初期化
function setup()
{
      createCanvas(1000,800); //キャンバスサイズ
      frameRate(60);
}

//描画
function draw()
{
      background(127);        //背景色

      game.Update();
      game.Renderer();
}



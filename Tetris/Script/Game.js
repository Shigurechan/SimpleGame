const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 20;

const STAGE_OFFSET_WIDTH = 200;
const STAGE_OFFSET_HEIGHT = 150;

const CELL = 30;
const DONW_SPEED = 5;

const PLAYER_START_POSITION_X = 3;
const PLAYER_START_POSITION_Y = 0;

const LINE_DELETE_ANIMATION = 5;
const LINE_ANIMATION_SPEED = 20;

let keyRight = false;
let keyLeft = false;
let keyShift = false;

let holdLeft = false;
let holdRight = false;
let holdShift = false;

let animation = 0;      // アニメーション


const ColorCode = [
      [0,0,0],          //背景
      [255,255,255],    //壁

      [0,255,255],      //水色
      [255,255,0],      //黄色    
      [0,128,0],        //緑    
      [255,0,0],        //赤
      [0,0,166],        //ネイビー
      [255,166,0],      //オレンジ
      [128,0,128],      //紫      
];
//ブロック
const Block = 
[
            [
                  [1,1,1,1],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  [1,1,0,0],
                  [1,1,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  [0,1,1,0],
                  [1,1,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  [1,1,0,0],
                  [0,1,1,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  [1,0,0,0],
                  [1,1,1,1],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  [0,0,0,1],
                  [1,1,1,1],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  [0,1,0,0],
                  [1,1,1,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

];

class Effect
{
      constructor(line)
      {
            this.line = line;
            this.position = position;
      }


      Renderer()
      {

            fill(255,255,255);
      
            if(this.line.length == 1)
            {
                  textSize(CELL);
                  text("シングル",STAGE_OFFSET_WIDTH  + CELL ,STAGE_OFFSET_HEIGHT + this.position.y * CELL);
            }
            else if(this.line.length == 2)
            {
                  text("ダブル",STAGE_OFFSET_WIDTH + CELL ,STAGE_OFFSET_HEIGHT + this.position.y * CELL);
                  textSize(CELL * 2);
            }
            else if(this.line.length == 3)
            {
                  text("トリプル",STAGE_OFFSET_WIDTH  + CELL ,STAGE_OFFSET_HEIGHT + this.position.y * CELL);
                  textSize(CELL * 3);
            }
            else if(this.line.length == 4)
            {
                  text("テトリス",STAGE_OFFSET_WIDTH + CELL ,STAGE_OFFSET_HEIGHT + this.position.y * CELL);
                  textSize(CELL * 4);
            }
            


      }


}

// ################################################################
// # stage クラス
// ################################################################
class Stage
{
      constructor()
      {

            this.effect = [];                   //ライン削除エフェクト
            
            this.nowEffect = false;             //エフェクト中かどうか？
            this.deleteLine = false;            //削除するラインがあるかどうか？
            this.maskLine = false;              //点滅するライン
            this.isNext =  true;                //次のブロックを生成するかどうか？
            this.deleteAnimation = 0;           //削除ラインの点滅回数
            this.deleteNum = 0;                 //削除するラインの数

            //ステージ
            this.stage = 
            [
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,1],
                  [1,1,1,1,1,1,1,1,1,1]
            ]
      }

      // ################################ ラインを削除 ################################ 
      LineDelete(y)
      {
            let b = false;
            for(let x = 1; x < STAGE_WIDTH - 1; x++)
            {
                  if(this.stage[y][x] > 1)
                  {
                        b = true;
                  }
                  else
                  {
                        b = false;
                        break;
                  }
            }


            if(b == true)
            {
                  for(let x = 1; x < STAGE_WIDTH - 1; x++)
                  {
                        this.stage[y][x] = 0;
                  }
            }

            if(b == false)
            {
                  return false;
            }
            else
            {
                  return true;
            }

            
      }

      // ################################ ラインを詰める ################################ 
      LineShift()
      {
            for(let line = STAGE_HEIGHT - 1; line > 0; line--)
            {
                  if(this.LineDelete(line) == true)
                  {
                        console.log("ああああ");
                        for(let y = line; y > 0; y--)
                        {
                              for(let x = 1; x < STAGE_WIDTH - 1; x++)
                              {
                                    let t = this.stage[y - 1][x];

                                    this.stage[y][x] = t;
                                    this.stage[y - 1][x] = 0;
                              }      
                        }
                        
                        line = STAGE_HEIGHT - 1;
                  }
            }
      }     

      // ################################ Update ################################ 
      Update()
      {
            
      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            
            for(let y = 0; y < this.stage.length; y++)
            {
                  for(let x = 0; x < this.stage[y].length; x++)
                  {
                        fill(ColorCode[ this.stage[y][x] ][0],ColorCode[ this.stage[y][x] ][1],ColorCode[ this.stage[y][x] ][2]);
                        rect( STAGE_OFFSET_WIDTH + x * CELL,STAGE_OFFSET_HEIGHT + y * CELL,CELL,CELL);
                  }                        
            }

            if(this.maskLine == true)
            {
                  for(let y = 0; y < this.stage.length - 1; y++)
                  {
                        if(this.line[y] == true)
                        {
                              for(let x = 1; x < this.stage[y].length - 1; x++)
                              {
                                    fill(0,0,0);
                                    rect( STAGE_OFFSET_WIDTH + (x * CELL),STAGE_OFFSET_HEIGHT + (y * CELL),CELL,CELL);
                              }                              
                        }
                  }
            }
      }

      
}


// ################################ キーを押したとき ################################ 
function keyPressed()
{

      if( (keyCode === LEFT_ARROW) && (holdLeft == false) )
      {
            holdLeft = true;
            keyLeft = true;
      }
      else if( (keyCode === RIGHT_ARROW) && (holdRight == false) )
      {
            holdRight = true;
            keyRight = true;
      }
      else if( (keyCode === SHIFT) && (holdShift == false) )
      {
            holdShift = true;
            keyShift = true;
      }
      else{
            keyShift = false;
            keyRight = false;
            keyLeft = false;
      }
}

// ################################  キーを離したとき ################################ 
function keyReleased()
{
      keyRight = false;
      keyLeft = false;

      holdRight = false;
      holdLeft = false;

      holdShift = false;
      keyShift= false;
      
}

// ################################################################
// # Player クラス
// ################################################################
class Player
{
      constructor()
      {
            this.position = new Vector(3,0);
            this.put = true;
            
            this.blockNumber = 0;
            this.gameOver = false;
            this.block = [4];
            this.block[0] = [0,0,0,0];
            this.block[1] = [0,0,0,0];
            this.block[2] = [0,0,0,0];
            this.block[3] = [0,0,0,0];
            this.rotate = 0;
            
            this.KeyPrevLeft = false;
            this.KeyPrevShift = false;
            this.KeyPrevRight = false;
            this.isPut = false;
            this.isDown = false;

            this.Next();
      }



      // ################################  次のブロックを生成 ################################ 
      Next()                  
      {
            this.blockNumber = GetRandom(0,6);
            
            for(let y = 0; y < 4; y++)
            {
                  for(let x = 0; x < 4; x++)
                  {
                        this.block[y][x] = 0;
                  }
            }
               

            for(let y = 0; y < 4; y++)
            {
                  for(let x = 0; x < 4; x++)
                  {
                        if(Block[this.blockNumber][y][x] == 1)
                        {

                              this.block[y][x] = 1;
                        }
                  }
            }            
      }

      // ################################  キーボード入力 ################################ 
      KeyBoard()
      {
            if(!this.KeyPrevLeft && keyLeft)
            {
                  this.position.x--;
            }
            else if(!this.KeyPrevRight && keyRight)
            {
                  this.position.x++;
            }
            else if(!this.KeyPrevShift && keyShift)
            {

                  this.rotate += 1;
                  if(this.rotate > 3)
                  {
                        this.rotate = 0;
                  }

                  this.Rotate();
            }


            this.KeyPrevLeft = keyLeft;
            this.KeyPrevRight = keyRight;
            this.KeyPrevShift = keyShift;

      }

      // ################################ 回転 ################################ 
      Rotate()
      {
            for(let y = 0; y < 4; y++)
            {
                  for(let x = 0; x < 4; x++)
                  {
                        this.block[y][x] = 0;
                  }
            }


            for(let y = 0; y < 4; y++)
            {
                  for(let x = 0; x < 4; x++)
                  {
                        if(Block[this.blockNumber][y][x] != 0)
                        {

                              let xx = (cos(PI / 2 * this.rotate) * (x - 1.5)) + (-sin(PI / 2 * this.rotate) * (y - 1.5) );
                              let yy = (sin(PI / 2 * this.rotate) * (x - 1.5)) + (cos(PI / 2 * this.rotate) * (y - 1.5) );
                              this.block[Math.round(yy + 1.5)][Math.round((xx + 1.5))] = 1;
                        }
                  }
            }
            
            //this.position.x+= 2;
            //this.position.x+= 2;


      }

      // ################################ 更新 ################################ 
      Update()
      {            
            this.KeyBoard();
      }

      UpdateStage(stage)
      {     

      }
      

      // ################################ 当たり判定 ################################ 
      Collision(stage)
      {

            if( (this.gameOver == false)　&& (this.isPut == false) )
            {
                  //左右の壁判定            
                  if( (keyLeft == true) || (keyRight == true) )
                  {
                        for(let yy = 0; yy < 4; yy++)
                        {
                              for(let xx = 0; xx < 4; xx++)
                              {            
                                    if(Block[this.blockNumber][yy][xx] == 1) 
                                    {
                                          if( stage.stage[this.position.y + yy ][this.position.x + xx] > 0 )
                                          {                                          
                                                if(keyLeft == true)
                                                {
                                                      this.position.x++;
                                                }
                                                else if(keyRight == true)
                                                {
                                                      this.position.x--;
                                                }
                                          }
                                    }
                              }
                        }
                  }

                  //下との当たり判定
                  if(this.isPut == false)
                  {

                        if( (animation % DONW_SPEED) == 0 )
                        {
                              //this.position.y++;
                        }

                        for(let yy = 0; yy < 4; yy++)
                        {
                              for(let xx = 0; xx < 4; xx++)
                              {            
                                    if((Block[this.blockNumber][yy][xx] == 1) )
                                    {
                                          if( stage.stage[this.position.y + yy ][this.position.x + xx] > 0)
                                          {
                                                this.position.y--;
                                                this.isPut = true;
                                          }
                                    }
                              }
                        }
                  }
                  
                  //　ブロック配置
                  if( (this.isPut == true))
                  {
                        for(let yy = 0; yy < 4; yy++)
                        {
                              for(let xx = 0; xx < 4; xx++)
                              {            
                                    if(this.block[yy][xx] == 1)
                                    {                 
                                          stage.stage[this.position.y + yy ][this.position.x + xx] = this.blockNumber + 2;
                                    }                                    
                              }
                        }
                  }
            }


            

            
            //ブロックを置いた時
            if(this.isPut == true)
            {
                  this.isPut = false;
                  this.position.x = PLAYER_START_POSITION_X;
                  this.position.y = PLAYER_START_POSITION_Y;

                  stage.LineShift();
            }

      }





// ################################ レンダリング ################################ 
      Renderer()
      {
            //ブロック
            if(this.isPut == false)
            {
                  for(let y = 0; y < 4; y++)
                  {
                        for(let x = 0; x < 4; x++)
                        {
                              if(this.block[y][x] != 0)
                              {
                                    fill(ColorCode[ this.blockNumber　+ 2 ][0],ColorCode[ this.blockNumber + 2 ][1],ColorCode[ this.blockNumber + 2 ][2]);
                                    rect( (this.position.x * CELL) + STAGE_OFFSET_WIDTH + (x * CELL),(this.position.y * CELL) + STAGE_OFFSET_HEIGHT +(y * CELL),CELL,CELL);
                              }
                        }
                  }                  
            }

            //ゲームーオーバー
            if(this.gameOver == true)
            {
                  
                  fill(0,0,0);
                  rect( (CANVAS_WIDTH / 2　- 100),(CANVAS_HEIGHT / 2) - 75,textWidth("GAME OVER"),75);
                  fill(255,255,255);
                  textSize(50);
                  text("GAME OVER",(CANVAS_WIDTH / 2)　- 100,(CANVAS_HEIGHT / 2) - 25 );
                  
            }
                  
      }
}




class Game
{
      constructor()
      {
            this.stage = new Stage();
            this.player = new Player();
      }


      Update()
      {

            this.player.Update();
            this.stage.Update();

            this.player.Collision(this.stage);


            animation++;
            if(animation > 60)
            {
                  animation = 0;
            }

            

      }

      Renderer()
      {
            this.stage.Renderer();
            this.player.Renderer();


      }
}


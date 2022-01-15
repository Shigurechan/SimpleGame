"use strict"

const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 21;

const BLOCK_SIZE = 30;
const BLOCK_HEIGHT = 4;
const BLOCK_WIDTH = 4;

const STAGE_OFFSET_WIDTH = 5;
const STAGE_OFFSET_HEIGHT = 3;

const BLOCK_COLOR = 2;

const DONW_SPEED = 5;

const START_BLOCK_POSITION_X = 4;
const START_BLOCK_POSITION_Y = 0;

const BLICK_COUNT = 3;

const WALL = 1;
const NONE = 0;
const LINE = 10;

const colorCode = 
[
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
const blockPattern = 
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


// ################################################################
// # stage クラス
// ################################################################
class Stage
{
      constructor()
      {
            //ステージ
            this.stage = 
            [
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,0,0,0,0,0,0,0,0,0,0,1],
                  [1,1,1,1,1,1,1,1,1,1,1,1],

            ]
      }


      
      // ################################ ブロックを設定 ################################ 
      setBlock(block)
      {
            
      }



      // ################################ Update ################################ 
      Update()
      {
            
      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            for(let y = 0; y < STAGE_HEIGHT; y++)      
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)      
                  {
                  
                        fill(colorCode[this.stage[y][x]]);
                        rect( (STAGE_OFFSET_WIDTH + x) * BLOCK_SIZE, (STAGE_OFFSET_HEIGHT + y) * BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE);
                  
                  }                 
            }
      }

      
}

// ################################################################
// # 操作
// ################################################################
class Control
{

      // ################################ エフェクト ################################ 
      Effect()
      {
            if( (this.clearLine.length > 0) && (this.isEffect == true) )
            {

                  this.blinkInterval_Time += deltaTime;
                  if(this.blinkInterval_Time > this.blinkInterval)
                  {
                        this.isBlink = !this.isBlink;
                        this.blinkInterval_Time = 0;

                        this.blinkCount++;
                        if(this.blinkCount > BLICK_COUNT)
                        {
                              this.blinkCount = 0;
                              this.isEffect = false;
                              this.isNewBlock = true;
                              this.isBlink = false;
                              this.isShiftLine = true;
                              this.setReset();
                        }
                  }


            }
            else
            {
                  this.isPutBlock = false;
            }
      }

      // ################################ ライン 詰める ################################ 
      ShiftLine(stage)
      {
            if(this.isShiftLine == true)
            {
                  console.log("ShiftLine()");
                  let count = 0;
                  for(let y = 0; y < STAGE_HEIGHT; y++)
                  {
                        count = 0;
                        for(let x = 0; x < STAGE_WIDTH; x++)
                        {
                              if( (stage[y][x] != WALL) && (stage[y][x] != NONE) )
                              {
                                    count++;
                              }
                              else
                              {

                              }
                        }

                        if(count == LINE)
                        {
                              for(let x = 1; x < STAGE_WIDTH; x++)
                              {
                                    for(let yy = y; yy > 0; yy--)
                                    {
                                          stage[yy][x] = stage[yy - 1][x];

                                    }
                              }
                        }
                  }
                  this.isShiftLine = false;
            }

            
      }

      
      // ################################ ライン削除 取得 ################################ 
      ClearLine(stage)
      {
            if(this.isPutBlock == true && this.isCearLine == false )
            {
                  for(let y = 0; y < STAGE_HEIGHT; y++)
                  {
                        let count = 0;
                        let temp = new Array(0);
                        for(let x = 1; x < STAGE_WIDTH; x++)
                        {
                              if( (stage[y][x] != WALL) && (stage[y][x] != NONE) )
                              {
                                    temp.push(new Vector(x,y));
                                    count++;
                              }
                              else
                              {
                                    break;
                              }
                        }

                        if(count == LINE)
                        {
                              this.clearLine.push(y);
                        }
                        
                  }
                  

                  if(this.clearLine.length > 0)
                  {
      //                  console.log(this.clearLine.length);
                        this.isEffect = true;
                        this.isCearLine = true;

                  }
                  else
                  {
                        this.isPutBlock == false;
                        this.isNewBlock = true;
                  }


            }

            this.Effect();    //エフェクト
      }


      // ################################ コンストラクタ ################################ 
      constructor()
      {
            
            //現在のブロック
            this.nowBlock = 
            [
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0]
            ];

            this.blockNumber; 
            this.position;
            this.rightKey;
            this.leftkey;


            //落下
            this.down = 0;
            this.downTime = 80;    //落下速度
            this.isDwon == false;

            

            this.isPutBlock = false;      //ブロックを置くかどうか？
            this.isNewBlock = true;       //新しいブロックを出すかどうか？
            this.isCearLine = false;      //詰めるラインを算出
            this.isShiftLine = false;     //ラインを詰めるかどうか？


            //ライン削除
            this.clearLine = new Array(0);

            //エフェクト
            this.isEffect = false;
            this.isBlink = false;
            this.blinkInterval = 200;
            this.blinkInterval_Time = 0;
            this.blinkCount = 0;
            this.nowDeleteLine = false;

            this.rotate = 0;  //回転


            //長押し
            this.press = false;
            this.pressSpace = false;

            this.setReset();
      }

      // ################################ ブロック生成 ################################ 
      setReset()
      {
            if( (this.isNewBlock == true) && (this.isEffect == false) )
            {
                  this.clearLine.length = 0;
                  this.isCearLine = false;
                  this.isEffect = false;
                  this.isPutBlock = false;
                  this.position = new Vector(START_BLOCK_POSITION_X,START_BLOCK_POSITION_Y);
                  this.blockNumber = 3 - BLOCK_COLOR;
                  //this.blockNumber = Math.floor(random(2,7)) - BLOCK_COLOR;
                  

                  //ブロック クリア
                  for(let y = 0; y < BLOCK_HEIGHT; y++)
                  {
                        for(let x = 0; x < BLOCK_WIDTH; x++)
                        {
                              this.nowBlock[y][x] = 0;
                        }
                  }

                  //ブロック設定
                  for(let y = 0; y < BLOCK_HEIGHT; y++)
                  {
                        for(let x = 0; x < BLOCK_WIDTH; x++)
                        {
                              this.nowBlock[y][x] = blockPattern[this.blockNumber][y][x];
                        }
                  }
                  
                  this.isNewBlock = false;
            }

      }

      // ################################ 移動 ################################ 
      Move()
      {
            if (this.isPutBlock == false)
            {
                  if( keyIsDown(" ".charCodeAt(0)) && (this.pressSpace == false) )
                  {
      
                        this.rotate += 1.0;
                        if(this.rotate > 3.0)
                        {
                              this.rotate = 0.0;
                        }
                        
                        this.Rotate();

                        this.pressSpace = true;
                  }
                  else if(keyIsDown(" ".charCodeAt(0)) == false)
                  {
                        this.pressSpace = false;
                  }
      
                  //左右移動
                  if(keyIsDown(LEFT_ARROW) == true && (this.press == false && this.leftKey == false))
                  {
                        console.log("Left");                        

                        this.leftKey = true;
                        this.position.x += -1;
                        this.press = true;
                  }
                  else if(keyIsDown(RIGHT_ARROW) && (this.press == false && this.rightKey == false))
                  {
                        console.log("Right");                        

                        this.rightKey = true;

                        this.position.x += 1;
                        this.press = true;
                  }
      

                  if( (keyIsDown(LEFT_ARROW) == false) && (keyIsDown(RIGHT_ARROW) == false) )
                  {
                        this.rightKey = false;
                        this.leftKey = false;


                        this.press = false;
                  }
                  
            }
      }

      // ################################ ブロック　配置 ################################ 
      PutBlock(stage)
      {
            if(this.isPutBlock == true)
            {
                  for(let y = 0; y < BLOCK_HEIGHT; y++)
                  {
                        for(let x = 0; x < BLOCK_WIDTH; x++)
                        {
                              if(this.nowBlock[y][x] != NONE)
                              {
                                    stage[this.position.y + y][this.position.x + x] = this.blockNumber + BLOCK_COLOR;
                              }
                        }
                  }
            
                  //ブロック クリア
                  for(let y = 0; y < BLOCK_HEIGHT; y++)
                  {
                        for(let x = 0; x < BLOCK_WIDTH; x++)
                        {
                              this.nowBlock[y][x] = NONE;
                        }
                  }
            }
      }

      // ################################ 当たり判定 ################################ 
      Collision(stage)
      {      
            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {     
                        if( (this.nowBlock[y][x] != NONE) && (stage[this.position.y + y][this.position.x + x] != NONE) && (this.rightKey == true) )                                                     
                        {
                              this.rightKey = false;
                              this.position.x += -1;
                        }
                        else if( (this.nowBlock[y][x] != NONE) && (stage[this.position.y + y][this.position.x + x] != NONE) && (this.leftKey == true) )                                                     
                        {
                              this.leftKey = false;
                              this.position.x += +1;
                        }

                        if( (this.nowBlock[y][x] != NONE) && (stage[this.position.y + y][this.position.x + x] != NONE) )                                                     
                        {
                              if(this.isPutBlock == false)
                              {
                                    this.position.y += -1;
                                    this.isPutBlock = true;
                              }
                        }
                  }     
            }      
      }


      // ################################ 落下 ################################ 
      Down()
      {
            this.down += deltaTime;

            if(this.downTime < this.down )
            {
                  this.down = 0;

                 if(this.isPutBlock == false)
                 {
                        this.position.y += 1;
                        this.isDown = true;
                 }
            }
      }


      // ################################ 回転 ################################ 
      Rotate()
      {
            
            this.block_temp = 
            [
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ];

            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {
                        if(this.nowBlock[y][x] != NONE)
                        {

                              let xx = (cos(PI / 2 * this.rotate) * (x - 1.5)) + (-sin(PI / 2 * this.rotate) * (y - 1.5) );
                              let yy = (sin(PI / 2 * this.rotate) * (x - 1.5)) + ( cos(PI / 2 * this.rotate) * (y - 1.5) );
                              this.block_temp[Math.round(yy + 1.5)][Math.round((xx + 1.5))] = 1;
                        }
                  }
            }
            


  
      }

      // ################################ 更新 ################################ 
      Update()
      {     
            this.Down();
            this.Move();
            
            this.setReset();
      }





      // ################################ レンダリング ################################ 
      Renderer()
      {
            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {
                        if(blockPattern[this.blockNumber][y][x] != 0)
                        {
                              fill(colorCode[this.blockNumber + 2]);
                              rect( (this.position.x + x + STAGE_OFFSET_WIDTH) * BLOCK_SIZE,(this.position.y + y + STAGE_OFFSET_HEIGHT) * BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE );
                        }
                  }
            }

            if(this.isBlink == true)
            {
                  for(let i = 0; i < this.clearLine.length; i++)
                  {
                        fill(colorCode[NONE]); //背景    
                        rect( (STAGE_OFFSET_WIDTH + 1) * BLOCK_SIZE,(STAGE_OFFSET_HEIGHT + this.clearLine[i]) * BLOCK_SIZE,(STAGE_WIDTH - 2 ) * BLOCK_SIZE,BLOCK_SIZE);
                  }
            }
      }
}




class Game
{
      constructor()
      {
            this.stage = new Stage();
            this.control = new Control();
      }


      Update()
      {
            this.stage.Update();
            this.control.Update();
            this.control.Collision(this.stage.stage);
            this.control.PutBlock(this.stage.stage);
            this.control.ClearLine(this.stage.stage);
            this.control.ShiftLine(this.stage.stage);
            

      }

      Renderer()
      {
            this.stage.Renderer();
            this.control.Renderer();

            fill(0,255,0);
            rect( (1 + STAGE_OFFSET_WIDTH) * BLOCK_SIZE,(19 + STAGE_OFFSET_HEIGHT) * BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE );
            rect( (2 + STAGE_OFFSET_WIDTH) * BLOCK_SIZE,(20 + STAGE_OFFSET_HEIGHT) * BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE );


      }
}


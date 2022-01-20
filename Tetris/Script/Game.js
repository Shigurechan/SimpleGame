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

const DOWN_INTERVAL = 300;          //落下間隔
const PUT_INTERVAL = 1000;          //接地してから配置までの時間
const BLINKING_INTERVAL = 300;      //点滅時間

// MINO PATTERN
const MINO_I = 0;
const MINO_O = 1;
const MINO_S = 2;
const MINO_Z = 3;
const MINO_J = 4;
const MINO_L = 5;
const MINO_T = 6;


//エフェクト
const COLOR_WAVE_MIN = 0.004;   
const COLOR_WAVE_START = 80.0;
const WAVE_SPEED = PI / 50.0;

const FONT_SIZE = 30;


const wallKickTable_I = 
[
      [new Vector(-2,0),new Vector(1,0),new Vector(-2,1),new Vector(1,-2)],   // 0 -> 1
      [new Vector(-1,0),new Vector(2,0),new Vector(-1,-2),new Vector(2,1)],   // 1 -> 2
      [new Vector(2,0),new Vector(-1,0),new Vector(2,-1),new Vector(-1,2)],   // 2 -> 3
      [new Vector(1,0),new Vector(-2,0),new Vector(1,-2),new Vector(-2,-1)],  // 3 -> 0
];

const wallKickTable = 
[
      [new Vector(-1,0),new Vector(-1,-1),new Vector(0,2),new Vector(-1,2)],        // 0 -> 1
      [new Vector(1,0),new Vector(1,1),new Vector(0,-2),new Vector(1,-2)],         // 1 -> 2
      [new Vector(1,0),new Vector(1,-1),new Vector(0,2),new Vector(1,2)],           // 2 -> 3
      [new Vector(-1,0),new Vector(-1,1),new Vector(0,-2),new Vector(-1,-2)],       // 3 -> 0

];

const colorCode = 
[
      [0,0,0],          //背景
      [255,255,255],    //壁

      [0,255,255],      //水色
      [255,255,0],      //黄色    
      [0,128,0],        //緑    
      [255,0,0],        //赤
      [0,0,166],        //青
      [255,166,0],      //オレンジ
      [128,0,128],      //紫      
];

//ブロック
const blockPattern = 
[
            [
                  //I
                  [0,0,0,0],
                  [1,1,1,1],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  //O
                  [1,1,0,0],
                  [1,1,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  //S
                  [0,1,1,0],
                  [1,1,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [   
                  //Z
                  [1,1,0,0],
                  [0,1,1,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  //J
                  [1,0,0,0],
                  [1,1,1,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  //L
                  [0,0,1,0],
                  [1,1,1,0],
                  [0,0,0,0],
                  [0,0,0,0],
            ],

            [
                  //T
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
                  [1,1,1,1,1,1,1,1,1,1,1,1],
                  [1,1,1,1,1,1,1,1,1,1,1,1],
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
                        rect( (STAGE_OFFSET_WIDTH + x) * BLOCK_SIZE, (STAGE_OFFSET_HEIGHT + y) * BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE );
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

                  this.blink_Time += deltaTime;
                  if(this.blink_Time > BLINKING_INTERVAL)
                  {
                        this.isBlink = !this.isBlink;
                        this.blink_Time = 0;

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
            /* ########## 現在　ブロック ########## */
            this.nowBlock = 
            [
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0]
            ];

      
                   
            /* ########## 次の　ブロック ########## */
            this.nextBlock = 
            [
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0],
                  [0,0,0,0]
            ];

            /* ########## ブロック ########## */
            this.blockNumber;                                                       //現在のブロック
//            this.nextBlockNumber = Math.floor(random(2,7)) - BLOCK_COLOR;           //次のブロック
            this.nextBlockNumber = 3 - BLOCK_COLOR;           //次のブロック
            this.position;
            
            /* ########## 落下 ########## */
            this.down_Time = 0;
            this.downHit = false;
            this.put_Time = 0;

            /* ########## 削除ライン ########## */
            this.isPutBlock = false;      //ブロックを置くかどうか？
            this.isNewBlock = true;       //新しいブロックを出すかどうか？
            this.isCearLine = false;      //詰めるラインを算出するかどか？
            this.isShiftLine = false;     //ラインを詰めるかどうか？

            /* ########## 入力  ########## */
            this.isPushSpaceKey = false;
            this.isHoldSpaceKey = false;
            this.isPushRightKey = false;
            this.isHoldRightKey = false;
            this.isPushLeftKey = false;
            this.isHoldLeftKey = false;                        

            /* ########## エフェクト ########## */
            this.isEffect = false;
            this.isBlink = false;
            this.blink_Time = 0;
            this.blinkCount = 0;
            this.nowDeleteLine = false;
            this.clearLine = [];      //削除ライン
            this.colorWave = COLOR_WAVE_START;

            /* ########## 回転 ########## */
            this.rotate = 0;
            this.isRotate = false;

            this.setReset();  //ブロック生成
      }

      // ################################ ブロック生成 ################################ 
      setReset()
      {
            if( (this.isNewBlock == true) && (this.isEffect == false) )
            {
                  this.rotate = 0;
                  this.clearLine.length = 0;
                  this.isCearLine = false;
                  this.isEffect = false;
                  this.isPutBlock = false;
                  this.position = new Vector(START_BLOCK_POSITION_X,START_BLOCK_POSITION_Y);
                  this.blockNumber = this.nextBlockNumber;
                  //this.nextBlockNumber = Math.floor(random(2,7)) - BLOCK_COLOR;
                  this.nextBlockNumber = 3 - BLOCK_COLOR;


//                  this.blockNumber = Math.floor(random(2,7)) - BLOCK_COLOR;
                  


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
                  this.isPushSpaceKey = keyIsDown(" ".charCodeAt(0)); 
                  if( (this.isPushSpaceKey == true) && (this.isHoldSpaceKey == false))
                  {
                        //ミノがI,Oじゃない時
                        if( this.blockNumber != MINO_O )
                        {
                              this.rotate += 1;
                              
                              if(this.rotate > 3)
                              {
                                    this.rotate = 0;
                              }                       
                              
                              this.Rotate();    //回転
                        }
                        else
                        {
                              this.rotate = 0;
                        }

                        this.isRotate = true;                        
                        this.isHoldSpaceKey = true;
                  }
                  else if(this.isPushSpaceKey == false)
                  {
                        this.isHoldSpaceKey = false;
                  }


                  //左右移動
                  this.isPushLeftKey = keyIsDown(LEFT_ARROW);
                  this.isPushRightKey = keyIsDown(RIGHT_ARROW);

                  if( (this.isPushLeftKey == true) && (this.isHoldLeftKey == false) )
                  {
                        this.position.x += -1;
                        this.isHoldLeftKey = true;
                  }
                  else if( (this.isPushRightKey == true) && (this.isHoldRightKey == false) )
                  {
                        this.position.x += 1;
                        this.isHoldRightKey = true;

                  }
                  else if( (this.isPushLeftKey == false) && (this.isPushRightKey == false) )
                  {     
                        this.isHoldRightKey = false;
                        this.isHoldLeftKey = false;
                  }

                  
            }
      }

      // ################################ ブロック　配置 ################################ 
      PutBlock(stage)
      {
            if( this.isPutBlock == true )
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
      
      // ################################ 4 連続ライン 判定 ################################ 
      GetIsTetris()
      {
            if(this.clearLine.length != 0)
            {
                  let t = 0;
                  let result = 0;
                  let isFirst = true;
                  for(let i = 0; i< this.clearLine.length; i++)
                  {
                        if(isFirst == true)
                        {
                              result++;
                              t = this.clearLine[i];
                              isFirst = false;
                        }
                        else
                        {
                              t++;
                              if(t != this.clearLine[i] )
                              {
                                    return false;
                              }
                              else
                              {
                                    result++;

                                    if(result == 4)
                                    {
                                          return true;
                                    }
                              }
                        }
                  }            
            }

            console.assert(false,"GetIsTetris()");
      }


      
      // ################################ 3 連続ライン 判定 ################################ 
      GetIsTriple()
      {
            if(this.clearLine.length != 0)
            {
                  let t = 0;
                  let result = 0;
                  let isFirst = true;
                  for(let i = 0; i< this.clearLine.length; i++)
                  {
                        if(isFirst == true)
                        {
                              result++;
                              t = this.clearLine[i];
                              isFirst = false;
                        }
                        else
                        {
                              t++;
                              if(t != this.clearLine[i] )
                              {
                                    return false;
                              }
                              else
                              {
                                    result++;

                                    if ( result == 3 )
                                    {
                                          return true;
                                    }
                               
                              }
                        }
                  }            

                  return false;
            }

            console.assert(false,"GetIsTriple()");
      }

      
      // ################################ 2 連続ライン 判定 ################################ 
      GetIsDouble()
      {
            if(this.clearLine.length != 0)
            {
                  let t = 0;
                  let result = 0;
                  let isFirst = true;
                  for(let i = 0; i< this.clearLine.length; i++)
                  {
                        if(isFirst == true)
                        {
                              result++;
                              t = this.clearLine[i];
                              isFirst = false;
                        }
                        else
                        {
                              t++;
                              if(t != this.clearLine[i] )
                              {
                                    return false;
                              }
                              else
                              {
                                    result++;

                                    if ( result == 2 )
                                    {
                                          return true;
                                    }

                              }
                        }
                  }            
            }

            console.assert(false,"GetIsDouble()");
      }

      
      // ################################ 1 連続ライン 判定 ################################ 
      GetIsSingle()
      {
            if(this.clearLine.length != 0)
            {
                  let t = 0;
                  let result = 0;
                  let isFirst = true;
                  let flag =  false;
                  let single = 0;
                  for(let i = 0; i< this.clearLine.length; i++)
                  {
                        if(isFirst == true)
                        {
                              result++;
                              t = this.clearLine[i];
                              flag == true;
                        }
                        else
                        {
                              t++;
                              if(t != this.clearLine[i] )
                              {
                                    flag = false;
                              }
                              else
                              {
                                    if((isFirst != true) && (flag == false) )
                                    {
                                          single++;
                                    }

                                    flag = true;
                              }

                              isFirst = false;

                        }
                  }
                  
                  return single;
            }

            console.assert(false,"GetIsSingle()");
      }



      // ################################ sin波グラデーション ################################ 
      Sin_Wave()
      {       
            this.colorWave += WAVE_SPEED;            
            if(this.colorWave > ( PI - (COLOR_WAVE_MIN * COLOR_WAVE_START) ))
            {
                  this.colorWave = COLOR_WAVE_MIN * COLOR_WAVE_START;
            }
      }
      
      // ################################ 消したライン 文字列で表示 ################################ 
      Draw_LineString()
      {
            let string = [];
            if(this.clearLine.length != 0)
            {
                  let combo = 0;
                 

                  if(this.GetIsTetris == true)
                  {
                        combo++;
                        string.push("TETRIS");
                  }
                  else 
                  {

                        if(this.GetIsTriple() == true)
                        {
                              string.push("TRIPLE");

                              combo++;
                              if(this.GetIsSingle() == true)
                              {
                                    combo++;
                                    string.push("SINGLE");
                              }
                              
                        }
                        else if(this.GetIsDouble() == true)
                        {
                              combo++;
                              string.push("DOUBLE");

                              if(this.GetIsSingle() == true)
                              {
                                    combo++;
                                    string.push("SINGLE");
                              }
                        }
                        else
                        {
                              combo += this.GetIsSingle();

                              if ( combo == 1)
                              {
                                    string.push("SINGLE");
                              }
                              else if ( combo == 2)
                              {
                                    string.push("SINGLE");
                                    string.push("SINGLE");
                              }
                              

                              if(this.GetIsSingle() != 0)
                              {
                                    if(this.GetIsDouble() == true )
                                    {
                                          combo++;
                                          string.push("DOUBLE");

                                    }
                                    
                              }
                        }
                  }

            }
            

            if(this.clearLine.length != 0)
            {

                  this.Sin_Wave();
                  textSize(FONT_SIZE);
                  textFont("PressStart2P");      
                  fill(0,sin(this.colorWave) * 255,sin(this.colorWave) * 255);
                  for(let i = 0; i < string.length; i++)
                  {
                        text(string[i], (STAGE_OFFSET_WIDTH + ((STAGE_WIDTH - 2) / 2 - 2 ))  * BLOCK_SIZE, ((STAGE_OFFSET_HEIGHT + (STAGE_HEIGHT) + 1) + i) * BLOCK_SIZE,BLOCK_SIZE * 6,BLOCK_SIZE + 1);
                  }
            }
            
      }

      // ################################ 回転したときの当たり判定 ################################ 
      WallKick(stage)
      {
            this.flag = false;
            this.isFrist = true;

            this.r = 0;
            if(this.rotate == 0)
            {
                  this.r = 3;
            }
            else
            {
                  this.r = this.rotate - 1;
            }

            for(let i = -1; i < wallKickTable_I[this.r].length; i++)
            {                  
                  this.pos = new Vector(this.position.x,this.position.y);
                  if(this.isFrist == false)
                  {
                        if(this.blockNumber == MINO_I)
                        {        
                              this.pos.x += wallKickTable_I[this.r][i].x;
                              this.pos.y += wallKickTable_I[this.r][i].y;
                        }
                        else
                        {
                              this.pos.x += wallKickTable[this.r][i].x;
                              this.pos.y += wallKickTable[this.r][i].y;
                        }
                  }

                  this.isFrist = false;
                  this.flag = false;

                  for(let y = 0; y < BLOCK_HEIGHT; y++)
                  {
                        for(let x = 0; x < BLOCK_WIDTH; x++)
                        {
                              if( (stage[this.pos.y + y][this.pos.x + x] != NONE) && (this.nowBlock[y][x] != NONE) )
                              {
                                    this.flag = true;
                              }                             
                        }
                  }

                  if(this.flag == false)
                  {
                        this.position = new Vector(this.pos.x,this.pos.y);
                        return true;

                  }                  
            }            

            return false;
      }


      // ################################ 落下　当たり判定 ################################ 
      /*
            NOTE

            重なったかどうか？
      */
      DownCollision(stage)
      {
            //落下判定
            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {                  
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {
                        if( (this.nowBlock[y][x] != NONE))                                                     
                        {
                              if(this.isPutBlock == false && (stage[this.position.y + y][this.position.x + x] != NONE) )
                              {
                                    return true;
                              }
                        }
                  }
            }            
            return false;
      }

      
      NextDownCollision(stage)
      {
            //落下判定
            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {                  
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {
                        if( (this.nowBlock[y][x] != NONE))                                                     
                        {
                              if(this.isPutBlock == false && (stage[this.position.y + y + 1][this.position.x + x] != NONE) )
                              {
                                    return true;
                              }
                        }
                  }
            }            
            return false;
      }
      

      // ################################ 当たり判定 ################################ 
      Collision(stage)
      {     
            this.Down();
 

            //移動
            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {     
                        if( (this.nowBlock[y][x] != NONE) && (stage[this.position.y + y][this.position.x + x] != NONE) && (this.isPushRightKey == true) )                                                     
                        {
                              this.isPushRightKey = false;
                              this.position.x += -1;
                        }
                        else if( (this.nowBlock[y][x] != NONE) && (stage[this.position.y + y][this.position.x + x] != NONE) && (this.isPushLeftKey == true) )                                                     
                        {
                              this.isPushLeftKey = false;
                              this.position.x += +1;
                        }

                        if( this.isRotate == true )
                        {
                              if ( this.WallKick(stage) == false)
                              {

                                    this.rotate = this.rotate - 1;
                                    this.Rotate();
                              }

                              this.isRotate = false; 
                        }                        
                  }     
            }


            
            if(this.NextDownCollision(stage) == true)
            {
                  this.downHit = true;
                  this.put_Time += deltaTime;
            }
            else
            {
                  this.donwHit = false;
            }

            if ( this.DownCollision(stage) == true)
            {
                  this.position.y += -1;
            }
            
      
            if(this.put_Time > PUT_INTERVAL)
            {
                  if(this.downHit == true)
                  {
                        if(this.NextDownCollision(stage) == true)
                        {
                              this.downHit = false;
                              
                              this.put_Time = 0;
                              this.isPutBlock = true;
                        }
                  }
            }
            
      }      
      // ################################ 落下 ################################ 
      Down()
      {
            this.down_Time += deltaTime;
            if( this.down_Time  > DOWN_INTERVAL )
            {
                  this.down_Time = 0;
                  this.position.y += 1;

                  return true;
            }

            return false;            
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
                        if(blockPattern[this.blockNumber][y][x] != NONE)
                        {
                              if(this.blockNumber == MINO_I)     // I
                              {
                                    let xx = (cos(PI / 2 * this.rotate) * (x - 1.5)) + (-sin(PI / 2 * this.rotate) * (y - 1.5) );
                                    let yy = (sin(PI / 2 * this.rotate) * (x - 1.5)) + ( cos(PI / 2 * this.rotate) * (y - 1.5) );

                                    if(this.rotate == 3)
                                    {
                                          //this.block_temp[Math.round(yy + 1.5)][Math.round((xx + 1.5)) - 1] = 1; 
                                    }
                                    else if(this.rotate == 0)
                                    {
                                    }

                                    this.block_temp[Math.round(yy + 1.5)][Math.round((xx + 1.5))] = 1; 

                              }
                              else if (this.blockNumber == 1)     // O
                              {
                                    /*
                                    NOTE
                                          回転しない。
                                    */
                              }                              
                              else
                              {
                                    let xx = (cos(PI / 2 * this.rotate) * (x - 1)) + (-sin(PI / 2 * this.rotate) * (y - 1) );
                                    let yy = (sin(PI / 2 * this.rotate) * (x - 1)) + ( cos(PI / 2 * this.rotate) * (y - 1) );

                                    this.block_temp[Math.round(yy + 1)][Math.round((xx + 1))] = 1; 
                              }
                        }
                  }
            }

            /*
            console.log(this.block_temp[0][0] + " , " + this.block_temp[0][1]  + " , " + this.block_temp[0][2]  +" , " + this.block_temp[0][3]);
            console.log(this.block_temp[1][0] + " , " + this.block_temp[1][1]  + " , " + this.block_temp[1][2]  +" , " + this.block_temp[1][3]);
            console.log(this.block_temp[2][0] + " , " + this.block_temp[2][1]  + " , " + this.block_temp[2][2]  +" , " + this.block_temp[2][3]);
            console.log(this.block_temp[3][0] + " , " + this.block_temp[3][1]  + " , " + this.block_temp[3][2]  +" , " + this.block_temp[3][3]);
            console.log("");
            console.log("");
            console.log("");
            */

            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {
                        this.nowBlock[y][x] = NONE;
                  }
            }
            

            for(let y = 0; y < BLOCK_HEIGHT; y++)
            {
                  for(let x = 0; x < BLOCK_WIDTH; x++)
                  {
                        this.nowBlock[y][x] = this.block_temp[y][x];
                  }
            }
            


  
      }

      // ################################ 更新 ################################ 
      Update()
      {     
           
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
                        if(this.nowBlock[y][x] != NONE)
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




            this.Draw_LineString();
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
      }
}


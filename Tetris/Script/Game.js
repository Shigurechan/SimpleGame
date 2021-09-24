const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 20;
const STAGE_OFFSET_WIDTH = 200;
const STAGE_OFFSET_HEIGHT = 150;
const CELL = 30;
const DONW_SPEED = 3;
const PLAYER_START_POSITION_X = 3;
const PLAYER_START_POSITION_Y = 0;



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
const Block = [
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

class Stage
{
      constructor()
      {
      　    this.combo = [];              //コンボライン
            this.effect = [];             //ライン削除エフェクト
            this.animation = 0;           //アニメーション
            this.nowEffect = false;       //エフェクト中かどうか？
            this.deleteLine = false;      //削除するラインがあるかどうか？
            this.maskLine = false;        //点滅するライン


            //ステージ
            this.stage = [
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

// ################################ ライン削除 ################################ 
      DeleteLine()
      {

            //削除ラインを算出
            let line = [];
            for(let y = 0; y <= STAGE_HEIGHT - 2; y++)
            {
                  let b = false;
                  for(let x = 1; x <= STAGE_WIDTH - 2; x++)
                  {
                        if(this.stage[y][x] == 0)
                        {
                              b = false;
                              break;
                        }
                        else
                        {

                              b = true;
                        }                       
                  }     

                  if(b == true)
                  {
                        line.push(y);

                  }
            }

            //連続コンボラインを算出
            let comboLine = [];

            if(line.length > 0)
            {

                  line.sort(function(a,b)
                  {
                        return a.value - b.value;
                  });


                  let t = 0;                  
                  let isCombo = false;
                  let combo = [];   //コンボライン
                  for(let i = 0; i< line.length; i++)
                  {
                        if(isCombo == false)
                        {
                              combo.push(line[i]);
                              t += line[i] + 1;
                              isCombo = true;
                        }
                        else
                        {
                              if(t == line[i])
                              {
                                    combo.push(line[i]);
                                    t++;

                                    if(i == line.length -1)
                                    {
                                          comboLine.push(combo);
                                    }
                              }
                              else
                              {
                                    comboLine.push(combo);
                                    t = line[i] + 1;
                                    combo = [];
                                    combo.push(line[i]);
                              }
                        }
                  }





                  //エフェクトを設定
                  for(let i = 0; i < comboLine.length; i++)
                  {
                        this.effect.push(comboLine[i]);
                  }

                  if(comboLine.length > 0)
                  {
                        this.deleteLine = true;
                  }
                  else
                  {
                        this.deleteLine = false;
                        
                  }
            }
      }

      LineShift()
      {

      }


      Update()
      {
            this.DeleteLine();

            console.log(this.deleteLine);


            this.animation++;
            if(this.animation > 60)
            {
                  this.animation = 0;
            }

            if( (this.animation % 10 == 0) && (this.deleteLine == true) )
            {
                  this.maskLine = true;
            }
            else
            {
                  this.maskLine = false;
            }

      }


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
                  let t =  0;
                  for(let y = 0; y < STAGE_HEIGHT - 2; y++)
                  {
                        if(combo[t] == y)
                        {
                              for(let x = 1; x < STAGE_WIDTH - 1; x++)
                              {
                                    fill(0,0,0);
                                    rect( STAGE_OFFSET_WIDTH + x * CELL,STAGE_OFFSET_HEIGHT + y * CELL,CELL,CELL);
                              }
                              if(this.combo.length - 2  > t)
                              {
                                    t++;
                              }
                        }
                  }
            }
            
                  
                 
                  
            


      }

      
}

let keyRight = false;
let keyLeft = false;
let keyShift = false;

let holdLeft = false;
let holdRight = false;
let holdShift = false;

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

function keyReleased()
{
      keyRight = false;
      keyLeft = false;

      holdRight = false;
      holdLeft = false;

      holdShift = false;
      keyShift= false;
      
}

class Player
{
      constructor()
      {
            this.position = new Vector(3,0);
            this.put = true;
            this.animation = 0;
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




      Next()
      {
          //this.blockNumber = GetRandom(0,6);
           this.blockNumber = 1; //デバッグ用

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
 
                              console.log(Math.round(yy + 1.5) + " , " + Math.round((xx + 1.5)));
                              this.block[Math.round(yy + 1.5)][Math.round((xx + 1.5))] = 1;
                        }else
                        {

                        }
                  }
            }       
      }

// ################################ 更新 ################################ 
      Update()
      {

            
            this.KeyBoard();
      

            if((this.animation % DONW_SPEED) == 0)
            {
                  this.position.y++;
                  this.isDown = true;
            }else
            {
                  this.isDown = false;
            }

            if(this.animation > 60)
            {
                  this.animation = 0;
            }

            this.animation++;



            //console.log(this.position.x);
      }

      UpdateStage(stage)
      {

            for(let y = 0; y < STAGE_HEIGHT; y++)
            {
                  for(let x = 0; x < STAGE_HEIGHT; x++)
                  {

                        //stage.stage[this.position.y + y][this.position.x + x] = Block[][][];                        
                  }           


            }           


      }
      

      // ################################ 当たり判定 ################################ 
      Collision(stage)
      {

            if(this.gameOver == false)
            {
                  //壁判定            
                  if( (keyLeft == true) || (keyRight == true) )
                  {
                        for(let yy = 0; yy < 4; yy++)
                        {
                              for(let xx = 0; xx < 4; xx++)
                              {            
                                    if(Block[this.blockNumber][yy][xx] == 1) 
                                    {
                                          if( (stage.stage[this.position.y + yy ][this.position.x + xx] == 1) )
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

                  //下
                  if( this.isPut == false)
                  {
                        for(let yy = 0; yy < 4; yy++)
                        {
                              for(let xx = 0; xx < 4; xx++)
                              {            
                                    if((Block[this.blockNumber][yy][xx] == 1) )
                                    {
                                          if( (stage.stage[this.position.y + yy ][this.position.x + xx] == 1) || (stage.stage[this.position.y + yy ][this.position.x + xx] > 1))
                                          {
                                                this.position.y--;
                                                this.isPut = true;
                                          }
                                    }
                              }
                        }
                  }
                  
                  //　ブロック配置
                  if(this.isPut == true )
                  {
                        for(let yy = 0; yy < 4; yy++)
                        {
                              for(let xx = 0; xx < 4; xx++)
                              {            
                                    if(this.position. y >= 0)
                                    {
                                          if( (Block[this.blockNumber][yy][xx] == 1) )
                                          {                 
                                                stage.stage[this.position.y + yy ][this.position.x + xx] = this.blockNumber + 2;
                                          }
                                    }
                              }
                        }
                  }
            }


            //リセット
            if(this.isPut == true)
            {           
                  stage.DeleteLine();
                  this.isPut = false;
                  


                  
                  if(this.gameOver == false)
                  {
                        this.position.x = PLAYER_START_POSITION_X;                  
                        this.position.y = PLAYER_START_POSITION_Y;                  
                        this.Next();
                        this.isPut = false;
                  }
            }

      }




// ################################ レンダリング ################################ 
      Renderer()
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

            this.player.Collision(this.stage);
            this.stage.Update();
      }

      Renderer()
      {
            this.stage.Renderer();
            this.player.Renderer();


      }
}


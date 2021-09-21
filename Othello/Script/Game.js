let BlackOrWhite = {Black: 1,White : 2,None: 0,Put: 3,};  //色　



//ステージマスの数
const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 10;

//駒サイズ
const PIECE_WIDTH = 80;
const PIECE_HEIGHT = 80;


class Stage
{
      constructor()
      {
            //ステージ
            this.stage = 
            [
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,2,1,0,0,0,0],
                  [0,0,0,0,1,2,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
            ];
      }

      //ひっくり返す
      Reverse(pos)
      {
            if(stage[pos.y][pos.x] == BlackOrWhite.Black)
            {
                  stage[pos.y][pos.x] = BlackOrWhite.White;
            }
            else if (stage[pos.y][pos.x] == BlackOrWhite.White)
            {
                  stage[pos.y][pos.x] = BlackOrWhite.Black;
            }

      }


      

      //ひっくり返すか判定
      InversionJudgment()
      {
            for(let y = 0; y < STAGE_HEIGHT;  y++)            
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)
                  {
                        //黒に反転
                        if(this.stage[y][x] == BlackOrWhite.Black)
                        {
                              let array = [];
      
                              for(let yy = y - 1; yy >= 0; yy--)
                              {
                                    if(this.stage[yy][x] == BlackOrWhite.White)
                                    {
                                          array.push(new Vector(x,yy));            
                                    }
                                    else if(this.stage[yy][x] == BlackOrWhite.Black)
                                    {
                                          break;
                                    }
                                    else if(this.stage[yy][x] == BlackOrWhite.None)
                                    {
                                          array = [];
                                    }            
                              }
                              
                              //ひっくり返す
                              for(let i = 0; i < array.length; i++)
                              {
                                    this.stage[array[i].y][array[i].x] = BlackOrWhite.Black;                                    
                              }                              
                        }

                        //白に反転
                        else if (this.stage[y][x] == BlackOrWhite.White)
                        {
                              let array = [];
      
                              for(let yy = y - 1; yy >= 0; yy--)
                              {
                                    if(this.stage[yy][x] == BlackOrWhite.Black)
                                    {

                                          array.push(new Vector(x,yy));            
                                    }
                                    else if(this.stage[yy][x] == BlackOrWhite.White)
                                    {
                                          break;
                                    }
                                    else if(this.stage[yy][x] == BlackOrWhite.None)
                                    {
                                          array = [];
                                    }            
                              }
                              
                              //ひっくり返す
                              for(let i = 0; i < array.length; i++)
                              {
                                    console.log("ああああ");
                                    this.stage[array[i].y][array[i].x] = BlackOrWhite.White;                                    
                              }                              



                        }
                                    
                  }
            }

      }



      //設置
      Put(pos,bw)
      {     
            
            this.stage[pos.y][pos.x] = bw;
            this.InversionJudgment();
      }

      Update()
      {

      }

      //枠
      DrawFrame()
      {
            for(let i = 0; i < STAGE_HEIGHT; i++)
            {
                  line(0,i * PIECE_HEIGHT , (CANVAS_WIDTH - (CANVAS_WIDTH - (PIECE_WIDTH * STAGE_WIDTH))),i * PIECE_HEIGHT);        //X
                  line((i + 1) * PIECE_WIDTH,0,(i +1) * PIECE_HEIGHT, (CANVAS_HEIGHT - (CANVAS_HEIGHT - (PIECE_HEIGHT * STAGE_HEIGHT))));     //Y
            }

      }

      //ステージを描画
      DrawStage()
      {
            for(let y = 0; y < STAGE_HEIGHT;  y++)            
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)
                  {
                        if(this.stage[y][x] == BlackOrWhite.Black)
                        {
                              fill(color(0,0,0));
                              circle(x * PIECE_WIDTH + (PIECE_WIDTH / 2), y * PIECE_HEIGHT +  (PIECE_HEIGHT / 2),60);
                        }
                        else if (this.stage[y][x] == BlackOrWhite.White)
                        {
                              fill(color(255,255,255));
                              circle(x * PIECE_WIDTH + (PIECE_WIDTH / 2), y * PIECE_HEIGHT +  (PIECE_HEIGHT / 2),60);
                        }
                        else
                        {
                              console.log("その他");
                        }            
                  }
            }
      }


      Renderer()
      {
            this.DrawFrame();
            this.DrawStage();

           
      }


}

class Player
{
      constructor(t)
      {
            this.position = new Vector(0,0);    //座標
            this.bw = t;                        //白か黒か
            this.click = false;                 //クリックしたかどうか？
      }


      

      Mouse()
      {
           this.position.x = mouseX;
           this.position.y = mouseY;

            if(mouseIsPressed) 
            {
                  if (mouseButton == LEFT) 
                  {
                        this.click = true;
                  }
            }else
            {
                  this.click = false;
            }
      }

      Update()
      {
            this.Mouse();
      }


      StageCollision(stage)
      {

            const PIECE_COLLISION_RANGE = 40;
            const MOUSE_COLLISION_RANGE = 10;

            //デバッグ
            for(let y = 0; y < STAGE_HEIGHT;  y++)
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)
                  {
                        //fill(color(0,255,0));   
                        //circle((x * PIECE_WIDTH) + (PIECE_WIDTH / 2),(y * PIECE_HEIGHT) + (PIECE_HEIGHT / 2),PIECE_COLLISION_RANGE);
                  }
            }


//            fill(color(255,0,0));
//           circle(this.position.x,this.position.y,MOUSE_COLLISION_RANGE);


                  
            if(this.click == true)
            {
                  for(let y = 0; y < STAGE_HEIGHT;  y++)
                  {
                        for(let x = 0; x < STAGE_WIDTH; x++)
                        {
            
                              if(Collision.Circle(new Vector(x * PIECE_WIDTH + (PIECE_WIDTH / 2), y * PIECE_HEIGHT +  (PIECE_HEIGHT / 2)),PIECE_COLLISION_RANGE,this.position,MOUSE_COLLISION_RANGE) == true)
                              {
                                    stage.Put(new Vector(x,y),this.bw);
                              }
                        }

                  }
                  
            }
      }

}


class Game
{
      constructor()
      {
            this.stage = new Stage();
            this.player = new Player(BlackOrWhite.White);
      }

      Update()
      {
            this.player.Update();
            this.player.StageCollision(this.stage);
            
      }

      Renderer()
      {
            this.stage.Renderer();

      }
      


}

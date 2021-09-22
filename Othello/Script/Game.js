let BlackOrWhite = {Black: 1,White : 2,None: 0,Put: 3,};  //色　



//ステージマスの数
const STAGE_WIDTH = 10;
const STAGE_HEIGHT = 10;

//駒サイズ
const PIECE_WIDTH = 80;
const PIECE_HEIGHT = 80;

//当たり判定の大きさクリックとマス目
const PIECE_COLLISION_RANGE = 40;
const MOUSE_COLLISION_RANGE = 10;


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

      // ################################ 反転 ################################ 
      Reverse(piece,pos)
      {
            let put = false;
            let rev;
            if(piece == BlackOrWhite.White)
            {
                  rev = BlackOrWhite.Black;
            }
            else if(piece == BlackOrWhite.Black)
            {
                  rev = BlackOrWhite.White;
            }

            let array = [];
      
            for(let yy = pos.y - 1; yy >= 0; yy--)
            {
                  if(this.stage[yy][pos.x] == rev)
                  {
                        array.push(new Vector(pos.x,yy));            
                  }
                  else if(this.stage[yy][pos.x] == piece)
                  {
                        break;
                  }
                  else if(this.stage[yy][pos.x] == BlackOrWhite.None)
                  {
                        array = [];
                  }            　
            }
            
            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;
                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              

            array = [];
                     
            for(let yy = pos.y + 1; yy < STAGE_HEIGHT; yy++)
            {
                  if(this.stage[yy][pos.x] == rev)
                  {
                        array.push(new Vector(pos.x,yy));            
                  }
                  else if(this.stage[yy][pos.x] == piece)
                  {
                        put = true;
                        break;
                  }
                  else if(this.stage[yy][pos.x] == BlackOrWhite.None)
                  {
                        array = [];
                  }            　
            }
            
            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;

                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              

            array = [];
                                          
            for(let xx = pos.x + 1; xx <= STAGE_WIDTH; xx++)
            {
                  if(this.stage[pos.y][xx] == rev)
                  {
                        array.push(new Vector(xx,pos.y));            
                  }
                  else if(this.stage[pos.y][xx] == piece)
                  {
                        put = true;

                        break;
                  }
                  else if(this.stage[pos.y][xx] == BlackOrWhite.None)
                  {
                        array = [];
                  }            　
            }
            
            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;

                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              

            array = [];
                                          
            for(let xx = pos.x - 1; xx >= 0; xx--)
            {
                  if(this.stage[pos.y][xx] == rev)
                  {
                        array.push(new Vector(xx,pos.y));            
                  }
                  else if(this.stage[pos.y][xx] == piece)
                  {

                        break;
                  }
                  else if(this.stage[pos.y][xx] == BlackOrWhite.None)
                  {
                        array = [];
                  }            　
            }
            
            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;

                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              

            array = [];

            // ============================ 斜め
            
            let t = 0;
            
            let xx = STAGE_WIDTH - (STAGE_WIDTH - pos.x )
            let yy = STAGE_HEIGHT - (STAGE_HEIGHT - pos.y)
            if( (xx - 1) > (yy - 1) )
            {
                  t = yy - 1;
            }
            else
            {
                  t = xx - 1;
            }

            for(let i = 1; i < t; i++)
            {
                  if(this.stage[pos.y + i][pos.x + i] == rev)
                  {
                        array.push(new Vector(pos.x + i,pos.y + i));            
                  }
                  else if(this.stage[pos.y + i][pos.x + i] == piece)
                  {

                        break;
                  }
                  else if(this.stage[pos.y + i][pos.x + i] == BlackOrWhite.None)
                  {
                        array = [];
                  }
            }

            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;

                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              

            array = [];

            xx = (STAGE_WIDTH - pos.x)
            yy = (STAGE_HEIGHT - pos.y)

            if( (xx - 1) > (yy - 1) )
            {
                  t = yy - 1;
            }
            else
            {
                  t = xx - 1;
            }

            for(let i = 1; i < t; i++ )
            {
                  if(this.stage[pos.y + i][pos.x - i] == rev)
                  {
                        array.push(new Vector(pos.x - i,pos.y + i));            
                  }
                  else if(this.stage[pos.y + i][pos.x - i] == piece)
                  {
                        break;
                  }
                  else if(this.stage[pos.y + i][pos.x - i] == BlackOrWhite.None)
                  {
                        array = [];
                  }
            }


            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;

                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              
            array = [];


            
            xx = STAGE_WIDTH - (STAGE_WIDTH - pos.x )
            yy = STAGE_HEIGHT - (STAGE_HEIGHT - pos.y)
            if( (xx - 1) > (yy - 1) )
            {
                  t = yy - 1;
            }
            else
            {
                  t = xx - 1;
            }
            
            for(let i = 1; i < t; i++ )
            {
                  if(this.stage[pos.y - i][pos.x - i] == rev)
                  {
                        array.push(new Vector(pos.x - i,pos.y + i));            
                  }
                  else if(this.stage[pos.y - i][pos.x - i] == piece)
                  {
                        break;
                  }
                  else if(this.stage[pos.y - i][pos.x - i] == BlackOrWhite.None)
                  {
                        array = [];
                  }
            }


            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;

                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                             

            array = [];



            xx = STAGE_WIDTH - (STAGE_WIDTH - pos.x )
            yy = STAGE_HEIGHT - (STAGE_HEIGHT - pos.y)
            if( (xx - 1) > (yy - 1) )
            {
                  t = yy - 1;
            }
            else
            {
                  t = xx - 1;
            }
            
            for(let i = 1; i < t; i++ )
            {
                  if(this.stage[pos.y - i][pos.x + i] == rev)
                  {
                        array.push(new Vector(pos.x + i,pos.y + i));            
                  }
                  else if(this.stage[pos.y - i][pos.x + i] == piece)
                  {
                        break;
                  }
                  else if(this.stage[pos.y - i][pos.x + i] == BlackOrWhite.None)
                  {
                        array = [];
                  }
            }


            //ひっくり返す
            for(let i = 0; i < array.length; i++)
            {
                  put = true;
                  this.stage[array[i].y][array[i].x] = piece;                                    
            }                              

      }


      // ################################ 置ける場所 ################################ 
      PutPiecePosition(piece,pos)
      {
            
            let rev;
            let putOK = 0;
            if(piece == BlackOrWhite.White)
            {
                  rev = BlackOrWhite.Black;
            }
            else if(piece == BlackOrWhite.Black)
            {
                  rev = BlackOrWhite.White;
            }
            
            if(this.stage[pos.y][pos.x] == BlackOrWhite.None)
            {
                  for(let yy = pos.y - 1; yy >= 0; yy--)
                  {
                        if(this.stage[yy][pos.x] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[yy][pos.x] == piece)
                        {
                              break;
                        }
                        else if(this.stage[yy][pos.x] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;
                        }            　
                  }


                  if(putOK > 0)
                  {
                        return true;
                  }

                  
                  for(let yy = pos.y + 1; yy < STAGE_HEIGHT; yy++)
                  {
                        if(this.stage[yy][pos.x] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[yy][pos.x] == piece)
                        {
                              break;
                        }
                        else if(this.stage[yy][pos.x] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;
                        }            　
                  }
                              

                  if(putOK > 0)
                  {
                        return true;
                  }


                  for(let xx = pos.x + 1; xx < STAGE_WIDTH; xx++)
                  {
                        if(this.stage[pos.y][xx] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[pos.y][xx] == piece)
                        {
                              break;
                        }
                        else if(this.stage[pos.y][xx] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;
                        }            　
                  }
                  

                  if(putOK > 0)
                  {
                        return true;
                  }

                                                
                  for(let xx = pos.x - 1; xx >= 0; xx--)
                  {
                        if(this.stage[pos.y][xx] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[pos.y][xx] == piece)
                        {
                              break;
                        }
                        else if(this.stage[pos.y][xx] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;
                        }            　
                  }


                  if(putOK > 0)
                  {
                        return true;
                  }


                  // ============================ 斜め  ============================ 
                  
                  let t = 0;
                  putOK = 0;
                  let xx = (STAGE_WIDTH - pos.x)
                  let yy = (STAGE_HEIGHT - pos.y)
                  if( (xx - 1) > (yy - 1) )
                  {
                        t = yy - 1;
                  }
                  else
                  {
                        t = xx - 1;
                  }
                  for(let i = 1; i < t; i++)
                  {
                        if(this.stage[pos.y + i][pos.x + i] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[pos.y + i][pos.x + i] == piece)
                        {
                              break;
                        }
                        else if(this.stage[pos.y + i][pos.x + i] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;

                        }
                  }


                  if(putOK > 0)
                  {
                        return true;
                  }


                  xx = STAGE_WIDTH - (STAGE_WIDTH - pos.x);
                  yy = (STAGE_HEIGHT - pos.y);

                  if( (xx - 1) > (yy - 1) )
                  {
                        t = yy - 1;
                  }
                  else
                  {
                        t = xx - 1;
                  }

                  for(let i = 1; i < t; i++ )
                  {
                        if(this.stage[pos.y + i][pos.x - i] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[pos.y + i][pos.x - i] == piece)
                        {
                              break;
                        }
                        else if(this.stage[pos.y + i][pos.x - i] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;

                        }
                  }


                  if(putOK > 0)
                  {
                        return true;
                  }


                  xx = STAGE_WIDTH - (STAGE_WIDTH - pos.x )
                  yy = STAGE_HEIGHT - (STAGE_HEIGHT - pos.y)
                  if( (xx - 1) > (yy - 1) )
                  {
                        t = yy - 1;
                  }
                  else
                  {
                        t = xx - 1;
                  }
                  
                  for(let i = 1; i < t; i++ )
                  {
                        if(this.stage[pos.y - i][pos.x - i] == rev)
                        {
                              putOK++;
                        }
                        else if(this.stage[pos.y - i][pos.x - i] == piece)
                        {
                              break;
                        }
                        else if(this.stage[pos.y - i][pos.x - i] == BlackOrWhite.None)
                        {
                              putOK = 0;
                              break;

                        }
                  }


                  if(putOK > 0)
                  {
                        return true;
                  }

                  putOK = 0;
                  xx = (STAGE_WIDTH - pos.x )
                  yy = STAGE_HEIGHT - (STAGE_HEIGHT - pos.y)
                  if( (xx - 1) > (yy - 1) )
                  {
                        t = yy - 1;
                  }
                  else
                  {
                        t = xx - 1;
                  }
                  
                  for(let i = 1; i < t; i++ )
                  {
                        if(this.stage[pos.y - i][pos.x + i] == rev)
                        {
                              putOK++;                                          
                        }
                        else if(this.stage[pos.y - i][pos.x + i] == piece)
                        {
                              break;
                        }
                        else if(this.stage[pos.y - i][pos.x + i] == BlackOrWhite.None)
                        {
                              putOK = 0;                                          
                              break;


                        }
                  }

                  if(putOK > 0)
                  {
                        return true;
                  }            

                  return false;
            }
            else
            {
                  return false;
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
                              let t = this.Reverse(BlackOrWhite.Black,new Vector(x,y));
                        }
                        //白に反転
                        else if (this.stage[y][x] == BlackOrWhite.White)
                        {
                              let t = this.Reverse(BlackOrWhite.White,new Vector(x,y));
                        }
                  }
            }
      }



      //設置
      Put(pos,bw)
      {     
            
            this.stage[pos.y][pos.x] = bw;
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
                   //           console.log("その他");
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


class Enemy
{
      constructor(b)
      {
            this.bw = b;

      }


      StageCollision(stage)
      {
            
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
                  if (mouseButton == LEFT　&& this.click == false) 
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
    
      // ################################ ステージとの当たり判定 ################################ 
      StageCollision(stage)
      {

            let putArray = [];
            //this.PutPiecePosition(putArray,stage);


            //デバッグ
            for(let y = 0; y < STAGE_HEIGHT;  y++)
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)
                  {
                        if(stage.PutPiecePosition(this.bw,new Vector(x,y)) == true)
                        {
                              fill(color(0,255,0));   
                              circle((x * PIECE_WIDTH) + (PIECE_WIDTH / 2),(y * PIECE_HEIGHT) + (PIECE_HEIGHT / 2),PIECE_COLLISION_RANGE);
                        }
                  
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
            
                              if(Collision.Circle(new Vector(x * PIECE_WIDTH + (PIECE_WIDTH / 2), y * PIECE_HEIGHT +  (PIECE_HEIGHT / 2)),PIECE_COLLISION_RANGE,this.position,MOUSE_COLLISION_RANGE) == true
                              && stage.PutPiecePosition(this.bw,new Vector(x,y)) )
                              {
                                    stage.Put(new Vector(x,y),this.bw);
                              }
                        }
                  }           
            }
      }
}



class Enemy
{
      constructor(b)
      {
            this.bw = b;            
      }


      StageCollision()
      {

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

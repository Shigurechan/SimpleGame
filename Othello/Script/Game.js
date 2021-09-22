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

//反転する座標とその数
class ReversePosition
{
      //置く座標、反転枚数、反転座標
      constructor(pos,num,rev)
      {
            this.num = num;
            this.revercePosition = rev;
            this.putPosition = pos;
      }


}

function GetReversePiece(piece)
{
      if(piece == BlackOrWhite.White)
      {
            return BlackOrWhite.Black;
      }
      else if(piece == BlackOrWhite.Black)
      {
            return BlackOrWrite.White;
      }
}


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

      // ################################ 空の場所に置けるかどうか？ ################################ 
      LineReversePosition(piece,position,out_array,vector)
      {
            function stageNum(vector,position)
            {
                  let x = 0;
                  let y = 0;
                  if(vector.x != 0)
                  {
                        if(vector.x > 0)
                        {
                              x = STAGE_WIDTH -  position.x;
                        }
                        else if(vector.x < 0)
                        {
                              x = STAGE_WIDTH - (STAGE_WIDTH -  position.x);
                        }
                  }
                  
                  if(vector.y != 0)
                  {
                        if(vector.y > 0)
                        {
                              y = STAGE_HEIGHT -  position.y;
                        }
                        else if(vector.y < 0)
                        {
                              y = STAGE_HEIGHT - (STAGE_HEIGHT -  position.y);
                        }
                  }

                  return new Vector(x,y);
            }

      
            let revPiece = GetReversePiece(piece);    //反対の色を取得
            let array = [];                           //反転座標
            let move;
            let t;

            if ( (vector.x != 0) && (vector.y != 0) )
            {

                  move = stageNum(vector,position);

                  if(move.x > move.y)
                  {
                        t = move.y;
                  }
                  else
                  {
                        t = move.x;
                  }

                 // console.log(t);
                  let b = false;
                  for(let i = 1; i < t; i++)
                  {

                        if(this.stage[position.x + (i * vector.x )][position.y  + (i * vector.y )] == revPiece)
                        {
                              array.push(new Vector(position.x + (i * vector.x ),+ (i * vector.y )));
            //                  console.log("array.length: ",array.length);
                        }
                        else if(this.stage[position.x + (i * vector.x )][position.y  + (i * vector.y )] == piece)
                        {
                              b = true;
                              break;
                        }else
                        {
                              if(array.length == 1)
                              {
                                    array = [];
                              }
                              break;
                        }
                        
                        
                        if( (array.length == 1) && (b == false) )
                        {
                              array = [];
                        }

                  }

            }
            else if( (vector.x == 0) || (vector.y == 0) ) 
            {
                  let t = 0;
                  let b = false;
      
                  

                  move = stageNum(vector,position);

                  if(vector.x != 0)
                  {
                        t = move.x;
                  }
                  else
                  {
                        t = move.y;
                  }


                  for(let i = 1; i < t; i++)
                  {
                        if(this.stage[position.x + (i * vector.x )][position.y  + (i * vector.y )] == revPiece)
                        {
                              array.push(new Vector(position.x + (i * vector.x ),position.y + (i * vector.y )) );
                        }
                        else if(this.stage[position.x + (i * vector.x )][position.y  + (i * vector.y )] == piece)
                        {
                              b = true;
                              break;
                        }else
                        {
                              if(array.length == 1)
                              {
                                    array = [];
                              }
                              break;
                        }      
                  }
                        
                  if( (array.length == 1) && (b == false) )
                  {
                        array = [];
                  }

            }
            


            for(let i = 0; i < array.length; i++)
            {
                  //console.log("あああ");
                  out_array.push(array[i]);
            }

            //console.log(out_array.lenght);
      }

      // ################################ 反転 ################################ 
      Reverse(piece)
      {
            let array = new Array();
            for(let y = 0; y < STAGE_HEIGHT; y++)
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)
                  {
                        if (this.stage[y][x] == piece)
                        {

                        }
                  }            
            }
      }

      // ################################ 配置できるかどうか？ ################################ 
      PutPosition(position,piece)
      {

            let arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(1,0));
            if(arr.length > 0)
            {
                  return true;
            }

            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(-1,0));
            if(arr.length > 0)
            {
                  return true;
            }
            
            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(0,1));
            if(arr.length > 0)
            {
                  return true;
            }
            
            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(0,-1));
            if(arr.length > 0)
            {
                  return true;
            }
            
            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(1,1));
            if(arr.length > 0)
            {
                  return true;
            }
            
            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(-1,1));
            if(arr.length > 0)
            {
                  return true;
            }
            
            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(1,-1));
            if(arr.lenght > 0)
            {
                  return true;
            }
            

            arr = [];
            this.LineReversePosition(piece,position,arr,new Vector(-1,-1));
            if(arr.length > 0)
            {
                  return true;
            }
            

            return false;
      }


      //ひっくり返すか判定
      InversionJudgment()
      {
            for(let y = 0; y < STAGE_HEIGHT;  y++)            
            {
                  for(let x = 0; x < STAGE_WIDTH; x++)
                  {

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
            let outPutPosition = [];
            let outReversePosition = [];


            //console.log(outPutPosition[0].putPosition.x + " , " + outPutPosition[0].putPosition.y);

            //デバッグ
            for(let y = 0; y < STAGE_HEIGHT;  y++)
            {
                  for(let x = 0; x < STAGE_WIDTH;  x++)
                  {
                        
                        if( (stage.PutPosition(new Vector(x,y),this.bw) == true) && (stage.stage[y][x] == BlackOrWhite.None) )
                        {
                         //     console.log(" デバッグ");
                              fill(color(0,255,0));   
                              circle((x * PIECE_WIDTH) + (PIECE_WIDTH / 2),(y * PIECE_HEIGHT) + (PIECE_HEIGHT / 2),PIECE_COLLISION_RANGE);
                        }
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



class Game
{
      constructor()
      {
            this.stage = new Stage();
            this.player = new Player(BlackOrWhite.White);
            this.enemy = new Enemy(BlackOrWhite.Black);
      }

      Update()
      {
            this.player.Update();
            this.player.StageCollision(this.stage);
            this.enemy.StageCollision(this.stage);

            
      }

      Renderer()
      {
            this.stage.Renderer();

      }
      


}

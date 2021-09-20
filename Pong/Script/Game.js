

const SCORE_JUDGEMENT_INTERVAL_TIME = 180;      // 判定時間
const PANEL_INTERVAL = 50;                     // パネルのＸ座標間隔
const SCORE_WALL_LINE_INTERVAL　= 5;            //　得点判定のX座標
let Hit = {None: 0,Left: 1,Right: 2};          // 判定


class Ball
{     

      constructor(s)
      {
            this.score = s;
            this.hit = Hit.None;
            this.size = new Vector(20,20);      //サイズ  
            this.vector = new Vector(1,-1);     //向き
            this.speed = 5;                     //速度
            this.position = new Vector( (CANVAS_WIDTH / 2)  - (this.size.x / 2) ,(CANVAS_HEIGHT / 2) - (this.size.y / 2));                //座標
            this.wallHit = false;
            this.reStart = false;
            this.reStartInterval = 0;
      }

      Init()
      {
            this.hit = Hit.None;
            this.size = new Vector(20,20);      //サイズ  
            this.vector = new Vector(1,-1);     //向き
            this.speed = 5;                     //速度
            this.position = new Vector( (CANVAS_WIDTH / 2)  - (this.size.x / 2) ,(CANVAS_HEIGHT / 2) - (this.size.y / 2));                //座標
            this.wallHit = false;
            this.reStart = false;
            this.reStartInterval = 0;

      }

      // 得点判定
      WallCollision()
      {
            let Right_Wall = new LineSegment(new Vector(CANVAS_WIDTH - SCORE_WALL_LINE_INTERVAL,0),new Vector(CANVAS_WIDTH - SCORE_WALL_LINE_INTERVAL,CANVAS_HEIGHT));
            let Left_Wall = new LineSegment(new Vector(SCORE_WALL_LINE_INTERVAL,0),new Vector(SCORE_WALL_LINE_INTERVAL,CANVAS_HEIGHT));

            let b = new Vector(this.position.x + this.vector.x * 1,this.position.y + this.vector.y * 1); 
            let p = new LineSegment(this.position,b);


            //得点加算
            if( (Collision.LineSegment(Right_Wall,p) == true) && (this.wallHit == false) )
            {
                  this.wallHit = true;
                  this.hit = Hit.Right;
                  this.score.ScoreJudgement(this.hit);

            }
            else if ( (Collision.LineSegment(Left_Wall,p) == true) && (this.wallHit == false) )
            {
                  this.wallHit = true;

                  this.hit = Hit.Left;
                  this.score.ScoreJudgement(this.hit);

            }            
            else
            {

            }



      }

      Update()
      {
            this.position.x += this.vector.x * this.speed;
            this.position.y += this.vector.y * this.speed;


            if(CANVAS_WIDTH < (this.position.x + this.size.x))
            {
                  this.vector.x = -1;
                  this.speed = 0;
                  this.hit = Hit.Right;
            }
            else if(0 > this.position.x )
            {
                  this.vector.x = +1;
                  this.speed = 0;
                  this.hit = Hit.Left;
            }

            if(CANVAS_HEIGHT < (this.position.y + this.size.y))
            {
                  this.vector.y = -1;
            }
            else if(0 > this.position.y )
            {
                  this.vector.y = +1;
            }

            //ヒットした時
            if( this.wallHit == true)
            {
                  this.reStartInterval++;
                  if(this.reStartInterval > SCORE_JUDGEMENT_INTERVAL_TIME)
                  {
                        this.Init();
                        this.reStartInterval = 0;
                        this.wallHit = false;
                        this.hit = Hit.None;

                        this.score.ScoreJudgement(Hit.None);                  

                  }
            }


            this.WallCollision();   //得点判定
      }

      ReBound()
      {
            this.vector.x = this.vector.x * -1;
      }


      //どちらかに点が入ったかどうか？
      HitJudgement()
      {
            return this.Hit;
      }

      Renderer()
      {
            fill(color(255,0,255));
            rect(this.position.x,this.position.y,
                  this.size.x,this.size.y);
      }
}





class Player
{
      constructor()
      {
            this.position = new Vector(PANEL_INTERVAL,100);
            this.speed = 10;
            this.size = new Vector(30,70);
      }

      Update()
      {
            this.KeyBoard();
      }

      //キー入力
      KeyBoard()
      {
            if(keyIsDown(UP_ARROW) == true)
            {
                  this.position.y += -speed;
            }
            else if(keyIsDown(DOWN_ARROW) == true)
            {
                  this.position.y += speed;
            }
      }

      collision(ball)
      {
            if(Collision.Rectangle(this.position,this.size,ball.position,ball.size) == true)
            {
                  ball.ReBound();
            }
      }


      Renderer()
      {
            fill(color(255,255,255));
            rect(this.position.x,this.position.y,
                  this.size.x,this.size.y);
      }
}


class Enemy
{
      constructor()
      {
            this.position = new Vector((CANVAS_WIDTH - PANEL_INTERVAL),500);
            this.speed = 10;
            this.size = new Vector(30,70);
            this.ballNextPosition = 0;
            this.isBallTurn = false;            //ボールを跳ね返すかどうか？(AI)
            this.isballTurnOK = false;          //ボールとパネルの当たり判定　ボールを跳ね返したかどうか？            
      }

      Update()
      {
            /*
            if(this.isBallTurn == true)
            {            
                  if(this.position.y < this.ballNextPosition)
                  {
                        this.position.y += this.speed;
                  }
                  else if (this.position.y > this.ballNextPosition)
                  {
                        this.position.y += -this.speed; 
                  }             
            }
            */
      }
     
      Move(ball)
      {
            let lineVector = new LineSegment(new Vector(CANVAS_WIDTH - 100,0),new Vector(CANVAS_WIDTH - 100,CANVAS_HEIGHT));
            let b = new Vector(ball.position.x + ball.vector.x * 1000,ball.position.y + ball.vector.y * 1000); 
            let p = new LineSegment(ball.position,b);

            let p2 = new Vector(0,0);
            if( (Collision.LineSegment(p,lineVector) == true) && (this.ballTurnOK == false) )
            {
                  let p2 = Collision.LineSegment_Pos(p,lineVector);

                  if(GetRandom(0,2) == 0)
                  {
                        this.isBallTurn = false;
                        this.ballTurnOK = true;

                  }else
                  {
                        this.ballTurnOK = true;
                        this.ballNextPosition = p2.y;
                        this.isBallTurn = true;
                  }
            }


            if(ball.vector.x < 0 && ball.position.x < CANVAS_WIDTH - 100)
            {
                  this.ballTurnOK = false;
            }
      }

      collision(ball)
      {
            this.Move(ball);

            if(Collision.Rectangle(this.position,this.size,ball.position,ball.size) == true)
            {
                  this.ballturnOK = true;
                  ball.ReBound();
            }
      }

      Renderer()
      {
            fill(color(255,255,255));
            rect(this.position.x,this.position.y,
                  this.size.x,this.size.y);
      }
}


//スコア表示
class Score
{
      constructor()
      {
            this.left = 0;
            this.right = 0;
            this.side = Hit.None;
            this.winView = 0;
      }

      Update()
      {

      }

      ScoreJudgement(hit)
      {
            if(hit == Hit.Left)
            {
                  this.left++;
                  this.side = hit;
            }
            else if(hit == Hit.Right)
            {
                  this.right++;
                  this.side = hit;
            }else
            {
                  this.side = this.None;
            }
            
      }

      Renderer()
      {
            textSize(35);
            text("SCORE: " + this.left,300,50);
            text("SCORE: " + this.right,600,50);

            console.log(this.side);
            if(this.side == Hit.Left)
            {
                  if(this.winView < SCORE_JUDGEMENT_INTERVAL_TIME )
                  {      
                        textSize(35);
                        text("PLAYER WIN ! ",200 ,400);
                        this.winView++;
                  }
            }
            else if(this.side == Hit.Right)
            {
                  if(this.winView < SCORE_JUDGEMENT_INTERVAL_TIME )
                  {      
                        textSize(35);
                        text("ENEMY WIN ! ",CANVAS_WIDTH - 200 ,400);
                        this.winView++;
                  }
            }
            else
            {
                  this.winView = 0;
            }
            
      }


}


class Game
{
      constructor()
      {
            this.score = new Score();
            this.player = new Player();
            this.ball = new Ball(this.score);
            this.enemy = new Enemy();            
      }


      Update()
      {
            this.player.Update();
            this.ball.Update();
            this.enemy.Update();

            this.player.collision(this.ball);
            this.enemy.collision(this.ball);
      }

      Renderer()
      {
            this.player.Renderer();
            this.enemy.Renderer();
            this.ball.Renderer();
            this.score.Renderer();
      }
}
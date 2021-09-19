let Hit = {None: 0,Left: 1,Right: 2};     //判定


class Ball
{     

      constructor()
      {
            this.hit = Hit.None;
            this.size = new Vector(20,20);      //サイズ  
            this.vector = new Vector(1,-1);     //向き
            this.speed = 5;                     //速度
            this.position = new Vector( (CANVAS_WIDTH / 2)  - (this.size.x / 2) ,(CANVAS_HEIGHT / 2) - (this.size.y / 2));                //座標

      }

      Init()
      {
            this.hit = Hit.None;
            this.vector = new Vector(1,-1);     //向き
            this.speed = 5;                     //速度
            this.position = new Vector( (CANVAS_WIDTH / 2)  - (this.size.x / 2) ,(CANVAS_HEIGHT / 2) - (this.size.y / 2));                //座標
      }

      Update()
      {
            this.position.x += this.vector.x * this.speed;
            this.position.y += this.vector.y * this.speed;


            if(CANVAS_WIDTH < (this.position.x + this.size.x) )
            {
                  this.vector.x = -1;
                  //this.speed = 0;
                  this.hit = Hit.Right;
            }
            else if(0 > this.position.x )
            {
                  this.vector.x = +1;
                  //this.speed = 0;
                  this.hit = Hit.Left;
            }

            if(CANVAS_HEIGHT < (this.position.y + this.size.y) )
            {
                  this.vector.y = -1;
            }
            else if(0 > this.position.y )
            {
                  this.vector.y = +1;
            }
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
            this.position = new Vector(50,100);
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
            this.position = new Vector(CANVAS_WIDHT - 50,100);
            this.speed = 10;
            this.size = new Vector(30,70);
      }

      Update()
      {

      }
     
      Move(ball)
      {
            let t = VectorCrossPos();
            if(t.y > this.position.y)
            {
                  this.position.y += this.speed;
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



class Game
{
      constructor()
      {
            this.player = new Player();
            this.ball = new Ball(new Vector(500,400));
            this.enemy = new Enemy();
      }


      Update()
      {
            this.player.Update();
            this.enemy.Update();
            this.ball.Update();
            this.player.collision(this.ball);
            this.enemy.collision(this.ball);


      }

      Renderer()
      {
            this.player.Renderer();
            this.enemy.Renderer();
            this.ball.Renderer();

      }
}
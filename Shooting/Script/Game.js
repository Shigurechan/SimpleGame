
let BulletType = {Enemy: 0,Player: 1};    //バレットタイプ

class Bullet
{
      //引数のバレット配列にオブジェクトを生成
      static Instance(array,position,type)
      {
            let b = false;

            if(array.length == 0)
            {
                  array.push(new Bullet(new Vector(position.x,position.y),type));
                  b = true;
            }

            array.forEach(item =>
            {
                  if(item.alive == false)
                  {
                        b = true;
                        item.Init(new Vector(position.x,position.y),type);
                  }
            });

            if( b == false)
            {
                  array.push(new Bullet(new Vector(position.x,position.y),type));
            }

      }

      constructor(pos,type)
      {
            this.c = color(0,0,0);        //色
            this.speed = 0;               //速度
            this.deleteBulletY = 800;     //表示座標上限
            this.type = type;             //タイプ
            this.size = new Vector(5,15); //サイズ
            this.position = pos;          //座標
            this.alive = true;            //有効かどうか？
            
            if(type == BulletType.Enemy)  
            {
                  this.c = color(200,0,0);
                  this.speed = 6;
            }
            else if(type == BulletType.Player)
            {
                  this.c = color(0,0,200);
                  this.speed = 15;
            }

            
      }

      Init(pos,type)
      {
            if(type == BulletType.Enemy)
            {
                  this.c = color(200,0,0);
            }
            else if(type == BulletType.Player)
            {
                  this.c = color(0,0,200);
            }

            this.position = pos;
            this.alive = true;
      }

      Update()
      {
            if(this.type == BulletType.Enemy)
            {
                  this.position.y += this.speed;

                  if(this.position.y > this.deleteBulletY )
                  {
                        this.alive = false;
                  }
            }
            else if(this.type == BulletType.Player)
            {
                  this.position.y += -this.speed;

                  if(this.position.y  <  0)
                  {
                        this.alive = false;
                  }
            }
      }

      Renderer()
      {
            fill(this.c);
            if(this.alive == true)
            {
                  rect(this.position.x,this.position.y,this.size.x,this.size.y);
            }
      }
}


class Enemy
{
      constructor(pos)
      {
            this.position = pos;                //座標
            this.alive = true;                  //生きいるかどうか？
            this.size = new Vector(20,20);      //サイズ
            this.bullet = new Array();          //Enemy Bullet 配列
            this.b = 0;                         //インスタンス判定
            this.speed = 2;                     //速度              
      }


      Init(pos)
      {
            this.position = pos;
            this.alive = true;
      }


      get getBullet()
      {
            return this.bullet;
      }

      Update()
      {           
            this.position.y += this.speed;
            
            //console.log(this.bullet.length);

            if( GetRandom(1,100) % 50 == 0 )
            {
                  Bullet.Instance(this.bullet,this.position,BulletType.Enemy);
            }

            // バレット更新
            if(this.bullet.length > 0)
            {
                  this.bullet.forEach(item => 
                  {
                        if(item.alive == true)
                        {
                              item.Update();
                        }

                  });
            }
      }

      Renderer()
      {
            if(this.alive == true)
            {
                  fill(color(255,0,0));
      
                  triangle(this.position.x,this.position.y + this.size.y,
                        this.position.x - this.size.x,this.position.y - this.size.y,
                        this.position.x + this.size.x,this.position.y - this.size.y);
            }
                  
            if(this.bullet.length > 0)
            {
                  this.bullet.forEach(item => 
                  {
                        if(item.alive == true)
                        {
                              item.Renderer();
                        }
                        
                  });
            }
      }

}


class Player
{
      //コンストラクタ
      constructor(pos)
      {
            this.position = pos;          //座標
            this.alive = true;            //生きるかどうか？
            this.size = 30;               //サイズ
            this.speed = 10;              //移動速度
            this.bullet = new Array();    //バレット
            this.shiftPush = false;       //シフトキーを押したかどうか？
            this.damage = false;          //ダメージがどうか？
            this.damageAnimation = 0;     //ダメージアニメーション　フレームを加算
            this.life = 3;                //ライフ

      }

      //ダメージ
      Damage()
      {
            this.damage = true;
      }

      get getBullet()
      {
            return this.bullet;
      }

      //キー入力
      KeyBoard()
      {
            
            if(keyIsDown(LEFT_ARROW) == true)
            {
                  this.position.x += -speed;

            }
            else if(keyIsDown(RIGHT_ARROW) == true)
            {
                  this.position.x += speed;
            }

            if(keyIsDown(UP_ARROW) == true)
            {
                  this.position.y += -speed;
            }
            else if(keyIsDown(DOWN_ARROW) == true)
            {
                  this.position.y += speed;
            }

            if ( (keyIsDown(SHIFT) == true) && (this.shiftPush == false) ) 
            {
                  this.shiftPush = true;
                  Bullet.Instance(this.bullet,this.position,BulletType.Player);
            }
            
            if(keyIsDown(SHIFT) == false)
            {
                  this.shiftPush = false;
            }
      }


      //更新
      Update()
      {
            if(this.life >= 0)
            {
                  this.KeyBoard();
            }

            if(this.bullet.length > 0)
            {
                  this.bullet.forEach(item => 
                  {
                        item.Update();
                  });
            }

            if(this.damage == true)
            {
                  //ライフを減らす
                  if(this.damageAnimation == 0)
                  {
                        this.life += -1;
                  }

                  this.damageAnimation++;

                  if(this.damageAnimation > 20 )
                  {
                        this.damageAnimation = 0;
                        this.damage = false;

                  }             
            }
      }

      //描画
      Renderer()
      {
            if(this.damage == true)
            {
                  if(GetRandom(1,100) % 10 == 0)
                  {
                        fill(color(255,0,255));
                        triangle(this.position.x,this.position.y - this.size,
                              this.position.x - this.size,this.position.y + this.size,
                              this.position.x + this.size,this.position.y + this.size);
                  }

            }
            else
            {
                  fill(color(255,0,255));
                  triangle(this.position.x,this.position.y - this.size,
                        this.position.x - this.size,this.position.y + this.size,
                        this.position.x + this.size,this.position.y + this.size);            
            }

            if(this.bullet.length > 0)
            {
                  this.bullet.forEach(item => 
                  {
                        item.Renderer();
                  });
            }                  
      }
}

class Game 
{
      //オブジェクトプール
      EnemyInstance(pos)
      {
            let b = false;
            this.enemy.forEach(item =>
            { 
                  if(item.alive == false)
                  {
                        b = true;
                        item.Init(pos);
                  }
            });

            if(b == false)
            {
                  this.enemy.push(new Enemy(pos));
            }

            return;
      }

      constructor()
      {
            this.enemy = new Array();                       //Enemy
            this.player = new Player(new Vector(500,600));  //Player
            this.score = 0;                                 //スコア


            for(let i = 0; i< GetRandom(1,6); i++)
            {
                  this.EnemyInstance(new Vector(100 + i * GetRandom(80,100),100));
            }
      }
 
      Update()
      {
            this.player.Update();   //プレイヤー更新


            //エネミー生成            
            if(GetRandom(1,100) % 90 == 0)
            {
                  //生成数
                  for(let i = 0; i< GetRandom(1,6); i++)
                  {
                        this.EnemyInstance(new Vector(100 + i * GetRandom(80,1000),100));
                  }
            }
            
            //エネミー更新　当たり判定
            this.enemy.forEach(item =>
            {
                  item.Update();

                  //エネミー
                  if( (Collision.Circle(this.player.position,this.player.size,item.position,item.size) === true) && (item.alive === true) )
                  {                       
                        this.player.Damage();
                  }

                  //エネミーバレット
                  item.getBullet.forEach(it =>
                  {
                        if( (Collision.Circle(this.player.position,this.player.size,it.position,Range(it.size,it.size)) == true) && (it.alive == true) )
                        {                       
                              this.player.Damage();
                        }
                  });
            });

            //プレイヤーバレット
            this.player.getBullet.forEach(item =>
            {

                  this.enemy.forEach(ite =>
                  {
                        //エネミー
                        if( (Collision.Circle(item.position,Range(item.size,item.size),ite.position,Range(ite.size,ite.size)) == true) && (ite.alive == true) )
                        {                       
                              ite.alive = false;
                        } 
                  });            
            });

            // ゲームオーバー表示
            if(this.player.life <= 0)
            {
                  fill(color(255,255,255));
                  textSize(34);
                  text("GAME OVER",500,400);
                  text("page reload",500,500);
            }

            fill(color(255,255,255));
            textSize(34);
            text("LIFE " + this.player.life,50,50);
      }

      Renderer()
      {
            this.enemy.forEach( item => item.Renderer());     
            this.player.Renderer();      
      }
}

//プレイヤー
const PLAYER_BULET_EXPLOSION_ANIMATION_SPEED = ONE_FRAME * 6;     //ヒットエフェクトの速度
const PLAYER_MOVE_SPEED = 4;
const PLAYER_BULLET_ANIMATION_SPEED = ONE_FRAME * 7;
const PLAYER_BULLET_SPEED = 10;
const PLAYER_BULLET_ANIMATION_SPRITE_NUM = 6;   //プレイヤー　バレットアニメーションスプライトの数
const PLAYER_SIZE_WIDTH = 45;
const PLAYER_SIZE_HEIGHT = 24;
const PLAYER_BULLET_SIZE_WIDTH = 3;
const PLAYER_BULLET_SIZE_HEIGHT = 24;
const PLAYER_BULLET_EXPLOSION_SIZE = 48;
const PLAYER_BULLET = 5;
const BULLET_ANIMATION_SPRITE_NUM = 4 - 1;


// ################################################################
// # Bullet
// ################################################################
class Bullet
{
      // ################################ コンストラクタ ################################ 
      constructor(bulletType,bullet,a,b)
      {

            this.bullet_Sprite = bullet;              //バレット           
            this.explosion_A_Sprite = a;              //プレイヤーのバレットが壁ヒット
            this.explosion_B_Sprite = b;              //バレット同士ヒットまたはトーチカとのヒット

            this.position = new Vector(-1,-1);              //初期座標

            //バレットサイズを設定
            this.size = new Vector(0,0);
            if(bulletType == CollisionType.EnemyBullet)
            {
                  this.size = new Vector(9,24);
            }
            else if (bulletType == CollisionType.PlayerBullet)
            {
                  this.size = new Vector(3,24);
            }

            this.type = bulletType;                         //バレットタイプ 

            //アニメーション
            this.animation_Time = 0;
            this.animationExplosion_Time = 0;
            this.animation_Clip = 0;
            this.isAnimation = false;

            this.isActive = false;  //アクティブかどうか？

            //当たり判定
            this.isHit_Bullet = false;
            this.isHit_Enemy = false;            
            this.isHit_PillBox = false;
            this.isHit_Wall = false;
            this.isHit = false;
            this.rand = GetRandom(0,6);

      }

      // ################################ 有効 ################################ 
      setEnable(pos)
      {
            this.isActive = true;
            this.isHit_Wall = false;
            this.isHit_PillBox = false;
            this.isHit_Enemy = false;
            this.isHit = false;
            this.isHit_Enemy = false;

            this.position = new Vector(pos.x,pos.y);
            
      }

      // ################################ 無効 ################################ 
      setDisable()
      {
            this.isActive = false;
            this.isHit = false;

            this.position = new Vector(-1,-1);
            
      }


      // ################################ プレイヤーバレット ################################ 
      Player_Bullet()
      {
      }

      // ################################ エネミーバレット ################################ 
      Enemy_Bullet()
      {

      }

      
      // ################################ Update ################################ 
      Update()
      {     
            if( this.isActive == true )
            {
                  if( (this.type == CollisionType.EnemyBullet) && (this.position.y > SCREEN_SIZE_BOTTOM) )
                  {      
                        this.isHit_Wall = true;
                  }

                  if( (this.isHit_PillBox == false) && (this.isHit_Wall == false) && (this.isHit_Enemy == false) )
                  {                  
                        if(this.type == CollisionType.PlayerBullet)
                        {
                              this.position.y += -PLAYER_BULLET_SPEED;  //移動
                        }
                        else if(this.type == CollisionType.EnemyBullet)
                        {
                              this.position.y += ENEMY_BULLET_SPEED;  //移動
                        }
                  }
                  else
                  {
                        this.isHit == true;
                  }

                  //アニメーション
                  this.animation_Time += deltaTime;
                  if(this.animation_Time > PLAYER_BULLET_ANIMATION_SPEED)
                  {
                        this.animation_Time = 0;
                        this.animation_Clip++;

                        if(this.animation_Clip > 3)
                        {
                              this.rand = GetRandom(0,6);
                              this.animation_Clip = 0;
                        }
                  }

                  //何かとヒット アニメーション
                  if( (this.isHit_PillBox == true) || (this.isHit_Wall == true) || (this.isHit_Enemy == true) )
                  {
                        this.isAnimation = true;
                        this.animationExplosion_Time += deltaTime;
                        if( (this.animationExplosion_Time > PLAYER_BULLET_ANIMATION_SPEED) )
                        {
                              this.isAnimation = false;
                              this.isHit_Enemy = false;
                              this.animationExplosion_Time = 0;
                              this.isActive = false;
                              this.isHit = false;
                              this.position = new Vector(-1,-1);
                        }                        
                  }

                  //ステージの上端とヒットしたとき
                  if(this.position.y < SCREEN_SIZE_TOP)
                  {
                        this.isHit_Wall = true;
                  }
                  
            }

      }

      
      // ################################ 当たり判定 ################################ 
      Collision(myType,colType,pos,size)
      {
            if((BoxCollision(new Vector(this.position.x,this.position.y), new Vector(this.size.x,this.size.y),
                  new Vector(pos.x,pos.y),new Vector(size.x,size.y)) == true) && (this.isActive == true) )
            {

                  if((myType == CollisionType.PlayerBullet) &&  (colType == CollisionType.PillBox) )
                  {
                        console.log("あああ");
                  }


                  if( (myType == CollisionType.PlayerBullet) && (colType == CollisionType.Enemy) )
                  {
                        this.isActive = false;
                        this.position = new Vector(-1,-1);

                        return true;
                  }
                  else if( (myType == CollisionType.PlayerBullet) && (colType == CollisionType.EnemyBullet) )
                  {
                        this.isActive = false;
                        this.position = new Vector(-1,-1);

                        return true;
                  }
                  else if( (myType == CollisionType.EnemyBullet) && (colType == CollisionType.PlayerBullet) )
                  {
                        this.isHit_Enemy = true;
                        return true;
                  }
                  else if( (myType == CollisionType.EnemyBullet) && (colType == CollisionType.PillBox) )
                  {
                        this.isHit_PillBox = true;
                        return true;
                  }
                  else if( (myType == CollisionType.PlayerBullet) && (colType == CollisionType.PillBox) )
                  {
                        this.isHit_PillBox = true;
                        return true;
                  }




            }


            return false;
      }

      
      // ################################ プレイヤーバレット描画 ################################ 
      Player_Bullet_Renderer()
      {



      }     
      // ################################ Renderer ################################ 
      Renderer()
      {
            if( (this.type == CollisionType.PlayerBullet) && (this.isActive == true) )
            {
                  //バレット  アニメーション
                  if( (this.isHit_Enemy == false) && (this.isHit_Wall == false) && (this.isHit_PillBox == false) && (this.isHit_Enemy == false) )
                  {
                        image(this.bullet_Sprite[this.animation_Clip],this.position.x,this.position.y);
                  }     
                  else if( (this.isHit_Wall == true) && (this.isAnimation == true) )
                  {
                        //壁とヒット      アニメーション
                        image(this.explosion_B_Sprite,this.position.x,SCREEN_SIZE_TOP);
                  }            
                  else if( (this.isHit_PillBox == true) && (this.isAnimation == true) )
                  {
                        console.log("あああ");

                        //トーチカヒット  アニメーション
                        image(this.explosion_A_Sprite,this.position.x,this.position.y);
                  }            
            }
            else if( (this.type == CollisionType.EnemyBullet) && (this.isActive == true) )
            {
                  //バレット  アニメーション
                  if((this.isHit_Enemy == false) && (this.isHit_Wall == false) && (this.isHit_PillBox == false) )
                  {
                        image(this.bullet_Sprite[this.animation_Clip][this.rand],this.position.x,this.position.y);
                  }     
                  else if( (this.isHit_Wall == true) && (this.isAnimation == true) )
                  {
                        //壁とヒット      アニメーション
                        image(this.explosion_B_Sprite[0],this.position.x,SCREEN_SIZE_BOTTOM);
                  }            
                  else if( (this.isHit_PillBox == true) && (this.isAnimation == true) )
                  {
                        //トーチカヒット  アニメーション
                        image(this.explosion_B_Sprite[this.rand],this.position.x,this.position.y);
                  }            
                  else if( (this.isHit_Enemy == true) && (this.isAnimation == true) )
                  {
                        //バレットヒット  アニメーション
                        image(this.explosion_B_Sprite[this.rand],this.position.x,this.position.y);
                  }                              
            }
      }
}

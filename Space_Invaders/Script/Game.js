"use strict"

const ONE_FRAME = 16.6;
const SCREEN_SIZE_WIDTH = 1000;
const SCREEN_SIZE_HEIGHT = 800;
const SCREEN_SIZE_TOP = 30;   //画面の上端
const SCREEN_SIZE_BOTTOM = SCREEN_SIZE_HEIGHT - 100;   //画面の上端

//エネミー
const ENEMY_LIST_HEIGHT = 5;
const ENEMY_LIST_WIDTH = 10;
const ENEMY_SIZE_HEIGHT = 24;
const ENEMY_SIZE_WIDTH = 48;
const ENEMY_MOVE_SPEED = 20;
const ENEMY_MOVE_INTERVAL_TIME = ONE_FRAME * 60;
const ENEMY_DOWN_INTERVAL = 5;
const ENEMY_POSITION_X = 900;
const ENEMY_EXPLOSION_ANIMATION_SPEED = ONE_FRAME * 10;
const ENEMY_BULLET_SPEED = 4;                                     //バレットスピード
const ENEMY_BULLET_INTERVAL_TIME = 1000;                          //バレット発射間隔
const ENEMY_BULLET_INTERVAL_RANDOM_TIME = 500;                    //乱数で間隔を調整
const ENEMY_BULLET_ANIMATION_SPEED = 15;                         //アニメーション速度
const ENEMY_BULLET_A = 0;
const ENEMY_BULLET_B = 1;
const ENEMY_BULLET_C = 2;
const ENEMY_BULLET = 3;

//当たり判定　種類
const CollisionType = 
{
      Enemy: 0,
      Enemy_Bullet: 1,

      StageTopSide : 2,
      PillBox : 3,
      PlayerBullet : 4,
      EnemyBullet : 5
};

//トーチカ
const PILLBOX_NUM = 4;
const PILLBOX_BLOCK_WIDTH_NUM = 8;
const PILLBOX_BLOCK_HEIGHT_NUM = 6;
const PILLBOX_SIZE = 16;
const PILLBOX_SIZE_WIDTH = 16 * 8;
const PILLBOX_SIZE_HEIGHT = 0;
const PILLBOX_AREA_SIZE = ( (PILLBOX_NUM + 3) * PILLBOX_SIZE_WIDTH);
const PILLBOX = 7;
const PILLBOX_CHIP_SIZE = 16;

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


/* 矩形同士の当たり判定 /*/
function BoxCollision(posA,sizeA,posB,sizeB)
{       
      if( ((posA.x + sizeA.x) > posB.x) && ((posB.x + sizeB.x) > posA.x )
      &&    ((posA.y + sizeA.y) > posB.y) && ((posB.y + sizeB.y) > posA.y ) )
      {
            return true;
      }
      else
      {
            return false;
      }
}

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
            this.size = 0;
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

                  //何かとヒット　アニメーション
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
            if(BoxCollision(new Vector(this.position.x,this.position.y), new Vector(this.size.x,this.size.y),
                  new Vector(pos.x,pos.y),new Vector(size.x,size.y)) == true && (this.isActive == true) )
            {

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
                        //this.position = new Vector(-1,-1);

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
                        console.log("sasasasa");
                        //バレットヒット  アニメーション
                        image(this.explosion_B_Sprite[this.rand],this.position.x,this.position.y);
                  }            
                  
            }

      }
}


// ################################################################
// # Enemy
// ################################################################
class Enemy
{
      // ################################ コンストラクタ ################################ 
      constructor(pos,sp1,sp2,ex,bullet,be,wb)
      {
            this.sprite = [];
            this.sprite.push(sp1);                   //エネミー
            this.sprite.push(sp2);                   //エネミー
            this.explosion_Sprite = ex;              //破壊

            this.bullet_Sprite = bullet;              //バレット　
            this.bulletExplosion_Sprite = be;         //バレット　ヒット
            this.bullet_WallExplosion_sprite = wb;    //プレイヤーバレットが壁とヒット

            //破壊 アニメーション
            this.explosionAnimation_Time = 0;
            this.isExplosionAnimation = false;
            

            //バレット
            this.randomInterval  = Math.floor(random(-ENEMY_BULLET_INTERVAL_RANDOM_TIME,ENEMY_BULLET_INTERVAL_RANDOM_TIME));
            this.randomBullet = Math.floor(random(0,10));

            this.bulletArray = [];

            this.change = false;                //スプライト切り替え
            this.moveReverse = false;           //移動方向
            this.isAlive = true;                //生きてるかどうか？          

            this.initPosition = new Vector(pos.x,pos.y);
            this.position = new Vector(pos.x,pos.y);
            this.size = new Vector(48,24);      //スプライトサイズ
            this.bullet = new Bullet(CollisionType.EnemyBullet,this.bullet_Sprite,this.bullet_WallExplosion_sprite,this.bulletExplosion_Sprite);
      }


      // ################################ X座標を初期座標に戻す ################################ 
      setRestPosition()
      {
            this.position.x = this.initPosition.x;            
      }

      // ################################ 移動方向を反転 ################################ 
      setMoveReverse()
      {
            this.moveReverse = !this.moveReverse;
      }

      // ################################ スプライト表示切り替え ################################ 
      setChangeSprite()
      {
            this.change = !this.change;
      }

      // ################################ 座標設定 ################################ 
      setPosition(pos)
      {
            this.position.x = this.position.x + pos.x;
            this.position.y = this.position.y + pos.y;
      } 
      
      // ################################ アニメーション ################################ 
      Animation()
      {

            //破壊
            if( (this.isAlive == false) && (this.isExplosionAnimation == true) )
            {
                  this.explosionAnimation_Time += deltaTime;
                  if(this.explosionAnimation_Time > ENEMY_EXPLOSION_ANIMATION_SPEED)
                  {
                        this.isExplosionAnimation = false;
                        this.explosionAnimation_Time = 0;
                  }
            }
      }

      // ################################ Collision ################################ 
      Collision(bullet)
      {
            if(BoxCollision(new Vector(bullet.position.x,bullet.position.y),new Vector(bullet.size.x,bullet.size.y),
            new Vector(this.position.x,this.position.y),new Vector(this.size.x,this.size.y)) == true)
            {
                  this.isAlive = false;
                  this.isExplosionAnimation = true;
            }
      }
      
      // ################################ バレット ################################ 
      Bullet()
      {            
            this.randomBullet = Math.floor(random(0,100));
            if( (this.randomBullet == 0) && (this.bullet.isActive == false) )
            {
                  this.bullet.isActive = true;
                  this.bullet.setEnable(new Vector(this.position.x + this.size.x,this.position.y));
            }
      }


      // ################################ Update ################################ 
      Update()
      {
            this.Animation();
            this.Bullet();
            this.bullet.Update();
      }

      // ################################ レンダリング ################################ 
      Renderer()
      {
            this.bullet.Renderer();    

            if(this.isAlive == true)
            {
                  //スプライト切り替え
                  if(this.change == false)
                  {
                        image(this.sprite[0],this.position.x,this.position.y);
                  }
                  else
                  {
                        image(this.sprite[1],this.position.x,this.position.y);
                  }                  
            }
            else if((this.isAlive == false) && (this.isExplosionAnimation == true) )     //破壊
            {
                  image(this.explosion_Sprite,this.position.x,this.position.y);
            }
      }
}


// ################################################################
// # PillBox_Chip
// ################################################################
class PillBox_Chip
{
      // ################################ コンストラクタ ################################ 
      constructor(pos,sp)
      {
            this.position = new Vector(pos.x,pos.y);
            this.size = new Vector(16,16);
            this.sprite = sp;
            this.spritePosition = new Vector(0,0);
            this.None = false;
      }

      // ################################ ダメージ　設定 ################################ 
      setDamage(type)
      {
            if(type == CollisionType.PlayerBullet)
            {
                  if(this.spritePosition.y < 5)
                  {
                        this.spritePosition.y++;
                  }
                  else
                  {
                        this.None = true;
                  }
            }
            else if(type == CollisionType.EnemyBullet)
            {
                  if(this.spritePosition.x < 5)
                  {
                        this.spritePosition.x++;

                  }
                  else
                  {
                        this.None = true;
                  }
            }
      }
      

      // ################################ 当たり判定 ################################ 
      Collision(type,bullet)
      {
            
            if( (BoxCollision( new Vector(bullet.position.x,bullet.position.y), new Vector(bullet.size.x,bullet.size.y),
            new Vector(this.position.x,this.position.y), new Vector(this.size.x,this.size.y)) == true) && (bullet.isAnimation == false) )
            {
                  this.setDamage(type);   //スプライト切り替え

                  if(this.None == false)
                  {
                        return true;
                  }
            }

            return false;
      }


      // ################################ Update ################################ 
      Update()
      {

      }



      // ################################ Rendering ################################ 
      Renderer()
      {
            if(this.sprite[this.spritePosition.y][this.spritePosition.x] != 0)
            {
                  image(this.sprite[this.spritePosition.y][this.spritePosition.x],this.position.x,this.position.y);
            }
      }
      
      
}

// ################################################################
// # PillBox
// ################################################################

class PillBox
{
      // ################################ コンストラクタ ################################ 
      constructor(pos,sp)
      {

            //トーチカの形
            this.shape = 
            [
                  [1,2,0,0,0,0,3,1],
                  [2,0,0,0,0,0,0,3],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,1,1,0,0,0],
                  [0,0,1,1,1,1,0,0]
            ];
            
            

            this.chip = [];
            this.size = new Vector(16,16);
            this.sprite = sp;
            this.position = new Vector(pos.x,pos.y);

            this.setRest();   //配置
      }

      // ################################ 再配置 ################################ 
      setRest()
      {
            this.chip.length = 0;
            for(let y = 0; y < this.shape.length; y++)
            {
                  for(let x = 0; x < this.shape[y].length; x++)
                  {
                        if(this.shape[y][x] == 0)
                        {
                              this.chip.push(new PillBox_Chip(new Vector(this.position.x + x * this.size.x,this.position.y + y * this.size.y),this.sprite[0]));
                        }
                        else if(this.shape[y][x] == 2)
                        {
                              this.chip.push(new PillBox_Chip(new Vector(this.position.x + x * this.size.x,this.position.y + y * this.size.y),this.sprite[1]));
                        }
                        else if(this.shape[y][x] == 3)
                        {
                              this.chip.push(new PillBox_Chip(new Vector(this.position.x + x * this.size.x,this.position.y + y * this.size.y),this.sprite[2]));
                        }
                  }
            }
      }

      // ################################ Update ################################ 
      Update()
      {

      }

      // ################################ 当たり判定 ################################ 
      Collision(type,bullet)
      {
            let t  = false;
            this.chip.forEach(item =>
            {
                  if ( item.Collision(type,bullet) == true)
                  {
                        t = true;
                  } 

            });
      
            return t;
      }
      
      // ################################ Renderer ################################ 
      Renderer()
      {
            this.chip.forEach(item =>
            {
                  item.Renderer();            
            });
      

      }

}

// ################################################################
// # PillBox_Mng
// ################################################################
class PillBox_Mng
{
      // ################################ コンストラクタ ################################ 
      constructor()
      {
            //スプライト
            this.sprite = 
            [
                  [
                        [ loadImage("Asset/pillbox_rect_0_0.png"),loadImage("Asset/pillbox_rect_1_0.png"),loadImage("Asset/pillbox_rect_2_0.png"),loadImage("Asset/pillbox_rect_3_0.png"),loadImage("Asset/pillbox_rect_4_0.png"),0] ,
                        [ loadImage("Asset/pillbox_rect_0_1.png"),loadImage("Asset/pillbox_rect_1_1.png"),loadImage("Asset/pillbox_rect_2_1.png"),loadImage("Asset/pillbox_rect_3_1.png"),0,0],
                        [ loadImage("Asset/pillbox_rect_0_2.png"),loadImage("Asset/pillbox_rect_1_2.png"),loadImage("Asset/pillbox_rect_2_2.png"),0,0,0],
                        [ loadImage("Asset/pillbox_rect_0_3.png"),loadImage("Asset/pillbox_rect_1_3.png"),0,0,0,0],
                        [ loadImage("Asset/pillbox_rect_0_4.png"),loadImage("Asset/pillbox_rect_1_0.png"),loadImage("Asset/pillbox_rect_2_0.png"),loadImage("Asset/pillbox_rect_3_0.png"),loadImage("Asset/pillbox_rect_4_0.png"),0] ,
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0]
                  ],
                  
                  [
                        [ loadImage("Asset/pillbox_left_0_0.png"),loadImage("Asset/pillbox_left_1_0.png"),loadImage("Asset/pillbox_left_2_0.png"),0,0,0],
                        [ loadImage("Asset/pillbox_left_0_1.png"),loadImage("Asset/pillbox_left_1_1.png"),0,0,0,0],
                        [ loadImage("Asset/pillbox_left_0_2.png"),loadImage("Asset/pillbox_left_1_0.png"),loadImage("Asset/pillbox_left_2_0.png"),0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0]

                        
                  ],

                  [
                        [ loadImage("Asset/pillbox_right_0_0.png"),loadImage("Asset/pillbox_right_1_0.png"),loadImage("Asset/pillbox_right_2_0.png"),0,0,0],
                        [ loadImage("Asset/pillbox_right_0_1.png"),loadImage("Asset/pillbox_right_1_1.png"),0,0,0,0 ],
                        [ loadImage("Asset/pillbox_right_0_2.png"),loadImage("Asset/pillbox_right_1_0.png"),loadImage("Asset/pillbox_right_2_0.png"),0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0]

                        
                  ]
                  
            ]

            this.box = [ ];

            this.setRest();   //初期化
      }


      // ################################ 初期化 ################################ 
      setRest()
      {
            this.box.length = 0;
            this.box.push(new PillBox(new Vector(SCREEN_SIZE_WIDTH / 2,SCREEN_SIZE_HEIGHT / 2  + 100),this.sprite));
      }
      
      
      // ################################ エネミーバレット 当たり判定 ################################ 
      Collision_Enemy(enemy_Mng)
      {
            for(let y = 0; y < enemy_Mng.enemyArray.length; y++)
            {
                  for(let x = 0; x < enemy_Mng.enemyArray[y].length; x++)
                  {
                        for(let i = 0; i< this.box.length; i++)
                        {
                              if ( this.box[i].Collision(CollisionType.EnemyBullet,enemy_Mng.enemyArray[y][x].bullet) == true)
                              {
                                    break;
                              }
                        }                        
                  }
            }
      }

      // ################################ プレイヤーバレット　当たり判定 ################################ 
      Collision_Player(player)
      {
            if(player.bullet.isHit == false)
            {
                  //プレイヤーバレット
                  for(let i = 0; i < this.box.length; i++)
                  {

                        if(this.box[i].Collision(CollisionType.PlayerBullet,player.bullet) == true)
                        {
                              player.bullet.isHit_PillBox = true;
                              player.bullet.isHit = true;

                              break;
                        }
                  }
            }
      }



      // ################################ Update ################################ 
      Update()
      {

      }
      
      // ################################ Renderer ################################ 
      Renderer()
      {
            this.box.forEach(item =>
            {
                  item.Renderer(); 
            });
      }
}



// ################################################################
// # stage
// ################################################################
class Enemy_Mng
{
      // ################################ コンストラクタ ################################ 
      constructor()
      {

      

      //エネミー破壊　エフェクト
      this.explosion_Sprite = 
      [      
            loadImage('Asset/enemy_explosion_red.png'),
            loadImage('Asset/enemy_explosion_yellow.png'),
            loadImage('Asset/enemy_explosion_green.png'),
            loadImage('Asset/enemy_explosion_purple.png'),
            loadImage('Asset/enemy_explosion_blue.png'),
            ];

      //バレット同士　エフェクト
      this.bullet_Explosion_Sprite =
      [
            loadImage("Asset/bullet_explosion_red.png"),
            loadImage("Asset/bullet_explosion_yellow.png"),
            loadImage("Asset/bullet_explosion_green.png"),
            loadImage("Asset/bullet_explosion_purple.png"),
            loadImage("Asset/bullet_explosion_blue.png"),
            loadImage("Asset/bullet_explosion_lightBlue.png"),
            loadImage("Asset/bullet_explosion_white.png"),



      ];

      this.wall_Explosion_Sprite = loadImage("Asset/wall_explosion.png");     //壁とヒット

      //トーチカとヒット
      this.pillBox_Explosion_Srpite =
      [
            loadImage("Asset/bullet_explosion_red.png"),
            loadImage("Asset/bullet_explosion_yellow.png"),
            loadImage("Asset/bullet_explosion_green.png"),
            loadImage("Asset/bullet_explosion_purple.png"),
            loadImage("Asset/bullet_explosion_blue.png"),
            loadImage("Asset/bullet_explosion_lightBlue.png"),
            loadImage("Asset/bullet_explosion_white.png"),
      ];

      //エネミーバレット
      this.bullet_Sprite = 
      [
            [
                  [      
                        loadImage('Asset/enemy_bullet_a_1_red.png'),
                        loadImage('Asset/enemy_bullet_a_1_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_1_green.png'),
                        loadImage('Asset/enemy_bullet_a_1_purple.png'),
                        loadImage('Asset/enemy_bullet_a_1_blue.png'),
                        loadImage('Asset/enemy_bullet_a_1_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_1_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_a_2_red.png'),
                        loadImage('Asset/enemy_bullet_a_2_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_2_green.png'),
                        loadImage('Asset/enemy_bullet_a_2_purple.png'),
                        loadImage('Asset/enemy_bullet_a_2_blue.png'),
                        loadImage('Asset/enemy_bullet_a_2_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_2_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_a_3_red.png'),
                        loadImage('Asset/enemy_bullet_a_3_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_3_green.png'),
                        loadImage('Asset/enemy_bullet_a_3_purple.png'),
                        loadImage('Asset/enemy_bullet_a_3_blue.png'),
                        loadImage('Asset/enemy_bullet_a_3_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_3_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_a_4_red.png'),
                        loadImage('Asset/enemy_bullet_a_4_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_4_green.png'),
                        loadImage('Asset/enemy_bullet_a_4_purple.png'),
                        loadImage('Asset/enemy_bullet_a_4_blue.png'),
                        loadImage('Asset/enemy_bullet_a_4_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_4_white.png')
                  ],
            ],


            [
                  [      
                        loadImage('Asset/enemy_bullet_b_1_red.png'),
                        loadImage('Asset/enemy_bullet_b_1_yellow.png'),
                        loadImage('Asset/enemy_bullet_b_1_green.png'),
                        loadImage('Asset/enemy_bullet_b_1_purple.png'),
                        loadImage('Asset/enemy_bullet_b_1_blue.png'),
                        loadImage('Asset/enemy_bullet_b_1_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_b_1_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_b_2_red.png'),
                        loadImage('Asset/enemy_bullet_b_2_yellow.png'),
                        loadImage('Asset/enemy_bullet_b_2_green.png'),
                        loadImage('Asset/enemy_bullet_b_2_purple.png'),
                        loadImage('Asset/enemy_bullet_b_2_blue.png'),
                        loadImage('Asset/enemy_bullet_b_2_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_b_2_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_b_3_red.png'),
                        loadImage('Asset/enemy_bullet_b_3_yellow.png'),
                        loadImage('Asset/enemy_bullet_b_3_green.png'),
                        loadImage('Asset/enemy_bullet_b_3_purple.png'),
                        loadImage('Asset/enemy_bullet_b_3_blue.png'),
                        loadImage('Asset/enemy_bullet_b_3_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_b_3_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_b_4_red.png'),
                        loadImage('Asset/enemy_bullet_b_4_yellow.png'),
                        loadImage('Asset/enemy_bullet_b_4_green.png'),
                        loadImage('Asset/enemy_bullet_b_4_purple.png'),
                        loadImage('Asset/enemy_bullet_b_4_blue.png'),
                        loadImage('Asset/enemy_bullet_b_4_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_b_4_white.png')
                  ],
            ],

            [
                  [      
                        loadImage('Asset/enemy_bullet_a_1_red.png'),
                        loadImage('Asset/enemy_bullet_a_1_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_1_green.png'),
                        loadImage('Asset/enemy_bullet_a_1_purple.png'),
                        loadImage('Asset/enemy_bullet_a_1_blue.png'),
                        loadImage('Asset/enemy_bullet_a_1_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_1_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_a_2_red.png'),
                        loadImage('Asset/enemy_bullet_a_2_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_2_green.png'),
                        loadImage('Asset/enemy_bullet_a_2_purple.png'),
                        loadImage('Asset/enemy_bullet_a_2_blue.png'),
                        loadImage('Asset/enemy_bullet_a_2_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_2_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_a_3_red.png'),
                        loadImage('Asset/enemy_bullet_a_3_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_3_green.png'),
                        loadImage('Asset/enemy_bullet_a_3_purple.png'),
                        loadImage('Asset/enemy_bullet_a_3_blue.png'),
                        loadImage('Asset/enemy_bullet_a_3_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_3_white.png')
                  ],

                  [      
                        loadImage('Asset/enemy_bullet_a_4_red.png'),
                        loadImage('Asset/enemy_bullet_a_4_yellow.png'),
                        loadImage('Asset/enemy_bullet_a_4_green.png'),
                        loadImage('Asset/enemy_bullet_a_4_purple.png'),
                        loadImage('Asset/enemy_bullet_a_4_blue.png'),
                        loadImage('Asset/enemy_bullet_a_4_lightBlue.png'),
                        loadImage('Asset/enemy_bullet_a_4_white.png')
                  ],
            ],

      ];

      //エネミー
      this.sprite = 
      [
            [
                  loadImage('Asset/enemy_a_red.png'),
                  loadImage('Asset/enemy_a_yellow.png'),
                  loadImage('Asset/enemy_a_green.png'),
                  loadImage('Asset/enemy_a_purple.png'),
                  loadImage('Asset/enemy_a_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_a2_red.png'),
                  loadImage('Asset/enemy_a2_yellow.png'),
                  loadImage('Asset/enemy_a2_green.png'),
                  loadImage('Asset/enemy_a2_purple.png'),
                  loadImage('Asset/enemy_a2_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_b_red.png'),
                  loadImage('Asset/enemy_b_yellow.png'),
                  loadImage('Asset/enemy_b_green.png'),
                  loadImage('Asset/enemy_b_purple.png'),
                  loadImage('Asset/enemy_b_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_c_red.png'),
                  loadImage('Asset/enemy_c_yellow.png'),
                  loadImage('Asset/enemy_c_green.png'),
                  loadImage('Asset/enemy_c_purple.png'),
                  loadImage('Asset/enemy_c_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_d_red.png'),
                  loadImage('Asset/enemy_d_yellow.png'),
                  loadImage('Asset/enemy_d_green.png'),
                  loadImage('Asset/enemy_d_purple.png'),
                  loadImage('Asset/enemy_d_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_d2_red.png'),
                  loadImage('Asset/enemy_d2_yellow.png'),
                  loadImage('Asset/enemy_d2_green.png'),
                  loadImage('Asset/enemy_d2_purple.png'),
                  loadImage('Asset/enemy_d2_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_e_red.png'),
                  loadImage('Asset/enemy_e_yellow.png'),
                  loadImage('Asset/enemy_e_green.png'),
                  loadImage('Asset/enemy_e_purple.png'),
                  loadImage('Asset/enemy_e_blue.png'),
            ],

            [
                  loadImage('Asset/enemy_e2_red.png'),
                  loadImage('Asset/enemy_e2_yellow.png'),
                  loadImage('Asset/enemy_e2_green.png'),
                  loadImage('Asset/enemy_e2_purple.png'),
                  loadImage('Asset/enemy_e2_blue.png'),
            ]
      ];

            


            //トーチカ　関係


            // エネミー 関係
            this.position = new Vector((SCREEN_SIZE_WIDTH / 2) - (583 / 2) - 100 , (SCREEN_SIZE_HEIGHT / 2) - (164 / 2) - 200);     //エネミー全体の座標
            this.intervalPosition = new Vector(5,5);  

            this.hitPosition = new Vector(0,0);
            this.isHit = false;
            this.isHitPillBox = false;
            this.isHitWall = false;
            this.isHitEnemy = false;


            this.move_Animation = 0;
            this.moveReverse = false;     //移動方向を変転

            //エネミー
            this.enemyArray = Array(5);        
            this.enemyArray[0] = Array(10);        
            this.enemyArray[1] = Array(10);        
            this.enemyArray[2] = Array(10);        
            this.enemyArray[3] = Array(10);        
            this.enemyArray[4] = Array(10);        


            this.setRest();               //配置をリセット　敵配列再初期化
      }

      // ################################ プレイヤーのバレットとの当たり判定 ################################ 
      Collision_Bullet_Mutual(player)
      {
            for(let y = 0; y < this.enemyArray.length; y++)
            {
                  for(let x = 0; x < this.enemyArray[y].length; x++)
                  {
                        if(this.enemyArray[y][x].bullet.Collision(CollisionType.EnemyBullet,CollisionType.PlayerBullet,player.bullet.position,player.bullet.size) == true)
                        {
                              console.log("あああ");
                              break;
                        }
                  }     
            }
      }


      // ################################ リセット ################################ 
      setRest()
      {
            let prevColor = Math.floor(random(1,5));  //前の色

            let interval = new Vector(0,0);
            this.enemyArray.lengh = 0;
            for(let y = 0; y < this.enemyArray.length; y++)
            {
                  
                  let rand = Math.floor(random(1,5));
                  while(prevColor == rand)
                  {
                        rand = Math.floor(random(1,5));
                  }

                  prevColor = rand;


                  for(let x = 0; x < this.enemyArray[y].length; x++)
                  {
                        switch(y)
                        {
                              case 0:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[0][rand],this.sprite[1][rand],this.explosion_Sprite[rand],this.bullet_Sprite[0],this.pillBox_Explosion_Srpite,this.wall_Explosion_Sprite);
                              }
                              break;

                              case 1:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[2][rand],this.sprite[3][rand],this.explosion_Sprite[rand],this.bullet_Sprite[0],this.pillBox_Explosion_Srpite,this.wall_Explosion_Sprite);
                              }
                              break;

                              case 2:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[2][rand],this.sprite[3][rand],this.explosion_Sprite[rand],this.bullet_Sprite[1],this.pillBox_Explosion_Srpite,this.wall_Explosion_Sprite);
                              }
                              break;                                                                                                                                                      
                              
                              case 3:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[4][rand],this.sprite[5][rand],this.explosion_Sprite[rand],this.bullet_Sprite[2],this.pillBox_Explosion_Srpite,this.wall_Explosion_Sprite);
                              }
                              break;
                              
                              
                              case 4:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[4][rand],this.sprite[5][rand],this.explosion_Sprite[rand],this.bullet_Sprite[0],this.pillBox_Explosion_Srpite,this.wall_Explosion_Sprite);
                              }
                              break;
                        }
                        
                        interval.x += this.intervalPosition.x;
                  }

                  interval.y += this.intervalPosition.y;
                  interval.x = 0;
            }

      }

      // ################################ 移動 ################################ 
      MovePosition()
      {
            this.move_Animation += deltaTime;

            if(this.move_Animation > ENEMY_MOVE_INTERVAL_TIME)
            {

                  for(let y = 0; y < this.enemyArray.length; y++)
                  {
                        for(let x = 0; x < this.enemyArray[y].length; x++)
                        {
                        
                              this.enemyArray[y][x].setChangeSprite();
                              if(this.moveReverse == false)
                              {
                                    this.enemyArray[y][x].setPosition(new Vector(ENEMY_MOVE_SPEED,0));
                              }
                              else
                              {
                                    this.enemyArray[y][x].setPosition(new Vector(-ENEMY_MOVE_SPEED,0));
                              }

                        }
                  }
                  
                  this.move_Animation = 0;
            }


            let init = false;
            for(let y = 0; y < this.enemyArray.length; y++)
            {
                  for(let x = 0; x < this.enemyArray[y].length; x++)
                  {
            
                        if (this.enemyArray[y][x].position.x > ENEMY_POSITION_X)
                        {
                              this.moveReverse = true;
                              init = true;
                        }

                        if (this.enemyArray[y][x].position.x < (SCREEN_SIZE_WIDTH - ENEMY_POSITION_X))
                        {
                              this.moveReverse = false;
                              init = true;
                        }
                  }
            }

            if(init == true)
            {
                  for(let y = 0; y < this.enemyArray.length; y++)
                  {
                        for(let x = 0; x < this.enemyArray[y].length; x++)
                        {
      
                              this.enemyArray[y][x].setPosition(new Vector(0,ENEMY_DOWN_INTERVAL));

                              if(this.moveReverse == false)
                              {
                                    this.enemyArray[y][x].setPosition(new Vector(ENEMY_MOVE_SPEED,0));
                              }
                              else
                              {
                                    this.enemyArray[y][x].setPosition(new Vector(-ENEMY_MOVE_SPEED,0));
                              }
                        }
                  }
            }



      }


      // ################################ 最前列にいるかどうか？ ################################ 
      Center()
      {
            for(let y = 0; y < this.enemyArray.length; y++)
            {                  
                  for(let x = 0; x < this.enemyArray[y].length; x++)
                  {
                        if(y != 4)
                        {
                              if(this.enemyArray[ y + 1 ][x].isAlive == false)
                              {
                                    this.enemyArray[y][x].isBulletPosition = true;
                              }
                              else
                              {
                                    this.enemyArray[y][x].isBulletPosition = false;
                              }
                        }
                        else
                        {
                              if(this.enemyArray[y][x].isAlive == true)
                              {
                                    this.enemyArray[y][x].isBulletPosition = true;
                              }
                              else
                              {
                                    this.enemyArray[y][x].isBulletPosition = false;

                              }
                        }
                  }
            }

      }

      // ################################ Update ################################ 
      Update()
      {           
            this.MovePosition();
            this.Center();
            this.enemyArray.forEach(item =>
            {
                  item.forEach(item2 =>
                  {
                        item2.Update();
                  });
                        
            });

      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            
            //image(this.bullet_Sprite[0][0]);

            this.enemyArray.forEach(item =>
            {
                  item.forEach(item2 =>
                  {
                        item2.Renderer();
                  });
                        
            });

      }
}


// ################################################################
// # Player
// ################################################################
class Player
{
      // ################################ コンストラクタ ################################ 
      constructor()
      {

                  
            //プレイヤーバレット
            this.bullet_sprite = 
            [
                  loadImage('Asset/player_bullet_red.png'),
                  loadImage('Asset/player_bullet_yellow.png'),
                  loadImage('Asset/player_bullet_green.png'),
                  loadImage('Asset/player_bullet_purple.png'),
                  loadImage('Asset/player_bullet_blue.png'),
                  loadImage('Asset/player_bullet_lightBlue.png'),
                  loadImage('Asset/player_bullet_white.png'),

            ];

            this.player_sprite = loadImage('Asset/player.png');                                       //自機            
            this.bullet_wall_explosion_sprite = loadImage('Asset/wall_explosion.png');                //壁ヒット
            this.bullet_pillBox_explosion_sprite = loadImage('Asset/bullet_explosion_red.png');       //トーチカとヒット



            //バレット
            this.bullet = new Bullet(CollisionType.PlayerBullet,this.bullet_sprite,this.bullet_pillBox_explosion_sprite,this.bullet_wall_explosion_sprite);
            this.hitPosition = new Vector(-1,-1);
            this.bulletSize = new Vector(PLAYER_BULLET_SIZE_WIDTH,PLAYER_BULLET_SIZE_HEIGHT);
            this.isPushBullet = false;
            this.isBullet = false;
            this.isHitAnimation = true;

            this.hitAnimation_Time = 0;
            this.hitAnimation_Clip = 0;
            this.bulletAnimation_Time = 0;
            this.bulletAnimation_Clip = 0;


             
            this.isPushSpace = false;     //スペースキー 入力

            this.position = new Vector((SCREEN_SIZE_WIDTH / 2) - 7,SCREEN_SIZE_HEIGHT / 2 + 300);     //初期座標
      }

      // ################################ バレットとエネミーの当たり判定 ################################ 
      Collision_Bullet_Enemy(enemy_Mng)
      {
            for(let y = 0; y < enemy_Mng.enemyArray.length; y++)
            {
                  for(let x = 0; x < enemy_Mng.enemyArray[y].length; x++)
                  {
                        if ( (this.bullet.Collision(CollisionType.PlayerBullet,CollisionType.Enemy,enemy_Mng.enemyArray[y][x].position,enemy_Mng.enemyArray[y][x].size) == true) && (this.bullet.isActive == true) )
                        {
                              console.log("エネミーとヒット");
                              break;
                        }
                  }
            }            
      }

      
      // ################################ バレットとトーチカの当たり判定 ################################ 
      Collision_Bullet_PillBox(pillBox_Mng)
      {
            for(let i = 0; i < pillBox_Mng.box.length; i++)
            {
                  for(let j = 0; j < pillBox_Mng.box[i].chip.length; j++)
                  {                  
                        /*
                        //console.log(pillBox_Mng.box[i].chip[j].size.x);
                        if ( (this.bullet.Collision(CollisionType.PillBox,pillBox_Mng.box[i].chip[j].position,pillBox_Mng.box[i].chip[j].size) == true) && (this.bullet.isActive == true) )
                        {
                              break;
                        }
                        */
                  }
            }            
      }

      // ################################ バレット同士の当たり判定 ################################ 
      Collision_Bullet_Mutual(enemy_Mng)
      {
            for(let y = 0; y < enemy_Mng.enemyArray.length; y++)
            {
                  for(let x = 0; x < enemy_Mng.enemyArray[y].length; x++)
                  {
                        
                        if ( (this.bullet.Collision(CollisionType.PlayerBullet,CollisionType.EnemyBullet,enemy_Mng.enemyArray[y][x].bullet.position,enemy_Mng.enemyArray[y][x].bullet.size) == true)
                        && (this.bullet.isActive == true) && (Enemy,enemy_Mng.enemyArray[y][x].bullet.isActive == true) )
                        {
                              //console.log("バレット同士");
                              break;
                        }
                        
                  }
            }
      }
      


      // ################################ Update ################################ 
      Update()
      {

            if(keyIsDown(LEFT_ARROW) == true)
            {
                  this.position.x += -PLAYER_MOVE_SPEED;
            }
            else if(keyIsDown(RIGHT_ARROW) == true)
            {
                  this.position.x += PLAYER_MOVE_SPEED;
            }

            //スペースキー
            this.isPushSpace = keyIsDown(" ".charCodeAt(0));
            if( (this.isPushSpace == true) && this.bullet.isActive == false)
            {
                  this.bullet.setEnable(new Vector(this.position.x,this.position.y));
            }



            this.bullet.Update();



      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            this.bullet.Renderer();
            
            image(this.player_sprite,this.position.x,this.position.y); //自機
      }
}

// ################################################################
// # Game
// ################################################################
class Game
{

      // ################################ コンストラクタ ################################ 
      constructor()
      {
            this.pillBox_Mng = new PillBox_Mng();
            this.enemy_Mng = new Enemy_Mng();
            this.player = new Player();
      }

      // ################################ Update ################################ 
      Update()
      {
            this.enemy_Mng.Update();
            this.player.Update();
            this.pillBox_Mng.Update();


//            this.pillBox_Mng.Collision_Player(this.player);
//            this.pillBox_Mng.Collision_Enemy(this.enemy_Mng);

            this.enemy_Mng.Collision_Bullet_Mutual(this.player);

            this.player.Collision_Bullet_Enemy(this.enemy_Mng);
            this.player.Collision_Bullet_PillBox(this.pillBox_Mng);
            this.player.Collision_Bullet_Mutual(this.enemy_Mng);

      }

      // ############################### Renderer ################################ 
      Renderer()
      {
            this.enemy_Mng.Renderer();
            this.player.Renderer();
            this.pillBox_Mng.Renderer();


      }
}

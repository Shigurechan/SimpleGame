"use strict"

const ONE_FRAME = 16.6;
const SCREEN_SIZE_WIDTH = 1000;
const SCREEN_SIZE_HEIGHT = 800;
const SCREEN_SIZE_TOP = 30;   //画面の上端

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
      StageTopSide : 1,
      PillBox : 2,
      PlayerBullet : 3,
      EnemyBullet : 4
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

//プレイヤー
const PLAYER_BULET_EXPLOSION_ANIMATION_SPEED = ONE_FRAME * 6;     //ヒットエフェクトの速度
const PLAYER_MOVE_SPEED = 4;
const PLAYER_BULLET_ANIMATION_SPEED = ONE_FRAME * 7;
const PLAYER_BULLET_SPEED = 10;
const PLAYER_BULLET_ANIMATION_SPRITE_NUM = 4;   //プレイヤー　バレットアニメーションスプライトの数
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
      constructor(bulletType,bts,bs,ps)
      {

            this.bullet_Sprite = bts;           //バレット           
            this.explosion_Sprite = bs;         //バレット同士               
            this.wallExplosion_Sprite = ps;     //トーチカヒット

            this.position = new Vector(-1,-1);              //初期座標
            this.type = bulletType;                         //バレットタイプ　エネミーまたは自機      

            //アニメーション
            this.animation_Time = 0;
            this.ansimationExplosion_Time = 0;
            this.animation_Clip = 0;

            this.isActive = false;  //アクティブかどうか？

            //当たり判定
            this.isHit_Bullet = false;
            this.isHit_Enemy = false;            
            this.isHit_StageTopSide = false;
            this.isHit_PillBox = false;


      }

      // ################################ 有効 ################################ 
      setEnable(pos)
      {
            this.isActive = true;
            this.position = new Vector(pos.x,pos.y);
            
      }

      // ################################ 無効 ################################ 
      setDisable()
      {
            this.isActive = false;
            this.position = new Vector(-1,-1);
            
      }
      
      // ################################ Update ################################ 
      Update()
      {     
            //移動
            if(this.type == CollisionType.Enemy)
            {
                  this.position.y += ENEMY_BULLET_SPEED;
            }
            else if(this.type == CollisionType.PlayerBullet)
            {
                  this.position.y += -PLAYER_BULLET_SPEED;
            }

            //アニメーション
            this.animation_Time += deltaTime;
            if( (this.animation_Time > PLAYER_BULLET_ANIMATION_SPEED))
            {
                  this.animation_Time  = 0;
                  this.animation_Clip++;

                  if(this.animation_Clip > BULLET_ANIMATION_SPRITE_NUM)
                  {
                        this.animation_Clip = 0;
                  }
            }

            //トーチカとヒットアニメーション
            if(this.isHit_PillBox == true)
            {
                  this.animationExplosion_Time += deltaTime;
                  if( (this.animationExplosion_Time > PLAYER_BULLET_ANIMATION_SPEED))
                  {
                        this.animationExplosion_Time  = 0;
                        this.isHit == false;
                  }
                  
            }
      }

      
      // ################################ 当たり判定 ################################ 
      Collision(object,type)
      {
            if(BoxCollision(new Vector(this.position.x,this.position.y), new Vector(this.size.x,this.size.y),
                  new Vector(object.position.x,object.positon.y),new Vector(object.size.x,object.size.y)) == true)
            {
                  if(type == CollisionType.EnemyBullet)
                  {
                        this.isHit_Bullet = true;
                  }
                  else if (type == CollisionType.Enemy)
                  {
                        this.isHit_Enemy = true;
                  }
                  else if (type == CollisionType.StageTopSide)
                  {
                        this.isHit_StageTopSide = true;
                  }
                  else if (type == CollisionType.PillBox)
                  {
                        this.isHit_PILLBOX = true;
                  }
            }
      }



      // ################################ Renderer ################################ 
      Renderer()
      {
            //バレットアニメーション
            if( (this.isHit_Bullet == false) && (this.isHit_Enemy == false) && (this.isHit_StageTopSide == false) && (this.isHit_PillBox == false) )
            {
                  image(this.bullet_Sprite[this.animation_Clip],this.position.x,this.position.y);
            }
            else if( (this.isHit_Bullet == true) && (this.isHit == true) )
            {
                  //バレット　ヒット
                  if(this.explosionEnemy_sprite != 0)
                  {
                       image(this.explosionPillBox_sprite,this.position.x,this.position.y);
                  }
            }
            else if( (this.isHit_PillBox == true) && (this.isHit == true) )
            {
                  //トーチカ　ヒット
                  image(this.explosionPillBox_sprite,this.position.x,this.position.y);
            }            
      }
}


// ################################################################
// # Enemy
// ################################################################
class Enemy
{
      // ################################ コンストラクタ ################################ 
      constructor(pos,sp1,sp2,ex,bullet,be,m)
      {
            this.sprite = [];
            this.sprite.push(sp1);                   //エネミー
            this.sprite.push(sp2);                   //エネミー
            this.explosion_Sprite = ex;              //破壊


            this.bullet_Sprite = bullet;              //バレット　
            this.bulletExplosion_Sprite = be;         //バレット　破壊
            this.bulletMatualExplosion_Sprite = m;    //バレット  同士

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
            this.bulletPosition = new Vector(-1,-1);
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
            /*
            # NOTE

            有効なバレットがない場合は生成する

            */

            this.randomBullet = Math.floor(random(0,1000));
            if(this.randomBullet == 0)
            {
                  let flag = false;
                  this.bulletArray.forEach(item =>
                  {
                        if(item.isActive == false)
                        {
                              flag = true;
                              item.setEnable(new Vector(this.position.x,this.position.y));
                        }                  
                  });

                  if(flag == false)
                  {
                        this.bulletArray.push(new Bullet(CollisionType.Enemy,this.bullet_Sprite,this.bulletExplosion_Sprite,this.bulletMatualExplosion_Sprite));
                        this.bulletArray[this.bulletArray.length - 1].position = new Vector(this.position.x + (ENEMY_SIZE_WIDTH / 2) ,this.position.y); //座標を設定
                  }
                  
            }
      }


      // ################################ Update ################################ 
      Update()
      {
            this.Animation();
            this.Bullet();

            this.bulletArray.forEach(item =>
            {
                  item.Update();
            });
      
      }

      // ################################ レンダリング ################################ 
      Renderer()
      {
            this.bulletArray.forEach(item =>
            {
                  item.Renderer();
            });

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
// # PillBox
// ################################################################
class PillBox
{
      // ################################ コンストラクタ ################################ 
      constructor(pos,sp)
      {

            //トーチカの形
            this.boxArray = 
            [
                  [1,2,0,0,0,0,3,1],
                  [2,0,0,0,0,0,0,3],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,1,1,0,0,0],
                  [0,0,1,1,1,1,0,0]
                  
            ];
            

            //ボックスの状態
            this.state = [];    
            for(let y = 0; y < this.boxArray.length; y++)
            {
                  for(let x = 0; x < this.boxArray[y].length; x++)      
                  {
                        this.state.push(new Vector(0,0));
                  }
            }

            



            this.sprite = sp;
            this.position = new Vector(pos.x,pos.y);
      }

      // ################################ スプライト切り替え ################################ 
      ChangeState(type,pos)
      {
            if(type == ENEMY_BULLET)
            {
                  if( this.boxState[pos.y][pos.y].x != 0)
                  {
                        this.boxState[pos.y][pos.y].x += 1;
                        return true;
                  }
            }

            return false;
      }

      // ################################ Update ################################ 
      Update()
      {

      }

      // ################################ 当たり判定 ################################ 
      Collision(type,object)
      {
            for(let y = 0; y < this.boxArray.length; y++)
            {
                  for(let x = 0; x < this.boxArray[y].length; x++)
                  {
                        /*
                        if(BoxCollision(new Vector(this.position.x + x * PILLBOX_CHIP_SIZE,this.position.x + y * PILLBOX_CHIP_SIZE),new Vector(PILLBOX_CHIP_SIZE,PILLBOX_CHIP_SIZE),
                              new Vector(object.bulletPosition.x,object.bulletPosition.y),new Vector(object.bulletSize.x,object.bulletSize.y)) == true)
                        {
                              if( ChangeState(type,new Vector(x,y)) == true)
                              {
                                    object.isBullet = false;
                              }
                              
                        }
                        */
                  }
            }
      }
      


      // ################################ Renderer ################################ 
      Renderer()
      {
            for(let y = 0; y < this.boxArray.length; y++)
            {
                  for(let x = 0; x < this.boxArray[y].length; x++)
                  {
                        if(this.boxArray[y][x] == 0)
                        {
                              image(this.sprite[0][0][0],this.position.x + x * 16,this.position.y + y * 16);
                        }

                        else if(this.boxArray[y][x] == 2)
                        {
                              image(this.sprite[1][0][0],this.position.x + x * 16,this.position.y + y * 16);
                        }

                        
                        else if(this.boxArray[y][x] == 3)
                        {
                              image(this.sprite[2][0][0],this.position.x + x * 16,this.position.y + y * 16);
                        }

                  }
            }

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
                        [ loadImage("Asset/pillbox_rect_0_1.png"),loadImage("Asset/pillbox_rect_1_1.png"),loadImage("Asset/pillbox_rect_2_1.png"),loadImage("Asset/pillbox_rect_3_1.png"),0 ],
                        [ loadImage("Asset/pillbox_rect_0_2.png"),loadImage("Asset/pillbox_rect_1_2.png"),loadImage("Asset/pillbox_rect_2_2.png"),0 ],
                        [ loadImage("Asset/pillbox_rect_0_3.png"),loadImage("Asset/pillbox_rect_1_3.png"),0 ],
                        [ loadImage("Asset/pillbox_rect_0_4.png"),loadImage("Asset/pillbox_rect_1_0.png"),loadImage("Asset/pillbox_rect_2_0.png"),loadImage("Asset/pillbox_rect_3_0.png"),loadImage("Asset/pillbox_rect_4_0.png"),0] ,
                        [0],
                  ],
                  
                  [
                        [ loadImage("Asset/pillbox_left_0_0.png"),loadImage("Asset/pillbox_left_1_0.png"),loadImage("Asset/pillbox_left_2_0.png"),0],
                        [ loadImage("Asset/pillbox_left_0_1.png"),loadImage("Asset/pillbox_left_1_1.png"),0 ],
                        [ loadImage("Asset/pillbox_left_0_2.png"),loadImage("Asset/pillbox_left_1_0.png"),loadImage("Asset/pillbox_left_2_0.png"),0],
                        [0],
                  ],

                  [
                        [ loadImage("Asset/pillbox_right_0_0.png"),loadImage("Asset/pillbox_right_1_0.png"),loadImage("Asset/pillbox_right_2_0.png"),0],
                        [ loadImage("Asset/pillbox_right_0_1.png"),loadImage("Asset/pillbox_right_1_1.png"),0 ],
                        [ loadImage("Asset/pillbox_right_0_2.png"),loadImage("Asset/pillbox_right_1_0.png"),loadImage("Asset/pillbox_right_2_0.png"),0],
                        [0],
                  ]
                  
            ]

            this.chip = [ ];

            this.setRest();   //初期化
      }


      // ################################ 初期化 ################################ 
      setRest()
      {
            this.chip.length = 0;
            this.chip.push(new PillBox(new Vector(100,100),this.sprite));
      }
      


      // ################################ Update ################################ 
      Update()
      {

      }
      
      // ################################ 当たり判定 ################################ 
      Collision(bullet,pos)
      {
            for(let y = 0; y < PILLBOX_BLOCK_HEIGHT_NUM; y++)
            {
                  for(let x = 0; x < PILLBOX_BLOCK_WIDTH_NUM; x++)
                  {
                  
                        if(BoxCollision(new Vector(this.position.x + (x * PILLBOX_SIZE),this.position.y + (y * PILLBOX_SIZE)),new Vector(PILLBOX_SIZE,PILLBOX_SIZE),
                        new Vector(bullet.bulletPosition.x,bullet.bulletPosition.y),new Vector(PLAYER_BULLET_SIZE_WIDTH,PLAYER_BULLET_SIZE_HEIGHT)) == true)
                        {
                              //ヒットエフェクト座標
                              pos.x = this.position.x + (x * PILLBOX_SIZE) + (PILLBOX_SIZE);
                              pos.y = this.position.y + (y * PILLBOX_SIZE) + (PILLBOX_SIZE / 3);
                              

                              return true;
                        }                        
                  }
            }

            return false;
      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            this.chip.forEach(item =>{ item.Renderer() });
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

      

      //エネミー破壊エフェクト
      this.explosion_Sprite = 
      [      
            loadImage('Asset/explosion_red.png'),
            loadImage('Asset/explosion_yellow.png'),
            loadImage('Asset/explosion_green.png'),
            loadImage('Asset/explosion_purple.png'),
            loadImage('Asset/explosion_blue.png'),
      ];

    
      this.bullet_Explosion_Sprite = loadImage("Asset/explosion_white.png");
      this.wall_Explosion_Sprite = loadImage("Asset/wall_explosion.png");

      //エネミーバレット
      this.bullet_Sprite = 
      [
      
            [
                  loadImage('Asset/enemy_bullet_a_1.png'),
                  loadImage('Asset/enemy_bullet_a_2.png'),
                  loadImage('Asset/enemy_bullet_a_3.png'),
                  loadImage('Asset/enemy_bullet_a_4.png')
            ],

            [
                  loadImage('Asset/enemy_bullet_b_1.png'),
                  loadImage('Asset/enemy_bullet_b_2.png'),
                  loadImage('Asset/enemy_bullet_b_3.png'),
                  loadImage('Asset/enemy_bullet_b_4.png')
            ],
            
            [
                  loadImage('Asset/enemy_bullet_c_1.png'),
                  loadImage('Asset/enemy_bullet_c_2.png'),
                  loadImage('Asset/enemy_bullet_c_3.png'),
                  loadImage('Asset/enemy_bullet_c_4.png')
            ]
            
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

      // ################################ 当たり判定 ################################ 
      Collision(player)
      {
            //エネミー判定
            this.isHit = false;
            this.isHitPillBox = false;
            this.isHitWall = false;
            this.isHitEnemy = false;

            if(player.isPushBullet == true)
            {
                  for(let i = 0; i < this.enemyArray.length; i++)
                  {
                        for(let j = 0; j < this.enemyArray[i].length; j++)
                        {
                   
                              if ( BoxCollision(this.enemyArray[i][j].position,new Vector(ENEMY_SIZE_WIDTH,ENEMY_SIZE_HEIGHT),
                              player.bulletPosition,new Vector(PLAYER_BULLET_SIZE_WIDTH,PLAYER_BULLET_SIZE_HEIGHT)) == true)
                              {

                                    if(this.enemyArray[i][j].isAlive == true)
                                    {
                                          this.enemyArray[i][j].isAlive = false;
                                          this.enemyArray[i][j].isExplosion_Animation = true;
                                          
                                          this.hitPosition = new Vector(this.enemyArray[i][j].position.x + (ENEMY_SIZE_WIDTH / 2),this.enemyArray[i][j].position.y);
                                          this.isHit = true;
                                          this.isHitEnemy = true;
                                          break;
                                    }
                              }
                        }

                        if(this.isHit == true)
                        {
                              break;
                        }
                  }
            }

            //画面の上端行ったとき
            if(player.bulletPosition.y < 30)
            {
                  this.isHitWall = true;

                  this.isHit = true;

                  this.hitPosition = new Vector(player.bulletPosition.x,player.bulletPosition.y);

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
                                    this.sprite[0][rand],this.sprite[1][rand],this.explosion_Sprite[rand],this.bullet_Sprite[0],this.bullet_Explosion_Sprite,this.wall_Explosion_Sprite);
                              }
                              break;

                              case 1:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[2][rand],this.sprite[3][rand],this.explosion_Sprite[rand],this.bullet_Sprite[0],this.bullet_Explosion_Sprite,this.wall_Explosion_Sprite);
                              }
                              break;

                              case 2:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[2][rand],this.sprite[3][rand],this.explosion_Sprite[rand],this.bullet_Sprite[1],this.bullet_Explosion_Sprite,this.wall_Explosion_Sprite);
                              }
                              break;                                                                                                                                                      
                              
                              case 3:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[4][rand],this.sprite[5][rand],this.explosion_Sprite[rand],this.bullet_Sprite[2],this.bullet_Explosion_Sprite,this.wall_Explosion_Sprite);
                              }
                              break;
                              
                              
                              case 4:
                              {
                                    this.enemyArray[y][x] = new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.sprite[4][rand],this.sprite[5][rand],this.explosion_Sprite[rand],this.bullet_Sprite[0],this.bullet_Explosion_Sprite,this.wall_Explosion_Sprite);
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
            this.player_bullet_sprite = 
            [
                  loadImage('Asset/player_bullet_1.png'),
                  loadImage('Asset/player_bullet_2.png'),
                  loadImage('Asset/player_bullet_3.png'),
                  loadImage('Asset/player_bullet_4.png')
            ];

            this.player_sprite = loadImage('Asset/player.png');                                       //自機            
            this.player_bullet_wall_explosion_sprite = loadImage('Asset/wall_explosion.png');         //壁ヒット


            //バレット
            this.bulletPosition = new Vector(-1,-1);
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

      // ################################ 攻撃 ################################ 
      Bullet()
      {

            if(this.isMoveBullet == true)
            {
                  this.bulletPosition.y += -PLAYER_BULLET_SPEED;  //移動

                  //アニメーション
                  this.bulletAnimation_Time += deltaTime;
                  if(this.bulletAnimation_Time > PLAYER_BULLET_ANIMATION_SPEED)
                  {
                        this.bulletAnimation_Clip++;
                        if(this.bulletAnimation_Clip > 3)
                        {
                              this.bulletAnimation_Clip = 0;
                        }
                        
                        this.bulletAnimation_Time = 0;
                  }
            }
            else if(this.isHitAnimation == true)
            {
                  //ヒットアニメーション
                  this.hitAnimation_Time += deltaTime;
                  if(this.hitAnimation_Time > PLAYER_BULET_EXPLOSION_ANIMATION_SPEED)
                  {
                        this.hitAnimation_Time = 0;
                        this.bulletAnimation_Time = 0;
                        this.isHitAnimation = false;
                        this.isPushBullet = false;

                        this.hitPosition = new Vector(-1,-1);     //ヒット座標を初期座標へ
                        this.bulletPosition = new Vector(-1,-1);  //ヒット座標を初期座標へ
                  }

            }
      }

      // ################################ 当たり判定 取得 ################################ 
      CheckHit(stage)
      {
            if(stage.isHit == true)
            {
                  if( (stage.isHitWall == true) || (stage.isHitPillBox == true) )
                  {
                        this.hitPosition = new Vector(stage.hitPosition.x,stage.hitPosition.y);       //ヒット座標
                        this.isHitAnimation = true;                                                   //アニメーション再生開始
                        this.isMoveBullet = false;                                                    //バレット移動停止
                  }
                  else
                  {
                        //表示なし
                        this.isMoveBullet = false;                                                    //バレット移動停止
                        this.isHitAnimation = false;                                                   //アニメーション停止

                        this.isPushBullet = false;
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
            if( (this.isPushSpace == true) && this.isPushBullet == false)
            {

                  this.isPushBullet = true;
                  this.isMoveBullet = true;
                  this.isHitAnimation = false;                                                 
            

                  this.bulletPosition = new Vector(this.position.x,this.position.y);
            }




            this.Bullet();    //バレット
      }

      // ################################ バレット　描画 ################################ 
      Renderer_Bullet()
      {
            if(this.isMoveBullet == true)
            {
                  image(this.player_bullet_sprite[this.bulletAnimation_Clip],this.bulletPosition.x,this.bulletPosition.y);
            }
            else if(this.isHitAnimation == true)
            {
                  image(this.player_bullet_wall_explosion_sprite,this.hitPosition.x - (PLAYER_BULLET_EXPLOSION_SIZE / 2),this.hitPosition.y);
            }
      }


      // ################################ Renderer ################################ 
      Renderer()
      {
            this.Renderer_Bullet(); //バレット
            
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

            this.enemy_Mng.Collision(this.player);

      }

      // ############################### Renderer ################################ 
      Renderer()
      {
            this.enemy_Mng.Renderer();
            this.player.Renderer();
            this.pillBox_Mng.Renderer();


      }
}

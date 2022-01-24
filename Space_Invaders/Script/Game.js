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

//トーチカ
const PILLBOX_NUM = 4;
const PILLBOX_BLOCK_WIDTH_NUM = 8;
const PILLBOX_BLOCK_HEIGHT_NUM = 6;
const PILLBOX_SIZE = 16;
const PILLBOX_SIZE_WIDTH = 16 * 8;
const PILLBOX_SIZE_HEIGHT = 0;
const PILLBOX_AREA_SIZE = ( (PILLBOX_NUM + 3) * PILLBOX_SIZE_WIDTH);

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
// # Enemy
// ################################################################
class Enemy
{
      constructor(en,pos,sp1,sp2,ex,bullet)
      {
            //スプライト
            this.sprite1 = sp1;
            this.sprite2 = sp2;
            this.explosion_sprite = ex;
            this.spriteNum = en;    //スプライト番号
            this.bullet_sprite = bullet;

            //破壊 アニメーション
            this.Explosion_Animation = 0;
            this.isExplosion_Animation = false;

            //バレット　アニメーション
            this.bulletAnimation_Clip = 0;
            this.bulletAnimation_Time = 0;

            this.bulletInterval_Time = 0;

            this.randomInterval  = Math.floor(random(-ENEMY_BULLET_INTERVAL_RANDOM_TIME,ENEMY_BULLET_INTERVAL_RANDOM_TIME));
            this.randomBullet = Math.floor(random(0,100));


            this.isBullet = false;              //バレットするかどうか？
            this.isBulletPosition = false;      //バレットする座標にいるかどうか？最前列かどうか？
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
            //バレットアニメーション
            if ( (this.isAlive == true) && (this.isBullet == true) )
            {
                  this.bulletAnimation_Time += deltaTime;
                  if(this.bulletAnimation_Time > ENEMY_BULLET_ANIMATION_SPEED)
                  {
                        this.bulletAnimation_Time = 0;

                        this.bulletAnimation_Clip++;

                        if(this.bulletAnimation_Clip > 3)
                        {
                              this.bulletAnimation_Clip = 0;
                        }
                  }
            }



            
            //破壊
            if( (this.isAlive == false) && (this.isExplosion_Animation == true) )
            {
                  this.Explosion_Animation += deltaTime;
                  if(this.Explosion_Animation > ENEMY_EXPLOSION_ANIMATION_SPEED)
                  {
                        this.isExplosion_Animation = false;
                        this.Explosion_Animation = 0;
                  }
            }
      }



      // ################################ Update ################################ 
      Update()
      {
            this.Animation();

            if( (this.isBullet == false) && (this.isBulletPosition == true) )
            {
                  this.bulletInterval_Time += deltaTime;
                  if( this.bulletInterval_Time > (ENEMY_BULLET_INTERVAL_TIME + this.randomInterval)  )
                  {
                        
                        this.bulletInterval_Time = 0;
                        if(this.randomBullet % 3 == 0)
                        {
                              this.randomInterval  = Math.floor(random(-ENEMY_BULLET_INTERVAL_RANDOM_TIME,ENEMY_BULLET_INTERVAL_RANDOM_TIME));

                              this.isBullet = true;
                              this.bulletPosition = new Vector(this.position.x + (ENEMY_SIZE_WIDTH / 2 ),this.position.y + ENEMY_SIZE_HEIGHT);
                        }

                        this.randomBullet  = Math.floor(random(0,100));

                  }
            }


            if(this.isBullet == true)
            {
                  this.bulletPosition.y += ENEMY_BULLET_SPEED;
                  if(this.bulletPosition.y > SCREEN_SIZE_HEIGHT - 100)
                  {
                        this.bulletPosition = new Vector(-1,-1);
                        this.isBullet = false;
                  }
            }            
      }

      // ################################ レンダリング ################################ 
      Renderer()
      {
            if(this.isAlive == true)
            {
                  //バレット
                  if(this.isBullet == true)
                  {                       
                        image(this.bullet_sprite[this.bulletAnimation_Clip],this.bulletPosition.x,this.bulletPosition.y);
                  }

                  //スプライト切り替え
                  if(this.change == false)
                  {
                        image(this.sprite1,this.position.x,this.position.y);
                  }
                  else
                  {
                        image(this.sprite2,this.position.x,this.position.y);
                  }                  
            }
            else if((this.isAlive == false) && (this.isExplosion_Animation == true) )     //破壊
            {
                  image(this.explosion_sprite,this.position.x,this.position.y);
            }
      }
}


// ################################################################
// # PillBox_Chip
// ################################################################
class PillBox_Chip
{
      // ################################ コンストラクタ ################################ 
      constructor(sp,pos)
      {
            this.sprite = sp;
            this.position = new Vector(pos.x,pos.y);
      }

      // ################################ Update ################################ 
      Update()
      {

      }

      // ################################ 当たり判定 ################################ 
      Collision(bullet)
      {

      }
      


      // ################################ Renderer ################################ 
      Renderer()
      {

      }

}

// ################################################################
// # PillBox
// ################################################################
class PillBox
{
      // ################################ コンストラクタ ################################ 
      constructor()
      {

            //トーチカの形
            this.boxArray = 
            [
                  [1,0,0,0,0,0,0,1],
                  [1,2,0,0,0,0,3,1],
                  [0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0],
                  [0,0,1,1,1,1,0,0],
                  [0,0,1,1,1,1,0,0]
                  
            ];



            
            //トーチカ
            this.sprite = 
            [
                  [
                        loadImage('Asset/pillbox_internal.png'),
                        loadImage('Asset/pillbox_internal_damage_1.png'),
                        loadImage('Asset/pillbox_internal_damage_2.png'),
                        loadImage('Asset/pillbox_internal_damage_3.png'),
                        loadImage('Asset/pillbox_internal_damage_4.png')
                  ],

                  [
                        loadImage('Asset/pillbox_left.png'),
                        loadImage('Asset/pillbox_left_damage_1.png'),
                        loadImage('Asset/pillbox_left_damage_2.png'),
                  ],

                  
                  [
                        loadImage('Asset/pillbox_right.png'),
                        loadImage('Asset/pillbox_right_damage_1.png'),
                        loadImage('Asset/pillbox_right_damage_2.png'),
                  ],

                  [
                        loadImage('Asset/pillbox_internal.png'),
                        loadImage('Asset/pillbox_bottom_damage_1.png'),
                        loadImage('Asset/pillbox_bottom_damage_2.png'),
                        loadImage('Asset/pillbox_bottom_damage_3.png'),
                        loadImage('Asset/pillbox_bottom_damage_4.png')
                  ],


            ]

            this.chip = [ ];

            this.setRest();   //初期化
      }


      // ################################ 初期化 ################################ 
      setRest()
      {
            this.chip.length = 0;
            for(let y = 0; y < PILLBOX_BLOCK_HEIGHT_NUM; y++)
            {                  
                  for(let x = 0; x < PILLBOX_BLOCK_WIDTH_NUM; x++)
                  {
                        if(this.boxArray[y][x] == 0)
                        {
                              this.chip.push(new PillBox_Chip(new Vector(x * 16 ,y * 16),this.sprite[0]));
                        }
                        else if(this.boxArray[y][x] == 2)
                        {
                              this.chip.push(new PillBox_Chip(new Vector(x * 16 ,y * 16),this.sprite[1]));
                        }
                        else if(this.boxArray[y][x] == 3)
                        {
                              this.chip.push(new PillBox_Chip(new Vector(x * 16 ,y * 16),this.sprite[2]));
                        }

                  }
            }
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
            this.pillBoxChip.forEach(item =>
            {
                  item.Renderer();
            });
      }
}



// ################################################################
// # stage
// ################################################################
class Stage
{
      // ################################ コンストラクタ ################################ 
      constructor()
      {



      //エネミー破壊エフェクト
      this.enemy_explosion_sprite = 
      [      
            loadImage('Asset/explosion_red.png'),
            loadImage('Asset/explosion_yellow.png'),
            loadImage('Asset/explosion_green.png'),
            loadImage('Asset/explosion_purple.png'),
            loadImage('Asset/explosion_blue.png'),
      ];

    


      //エネミーバレット
      this.enemy_bullet_sprite = 
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
      this.enemy_sprite = 
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
            this.pillBox = new PillBox();


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
                                    this.enemyArray[y][x] = new Enemy(0,new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.enemy_sprite[0][rand],this.enemy_sprite[1][rand],this.enemy_explosion_sprite[rand],this.enemy_bullet_sprite[0]);
                              }
                              break;

                              case 1:
                              {
                                    this.enemyArray[y][x] = new Enemy(1,new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.enemy_sprite[2][rand],this.enemy_sprite[3][rand],this.enemy_explosion_sprite[rand],this.enemy_bullet_sprite[1]);
                              }
                              break;

                              case 2:
                              {
                                    this.enemyArray[y][x] = new Enemy(2,new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.enemy_sprite[2][rand],this.enemy_sprite[3][rand],this.enemy_explosion_sprite[rand],this.enemy_bullet_sprite[1]);
                              }
                              break;                                                                                                                                                      
                              
                              case 3:
                              {
                                    this.enemyArray[y][x] = new Enemy(2,new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.enemy_sprite[4][rand],this.enemy_sprite[5][rand],this.enemy_explosion_sprite[rand],this.enemy_bullet_sprite[2]);
                              }
                              break;
                              
                              
                              case 4:
                              {
                                    this.enemyArray[y][x] = new Enemy(2,new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    this.enemy_sprite[4][rand],this.enemy_sprite[5][rand],this.enemy_explosion_sprite[rand],this.enemy_bullet_sprite[2]);
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
            
            this.enemyArray.forEach(item =>
            {
                  item.forEach(item2 =>
                  {
                        item2.Renderer();
                  });
                        
            });


            this.pillBox.forEach(item =>
            {
                  item.Renderer();
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
            this.stage = new Stage();
            this.player = new Player();
      }

      // ################################ Update ################################ 
      Update()
      {
            this.stage.Update();
            this.player.Update();

            this.stage.Collision(this.player);
            this.player.CheckHit(this.stage);

      }

      // ############################### Renderer ################################ 
      Renderer()
      {
            this.stage.Renderer();
            this.player.Renderer();

      }
}

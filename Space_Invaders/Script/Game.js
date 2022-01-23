"use strict"

const ONE_FRAME = 16.6;
const SCREEN_SIZE_WIDTH = 1000;
const SCREEN_SIZE_HEIGHT = 800;


const PLAYER_MOVE_SPEED = 4;




const MOVE_INTERVAL_TIME = ONE_FRAME * 60;
const ENEMY_SIZE_WIDTH = 48;
const ENEMY_SIZE_HEIGHT = 24;
const ENEMY_MOVE_SPEED = 20;
const DOWN_INTERVAL = 5;
const DONW_POSITION_X = 900;
const ENEMY_EXPLOSION_ANIMATION_SPEED = ONE_FRAME * 10;




const SCREEN_SIZE_TOP = 30;   //画面の上端

const PLAYER_BULET_EXPLOSION_ANIMATION_SPEED = ONE_FRAME * 10;     //ヒットエフェクトの速度

const PILLBOX_AREA_SIZE = (9 * 72);
const PILLBOX_SIZE_WIDTH = 72;

const PLAYER_BULLET_ANIMATION_SPEED = ONE_FRAME * 7;
const PLAYER_BULLET_SPEED = 10;

const PLAYER_BULLET_ANIMATION_SPRITE_NUM = 4;   //プレイヤー　バレットアニメーションスプライトの数

const PLAYER_SIZE_WIDTH = 45;
const PLAYER_SIZE_HEIGHT = 24;


const PLAYER_BULLET_WIDTH = 3;
const PLAYER_BULLET_HEIGHT = 24;

const EXPLOSION_SIZE = 48;


let enemy_sprite;


let player_sprite;
let pillbox_sprite;

let shot_1;
let shot_2;
let shot_3;
let shot_4;
let shot_5;


let enemy_explosion;


let player_bullet_explosion;
let player_bullet_wall_explosion;

/* preload /*/
function preload()
{       

      enemy_explosion = 
      [
            loadImage('Asset/explosion_red.png'),
            loadImage('Asset/explosion_green.png'),
            loadImage('Asset/explosion_purple.png'),
            loadImage('Asset/explosion_blue.png'),
            loadImage('Asset/explosion_yellow.png')           
      ]



      enemy_sprite = 
      [
            [
                  loadImage('Asset/enemy_a_red.png'),
                  loadImage('Asset/enemy_a_green.png'),
                  loadImage('Asset/enemy_a_purple.png'),
                  loadImage('Asset/enemy_a_blue.png'),
                  loadImage('Asset/enemy_a_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_a2_red.png'),
                  loadImage('Asset/enemy_a2_green.png'),
                  loadImage('Asset/enemy_a2_purple.png'),
                  loadImage('Asset/enemy_a2_blue.png'),
                  loadImage('Asset/enemy_a2_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_b_red.png'),
                  loadImage('Asset/enemy_b_green.png'),
                  loadImage('Asset/enemy_b_purple.png'),
                  loadImage('Asset/enemy_b_blue.png'),
                  loadImage('Asset/enemy_b_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_c_red.png'),
                  loadImage('Asset/enemy_c_green.png'),
                  loadImage('Asset/enemy_c_purple.png'),
                  loadImage('Asset/enemy_c_blue.png'),
                  loadImage('Asset/enemy_c_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_d_red.png'),
                  loadImage('Asset/enemy_d_green.png'),
                  loadImage('Asset/enemy_d_purple.png'),
                  loadImage('Asset/enemy_d_blue.png'),
                  loadImage('Asset/enemy_d_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_d2_red.png'),
                  loadImage('Asset/enemy_d2_green.png'),
                  loadImage('Asset/enemy_d2_purple.png'),
                  loadImage('Asset/enemy_d2_blue.png'),
                  loadImage('Asset/enemy_d2_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_e_red.png'),
                  loadImage('Asset/enemy_e_green.png'),
                  loadImage('Asset/enemy_e_purple.png'),
                  loadImage('Asset/enemy_e_blue.png'),
                  loadImage('Asset/enemy_e_yellow.png')
            ],

            [
                  loadImage('Asset/enemy_e2_red.png'),
                  loadImage('Asset/enemy_e2_green.png'),
                  loadImage('Asset/enemy_e2_purple.png'),
                  loadImage('Asset/enemy_e2_blue.png'),
                  loadImage('Asset/enemy_e2_yellow.png')
            ]
      ];

      player_sprite = loadImage('Asset/player.png');
      pillbox_sprite = loadImage('Asset/pillbox.png');


      shot_1 = loadImage('Asset/shot_1.png');
      shot_2 = loadImage('Asset/shot_2.png');
      shot_3 = loadImage('Asset/shot_3.png');
      shot_4 = loadImage('Asset/shot_4.png');
      shot_5 = loadImage('Asset/shot_5.png');
      
      player_bullet_explosion = loadImage('Asset/explotion_white.png');
      player_bullet_wall_explosion = loadImage('Asset/wall_explosion.png');

}


// ################################################################
// # Enemy
// ################################################################
class Enemy
{
      constructor(pos,sp1,sp2,ex)
      {
            //スプライト
            this.sprite1 = sp1;
            this.sprite2 = sp2;
            this.explosion_sprite = ex;


            //アニメーション
            this.Explosion_Animation = 0;
            this.isExplosion_Animation = false;

            this.change = false;          //スプライト切り替え
            this.moveReverse = false;     //移動方向
            this.isAlive = true;          //生きてるかどうか？          

            this.initPosition = new Vector(pos.x,pos.y);
            this.position = new Vector(pos.x,pos.y);
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

      // ################################ 座標　取得 ################################ 
      getPosition()
      {
            return this.position;
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
      
      // ################################ Update ################################ 
      Update()
      {
            if( (this.isAlive == false) && (this.isExplosion_Animation == true) )
            {
                  this.Explosion_Animation += deltaTime;
                  if(this.Explosion_Animation > ENEMY_EXPLOSION_ANIMATION_SPEED)
                  {
                        this.isExplosion_Animation = false;
                        this.Explosion_Animation = 0;
                  }
                  else
                  {
                        image(this.explosion_sprite,this.position.x,this.position.y);
                  }
            }
      }

      // ################################ レンダリング ################################ 
      Renderer()
      {
            if(this.isAlive == true)
            {
                  if(this.change == false)
                  {
                        image(this.sprite1,this.position.x,this.position.y);
                  }
                  else
                  {
                        image(this.sprite2,this.position.x,this.position.y);
                  }                  
            }
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

            this.position = new Vector((SCREEN_SIZE_WIDTH / 2) - (583 / 2) - 100 , (SCREEN_SIZE_HEIGHT / 2) - (164 / 2) - 200);
            this.intervalPosition = new Vector(5,5);  

            this.hitPosition = new Vector(0,0);
            this.isHit = false;

            this.move_Animation = 0;

            
            this.moveReverse = false;     //移動方向を変転

            this.enemyArray = [ ];        //エネミー
            this.setRest();               //配置をリセット　敵配列再初期化
      }

      // ################################ 当たり判定 ################################ 
      Collision(player)
      {
            this.isHit = false;
            if(player.isBullet == true)
            {
                  for(let i = 0; i < this.enemyArray.length; i++)
                  {
                        if( (this.enemyArray[i].getPosition().x < (player.bulletPosition.x + PLAYER_BULLET_WIDTH) ) && ( (this.enemyArray[i].getPosition().x + ENEMY_SIZE_WIDTH) > player.bulletPosition.x )
                        && ((this.enemyArray[i].getPosition().y + ENEMY_SIZE_HEIGHT) > player.bulletPosition.y ) && ( this.enemyArray[i].getPosition().y < (player.bulletPosition.y + PLAYER_BULLET_HEIGHT) ))
                        {
                              if(this.enemyArray[i].isAlive == true)
                              {
                                    //console.log("Hit !");
                                    this.enemyArray[i].isAlive = false;
                                    this.enemyArray[i].isExplosion_Animation = true;


                                    this.isHit = true;
                                    this.hitPosition = new Vector(this.enemyArray[i].getPosition().x + (ENEMY_SIZE_WIDTH / 2),this.enemyArray[i].getPosition().y);

                                    break;
                              }
                              else
                              {

                              }
                        }

                  }
            }
      }


      // ################################ リセット ################################ 
      setRest()
      {
            let interval = new Vector(0,0);
            this.enemyArray.lengh = 0;
            for(let y = 0; y < 5; y++)
            {
                  let rand = Math.floor(random(0,5));
                  for(let x = 0; x < 10; x++)
                  {
                        switch(y)
                        {
                              case 0:
                              {
                                    this.enemyArray.push(new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    enemy_sprite[0][rand],enemy_sprite[1][rand],enemy_explosion[rand]));
                              }
                              break;

                              case 1:
                              {
                                    this.enemyArray.push(new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    enemy_sprite[2][rand],enemy_sprite[3][rand],enemy_explosion[rand]));
                              }
                              break;

                              case 2:
                              {
                                    this.enemyArray.push(new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    enemy_sprite[4][rand],enemy_sprite[5][rand],enemy_explosion[rand]));
                              }
                              break;                                                                                                                                                      
                              
                              case 3:
                              {
                                    this.enemyArray.push(new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    enemy_sprite[6][rand],enemy_sprite[7][rand],enemy_explosion[rand]));
                              }
                              break;
                              
                              
                              case 4:
                              {
                                    this.enemyArray.push(new Enemy(new Vector(this.position.x + (x * ENEMY_SIZE_WIDTH) + interval.x ,this.position.y + (y * ENEMY_SIZE_HEIGHT) + interval.y),
                                    enemy_sprite[6][rand],enemy_sprite[7][rand],enemy_explosion[rand]));
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

            if(this.move_Animation > MOVE_INTERVAL_TIME)
            {

                  this.enemyArray.forEach(item => 
                  {
                        item.setChangeSprite();
                        if(this.moveReverse == false)
                        {
                              item.setPosition(new Vector(ENEMY_MOVE_SPEED,0));
                        }
                        else
                        {
                              item.setPosition(new Vector(-ENEMY_MOVE_SPEED,0));
                        }


                  });
                  
                  this.move_Animation = 0;
            }


            let init = false;
            this.enemyArray.forEach(item => 
            {
                  if (item.getPosition().x > DONW_POSITION_X)
                  {
                        this.moveReverse = true;
                        init = true;
                  }

                  if (item.getPosition().x < (SCREEN_SIZE_WIDTH - DONW_POSITION_X))
                  {
                        this.moveReverse = false;
                        init = true;
                  }
            });

            if(init == true)
            {
                  this.enemyArray.forEach(item =>
                  {
                        item.setPosition(new Vector(0,DOWN_INTERVAL));

                        if(this.moveReverse == false)
                        {
                              item.setPosition(new Vector(ENEMY_MOVE_SPEED,0));
                        }
                        else
                        {
                              item.setPosition(new Vector(-ENEMY_MOVE_SPEED,0));
                        }

                  });
            }



      }


      // ################################ Update ################################ 
      Update()
      {
            this.MovePosition();

            this.enemyArray.forEach(item =>
            {
                  item.Update();
            });
      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            this.enemyArray.forEach(element => 
            {
                  element.Renderer();
            });
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
            this.time = 0;
            this.t = 0;
      }

      
      // ################################ Collision ################################ 
      Collision(enemy)
      {

      }


      // ################################ Update ################################ 
      Update()
      {

      }

      // ################################ Renderer ################################ 
      Renderer()
      {
            image(pillbox_sprite,(SCREEN_SIZE_WIDTH / 2) - (PILLBOX_AREA_SIZE / 2) + (1 * PILLBOX_SIZE_WIDTH),SCREEN_SIZE_HEIGHT / 2 + 100);
            image(pillbox_sprite,(SCREEN_SIZE_WIDTH / 2) - (PILLBOX_AREA_SIZE / 2) + (3 * PILLBOX_SIZE_WIDTH),SCREEN_SIZE_HEIGHT / 2 + 100);
            image(pillbox_sprite,(SCREEN_SIZE_WIDTH / 2) - (PILLBOX_AREA_SIZE / 2) + (5 * PILLBOX_SIZE_WIDTH),SCREEN_SIZE_HEIGHT / 2 + 100);
            image(pillbox_sprite,(SCREEN_SIZE_WIDTH / 2) - (PILLBOX_AREA_SIZE / 2) + (7 * PILLBOX_SIZE_WIDTH),SCREEN_SIZE_HEIGHT / 2 + 100);
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
            //バレット
            this.isBullet = false;
            this.isHitAnimation = false;
            this.isBulletStart = true;
            this.isHitWall = false;
            this.bullet_Animation = 0;
            this.bulletExplosion_Animation = 0;
            this.bulletSpriteNum = 0;
            this.bulletPosition = new Vector(-1,-1);
            this.hitPosition = new Vector(-1,-1);

            this.isPushSpace = false;
            this.position = new Vector((SCREEN_SIZE_WIDTH / 2) - 7,SCREEN_SIZE_HEIGHT / 2 + 300);
      }

      // ################################ 攻撃 ################################ 
      Bullet()
      {
            if(this.isBullet == true)
            {
                  this.bullet_Animation += deltaTime;
                  if(this.bullet_Animation > PLAYER_BULLET_ANIMATION_SPEED )
                  {
                        this.bullet_Animation = 0;
                        this.bulletSpriteNum++;
                        if(this.bulletSpriteNum > PLAYER_BULLET_ANIMATION_SPRITE_NUM)
                        {
                              this.bulletSpriteNum = 0;
                        }
                  }

                  //最初のフレーム初期座標を設定
                  if(this.isBulletStart == true)
                  {
                        this.bulletPosition = new Vector(this.position.x + (PLAYER_SIZE_WIDTH / 2) ,this.position.y);
                       this.isBulletStart = false; 
                  }
       
                  //画面の上端に当たったらアニメーションを再生
                  if(this.bulletPosition.y < ( SCREEN_SIZE_TOP ) )
                  {
                        this.isHitWall = true;
                        this.isHitAnimation = true;
                        this.hitPosition = new Vector(this.bulletPosition.x,this.bulletPosition.y);
                  }


                  if(this.isHitAnimation == false)
                  {
                        this.bulletPosition.y += - PLAYER_BULLET_SPEED;
                  }

            }
      }

      // ################################ 当たり判定 取得 ################################ 
      CheckHit(stage)
      {
            if(stage.isHit == true)
            {
                  this.hitPosition = stage.hitPosition;
                  this.isHitAnimation = true;
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
            if( (this.isPushSpace == true) && (this.isBullet == false) )
            {
                  this.isHoldPushSpace = true;
                  this.isBullet = true;
            }


            this.Bullet();    //バレット
      }

      // ################################ バレット　描画 ################################ 
      Renderer_Bullet()
      {
            if(this.isBullet == true )
            {
                  if(this.isHitAnimation == false)
                  {
                        switch(this.bulletSpriteNum)
                        {
                              case 0:
                              {
                                    image(shot_1,this.bulletPosition.x,this.bulletPosition.y);
                              }
                              break;

                              case 1:
                              {
                                    image(shot_2,this.bulletPosition.x,this.bulletPosition.y);
                              }
                              break;

                              case 2:
                              {
                                    image(shot_3,this.bulletPosition.x,this.bulletPosition.y);
                              }
                              break;

                              case 3:
                              {
                                    image(shot_4,this.bulletPosition.x,this.bulletPosition.y);
                              }
                              break;

                              case 4:
                              {
                                    image(shot_5,this.bulletPosition.x,this.bulletPosition.y);
                              }
                              break;
                        }
                  }
                  else
                  {
                        this.bulletExplosion_Animation += deltaTime;
                        if( this.bulletExplosion_Animation > PLAYER_BULET_EXPLOSION_ANIMATION_SPEED )
                        {
                              this.isBullet = false;
                              this.isHitAnimation = false;
                              this.bulletExplosion_Animation = 0;
                              this.isBulletStart = true;
                        }
                        else
                        {
                              //壁と当たったとき
                              if(this.isHitWall == true)
                              {
                                    image(player_bullet_wall_explosion,this.hitPosition.x - (EXPLOSION_SIZE / 2),this.hitPosition.y);
                              }
                        }

                  }
                  
            }
      }


      // ################################ Renderer ################################ 
      Renderer()
      {
            this.Renderer_Bullet(); //バレット
            
            //デバッグ
            
            image(player_sprite,this.position.x,this.position.y); //自機
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
            this.pillBox = new PillBox();
      }

      // ################################ Update ################################ 
      Update()
      {
            this.stage.Update();
            this.player.Update();
            this.pillBox.Update();

            this.stage.Collision(this.player);
            this.pillBox.Collision(this.stage.enemyArray);
            this.player.CheckHit(this.stage);

      }

      // ############################### Renderer ################################ 
      Renderer()
      {
            this.stage.Renderer();
            this.player.Renderer();
            this.pillBox.Renderer();

      }
}

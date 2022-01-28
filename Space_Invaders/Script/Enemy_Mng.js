"user strict"

//エネミー
const ENEMY_LIST_HEIGHT = 5;
const ENEMY_LIST_WIDTH = 10;
const ENEMY_SIZE_HEIGHT = 24;
const ENEMY_SIZE_WIDTH = 48;
const ENEMY_MOVE_SPEED = 20;
const ENEMY_MOVE_INTERVAL_TIME = 16.6 * 60;
const ENEMY_DOWN_INTERVAL = 5;
const ENEMY_POSITION_X = 900;
const ENEMY_EXPLOSION_ANIMATION_SPEED = 16.6 * 10;
const ENEMY_BULLET_SPEED = 4;                                     //バレットスピード
const ENEMY_BULLET_INTERVAL_TIME = 1000;                          //バレット発射間隔
const ENEMY_BULLET_INTERVAL_RANDOM_TIME = 500;                    //乱数で間隔を調整
const ENEMY_BULLET_ANIMATION_SPEED = 15;                         //アニメーション速度
const ENEMY_BULLET_A = 0;
const ENEMY_BULLET_B = 1;
const ENEMY_BULLET_C = 2;
const ENEMY_BULLET = 3;


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
// # Enemy_Mng
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
                              break;
                        }
                  }     
            }
      }

      
      // ################################ バレットとトーチカとの当たり判定 ################################ 
      Collision_Bullet_PillBox(pillBox_Mng)
      {
            for(let i = 0; i < pillBox_Mng.box.length; i++)
            {
                  for(let j = 0; j < pillBox_Mng.box[i].chip.length; j++)
                  {
                        for(let y = 0; y < this.enemyArray.length; y++)
                        {
                              for(let x = 0; x < this.enemyArray[y].length; x++)
                              {
                                    if(pillBox_Mng.box[i].chip[j].isActive == true)
                                    {
                                          this.enemyArray[y][x].bullet.Collision(CollisionType.EnemyBullet,CollisionType.PillBox,pillBox_Mng.box[i].chip[j].position,pillBox_Mng.box[i].chip[j].size);
                                    }
                              }     
                        }
                  }
            }
      }


      // ################################ エネミーとプレイヤーバレットとの当たり判定 ################################ 
      Collision_Bullet_Player(player)
      {
            for(let y = 0; y < this.enemyArray.length; y++)
            {
                  for(let x = 0; x < this.enemyArray[y].length; x++)
                  {
                        this.enemyArray[y][x].Collision(player.bullet);
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

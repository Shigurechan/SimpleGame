"use strict"

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
                        if(pillBox_Mng.box[i].chip[j].isActive == true) 
                        {         
                              if ( this.bullet.Collision(CollisionType.PlayerBullet,CollisionType.PillBox,pillBox_Mng.box[i].chip[j].position,pillBox_Mng.box[i].chip[j].size) == true)
                              {
                                    break;
                              }
                        }
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

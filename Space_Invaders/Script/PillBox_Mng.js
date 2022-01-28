"use strict"


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
            this.isActive = true;
      }

      // ################################ ダメージ　設定 ################################ 
      setDamage(type)
      {
            if(type == CollisionType.PlayerBullet)
            {
                  if(this.spritePosition.y < 5)
                  {
                        this.spritePosition.y++;
                        if(this.spritePosition.y > 4)
                        {
                              this.isActive = false;
                        }
                  }
                  
            }
            else if(type == CollisionType.EnemyBullet)
            {

                  if(this.spritePosition.x < 5)
                  {
                        this.spritePosition.x++;
                        if(this.spritePosition.x > 4)
                        {
                              this.isActive = false;
                        }
                  }

            }
      }
      

      // ################################ 当たり判定 ################################ 
      Collision(type,bullet)
      {
            if( (BoxCollision( new Vector(bullet.position.x,bullet.position.y), new Vector(bullet.size.x,bullet.size.y),
            new Vector(this.position.x,this.position.y), new Vector(this.size.x,this.size.y)) == true) && (bullet.isAnimation == false))
            {
                  if(this.isActive == true)
                  {
                        this.setDamage(type);   //スプライト切り替え
                        return true;
                  }
                  else
                  {
                        console.log("ｑｑｑ");
                        return false;
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
            for(let i = 0; i < this.chip.length; i++)
            {
                  if(this.chip[i].Collision(type,bullet) == true)
                  {
                        return true;
                  }
            }


            return false;
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
      Collision_Bullet_Enemy(enemy_Mng)
      {
            for(let y = 0; y < enemy_Mng.enemyArray.length; y++)
            {
                  for(let x = 0; x < enemy_Mng.enemyArray[y].length; x++)
                  {
                        for(let i = 0; i < this.box.length; i++)
                        {
                              if ( this.box[i].Collision(CollisionType.EnemyBullet,enemy_Mng.enemyArray[y][x].bullet) == true )
                              {
                                    break;
                              }
                        }                        
                  }
            }
      }

      // ################################ プレイヤーバレット　当たり判定 ################################ 
      Collision_Bullet_Player(player)
      {
            let b = false;
            for(let i = 0; i < this.box.length; i++)
            {
                  for(let j = 0; j < this.box[i].chip.length; j++)
                  {
                        if(this.box[i].chip[j].Collision(CollisionType.PlayerBullet,player.bullet) == true)
                        {
                              b = true;
                              break;
                        }
                        
                  }

                  if(b == true)
                  {
                        break;
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


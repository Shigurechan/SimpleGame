"use strict"





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



            this.pillBox_Mng.Collision_Bullet_Enemy(this.enemy_Mng);
            this.pillBox_Mng.Collision_Bullet_Player(this.player);


            this.enemy_Mng.Collision_Bullet_Mutual(this.player);
            this.enemy_Mng.Collision_Bullet_Player(this.player);
            this.enemy_Mng.Collision_Bullet_PillBox(this.pillBox_Mng);

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

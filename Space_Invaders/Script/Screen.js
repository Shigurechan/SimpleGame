
const ONE_FRAME = 16.6;
const SCREEN_SIZE_WIDTH = 1000;
const SCREEN_SIZE_HEIGHT = 800;
const SCREEN_SIZE_TOP = 30;   //画面の上端
const SCREEN_SIZE_BOTTOM = SCREEN_SIZE_HEIGHT - 100;   //画面の上端

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

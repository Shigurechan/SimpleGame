
const PI = 3.14159;           //円周率
const sinSpeed = PI / 100.0;  //sin波　加算
const speed = 10;             //移動速度

//ベクトルの引き算　
//引数　Vector型
function VectorSub(a,b)
{
      let xx = a.x - b.x;
      let yy = a.y - b.y;

      return new Vector(xx,yy);
}



function Range(a,b)
{
      return sqrt((a.x * a.x) + (b.y * b.y));
}




//ベクター
class Vector
{
      add(other)
      {
            console.assert(other instanceof Vector);

            return new Vector(this.x + other.x,this.y + other.y);
      }


      constructor(xx,yy)
      {
            this.x = xx;
            this.y = yy;
      }    
}


//線分
class LineSegment
{
      constructor(a,b)
      {
            this.start = new Vector(a.x,a.y);
            this.end = new Vector(b.x,b.y);           
      }
}

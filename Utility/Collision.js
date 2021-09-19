
class Collision
{
      //円と円の当たり判定 引数　Vector型、半径float 
      static Circle(a,ar,b,br)
      {
            let aa = new Vector(0,0);

            aa.x = abs(b.x - a.x);
            aa.y = abs(b.y - a.y);

            let d = sqrt((aa.x * aa.x) + (aa.y * aa.y));

            if(d < (ar + br))
            {
                  return true;
            }
            else
            {
                  return false;
            }
      }

      //外積
      static cross(a,b)
      {
            let n = (a.x * b.y) - (b.x * a.y);

            return n;
      }

      //線分と線分の当たり判定　LineSegment型
      static LineSegment(a,b)
      {
            let aa = this.cross(VectorSub(a.end,a.start),VectorSub(b.start,a.start));
            let bb = this.cross(VectorSub(a.end,a.start),VectorSub(b.end,a.start));

            if(aa * bb <= 0)
            {
                        
                  let cc = this.cross(VectorSub(b.end,b.start),VectorSub(a.start,b.start));
                  let dd = this.cross(VectorSub(b.end,b.start),VectorSub(a.end,b.start));


                  if( cc * dd <= 0)
                  {
                        return true;
                  }else
                  {
                        return false;
                  }
            }
            else
            {
                  return false;
            }
      }

      //矩形の当たり判定
      static Rectangle(posA,sizeA,posB,sizeB)
      {
            if( (((posA.x + sizeA.x) > posB.x ) && ((posB.x + sizeB.x) > posA.x )) &&
            (((posA.y + sizeA.y) > posB.y ) && ((posB.y + sizeB.y) > posA.y )))
            {
                  return true;
            }
            else
            {
                  return false;
            }
      }



}
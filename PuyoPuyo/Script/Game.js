"use strict"

const PUYO_SIZE = 25;   //ぷよサイズ
const WALL = 5;         //壁カラー
let None;         //なしマス

const STAGE_HEIGHT = 19;
const STAGE_WIDTH = 12;

//マス目
let board = 
[
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],

    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],

    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],

    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,0,0,0,0,0,0,0,0,0,0,WALL],
    [WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL,WALL],
];



let puyo =
[
    [0,0],
    [0,0]
];

let colorType = new Array(2);



// ################################################################
// # ステージ
// ################################################################
class Stage
{
    constructor()
    {
        None = color(0,0,0);
        for(let y = 0; y < STAGE_HEIGHT; y++)
        {
            for(let x = 0; x < STAGE_WIDTH; x++)
            {
                if( board[y][x] != WALL)
                {
                    board[y][x] = None;
                }

            }
        }
    }




    Update()
    {

    }

    setPuyo(puyo)
    {
        for(let i = 0; i < board.length; i++)
        {
            for(let j = 0; j <board[i].length; j++)
            {

                if(board[i][j] == WALL)
                {
                    fill(255,255,255);
                    rect(j * PUYO_SIZE,i * PUYO_SIZE,PUYO_SIZE ,PUYO_SIZE);
                }
            }
        }

    }


    Renderer()
    {
        for(let y = 0; y < board.length; y++)
        {
            for(let x = 0; x <board[y].length; x++)
            {
                if(board[y][x] == WALL)
                {
                    fill(255,255,255);
                    rect(x * PUYO_SIZE,y * PUYO_SIZE,PUYO_SIZE ,PUYO_SIZE);
                }
                else
                {
                    fill(board[y][x]);
                    rect(x * PUYO_SIZE,y * PUYO_SIZE,PUYO_SIZE ,PUYO_SIZE);

                }



            }
        }
    }

}

// ################################################################
// # 操作
// ################################################################
class Control
{

    //　ぷよを設定
    setPuyo()
    {
        
        //switch(Math.floor(random(0,5)))
        switch(0)
        {
            //赤
            case 0:
                {
                    colorType[0] = color(255,0,0);
                }
            break;

            //青
            case 1:
                {
                    colorType[0] = color(24,235,249);
                }
            break;

            //黄色
            case 2:
                {
                    colorType[0] = color(255,255,0);
                }
            break;
            
            //緑
            case 3:
                {
                    colorType[0] = color(0,528,0);
                }
            break;

            //紫
            case 4:
                {
                    colorType[0] = color(192,48,192);
                }
            break;

            default:
                {
                    console.log("colorType" + colorType);
                }            
        }


        //switch(Math.floor(random(0,5)))
        switch(0)
        {
            //赤
            case 0:
                {
                    colorType[1] = color(255,0,0);
                }
            break;

            //青
            case 1:
                {
                    colorType[1] = color(24,235,249);
                }
            break;

            //黄色
            case 2:
                {
                    colorType[1] = color(255,255,0);
                }
            break;
         
            //緑
            case 3:
                {
                    colorType[1] = color(0,528,0);
                }
            break;

            //紫
            case 4:
                {
                    colorType[1] = color(192,48,192);
                }
            break;

            default:
                {
                    console.log("colorType" + colorType);
                }            
        }

//        console.log(colorType.toString());
//        console.log(None.toString());
/////////////////////////////////////////////////////////////////////////////
        puyo[0][0] = None;
        puyo[0][1] = None;
        puyo[1][0] = None;
        puyo[1][1] = None;

        puyo[0][0] = colorType[0];
        puyo[0][1] = None;
        puyo[1][0] = colorType[1];
        puyo[1][1] = None;
        
//////////////////////////////////////////////////////////////////////////////
/*
console.log(puyo[0][0].toString());
console.log(puyo[0][1].toString());
console.log(puyo[1][0].toString());
console.log(puyo[1][1].toString());
console.log("");
console.log("");
*/


//        console.log(puyo[0][1].toString());

    }


    //座標を初期化
    Reset()
    {
        this.position = new Vector(6,1);
    }


    
    constructor()
    {
        this.position = new Vector(6,1);
        this.press = false;
        this.pressSpace = false;
        this.downSpeed = 200;
        this.time  = 0;
        this.rotate = 0;
        this.sideCollision = false;
        this.comboArray = new Array(0); //コンボ
        this.comboList = new Array(0);
        this.comboHistory = new Array(0);   //一時変数　コンボ履歴
        this.comboFirst = true;
        this.comboColor;
        this.combo  = new Array(0);

        this.setPuyo();

    }

    setStage()
    {
        for(let yy = 0; yy < 2; yy++)
        {
            for(let xx = 0; xx < 2; xx++)
            {
                if(puyo[yy][xx] != 0)
                {
//                    console.log( "あああ "  + puyo[yy][xx]);
                    board[this.position.y + yy - 2][this.position.x + xx - 1] = puyo[yy][xx];
                }
            } 
        }
    }

    // ################################ 連鎖対象のぷよ判定 ################################ 
    isComboList(pos)
    {
        for(let i = 0; i < this.comboHistory.length; i++)
        {
            if(this.comboHistory[i].x == pos.x && this.comboHistory[i].y == pos.y)
            {

                return true;
            }
            
//            console.log("isComboList:   "+ this.comboHistory[i].x + " , " +  this.comboHistory[i].y);
            
        }

        return false;
    }




    // ################################ 連鎖判定 ################################ 
    ComboCheck(pos,puyoColor)
    {
        if(this.comboFirst == true)
        {
            this.comboHistory.push(new Vector(pos.x,pos.y));
            this.comboFirst = false;
        }

        if(board[pos.y + 1][pos.x].toString() == puyoColor.toString())    //Down
        {
            if ( this.isComboList(new Vector(pos.x,pos.y + 1)) == false )
            {
                this.p = new Vector(pos.x,pos.y + 1);
                this.comboArray.push(new Vector(pos.x,pos.y + 1));
                this.comboHistory.push(new Vector(pos.x,pos.y + 1));
//                console.log("Down   " + (this.p.x) + " , " + (this.p.y));

                this.ComboCheck(this.p,puyoColor);
            }
        }

        if(board[pos.y - 1][pos.x].toString() == puyoColor.toString())   //Up
        {
            if ( this.isComboList(new Vector(pos.x,pos.y - 1)) == false )
            {
//                console.log("Up     " + (pos.x) + " , " + (pos.y - 1));

                this.p = new Vector(pos.x,pos.y - 1);
                this.comboArray.push(new Vector(pos.x,pos.y - 1));
                this.comboHistory.push(new Vector(pos.x,pos.y - 1));
                
                this.ComboCheck(this.p,puyoColor);                
            }
        }
  
        if(board[pos.y][pos.x + 1].toString() == puyoColor.toString())   //Right
        {
            if ( this.isComboList(new Vector(pos.x + 1,pos.y)) == false )
            {
//                console.log("Right      " + (pos.x + 1) + " , " + (pos.y));

                this.p = new Vector(pos.x + 1,pos.y);
                this.comboArray.push(new Vector(pos.x + 1,pos.y));
                this.comboHistory.push(new Vector(pos.x + 1,pos.y));
                
                this.ComboCheck(this.p,puyoColor);                
            }
        }
        
        if(board[pos.y][pos.x - 1].toString() == puyoColor.toString())   //Left
        {
            if ( this.isComboList(new Vector(pos.x - 1,pos.y)) == false )
            {
//                console.log("Left       " + (pos.x - 1) + " , " + (pos.y));

                this.p = new Vector(pos.x - 1,pos.y);
                this.comboArray.push(new Vector(pos.x - 1,pos.y));
                this.comboHistory.push(new Vector(pos.x - 1,pos.y));
                
                this.ComboCheck(this.p,puyoColor);                
            }
        }        
    }

    Clear()
    {
        this.comboHistory.length = 0;

        for(let y = 0; y < STAGE_HEIGHT; y++)
        {
            for(let x = 0; x < STAGE_WIDTH; x++)
            {
                if( (board[y][x] != WALL) && (board[y][x] != None) )
                {

                    this.comboArray.push(new Vector(x,y));

                    this.ComboCheck(new Vector(x,y),board[y][x]);

                    //連鎖配列に代入
                    if(this.comboArray.length  > 3)
                    {
                        console.log("削除 !");
                        this.comboArray.forEach((item) =>
                        {
                            this.combo.push(item);
                        })
                    }

                    this.comboFirst = true;
                    this.comboArray.length = 0;

                    
                }
            }        
        }
        this.comboArray.length = 0;

        //コンボしたブロックを削除
        for(let i = 0; i < this.combo.length; i++)
        {
            board[this.combo[i].y][this.combo[i].x] = None;
        }

        this.combo.length = 0;
        
    }

    Move()
    {
         
        //落下
        this.time += deltaTime;
        if(this.time > this.downSpeed)
        { 
            this.time = 0;
            this.position.y += 1;

            if(this.Collision() != None)
            {
                this.setStage();
                this.Reset();

                this.Clear();   //ぷよを消す




            }
        }

        /*
        console.log(puyo[0][0].toString());
        console.log(puyo[0][1].toString());
        console.log(puyo[1][0].toString());
        console.log(puyo[1][1].toString());
        console.log("");
        console.log("");
        */


        
    // ################################ 回転 ################################ 
        if( keyIsDown(" ".charCodeAt(0)) && (this.pressSpace == false) )
        {

            this.rotate += 1.0;
            if(this.rotate > 3.0)
            {
                this.rotate = 0.0;
            }

            this.pressSpace = true;

            this.puyo_temp = [[0,0],[0,0]]; //一時変数

            for(let y = 0; y < 2; y++)
            {
                for(let x = 0; x < 2; x++)
                {
                    if(puyo[y][x].toString() != None.toString())
                    {
                        let xx = (cos( (PI / 2.0) * this.rotate) * (x - 0.5)) + (-sin( (PI / 2.0) * this.rotate) * (y - 0.5));
                        let yy = (sin( (PI / 2.0) * this.rotate) * (x - 0.5)) + ( cos( (PI / 2.0) * this.rotate) * (y - 0.5));
                        

                        if ( puyo[y][x].toString() == colorType[0].toString())
                        {
                            this.puyo_temp[Math.round(yy + 0.5)][Math.round((xx + 0.5))] = colorType[0];
                        }
                        else if ( puyo[y][x].toString() == colorType[1].toString())
                        {
                            this.puyo_temp[Math.round(yy + 0.5)][Math.round((xx + 0.5))] = colorType[1];
                        }

                    }
                }
            }





            console.log("");
            console.log("");
            console.log("");

            for(let y = 0; y < 2; y++)
            {
                for(let x = 0; x < 2; x++)
                {
                    if(this.puyo_temp[y][x].toString() != 0)
                    {
                        puyo[y][x] = this.puyo_temp[y][x].toString();
                    }
                    else
                    {
                        puyo[y][x] = None;
                    }
                }
            }


            console.log(puyo[0][0] + " , " + puyo[0][1]);
            console.log(puyo[1][0] + " , " + puyo[1][1]);


        }
        else if(keyIsDown(" ".charCodeAt(0)) == false)
        {
            this.pressSpace = false;
        }

        //左右移動
        if(keyIsDown(LEFT_ARROW) && (this.press == false) )
        {
            this.position.x += -1;
            if(this.Collision() == WALL)
            {
                this.position.x += 1;
            }
           
            this.press = true;
        }
        else if(keyIsDown(RIGHT_ARROW) && (this.press == false) )
        {
            this.position.x += 1;
            if(this.Collision() == WALL)
            {
                this.position.x += -1;
            }
            
            this.press = true;
        }

        if( (keyIsDown(LEFT_ARROW) == false) && (keyIsDown(RIGHT_ARROW) == false) )
        {
            this.press = false;
        }
       





            
    }
    
    //当たり判定
    Collision()
    {        
        for(let y = 0; y < 2; y++)
        {
            for(let x = 0; x < 2; x++)
            {
                if(puyo[y][x] != 0)
                {
                    if(board[this.position.y + y][this.position.x + x - 1] != 0)
                    {
                        return board[this.position.y + y][this.position.x + x - 1];
                    }
                }
            }
        }        

        return None;
    }

    Update()
    {
        this.Move();
        
    }


    getPosition()
    {
        return this.position;
    }


    Renderer()
    {
        for(let y = 0; y < 2; y++)
        {
            for(let x = 0; x < 2; x++)
            {

                if(puyo[y][x].toString() != None.toString())
                {
          //      console.log( x + " , "+ y + "       " + puyo[y][x]);


                    fill(puyo[y][x]);
                    this.pos = new Vector(0,0);
                    
                    this.pos.x = (this.position.x * PUYO_SIZE) + (PUYO_SIZE * x);
                    this.pos.y = (this.position.y * PUYO_SIZE) + (PUYO_SIZE * y);
                
                    circle(this.pos.x - (PUYO_SIZE / 2),this.pos.y - (PUYO_SIZE / 2),PUYO_SIZE);

//                    console.log(this.position.x * PUYO_SIZE / PUYO_SIZE);
                }
            }
        }

        //console.log("");
        //console.log("");
    }


}


// ################################################################
// # ループ
// ################################################################
class Game
{
    

    constructor()
    { 
        this.stage = new Stage();

        this.control = new Control();
    }

    Update()
    {
        this.control.Update();

    }

    Renderer()
    {
        this.stage.Renderer();
        this.control.Renderer();


//        fill(0,255,0);
//        rect(PUYO_SIZE * 5,PUYO_SIZE * 16, PUYO_SIZE);
    
    }    
}
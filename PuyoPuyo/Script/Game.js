"use strict"

const PUYO_SIZE = 25;   //ぷよサイズ


//マス目
let board = 
[
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,0,0,0,0,0,0,0,0,0,0,5],
    [5,5,5,5,5,5,5,5,5,5,5,5],
];

const WALL = 5;

// ################################################################
// # ステージ
// ################################################################
class Stage
{
    constructor()
    {

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
//        console.log("あああ" + board.length);

        for(let i = 0; i < board.length; i++)
        {
            for(let j = 0; j <board[i].length; j++)
            {
//                console.log("あああ\n");
                if(board[i][j] == WALL)
                {
                    fill(255,255,255);
                    rect(j * PUYO_SIZE,i * PUYO_SIZE,PUYO_SIZE ,PUYO_SIZE);
                }
            }
        }




    }

}

// ################################################################
// # ぷよ
// ################################################################
class Puyo
{
    
    getColor(rand)
    {


    }

    constructor()
    {        
        this.colorType = Math.floor(random(0,5));   //種類 
        this.position = new Vector(0,0);            //座標   
    }

    setPosition(pos)
    {
        this.position = pos;
    }

    getPosition()
    {
        return this.position;
    }

    Renderer() 
    {
        //色
        switch(this.colorType)
        {
            //赤
            case 0:
                {
                    fill(255,0,0);
                }
            break;

            //青
            case 1:
                {
                    fill(24,235,249);
                }
            break;


            //黄色
            case 2:
                {
                    fill(255,255,0);
                }
            break;

            
            //緑
            case 3:
                {
                    fill(0,528,0);
                }
            break;

            //紫
            case 4:
                {
                    fill(0,0,528);
                }
            break;

            default:
                {
                    console.log(this.colorType);
                }

        }

//        noStroke();

        circle(this.position.x * PUYO_SIZE,this.position.y * PUYO_SIZE,PUYO_SIZE);
    }
}

// ################################################################
// # 操作
// ################################################################
class Control
{

    constructor()
    {
        this.position = new Vector(6,1);
        this.press = false;
        this.pressSpace = false;

        this.downSpeed = 200;
        this.time  = 0;
    }

    //座標を初期化
    ResetPosition()
    {
        this.position = new Vector(6,1);
    }


    Move()
    {
        //スペースキー
        if(keyIsDown(" ".charCodeAt(0)) && (this.pressSpace == false) )
        {
            this.pressSpace = true;

            console.log("あああ");
        }
        else if(keyIsDown(" ".charCodeAt(0)) == false)
        {
            this.pressSpace = false;
        }

        //左右移動
        if(keyIsDown(LEFT_ARROW) && (this.press == false) )
        {
            this.position.x += -1;
            this.press = true;
        }
        else if(keyIsDown(RIGHT_ARROW) && (this.press == false) )
        {
            this.position.x += 1;
            this.press = true;
        }

        if( (keyIsDown(LEFT_ARROW) == false) && (keyIsDown(RIGHT_ARROW) == false) )
        {
            this.press = false;
        }
        
        //落下
        this.time += deltaTime;
        if(this.time > this.downSpeed)
        {
            this.time = 0;
            this.position.y += 1;
        }
            
    }
    
    Collision()
    {
        for(let i = 0; i < board.length; i++)
        {
            for(let j = 0; j <board[i].length; j++)
            {
                if(board[i][j] != 0)
                {
                    
                }
            }
        }
        
    }



    Update()
    {
        this.Move();
        this.Collision();
    }


    getPosition()
    {
        return this.position;
    }

}

// ################################################################
// # ぷよぷよ
// ################################################################
class PuyoPuyo
{
    constructor()
    {
        this.position = new Vector(0,0);
        this.type = Math.floor(random(0,2));
        this.puyo;

        if(this.type == 0)
        {
            this.puyo = new Array(new Puyo,new Puyo); 
        }
        else
        {
            this.puyo = new Array(new Puyo,new Puyo,new Puyo,new Puyo); 
        }
    }

    setPosition(pos)
    {
        this.position = pos;
    }

    Update()
    {
        if(this.type == 0)
        {

            this.puyo[0].setPosition(this.position);
            this.puyo[1].setPosition(this.position.add(new Vector(0,1)));
        }
        else
        {
            this.puyo[0].setPosition(this.position);
            this.puyo[1].setPosition(this.position.add(new Vector(0,1)));
            this.puyo[2].setPosition(this.position.add(new Vector(1,1)));
            this.puyo[3].setPosition(this.position.add(new Vector(1,2)));
        }      


        //console.log(this.puyo[0].getPosition().x);

    }

    Renderer()
    {
        this.puyo.forEach(function(item) 
        {
            item.Renderer();    
        })
    }
}

// ################################################################
// # ループ
// ################################################################
class Game
{
    

    constructor()
    { 
        this.puyo = new PuyoPuyo();
        this.control = new Control();
        this.stage = new Stage();
    }

    Update()
    {
        this.control.Update();
        this.puyo.Update();

        this.puyo.setPosition(this.control.getPosition());
        this.stage.setPuyo(this.puyo);
    }

    Renderer()
    {
        this.puyo.Renderer();
        this.stage.Renderer();
    }    
}
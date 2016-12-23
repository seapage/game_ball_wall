function Ball(pos_x, pos_y, dir_x, dir_y, object){
    
    this.obj = object;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.dir_x = dir_x;
    this.dir_y = dir_y;
    
    this.reset_pos_x = pos_x;
    this.reset_pos_y = pos_y;
    this.reset_dir_x = dir_x;
    this.reset_dir_y = dir_y;
    
    
    
    this.reset = function reset()
        {
                this.pos_x = this.reset_pos_x;
                this.pos_y = this.reset_pos_y;
                this.dir_x = this.reset_dir_x;
                this.dir_y = this.reset_dir_y;
        }
    this.move = function move()
        {
            this.pos_x = this.pos_x+this.dir_x;
            this.pos_y = this.pos_y+this.dir_y;
            
            if(this.pos_x+this.obj.offsetWidth >= window.innerWidth)
            {
                this.dir_x *= -1;
            }
            if(this.pos_y+this.obj.offsetHeight >= window.innerHeight)
            {
                gra.lostLife();
            }
            if(this.pos_x < 0)
            {
                this.dir_x *= -1;
            }
            if(this.pos_y < 0)
            {
                this.dir_y *= -1;
            }
            this.pos();
        }
    this.pos = function pos()
        {
            this.obj.style.left = this.pos_x+"px";
            this.obj.style.top = this.pos_y+"px";
        }
}
function Brick(object, top, left,width, height)
    {
        this.obj = object;
        this.top = top
        this.left = left;
        this.width = width;
        this.height = height;
        this.life = 1;
        
        this.colider = function colider(){
            if(this.life == 0)
                {
                    return;
                }
          //kolizja z do³u
            if((ball.pos_x + ball.obj.offsetWidth) > this.left && ball.pos_x < this.left+this.width && ball.pos_y > this.top && ball.pos_y - ball.obj.offsetHeight < this.top + this.height/2)
                {
                    this.life--;
                    if(this.life == 0)
                    {
                        this.obj.style.display = "none";
                        ball.dir_y *= -1;
                    }
                    
                }
            
            
            
            
        };
    }
function Platform(object)
    {
        this.obj = object;
        this.obj_x = window.innerWidth/2 - this.obj.offsetWidth/2;
        this.obj_y = window.innerHeight - 2*this.obj.offsetHeight;
        this.obj.style.left = this.obj_x + "px";
        this.obj.style.top = this.obj_y + "px";
        var czas = new Date().getTime();
        
        this.move = function move(event){
            
                if(window.innerWidth/20<event.clientX&&window.innerWidth/20*19>event.clientX)
                    {
                        this.obj_x = event.clientX - this.obj.offsetWidth/2;
                        this.obj.style.left = this.obj_x + "px";
                        
                    }
        
        }
        this.checkIsPlatform = function checkIsPlatform(){ 
            if(this.obj_x < ball.pos_x && (this.obj_x + this.obj.offsetWidth) > ball.pos_x && ball.pos_y+ball.obj.offsetHeight>=this.obj_y )
                {
                    console.log("odbita");
                    if(ball.dir_y > 0)
                        {
                        
                            ball.dir_y *= -1;
                        }
                }
        }
        
    }
function game(){
    
    this.gameLoop = function gameLoop()
        {
            ball.move();
            platforma.checkIsPlatform();
            for(var i=0; i<tablica_cegiel.length; i++)
                {
                    tablica_cegiel[i].colider();
                }
        }
    this.lostLife = function lostLife(){
        if(zycia == 0)
            {return;}
        document.getElementById("life_"+zycia).style.display = "none";
        zycia--;
        ball.reset();
                
                
                if(zycia == 0)
                    {
                        ball.obj.style.display = "none";
                        alert("It's over. Refresh to play again.")
                    }
            };
}
document.getElementById("contener").style.height = window.innerHeight+"px";
document.getElementById("contener").style.width = window.innerWidth+"px";
var bloki = document.getElementsByClassName("blok");
var index = 0;    
var top_margin = 0;
var tablica_cegiel = [];
for(var i = 0; i<bloki.length; i++)
    {
        if(i%6 == 0 )
            {
                top_margin += 70;
            }
        if(index == 6)
            {
                index = 0;
            }
        bloki[i].style.width = window.innerWidth/6 - 5*6+"px";
        bloki[i].style.top = top_margin+"px";
        bloki[i].style.left = (index)*window.innerWidth/6+index*6+"px";
        tablica_cegiel[i] = new Brick(bloki[i],top_margin,(index)*window.innerWidth/6+index*6,window.innerWidth/6 - 5*6,40);
        index++;
    }


var ball = new Ball(window.innerWidth/2, window.innerHeight-100, 5, -5, document.getElementById("pilka"));
var platforma = new Platform(document.getElementById("platforma"));
var zycia = 3;
var gra = new game();
    setInterval(function(){
        
        gra.gameLoop();
        
    }, 20);

//Main game class. <fps>-framerate, <drawer>-HCanvas object, <updateFunction>-user update function
function HGame(fps,drawer,updateFunction){
  this.fps=1000/fps;
  this.drawer=drawer;
  //set the repeating usercode
  setInterval(function(){
    //clear canvas before drawing something
    this.drawer.context.clearRect(0,0,this.drawer.size.getX(),this.drawer.size.getY());
    //run user update function
    updateFunction();
  },this.fps)
}

//HCanavas class. Use to draw something on canvas. <width,height>-width and height of canvas
function HCanvas(vector2d){
  //create and seting canvas
  this.canvas=document.createElement('CANVAS');
  this.size=vector2d;
  this.canvas.width=this.size.getX();
  this.canvas.height=this.size.getY();
  //add <canvas> tag to <body>
  document.body.appendChild(this.canvas);
  //get context of canvas
  this.context=this.canvas.getContext('2d');
  this.drawImage=function(Image,vect){
    this.context.drawImage(Image,vect.getX(),vect.getY());
  };
  this.drawText=function(Text,vect){
    this.context.fillText(Text,vect.getX(),vect.getY());
  };
}

//Image class. <path>-path to image file
function HImage(path){
  //defining image object
  var image=new Image();
  image.src=path;
  //flag of loading image
  this.isLoaded=false;
  //func to change flag on true
  var isLoadFunc=function(){
    this.isLoaded=true;
  };
  //when image is load
  image.onload=isLoadFunc;
  //draw image function. <hcanvas>-HCanvas object, <pos_vect2d>-HVector2d with coordinates to draw
  this.draw=function(hcanvas,pos_vect2d){
    //flag dont work why?
    //if(this.isLoaded){
      hcanvas.drawImage(image,pos_vect2d);
    //}
  }
}

//Rectangle shape class. <pos_vect2d>-coordinates HVector2d,wh_vect2d- width and height HVector2d
function HShape(pos_vect2d,wh_vect2d){
  var position=pos_vect2d;
  var wh=wh_vect2d;
  this.color='#000000';
  //<point_pos_vect2d> - coordinates of point. return true if point inside shape
  // and false if outside
  this.isPointInside=function(point_pos_vect2d){
    if(((this.getX()<point_pos_vect2d.getX() )&& ((this.getX()+this.getWidth())>point_pos_vect2d.getX())) &&
        ((this.getY()<point_pos_vect2d.getY() )&& ((this.getY()+this.getHeight())>point_pos_vect2d.getY()))){
      return true;
    }else{
      return false;
    }
  };

  this.draw=function(hcanvas){
    hcanvas.context.fillStyle=this.color;
    hcanvas.context.fillRect(this.getX(),this.getY(),this.getWidth(),this.getHeight());
  };

  //setters for parameters
  this.setX=function(px){
    position.setX(px);
  };
  this.setY=function(py){
    position.setY(py);
  };
  this.setPosition=function(vect_pos){
    position=vect_pos;
  };
  this.setWidth=function(w){
    wh.setX(w);
  };
  this.setHeight=function(h){
    wh.setY(h);
  };
  this.setPerinmeter=function(vect_per){
    wh=vect_per;
  };
  //geters for parameters
  this.getX=function(){
    return position.getX();
  };
  this.getY=function(){
    return position.getY();
  };
  this.getPosition=function(){
    return position;
  };
  this.getWidth=function(){
    return wh.getX();
  };
  this.getHeight=function(){
    return wh.getY();
  };
  this.getPerimeter=function(){
    return new HVector2d(wh);
  };
}

//Mouse monitoring object. <hcanvas> - HCanvas object
function HMouse(hcanvas){
  //HCanvas object
  var canvas=hcanvas.canvas;
  //vector vith coordinates of mouse
  var pos=new HVector2d(0,0);
  var obj=this;
  this.position=pos;
  this.isReleased=true;
  this.isDown=false;
  this.isPressed=false;
  //listener for monitoring mouse position
  canvas.addEventListener('mousemove',function(evt){
    var rect;
    rect = canvas.getBoundingClientRect();
    pos.set([evt.clientX - rect.left,evt.clientY - rect.top]);
  },false);
  //listener for monitoring when mouse button is released
  canvas.addEventListener('mouseup',function(){
    obj.isDown=true;
  },true);
  //listener for monitoring when mouse button is down
  canvas.addEventListener('mousedown',function(){
    obj.isDown=false;
  },true);
}

//Object for containing 2d coordinates or other properties. <x,y>- coordinates
function HVector2d(val1,val2) {
  var x=0;
  var y=0;
  //if in constructor just 1 argument
  if (arguments.length == 1) {
    //if argument is else HVector
    if (arguments[0] instanceof HVector2d) {
      x = arguments[0].getX();
      y = arguments[0].getY();
    } else {
      //if argument is the array
      if (arguments[0] instanceof Array) {
        x = arguments[0][0];
        y = arguments[0][1];
      }
      // console.log("Wrong type of argument. Expected HVector2d");
    }
  } else {
    x = arguments[0];
    y = arguments[1];
  }
  //getters and setters for a coordinates
  this.getX = function(){
    return x;
  };

  this.getY = function(){
    return y;
  };

  this.getArray = function(){
    return [this.getX(), this.getY()];
  };
  this.setX=function(px){
    x=px;
  };
  this.setY=function(py){
    y=py;
  };
  this.set = function (x, y) {
    if (arguments.length == 1) {
      //if argument is else HVector
      if (arguments[0] instanceof HVector2d) {
        this.setX(arguments[0].getX());
        this.setY(arguments[0].getY());
      } else {
        //if argument is the array
        if (arguments[0] instanceof Array) {
          this.setX(arguments[0][0]);
          this.setY(arguments[0][1]);
        }
        // console.log("Wrong type of argument. Expected HVector2d");
      }
    } else {
      this.setX(arguments[0]);
      this.setY(arguments[1]);
    }
  }
}

/*
Object for drawing text.
<t_text> - string of user text
 */
function HText(t_text){
  var text=t_text;
  var color='#000000';
  var style='14px Arial';
  //set drawing text
  this.setText=function(txt){
    text=txt;
  };
  //get drawing text
  this.getText=function(){
    return txt;
  };
  /*
  draw string of text
  hcanvas - HCanvas object;
  d_position - HVector2d object
  d_color - color of text
  d_style - font set up in format '<size>px <Font Name>'. "20px Arial"
   */
  this.draw=function(hcanvas,d_position,d_color,d_style){
    //set parameters if changes
    if (d_color!=color){color=d_color}
    if (d_style!=style){style=d_style}
    hcanvas.context.font=style;
    hcanvas.context.fillStyle=color;
    hcanvas.drawText(text,d_position);
  };
}
//HELLO VOLODYA
//HELLO VOLODYA
//HELLO VOLODYA
//HELLO VOLODYA

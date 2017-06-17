const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
//As big as each window is
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// color
ctx.strokeStyle = '#BADASS';
// end of the line shape
ctx.lineJoin = 'round';
// shows line smooth
ctx.lineCap = 'round';
// line width
ctx.lineWidth = 0;
// mixing color where line is marged
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
// line color
let hue = 0;
let direction = true;


function draw(e){
  // stop the function from running whe they are not moused down
  if(!isDrawing) return;
  console.log(e);
  // 100% = saturation, 50% = lightness
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.lineWidth = hue;
  ctx.beginPath();
  // line start from
  ctx.moveTo(lastX,lastY);
  // line go to
  ctx.lineTo(e.offsetX,e.offsetY);
  // shows on the screen
  ctx.stroke();
  // ES6 same mean as
  // " lastX = e.offsetX "
  // " lastY = e.offsetY "
  [lastX,lastY] = [e.offsetX, e.offsetY];
  // update hue so next move is going to be different color
  hue++;
  // if hue is reach to 360 reset to 0
  if(hue >= 360){
    hue = 0;
  }
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    // flip the direction
    direction = !direction;
  }
  if(direction){
    // increment line width
    ctx.lineWidth++;
  }else{
    // decrement line width
    ctx.lineWidth--;
  }

}
canvas.addEventListener('mousedown',(e) => {
  isDrawing = true;
  // update lastX and lastY so start from where mouse is instead of 0
  [lastX,lastY] = [e.offsetX, e.offsetY];

});

canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup',() => isDrawing = false);
// when mouse carsor is out of the screen
canvas.addEventListener('mouseout',() => isDrawing = false);

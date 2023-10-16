let img = document.querySelector('.img')
let deg = 0
let imgx = 0
let imgy = 0
let imgl = 0
let imgt = 0
let y = 0 
let index = 0

window.addEventListener('mousemove',function(xyz){
    imgx = xyz.x - img.offsetLeft - img.clientWidth /2
    imgy = xyz.y - img.offsetTop - img.clientHeight /2
    deg = 360*Math.atan(imgy/imgx)/(2*Math.PI)
    // reset index
    index= 0
    // mouse position
    let x = event.clientX
    // reverse
    if(img.offsetLeft<x){
        y=-180
    }else{
        y=0
    }
})
setInterval(()=>{
    // rotate
    img.style.transform = "rotateZ("+deg+"deg) rotateY("+y+"deg)"
    index++
    // set speed
    if(index<50){
        imgl+=imgx/50
        imgt+=imgy/50
    }
    img.style.left = imgl+"px"
    img.style.top = imgt+"px"
},10)

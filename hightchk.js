let a = window.screen.height;
let b = window.screen.width;
const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

if (a < 320 || b < 480 || width < 320 || height < 480) {
    window.location.href = "/toosmall.html";
} else{
    if (width < 320 || height < 480){
        alert("Bro I know you have the real estate, just give me 320x480 pixels and we'll be chill!")
    }else{
    console.log("all good!", a, b, width, height)
}
}
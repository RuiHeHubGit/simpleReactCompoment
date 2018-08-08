import "./css/style.css";

class ClickEffect {
    static show(ele, event) {
        if(typeof ele != "object") {
            return;
        }
        let rect = ele.getBoundingClientRect();
        let effectEle = document.createElement("div");
        let bgColor = window.getComputedStyle(ele,null).backgroundColor;
        effectEle.setAttribute("class", "clickEffect");
        effectEle.style.left = rect.left + "px";
        effectEle.style.top = rect.top + "px";
        effectEle.style.width = rect.width + "px";
        effectEle.style.height = rect.height + "px";
        effectEle.style.backgroundColor = bgColor;
        effectEle.style.borderRadius = window.getComputedStyle(ele,null).borderRadius;

        if(event) {
            let x = event.clientX-rect.left;
            let y = event.clientY-rect.top;
            let ptX = 100*x/rect.width;
            let ptY = 100*y/rect.height;
            effectEle.style.transformOrigin = ptX+"%"+ptY+"%";
            effectEle.style.backgroundImage =
                "-webkit-radial-gradient("+ptX+"% "+ptY+"%,circle,#EEAAAA 10%,#55AAAA 60%,"
                +bgColor+" 30%)";
        } else {
            effectEle.style.transformOrigin = "center";
            effectEle.style.backgroundImage ="-webkit-radial-gradient(circle,#EEAAAA 10%,#55AAAA 60%,"+bgColor+" 30%)";
        }
        document.body.appendChild(effectEle);
        effectEle.addEventListener('animationend', ()=>{
            document.body.removeChild(effectEle);
        }, false);
    }
}

export default ClickEffect;
import "./css/style.css";

class ClickEffect {
    static bind(ele) {
        if(typeof ele != "object") {
            return;
        }
        var rect = ele.getBoundingClientRect();
        var effectEle = document.createElement("div");
        effectEle.setAttribute("class", "clickEffect");
        effectEle.style.left = rect.left + "px";
        effectEle.style.top = rect.top + "px";
        effectEle.style.width = rect.width + "px";
        effectEle.style.height = rect.height + "px";
        effectEle.style.backgroundColor = window.getComputedStyle(ele,null).backgroundColor;
        effectEle.style.borderRadius = window.getComputedStyle(ele,null).borderRadius;
        effectEle.style.background = "-webkit-radial-gradient(center center,circle,#5aa,"+window.getComputedStyle(ele,null).backgroundColor+",#5aa)";
        document.body.appendChild(effectEle);
        effectEle.addEventListener('animationend', ()=>{
            document.body.removeChild(effectEle);
        }, false);
    }
}

export default ClickEffect;
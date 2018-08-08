import  React, {Component} from 'react';
import ClickEffect from "../common/clickEffect";

class SwitchButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {on:  this.props.on || false, first: true};
        this.styleData = {
            onStyle:  {
                slide:{"width":"50%", "height":"100%", "background":"#5aa", "position":"absolute", "left":"50%", "transition":"all .3s ease-out"},
                onBox:{"opacity":"1", "color":"#5aa",  "width":"50%", "height":"100%", "background":"#ddd", "position":"absolute", "left":"0",  "display":"table-cell", "transition":"all .5s ease-out"},
                offBox:{"opacity":"0", "color":"#5aa", "width":"50%", "height":"100%", "background":"#ddd", "position":"absolute", "right":"0",  "display":"table-cell", "transition":"all .5s ease-out"}
            },
            offStyle:  {
                slide:{"width":"50%", "height":"100%", "background":"#899192", "position":"absolute", "left":"0", "transition":"all .3s ease-out"},
                onBox:{"opacity":"0", "color":"#5aa",  "width":"50%", "height":"100%", "background":"#ddd", "position":"absolute", "left":"0",  "display":"table-cell", "transition":"all .5s ease-out"},
                offBox:{"opacity":"1", "color":"#777", "width":"50%", "height":"100%", "background":"#ddd", "position":"absolute", "right":"0",  "display":"table-cell", "transition":"all .5s ease-out"}
            },
            boxStyle: {"width":"100px", "height":"30px", "position":"relative","user-select": "none",
                "overflow":"hidden", "textOverflow":"ellipsis", "whiteSpace": "nowrap", "display": "table-cell"},
            textStyle: {"position":"absolute", "left":"50%", "top":"50%", "transform": "translateX(-50%)  translateY(-50%)"},
            onText:  this.props.onText || "on",
            offText:  this.props.offText || "off"
        };
    }

    render() {

        if(this.state.first) {
            this.state.first = false;
            if(this.props.style) {
                for (var p in this.props.compStyle) {
                    if(!p.startsWith("on-") && !p.startsWith("off-")) {
                        continue;
                    }
                    var compStyle = this.props.compStyle;
                    var style;
                    if(p.startsWith("on-")) {
                        style = this.styleData.onStyle;
                    } else {
                        style = this.styleData.offStyle;
                    }
                    var k = p.substr(p.indexOf("-")+1);

                    switch (k) {
                        case "slideBg":
                            style.slide["background"] = compStyle[p];
                            break;
                        case "onBoxBg":
                            style.onBox["background"] = compStyle[p];
                            break;
                        case "onTextColor":
                            style.onBox["color"] = compStyle[p];
                            break;
                        case "onTextSize":
                            style.onBox["font-size"] = compStyle[p];
                            break;
                        case "offBoxBg":
                            style.offBox["background"] = compStyle[p];
                            break;
                        case "offTextColor":
                            style.offBox["color"] = compStyle[p];
                            break;
                        case "offTextSize":
                            style.offBox["font-size"] = compStyle[p];
                            break;
                    }
                }

                for (var p in this.props.style) {
                    this.styleData.boxStyle[p] = this.props.style[p];
                }
            }
        }

        let curStyle = this.styleData[this.state.on?"onStyle":"offStyle"];
        return (
            <div onClick={this.handleClick.bind(this)} style={this.styleData.boxStyle}  ref="button">
                <div style={curStyle.onBox}>
                    <div style={this.styleData.textStyle}>{this.styleData.onText}</div>
                </div>
                <div style={curStyle.offBox}>
                    <div style={this.styleData.textStyle}>{this.styleData.offText}</div>
                </div>
                <div style={curStyle.slide}></div>
                {this.onRendered()}
            </div>
        );
    }

    onRendered() {
        setTimeout(()=>{
            if(this.props.disabled) {
                this.refs.button.style.opacity = 0.5;
                this.refs.button.style.cursor = "not-allowed";
            } else {
                this.refs.button.style.opacity = 1;
                this.refs.button.style.cursor = "pointer";
            }
        }, 100);
    }

    handleClick (event) {
        if(this.props.disabled) {
            return;
        }
        ClickEffect.show(this.refs.button, event);
        this.setState({on: !this.state.on});
        if(this.props.onchange != null) {
            this.props.onchange(this.state.on, this, event);
        }
    }
}

export  default  SwitchButton;
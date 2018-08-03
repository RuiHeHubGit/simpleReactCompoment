import  React, {Component} from 'react';

class SwitchButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
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
            boxStyle: {"width":"100px", "height":"30px", "cursor":"pointer", "position":"relative","user-select": "none",
                "overflow":"hidden", "textOverflow":"ellipsis", "whiteSpace": "nowrap", "display": "table-cell"},
            textStyle: {"position":"absolute", "left":"50%", "top":"50%", "transform": "translateX(-50%)  translateY(-50%)"},
            onText:  this.props.onText || "on",
            offText:  this.props.offText || "off",
            on:  this.props.on || false,
            first: true
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
                        style = this.state.onStyle;
                    } else {
                        style = this.state.offStyle;
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
                    this.state.boxStyle[p] = this.props.style[p];
                }
            }

        }

        var style = this.state[this.state.on?"onStyle":"offStyle"];
        return (
            <div onClick={this.handleClick.bind(this)} style={this.state.boxStyle}>
                <div style={style.onBox}>
                    <div style={this.state.textStyle}>{this.state.onText}</div>
                </div>
                <div style={style.offBox}>
                    <div style={this.state.textStyle}>{this.state.offText}</div>
                </div>
                <div style={style.slide}></div>
            </div>
        );
    }

    handleClick () {
        this.setState({on: !this.state.on});
        if(this.props.onchange != null) {
            this.props.onchange(this.state.on, this);
        }
    }
}

export  default  SwitchButton;
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './css/textEditBox.css'

class TextEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {value: props.value || ""};
    }

    render() {
        let editType = this.props.type || "text";
        let leftIconStyle = {};
        let rightIconStyle = {};
        let inputStyle = {};

        for (let k in this.props.style) {
            if(k.indexOf("font") >=0 || k.indexOf("color") >= 0) {
                inputStyle[k] = this.props.style[k];
            }
        }

        let inputClassName = "textEditInput";
        if(this.props.leftIcon) {
            leftIconStyle = {"backgroundImage":"url("+this.props.leftIcon+")", width:"20px"};
            inputStyle["paddingLeft"] = "25px";
            inputClassName += " textEditInputHaveLeftOrRight"
        }
        if(this.props.rightIcon) {
            rightIconStyle = {"backgroundImage":"url("+this.props.rightIcon+")", width:"20px"};
            inputStyle["paddingRight"] = "25px";
            if(this.props.leftIcon) {
                inputClassName += " textEditInputHaveLeftAndRight"
            } else {
                inputClassName += " textEditInputHaveLeftOrRight"
            }
        }

        return <div>
            <div className={"textEditBox"}>
                <div className={"textEditLeft"} style={leftIconStyle} ref={"leftIcon"} ></div>
                <div className={"textEditRight"} style={rightIconStyle} ref={"rightIcon"} ></div>
                <input className={inputClassName+(this.props.disabled?" disabledOperation":"")} value={this.state.value}
                       style={inputStyle} type={editType} ref={"input"} disabled={this.props.disabled}/>
            </div>
        </div>
    }

    componentDidMount() {
        this.refs.input.addEventListener("input", (event)=>{
            let value = ReactDOM.findDOMNode(this.refs.input).value;
            this.setValue(value);
            if(typeof this.props.onchange == "function") {
                this.props.onchange(value, event);
            }
        });

        this.refs.input.addEventListener("click", (event)=>{
            if(this.props.disabled) {
                return;
            }
            let rect = this.refs.input.getBoundingClientRect();
            let x = event.clientX-rect.left;
            console.log(x)
            if(x < 25 && typeof this.props.onLIconClick == "function") {
                this.props.onLIconClick(event);
            }else if(x > rect.width-25 && typeof this.props.onRIconClick == "function") {
                this.props.onRIconClick(event);
            }
        });
    }

    getValue() {
        return this.state.value;
    }

    setValue(value) {
        this.setState({value:value});
    }
}

export default TextEdit
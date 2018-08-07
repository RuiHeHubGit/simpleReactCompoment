import React,{Component} from 'react';
import './css/radioButton.css'
import ClickEffect from "../common/clickEffect";
var radioButtons= {};
class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {checked: props.checked == true}
    }

    render() {
        return (<div className={"radioButton"+(this.props.disabled?" disabledOperation":"")} style={this.props.style} ref="radioButton">
            <div className="radioButtonButton" ref="button">
                <div className="radioButtonButtonCheckedSign" style={{"opacity":this.state.checked?"1":"0"}}></div>
            </div>
            <div className="radioButtonText">{this.props.text}</div>
            <input type="radio" style={{"display":"none"}} name={this.props.name} ref="radio" disabled={this.props.disabled}/>
        </div>);
    }

    componentDidMount() {
        let currentRadioGroup = radioButtons[[this.props.name || "defaultRadioName"]];
        if(!currentRadioGroup) {
            currentRadioGroup = {selectIndex:-1, lastSelectIndex:-1, radios:[]};
            radioButtons[this.props.name || "defaultRadioName"] = currentRadioGroup;
        }
        currentRadioGroup.radios.push(this);
        if(currentRadioGroup.selectIndex == -1) {
            if (!this.props.disabled && this.props.checked) {
                this.handleClick(null, true);
            } else {
                for (let i = 0, l = currentRadioGroup.radios.length-1; i < l; ++i) {
                    if (!currentRadioGroup.radios[i].props.disabled) {
                        currentRadioGroup.radios[i].handleClick(null, true);
                        break;
                    }
                    if (i == l - 1) {
                        if (!this.props.disabled) {
                            this.handleClick(null, true);
                        }
                    }
                }
            }
        }

        this.refs.radioButton.addEventListener('click',()=>{
            if(this.props.disabled)
                return;
            this.handleClick();
        }, false);
    }

    componentWillUnmount() {
        let currentRadioGroup = radioButtons[[this.props.name || "defaultRadioName"]];
        for (let index in currentRadioGroup.radios) {
            let radio = currentRadioGroup.radios[index];
            if(radio === this) {
                radio.splice(index, 1);
            }
        }
    }

    handleClick(e, flag) {
        this.refs.radio.click();
        let currentRadioGroup = radioButtons[this.props.name || "defaultRadioName"];
        for (let index in currentRadioGroup.radios) {
            let radio = currentRadioGroup.radios[index];
            if(radio.refs.radio.checked) {
                currentRadioGroup.selectIndex = index;
            }
            if(flag) {
                radio.setState({checked: radio.refs.radio.checked});
            }
        }

        if(flag) {
            return;
        }
        ClickEffect.bind(this.refs.button);
        if(currentRadioGroup.lastSelectIndex != currentRadioGroup.selectIndex) {
            currentRadioGroup.lastSelectIndex = currentRadioGroup.selectIndex;
            let checkedRadio = currentRadioGroup.radios[currentRadioGroup.selectIndex];
            let value = checkedRadio.props.value != undefined ? checkedRadio.props.value:checkedRadio.props.text;
            for (let index in currentRadioGroup.radios) {
                let radio = currentRadioGroup.radios[index];
                radio.setState({checked:this.refs.radio.checked});
                radio.onchange(currentRadioGroup.selectIndex, value);
            }
        }
    }

    onchange(checkedIndex, value) {
        this.setState({checked:this.refs.radio.checked});
        if(typeof this.props.onchange == "function") {
            this.props.onchange(checkedIndex, value);
        }
    }
}

export default RadioButton;
import React,{Component} from 'react';
import ClickEffect from '../common/clickEffect';
import './css/button.css'
class Button extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleClick(event) {
        console.log(event.clientX,event.clientY);
        if(this.props.disabled) {
            return;
        }
        ClickEffect.show(this.refs.button, event);
        if(typeof this.props.onclick == "function") {
            this.props.onclick(event);
        }
    }

    render() {
        return (<div className={"button"+(this.props.disabled?" disabledOperation":"")} style={this.props.style} ref="button"
                     onClick={this.handleClick.bind(this)}>{this.props.text}</div>);
    }
}

export default Button;
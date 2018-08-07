import React,{Component} from 'react';
import ClickEffect from '../common/clickEffect';
import './css/button.css'
class Button extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleClick(e) {
        if(this.props.disabled) {
            return;
        }
        ClickEffect.bind(this.refs.button);
        if(typeof this.props.onclick == "function") {
            this.props.onclick(e);
        }
    }

    render() {
        return (<div className={"button"+(this.props.disabled?" disabledOperation":"")} style={this.props.style} ref="button"
                     onClick={this.handleClick.bind(this)}>{this.props.text}</div>);
    }
}

export default Button;
import React,{Component} from 'react';
import './css/button.css'
class Button extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleClick(e) {
        if(typeof this.props.onclick == "function") {
            this.props.onclick(e);
        }
    }

    render() {
        return (<div className="button" style={this.props.style} onClick={this.handleClick.bind(this)}>{this.props.text}</div>);
    }
}

export default Button;
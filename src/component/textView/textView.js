import React,{Component} from 'react'
import './css/textView.css'

class TextView extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"textView"} style={this.props.style} ref="box">{this.props.text}</div>
    }
}

export default TextView
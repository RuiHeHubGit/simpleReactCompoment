import React,{Component} from 'react';

class FlowLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.children || this.props.children.constructor != Array) {
            return <div style={this.props.style} ref="panel"></div>
        }

        return <div style={this.props.style} ref="panel">
            {
                this.props.children.map((item, index)=>{
                    let layout = {"float":"left"};
                    if(item.props.style) {
                        for (let k in item.props.style) {
                            if(k.indexOf("margin")>=0) {
                                layout[k] = item.props.style[k];
                            }
                        }
                    }
                    return <div style={layout} key={"flowlayout_item_"+index}>{item}</div>;
                })
            }
            <div style={{clear: "both"}}></div>
        </div>
    }
}

export default FlowLayout


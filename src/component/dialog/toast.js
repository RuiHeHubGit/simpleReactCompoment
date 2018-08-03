import React,{Component} from 'react';
import StoreRecentQueue from '../common/queue';
import './css/toast.css'

class Toast extends Component{
    constructor(props) {
        super(props);
        this.alignCssClassName = {"top":"toastAlignTop", "center":"toastAlignCenter", "bottom":"toastAlignBottom",
            left:"toastAlignLeft", right:"toastAlignRight"}[this.props.align || "center"] || "toastAlignCenter";
        this.state = {style: {"display": "none"}};
        this.queue = null;
        this.handelMessage();
    }

    render() {
        if(this.haveNewMsg) {
			this.handelMessage();
			this.haveNewMsg = false;
		}
        return <div className={"toastDialog "+this.alignCssClassName} style={this.state.style}>{this.message}</div>
    }

    componentWillReceiveProps() {
        this.haveNewMsg = true;
    }

    addMessageToQueue() {
        if(!this.queue) {
            this.queue = new StoreRecentQueue();
        }
        let msg = this.props;
		this.queue.offer({
			preDelay : msg.preDelay || this.preDelay || 200,
			duration : msg.duration || this.duration || 3000,
			message : msg.message
		});
    }
	
	setCurrentMsg(msg) {
		this.preDelay = msg.preDelay || this.preDelay || 200;
		this.duration = msg.duration || this.duration || 3000;
		this.message = msg.message || "";
        this.startShowMsg();
	}

    handelMessage() {
		if(!this.props.message && this.props.message != "") {
			return;
		}
        if(!this.timer || this.props.noQueue) {
            this.setCurrentMsg(this.props);
		} else {
            this.addMessageToQueue();
		}
    }

    startShowMsg() {
        if(this.timer) {
            clearTimeout(this.timer);
            this.setState({style:{display:"block", "opacity":"1"}});
        } else {
            this.setState({style:{display:"block", "opacity":"0"}});
        }
        this.timer = setTimeout(()=>{
            this.setState({style:{"opacity":"1"}});
            this.timer = setTimeout(()=>{
                this.setState({style:{"opacity":"0"}});
                this.timer = setTimeout(()=>{
                    this.close();
                }, 300);
            },this.duration);
        }, this.preDelay);
    }

    close() {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.message = null;
        this.setState({"style":{"display":"none"}, message:null});
		
		if(this.queue && this.queue.getSize() > 0) {
			this.setCurrentMsg(this.queue.poll());
			this.startShowMsg();
		}
    }
}

export default Toast
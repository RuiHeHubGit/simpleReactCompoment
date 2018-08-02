import React,{Component} from 'react';
import StoreRecentQueue from '../common/queue';
import './css/toast.css'

class Toast extends Component{
    constructor(props) {
        super(props);
        this.alignCssClassName = {"top":"toastAlignTop", "center":"toastAlignCenter", "bottom":"toastAlignBottom",
            left:"toastAlignLeft", right:"toastAlignRight"}[this.props.align || "center"] || "toastAlignCenter";
        this.state = {style: {"display": "none"}};
        this.preDelay = this.props.preDelay || 200;
        this.duration = this.props.duration || 2000;
        this.queue = null;
        this.needShow = Boolean(this.props.message);
    }

    render() {
        if(this.haveNewMsg) {
            this.noQueue = this.props.noQueue == true || this.noQueue;
            if(!this.noQueue && this.timer) {
                this.addMessageToQueue();
            } else {
                this.needShow = true;
            }
            this.haveNewMsg = false;
        } else if(!this.timer && this.queue && this.queue.getSize() > 0) {
            this.needShow = true;
        }

        if(this.needShow) {
            this.prepareMessage();
            this.startTimer();
            this.needShow = false;
        }

        if(!this.message) {
            return <div style={{"display":"none"}}></div>
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

    prepareMessage() {
        let msg = null;
        if(this.queue && this.queue.getSize() > 0) {
            msg = this.queue.poll();
        } else {
            msg = this.props;
        }
        this.preDelay = msg.preDelay || this.preDelay || 200;
        this.duration = msg.duration || this.duration || 3000;
        this.message = msg.message;
    }

    startTimer() {
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
        this.setState({"style":{"display":"none"}, message:null});
    }
}

export default Toast
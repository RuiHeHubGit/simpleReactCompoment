import React,{Component} from 'react';
import './css/progressBar.css'

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            progress:props.progress || 0,
            subProgress: props.subProgress || 0,
            percent: props.percent || 0,
            subPercent: props.subPercent || 0,
            max: props.max || 100,
            subMax: props.subMax || 100};
    }

    render() {
        let mode = this.checkAndSet();
        let progressText = mode==1?this.state.progress+"/"+this.state.max:mode==2?this.state.percent * 100 + "%":"";
        let progressStyle = {"width": 100 * this.state.percent + "%"};
        let subMode = this.checkSubAndSet();
        let subProgressText = subMode==1?this.state.subProgress+"/"+this.state.subMax: subMode==2?this.state.subPercent * 100 + "%":"";
        let subProgressStyle = {"width": 100 * this.state.subPercent + "%"};

        return <div className="progressBar" style={this.props.style}>
            <div className="progress" style={progressStyle}>
                <div className="subProgress" style={subProgressStyle}></div>
            </div>
            <div className="progressText">{progressText}</div>
            <div className="subProgressText">{subProgressText}</div>
        </div>;
    }

    checkAndSet() {
        let mode = 0;
        let max = this.props.max || this.state.max;
        this.state.max = max;
        if(max > 0 && this.props.progress >= 0) {
            if(this.props.progress > max) {
                this.state.progress = max;
            } else {
                this.state.progress = this.props.progress;
            }
            this.state.percent = (this.state.progress / max).toFixed(2);
            mode = 1;
        } else if(this.props.percent >= 0){
            if(this.props.percent > 1) {
                this.state.percent = 1;
            } else {
                this.state.percent = this.props.percent;
            }
            if(max > 0) {
                this.state.progress = max * this.state.percent;
            }
            mode = 2;
        } else {
            this.state.percent = 0;
            mode = 0;
        }

        if(this.props.noText) {
            mode = 0;
        }
        return mode;
    }

    checkSubAndSet() {
        let mode = 0;
        if(this.props.subMax === -1) {
            this.state.subProgress = 0;
            this.state.subPercent = 0;
            return 0;
        }
        let max = this.props.subMax || this.state.subMax;
        this.state.subMax = max;
        if(max > 0 && this.props.subProgress >= 0) {
            if(this.props.subProgress > max) {
                this.state.subProgress = max;
            } else {
                this.state.subProgress = this.props.subProgress;
            }
            this.state.subPercent = (this.state.subProgress / max).toFixed(2);
            mode = 1;
        } else if(this.props.subPercent >= 0){
            if(this.props.subPercent > 1) {
                this.state.subPercent = 1;
            } else {
                this.state.subPercent = this.props.subPercent;
            }
            if(max > 0) {
                this.state.subProgress = max * this.state.subPercent;
            }
            mode = 2;
        } else {
            this.state.subPercent = 0;
        }

        if(this.props.noText || this.props.noSubText) {
            mode = 0;
        }
        return mode;
    }
}

export default ProgressBar;
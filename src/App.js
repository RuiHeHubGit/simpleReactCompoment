import React, { Component } from 'react';
import logo from './logo.svg';
import eyeView from './image/eye_view.png';
import eye from './image/eye.png';
import './App.css';
import SwitchButton from "./component/button/switchButton";
import Button from "./component/button/button";
import TextView from "./component/textView/textView";
import FlowLayout from "./component/layout/flowLayout";
import TextEdit from "./component/textEdit/textEdit";
import Toast from "./component/dialog/toast";
import CheckBox from "./component/button/checkbox";
import RadioButton from "./component/button/radioButton";
import ProgressBar from "./component/progressBar/progressBar";

class App extends Component {
    constructor() {
        super();
        this.state = {msg1: "", msg2: "", toastTestMsg: "toastTestMsg", edit3Type:"password", edit3Right:eyeView, prs:0,subPrs:0, max:0, subMax:0};
        this.fileSizes = [100, 200, 20, 60, 10, 300, 160];
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div style={{"padding":"22px"}}>
                    <Toast message={this.state.toastTestMsg} align="top" preDelay={500} duration={4000}/>
                    <Toast message={this.state.toastTestMsg} align="center" preDelay={700} duration={3800}/>
                    <Toast message={this.state.toastTestMsg} align="bottom" preDelay={900} duration={3600}/>
                    <Toast message={this.state.toastTestMsg} align="left" preDelay={1100} duration={3400}/>
                    <Toast message={this.state.toastTestMsg} align="right" preDelay={1300} duration={3200}/>
                    <Toast message={this.state.msg1} />
                    <Toast message={this.state.msg2} noQueue={true} align="bottom"/>
                    <TextView text="FlowLayout Test"/>
                    <FlowLayout style={{"backgroundColor":"rgba(255,255,255,.8)", "padding":"22px", "boxShadow":"0 0 5px 2px rgba(0,100,200,.6)"}} children={[
                        <TextView text={"TextView1"} style={{"margin":"22px"}}/>,
                        <TextView text={"TextView2"} style={{"margin":"22px", "color":"#58f"}}/>,
                        <TextEdit value={"edit1"} style={{"margin":"22px"}} onchange={(value)=>this.setState({msg2:value})}/>,
                        <TextEdit value={"edit2"} style={{"margin":"22px", "color":"red"}} onchange={(value)=>this.setState({msg2:value})} leftIcon={logo}/>,
                        <TextEdit value={"edit3"} style={{"margin":"22px"}} leftIcon={logo} rightIcon={logo} onchange={(value)=>this.setState({msg2:value})} />,
                        <TextEdit value={"edit3"} style={{"margin":"22px"}} rightIcon={this.state.edit3Right} type={this.state.edit3Type}
                                  onchange={(value)=>this.setState({msg2:value})}
                                  onRIconClick={(flag)=>{
                                      if(this.state.edit3Type=="text") {
                                          this.setState({edit3Type:"password", edit3Right:eyeView});
                                      } else {
                                          this.setState({edit3Type:"text", edit3Right:eye});
                                      }
                                  }}/>,
                        <SwitchButton style={{"borderRadius":"5px", "margin":"22px"}} onchange={(on, tag)=>this.setState({msg2:on?"on":"off"})}/>,
                        <SwitchButton style={{"margin":"22px"}} on={true} onchange={(on, tag)=>this.setState({msg2:on?"on":"off"})}/>,
                        <Button text={"button1"} onclick={(e)=>this.setState({msg1:"click button1"})} style={{"margin":"22px"}}/>,
                        <Button text={"button2"} onclick={(e)=>this.setState({msg1:"click button2"})} style={{"margin":"22px"}}/>,

                        <div>
                            <div style={{"marginBottom":"5px"}}>
                                <ProgressBar
                                progress={this.state.prs} subProgress={this.state.subPrs}
                                max={this.state.max} subMax={this.state.subMax}/>
                            </div>
                            <div style={{"marginBottom":"5px"}}>
                                <ProgressBar progress={30} subPercent={0.5} max={50}/>
                            </div>
                            <div style={{"marginBottom":"5px"}}>
                                <ProgressBar percent={0.9} subPercent={0.7}/>
                            </div>
                            <div style={{"marginBottom":"5px"}}>
                                <ProgressBar percent={0.9} subPercent={0.7} noSubText={true}/>
                            </div>
                        </div>,

                        <CheckBox text="checbox1" style={{"margin":"22px"}} onchange={(checked)=>this.setState({msg2:"checked: "+checked})}/>,
                        <CheckBox text="checbox2" style={{"margin":"22px"}} checked={true} onchange={(checked)=>this.setState({msg2:"checked: "+checked})}/>,
                        <RadioButton name="group_1" text="group_1_radio_1" value="A" style={{"margin":"22px"}}
                                     onchange={(index, value)=>this.setState({msg2:"index:"+index+", value:"+value})}/>,
                        <RadioButton name="group_1" text="group_1_radio_2" value="B" style={{"margin":"22px"}}/>,
                        <RadioButton name="group_1" text="group_1_radio_3" value="C" style={{"margin":"22px"}}/>,

                        <RadioButton name="group_2" text="group_2_radio_1" value="boy" style={{"margin":"22px"}}
                                     onchange={(index, value)=>this.setState({msg2:"index:"+index+", value:"+value})}/>,
                        <RadioButton name="group_2" text="group_2_radio_2" value="girl" style={{"margin":"22px"}} checked={true}/>,
                    ]}/>
                </div>
                <div>
                    {this.onRendered()}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.load();
    }

    onRendered() {
        this.state.msg1 = null;
        this.state.msg2 = null;
        this.state.toastTestMsg = null;
    }

    load() {
        var count = this.fileSizes.reduce((a, b)=>(a+b));
        var prs = 0;
        var index = 0;
        var subPrs = 0;
        this.setState({max:count});
        this.timer = setInterval(()=>{
            prs += 10;
            subPrs += 10;
            if(subPrs>= this.fileSizes[index]) {
                subPrs = 0;
                ++index;
                if(index == this.fileSizes.length) {
                    clearTimeout(this.timer);
                    setTimeout(()=>{this.setState({"msg1":"reload"});this.load();}, 10000);
                    this.setState({prs: prs, subMax:-1});
                    return;
                } else {
                    this.setState({subMax:this.fileSizes[index]});
                }
            }
            this.setState({prs: prs, subPrs: subPrs});
        }, 500);
    }
}

export default App;

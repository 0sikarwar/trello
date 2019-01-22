import React from 'react';

export default class Task extends React.Component {
    state = {
        text : ""
    }
    render(){
        return(
            <div>
                {
                    this.props.display &&
                    <div className="task border-light br-5 ph-10 pv-10 flex flex-between ">
                    <div className="taskNameInput">{this.props.currentTask.name}</div>
                    <div>
                        <div onClick={this.props.sendToPrev} className="fs-12 ml-5 curP theme-color">{this.props.prevStatus !=="Remove"?"Change to "+ this.props.prevStatus : "Remove"}</div>
                        <div onClick = {this.props.sendToNext} className="fs-12 ml-5 curP theme-color">{this.props.nextStatus!=="Remove"?"Change to "+ this.props.nextStatus : "Remove"}</div>
                    </div>
                    </div>
                }
            </div>
        )
    }
}
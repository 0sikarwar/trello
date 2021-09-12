import React from 'react';

export default class DivHeader extends React.Component {
    state ={
        editable:false,
    }
    toggleEditable = ()=>{
        this.setState({
            editable:!this.state.editable
        })
    }
    setNewStatus = (e)=>{
        this.toggleEditable();
        const newStatusText = e.target.innerHTML;
        this.props.changeStatusForItem(newStatusText,this.props.id);


    }
    checkEnterKey = (e) =>{
        if(e.charCode === 13){
            this.setNewStatus(e);
        }
    }
    render(){
        return(
            <div className="DivHeader flex flex-center flex-between pt-5 br-5">
                <div className="fs-30 fBold flex-1 tCenter curT"
                    title = "Double click to edit"
                    onDoubleClick = {this.toggleEditable}
                    contentEditable = {this.state.editable}
                    onBlur={this.setNewStatus}
                    onKeyPress ={this.checkEnterKey}
                >
                    {this.props.text}
                </div>
                <div className = "bg-white curP fs-40 br-5 sideAddBoardButton flex flex-center flex-middle"
                    title="Create new status" 
                    onClick = {this.props.openCreateNewStatus}
                >
                    +
                </div>
                <div className = "bg-white curP fs-40 br-5 pb-5 sideAddBoardButton flex flex-center flex-middle"
                    title="Remove status from Board"
                    onClick = {this.props.removeStatus}                    
                >
                    -
                </div>
            </div>
        )
    }
}
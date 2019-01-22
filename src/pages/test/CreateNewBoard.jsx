import React from 'react';
import { v1 } from 'uuid';
import { ReactComponent as CloseIcon } from 'Icons/close.svg';
import AddListOfStatus from './AddListOfStatus';
export default class CreateNewBoard extends React.Component{
    state = {
        inputName : "",
        statusList : [
            {
                id : v1(),
                name : 'Todo'
            },
            {
                id : v1(),
                name : 'Doing'
            },
            {
                id : v1(),
                name : 'Done'
            }
        ]
    }
    updateInputName = (e)=>{
        this.setState({
            inputName : e.target.value
        })
    }
    SaveNewBoardName=()=>{
        this.props.SendNewBoard(this.state)
    }
    updateStatusList = (statusList)=>{
        this.setState({
            statusList
        })
    }
    render(){
        return(
            <div className="pf center createNewBoard pr-5 br-5 pb-10" ref = {createBoardModal =>createBoardModal && createBoardModal.focus()}>
                <CloseIcon className="curP closeSpan mt-5" onClick ={this.props.toggleCreateNewBoardModal}/>
                <form onSubmit={this.state.inputName?this.SaveNewBoardName:null} className = "flex flex-column flex-middle flex-center pb-5" >
                    {/* <div className="fs-24">Create new Board</div> */}
                    <input 
                        type="text" 
                        placeholder = "Enter New Board Name..." 
                        value = {this.state.inputName}
                        onChange = {this.updateInputName}
                        className = "boardNameInput br-5 mb-10 pl-5 border-light mt-15"
                    />
                    <AddListOfStatus updateStatusList = {this.updateStatusList} />
                    <input 
                        type="button"
                        value = "Create Board"
                        className ={"createButton br-20 " +(this.state.inputName?"active curP":"inactive") }
                        onClick = {this.state.inputName?this.SaveNewBoardName:null} 
                    /> 
                </form>
            </div>
        )
    }
}
import React from 'react';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';

export default class AddStatus extends React.Component {
    state = {
        inputName : ""
    }
    updateInputName = (e)=>{
        this.setState({
            inputName : e.target.value
        })
    }
    addStatusAfter = (e)=>{
        e.preventDefault();
        this.props.addStatusAfter(this.state.inputName);
        this.setState({
            inputName : ''
        },this.props.toggleShowAddStatusModal)
    
    }
    render(){
        return(
            <div className="modal pf">
                <div className="pf center createNewBoard pr-5 br-5 pb-10" ref = {createStatusModal =>createStatusModal && createStatusModal.focus()}>
                    <CloseIcon className="curP closeSpan mt-5" onClick ={this.props.toggleShowAddStatusModal}/>
                    <form onSubmit={this.state.inputName?this.addStatusAfter:null} className = "flex flex-column flex-middle flex-center pb-5" >
                        {/* <div className="fs-24">Create new Board</div> */}
                        <input 
                            type="text" 
                            placeholder = "Enter New status Name..." 
                            value = {this.state.inputName}
                            onChange = {this.updateInputName}
                            className = "boardNameInput br-5 mb-10 pl-5 border-light mt-15"
                        />
                        <input 
                            type="button"
                            value = "Create new Status"
                            className ={"createButton br-20 " +(this.state.inputName?"active curP":"inactive") }
                            onClick = {this.state.inputName?this.addStatusAfter:null} 
                        /> 
                    </form>
                </div>               
            </div>
        )
    }
}
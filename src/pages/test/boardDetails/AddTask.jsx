import React from 'react';
import { v1 } from 'uuid';

export default class AddTask extends React.Component {
    state={
        inputTaskText : "",    
    }
    task={
        id : "",
        name : "",
        status : this.props.status
    }

    changeTaskText = (e)=>{
        const inputTaskText = e.target.value;
        this.setState({
            inputTaskText
        })
    }

    createTask = (e)=>{
        e.preventDefault();
        const task= {...this.task};
        task.name=this.state.inputTaskText;
        task.id = v1();
        this.setState({
            inputTaskText : ""
        },()=>{
            this.props.addTask(task);
        })


    }

    render(){
        return(
            <form onSubmit={this.createTask} className="flex flex-column">
                <input type="text"
                    className = "border-light br-5 ph-10 pv-10" 
                    onChange ={this.changeTaskText} value={this.state.inputTaskText}
                    placeholder = "Enter task to be done..."
                />
                <input type="button" 
                    className={"addTaskButton br-5 " + (this.state.inputTaskText ? "active" : "inactive")}
                    value="Add Task"
                    onClick = {this.state.inputTaskText ?this.createTask:null}
                />
            </form>
        )
    }
}
import React from 'react';
import { v1 } from 'uuid';
import Task from './Task';
import DivHeader from './DivHeader';
import AddTask from './AddTask';
import AddStatus from './AddStatus';

export default class ToDoTasks extends React.Component {
    constructor (props){
        super(props)
       this.state={
            tasks : [...this.props.tasks],
            statusId : this.props.currentStatusId,
            statusName :this.props.statusName,
            nextStatus :this.props.nextStatus,
            nextStatusId :this.props.nextStatusId,
            prevStatus :this.props.prevStatus,
            prevStatusId :this.props.prevStatusId,
            showAddStatusModal : false 
        }      
    }
    addTask = (newTask)=>{
        const tasks = [...this.state.tasks];
        // tasks.findIndex((task)=>{
        //     return task.id === newTask.id
        // })
        tasks.push(newTask);
        this.setState({
            tasks           
        },()=>{
            this.props.addToBoard(tasks,"tasks");
        })
    }
    static getDerivedStateFromProps(nextProps, props) {
        return {
            tasks: nextProps.tasks,
            statusName :nextProps.statusName,
            nextStatus :nextProps.nextStatus,
            prevStatus :nextProps.prevStatus,
            nextStatusId :nextProps.nextStatusId,
            prevStatusId : nextProps.prevStatusId
        }
    }
    sendToNext = (id)=>{
        const tasks =[...this.state.tasks];
        console.log("this.props.statusList",this.props.statusList)
        const index=tasks.findIndex((task)=>{
            return task.id === id
        })
        if(this.state.nextStatusId === '-1'){
            tasks.splice(index,1)
        }else{
            tasks[index].status = this.state.nextStatusId;
        }
        this.setState({
            tasks
        },()=>{
            this.props.addToBoard(tasks,"tasks");
        })
        
    }
    sendToPrev = (id)=>{
        const tasks =[...this.state.tasks];
        const index=tasks.findIndex((task)=>{
            return task.id === id
        })
        if(this.state.prevStatusId === '-1'){
            tasks.splice(index,1)
        }else{
            tasks[index].status = this.state.prevStatusId;
        }
        this.setState({
            tasks
        },()=>{
            this.props.addToBoard(tasks,"tasks");
        })
    }
    toggleShowAddStatusModal =()=>{
        this.setState({
            showAddStatusModal : !this.state.showAddStatusModal
        })

    }
    changeStatusForItem = (updatedStatusText,id)=>{
        this.props.updateStatusName(updatedStatusText,id);
    }
    addStatusAfter = (newStatusText)=>{
       const newStatus={
            id : v1(),
            name : newStatusText
        }
        this.props.addStatusAfterCurrent(newStatus,this.state.statusId)
    }
    
    render(){
        return(
            <div className="ToDoTasksDiv border-light pl-5 pr-5 pb-5 mt-5 ml-5 br-5">
                <DivHeader 
                text={this.state.statusName}
                id = {this.state.statusId}
                openCreateNewStatus = {this.toggleShowAddStatusModal}
                changeStatusForItem = {this.changeStatusForItem}
                removeStatus ={this.props.removeStatus.bind(this,this.state.statusId)}
                />
                {
                    this.state.showAddStatusModal && 
                    <AddStatus
                    toggleShowAddStatusModal = {this.toggleShowAddStatusModal}
                    addStatusAfter = {this.addStatusAfter} 
                    />
                }
                {
                    this.state.tasks.map((task,index)=>{
                       return( <Task
                        currentTask ={task}
                        display ={this.state.statusId === task.status}
                        status = {this.state.statusName}
                        nextStatus = {this.state.nextStatus}
                        prevStatus ={this.state.prevStatus}
                        key = {task.id}
                        sendToNext ={this.sendToNext.bind(this,task.id)}
                        sendToPrev ={this.sendToPrev.bind(this,task.id)}
                        />
                       )
                    })
                }
                {
                    (this.state.statusId === this.props.statusList[0].id) && 
                    <AddTask 
                        addTask={this.addTask}
                        status={this.props.statusList[0].id}
                    />
                }
            </div>
        )
    }
}
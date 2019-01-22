import React from 'react';
import { v1 } from 'uuid';
export default class AddListOfStatus extends React.Component{
    state = {
        newStatus :"",
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
    removeStatusFromList = (id)=>{
        const statusList = this.state.statusList;
        const index = statusList.findIndex((status)=>{
            return status.id === id
        });
        statusList.splice(index,1);
        this.setState({
            statusList
        }, ()=> {
            this.props.updateStatusList(this.state.statusList);
        })
    }
    changeNewStatus = (e)=>{
        this.setState({
            newStatus : e.target.value
        })
    }
    addStatus = ()=>{
        const statusList = [...this.state.statusList];
        // if(statusList.indexOf(this.state.newStatus)<0){
        //     statusList.push(this.state.newStatus);
        // }
        const status = {
            id :v1(),
            name :this.state.newStatus
        }
        statusList.push(status);
        this.setState({
            newStatus:"",
            statusList:[...statusList]
        }, ()=> {
            this.props.updateStatusList(this.state.statusList);
        }) 

    }

    render(){
        return(
            <div className="flex flex-wrap flex-center">
            <div className ="fs-20 mb-5">Select Status List for Board:</div>
                {
                    this.state.statusList.map((status)=>{
                        return(
                            <Status
                            name = {status.name}
                            key ={status.id}
                            removeStatus = {this.removeStatusFromList.bind(this,status.id)}
                            />
                        )  
                    })
                }
                <div className ="br-20 border-light bg-gray ml-5 mb-5 flex">
                    <input type="text" className="br-20 ht-30 min-wt-100 pl-5 bg-gray" placeholder="Enter New Status..." onChange={this.changeNewStatus} value={this.state.newStatus}/>
                    <div className={"caption-color addButton mr-5 " +(this.state.newStatus?"activeAdd curP":"") } onClick ={this.state.newStatus?this.addStatus:null}>+</div>
                
                </div>
            </div>
        )
    }
}

class Status extends React.Component{
    render(){
        return(
            <div className ="br-20 border-light pl-5 bg-gray ml-5 mb-5 flex">
                <div className="mt-5 mb-5 mr-5">{this.props.name}</div>
                {
                    (this.props.name!== 'Todo') && 
                    <div className="curP caption-color mr-5 pt-5" onClick ={this.props.removeStatus}>X</div>
                }
            </div>
        )
    }
}
import React from 'react';
import ListTasks from './ListTasks';
import Header from '../Header'
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    const boardId=this.props.match.params.id;
    let showError = false
    let boards;
    try {
        boards = JSON.parse(localStorage.getItem("personalBoards")) || [];

    }catch(e) {
        boards = boards || [];
    }
    const currentBoard = boards.find((board)=>{
      return board.id===boardId
    })
    if(!currentBoard){
      showError =true
    }
    this.state={
      showError:showError,
      boards:boards,
      boardId:boardId,
      currentBoard : currentBoard,
      showToast : false,
      toastMsg : ""
    }
  }
  addToBoard = (changedValue,fieldNameToChange) =>{
    console.log("In addToBoard =>\nName of fieldChanged:",fieldNameToChange, "\nchanged field value:",changedValue );
    //Add new task to board in localStorage    
    const boards =this.state.boards;
    const boardId = this.state.boardId;
    let recentBoards;
    //Add changedValue to personalBoards in localStorage
    const index = boards.findIndex((board)=>{
      return board.id === boardId
    })
    boards[index][fieldNameToChange]=[...changedValue]    
    localStorage.setItem("personalBoards",JSON.stringify(boards)); 
    //Add changedValue to recentViewedBoards in localStorage
    try {
      recentBoards = JSON.parse(localStorage.getItem("recentViewedBoards")) || [];
    }catch(e){
      recentBoards = [];
    }
    const recentIndex = recentBoards.findIndex((board)=>{
      return board.id === boardId
    })
    if(recentIndex > -1){
      recentBoards[recentIndex][fieldNameToChange]=[...changedValue];
    }else{
      recentBoards.push(boards[index]);
    }
    boards.push()   
    localStorage.setItem("recentViewedBoards",JSON.stringify(recentBoards));
    this.setState({
      boards
    })
  }  

  updateStatusName =(updatedStatusText,id)=>{
    const statusList = this.state.currentBoard.statusList;
    const indexOfChange = statusList.findIndex((status)=>{
      return status.id === id
      })
    statusList[indexOfChange].name = updatedStatusText;
    this.addToBoard(statusList,"statusList");
  }

  addStatusAfterCurrent =(newStatus,currentId)=>{
    const statusList = this.state.currentBoard.statusList;
    const indexOfChange = statusList.findIndex((status)=>{
      return status.id === currentId
      })
    statusList.splice(indexOfChange+1,0,newStatus);    
    this.addToBoard(statusList,"statusList");
  }
  removeStatus = (id)=>{
    const statusList = this.state.currentBoard.statusList;
    if(statusList.length === 1){
      this.setState({
        showToast: true,
        toastMsg : "This is last status list You need to delete the Board itself"
      }, ()=>  {
        setTimeout(()=> {
          this.hideToast()
        }, 4000)
      })
    }else{
      let indexOfChange = statusList.findIndex((status)=>{
        return status.id === id
        })
      const tasks =this.state.currentBoard.tasks;
      const indexOfTask = tasks.findIndex((task)=>{
        return task.status === id
        })
      if(indexOfTask < 0){
        statusList.splice(indexOfChange,1);    
        this.addToBoard(statusList,"statusList");
      }else{
        this.setState({
          showToast: true,
          toastMsg : "Remove all task from status list to Delete it from board."
        }, ()=>  {
          setTimeout(()=> {
            this.hideToast()
          }, 4000)
        })
      }
    }
  }
  hideToast = ()=> {
    this.setState({
      showToast: false,
      toastMsg:""
    })
  }

   render() {
     if(this.state.showError){
       return(
          <Link to='/' >
            <h1>Board Does not Exists</h1>
            click to go home page
          </Link>
       )
     };
     return (
        <div className="mainDivBoardDetails">
         <Header/>
          <div className="currentBoardDiv hp-100 flex mt-20">
          {
            this.state.currentBoard.statusList.map((status,index)=>{
              return(
                <ListTasks
                  tasks= {this.state.currentBoard.tasks || []}
                  currentStatusId = {status.id}
                  statusName = {status.name}
                  nextStatus = {(index===(this.state.currentBoard.statusList.length-1))?"Remove":this.state.currentBoard.statusList[index+1].name}
                  nextStatusId = {(index===(this.state.currentBoard.statusList.length-1))?"-1":this.state.currentBoard.statusList[index+1].id}
                  prevStatus = {(index===0)?"Remove":this.state.currentBoard.statusList[index-1].name}
                  prevStatusId = {(index===0)?"-1":this.state.currentBoard.statusList[index-1].id}
                  addToBoard = {this.addToBoard}
                  key={status.id}
                  statusList = {this.state.currentBoard.statusList}
                  updateStatusName = {this.updateStatusName}
                  addStatusAfterCurrent = {this.addStatusAfterCurrent}
                  removeStatus = {this.removeStatus}
                />
              )
            })
          }
          </div>
          {
            <div className={"flex flex-middle flex-center toast-new pf br-5 fs-15 pl-5 pr-5 " + (this.state.showToast?'show':'')} onClick={this.hideToast}>
              {this.state.toastMsg}
            </div>
          }
        </div>
    );
  }
}

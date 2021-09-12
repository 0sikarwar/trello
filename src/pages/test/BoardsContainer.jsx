import React from 'react';
import { v1 } from 'uuid';
import PersonalBoardsContainer from './PersonalBoardsContainer';

export default class BoardsContainer extends React.Component{
    constructor(){
        super();
        let boards;
        let recentBoards;
        try {
            boards = JSON.parse(localStorage.getItem("personalBoards"));
            recentBoards = JSON.parse(localStorage.getItem("recentViewedBoards"));

        }catch(e) {
            boards = boards || [];
            recentBoards = recentBoards || []
        }
        this.state = {
            personalBoards: boards || [],
            recentViewedBoards:recentBoards || []
        }
    }
    updateRecentViewed = (board) =>{
        const recentViewedBoards = this.state.recentViewedBoards;
        const index = recentViewedBoards.findIndex((recentlyViewedBoard)=> {
            return board.id === recentlyViewedBoard.id;
        });
        if(index > -1){
            recentViewedBoards.splice(index,1);
        }
        recentViewedBoards.unshift(board);
        this.setState({
            recentViewedBoards
        })
        localStorage.setItem("recentViewedBoards",JSON.stringify(recentViewedBoards));
    }
    PushNewBoardInArray = (newBoard) =>{
        const board = {
            id:v1(),
            name : newBoard.inputName,
            statusList : [...newBoard.statusList],
            tasks : []
        }
       const personalBoards = this.state.personalBoards;
       personalBoards.push(board);
       this.setState({
        personalBoards
       })
       localStorage.setItem("personalBoards",JSON.stringify(personalBoards));
    }
    removeBoard = (id)=>{
        const personalBoards = this.state.personalBoards;
        const index=personalBoards.findIndex((board)=>{
            return board.id===id;
        })
        personalBoards.splice(index,1);
        this.setState({
            personalBoards,
        })
        this.removeFromRecent(id);
        localStorage.setItem("personalBoards",JSON.stringify(personalBoards));
    }
    removeFromRecent = (id)=>{
        const recentViewedBoards = this.state.recentViewedBoards;
        const index=recentViewedBoards.findIndex((board)=>{
            return board.id===id;
        })
        recentViewedBoards.splice(index,1);
        this.setState({
            recentViewedBoards,
        })
        localStorage.setItem("recentViewedBoards",JSON.stringify(recentViewedBoards));

    }
    render(){
        return(
            <div className="box-shadow ph-20 pv-20 hp-100">
               {
                   (this.state.recentViewedBoards.length > 0) &&
                    <PersonalBoardsContainer
                        boardList = {this.state.recentViewedBoards}
                        isRecentViewedContainer ={true}
                        title ="Recently Viewed Boards"
                        removeBoard ={this.removeFromRecent}
                    />
                } 
                <PersonalBoardsContainer
                    boardList = {this.state.personalBoards}
                    updateRecentViewed = {this.updateRecentViewed}
                    isRecentViewedContainer ={false}
                    title ="Personal Boards"
                    PushNewBoardInArray = {this.PushNewBoardInArray}
                    removeBoard ={this.removeBoard}
                />
                <div className="slideUp"></div>
            </div>
        );
    }
}
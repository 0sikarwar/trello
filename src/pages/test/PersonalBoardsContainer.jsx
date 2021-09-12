import React from 'react';
import Board from './Board';
import CreateNewBoard from './CreateNewBoard';

export default class PersonalBoardsContainer extends React.Component{
    state ={
        openCreateNewBoardModal : false
    }
    onBoardClick =(board)=>{
        
        this.props.updateRecentViewed(board);
    }
    toggleCreateNewBoardModal = ()=>{
        this.setState({
            openCreateNewBoardModal:!this.state.openCreateNewBoardModal
        })
    }
    SendNewBoard = (board)=>{
        this.toggleCreateNewBoardModal();
        this.props.PushNewBoardInArray(board);
    }
    render(){
        return(
            <div>
                <h2>{this.props.title}</h2>
                <div className="box-shadow flex flex-wrap personalBoardsContainer">
                {
                    this.props.boardList.map((board,index)=>{
                        return(
                            <Board 
                                name ={board.name}
                                id = {board.id}
                                key ={index}
                                isRecentViewedContainer = {this.props.isRecentViewedContainer}
                                onBoardClick = {this.onBoardClick.bind(this,board)}
                                removeBoard = {this.props.removeBoard.bind(this,board.id)}
                            />
                        )
                    })
                }
                {
                    this.state.openCreateNewBoardModal && <div className="modal z-1 pf">
                    <CreateNewBoard
                        toggleCreateNewBoardModal = {this.toggleCreateNewBoardModal}
                        SendNewBoard = {this.SendNewBoard}
                    />
                    </div>
                }
                {
                    !this.props.isRecentViewedContainer && <div className = "addNewBoard border-light mt-15 ml-20 mb-15 board br-10 hover-effect flex flex-middle flex-center"
                    onClick={this.toggleCreateNewBoardModal}
                    >
                     +   
                    </div> 
                }
                </div>
            </div>
        )
    }
}
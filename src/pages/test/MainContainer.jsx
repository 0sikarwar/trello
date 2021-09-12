import React from 'react';
import SideContainer from './SideContainer';
import BoardsContainer from './BoardsContainer';
export default class MainContainer extends React.Component{
    render(){
        return (
            <div className="grid hp-100">
                <SideContainer/>
                <BoardsContainer/>
            </div>
        )
    }
}
import React from 'react';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { Link } from 'react-router-dom';

export default class Board extends React.Component {
    state ={
        recentlyViewed : false
    }
    hendleClick = ()=>{
        this.setState ({
            recentlyViewed : true
        });
        this.props.onBoardClick();
    }
    removeBoard = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        this.props.removeBoard ();
    }
    render(){
        return(
            <Link to={'/boardDetails/'+ this.props.id }className="pr board border-light mt-15 ml-20 mb-15 board br-10 hover-effect flex flex-middle flex-center" onClick = {this.props.isRecentViewedContainer ? null : this.hendleClick}>
                <h1>{this.props.name}</h1>
                <CloseIcon className="curP removeSpan mt-5" onClick ={this.removeBoard}/>
            </Link>
        );
    }
}
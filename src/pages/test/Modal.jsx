import React from 'react';
export default class Modal extends React.Component{
    render(){
        return (
            <div className="wt-500 ht-300 border-theme pf br-5 bg-theme modal-content" ref = {modalContent =>modalContent && modalContent.focus()} onBlur={this.props.hideModal} tabIndex="1">
               <center>
                   <h1>asdfghjk</h1>
                    <h1>qwertyui</h1>
                </center> 
            </div>
        )
    }
}
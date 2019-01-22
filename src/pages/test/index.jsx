import React from 'react';
import Header from './Header';
import MainContainer from './MainContainer';

export default class Home extends React.Component {
   render() {
     return (
       <div className="">
         <Header/>
         <MainContainer/>
       </div>
    );
  }
}

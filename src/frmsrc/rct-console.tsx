import React, { Component } from 'react';
import { PrpRctConsole } from './prp-rct-console';

class RctConsole extends Component<PrpRctConsole> {

   constructor(props : PrpRctConsole){
      super(props);
   }

   render(){

      return(
         <div>Message: { this.props.messageConsole}</div>
      );

   }



}



export default RctConsole;
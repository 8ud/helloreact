import React, { Component } from 'react'; // namespace
// import logo from './logo.svg';
import './App.css';
import { Iprop } from './frmsrc/i-prop';
import { AppCmpState } from './frmsrc/app-cmp-state';
import { BlogInfo } from './frmsrc/blog-info';
/*
const App: React.FC = () => {
   const message : string= 'message de test';

  return (
    <div className="App">
          Learn React {message}
    </div>
  );
}
*/

const lstBlogInfo : BlogInfo[] = [
   {id: 0, auteur: 'toto' , body : 'un article de toto' , titre : 'blg toto'},
   {id: 1, auteur: 'tata' , body : 'un article de tata' , titre : 'blg tata'},
   {id: 2, auteur: 'titi' , body : 'un article de titi' , titre : 'blg titi'}
];

class App extends Component<Iprop,AppCmpState>{

   constructor(props: Iprop){
      super(props);  // instance de la classe mère

      // this.state = new AppCmpState();

      this.state = {      // mise en place de state
         message : "test",
         nomState : "blabla",
         liste : lstBlogInfo   // EMULATION des données !!!!!!!
      }
   }

   // message: string = "message depuis une instance";

   fctBt2Click(arg?: any){
      console.log(`mess: ${this.state.message}`);
      console.log(arg);
     // this.message = new Date().toISOString();
      this.setState({message : new Date().toISOString()})

   }

   render(){
      return (
         <div className="App">
            <p>Valeur de nom {this.props.nom}</p>

               Learn React {this.state.message}
               <br/>
               <button onClick={()=>console.log('qsdqsdqsd')}>Click</button>
               <br/>
               <button onClick={(evt)=>{this.fctBt2Click(evt);}}>Click 2</button>

               <ul>
                  {this.state.liste.map(
                     (blog: BlogInfo) => <li>Titre : {blog.titre} Auteur : {blog.auteur} </li>
                  )}
               </ul>

         </div>
      );
   }
}

export default App;

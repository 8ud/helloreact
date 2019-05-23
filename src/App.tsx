import React, { Component } from 'react'; // namespace
// import logo from './logo.svg';
import './App.css';
import { Iprop } from './frmsrc/i-prop';
import { AppCmpState } from './frmsrc/app-cmp-state';
import { BlogInfo } from './frmsrc/blog-info';
import RctConsole from './frmsrc/rct-console';
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
/*
const lstBlogInfo : BlogInfo[] = [
   {id: 0, auteur: 'toto' , body : 'un article de toto' , titre : 'blg toto'},
   {id: 1, auteur: 'tata' , body : 'un article de tata' , titre : 'blg tata'},
   {id: 2, auteur: 'titi' , body : 'un article de titi' , titre : 'blg titi'}
];*/

class App extends Component<Iprop,AppCmpState>{

   constructor(props: Iprop){
      super(props);  // instance de la classe mère

      // this.state = new AppCmpState();

      this.state = {      // mise en place de state
         message : "test",
         nomState : "blabla",
         liste : [],   // liste avec server json
         // liste : lstBlogInfo   // EMULATION des données !!!!!!!
         currentBlogInfo : {
            auteur : 'un auteur',
            body : 'vide',
            id : 0,
            titre : 'a définir'
         }
      }
   }

   // message: string = "message depuis une instance";

   fctBt2Click(arg?: any){
      console.log(`mess: ${this.state.message}`);
      console.log(arg);
     // this.message = new Date().toISOString();
      this.setState({message : new Date().toISOString()});
      // insertion element sur le serveur
      this.insertNewBlog();
   }

   //handler change inpt auteur
   handlerChangeAuteur(evt:any){
      // console.log(evt);
      const temp = this.state.currentBlogInfo;
      temp.auteur = evt.target.value;
      this.setState({currentBlogInfo :temp });
   }
   //handler change inpt titre
   handlerChangeTitre(evt:any){
      // console.log(evt);
      const temp = this.state.currentBlogInfo;
      temp.titre = evt.target.value;
      this.setState({currentBlogInfo :temp });
   }
   //handler change inpt titre
   handlerChangeBody(evt:any){
      // console.log(evt);
      const temp = this.state.currentBlogInfo;
      temp.body = evt.target.value;
      this.setState({currentBlogInfo :temp });
   }

   render(){
      return (
         <div className="App">

            <RctConsole messageConsole={ this.state.message} />

            <p>Valeur de nom {this.props.nom}</p>

               Learn React {this.state.message}
               <br/>
               <button className="btn btn-outline-primary" onClick={()=>console.log('qsdqsdqsd')}>Click</button>

               <button className="btn btn-outline-primary" onClick={(evt)=>{this.fctBt2Click(evt);}}>Click 2</button>
               <br/>

               <br/>
               <label>Auteur</label>
               <input className="form-control col-2 offset-5"
               value={this.state.currentBlogInfo.auteur}
               onChange={(evt) => {this.handlerChangeAuteur(evt); }}

               />
               <br/>
               <label>Titre</label>
               <input className="form-control col-2 offset-5"
               value={this.state.currentBlogInfo.titre}
               onChange={(evt) => {this.handlerChangeTitre(evt); }}

               />
               <br/>
               <label>Body</label>
               <input className="form-control col-2 offset-5"
               value={this.state.currentBlogInfo.body}
               onChange={(evt) => {this.handlerChangeBody(evt); }}

               />
               <br/>
               <button className="btn btn-outline-success" onClick={()=>{this.insertNewBlog(this.state.currentBlogInfo);}}>Add New Blog Server</button>
               <br/>

              {/*  <ul>
                  {this.state.liste.map(
                     (blog: BlogInfo) => <li key={blog.id}>Titre : {blog.titre} Auteur : {blog.auteur} Body : {blog.body} </li>
                  )}
               </ul>
 */}
               <table className="table table col-6 offset-3">
  <thead className="thead-dark">
    <tr>

      <th scope="col">titre</th>
      <th scope="col">Auteur</th>
      <th scope="col">Body</th>
    </tr>
  </thead>
  <tbody>

    {this.state.liste.map(
      (blog: BlogInfo) => <tr key={blog.id}>  <td >{blog.titre}</td>
      <td >{blog.auteur}</td>
      <td >{blog.body}</td>
    </tr>
      )}
    </tbody>
</table>

         </div>
      );
   }

   fctPopulateliste(lst : any[]) : void{
      const tabWrk: BlogInfo[] = [];  //tableau temporaire
      for (const element of lst) {
         tabWrk.push({
            auteur: element.auteur,
            body : element.body,
            id : element.id,
            titre : element.titre
         })
      } // fin de la boucle
      // mise a jour de l'état
      this.setState({ liste : tabWrk });
   }

   componentDidMount(){

      fetch("http://localhost:3000/bloginfo")
      .then((rep) => rep.json())  // body json
      .then((tabBlog: any[]) => {
         // recuperation de données et mise en place dans la collection liste de l'etat
         this.fctPopulateliste(tabBlog);
      }).catch((err) => console.error(err));
   }

   /**
    *
    */
   insertNewBlog(nwBlg?: BlogInfo){
      let newBlogInfo: BlogInfo;

      if (nwBlg === undefined){

         newBlogInfo = {
            auteur: 'suzy',
            body: 'article de suzy',
            titre: 'blg susy',
            id: 0
         }
      }
      else{
         newBlogInfo = nwBlg;
      }

      fetch('http://localhost:3000/bloginfo',
      {
         method : 'POST',
         body : JSON.stringify(newBlogInfo),
         headers : {
            "content-type": "application/json"
         }
       }
      ).then((rep) =>{
         //OK
         this.componentDidMount(); // rappel de la fct
      }).catch((err) =>{
         //KO
      });
   }


}

export default App;

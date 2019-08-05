import React,{Component} from 'react';
import Firebase from "../Config/config";

class NoteTaking extends Component {

    constructor(props){
        super(props);

        this.state={
            items:[],
            showUpdateButton:false,
            showEnterButton:true
        }
        this.enterData=this.enterData.bind(this);
        this.addNote=this.addNote.bind(this);

        this.state.act=0;

        this.db = Firebase.database().ref().child('notes');
    }

    componentDidMount(){
        const previousNotes = this.state.items;

        this.db.on('child_added', snap => {
            previousNotes.push({
                id:snap.key,
                title: snap.val().title,
                note: snap.val().note,
            })

            this.setState(
                {
                    items: previousNotes
                })
        })
    
  
        this.db.on('child_removed', snap => {
            for(var i=0; i< previousNotes.length;i++){
                if(previousNotes[i].id === snap.key){
                    previousNotes.splice (i,1);
                    break;
                }
            }
            this.setState(
                {
                    items: previousNotes
                })
        })

        this.db.on('child_changed', snap => {
          previousNotes.find(x=>x.id===snap.key).title=snap.val().title;
          previousNotes.find(x=>x.id===snap.key).note=snap.val().note;
        
            this.setState(
                {
                    items: previousNotes
                })
        })

    }
    addNote(title,note){      
        this.db.push().set({title:title,
            note:note}); 
    }
    deleteNote(value){
        this.db.child(value.id.toString()).remove();
    }

    updateNote(id,title,note){
        this.db.child(id.toString()).update({'title': title,'note':note});
    }
    enterData(event){
        if(this.state.act===0)
        {   //add
        if(this.theTitle.value !== "")
          {   
            this.addNote(this.theTitle.value,this.theNote.value);
         }
      }
    else {
           //update
        this.updateNote(this.state.index,this.theTitle.value,this.theNote.value);
        
        this.setState(
            {
                act:0,
                showUpdateButton:false,
                showEnterButton:true
            }
        );
    }

        this.theNote.value="";
        this.theTitle.value="";

        event.preventDefault();
    }

    updateButton (val) {

        this.setState({
            act:1,
            index:val.id,
            showUpdateButton:true,
            showEnterButton:false
        }
        );
    }
    render(){
        return (
        <div>
            <header>
            <h1>Note Taking</h1>

            </header>
            <div className="main-content">
                <ul>
            
               {this.state.items.map((val,i)=>
            <li key={i} className="myList">
            
            <div className="noteTitle">{val.title}</div> <p>{val.note}</p>
                <button onClick={()=>this.deleteNote(val)} className="myButton">delete</button>
                 <button onClick={()=>this.updateButton(val)} className="myButton">edit</button>
                </li>)}


           </ul>
            </div>

            <footer>
                <form onSubmit={this.enterData}>
                    <input type="text" 
                    placeholder="Enter note title here"
                    ref={(title)=>this.theTitle=title}
                    ></input>
                    <textarea
                    placeholder="Enter your note here"
                    ref={(note)=>this.theNote=note}
                    ></textarea>
                    {
                     this.state.showUpdateButton?
                    <button type="submit" className="myButton">Enter new data</button>
                     :null
                    }
                     {
                     this.state.showEnterButton?
                    <button type="submit" className="myButton">Enter</button>
                    :null
                     }
                </form>
            </footer>
        </div>
        );
    }
}


export default NoteTaking;
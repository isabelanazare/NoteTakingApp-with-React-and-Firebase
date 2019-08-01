import React,{Component} from 'react';

class NoteTaking extends Component {

    constructor(props){
        super(props);

        this.state={
            items:[],
            showUpdateButton:false,
            showEnterButton:true
        }
        this.enterData=this.enterData.bind(this);
        this.state.act=0;
    }

    enterData(event){
        if(this.state.act===0){      //add
        if(this.theTitle.value !== "")
        {
            var newItem={
                title:this.theTitle.value,
                note:this.theNote.value
            };
        }
        this.setState((prevState)=>{
            return{
                items:prevState.items.concat(newItem)
            };
        });
    }
    else {                          //update
        let index=this.state.index;
        let items=this.state.items;
        items[index].title=this.theTitle.value;
        items[index].note=this.theNote.value;

        this.setState(
            {
                items:items,
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

    deleteNote = (i) => {
        let datas=this.state.items;
        datas.splice(i,1);
        this.setState({
            datas:datas
        })
    }

    editNote = (i) => {
        let data = this.state.items[i];

        this.setState({
            act:1,
            index:i,
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
                <button onClick={()=>this.deleteNote(i)} className="myButton">delete</button>
                 <button onClick={()=>this.editNote(i)} className="myButton">edit</button>
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
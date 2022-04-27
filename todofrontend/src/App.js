import React from 'react';
import { Component } from 'react';
import './App.css';
import axios from "axios";

import Display from './components/Display'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      activeItem: {
        
        title: '',
        description: 'asdasd',
        completed: 'false',
      }

    }
  }

  componentDidMount = () => {
    this.refreshList()
  }

  refreshList = () => {
    const url = 'http://127.0.0.1:8000/view/'
 
      
      axios.get(url)
        .then(response => {
          console.log(response.data)
          this.setState({ lists: response.data })
        })
        .catch((error) => console.log(error))
    
  }


 changeHandler = (event) => {
    let name = event.target.name
    let value = event.target.value
    
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        'title':value,
      }
     
    })
    console.log(this.state.activeItem)
   
 }
  
  addHandler = (event) => {
    event.preventDefault();
    if (this.state.activeItem.title) {
      let url = 'http://127.0.0.1:8000/create/'
      axios.post(url, this.state.activeItem)
        .then((response) => this.refreshList());
      console.log("button pressed")
    }
    }
   
  deleteHandler = (pk) => {
    const url = 'http://127.0.0.1:8000/delete/' + pk + '/'
    axios.delete(url)
    .then(response => {
      console.log(response.data)
      this.refreshList()

    })
    .catch((error) => console.log(error))  
      
      
  }
  
 
  editHandler = (pk) => {
    
    const mylist = [...this.state.lists]
    let myvalues = mylist[pk]
    myvalues.title=myvalues.title+" "+'edited'
    this.setState({ activeItem: myvalues })
    console.log(this.state.activeItem)

  }



  render() {
    return (
      <div className="container">

      <div id="task-container">
          <div  id="form-wrapper">
             <form   id="form">
                <div className="flex-wrapper">
                    <div style={{flex: 7}}>
                  <input  onChange={this.changeHandler} className="form-control" id="title"  type="text" name="title" placeholder="Add task.." />
                  
                     </div>
               
                <div style={{ flex: 1 }}>
                  
                        <button  className="btn btn-warning"  onClick={this.addHandler}>Add </button>
                      </div>
                  </div>
            </form>
         
          </div>

          <div  id="list-wrapper">         
          
          {this.state.lists.map((list,index) => (
             <div key={index} className="task-wrapper flex-wrapper">

             <div  style={{flex:7}}>

                {list.completed === true ? (
                  <div>
                    <strike><h3>{list.title}</h3></strike>
               
                 
                  <span><p>{list.description}</p></span>
                    </div>

                   ) : (
                    <div>
                    <span><h3>{ list.title}</h3></span>
                   
                      <span><p>{ list.description}</p></span>
                      </div>
                   )}

             </div>

             <div style={{flex:1}}>
                <button className="btn btn-sm btn-outline-info" onClick={() => { this.editHandler(index)}}>Edit</button>
             </div>

             <div style={{flex:1}}>
                 <button  className="btn btn-sm btn-outline-dark delete" onClick={()=>{this.deleteHandler(list.id)}}>Delete</button>
             </div>

           </div>
      ))}
              
                    
                         
                        
               
                    </div>
      </div>
      
    </div>
    )

  }
}

export default App;

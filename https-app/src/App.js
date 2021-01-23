import React, { Component } from 'react';
import{ToastContainer} from 'react-toastify'
import './App.css';
import http from './services/httpService'
import config from './config.json'
import 'bootstrap/dist/css/bootstrap.css'
import'react-toastify/dist/ReactToastify.css';
//called first 




class App extends Component {
  state = { 
    posts: []
   };
  async componentDidMount() {
    
    const {data: posts} = await http.get(config.apiEndpoint
      );
    
      this.setState({posts});
   }
  
   handleAdd=async()=>{
    
    const obj = {title:'ww',body:'qq'}
    
    const{data: post}= await http.post(config.apiEndpoint,obj);
    const posts =[post ,...this.state.posts];
    this.setState({posts});
  };
  
  handleUpdate=async(post)=>{
    post.title = "loL"
    
    await http.put(config.apiEndpoint +"/"+ post.id,post);


    const posts = [...this.state.posts]

    
    const index = posts.indexOf(post);

    posts[index] = {...post}

    this.setState({posts})

  }
  
  handleDelete=async(post)=>{
    const originalPost = this.state.posts;
    const posts = this.state.posts.filter(a => a.id !== post.id);

    this.setState({posts});
   try{
    await http.delete('a'+config.apiEndpoint + "/"+post.id);
   }
   catch(ex){
     //expected errors like 404 400
     if(ex.response && ex.response.state === 404)
          alert("post already deleted");
     ///else{
        //unwxpwcted error
       // console.log('Logging the error', ex)
       // alert("An unexpected error occured")
     // }
    this.setState({posts: originalPost})
   }
    
    

  } 
   
  render() { 
    return (
      <React.Fragment>
        <ToastContainer/>
      <div>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
       <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </React.Fragment>
       );
  }
}
 
export default App;


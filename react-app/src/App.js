import React,{Component} from 'react';
import './App.css';
import Counters from './components/counters.jsx';
import NavBar from './components/navbar';



class App extends Component{

  state = { 
    Counters: [
        {id: 1,value: 4},
        {id: 2,value: 0},
        {id: 3,value: 0},
        {id: 4,value: 0}

    ]
 };
 handleDecrement = (counter) => {
const counters = [...this.state.Counters];
const index = counters.indexOf(counter);
counters[index]={...counter};
counters[index].value--

this.setState({Counters:counters});

 }
 
  handleReset = () => {
    const counters = this.state.Counters.map(c => {
        c.value = 0;
        return c;
    });
    this.setState({Counters: counters });
 };
  handleIncrement= counter => {
   const counters = [...this.state.Counters];
   const index = counters.indexOf(counter);
   counters[index] = {...counter}; 
   counters[index].value++
   
   this.setState({Counters: counters});      // const counters = [...this.state.Counters];
 }
  handleDelete = counterId => {
    const counters = this.state.Counters.filter(c => c.id !== counterId);
    this.setState({ Counters : counters });
};
render(){
  return (
    <React.Fragment>
    <NavBar  totalCounters = {this.state.Counters.filter(c => c.value >0).length}/>
    <main className = 'container'>
      <Counters
      onDecrement={this.handleDecrement}
      counters = {this.state.Counters}
      onDelete = {this.handleDelete}
      onReset = {this.handleReset}
      onIncrement = {this.handleIncrement}
      />
    </main>
    </React.Fragment>
  );
}
}

export default App;

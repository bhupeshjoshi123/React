import React,{Component} from 'react';
import Like from "./like";
import Table from './table';
import {Link} from 'react-router-dom'

class MoviesTable extends Component {

  columns = [
      {path : 'title' , label:'Title' ,content: movie=> <Link to={`/movies/${movie._id}`}>{movie.title}</Link>},
      {path : 'genre.name' , label:'Genre'},
      {path : 'numberInStock' , label:'Stock'},
      {path : 'dailyRentalRate' , label:'Rate'},
      {key: 'Like',
        content: movie => <Like liked ={movie.liked} onClick = {() => this.props.onLike(movie)}> </Like>  
     },
      {key: 'Delete' , content: movie => <button onClick ={()=>this.props.onDelete(movie)} className="btn btn-danger sm">Detete</button>
    }

  ]


    render() { 
    const {movies,onSort,sortColumn} = this.props;

    return (  
        <Table
        onSort = {onSort}
        sortColumn = {sortColumn}
        columns = {this.columns}
        data = {movies}

        />
         );
    }
}
 

 
export default MoviesTable;
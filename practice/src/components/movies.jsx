import React,{Component} from "react";
import { getMovies } from "../services/fakeMovieService";
import Paging from "./paging";
import {paginate} from "../utility/paginate.js";
import ListGroup from "./ListGroup";
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from "./moviesTable";
import {Link} from 'react-router-dom'
import _ from 'lodash';



class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: {path: 'title', order: 'asc'}
         };
    
        componentDidMount()
     {
         const genres = [{_id: '', name : 'All Genres'}, ...getGenres()];
         this.setState({movies : getMovies() , genres});
     }

         handlePagechange = page =>
     {
         this.setState({currentPage : page});
     }
     
         handleGenreSelect = item =>
     {
        this.setState({ selectedGenre: item , currentPage:1});
     }
     
         handleSort = sortColumn =>
     {
         this.setState({sortColumn: sortColumn})
     }
     
         handleDelete = movie => 
     {
         const movies = this.state.movies.filter(m => m._id !== movie._id);
         this.setState({movies: movies});
     };

         handleLike = movie =>
    {
        const movies = [...this.state.movies]; // spreading into array = [] and spreading into object = {}
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

        getPagedData = () =>
    {
        const {
            pageSize,
            currentPage,
            movies: allMovies,
            selectedGenre,
            sortColumn } = this.state;
        
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id): allMovies;
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies = paginate(sorted,currentPage,pageSize); 
        return {totalCount: filtered.length , data: movies};
    }
    
        render() {

         const {length : count}= this.state.movies;
        
         if(count===0) return "There are no movies";  
         const {totalCount , data: movies } = this.getPagedData();
         
         const {pageSize,currentPage, sortColumn } =this.state;

         return( 
            
            <div className ="row">
               
                <div className="col-2">
                    
                    <ListGroup 
                    items ={this.state.genres}
                    selectedGenre = {this.state.selectedGenre}
                    handleGenreSelect = {this.handleGenreSelect} 
                    />
               
                </div>
                
                <div className="col">
                <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{marginBottom: 20}}
                >New Movie</Link>
                <p>Showing {totalCount} movies in the database</p>
                
                <MoviesTable 
                movies = {movies}
                onDelete = {this.handleDelete}
                onLike = {this.handleLike}
                onSort = {this.handleSort}
                sortColumn = {sortColumn}

                />
                  
                <Paging 
                itemsCount = {totalCount} 
                pageSize = {pageSize}
                onPagechange = {this.handlePagechange}
                currentPage = {currentPage}
                />
                
                </div>
        </div>  
     
       );
    }
}
 
export default Movies;
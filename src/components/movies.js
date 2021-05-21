import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import {getGenres} from "../services/fakeGenreService";

class Movies extends Component {            
    state = {  
        movies: [],
        genres: [],
        pageSize:4,
        currentPage: 1
    }
    componentDidMount(){
        const genres = [{_id:"",name: 'All Genres'},...getGenres()]
        this.setState({movies: getMovies(), genres});
    }
    handlePageChange = (page) =>{
        this.setState({currentPage: page});

    }
    handleGenreSelect = (genre) => {
        this.setState({selectedGenre: genre, currentPage: 1});
    }
    handleDelete = (movie) =>{
        // console.log(movie);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies})
        
    };
    handleLike =(movie)=>{
        // console.log('Like clicked', movie.title)
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked= !movies[index].liked;
        this.setState({movies});
    }
    handleSort = (path) =>{
        console.log(path);
    }
    render() { 
        const {length :count} = this.state.movies;
        const {currentPage, pageSize,selectedGenre, movies: allMovies} = this.state;
        if(count === 0) return <p>There are no movie in the database</p>
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const movies = paginate( filtered,currentPage, pageSize);
        return (  
            <div className="row">
                <div className="col-3">
                    <ListGroup 
                    items={this.state.genres}
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}
                  
                    />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database.</p>
                <MoviesTable 
                movies={movies} 
                onLike={this.handleLike} 
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                />
            <Pagination 
            itemsCount={filtered.length} 
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
            />
                </div>
               
            
            </div>
        
            
            );
    }
}
 
export default Movies;
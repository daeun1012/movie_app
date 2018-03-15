import React, { Component } from 'react';
import './App.css';
import Movie from './Movie.js';

// smart component
// state 가 존재한다 ==> LifeCycle이 존재한다
class App extends Component {
  // ----- LifeCycle ----
  // Render : componentWillMount() -> render() -> componentDidMount()
  // Update : componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidMount()

  state = {};

  /**
   * render() 후 불려지는 method
   */
  componentDidMount() {
    this._getMovies();
  }
  /**
   * async function 으로 지정
   * callApi() 가 끝날때까지 await (기다림)
   *
   * await 은 async fuction 에서만 사용가능
   */
  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  /**
   * override 한 method 가 아닌
   * 개발자가 직접 구현한 method는 명명시 앞에 '_' 를 추가한다.
   */
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return <Movie
      title={movie.title_english}
      poster={movie.medium_cover_image}
      key={movie.id}
      genres={movie.genres}
      synopsis={movie.synopsis} />
    })
    return movies
  }

  render() {
    const { movies } = this.state;
    return (
      // data 확인 후 call method
      <div className={movies ? "App" : "App--loading"} >
        {movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;

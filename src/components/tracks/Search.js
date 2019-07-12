import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

class Search extends Component {
  state = {
    track_title: ''
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.track_title}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });

        this.setState({ track_title: " " })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    name="track_title"
                    value={this.state.track_title}
                    onChange={this.onChangeHandler}
                    className="form-control form-control-lg"
                    placeholder="Song title..." />
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block mb-5">
                  Get Track Lyrics</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    );
  }
}

export default Search;
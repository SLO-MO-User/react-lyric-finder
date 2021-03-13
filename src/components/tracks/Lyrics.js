import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

import Spinner from "../layout/Spinner";

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      lyrics: {},
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://evening-refuge-58060.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((result) => {
        this.setState({ lyrics: result.data.message.body.lyrics });

        return axios.get(
          `https://evening-refuge-58060.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((result) => {
        this.setState({ track: result.data.message.body.track });
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <>
          <div className="card">
            <h5 className="card-header text-center">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
              <Link to="/" className="btn btn-dark btn-sm mb-4 float-right">
                Go Back
              </Link>
            </h5>
            <div className="card-body">
              <div className="card-text text-center">
                {lyrics.lyrics_body.split("\n").map((lyric, index) => {
                  return (
                    <p key={index} className="card-text">
                      {lyric}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <ul className="list-group mt-3 mb-3">
            <li className="list-group-item">
              <strong>Album ID</strong> : {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Genre</strong> :{" "}
              {track.primary_genres.music_genre_list[0]
                ? track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : ""}
            </li>
            <li className="list-group-item">
              <strong>Explicit</strong> : {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Last Update Time</strong> :{" "}
              <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
            </li>
          </ul>
        </>
      );
    }
  }
}

export default Lyrics;

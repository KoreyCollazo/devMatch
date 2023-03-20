import React, { useEffect, useState, useContext } from 'react';
import { QUERY_DIRECTORY } from '../../utils/queries';
import { SocketContext } from '../SocketContext';
import { useQuery } from '@apollo/client';

const Directory = () => {
  const { loading, data } = useQuery(QUERY_DIRECTORY);
  const [index, setIndex] = useState(0);
  const { onlineUsers } = useContext(SocketContext);

  useEffect(() => {}, [index, data]);
  const name = `${data?.users[index].firstName}, ${data?.users[index].age} Y/O ${data?.users[index].gender} ${data?.users[index].height}`;
  const location = `${data?.users[index].location}`;
  const edu = `${data?.users[index].education}`;
  const bio = `${data?.users[index].bio}`;
  const id = data?.users[index]._id;
  const status = onlineUsers.find((o) => o.userId === id);
  console.log(status);

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card align-center">
          <div className="card-image">
            <img
              id="profile-picture"
              alt="headshot"
              src="https://img.icons8.com/plasticine/12x/morty-smith.png"
            />

            <h4 className="card-title">{name} </h4>

            {status ? (
              <div className="btn-floating halfway-fab waves-effect waves-light green">
                <i className="material-icons"></i>
              </div>
            ) : (
              <div className="btn-floating halfway-fab waves-effect waves-light red">
                <i className="material-icons"></i>
              </div>
            )}
          </div>
          <div className="card-content">
            <p>{name}</p>
            <p>{location}</p>
            <p>{edu}</p>
            <p>{bio}</p>
          </div>
          <div id="row">
            <div id="buttons">
              <button
                id="dislike"
                className="waves-effect waves-light btn red"
                tab-index="1"
                onClick={() => {
                  setIndex(index + 1);
                }}>
                <span className="dislike-emoji">Nope</span>
              </button>
              <button id="letter" className="waves-effect waves-light btn blue" tab-index="2">
                <span className="fa fa-instagram">Message</span>
              </button>
              <button
                id="like"
                className="waves-effect waves-light btn green"
                tab-index="1"
                onClick={() => {
                  setIndex(index + 1);
                }}>
                <span className="like-emoji">Yep</span>
              </button>
            </div>
          </div>
          {/* {userId ? (<VideoCall/>):(null)} */}
        </div>
      </div>
    </div>
  );
};

export default Directory;

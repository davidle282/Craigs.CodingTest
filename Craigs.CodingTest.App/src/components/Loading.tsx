import React from 'react'
import loadingGif from "../assets/img/loading.gif";

interface IProps {
    loading: boolean,
}

function Loading({loading}: IProps) {
    if (loading) {
        return (
          <div className="loading">
            <img className="full" src={loadingGif} alt="Loading... " />
          </div>
        );
    }
    return null;
}

export default Loading

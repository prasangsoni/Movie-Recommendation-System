import React from "react";
const MovieCard = ({ show }) => {
    const genres = show.genres ? show.genres.join(', ') : 'N/A';
    const directors = show.directors && show.directors.length > 0 ? show.directors.join(', ') : 'N/A';
    const cast = show.cast && show.cast.length > 0 ? show.cast.join(', ') : 'N/A';
  
    return (
        <>
      <div className="w-64 min-h-screen bg-white rounded-lg shadow-lg overflow-hidden mb-6 border border-gray-200 flex flex-col">
        <img
          className="w-full h-48 object-cover"
          src={show.imageSet?.verticalPoster?.w480 || 'https://via.placeholder.com/480x640'}
          alt={show.title}
        />
        <div className="flex flex-col p-4 space-y-2 flex-grow">
          <h2 className="text-lg font-bold text-gray-800 truncate">{show.title}</h2>
  
          <div className="flex flex-col space-y-1 text-sm text-gray-700">
            <p><strong className="font-bold text-gray-900">Genres:</strong> {genres}</p>
            <p><strong className="font-bold text-gray-900">Directors:</strong> {directors}</p>
            <p><strong className="font-bold text-gray-900">Cast:</strong> {cast}</p>
            <p><strong className="font-bold text-gray-900">Release Year:</strong> {show.releaseYear || 'N/A'}</p>
            <p><strong className="font-bold text-gray-900">Runtime:</strong> {show.runtime || 'N/A'} minutes</p>
            <p><strong className="font-bold text-gray-900">Rating:</strong> {show.rating || 'N/A'}</p>
          </div>
        </div>
      </div>
      </>
    );
  };
  
  
  export default MovieCard;
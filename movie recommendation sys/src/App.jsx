import { useEffect, useState } from 'react';
import './App.css'; 
import MovieCard from './MovieCard';

const App = () => {
  const [shows, setShows] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchShowDetails = async (title) => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      hostname: import.meta.env.VITE_HOSTNAME,
      path: `/shows/search/title?country=in&title=${title}&series_granularity=show&show_type=movie&output_language=en`,
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_API,
        'x-rapidapi-host': import.meta.env.VITE_HOST,
      },
    };

    try {
      const response = await fetch(`https://${options.hostname}${options.path}`, {
        headers: options.headers,
      });
      const data = await response.json();
      if (data && data.length > 0) {
        setShows(data); 
      } else {
        setShows([]); 
        setError('No movie found.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the show data:', error);
      setError('Error fetching data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchShowDetails(searchTerm); 
  }, []); 

  const handleSearch = (e) => {
    e.preventDefault();
    fetchShowDetails(searchTerm); 
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center p-6">
        <h1 className="text-3xl font-bold">Movie-Recommendation-System</h1>
      </header>

      <div className="flex justify-center p-4">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            placeholder="Search for a movie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      <main className="container mx-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-4 text-xl text-gray-700">Loading...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-4 text-xl text-red-500">{error}</div>
          </div>
        ) : shows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show, index) => (
              <MovieCard key={index} show={show} /> 
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-4 text-xl text-gray-500">No movie found. Please try again.</div>
          </div>
        )}
      </main>
    </div>
    </>
  );
};

export default App;

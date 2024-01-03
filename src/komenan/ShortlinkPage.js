import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShortlinkPage = () => {
  const { id } = useParams();
  const [movieTitle, setMovieTitle] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [redrLink, setRedrLink] = useState('');
  const [reurlLink, setReurlLink] = useState('');
  const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
  const reurlApiKey = '4070ff49d794e63116523b663c974755ecd1bf35939a04df8a38b58d65165567c4f5d6';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=en-US`);
        const data = await response.json();
        setMovieTitle(data.title);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id, tmdbApiKey]);

  useEffect(() => {
    const generateShortLinks = async () => {
      try {
        if (movieTitle && id) {
          const formattedTitle = movieTitle.toLowerCase().replace(/\s/g, '-');

          // Fetching short link from tinyurl.com
          const tinyUrlResponse = await axios.get(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(`https://pannflix.site//show/movie/${id}/${encodeURIComponent(formattedTitle)}`)}`);
          setShortLink(tinyUrlResponse.data.trim());

          // Fetching short link from redr.me/api/link/
          const redrResponse = await axios.post('https://redr.me/api/link/', {
            target_url: `https://pannflix.site//show/movie/${id}/${encodeURIComponent(formattedTitle)}`
          });
          setRedrLink(`https://redr.me/${redrResponse.data.code}`);

          // Fetching short link from reurl.cc
          const reurlResponse = await axios.post('https://api.reurl.cc/shorten', {
            url: `https://pannflix.site//show/movie/${id}/${encodeURIComponent(formattedTitle)}`,
            utm_source: 'Movie_Link' // Sesuaikan dengan sumber yang sesuai jika diperlukan
          }, {
            headers: {
              'Content-Type': 'application/json',
              'reurl-api-key': reurlApiKey
            }
          });
          setReurlLink(reurlResponse.data.short_url);
        }
      } catch (error) {
        console.error('Error generating short links:', error);
      }
    };

    generateShortLinks();
  }, [id, movieTitle, reurlApiKey]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied the text: ${text}`);
  };

  return (
    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="link-container">
        <label>TINYURL</label>
        <input type="text" style={{ color: 'black', width: '80%' }} value={shortLink} readOnly />
        <button onClick={() => copyToClipboard(shortLink)}>Copy text</button>
      </div>

      <div className="link-container">
        <label>REDR.ME</label>
        <input type="text" style={{ color: 'black', width: '80%' }} value={redrLink} readOnly />
        <button onClick={() => copyToClipboard(redrLink)}>Copy text</button>
      </div>

      <div className="link-container">
        <label>REURL.CC</label>
        <input type="text" style={{ color: 'black', width: '80%' }} value={reurlLink} readOnly />
        <button onClick={() => copyToClipboard(reurlLink)}>Copy text</button>
      </div>

      <div className="link-container">
        <label>MENTAHAN</label>
        <input type="text" style={{ color: 'black', width: '80%' }} value={`https://pannflix.site//show/movie/${id}/${encodeURIComponent(movieTitle?.toLowerCase().replace(/\s/g, '-'))}`} readOnly />
        <button onClick={() => copyToClipboard(`https://pannflix.site/show/movie/${id}/${encodeURIComponent(movieTitle?.toLowerCase().replace(/\s/g, '-'))}`)}>Copy text</button>
      </div>
    </div>
  );
};

export default ShortlinkPage;

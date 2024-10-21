import React, { useState } from 'react';

// This is a mock function to generate a short code
const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export default function ShortLinkGenerator() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(longUrl);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    const shortCode = generateShortCode();
    setShortUrl(`https://short.link/${shortCode}`);
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  };

  const formStyle: React.CSSProperties = {
    backgroundColor: '#f6f8fa',
    borderRadius: '6px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '20px',
    textAlign: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#24292e',
    verticalAlign: 'middle',
    backgroundColor: '#ffffff',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: 'inset 0 1px 0 rgba(225,228,232,0.2)',
  };

  const buttonStyle: React.CSSProperties = {
    color: '#ffffff',
    backgroundColor: '#000',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid rgba(27,31,35,0.15)',
    borderRadius: '6px',
    width: '100%',
    marginTop: '10px',
  };

  const errorStyle: React.CSSProperties = {
    color: '#cb2431',
    fontSize: '14px',
    marginTop: '10px',
  };

  const resultStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#ffffff',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={headingStyle}>Short Link Generator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={longUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLongUrl(e.target.value)
            }
            placeholder="Enter your long URL"
            aria-label="Long URL"
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Generate Short Link
          </button>
        </form>

        {error && <p style={errorStyle}>{error}</p>}

        {shortUrl && (
          <div style={resultStyle}>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Your short URL:
            </p>
            <p style={{ wordBreak: 'break-all' }}>{shortUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
}

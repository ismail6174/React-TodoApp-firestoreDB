import React from 'react';

const Footer = () => {
  const footerStyle = {
    position: 'absolute',
    bottom: '-70px',
    width: '100%',
    textAlign: 'center',
    fontSize: '14px',
    color: 'gray',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'underline',
  };

  return (
    <footer style={footerStyle}>
      © 2025 Ismail Shah | Built with ❤️ by{' '}
      <a href="https://github.com/ismail6174" target="_blank" rel="noopener noreferrer" style={linkStyle}>
        ismail6174
      </a>
    </footer>
  );
};

export default Footer;
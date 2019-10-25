import React from 'react';

function Voorbeeldapplicatie() {
  return (
    <div>
      <Header />
      {/* hoogtepunt-volgende-regel */}
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
        {/* hoogtepunt-volgende-regel */}
      </React.StrictMode>
      <Footer />
    </div>
  );
}

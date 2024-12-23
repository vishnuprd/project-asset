import React from 'react';

export default function Navbar() {
  return (
    <div>
      <div className="navbar flex items-center justify-between sticky top-0">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl ml-4" style={{ color: "#FF735C" }}>
            Asset Management
          </a>
        </div>
      </div>
    </div>
  );
}

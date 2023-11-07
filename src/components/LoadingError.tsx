import React from 'react';

export function LoadingError({ message }: { message: string }) {
  return (
    <p className="error">
      <span>🛑</span>
      {message}
    </p>
  );
}

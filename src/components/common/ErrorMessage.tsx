import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Something went wrong' }) => (
  <div className="text-center p-8">
    <p className="text-red-600">{message}</p>
  </div>
);

export default ErrorMessage;
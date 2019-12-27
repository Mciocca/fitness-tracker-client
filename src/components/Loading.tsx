import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

interface LoadingProps  {
  showLoading: boolean
}

const Loading: React.FC<LoadingProps> = ({ showLoading }) => {
  if(!showLoading) return null;

  return (
    <div className="loading-wrapper">
      <LinearProgress />
    </div>
  );
}

export default Loading;

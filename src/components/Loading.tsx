import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

interface LoadingProps  {
  showLoading: boolean
}

const Loading: React.FC<LoadingProps> = ({ showLoading }) => {
  return (
    <div style={{height: '5px'}}>
      { showLoading && <LinearProgress /> }
    </div>
  );
}

export default Loading;

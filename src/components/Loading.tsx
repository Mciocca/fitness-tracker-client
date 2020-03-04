import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

interface LoadingProps  {
  loading: boolean
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <div style={{height: '5px'}}>
      { loading && <LinearProgress /> }
    </div>
  );
}

export default Loading;

import React from 'react';
import { Spinner, Card, CardBody } from "@nextui-org/react";

const VideoLoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      
      {/* Next UI Spinner Component */}
      <Spinner 
        size="lg" 
        color="primary" 
        label="Loading video..." 
        labelColor="primary"
      />
      
      {/* Video placeholder card */}
      <Card className="w-80 h-60" shadow="sm">
        <CardBody className="flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <svg className="w-16 h-16 text-default-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <p className="text-default-500 text-sm">Preparing your video...</p>
          </div>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default VideoLoadingSpinner;
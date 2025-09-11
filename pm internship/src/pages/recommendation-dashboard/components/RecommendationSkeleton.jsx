import React from 'react';

const RecommendationSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-muted"></div>
          <div>
            <div className="h-5 bg-muted rounded w-32 mb-2"></div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>
        </div>
        <div className="h-6 bg-muted rounded-full w-20"></div>
      </div>

      {/* Details Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
        </div>
      </div>

      {/* Skills Skeleton */}
      <div className="mb-4">
        <div className="h-3 bg-muted rounded w-20 mb-2"></div>
        <div className="flex flex-wrap gap-1">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-14"></div>
        </div>
      </div>

      {/* Actions Skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-16"></div>
        </div>
        <div className="h-8 bg-muted rounded w-24"></div>
      </div>
    </div>
  );
};

export default RecommendationSkeleton;
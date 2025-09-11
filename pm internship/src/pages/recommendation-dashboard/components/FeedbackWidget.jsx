import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeedbackWidget = ({ onFeedback }) => {
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedback = (type) => {
    setFeedback(type);
    setIsSubmitted(true);
    onFeedback(type);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback(null);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-card">
        <div className="flex items-center justify-center space-x-2 text-success">
          <Icon name="CheckCircle2" size={20} />
          <span className="text-sm font-medium">Thank you for your feedback!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-card">
      <div className="text-center">
        <h4 className="font-medium text-foreground mb-2">How are these recommendations?</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Your feedback helps us improve our AI matching
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFeedback('positive')}
            iconName="ThumbsUp"
            iconSize={20}
            className={`transition-all duration-200 ${
              feedback === 'positive' ?'text-success bg-success/10' :'text-muted-foreground hover:text-success hover:bg-success/10'
            }`}
          >
            Helpful
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFeedback('negative')}
            iconName="ThumbsDown"
            iconSize={20}
            className={`transition-all duration-200 ${
              feedback === 'negative' ?'text-error bg-error/10' :'text-muted-foreground hover:text-error hover:bg-error/10'
            }`}
          >
            Not Helpful
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackWidget;
import React from 'react';
import Icon from '../../../components/AppIcon';

const CompatibilityScore = ({ score, matchedSkills, missingSkills }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full ${getScoreBgColor(score)} flex items-center justify-center`}>
          <Icon name="Target" size={24} className={getScoreColor(score)} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Compatibility</h3>
          <p className="text-sm text-muted-foreground">How well your profile matches this opportunity</p>
        </div>
      </div>
      {/* Score Display */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${score}, 100`}
              className={getScoreColor(score)}
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.1"
              className="text-muted-foreground"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold ${getScoreColor(score)}`}>{score}%</span>
          </div>
        </div>
        <div>
          <div className={`text-2xl font-bold ${getScoreColor(score)} mb-1`}>
            {score >= 80 ? 'Excellent Match' : score >= 60 ? 'Good Match' : 'Fair Match'}
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your skills, education, and preferences
          </p>
        </div>
      </div>
      {/* Skills Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            Matching Skills ({matchedSkills?.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedSkills?.map((skill, index) => (
              <span
                key={index}
                className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        {missingSkills?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              Skills to Develop ({missingSkills?.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityScore;
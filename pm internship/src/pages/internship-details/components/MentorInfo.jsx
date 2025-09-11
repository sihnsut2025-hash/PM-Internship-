import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MentorInfo = ({ mentor }) => {
  if (!mentor) return null;

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="UserCheck" size={20} />
        Your Mentor
      </h3>
      <div className="flex items-start gap-4">
        {/* Mentor Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
          <Image 
            src={mentor?.avatar} 
            alt={`${mentor?.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mentor Details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{mentor?.name}</h4>
              <p className="text-sm text-primary font-medium">{mentor?.designation}</p>
              <p className="text-xs text-muted-foreground">{mentor?.department}</p>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium text-foreground">{mentor?.rating}</span>
              <span className="text-xs text-muted-foreground">({mentor?.reviews} reviews)</span>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Briefcase" size={14} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Experience</span>
            </div>
            <p className="text-sm text-muted-foreground">{mentor?.experience}</p>
          </div>

          {/* Expertise */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Award" size={14} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Expertise</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mentor?.expertise?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mentor?.bio}
            </p>
          </div>

          {/* Mentoring Stats */}
          <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="font-semibold text-foreground">{mentor?.stats?.interns}</div>
              <div className="text-xs text-muted-foreground">Interns Mentored</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{mentor?.stats?.projects}</div>
              <div className="text-xs text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{mentor?.stats?.successRate}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorInfo;
import React from 'react';
import Icon from '../../../components/AppIcon';

const InternshipOverview = ({ internship }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="FileText" size={20} />
        Internship Overview
      </h3>
      {/* Key Details Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Duration</span>
          </div>
          <p className="font-semibold text-foreground">{internship?.duration} months</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="IndianRupee" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Stipend</span>
          </div>
          <p className="font-semibold text-foreground">₹{internship?.stipend?.toLocaleString('en-IN')}/month</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Openings</span>
          </div>
          <p className="font-semibold text-foreground">{internship?.openings} positions</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Deadline</span>
          </div>
          <p className="font-semibold text-foreground">{formatDate(internship?.applicationDeadline)}</p>
        </div>
      </div>
      {/* Description */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-3">About this Internship</h4>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          {internship?.description?.split('\n')?.map((paragraph, index) => (
            <p key={index} className="mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {/* Responsibilities */}
      <div className="mb-6">
        <h4 className="font-semibold text-foreground mb-3">Key Responsibilities</h4>
        <ul className="space-y-2">
          {internship?.responsibilities?.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-3">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Requirements */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-foreground mb-2">Education</h5>
            <p className="text-muted-foreground text-sm">{internship?.requirements?.education}</p>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Skills Required</h5>
            <div className="flex flex-wrap gap-2">
              {internship?.requirements?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipOverview;
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarInternships = ({ internships }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Lightbulb" size={20} />
        Similar Opportunities
      </h3>
      <div className="grid gap-4">
        {internships?.map((internship) => (
          <div
            key={internship?.id}
            className="border border-border rounded-lg p-4 hover:shadow-card transition-all duration-200 ease-out-custom"
          >
            <div className="flex gap-4">
              {/* Company Logo */}
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <Image 
                  src={internship?.company?.logo} 
                  alt={`${internship?.company?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground truncate">{internship?.title}</h4>
                    <p className="text-sm text-muted-foreground">{internship?.company?.name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-success">
                    <Icon name="Target" size={14} />
                    <span className="text-sm font-medium">{internship?.matchScore}% match</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    <span>{internship?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    <span>{internship?.duration} months</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="IndianRupee" size={12} />
                    <span>₹{internship?.stipend?.toLocaleString('en-IN')}/month</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {internship?.skills?.slice(0, 3)?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {internship?.skills?.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-1">
                        +{internship?.skills?.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link to={`/internship-details?id=${internship?.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link to="/recommendation-dashboard">
          <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
            View All Recommendations
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SimilarInternships;
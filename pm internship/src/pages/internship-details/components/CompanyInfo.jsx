import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyInfo = ({ company }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Building2" size={20} />
        About {company?.name}
      </h3>
      {/* Company Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0">
          <Image 
            src={company?.logo} 
            alt={`${company?.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">{company?.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{company?.industry}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={12} />
              <span>{company?.headquarters}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Users" size={12} />
              <span>{company?.size} employees</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              <span>Founded {company?.founded}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Company Description */}
      <div className="mb-6">
        <h5 className="font-medium text-foreground mb-2">Company Overview</h5>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {company?.description}
        </p>
      </div>
      {/* Company Culture */}
      <div className="mb-6">
        <h5 className="font-medium text-foreground mb-3">Company Culture & Values</h5>
        <div className="grid sm:grid-cols-2 gap-3">
          {company?.culture?.map((value, index) => (
            <div key={index} className="flex items-start gap-2">
              <Icon name="Star" size={14} className="text-warning mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Benefits */}
      <div className="mb-6">
        <h5 className="font-medium text-foreground mb-3">What We Offer</h5>
        <div className="grid sm:grid-cols-2 gap-3">
          {company?.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <Icon name="Gift" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Info */}
      <div className="border-t border-border pt-4">
        <h5 className="font-medium text-foreground mb-3">Contact Information</h5>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Globe" size={14} className="text-primary" />
            <a 
              href={company?.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {company?.website}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Mail" size={14} className="text-primary" />
            <a 
              href={`mailto:${company?.email}`}
              className="text-sm text-primary hover:underline"
            >
              {company?.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
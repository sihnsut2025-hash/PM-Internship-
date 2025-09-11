import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ location }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-6">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="MapPin" size={20} />
        Location Details
      </h3>
      {/* Address Information */}
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <Icon name="Building" size={16} className="text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">{location?.address}</p>
            <p className="text-sm text-muted-foreground">
              {location?.city}, {location?.state} - {location?.pincode}
            </p>
          </div>
        </div>

        {/* Additional Location Info */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Train" size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Nearest Metro: {location?.nearestMetro}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Car" size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Parking: {location?.parking ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`${location?.city} Location`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${location?.coordinates?.lat},${location?.coordinates?.lng}&z=14&output=embed`}
          className="border-0"
        />
      </div>
      {/* Transportation Options */}
      <div className="mt-4">
        <h5 className="font-medium text-foreground mb-3">Transportation Options</h5>
        <div className="grid sm:grid-cols-2 gap-3">
          {location?.transportation?.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon 
                name={option?.type === 'metro' ? 'Train' : option?.type === 'bus' ? 'Bus' : 'Car'} 
                size={14} 
                className="text-primary" 
              />
              <span className="text-sm text-muted-foreground">
                {option?.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
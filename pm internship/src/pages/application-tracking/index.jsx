import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ApplicationCard from './components/ApplicationCard';
import StatusFilter from './components/StatusFilter';
import ApplicationStats from './components/ApplicationStats';
import SearchAndSort from './components/SearchAndSort';
import ApplicationModal from './components/ApplicationModal';

const ApplicationTracking = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock applications data
  const mockApplications = [
    {
      id: 'APP001',
      role: 'Software Development Intern',
      company: 'Tech Mahindra',
      status: 'Interview Scheduled',
      appliedDate: '2025-01-05',
      location: 'Mumbai, Maharashtra',
      duration: '6 months',
      stipend: 15000,
      industry: 'Information Technology',
      companySize: '10,000+ employees',
      companyDescription: 'Leading digital transformation, consulting and business re-engineering services company.',
      hasUpdate: true,
      nextStep: 'Technical interview scheduled for 15th January 2025 at 2:00 PM',
      deadline: '2025-01-15',
      reviewStartDate: '2025-01-06',
      interviewDate: '2025-01-15',
      contactInfo: {
        email: 'internships@techmahindra.com',
        phone: '+91-22-6601-8000'
      }
    },
    {
      id: 'APP002',
      role: 'Digital Marketing Intern',
      company: 'Wipro Limited',
      status: 'Under Review',
      appliedDate: '2025-01-03',
      location: 'Bangalore, Karnataka',
      duration: '4 months',
      stipend: 12000,
      industry: 'Information Technology',
      companySize: '200,000+ employees',
      companyDescription: 'Global information technology, consulting and business process services company.',
      hasUpdate: false,
      nextStep: 'Application is being reviewed by the hiring team',
      reviewStartDate: '2025-01-04',
      contactInfo: {
        email: 'careers@wipro.com',
        phone: '+91-80-2844-0011'
      }
    },
    {
      id: 'APP003',
      role: 'Data Analytics Intern',
      company: 'Infosys',
      status: 'Selected',
      appliedDate: '2024-12-28',
      location: 'Hyderabad, Telangana',
      duration: '6 months',
      stipend: 18000,
      industry: 'Information Technology',
      companySize: '300,000+ employees',
      companyDescription: 'Global leader in next-generation digital services and consulting.',
      hasUpdate: true,
      nextStep: 'Complete onboarding documents by 20th January 2025',
      deadline: '2025-01-20',
      reviewStartDate: '2024-12-29',
      interviewDate: '2025-01-08',
      decisionDate: '2025-01-10',
      contactInfo: {
        email: 'internship@infosys.com',
        phone: '+91-40-4015-5555'
      }
    },
    {
      id: 'APP004',
      role: 'Content Writing Intern',
      company: 'Tata Consultancy Services',
      status: 'Not Selected',
      appliedDate: '2024-12-25',
      location: 'Chennai, Tamil Nadu',
      duration: '3 months',
      stipend: 10000,
      industry: 'Information Technology',
      companySize: '500,000+ employees',
      companyDescription: 'IT services, consulting and business solutions organization.',
      hasUpdate: false,
      reviewStartDate: '2024-12-26',
      interviewDate: '2025-01-05',
      decisionDate: '2025-01-08',
      contactInfo: {
        email: 'internships@tcs.com',
        phone: '+91-44-6654-4000'
      }
    },
    {
      id: 'APP005',
      role: 'UI/UX Design Intern',
      company: 'HCL Technologies',
      status: 'Submitted',
      appliedDate: '2025-01-08',
      location: 'Noida, Uttar Pradesh',
      duration: '5 months',
      stipend: 14000,
      industry: 'Information Technology',
      companySize: '150,000+ employees',
      companyDescription: 'Global technology company that helps enterprises reimagine their businesses for the digital age.',
      hasUpdate: false,
      nextStep: 'Application submitted successfully. You will hear back within 5-7 business days.',
      contactInfo: {
        email: 'careers@hcl.com',
        phone: '+91-120-4135-000'
      }
    },
    {
      id: 'APP006',
      role: 'Business Analyst Intern',
      company: 'Accenture',
      status: 'Under Review',
      appliedDate: '2025-01-02',
      location: 'Pune, Maharashtra',
      duration: '6 months',
      stipend: 16000,
      industry: 'Consulting',
      companySize: '700,000+ employees',
      companyDescription: 'Global professional services company with leading capabilities in digital, cloud and security.',
      hasUpdate: false,
      nextStep: 'Your profile is being evaluated by our recruitment team',
      reviewStartDate: '2025-01-03',
      contactInfo: {
        email: 'internships@accenture.com',
        phone: '+91-20-6604-4000'
      }
    }
  ];

  useEffect(() => {
    // Load language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Load applications (mock data)
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  // Calculate application statistics
  const applicationStats = {
    total: applications?.length,
    underReview: applications?.filter(app => app?.status?.toLowerCase() === 'under review')?.length,
    interviews: applications?.filter(app => app?.status?.toLowerCase() === 'interview scheduled')?.length,
    selected: applications?.filter(app => app?.status?.toLowerCase() === 'selected')?.length
  };

  // Calculate status counts for filter
  const applicationCounts = {
    all: applications?.length,
    submitted: applications?.filter(app => app?.status?.toLowerCase() === 'submitted')?.length,
    underReview: applications?.filter(app => app?.status?.toLowerCase() === 'under review')?.length,
    interview: applications?.filter(app => app?.status?.toLowerCase() === 'interview scheduled')?.length,
    selected: applications?.filter(app => app?.status?.toLowerCase() === 'selected')?.length,
    rejected: applications?.filter(app => app?.status?.toLowerCase() === 'not selected')?.length
  };

  // Filter and sort applications
  useEffect(() => {
    let filtered = [...applications];

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered?.filter(app => app?.status?.toLowerCase() === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered?.filter(app =>
        app?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        app?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        app?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Sort applications
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'date-asc':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'company-asc':
          return a?.company?.localeCompare(b?.company);
        case 'company-desc':
          return b?.company?.localeCompare(a?.company);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  }, [applications, selectedStatus, searchTerm, sortBy]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleOpenPortal = (application) => {
    window.open(`https://pminternship.gov.in/application/${application?.id}`, '_blank');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentLanguage === 'hi' ? 'आवेदन ट्रैकिंग' : 'Application Tracking'}
                </h1>
                <p className="text-muted-foreground">
                  {currentLanguage === 'hi' ?'अपने इंटर्नशिप आवेदनों की स्थिति और प्रगति को ट्रैक करें' :'Track the status and progress of your internship applications'
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link to="/recommendation-dashboard">
                  <Button
                    variant="outline"
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    {currentLanguage === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Application Statistics */}
          <ApplicationStats stats={applicationStats} />

          {/* Search and Sort */}
          <SearchAndSort
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Status Filter Sidebar */}
            <div className="lg:col-span-1">
              <StatusFilter
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                applicationCounts={applicationCounts}
              />
            </div>

            {/* Applications List */}
            <div className="lg:col-span-3">
              {filteredApplications?.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {currentLanguage === 'hi' ? 'कोई आवेदन नहीं मिला' : 'No Applications Found'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {currentLanguage === 'hi' ?'आपके खोज मानदंडों से मेल खाने वाले कोई आवेदन नहीं मिले।' :'No applications match your search criteria.'
                    }
                  </p>
                  <Link to="/recommendation-dashboard">
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                    >
                      {currentLanguage === 'hi' ? 'नए अवसर खोजें' : 'Find New Opportunities'}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications?.map((application) => (
                    <ApplicationCard
                      key={application?.id}
                      application={application}
                      onViewDetails={handleViewDetails}
                      onOpenPortal={handleOpenPortal}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {currentLanguage === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/recommendation-dashboard">
                <Button
                  variant="outline"
                  iconName="Search"
                  iconPosition="left"
                  fullWidth
                >
                  {currentLanguage === 'hi' ? 'नए अवसर खोजें' : 'Find New Opportunities'}
                </Button>
              </Link>
              <Link to="/profile-setup">
                <Button
                  variant="outline"
                  iconName="User"
                  iconPosition="left"
                  fullWidth
                >
                  {currentLanguage === 'hi' ? 'प्रोफाइल अपडेट करें' : 'Update Profile'}
                </Button>
              </Link>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                fullWidth
                onClick={() => {
                  // Mock export functionality
                  const csvContent = applications?.map(app => 
                    `${app?.id},${app?.role},${app?.company},${app?.status},${app?.appliedDate}`
                  )?.join('\n');
                  const element = document.createElement('a');
                  element?.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent('ID,Role,Company,Status,Applied Date\n' + csvContent));
                  element?.setAttribute('download', 'applications.csv');
                  element.style.display = 'none';
                  document.body?.appendChild(element);
                  element?.click();
                  document.body?.removeChild(element);
                }}
              >
                {currentLanguage === 'hi' ? 'रिपोर्ट डाउनलोड करें' : 'Download Report'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Application Details Modal */}
      <ApplicationModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ApplicationTracking;
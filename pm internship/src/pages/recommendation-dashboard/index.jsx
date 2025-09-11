import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RecommendationCard from './components/RecommendationCard';
import ProfileSummary from './components/ProfileSummary';
import FilterPanel from './components/FilterPanel';
import RecommendationSkeleton from './components/RecommendationSkeleton';
import FeedbackWidget from './components/FeedbackWidget';
import ActivityFeed from './components/ActivityFeed';

const RecommendationDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    industry: '',
    duration: '',
    stipend: ''
  });

  // Mock user profile data
  const userProfile = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    location: "Mumbai, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    completionPercentage: 85,
    basicInfoComplete: true,
    skillsComplete: true,
    educationComplete: true,
    preferencesComplete: false,
    applicationsCount: 12,
    bookmarksCount: 8
  };

  // Mock internship recommendations data
  const mockRecommendations = [
    {
      id: 1,
      roleTitle: "Frontend Developer Intern",
      companyName: "TechCorp Solutions",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      location: "Mumbai",
      duration: "6 months",
      stipend: 25000,
      industry: "Technology",
      matchPercentage: 92,
      matchingSkills: ["React", "JavaScript", "HTML/CSS", "Git"],
      isBookmarked: false,
      description: `Join our dynamic frontend team and work on cutting-edge web applications.\nGain hands-on experience with modern React development and contribute to real projects.`
    },
    {
      id: 2,
      roleTitle: "Digital Marketing Intern",
      companyName: "Creative Agency Hub",
      companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop",
      location: "Delhi",
      duration: "4 months",
      stipend: 18000,
      industry: "Marketing",
      matchPercentage: 87,
      matchingSkills: ["Social Media", "Content Writing", "Analytics", "SEO"],
      isBookmarked: true,
      description: `Work with leading brands on innovative digital marketing campaigns.\nLearn from industry experts and develop comprehensive marketing strategies.`
    },
    {
      id: 3,
      roleTitle: "Data Science Intern",
      companyName: "Analytics Pro",
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      location: "Bangalore",
      duration: "6 months",
      stipend: 30000,
      industry: "Technology",
      matchPercentage: 78,
      matchingSkills: ["Python", "Machine Learning", "SQL", "Statistics"],
      isBookmarked: false,
      description: `Dive deep into data science and machine learning projects.\nWork with real datasets and contribute to AI-driven solutions.`
    },
    {
      id: 4,
      roleTitle: "Content Writer Intern",
      companyName: "Media Dynamics",
      companyLogo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop",
      location: "Remote",
      duration: "3 months",
      stipend: 15000,
      industry: "Media",
      matchPercentage: 82,
      matchingSkills: ["Writing", "Research", "SEO", "Content Strategy"],
      isBookmarked: false,
      description: `Create engaging content for various digital platforms.\nDevelop your writing skills while working with experienced editors.`
    },
    {
      id: 5,
      roleTitle: "UI/UX Design Intern",
      companyName: "Design Studio",
      companyLogo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop",
      location: "Pune",
      duration: "5 months",
      stipend: 22000,
      industry: "Design",
      matchPercentage: 89,
      matchingSkills: ["Figma", "User Research", "Prototyping", "Design Thinking"],
      isBookmarked: true,
      description: `Design intuitive user experiences for mobile and web applications.\nCollaborate with cross-functional teams and learn industry best practices.`
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      type: 'application',
      description: 'Applied to Frontend Developer Intern at TechCorp Solutions',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      type: 'bookmark',
      description: 'Bookmarked UI/UX Design Intern at Design Studio',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      type: 'view',
      description: 'Viewed Data Science Intern at Analytics Pro',
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      type: 'profile_update',
      description: 'Updated skills in your profile',
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    }
  ];

  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate loading recommendations
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setFilteredRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Filter recommendations based on current filters
    let filtered = recommendations;

    if (filters?.search) {
      filtered = filtered?.filter(rec => 
        rec?.roleTitle?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        rec?.companyName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        rec?.matchingSkills?.some(skill => skill?.toLowerCase()?.includes(filters?.search?.toLowerCase()))
      );
    }

    if (filters?.location) {
      filtered = filtered?.filter(rec => 
        rec?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    if (filters?.industry) {
      filtered = filtered?.filter(rec => 
        rec?.industry?.toLowerCase() === filters?.industry?.toLowerCase()
      );
    }

    if (filters?.stipend) {
      const [min, max] = filters?.stipend?.split('-')?.map(s => parseInt(s?.replace('+', '')));
      filtered = filtered?.filter(rec => {
        if (filters?.stipend?.includes('+')) {
          return rec?.stipend >= min;
        }
        return rec?.stipend >= min && rec?.stipend <= max;
      });
    }

    setFilteredRecommendations(filtered);
  }, [filters, recommendations]);

  const handleBookmark = (internshipId, isBookmarked) => {
    setRecommendations(prev => 
      prev?.map(rec => 
        rec?.id === internshipId ? { ...rec, isBookmarked } : rec
      )
    );
  };

  const handleApply = (internshipId) => {
    // Simulate application process
    const internship = recommendations?.find(rec => rec?.id === internshipId);
    if (internship) {
      alert(`Redirecting to PM Internship Scheme portal to apply for ${internship?.roleTitle} at ${internship?.companyName}`);
      // In real app, this would redirect to external portal
    }
  };

  const handleViewDetails = (internshipId) => {
    navigate(`/internship-details?id=${internshipId}`);
  };

  const handleEditProfile = () => {
    navigate('/profile-setup');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      industry: '',
      duration: '',
      stipend: ''
    });
  };

  const handleFeedback = (type) => {
    console.log('Feedback received:', type);
    // In real app, this would send feedback to analytics
  };

  const content = {
    en: {
      title: "Recommended Internships",
      subtitle: "AI-powered matches based on your profile",
      noResults: "No internships match your current filters",
      adjustFilters: "Try adjusting your filters or search terms",
      loadingMessage: "Finding the best internships for you..."
    },
    hi: {
      title: "सुझाए गए इंटर्नशिप",
      subtitle: "आपकी प्रोफाइल के आधार पर AI-संचालित मैच",
      noResults: "आपके वर्तमान फिल्टर से कोई इंटर्नशिप मेल नहीं खाती",
      adjustFilters: "अपने फिल्टर या खोज शब्दों को समायोजित करने का प्रयास करें",
      loadingMessage: "आपके लिए सबसे अच्छी इंटर्नशिप खोजी जा रही है..."
    }
  };

  const currentContent = content?.[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Profile & Activity */}
            <div className="lg:col-span-1 space-y-6">
              <ProfileSummary 
                userProfile={userProfile}
                onEditProfile={handleEditProfile}
              />
              <ActivityFeed activities={recentActivities} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {currentContent?.title}
                </h1>
                <p className="text-muted-foreground">
                  {currentContent?.subtitle}
                </p>
              </div>

              {/* Recommendations Grid */}
              {isLoading ? (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="inline-flex items-center space-x-2 text-muted-foreground">
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      <span>{currentContent?.loadingMessage}</span>
                    </div>
                  </div>
                  {[1, 2, 3]?.map(i => (
                    <RecommendationSkeleton key={i} />
                  ))}
                </div>
              ) : filteredRecommendations?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {currentContent?.noResults}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {currentContent?.adjustFilters}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredRecommendations?.map((internship) => (
                    <RecommendationCard
                      key={internship?.id}
                      internship={internship}
                      onBookmark={handleBookmark}
                      onApply={handleApply}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}

              {/* Feedback Widget */}
              {!isLoading && filteredRecommendations?.length > 0 && (
                <FeedbackWidget onFeedback={handleFeedback} />
              )}
            </div>

            {/* Right Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecommendationDashboard;
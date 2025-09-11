import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InternshipHeader from './components/InternshipHeader';
import CompatibilityScore from './components/CompatibilityScore';
import InternshipOverview from './components/InternshipOverview';
import CompanyInfo from './components/CompanyInfo';
import LocationMap from './components/LocationMap';
import MentorInfo from './components/MentorInfo';
import SimilarInternships from './components/SimilarInternships';

const InternshipDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const internshipId = searchParams?.get('id') || '1';
  
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock internship data
  const internshipData = {
    id: internshipId,
    title: "Software Development Intern",
    company: {
      name: "TechCorp Solutions Pvt Ltd",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop&crop=center",
      industry: "Information Technology",
      headquarters: "Bangalore, Karnataka",
      size: "500-1000",
      founded: "2015",
      description: `TechCorp Solutions is a leading software development company specializing in enterprise solutions and digital transformation. We work with Fortune 500 companies to build scalable, innovative technology solutions that drive business growth.\n\nOur team of experienced developers, designers, and project managers collaborate to deliver high-quality software products using cutting-edge technologies and agile methodologies.`,
      culture: [
        "Innovation-driven work environment",
        "Collaborative team culture",
        "Continuous learning opportunities",
        "Work-life balance focus",
        "Diversity and inclusion commitment",
        "Open communication policy"
      ],
      benefits: [
        "Flexible working hours",
        "Health insurance coverage",
        "Professional development budget",
        "Modern office facilities",
        "Team building activities",
        "Performance-based incentives"
      ],
      website: "https://techcorp-solutions.com",
      email: "careers@techcorp-solutions.com"
    },
    description: `Join our dynamic software development team as an intern and gain hands-on experience in building enterprise-level applications. You'll work alongside experienced developers on real projects that impact thousands of users.\n\nThis internship offers exposure to modern development practices, agile methodologies, and cutting-edge technologies. You'll contribute to meaningful projects while receiving mentorship from industry professionals.\n\nPerfect opportunity for students looking to kickstart their career in software development with a company that values innovation and professional growth.`,
    responsibilities: [
      "Develop and maintain web applications using React.js and Node.js",
      "Collaborate with cross-functional teams to define and implement new features",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and follow best practices",
      "Assist in testing and debugging applications",
      "Learn and implement new technologies as required",
      "Contribute to technical documentation and user guides"
    ],
    requirements: {
      education: "Bachelor's degree in Computer Science, IT, or related field (pursuing or completed)",
      skills: ["JavaScript", "React.js", "HTML/CSS", "Git", "Problem Solving", "Communication"]
    },
    location: {
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      address: "TechCorp Tower, MG Road, Bangalore",
      coordinates: {
        lat: 12.9716,
        lng: 77.5946
      },
      nearestMetro: "MG Road Metro Station (500m)",
      parking: true,
      transportation: [
        { type: "metro", description: "MG Road Metro - 5 min walk" },
        { type: "bus", description: "Multiple bus routes available" },
        { type: "car", description: "Paid parking available on-site" }
      ]
    },
    duration: 6,
    stipend: 25000,
    openings: 5,
    applicationDeadline: "2025-01-15",
    postedDate: "2024-12-15",
    mentor: {
      name: "Priya Sharma",
      designation: "Senior Software Engineer",
      department: "Product Development",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      experience: "8+ years in full-stack development with expertise in React, Node.js, and cloud technologies",
      bio: `Priya is a passionate software engineer with extensive experience in building scalable web applications. She has mentored over 50 interns and believes in hands-on learning through real-world projects.`,
      expertise: ["React.js", "Node.js", "AWS", "MongoDB", "System Design"],
      rating: 4.8,
      reviews: 42,
      stats: {
        interns: 23,
        projects: 15,
        successRate: 95
      }
    }
  };

  // Mock compatibility data
  const compatibilityData = {
    score: 85,
    matchedSkills: ["JavaScript", "React.js", "HTML/CSS", "Problem Solving"],
    missingSkills: ["Node.js", "MongoDB"]
  };

  // Mock similar internships
  const similarInternships = [
    {
      id: "2",
      title: "Frontend Developer Intern",
      company: {
        name: "WebTech Innovations",
        logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop&crop=center"
      },
      location: "Mumbai, Maharashtra",
      duration: 4,
      stipend: 22000,
      matchScore: 78,
      skills: ["React.js", "TypeScript", "CSS", "JavaScript"]
    },
    {
      id: "3",
      title: "Full Stack Development Intern",
      company: {
        name: "Digital Solutions Ltd",
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=200&fit=crop&crop=center"
      },
      location: "Pune, Maharashtra",
      duration: 6,
      stipend: 28000,
      matchScore: 82,
      skills: ["JavaScript", "React.js", "Node.js", "MongoDB", "Express.js"]
    },
    {
      id: "4",
      title: "UI/UX Development Intern",
      company: {
        name: "Creative Tech Studio",
        logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop&crop=center"
      },
      location: "Hyderabad, Telangana",
      duration: 5,
      stipend: 20000,
      matchScore: 72,
      skills: ["HTML/CSS", "JavaScript", "Figma", "React.js"]
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check if internship is bookmarked
    const bookmarkedInternships = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    setIsBookmarked(bookmarkedInternships?.includes(internshipId));

    // Check if user has applied
    const appliedInternships = JSON.parse(localStorage.getItem('appliedInternships') || '[]');
    setHasApplied(appliedInternships?.includes(internshipId));
  }, [internshipId]);

  const handleApply = () => {
    if (hasApplied) return;

    // Simulate application process
    const appliedInternships = JSON.parse(localStorage.getItem('appliedInternships') || '[]');
    appliedInternships?.push(internshipId);
    localStorage.setItem('appliedInternships', JSON.stringify(appliedInternships));
    setHasApplied(true);

    // In real implementation, this would redirect to external portal
    alert('Application submitted successfully! You will be redirected to the PM Internship Scheme portal.');
  };

  const handleBookmark = () => {
    const bookmarkedInternships = JSON.parse(localStorage.getItem('bookmarkedInternships') || '[]');
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedInternships?.filter(id => id !== internshipId);
      localStorage.setItem('bookmarkedInternships', JSON.stringify(updatedBookmarks));
      setIsBookmarked(false);
    } else {
      bookmarkedInternships?.push(internshipId);
      localStorage.setItem('bookmarkedInternships', JSON.stringify(bookmarkedInternships));
      setIsBookmarked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: internshipData?.title,
        text: `Check out this internship opportunity at ${internshipData?.company?.name}`,
        url: window.location?.href
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleGoBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Back to Recommendations
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <InternshipHeader
                internship={internshipData}
                onApply={handleApply}
                onBookmark={handleBookmark}
                onShare={handleShare}
                isBookmarked={isBookmarked}
                hasApplied={hasApplied}
              />

              <CompatibilityScore
                score={compatibilityData?.score}
                matchedSkills={compatibilityData?.matchedSkills}
                missingSkills={compatibilityData?.missingSkills}
              />

              <InternshipOverview internship={internshipData} />

              <CompanyInfo company={internshipData?.company} />

              <LocationMap location={internshipData?.location} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <MentorInfo mentor={internshipData?.mentor} />

              <SimilarInternships internships={similarInternships} />

              {/* Quick Actions */}
              <div className="bg-card rounded-xl border border-border shadow-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => alert('Contact feature coming soon!')}
                  >
                    Contact HR
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => alert('Schedule feature coming soon!')}
                  >
                    Schedule Call
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => navigate('/application-tracking')}
                  >
                    Track Application
                  </Button>
                </div>
              </div>

              {/* Application Deadline Alert */}
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} className="text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Application Deadline</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Applications close on {new Date(internshipData.applicationDeadline)?.toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-warning font-medium">
                      {Math.ceil((new Date(internshipData.applicationDeadline) - new Date()) / (1000 * 60 * 60 * 24))} days remaining
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternshipDetails;
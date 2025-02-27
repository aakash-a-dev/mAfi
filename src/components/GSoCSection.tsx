import React, { useState, useEffect, ChangeEvent } from 'react';
import { Organization, Deadline } from '../types/gsoc';
import { fetchOrganizations, fetchDeadlines, toggleFavorite, TECH_STACKS, PROJECT_TYPES, YEARS } from '../services/gsocService';
import { Github, Globe, Star, Calendar, ExternalLink } from 'lucide-react';

interface GSoCSectionProps {
  className?: string;
}

export const GSoCSection: React.FC<GSoCSectionProps> = ({ className = '' }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    techStack: '',
    year: '',
    projectType: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [orgsData, deadlinesData] = await Promise.all([
          fetchOrganizations(),
          fetchDeadlines()
        ]);
        setOrganizations(orgsData);
        setDeadlines(deadlinesData);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFavoriteClick = async (orgName: string) => {
    toggleFavorite(orgName);
    // Refresh organizations to update favorite status
    const updatedOrgs = await fetchOrganizations();
    setOrganizations(updatedOrgs);
  };

  const filteredOrganizations = organizations.filter((org: Organization) => {
    const matchesSearch = !searchQuery || 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTechStack = !filters.techStack || 
      org.techStack.some(tech => tech.toLowerCase() === filters.techStack.toLowerCase());
    
    const matchesYear = !filters.year || 
      org.year === (filters.year ? parseInt(filters.year) : null);
    
    const matchesProjectType = !filters.projectType || 
      org.projectType.toLowerCase() === filters.projectType.toLowerCase();

    return matchesSearch && matchesTechStack && matchesYear && matchesProjectType;
  });

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>, filterKey: keyof typeof filters) => {
    const value = e.target.value;
    // For tech stacks, ensure we match the case from the TECH_STACKS array
    if (filterKey === 'techStack' && value) {
      const matchingTech = TECH_STACKS.find(tech => tech.toLowerCase() === value.toLowerCase());
      setFilters({ ...filters, [filterKey]: matchingTech || value });
    } else {
      setFilters({ ...filters, [filterKey]: value });
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return (
      <div className="text-red-500 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`gsoc-section ${className}`}>
      <h2 className="text-2xl font-bold mb-6">GSoC & Outreachy Organizations</h2>
      
      {/* Deadlines Section */}
      <div className="mb-8 p-4 border rounded border-[#282828] bg-[#1a1a1a]">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>Upcoming Deadlines</span>
        </h3>
        <div className="grid gap-4">
          {deadlines
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((deadline, index) => (
              <a
                key={index}
                href={deadline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-3 rounded bg-[#282828] hover:bg-[#333333] transition-colors group"
              >
                <div className="min-w-[100px] text-sm">
                  {new Date(deadline.date).toLocaleDateString()}
                </div>
                <div className="flex-1">
                  <div className="font-medium flex items-center gap-2">
                    {deadline.program} - {deadline.phase}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-sm text-gray-400">{deadline.description}</div>
                </div>
              </a>
            ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search organizations..."
          className="w-full p-2 border rounded bg-[#1a1a1a] border-[#282828] text-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded bg-[#1a1a1a] border-[#282828] text-white"
          value={filters.techStack}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange(e, 'techStack')}
        >
          <option value="">All Tech Stacks</option>
          {TECH_STACKS.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded bg-[#1a1a1a] border-[#282828] text-white"
          value={filters.year}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange(e, 'year')}
        >
          <option value="">All Years</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded bg-[#1a1a1a] border-[#282828] text-white"
          value={filters.projectType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange(e, 'projectType')}
        >
          <option value="">All Project Types</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Organizations List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center p-4">
            <p>Loading organizations...</p>
          </div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="text-center p-4">
            <p>No organizations found matching your criteria.</p>
          </div>
        ) : (
          filteredOrganizations.map((org: Organization) => (
            <div key={org.name} className="p-4 border rounded border-[#282828] bg-[#1a1a1a]">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-white">{org.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFavoriteClick(org.name)}
                    className={`p-2 rounded hover:bg-[#282828] transition-colors ${
                      org.isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Star className="w-5 h-5" fill={org.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <a
                    href={org.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded hover:bg-[#282828] text-gray-400 hover:text-white transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href={org.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded hover:bg-[#282828] text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <p className="text-gray-400 mt-2">{org.description}</p>
              <div className="flex gap-2 mt-4">
                {org.techStack.map((tech: string) => (
                  <span key={tech} className="px-2 py-1 bg-[#282828] rounded text-sm text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Guide Section */}
      <div className="mt-8 p-4 rounded border border-[#282828] bg-[#1a1a1a]">
        <h3 className="text-xl font-semibold mb-4 text-white">GSoC & Outreachy Guide</h3>
        <div className="space-y-4">
          <section>
            <h4 className="font-medium text-white">Overview</h4>
            <p className="text-gray-400">
              Google Summer of Code (GSoC) and Outreachy are programs that provide opportunities for 
              newcomers to get involved in open source software development. Both programs offer 
              paid internships to work on open source projects.
            </p>
          </section>
          <section>
            <h4 className="font-medium text-white">How to Apply</h4>
            <p className="text-gray-400">
              1. Review participating organizations and their project ideas<br />
              2. Set up your development environment and try to make small contributions<br />
              3. Contact mentors and discuss project proposals<br />
              4. Submit your application before the deadline
            </p>
          </section>
          <section>
            <h4 className="font-medium text-white">FAQs</h4>
            <div className="space-y-2 text-gray-400">
              <p><strong>When do applications open?</strong> GSoC applications typically open in March/April.</p>
              <p><strong>Who can apply?</strong> GSoC is open to anyone 18 years or older enrolled in a post-secondary academic program.</p>
              <p><strong>Is it paid?</strong> Yes, both GSoC and Outreachy provide stipends to participants.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}; 
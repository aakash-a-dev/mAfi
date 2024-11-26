import { JSXElementConstructor, ReactElement, ReactNode, useState } from 'react';
import { Filter, X } from 'lucide-react';

export interface Filters {
  languages: string[];
  difficulty: string[];
  labels: string[];
}

interface FilterBarProps {
  onFiltersChange: (filters: Filters) => void;
}

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'Ruby',
  'PHP',
] as const;

const DIFFICULTIES = [
  'beginner-friendly',
  'easy',
  'intermediate',
] as const;

const TECH_LABELS = [
  'react',
  'vue',
  'angular',
  'node.js',
  'django',
  'spring',
  'docker',
  'kubernetes',
  'aws',
  'frontend',
  'backend',
  'fullstack',
] as const;

type FilterValue = typeof LANGUAGES[number] | typeof DIFFICULTIES[number] | typeof TECH_LABELS[number];

export default function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    languages: [],
    difficulty: [],
    labels: [],
  });

  const handleFilterChange = <T extends keyof Filters>(category: T, value: FilterValue) => {
    const updatedFilters = { ...selectedFilters };
    const categoryFilters = updatedFilters[category];
  
    if (categoryFilters.includes(value)) {
      updatedFilters[category] = categoryFilters.filter((item) => item !== value);
    } else {
      updatedFilters[category] = [...categoryFilters, value];
    }
  
    setSelectedFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };
  
  

  const removeFilter = (category: keyof Filters, value: FilterValue) => {
    handleFilterChange(category, value);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      languages: [],
      difficulty: [],
      labels: [],
    };
    setSelectedFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-[#282828] rounded-lg hover:bg-[#333333] transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([category, values]) =>
            values.map((value: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined) => (
              <span
                key={`${category}-${value}`}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-[#282828] rounded-full"
              >
                {value}
                <button
                  onClick={() => removeFilter(category as keyof Filters, value as FilterValue)}
                  className="p-0.5 hover:bg-[#333333] rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {/* Filter options */}
      {isOpen && (
        <div className="grid gap-6 p-4 bg-[#1a1a1a] rounded-lg">
          {/* Languages */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-400">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((language) => (
                <button
                  key={language}
                  onClick={() => handleFilterChange('languages', language)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilters.languages.includes(language)
                      ? 'bg-green-500 text-white'
                      : 'bg-[#282828] hover:bg-[#333333]'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-400">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map((level) => (
                <button
                  key={level}
                  onClick={() => handleFilterChange('difficulty', level)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilters.difficulty.includes(level)
                      ? 'bg-green-500 text-white'
                      : 'bg-[#282828] hover:bg-[#333333]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-400">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_LABELS.map((label) => (
                <button
                  key={label}
                  onClick={() => handleFilterChange('labels', label)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFilters.labels.includes(label)
                      ? 'bg-green-500 text-white'
                      : 'bg-[#282828] hover:bg-[#333333]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface SearchFiltersProps {
  selectedSector: string;
  onSectorChange: (sector: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedImpact: string;
  onImpactChange: (impact: string) => void;
  selectedBudget: string;
  onBudgetChange: (budget: string) => void;
  sectors: string[];
  impactLevels: string[];
  budgetLevels: string[];
  resultCount: number;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedSector,
  onSectorChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedImpact,
  onImpactChange,
  selectedBudget,
  onBudgetChange,
  sectors,
  impactLevels,
  budgetLevels,
  resultCount,
  onClearFilters
}) => {
  const difficulties = ['All Levels', 'Low', 'Medium', 'High'];
  const hasActiveFilters = selectedSector !== 'All Sectors' || 
                          selectedDifficulty !== 'All Levels' || 
                          selectedImpact !== 'All Impact Types' || 
                          selectedBudget !== 'All Budget Levels';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filter AI Use Cases</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Sector Filter */}
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
            Sector
          </label>
          <select
            id="sector"
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        {/* Impact Level Filter */}
        <div>
          <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
            Impact Type
          </label>
          <select
            id="impact"
            value={selectedImpact}
            onChange={(e) => onImpactChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            {impactLevels.map((impact) => (
              <option key={impact} value={impact}>
                {impact}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Level Filter */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget Level
          </label>
          <select
            id="budget"
            value={selectedBudget}
            onChange={(e) => onBudgetChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            {budgetLevels.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
            Complexity
          </label>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div className="flex items-end">
          <div className="bg-blue-50 px-4 py-2 rounded-lg w-full text-center">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">{resultCount}</span> use cases found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
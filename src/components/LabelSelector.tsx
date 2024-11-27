import { ChevronDown } from 'lucide-react';

const labels = [
  { value: "good first issue", label: "Good First Issue" },
  { value: "bug", label: "Bug" },
  { value: "documentation", label: "Documentation" },
  { value: "duplicate", label: "Duplicate" },
  { value: "enhancement", label: "Enhancement" },
  { value: "help wanted", label: "Help Wanted" },
  { value: "invalid", label: "Invalid" },
  { value: "question", label: "Question" },
  { value: "wontfix", label: "Wontfix" },
];

interface LabelSelectorProps {
  selectedLabel: string;
  setSelectedLabel: (value: string) => void;
}

export function LabelSelector({ selectedLabel, setSelectedLabel }: LabelSelectorProps) {
  return (
    <div className="relative inline-block w-full max-w-md">
      <div className="relative">
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className="w-full appearance-none bg-[#282828] text-white rounded-lg pl-4 pr-10 py-2.5 text-sm 
                     border border-transparent hover:border-[#404040] transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     cursor-pointer"
        >
          {labels.map(({ value, label }) => (
            <option 
              key={value} 
              value={value}
              className="bg-[#282828] text-white py-2"
            >
              {label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
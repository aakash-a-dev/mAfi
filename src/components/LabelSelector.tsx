const labels = [
  { value: "", label: "All labels" },
  { value: "bug", label: "Bug" },
  { value: "documentation", label: "Documentation" },
  { value: "duplicate", label: "Duplicate" },
  { value: "enhancement", label: "Enhancement" },
  { value: "good first issue", label: "Good First Issue" },
  { value: "help wanted", label: "Help Wanted" },
  { value: "invalid", label: "Invalid" },
  { value: "question", label: "Question" },
  { value: "wontfix", label: "Wontfix" },
];

export function LabelSelector({
  selectedLabel,
  setSelectedLabel,
}: {
  selectedLabel: string;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative w-full max-w-md md:w-auto p-4 bg-opacity-75 backdrop-blur-lg">
      <select
        className="text-2xl md:text-3xl outline-none focus:outline-none focus:ring-0 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-2 pl-4 pr-8 cursor-pointer"
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        {labels.map(({ value, label }) => (
          <option key={value} className="text-sm px-4" value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

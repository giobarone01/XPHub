export default function SortSelector({ selectedSort, handleSortChange, sortOptions }) {
    return (
        <div className="flex items-center gap-2 w-full sm:w-auto self-center sm:self-auto">
            <span className="text-gray-300 whitespace-nowrap text-xs sm:text-sm">Sort by:</span>
            <select
                id="sort-select"
                value={selectedSort}
                onChange={handleSortChange}
                className="bg-my-black/30 text-white border border-gray-700 rounded-md p-1 sm:p-1.5 text-xs sm:text-sm flex-grow sm:flex-grow-0 min-w-[120px] sm:min-w-[150px] md:min-w-[180px]"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
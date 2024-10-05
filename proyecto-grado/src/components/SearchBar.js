import React, {useState} from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        alert(`Searching for ${query}`); // Replace this with actual search code.
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
import { useState, useEffect } from 'react';

export default function useGameFilters(initialPlatform, initialGenre, initialPublisher, initialSort) {
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(false);
  
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedPublisher, setSelectedPublisher] = useState(initialPublisher);
  const [selectedSort, setSelectedSort] = useState(initialSort || "-added");
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: "-added", label: "Popularity (highest)" },
    { value: "added", label: "Popularity (lowest)" },
    { value: "-released", label: "Release date (newest)" },
    { value: "released", label: "Release date (oldest)" },
    { value: "-rating", label: "Rating (highest)" },
    { value: "rating", label: "Rating (lowest)" },
    { value: "name", label: "Name (A-Z)" },
    { value: "-name", label: "Name (Z-A)" },
    { value: "-metacritic", label: "Metacritic (highest)" },
    { value: "metacritic", label: "Metacritic (lowest)" },
  ];

  useEffect(() => {
    const fetchPlatforms = async () => {
      setLoadingFilters(true);
      try {
        const response = await fetch("https://api.rawg.io/api/platforms?key=65f57c71e58e4703a6b14f979b6d8fbb");
        if (!response.ok) throw new Error('Failed to fetch platforms');
        const data = await response.json();
        setPlatforms(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlatforms();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://api.rawg.io/api/genres?key=65f57c71e58e4703a6b14f979b6d8fbb");
        if (!response.ok) throw new Error('Failed to fetch genres');
        const data = await response.json();
        setGenres(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await fetch("https://api.rawg.io/api/publishers?key=65f57c71e58e4703a6b14f979b6d8fbb&page_size=40");
        if (!response.ok) throw new Error('Failed to fetch publishers');
        const data = await response.json();
        setPublishers(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchPublishers();
  }, []);

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handlePublisherChange = (e) => {
    setSelectedPublisher(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const resetFilters = () => {
    setSelectedPlatform("");
    setSelectedGenre("");
    setSelectedPublisher("");
    setSelectedSort("-added");
  };

  const buildUrl = (pageNum = 1) => {
    let url = `https://api.rawg.io/api/games?key=65f57c71e58e4703a6b14f979b6d8fbb&page=${pageNum}`;

    if (selectedPlatform) {
      url += `&platforms=${selectedPlatform}`;
    }

    if (selectedGenre) {
      url += `&genres=${selectedGenre}`;
    }

    if (selectedPublisher) {
      url += `&publishers=${selectedPublisher}`;
    }

    if (selectedSort) {
      url += `&ordering=${selectedSort}`;
    }

    return url;
  };

  return {
    platforms,
    genres,
    publishers,
    loadingFilters,
    selectedPlatform,
    selectedGenre,
    selectedPublisher,
    selectedSort,
    showFilters,
    setShowFilters,
    handlePlatformChange,
    handleGenreChange,
    handlePublisherChange,
    handleSortChange,
    resetFilters,
    sortOptions,
    buildUrl
  };
}
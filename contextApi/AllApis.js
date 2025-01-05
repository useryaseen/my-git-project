import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

// Create a context
const GitHubContext = createContext();

// Provider component
const GitHubProvider = ({ children }) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryIs, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isConnected, setIsConnected] = useState(true); // Internet status
  const perPage = 10; // Fixed per-page value

  // Check network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchRepositories = async (newSearch = false) => {
    if (!isConnected) {
      setError('No internet connection. Please check your network.');
      return;
    }

    if (!queryIs.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${queryIs}&per_page=${perPage}&page=${newSearch ? 1 : page}`
      );

      if (newSearch) {
        // New search: Replace repositories and reset page
        setRepositories(response.data.items);
        setPage(2); // Reset to next page
      } else {
        // Pagination: Append new repositories
        setRepositories((prev) => [...prev, ...response.data.items]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError('Error fetching repositories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchRepositories(true); // Trigger new search
  };

  const refetchRepositories = () => {
    fetchRepositories(); // Fetch the next page
  };

  return (
    <GitHubContext.Provider
      value={{
        repositories,
        loading,
        error,
        setQuery,
        queryIs,
        handleSearch,
        refetchRepositories,
        isConnected, // Expose internet status to consumers
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export { GitHubProvider, GitHubContext };

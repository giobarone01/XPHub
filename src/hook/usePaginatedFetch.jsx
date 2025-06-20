import { useState, useEffect, useCallback } from "react";

export default function usePaginatedFetch(initialUrl) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(initialUrl);
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const load = useCallback(async () => {
        if (!url) {
            setError("Error URL");
            return;
        } else {
            setError(null);
        }
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);

            if (page === 1) {
                setAllData(json.results || []);
            } else {
                setAllData(prev => [...prev, ...(json.results || [])]);
            }

            setHasMore(json.next !== null);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }, [url, page]);

    useEffect(() => {
        load();
    }, [load]);

    const loadNextPage = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);

        const baseUrl = url.split('page=')[0];
        const newUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${nextPage}`;
        setUrl(newUrl);
    }, [url, page]);

    const reset = useCallback((newUrl) => {
        setPage(1);
        setAllData([]);
        setHasMore(true);
        setUrl(newUrl);
    }, []);

    return {
        loading,
        error,
        data,
        allData,
        hasMore,
        loadNextPage,
        reset
    };
}
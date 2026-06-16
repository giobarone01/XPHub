import { useState, useEffect, useCallback } from "react";

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map();

export default function useFetchSolution(initialUrl) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [url, updateUrl] = useState(initialUrl);

    const load = useCallback(async ({ force = false } = {}) => {
        if (!url) {
            setError("Error URL");
            setData(null);
            return;
        }
        setError(null);

        if (!force) {
            const cached = cache.get(url);
            if (cached && Date.now() - cached.time < CACHE_TTL) {
                setData(cached.value);
                setLoading(false);
                return;
            }
        }

        setData(null);
        setLoading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            cache.set(url, { value: json, time: Date.now() });
            setData(json);
        } catch (error) {
            setError(error.message);
            setData(null);
        }
        setLoading(false);
    }, [url]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        url,
        loading,
        error,
        data,
        load,
        updateUrl,
    };
}

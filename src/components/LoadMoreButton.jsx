import React from 'react';
import { Button } from "@heroui/react";
import LoadingSpinner from "./LoadingSpinner";

export default function LoadMoreButton({ onClick, loading, hasMore }) {
    if (!hasMore) return null;
    
    return (
        <div className="flex justify-center my-6">
            <Button
                radius="full"
                size="lg"
                className="bg-my-purple hover:bg-my-purple/50 text-white transition-colors duration-300 flex items-center gap-2"
                onClick={onClick}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <LoadingSpinner size="sm" className="text-white" />
                        Loading...
                    </>
                ) : (
                    'Load More'
                )}
            </Button>
        </div>
    );
}
import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import FavoritesContext from "./FavoritesContext";
import { toast } from 'react-toastify';

export default function FavoritesProvider ({ children }){
    const { session } = useContext(SessionContext);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        let { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session?.user.id);
        if (error) {
            console.log(error);
            toast.error("Error loading favorites");
        } else {
            setFavorites(favourites);
        }
    }, [session]);

    const addFavorites = async (game) => {
        try {
            const { error } = await supabase
                .from("favorites")
                .insert([
                    {
                        user_id: session?.user.id,
                        game_id: game.id,
                        game_name: game.name,
                        game_image: game.background_image,
                    },
                ])
                .select();
                
            if (error) {
                console.log("Error adding to favorites:", error);
                toast.error("Unable to add to favorites");
            } else {
                toast.success("Added to favorites");
            }
        } catch (error) {
            console.log("Unexpected error:", error);
            toast.error("An unexpected error occurred");
        }
    };

    const removeFavorite = async (game_id) => {
    if (!session) return;

    const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("game_id", game_id)
        .eq("user_id", session.user.id);

    if (error) {
        console.log("Error removing favorite:", error);
        toast.error("Unable to remove from favorites");
    } else {
        setFavorites((prev) => prev.filter((fav) => fav.game_id !== game_id));
        toast.info("Removed from favorites");
    }
};


    useEffect(() => {
        if (session) {
            getFavorites()
        }
        const favorites = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => getFavorites()
            )
            .subscribe();

        return () => {
            if (favorites) {
                supabase.removeChannel(favorites);
            }
            favorites.unsubscribe();
        };
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider
        value={{
            favorites,
            setFavorites,
            addFavorites,
            removeFavorite,
        }}
        >
            { children }
        </FavoritesContext.Provider>
    );
}

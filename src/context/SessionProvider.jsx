import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client";
import { toast } from 'react-toastify';

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT") {
                setSession(null);
                setProfile(null);
            } else if (session) {
                setSession(session);
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const getProfile = async () => {
            if (session?.user) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("username, avatar_url, first_name, last_name")
                    .eq("id", session.user.id)
                    .single();

                if (error) {
                    console.error("Error loading profile:", error.message);
                    toast.error("Error loading profile");
                } else {
                    setProfile(data);
                }
            }
        };

        getProfile();
    }, [session]);

    return (
        <SessionContext.Provider value={{ session, profile, setProfile }}>
            {children}
        </SessionContext.Provider>
    );
}
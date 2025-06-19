import { useState, useEffect, useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Avatar from "./Avatar";
import { toast } from 'react-toastify';

export default function AccountForm() {
    const { session, profile, setProfile } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");

    useEffect(() => {
        if (profile) {
            setUsername(profile.username ?? "");
            setFirstName(profile.first_name ?? "");
            setLastName(profile.last_name ?? "");
            setAvatarUrl(profile.avatar_url ?? "");
            setLoading(false);
        }
    }, [profile]);

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault();
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl ?? avatar_url,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            if (error.message.includes("username") && error.message.includes("unique")) {
                toast.error("Username already used");
            } else {
                toast.error("Error updating profile: " + error.message);
            }
            setLoading(false);
            return;
        }
        
        toast.success("Profile updated successfully!");

        setUsername(updates.username);
        setFirstName(updates.first_name);
        setLastName(updates.last_name);
        setAvatarUrl(updates.avatar_url);

        if (setProfile) {
            setProfile(updates);
        }

        setLoading(false);
    };

    const hasChanges =
        username !== (profile?.username ?? "") ||
        first_name !== (profile?.first_name ?? "") ||
        last_name !== (profile?.last_name ?? "") ||
        avatar_url !== (profile?.avatar_url ?? "");

    return (
        <form onSubmit={updateProfile} className="space-y-4 text-white text-sm">
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => updateProfile(event, url)}
            />

            <div>
                <label className="block mb-1 text-gray-400">Email</label>
                <input
                    type="text"
                    value={session.user.email}
                    disabled
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl p-2 cursor-not-allowed text-gray-400"
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-300">Username</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-300">Nome</label>
                <input
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                />
            </div>

            <div>
                <label className="block mb-1 text-gray-300">Cognome</label>
                <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-my-cyan/50"
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading || !hasChanges}
                    className="w-full py-2 rounded-xl bg-my-cyan/50 hover:bg-my-cyan/70 transition text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Loading..." : "Update"}
                </button>
            </div>
        </form>
    );
}
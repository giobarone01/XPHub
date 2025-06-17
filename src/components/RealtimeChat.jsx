import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import supabase from '../supabase/supabase-client';

dayjs.extend(utc);

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = useCallback(async () => {
        if (!data?.id) return;
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select("id, profile_username, content, updated_at")
            .eq("game_id", data.id)
            .order('updated_at', { ascending: true });
        if (error) {
            setError(error.message);
            setLoadingInitial(false);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);

    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [data, getInitialMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <div className="h-full overflow-y-auto p-4 space-y-4 break-words" ref={messageRef}>
            {loadingInitial && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
            {error && (
                <div className="bg-red-500/10 text-red-500 p-3 rounded-lg">
                    {error}
                </div>
            )}
            {messages &&
                messages.map((message) => (
                    <article key={message.id} className="bg-black/20 rounded-lg p-3 space-y-2 break-words">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-white/90">{message.profile_username}</span>
                            <span className="text-xs text-white/60">
                                {message.updated_at
                                    ? dayjs.utc(message.updated_at).local().format('DD/MM/YYYY HH:mm')
                                    : "Date not available"
                                }
                            </span>
                        </div>
                        <p className="text-white/80 break-words break-all">{message.content}</p>
                    </article>
                ))}
        </div>
    );
}
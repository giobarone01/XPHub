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
        <div className="h-full overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 break-words" ref={messageRef}>
            {loadingInitial && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 sm:border-4 border-white/30 border-t-transparent"></div>
                </div>
            )}
            {error && (
                <div className="bg-red-500/10 text-red-500 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                    {error}
                </div>
            )}
            {messages &&
                messages.map((message) => (
                    <article key={message.id} className="bg-black/20 rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2 break-words">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <span className="font-semibold text-white/90 text-xs sm:text-sm">{message.profile_username}</span>
                            <span className="text-[10px] sm:text-xs text-white/60">
                                {message.updated_at
                                    ? dayjs.utc(message.updated_at).local().format('DD/MM/YYYY HH:mm')
                                    : "Date not available"
                                }
                            </span>
                        </div>
                        <p className="text-white/80 break-words break-all text-xs sm:text-sm">{message.content}</p>
                    </article>
                ))}
        </div>
    );
}
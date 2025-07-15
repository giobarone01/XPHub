import { useState, useContext, useRef, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";
import { toast } from 'react-toastify';

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [sending, setSending] = useState(false);
    const textareaRef = useRef(null);

    const handleTextareaInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        const maxHeight = 4 * 24;
        if (textarea.scrollHeight > maxHeight) {
            textarea.style.height = `${maxHeight}px`;
            textarea.style.overflowY = "auto";
        } else {
            textarea.style.height = `${textarea.scrollHeight}px`;
            textarea.style.overflowY = "hidden";
        }
    };

    useEffect(() => {
        handleTextareaInput();
    }, [message]);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        if (!message.trim()) return;

        if (!session) {
            toast.info("You need to sign in to participate in the chat");
            return;
        }

        setSending(true);
        const { error } = await supabase
            .from("messages")
            .insert({
                profile_id: session.user.id,
                profile_username: session.user.user_metadata.username,
                game_id: data.id,
                content: message,
            })
            .select();

        if (error) {
            setErrorMsg("Error. Try Again");
        } else {
            setMessage("");
            setErrorMsg("");
        }
        setSending(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessageSubmit(event);
        }
    };

    return (
        <div className="flex flex-col h-[400px] sm:h-[500px] md:h-[600px] bg-none overflow-hidden">
            <div className="flex-1 overflow-hidden">
                <RealtimeChat data={data && data} />
            </div>
            <div className="p-2 sm:p-4">
                <div className="flex justify-end mb-1 sm:mb-2 me-3 sm:me-5">
                    <span className="text-xs text-white/50">{message.length}/300</span>
                </div>
                <form onSubmit={handleMessageSubmit} className="flex gap-2 items-end relative">
                    <textarea
                        ref={textareaRef}
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onInput={handleTextareaInput}
                        onKeyDown={handleKeyDown}
                        placeholder={session ? "Be nice..." : "Sign in to join the chat"}
                        maxLength={300}
                        rows={1}
                        className="flex-1 bg-black/70 text-white rounded-2xl px-3 sm:px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/40 text-xs sm:text-sm shadow-inner shadow-white/5"
                        style={{ minHeight: "24px", maxHeight: "96px", overflowY: "hidden" }}
                    />
                    <button
                        type="submit"
                        disabled={sending || !message.trim() || !session}
                        className="bg-black/20 hover:bg-black/40 text-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                        style={{ width: "70px", sm: { width: "90px" }, flexShrink: 0 }}
                    >
                        {sending ? "..." : "Send"}
                    </button>
                </form>
            </div>
        </div>
    );
}
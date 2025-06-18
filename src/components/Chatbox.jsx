import { useState, useContext, useRef, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";

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

        setSending(true);
        const { error } = await supabase
            .from("messages")
            .insert({
                profile_id: session?.user.id,
                profile_username: session?.user.user_metadata.username,
                game_id: data.id,
                content: message,
            })
            .select();

        if (error) {
            console.log(error);
            setErrorMsg("Error. Try Again");
        } else {
            setMessage("");
            setErrorMsg("");
        }
        setSending(false);
    };

    return (
        <div className="flex flex-col h-[500px] sm:h-[600px] bg-none overflow-hidden">
            <div className="flex-1 overflow-hidden">
                <RealtimeChat data={data && data} />
            </div>
            <div className="p-4">
                <form onSubmit={handleMessageSubmit} className="flex gap-2 items-end">
                    <textarea
                        ref={textareaRef}
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onInput={handleTextareaInput}
                        placeholder="Be nice..."
                        maxLength={300}
                        rows={1}
                            className="flex-1 bg-black/70 text-white rounded-2xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/40 text-xs sm:text-sm shadow-inner shadow-white/5"
                        style={{ minHeight: "24px", maxHeight: "96px", overflowY: "hidden" }}
                    />
                    <button
                        type="submit"
                        disabled={sending || !message.trim()}
                        className="bg-black/20 hover:bg-black/40 text-white rounded-full px-6 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ width: "90px", flexShrink: 0 }}
                    >
                        {sending ? "Sending..." : "Send"}
                    </button>
                </form>
                {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
            </div>
        </div>
    );
}
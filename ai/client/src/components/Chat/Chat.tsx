import { useState } from 'preact/hooks';
import './chat.scss'

export const ChatBloc = () => {

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [chatInput, setChatInput] = useState<string>('');

    const toggleChatDisplay = () => {
        setIsChatOpen(!isChatOpen);
    };

    return <div className="ChatBloc">
        <div className={`button-container ${isChatOpen ? 'is-hidden' : ''}`}>
            <div
                className={"menu-button"}
                onClick={toggleChatDisplay}
            >Open</div>
        </div>
        <div className={`chat-container ${isChatOpen ? '' : 'is-hidden'}`}>
            <div className="chat-window-container">
                <div className="item">aze</div>
                <div className="item">sdf</div>
            </div>
            <div className="chat-input-container">
                 <div className="chat-input-write">
                    <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput((e.target as HTMLTextAreaElement).value)}
                    />
                </div>
                <div className="chat-input-send">
                    <div className="chat-input-send-button">
                        Send
                    </div>
                </div>
            </div>
            <div className="button-container">
                <div className="menu-button" onClick={toggleChatDisplay}>Close</div>
            </div>
        </div>
    </div>
}

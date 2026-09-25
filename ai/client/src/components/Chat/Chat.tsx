import { useState } from 'preact/hooks'
import { AppService } from '../../services/AppService'
import _ from 'lodash'
import './chat.scss'

type ChatMessage = {
    message: string
    from: 'user' | 'bot'
}

export const ChatBloc = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [chatInput, setChatInput] = useState<string>('')

    const toggleChatDisplay = () => {
        setIsChatOpen(!isChatOpen)
    }

    const sendChatMessage = async () => {
        const newMessageText = chatInput.trim()
        if (_.isEmpty(newMessageText)) return

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { message: newMessageText, from: 'user' }
        ])
        setChatInput('')

        let response: string = await AppService.sendMessage(newMessageText, 'agent')
        setChatMessages((prevMessages) => [
            ...prevMessages,
            { message: response, from: 'bot' }
        ])
    }

    return (
        <div className="ChatBloc">
            <div
                className={`button-container ${isChatOpen ? 'is-hidden' : ''}`}
            >
                <div className={'menu-button'} onClick={toggleChatDisplay}>
                    Open
                </div>
            </div>
            <div className={`chat-container ${isChatOpen ? '' : 'is-hidden'}`}>
                <div className="chat-window-container">
                    <div className="chat-window">
                        {chatMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message-item ${message.from === 'user' ? 'user-message' : 'bot-message'}`}
                            >
                                <span>{message.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-input-container">
                    <div className="chat-input-write">
                        <textarea
                            value={chatInput}
                            onChange={(e) =>
                                setChatInput(
                                    (e.target as HTMLTextAreaElement).value
                                )
                            }
                        />
                    </div>
                    <div className="chat-input-send">
                        <div className="chat-input-send-button">
                            <button
                                className="cursor-pointer"
                                onClick={sendChatMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <div className="menu-button" onClick={toggleChatDisplay}>
                        Close
                    </div>
                </div>
            </div>
        </div>
    )
}

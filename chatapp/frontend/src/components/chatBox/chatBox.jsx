import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../shared/Input/Input";
import "./chatBox.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
const WS_URL = import.meta.env.VITE_WS_URL
// "ws://localhost:8080";

export default function ChatBox({ data }) {
  const [messages, setMessages] = useState(data.data);
  const [userId, setUserId] = useState(null);
  const chatContainer = useRef();
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL);

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
      chatContainer.current?.scrollTo(0, scrollHeight);
    }
  };
  // useEffect(() => {
  //   Scroll();
  // }, [messages]);

  useEffect(() => {
    if (lastJsonMessage == null) return;
    else if (lastJsonMessage.type == 4) {
      return setUserId(lastJsonMessage.userId);
    } else setMessages((prev) => [...prev, lastJsonMessage]);
  }, [lastJsonMessage]);

  function submitMessageHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    sendJsonMessage(formData.get("message"));
    e.target.reset();
    e.target.focus();
  }

  return (
    <div className="chat__box__container">
      <h1>Random Chat Room</h1>
      <div className="chats__wrapper">
        <div className="chats" ref={chatContainer}>
          {messages
            .map((item, i) => {
              return (
                <div key={i} className="message__info">
                  {(item.type == 1 || item.type == 3) && (
                    <div className="user__activity__message">
                      <div className="user__activity__info">
                        {item.userId == userId
                          ? "You " + item.message.split(" ")[1]
                          : item.message}
                      </div>
                    </div>
                  )}
                  {item.type == 2 &&
                    (userId !== item.userId ? (
                      <div className="message__box other__user__message__box">
                        <div className="message__profile__pic">
                          {item.userId[0]}
                        </div>

                        <div className="other__user__message__content message__content">
                          <div className="message__name__and__time">
                            <div className="message__name">{item.userId}</div>
                            <div className="message__last__message_time">
                              {item.time}
                            </div>
                          </div>
                          <div className={`message__last__message`}>
                            {item.message.split('"')[1]}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="message__box curr__user__message__box ">
                        <div className="message__profile__pic">
                          {item.userId[0]}
                        </div>
                        <div className="curr__user__message__content message__content">
                          <div className="message__name__and__time">
                            <div className="message__name">You</div>
                            <div className="message__last__message_time">
                              {item.time}
                            </div>
                          </div>
                          <div className={`message__last__message`}>
                            {item.message.split('"')[1]}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              );
            })
            .reverse()}
        </div>
        <form
          onSubmit={(e) => submitMessageHandler(e)}
          className="message__input__box"
        >
          <input
            type="text"
            name="message"
            placeholder="Type you message..."
            autoComplete="off"
          />
          <button><img src="/send.svg"/></button>
        </form>
      </div>
    </div>
  );
}

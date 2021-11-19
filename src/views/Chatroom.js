import React, { useEffect, useRef, useState } from "react";
import avatar from "../assets/images/avatar.png";
import io from "socket.io-client";
import { Navigate } from "react-router";
import logo from "../assets/images/logo.png";
import Footer from "../components/layout/Footer";

let socket;
const Chatroom = ({ isAuth }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [people, setPeople] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [whoLeft, setWhoLeft] = useState("");
  const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER;

  const messageBottom = useRef("");

  //for initial connection to stranger
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connect", () => {
      setWaiting(true);
    });
    socket.on("connected", () => {
      setWaiting(false);
      setIsConnected(true);
    });
    return () => {};
  }, []);

  //For number of peoples
  useEffect(() => {
    socket.on("people", ({ people }) => {
      setPeople(people);
    });
    return () => {};
  }, [people]);

  const handleTyping = () => {
    if (socket) {
      socket.emit("typing", true);
      setIsTyping(true);
    }
  };

  useEffect(() => {
    socket.on("typing", (typing) => {
      setTyping(typing);
    });
    return () => {};
  }, [typing]);

  useEffect(() => {
    socket.on("text", (message) => {
      setMessages([...messages, { self: false, data: message }]);
    });
    return () => {};
  }, [messages]);

  useEffect(() => {
    socket.on("leave", ({ user, error }) => {
      setWhoLeft(user);
      setLeave(true);
      setTyping(false);
    });
  }, []);

  const [leave, setLeave] = useState(false);

  const handleSend = (event) => {
    event.preventDefault();
    // console.log(senderMessage.current.value);

    if (inputText === "") {
      alert("Enter a Valid message");
    } else {
      if (isTyping) {
        socket.emit("typing", false);
      }
      setIsTyping(false);
      socket.emit("text", inputText);
      // setSentMessages([...sentMessages, senderMessage.current.value]);
      setMessages([...messages, { self: true, data: inputText }]);
    }
    setInputText("");
  };
  useEffect(() => {
    if (isAuth && messageBottom) {
      messageBottom.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputText(newValue);
  };
  const handleNewUser = (event) => {
    event.preventDefault();
    socket.emit("newStranger");
    setMessages([]);
    setLeave(false);
    setWaiting(true);
    setIsConnected(false);
  };
  const handleLeave = (event) => {
    socket.emit("leave");
    setLeave(true);
    event.preventDefault();
  };
  return (
    <>
      {isAuth ? (
        <div className=" h-screen">
          <div className=" text-center flex justify-evenly pt-12">
            <div className=" float-left flex items-center">
              <img src={logo} alt="" className=" h-8 md:h-12 object-contain" />
              <h3 className=" hidden md:inline items-center ml-16">
                MUJ-Connect
              </h3>
            </div>
            <h5 className=" text-xxs md:text-xs">
              {people} chatterbox's <br /> online right now!
            </h5>
          </div>
          <div className=" h-5/6 pb-10  md:h-3/4 max-w-screen-md relative rounded-md mx-auto pt-32">
            <div
              ref={messageBottom}
              className=" h-full text-xxs my-sexy-scroll overflow-y-scroll"
            >
              {isConnected ? (
                <p className={leave ? `hidden` : ` text-center font-bold`}>
                  Connected to a Stranger!
                </p>
              ) : (
                <p className=" text-center font-bold">
                  Waiting for a Stranger to connect...
                </p>
              )}
              {messages.map((message, _i) => (
                <div
                  key={_i}
                  className={`flex justify-${
                    !message.self ? "start" : "end"
                  } mt-2 w-full`}
                >
                  {!message.self && (
                    <img
                      src={avatar}
                      alt=""
                      className=" bg-gray-800 p-1 rounded-full h-8 object-contain"
                    />
                  )}
                  <p
                    className={`${
                      message.self
                        ? "bg-textDefault-sender rounded-l-lg rounded-b-lg"
                        : "bg-textDefault-receiver rounded-r-lg rounded-b-lg"
                    } text-white w-3/4 mx-4 mr-2 p-2 max-w-xs clearfix`}
                  >
                    {message.data}
                  </p>
                  {message.self ? (
                    <img
                      src={avatar}
                      alt=""
                      className=" bg-gray-800 p-1 rounded-full h-8 object-contain"
                    />
                  ) : null}
                </div>
              ))}
              {leave && (
                <p className=" text-center font-bold">{whoLeft} disconnected</p>
              )}
              {typing && (
                <div className=" flex float-left">
                  <img
                    src={avatar}
                    alt=""
                    className=" bg-gray-800 p-1 rounded-full h-8 object-contain"
                  />
                  <p className=" font-bold mt-1 pl-2">Typing...</p>
                </div>
              )}
            </div>
            <div className=" align-bottom absolute bottom-0 w-full">
              <div className=" relative w-full">
                <form
                  action=""
                  className="opacity-100 justify-end sticky top-0 flex w-full bg-textDefault-type rounded-md text-center"
                >
                  <button
                    onClick={handleLeave}
                    type="button"
                    className={
                      waiting
                        ? `opacity-50 cursor-not-allowed pointer-events-none text-xxs md:text-xs bg-red-500 text-white px-4 py-1 md:px-8 md:py-2 rounded-xl`
                        : leave
                        ? `hidden`
                        : `text-xxs md:text-xs bg-red-500 hover:bg-red-600 text-white px-4 py-1 md:px-8 md:py-2 rounded-xl`
                    }
                  >
                    Leave
                  </button>
                  <input
                    type="text"
                    placeholder="Enter your message here"
                    onKeyPress={(event) =>
                      event.key === "Enter" && { handleSend }
                    }
                    onKeyDown={handleTyping}
                    value={inputText}
                    onChange={handleChange}
                    className={
                      waiting
                        ? `opacity-50 pointer-events-none cursor-not-allowed text-xxs md:text-xs w-full px-4 outline-none bg-textDefault-type text-white rounded-xl`
                        : leave
                        ? `hidden`
                        : `text-xxs md:text-xs w-full px-4 outline-none bg-textDefault-type text-white rounded-xl`
                    }
                  />
                  <button
                    onClick={handleSend}
                    className={
                      waiting
                        ? `opacity-50 pointer-events-none cursor-not-allowed text-xxs md:text-xs bg-blue-500 text-white px-4 py-1 md:px-8 md:py-2 rounded-xl`
                        : leave
                        ? `hidden`
                        : `text-xxs md:text-xs bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 md:px-8 md:py-2 rounded-xl`
                    }
                  >
                    Send
                  </button>
                  <button
                    onClick={handleNewUser}
                    className={
                      leave
                        ? `text-xxs md:text-xs bg-yellow-600 hover:bg-yellow-700 text-white w-full px-4 py-1 md:px-8 md:py-2 rounded-xl`
                        : `hidden`
                    }
                  >
                    Meet new user
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className=" hidden lg:inline">
            <Footer />
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Chatroom;

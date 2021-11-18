import React, { useState } from "react";
import Button from "./Button";

function TypeAndSend() {
  const [leave, setLeave] = useState(false);
  const handleSend = (event) => {
    event.preventDefault();
  };
  const handleNewUser = () => {};
  const handleLeave = (event) => {
    setLeave(true);
    event.preventDefault();
  };
  return (
    <div className=" relative w-full">
      <form
        action=""
        className=" absolute bottom-0 flex w-full bg-textDefault-type rounded-md text-center"
      >
        <button
          onClick={handleLeave}
          type="button"
          className={
            leave
              ? `hidden`
              : `text-xxs md:text-xs bg-red-500 hover:bg-red-600 text-white px-4 py-1 md:px-8 md:py-2 rounded-xl`
          }
        >
          Leave
        </button>
        <input
          type="text"
          placeholder="Enter your message here"
          onKeyPress={(event) => event.key === "Enter" && { handleSend }}
          className={
            leave
              ? `hidden`
              : `text-xxs md:text-xs w-full px-4 outline-none bg-textDefault-type text-white rounded-xl`
          }
        />
        <button
          onClick={handleSend}
          className={
            leave
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
  );
}

export default TypeAndSend;

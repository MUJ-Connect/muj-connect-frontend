import React from "react";
import avatar from "../../assets/images/avatar.png";
function MessageBubble({ message, isSender }) {
  return (
    <>
      {isSender ? (
        <div className=" flex justify-end mt-2 w-full">
          <p className=" bg-textDefault-sender text-white w-1/2 mx-4 ml-2 p-2 rounded-l-lg rounded-b-lg max-w-xs clearfix">
            {message}
          </p>
          <img
            src={avatar}
            alt=""
            className=" bg-gray-800 p-1 rounded-full h-8 object-contain"
          />
        </div>
      ) : (
        <div className="flex justify-start mt-2 w-full">
          <img
            src={avatar}
            alt=""
            className=" bg-gray-800 p-1 rounded-full h-8 object-contain"
          />
          <p className=" bg-textDefault-receiver text-white w-3/4 mx-4 mr-2 p-2 rounded-r-lg rounded-b-lg max-w-xs clearfix">
            {message}
          </p>
        </div>
      )}
    </>
  );
}

export default MessageBubble;

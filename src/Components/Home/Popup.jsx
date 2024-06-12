import React from "react";
import { BsFillXCircleFill } from "react-icons/bs";


const Popup = ({ onClose }) => {
  const handleVideoClick = (event) => {
    // Prevent default behavior (i.e., navigating to YouTube)
    event.preventDefault();
    // Optionally, you can display a message or take other actions here
    alert("Please watch the video on our platform.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-1 rounded-md mx-2 lg:mx-0 lg:max-w-3xl w-full relative">
        <BsFillXCircleFill
          onClick={onClose}
          className="absolute top-2 right-2 text-3xl cursor-pointer text-red-500"
        />
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube-nocookie.com/embed/O_NmXOWJ9Qg?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onClick={handleVideoClick} // Attach the event handler to the iframe
        ></iframe>
      </div>
    </div>
  );
};

export default Popup;

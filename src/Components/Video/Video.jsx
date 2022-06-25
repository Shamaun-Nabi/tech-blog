import React from "react";

export default function Video() {
  return (
    <>
      <div className="container mx-auto flex justify-center">
        <div className="py-28 items-center ">
           {/* Auto playe videos */}
        <iframe
        className=" border-4 ring-2 ring-orange-600 ring-offset-4 ring-offset-purple-100 shadow-lg rounded-  md:w-[600px] md:h-[300px] w-[320px] h-[200px]  "
            allow="autoplay"
           
            src="https://www.youtube.com/embed/XKfgdkcIUxw?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <h1 className="text-center text-2xl mt-4">Introducing Iphone</h1>
         
  
        </div>
      </div>
    </>
  );
}

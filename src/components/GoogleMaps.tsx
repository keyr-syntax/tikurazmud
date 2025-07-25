import React from "react";

const GoogleMaps: React.FC = () => {
  return (
    <div
      className="w-full max-w-full  
    md:w-[600px] md:h-[400px]
    lg:w-[800px] lg:h-[450px] h-[300px] border rounded-xl overflow-hidden shadow-md mx-auto"
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3649433192604!2d38.76003607413568!3d9.030434688968294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b856cccf9da43%3A0xcb92a857309700c0!2sAbrehot%20Library!5e0!3m2!1sen!2set!4v1753023336895!5m2!1sen!2set"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
  );
};

export default GoogleMaps;

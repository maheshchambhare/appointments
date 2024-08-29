import React from "react";

function LocationView({ website }: any) {
  return (
    <>
      <div className="w-full overflow-hidden  xsm:w-full sm:w-full md:w-full">
        <h2 className="text-foreground font-poppins font-bold text-4xl  mb-6">
          Location
        </h2>
        <div className="w-full min-h-[300px] overflow-hidden rounded-lg  xsm:h-[70vh] sm:h-[50vh] md:h-[50vh] mb-20">
          {" "}
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.NEXT_PUBLIC_MAPS_KEY
            }&q=${website.businessName},${
              website.address +
              " " +
              website.city +
              ", " +
              website.state +
              ", " +
              website.country.value +
              ", " +
              website.pincode
            }`}
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}

export default LocationView;

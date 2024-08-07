import Image from "next/image";
import React from "react";
import GoogleMapReact from "google-map-react";

function LocationView({ website }: any) {
  const latitude: any = website.latitude;
  const longitude: any = website.longitude;

  let Markers = (props: any) => {
    return (
      // @ts-ignore
      <div lng={props.longitude} lat={props.latitude} text="My Marker">
        <Image
          src={website.logo}
          alt="logo map marker"
          height={40}
          width={40}
          className="w-[40px] h-[40px] rounded-full"
        />
      </div>
    );
  };
  return (
    <>
      <div className=" flex items-center w-[63%] md:w-[100%] sm:w-[100%] xsm:w-[100%]  mt-[25px] sm:mt-[0px] xsm:mt-[0px]">
        {/* <button
          className="mMax:py-[7px] py-[5px]  select-none w-[50%] px-[4px] mMax:w-[30%]  mMax:px-2 mMax:text-sm border-[1px] bg-white cursor-pointer border-darkBlue rounded-lg font-semibold text-m3xsm font-sans text-darkBlue xsm:min-w-[130px]  sm:min-w-[130px]"
          onClick={() => {
            window.open(website.maps, "_blank");
          }}
        >
          Click for directions
        </button> */}
      </div>

      <div className="w-full overflow-hidden  xsm:w-full sm:w-full md:w-full">
        <h2 className="text-foreground font-poppins font-bold text-4xl  mb-6">
          Location
        </h2>
        <div className="w-full h-[260px] overflow-hidden rounded-lg xsm:h-[40vh] sm:h-[40vh] md:h-[40vh] mb-20">
          {" "}
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_MAPS_KEY || "",
            }}
            defaultCenter={{
              lat: Number(latitude),
              lng: Number(longitude),
            }}
            defaultZoom={13}
          >
            <Markers lng={longitude} lat={latitude} />
          </GoogleMapReact>
        </div>
        <div id="reviewList"></div>
      </div>
    </>
  );
}

export default LocationView;

import GoogleMaps from "./GoogleMaps";

export default function Location() {
  return (
    <>
      {" "}
      <div
        id="location"
        className="flex flex-col mb-[10px] justify-center items-center mt-20"
      >
        <p className="relative mt-15 mb-4 mx-auto w-[70%] sm:max-w-[500px] text-[30px] font-semibold p-1 text-center  text-black after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80px] after:h-[4px] after:bg-blue-600 after:rounded-2xl">
          Location
        </p>

        <div className="flex flex-col justify-center items-center gap-6 ">
          <div className="text-[18px] text-center w-[90%] max-w-[600px]">
            Address of onco-care-office, 100th Floor, Office No. 301, Addis
            Ababa, Ethiopia
          </div>
          <GoogleMaps />
        </div>
      </div>
    </>
  );
}

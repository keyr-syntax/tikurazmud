export default function AboutUs() {
  return (
    <>
      {" "}
      <div
        id="aboutus"
        className="flex flex-col lg:flex-row   justify-center items-center w-[95%] mt-36 mx-auto "
      >
        <div className="w-full  flex items-center justify-center p-4 ">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Excellence in Cancer Care
            </h1>
            <p className="text-[18px] text-black leading-relaxed text-center">
              Onco Care Ethiopia is a multidisciplinary private oncology service
              provider based in Ethiopia. Comprising a team of expert clinical
              oncologists, medical physicists, and Radiotherapy Technologists
              (RTTs), Onco Care Ethiopia is committed to delivering world-class
              radiotherapy and chemotherapy services in collaboration with
              private and public hospitals across Ethiopia.
            </p>
          </div>
        </div>

        <img
          src="/onco-care-logo-hero-section.jpg"
          alt="onco care ethiopia logo"
          className="w-full h-[300px] object-cover rounded-3xl border border-[rgba(196,186,186,0.8)] m-auto max-w-[600px]"
          width={450}
          height={300}
          // style={{ width: "90%", height: "90%", objectFit: "cover" }}
        />
      </div>
    </>
  );
}

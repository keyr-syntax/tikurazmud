import { ServicesList } from "@/lib/OurServicesList";

export default function OurServices() {
  return (
    <>
      <div id="services" className="mt-20 mb-5 mx-auto">
        <p
          className="relative mt-15 mb-4 mx-auto w-[70%] sm:max-w-[500px] text-[30px] font-semibold p-1 text-center  text-black after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[120px] after:h-[4px] after:bg-blue-600 rounded-2x1
        "
        >
          Our Services
        </p>

        <p className="text-center text-[20px] w-[90%] max-w-[600px] mx-auto">
          {" "}
          We provide experts who can deliver the following services in
          collaboration with Hospitals and clinics.
        </p>
      </div>
      <div className="flex flex-row justify-evenly gap-2 mx-auto w-[95%] flex-wrap ">
        {" "}
        {ServicesList.map((service) => (
          <div
            key={service.id}
            className="flex flex-col lg:flex-row justify-between items-center  gap-10 my-6 w-[95%]"
          >
            <div className="flex flex-col  border border-[rgba(196,186,186,0.8)] rounded-lg p-5 gap-2 lg:w-[45%] max-w-[600px]">
              <p className="text-center font-bold text-[20px] my-4">
                {service.title}
              </p>
              <p className="text-[18px]  text-black">{service.description}</p>
            </div>
            <img
              src={`${service.image}`}
              alt={`Image of ${service.title}`}
              className="sm:w-[85%] lg:w-[50%] sm:max-w-[600px] h-[270px] lg:h-[320px] object-cover rounded-lg border border-black"
              width={400}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

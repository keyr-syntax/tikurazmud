import { Copyright } from "lucide-react";

export default function Footer() {
  const footerDate = new Date();
  const footerYear = footerDate.getFullYear().toString();
  return (
    <>
      <div className="bg-[#151533] py-4  text-white text-[16px] mt-16">
        <p className="flex flex-row gap-2 mt-8 mx-auto w-[80%] justify-center items-center sm:max-w-[300px]  text-center rounded">
          <Copyright size={20} /> {footerYear} Onco Care Ethiopia
        </p>
        <p className="my-2 mb-2 mx-auto  text-center rounded">
          All Rights Reserved
        </p>
        <p className=" mx-auto   gap-1 text-center rounded">
          Designed by Keyru Nasir
        </p>
      </div>
    </>
  );
}

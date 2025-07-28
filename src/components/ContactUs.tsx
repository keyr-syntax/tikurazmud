import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
// import dotenv from "dotenv";
// dotenv.config();

type Input = string;
type phoneType = number | null;
export default function ContactUs() {
  const [name, setName] = useState<Input>("");
  const [email, setEmail] = useState<Input>("");
  const [message, setMessage] = useState<Input>("");
  const [phoneNumber, setPhoneNumber] = useState<phoneType>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useRef<HTMLFormElement | null>(null);
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = "service_onyl73b";
    const templateId = "template_8v1c0ho";
    const publicKey = "Z8FK6MGCDurMVaz6Q";

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Missing configuration for email service");
      return;
    }
    if (!form.current) {
      return;
    }
    setLoading(true);

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      () => {
        setLoading(false);
        setName("");
        setEmail("");
        setMessage("");
        setPhoneNumber(null);
        toast.success("Message sent");
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        toast.error("Failed to send Message");
      }
    );
  };
  return (
    <>
      <div
        id="contactus"
        className="flex flex-col justify-start mb-[10px] mt-20 w-full"
      >
        <p className="relative mt-15 mb-4 mx-auto w-[90%] sm:max-w-[550px] text-[30px] font-semibold p-1 text-center  text-black after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[100px] after:h-[4px] after:bg-blue-600 rounded-2xl">
          Contact Us
        </p>

        <p className="flex flex-col gap-2 my-1 mx-auto w-[90%] sm:max-w-[550px] text-[20px] p-1 text-start rounded">
          <div className="flex items-center">
            <Phone size={30} className="mr-3" /> <span>0911 48 26 52</span>
          </div>
          <div className="flex items-center">
            {" "}
            <Phone size={30} className="mr-3" /> <span>0913 67 12 30</span>
          </div>
        </p>
        <p className="flex mt-1 mb-3 mx-auto w-[90%] sm:max-w-[550px] text-[20px] p-1 text-start rounded">
          <div className="flex items-center">
            <Mail size={30} className="mr-1 " />{" "}
            <span className="text-wrap break-words text-[18px]">
              onco-care-ethiopia@gmail.com
            </span>
          </div>
        </p>

        <p className="flex mt-1 mb-3 mx-auto w-[90%] sm:max-w-[550px] text-[20px] p-1 text-start rounded">
          <div className="flex items-center gap-1">
            <FaTelegram size={30} className="mr-1 " />{" "}
            <span className="text-wrap break-words text-[18px]">
              t.me/onco-care-ethiopia
            </span>
          </div>
        </p>

        <p className="flex mt-1 mb-3 mx-auto w-[90%] sm:max-w-[550px] text-[20px] p-1 text-start rounded">
          <div className="flex items-center gap-1">
            <FaFacebook size={30} className="mr-1 " />{" "}
            <span className="text-wrap break-words text-[18px]">
              facebook.com/onco-care-ethiopia
            </span>
          </div>
        </p>

        <p className="flex mt-1 mb-3 mx-auto w-[90%] sm:max-w-[550px] text-[20px] p-1 text-start rounded">
          <div className="flex items-center 9 gap-1">
            <FaLinkedin size={30} className="mr-1 " />{" "}
            <span className="text-wrap break-words text-[18px]">
              linkedin.com/onco-care-ethiopia
            </span>
          </div>
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-2 mx-auto mt-5 w-[90%] max-w-[550px] border border-[rgba(196,186,186,0.8)] p-8 rounded-lg"
        >
          <p className="text-center text-[24px] font-bold">Send us Email</p>
          <div className="grid gap-2 ">
            <label className="text-md" htmlFor="name">
              Name
            </label>
            <Input
              className="block border border-[rgba(196,186,186,0.8)] "
              id="name"
              name="from_name"
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <Input
              className="block border border-[rgba(196,186,186,0.8)] "
              id="email"
              name="user_email"
              type="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-md" htmlFor="phone_number">
              Phone number
            </label>
            <Input
              className="block border border-[rgba(196,186,186,0.8)] "
              id="phone_number"
              name="user_phone_number"
              type="number"
              placeholder="Your phone number"
              required
              value={phoneNumber ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPhoneNumber(
                  e.target.value === "" ? null : Number(e.target.value)
                );
              }}
            />
          </div>
          <div className="grid gap-2 ">
            <label className="text-md" htmlFor="message">
              Message
            </label>
            <Textarea
              className="block border border-[rgba(196,186,186,0.8)] "
              id="email"
              name="message"
              placeholder="Your message"
              required
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <Button
            className="text-lg w-[200px] m-auto bg-blue-600 my-4"
            disabled={loading}
            type="submit"
          >
            {loading ? "Sending message" : "Send"}
          </Button>
        </form>
        <Toaster />
      </div>
    </>
  );
}

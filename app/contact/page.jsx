"use client";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const { data, status } = useSession();
  const formRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let isAuthenticated = status === "authenticated";

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_z7gmorf",
        "template_vdjd6nm",
        formRef.current,
        "fH1AiTHAUwFbKGmjK"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
          e.target.reset();
          setName("");
          setEmail("");
        },
        (error) => {
          toast.error("Unable to send message!");
        }
      );
  };

  return (
    <section className="text-gray-600 body-font max-2xl:min-h-[50vh]">
      <div className="mx-auto text-center">
        <div className="flex flex-col text-center w-full mb-2 xl:mb-3">
          <h1 className="sm:text-4xl text-3xl font-medium title-font textColor mb-1">
            Contact Me
          </h1>
          <p className="text-lg font-medium leading-relaxed text-rose-600 md:softText ">
            Let's keep in touch
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row w-full justify-center mx-auto bgColor lg:gap-5 xl:gap-10 xl:px-20">
          <div className=" w-full text-center lg:p-5 md:w-1/2 lg:w-4/6 textColor">
            <h1 className="hidden md:block text-2xl lg:text-3xl text-rose-600 mb-3 lg:mb-4 font-medium">
              Get In Touch
            </h1>
            <div className="flex gap-3 items-center mb-4 md:gap-2 lg:gap-4">
              <FaPhoneAlt className="lg:text-base" />
              <p className="lg:text-lg ">+91 9820778795</p>
            </div>
            <div className="flex gap-3 items-center mb-4 md:gap-2 lg:gap-4">
              <FaEnvelope className="lg:text-base" />
              <a
                href="mailto:talakolavijaykumar@gmail.com"
                className="lg:text-lg"
              >
                divesh12ds@gmail.com
              </a>
            </div>
            <div className="flex gap-2 lg:gap-4 items-start">
              <FaMapMarkerAlt className="text-lg sm:text-xl mt-1" />
              <p className="leading-normal text-start lg:text-lg">
                Mumbai , Maharastra , India.
              </p>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex w-full bg-whitesmoke flex-col md:w-1/2 lg:w-3/5"
          >
            <div className="p-2 w-full">
              <input
                value={isAuthenticated ? data?.user?.name || "" : name}
                onChange={(e) => setName(e.target.value)}
                readOnly={isAuthenticated}
                required
                placeholder="Name"
                type="text"
                name="user_name"
                className="mb-1 w-full softBg rounded-md border border-gray-300  focus:softBg focus:ring-2 focus:ring-indigo-200 text-base outline-none textColor p-2 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="p-2 w-full">
              <input
                value={isAuthenticated ? data?.user?.email || "" : email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={isAuthenticated}
                required
                placeholder="Email"
                type="email"
                name="user_email"
                className="mb-1 w-full softBg rounded-md border border-gray-300  focus:softBg focus:ring-2 focus:ring-indigo-200 text-base outline-none textColor p-2 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="p-2 w-full">
              <textarea
                required
                placeholder="Message"
                name="message"
                className="mb-1 w-full softBg rounded-md border border-gray-300  focus:softBg focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none textColor p-2 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <div className=" w-full">
              <button className=" font-medium mx-auto text-white bg-rose-600 border-0 py-2 px-12 focus:outline-none hover:scale-110 transition duration-500 rounded-xl text-lg">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

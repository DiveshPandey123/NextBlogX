import React from "react";
import Image from "next/image";
import Link from "next/link";
import about from "../../public/Me.jpeg";

const SkillList = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "Express",
  "React",
  "Node",
  "Next.js",
  "Tailwind CSS",
  "React Native",
  "SEO",
  "Figma",
  "Web Design",
  "Firebase",
  "Framer motion",
];

const page = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center textColor ">
      <div className="w-full flex flex-col md:flex-row min-h-[70vh] md:min-h-[60vh] justify-center items-center">
        <div className="w-full sm:w-1/2 h-full flex justify-center">
          <Image
            src={about}
            alt="Divesh"
            className="w-full h-full scale-90 pointer-events-none object-cover object-center rounded-full md:w-4/5 md:h-4/5 xl:h-2/3 xl:w-2/3 m-auto"
          />
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col text-left items-start justify-center textColor px-4">
          <h2 className="font-semibold capitalize text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-6xl">
            Dream Big, Work Hard, Achieve More!
          </h2>
          <p className="font-noraml sm:font-medium mt-4 text-lg">
            Dreaming big and working hard is not just a mindset, it’s my
            lifestyle. I’m a passionate developer who enjoys building meaningful
            digital experiences using modern web technologies. blend creativity
            with logic to create designs that feel intuitive and systems that
            perform flawlessly. Every project I work on is a step forward —
            toward growth, impact, and excellence.
          </p>
        </div>
      </div>
      {/* skills */}
      <div className="w-full flex flex-col px-4 mt-4">
        <h2 className="font-semibold text-3xl lg:text-4xl">Skills</h2>
        <ul className="flex flex-wrap mt-4 justify-start gap-2 sm:gap-3">
          {SkillList.map((item, index) => (
            <li
              className="font-semibold capitalize inline-block softBorder py-2 px-5 text-base lg:text-lg cursor-pointer rounded-full"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full mt-5 lg:mt-7 px-4 mx-auto text-center">
        <p className="font-medium text-lg">
          Have a project in mind? Reach out to me 📞 from &nbsp;
          <Link href="/contact" className="underline">
            here
          </Link>{" "}
          &nbsp;and let's make it happen.
        </p>
      </div>
    </div>
  );
};

export default page;

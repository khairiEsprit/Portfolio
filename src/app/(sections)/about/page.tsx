"use client";

export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center pt-2 pb-20">
      <div className="text-justify animate_in p-6 md:w-1/2">
        <h1 className="text-2xl font-bold text-center mt-2 mb-5">About Me</h1>

        <p className="text-lg md:text-xl">
        I&apos;m passionate software developer with a proven track record of building innovative and scalable web applications.
          <br />
          <br />
          My educational background includes a  Bachelor&apos;s degree in Computer Science from the Higher Institute of Computer Science of Mahdia.

          <br />
          <br />I have experience working as 
          <span className="font-semibold mx-2">
            a software  Developer Intern
          </span>
          At SW Consulting, I designed and developed my end-of-study project utilizing a modern tech stack. I built the frontend using Vue.js and leveraged Node.js with Express.js and TypeScript for the backend. To ensure scalability, I implemented MongoDB as the database. Additionally, I employed clean architecture principles to promote maintainable and extensible applications.
. My
          skills include proficiency in HTML, CSS, JavaScript, vue.JS, Pinia,
          Tailwind CSS, Node.JS, Express.JS, MongoDB, Git, Github, Visual Studio
          Code and Vercel.
          <br />
          <br />I have completed various projects, including
          <span className="font-semibold mx-2">
            The Carbon calculator, DealDiscover, and This portfolio
          </span>
          which demonstrate my technical expertise and attention to detail.
          <br />
        </p>
      </div>
    </div>
  );
}

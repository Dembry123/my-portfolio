import * as React from "react";
import { useRef } from "react";
import "../styles/global.css";

const IndexPage = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-10">
        <ul className="flex justify-center gap-8">
          <li>
            <button
              onClick={() => scrollToSection(homeRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(experienceRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      <section ref={homeRef} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-5xl font-bold text-gray-800">Hi, I'm Dylan Embry</h1>
          <p className="mt-4 text-xl text-gray-600">Software Engineer</p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="https://github.com/Dembry123"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dylan-embry-87a0b9212/"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="/DylanEmbryResume.docx.pdf"
              download
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-3xl px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center">About Me</h2>
          <p className="mt-6 text-lg text-gray-600">Hi, I'm Dylan Embry, a Computer 
            Science graduate from Southern Methodist University (BA, 2024) with a 
            passion for building innovative software solutions. With experience as 
            a Full Stack Software Development Intern at zdSCADA and a Software Engineering
             Intern at TickerTrends, I’ve worked on projects ranging from optimizing oil well 
             data platforms to developing sentiment analysis tools for financial social media. 
             My technical expertise spans Python, React, Vue, .NET C++, and more, with 
             a focus on creating scalable, user-friendly applications. I’ve built AI-driven Connect 
             4 agents, a heartbeat detection iOS app using computer vision, and a doctor/patient 
             management platform. As Theta Tau’s Philanthropy Chair, I’ve organized community events 
             like White Rock Lake cleanups. I’m driven by problem-solving and creating tech that makes 
             a difference. Let’s connect!

</p>
        </div>
      </section>

      <section ref={projectsRef} className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-3xl px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center">Projects</h2>
          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">[Project 1]</h3>
              <p className="mt-2 text-gray-600">[Description]</p>
              <a
                href="[Link]"
                className="mt-2 inline-block text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={experienceRef} className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-3xl px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center">Experience</h2>
          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">[Job Title]</h3>
              <p className="text-gray-500">[Company | Dates]</p>
              <p className="mt-2 text-gray-600">[Description]</p>
            </div>
          </div>
          <a
            href="/resume.pdf"
            download
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Download Resume
          </a>
        </div>
      </section>

      <section ref={contactRef} className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Contact</h2>
          <p className="mt-6 text-lg text-gray-600">[Your contact info]</p>
        </div>
      </section>
    </main>
  );
};

export const Head = () => (
  <>
    <title>My Portfolio</title>
    <meta name="description" content="Personal portfolio of [Your Name]" />
    <link href="/styles.css" rel="stylesheet" />
  </>
);

export default IndexPage;
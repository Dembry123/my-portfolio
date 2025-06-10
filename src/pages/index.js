import * as React from "react";
import { useRef, useEffect, useState } from "react";
import "../styles/global.css";
import profileImage from "../images/IMG_3551.jpg";
import experienceImage from "../images/IMG_3222.jpg";

const IndexPage = () => {
  const homeRef = useRef(null);
  //const aboutRef = useRef(null);
  // const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);
  const breakpoint = 768; // Define the breakpoint (e.g., 768px for mobile)

  const [windowWidth, setWindowWidth] = useState(1024);


  // Track window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // State for typing animation
  const [headingText, setHeadingText] = useState("");
  const fullHeading = "Hi, I'm Dylan Embry";
  const typingSpeed = 100;

  // State for home image opacity and rotation
  const [homeImageOpacity, setHomeImageOpacity] = useState(0);
  const [homeImageRotation, setHomeImageRotation] = useState({ x: 0, y: 0 });

  // State for experience image opacity and rotation
  const [experienceImageOpacity, setExperienceImageOpacity] = useState(0);
  const [experienceImageRotation, setExperienceImageRotation] = useState({ x: 0, y: 0 });

  // State for form submission
  const [formStatus, setFormStatus] = useState("");

  // Typing effect for heading and image cursor interaction
  useEffect(() => {
    let headingIndex = 0;

    const typeHeading = () => {
      if (headingIndex < fullHeading.length) {
        setHeadingText(fullHeading.slice(0, headingIndex + 1));
        headingIndex++;
        setTimeout(typeHeading, typingSpeed);
      }
    };

    typeHeading();

    setTimeout(() => {
      setHomeImageOpacity(1);
      setExperienceImageOpacity(1);
    }, 500); // Delay for smoother page load

    // Handle mouse movement for home image tilt effect
    const handleHomeMouseMove = (e) => {
      const img = document.querySelector(".home-image");
      if (img) {
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate rotation based on mouse position relative to image center
        const rotateX = (centerY - mouseY) / rect.height * 20; // Tilt away from cursor
        const rotateY = (mouseX - centerX) / rect.width * 20;

        setHomeImageRotation({ x: rotateX, y: rotateY });
      }
    };

    // Handle mouse movement for experience image tilt effect
    const handleExperienceMouseMove = (e) => {
      const img = document.querySelector(".experience-image");
      if (img) {
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate rotation based on mouse position relative to image center
        const rotateX = (centerY - mouseY) / rect.height * 20; // Tilt away from cursor
        const rotateY = (mouseX - centerX) / rect.width * 20;

        setExperienceImageRotation({ x: rotateX, y: rotateY });
      }
    };

    // Reset rotation when mouse leaves
    const handleMouseLeave = (setRotation) => {
      setRotation({ x: 0, y: 0 });
    };

    const homeImgContainer = document.querySelector(".home-image-container");
    const experienceImgContainer = document.querySelector(".experience-image-container");

    if (homeImgContainer) {
      homeImgContainer.addEventListener("mousemove", handleHomeMouseMove);
      homeImgContainer.addEventListener("mouseleave", () => handleMouseLeave(setHomeImageRotation));
    }

    if (experienceImgContainer) {
      experienceImgContainer.addEventListener("mousemove", handleExperienceMouseMove);
      experienceImgContainer.addEventListener("mouseleave", () => handleMouseLeave(setExperienceImageRotation));
    }

    // Cleanup to prevent memory leaks
    return () => {
      headingIndex = fullHeading.length;
      if (homeImgContainer) {
        homeImgContainer.removeEventListener("mousemove", handleHomeMouseMove);
        homeImgContainer.removeEventListener("mouseleave", () => handleMouseLeave(setHomeImageRotation));
      }
      if (experienceImgContainer) {
        experienceImgContainer.removeEventListener("mousemove", handleExperienceMouseMove);
        experienceImgContainer.removeEventListener("mouseleave", () => handleMouseLeave(setExperienceImageRotation));
      }
    };
  }, []); // Empty dependency array ensures it runs once on mount

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("Message sent successfully!");
        form.reset();
        setTimeout(() => setFormStatus(""), 5000); // Clear message after 5 seconds
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again.");
    }
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
          {/*<li>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              About
            </button>
          </li>
          */}
          {/* <li>
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Projects
            </button>
          </li> */}
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
        <div className="w-full max-w-5xl px-4">
          {windowWidth > breakpoint ? (
            // Side-by-side layout for larger screens
            <div className="flex items-center">
              <div className="w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-gray-800 inline-block">
                  {headingText}
                </h1>
                <div className="mt-6 flex justify-center gap-4">
                  <a href="https://github.com/Dembry123" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/dylan-embry-87a0b9212/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="/DylanEmbryResume.pdf" download className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Download Resume
                  </a>
                </div>
              </div>
              <div className="w-1/2 flex justify-center items-center home-image-container">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="max-w-full h-auto rounded-lg shadow-lg home-image"
                  style={{
                    opacity: homeImageOpacity,
                    transition: "opacity 1s ease-in-out, transform 0.1s ease-out",
                    transform: `perspective(1000px) rotateX(${homeImageRotation.x}deg) rotateY(${homeImageRotation.y}deg)`,
                    maxHeight: "80vh",
                  }}
                />
              </div>
            </div>
          ) : (
            // Stacked layout for smaller screens
            <div className="flex flex-col items-center">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold text-gray-800 inline-block text-center">
                  {headingText}
                </h1>
                <div className="mt-6 flex justify-center gap-4">
                  <a href="https://github.com/Dembry123" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/dylan-embry-87a0b9212/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="/DylanEmbryResume.pdf" download className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Download Resume
                  </a>
                </div>
              </div>
              <div className="mt-6 flex justify-center items-center home-image-container">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="max-w-full h-auto rounded-lg shadow-lg home-image"
                  style={{
                    opacity: homeImageOpacity,
                    transition: "opacity 1s ease-in-out, transform 0.1s ease-out",
                    transform: `perspective(1000px) rotateX(${homeImageRotation.x}deg) rotateY(${homeImageRotation.y}deg)`,
                    maxWidth: "90%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* <section ref={projectsRef} className="min-h-screen flex items-center justify-center bg-white">
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
      </section> */}

      <section ref={experienceRef} className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-5xl px-4">
          {windowWidth > breakpoint ? (
            <div className="flex items-center">
              <div className="w-1/2 flex justify-center items-center experience-image-container">
                <img
                  src={experienceImage}
                  alt="Experience"
                  className="max-w-full h-auto rounded-lg shadow-lg experience-image"
                  style={{
                    opacity: experienceImageOpacity,
                    transition: "opacity 1s ease-in-out, transform 0.1s ease-out",
                    transform: `perspective(1000px) rotateX(${experienceImageRotation.x}deg) rotateY(${experienceImageRotation.y}deg)`,
                    maxHeight: "80vh",
                  }}
                />
              </div>
              <div className="w-1/2 px-4">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Experience</h2>
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Full Stack Software Development Intern</h3>
                    <p className="text-gray-500">zdSCADA, LP | Summer 2024</p>
                    <ul className="mt-2 text-gray-600 list-disc list-inside">
                      <li>Led the transition of over 10% of the oil well control and data acquisition platform from ASP.NET to Vue, improving the application's performance and user experience</li>
                      <li>Implemented over 30 customer and support requested features using technologies such as Vue, WinForms, C#, Lua, T-SQL, and .NET Core with all changes deployed to production</li>
                      <li>Enhanced team productivity by participating in a modified Scrum process, writing and testing UI tests using Playwright, and aligning on goals in weekly team meetings</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Software Engineering Intern</h3>
                    <p className="text-gray-500">TickerTrends Inc. | Summer 2023</p>
                    <ul className="mt-2 text-gray-600 list-disc list-inside">
                      <li>Developed quantitative sentiment analysis software to scrape and analyze financial social media posts using Express, Flask, and Next.js</li>
                      <li>Leveraged Knex.js and TypeORM to manage and optimize the schema and entities of a PostgreSQL database</li>
                      <li>Utilized React and Tailwind CSS to develop a dynamic front-end for data visualization, including interactive charts, real-time updates, and responsive dashboards using Chart.js</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <a
                    href="/resume.pdf"
                    download
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="px-4">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Experience</h2>
                <div className="mt-6 space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Full Stack Software Development Intern</h3>
                    <p className="text-gray-500">zdSCADA, LP | Summer 2024</p>
                    <ul className="mt-2 text-gray-600 list-disc list-inside">
                      <li>Led the transition of over 10% of the oil well control and data acquisition platform from ASP.NET to Vue, improving the application's performance and user experience</li>
                      <li>Implemented over 30 customer and support requested features using technologies such as Vue, WinForms, C#, Lua, T-SQL, and .NET Core with all changes deployed to production</li>
                      <li>Enhanced team productivity by participating in a modified Scrum process, writing and testing UI tests using Playwright, and aligning on goals in weekly team meetings</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">Software Engineering Intern</h3>
                    <p className="text-gray-500">TickerTrends Inc. | Summer 2023</p>
                    <ul className="mt-2 text-gray-600 list-disc list-inside">
                      <li>Developed quantitative sentiment analysis software to scrape and analyze financial social media posts using Express, Flask, and Next.js</li>
                      <li>Leveraged Knex.js and TypeORM to manage and optimize the schema and entities of a PostgreSQL database</li>
                      <li>Utilized React and Tailwind CSS to develop a dynamic front-end for data visualization, including interactive charts, real-time updates, and responsive dashboards using Chart.js</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <a
                    href="/resume.pdf"
                    download
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
              <div className="mt-6 flex justify-center items-center experience-image-container">
                <img
                  src={experienceImage}
                  alt="Experience"
                  className="max-w-full h-auto rounded-lg shadow-lg experience-image"
                  style={{
                    opacity: experienceImageOpacity,
                    transition: "opacity 1s ease-in-out, transform 0.1s ease-out",
                    transform: `perspective(1000px) rotateX(${experienceImageRotation.x}deg) rotateY(${experienceImageRotation.y}deg)`,
                    maxWidth: "90%",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section ref={contactRef} className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Contact</h2>
          <p className="mt-6 text-lg text-gray-600">Get in touch with me by filling out the form below.</p>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="mt-6 space-y-4 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="access_key"
              value="YOUR_ACCESS_KEY_HERE"
            />
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 h-32"
                required
              ></textarea>
            </div>
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
            />
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
          {formStatus && (
            <p className={`mt-4 text-lg ${formStatus.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {formStatus}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export const Head = () => (
  <>
    <title>Dylan Embry's Portfolio</title>
    <meta name="description" content="Personal portfolio of Dylan Embry" />
    <link href="/styles.css" rel="stylesheet" />
  </>
);

export default IndexPage;
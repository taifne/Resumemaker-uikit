"use client"
import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Interfaces (same as before - no changes here)
interface Skill {
    name: string;
}

interface Experience {
    company: string;
    title: string;
    dates: string;
    description: string;
    location: string;
    logo?: string;
    technologies: Skill[];
}

interface Education {
    institution: string;
    degree: string;
    major: string;
    dates: string;
    gpa?: string;
    description?: string;
    logo?: string;
}

interface Project {
    title: string;
    description: string;
    image?: string;
    link?: string;
    technologies: Skill[];
    startDate?: string;
    endDate?: string;
    role?: string;
}

interface Award {
    awardName: string;
    organization: string;
    date: string;
    description?: string;
}

interface PortfolioProps {
    user: {
        avatar: string;
        name: string;
        headline: string;
        email?: string;
        linkedin?: string;
        github?: string;
        location?: string;
        about: string;
        skills: Skill[];
        experience: Experience[];
        education: Education[];
        projects: Project[];
        awards?: Award[];
    };
}

const Portfolio: React.FC<PortfolioProps> = ({ user }) => {

    const handleDownloadPdf = async () => {
        const portfolioElement = document.getElementById('portfolio-content'); // Get the element to capture

        if (!portfolioElement) {
            console.error('Could not find portfolio content element.');
            return;
        }

        const canvas = await html2canvas(portfolioElement, { scale: 2 }); // Increase scale for better resolution
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${user.name.replace(/\s+/g, '_')}_Portfolio.pdf`); // Filename: John_Doe_Portfolio.pdf
    };


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Add the ID here */}
                <div id="portfolio-content" className="bg-white shadow-lg rounded-xl p-8">

                    {/* --- Header --- */}
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <img src={user.avatar} alt={`${user.name}'s Avatar`} className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md" />
                        <div className="md:ml-8 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-xl text-gray-600 mb-3">{user.headline}</p>
                            <div className="flex items-center justify-center md:justify-start text-gray-500 mb-3">
                                {user.location && (
                                    <>
                                        <FaMapMarkerAlt className="mr-1" />
                                        <span>{user.location}</span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                {user.email && <a href={`mailto:${user.email}`} aria-label="Email"><FaEnvelope className="text-blue-500 hover:text-blue-700" /></a>}
                                {user.linkedin && <a href={user.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin className="text-blue-500 hover:text-blue-700" /></a>}
                                {user.github && <a href={user.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub className="text-blue-500 hover:text-blue-700" /></a>}
                            </div>
                        </div>
                    </div>

                     {/* Download Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleDownloadPdf}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                            <FaDownload className="mr-2" />
                            Download as PDF
                        </button>
                    </div>

                    {/* --- About --- */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">About Me</h2>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{user.about}</p>
                    </section>

                    {/* --- Skills --- */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* --- Experience --- */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Experience</h2>
                        {user.experience.map((exp, index) => (
                            <div key={index} className="mb-8 last:mb-0">
                                <div className="flex items-start">
                                    {exp.logo && <img src={exp.logo} alt={`${exp.company} Logo`} className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm" />}
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                                        <p className="text-gray-600">{exp.company}</p>
                                        <p className="text-gray-500 text-sm">{exp.dates} | {exp.location}</p>
                                        <p className="text-gray-700 mt-2 whitespace-pre-line leading-relaxed">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <span key={techIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* --- Education --- */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Education</h2>
                        {user.education.map((edu, index) => (
                            <div key={index} className="mb-8 last:mb-0">
                                <div className="flex items-start">
                                   {edu.logo && (
                                    <img
                                        src={edu.logo}
                                        alt={`${edu.institution} Logo`}
                                        className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm"
                                    />
                                   )}
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                                        <p className="text-gray-600">{edu.institution}</p>
                                        <p className="text-gray-500 text-sm">{edu.dates} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                                        {edu.description && (
                                            <p className="text-gray-700 mt-2 whitespace-pre-line leading-relaxed">{edu.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                     {/* --- Projects --- */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {user.projects.map((project, index) => (
                                <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                                    {project.image && (
                                        <img src={project.image} alt={`Project: ${project.title}`} className="w-full h-48 object-cover rounded-md mb-4" />
                                    )}
                                    <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{project.startDate} - {project.endDate}</p>
                                    {project.role && <p className="text-gray-700 text-sm mb-2">Role: {project.role}</p>}
                                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{project.description}</p>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-500 hover:underline">
                                            View Project
                                        </a>
                                    )}
                                     <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                                              {tech.name}
                                             </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- Awards --- */}
                    {user.awards && user.awards.length > 0 && (
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Awards & Recognition</h2>
                            {user.awards.map((award, index) => (
                                <div key={index} className="mb-4 last:mb-0">
                                     <h3 className="text-lg font-semibold text-gray-800">{award.awardName}</h3>
                                     <p className="text-gray-600">{award.organization}</p>
                                     <p className="text-gray-500 text-sm">{award.date}</p>
                                       {award.description && (
                                          <p className="text-gray-700 mt-1 whitespace-pre-line leading-relaxed">{award.description}</p>
                                       )}
                                </div>
                            ))}
                    </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
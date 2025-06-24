import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    paddingTop: 20, // padding applies to main only
    paddingBottom: 20,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "35%",
    backgroundColor: "#2c3e50",
    color: "white",
    padding: 20,
    // You can add internal paddingTop if you want space inside the sidebar
    paddingTop: 40,
  },
  main: {
    marginLeft: "35%", // offset main content to the right of sidebar
    padding: 30, // main content internal padding
  },
 avatarContainer: {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 25,           // Slightly increased for better spacing
},

avatar: {
  width: 110,
  height: 110,
  borderRadius: 55,
  borderWidth: 3,
  borderColor: "#f1c40f",
  objectFit: "cover",         // Ensure image doesn't distort (if supported)
},

name: {
  fontSize: 20,
  fontWeight: "bold",
  marginTop: 12,              // Slightly more breathing space
  textAlign: "center",
  color: "#ecf0f1",           // Match sidebar text color (optional, for better contrast)
},

title: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#f1c40f",
  textAlign: "center",
  marginTop: 4,               // Ensure tight spacing below name
  marginBottom: 18,           // Slightly more bottom margin
  letterSpacing: 0.5,         // Subtle letter spacing for elegance
},

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#f1c40f",
    borderBottomWidth: 1,
    borderBottomColor: "#34495e",
    paddingBottom: 3,
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    color: "#ecf0f1",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
  },
  mainSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    borderBottomWidth: 2,
    borderBottomColor: "#f1c40f",
    paddingBottom: 4,
    marginBottom: 10,
  },
  company: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#2c3e50",
  },
  role: {
    fontSize: 10,
    color: "#7f8c8d",
    fontStyle: "italic",
    marginBottom: 3,
  },
  date: {
    fontSize: 9,
    color: "#95a5a6",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    marginTop: 4,
    lineHeight: 1.4,
  },
  achievement: {
    fontSize: 9,
    marginLeft: 10,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  badge: {
    backgroundColor: "#e3eaf3",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 9,
    color: "#2c3e50",
  },
  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  column: {
    width: "48%",
  },
  reference: {
    fontSize: 9,
    marginBottom: 4,
    lineHeight: 1.3,
  },
});

// Helper functions
const formatDate = (date: Date | null | undefined) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const calculateAge = (yearBorn: number) => {
  const currentYear = new Date().getFullYear();
  return currentYear - yearBorn;
};

// Modern Template 01 Component
const ModernTemplate01: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Sidebar */}
      <View style={styles.sidebar}>
        {/* Avatar */}
        {resume.avatarUrl && (
          <View style={styles.avatarContainer}>
            <Image src={resume.avatarUrl} style={styles.avatar} />
          </View>
        )}

        {/* Name & Title */}
        <Text style={styles.name}>{resume.fullName}</Text>
        <Text style={styles.title}>{resume.desiredPosition}</Text>

        {/* Contact Info */}
        <Text style={styles.sectionTitle}>CONTACT</Text>
        {resume.email && (
          <View style={styles.contactItem}>
            <Text style={styles.text}> {resume.email}</Text>
          </View>
        )}
        {resume.phoneNumber && (
          <View style={styles.contactItem}>
            <Text style={styles.text}> {resume.phoneNumber}</Text>
          </View>
        )}
        {resume.yearBorn && (
          <View style={styles.contactItem}>
            <Text style={styles.text}>
               {calculateAge(resume.yearBorn)} years
            </Text>
          </View>
        )}
        {resume.address && (
          <View style={styles.contactItem}>
            <Text style={styles.text}> {resume.address}</Text>
          </View>
        )}

        {/* Links */}
        <Text style={styles.sectionTitle}>LINKS</Text>
        {resume.linkedinUrl && (
          <Link src={resume.linkedinUrl} style={[styles.text, styles.link]}>
             LinkedIn
          </Link>
        )}
        {resume.githubUrl && (
          <Link src={resume.githubUrl} style={[styles.text, styles.link]}>
             GitHub
          </Link>
        )}
        {resume.website && (
          <Link src={resume.website} style={[styles.text, styles.link]}>
             Personal Website
          </Link>
        )}

        {/* Skills */}
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {resume.skills.map((skill: string, index: number) => (
            <Text key={index} style={styles.badge}>
              {skill}
            </Text>
          ))}
        </View>

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            {resume.languages.map((lang: any, index: number) => (
              <Text key={index} style={styles.text}>
                • {lang.langueName} ({lang.level})
              </Text>
            ))}
          </>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {resume.certifications.map((cert: any, index: number) => (
              <Text key={index} style={styles.text}>
                • {cert.cerName} ({formatDate(cert.date)})
              </Text>
            ))}
          </>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* Summary */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.mainSectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.description}>{resume.summary}</Text>
        </View>

        {/* Experience */}
        <Text style={styles.mainSectionTitle}>EXPERIENCE</Text>
        {resume.experience.map((exp: any, index: number) => (
          <View key={index} style={{ marginBottom: 12 }}>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.role}>
              {exp.role} | {exp.location}
            </Text>
            <Text style={styles.date}>
              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
            </Text>
            <Text style={styles.description}>{exp.description}</Text>
            {exp.achievements && exp.achievements.length > 0 && (
              <View style={{ marginTop: 5 }}>
                {exp.achievements.map((achievement: string, i: number) => (
                  <Text key={i} style={styles.achievement}>
                    • {achievement}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Education */}
        <Text style={styles.mainSectionTitle}>EDUCATION</Text>
        {resume.education.map((edu: any, index: number) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.company}>{edu.institution}</Text>
            <Text style={styles.role}>
              {edu.degree} | {edu.location}
            </Text>
            <Text style={styles.date}>
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </Text>
            <Text style={styles.description}>{edu.description}</Text>
            {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
          </View>
        ))}

        {/* Personal Projects */}
        {resume.personalProjects && resume.personalProjects.length > 0 && (
          <>
            <Text style={styles.mainSectionTitle}>PERSONAL PROJECTS</Text>
            {resume.personalProjects.map((project: any, index: number) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.company}>
                  {project.persionalProjectName}
                </Text>
                <Text style={styles.role}>
                  {project.domain} • {project.time}
                </Text>
                <Text style={styles.description}>{project.description}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 4,
                  }}
                >
                  {project.technologies.map((tech: string, i: number) => (
                    <Text key={i} style={styles.badge}>
                      {tech}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </>
        )}

        {/* Two-column section for Volunteer Work and References */}
        <View style={styles.twoColumns}>
          {/* Volunteer Work */}
          <View style={styles.column}>
            {resume.volunteerWork && resume.volunteerWork.length > 0 && (
              <>
                <Text style={styles.mainSectionTitle}>VOLUNTEERING</Text>
                {resume.volunteerWork.map((vol: any, index: number) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.company}>{vol.org}</Text>
                    <Text style={styles.role}>{vol.role}</Text>
                    <Text style={styles.date}>
                      {formatDate(vol.startDate)} - {formatDate(vol.endDate)}
                    </Text>
                    <Text style={styles.description}>{vol.description}</Text>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* References */}
          <View style={styles.column}>
            {resume.references && resume.references.length > 0 && (
              <>
                <Text style={styles.mainSectionTitle}>REFERENCES</Text>
                {resume.references.map((ref: any, index: number) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.company}>{ref.referName}</Text>
                    <Text style={styles.role}>{ref.relationship}</Text>
                    <Text style={styles.description}>{ref.contact}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

// Main component with template selection
const BaseResumePdf: React.FC<{ resume: any }> = ({ resume }) => {
  const templateMap: Record<string, React.FC<{ resume: any }>> = {
    "modern-template-01": ModernTemplate01,
    // Add other templates here as needed
  };

  const Template = templateMap[resume.template] || ModernTemplate01;

  return <Template resume={resume} />;
};

export default BaseResumePdf;

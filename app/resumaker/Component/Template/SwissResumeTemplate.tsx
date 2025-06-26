import React from "react";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";

// Enhanced Swiss Design Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#2c3e50",
  },
  container: {
    flexDirection: "row",
    gap: 20,
  },
  sidebar: {
    width: "32%",
    backgroundColor: "#f8f9fa",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  main: {
    width: "68%",
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 25,
    paddingBottom: 20,
    borderBottom: "1px solid #e0e0e0",
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c3e50",
    letterSpacing: -0.5,
  },
  position: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#e74c3c",
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
    paddingBottom: 4,
    borderBottom: "2px solid #e74c3c",
    letterSpacing: 1.2,
  },
  skillItem: {
    marginBottom: 8,
    lineHeight: 1.4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  company: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#2c3e50",
  },
  date: {
    fontSize: 9,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  achievementItem: {
    marginLeft: 10,
    marginBottom: 4,
    position: "relative",
    paddingLeft: 8,
  },
  achievementBullet: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 4,
    height: 4,
    backgroundColor: "#e74c3c",
    borderRadius: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#ecf0f1",
    marginVertical: 12,
  },
  avatarContainer: {
    width: 90,
    height: 110,
    border: "1px solid #e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

// Format date helper
const formatDate = (date: Date | null) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Template Component
const SwissResumeTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Photo */}
      <View style={styles.header}>
        <View style={styles.nameSection}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.position}>{resume.desiredPosition}</Text>
          
          <View>
            <View style={styles.contactItem}>
              <Text>✉️</Text>
              <Text>{resume.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📱</Text>
              <Text>{resume.phoneNumber}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>🌐</Text>
              <Text>{resume.website}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📍</Text>
              <Text>{resume.address}</Text>
            </View>
          </View>
        </View>
        
        {resume.avatarUrl && (
          <View style={styles.avatarContainer}>
            <Image src={resume.avatarUrl} style={styles.avatar} />
          </View>
        )}
      </View>

      {/* Two-Column Layout */}
      <View style={styles.container}>
        {/* Sidebar: Skills, Languages, References */}
        <View style={styles.sidebar}>
          <View>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <Text style={{ lineHeight: 1.5 }}>{resume.summary}</Text>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            {resume.skills.map((skill: string, i: number) => (
              <Text key={i} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            {resume.languages.map((lang: any, i: number) => (
              <Text key={i} style={styles.skillItem}>
                • {lang.langueName}: <Text style={{ color: "#7f8c8d" }}>{lang.level}</Text>
              </Text>
            ))}
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {resume.certifications.map((cert: any, i: number) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold" }}>{cert.cerName}</Text>
                <Text style={{ fontSize: 9, color: "#7f8c8d" }}>
                  {cert.issuer} • {cert.date.toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Main: Experience, Education */}
        <View style={styles.main}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {resume.experience.map((exp: any, i: number) => (
            <View key={i} style={{ marginBottom: 15 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
              </View>
              <Text style={{ fontSize: 10, marginBottom: 8, fontWeight: "semibold" }}>
                {exp.role} | {exp.location}
              </Text>
              <Text style={{ marginBottom: 8, lineHeight: 1.5 }}>{exp.description}</Text>
              {exp.achievements.map((a: string, j: number) => (
                <View key={j} style={styles.achievementItem}>
                  <View style={styles.achievementBullet} />
                  <Text>{a}</Text>
                </View>
              ))}
            </View>
          ))}

          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resume.education.map((edu: any, i: number) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </View>
              <Text style={{ fontWeight: "semibold" }}>{edu.degree}</Text>
              <Text style={{ fontSize: 9, color: "#7f8c8d", marginTop: 4 }}>
                {edu.location} {edu.gpa && ` | GPA: ${edu.gpa}`}
              </Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>PROJECTS</Text>
          {resume.personalProjects.map((project: any, i: number) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "bold" }}>{project.persionalProjectName}</Text>
              <Text style={{ fontSize: 9, color: "#7f8c8d", marginBottom: 6 }}>
                {project.time} • {project.teamSize} {project.teamSize > 1 ? "members" : "member"}
              </Text>
              <Text style={{ marginBottom: 6 }}>{project.description}</Text>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Tech: </Text>
                {project.technologies.join(", ")}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default SwissResumeTemplate;
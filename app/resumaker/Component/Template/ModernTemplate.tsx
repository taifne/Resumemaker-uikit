import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Modern Design Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
    color: "#334155",
  },
  header: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    padding: 30,
    marginBottom: 25,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  position: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 15,
    letterSpacing: 1.2,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    fontSize: 9,
  },
  avatarContainer: {
    width: 100,
    height: 120,
    borderRadius: 4,
    overflow: "hidden",
    border: "2px solid #64748b",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  container: {
    flexDirection: "row",
    gap: 20,
  },
  sidebar: {
    width: "36%",
  },
  main: {
    width: "64%",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: "2px solid #0ea5e9",
    letterSpacing: 0.5,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillPill: {
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 9,
  },
  educationItem: {
    marginBottom: 15,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  institution: {
    fontWeight: "bold",
    fontSize: 11,
  },
  date: {
    fontSize: 9,
    color: "#64748b",
  },
  degree: {
    fontSize: 10,
    marginBottom: 4,
  },
  jobItem: {
    marginBottom: 20,
    position: "relative",
    paddingLeft: 15,
  },
  jobTimeline: {
    position: "absolute",
    left: 0,
    top: 5,
    width: 8,
    height: 8,
    backgroundColor: "#0ea5e9",
    borderRadius: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  company: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#0f172a",
  },
  role: {
    fontSize: 10,
    color: "#475569",
    marginBottom: 8,
    fontStyle: "italic",
  },
  projectItem: {
    backgroundColor: "#f8fafc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    borderLeft: "3px solid #0ea5e9",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  projectName: {
    fontWeight: "bold",
    fontSize: 11,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0ea5e9",
    borderRadius: 2,
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  achievementBullet: {
    width: 14,
    fontSize: 14,
    color: "#0ea5e9",
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

// Language level to percentage
const languageLevelToPercent = (level: string) => {
  const levels: Record<string, number> = {
    Native: 100,
    Fluent: 90,
    Advanced: 80,
    Intermediate: 65,
    Basic: 40,
    Beginner: 25,
  };
  return levels[level] || 50;
};

// Template Component
const ModernResumeTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Modern Header */}
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.position}>{resume.desiredPosition}</Text>

          <View style={styles.contactGrid}>
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
            <View style={styles.contactItem}>
              <Text>🔗</Text>
              <Text>{resume.links[0].url.replace("https://www.", "")}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>🐱</Text>
              <Text>{resume.links[1].url.replace("https://", "")}</Text>
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
        {/* Main Content */}
        <View style={styles.main}>
          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={{ lineHeight: 1.5, fontSize: 10 }}>
              {resume.summary}
            </Text>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {resume.experience.map((exp: any, i: number) => (
              <View key={i} style={styles.jobItem}>
                <View style={styles.jobTimeline} />
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>
                  {exp.role} | {exp.location}
                </Text>
                <Text
                  style={{ marginBottom: 10, fontSize: 10, lineHeight: 1.5 }}
                >
                  {exp.description}
                </Text>
                {exp.achievements.map((a: string, j: number) => (
                  <View key={j} style={styles.achievementItem}>
                    <Text style={styles.achievementBullet}>•</Text>
                    <Text style={{ flex: 1, fontSize: 10, lineHeight: 1.4 }}>
                      {a}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Projects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KEY PROJECTS</Text>
            {resume.personalProjects.map((project: any, i: number) => (
              <View key={i} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>
                    {project.persionalProjectName}
                  </Text>
                  <Text style={styles.date}>{project.time}</Text>
                </View>
                <Text
                  style={{ fontSize: 9, marginBottom: 8, color: "#64748b" }}
                >
                  {project.domain} • Team: {project.teamSize}{" "}
                  {project.teamSize > 1 ? "members" : "member"}
                </Text>
                <Text
                  style={{ fontSize: 10, marginBottom: 8, lineHeight: 1.4 }}
                >
                  {project.description}
                </Text>
                <Text style={{ fontSize: 9 }}>
                  <Text style={{ fontWeight: "bold" }}>Technologies: </Text>
                  {project.technologies.join(", ")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
            <View style={styles.skillContainer}>
              {resume.skills.map((skill: string, i: number) => (
                <Text key={i} style={styles.skillPill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resume.education.map((edu: any, i: number) => (
              <View key={i} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={{ fontSize: 9 }}>
                  {edu.location} {edu.gpa && `| GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            {resume.languages.map((lang: any, i: number) => (
              <View key={i} style={{ marginBottom: 15 }}>
                <View style={styles.languageItem}>
                  <Text style={{ fontSize: 10 }}>{lang.langueName}</Text>
                  <Text style={{ fontSize: 9, color: "#64748b" }}>
                    {lang.level}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${languageLevelToPercent(lang.level)}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {resume.certifications.map((cert: any, i: number) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  {cert.cerName}
                </Text>
                <Text style={{ fontSize: 9 }}>{cert.issuer}</Text>
                <Text style={{ fontSize: 8, color: "#64748b" }}>
                  {cert.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </Text>
              </View>
            ))}
          </View>

          {/* References */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>REFERENCES</Text>
            {resume.references.slice(0, 2).map((ref: any, i: number) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  {ref.referName}
                </Text>
                <Text style={{ fontSize: 9 }}>{ref.relationship}</Text>
                <Text style={{ fontSize: 8, color: "#0ea5e9" }}>
                  {ref.contact}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ModernResumeTemplate;

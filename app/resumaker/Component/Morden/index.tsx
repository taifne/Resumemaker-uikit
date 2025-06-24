import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Modern Swiss Design Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  container: {
    flexDirection: "row",
    gap: 20,
  },
  sidebar: {
    width: "35%",
    paddingTop: 10,
  },
  main: {
    width: "65%",
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
    letterSpacing: -0.5,
    color: "#2c3e50",
  },
  title: {
    fontSize: 14,
    fontWeight: "medium",
    color: "#e74c3c", // Swiss red accent
    marginBottom: 15,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2c3e50",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 3,
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 5,
  },
  skillBadge: {
    backgroundColor: "#f8f9fa",
    borderRadius: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 9,
    color: "#2c3e50",
  },
  timelineItem: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  company: {
    fontWeight: "bold",
    fontSize: 11,
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
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    marginTop: 5,
  },
  achievement: {
    marginLeft: 8,
    marginTop: 3,
    fontSize: 9,
    position: "relative",
    ":before": {
      content: "'•'",
      position: "absolute",
      left: -8,
    },
  },
  languageBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  languageName: {
    width: 80,
    fontSize: 9,
  },
  languageLevel: {
    height: 4,
    backgroundColor: "#e74c3c",
    borderRadius: 2,
  },
});

// Helper: Format dates
const formatDate = (date: Date | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Present";

// Modern Swiss Template Component
const ModernSwissResumeTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.fullName}</Text>
        <Text style={styles.title}>{resume.desiredPosition}</Text>

        <View style={styles.contactGrid}>
          {resume.email && (
            <View style={styles.contactItem}>
              <Text>✉️</Text>
              <Link src={`mailto:${resume.email}`}>{resume.email}</Link>
            </View>
          )}
          {resume.phoneNumber && (
            <View style={styles.contactItem}>
              <Text>📱</Text>
              <Text>{resume.phoneNumber}</Text>
            </View>
          )}
          {resume.linkedinUrl && (
            <View style={styles.contactItem}>
              <Text>🔗</Text>
              <Link src={resume.linkedinUrl}>LinkedIn</Link>
            </View>
          )}
          {resume.githubUrl && (
            <View style={styles.contactItem}>
              <Text>🐙</Text>
              <Link src={resume.githubUrl}>GitHub</Link>
            </View>
          )}
          {resume.address && (
            <View style={styles.contactItem}>
              <Text>📍</Text>
              <Text>{resume.address}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Two-Column Layout */}
      <View style={styles.container}>
        {/* Main Content Column */}
        <View style={styles.main}>
          {/* Professional Summary */}
          {resume.summary && (
            <>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.description}>{resume.summary}</Text>
            </>
          )}

          {/* Experience */}
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.map((exp: any, i: number) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                </Text>
              </View>
              <Text style={styles.role}>
                {exp.role} | {exp.location}
              </Text>
              <Text style={styles.description}>{exp.description}</Text>
              {exp.achievements.map((a: string, j: number) => (
                <Text key={j} style={styles.achievement}>
                  {a}
                </Text>
              ))}
            </View>
          ))}

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu: any, i: number) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} → {formatDate(edu.endDate)}
                </Text>
              </View>
              <Text style={styles.role}>{edu.degree}</Text>
              {edu.gpa && (
                <Text style={styles.description}>GPA: {edu.gpa}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Sidebar Column */}
        <View style={styles.sidebar}>
          {/* Skills */}
          <Text style={styles.subsectionTitle}>Core Competencies</Text>
          <View style={styles.skillGrid}>
            {resume.skills.map((skill: string, i: number) => (
              <Text key={i} style={styles.skillBadge}>
                {skill}
              </Text>
            ))}
          </View>

          {/* Languages */}
          <Text style={styles.subsectionTitle}>Languages</Text>
          {resume.languages.map((lang: any, i: number) => (
            <View key={i} style={styles.languageBar}>
              <Text style={styles.languageName}>{lang.langueName}:</Text>
              <View
                style={[
                  styles.languageLevel,
                  {
                    width:
                      lang.level === "Native"
                        ? "100%"
                        : lang.level === "Fluent"
                        ? "80%"
                        : lang.level === "Intermediate"
                        ? "60%"
                        : "40%",
                  },
                ]}
              />
            </View>
          ))}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <>
              <Text style={styles.subsectionTitle}>Certifications</Text>
              {resume.certifications.map((cert: any, i: number) => (
                <Text key={i} style={styles.description}>
                  • {cert.cerName} ({formatDate(cert.date)})
                </Text>
              ))}
            </>
          )}

          {/* Projects */}
          {resume.personalProjects && resume.personalProjects.length > 0 && (
            <>
              <Text style={styles.subsectionTitle}>Key Projects</Text>
              {resume.personalProjects.map((project: any, i: number) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                    {project.persionalProjectName}
                  </Text>
                  <Text style={styles.description}>{project.description}</Text>
                </View>
              ))}
            </>
          )}

          {/* References */}
          {resume.references && resume.references.length > 0 && (
            <>
              <Text style={styles.subsectionTitle}>References</Text>
              {resume.references.slice(0, 2).map((ref: any, i: number) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 9 }}>
                    {ref.referName}
                  </Text>
                  <Text style={styles.description}>
                    {ref.relationship} | {ref.contact}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

export default ModernSwissResumeTemplate;

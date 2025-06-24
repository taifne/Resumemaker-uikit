import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Register modern fonts (optional but recommended)
// Modern Chronological Resume Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
       fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },
  container: {
    flexDirection: "row",
    gap: 25,
  },
  main: {
    width: "70%",
  },
  sidebar: {
    width: "30%",
    paddingTop: 15,
  },
  header: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3498db",
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#3498db",
    fontWeight: 600,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    fontWeight: 600,
    color: "#2c3e50",
  },
  date: {
    fontSize: 9,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  role: {
    fontSize: 10,
    color: "#3498db",
    fontWeight: 600,
    marginBottom: 6,
  },
  achievementList: {
    marginLeft: 8,
  },
  achievement: {
    fontSize: 9,
    marginBottom: 4,
    position: "relative",
    ":before": {
      content: "'•'",
      position: "absolute",
      left: -8,
      color: "#3498db",
    },
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: 5,
    marginTop: 8,
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 3,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 600,
    color: "#2c3e50",
  },
  badge: {
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 8,
    color: "#2c3e50",
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

// Chronological Resume Template
const ModernChronologicalTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{resume.fullName}</Text>
        <Text style={styles.title}>{resume.desiredPosition}</Text>
        
        <View style={styles.contactRow}>
          {resume.email && (
            <View style={styles.contactItem}>
              <Text>✉️</Text>
              <Link src={`mailto:${resume.email}`} style={{ color: "#3498db" }}>
                {resume.email}
              </Link>
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
              <Link
                src={resume.linkedinUrl}
                style={{ color: "#3498db" }}
              >
                LinkedIn
              </Link>
            </View>
          )}
          {resume.githubUrl && (
            <View style={styles.contactItem}>
              <Text>🐙</Text>
              <Link
                src={resume.githubUrl}
                style={{ color: "#3498db" }}
              >
                GitHub
              </Link>
            </View>
          )}
          {resume.location && (
            <View style={styles.contactItem}>
              <Text>📍</Text>
              <Text>{resume.location}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Two-Column Layout */}
      <View style={styles.container}>
        {/* Main Content (70%) */}
        <View style={styles.main}>
          {/* Professional Summary */}
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={{ marginBottom: 15 }}>{resume.summary}</Text>

          {/* Work Experience (Reverse Chronological) */}
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {resume.experience
            .sort(
              (a: any, b: any) =>
                new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            )
            .map((exp: any, i: number) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>{exp.role}</Text>
                <Text style={{ fontSize: 9, marginBottom: 8, color: "#7f8c8d" }}>
                  {exp.location}
                </Text>
                <View style={styles.achievementList}>
                  {exp.achievements.map((achievement: string, j: number) => (
                    <Text key={j} style={styles.achievement}>
                      {achievement}
                    </Text>
                  ))}
                </View>
              </View>
            ))}

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education
            .sort(
              (a: any, b: any) =>
                new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            )
            .map((edu: any, i: number) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>{edu.degree}</Text>
                {edu.gpa && (
                  <Text style={{ fontSize: 9 }}>GPA: {edu.gpa}/4.0</Text>
                )}
              </View>
            ))}
        </View>

        {/* Sidebar (30%) */}
        <View style={styles.sidebar}>
          {/* Skills */}
          <Text style={styles.sectionTitle}>Skills</Text>
          {resume.skillCategories && resume.skillCategories.length > 0
            ? resume.skillCategories.map((category: any, i: number) => (
                <View key={i}>
                  <Text style={styles.skillCategory}>{category.name}</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {category.skills.map((skill: string, j: number) => (
                      <Text key={j} style={styles.badge}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              ))
            : resume.skills && (
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {resume.skills.map((skill: string, i: number) => (
                    <Text key={i} style={styles.badge}>
                      {skill}
                    </Text>
                  ))}
                </View>
              )}

          {/* Languages */}
          <Text style={[styles.sectionTitle, { marginTop: 15 }]}>Languages</Text>
          {resume.languages.map((lang: any, i: number) => (
            <Text key={i} style={styles.skillItem}>
              • {lang.langueName} ({lang.level})
            </Text>
          ))}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                Certifications
              </Text>
              {resume.certifications.map((cert: any, i: number) => (
                <Text key={i} style={styles.skillItem}>
                  • {cert.cerName} ({formatDate(cert.date)})
                </Text>
              ))}
            </>
          )}

          {/* Projects */}
          {resume.personalProjects && resume.personalProjects.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                Key Projects
              </Text>
              {resume.personalProjects.map((project: any, i: number) => (
                <View key={i} style={{ marginBottom: 10 }}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectName}>
                      {project.persionalProjectName}
                    </Text>
                    <Text style={styles.date}>{project.time}</Text>
                  </View>
                  <Text style={{ fontSize: 9 }}>{project.description}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

// Add to template map
const templateMap: Record<string, React.FC<{ resume: any }>> = {
  "modern-chronological": ModernChronologicalTemplate,
  // ...other templates
};

export default ModernChronologicalTemplate;
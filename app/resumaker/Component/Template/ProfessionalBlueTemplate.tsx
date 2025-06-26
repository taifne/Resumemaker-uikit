import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";
import { formatDate } from "../../../helper/date-time-helper";

const ProfessionalBlueTemplate: React.FC<{ resume: any }> = ({ resume }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFFFFF",
      fontFamily: "Helvetica",
      padding: 40,
    },
    header: {
      backgroundColor: "#1a3a6c",
      padding: 20,
      color: "white",
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
    },
    title: {
      fontSize: 14,
      color: "#a4c2f4",
      marginBottom: 10,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#1a3a6c",
      borderBottomWidth: 2,
      borderBottomColor: "#1a3a6c",
      paddingBottom: 4,
      marginBottom: 10,
      marginTop: 15,
    },
    twoColumns: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    leftColumn: {
      width: "65%",
      paddingRight: 15,
    },
    rightColumn: {
      width: "35%",
      borderLeftWidth: 1,
      borderLeftColor: "#d9e3f0",
      paddingLeft: 15,
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    company: {
      fontWeight: "bold",
      fontSize: 12,
      color: "#1a3a6c",
    },
    date: {
      fontSize: 10,
      color: "#7f8c8d",
    },
    role: {
      fontSize: 11,
      fontStyle: "italic",
      marginBottom: 5,
      color: "#2c3e50",
    },
    description: {
      fontSize: 10,
      marginTop: 4,
      lineHeight: 1.4,
    },
    skillItem: {
      fontSize: 10,
      marginBottom: 5,
    },
    achievement: {
      fontSize: 10,
      marginLeft: 10,
      marginBottom: 3,
    },
    projectTitle: {
      fontWeight: "bold",
      fontSize: 11,
      marginBottom: 3,
      color: "#1a3a6c",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.title}>{resume.desiredPosition}</Text>
          <View style={styles.contactRow}>
            {resume.email && (
              <Text style={styles.contactItem}>📧 {resume.email}</Text>
            )}
            {resume.phoneNumber && (
              <Text style={styles.contactItem}>📱 {resume.phoneNumber}</Text>
            )}
            {resume.linkedinUrl && (
              <Link src={resume.linkedinUrl} style={styles.contactItem}>
                🔗 LinkedIn
              </Link>
            )}
          </View>
        </View>

        <View style={styles.twoColumns}>
          {/* Main Content Column */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.description}>{resume.summary}</Text>

            {/* Experience */}
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            {resume.experience.map((exp: any, index: number) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>{exp.role} | {exp.location}</Text>
                <Text style={styles.description}>{exp.description}</Text>
                {exp.achievements && (
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
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resume.education.map((edu: any, index: number) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>{edu.degree}</Text>
                {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>

          {/* Sidebar Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <Text style={styles.sectionTitle}>SKILLS</Text>
            {resume.skills.map((skill: string, index: number) => (
              <Text key={index} style={styles.skillItem}>
                • {skill}
              </Text>
            ))}

            {/* Projects */}
            {resume.personalProjects && resume.personalProjects.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>KEY PROJECTS</Text>
                {resume.personalProjects.map((project: any, index: number) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.projectTitle}>
                      {project.persionalProjectName}
                    </Text>
                    <Text style={styles.description}>
                      {project.description}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                {resume.certifications.map((cert: any, index: number) => (
                  <Text key={index} style={styles.skillItem}>
                    • {cert.cerName} ({formatDate(cert.date)})
                  </Text>
                ))}
              </>
            )}

            {/* Languages */}
            {resume.languages && resume.languages.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
                {resume.languages.map((lang: any, index: number) => (
                  <Text key={index} style={styles.skillItem}>
                    • {lang.langueName} ({lang.level})
                  </Text>
                ))}
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalBlueTemplate;
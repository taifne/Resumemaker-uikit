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
import { formatDate } from "../../../helper/date-time-helper";
const MinimalistLightTemplate: React.FC<{ resume: any }> = ({ resume }) => {
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#FFFFFF",
      fontFamily: "Helvetica",
      padding: 40,
    },
    header: {
      borderBottomWidth: 2,
      borderBottomColor: "#e0e0e0",
      paddingBottom: 15,
      marginBottom: 20,
    },
    name: {
      fontSize: 26,
      fontWeight: "light",
      letterSpacing: 1,
      marginBottom: 5,
      color: "#2c3e50",
    },
    title: {
      fontSize: 14,
      color: "#7f8c8d",
      marginBottom: 10,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
      color: "#95a5a6",
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: 8,
      marginTop: 15,
      letterSpacing: 0.5,
    },
    company: {
      fontWeight: "bold",
      fontSize: 12,
      color: "#2c3e50",
    },
    role: {
      fontSize: 11,
      color: "#7f8c8d",
      marginBottom: 3,
    },
    date: {
      fontSize: 9,
      color: "#95a5a6",
      marginBottom: 5,
      fontStyle: "italic",
    },
    description: {
      fontSize: 10,
      marginTop: 4,
      lineHeight: 1.4,
      color: "#34495e",
    },
    skillBadge: {
      backgroundColor: "#f5f7fa",
      borderRadius: 3,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginRight: 5,
      marginBottom: 5,
      fontSize: 9,
      color: "#2c3e50",
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
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
            {resume.email && <Text>✉️ {resume.email}</Text>}
            {resume.phoneNumber && <Text>📱 {resume.phoneNumber}</Text>}
            {resume.linkedinUrl && (
              <Link src={resume.linkedinUrl}>🌐 LinkedIn</Link>
            )}
          </View>
        </View>

        {/* Summary */}
        <Text style={styles.sectionTitle}>PROFILE</Text>
        <Text style={styles.description}>{resume.summary}</Text>

        {/* Experience */}
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {resume.experience.map((exp: any, index: number) => (
          <View key={index} style={{ marginBottom: 12 }}>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.role}>{exp.role}</Text>
            <Text style={styles.date}>
              {formatDate(exp.startDate)} - {formatDate(exp.endDate)} | {exp.location}
            </Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>SKILLS</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {resume.skills.map((skill: string, index: number) => (
            <Text key={index} style={styles.skillBadge}>
              {skill}
            </Text>
          ))}
        </View>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          {/* Education Column */}
          <View style={{ width: "50%", paddingRight: 10 }}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resume.education.map((edu: any, index: number) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.role}>{edu.degree}</Text>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
                {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>

          {/* Projects Column */}
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {resume.personalProjects.map((project: any, index: number) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={styles.projectHeader}>
                  <Text style={styles.company}>
                    {project.persionalProjectName}
                  </Text>
                  <Text style={styles.date}>{project.time}</Text>
                </View>
                <Text style={styles.description}>{project.description}</Text>
              </View>
            ))}

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                {resume.certifications.map((cert: any, index: number) => (
                  <Text key={index} style={styles.description}>
                    • {cert.cerName} ({formatDate(cert.date)})
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
;export default MinimalistLightTemplate;

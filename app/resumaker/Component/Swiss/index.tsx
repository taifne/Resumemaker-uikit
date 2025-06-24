import React from "react";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";

// Swiss Design Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  container: {
    flexDirection: "row",
  },
  sidebar: {
    width: "30%",
    paddingRight: 15,
    borderRight: 1,
    borderRightColor: "#e0e0e0",
  },
  main: {
    width: "70%",
    paddingLeft: 15,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  photo: {
    width: 80,
    height: 100,
    marginLeft: "auto", // Align top-right
    borderWidth: 1,
    borderColor: "#2c3e50",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contact: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e74c3c", // Accent color
    paddingBottom: 4,
    marginBottom: 8,
    marginTop: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  company: {
    fontWeight: "bold",
    fontSize: 11,
  },
  date: {
    fontSize: 9,
    color: "#7f8c8d",
    fontStyle: "italic",
  },
  references: {
    marginTop: 5,
    fontSize: 9,
  },
});

// Helper: Format dates (e.g., "Jan 2020 - Present")
const formatDate = (date: Date | null) => 
  date ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present";

// Template Component
const SwissResumeTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Photo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={{ fontSize: 12, color: "#7f8c8d" }}>{resume.desiredPosition}</Text>
          
          <View style={styles.contact}>
            {resume.email && <Text>✉️ {resume.email}</Text>}
            {resume.phoneNumber && <Text>📱 {resume.phoneNumber}</Text>}
            {resume.address && <Text>🏠 {resume.address}</Text>}
            <Text>🎂 {resume.dateOfBirth} | {resume.nationality}</Text>
            <Text>👪 {resume.maritalStatus}</Text>
          </View>
        </View>
        
        {resume.photoUrl && (
          <Image src={resume.photoUrl} style={styles.photo} />
        )}
      </View>

      {/* Two-Column Layout */}
      <View style={styles.container}>
        {/* Sidebar: Skills, Languages, References */}
        <View style={styles.sidebar}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          {resume.skills.map((skill: string, i: number) => (
            <Text key={i}>• {skill}</Text>
          ))}
          
          <Text style={styles.sectionTitle}>LANGUAGES</Text>
          {resume.languages.map((lang: any, i: number) => (
            <Text key={i}>• {lang.langueName}: {lang.level}</Text>
          ))}
          
          <Text style={styles.sectionTitle}>REFERENCES</Text>
          {resume.references.slice(0, 3).map((ref: any, i: number) => (
            <Text key={i} style={styles.references}>
              {ref.referName} ({ref.relationship}) 
              {"\n"}☎️ {ref.contact}
            </Text>
          ))}
        </View>

        {/* Main: Experience, Education */}
        <View style={styles.main}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
          {resume.experience.map((exp: any, i: number) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
              </View>
              <Text style={{ fontSize: 10 }}>{exp.role} | {exp.location}</Text>
              <Text style={{ marginTop: 4 }}>{exp.description}</Text>
              {exp.achievements.map((a: string, j: number) => (
                <Text key={j} style={{ marginLeft: 10 }}>• {a}</Text>
              ))}
            </View>
          ))}

          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resume.education.map((edu: any, i: number) => (
            <View key={i} style={{ marginBottom: 8 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </View>
              <Text>{edu.degree}</Text>
              {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default SwissResumeTemplate;
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

// STYLES
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    backgroundColor: "#F2F2F2",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#2C3E50",
    color: "#FFF",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 10,
  },
  main: {
    width: "70%",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#FFF",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    color: "#ECF0F1",
  },
  contact: {
    fontSize: 9,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 2,
  },
  block: {
    marginBottom: 10,
  },
  company: {
    fontSize: 11,
    fontWeight: "bold",
  },
  role: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#555",
  },
  date: {
    fontSize: 9,
    color: "#888",
    marginBottom: 2,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.3,
    color: "#333",
  },
  badge: {
    fontSize: 8,
    backgroundColor: "#3498DB",
    color: "#FFF",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 3,
    marginBottom: 3,
  }
});

// COMPONENT
const ModernElegantTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <Text style={styles.name}>{resume.fullName}</Text>
        <Text style={styles.title}>{resume.desiredPosition}</Text>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.contact}>{resume.email}</Text>
          <Text style={styles.contact}>{resume.phoneNumber}</Text>
          <Text style={styles.contact}>{resume.address}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={[styles.sectionTitle, { color: "#ECF0F1", borderBottomColor: "#7F8C8D" }]}>Skills</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {resume.skills.map((skill: string, i: number) => (
              <Text key={i} style={styles.badge}>{skill}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.main}>
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{resume.summary}</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.map((exp: any, index: number) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.role}>{exp.role} | {exp.location}</Text>
              <Text style={styles.date}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu: any, index: number) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.role}>{edu.degree} | {edu.location}</Text>
              <Text style={styles.date}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
              <Text style={styles.description}>{edu.description}</Text>
            </View>
          ))}
        </View>

        {resume.personalProjects?.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.personalProjects.map((proj: any, index: number) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.company}>{proj.persionalProjectName}</Text>
                <Text style={styles.role}>{proj.domain} | {proj.time}</Text>
                <Text style={styles.description}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

        {resume.references?.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>References</Text>
            {resume.references.map((ref: any, index: number) => (
              <View key={index} style={{ marginBottom: 4 }}>
                <Text style={styles.company}>{ref.referName}</Text>
                <Text style={styles.role}>{ref.relationship}</Text>
                <Text style={styles.description}>{ref.contact}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

// HELPER
const formatDate = (date: Date | null | undefined) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export default ModernElegantTemplate;

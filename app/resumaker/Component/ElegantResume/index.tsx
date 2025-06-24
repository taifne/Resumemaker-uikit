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
    fontFamily: "Helvetica",
    backgroundColor: "#F8F8F8",
  },
  headerBlock: {
    backgroundColor: "#34495E",
    padding: 30,
    color: "#FFFFFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 12,
    marginTop: 4,
  },
  contact: {
    fontSize: 9,
    marginTop: 2,
  },
  sectionBlock: {
    padding: 20,
    marginBottom: 10,
  },
  sectionDark: {
    backgroundColor: "#ECF0F1",
  },
  sectionLight: {
    backgroundColor: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 6,
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
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 3,
    marginBottom: 3,
  },
});

// COMPONENT
const ColorBlockTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* HEADER */}
      <View style={styles.headerBlock}>
        <Text style={styles.name}>{resume.fullName}</Text>
        <Text style={styles.title}>{resume.desiredPosition}</Text>
        <Text style={styles.contact}>{resume.email} | {resume.phoneNumber} | {resume.address}</Text>
      </View>

      {/* SUMMARY */}
      <View style={[styles.sectionBlock, styles.sectionDark]}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.description}>{resume.summary}</Text>
      </View>

      {/* EXPERIENCE */}
      <View style={[styles.sectionBlock, styles.sectionLight]}>
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

      {/* EDUCATION */}
      <View style={[styles.sectionBlock, styles.sectionDark]}>
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

      {/* SKILLS */}
      <View style={[styles.sectionBlock, styles.sectionLight]}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {resume.skills.map((skill: string, i: number) => (
            <Text key={i} style={styles.badge}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* PROJECTS */}
      {resume.personalProjects?.length > 0 && (
        <View style={[styles.sectionBlock, styles.sectionDark]}>
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

      {/* REFERENCES */}
      {resume.references?.length > 0 && (
        <View style={[styles.sectionBlock, styles.sectionLight]}>
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

export default ColorBlockTemplate;

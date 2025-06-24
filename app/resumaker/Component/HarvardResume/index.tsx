import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link
} from "@react-pdf/renderer";

// STYLES
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 50,
    paddingRight: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 10,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 2,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
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
    fontSize: 10,
    lineHeight: 1.3,
  },
  badge: {
    fontSize: 9,
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  }
});

// COMPONENT
const HarvardTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.name}>{resume.fullName}</Text>
      <Text style={styles.title}>{resume.desiredPosition}</Text>

      <Text style={styles.contactLine}>
        {resume.email} | {resume.phoneNumber} | {resume.address}
      </Text>

      {/* SUMMARY */}
      <Text style={styles.sectionTitle}>Professional Summary</Text>
      <Text style={styles.description}>{resume.summary}</Text>

      {/* EXPERIENCE */}
      <Text style={styles.sectionTitle}>Experience</Text>
      {resume.experience.map((exp: any, index: number) => (
        <View key={index} style={{ marginBottom: 8 }}>
          <Text style={styles.company}>{exp.company}</Text>
          <Text style={styles.role}>{exp.role} | {exp.location}</Text>
          <Text style={styles.date}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text>
          <Text style={styles.description}>{exp.description}</Text>
        </View>
      ))}

      {/* EDUCATION */}
      <Text style={styles.sectionTitle}>Education</Text>
      {resume.education.map((edu: any, index: number) => (
        <View key={index} style={{ marginBottom: 8 }}>
          <Text style={styles.company}>{edu.institution}</Text>
          <Text style={styles.role}>{edu.degree} | {edu.location}</Text>
          <Text style={styles.date}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
          <Text style={styles.description}>{edu.description}</Text>
        </View>
      ))}

      {/* SKILLS */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {resume.skills.map((skill: string, i: number) => (
          <Text key={i} style={styles.badge}>{skill}</Text>
        ))}
      </View>

      {/* PROJECTS */}
      {resume.personalProjects?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resume.personalProjects.map((proj: any, index: number) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.company}>{proj.persionalProjectName}</Text>
              <Text style={styles.role}>{proj.domain} | {proj.time}</Text>
              <Text style={styles.description}>{proj.description}</Text>
            </View>
          ))}
        </>
      )}

      {/* REFERENCES */}
      {resume.references?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>References</Text>
          {resume.references.map((ref: any, index: number) => (
            <View key={index} style={{ marginBottom: 6 }}>
              <Text style={styles.company}>{ref.referName}</Text>
              <Text style={styles.role}>{ref.relationship}</Text>
              <Text style={styles.text}>{ref.contact}</Text>
            </View>
          ))}
        </>
      )}
    </Page>
  </Document>
);

// HELPERS
const formatDate = (date: Date | null | undefined) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

// INTEGRATE INTO BASE
const HavardBaseResumePdf: React.FC<{ resume: any }> = ({ resume }) => {
  const templateMap: Record<string, React.FC<{ resume: any }>> = {
    "harvard-template": HarvardTemplate,     // new Harvard style
  };

  const Template = templateMap[resume.template] || HarvardTemplate;
  return <Template resume={resume} />;
};

export default HavardBaseResumePdf;

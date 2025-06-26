import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";
import { formatDate } from "../../../helper/date-time-helper";

const ElegantDarkTemplate: React.FC<{ resume: any }> = ({ resume }) => {
  const styles = StyleSheet.create({
    page: { backgroundColor: "#1a1a1a", padding: 30, color: "#f0f0f0" },
    header: { 
      borderBottomWidth: 1, 
      borderBottomColor: "#4a90e2", 
      paddingBottom: 15, 
      marginBottom: 20 
    },
    name: { 
      fontSize: 28, 
      fontWeight: "bold", 
      color: "#ffffff", 
      letterSpacing: 1 
    },
    title: { 
      fontSize: 12, 
      color: "#a4c2f4", 
      marginTop: 5 
    },
    sectionTitle: { 
      fontSize: 16, 
      fontWeight: "bold", 
      color: "#4a90e2", 
      marginTop: 15, 
      marginBottom: 8 
    },
    jobHeader: { 
      flexDirection: "row", 
      justifyContent: "space-between" 
    },
    company: { 
      fontWeight: "bold", 
      fontSize: 12, 
      color: "#ffffff" 
    },
    date: { 
      fontSize: 10, 
      color: "#b0b0b0", 
      fontStyle: "italic" 
    },
    description: { 
      fontSize: 10, 
      lineHeight: 1.4, 
      marginTop: 5, 
      color: "#e0e0e0" 
    },
    skillBadge: { 
      backgroundColor: "#2a2a2a", 
      borderRadius: 3, 
      padding: "3px 8px", 
      marginRight: 5, 
      marginBottom: 5, 
      fontSize: 9, 
      color: "#a4c2f4" 
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.title}>{resume.desiredPosition}</Text>
        </View>

        <Text style={styles.sectionTitle}>SUMMARY</Text>
        <Text style={styles.description}>{resume.summary}</Text>

        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {resume.experience.map((exp: any) => (
          <View key={exp.id} style={{ marginBottom: 12 }}>
            <View style={styles.jobHeader}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.date}>
                {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
              </Text>
            </View>
            <Text style={{ fontSize: 11, color: "#b0b0b0" }}>
              {exp.role} | {exp.location}
            </Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ width: "60%", paddingRight: 15 }}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {resume.education.map((edu: any) => (
              <View key={edu.id} style={{ marginBottom: 10 }}>
                <Text style={styles.company}>{edu.institution}</Text>
                <Text style={{ fontSize: 10, color: "#b0b0b0" }}>
                  {edu.degree}
                </Text>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} → {formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ width: "40%", paddingLeft: 15 }}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {resume.skills.map((skill: string) => (
                <Text key={skill} style={styles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default ElegantDarkTemplate;
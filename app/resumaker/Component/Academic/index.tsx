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
const ClassicAcademicTemplate: React.FC<{ resume: any }> = ({ resume }) => {
  const styles = StyleSheet.create({
    page: { 
      backgroundColor: "#ffffff", 
      padding: 40, 
      fontFamily: "Times-Roman" 
    },
    name: { 
      fontSize: 24, 
      textAlign: "center", 
      fontWeight: "bold", 
      letterSpacing: 0.5 
    },
    contactRow: { 
      flexDirection: "row", 
      justifyContent: "center", 
      marginTop: 5, 
      marginBottom: 15 
    },
    contactItem: { 
      fontSize: 10, 
      marginHorizontal: 8 
    },
    sectionTitle: { 
      fontSize: 14, 
      fontWeight: "bold", 
      borderBottomWidth: 1, 
      borderBottomColor: "#000000", 
      paddingBottom: 3, 
      marginTop: 12 
    },
    jobHeader: { 
      flexDirection: "row", 
      justifyContent: "space-between", 
      marginTop: 8 
    },
    company: { 
      fontWeight: "bold", 
      fontSize: 11 
    },
    role: { 
      fontSize: 10, 
      fontStyle: "italic" 
    },
    achievement: { 
      fontSize: 10, 
      marginLeft: 10, 
      marginTop: 3 
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{resume.fullName}</Text>
        <View style={styles.contactRow}>
          {resume.email && <Text style={styles.contactItem}>{resume.email}</Text>}
          {resume.phoneNumber && (
            <Text style={styles.contactItem}>{resume.phoneNumber}</Text>
          )}
          {resume.linkedinUrl && (
            <Link src={resume.linkedinUrl} style={styles.contactItem}>
              LinkedIn
            </Link>
          )}
        </View>

        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        {resume.experience.map((exp: any) => (
          <View key={exp.id}>
            <View style={styles.jobHeader}>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={{ fontSize: 9 }}>
                {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
              </Text>
            </View>
            <Text style={styles.role}>{exp.role} | {exp.location}</Text>
            <Text style={{ fontSize: 10, marginTop: 4 }}>{exp.description}</Text>
            {exp.achievements?.map((a: string) => (
              <Text key={a} style={styles.achievement}>• {a}</Text>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {resume.education.map((edu: any) => (
          <View key={edu.id} style={styles.jobHeader}>
            <View>
              <Text style={styles.company}>{edu.institution}</Text>
              <Text style={styles.role}>{edu.degree}</Text>
            </View>
            <Text style={{ fontSize: 9 }}>
              {formatDate(edu.startDate)} → {formatDate(edu.endDate)}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>PUBLICATIONS</Text>
        {resume.publications?.map((pub: any) => (
          <Text key={pub.id} style={{ fontSize: 10, marginTop: 4 }}>
            • {pub.title}. {pub.journal}, {pub.year}
          </Text>
        ))}
      </Page>
    </Document>
  );
};const formatDate = (date: Date | null | undefined) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export default ClassicAcademicTemplate;

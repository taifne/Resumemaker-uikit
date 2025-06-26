import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { formatDate } from "../../../helper/date-time-helper";
const GPTTemplate: React.FC<{ resume: any }> = ({ resume }) => {
  const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 10, fontFamily: "Times-Roman" },
    headerName: { fontSize: 20, fontWeight: "bold", marginBottom: 2 },
    headerPosition: { fontSize: 10, marginBottom: 8 },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 4,
      textTransform: "uppercase",
    },
    smallText: { fontSize: 9 },
    twoCol: { flexDirection: "row" },
    leftCol: { width: "35%", paddingRight: 10 },
    rightCol: { width: "65%" },
    textItem: { marginBottom: 2 },
    contactItem: { marginBottom: 2 },
    listItem: { marginLeft: 8, marginBottom: 2 },
    link: { color: "blue", textDecoration: "underline" },
    avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerName}>
          <Text>{resume.fullName}</Text>
        </View>
        <Text style={styles.headerPosition}>{resume.desiredPosition}</Text>

        <View style={styles.twoCol}>
          {/* LEFT COLUMN */}
          <View style={styles.leftCol}>
            {resume.avatarUrl && (
              <Image src={resume.avatarUrl} style={styles.avatar} />
            )}
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.contactItem}>{resume.address}</Text>
            <Text style={styles.contactItem}>{resume.phoneNumber}</Text>
            <Text style={styles.contactItem}>{resume.email}</Text>
            {resume.linkedinUrl && (
              <Link src={resume.linkedinUrl} style={styles.link}>
                LinkedIn
              </Link>
            )}
            {resume.githubUrl && (
              <Link src={resume.githubUrl} style={styles.link}>
                GitHub
              </Link>
            )}
            {resume.website && (
              <Link src={resume.website} style={styles.link}>
                Website
              </Link>
            )}

            <Text style={styles.sectionTitle}>Skills</Text>
            {resume.skills.map((skill: string) => (
              <Text key={skill} style={styles.textItem}>
                • {skill}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.textItem}>Open-source</Text>
            <Text style={styles.textItem}>Tech blogging</Text>
            <Text style={styles.textItem}>Mentoring</Text>
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.rightCol}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.textItem}>{resume.summary}</Text>

            <Text style={styles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp: any) => (
              <View key={exp.company + exp.startDate}>
                <Text style={{ fontWeight: "bold" }}>
                  {exp.company} | {exp.location}
                </Text>
                <Text style={styles.smallText}>
                  {formatDate(exp.startDate)} -{" "}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </Text>
                <Text style={styles.textItem}>{exp.role}</Text>
                <Text style={styles.textItem}>{exp.description}</Text>
                {exp.achievements.map((a: string) => (
                  <Text key={a} style={styles.listItem}>
                    • {a}
                  </Text>
                ))}
              </View>
            ))}

            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu: any) => (
              <View key={edu.institution + edu.degree}>
                <Text style={{ fontWeight: "bold" }}>
                  {edu.institution} | {edu.location}
                </Text>
                <Text style={styles.smallText}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
                <Text style={styles.textItem}>{edu.degree}</Text>
                <Text style={styles.textItem}>{edu.description}</Text>
                {edu.gpa && (
                  <Text style={styles.textItem}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        <Text
          style={[styles.smallText, { textAlign: "center", marginTop: 8 }]}
        >
          Generated: {formatDate(resume.createdAt)} | Updated:{" "}
          {formatDate(resume.updatedAt)}
        </Text>
      </Page>
    </Document>
  );
};

export default GPTTemplate;

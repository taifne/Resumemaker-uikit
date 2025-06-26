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

const ClassicAcademicTemplate: React.FC<{ resume: any }> = ({ resume }) => {
  const styles = StyleSheet.create({
    page: { backgroundColor: "#ffffff", padding: 40, fontFamily: "Times-Roman" },
    name: { fontSize: 24, textAlign: "center", fontWeight: "bold" },
    position: { fontSize: 12, textAlign: "center", marginBottom: 4 },
    avatar: { width: 60, height: 60, borderRadius: 30, alignSelf: "center", marginBottom: 8 },
    contactRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginBottom: 10 },
    contactItem: { fontSize: 9, marginHorizontal: 5 },
    sectionTitle: { fontSize: 14, fontWeight: "bold", borderBottomWidth: 1, borderBottomColor: "#000", marginTop: 12, marginBottom: 4 },
    textItem: { fontSize: 10, marginTop: 2 },
    listItem: { fontSize: 10, marginLeft: 10, marginTop: 2 },
    twoColumnRow: { flexDirection: "row", justifyContent: "space-between" },
    smallText: { fontSize: 9 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {resume.avatarUrl && <Image src={resume.avatarUrl} style={styles.avatar} />}
        <Text style={styles.name}>{resume.fullName}</Text>
        {resume.desiredPosition && <Text style={styles.position}>{resume.desiredPosition}</Text>}
        <View style={styles.contactRow}>
          {resume.email && <Text style={styles.contactItem}>{resume.email}</Text>}
          {resume.phoneNumber && <Text style={styles.contactItem}>{resume.phoneNumber}</Text>}
          {resume.linkedinUrl && <Link src={resume.linkedinUrl} style={styles.contactItem}>LinkedIn</Link>}
          {resume.githubUrl && <Link src={resume.githubUrl} style={styles.contactItem}>GitHub</Link>}
          {resume.website && <Link src={resume.website} style={styles.contactItem}>Website</Link>}
        </View>

        {resume.summary && (
          <>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <Text style={styles.textItem}>{resume.summary}</Text>
          </>
        )}

        {resume.skills?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {resume.skills.map((skill: string) => (
                <Text key={skill} style={styles.contactItem}>• {skill}</Text>
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        {resume.experience.map((exp: any) => (
          <View key={exp.company + exp.startDate}>
            <View style={styles.twoColumnRow}>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{exp.company}</Text>
              <Text style={styles.smallText}>{formatDate(exp.startDate)} → {exp.endDate ? formatDate(exp.endDate) : "Present"}</Text>
            </View>
            <Text style={styles.textItem}>{exp.role} | {exp.location}</Text>
            <Text style={styles.textItem}>{exp.description}</Text>
            {exp.achievements?.map((a: string) => (
              <Text key={a} style={styles.listItem}>• {a}</Text>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {resume.education.map((edu: any) => (
          <View key={edu.institution + edu.degree}>
            <View style={styles.twoColumnRow}>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>{edu.institution}</Text>
              <Text style={styles.smallText}>{formatDate(edu.startDate)} → {formatDate(edu.endDate)}</Text>
            </View>
            <Text style={styles.textItem}>{edu.degree} | {edu.location}</Text>
            <Text style={styles.textItem}>{edu.description}</Text>
            {edu.gpa && <Text style={styles.textItem}>GPA: {edu.gpa}</Text>}
          </View>
        ))}

        {resume.personalProjects?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PERSONAL PROJECTS</Text>
            {resume.personalProjects.map((proj: any) => (
              <View key={proj.persionalProjectName}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>{proj.persionalProjectName} ({proj.time})</Text>
                <Text style={styles.textItem}>{proj.domain}: {proj.description}</Text>
                <Text style={styles.textItem}>Tech: {proj.technologies.join(", ")}</Text>
                <Text style={styles.textItem}>Team Size: {proj.teamSize}</Text>
                {proj.responsibilities.map((r: string) => (
                  <Text key={r} style={styles.listItem}>• {r}</Text>
                ))}
              </View>
            ))}
          </>
        )}

        {resume.certifications?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {resume.certifications.map((cer: any) => (
              <Text key={cer.cerName} style={styles.textItem}>• {cer.cerName}, {cer.issuer} ({formatDate(cer.date)})</Text>
            ))}
          </>
        )}

        {resume.languages?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>LANGUAGES</Text>
            {resume.languages.map((lang: any) => (
              <Text key={lang.langueName} style={styles.textItem}>• {lang.langueName} - {lang.level}</Text>
            ))}
          </>
        )}

        {resume.volunteerWork?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>VOLUNTEER WORK</Text>
            {resume.volunteerWork.map((v: any) => (
              <View key={v.org + v.role}>
                <View style={styles.twoColumnRow}>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>{v.org}</Text>
                  <Text style={styles.smallText}>{formatDate(v.startDate)} → {v.endDate ? formatDate(v.endDate) : "Present"}</Text>
                </View>
                <Text style={styles.textItem}>{v.role}</Text>
                <Text style={styles.textItem}>{v.description}</Text>
              </View>
            ))}
          </>
        )}

        {resume.links?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>LINKS</Text>
            {resume.links.map((l: any) => (
              <Link key={l.url} src={l.url} style={styles.textItem}>• {l.label}</Link>
            ))}
          </>
        )}

        {resume.references?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>REFERENCES</Text>
            {resume.references.map((ref: any) => (
              <Text key={ref.referName} style={styles.textItem}>• {ref.referName} ({ref.contact}) - {ref.relationship}</Text>
            ))}
          </>
        )}

        {resume.generatedText && (
          <>
            <Text style={styles.sectionTitle}>SUMMARY STATEMENT</Text>
            <Text style={styles.textItem}>{resume.generatedText}</Text>
          </>
        )}

        <Text style={[styles.smallText, { textAlign: "center", marginTop: 12 }]}>Generated: {formatDate(resume.createdAt)} | Updated: {formatDate(resume.updatedAt)}</Text>
      </Page>
    </Document>
  );
};

export default ClassicAcademicTemplate;

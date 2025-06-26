import React from "react";
import { Document, Page, View, Text, StyleSheet, Image, Svg, Path } from "@react-pdf/renderer";

// Professional Legal Resume Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f8f9fa",
    padding: 40,
    fontFamily: "Helvetica",
    color: "#2d3748",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottom: "2px solid #2c5282",
    paddingBottom: 20,
  },
  nameContainer: {
    maxWidth: "70%",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c5282",
    letterSpacing: 0.5,
  },
  position: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 15,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontSize: 10,
    color: "#4a5568",
    marginRight: 15,
  },
  avatarContainer: {
    width: 90,
    height: 110,
    borderRadius: 2,
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  container: {
    flexDirection: "row",
    gap: 25,
  },
  leftColumn: {
    width: "70%",
  },
  rightColumn: {
    width: "30%",
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 5,
    borderBottom: "1px solid #e2e8f0",
  },
  sectionIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c5282",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "#4a5568",
    textAlign: "justify",
  },
  jobItem: {
    marginBottom: 20,
    position: "relative",
    paddingLeft: 15,
  },
  jobTimeline: {
    position: "absolute",
    left: 0,
    top: 5,
    width: 8,
    height: 8,
    backgroundColor: "#2c5282",
    borderRadius: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  company: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#2d3748",
  },
  date: {
    fontSize: 10,
    color: "#718096",
    fontStyle: "italic",
  },
  role: {
    fontSize: 11,
    color: "#4a5568",
    marginBottom: 8,
    fontWeight: "semibold",
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  achievementBullet: {
    color: "#2c5282",
    marginRight: 8,
    fontWeight: "bold",
  },
  educationItem: {
    marginBottom: 15,
  },
  institution: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#2d3748",
    marginBottom: 2,
  },
  degree: {
    fontSize: 10,
    color: "#4a5568",
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 9,
    color: "#718096",
  },
  skillContainer: {
    flexDirection: "column",
    gap: 8,
  },
  skillItem: {
    fontSize: 10,
    color: "#4a5568",
  },
  skillName: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#2c5282",
  },
  barContainer: {
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    width: "100%",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#2c5282",
  },
  certificationItem: {
    marginBottom: 12,
  },
  certName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 1,
  },
  certIssuer: {
    fontSize: 9,
    color: "#4a5568",
    marginBottom: 1,
  },
  certDate: {
    fontSize: 8,
    color: "#718096",
  },
  publicationItem: {
    marginBottom: 10,
  },
  pubTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 2,
  },
  pubDetails: {
    fontSize: 9,
    color: "#4a5568",
  },
  courtItem: {
    marginBottom: 8,
  },
  courtName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2d3748",
  },
  admissionDate: {
    fontSize: 9,
    color: "#718096",
  },
});

// Legal Icons as SVG components
const GavelIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.sectionIcon}>
    <Path d="M5 12H3v7c0 1.1.9 2 2 2h5v-2H5v-7zm16-4h-5V5h5v3zm-2-3h-1v1h1V5zm-7 5h-1V7h1v2zm2-2h1V5h-1v2zm-2 6h1v-2h-1v2zm2 2h1v-2h-1v2zm-8-4h1v-2H7v2zm-2-2h1V7H5v2z" fill="#2c5282" />
  </Svg>
);

const EducationIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.sectionIcon}>
    <Path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.5L5.5 9.63 12 6.5l6.5 3.13L12 15.5z" fill="#2c5282" />
  </Svg>
);

const LawIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.sectionIcon}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#2c5282" />
  </Svg>
);

const CourtIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.sectionIcon}>
    <Path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" fill="#2c5282" />
  </Svg>
);

const SkillIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.sectionIcon}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" fill="#2c5282" />
  </Svg>
);

const PublicationIcon = () => (
  <Svg viewBox="0 0 24 24" style={styles.sectionIcon}>
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM12 7h-2v2h-2v2h2v2h2v-2h2V9h-2z" fill="#2c5282" />
  </Svg>
);

const formatDate = (date: Date | null) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const AttorneyResumeTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.position}>{resume.desiredPosition}</Text>
          
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text>✉️ {resume.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📱 {resume.phoneNumber}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>🏛️ {resume.barNumber || "Member in Good Standing"}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📍 {resume.address}</Text>
            </View>
          </View>
        </View>
        
        {resume.avatarUrl && (
          <View style={styles.avatarContainer}>
            <Image src={resume.avatarUrl} style={styles.avatar} />
          </View>
        )}
      </View>

      {/* Two-Column Layout */}
      <View style={styles.container}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Professional Summary */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LawIcon />
              <Text style={styles.sectionTitle}>PROFESSIONAL PROFILE</Text>
            </View>
            <Text style={styles.summaryText}>
              {resume.summary || "Highly skilled attorney with extensive experience in litigation and legal counsel. Proven track record of successful case outcomes and client advocacy. Specialized knowledge in corporate law with exceptional research, writing, and oral advocacy skills. Dedicated to providing strategic legal solutions with the highest ethical standards."}
            </Text>
          </View>

          {/* Legal Experience */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <GavelIcon />
              <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            </View>
            
            {resume.experience.map((exp: any, i: number) => (
              <View key={i} style={styles.jobItem}>
                <View style={styles.jobTimeline} />
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>{exp.role} | {exp.location}</Text>
                {exp.achievements.map((a: string, j: number) => (
                  <View key={j} style={styles.achievementItem}>
                    <Text style={styles.achievementBullet}>•</Text>
                    <Text style={{ fontSize: 10 }}>{a}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Notable Cases */}
          {resume.notableCases && resume.notableCases.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <CourtIcon />
                <Text style={styles.sectionTitle}>NOTABLE CASES</Text>
              </View>
              
              {resume.notableCases.map((caseItem: any, i: number) => (
                <View key={i} style={styles.jobItem}>
                  <View style={styles.jobTimeline} />
                  <View style={styles.jobHeader}>
                    <Text style={styles.company}>{caseItem.caseName}</Text>
                    <Text style={styles.date}>{caseItem.year}</Text>
                  </View>
                  <Text style={{ fontSize: 10, marginBottom: 5, fontStyle: "italic" }}>
                    {caseItem.court}, {caseItem.jurisdiction}
                  </Text>
                  <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
                    {caseItem.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Education */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <EducationIcon />
              <Text style={styles.sectionTitle}>EDUCATION</Text>
            </View>
            
            {resume.education.map((edu: any, i: number) => (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.educationDate}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
                {edu.honors && (
                  <Text style={{ fontSize: 9, color: "#2c5282", fontStyle: "italic" }}>
                    {edu.honors}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Bar Admissions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <CourtIcon />
              <Text style={styles.sectionTitle}>BAR ADMISSIONS</Text>
            </View>
            
            {resume.certifications.map((certification: any, i: number) => (
              <View key={i} style={styles.courtItem}>
                <Text style={styles.courtName}>{certification.cerName}</Text>
                <Text style={styles.admissionDate}>Admitted: {certification.issuer}</Text>
              </View>
            ))}
          </View>

          {/* Legal Skills */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <SkillIcon />
              <Text style={styles.sectionTitle}>LEGAL SKILLS</Text>
            </View>
            
            <View style={styles.skillContainer}>
              {resume.volunteerWork.map((volunteer: any, i: number) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={styles.skillName}>{volunteer.org}</Text>
                  <View style={styles.barContainer}>
                 <View style={[styles.barFill, { width: volunteer.role }]} />

                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LawIcon />
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
              </View>
              
              {resume.certifications.map((cert: any, i: number) => (
                <View key={i} style={styles.certificationItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certIssuer}>{cert.issuer}</Text>
                  <Text style={styles.certDate}>{cert.year}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Publications */}
          {resume.publications && resume.publications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <PublicationIcon />
                <Text style={styles.sectionTitle}>PUBLICATIONS</Text>
              </View>
              
              {resume.publications.map((pub: any, i: number) => (
                <View key={i} style={styles.publicationItem}>
                  <Text style={styles.pubTitle}>{pub.title}</Text>
                  <Text style={styles.pubDetails}>
                    {pub.journal}, {pub.year}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {resume.languages && resume.languages.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <SkillIcon />
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
              </View>
              
              <View style={styles.skillContainer}>
                {resume.languages.map((lang: any, i: number) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.skillName}>{lang.language}</Text>
                    <Text style={{ fontSize: 9, color: "#4a5568" }}>{lang.proficiency}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

export default AttorneyResumeTemplate;
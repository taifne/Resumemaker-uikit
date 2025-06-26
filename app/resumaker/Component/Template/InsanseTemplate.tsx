import React from "react";
import { Document, Page, View, Text, StyleSheet, Image, Svg, Path, Line } from "@react-pdf/renderer";

// Insane Design Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#000",
    padding: 0,
    fontFamily: "Helvetica",
    color: "#fff",
  },
  header: {
    backgroundColor: "#0f0c29",
    padding: 40,
    position: "relative",
    overflow: "hidden",
  },
  headerPattern: {
    position: "absolute",
    top: -200,
    right: -100,
    opacity: 0.15,
  },
  nameContainer: {
    maxWidth: "70%",
  },
  name: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 1.5,
    background: "linear-gradient(90deg, #00dbde 0%, #fc00ff 100%)",
    backgroundClip: "text",
    color: "transparent",
    textTransform: "uppercase",
  },
  position: {
    fontSize: 16,
    color: "#c4c4c4",
    marginBottom: 30,
    letterSpacing: 3,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  avatarContainer: {
    position: "absolute",
    top: 40,
    right: 40,
    width: 140,
    height: 180,
    border: "3px solid #fff",
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(124, 58, 237, 0.5)",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  container: {
    flexDirection: "row",
    padding: 40,
    gap: 30,
    backgroundColor: "#000",
  },
  leftColumn: {
    width: "65%",
  },
  rightColumn: {
    width: "35%",
  },
  section: {
    marginBottom: 30,
    position: "relative",
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    background: "linear-gradient(90deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)",
    backgroundClip: "text",
    color: "transparent",
    marginLeft: 10,
    letterSpacing: 1,
  },
  titleLine: {
    flex: 1,
    height: 2,
    background: "linear-gradient(90deg, transparent, #6366f1)",
    marginLeft: 10,
  },
  summaryText: {
    fontSize: 12,
    lineHeight: 1.8,
    color: "#d1d5db",
    textAlign: "justify",
    letterSpacing: 0.3,
  },
  jobItem: {
    marginBottom: 30,
    position: "relative",
    paddingLeft: 20,
    borderLeft: "2px solid #6366f1",
  },
  jobTimelineDot: {
    position: "absolute",
    left: -7,
    top: 5,
    width: 12,
    height: 12,
    backgroundColor: "#6366f1",
    borderRadius: 6,
    boxShadow: "0 0 10px rgba(99, 102, 241, 0.😎",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  company: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 10,
    color: "#a5b4fc",
    fontStyle: "italic",
  },
  role: {
    fontSize: 12,
    color: "#c7d2fe",
    marginBottom: 12,
    fontStyle: "italic",
  },
  achievementItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  achievementBullet: {
    width: 20,
    fontSize: 18,
    color: "#818cf8",
    marginTop: -2,
  },
  projectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 15,
  },
  projectCard: {
    width: "48%",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 8,
    padding: 15,
    border: "1px solid rgba(99, 102, 241, 0.3)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  projectName: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  skillPill: {
    backgroundColor: "rgba(79, 70, 229, 0.2)",
    color: "#c7d2fe",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontSize: 8,
    border: "1px solid rgba(99, 102, 241, 0.3)",
  },
  educationItem: {
    marginBottom: 25,
    paddingLeft: 15,
    borderLeft: "2px solid #10b981",
  },
  institution: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
    marginBottom: 4,
  },
  degree: {
    fontSize: 11,
    color: "#a7f3d0",
    marginBottom: 6,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  languageBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    width: "60%",
    overflow: "hidden",
  },
  languageFill: {
    height: "100%",
    borderRadius: 3,
  },
  certificationItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 8,
    borderLeft: "3px solid #8b5cf6",
  },
  patternOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    zIndex: 1,
  },
});

// Format date helper
const formatDate = (date: Date | null) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

// Language level to color
const languageLevelToColor = (level: string) => {
  const colors: Record<string, string> = {
    "Native": "#10b981",
    "Fluent": "#3b82f6",
    "Advanced": "#8b5cf6",
    "Intermediate": "#ec4899",
    "Basic": "#f59e0b",
    "Beginner": "#ef4444"
  };
  return colors[level] || "#6366f1";
};

// Language level to percentage
const languageLevelToPercent = (level: string) => {
  const levels: Record<string, number> = {
    "Native": 100,
    "Fluent": 90,
    "Advanced": 80,
    "Intermediate": 65,
    "Basic": 40,
    "Beginner": 25
  };
  return levels[level] || 50;
};

// Hexagon pattern component
const HexagonPattern = () => (
  <Svg width="300" height="300" style={styles.headerPattern}>
    {/* Pattern of hexagons */}
    {[...Array(8)].map((_, row) => 
      [...Array(8)].map((_, col) => {
        const x = col * 35 + (row % 2 === 0 ? 0 : 17.5);
        const y = row * 30;
        return (
          <Path
            key={`${row}-${col}`}
            d={`M ${x+15} ${y} L ${x+30} ${y+8.5} L ${x+30} ${y+25.5} L ${x+15} ${y+34} L ${x} ${y+25.5} L ${x} ${y+8.5} Z`}
            fill="none"
            stroke="#6366f1"
            strokeWidth={0.8}
          />
        );
      })
    )}
  </Svg>
);

// Template Component
const InsaneResumeTemplate: React.FC<{ resume: any }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Geometric Pattern */}
      <View style={styles.header}>
        <HexagonPattern />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{resume.fullName}</Text>
          <Text style={styles.position}>{resume.desiredPosition}</Text>
          
          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text>✉️</Text>
              <Text>{resume.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📱</Text>
              <Text>{resume.phoneNumber}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>🌐</Text>
              <Text>{resume.links[0].url.replace("https://", "")}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>📍</Text>
              <Text>{resume.address.split(",")[0] + ", " + resume.address.split(",")[2]}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>🔗</Text>
              <Text>{resume.links[0].url.replace("https://www.", "")}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text>🐱</Text>
              <Text>{resume.links[1].url.replace("https://", "")}</Text>
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
          {/* Summary */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>PROFILE</Text>
              <View style={styles.titleLine} />
            </View>
            <Text style={styles.summaryText}>{resume.summary}</Text>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>EXPERIENCE</Text>
              <View style={styles.titleLine} />
            </View>
            {resume.experience.map((exp: any, i: number) => (
              <View key={i} style={styles.jobItem}>
                <View style={styles.jobTimelineDot} />
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.role}>{exp.role} | {exp.location}</Text>
                <Text style={{ marginBottom: 15, fontSize: 11, color: "#d1d5db", lineHeight: 1.6 }}>
                  {exp.description}
                </Text>
                {exp.achievements.map((a: string, j: number) => (
                  <View key={j} style={styles.achievementItem}>
                    <Text style={styles.achievementBullet}>▹</Text>
                    <Text style={{ flex: 1, fontSize: 10, lineHeight: 1.5 }}>{a}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Projects */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>PROJECTS</Text>
              <View style={styles.titleLine} />
            </View>
            <View style={styles.projectGrid}>
              {resume.personalProjects.map((project: any, i: number) => (
                <View key={i} style={styles.projectCard}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectName}>{project.persionalProjectName}</Text>
                    <Text style={styles.date}>{project.time}</Text>
                  </View>
                  <Text style={{ fontSize: 9, marginBottom: 10, color: "#a5b4fc", lineHeight: 1.5 }}>
                    {project.description}
                  </Text>
                  <View style={styles.skillContainer}>
                    {project.technologies.slice(0, 4).map((tech: string, j: number) => (
                      <Text key={j} style={styles.skillPill}>{tech}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Skills */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>SKILLS</Text>
              <View style={styles.titleLine} />
            </View>
            <View style={{ paddingLeft: 10 }}>
              {resume.skills.map((skill: string, i: number) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                  <View style={{ width: 6, height: 6, backgroundColor: "#818cf8", marginRight: 10 }} />
                  <Text style={{ fontSize: 11 }}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Education */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>EDUCATION</Text>
              <View style={styles.titleLine} />
            </View>
            {resume.education.map((edu: any, i: number) => (
              <View key={i} style={styles.educationItem}>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={{ fontSize: 10, color: "#86efac", marginBottom: 4 }}>
                  {edu.location} | GPA: {edu.gpa}
                </Text>
                <Text style={{ fontSize: 9, color: "#a5b4fc" }}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>LANGUAGES</Text>
              <View style={styles.titleLine} />
            </View>
            {resume.languages.map((lang: any, i: number) => (
              <View key={i} style={styles.languageItem}>
                <Text style={{ fontSize: 11 }}>{lang.langueName}</Text>
                <View style={styles.languageBar}>
                  <View 
  style={[
    styles.languageFill, 
    { 
      width: `${languageLevelToPercent(lang.level)}%`,
      backgroundColor: languageLevelToColor(lang.level)
    }
  ]}
/>

                </View>
              </View>
            ))}
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <Text>◆</Text>
              <Text style={styles.titleText}>CERTIFICATIONS</Text>
              <View style={styles.titleLine} />
            </View>
            {resume.certifications.map((cert: any, i: number) => (
              <View key={i} style={styles.certificationItem}>
                <Text style={{ fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>
                  {cert.cerName}
                </Text>
                <Text style={{ fontSize: 9, color: "#c7d2fe" }}>
                  {cert.issuer}
                </Text>
                <Text style={{ fontSize: 8, color: "#a5b4fc", marginTop: 4 }}>
                  {cert.date.toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Background Pattern Overlay */}
      <Svg style={styles.patternOverlay} width="100%" height="100%">
        {[...Array(30)].map((_, i) => {
          const x = Math.random() * 100 * 4;
          const y = Math.random() * 100 * 4;
          const size = Math.random() * 10 + 5;
          return (
            <Path
              key={i}
              d={`M ${x} ${y} 
                 C ${x+size} ${y}, ${x+size*2} ${y+size}, ${x+size*2} ${y+size*2}
                 C ${x+size*2} ${y+size*3}, ${x+size} ${y+size*4}, ${x} ${y+size*4}
                 C ${x-size} ${y+size*4}, ${x-size*2} ${y+size*3}, ${x-size*2} ${y+size*2}
                 C ${x-size*2} ${y+size}, ${x-size} ${y}, ${x} ${y} Z`}
              fill="none"
              stroke="#6366f1"
              strokeWidth={0.3}
            />
          );
        })}
      </Svg>
    </Page>
  </Document>
);

export default InsaneResumeTemplate;
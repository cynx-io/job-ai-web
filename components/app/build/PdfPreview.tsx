"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeFormData } from "@/lib/type";
import { Mail } from "lucide-react";

const PDFViewer = dynamic(
  () =>
    import("@react-pdf/renderer").then((mod) => ({
      default: mod.PDFViewer,
    })),
  { ssr: false },
);

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  headerBar: {
    height: 8,
    backgroundColor: "#d97333",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: "#d97333",
    fontWeight: "bold",
  },
  summary: {
    marginTop: 4,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  contactItem: {
    marginRight: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionIcon: {
    width: 5,
    height: 20,
    backgroundColor: "#d97333",
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 11,
  },
  entrySubtitle: {
    fontSize: 11,
    marginBottom: 4,
  },
  bullet: {
    marginLeft: 10,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    width: "33%",
    marginBottom: 4,
  },
});

function MyDocument({ data }: { data: ResumeFormData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBar} />

        {/* Name and Summary */}
        <Text style={styles.name}>{data.basicInfo.name}</Text>
        <Text style={styles.summary}>{data.basicInfo.sumary}</Text>

        {/* Contact */}
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>{data.basicInfo.email}</Text>
          <Text style={styles.contactItem}>{data.basicInfo.phone}</Text>
          <Text style={styles.contactItem}>{data.basicInfo.location}</Text>
          <Text style={styles.contactItem}>{data.basicInfo.website}</Text>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Work Experience</Text>
          </View>
          {data.workExperience.map((exp, index) => (
            <View key={index}>
              <View style={styles.entryRow}>
                <Text style={styles.entryTitle}>{exp.company}</Text>
                <Text>{exp.date}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{exp.position}</Text>
              {(exp.description || "").split("\n").map((desc, i) => (
                <Text key={i} style={styles.bullet}>
                  • {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          {data.education.map((edu, index) => (
            <View key={index}>
              <View style={styles.entryRow}>
                <Text style={styles.entryTitle}>{edu.institution}</Text>
                <Text>{edu.date}</Text>
              </View>
              <Text style={styles.entrySubtitle}>
                {edu.degree} - {edu.gpa} GPA
              </Text>
              {(edu.description || "").split("\n").map((desc, i) => (
                <Text key={i} style={styles.bullet}>
                  • {desc}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Project</Text>
          </View>
          {data.projects.map((proj, index) => (
            <View key={index}>
              <View style={styles.entryRow}>
                <Text style={styles.entryTitle}>{proj.name}</Text>
                <Text>{proj.date}</Text>
              </View>
              {proj.description.split("\n").map((line, i) => (
                <Text key={i} style={styles.bullet}>
                  • {line}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Skills</Text>
          </View>
          <View style={styles.skillList}>
            {data.skills.split("\n").map((line, i) => (
              <Text key={i} style={styles.skillItem}>
                • {line}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default function PdfPreview({ formData }: { formData: ResumeFormData }) {
  const memoizedDocument = useMemo(() => {
    return <MyDocument data={formData} />;
  }, [formData]);

  return (
    <PDFViewer
      key={JSON.stringify(formData)}
      className="text-center w-full sm:w-[100%] h-full"
    >
      {memoizedDocument}
    </PDFViewer>
  );
}

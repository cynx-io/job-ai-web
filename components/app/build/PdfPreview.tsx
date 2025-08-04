// components/PdfPreview.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () =>
    import("@react-pdf/renderer").then((mod) => ({ default: mod.PDFViewer })),
  { ssr: false },
);

export default function PdfPreview() {
  return (
    <PDFViewer width="100%" height={600}>
      <MyDocument />
    </PDFViewer>
  );
}

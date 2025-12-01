"use client";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";

Font.register({
  family: "LiberationSans",
  fonts: [
    { src: "/font/LiberationSans-Regular.ttf" },
    { src: "/font/LiberationSans-Bold.ttf", fontWeight: "bold" },
  ],
});

const Invoice = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* original text */}
        <View style={styles.originalInvoice}>
          <Text>(Original Invoice)</Text>
        </View>

        {/* logo and title */}
        <View style={styles.header}>
          <Image src={"/blog/Logo.png"} style={styles.logo} />
          <Text style={styles.title}>TAX INVOICE</Text>
        </View>

        {/* watermark */}
        <Image src={"/blog/logo2.png"} style={styles.watermark} />

        {/* invoice info */}
        <View style={styles.invoiceInfo}>
          <Text style={{ marginTop: "6px" }}>Invoice No.: 2024100316</Text>
          <Text style={{ marginBottom: "1px" }}>Invoice Date: 05-Jan-2025</Text>
        </View>

        {/* customer details */}
        <View style={styles.customerDetails}>
          <Text style={styles.sectionTitle}>Customer Details</Text>

          <Text>
            <Text style={styles.bold}>Client Name: </Text>
            Vishal Gupta
          </Text>

          <Text>
            <Text style={styles.bold}>Company Name: </Text>
            Vishal Enterprise
          </Text>
          <Text>
            <Text style={styles.bold}>GST No.: </Text>
            07BONPG0167A1ZC
          </Text>
          <Text>
            <Text style={[styles.bold, { textAlign: "justify" }]}>
              Address:{" "}
            </Text>
            Ground Floor, Plot No. 27, New Sabzi Mandi, Block C,
          </Text>

          <Text style={{ textAlign: "justify" }}>
            Azadpur, New Delhi - 110033, Delhi, India
          </Text>
        </View>

        {/* table */}
        <View style={styles.table}>
          {/* table header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 0.5, fontWeight: "bold" }]}>
              S.No.
            </Text>
            <Text style={[styles.tableCell, { flex: 3, fontWeight: "bold" }]}>
              Description
            </Text>
            <Text style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}>
              HSN
            </Text>
            <Text style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}>
              Rate
            </Text>
            <Text style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}>
              Amount (Rs.)
            </Text>
          </View>

          {/* table row example */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}>1</Text>
            <Text
              style={[
                styles.tableCell,
                {
                  flex: 3,
                  fontFamily: "LiberationSans",
                  fontWeight: "bold",
                },
              ]}
            >
              Web Services
            </Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
              998313
            </Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
              000
            </Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
              0000.00
            </Text>
          </View>

          {/* taxable amount */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 3, textAlign: "right", fontSize: 8 },
              ]}
            >
              Taxable Amount
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              00000.00
            </Text>
          </View>

          {/* cgst row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                {
                  flex: 3,
                  textAlign: "right",
                  fontSize: 8,
                  textAlign: "right",
                },
              ]}
            >
              CGST
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              9%
            </Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              000.00
            </Text>
          </View>

          {/* sgst row */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 3, textAlign: "right", fontSize: 8 },
              ]}
            >
              SGST
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              9%
            </Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              000.00
            </Text>
          </View>

          {/* total tax amount */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 3, textAlign: "right", fontSize: 8 },
              ]}
            >
              Total Tax Amount
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              18%
            </Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontSize: 8, textAlign: "right" },
              ]}
            >
              000.00
            </Text>
          </View>

          {/* total amount */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 0.5 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { textAlign: "right", fontWeight: "bold", flex: 3 },
              ]}
            >
              Total Amount
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, fontWeight: "bold", textAlign: "right" },
              ]}
            >
              000.00
            </Text>
          </View>
        </View>

        {/* note section */}
        <View style={[styles.noteSection, { fontSize: 9 }]}>
          <Text>Whether the tax is payable on reverse charge basis: No</Text>

          <Text style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}>
            NOTE:
          </Text>
          <Text>
            • Tenure of service and payment terms for this invoice would be
            governed as per the agreement between the Customer and
          </Text>

          <Text style={{ marginLeft: 6 }}>
            Promozione Branding Private Limited.
          </Text>

          <Text>
            • This invoice is valid, subject to realization of due payments, as
            mentioned in details above.
          </Text>
          <Text>
            • Any payment made is covered under "Advertising Contract" u/s 194C.
            TDS, if applicable, shall be @ 2%.
          </Text>
          <Text>
            • You are requested to validate this invoice along with GSTIN within
            one month of Invoice date.
          </Text>

          <View style={styles.companyDetails}>
            <Text style={{ fontWeight: "bold" }}>
              Promozione Branding Pvt Ltd.
            </Text>
            <Text>
              356, Vardhman Grand Plaza, Sec 3, Rohini, New Delhi-110085, India.
            </Text>
            <Text>Ph no: +91 - 011 42603232</Text>
            <Text>
              PAN No.: AAOCP9163C, GSTIN No.: 07AAOCP9163C1Z5, CIN:
              U63112DL2024PTC434224
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  page: {
    fontFamily: "LiberationSans",
    padding: "0px 50px",
    fontSize: 10,
    // fontFamily: "Helvetica",
  },
  originalInvoice: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 9,
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: "cover",
  },
  title: {
    top: 20, // vertically center relative to logo
    left: "50%",
    transform: "translateX(-150%)",
    fontSize: 12,

    fontWeight: "bold",
    color: "red",
  },

  invoiceInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  watermark: {
    position: "absolute",
    top: "15%",
    width: 450,
    left: "12%",
    height: 450,
    opacity: 0.08,
    objectFit: "contain",
  },

  customerDetails: {
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 0.7,
  },

  bold: {
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },

  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    padding: 4,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  noteSection: {
    marginTop: 24,
    lineHeight: 1.2,
    fontFamily: "LiberationSans",
  },
  companyDetails: {
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: "",
    paddingTop: 4,
  },
});

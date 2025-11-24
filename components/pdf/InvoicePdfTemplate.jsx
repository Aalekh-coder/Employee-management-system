
const { Document, Page, Text, Image,Font,StyleSheet } = require("@react-pdf/renderer");

const InvoicePdfTemplate = () => (
  <Document>
    <Page style={styles.body}>
        <Text style={styles.OriginalInvoice}>(Original Invoice)</Text>
    
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  OriginalInvoice:{
    fontSize:10
    
  }

});

export default InvoicePdfTemplate
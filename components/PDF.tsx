import { formatCurrency } from "@/util/helper";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summary: {
    padding: 10,
    color: "#505050",
    fontSize: "12px",
  },
  line: {
    borderTop: "1px solid #888", // Specify the grey color here
    marginTop: 10,
    marginBottom: 10,
  },
  bill: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  fontStyle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#000",
  },
  textAlign: {
    textAlign: "right",
    flexGrow: 1,
    marginBottom: 6,
  },
  amount: {
    marginTop: 12,
    backgroundColor: "#d3f0f4",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 14,
  },
  footer: {
    color: "#505050",
    fontSize: 8,
    textAlign: "center",
  },
});

type MyDocProps = {
  imageUrl: string;
  name: string;
  bookDate: Date;
  packageName: string;
  amount: number;
};

const Invoice = ({
  imageUrl,
  name,
  bookDate,
  packageName,
  amount,
}: MyDocProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View>
          <View>
            <View style={styles.heading}>
              <Image
                src="/logo.jpg"
                style={{ height: "50px", width: "80px", objectFit: "cover" }}
              />
              <View>
                <Text>Europe 45 </Text>
                <Text>Gloucester Road</Text>
                <Text>London</Text>
                <Text>+44 (0)20 3671 5709</Text>
              </View>
            </View>
          </View>
          <View style={styles.summary}>
            <Text>Invoice Summary</Text>
            <View style={styles.line} />
            <View style={{ marginBottom: 10 }}>
              <Image src={imageUrl} style={{ height: "200px" }} />
            </View>
            <View style={styles.bill}>
              <View style={styles.fontStyle}>
                <Text style={styles.textAlign}>Customer Name</Text>
                <Text style={styles.textAlign}>Invoice Number</Text>
                <Text style={styles.textAlign}>Booked Date</Text>
                <Text style={styles.textAlign}>Invoice Date In UTC</Text>
                <Text style={styles.textAlign}>Package Name</Text>
                <Text style={styles.textAlign}>Paid Amount</Text>
              </View>
              <View style={styles.fontStyle}>
                <Text style={styles.textAlign}>{name}</Text>
                <Text style={styles.textAlign}>
                  {100000000 + Math.floor(Math.random() * 900000000)}
                </Text>
                <Text style={styles.textAlign}>
                  {format(new Date(bookDate), "yyyy/MM/dd")}
                </Text>
                <Text style={styles.textAlign}>
                  {format(new Date(), "yyyy/MM/dd")}
                </Text>
                <Text style={styles.textAlign}>{packageName}</Text>
                <Text style={styles.textAlign}>{formatCurrency(amount)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.amount}>
            <Text>Total Amount</Text>
            <Text>USD {formatCurrency(amount)}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Ticker</Text>
          <Text>{`${new Date().getFullYear()} @All right reserved`}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Invoice;

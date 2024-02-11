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
            <View style={{ marginBottom: 10 }}>
              <Text style={{ letterSpacing: "1.2px" }}>
                Thank you for booking your tour with Thicker Tours! We are
                thrilled to confirm your reservation and provide you with the
                details of your upcoming adventure. Below, you'll find a summary
                of your booking.
              </Text>
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
          <View>
            <Text style={{ fontSize: 11, marginTop: "12px" }}>
              Your payment has been successfully processed, and your booking is
              now confirmed. Please keep this invoice for your records. If you
              have any questions or need further assistance, feel free to
              contact our customer support team at Thicker@gmail.com or
              +965435345434. We can't wait to welcome you on board for an
              unforgettable journey with Thicker Tours! Best regards, Thicker
            </Text>
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

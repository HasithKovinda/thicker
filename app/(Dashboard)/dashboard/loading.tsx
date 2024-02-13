import Loading from "@/UI/Loading";

export default function loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  );
}

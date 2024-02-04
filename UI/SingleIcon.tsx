type singleIconProps = staticData;

export default function SingleIcon({ path, tittle, content }: singleIconProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <img src={path} alt={tittle} />
      <h2>{tittle}</h2>
      <p>{content}</p>
    </div>
  );
}

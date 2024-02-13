import Image from "next/image";

type singleIconProps = staticData;

export default function SingleIcon({ path, tittle, content }: singleIconProps) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <Image src={path} height={40} width={40} alt={tittle} />
      <h2>{tittle}</h2>
      <p>{content}</p>
    </div>
  );
}

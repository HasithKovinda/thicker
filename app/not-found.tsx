import Error from "@/components/Error/Error";
import { title } from "process";

type NoyFoundProps = {
  title: string;
};

export default function NotFound({ title }: NoyFoundProps) {
  const heading = title ? title : "Opps! The page does not exist!";
  return (
    <Error
      title={heading}
      path="/assert/404-image.svg"
      content="For network or database errors, or if there's an issue fetching data, the page you're looking for may not be available. We've scrambled it like a type specimen book. Please return to the homepage."
    />
  );
}

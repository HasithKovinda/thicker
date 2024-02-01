import Error from "@/components/Error/Error";

export default function NotFound() {
  return (
    <Error
      title="Opps! The page does not exist!"
      path="/assert/404-image.svg"
      content="For network or database errors, or if there's an issue fetching data, the page you're looking for may not be available. We've scrambled it like a type specimen book. Please return to the homepage."
    />
  );
}

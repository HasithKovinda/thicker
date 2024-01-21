import Login from "@/components/Auth/Login";

type PageProps = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function page({ searchParams }: PageProps) {
  return <Login callbackUrl={searchParams.callbackUrl} />;
}

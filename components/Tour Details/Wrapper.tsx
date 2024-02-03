import { Guides } from "@/types/tour";
import Description from "./Description";

type WrapperPropType = {
  guides: Guides[];
  description: string;
  title: string;
};

export default function Wrapper({
  guides,
  description,
  title,
}: WrapperPropType) {
  return (
    <section>
      <Description guides={guides} description={description} title={title} />
    </section>
  );
}

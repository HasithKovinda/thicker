import { Guides } from "@/types/tour";
import Description from "./Description";

type WrapperPropType = {
  guides: Guides[];
};

export default function Wrapper({ guides }: WrapperPropType) {
  return (
    <section>
      <Description guides={guides} />
    </section>
  );
}

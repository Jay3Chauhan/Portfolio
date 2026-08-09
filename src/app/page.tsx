import { SectionRail } from "@/components/chrome/section-rail";
import { Hero } from "@/components/sections/hero";
import { Premise } from "@/components/sections/premise";
import { Work } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { Approach } from "@/components/sections/approach";
import { Story } from "@/components/sections/story";
import { Signals } from "@/components/sections/signals";
import { Production } from "@/components/sections/production";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <SectionRail />
      <Hero />
      <Premise />
      <Work />
      <Stack />
      <Approach />
      <Story />
      <Signals />
      <Production />
      <Writing />
      <Contact />
    </>
  );
}

'use client';

import dynamic from "next/dynamic";
import { ConstructorOptions } from "audiomotion-analyzer";

const Viewer = dynamic(
  () => import("@samvera/clover-iiif").then((Clover) => Clover.Viewer),
  {
    ssr: false
  }
);

const vizOptions: ConstructorOptions = {
  ledBars: true,
  mode: 10,
  showPeaks: false,
  fillAlpha: 0,
  lineWidth: 2,
  reflexAlpha: 1,
  reflexRatio: 0.5
};

const Page = () => {
  const iiifContent =
    `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`;
  const options = {
    showIIIFBadge: false,
    informationPanel: {
      open: true,
      vtt: {
        autoScroll: { enabled: true, settings: { behavior: "smooth", block: "center" } },
      },
      renderAbout: false,
      renderAnnotation: true,
      renderToggle: true
    }
  };
  return (
    <>
      <Viewer iiifContent={iiifContent} />
    </>
  );
};

export default Page;

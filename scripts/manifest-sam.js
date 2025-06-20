import { getAudioDurationInSeconds } from "get-audio-duration";

async function buildManifest(baseUrl, rootDir) {
  const result = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    id: `${baseUrl}/sam_klein.json`,
    type: "Manifest",
    label: { en: ["Sam Klein - Oral History Interview"] },
    metadata: [
      {
        label: { en: ["Abstract"] },
        value: { en: ["Sam Klein discusses his life."] }
      },
      {
        label: { en: ["Contributor"] },
        value: {
          en: ["Klein, Sam (Speaker)", "Dreyfuss, Phyllis (Interviewer)"]
        }
      },
      {
        label: { en: ["Date"] },
        value: { en: ["November 19, 1993"] }
      },
      {
        label: { en: ["Genre"] },
        value: { en: ["audiocassettes"] }
      },
      {
        label: { en: ["Last Modified"] },
        value: { en: ["2024-03-04T18:48:13.973637Z"] }
      },
      { label: { en: ["Language"] }, value: { en: ["English"] } },
      { label: { en: ["Provenance"] }, value: { en: [] } },
      {
        label: { en: ["Rights Statement"] },
        value: { en: ["In Copyright - Educational Use Permitted"] }
      }
    ],
    summary: { en: [] },
    rights: "http://rightsstatements.org/vocab/InC-EDU/1.0/",
    items: []
  };

  for (var tape = 1; tape <= 5; tape++) {
    for (var side = 1; side <= 2; side++) {
      const duration = await getAudioDurationInSeconds(
        `${rootDir}/../public/assets/audio/sam_klein/sam_klein_0${tape}_0${side}.mp3`
      );
      result.items.push({
        id: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/canvas`,
        type: "Canvas",
        height: 100,
        width: 100,
        duration,
        label: { none: [`Volume ${tape}, Side ${side}`] },
        thumbnail: [
          {
            id: `${baseUrl}/assets/img/sam_klein/thumbnail_0${tape}.jpg`,
            type: "Image",
            format: "image/jpeg",
            height: 100,
            width: 162
          }
        ],
        items: [
          {
            id: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/annotation-page`,
            type: "AnnotationPage",
            items: [
              {
                id: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/annotation`,
                type: "Annotation",
                motivation: "painting",
                target: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/canvas`,
                body: {
                  id: `${baseUrl}/assets/audio/sam_klein/sam_klein_0${tape}_0${side}.mp3`,
                  type: "Sound",
                  format: "audio/mpeg",
                  duration
                }
              }
            ]
          }
        ],
        annotations: [
          {
            id: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/annotation-vtt-page`,
            type: "AnnotationPage",
            items: [
              {
                id: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/annotation-vtt`,
                type: "Annotation",
                motivation: "supplementing",
                body: {
                  id: `${baseUrl}/assets/vtt/sam_klein/sam_klein_0${tape}_0${side}.vtt`,
                  type: "Text",
                  format: "text/vtt",
                  label: { en: ["Transcript"] },
                  duration
                },
                target: `${baseUrl}/sam_klein.json/volume-${tape}/side-${side}/canvas`
              }
            ]
          }
        ]
      });
    }
  }

  return JSON.stringify(result, null, 2);
}

export default buildManifest;
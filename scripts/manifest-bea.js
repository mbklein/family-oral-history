import { getAudioDurationInSeconds } from "get-audio-duration";

async function buildManifest(baseUrl, rootDir) {
  const result = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    id: `${baseUrl}/bea_bass.json`,
    type: "Manifest",
    label: { en: ["Beatty Bass - Oral History Interview"] },
    metadata: [
      {
        label: { en: ["Abstract"] },
        value: { en: ["Beatty Bass discusses her life."] }
      },
      {
        label: { en: ["Contributor"] },
        value: {
          en: ["Bass, Beatrice (Speaker)", "Dreyfuss, Phyllis (Interviewer)"]
        }
      },
      {
        label: { en: ["Date"] },
        value: { en: ["June 5, 1993"] }
      },
      {
        label: { en: ["Genre"] },
        value: { en: ["audiocassettes"] }
      },
      {
        label: { en: ["Last Modified"] },
        value: { en: ["2020-09-23T22:41:22.7482Z"] }
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
    const duration = await getAudioDurationInSeconds(
      `${rootDir}/../public/assets/audio/bea_bass/bea_bass_0${tape}.mp4`
    );
    result.items.push({
      id: `${baseUrl}/bea_bass.json/volume-${tape}/canvas`,
      type: "Canvas",
      height: 100,
      width: 100,
      duration,
      label: { none: [`Volume ${tape}`] },
      thumbnail: [
        {
          id: `${baseUrl}/assets/img/bea_bass/thumbnail_0${tape}.jpg`,
          type: "Image",
          format: "image/jpeg",
          height: 100,
          width: 162
        }
      ],
      items: [
        {
          id: `${baseUrl}/bea_bass.json/volume-${tape}/annotation-page`,
          type: "AnnotationPage",
          items: [
            {
              id: `${baseUrl}/bea_bass.json/volume-${tape}/annotation`,
              type: "Annotation",
              motivation: "painting",
              target: `${baseUrl}/bea_bass.json/volume-${tape}/canvas`,
              body: {
                id: `${baseUrl}/assets/audio/bea_bass/bea_bass_0${tape}.mp4`,
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
          id: `${baseUrl}/bea_bass.json/volume-${tape}/annotation-vtt-page`,
          type: "AnnotationPage",
          items: [
            {
              id: `${baseUrl}/bea_bass.json/volume-${tape}/annotation-vtt`,
              type: "Annotation",
              motivation: "supplementing",
              body: {
                id: `${baseUrl}/assets/vtt/bea_bass/bea_bass_0${tape}.vtt`,
                type: "Text",
                format: "text/vtt",
                label: { en: ["Transcript"] },
                duration
              },
              target: `${baseUrl}/bea_bass.json/volume-${tape}/canvas`
            }
          ]
        }
      ]
    });
  }

  return JSON.stringify(result, null, 2);
}

export default buildManifest;
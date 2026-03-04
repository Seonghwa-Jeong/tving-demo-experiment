"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

export default function AmplitudeProvider() {
  useEffect(() => {
    const init = async () => {
      await amplitude.initAll("ba621d8cbeb865c11fef1b115063ae2a", {
        serverZone: "US",
        analytics: { autocapture: {
            attribution: true,
            pageViews: true,
            sessions: true,
            fileDownloads: true,
            formInteractions: true,
            elementInteractions: true,
            networkTracking: true,
            webVitals: true,
            frustrationInteractions: true,
          },
        },
        sessionReplay: { sampleRate: 1 },
        experiment: {},
        engagement: {},
      });
      await amplitude.experiment()?.fetch();
      window.dispatchEvent(new Event("amplitude:variants-updated"));
    };
    init();
  }, []);

  return null;
}

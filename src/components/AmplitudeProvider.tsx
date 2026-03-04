"use client";

import { useEffect } from "react";
import * as amplitude from "@amplitude/unified";

export default function AmplitudeProvider() {
  useEffect(() => {
    amplitude.initAll("ba621d8cbeb865c11fef1b115063ae2a", {
      serverZone: "US",
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
      experiment: {},
      engagement: { },
    });
  }, []);

  return null;
}

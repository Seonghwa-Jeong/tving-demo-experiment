"use client";

import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/unified";

interface Variant {
  value: string;
  payload: Record<string, unknown>;
}

export function useAmplitudeExperiment(flagKey: string): Variant {
  const [variant, setVariant] = useState<Variant>({ value: "", payload: {} });

  useEffect(() => {
    const readVariant = () => {
      const v = amplitude.experiment()?.variant(flagKey);
      setVariant({
        value: v?.value ?? "",
        payload: (v?.payload as Record<string, unknown>) ?? {},
      });
    };

    readVariant();
    window.addEventListener("amplitude:variants-updated", readVariant);
    return () => window.removeEventListener("amplitude:variants-updated", readVariant);
  }, [flagKey]);

  return variant;
}

// Assemble le prompt final pour un couple (proposition, variante). Substitue
// les placeholders du template base avec les fragments adaptés.

import { BASE_PROMPT } from "./base";
import { LAYOUTS, TITLES } from "./layouts";
import {
  SURFACES,
  VARIANT_LABELS,
  HALO_OVERRIDES,
  HOVER_DESC,
  colorMapsHint,
  type Variant,
} from "./surfaces";

export type { Variant };

export function buildPrompt(propId: number, variant: Variant): string {
  const layout = LAYOUTS[propId] ?? `(layout inconnu pour la proposition ${propId})`;
  const title = TITLES[propId] ?? `Proposition ${propId}`;
  let surface = SURFACES[variant];
  if (variant === "halo" && HALO_OVERRIDES[propId]) {
    surface = `${surface}\n\n${HALO_OVERRIDES[propId]}`;
  }
  return BASE_PROMPT
    .replace("{{TITLE}}", title)
    .replace("{{LAYOUT}}", layout)
    .replace("{{VARIANT_LABEL}}", VARIANT_LABELS[variant])
    .replace("{{SURFACE}}", surface)
    .replace("{{HOVER}}", HOVER_DESC[variant])
    .replace("{{COLOR_MAPS_HINT}}", colorMapsHint(variant));
}

export function promptTitle(propId: number, variant: Variant): string {
  return `${TITLES[propId] ?? `Proposition ${propId}`} · ${VARIANT_LABELS[variant]}`;
}

/**
 * The coda at the foot of the page — a compositor's tray of loose type.
 * Deliberately unnumbered: it belongs with the colophon, not the argument.
 */

export const playground = {
  kicker: "Colophon",
  title: "Loose type.",
  lede: "Everything above this line is set and locked up. This tray is not — take a sort, fling it, leave the page a little worse than you found it.",
  hint: "Drag the sorts",
  counterLabel: "Sorts moved",
  reset: "Lock up the tray",
  /**
   * A screen reader gets the explanation instead of eight unreadable glyphs,
   * because there is nothing here to read — only something to push around.
   */
  description:
    "A decorative tray of loose typographic pieces that can be dragged with a mouse or a finger. Nothing here is needed to read the page.",
} as const;

export type SortKind = "glyph" | "quad" | "ring" | "rule" | "chip";

export type Sort = {
  id: string;
  kind: SortKind;
  value?: string;
  /** Resting position inside the tray, as a share of its box. */
  left: string;
  top: string;
};

export const sorts: Sort[] = [
  { id: "j", kind: "glyph", value: "J", left: "5%", top: "12%" },
  { id: "ampersand", kind: "glyph", value: "&", left: "23%", top: "54%" },
  { id: "pilcrow", kind: "glyph", value: "¶", left: "44%", top: "9%" },
  { id: "asterisk", kind: "glyph", value: "*", left: "68%", top: "46%" },
  { id: "quad", kind: "quad", left: "57%", top: "70%" },
  { id: "ring", kind: "ring", left: "76%", top: "11%" },
  { id: "rule", kind: "rule", left: "30%", top: "82%" },
  { id: "chip", kind: "chip", value: "SET SOLID", left: "6%", top: "72%" },
];

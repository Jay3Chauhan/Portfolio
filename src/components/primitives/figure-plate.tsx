"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { PlateKind } from "@/content/story";

/**
 * Schematic plates that stand in for photography.
 *
 * A backend portfolio has no product shots worth showing, so each story
 * chapter gets a drawn technical figure instead. Strokes draw themselves in
 * when the plate scrolls into view.
 */

const GRID_ID = "plate-grid";

type PlateProps = {
  kind: PlateKind;
  className?: string;
  label: string;
};

export function FigurePlate({ kind, className, label }: PlateProps) {
  const reduce = useReducedMotion();

  const draw: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.3, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 0.25, delay: i * 0.08 },
      },
    }),
  };

  const pop: Variants = {
    hidden: { scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.25 + i * 0.055,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <motion.svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={label}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    >
      <defs>
        <pattern id={GRID_ID} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" strokeWidth={0.5} opacity={0.16} />
        </pattern>
      </defs>

      <rect width="400" height="300" fill={`url(#${GRID_ID})`} stroke="none" />
      <rect x="0.5" y="0.5" width="399" height="299" opacity={0.35} />

      {kind === "network" ? <NetworkPlate draw={draw} pop={pop} /> : null}
      {kind === "device" ? <DevicePlate draw={draw} pop={pop} /> : null}
      {kind === "services" ? <ServicesPlate draw={draw} pop={pop} /> : null}
      {kind === "pipeline" ? <PipelinePlate draw={draw} pop={pop} /> : null}
      {kind === "retrieval" ? <RetrievalPlate draw={draw} pop={pop} /> : null}
    </motion.svg>
  );
}

type Sub = { draw: Variants; pop: Variants };

/** A club growing outward from one node. */
function NetworkPlate({ draw, pop }: Sub) {
  const nodes = [
    [200, 150],
    [120, 92],
    [286, 104],
    [96, 208],
    [300, 202],
    [200, 62],
    [58, 148],
    [344, 152],
    [200, 244],
    [148, 176],
    [258, 168],
  ] as const;

  return (
    <g>
      {nodes.slice(1).map(([x, y], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={200}
          y1={150}
          x2={x}
          y2={y}
          variants={draw}
          custom={i}
          opacity={0.5}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={`node-${i}`}
          cx={x}
          cy={y}
          r={i === 0 ? 9 : 4}
          variants={pop}
          custom={i}
          fill="currentColor"
          stroke="none"
          opacity={i === 0 ? 1 : 0.75}
        />
      ))}
      <motion.circle cx={200} cy={150} r={26} variants={draw} custom={6} opacity={0.3} />
      <motion.circle cx={200} cy={150} r={62} variants={draw} custom={7} opacity={0.2} />
      <motion.circle
        cx={200}
        cy={150}
        r={108}
        variants={draw}
        custom={8}
        opacity={0.12}
      />
    </g>
  );
}

/** Three phone frames, the middle one in focus. */
function DevicePlate({ draw, pop }: Sub) {
  return (
    <g>
      {[68, 164, 260].map((x, i) => (
        <motion.rect
          key={x}
          x={x}
          y={i === 1 ? 54 : 74}
          width={72}
          height={i === 1 ? 192 : 152}
          rx={9}
          variants={draw}
          custom={i}
          opacity={i === 1 ? 1 : 0.45}
        />
      ))}
      {[0, 1, 2].map((i) =>
        [0, 1, 2, 3].map((row) => (
          <motion.line
            key={`row-${i}-${row}`}
            x1={[80, 176, 272][i]}
            y1={(i === 1 ? 84 : 100) + row * 22}
            x2={[80, 176, 272][i] + (row === 3 ? 28 : 48)}
            y2={(i === 1 ? 84 : 100) + row * 22}
            variants={draw}
            custom={3 + row}
            opacity={i === 1 ? 0.65 : 0.3}
          />
        )),
      )}
      <motion.circle cx={200} cy={222} r={7} variants={pop} custom={5} opacity={0.7} />
    </g>
  );
}

/** Gateway fanning out into services, over a shared store. */
function ServicesPlate({ draw, pop }: Sub) {
  const services = [
    [70, 132],
    [160, 132],
    [250, 132],
    [340, 132],
  ] as const;

  return (
    <g>
      <motion.rect
        x={150}
        y={36}
        width={100}
        height={34}
        rx={2}
        variants={draw}
        custom={0}
      />
      {services.map(([x], i) => (
        <motion.path
          key={`link-${i}`}
          d={`M200 70 V 100 H ${x} V 132`}
          variants={draw}
          custom={1 + i}
          opacity={0.55}
        />
      ))}
      {services.map(([x, y], i) => (
        <motion.rect
          key={`svc-${i}`}
          x={x - 34}
          y={y}
          width={68}
          height={48}
          rx={2}
          variants={draw}
          custom={2 + i}
        />
      ))}
      {services.map(([x], i) => (
        <motion.path
          key={`down-${i}`}
          d={`M${x} 180 V 214 H 200 V 240`}
          variants={draw}
          custom={4 + i}
          opacity={0.4}
        />
      ))}
      <motion.ellipse cx={200} cy={248} rx={54} ry={12} variants={draw} custom={8} />
      <motion.path
        d="M146 248 v 20 a 54 12 0 0 0 108 0 v -20"
        variants={draw}
        custom={9}
      />
      {services.map(([x, y], i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={x}
          cy={y + 24}
          r={3}
          variants={pop}
          custom={i}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </g>
  );
}

/** Scheduled scrape, transform, persist. */
function PipelinePlate({ draw, pop }: Sub) {
  const stages = [46, 148, 250] as const;

  return (
    <g>
      <motion.circle cx={200} cy={54} r={22} variants={draw} custom={0} />
      <motion.path d="M200 42 V 54 L 209 60" variants={draw} custom={1} />
      <motion.line
        x1={200}
        y1={76}
        x2={200}
        y2={104}
        variants={draw}
        custom={2}
        opacity={0.5}
      />

      {stages.map((x, i) => (
        <motion.g key={x}>
          <motion.rect
            x={x}
            y={106}
            width={104}
            height={54}
            rx={2}
            variants={draw}
            custom={2 + i}
          />
          <motion.line
            x1={x + 16}
            y1={128}
            x2={x + 64}
            y2={128}
            variants={draw}
            custom={3 + i}
            opacity={0.5}
          />
          <motion.line
            x1={x + 16}
            y1={140}
            x2={x + 44}
            y2={140}
            variants={draw}
            custom={3.5 + i}
            opacity={0.35}
          />
        </motion.g>
      ))}

      <motion.path d="M150 133 H 148" variants={draw} custom={5} />
      <motion.path
        d="M150 133 H 138 m 0 0 l 6 -5 m -6 5 l 6 5"
        variants={draw}
        custom={5}
      />
      <motion.path
        d="M252 133 H 240 m 0 0 l 6 -5 m -6 5 l 6 5"
        variants={draw}
        custom={6}
      />

      {stages.map((x, i) => (
        <motion.path
          key={`fall-${x}`}
          d={`M${x + 52} 160 V 196 H 200 V 216`}
          variants={draw}
          custom={6 + i}
          opacity={0.4}
        />
      ))}
      <motion.ellipse cx={200} cy={226} rx={58} ry={13} variants={draw} custom={9} />
      <motion.path
        d="M142 226 v 26 a 58 13 0 0 0 116 0 v -26"
        variants={draw}
        custom={10}
      />
      <motion.circle
        cx={200}
        cy={54}
        r={4}
        variants={pop}
        custom={0}
        fill="currentColor"
        stroke="none"
      />
    </g>
  );
}

/** Documents, chunks, vector space, grounded answer. */
function RetrievalPlate({ draw, pop }: Sub) {
  const cloud = [
    [258, 96],
    [286, 122],
    [246, 140],
    [300, 158],
    [268, 176],
    [312, 96],
    [232, 118],
  ] as const;

  return (
    <g>
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={`doc-${i}`}
          x={38 + i * 8}
          y={78 + i * 10}
          width={68}
          height={88}
          rx={2}
          variants={draw}
          custom={i}
          opacity={1 - i * 0.28}
        />
      ))}
      {[0, 1, 2, 3].map((row) => (
        <motion.line
          key={`line-${row}`}
          x1={62}
          y1={112 + row * 14}
          x2={62 + (row === 3 ? 22 : 44)}
          y2={112 + row * 14}
          variants={draw}
          custom={1 + row}
          opacity={0.45}
        />
      ))}

      <motion.path
        d="M122 122 H 158 m 0 0 l -7 -5 m 7 5 l -7 5"
        variants={draw}
        custom={3}
      />
      <motion.rect
        x={160}
        y={100}
        width={44}
        height={44}
        rx={2}
        variants={draw}
        custom={4}
      />
      <motion.text
        x={182}
        y={127}
        textAnchor="middle"
        className="font-mono"
        fontSize={9}
        fill="currentColor"
        stroke="none"
        opacity={0.7}
      >
        512
      </motion.text>

      <motion.path
        d="M208 122 H 224 m 0 0 l -7 -5 m 7 5 l -7 5"
        variants={draw}
        custom={5}
      />
      <motion.rect
        x={220}
        y={70}
        width={120}
        height={124}
        rx={2}
        variants={draw}
        custom={5}
        opacity={0.5}
      />
      {cloud.map(([x, y], i) => (
        <motion.circle
          key={`vec-${i}`}
          cx={x}
          cy={y}
          r={3.5}
          variants={pop}
          custom={i}
          fill="currentColor"
          stroke="none"
          opacity={i < 3 ? 0.95 : 0.4}
        />
      ))}
      {cloud.slice(0, 3).map(([x, y], i) => (
        <motion.line
          key={`hit-${i}`}
          x1={x}
          y1={y}
          x2={280}
          y2={132}
          variants={draw}
          custom={6 + i}
          opacity={0.35}
        />
      ))}

      <motion.path
        d="M280 200 V 224 H 130 v 12"
        variants={draw}
        custom={8}
        opacity={0.5}
      />
      <motion.rect
        x={82}
        y={236}
        width={236}
        height={34}
        rx={2}
        variants={draw}
        custom={9}
      />
      <motion.line
        x1={98}
        y1={253}
        x2={252}
        y2={253}
        variants={draw}
        custom={10}
        opacity={0.45}
      />
      <motion.circle
        cx={302}
        cy={253}
        r={5}
        variants={pop}
        custom={7}
        fill="currentColor"
        stroke="none"
      />
    </g>
  );
}

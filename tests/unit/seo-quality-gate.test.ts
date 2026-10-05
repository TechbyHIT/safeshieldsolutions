import { describe, it, expect } from "vitest";
import { evaluateSeoPath } from "@/lib/seo-quality-gate";
import { listIndexableLocalPaths } from "@/lib/local-seo-catalog";
import { buildLocalLandingCopy } from "@/lib/local-landing-content";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";

describe("evaluateSeoPath", () => {
  it("indexes the Raipur bird-spikes near-me landing page against itself", () => {
    const gate = evaluateSeoPath("/chhattisgarh/raipur/bird-spikes-near-me");
    expect(gate.index).toBe(true);
    expect(gate.canonicalPath).toBe("/chhattisgarh/raipur/bird-spikes-near-me");
  });

  it("indexes the Raipur bird-spikes product page against itself", () => {
    const gate = evaluateSeoPath("/chhattisgarh/raipur/bird-spikes");
    expect(gate.index).toBe(true);
    expect(gate.canonicalPath).toBe("/chhattisgarh/raipur/bird-spikes");
  });

  it("consolidates doorway price intents instead of indexing them", () => {
    const gate = evaluateSeoPath("/chhattisgarh/raipur/bird-spikes-price");
    expect(gate.index).toBe(false);
    expect(gate.canonicalPath).toBe("/chhattisgarh/raipur/bird-spikes");
  });

  it("consolidates nearby to the near-me landing page", () => {
    const gate = evaluateSeoPath("/chhattisgarh/raipur/bird-spikes-nearby");
    expect(gate.index).toBe(false);
    expect(gate.canonicalPath).toBe("/chhattisgarh/raipur/bird-spikes-near-me");
  });

  it("sends thin towns to the parent city instead of indexing a duplicate", () => {
    const gate = evaluateSeoPath("/chhattisgarh/bemetara/bird-spikes");
    expect(gate.index).toBe(false);
    expect(gate.canonicalPath).toBe("/chhattisgarh/raipur/bird-spikes");
  });

  it("indexes district hubs", () => {
    const gate = evaluateSeoPath("/chhattisgarh/districts/raipur");
    expect(gate.index).toBe(true);
    expect(gate.canonicalPath).toBe("/chhattisgarh/districts/raipur");
  });

  it("keeps legal pages out of the index", () => {
    expect(evaluateSeoPath("/privacy-policy").index).toBe(false);
  });
});

describe("local landing copy", () => {
  it("writes different copy for Raipur and Bhilai bird spikes", () => {
    const service = getSeoService("bird-spikes")!;
    const raipur = buildLocalLandingCopy(getCgPlace("raipur")!, service, "near-me");
    const bhilai = buildLocalLandingCopy(getCgPlace("bhilai")!, service, "near-me");
    expect(raipur.h1).toContain("Raipur");
    expect(bhilai.h1).toContain("Bhilai");
    expect(raipur.intro).not.toBe(bhilai.intro);
    expect(raipur.title).not.toBe(bhilai.title);
  });

  it("includes the Raipur near-me URL in the indexable catalog", () => {
    const paths = listIndexableLocalPaths().map((item) => item.path);
    expect(paths).toContain("/chhattisgarh/raipur/bird-spikes-near-me");
    expect(paths).toContain("/chhattisgarh/raipur");
    expect(paths).toContain("/chhattisgarh/districts/raipur");
  });
});

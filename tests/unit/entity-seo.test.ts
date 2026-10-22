import { describe, expect, it } from "vitest";
import { getCgPlace } from "@/data/cg-local-seo";
import { getSeoService } from "@/data/seo-services";
import { composeServicePage } from "@/lib/compose-service-page";
import {
  buildEntityProfile,
  buildServiceEntityGraph,
  entityId,
} from "@/lib/entity-seo";
import { buildOrganizationSchema } from "@/lib/schema";

describe("entity SEO", () => {
  const grills = getSeoService("invisible-grills")!;
  const balcony = getSeoService("balcony-invisible-grills")!;
  const raipur = getCgPlace("raipur")!;
  const bhilai = getCgPlace("bhilai")!;

  it("keeps one name for a service in every town", () => {
    const raipurProfile = buildEntityProfile(grills, raipur);
    const bhilaiProfile = buildEntityProfile(grills, bhilai);
    expect(raipurProfile.name).toBe("Invisible Grills");
    expect(bhilaiProfile.name).toBe(raipurProfile.name);
    expect(raipurProfile.entityId).toBe(bhilaiProfile.entityId);
    expect(raipurProfile.entityId).toBe(entityId("service", "invisible-grills"));
  });

  it("clusters subtypes under the pillar and separates other products", () => {
    const profile = buildEntityProfile(balcony, raipur);
    expect(profile.cluster.pillarSlug).toBe("invisible-grills");
    expect(profile.links.some((link) => link.relationship === "pillar" && link.anchor === "Invisible Grills in Raipur")).toBe(true);
    const grillProfile = buildEntityProfile(grills, raipur);
    expect(grillProfile.disambiguation.map((item) => item.name)).toEqual(
      expect.arrayContaining(["Safety Nets", "Bird Spikes"]),
    );
    expect(grillProfile.links.find((link) => link.anchor === "Safety Nets in Raipur")?.href).toBe(
      "/chhattisgarh/raipur/safety-nets",
    );
    expect(grillProfile.name.toLowerCase()).not.toContain("safety net");
  });

  it("fans a follow-up question out to the page that owns that entity", () => {
    const profile = buildEntityProfile(grills, raipur);
    const material = profile.fanOut[0]!;
    const contrast = profile.fanOut.find((item) => item.query.startsWith("How is"))!;
    expect(material.href).toBe("/chhattisgarh/raipur/invisible-grills");
    expect(material.answer.toLowerCase()).toContain("ss304");
    expect(contrast.href).toBe("/chhattisgarh/raipur/safety-nets");
    expect(contrast.anchor).toBe("Safety Nets in Raipur");
    expect(profile.attributes.map((item) => item.name)).toContain("Material");
  });

  it("uses the same service id in the knowledge graph for Raipur and Bhilai", () => {
    const raipurGraph = buildServiceEntityGraph({
      service: grills,
      place: raipur,
      path: "/chhattisgarh/raipur/invisible-grills",
      title: "Invisible Grills in Raipur",
      description: "Measured quote.",
    });
    const bhilaiGraph = buildServiceEntityGraph({
      service: grills,
      place: bhilai,
      path: "/chhattisgarh/bhilai/invisible-grills",
      title: "Invisible Grills in Bhilai",
      description: "Measured quote.",
    });
    const serviceNode = (graph: Record<string, unknown>) =>
      (graph["@graph"] as { "@type": string; "@id": string; name?: string }[]).find((node) => node["@type"] === "Service");
    expect(serviceNode(raipurGraph)?.["@id"]).toBe(serviceNode(bhilaiGraph)?.["@id"]);
    expect(serviceNode(raipurGraph)?.name).toBe("Invisible Grills");
    const page = (raipurGraph["@graph"] as { "@type": string; about?: { "@id": string }[] }[]).find(
      (node) => node["@type"] === "WebPage",
    );
    expect(page?.about?.map((item) => item["@id"])).toEqual([
      entityId("service", "invisible-grills"),
      entityId("place", "raipur"),
    ]);
  });

  it("publishes the topic list on the organization and on the service page", () => {
    const org = buildOrganizationSchema() as { "@id": string; knowsAbout: string[] };
    expect(org["@id"]).toBe(entityId("organization"));
    expect(org.knowsAbout).toContain("Invisible grills");
    expect(org.knowsAbout).toContain("Bird control");
    const page = composeServicePage(raipur, grills, "general");
    expect(page.sections.some((section) => section.id === "entity-context")).toBe(true);
    expect(page.faqs.some((faq) => faq.question.startsWith("How is Invisible Grills different"))).toBe(true);
    expect(page.nearMeMentions).toBe(0);
  });
});

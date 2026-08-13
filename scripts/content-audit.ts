/**
 * Audit generated area-service content quality (word count, score, keywords).
 * Run: npm run content:audit
 */
import { CHENNAI_AREAS } from "../src/data/chennai-areas";
import { HYDERABAD_AREAS } from "../src/data/hyderabad-areas";
import { AREA_PAGE_SERVICES, SEO_SERVICES } from "../src/data/seo-services";
import {
  buildAreaServiceContent,
  computeContentScore,
  contentToPlainText,
} from "../src/lib/content";
import { countWords } from "../src/lib/slug";
import { buildAreaServiceKeywords } from "../src/lib/seo-keywords";
import { publishing } from "../src/config/publishing";
import { countAreaPagesPerCity } from "../src/lib/area-page-slugs";
import { CHENNAI_AREA_COUNT, HYDERABAD_AREA_COUNT } from "../src/data/areas";

const minWords = publishing.minWordCount.AREA_SERVICE;
const minScore = publishing.minContentScore;

const sampleAreas = [
  { city: "chennai", area: "adyar", cityName: "Chennai" },
  { city: "chennai", area: "velachery", cityName: "Chennai" },
  { city: "chennai", area: "anna-nagar", cityName: "Chennai" },
  { city: "chennai", area: "t-nagar", cityName: "Chennai" },
  { city: "chennai", area: "omr", cityName: "Chennai" },
  { city: "hyderabad", area: "gachibowli", cityName: "Hyderabad" },
  { city: "hyderabad", area: "kukatpally", cityName: "Hyderabad" },
  { city: "hyderabad", area: "banjara-hills", cityName: "Hyderabad" },
];
const sampleServices = AREA_PAGE_SERVICES.slice(0, 4);

function auditOne(
  citySlug: string,
  cityName: string,
  areaSlug: string,
  serviceSlug: string,
) {
  const area =
    citySlug === "chennai"
      ? CHENNAI_AREAS.find((a) => a.slug === areaSlug)
      : HYDERABAD_AREAS.find((a) => a.slug === areaSlug);
  const seo = SEO_SERVICES.find((s) => s.slug === serviceSlug);
  if (!area || !seo) return null;

  const content = buildAreaServiceContent(
    {
      serviceName: seo.name,
      serviceSlug: seo.slug,
      serviceDescription: seo.description,
      category: seo.category,
    },
    {
      locationName: area.name,
      locationSlug: area.slug,
      locationType: "AREA",
      cityName,
      citySlug,
      areaName: area.name,
    },
  );

  const plain = contentToPlainText(content);
  const wordCount = countWords(plain);
  const faqCount = content.faqs?.length ?? 0;
  const sectionCount = content.sections?.length ?? 0;
  const score = computeContentScore(wordCount, minWords, faqCount, sectionCount);
  const keywords = buildAreaServiceKeywords({
    serviceSlug: seo.slug,
    serviceName: seo.name,
    areaName: area.name,
    cityName,
  });

  return {
    path: `/${citySlug}/${areaSlug}/${serviceSlug}`,
    wordCount,
    faqCount,
    sectionCount,
    score,
    keywordCount: keywords.length,
    passWords: wordCount >= minWords,
    passScore: score >= minScore,
  };
}

async function main() {
  console.log(`Thresholds: minWords=${minWords} minScore=${minScore}\n`);

  let failWords = 0;
  let failScore = 0;
  let total = 0;

  for (const sample of sampleAreas) {
    for (const service of sampleServices) {
      const r = auditOne(sample.city, sample.cityName, sample.area, service.slug);
      if (!r) continue;
      total++;
      if (!r.passWords) failWords++;
      if (!r.passScore) failScore++;
      const flag = r.passWords && r.passScore ? "OK" : "FAIL";
      console.log(
        `[${flag}] ${r.path} words=${r.wordCount} score=${r.score.toFixed(2)} faqs=${r.faqCount} sections=${r.sectionCount} keywords=${r.keywordCount}`,
      );
    }
  }

  const chennaiTotal = countAreaPagesPerCity(CHENNAI_AREA_COUNT);
  const hyderabadTotal = countAreaPagesPerCity(HYDERABAD_AREA_COUNT);
  console.log(`\nSampled ${total} pages.`);
  console.log(`Chennai URLs: ${chennaiTotal.toLocaleString()}`);
  console.log(`Hyderabad URLs: ${hyderabadTotal.toLocaleString()}`);
  console.log(`Sample failures: words=${failWords} score=${failScore}`);

  if (failWords > 0 || failScore > 0) {
    process.exitCode = 1;
  }
}

main();

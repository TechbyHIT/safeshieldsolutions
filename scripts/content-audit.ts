/**
 * Audit generated area-service content quality (word count, score, keywords).
 * Run: npm run content:audit
 */
import { CHHATTISGARH_AREAS } from "../src/data/chhattisgarh-areas";
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
import { CHHATTISGARH_AREA_COUNT } from "../src/data/areas";

const minWords = publishing.minWordCount.AREA_SERVICE;
const minScore = publishing.minContentScore;

const sampleAreas = [
  { city: "chhattisgarh", area: "raipur", cityName: "Chhattisgarh" },
  { city: "chhattisgarh", area: "naya-raipur", cityName: "Chhattisgarh" },
  { city: "chhattisgarh", area: "shankar-nagar", cityName: "Chhattisgarh" },
  { city: "chhattisgarh", area: "bhilai", cityName: "Chhattisgarh" },
  { city: "chhattisgarh", area: "bilaspur", cityName: "Chhattisgarh" },
];
const sampleServices = AREA_PAGE_SERVICES.slice(0, 4);

function auditOne(
  citySlug: string,
  cityName: string,
  areaSlug: string,
  serviceSlug: string,
) {
  const area = CHHATTISGARH_AREAS.find((a) => a.slug === areaSlug);
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

  const cgTotal = countAreaPagesPerCity(CHHATTISGARH_AREA_COUNT, "chhattisgarh");
  console.log(`\nSampled ${total} pages.`);
  console.log(`Chhattisgarh area URLs: ${cgTotal.toLocaleString()}`);
  console.log(`Sample failures: words=${failWords} score=${failScore}`);

  if (failWords > 0 || failScore > 0) {
    process.exitCode = 1;
  }
}

main();

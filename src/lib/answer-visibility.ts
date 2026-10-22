/**
 * Readiness for answer engines. This is not a rank in AI Overviews.
 * Citation rows appear only when a referral export is supplied.
 */
export interface AnswerSource {
  title: string;
  url: string;
  publisher: string;
}

export interface AnswerPage {
  title: string;
  serviceName: string;
  placeName: string;
  directQuestion: string;
  directAnswer: string;
  faqs: { question: string; answer: string }[];
  sources: AnswerSource[];
  faqSchema: boolean;
}

export interface AnswerCheck {
  id: string;
  pass: boolean;
  detail: string;
}

export function answerReadiness(page: AnswerPage): { score: number; checks: AnswerCheck[] } {
  const questions = [page.directQuestion, ...page.faqs.map((item) => item.question)];
  const answers = [page.directAnswer, ...page.faqs.map((item) => item.answer)];
  const conversational = questions.some((question) => /^(what|who|how|where|why)\b/i.test(question.trim()));
  const factual = answers.every((answer) => answer.trim().length >= 40 && !/flat rate of ₹|lorem ipsum/i.test(answer));
  const entity = `${page.directAnswer} ${page.title}`.includes(page.serviceName) && page.directAnswer.includes(page.placeName);
  const sourced = page.sources.every((source) => source.title && source.publisher && source.url.startsWith("https://"));
  const checks: AnswerCheck[] = [
    { id: "conversational", pass: conversational, detail: "A question is phrased the way a person asks it" },
    { id: "factual", pass: factual && answers.length >= 3, detail: "Answers state the measurement rule and avoid an invented price" },
    { id: "entity", pass: entity, detail: `${page.serviceName} and ${page.placeName} use the same names as the page` },
    { id: "sources", pass: page.sources.length > 0 && sourced, detail: "Background sources name the publisher and the URL" },
    { id: "crawlable", pass: page.directQuestion.length > 0 && page.directAnswer.length > 0, detail: "The answer is in the HTML, not only in a script" },
    { id: "structured-data", pass: page.faqSchema, detail: "The same questions are in FAQ schema" },
  ];
  const score = Math.round((checks.filter((check) => check.pass).length / checks.length) * 100);
  return { score, checks };
}

export interface CitationRow {
  referrer: string;
  landingPath: string;
  visits: number;
}

export interface CitationReport {
  source: "none" | "export";
  note: string;
  rows: CitationRow[];
}

export function citationReport(rows?: CitationRow[]): CitationReport {
  if (!rows || rows.length === 0) {
    return {
      source: "none",
      note: "No referral export is loaded. This report does not invent AI Overview citations or assistant referrals.",
      rows: [],
    };
  }
  return {
    source: "export",
    note: "Visits come from the supplied referral export.",
    rows: [...rows].sort((a, b) => b.visits - a.visits),
  };
}

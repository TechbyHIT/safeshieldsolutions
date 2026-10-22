/**
 * Photo copy and video eligibility.
 * Numbered camera files stay on disk. Alt text and captions carry the description.
 * A VideoObject is emitted only when a real file has a transcript or captions.
 */
const NUMBERED_FILE = /^\d+\.(webp|avif|jpe?g|png)$/i;

export interface PhotoCopy {
  alt: string;
  caption: string;
  filenameDescriptive: boolean;
}

export function photoCopy(folderLabel: string, filename: string): PhotoCopy {
  const label = folderLabel.trim();
  return {
    alt: `${label} fitted on a measured opening`,
    caption: `${label}. This is a finished installation photo, not a catalogue render.`,
    filenameDescriptive: !NUMBERED_FILE.test(filename),
  };
}

export interface EligibleVideo {
  name: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  transcript: string;
  captionUrl?: string;
}

/** No on-site video has a transcript or caption track yet. */
export const ELIGIBLE_VIDEOS: readonly EligibleVideo[] = [];

export function videoObjectSchema(video: EligibleVideo): Record<string, unknown> | null {
  if (!video.transcript.trim() && !video.captionUrl) return null;
  if (!video.name.trim() || !video.contentUrl || !video.thumbnailUrl || !video.uploadDate) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    contentUrl: video.contentUrl,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    transcript: video.transcript,
    ...(video.captionUrl ? { caption: video.captionUrl } : {}),
  };
}

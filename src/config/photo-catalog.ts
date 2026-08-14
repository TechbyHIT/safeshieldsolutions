import { photoManifest, type PhotoFolder } from "./photo-manifest";

export interface ProjectPhoto {
  src: string;
  alt: string;
  title: string;
  folder: string;
}

const folderLabels: Record<string, string> = {
  "balcony-invisible-grills": "Balcony Invisible Grills",
  "window-invisible-grills": "Window Invisible Grills",
  "safety-nets": "Balcony Safety Nets",
  "child-safety-grills": "Children Safety Nets",
  "cloth-hangers": "Cloth Hangers",
  "cricket-nets": "Cricket Practice Nets",
  "mosquito-nets": "Mosquito Nets",
  "pet-safety-nets": "Pet Safety Nets",
  "pigeon-safety-nets": "Pigeon & Duct Area Nets",
  "bird-spikes": "Bird Spikes",
};

/** Highest-resolution installation photos for heroes (file size verified on disk). */
const hdHeroFiles: Record<string, string> = {
  "balcony-invisible-grills": "168.webp",
  "safety-nets": "103.webp",
  "window-invisible-grills": "13.webp",
  "pigeon-safety-nets": "08.webp",
  "cloth-hangers": "08.webp",
  "cricket-nets": "10.webp",
  "mosquito-nets": "03.webp",
  "child-safety-grills": "01.webp",
  "pet-safety-nets": "05.webp",
  "bird-spikes": "03.webp",
};

function isPhotoFile(name: string): boolean {
  return /\.(jpe?g|webp|png|avif)$/i.test(name);
}

function folderFiles(folder: string): string[] {
  const files = photoManifest[folder as PhotoFolder];
  return Array.isArray(files) ? [...files].filter(isPhotoFile) : [];
}

function pickHdFilename(folder: string): string | undefined {
  const files = folderFiles(folder);
  const preferred = hdHeroFiles[folder];
  const preferredWebp = preferred?.replace(/\.[^.]+$/, ".webp");
  if (preferred && files.includes(preferred)) return preferred;
  if (preferredWebp && files.includes(preferredWebp)) return preferredWebp;
  const webp = files.find((file) => /\.webp$/i.test(file));
  const jpeg = files.find((file) => /\.jpe?g$/i.test(file));
  return webp ?? jpeg ?? files[0];
}

/** Maps service slugs to real photo folders in public/images/photos/ */
export const servicePhotoFolders: Record<string, string> = {
  "invisible-grills": "balcony-invisible-grills",
  "balcony-invisible-grills": "balcony-invisible-grills",
  "window-invisible-grills": "window-invisible-grills",
  "stainless-steel-invisible-grills": "balcony-invisible-grills",
  "child-safety-grills": "child-safety-grills",
  "child-safety-nets": "child-safety-grills",
  "pet-safety-grills": "pet-safety-nets",
  "pet-safety-nets": "pet-safety-nets",
  "safety-nets": "safety-nets",
  "balcony-safety-nets": "safety-nets",
  "terrace-safety-nets": "safety-nets",
  "pigeon-safety-nets": "pigeon-safety-nets",
  "bird-protection-nets": "pigeon-safety-nets",
  "duct-area-safety-nets": "pigeon-safety-nets",
  "construction-safety-nets": "safety-nets",
  "industrial-safety-nets": "safety-nets",
  "bird-spikes": "bird-spikes",
  "mosquito-nets": "mosquito-nets",
  "sliding-mosquito-nets": "mosquito-nets",
  "openable-mosquito-nets": "mosquito-nets",
  "zip-screens": "mosquito-nets",
  "motorized-zip-screens": "mosquito-nets",
  "mesh-doors": "mosquito-nets",
  "sliding-mesh-doors": "mosquito-nets",
  "cloth-hangers": "cloth-hangers",
  "ceiling-cloth-hangers": "cloth-hangers",
  "balcony-cloth-hangers": "cloth-hangers",
  "foldable-cloth-hangers": "cloth-hangers",
  "pulley-cloth-hangers": "cloth-hangers",
  "wall-mounted-cloth-hangers": "cloth-hangers",
  "stainless-steel-cloth-hangers": "cloth-hangers",
  "cricket-nets": "cricket-nets",
  "cricket-practice-nets": "cricket-nets",
  "box-cricket-nets": "cricket-nets",
  "cricket-turf-nets": "cricket-nets",
  "cricket-box-grass": "cricket-nets",
  "sports-nets": "cricket-nets",
  "football-nets": "cricket-nets",
  "badminton-court-nets": "cricket-nets",
  "volleyball-nets": "cricket-nets",
  "tennis-court-nets": "cricket-nets",
};

function buildPhoto(folder: string, filename: string, index: number): ProjectPhoto {
  const label = folderLabels[folder] ?? folder;
  return {
    src: `/images/photos/${folder}/${filename}`,
    alt: `${label} installation project photo ${index + 1} – completed work in Chennai, Hyderabad, Coimbatore or Kochi`,
    title: `${label} – Project ${index + 1}`,
    folder,
  };
}

export function getPhotosForFolder(folder: string, limit?: number): ProjectPhoto[] {
  const files = folderFiles(folder);
  const selected = limit ? files.slice(0, limit) : files;
  return selected.map((file, i) => buildPhoto(folder, file, i));
}

export function getPhotosForService(serviceSlug: string, limit = 6): ProjectPhoto[] {
  const folder = servicePhotoFolders[serviceSlug];
  if (!folder) return [];
  return getPhotosForFolder(folder, limit);
}

export function getHdPhoto(folder = "balcony-invisible-grills"): ProjectPhoto {
  const files = folderFiles(folder);
  const fallbackFolder = files.length ? folder : "balcony-invisible-grills";
  const resolvedFiles = folderFiles(fallbackFolder);
  const filename =
    pickHdFilename(folder) ??
    resolvedFiles[0] ??
    hdHeroFiles["balcony-invisible-grills"] ??
    "168.webp";
  const index = Math.max(0, resolvedFiles.indexOf(filename));
  return buildPhoto(fallbackFolder, filename, index);
}

export function getHeroPhoto(): ProjectPhoto {
  return getHdPhoto("balcony-invisible-grills");
}

const hdFolderOrder = [
  "balcony-invisible-grills",
  "safety-nets",
  "window-invisible-grills",
  "pigeon-safety-nets",
  "cloth-hangers",
  "cricket-nets",
  "mosquito-nets",
  "child-safety-grills",
  "pet-safety-nets",
  "bird-spikes",
] as const;

export function getHdPhotoSet(limit = 4): ProjectPhoto[] {
  return hdFolderOrder.slice(0, limit).map((folder) => getHdPhoto(folder));
}

export function getPrimaryServicePhoto(serviceSlug: string): ProjectPhoto | null {
  const folder = servicePhotoFolders[serviceSlug];
  if (!folder) return null;
  return getHdPhoto(folder);
}

export function getServiceOgImage(serviceSlug: string): string {
  return getPrimaryServicePhoto(serviceSlug)?.src ?? getHeroPhoto().src;
}

export function getAllGalleryPhotos(): { folder: string; label: string; photos: ProjectPhoto[] }[] {
  return Object.keys(photoManifest).map((folder) => ({
    folder,
    label: folderLabels[folder] ?? folder,
    photos: getPhotosForFolder(folder),
  }));
}

/** Interleave categories so home/gallery previews stay mixed. */
export function getInterleavedPhotos(limit?: number): ProjectPhoto[] {
  const groups = getAllGalleryPhotos().map((group) => group.photos);
  const maxLength = groups.reduce((max, group) => Math.max(max, group.length), 0);
  const out: ProjectPhoto[] = [];

  for (let index = 0; index < maxLength; index += 1) {
    for (const group of groups) {
      const photo = group[index];
      if (!photo) continue;
      out.push(photo);
      if (limit && out.length >= limit) return out;
    }
  }

  return out;
}

export const totalPhotoCount = Object.values(photoManifest).reduce(
  (sum, files) => sum + files.length,
  0,
);

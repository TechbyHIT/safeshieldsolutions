import { photoManifest } from "./photo-manifest";

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
  "pigeon-safety-nets": "Pigeon Safety Nets",
  "bird-spikes": "Bird Spikes",
};

/** Maps service slugs to real photo folders in public/images/photos/ */
export const servicePhotoFolders: Record<string, string> = {
  "invisible-grills": "balcony-invisible-grills",
  "balcony-invisible-grills": "balcony-invisible-grills",
  "window-invisible-grills": "window-invisible-grills",
  "stainless-steel-invisible-grills": "balcony-invisible-grills",
  "child-safety-grills": "child-safety-grills",
  "safety-nets": "safety-nets",
  "terrace-safety-nets": "safety-nets",
  "pigeon-safety-nets": "pigeon-safety-nets",
  "bird-spikes": "bird-spikes",
  "bird-protection-nets": "pigeon-safety-nets",
  "mosquito-nets": "mosquito-nets",
  "sliding-mosquito-nets": "mosquito-nets",
  "openable-mosquito-nets": "mosquito-nets",
  "cloth-hangers": "cloth-hangers",
  "ceiling-cloth-hangers": "cloth-hangers",
  "balcony-cloth-hangers": "cloth-hangers",
  "foldable-cloth-hangers": "cloth-hangers",
  "cricket-nets": "cricket-nets",
  "cricket-box-grass": "cricket-nets",
  "zip-screens": "mosquito-nets",
  "motorized-zip-screens": "mosquito-nets",
  "mesh-doors": "mosquito-nets",
  "sliding-mesh-doors": "mosquito-nets",
  "sports-nets": "cricket-nets",
  "construction-safety-nets": "pigeon-safety-nets",
  "industrial-safety-nets": "pigeon-safety-nets",
};

function buildPhoto(folder: string, filename: string, index: number): ProjectPhoto {
  const label = folderLabels[folder] ?? folder;
  return {
    src: `/images/photos/${folder}/${filename}`,
    alt: `${label} installation project photo ${index + 1} – premium near-me work in Chennai, Hyderabad, Coimbatore or Kochi`,
    title: `${label} – Project ${index + 1}`,
    folder,
  };
}

export function getPhotosForFolder(folder: string, limit?: number): ProjectPhoto[] {
  const files = photoManifest[folder as keyof typeof photoManifest] ?? [];
  const selected = limit ? files.slice(0, limit) : files;
  return selected.map((file, i) => buildPhoto(folder, file, i));
}

export function getPhotosForService(serviceSlug: string, limit = 6): ProjectPhoto[] {
  const folder = servicePhotoFolders[serviceSlug];
  if (!folder) return [];
  return getPhotosForFolder(folder, limit);
}

export function getHeroPhoto(): ProjectPhoto {
  const photos = getPhotosForFolder("balcony-invisible-grills", 1);
  return (
    photos[0] ?? {
      src: "/images/hero.svg",
      alt: "Professional invisible grill installation on apartment balcony",
      title: "Premium Invisible Grills",
      folder: "balcony-invisible-grills",
    }
  );
}

export function getPrimaryServicePhoto(serviceSlug: string): ProjectPhoto | null {
  const photos = getPhotosForService(serviceSlug, 1);
  return photos[0] ?? null;
}

export function getAllGalleryPhotos(): { folder: string; label: string; photos: ProjectPhoto[] }[] {
  return Object.keys(photoManifest).map((folder) => ({
    folder,
    label: folderLabels[folder] ?? folder,
    photos: getPhotosForFolder(folder),
  }));
}

export const totalPhotoCount = Object.values(photoManifest).reduce(
  (sum, files) => sum + files.length,
  0,
);

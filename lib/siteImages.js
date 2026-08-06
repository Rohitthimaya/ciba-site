/* =========================================================
   YOUR IMAGES LIVE IN  public/images/  — see README.md

   Hero images are auto-detected: drop any .jpg/.jpeg/.png/.webp
   files into public/images/hero/ and they're used automatically.
   The dummy picsum.photos images below are only shown while that
   folder is empty.
   ========================================================= */

const DUMMY_COUNT = 14;

export function getDummyHeroImages() {
  return Array.from(
    { length: DUMMY_COUNT },
    (_, i) => `https://picsum.photos/seed/ciba-hero-${i}/480/500`
  );
}

/** Dummy placeholder used when a local image is missing. */
export function dummyImage(seed, w = 640, h = 480) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

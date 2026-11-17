import Navbar from "@/components/Navbar";
import "./tru-port.css";
import "./tru.css";

/*
 * Shared wrapper for /tru-generator and its sub-pages.
 *
 * These pages are a like-for-like rebuild of https://www.tru.ca/generator.html, so they use their
 * own stylesheet (scoped under `.tru`) and their own page chrome (components/tru/TruShell.jsx)
 * instead of the CIBA page layout and Footer. The one CIBA piece is the site menu: <Navbar /> sits
 * above the shell in place of TRU's own top bar (the pages pass `truBar={false}` to TruShell).
 *
 * Typeface: tru.ca uses Adelle Sans from Adobe Fonts. To load it here, add Adelle Sans to an Adobe
 * Fonts web project on an account licensed for this site and set ADOBE_FONTS_KIT_ID to that
 * project's ID (the 7-character code in https://use.typekit.net/<id>.css). Without it the pages use
 * a metric-matched open-source stand-in — see the top of tru.css.
 */
const kitId = (process.env.ADOBE_FONTS_KIT_ID || "").trim();
const hasKit = /^[a-z0-9]{5,12}$/i.test(kitId);

export default function TruGeneratorLayout({ children }) {
  return (
    <>
      {hasKit && (
        <link
          rel="stylesheet"
          href={`https://use.typekit.net/${kitId}.css`}
          precedence="default"
        />
      )}
      <Navbar />
      {children}
    </>
  );
}

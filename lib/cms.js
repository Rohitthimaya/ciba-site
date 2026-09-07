import { createPublicClient, isSupabaseConfigured, mediaPublicUrl } from "@/lib/supabase";
import { NEWS as FALLBACK_NEWS } from "@/lib/newsData.fallback";
import { GENERATOR_EVENTS as FALLBACK_EVENTS } from "@/lib/generatorEvents.fallback";

export async function getPublishedNews() {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_NEWS;

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data?.length) return FALLBACK_NEWS;

  return data.map(mapNewsRow);
}

export async function getNewsPost(slug) {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_NEWS.find((p) => p.slug === slug) || null;

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return FALLBACK_NEWS.find((p) => p.slug === slug) || null;
  }
  return mapNewsRow(data);
}

function mapNewsRow(row) {
  const image = mediaPublicUrl(row.image_path) || row.image_path;
  return {
    slug: row.slug,
    base: row.image_path?.startsWith("images/") ? row.image_path.replace(/\.[^.]+$/, "") : null,
    image,
    fallback: image,
    tag: row.tag,
    title: row.title,
    text: row.teaser,
    date: row.published_at
      ? new Date(row.published_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "",
    readTime: row.read_time || "",
    views: row.views || 0,
    likes: row.likes || 0,
    author: row.author || "CIBA",
    blocks: row.body || [],
    mediaContact: row.media_contact || null,
  };
}

export async function getPublishedEvents() {
  const supabase = createPublicClient();
  if (!supabase) return FALLBACK_EVENTS;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("start_at", { ascending: true });

  if (error || !data?.length) return FALLBACK_EVENTS;

  return data.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    location: e.location,
    tag: e.tag,
    start: e.start_at,
    end: e.end_at,
  }));
}

export async function getPeople() {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("people").select("*").order("sort_order");
  return data || [];
}

export async function getPartners(tier) {
  const supabase = createPublicClient();
  if (!supabase) return null;
  let q = supabase.from("partners").select("*").order("sort_order");
  if (tier) q = q.eq("tier", tier);
  const { data } = await q;
  return data || [];
}

export async function getPrograms() {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("programs").select("*").order("sort_order");
  return data || [];
}

export async function getWorkshops() {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("workshops").select("*").order("sort_order");
  return data || [];
}

export async function getFaqs() {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("faqs")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  return data || [];
}

export async function getResourceLinks() {
  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("resource_links").select("*").order("sort_order");
  return data || [];
}

export async function getSiteSettings() {
  const supabase = createPublicClient();
  if (!supabase) return {};
  const { data } = await supabase.from("site_settings").select("*");
  return Object.fromEntries((data || []).map((r) => [r.key, r.value]));
}

export { isSupabaseConfigured, mediaPublicUrl };

export const DELHI_NCR_CHILD_CITY_LABELS = [
  "Gurgaon",
  "Noida",
  "Greater Noida",
  "Delhi",
  "Faridabad",
  "Ghaziabad",
];

export const DEFAULT_ADMIN_CITY_OPTIONS = [
  {
    id: "default-delhi-ncr",
    slug: "delhi-ncr",
    aliases: ["ncr"],
    label: "Delhi NCR",
    headline: "Delhi NCR maths support planning",
    subtitle: "Regional planning option for city and locality entries.",
    topSectors: DELHI_NCR_CHILD_CITY_LABELS.map((label) => ({ label, slug: label.toLowerCase().replace(/\s+/g, "-") })),
    status: "published",
  },
  {
    id: "default-gurgaon",
    slug: "gurugram",
    aliases: ["gurgaon"],
    label: "Gurgaon",
    headline: "Gurgaon maths support planning",
    subtitle: "Primary Gurugram/Gurgaon city option for sector and locality pages.",
    status: "published",
  },
  {
    id: "default-noida",
    slug: "noida",
    aliases: [],
    label: "Noida",
    headline: "Noida maths support planning",
    subtitle: "Delhi NCR city option for future locality planning.",
    status: "published",
  },
  {
    id: "default-greater-noida",
    slug: "greater-noida",
    aliases: [],
    label: "Greater Noida",
    headline: "Greater Noida maths support planning",
    subtitle: "Delhi NCR city option for future locality planning.",
    status: "published",
  },
  {
    id: "default-delhi",
    slug: "delhi",
    aliases: [],
    label: "Delhi",
    headline: "Delhi maths support planning",
    subtitle: "Delhi NCR city option for future locality planning.",
    status: "published",
  },
  {
    id: "default-faridabad",
    slug: "faridabad",
    aliases: [],
    label: "Faridabad",
    headline: "Faridabad maths support planning",
    subtitle: "Delhi NCR city option for future locality planning.",
    status: "published",
  },
  {
    id: "default-ghaziabad",
    slug: "ghaziabad",
    aliases: [],
    label: "Ghaziabad",
    headline: "Ghaziabad maths support planning",
    subtitle: "Delhi NCR city option for future locality planning.",
    status: "published",
  },
];

export function getCityOptionsWithDefaults(cities = []) {
  return cities.length ? cities : DEFAULT_ADMIN_CITY_OPTIONS;
}


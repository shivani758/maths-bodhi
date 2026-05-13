export const CLASS_OPTIONS = [
  "All Classes",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "IB MYP",
  "IB DP",
  "IGCSE",
  "JEE Main",
  "JEE Advanced",
];

export const BOARD_OPTIONS = [
  "All Boards",
  "CBSE",
  "ICSE",
  "ISC",
  "IB",
  "IGCSE",
  "Cambridge",
  "JEE",
  "SAT Math",
];

export const GURUGRAM_LOCALITY_OPTIONS = [
  "DLF Phase 1",
  "DLF Phase 2",
  "DLF Phase 3",
  "DLF Phase 4",
  "DLF Phase 5",
  "Sector 14",
  "Sector 15",
  "Sector 21",
  "Sector 22",
  "Sector 23",
  "Sector 27",
  "Sector 28",
  "Sector 29",
  "Sector 30",
  "Sector 31",
  "Sector 32",
  "Sector 38",
  "Sector 39",
  "Sector 40",
  "Sector 42",
  "Sector 43",
  "Sector 44",
  "Sector 45",
  "Sector 46",
  "Sector 47",
  "Sector 48",
  "Sector 49",
  "Sector 50",
  "Sector 51",
  "Sector 52",
  "Sector 53",
  "Sector 54",
  "Sector 55",
  "Sector 56",
  "Sector 57",
  "Sector 58",
  "Sector 59",
  "Sector 60",
  "Sector 61",
  "Sector 62",
  "Sector 63",
  "Sector 65",
  "Sector 66",
  "Sector 67",
  "Sector 68",
  "Sector 69",
  "Sector 70",
  "Sector 71",
  "Sector 72",
  "South City 1",
  "Sushant Lok 1",
  "Sohna Road",
  "Golf Course Road",
  "Golf Course Extension Road",
];

export const SECTOR_OPTIONS = ["All Sectors", ...GURUGRAM_LOCALITY_OPTIONS];

export function normalizeFilterOption(value) {
  return String(value ?? "").trim();
}

export function mergeFilterOptions(defaultOptions, dynamicOptions = []) {
  const options = new Map();

  [...defaultOptions, ...dynamicOptions].forEach((option) => {
    const normalizedOption = normalizeFilterOption(option);

    if (!normalizedOption) {
      return;
    }

    const key = normalizedOption.toLowerCase();

    if (!options.has(key)) {
      options.set(key, normalizedOption);
    }
  });

  return [...options.values()];
}

export function stripAllFilterOption(options = []) {
  return options.filter((option) => !normalizeFilterOption(option).toLowerCase().startsWith("all "));
}

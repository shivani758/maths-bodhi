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

export const SECTOR_OPTIONS = [
  "All Sectors",
  "DLF Phase 1",
  "DLF Phase 2",
  "DLF Phase 3",
  "DLF Phase 4",
  "DLF Phase 5",
  "Sector 14",
  "Sector 15",
  "Sector 23",
  "Sector 31",
  "Sector 45",
  "Sector 46",
  "Sector 47",
  "Sector 49",
  "Sector 50",
  "Sector 52",
  "Sector 54",
  "Sector 56",
  "Sector 57",
  "Sector 67",
  "Sector 70",
  "Sohna Road",
  "Golf Course Road",
  "Golf Course Extension Road",
];

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

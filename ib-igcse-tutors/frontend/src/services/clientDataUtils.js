export function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function normalizeListKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function flattenListValue(value, items) {
  if (value == null || value === false) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => flattenListValue(item, items));
    return;
  }

  if (typeof value === "object") {
    flattenListValue(value.label ?? value.name ?? value.title ?? value.value ?? value.text ?? value.id, items);
    return;
  }

  String(value)
    .split(/[,;\n]+/)
    .map((item) => item.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .forEach((item) => items.push(item));
}

export function normalizeListValue(value) {
  const items = [];
  flattenListValue(value, items);
  return items;
}

export function uniqueListValues(values = []) {
  const seen = new Set();

  return normalizeListValue(values).filter((item) => {
    const key = normalizeListKey(item);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function combineListValues(...values) {
  return uniqueListValues(values);
}

export function normalizeClassListValue(...values) {
  return uniqueListValues(
    combineListValues(...values).map((item) => {
      const label = String(item ?? "").trim();
      const classMatch = label.match(/^(?:class\s*)?(\d{1,2})$/i);

      if (classMatch) {
        const classNumber = Number(classMatch[1]);

        if (classNumber >= 1 && classNumber <= 12) {
          return `Class ${classNumber}`;
        }
      }

      return label;
    }),
  );
}

function toSlug(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createId(prefix, value) {
  const slug = toSlug(value) || Math.random().toString(36).slice(2, 10);
  return `${prefix}-${slug}`;
}

export function createTimestamp(dayOffset = 0) {
  return new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString();
}

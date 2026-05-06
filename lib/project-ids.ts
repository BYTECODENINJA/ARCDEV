export function slugifyProjectName(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return slug || "untitled-project"
}

export function generateProjectIdSuffix(length = 4) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length)
    .padEnd(length, "0")
}

export function buildProjectId(name: string, suffix = generateProjectIdSuffix()) {
  return `${slugifyProjectName(name)}-${suffix.toLowerCase()}`
}

export function isValidProjectId(value: unknown) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
}

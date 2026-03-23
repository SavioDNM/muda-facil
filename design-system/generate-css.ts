import * as fs from "fs";
import * as path from "path";
import { tokens } from "./tokens";
import { tokenKeyToCssVar, sidebarKeyToCssVar } from "./utils";

const GLOBALS_CSS_PATH = path.resolve(__dirname, "../app/globals.css");
const START_MARKER = "/* --- DESIGN TOKENS START --- */";
const END_MARKER = "/* --- DESIGN TOKENS END --- */";

function generateRootBlock(): string {
  const lines: string[] = [];
  lines.push(START_MARKER);
  lines.push(":root {");

  // Colors
  for (const [key, value] of Object.entries(tokens.colors)) {
    lines.push(`  ${tokenKeyToCssVar(key)}: ${value};`);
  }

  // Sidebar
  for (const [key, value] of Object.entries(tokens.sidebar)) {
    lines.push(`  ${sidebarKeyToCssVar(key)}: ${value};`);
  }

  lines.push("}");
  lines.push(END_MARKER);

  return lines.join("\n");
}

function run() {
  const isCheck = process.argv.includes("--check");
  const cssContent = fs.readFileSync(GLOBALS_CSS_PATH, "utf-8");

  const newRootBlock = generateRootBlock();

  const hasMarkers =
    cssContent.includes(START_MARKER) && cssContent.includes(END_MARKER);

  let updatedCss: string;

  if (hasMarkers) {
    const regex = new RegExp(
      `${escapeRegExp(START_MARKER)}[\\s\\S]*?${escapeRegExp(END_MARKER)}`
    );
    updatedCss = cssContent.replace(regex, newRootBlock);
  } else {
    // Replace existing :root block (first occurrence only)
    const rootRegex = /:root\s*\{[^}]*\}/;
    if (rootRegex.test(cssContent)) {
      updatedCss = cssContent.replace(rootRegex, newRootBlock);
    } else {
      // Append after imports
      const lastImportIdx = cssContent.lastIndexOf("@import");
      const nextNewline = cssContent.indexOf("\n", lastImportIdx);
      updatedCss =
        cssContent.slice(0, nextNewline + 1) +
        "\n" +
        newRootBlock +
        "\n" +
        cssContent.slice(nextNewline + 1);
    }
  }

  if (isCheck) {
    if (updatedCss !== cssContent) {
      console.error(
        "❌ globals.css is out of sync with design tokens. Run: npm run tokens"
      );
      process.exit(1);
    } else {
      console.log("✅ globals.css is in sync with design tokens.");
      process.exit(0);
    }
  }

  fs.writeFileSync(GLOBALS_CSS_PATH, updatedCss, "utf-8");
  console.log("✅ Design tokens written to globals.css");
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

run();

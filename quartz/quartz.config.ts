import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration - CRPG Edition
 *
 * This configuration is customized for the Center for Regulation Policy and Governance (CRPG)
 * Brand colors: Red #E51D1D, Orange #ED6600, Blue #3000E0
 * Target: Professional academic/policy research site
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "CRPG - Center for Regulation Policy and Governance",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "crpg.info",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Roboto Slab",            // Roboto Slab for headers (matches original)
        body: "Roboto",                   // Roboto for body text (matches original)
        code: "IBM Plex Mono",            // Modern monospace for code
      },
      colors: {
        lightMode: {
          light: "#ffffff",               // White background (matches original)
          lightgray: "#e5e5e5",           // Light gray for borders
          gray: "#9e9e9e",                // Medium gray for secondary text
          darkgray: "#424242",            // Dark gray for primary text
          dark: "#000000",                // Black for emphasis (footer)
          secondary: "#E51D1D",           // CRPG Red - primary brand color
          tertiary: "#ED6600",            // CRPG Orange - accent color
          highlight: "rgba(229, 29, 29, 0.1)",  // Light red highlight
          textHighlight: "#fff3cd",       // Warm yellow for text highlights
        },
        darkMode: {
          light: "#1a1a1a",               // Dark background
          lightgray: "#2d2d2d",           // Lighter dark for cards
          gray: "#737373",                // Medium gray
          darkgray: "#d4d4d4",            // Light text
          dark: "#ffffff",                // White text
          secondary: "#ff4444",           // Lighter red for dark mode
          tertiary: "#ff8533",            // Lighter orange for dark mode
          highlight: "rgba(255, 68, 68, 0.15)",  // Red highlight
          textHighlight: "#4a3f00",       // Darker yellow for dark mode
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Plugin.CustomOgImages(), // Temporarily disabled due to network issues
    ],
  },
}

export default config

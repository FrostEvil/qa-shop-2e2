import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // W CI zazwyczaj 1 retry wystarczy; lokalnie 0
  retries: process.env.CI ? 1 : 0,

  // Domyślne ustawienia dla wszystkich testów
  use: {
    // Trace:
    //  - lokalnie: miej pełny ślad zawsze (łatwiej się uczysz),
    //  - w CI możesz zostawić 'on-first-retry' (mniej danych, nadal przydatne)
    trace: process.env.CI ? "on-first-retry" : "on",
    // Załączniki wizualne:
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://playwright.dev",
  },

  // Raporty: „line” do konsoli + HTML do przeglądarki
  reporter: [
    ["line"],
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results", detail: true }],
  ],

  // Projekty (przeglądarki) — typowy zestaw
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});

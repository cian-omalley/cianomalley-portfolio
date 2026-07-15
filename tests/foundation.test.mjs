import test from "node:test";
import assert from "node:assert/strict";
import navigation from "../src/data/navigation.json" with { type: "json" };
import portfolioContent from "../src/data/portfolio-content.json" with { type: "json" };

const requiredSections = [
  "Home",
  "Projects",
  "GitHub",
  "Blog",
  "About",
  "Contact",
  "CV download"
];

const requiredLandmarks = [
  "Projects Tower",
  "GitHub Nexus",
  "Hardware Lab",
  "Blog Archive",
  "Workshop District",
  "Contact Terminal",
  "CV Vault"
];

const requiredBuckets = [
  "finished projects",
  "in-progress projects",
  "hardware projects",
  "code projects",
  "hybrid projects",
  "GitHub repositories",
  "tutorials",
  "reviews",
  "build logs"
];

test("navigation includes required sections", () => {
  for (const section of requiredSections) {
    assert.ok(navigation.sections.includes(section));
  }
});

test("hero includes all required interactive landmarks", () => {
  const landmarks = navigation.heroNavigation.map((item) => item.landmark);
  for (const landmark of requiredLandmarks) {
    assert.ok(landmarks.includes(landmark));
  }
});

test("portfolio includes all required showcase buckets", () => {
  for (const bucket of requiredBuckets) {
    assert.ok(portfolioContent.contentBuckets.includes(bucket));
  }
});

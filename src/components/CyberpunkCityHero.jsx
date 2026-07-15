import navigation from "../data/navigation.json" with { type: "json" };

export function CyberpunkCityHero() {
  return (
    `<section class="city-hero city-hero--dark-neon" aria-label="Cyberpunk City Navigation">
      <h1>Cian O'Malley // cianomalley.works</h1>
      <p>Navigate the skyline to explore projects, GitHub work, hardware builds, and writing.</p>
      <ul class="city-hero__landmarks">
        ${navigation.heroNavigation
          .map((node) => `<li><a href="${node.route}">${node.landmark}</a></li>`)
          .join("")}
      </ul>
    </section>`
  );
}

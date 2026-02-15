// getPlayers.js — Year-aware player data resolver
//
// Usage:
//   import { getPlayers } from '@/lib/getPlayers';
//   const { players, year, meta } = getPlayers();
//
// To add a new season:
//   1. Add the JSON file to lib/seasons/ (e.g. 2027.json)
//   2. Register it in lib/seasons/index.js

import { seasons, availableYears } from './seasons/index.js';

function normalizePlayer(p) {
  return {
    name:          `${p.firstName} ${p.lastName}`,
    team:          p.team,
    position:      p.position,          // "G" | "F" | "C"
    number:        String(p.number),
    height:        p.height,
    conference:    p.conference,        // "Eastern" | "Western"
    selectionType: p.selection_type,
    status:        p.status   || null,  // injury/replacement note
    note:          p.note     || null,
    image:         p.image    || null,  // NBA CDN headshot URL
  };
}

export function getPlayers(requestedYear) {
  let year;

  if (requestedYear && seasons[requestedYear]) {
    year = requestedYear;
  } else {
    const currentYear = new Date().getFullYear();
    // Use the current year if data exists, otherwise fall back to most recent
    year = seasons[currentYear]
      ? currentYear
      : availableYears[availableYears.length - 1];
  }

  const seasonData = seasons[year];

  return {
    year,
    meta: {
      event:    seasonData.event,
      location: seasonData.location,
      format:   seasonData.format,
      mvp:      seasonData.mvp        || null,
      finalScore: seasonData.final_score || null,
    },
    players: seasonData.all_stars.map(normalizePlayer),
  };
}

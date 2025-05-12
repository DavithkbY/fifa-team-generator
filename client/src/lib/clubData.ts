import { FootballClub } from "@shared/schema";

// 4.5 Star Clubs
export const fourPointFiveStarClubs: FootballClub[] = [
  { id: "atletico", name: "Atlético Madrid", rating: "4.5" },
  { id: "acmilan", name: "AC Milan", rating: "4.5" },
  { id: "dortmund", name: "Borussia Dortmund", rating: "4.5" },
  { id: "tottenham", name: "Tottenham Hotspur", rating: "4.5" },
  { id: "newcastle", name: "Newcastle United", rating: "4.5" },
  { id: "astonvilla", name: "Aston Villa", rating: "4.5" },
  { id: "leipzig", name: "RB Leipzig", rating: "4.5" },
  { id: "athletic", name: "Athletic Club", rating: "4.5" },
  { id: "fenerbahce", name: "Fenerbahçe SK", rating: "4.5" },
  { id: "juventus", name: "Juventus", rating: "4.5" },
  { id: "manutd", name: "Manchester United", rating: "4.5" },
  { id: "chelsea", name: "Chelsea", rating: "4.5" },
  { id: "galatasaray", name: "Galatasaray SK", rating: "4.5" },
  { id: "sporting", name: "Sporting CP", rating: "4.5" },
  { id: "benfica", name: "SL Benfica", rating: "4.5" },
  { id: "roma", name: "Roma", rating: "4.5" },
  { id: "napoli", name: "Napoli", rating: "4.5" },
  { id: "lazio", name: "Lazio", rating: "4.5" },
  { id: "atalanta", name: "Atalanta", rating: "4.5" },
  // Additional 4.5 star national teams
  { id: "croatia", name: "Croatia", rating: "4.5" },
  { id: "italy", name: "Italy", rating: "4.5" },
  { id: "morocco", name: "Morocco", rating: "4.5" },
];

// 5 Star Clubs
export const fiveStarClubs: FootballClub[] = [
  { id: "realmadrid", name: "Real Madrid", rating: "5" },
  { id: "mancity", name: "Manchester City", rating: "5" },
  { id: "barcelona", name: "FC Barcelona", rating: "5" },
  { id: "inter", name: "Inter", rating: "5" },
  { id: "bayern", name: "FC Bayern München", rating: "5" },
  { id: "liverpool", name: "Liverpool", rating: "5" },
  { id: "psg", name: "Paris Saint-Germain", rating: "5" },
  { id: "leverkusen", name: "Bayer 04 Leverkusen", rating: "5" },
  { id: "arsenal", name: "Arsenal", rating: "5" },
  // Additional 5 star national teams
  { id: "france", name: "France", rating: "5" },
  { id: "england", name: "England", rating: "5" },
  { id: "germany", name: "Germany", rating: "5" },
  { id: "spain", name: "Spain", rating: "5" },
  { id: "portugal", name: "Portugal", rating: "5" },
  { id: "netherlands", name: "Netherlands", rating: "5" },
  { id: "argentina", name: "Argentina", rating: "5" },
];

// Default player names
export const DEFAULT_PLAYERS = ["Davit", "Jarne", "Michiel", "Koen"];

// Get all clubs based on minimum rating
export function getClubsByMinRating(minRating: "4.5" | "5"): FootballClub[] {
  if (minRating === "5") {
    return [...fiveStarClubs];
  } else {
    return [...fourPointFiveStarClubs, ...fiveStarClubs];
  }
}

// Get a random club from the available clubs
export function getRandomClub(clubs: FootballClub[]): FootballClub {
  const randomIndex = Math.floor(Math.random() * clubs.length);
  return clubs[randomIndex];
}

// Get two random clubs that are different from each other
export function getTwoRandomClubs(minRating: "4.5" | "5"): [FootballClub, FootballClub] {
  const availableClubs = getClubsByMinRating(minRating);
  const firstIndex = Math.floor(Math.random() * availableClubs.length);
  const firstClub = availableClubs[firstIndex];
  
  // Create a new array without the first club
  const remainingClubs = availableClubs.filter((_, index) => index !== firstIndex);
  const secondIndex = Math.floor(Math.random() * remainingClubs.length);
  const secondClub = remainingClubs[secondIndex];
  
  return [firstClub, secondClub];
}
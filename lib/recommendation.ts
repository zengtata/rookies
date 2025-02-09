export function getRecommendations(
  skills: string[],
  interests: string[],
  workPreference: string,
) {
  // Career weights based on user skills, interests, and work preferences
  const careerWeights: Record<string, number> = {
    "data-scientist": 0,
    "frontend-engineer": 0,
    "cybersecurity-specialist": 0,
    "software-engineer": 0,
    "it-manager": 0,
    "business-analyst": 0,
    "ux-designer": 0,
    "qa-engineer": 0,
    "it-support": 0,
    "network-engineer": 0,
    "cloud-engineer": 0,
  };

  // Match skills to careers
  skills.forEach((skill) => {
    if (skill === "python") careerWeights["data-scientist"] += 2;
    if (skill === "javascript") careerWeights["frontend-engineer"] += 2;
    if (skill === "java") careerWeights["software-engineer"] += 2;
    if (skill === "c++") careerWeights["software-engineer"] += 2;
    if (skill === "bash") careerWeights["cybersecurity-specialist"] += 2;
    // Add more skill matches here
  });

  // Match interests to careers
  interests.forEach((interest) => {
    if (interest === "data science") careerWeights["data-scientist"] += 1;
    if (interest === "frontend development")
      careerWeights["frontend-engineer"] += 1;
    if (interest === "cybersecurity")
      careerWeights["cybersecurity-specialist"] += 1;
    if (interest === "cloud computing") careerWeights["cloud-engineer"] += 1;
    if (interest === "business analysis")
      careerWeights["business-analyst"] += 1;
    // Add more interest matches here
  });

  // Work preference adjustments: this could affect specific career types
  if (workPreference === "Independently") {
    careerWeights["software-engineer"] += 1; // Software Engineers often work independently
    careerWeights["cybersecurity-specialist"] += 1;
  }
  if (workPreference === "In teams") {
    careerWeights["frontend-engineer"] += 1; // Frontend Engineers often work with teams
    careerWeights["business-analyst"] += 1; // Business Analysts work with teams
  }
  if (workPreference === "Flexible") {
    careerWeights["cloud-engineer"] += 1;
    careerWeights["qa-engineer"] += 1;
  }
  if (workPreference === "Structured") {
    careerWeights["it-manager"] += 1;
    careerWeights["it-support"] += 1;
  }

  // Sort careers by weight in descending order
  return Object.entries(careerWeights)
    .sort(([, a], [, b]) => b - a)
    .map(([career]) => career);
}

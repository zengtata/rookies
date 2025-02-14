export function getRecommendations(responses: string[]): string[] {
  // Define initial weights for each career.
  const careerWeights: Record<string, number> = {
    "Data Scientist": 0,
    "AI Engineer": 0, // Replaced "Frontend Engineer" with "AI Engineer"
    "Cybersecurity Specialist": 0,
    "Software Engineer": 0,
    "IT Manager": 0,
    "Business Analyst": 0,
    "UX Designer": 0,
    "QA Engineer": 0,
    "IT Support": 0, 
    "Network Engineer": 0,
    "Cloud Engineer": 0,
  };

  // Question 1: Which of these activities do you enjoy most?
  // Options:
  // "Solving problems and puzzles", "Helping others and making a positive impact", "Expressing creativity and imagination", "None of these"
  switch (responses[0]) {
    case "Solving problems and puzzles":
      careerWeights["Software Engineer"] += 2;
      careerWeights["Data Scientist"] += 2;
      careerWeights["Cybersecurity Specialist"] += 2;
      careerWeights["QA Engineer"] += 1;
      careerWeights["Network Engineer"] += 1;
      break;
    case "Helping others and making a positive impact":
      careerWeights["IT Support"] += 2;
      careerWeights["Business Analyst"] += 2;
      careerWeights["IT Manager"] += 1;
      break;
    case "Expressing creativity and imagination":
      careerWeights["UX Designer"] += 2;
      careerWeights["AI Engineer"] += 2; // Use AI Engineer instead of Frontend Engineer
      careerWeights["Business Analyst"] += 1;
      break;
    default:
      break;
  }

  // Question 2: What type of work setting do you prefer?
  // Options:
  // "Fast-paced and constantly evolving", "Collaborative with a focus on teamwork", "Quiet, with independent tasks", "None of these"
  switch (responses[1]) {
    case "Fast-paced and constantly evolving":
      careerWeights["Software Engineer"] += 2;
      careerWeights["Data Scientist"] += 2;
      careerWeights["Cybersecurity Specialist"] += 1;
      careerWeights["Cloud Engineer"] += 2;
      break;
    case "Collaborative with a focus on teamwork":
      careerWeights["Business Analyst"] += 2;
      careerWeights["UX Designer"] += 1;
      careerWeights["IT Manager"] += 2;
      careerWeights["QA Engineer"] += 1;
      break;
    case "Quiet, with independent tasks":
      careerWeights["Data Scientist"] += 2;
      careerWeights["Software Engineer"] += 1;
      careerWeights["Cybersecurity Specialist"] += 1;
      break;
    default:
      break;
  }

  // Question 3: What’s your preferred way of learning new skills?
  // Options:
  // "Hands-on experience and trial-and-error", "Reading, research, and self-study", "Discussion and group activities", "None of these"
  switch (responses[2]) {
    case "Hands-on experience and trial-and-error":
      careerWeights["Software Engineer"] += 2;
      careerWeights["Cybersecurity Specialist"] += 1;
      careerWeights["IT Support"] += 1;
      careerWeights["QA Engineer"] += 1;
      break;
    case "Reading, research, and self-study":
      careerWeights["Data Scientist"] += 2;
      careerWeights["IT Manager"] += 1;
      careerWeights["Network Engineer"] += 1;
      break;
    case "Discussion and group activities":
      careerWeights["Business Analyst"] += 2;
      careerWeights["UX Designer"] += 1;
      careerWeights["IT Manager"] += 1;
      break;
    default:
      break;
  }

  // Question 4: What are your long-term career ambitions?
  // Options:
  // "Achieve financial stability", "Pursue a career that makes a positive societal impact", "Have a creative career that allows for personal expression", "Become an expert in a specific field", "Something else"
  switch (responses[3]) {
    case "Achieve financial stability":
      careerWeights["IT Manager"] += 2;
      careerWeights["Software Engineer"] += 1;
      careerWeights["Network Engineer"] += 1;
      break;
    case "Pursue a career that makes a positive societal impact":
      careerWeights["IT Support"] += 2;
      careerWeights["Business Analyst"] += 2;
      careerWeights["UX Designer"] += 1;
      break;
    case "Have a creative career that allows for personal expression":
      careerWeights["UX Designer"] += 2;
      careerWeights["AI Engineer"] += 2; // Update: use AI Engineer instead of Frontend Engineer
      break;
    case "Become an expert in a specific field":
      careerWeights["Data Scientist"] += 2;
      careerWeights["Cybersecurity Specialist"] += 2;
      careerWeights["Software Engineer"] += 1;
      break;
    default:
      break;
  }

  // Question 5: How do you manage stress or challenging situations?
  // Options:
  // "I thrive on challenges and work well under pressure", "I prefer a steady pace and avoid stressful situations", "I use creative outlets to cope with stress", "None of these"
  switch (responses[4]) {
    case "I thrive on challenges and work well under pressure":
      careerWeights["Cybersecurity Specialist"] += 2;
      careerWeights["Software Engineer"] += 1;
      break;
    case "I prefer a steady pace and avoid stressful situations":
      careerWeights["IT Support"] += 2;
      careerWeights["QA Engineer"] += 2;
      break;
    case "I use creative outlets to cope with stress":
      careerWeights["UX Designer"] += 2;
      careerWeights["AI Engineer"] += 1; // Update: use AI Engineer here if appropriate
      break;
    default:
      break;
  }

  // Question 6: Which skill would you consider your strongest?
  // Options:
  // "Problem-solving and analytical thinking", "Communication and collaboration", "Creativity and innovative thinking", "Leadership and team management", "Adaptability to change", "Something else"
  switch (responses[5]) {
    case "Problem-solving and analytical thinking":
      careerWeights["Data Scientist"] += 2;
      careerWeights["Software Engineer"] += 2;
      careerWeights["Cybersecurity Specialist"] += 2;
      careerWeights["QA Engineer"] += 1;
      break;
    case "Communication and collaboration":
      careerWeights["Business Analyst"] += 2;
      careerWeights["IT Manager"] += 1;
      careerWeights["UX Designer"] += 1;
      break;
    case "Creativity and innovative thinking":
      careerWeights["UX Designer"] += 2;
      careerWeights["AI Engineer"] += 2; // Update: use AI Engineer instead of Frontend Engineer
      break;
    case "Leadership and team management":
      careerWeights["IT Manager"] += 2;
      careerWeights["Business Analyst"] += 1;
      break;
    case "Adaptability to change":
      careerWeights["Cloud Engineer"] += 2;
      careerWeights["IT Manager"] += 1;
      break;
    default:
      break;
  }

  // Question 7: When working with others, which role do you usually take on?
  // Options: "Leader", "Organiser", "Idea generator", "Listener", "Other"
  switch (responses[6]) {
    case "Leader":
      careerWeights["IT Manager"] += 2;
      careerWeights["Business Analyst"] += 1;
      break;
    case "Organiser":
      careerWeights["IT Manager"] += 1;
      careerWeights["QA Engineer"] += 1;
      break;
    case "Idea generator":
      careerWeights["UX Designer"] += 2;
      careerWeights["AI Engineer"] += 1; // Update: assign weight to AI Engineer
      break;
    case "Listener":
      careerWeights["IT Support"] += 2;
      careerWeights["Business Analyst"] += 1;
      break;
    default:
      break;
  }

  // Question 8: How do you prefer to communicate with others?
  // Options: "Face-to-face interaction", "Via phone or video calls", "Through email or text messages", "It depends on the situation"
  switch (responses[7]) {
    case "Face-to-face interaction":
      careerWeights["UX Designer"] += 2;
      careerWeights["Business Analyst"] += 1;
      break;
    case "Via phone or video calls":
      careerWeights["IT Manager"] += 1;
      careerWeights["Business Analyst"] += 1;
      break;
    case "Through email or text messages":
      careerWeights["IT Support"] += 2;
      careerWeights["QA Engineer"] += 1;
      break;
    default:
      break;
  }

  // Question 9: How do you approach conflict or disagreement in a team?
  // Options: "I try to find a solution that works for everyone", "I avoid conflict and hope it resolves on its own", "I stand firm on my opinions and try to defend them", "None of these"
  switch (responses[8]) {
    case "I try to find a solution that works for everyone":
      careerWeights["Business Analyst"] += 2;
      careerWeights["IT Manager"] += 1;
      break;
    case "I avoid conflict and hope it resolves on its own":
      careerWeights["IT Support"] += 2;
      careerWeights["QA Engineer"] += 1;
      break;
    case "I stand firm on my opinions and try to defend them":
      careerWeights["Software Engineer"] += 1;
      careerWeights["Cybersecurity Specialist"] += 1;
      break;
    default:
      break;
  }

  // Question 10: What’s your approach to tackling complex problems?
  // Options: "Break it down into smaller tasks and tackle them one by one",
  // "Think creatively and explore unconventional solutions", "Collaborate with others and seek input when needed", "Something else"
  switch (responses[9]) {
    case "Break it down into smaller tasks and tackle them one by one":
      careerWeights["Software Engineer"] += 2;
      careerWeights["Data Scientist"] += 1;
      break;
    case "Think creatively and explore unconventional solutions":
      careerWeights["UX Designer"] += 2;
      careerWeights["AI Engineer"] += 1; // Update: assign weight to AI Engineer
      break;
    case "Collaborate with others and seek input when needed":
      careerWeights["Business Analyst"] += 2;
      careerWeights["IT Manager"] += 1;
      break;
    default:
      break;
  }

  // Question 11: What coding languages are you familiar with or interested in learning?
  // Options: "Python", "Java", "C++", "JavaScript", "SQL", "Go", "R", "C#", "HTML/CSS", "I’m not familiar with any yet"
  switch (responses[10]) {
    case "Python":
      careerWeights["Data Scientist"] += 2;
      careerWeights["Software Engineer"] += 1;
      break;
    case "Java":
      careerWeights["Software Engineer"] += 2;
      break;
    case "C++":
      careerWeights["Software Engineer"] += 2;
      careerWeights["Cybersecurity Specialist"] += 1;
      break;
    case "JavaScript":
      careerWeights["AI Engineer"] += 2; // Update: use AI Engineer instead of Frontend Engineer
      careerWeights["Software Engineer"] += 1;
      break;
    case "SQL":
      careerWeights["Data Scientist"] += 1;
      careerWeights["Business Analyst"] += 1;
      break;
    case "Go":
      careerWeights["Cloud Engineer"] += 2;
      careerWeights["Software Engineer"] += 1;
      break;
    case "R":
      careerWeights["Data Scientist"] += 2;
      break;
    case "C#":
      careerWeights["Software Engineer"] += 2;
      break;
    case "HTML/CSS":
      careerWeights["AI Engineer"] += 2; // Update: assign weight to AI Engineer
      careerWeights["UX Designer"] += 1;
      break;
    case "I’m not familiar with any yet":
      // No additional weight
      break;
    default:
      break;
  }

  // Sort the careers by weight in descending order and return the sorted career titles.
  return Object.entries(careerWeights)
      .sort(([, weightA], [, weightB]) => weightB - weightA)
      .map(([career]) => career);
}

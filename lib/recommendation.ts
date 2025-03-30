export function getRecommendations(responses: string[]): string[] {
  const careerWeights: Record<string, number> = {
    "Cloud Engineer": 0,
    "Cyber Security Specialist": 0,
    "Data Scientist": 0,
    "Database Engineer": 0,
    "IT Manager": 0,
    "IT Support": 0,
    "Network Engineer": 0,
    "QA Engineer": 0,
    "Software Architect": 0,
    "Software Engineer": 0,
    "UX Designer": 0,
  };

  // Q1: When solving a problem, you…
  switch (responses[0]) {
    case "Follow a step-by-step process to avoid mistakes.":
      careerWeights["QA Engineer"] += 3;
      careerWeights["Database Engineer"] += 2;
      careerWeights["Network Engineer"] += 1;
      break;
    case "Look for patterns or hidden insights in data.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Cyber Security Specialist"] += 2;
      careerWeights["Cloud Engineer"] += 1;
      break;
    case "Brainstorm creative, outside-the-box solutions.":
      careerWeights["UX Designer"] += 3;
      careerWeights["Software Architect"] += 2;
      careerWeights["IT Manager"] += 1;
      break;
    case "Collaborate with others to find the best approach.":
      careerWeights["IT Manager"] += 3;
      careerWeights["IT Support"] += 2;
      careerWeights["Software Engineer"] += 1;
      break;
  }

  // Q2: How do you handle stress?
  switch (responses[1]) {
    case "Stay calm and focus on solutions.":
      careerWeights["Cyber Security Specialist"] += 3;
      careerWeights["IT Support"] += 2;
      break;
    case "Feel energized by high-pressure situations.":
      careerWeights["Network Engineer"] += 3;
      careerWeights["Cloud Engineer"] += 2;
      break;
    case "Prefer to avoid stress with careful planning.":
      careerWeights["QA Engineer"] += 3;
      careerWeights["Database Engineer"] += 2;
      break;
    case "Get overwhelmed but push through.":
      careerWeights["Software Engineer"] += 1;
      careerWeights["Data Scientist"] += 1;
      break;
  }

  // Q3: Your ideal work environment is…
  switch (responses[2]) {
    case "Remote with flexible hours.":
      careerWeights["Cloud Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "A structured office with clear routines.":
      careerWeights["Database Engineer"] += 3;
      careerWeights["QA Engineer"] += 2;
      break;
    case "A collaborative open-plan space.":
      careerWeights["UX Designer"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "A dynamic, fast-paced startup.":
      careerWeights["Software Architect"] += 3;
      careerWeights["Cyber Security Specialist"] += 2;
      break;
  }

  // Q4: How do you handle repetitive tasks?
  switch (responses[3]) {
    case "Automate them with scripts/tools.":
      careerWeights["Cloud Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "Do them carefully to ensure consistency.":
      careerWeights["QA Engineer"] += 3;
      careerWeights["Database Engineer"] += 2;
      break;
    case "Get bored but push through.":
      careerWeights["UX Designer"] += 3;
      careerWeights["Software Architect"] += 2;
      break;
    case "Enjoy the predictability.":
      careerWeights["IT Support"] += 3;
      careerWeights["Network Engineer"] += 2;
      break;
  }

  // Q5: Which skills interest you most?
  switch (responses[4]) {
    case "Coding/scripting (Python, Java, etc.).":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Cloud Engineer"] += 2;
      careerWeights["QA Engineer"] += 1;
      break;
    case "Data analysis or machine learning.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Cyber Security Specialist"] += 2;
      break;
    case "Visual design or user psychology.":
      careerWeights["UX Designer"] += 3;
      careerWeights["IT Manager"] += 1;
      break;
    case "Networking or system administration.":
      careerWeights["Network Engineer"] += 3;
      careerWeights["Database Engineer"] += 2;
      break;
  }

  // Q6: How do you learn best?
  switch (responses[5]) {
    case "Hands-on projects or labs.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Cloud Engineer"] += 2;
      break;
    case "Formal certifications/courses.":
      careerWeights["Cyber Security Specialist"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "Experimentation and trial/error.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
    case "Mentorship or team collaboration.":
      careerWeights["IT Support"] += 3;
      careerWeights["Network Engineer"] += 2;
      break;
  }

  // Q7: Which technical skills do you already have or want to explore? (Multi-Choice)
  const q7Responses = responses[6].split(",").map((res) => res.trim());
  for (const answer of q7Responses) {
    switch (answer) {
      case "Coding/scripting (e.g., Python, Java)":
        careerWeights["Software Engineer"] += 3;
        careerWeights["Cloud Engineer"] += 2;
        careerWeights["QA Engineer"] += 1;
        break;
      case "Data analysis/machine learning":
        careerWeights["Data Scientist"] += 3;
        careerWeights["Cyber Security Specialist"] += 2;
        careerWeights["Database Engineer"] += 1;
        break;
      case "Visual design (e.g., Figma, Adobe XD)":
        careerWeights["UX Designer"] += 3;
        careerWeights["IT Manager"] += 1;
        break;
      case "Networking/system administration":
        careerWeights["Network Engineer"] += 3;
        careerWeights["IT Support"] += 2;
        careerWeights["Cloud Engineer"] += 1;
        break;
      case "Cybersecurity tools (e.g., Wireshark, Kali Linux)":
        careerWeights["Cyber Security Specialist"] += 3;
        careerWeights["Network Engineer"] += 1;
        break;
      case "Database management (SQL, NoSQL)":
        careerWeights["Database Engineer"] += 3;
        careerWeights["Data Scientist"] += 1;
        break;
      case "None – I’m just starting out":
        careerWeights["IT Support"] += 3;
        careerWeights["QA Engineer"] += 2;
        careerWeights["Software Engineer"] += 1;
        break;
    }
  }

  // Q8: What matters most in your career?
  switch (responses[7]) {
    case "Solving complex technical challenges.":
      careerWeights["Software Architect"] += 3;
      careerWeights["Data Scientist"] += 2;
      break;
    case "Protecting people’s privacy/safety.":
      careerWeights["Cyber Security Specialist"] += 3;
      careerWeights["Database Engineer"] += 2;
      break;
    case "Leading teams and making strategic decisions.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Cloud Engineer"] += 1;
      break;
    case "Creating products users love.":
      careerWeights["UX Designer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
  }

  // Q9: What’s your long-term goal?
  switch (responses[8]) {
    case "Becoming a technical expert in a niche field.":
      careerWeights["Network Engineer"] += 3;
      careerWeights["Database Engineer"] += 2;
      break;
    case "Leading a company’s IT strategy.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Software Architect"] += 2;
      break;
    case "Starting your own tech venture.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
    case "Mentoring others in tech.":
      careerWeights["IT Support"] += 3;
      careerWeights["Cyber Security Specialist"] += 1;
      break;
  }

  // Q10: How do you view ethical dilemmas in tech?
  switch (responses[9]) {
    case "Advocate fiercely for user privacy.":
      careerWeights["Cyber Security Specialist"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
    case "Balance ethics with business needs.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Software Architect"] += 1;
      break;
    case "Follow company policies strictly.":
      careerWeights["QA Engineer"] += 3;
      careerWeights["Database Engineer"] += 2;
      break;
    case "Prioritize innovation over regulations.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Cloud Engineer"] += 2;
      break;
  }

  // Q11: How important is work-life balance?
  switch (responses[10]) {
    case "Critical—I need clear boundaries.":
      careerWeights["Database Engineer"] += 3;
      careerWeights["IT Support"] += 2;
      break;
    case "Flexible—I don’t mind occasional crunch times.":
      careerWeights["Cloud Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "Not a priority—I’m driven by passion for the work.":
      careerWeights["Cyber Security Specialist"] += 3;
      careerWeights["Software Architect"] += 2;
      break;
  }

  return Object.entries(careerWeights)
      .sort(([, weightA], [, weightB]) => weightB - weightA)
      .map(([career]) => career);
}

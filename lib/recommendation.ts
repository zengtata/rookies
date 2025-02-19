export function getRecommendations(responses: string[]): string[] {
  const careerWeights: Record<string, number> = {
    "Data Scientist": 0,
    "AI Engineer": 0,
    "Cyber Security": 0,
    "Software Engineer": 0,
    "IT Manager": 0,
    "Business Analyst": 0,
    "UX Designer": 0,
    "QA Engineer": 0,
    "IT Support": 0,
    "Network Engineer": 0,
    "Cloud Engineer": 0,
  };

  // Q1: How do you tackle tough coding challenges?
  switch (responses[0]) {
    case "I break problems down into smaller steps.":
      careerWeights["Software Engineer"] += 2;
      careerWeights["QA Engineer"] += 2;
      careerWeights["Data Scientist"] += 1;
      careerWeights["Cyber Security"] += 1;
      break;
    case "I experiment until something clicks.":
      careerWeights["AI Engineer"] += 2;
      careerWeights["UX Designer"] += 2;
      careerWeights["Software Engineer"] += 1;
      break;
    case "I chat with my teammates for fresh ideas.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 1;
      careerWeights["IT Support"] += 1;
      careerWeights["UX Designer"] += 1;
      break;
    case "I look back at what worked before.":
      careerWeights["QA Engineer"] += 2;
      careerWeights["Software Engineer"] += 1;
      careerWeights["IT Manager"] += 1;
      break;
  }

  // Q2: What role do you usually play in a team?
  switch (responses[1]) {
    case "I love leading and keeping things organized.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Business Analyst"] += 1;
      break;
    case "I enjoy sharing creative ideas.":
      careerWeights["UX Designer"] += 3;
      careerWeights["AI Engineer"] += 1;
      careerWeights["Business Analyst"] += 1;
      break;
    case "I prefer working independently.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Software Engineer"] += 2;
      careerWeights["Cyber Security"] += 1;
      break;
    case "I’m the go-to for smoothing over conflicts.":
      careerWeights["IT Support"] += 3;
      careerWeights["Business Analyst"] += 2;
      break;
  }

  // Q3: How do you decide what to work on first?
  switch (responses[2]) {
    case "I plan everything in detail.":
      careerWeights["IT Manager"] += 3;
      careerWeights["QA Engineer"] += 2;
      break;
    case "I adapt on the fly as priorities change.":
      careerWeights["Cloud Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "I handle the toughest tasks first.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Cyber Security"] += 2;
      break;
    case "I set priorities together with my team.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
  }

  // Q4: How do you feel about learning new technologies?
  switch (responses[3]) {
    case "I’m excited and always learning.":
      careerWeights["AI Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      careerWeights["Data Scientist"] += 1;
      break;
    case "I stick with what I know but can adjust.":
      careerWeights["IT Support"] += 2;
      careerWeights["QA Engineer"] += 2;
      break;
    case "I rely on my strong basics.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Data Scientist"] += 2;
      break;
    case "I need a little extra time to catch up.":
      careerWeights["IT Support"] += 2;
      careerWeights["QA Engineer"] += 3;
      break;
  }

  // Q5: Which technical skill is your strongest? (Critical – increased weight)
  switch (responses[4]) {
    case "Coding (Python, Java...).":
      careerWeights["Software Engineer"] += 6;
      careerWeights["Data Scientist"] += 4;
      careerWeights["Cyber Security"] += 2;
      careerWeights["AI Engineer"] += 4;
      careerWeights["Business Analyst"] += 2;
      careerWeights["UX Designer"] += 2;
      careerWeights["QA Engineer"] += 2;
      careerWeights["Network Engineer"] += 2;
      careerWeights["Cloud Engineer"] += 2;
      break;
    case "Databases and SQL.":
      careerWeights["Data Scientist"] += 6;
      careerWeights["Business Analyst"] += 4;
      careerWeights["Software Engineer"] += 2;
      break;
    case "Networking and systems.":
      careerWeights["Network Engineer"] += 6;
      careerWeights["Cyber Security"] += 4;
      careerWeights["Cloud Engineer"] += 2;
      break;
    case "Designing software architecture.":
      careerWeights["AI Engineer"] += 6;
      careerWeights["Software Engineer"] += 4;
      careerWeights["UX Designer"] += 4;
      break;
  }

  // Q6: How do you like to get feedback?
  switch (responses[5]) {
    case "I appreciate tips that help me grow.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "I love hearing positive vibes.":
      careerWeights["IT Support"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
    case "I prefer detailed, technical advice.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["QA Engineer"] += 2;
      break;
    case "A mix of both is best.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
  }

  // Q7: How do you handle a conflict with a teammate?
  switch (responses[6]) {
    case "I jump in to mediate and chat it out.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "I try to solve it on my own first.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Cyber Security"] += 2;
      break;
    case "I follow our team’s process.":
      careerWeights["IT Manager"] += 3;
      careerWeights["QA Engineer"] += 2;
      break;
    case "I usually let it settle on its own.":
      careerWeights["IT Support"] += 3;
      careerWeights["QA Engineer"] += 2;
      break;
  }

  // Q8: What matters most when starting a project?
  switch (responses[7]) {
    case "Understanding what the user needs.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
    case "Choosing the right tools and tech.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Cloud Engineer"] += 2;
      break;
    case "Planning and scheduling tasks.":
      careerWeights["IT Manager"] += 3;
      careerWeights["QA Engineer"] += 2;
      break;
    case "Making sure everyone communicates well.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
  }

  // Q9: How do you stay in the loop with tech trends?
  switch (responses[8]) {
    case "I read blogs, articles and watch videos.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "I attend meetups and webinars.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Business Analyst"] += 2;
      break;
    case "I take online courses and earn certificates.":
      careerWeights["AI Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "I chat with peers and join communities.":
      careerWeights["IT Support"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
  }

  // Q10: How would you describe your work style?
  switch (responses[9]) {
    case "I thrive in a busy, collaborative space.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "I enjoy quiet time to focus deeply.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "I like a mix of solo and team work.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "I prefer a creative, flexible vibe.":
      careerWeights["UX Designer"] += 3;
      careerWeights["AI Engineer"] += 2;
      break;
  }

  // Q11: Which tech area excites you the most? (Critical – increased weight)
  switch (responses[10]) {
    case "Cloud and distributed systems.":
      careerWeights["Cloud Engineer"] += 6;
      careerWeights["IT Manager"] += 2;
      break;
    case "Cybersecurity":
      careerWeights["Cyber Security"] += 6;
      careerWeights["Network Engineer"] += 4;
      break;
    case "Data and machine learning.":
      careerWeights["Data Scientist"] += 6;
      careerWeights["AI Engineer"] += 4;
      break;
    case "Mobile and web apps.":
      careerWeights["Software Engineer"] += 6;
      careerWeights["UX Designer"] += 4;
      break;
    case "None of the above.":
      // No additional points.
      break;
  }

  // Q12: How do you love to learn new things?
  switch (responses[11]) {
    case "I set aside time for online courses and reading.":
      careerWeights["AI Engineer"] += 3;
      careerWeights["Data Scientist"] += 2;
      break;
    case "I learn best while working on real projects.":
      careerWeights["Software Engineer"] += 3;
      careerWeights["Business Analyst"] += 2;
      break;
    case "I enjoy learning from mentors and peers.":
      careerWeights["IT Manager"] += 3;
      careerWeights["IT Support"] += 2;
      break;
    case "I join workshops and community events.":
      careerWeights["UX Designer"] += 3;
      careerWeights["Business Analyst"] += 2;
      break;
    case "None of the above.":
      // No additional points.
      break;
  }

  // Q13: What’s your ideal work environment?
  switch (responses[12]) {
    case "A lively, open office.":
      careerWeights["UX Designer"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "A quiet space just for me.":
      careerWeights["Data Scientist"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "A flexible setup that balances both.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
    case "A well-organized, structured space.":
      careerWeights["QA Engineer"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
  }

  // Q14: How do you balance big ideas with the details?
  switch (responses[13]) {
    case "I keep a close eye on every little step.":
      careerWeights["QA Engineer"] += 3;
      careerWeights["Software Engineer"] += 2;
      break;
    case "I start broad and then hone in on details.":
      careerWeights["IT Manager"] += 3;
      careerWeights["Business Analyst"] += 2;
      break;
    case "I delegate details while focusing on strategy.":
      careerWeights["IT Manager"] += 3;
      careerWeights["UX Designer"] += 2;
      break;
    case "I switch between the big picture and details as needed.":
      careerWeights["Business Analyst"] += 3;
      careerWeights["IT Manager"] += 2;
      break;
  }

  // Q15: Which of these technologies have you tried? (Critical – increased weight)
  switch (responses[14]) {
    case "Machine Learning":
      careerWeights["AI Engineer"] += 6;
      careerWeights["Data Scientist"] += 4;
      break;
    case "Database Management":
      careerWeights["Data Scientist"] += 6;
      careerWeights["Business Analyst"] += 4;
      break;
    case "Cloud Computing":
      careerWeights["Cloud Engineer"] += 6;
      careerWeights["IT Manager"] += 2;
      break;
    case "Mobile App Development":
      careerWeights["Software Engineer"] += 6;
      careerWeights["UX Designer"] += 4;
      break;
    case "Cybersecurity":
      careerWeights["Cyber Security"] += 6;
      careerWeights["Network Engineer"] += 4;
      break;
    case "DevOps":
      careerWeights["Software Engineer"] += 6;
      careerWeights["Cloud Engineer"] += 4;
      break;
    case "None of the above":
      // No additional points.
      break;
  }

  return Object.entries(careerWeights)
      .sort(([, weightA], [, weightB]) => weightB - weightA)
      .map(([career]) => career);
}

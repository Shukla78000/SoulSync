document.getElementById("dob-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const dob = document.getElementById("dob").value;
    if (!dob) return;
  
    const lifePath = calculateLifePathNumber(dob);
    document.getElementById("life-path-number").textContent = lifePath;
  
    const description = getLifePathDescription(lifePath);
    document.getElementById("life-path-description").innerHTML = `<strong>${description.title}</strong><p>${description.text}</p>`;
  
    const numerologyMatrix = generateNumerologyMatrix(dob);
    const kundliMatrix = generateKundliMatrix(dob);
    const comparison = compareMatrices(numerologyMatrix, kundliMatrix);
  
    document.getElementById("numerology-matrix").textContent = formatMatrix(numerologyMatrix);
    document.getElementById("kundli-matrix").textContent = formatMatrix(kundliMatrix);
    document.getElementById("comparison-result").textContent = comparison;
  
    document.getElementById("result").style.display = "block";
  });
  
  // === Utility Functions ===
  
  function calculateLifePathNumber(dob) {
    const digits = dob.replace(/-/g, "").split("").map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split("").reduce((a, b) => a + Number(b), 0);
    }
    return sum;
  }
  
  function getLifePathDescription(number) {
    const descriptions = {
      1: { title: "Leader & Innovator", text: "You are a natural-born leader, ambitious and determined to forge your own path. Independence and self-motivation are your driving forces. You have a strong desire to succeed and are willing to take risks to reach your goals. Your originality and confidence inspire others. However, be mindful of arrogance and impatience. Balance assertiveness with empathy.\n\nKeywords: Leadership, Independence, Initiative, Determination, Innovation." },
      2: { title: "Diplomat & Peacemaker", text: "You are a peacemaker and a nurturer. Harmony, cooperation, and sensitivity define you. You’re deeply intuitive, diplomatic, and prefer teamwork over competition. You have the ability to bring people together and resolve conflicts. Avoid being overly passive or dependent on others. Embrace your inner strength and emotional intelligence.\n\nKeywords: Cooperation, Sensitivity, Balance, Diplomacy, Partnership.." },
      3: { title: "Creative & Expressive", text: "Creativity and self-expression are at the heart of your journey. You are joyful, optimistic, and gifted in communication, whether through words, art, or performance. People are drawn to your charisma. Your challenge is to stay grounded and focused. Don’t let scattered energy or self-doubt limit your potential.\n\nKeywords: Creativity, Expression, Joy, Communication, Charm" },
      4: { title: "Builder & Planner", text: "You are the builder. Reliable, hardworking, and practical, you value structure and discipline. You create strong foundations, whether in work, relationships, or values. Others rely on your consistency. Watch out for stubbornness and fear of change. Remember to allow spontaneity in your structured world.\n\nKeywords: Stability, Discipline, Dependability, Order, Loyalty" },
      5: { title: "Adventurer & Free Spirit", text: "You are a free spirit, drawn to experiences that are exciting, new, and ever-changing. People with this number thrive on adventure, discovery, and personal freedom. You’re curious, adaptable, and quick-witted, making you a natural explorer—whether it’s through travel, learning, or meeting new people.\n\nWhile your energy and enthusiasm are contagious, the challenge for a 5 is to remain focused and grounded. You may find yourself jumping from one passion to another, seeking stimulation without deeper commitment. But when you channel your adventurous spirit into meaningful pursuits, you become a powerful force of inspiration and change.\n\nKeywords: Freedom, Adventure, Curiosity, Adaptability, Communication, Change." },
      6: { title: "Nurturer & Healer", text: "You are the nurturer, deeply connected to home, family, and responsibility. Compassionate and caring, you seek to protect and uplift others. You often find yourself in roles of caregiver, teacher, or healer. You are guided by a strong sense of justice and morality. Avoid becoming overly controlling or self-sacrificing.\n\nKeywords: Responsibility, Caregiving, Harmony, Service, Protection" },
      7: { title: "Seeker & Thinker", text: "You are a thinker and seeker of truth. Intellectual and introspective, you search for deeper meaning in life through study, analysis, and spirituality. You are highly intuitive, with a natural affinity for research and the metaphysical. Don’t isolate yourself or become too skeptical—share your wisdom with the world.\n\nKeywords: Wisdom, Spirituality, Introspection, Analysis, Mystery" },
      8: { title: "Powerhouse & Achiever", text: "You are driven by power, success, and material mastery. Strong, ambitious, and authoritative, you are built to lead and manage. You possess strong business acumen and aim for financial and personal achievement. Your lesson is to balance ambition with compassion and avoid becoming overly controlling or materialistic.\n\nKeywords: Power, Success, Abundance, Authority, Ambition." },
      9: { title: "Humanitarian & Idealist", text: "ou are the humanitarian. Empathetic, generous, and emotionally wise, you are here to serve others and make the world a better place. You are artistic, global-minded, and idealistic. You may face emotional highs and lows, but your compassion makes you a beacon of hope. Let go of resentment and embrace forgiveness.\n\nKeywords: Compassion, Humanity, Altruism, Creativity, Wisdom" },
      11: { title: "Spiritual Visionary", text: "You are an old soul and spiritual messenger. As a master number, 11 carries intuitive and visionary energy. You are highly sensitive, insightful, and often feel a calling to uplift others spiritually or artistically. Balancing your intense inner world with practical reality is your challenge. You have the potential to inspire and awaken others.\n\nKeywords: Intuition, Inspiration, Spirituality, Illumination, Sensitivity" },
      22: { title: "Master Builder", text: "you possess the idealism of Life Path 11 combined with the practical skills of a 4. You have the potential to achieve great things on a large scale—turning dreams into reality. Your challenge is to harness your ambition and apply your power constructively, without being overwhelmed by pressure.\n\nKeywords: Mastery, Vision, Foundation, Manifestation, Leadership." },
      33: { title: "Master Teacher", text: "The Master Teacher, you are here to uplift humanity through love, compassion, and spiritual wisdom. A blend of the nurturing 6 and the illumination of 11, you are selfless and dedicated to healing. You’re naturally drawn to helping others evolve emotionally and spiritually. Your path requires patience, humility, and emotional strength.\n\nKeywords: Compassion, Healing, Altruism, Teaching, Devotion" }
    };
    return descriptions[number] || { title: "Unknown", text: "No description available." };
  }
  
  function generateNumerologyMatrix(dob) {
    const digits = dob.replace(/-/g, "").split("").map(Number);
    const matrix = Array(9).fill(0);
    digits.forEach(d => { if (d !== 0) matrix[d - 1]++; });
    return matrix;
  }
  
  function generateKundliMatrix(dob) {
    // For demo purposes, we'll use a pseudo-random matrix derived from date values
    const date = new Date(dob);
    const seed = date.getFullYear() + date.getMonth() + date.getDate();
    const matrix = Array(9).fill(0).map((_, i) => (seed * (i + 1)) % 4);
    return matrix;
  }
  
  function compareMatrices(numMatrix, kundliMatrix) {
    let comparison = "";
    for (let i = 0; i < 9; i++) {
      const diff = numMatrix[i] - kundliMatrix[i];
      if (diff === 0) {
        comparison += `Digit ${i + 1}: Balanced\n`;
      } else if (diff > 0) {
        comparison += `Digit ${i + 1}: Numerology stronger by ${diff}\n`;
      } else {
        comparison += `Digit ${i + 1}: Kundli stronger by ${-diff}\n`;
      }
    }
    return comparison.trim();
  }
  
  function formatMatrix(matrix) {
    return matrix.map((count, index) => `${index + 1}: ${count}`).join("\n");
  }
  
// src/grammarUtils.js
export async function correctGrammar(text) {
  const response = await fetch("https://api.languagetoolplus.com/v2/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      text: text,
      language: "en-US"
    })
  });

  const data = await response.json();

  const corrected = [...text];
  const explanations = [];

  for (let match of data.matches.reverse()) {
    if (match.replacements.length > 0) {
      const { offset, length } = match;
      corrected.splice(offset, length, ...match.replacements[0].value);
      explanations.push({
        error: text.substr(offset, length),
        suggestion: match.replacements[0].value
      });
    }
  }

  return {
    corrected: corrected.join(""),
    explanations
  };
}

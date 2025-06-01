'use client';

export const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
  let normalizedUserAnswer = userAnswer.trim().toLowerCase();
  let normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();

  const fillerWords = ['the', 'a', 'an', 'and', 'of', 'in', 'to', 'for', 'on', 'with'];
  const removeFillerWords = (answer: string) => {
    return answer
      .split(' ')
      .filter(word => !fillerWords.includes(word))
      .join(' ')
      .replace(/[.,!?;:]/g, ''); // Remove punctuation
  };
  normalizedUserAnswer = removeFillerWords(normalizedUserAnswer);
  normalizedCorrectAnswer = removeFillerWords(normalizedCorrectAnswer);

  const cleanAnswer = (answer: string) => {
    return answer.replace(/[^a-zA-Z\s]/g, '').trim();
  };
  normalizedUserAnswer = cleanAnswer(normalizedUserAnswer);
  normalizedCorrectAnswer = cleanAnswer(normalizedCorrectAnswer);

  return normalizedUserAnswer === normalizedCorrectAnswer;
}

export const saveHighscore = (score: number): void => {
  localStorage.setItem('highscore', score.toString());
  console.log('Highscore saved:', score);
}

export const getHighscore = (): number | null => {
  const highscore = localStorage.getItem('highscore');
  console.log('Highscore retrieved:', highscore);
  return highscore ? parseInt(highscore, 10) : null;
}

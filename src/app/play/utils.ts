'use client';

export function checkAnswer(guess: string, correct: string): boolean {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const normalizedGuess = normalize(guess);
  const normalizedCorrect = normalize(correct);

  const isExactMatch = normalizedGuess === normalizedCorrect;
  const isSafePartialMatch =
    normalizedGuess.length >= 4 && normalizedCorrect.includes(normalizedGuess);

  return isExactMatch || isSafePartialMatch;
}

export const saveHighscore = (score: number, mode: string = 'all'): void => {
  localStorage.setItem(`highscore-${mode}`, score.toString());
  console.log('Highscore saved:', score);
}

export const getHighscore = (mode: string = 'all'): number | null => {
  const highscore = localStorage.getItem(`highscore-${mode}`);
  console.log('Highscore retrieved:', highscore);
  return highscore ? parseInt(highscore, 10) : null;
}

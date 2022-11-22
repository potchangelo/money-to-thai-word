export interface ThaiWordOptions {
  showActual?: boolean
}

/**
 * Convert money (number) to Thai word (string).
 * @param {number} money Input money.
 * @param {ThaiWordOptions} [options] Optional configurations.
 */
export function moneyToThaiWord(money: number, options?: ThaiWordOptions): string;

export interface ThaiWordLocaleENOptions {
  textTransform?: 'first-letter'|'lowercase'|'uppercase'|'capitalize'
}

/**
 * Convert money (number) to Thai word (string) in English locale.
 * @param {number} money Input money.
 * @param {ThaiWordLocaleENOptions} [options] Optional configurations.
 */
export function moneyToThaiWordLocaleEN(money: number, options?: ThaiWordLocaleENOptions): string;

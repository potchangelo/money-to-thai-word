export interface ThaiWordOptions {
  showActual?: boolean
}

/**
 * Convert money (number) to Thai word (string).
 */
export function moneyToThaiWord(money: number, options?: ThaiWordOptions): string;

export interface ThaiWordLocaleENOptions {
  textTransform?: 'first-letter'|'lowercase'|'uppercase'|'capitalize'
}

/**
 * Convert money (number) to Thai word (string) in English locale.\
 */
export function moneyToThaiWordLocaleEN(money: number, options?: ThaiWordLocaleENOptions): string;

export interface ThaiWordOptions {
  showActual?: boolean
}

export function moneyToThaiWord(money: number, options?: ThaiWordOptions): string;

export interface ThaiWordLocaleENOptions {
  textTransform?: 'first-letter'|'lowercase'|'uppercase'|'capitalize'
}

export function moneyToThaiWordLocaleEN(money: number, options?: ThaiWordLocaleENOptions): string;

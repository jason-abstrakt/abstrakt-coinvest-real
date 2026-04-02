/** Content aligned to the co-investment financial model (base case) and your stated terms. */

export type DealTabId = 'summary' | 'structure' | 'business' | 'model' | 'considerations'

/** Stable order for tablist / tabpanels */
export const DEAL_TAB_ORDER: DealTabId[] = [
  'summary',
  'structure',
  'business',
  'model',
  'considerations',
]

/** Shorter labels for folder tabs on medium-width viewports (avoids awkward wrapping) */
export const DEAL_TAB_SHORT_LABEL: Record<DealTabId, string> = {
  summary: 'Summary',
  structure: 'Economics',
  business: 'Business',
  model: 'Model',
  considerations: 'Risks',
}

export interface DealDefinition {
  id: string
  title: string
  tagline: string
  minInvestmentUsd: number
  totalRaiseUsd: number
  /** Tab labels only (shown on pill selectors) */
  tabs: Record<DealTabId, string>
}

export const deals: DealDefinition[] = [
  {
    id: 'project-mana',
    title: 'Project Mana — Ora Health Group (op-co)',
    tagline:
      'Premium behavioral-health platform (The Ohana · HI, The Oasis · CA). This tranche is operating-company economics only — not the owned real estate.',
    minInvestmentUsd: 10_000,
    totalRaiseUsd: 240_000,
    tabs: {
      summary: 'Summary',
      structure: 'Structure & economics',
      business: 'Business overview',
      model: 'Model & assumptions',
      considerations: 'Risks & considerations',
    },
  },
]

/** Legacy URL hash from earlier build */
const DEAL_ALIASES: Record<string, string> = {
  'opco-platform': 'project-mana',
}

export function getDeal(id: string): DealDefinition | undefined {
  const canonical = DEAL_ALIASES[id] ?? id
  return deals.find((d) => d.id === canonical)
}

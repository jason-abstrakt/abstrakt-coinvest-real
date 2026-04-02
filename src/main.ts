import './style.css'
import { ABSTRAKT_LOGO_URL } from './branding.ts'
import { DEAL_TAB_ORDER, DEAL_TAB_SHORT_LABEL, getDeal, type DealTabId } from './deal-data.ts'
import { NDA_BODY_HTML, NDA_TITLE, NDA_PARTIES } from './nda-content.ts'

const AUTH_KEY = 'abstrakt_co_invest_auth_v1'
const PASSWORD_NORMALIZED = 'abstrakt2026'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function isAuthed(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

function setAuthed(): void {
  sessionStorage.setItem(AUTH_KEY, '1')
}

function clearAuth(): void {
  sessionStorage.removeItem(AUTH_KEY)
}

function shellHeader(): string {
  return `
    <header class="shell-header">
      <div class="shell-header__inner">
        <a class="logo-link" href="#" aria-label="Abstrakt">
          <img
            class="logo"
            src="${ABSTRAKT_LOGO_URL}"
            alt="Abstrakt"
            width="98"
            height="22"
            decoding="async"
          />
        </a>
        <div class="shell-header__actions">
          <button type="button" class="btn btn--ghost" id="btn-sign-out">Sign out</button>
        </div>
      </div>
    </header>
  `
}

function gateView(): string {
  return `
    <div class="gate">
      <div class="gate__panel">
        <p class="gate__eyebrow">${NDA_PARTIES}</p>
        <h1 class="gate__title">Co-investment portal</h1>
        <p class="gate__lede">Enter the access password and accept the confidentiality agreement to view active opportunities.</p>

        <div class="nda-block">
          <h2 class="nda-block__title">${NDA_TITLE}</h2>
          <p class="nda-block__between"><strong>Between</strong> ${NDA_PARTIES} (“Abstrakt”) and you (“Recipient”).</p>
          <div class="nda-block__scroll" tabindex="0">
            ${NDA_BODY_HTML}
          </div>
        </div>

        <form class="gate-form" id="gate-form" novalidate>
          <label class="field">
            <span class="field__label">Password</span>
            <input class="field__input" name="password" type="password" autocomplete="current-password" required />
          </label>
          <label class="check">
            <input class="check__input" name="accept" type="checkbox" required />
            <span class="check__text">I have read and agree to the ${NDA_TITLE} on behalf of myself and, if applicable, the organization I represent.</span>
          </label>
          <p class="gate-form__error" id="gate-error" role="alert" hidden></p>
          <button class="btn btn--primary btn--wide" type="submit">Unlock materials</button>
        </form>
      </div>
    </div>
  `
}

function gridView(): string {
  return `
    ${shellHeader()}
    <div class="canvas">
      <div class="canvas__inner">
        <p class="crumb">Abstrakt Capital · Co-investments</p>
        <h1 class="page-title">Opportunities</h1>
        <p class="page-sub">Select a deal to review structure, metrics, and diligence context.</p>

        <div class="deal-grid">
          <a class="deal-card" href="#deal/project-mana">
            <div class="deal-card__top">
              <span class="pill pill--dark">Active</span>
              <span class="deal-card__chev" aria-hidden="true">→</span>
            </div>
            <h2 class="deal-card__title">Project Mana — Ora Health Group</h2>
            <p class="deal-card__tag">Op-co economics only · The Ohana (HI) &amp; The Oasis (CA)</p>
            <div class="deal-card__metrics">
              <div>
                <p class="metric__label">Minimum</p>
                <p class="metric__value">$10k</p>
              </div>
              <div>
                <p class="metric__label">Total tranche</p>
                <p class="metric__value">$240k</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
}

function dealTabPanel(dealId: string, tab: DealTabId): string {
  if (!getDeal(dealId)) return ''

  switch (tab) {
    case 'summary':
      return `
        <div class="tab-panel">
          <div class="metrics-row">
            <article class="metric-card">
              <p class="metric-card__label">Expected IRR (base case) <span class="info" title="Illustrative; from underwriting model.">i</span></p>
              <p class="metric-card__figure metric-card__figure--accent">~49.5%</p>
            </article>
            <article class="metric-card">
              <p class="metric-card__label">Expected MOIC (base case)</p>
              <p class="metric-card__figure metric-card__figure--accent">~8.4x</p>
            </article>
            <article class="metric-card">
              <p class="metric-card__label">Payback target</p>
              <p class="metric-card__figure">EOY 2028</p>
              <p class="metric-card__hint">~2.5 year payback of invested capital with interest, per negotiated structure.</p>
            </article>
            <article class="metric-card">
              <p class="metric-card__label">This tranche</p>
              <p class="metric-card__figure">$10k min · $240k total</p>
            </article>
          </div>
          <div class="prose">
            <p><strong>Ora Health Group</strong> (“Ora Health”) is a premium, dual-state behavioral health platform running evidence-based detox, residential, and holistic programming through <strong>The Ohana</strong> (Kailua-Kona, Hawaiʻi) and <strong>The Oasis</strong> (Rancho Mirage, California)—normalized <strong>~$1.39M 2025 EBITDA</strong> at <strong>~28% margins</strong> and <strong>~92% occupancy</strong>, with an <strong>82% commercial OON / 18% cash</strong> payer mix and <strong>no Medicare/Medicaid</strong>, per the <em>Project Mana</em> confidential information memorandum (CIM).</p>
            <p>This co-investment allocates to <strong>operating-company economics only</strong> and does <strong>not</strong> convey direct ownership of the Company’s <strong>~$4.85M</strong> combined appraised real estate; headline IRR/MOIC figures reflect our base-case underwriting model (preferences, distributions, terminal exit) and are <strong>illustrative—not a guarantee</strong>.</p>
          </div>
        </div>
      `
    case 'structure':
      return `
        <div class="tab-panel">
          <div class="prose">
            <p><strong>Scope.</strong> Investors participate in the operating company (“op-co”) economics tied to Ora Health’s managed platform—not in fee-simple real estate. The CIM describes <strong>$4.85M</strong> in unlevered, owned properties (The Ohana ~$2.5M; The Oasis ~$2.35M) for <strong>transaction context</strong>; your return profile here is defined by definitive documents and the op-co waterfall, not by title to those assets.</p>
            <p><strong>Diligence materials.</strong> Company narrative and KPIs in this portal are summarized from the <em>Project Mana</em> CIM prepared by <strong>Strategique Partners</strong> for qualified parties evaluating a potential transaction with the Company.</p>
            <p><strong>Economics (summary).</strong> Our underwriting model layers investor preferences and pro-rata participation in operating cash flows, targeting full repayment of invested capital with negotiated return by <strong>December 31, 2028</strong>, with further upside from ongoing distributions and a modeled exit.</p>
            <p><strong>Tranche sizing.</strong> Minimum <strong>$10,000</strong>; aggregate co-investment up to <strong>$240,000</strong>.</p>
            <p><strong>Documentation.</strong> Binding terms appear only in executed agreements.</p>
          </div>
        </div>
      `
    case 'business':
      return `
        <div class="tab-panel">
          <div class="prose">
            <p><strong>Corporate structure.</strong> Ora Health Group is the parent holding and MSO-style platform for two wholly owned facilities: <strong>The Ohana Addiction Treatment Center</strong> (The Ohana Retreat LLC, 73-4617 Kaloko Halia Pl, Kailua-Kona, HI) and <strong>The Oasis Addiction Treatment Center</strong> (The Oasis ATC LLC, 70411 Desert Cove Ave, Rancho Mirage, CA). Centralized finance, billing oversight, marketing, admissions, compliance, and HR support lean site-level operations.</p>
            <p><strong>Clinical &amp; quality.</strong> Joint Commission–accredited programs; ASAM 3.7 detox through ASAM 2.5 PHP/IOP; executive/professional tracks with premium daily rates. The Ohana benefits from Hawaiʻi <strong>Certificate of Need</strong> scarcity; The Oasis is a <strong>Q4 2024</strong> launch that reached breakeven in its first full quarter and profitability by <strong>Q2 2025</strong> per the CIM—validating the playbook.</p>
            <p><strong>Demand &amp; payor mix.</strong> ~<strong>92%</strong> blended occupancy (14 beds pre-expansion); payer mix <strong>82% commercial OON / 18% cash / 0% government</strong>. The Ohana collects largely cash/coinsurance upfront (Hawaiʻi AOB limitations); The Oasis can bill OON to facility with predictable collections.</p>
            <p><strong>People.</strong> An experienced <strong>Executive Director</strong> runs day-to-day operations across both sites; the CIM states the ED <strong>remains post-close</strong>, with the owner in a <strong>limited advisory</strong> role—continuity for a buyer or capital partner.</p>
            <p><strong>Expansion.</strong> Approved/planned growth from <strong>14 → 24 beds (+71%)</strong> with incremental EBITDA modeled at <strong>~+$775K</strong> and <strong>2026E</strong> platform EBITDA <strong>~$2.17M</strong> in the CIM’s post-expansion outlook.</p>
          </div>
        </div>
      `
    case 'model':
      return `
        <div class="tab-panel">
          <p class="subsection-label">CIM operating outlook (Company materials)</p>
          <div class="table-like">
            <div class="table-like__row"><span>Normalized 2025 EBITDA (platform)</span><strong>~$1.39M <span class="table-muted">~28% margin</span></strong></div>
            <div class="table-like__row"><span>2025 EBITDA (CIM table, Ohana / Oasis / total)</span><strong>~$1.11M / ~$0.28M / ~$1.39M</strong></div>
            <div class="table-like__row"><span>2026E post-expansion EBITDA (CIM)</span><strong>~$2.17M</strong></div>
            <div class="table-like__row"><span>Combined appraised real estate (context)</span><strong>~$4.85M <span class="table-muted">unlevered — not part of this tranche</span></strong></div>
          </div>
          <div class="prose prose--tight">
            <p class="subsection-label subsection-label--spaced">Exit &amp; investor economics (base-case underwriting model)</p>
            <p>Representative investor slice—not your tax or legal position. Tie-out to the <em>Project Mana</em> operating forecast is for discussion only.</p>
          </div>
          <div class="table-like">
            <div class="table-like__row"><span>Equity share (illustrative slice)</span><strong>19%</strong></div>
            <div class="table-like__row"><span>EBITDA exit multiple (assumption)</span><strong>5.0×</strong></div>
            <div class="table-like__row"><span>Exit year (assumption)</span><strong>2032</strong></div>
            <div class="table-like__row"><span>Op-co enterprise value at exit</span><strong>~$15.6M</strong></div>
            <div class="table-like__row"><span>Remaining debt at exit</span><strong>~$2.1M</strong></div>
            <div class="table-like__row"><span>Equity value at exit (net of debt)</span><strong>~$13.5M</strong></div>
          </div>
          <div class="prose">
            <p><strong>Cash-flow timing (high level).</strong> The model includes an initial equity contribution, near-term preference-style cash flows consistent with the <strong>~2.5 year</strong> capital return profile, ongoing annual distributions, and a <strong>2032</strong> terminal distribution.</p>
            <p><strong>Important.</strong> One scenario; actual results depend on operations, financing, regulation, and exit reality.</p>
          </div>
        </div>
      `
    case 'considerations':
      return `
        <div class="tab-panel">
          <p class="subsection-label">From the CIM (illustrative mitigants)</p>
          <ul class="bullet-list">
            <li><strong>Geography:</strong> Hawaiʻi island operations are remote but autonomous; CON protection supports economics.</li>
            <li><strong>Oasis ramp:</strong> Newer site—mitigated by rapid path to profitability and normalized EBITDA in materials.</li>
            <li><strong>Scale:</strong> 14 beds pre-expansion—expansion to 24 beds is modeled in the CIM.</li>
            <li><strong>OON / reimbursement:</strong> Policy shifts could affect rates; diversified commercial and cash pay reduce concentration.</li>
            <li><strong>Management transition:</strong> ED retains leadership post-close per seller materials.</li>
            <li><strong>Macro / luxury exposure:</strong> Affluent clientele and insurance coverage partially offset cyclicality.</li>
          </ul>
          <p class="subsection-label subsection-label--spaced">General</p>
          <ul class="bullet-list">
            <li>Private investments are illiquid; secondary markets are limited.</li>
            <li>Actual results may differ materially from modeled IRR, MOIC, and timing.</li>
            <li>Concentration in one platform heightens idiosyncratic risk.</li>
            <li>This page is not an offer or solicitation; qualified investors only.</li>
          </ul>
        </div>
      `
    default:
      return ''
  }
}

function dealView(dealId: string, tab: DealTabId): string {
  const deal = getDeal(dealId)
  if (!deal) {
    return `
      ${shellHeader()}
      <div class="canvas">
        <div class="canvas__inner">
          <p>Deal not found.</p>
          <p><a href="#">← Back to grid</a></p>
        </div>
      </div>
    `
  }

  const cid = deal.id
  const tabIds = DEAL_TAB_ORDER.filter((id) => id in deal.tabs)

  const tabButtons = tabIds.map((id) => {
    const label = deal.tabs[id]
    const shortLabel = DEAL_TAB_SHORT_LABEL[id]
    const isActive = id === tab
    return `
      <button
        type="button"
        role="tab"
        id="deal-tab-${cid}-${id}"
        class="tabs__btn ${isActive ? 'tabs__btn--active' : ''}"
        aria-selected="${isActive}"
        aria-controls="deal-panel-${cid}-${id}"
        tabindex="${isActive ? 0 : -1}"
        data-tab="${id}"
        title="${escapeHtml(label)}"
      >
        <span class="tabs__btn-label tabs__btn-label--full">${escapeHtml(label)}</span>
        <span class="tabs__btn-label tabs__btn-label--short">${escapeHtml(shortLabel)}</span>
      </button>
    `
  })

  const tabPanels = tabIds
    .map((tid) => {
      const isActive = tid === tab
      return `
      <section
        class="deal-tab-section"
        id="deal-panel-${cid}-${tid}"
        role="tabpanel"
        aria-labelledby="deal-tab-${cid}-${tid}"
        ${isActive ? '' : 'hidden'}
        data-tab-panel="${tid}"
      >
        ${dealTabPanel(cid, tid)}
      </section>
    `
    })
    .join('')

  const mobileListOptions = tabIds
    .map((id) => {
      const label = escapeHtml(deal.tabs[id])
      const active = id === tab
      return `
        <button
          type="button"
          class="tabs-folder__mobile-option ${active ? 'tabs-folder__mobile-option--active' : ''}"
          role="option"
          data-tab="${id}"
          data-deal-mobile-option="${cid}"
          aria-selected="${active}"
        >
          <span class="tabs-folder__mobile-option-text">${label}</span>
          ${active ? '<span class="tabs-folder__mobile-option-check" aria-hidden="true">✓</span>' : ''}
        </button>
      `
    })
    .join('')

  return `
    ${shellHeader()}
    <div class="canvas">
      <div class="canvas__inner canvas__inner--wide deal-detail" data-deal-id="${cid}">
        <p class="crumb"><a href="#">Co-investments</a> / ${deal.title}</p>
        <div class="deal-hero card card--pad">
          <div>
            <h1 class="page-title page-title--sm">${deal.title}</h1>
            <p class="page-sub">${deal.tagline}</p>
          </div>
          <div class="deal-hero__nums">
            <div>
              <p class="metric__label">Minimum</p>
              <p class="metric__value metric__value--hero">$${(deal.minInvestmentUsd / 1000).toFixed(0)}k</p>
            </div>
            <div>
              <p class="metric__label">Total tranche</p>
              <p class="metric__value metric__value--hero">$${(deal.totalRaiseUsd / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>

        <div class="tabs-folder">
          <div class="tabs-folder__mobile" data-deal-mobile-picker="${cid}">
            <label class="tabs-folder__mobile-label" id="deal-tab-mlabel-${cid}" for="deal-tab-trigger-${cid}"
              >Section</label
            >
            <div class="tabs-folder__mobile-backdrop" hidden data-deal-tab-backdrop="${cid}" aria-hidden="true"></div>
            <div class="tabs-folder__mobile-wrap">
              <button
                type="button"
                class="tabs-folder__mobile-trigger"
                id="deal-tab-trigger-${cid}"
                aria-expanded="false"
                aria-haspopup="listbox"
                aria-labelledby="deal-tab-mlabel-${cid}"
                aria-controls="deal-tab-listbox-${cid}"
                data-deal-tab-trigger="${cid}"
              >
                <span class="tabs-folder__mobile-trigger-text" data-deal-tab-trigger-label="${cid}"
                  >${escapeHtml(deal.tabs[tab])}</span
                >
                <span class="tabs-folder__mobile-trigger-chev" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
              </button>
              <div
                class="tabs-folder__mobile-panel"
                id="deal-tab-listbox-${cid}"
                role="listbox"
                hidden
                data-deal-tab-listbox="${cid}"
                aria-labelledby="deal-tab-mlabel-${cid}"
              >
                ${mobileListOptions}
              </div>
            </div>
          </div>
          <div
            class="tabs tabs-folder__strip"
            id="deal-tablist-${cid}"
            role="tablist"
            aria-label="Deal sections"
          >
            ${tabButtons.join('')}
          </div>
          <div
            class="tabs-folder__body tabs__panel-stack"
            id="deal-panels-${cid}"
            data-deal-panels="${cid}"
          >
            ${tabPanels}
          </div>
        </div>
        <p class="back-link"><a href="#">← All opportunities</a></p>
      </div>
    </div>
  `
}

function syncDealTabDom(canonicalDealId: string, activeTab: DealTabId): void {
  const deal = getDeal(canonicalDealId)
  if (!deal) return
  const tabIds = DEAL_TAB_ORDER.filter((id) => id in deal.tabs)
  for (const tid of tabIds) {
    const on = tid === activeTab
    const panel = document.getElementById(`deal-panel-${canonicalDealId}-${tid}`)
    const btn = document.getElementById(`deal-tab-${canonicalDealId}-${tid}`)
    if (panel) {
      panel.toggleAttribute('hidden', !on)
    }
    if (btn) {
      btn.classList.toggle('tabs__btn--active', on)
      btn.setAttribute('aria-selected', String(on))
      btn.tabIndex = on ? 0 : -1
    }
  }

  const labelEl = document.querySelector<HTMLElement>(`[data-deal-tab-trigger-label="${canonicalDealId}"]`)
  if (labelEl) {
    labelEl.textContent = deal.tabs[activeTab]
  }

  document.querySelectorAll<HTMLButtonElement>(`[data-deal-mobile-option="${canonicalDealId}"]`).forEach((opt) => {
    const id = opt.dataset.tab as DealTabId
    const on = id === activeTab
    opt.classList.toggle('tabs-folder__mobile-option--active', on)
    opt.setAttribute('aria-selected', String(on))
    const row = opt.querySelector('.tabs-folder__mobile-option-check')
    if (on && !row) {
      const check = document.createElement('span')
      check.className = 'tabs-folder__mobile-option-check'
      check.setAttribute('aria-hidden', 'true')
      check.textContent = '✓'
      opt.appendChild(check)
    } else if (!on && row) {
      row.remove()
    }
  })

  closeMobileTabPicker(canonicalDealId)
}

function closeMobileTabPicker(canonicalDealId: string): void {
  const trigger = document.querySelector<HTMLButtonElement>(`[data-deal-tab-trigger="${canonicalDealId}"]`)
  const panel = document.querySelector<HTMLElement>(`[data-deal-tab-listbox="${canonicalDealId}"]`)
  const backdrop = document.querySelector<HTMLElement>(`[data-deal-tab-backdrop="${canonicalDealId}"]`)
  trigger?.setAttribute('aria-expanded', 'false')
  panel?.setAttribute('hidden', '')
  backdrop?.setAttribute('hidden', '')
  document.body.style.overflow = ''
}

function setupDealTabs(canonicalDealId: string): void {
  const tablist = document.getElementById(`deal-tablist-${canonicalDealId}`)
  if (!tablist) return

  const ordered = DEAL_TAB_ORDER.filter((id) => {
    const d = getDeal(canonicalDealId)
    return d && id in d.tabs
  })

  const select = (tab: DealTabId, focusTabButton: boolean) => {
    window.location.hash = `deal/${canonicalDealId}/${tab}`
    syncDealTabDom(canonicalDealId, tab)
    if (focusTabButton) {
      document.getElementById(`deal-tab-${canonicalDealId}-${tab}`)?.focus()
    }
  }

  tablist.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]')
    if (!btn || !tablist.contains(btn)) return
    const tab = btn.dataset.tab as DealTabId | undefined
    if (!tab) return
    e.preventDefault()
    select(tab, false)
  })

  tablist.addEventListener('keydown', (e) => {
    const activeBtn = tablist.querySelector<HTMLButtonElement>('.tabs__btn--active')
    const current = activeBtn?.dataset.tab as DealTabId | undefined
    if (!current) return
    let idx = ordered.indexOf(current)
    if (idx < 0) return

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (idx < ordered.length - 1) select(ordered[idx + 1]!, true)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (idx > 0) select(ordered[idx - 1]!, true)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(ordered[0]!, true)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(ordered[ordered.length - 1]!, true)
    }
  })

  const trigger = document.querySelector<HTMLButtonElement>(`[data-deal-tab-trigger="${canonicalDealId}"]`)
  const panel = document.querySelector<HTMLElement>(`[data-deal-tab-listbox="${canonicalDealId}"]`)
  const backdrop = document.querySelector<HTMLElement>(`[data-deal-tab-backdrop="${canonicalDealId}"]`)

  const setMobileOpen = (open: boolean) => {
    trigger?.setAttribute('aria-expanded', String(open))
    if (open) {
      panel?.removeAttribute('hidden')
      backdrop?.removeAttribute('hidden')
      document.body.style.overflow = 'hidden'
    } else {
      panel?.setAttribute('hidden', '')
      backdrop?.setAttribute('hidden', '')
      document.body.style.overflow = ''
    }
  }

  trigger?.addEventListener('click', () => {
    if (!trigger) return
    const isOpen = trigger.getAttribute('aria-expanded') === 'true'
    setMobileOpen(!isOpen)
  })

  backdrop?.addEventListener('click', () => setMobileOpen(false))

  panel?.querySelectorAll<HTMLButtonElement>(`[data-deal-mobile-option="${canonicalDealId}"]`).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const tab = btn.dataset.tab as DealTabId | undefined
      if (tab && ordered.includes(tab)) {
        select(tab, false)
        setMobileOpen(false)
      }
    })
  })

  trigger?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMobileOpen(false)
    }
  })
}

function parseRoute(): { view: 'gate' | 'grid' | 'deal'; dealId?: string; tab?: DealTabId } {
  if (!isAuthed()) return { view: 'gate' }
  const hash = window.location.hash.replace(/^#/, '')
  if (hash.startsWith('deal/')) {
    const rest = hash.slice('deal/'.length)
    const [dealId, tabPart] = rest.split('/')
    const tab = (tabPart as DealTabId) || 'summary'
    const allowed: DealTabId[] = ['summary', 'structure', 'business', 'model', 'considerations']
    return { view: 'deal', dealId, tab: allowed.includes(tab) ? tab : 'summary' }
  }
  return { view: 'grid' }
}

function render(): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  const route = parseRoute()

  if (route.view === 'gate') {
    app.innerHTML = gateView()
    const form = document.getElementById('gate-form') as HTMLFormElement | null
    const err = document.getElementById('gate-error') as HTMLParagraphElement | null
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(form)
      const pw = String(fd.get('password') ?? '')
      const accept = fd.get('accept') === 'on'
      if (!accept) {
        if (err) {
          err.hidden = false
          err.textContent = 'Please accept the confidentiality agreement to continue.'
        }
        return
      }
      if (pw.trim().toLowerCase() !== PASSWORD_NORMALIZED) {
        if (err) {
          err.hidden = false
          err.textContent = 'That password is not correct.'
        }
        return
      }
      setAuthed()
      window.location.hash = ''
      render()
    })
    return
  }

  if (route.view === 'grid') {
    app.innerHTML = gridView()
    document.getElementById('btn-sign-out')?.addEventListener('click', () => {
      clearAuth()
      window.location.hash = ''
      render()
    })
    return
  }

  if (route.view === 'deal' && route.dealId) {
    const tab = route.tab ?? 'summary'
    app.innerHTML = dealView(route.dealId, tab)
    document.getElementById('btn-sign-out')?.addEventListener('click', () => {
      clearAuth()
      window.location.hash = ''
      render()
    })

    const deal = getDeal(route.dealId)
    if (deal) setupDealTabs(deal.id)
    return
  }

  app.innerHTML = gridView()
  document.getElementById('btn-sign-out')?.addEventListener('click', () => {
    clearAuth()
    render()
  })
}

window.addEventListener('hashchange', render)
render()

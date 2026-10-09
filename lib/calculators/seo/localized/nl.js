/**
 * lib/calculators/seo/localized/nl.js
 * Complete Dutch localized SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_NL = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "nl",
    "name": "Leningcalculator",
    "category": "financial",
    "badge": "Maandelijkse Aflossing & Rente",
    "icon": "CreditCard",
    "h1": "Leningcalculator",
    "seoTitle": "Leningcalculator – Bereken Maandelijkse Aflossing en Totale Rente",
    "seoDescription": "Gratis online leningcalculator. Bereken maandelijkse aflossingen, totale rentekosten en bekijk aflossingsschema's voor persoonlijke leningen, autoleningen of zakelijke leningen.",
    "primaryKeyword": "leningcalculator",
    "secondaryKeywords": [
      "lening aflossing berekenen",
      "maandelijkse lening berekenen",
      "rente calculator",
      "persoonlijke lening berekenen",
      "autolening berekenen"
    ],
    "heroSubtitle": "Bereken maandelijkse lening aflossingen, totale rentekosten en de totale terugbetalingskosten met aflossingsschema's voor persoonlijke leningen, autoleningen en studieleningen.",
    "about": [
      "De Leningcalculator helpt leners de voorwaarden van aflossingsleningen te evalueren voordat ze financieringsovereenkomsten aangaan met banken, kredietverenigingen of online kredietverstrekkers. Aflossingsleningen – inclusief autofinanciering, persoonlijke leningen en schuldconsolidatiepakketten – zijn gestructureerd rond een geamortiseerde aflossingsformule.",
      "Door het hoofdsom van de lening, het jaarlijkse percentage rente (JKP) en de looptijd van de lening in maanden of jaren in te voeren, berekent de calculator uw exacte maandelijkse aflossing, de totale rente die over de looptijd van de lening wordt betaald, en het totale terug te betalen bedrag."
    ],
    "formula": {
      "title": "Standaard Aflossingsformule voor Leningen",
      "formulaText": "Monthly Payment (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nTotal Repayment = Monthly Payment × n\nTotal Interest = Total Repayment - PV",
      "explanation": "PV is de initiële hoofdsom van de lening, r is de periodieke maandelijkse rentevoet (Jaarlijkse Rente / 12 / 100), en n is het totale aantal maandelijkse betalingen.",
      "variables": [
        {
          "name": "PV",
          "desc": "Huidige Waarde (Hoofdsom van de geleende lening)"
        },
        {
          "name": "r",
          "desc": "Maandelijkse rentevoet: Jaarlijkse Rente ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Totaal aantal maandelijkse betalingsperioden"
        }
      ]
    },
    "howToCalculate": [
      "Voer het totale Leningbedrag (Hoofdsom) in dat u van plan bent te lenen.",
      "Voer het jaarlijkse rentepercentage (JKP) in.",
      "Selecteer de looptijd van de lening (in jaren of maanden).",
      "Klik op Berekenen om uw maandelijkse aflossing, totale rentekosten en de verdeling tussen hoofdsom en rente te zien."
    ],
    "example": {
      "problem": "Wat is de maandelijkse aflossing en totale rente op een autolening van $25.000 tegen 6,0% jaarlijkse rente over een looptijd van 5 jaar (60 maanden)?",
      "steps": [
        "Stap 1: Maandelijkse rentevoet r = 6% ÷ 1200 = 0,005.",
        "Stap 2: Aantal maanden n = 5 × 12 = 60 maanden.",
        "Stap 3: Factor (1 + 0,005)⁶⁰ = 1,34885.",
        "Stap 4: Maandelijkse aflossing = [0,005 × 25.000 × 1,34885] ÷ [1,34885 - 1] = 168,606 ÷ 0,34885 = $483,32.",
        "Stap 5: Totale betalingen = $483,32 × 60 = $28.999,20. Totale rente = $28.999,20 - $25.000 = $3.999,20."
      ],
      "result": "De maandelijkse aflossing is $483,32, en de totale rente betaald over 5 jaar is $3.999,20."
    },
    "notes": [
      "Kredietverstrekkers kunnen afsluitkosten, documentkosten of kredietverzekeringen in rekening brengen, wat het effectieve JKP licht verhoogt.",
      "Het doen van extra aflossingen op de hoofdsom vermindert de totale rente aanzienlijk en verkort de aflossingsduur van de lening.",
      "Langere looptijden van leningen verlagen de maandelijkse aflossingen, maar verhogen de cumulatieve betaalde rente."
    ],
    "faqs": [
      {
        "question": "Hoe berekenen kredietverstrekkers maandelijkse lening aflossingen?",
        "answer": "Kredietverstrekkers gebruiken standaard aflossingsformules waarbij elke maandelijkse betaling wordt verdeeld tussen rente (berekend over het resterende saldo) en aflossing van de hoofdsom."
      },
      {
        "question": "Wat is het verschil tussen JKP en rentetarief?",
        "answer": "Het rentetarief is de basis jaarlijkse kosten voor het lenen van geld, terwijl het Jaarlijks Kostenpercentage (JKP) zowel het rentetarief als eventuele verplichte kosten of punten van de kredietverstrekker omvat."
      },
      {
        "question": "Hoe beïnvloedt een hogere aanbetaling een lening?",
        "answer": "Een hogere aanbetaling verlaagt de geleende hoofdsom, wat direct zowel uw maandelijkse aflossing als de totale rente die over de tijd wordt betaald, vermindert."
      },
      {
        "question": "Kan ik mijn lening eerder aflossen?",
        "answer": "Ja, veel leningen staan vervroegde aflossing toe. Dit kan u aanzienlijk besparen op de totale rentekosten, hoewel sommige kredietverstrekkers boetes voor vervroegde aflossing kunnen toepassen. Controleer altijd de voorwaarden van uw leningovereenkomst."
      }
    ],
    "breadcrumbName": "Leningcalculator"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "nl",
    "name": "EMI Calculator",
    "category": "financial",
    "badge": "Gelijkgestelde Maandelijkse Termijn",
    "icon": "Calculator",
    "h1": "EMI Calculator",
    "seoTitle": "EMI Calculator – Bereken Maandelijkse Aflossingen Online",
    "seoDescription": "Gratis online EMI calculator. Bereken uw maandelijkse aflossing voor hypotheken, autoleningen en persoonlijke leningen, inclusief renteverdeling en aflossingsschema's.",
    "primaryKeyword": "EMI calculator",
    "secondaryKeywords": [
      "EMI calculator Nederland",
      "maandelijkse aflossing berekenen",
      "lening calculator",
      "hypotheek calculator",
      "autolening calculator"
    ],
    "heroSubtitle": "Bereken uw Gelijkgestelde Maandelijkse Termijnen (EMI), totale te betalen rente en aflossingsschema's voor hypotheken, persoonlijke leningen en voertuigleningen.",
    "about": [
      "De Gelijkgestelde Maandelijkse Termijn (EMI) Calculator is een essentieel financieel hulpmiddel dat wereldwijd en binnen het Indiase bankwezen wordt gebruikt om het vaste maandelijkse bedrag te berekenen dat een lener elke maand op een specifieke kalenderdatum aan een kredietverstrekker verschuldigd is.",
      "EMI's zijn zo gestructureerd dat gedurende de eerste maanden een groter deel van elke termijn naar rentebetalingen gaat; naarmate de hoofdsom van de lening in de loop van de tijd afneemt, vermindert een groeiend deel van elke betaling het resterende hoofdsaldo."
    ],
    "formula": {
      "title": "Formule voor Gelijkgestelde Maandelijkse Termijn",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal Payable = EMI × N\nTotal Interest = Total Payable - P",
      "explanation": "P is de hoofdsom van de lening, R is de maandelijkse rentevoet (Jaarlijkse Rente / 12 / 100), en N is de looptijd uitgedrukt in totaal aantal maanden.",
      "variables": [
        {
          "name": "P",
          "desc": "Geleend hoofdbedrag"
        },
        {
          "name": "R",
          "desc": "Maandelijkse rentevoet: Jaarlijkse Rente ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Looptijd in maanden (Jaren × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Voer het hoofdbedrag van de lening in.",
      "Voer het jaarlijkse rentepercentage in dat door de bank in rekening wordt gebracht.",
      "Voer de looptijd van de lening in jaren of maanden in.",
      "Bekijk uw exacte EMI, het totale rentebedrag en de maandelijkse aflossingstabel."
    ],
    "example": {
      "problem": "Bereken de EMI voor een persoonlijke lening van ₹10,00,000 tegen 10,5% rente voor een looptijd van 3 jaar (36 maanden).",
      "steps": [
        "Stap 1: Hoofdsom P = 10,00,000. Looptijd N = 36 maanden.",
        "Stap 2: Maandelijkse rentevoet R = 10.5 ÷ 1200 = 0.00875.",
        "Stap 3: (1 + R)³⁶ = (1.00875)³⁶ = 1.3686.",
        "Stap 4: EMI = [10,00,000 × 0.00875 × 1.3686] ÷ [1.3686 - 1] = ₹32,502.44.",
        "Stap 5: Totale rente = (₹32,502.44 × 36) - ₹10,00,000 = ₹1,70,088."
      ],
      "result": "De maandelijkse EMI is ₹32,502, en de totale te betalen rente over 3 jaar is ₹1,70,088."
    },
    "notes": [
      "Het vervroegd aflossen van extra EMI-termijnen vermindert direct de hoofdsom en verlaagt drastisch de rentekosten op lange termijn.",
      "Variabele rentetarieven kunnen de EMI-bedragen of de looptijd van de lening in de loop van de tijd wijzigen.",
      "Verwerkingskosten en wettelijke belastingen zoals btw op bankkosten worden afzonderlijk door kredietverstrekkers in rekening gebracht."
    ],
    "faqs": [
      {
        "question": "Wat is een Gelijkgestelde Maandelijkse Termijn (EMI)?",
        "answer": "Een EMI is een vast geldbedrag dat een lener elke maand op een specifieke datum aan een financiële kredietverstrekker betaalt om een geamortiseerde lening over een bepaalde periode af te lossen."
      },
      {
        "question": "Waarom is de rente hoger in de beginfase van EMI-betalingen?",
        "answer": "Omdat rente wordt berekend over het openstaande saldo, dat aan het begin van de lening het hoogst is. Naarmate u de hoofdsom aflost, neemt het maandelijkse rentegedeelte af."
      },
      {
        "question": "Kan ik mijn EMI verlagen?",
        "answer": "U kunt uw maandelijkse EMI verlagen door de looptijd van de lening te verlengen, een lagere rentevoet te onderhandelen of een eenmalige vervroegde aflossing op de hoofdsom te doen."
      },
      {
        "question": "Wat gebeurt er als ik extra aflos op mijn lening?",
        "answer": "Extra aflossingen op uw lening verminderen direct de openstaande hoofdsom. Dit resulteert in minder te betalen rente over de resterende looptijd en kan de totale kosten van uw lening aanzienlijk verlagen, of de looptijd verkorten."
      }
    ],
    "breadcrumbName": "EMI Calculator"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "nl",
    "name": "Hypotheekcalculator",
    "category": "financial",
    "badge": "Hypotheek & Belastingen",
    "icon": "Home",
    "h1": "Hypotheekcalculator",
    "seoTitle": "Hypotheekcalculator – Schat Maandelijkse Woonlasten",
    "seoDescription": "Gratis online hypotheekcalculator. Schat de totale maandelijkse woonlasten, inclusief aflossing, rente, onroerendezaakbelasting, opstalverzekering en aanbetaling.",
    "primaryKeyword": "hypotheekcalculator",
    "secondaryKeywords": [
      "hypotheeklasten berekenen",
      "maandelijkse hypotheek berekenen",
      "woonlasten calculator",
      "hypotheek berekenen"
    ],
    "heroSubtitle": "Schat uw maandelijkse hypotheeklasten, inclusief aflossing, rente, onroerendezaakbelasting en opstalverzekering.",
    "about": [
      "De Hypotheekcalculator geeft een complete schatting van de werkelijke maandelijkse woonlasten. Een hypotheekbetaling bestaat zelden alleen uit aflossing en rente – geldverstrekkers en escrow-diensten vereisen routinematig bijdragen voor onroerendezaakbelasting en opstalverzekeringspremies.",
      "Voer de aankoopprijs van de woning, het percentage of bedrag van de aanbetaling, de rentestand en de looptijd (bijv. 15 of 30 jaar) in om uw maandelijkse betaling en de totale financieringskosten over de looptijd te schatten."
    ],
    "formula": {
      "title": "Uitgebreide Formule voor Hypotheekkosten",
      "formulaText": "Totale Maandelijkse Betaling = Aflossing & Rente (A&R) + Maandelijkse Onroerendezaakbelasting + Maandelijkse Verzekering + VvE-bijdrage\nHoofdsom Lening = Aankoopprijs Woning - Aanbetaling",
      "explanation": "A&R wordt berekend met de standaard annuïteitenformule over het netto geleende bedrag. Belastingen en verzekeringen worden gedeeld door 12 en opgeteld voor de totale maandelijkse escrow-verplichting.",
      "variables": [
        {
          "name": "Aankoopprijs Woning",
          "desc": "Overeengekomen aankoopprijs van de residentiële woning"
        },
        {
          "name": "Aanbetaling",
          "desc": "Vooraf betaald eigen vermogen bij de notaris"
        },
        {
          "name": "A&R",
          "desc": "Basis maandelijkse schuldendienst die aflossing en rente dekt"
        }
      ]
    },
    "howToCalculate": [
      "Voer de gewenste aankoopprijs van de woning in.",
      "Voer uw aanbetaling in (als bedrag of percentage).",
      "Geef de jaarlijkse hypotheekrente en de looptijd van de lening op (doorgaans 15 of 30 jaar).",
      "Voeg optioneel jaarlijkse onroerendezaakbelasting en opstalverzekering toe.",
      "Klik op Berekenen om uw complete maandelijkse woonlasten en de totale betaalde rente te zien."
    ],
    "example": {
      "problem": "Schat de maandelijkse betaling voor een woning van $400.000 met 20% aanbetaling ($80.000) tegen 6,5% rente op een vaste lening van 30 jaar, met $4.800/jaar belastingen en $1.200/jaar verzekering.",
      "steps": [
        "Stap 1: Hoofdsom Lening = $400.000 - $80.000 = $320.000.",
        "Stap 2: Maandelijkse A&R op $320.000 tegen 6,5% voor 30 jaar = $2.022,62.",
        "Stap 3: Maandelijkse Onroerendezaakbelasting = $4.800 ÷ 12 = $400,00.",
        "Stap 4: Maandelijkse Verzekering = $1.200 ÷ 12 = $100,00.",
        "Stap 5: Totale Maandelijkse Betaling = $2.022,62 + $400,00 + $100,00 = $2.522,62."
      ],
      "result": "De totale geschatte maandelijkse woonlasten bedragen $2.522,62 (A&R: $2.022,62)."
    },
    "notes": [
      "Een aanbetaling van minder dan 20% leidt doorgaans tot Private Hypotheekverzekering (PMI) totdat 20% eigen vermogen is bereikt.",
      "Een hypotheek met een looptijd van 15 jaar heeft hogere maandelijkse betalingen, maar bespaart tienduizenden aan rente over de gehele looptijd vergeleken met een looptijd van 30 jaar.",
      "Onroerendezaakbelasting fluctueert op basis van gemeentelijke taxaties en heffingen van lokale schoolbesturen."
    ],
    "faqs": [
      {
        "question": "Wat is inbegrepen bij een maandelijkse hypotheekbetaling?",
        "answer": "Een standaard hypotheekbetaling omvat aflossing, rente, onroerendezaakbelasting en opstalverzekering (vaak aangeduid als PITI)."
      },
      {
        "question": "Waarom zou ik streven naar een aanbetaling van 20%?",
        "answer": "Een aanbetaling van minimaal 20% elimineert de noodzaak van Private Hypotheekverzekering (PMI), verlaagt uw rentetarief en vermindert uw maandelijkse schuldverplichting."
      },
      {
        "question": "Moet ik kiezen voor een hypotheek van 15 of 30 jaar?",
        "answer": "Een looptijd van 30 jaar biedt lagere, beter beheersbare maandelijkse betalingen. Een looptijd van 15 jaar heeft hogere maandelijkse betalingen, maar brengt aanzienlijk minder totale rente in rekening over de gehele looptijd van de lening."
      },
      {
        "question": "Zijn er naast de maandelijkse betaling nog andere kosten bij het kopen van een huis?",
        "answer": "Ja, naast de maandelijkse hypotheeklasten zijn er eenmalige kosten zoals overdrachtsbelasting, notariskosten, taxatiekosten en advieskosten voor de hypotheekadviseur. Deze kosten zijn niet inbegrepen in de maandelijkse berekening."
      }
    ],
    "breadcrumbName": "Hypotheekcalculator"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "nl",
    "name": "Samengestelde Rentecalculator",
    "category": "financial",
    "badge": "Vermogensgroei",
    "icon": "TrendingUp",
    "h1": "Samengestelde Rentecalculator",
    "seoTitle": "Samengestelde Rentecalculator – Bereken Online Uw Vermogensgroei",
    "seoDescription": "Gratis online samengestelde rentecalculator. Bereken de toekomstige waarde van uw beleggingen, de verdiende rente en de vermogensopbouw met maandelijkse of jaarlijkse bijdragen.",
    "primaryKeyword": "samengestelde rente calculator",
    "secondaryKeywords": [
      "samengestelde rente calculator maandelijks",
      "beleggingscalculator",
      "vermogensgroei calculator",
      "toekomstige waarde calculator",
      "spaarcalculator"
    ],
    "heroSubtitle": "Bereken de toekomstige vermogensopbouw, samengestelde renteopbrengsten en beleggingsgroei met regelmatige maandelijkse of jaarlijkse bijdragen.",
    "about": [
      "De Samengestelde Rentecalculator visualiseert de kracht van exponentiële financiële groei over tijd. Vaak omschreven als het \"achtste wereldwonder\", verwijst samengestelde rente naar het verdienen van rente niet alleen op uw initiële storting (hoofdsom), maar ook op de opgebouwde rente uit voorgaande perioden.",
      "Deze calculator stelt u in staat om pensioenrekeningen (zoals 401(k)s en IRA's), indexfondsen en vaste deposito's te modelleren met aanpasbare rentefrequenties (dagelijks, maandelijks, per kwartaal of jaarlijks) en terugkerende maandelijkse bijdragen."
    ],
    "formula": {
      "title": "Formule voor Samengestelde Rente met Regelmatige Bijdragen",
      "formulaText": "Future Value (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nTotal Interest = Future Value - (P + PMT × Total Periods)",
      "explanation": "P is de hoofdsom, r is de jaarlijkse nominale rentevoet, n is de rentefrequentie, t is de tijd in jaren, en PMT is de periodieke bijdrage.",
      "variables": [
        {
          "name": "P",
          "desc": "Initiële hoofdsom"
        },
        {
          "name": "r",
          "desc": "Jaarlijkse rentevoet in decimale vorm"
        },
        {
          "name": "n",
          "desc": "Aantal renteperioden per jaar (12 = maandelijks, 1 = jaarlijks)"
        },
        {
          "name": "PMT",
          "desc": "Periodieke terugkerende geldbijdrage"
        }
      ]
    },
    "howToCalculate": [
      "Voer uw startkapitaal (hoofdsom) in.",
      "Geef het verwachte jaarlijkse rentepercentage op.",
      "Voer de beleggingshorizon in jaren in.",
      "Geef optioneel een terugkerend maandelijks bijdragebedrag op.",
      "Klik op Berekenen om de toekomstige portfoliowaarde, de totale verdiende rente en de jaarlijkse groeitrends te zien."
    ],
    "example": {
      "problem": "Investeer $10,000 tegen een jaarlijks rendement van 8%, maandelijks samengesteld, gedurende 20 jaar met $200 extra per maand.",
      "steps": [
        "Stap 1: De initiële $10,000 groeit uit tot: $10,000 × (1 + 0.08/12)²⁴⁰ = $49,268.03.",
        "Stap 2: De maandelijkse bijdragen van $200 groeien uit tot: $200 × [((1 + 0.08/12)²⁴⁰ - 1) / (0.08/12)] = $117,804.09.",
        "Stap 3: Totale toekomstige portfoliowaarde = $49,268.03 + $117,804.09 = $167,072.12.",
        "Stap 4: Totaal gestort bedrag = $10,000 + ($200 × 240) = $58,000. Totaal verdiende rente = $109,072.12."
      ],
      "result": "De portefeuille groeit tot $167,072.12, waarvan $109,072.12 puur is gegenereerd uit samengestelde rente."
    },
    "notes": [
      "Tijd is de belangrijkste factor bij samengestelde rente: het verdubbelen van de looptijd verdrievoudigt vaak meer dan de beleggingsrendementen.",
      "Historisch gezien hebben brede aandelenmarktindexfondsen (zoals de S&P 500) gemiddeld ~10% jaarlijkse nominale rendementen behaald vóór inflatie.",
      "Echte vermogensgroei moet rekening houden met langetermijninflatie (~2-3% per jaar)."
    ],
    "faqs": [
      {
        "question": "Wat is samengestelde rente?",
        "answer": "Samengestelde rente is rente die wordt berekend over de initiële hoofdsom en ook over de opgebouwde rente uit voorgaande perioden, wat zorgt voor exponentiële groei."
      },
      {
        "question": "Hoe vaak wordt rente samengesteld op spaarrekeningen?",
        "answer": "De meeste moderne spaarrekeningen met hoge rente berekenen dagelijks rente en schrijven deze aan het einde van elke maand bij op uw saldo."
      },
      {
        "question": "Wat is de 72-regel?",
        "answer": "De 72-regel schat hoeveel jaar het duurt om uw geld te verdubbelen: deel 72 door uw jaarlijkse rentepercentage (bijv. bij 8% verdubbelt geld in ~9 jaar)."
      },
      {
        "question": "Waarom wordt samengestelde rente het 'achtste wereldwonder' genoemd?",
        "answer": "Albert Einstein zou samengestelde rente het 'achtste wereldwonder' hebben genoemd vanwege de immense kracht om vermogen te genereren over tijd. Het stelt uw opbrengsten in staat om verdere opbrengsten te genereren, wat leidt tot exponentiële groei."
      }
    ],
    "breadcrumbName": "Samengestelde Rentecalculator"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "nl",
    "name": "Enkelvoudige Rentecalculator",
    "category": "financial",
    "badge": "Lineaire Rente",
    "icon": "PiggyBank",
    "h1": "Enkelvoudige Rentecalculator",
    "seoTitle": "Enkelvoudige Rentecalculator – Bereken Enkelvoudige Rente & Eindbedrag",
    "seoDescription": "Gratis online enkelvoudige rente calculator. Bereken enkelvoudige rente en het totale eindbedrag met de klassieke I = P × R × T formule voor leningen en schuldbewijzen.",
    "primaryKeyword": "enkelvoudige rente calculator",
    "secondaryKeywords": [
      "formule enkelvoudige rente",
      "enkelvoudige rente berekenen",
      "lening enkelvoudige rente",
      "eindbedrag calculator",
      "I = PRT"
    ],
    "heroSubtitle": "Bereken de opbrengst van enkelvoudige rente en de totale eindbedragen met behulp van de fundamentele formule I = P × R × T.",
    "about": [
      "De Enkelvoudige Rentecalculator berekent lineaire rente op schuldbewijzen, kortlopende promesse leningen, depositocertificaten en academische financiële vraagstukken. In tegenstelling tot samengestelde rente, wordt bij enkelvoudige rente geen rente over rente berekend – de kosten worden strikt berekend over het oorspronkelijke hoofdbedrag.",
      "Deze berekening wordt vaak gebruikt bij kortlopende peer-to-peer leningen, pandhuis transacties, financieringsstructuren voor auto-afbetalingen en afbetalingsplannen voor consumentenelektronica."
    ],
    "formula": {
      "title": "Formule voor Enkelvoudige Rente",
      "formulaText": "Rente (I) = (Hoofdsom × Rentevoet × Tijd) / 100\nTotaal Eindbedrag (A) = Hoofdsom + Rente",
      "explanation": "Vermenigvuldig de oorspronkelijke hoofdsom met de jaarlijkse rentevoet en de tijdsduur in jaren, en deel vervolgens door 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Hoofdsom: oorspronkelijk geïnvesteerd of geleend bedrag"
        },
        {
          "name": "R",
          "desc": "Rentevoet: jaarlijks rentepercentage"
        },
        {
          "name": "T",
          "desc": "Tijd: tijdsduur in jaren"
        }
      ]
    },
    "howToCalculate": [
      "Voer het startbedrag van de hoofdsom in.",
      "Voer het jaarlijkse rentepercentage in.",
      "Voer de duur of looptijd van de lening in jaren in.",
      "Klik op Berekenen om de gegenereerde enkelvoudige rente en het totale terugbetalings- of eindbedrag te zien."
    ],
    "example": {
      "problem": "Bereken de enkelvoudige rente op een persoonlijke lening van $5,000 tegen 5.5% jaarlijkse rente over 3 jaar.",
      "steps": [
        "Stap 1: Identificeer variabelen: P = 5,000, R = 5.5, T = 3.",
        "Stap 2: Bereken de rente: I = (5,000 × 5.5 × 3) ÷ 100 = 82,500 ÷ 100 = $825.00.",
        "Stap 3: Totaalbedrag: $5,000 + $825 = $5,825.00."
      ],
      "result": "De verdiende enkelvoudige rente bedraagt $825.00, wat een totaal eindbedrag van $5,825.00 oplevert."
    },
    "notes": [
      "Als de tijd in maanden wordt gegeven, deel dan door 12 (bijv. 6 maanden = 0,5 jaar). Als deze in dagen wordt gegeven, deel dan door 365.",
      "Enkelvoudige rente levert minder totaal geld op dan samengestelde rente over identieke tijdsperioden.",
      "Formules voor enkelvoudige rente zijn de standaard bij commercial paper en schatkistpapier."
    ],
    "faqs": [
      {
        "question": "Wat is de formule voor enkelvoudige rente?",
        "answer": "De formule is I = P × R × T / 100, waarbij I staat voor Rente, P voor Hoofdsom, R voor de jaarlijkse rentevoet en T voor de tijd in jaren."
      },
      {
        "question": "Hoe verschilt enkelvoudige rente van samengestelde rente?",
        "answer": "Enkelvoudige rente wordt uitsluitend berekend over het oorspronkelijke hoofdbedrag. Samengestelde rente wordt berekend over zowel de hoofdsom als de reeds opgebouwde rente."
      },
      {
        "question": "Wanneer wordt enkelvoudige rente gebruikt?",
        "answer": "Enkelvoudige rente wordt doorgaans gebruikt voor kortlopende persoonlijke leningen, autofinanciering, renteopbouw op studieleningen tijdens aflossingsvrije periodes en commercial paper."
      },
      {
        "question": "Wat betekent 'eindbedrag' of 'maturity value'?",
        "answer": "Het eindbedrag (maturity value) is het totale bedrag dat aan het einde van de looptijd moet worden terugbetaald, inclusief de oorspronkelijke hoofdsom en de berekende enkelvoudige rente."
      }
    ],
    "breadcrumbName": "Enkelvoudige Rentecalculator"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "nl",
    "name": "GST Calculator",
    "category": "financial",
    "badge": "Belasting op Goederen en Diensten",
    "icon": "Receipt",
    "h1": "GST Calculator",
    "seoTitle": "GST Calculator – Bereken bedragen inclusief en exclusief GST",
    "seoDescription": "Gratis online GST calculator. Bereken prijzen inclusief en exclusief GST, de belastinguitsplitsing (CGST/SGST) en nettobedragen voor standaardtarieven (5%, 12%, 18%, 28%).",
    "primaryKeyword": "GST calculator",
    "secondaryKeywords": [
      "GST calculator India",
      "GST berekening",
      "GST berekenen",
      "GST inclusief calculator",
      "GST exclusief calculator",
      "omgekeerde GST calculator"
    ],
    "heroSubtitle": "Bereken de Belasting op Goederen en Diensten (GST) voor inclusieve en exclusieve transacties, splits CGST en SGST, en bepaal netto factuurprijzen.",
    "about": [
      "De Belasting op Goederen en Diensten (GST) Calculator automatiseert belastingfacturatie voor ondernemers, zzp'ers, accountants en consumenten. GST is een uitgebreide, op bestemming gebaseerde belasting over de toegevoegde waarde die wordt toegepast op de productie, verkoop en consumptie van goederen en diensten.",
      "Deze tool ondersteunt twee standaard commerciële modi: GST Exclusief (belasting toevoegen aan een basisprijs) en GST Inclusief (de basisprijs vóór belasting en het exacte belastingdeel terugrekenen vanuit een bruto verkoopprijs). Kies uit standaard GST-tariefgroepen (zoals 5%, 12%, 18%, 28%) of voer aangepaste tarieven in."
    ],
    "formula": {
      "title": "Formules voor GST Inclusief & Exclusief",
      "formulaText": "GST Exclusive (Add GST):\nGST Amount = Base Price × (GST Rate / 100)\nFinal Price = Base Price + GST Amount\n\nGST Inclusive (Remove GST):\nBase Price = Gross Amount / (1 + GST Rate / 100)\nGST Amount = Gross Amount - Base Price",
      "explanation": "Om GST toe te voegen, vermenigvuldig het basisbedrag met het tarief. Om GST uit een totaalbedrag te halen, deel het bruto bedrag door 1 plus het decimale tarief.",
      "variables": [
        {
          "name": "Basisprijs",
          "desc": "Nettoprijs van het product of de dienst vóór belasting"
        },
        {
          "name": "GST Tarief",
          "desc": "Toepasselijke wettelijke belastingpercentagegroep"
        },
        {
          "name": "CGST / SGST",
          "desc": "Centrale en Staats-GST componenten (elk gelijk aan 50% van de totale GST in India)"
        }
      ]
    },
    "howToCalculate": [
      "Voer het transactiebedrag in.",
      "Selecteer of de prijs GST Exclusief (belasting toevoegen) of GST Inclusief (belasting verwijderen) is.",
      "Selecteer een standaard belastingtarief (bijv. 5%, 12%, 18%, 28%) of voer een aangepast tarief in.",
      "Klik op Berekenen om de basisprijs vóór belasting, het GST-belastingdeel, de CGST/SGST-splitsing en de uiteindelijke factuurprijs te zien."
    ],
    "example": {
      "problem": "Bereken de kosten vóór belasting en het belastingbedrag van een artikel dat wordt verkocht voor ₹1,180 met een inclusief GST-tarief van 18%.",
      "steps": [
        "Step 1: Base Price = ₹1,180 ÷ (1 + 0.18) = ₹1,180 ÷ 1.18 = ₹1,000.00.",
        "Step 2: Total GST = ₹1,180 - ₹1,000 = ₹180.00.",
        "Step 3: CGST (9%) = ₹90.00, and SGST (9%) = ₹90.00."
      ],
      "result": "De netto basisprijs is ₹1,000.00 en de berekende GST-belasting is ₹180.00."
    },
    "notes": [
      "Voor intrastatelijke transacties in India wordt GST gelijk verdeeld over CGST (Centrale GST) en SGST (Staats-GST).",
      "Voor interstatelijke verkopen over staatsgrenzen heen wordt de gehele belasting aangeduid als IGST (Geïntegreerde GST).",
      "Selecteerbare standaard GST-tarieven omvatten 0%, 5%, 12%, 18% en 28%."
    ],
    "faqs": [
      {
        "question": "Hoe bereken je de GST inclusieve prijs?",
        "answer": "Deel de totale inclusieve prijs door (1 + GST Tarief / 100). Voor een GST-tarief van 18% deel je de totale prijs door 1.18 om de basisprijs vóór belasting te bepalen."
      },
      {
        "question": "Wat is het verschil tussen GST inclusief en exclusief?",
        "answer": "GST Exclusief betekent dat de belasting nog niet aan de prijs is toegevoegd. GST Inclusief betekent dat de vermelde prijs de belasting al omvat."
      },
      {
        "question": "Wat zijn CGST, SGST en IGST?",
        "answer": "In India gaat CGST naar de centrale overheid, SGST naar de deelstaatregering voor lokale verkopen, en IGST is van toepassing op verkopen over deelstaatgrenzen heen."
      },
      {
        "question": "Wat zijn de standaard GST-tarieven in India?",
        "answer": "De standaard GST-tarieven in India zijn 0%, 5%, 12%, 18% en 28%, afhankelijk van het type goederen of diensten."
      }
    ],
    "breadcrumbName": "GST Calculator"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "nl",
    "name": "Belastingcalculator",
    "category": "financial",
    "badge": "Inkomen & Aftrekposten",
    "icon": "Scale",
    "h1": "Belastingcalculator",
    "seoTitle": "Belastingcalculator – Schat Inkomstenbelasting & Netto Salaris",
    "seoDescription": "Gratis online inkomstenbelasting calculator. Schat uw belastbaar inkomen, federale belastingtarieven, effectieve belastingdruk en maandelijks netto salaris.",
    "primaryKeyword": "belastingcalculator",
    "secondaryKeywords": [
      "inkomstenbelasting calculator",
      "belasting schatten calculator",
      "inkomstenbelasting berekenen",
      "netto salaris calculator",
      "effectieve belastingdruk calculator"
    ],
    "heroSubtitle": "Schat uw belastbaar inkomen, belastingverplichting, effectieve belastingdruk en maandelijks netto salaris.",
    "about": [
      "De Inkomstenbelasting Calculator biedt een generieke progressieve belastingestimator om werknemers en zelfstandige professionals te helpen hun jaarlijkse belastingverplichting en netto-inkomsten te projecteren. Progressieve belastingstelsels passen hogere belastingpercentages alleen toe op inkomensdelen die specifieke schijfgrenzen overschrijden.",
      "Voer uw bruto jaarinkomen en toegestane aftrekposten in (zoals standaardaftrek, pensioenbijdragen of zorgkosten) om de geschatte belastingverplichtingen, marginale versus effectieve belastingtarieven en maandelijks netto salaris te bekijken."
    ],
    "formula": {
      "title": "Progressief Inkomstenbelastingkader",
      "formulaText": "Belastbaar Inkomen = Bruto Jaarinkomen - Aftrekposten\nBelasting = ∑ (Belastbaar Inkomen in Schijf × Schijftarief)\nEffectieve Belastingdruk = (Totale Belasting / Bruto Inkomen) × 100\nNetto Salaris = Bruto Inkomen - Totale Belasting",
      "explanation": "Aftrekposten verlagen uw belastbare basis. Belastingschijven worden stapsgewijs toegepast – inkomen wordt niet tegen één vast maximumtarief belast.",
      "variables": [
        {
          "name": "Bruto Inkomen",
          "desc": "Totaal inkomen vóór belasting uit dienstverband of onderneming"
        },
        {
          "name": "Aftrekposten",
          "desc": "Toegestane standaardaftrek of belastingvrije vrijstellingen"
        },
        {
          "name": "Effectieve Druk",
          "desc": "Het werkelijke gemiddelde percentage van het inkomen dat aan belasting wordt betaald"
        }
      ]
    },
    "howToCalculate": [
      "Voer uw totale Bruto Jaarinkomen in.",
      "Voer uw geschatte jaarlijkse Aftrekposten in (zoals de standaardaftrek of pensioenbesparingen).",
      "Klik op Berekenen om uw geschatte belastbaar inkomen, belastingverplichting, effectieve belastingdruk en maandelijks netto salaris te zien."
    ],
    "example": {
      "problem": "Schat de belasting voor een persoon die $85,000 verdient met een standaardaftrek van $14,600.",
      "steps": [
        "Stap 1: Belastbaar Inkomen = $85,000 - $14,600 = $70,400.",
        "Stap 2: 10% over de eerste $11,600 = $1,160.00.",
        "Stap 3: 12% over ($47,150 - $11,600 = $35,550) = $4,266.00.",
        "Stap 4: 22% over het resterende bedrag ($70,400 - $47,150 = $23,250) = $5,115.00.",
        "Stap 5: Totale geschatte belasting = $1,160 + $4,266 + $5,115 = $10,541.00.",
        "Stap 6: Effectieve belastingdruk = ($10,541 ÷ $85,000) × 100 = 12.40%."
      ],
      "result": "De geschatte inkomstenbelasting bedraagt $10,541.00 met een effectieve druk van 12.40% en een netto salaris van $74,459.00."
    },
    "notes": [
      "Deze tool biedt generieke informatieve schattingen en vervangt geen officieel advies van een gecertificeerde accountant of belastingadviseur.",
      "Staats-, provinciale, gemeentelijke belastingen en sociale zekerheids-/FICA-premies worden afzonderlijk berekend.",
      "Marginale belastingtarief verwijst naar het tarief dat wordt betaald over uw laatst verdiende dollar; effectieve belastingdruk is uw werkelijke gemiddelde belastinglast."
    ],
    "faqs": [
      {
        "question": "Wat is het verschil tussen marginale en effectieve belastingtarieven?",
        "answer": "Uw marginale belastingtarief is de hoogste belastingschijf die van toepassing is op uw laatst verdiende dollar. Uw effectieve belastingdruk is het werkelijke totale percentage van uw totale inkomen dat aan belasting wordt betaald."
      },
      {
        "question": "Hoe verlagen aftrekposten mijn belastingaanslag?",
        "answer": "Aftrekposten verlagen uw belastbaar inkomen. Bijvoorbeeld, een aftrek van $10,000 voor iemand in een belastingschijf van 22% verlaagt de daadwerkelijk verschuldigde belasting met $2,200."
      },
      {
        "question": "Omvat deze calculator staatsinkomstenbelastingen?",
        "answer": "Dit model berekent standaard progressieve schijven. Staats- en lokale belastingen variëren per jurisdictie en moeten aanvullend worden meegenomen."
      }
    ],
    "breadcrumbName": "Belastingcalculator"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "nl",
    "name": "Kortingscalculator",
    "category": "financial",
    "badge": "Aanbiedingen & Besparingen",
    "icon": "Tag",
    "h1": "Kortingscalculator",
    "seoTitle": "Kortingscalculator – Bereken Verkoopprijs en Percentage Korting",
    "seoDescription": "Gratis online kortingscalculator. Bereken direct de uiteindelijke verkoopprijzen, bespaard bedrag en percentage kortingen, met optionele btw-berekeningen.",
    "primaryKeyword": "kortingscalculator",
    "secondaryKeywords": [
      "percentage korting calculator",
      "verkoopprijs calculator",
      "kortingspercentage calculator",
      "hoeveel bespaar ik",
      "omgekeerde kortingscalculator"
    ],
    "heroSubtitle": "Bereken afgeprijsde verkoopprijzen, het totale bespaarde bedrag en de uiteindelijke kosten inclusief btw voor winkelen en retailpromoties.",
    "about": [
      "De Kortingscalculator helpt shoppers en detailhandelaren snel prijsverlagingen te berekenen tijdens uitverkoopacties (zoals Black Friday, Cyber Monday, seizoensopruimingen en promotiecoupons).",
      "Voer de oorspronkelijke prijs en het geadverteerde kortingspercentage in om direct te zien hoeveel geld u bespaart, de afgeprijsde prijs en de uiteindelijke afrekenprijs nadat de lokale btw is toegepast."
    ],
    "formula": {
      "title": "Formules voor Korting & Uiteindelijke Verkoopprijs",
      "formulaText": "Bespaard Bedrag = Oorspronkelijke Prijs × (Korting % / 100)\nAfgeprijsde Prijs = Oorspronkelijke Prijs - Bespaard Bedrag\nUiteindelijke Prijs met Btw = Afgeprijsde Prijs + (Afgeprijsde Prijs × Btw % / 100)",
      "explanation": "Vermenigvuldig de catalogusprijs met het kortingspercentage om de besparing te vinden, en trek dat bedrag vervolgens af van de oorspronkelijke prijs.",
      "variables": [
        {
          "name": "Oorspronkelijke Prijs",
          "desc": "Fabrieks- of winkelprijs vóór de uitverkoop"
        },
        {
          "name": "Korting %",
          "desc": "Geadverteerd percentage prijsvermindering"
        },
        {
          "name": "Btw %",
          "desc": "Optioneel staats- of lokaal btw-tarief"
        }
      ]
    },
    "howToCalculate": [
      "Voer de Oorspronkelijke Catalogusprijs in.",
      "Voer het Kortingspercentage in (bijv. 20% of 35% korting).",
      "Voer optioneel uw lokale btw-percentage in.",
      "Klik op Berekenen om uw exacte bespaarde bedrag en de uiteindelijke prijs te zien."
    ],
    "example": {
      "problem": "Een winterjas met een prijs van $180 is in de aanbieding met 30% korting, met een lokale btw van 8%.",
      "steps": [
        "Stap 1: Besparing = $180 × 0.30 = $54.00.",
        "Stap 2: Afgeprijsde prijs = $180 - $54.00 = $126.00.",
        "Stap 3: Btw = $126.00 × 0.08 = $10.08.",
        "Stap 4: Uiteindelijke afrekenprijs = $126.00 + $10.08 = $136.08."
      ],
      "result": "U bespaart $54.00. De jas kost $126.00 vóór btw en $136.08 na btw."
    },
    "notes": [
      "Een korting van 50% betekent dat u de helft van de oorspronkelijke prijs betaalt.",
      "Het stapelen van kortingen (bijv. 20% korting plus een extra 10% korting) is geen 30% korting – de tweede korting wordt toegepast op het reeds afgeprijsde subtotaal.",
      "Btw wordt berekend over de uiteindelijke afgeprijsde prijs, niet over de oorspronkelijke catalogusprijs."
    ],
    "faqs": [
      {
        "question": "Hoe berekent u 20% korting op een artikel?",
        "answer": "Vermenigvuldig de prijs met 0.20 om te vinden wat u bespaart, of vermenigvuldig de prijs met 0.80 om direct de uiteindelijke verkoopprijs te vinden."
      },
      {
        "question": "Hoe werkt een 'koop er één, krijg de tweede voor de helft van de prijs'-aanbieding in procenten?",
        "answer": "Als twee artikelen van gelijke prijs worden gekocht, komt een 'koop er één, krijg de tweede voor de helft'-korting neer op een totale korting van 25% over beide artikelen."
      },
      {
        "question": "Hoe bereken ik de oorspronkelijke prijs vanuit een verkoopprijs?",
        "answer": "Deel de verkoopprijs door (1 - Korting % / 100). Bijvoorbeeld, als een artikel $80 kost na 20% korting: $80 / 0.80 = $100 oorspronkelijke prijs."
      },
      {
        "question": "Wat is het verschil tussen een korting en een cashback?",
        "answer": "Een korting wordt direct van de prijs afgetrokken bij aankoop, waardoor u minder betaalt. Cashback is een bedrag dat u na de aankoop terugkrijgt, vaak via een aparte aanvraag of programma."
      }
    ],
    "breadcrumbName": "Kortingscalculator"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "nl",
    "name": "Winstmarge Calculator",
    "category": "financial",
    "badge": "Marge vs Opslag",
    "icon": "BarChart3",
    "h1": "Winstmarge Calculator",
    "seoTitle": "Winstmarge Calculator – Brutowinstmarge & Opslag Online Berekenen",
    "seoDescription": "Gratis online winstmarge calculator. Bereken de brutowinst, het winstmargepercentage en het opslagpercentage op basis van inkoopprijs en verkoopprijs.",
    "primaryKeyword": "winstmarge calculator",
    "secondaryKeywords": [
      "winst calculator",
      "marge calculator",
      "opslag calculator",
      "brutowinstmarge",
      "marge versus opslag"
    ],
    "heroSubtitle": "Bereken de brutowinst, het winstmargepercentage en het opslagpercentage om producten winstgevend te prijzen.",
    "about": [
      "De Winstmarge Calculator helpt ondernemers, retailers, dropshippers en eigenaren van kleine bedrijven om de winstgevendheid nauwkeurig te bepalen en onderscheid te maken tussen Marge en Opslag. Het verwarren van deze twee metrics is een van de meest voorkomende prijsfouten in de handel.",
      "De Brutowinstmarge geeft aan welk percentage van de totale omzet overblijft na aftrek van de Kosten van Verkochte Goederen (KVG). Opslag weerspiegelt de procentuele verhoging die wordt toegepast op de basiskosten om de verkoopprijs vast te stellen."
    ],
    "formula": {
      "title": "Formules voor Brutomarge en Opslag",
      "formulaText": "Gross Profit = Revenue - Cost\nProfit Margin (%) = (Gross Profit / Revenue) × 100\nMarkup (%) = (Gross Profit / Cost) × 100",
      "explanation": "Marge wordt berekend ten opzichte van de omzet (verkoopprijs), terwijl opslag wordt berekend ten opzichte van de productkosten.",
      "variables": [
        {
          "name": "Kosten",
          "desc": "Kosten van Verkochte Goederen (KVG) om de eenheid aan te schaffen of te produceren"
        },
        {
          "name": "Omzet",
          "desc": "Verkoopprijs die aan de consument wordt berekend"
        },
        {
          "name": "Brutowinst",
          "desc": "Netto omzet die overblijft na aftrek van directe productiekosten"
        }
      ]
    },
    "howToCalculate": [
      "Voer de Kosten in om het product aan te schaffen of te produceren (bijv. $40).",
      "Voer de Omzet of de gewenste Verkoopprijs in (bijv. $100).",
      "Klik op Berekenen om de brutowinst in dollars, het winstmargepercentage en het benodigde opslagpercentage te zien."
    ],
    "example": {
      "problem": "Een bedrijf koopt een artikel voor $50 en verkoopt het voor $80. Wat zijn de brutowinst, winstmarge en opslag?",
      "steps": [
        "Stap 1: Brutowinst = $80 (Omzet) - $50 (Kosten) = $30.00.",
        "Stap 2: Winstmarge = ($30 ÷ $80) × 100 = 37.5%.",
        "Stap 3: Opslag = ($30 ÷ $50) × 100 = 60.0%."
      ],
      "result": "De brutowinst is $30.00. De winstmarge is 37.5%, en de opslag is 60.0%."
    },
    "notes": [
      "Marge kan nooit meer dan 100% bedragen, terwijl opslag 200%, 500% of hoger kan zijn.",
      "Een opslag van 50% komt overeen met een marge van 33.3%. Een opslag van 100% komt overeen met een marge van 50%.",
      "De nettowinstmarge trekt naast de directe productiekosten ook overhead, marketing en belastingen af."
    ],
    "faqs": [
      {
        "question": "Wat is het belangrijkste verschil tussen marge en opslag?",
        "answer": "Marge is winst gedeeld door verkoopprijs (omzet). Opslag is winst gedeeld door kosten. Marge meet wat u overhoudt van de verkoop; opslag meet wat u toevoegt aan de kosten."
      },
      {
        "question": "Waarom is opslag altijd hoger dan marge voor hetzelfde artikel?",
        "answer": "Omdat de kosten altijd lager zijn dan de verkoopprijs voor winstgevende goederen. Het delen van dezelfde winst door de lagere kosten levert een hoger percentage op dan het delen door de omzet."
      },
      {
        "question": "Wat is een goede winstmarge voor detailhandelsbedrijven?",
        "answer": "Een gezonde brutowinstmarge varieert doorgaans van 40% tot 60% voor detailhandel en e-commerce, terwijl nettowinstmarges doorgaans variëren van 10% tot 20%."
      },
      {
        "question": "Waarom zijn winstmarge en opslag belangrijk voor mijn bedrijf?",
        "answer": "Deze metrics zijn cruciaal voor het bepalen van de prijsstrategie, het beoordelen van de financiële gezondheid van producten en het nemen van weloverwogen beslissingen over inkoop en verkoop. Ze helpen u te begrijpen hoe efficiënt uw bedrijf is in het omzetten van kosten in winst."
      }
    ],
    "breadcrumbName": "Winstmarge Calculator"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "nl",
    "name": "Salariscalculator",
    "category": "financial",
    "badge": "Per uur, Maandelijks & Jaarlijks",
    "icon": "Wallet",
    "h1": "Salariscalculator",
    "seoTitle": "Salariscalculator – Converteer Uurloon, Wekelijks, Maandelijks & Jaarlijks Salaris",
    "seoDescription": "Gratis online salariscalculator. Converteer tussen uurloon, weekloon, tweewekelijks salaris, maandelijks inkomen en jaarlijkse vergoeding met aangepaste werkuren.",
    "primaryKeyword": "salariscalculator",
    "secondaryKeywords": [
      "jaarsalaris calculator",
      "maandsalaris calculator",
      "uurloon calculator",
      "uurloon naar salaris omrekenen",
      "looncalculator"
    ],
    "heroSubtitle": "Converteer vergoedingen tussen jaarsalaris, maandelijks loon, tweewekelijkse betalingen en uurloon tarieven.",
    "about": [
      "De Salariscalculator converteert arbeidsvergoedingen over alle standaard salarisfrequenties: jaarsalaris, maandelijkse inkomsten, tweewekelijkse salarisbetalingen, weeklonen, dagtarieven en uurloon.",
      "Of u nu onderhandelt over een baan aanbod, een aannemerstarief van $30/uur omzet naar een jaarlijks equivalent, of een budget opstelt voor maandelijkse levenskosten, deze calculator biedt directe, gestandaardiseerde salarisconversies op basis van uw wekelijkse werkuren."
    ],
    "formula": {
      "title": "Standaard Salarisconversiestandaarden",
      "formulaText": "Jaarsalaris = Uurloon × Uren/Week × Weken/Jaar\nMaandsalaris = Jaarsalaris / 12\nTweewekelijkse Betaling = Jaarsalaris / 26\nWeekloon = Jaarsalaris / 52\nUurloon = Jaarsalaris / (Uren/Week × Weken/Jaar)",
      "explanation": "Gebaseerd op een standaard werkweek van 40 uur en 52 werkweken per jaar (2.080 jaarlijkse werkuren).",
      "variables": [
        {
          "name": "Standaard Uren",
          "desc": "40 uur per week"
        },
        {
          "name": "Standaard Weken",
          "desc": "52 weken per kalenderjaar (totaal 2.080 werkuren)"
        }
      ]
    },
    "howToCalculate": [
      "Voer uw Vergoedingsbedrag in.",
      "Selecteer de betalingsfrequentie: Jaarlijks, Maandelijks, Tweewekelijks, Wekelijks, Dagelijks of Per uur.",
      "Pas de werkuren per week aan (standaard 40) of werkweken per jaar (standaard 52).",
      "Klik op Berekenen om een complete conversietabel voor alle betaalperioden te zien."
    ],
    "example": {
      "problem": "Converteer een jaarsalaris van $75.000 naar maandelijkse, tweewekelijkse, wekelijkse en uurlijkse betaling (40 uur/week, 52 weken).",
      "steps": [
        "Stap 1: Maandelijkse Betaling = $75.000 ÷ 12 = $6.250,00.",
        "Stap 2: Tweewekelijkse Betaling (26 betaalperioden) = $75.000 ÷ 26 = $2.884,62.",
        "Stap 3: Wekelijkse Betaling = $75.000 ÷ 52 = $1.442,31.",
        "Stap 4: Uurloon = $75.000 ÷ 2.080 uur = $36,06/uur."
      ],
      "result": "Een salaris van $75.000 is gelijk aan $6.250/maand, $2.884,62 tweewekelijks en $36,06 per uur."
    },
    "notes": [
      "Berekeningen weerspiegelen het bruto inkomen vóór belastingen, voorafgaand aan federale, staats- en wettelijke inhoudingen voor uitkeringen.",
      "Tweewekelijkse betaling vindt 26 keer per jaar plaats (wat resulteert in twee maanden per jaar met drie salarisbetalingen). Halfmaandelijkse betaling vindt 24 keer per jaar plaats.",
      "Voor freelance aannemers, houd rekening met zelfstandigenaftrek en onbetaalde vakantieweken."
    ],
    "faqs": [
      {
        "question": "Hoe converteer je uurloon naar jaarsalaris?",
        "answer": "Vermenigvuldig uw uurloon met de gewerkte uren per week en vermenigvuldig dit vervolgens met 52 weken. Voor een fulltime schema van 40 uur, vermenigvuldig het uurtarief met 2.080."
      },
      {
        "question": "Wat is het verschil tussen tweewekelijkse en halfmaandelijkse betaling?",
        "answer": "Tweewekelijkse betaling vindt elke twee weken plaats (26 salarisbetalingen/jaar). Halfmaandelijkse betaling vindt twee keer per maand plaats op specifieke data zoals de 1e en de 15e (24 salarisbetalingen/jaar)."
      },
      {
        "question": "Hoeveel werkuren zitten er in een standaard werkjaar?",
        "answer": "Een standaard fulltime werknemer die 40 uur per week werkt gedurende 52 weken, werkt in totaal 2.080 uur per jaar."
      },
      {
        "question": "Is deze calculator geschikt voor bruto of netto salaris?",
        "answer": "Deze calculator berekent het bruto (vóór belasting) inkomen. Om uw nettosalaris te bepalen, moet u belastingen en andere inhoudingen aftrekken die van toepassing zijn in uw land of regio."
      }
    ],
    "breadcrumbName": "Salariscalculator"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "nl",
    "name": "Valutacalculator",
    "category": "financial",
    "badge": "Wisselkoersen & Forex",
    "icon": "Coins",
    "h1": "Valutacalculator",
    "seoTitle": "Valutacalculator – Wisselkoersconverter & Live Koersen",
    "seoDescription": "Gratis online valutacalculator. Converteer tussen USD, EUR, GBP, INR, CAD, AUD, JPY en belangrijke wereldvaluta's met interbancaire wisselkoersen.",
    "primaryKeyword": "valutacalculator",
    "secondaryKeywords": [
      "valuta omrekenen",
      "wisselkoers calculator",
      "USD naar INR calculator",
      "EUR naar USD calculator",
      "vreemde valuta calculator"
    ],
    "heroSubtitle": "Converteer bedragen tussen wereldwijde valuta's met transparante benchmark interbancaire wisselkoersen.",
    "about": [
      "De Valutacalculator biedt betrouwbare omrekeningen van vreemde valuta tussen belangrijke wereldvaluta's, waaronder de Amerikaanse Dollar (USD), Euro (EUR), Britse Pond (GBP), Indiase Roepie (INR), Canadese Dollar (CAD), Australische Dollar (AUD), Japanse Yen (JPY) en Zwitserse Frank (CHF).",
      "Of u nu een budget opstelt voor een buitenlandse reis, internationale freelance facturen omrekent, of internationale e-commerce prijzen vergelijkt, deze tool converteert waarden met behulp van standaard mid-market interbancaire benchmarkkoersen."
    ],
    "formula": {
      "title": "Valutawisselkoersconversie",
      "formulaText": "Target Amount = Base Amount × Direct Exchange Rate (From Currency ⟶ To Currency)\nInverse Rate = 1 / Direct Exchange Rate",
      "explanation": "Converteert de bronvaluta naar het USD-equivalent als basislijn, en schaalt vervolgens met de wisselkoersvermenigvuldiger van de doelvaluta.",
      "variables": [
        {
          "name": "Basisbedrag",
          "desc": "Het te converteren geldbedrag"
        },
        {
          "name": "Directe Koers",
          "desc": "De prijs van één eenheid bronvaluta uitgedrukt in de doelvaluta"
        },
        {
          "name": "Inverse Koers",
          "desc": "De wederkerige prijs van de doelvaluta uitgedrukt in de bronvaluta"
        }
      ]
    },
    "howToCalculate": [
      "Voer het te converteren geldbedrag in.",
      "Selecteer de bronvaluta (bijv. USD, EUR, GBP).",
      "Selecteer de doelvaluta (bijv. INR, CAD, AUD).",
      "Klik op Berekenen om het geconverteerde bedrag, de huidige benchmark wisselkoers en de omgekeerde conversiekoers te zien."
    ],
    "example": {
      "problem": "Converteer $500 USD naar Euro's (EUR) tegen een illustratieve referentiewisselkoers van 1 USD = 0.8950 EUR.",
      "steps": [
        "Stap 1: Basisbedrag = 500 USD.",
        "Stap 2: Vermenigvuldig met de wisselkoers: 500 × 0.8950 = 447.50 EUR.",
        "Stap 3: Inverse koers = 1 ÷ 0.8950 = 1.1173 USD per 1 EUR."
      ],
      "result": "$500 USD converteert naar 447.50 EUR tegen een illustratieve referentiewisselkoers van 0.8950."
    },
    "notes": [
      "Wisselkoersen weerspiegelen interbancaire mid-market koersen; consumentenbanken en retailkaarten kunnen een extra 1,5% tot 3,5% transactiekosten voor buitenlandse valuta in rekening brengen.",
      "Wisselkoersen fluctueren continu tijdens de openingstijden van de wereldwijde forexmarkten.",
      "Benchmarkkoersen worden regelmatig bijgewerkt op basis van interbancaire referentiefeeds."
    ],
    "faqs": [
      {
        "question": "Wat is de mid-market wisselkoers?",
        "answer": "De mid-market koers is het middenpunt tussen de wereldwijde koop- en verkoopkoersen op de forexmarkten. Het vertegenwoordigt de meest eerlijke koers, zonder opslag."
      },
      {
        "question": "Waarom verschillen retail wisselkoersen van online converters?",
        "answer": "Commerciële banken en wisselkantoren op luchthavens passen een opslag of commissie toe om winst te maken op valutaconversietransacties."
      },
      {
        "question": "Kan ik de omgekeerde conversiekoers berekenen?",
        "answer": "Ja. De calculator toont de wederkerige inverse koers (bijv. 1 INR = 0.012 USD) naast het primaire conversieresultaat."
      },
      {
        "question": "Hoe vaak worden de wisselkoersen bijgewerkt?",
        "answer": "De wisselkoersen op deze calculator worden regelmatig bijgewerkt op basis van interbancaire referentiefeeds. Dit zorgt ervoor dat u altijd met de meest actuele benchmarkkoersen werkt, hoewel live koersen continu fluctueren tijdens handelsuren."
      }
    ],
    "breadcrumbName": "Valutacalculator"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "nl",
    "name": "Percentage Calculator",
    "category": "math",
    "badge": "Snelle Wiskundetool",
    "icon": "Percent",
    "h1": "Percentage Calculator",
    "seoTitle": "Percentage Calculator – Bereken Eenvoudig Percentages Online",
    "seoDescription": "Gratis online percentage calculator. Bereken direct het percentage van een getal, procentuele verandering, toename, afname en procentuele verschillen met formules.",
    "primaryKeyword": "percentage calculator",
    "secondaryKeywords": [
      "percentage berekenen",
      "procent calculator",
      "percentage toename calculator",
      "percentage afname calculator",
      "percentage verschil"
    ],
    "heroSubtitle": "Bereken percentages van waarden, procentuele toe- en afname, of ontdek welk percentage het ene getal van het andere is met directe wiskundige precisie.",
    "about": [
      "De Percentage Calculator is een veelzijdige online tool ontworpen voor studenten, shoppers, accountants en analisten die snelle, foutloze percentageberekeningen nodig hebben. Percentages vertegenwoordigen breuken van 100 en vormen de ruggengraat van alledaagse kwantitatieve taken – van het berekenen van verkoopkortingen en winkelmarges tot het analyseren van financiële beleggingsrendementen en examenresultaten.",
      "Deze tool ondersteunt vier essentiële berekeningsmodi: het vinden van een percentage van een totaal, berekenen welk percentage het ene getal van het andere vertegenwoordigt, het berekenen van de procentuele toe- of afname tussen twee getallen, en het bepalen van het relatieve percentageverschil tussen twee onafhankelijke waarden."
    ],
    "formula": {
      "title": "Standaard Percentage Formules",
      "formulaText": "Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100",
      "explanation": "Om te berekenen welk deel van een geheel een hoeveelheid vertegenwoordigt, deel je het deel door het totaal en vermenigvuldig je met 100. Voor procentuele veranderingen deel je de absolute toe- of afname door de oorspronkelijke beginwaarde.",
      "variables": [
        {
          "name": "Part",
          "desc": "De te evalueren portie of deelwaarde"
        },
        {
          "name": "Whole",
          "desc": "De basis- of totale referentiehoeveelheid"
        },
        {
          "name": "Old Value",
          "desc": "De oorspronkelijke beginhoeveelheid vóór de verandering"
        },
        {
          "name": "New Value",
          "desc": "De bijgewerkte hoeveelheid na de verandering"
        }
      ]
    },
    "howToCalculate": [
      "Selecteer de percentageberekeningsmodus die bij uw vraag past (bijv. \"Wat is X% van Y\" of \"Procentuele Verandering\").",
      "Voer uw bekende numerieke waarden in de daarvoor bestemde invoervelden in.",
      "Bekijk het realtime berekende resultaat, de geformatteerde formule en de fractionele uitsplitsing hieronder.",
      "Gebruik de Kopieer-knop om uw resultaat snel te exporteren of Reset om een nieuwe berekening uit te voeren."
    ],
    "example": {
      "problem": "Wat is 15% van $240, en wat is de procentuele toename van $200 naar $250?",
      "steps": [
        "Stap 1 (Percentage van waarde): (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Stap 2 (Procentuele toename): Verschil = 250 - 200 = 50.",
        "Stap 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% toename."
      ],
      "result": "15% van 240 is 36. Een toename van 200 naar 250 is een winst van 25%."
    },
    "notes": [
      "Procentuele verandering deelt altijd door het oorspronkelijke startgetal, niet door het eindgetal.",
      "Een procentuele toename gevolgd door een equivalente procentuele afname keert niet terug naar de oorspronkelijke waarde (bijv. +50% en daarna -50% levert 75% van de basislijn op).",
      "Om een decimaal naar een percentage om te zetten, vermenigvuldig je met 100 (bijv. 0.85 = 85%). Om een percentage naar een decimaal om te zetten, deel je door 100."
    ],
    "faqs": [
      {
        "question": "Hoe bereken ik een percentage van een getal?",
        "answer": "Om een percentage van een getal te berekenen, zet je het percentage om in een decimaal door het te delen door 100, en vermenigvuldig je dat decimaal vervolgens met het totale getal. Bijvoorbeeld, 20% van 150 is (20 / 100) × 150 = 30."
      },
      {
        "question": "Hoe bereken ik de procentuele toename tussen twee getallen?",
        "answer": "Trek de oorspronkelijke waarde af van de nieuwe waarde om het verschil te vinden. Deel dat verschil vervolgens door de oorspronkelijke waarde en vermenigvuldig met 100. Bijvoorbeeld, van 50 naar 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% toename."
      },
      {
        "question": "Wat is het verschil tussen procentuele verandering en procentueel verschil?",
        "answer": "Procentuele verandering wordt gebruikt wanneer er een 'oude' en 'nieuwe' waarde over tijd is, waarbij gedeeld wordt door de initiële waarde. Procentueel verschil wordt gebruikt bij het vergelijken van twee gelijktijdige waarden waarbij geen van beide de benchmark is, door het absolute verschil te delen door hun gemiddelde."
      },
      {
        "question": "Kan een procentuele verandering negatief zijn?",
        "answer": "Ja. Als de uiteindelijke waarde kleiner is dan de initiële waarde, is de procentuele verandering negatief, wat een procentuele afname vertegenwoordigt."
      }
    ],
    "breadcrumbName": "Percentage Calculator"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "nl",
    "name": "Verhoudingscalculator",
    "category": "math",
    "badge": "Verhoudingen & Vereenvoudiging",
    "icon": "Divide",
    "h1": "Verhoudingscalculator",
    "seoTitle": "Verhoudingscalculator – Vereenvoudig en Los Verhoudingen Online Op",
    "seoDescription": "Gratis online verhoudingscalculator. Vereenvoudig verhoudingen tot de eenvoudigste termen, vind ontbrekende termen in proporties (A:B = C:D) en bereken direct schaalfactoren.",
    "primaryKeyword": "verhoudingscalculator",
    "secondaryKeywords": [
      "verhouding vereenvoudigen",
      "verhoudingen vereenvoudigen",
      "gelijkwaardige verhoudingscalculator",
      "proportie oplossen",
      "beeldverhouding calculator"
    ],
    "heroSubtitle": "Vereenvoudig tweedelige verhoudingen tot de eenvoudigste gehele getallen, genereer equivalente breuken en los direct ontbrekende proportievariabelen op.",
    "about": [
      "De Verhoudingscalculator stelt u in staat om verhoudingen te vereenvoudigen tot hun laagste gehele getallen, decimale verhoudingen om te zetten naar zuivere gehele proporties, en equivalente proportievergelijkingen van de vorm A : B = C : D op te lossen.",
      "Verhoudingen drukken de relatieve grootte van twee of meer hoeveelheden uit. Ze zijn alomtegenwoordig bij het schalen van recepten, beeldverhoudingen in grafisch ontwerp (zoals 16:9 en 4:3), financiële balansstatistieken (current ratio, schuld-eigen vermogen) en chemische oplossingsmengsels."
    ],
    "formula": {
      "title": "Formules voor Verhoudingsvereenvoudiging & Proporties",
      "formulaText": "Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C",
      "explanation": "Om een verhouding te vereenvoudigen, deelt u beide termen door hun Grootste Gemene Deler (GGD). Bij proporties maakt kruisvermenigvuldiging het mogelijk om elke ontbrekende variabele op te lossen.",
      "variables": [
        {
          "name": "A & B",
          "desc": "Eerste antecedent en consequent van de verhouding"
        },
        {
          "name": "C & D",
          "desc": "Tweede antecedent en consequent van de equivalente proportie"
        },
        {
          "name": "GGD",
          "desc": "Grootste Gemene Deler tussen de getallen"
        }
      ]
    },
    "howToCalculate": [
      "Om een verhouding te vereenvoudigen, voert u de getallen A en B in en bekijkt u de onherleidbare gehele verhouding.",
      "Om een proportie A:B = C:D op te lossen, voert u drie bekende waarden in en laat u het doelveld leeg.",
      "De calculator voert kruisvermenigvuldiging uit en herleidt termen onmiddellijk."
    ],
    "example": {
      "problem": "Vereenvoudig de verhouding 24 : 36, en los X op in 4 : 5 = X : 25.",
      "steps": [
        "Stap 1 (Vereenvoudiging): Zoek de GGD(24, 36) = 12.",
        "Stap 2: 24 ÷ 12 = 2, en 36 ÷ 12 = 3. De vereenvoudigde verhouding is 2 : 3.",
        "Stap 3 (Proportie): 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 wordt vereenvoudigd tot 2:3. In 4:5 = X:25 is X gelijk aan 20."
    },
    "notes": [
      "Beide zijden van een verhouding kunnen worden vermenigvuldigd of gedeeld door hetzelfde niet-nul getal zonder de waarde ervan te veranderen.",
      "Decimale verhoudingen worden automatisch vermenigvuldigd met machten van 10 vóór vereenvoudiging om gehele getallen als uitvoer te garanderen.",
      "Verhoudingen vertegenwoordigen vergelijkende relaties, geen absolute hoeveelheden. Een verhouding van 2:3 kan 2 en 3 items beschrijven, of 200 en 300 items."
    ],
    "faqs": [
      {
        "question": "Hoe vereenvoudig je een verhouding tot de eenvoudigste termen?",
        "answer": "Zoek de Grootste Gemene Deler (GGD) van beide getallen en deel vervolgens beide getallen door die GGD. Bijvoorbeeld, in 15:25 is de GGD 5, dus door beide te delen door 5 krijg je 3:5."
      },
      {
        "question": "Hoe los je een proportie op als één getal onbekend is?",
        "answer": "Gebruik kruisvermenigvuldiging: als A/B = C/D, dan is A × D = B × C. Vermenigvuldig de diagonale getallen en deel door het resterende getal tegenover het onbekende."
      },
      {
        "question": "Kunnen verhoudingen decimalen of breuken bevatten?",
        "answer": "Hoewel verhoudingen aanvankelijk met decimalen kunnen worden geschreven (bijv. 1.5 : 2.5), is de standaardconventie om ze uit te drukken met positieve gehele getallen door beide termen te schalen."
      },
      {
        "question": "Waarom zijn verhoudingen belangrijk in het dagelijks leven?",
        "answer": "Verhoudingen helpen ons om de relatieve grootte van verschillende hoeveelheden te begrijpen. Ze worden gebruikt in recepten (bijv. 2 kopjes bloem op 1 kopje water), kaarten (schaal 1:10.000), financiën (schuld-eigen vermogen verhouding) en zelfs bij het mengen van brandstof voor motoren."
      }
    ],
    "breadcrumbName": "Verhoudingscalculator"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "nl",
    "name": "Breukenrekenmachine",
    "category": "math",
    "badge": "Breukbewerkingen",
    "icon": "Binary",
    "h1": "Breukenrekenmachine",
    "seoTitle": "Breukenrekenmachine – Breuken Optellen, Aftrekken, Vermenigvuldigen & Delen",
    "seoDescription": "Gratis online breukenrekenmachine. Tel eenvoudig breuken op, trek ze af, vermenigvuldig en deel echte, onechte en gemengde breuken met stap-voor-stap reductie naar de eenvoudigste vorm.",
    "primaryKeyword": "breukenrekenmachine",
    "secondaryKeywords": [
      "breuken optellen",
      "breuken vereenvoudigen",
      "breuken aftrekken",
      "breuken vermenigvuldigen",
      "breuken delen",
      "gemengde breuken rekenmachine"
    ],
    "heroSubtitle": "Tel breuken en gemengde getallen op, trek ze af, vermenigvuldig en deel ze met automatische vereenvoudiging, gelijke noemers en decimale conversie.",
    "about": [
      "De Breukenrekenmachine biedt complete stap-voor-stap oplossingen voor het optellen, aftrekken, vermenigvuldigen en delen van wiskundige breuken. Het verwerkt echte breuken (teller < noemer), onechte breuken (teller > noemer) en gemengde getallen.",
      "Of u nu huiswerk controleert, culinaire recepten schaalt of technische metingen berekent, deze tool reduceert resultaten tot hun eenvoudigste onherleidbare vorm en toont het decimale equivalent."
    ],
    "formula": {
      "title": "Regels voor Breukrekenen",
      "formulaText": "Optellen: (a/b) + (c/d) = (ad + bc) / bd\nAftrekken: (a/b) - (c/d) = (ad - bc) / bd\nVermenigvuldigen: (a/b) × (c/d) = (ac) / (bd)\nDelen: (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "Voor optellen en aftrekken, converteer naar een gelijke noemer voordat u de tellers combineert. Voor vermenigvuldiging, vermenigvuldig de tellers met elkaar en de noemers met elkaar. Voor deling, vermenigvuldig met het omgekeerde van de tweede breuk.",
      "variables": [
        {
          "name": "a & c",
          "desc": "Tellers (bovenste getallen van de breuken)"
        },
        {
          "name": "b & d",
          "desc": "Noemers (onderste getallen, mogen niet nul zijn)"
        }
      ]
    },
    "howToCalculate": [
      "Voer de teller en noemer in voor uw eerste breuk.",
      "Selecteer de rekenkundige bewerking: Optellen (+), Aftrekken (-), Vermenigvuldigen (×) of Delen (÷).",
      "Voer de teller en noemer in voor uw tweede breuk.",
      "Klik op Berekenen om de vereenvoudigde breuk, het gemengde getal en de decimale weergave te zien."
    ],
    "example": {
      "problem": "Bereken 3/4 + 2/3.",
      "steps": [
        "Stap 1: De gemeenschappelijke noemer is 4 × 3 = 12.",
        "Stap 2: Converteer tellers: (3 × 3) / 12 = 9/12, en (2 × 4) / 12 = 8/12.",
        "Stap 3: Tel tellers op: 9/12 + 8/12 = 17/12.",
        "Stap 4: Converteer onechte breuk naar gemengd getal: 17 ÷ 12 = 1 met een rest van 5, wat 1 5/12 oplevert (ongeveer 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, wat gelijk is aan 1 5/12 of 1.4167."
    },
    "notes": [
      "Een noemer kan nooit nul zijn, omdat delen door nul wiskundig ongedefinieerd is.",
      "Negatieve breuken worden gestandaardiseerd met het minteken in de teller (bijv. -3/4).",
      "De rekenmachine vindt automatisch de Grootste Gemene Deler om resultaten tot de eenvoudigste vorm te reduceren."
    ],
    "faqs": [
      {
        "question": "Hoe tel je breuken met verschillende noemers op?",
        "answer": "Zoek een gemeenschappelijke noemer (vaak door de twee noemers met elkaar te vermenigvuldigen), pas beide tellers dienovereenkomstig aan, tel de tellers bij elkaar op en vereenvoudig de resulterende breuk."
      },
      {
        "question": "Hoe deel je twee breuken?",
        "answer": "Om breuken te delen, vermenigvuldig je de eerste breuk met het omgekeerde (de omgedraaide vorm) van de tweede breuk. Bijvoorbeeld, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "Wat is een gemengd getal?",
        "answer": "Een gemengd getal bestaat uit een heel getal gecombineerd met een echte breuk, zoals 2 1/2, wat 2 + 1/2 (of 5/2 als een onechte breuk) voorstelt."
      }
    ],
    "breadcrumbName": "Breukenrekenmachine"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "nl",
    "name": "Leeftijdscalculator",
    "category": "time-date",
    "badge": "Exacte Leeftijd & Dagen",
    "icon": "Calendar",
    "h1": "Leeftijdscalculator",
    "seoTitle": "Leeftijdscalculator – Bereken Uw Exacte Leeftijd op Basis van Geboortedatum",
    "seoDescription": "Gratis online leeftijdscalculator. Vind uw exacte leeftijd in jaren, maanden, weken, dagen en uren, vanaf uw geboortedatum tot vandaag of een willekeurige doeldatum.",
    "primaryKeyword": "leeftijd berekenen",
    "secondaryKeywords": [
      "hoe oud ben ik",
      "leeftijd berekenen geboortedatum",
      "verjaardagscalculator",
      "chronologische leeftijd berekenen"
    ],
    "heroSubtitle": "Bereken uw exacte leeftijd in jaren, maanden, dagen, uren en vind het aftellen naar uw volgende verjaardag met kalenderprecisie.",
    "about": [
      "De Leeftijdscalculator berekent uw precieze chronologische leeftijd op basis van uw geboortedatum. Waar de conventionele leeftijd eenvoudigweg in jaren wordt uitgedrukt, splitst deze calculator uw levensduur op in exacte jaren, kalendermaanden en resterende dagen, rekening houdend met schrikkeljaren en variërende maandlengtes.",
      "Naast de huidige leeftijd stelt de tool u in staat om de leeftijd te meten op elke gespecificeerde datum in het verleden of de toekomst – handig voor schooltoelatingen, wettelijke leeftijdsverificaties, pensioenmijlpalen en paspoort- of visumaanvragen."
    ],
    "formula": {
      "title": "Methode voor Chronologische Leeftijdsberekening",
      "formulaText": "Jaren = Doeljaar - Geboortejaar (aangepast voor maand/dag)\nMaanden = Doelmaand - Geboortemaand (aangepast voor dag)\nDagen = Doeldag - Geboortedag (dagen lenen van vorige maand indien negatief)",
      "explanation": "Kalender-nauwkeurige leeftijdsberekening houdt rekening met verschillende maandduren (28 tot 31 dagen) en vierjaarlijkse schrikkeljaren, wat dag-tot-dag precisie garandeert.",
      "variables": [
        {
          "name": "Geboortedatum",
          "desc": "De startdatum van de geboorte"
        },
        {
          "name": "Doeldatum",
          "desc": "De referentiedatum van de evaluatie (standaard is vandaag)"
        }
      ]
    },
    "howToCalculate": [
      "Voer uw geboortedatum in met behulp van de dag-, maand- en jaarselectoren.",
      "Geef optioneel een doeldatum voor de evaluatie op (standaard is de datum van vandaag).",
      "Klik op Berekenen om uw exacte leeftijd in jaren, maanden en dagen te zien.",
      "Ontdek samenvattingen van de totale levensduur in maanden, weken, dagen en het aftellen naar uw volgende verjaardag."
    ],
    "example": {
      "problem": "Wat is de exacte leeftijd van iemand geboren op 15 juni 1995, geëvalueerd op 8 oktober 2026?",
      "steps": [
        "Stap 1: Verschil in jaren: 2026 - 1995 = 31 jaar.",
        "Stap 2: Verschil in maanden: Oktober (maand 10) - Juni (maand 6) = 4 maanden.",
        "Stap 3: Verschil in dagen: 8 - 15 is negatief (-7), dus leen 1 maand (waardoor 3 maanden overblijven) en voeg de dagen van september toe (30): 8 + 30 - 15 = 23 dagen."
      ],
      "result": "De persoon is precies 31 jaar, 3 maanden en 23 dagen oud."
    },
    "notes": [
      "Westerse leeftijdsberekening beschouwt een persoon als 0 jaar oud bij de geboorte en telt op elke verjaardag een jaar bij.",
      "Schrikkeljaren bevatten 366 dagen in plaats van 365 dagen; de calculator omvat 29 februari wanneer deze wordt doorkruist.",
      "Totaal aantal uren en totaal aantal dagen worden berekend met behulp van standaard astronomische kalenderdagintervallen."
    ],
    "faqs": [
      {
        "question": "Hoe gaat de leeftijdscalculator om met schrikkeljaren?",
        "answer": "De calculator controleert elk kalenderjaar in het bereik en neemt 29 februari correct op in schrikkeljaren, waardoor het totale aantal dagen en jubilea 100% nauwkeurig is."
      },
      {
        "question": "Kan ik berekenen hoe oud ik zal zijn in een toekomstig jaar?",
        "answer": "Ja. Wijzig het veld 'Leeftijd op de datum van' naar een toekomstige datum om uw exacte leeftijd op die datum te achterhalen."
      },
      {
        "question": "Hoe wordt het aftellen naar de volgende verjaardag bepaald?",
        "answer": "De calculator vergelijkt de datum van vandaag met uw aanstaande verjaardag in het huidige of volgende kalenderjaar om het exacte aantal resterende dagen te berekenen."
      },
      {
        "question": "Waarom is mijn leeftijd in dagen anders dan wat ik handmatig tel?",
        "answer": "Onze calculator houdt rekening met de exacte lengte van elke maand (28, 29, 30 of 31 dagen) en schrikkeljaren, wat handmatige tellingen vaak over het hoofd zien. Dit zorgt voor een uiterst nauwkeurige berekening."
      }
    ],
    "breadcrumbName": "Leeftijdscalculator"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "nl",
    "name": "Tijdrekenmachine",
    "category": "time-date",
    "badge": "Tijd Optellen & Aftrekken",
    "icon": "Clock",
    "h1": "Tijdrekenmachine",
    "seoTitle": "Tijdrekenmachine – Uren, Minuten & Seconden Optellen en Aftrekken",
    "seoDescription": "Gratis online tijdrekenmachine. Tel eenvoudig tijdsduren op of trek ze af in uren, minuten en seconden. Converteer tijd naar decimale uren en beheer tijdscodes.",
    "primaryKeyword": "tijdrekenmachine",
    "secondaryKeywords": [
      "tijdsduur berekenen",
      "uren minuten seconden optellen",
      "tijd aftrekken",
      "tijd omrekenen"
    ],
    "heroSubtitle": "Tel tijdsduren op en trek ze af in uren, minuten en seconden, met automatische eenheidsoverloop en conversies naar decimale uren.",
    "about": [
      "De Tijdrekenmachine maakt het snel optellen en aftrekken van tijdsintervallen mogelijk, uitgedrukt in uren, minuten en seconden. Omdat tijd gebruikmaakt van basis-60 (sexagesimale) rekenkunde in plaats van basis-10, leidt het handmatig optellen van uren en minuten vaak tot hergroeperingsfouten.",
      "Deze tool verwerkt automatisch 60-seconden en 60-minuten overgangen, waardoor het ideaal is voor video-editors die de looptijd van beelden berekenen, projectmanagers die factureerbare taken bijhouden, piloten die vluchtduur registreren en atleten die trainingssplits analyseren."
    ],
    "formula": {
      "title": "Formule voor Sexagesimale Tijdsom",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "Alle ingevoerde tijdsblokken worden geconverteerd naar totale seconden, opgeteld of afgetrokken, en vervolgens weer omgezet naar genormaliseerde uren, minuten en seconden.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Uren, minuten en seconden van de eerste duur"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Uren, minuten en seconden van de tweede duur"
        }
      ]
    },
    "howToCalculate": [
      "Voer uren, minuten en seconden in voor Tijd 1.",
      "Kies de bewerking: Optellen (+) of Aftrekken (-).",
      "Voer uren, minuten en seconden in voor Tijd 2.",
      "Klik op Berekenen om de geconsolideerde uren, minuten, seconden en totale decimale uren te zien."
    ],
    "example": {
      "problem": "Tel 2 uur 45 minuten 30 seconden en 3 uur 35 minuten 45 seconden bij elkaar op.",
      "steps": [
        "Stap 1: Seconden: 30 + 45 = 75 seconden = 1 minuut en 15 seconden.",
        "Stap 2: Minuten: 45 + 35 + 1 (overgedragen) = 81 minuten = 1 uur en 21 minuten.",
        "Stap 3: Uren: 2 + 3 + 1 (overgedragen) = 6 uur."
      ],
      "result": "De totale duur is 6 uur, 21 minuten en 15 seconden (6.3542 decimale uren)."
    },
    "notes": [
      "Er zijn 60 seconden in een minuut en 60 minuten in een uur.",
      "Om minuten naar decimale uren te converteren, deel de minuten door 60 (bijv. 30 minuten = 0.5 uur).",
      "Als een langere tijd van een kortere tijd wordt afgetrokken, wordt het resultaat weergegeven als een negatieve tijdsverschuiving."
    ],
    "faqs": [
      {
        "question": "Hoe converteer je minuten naar decimale uren?",
        "answer": "Deel het aantal minuten door 60. Bijvoorbeeld, 45 minuten gedeeld door 60 is 0.75 uur. Daarom is 2 uur en 45 minuten gelijk aan 2.75 decimale uren."
      },
      {
        "question": "Wat gebeurt er als seconden de 60 overschrijden?",
        "answer": "Elk blok van 60 seconden wordt automatisch omgezet in 1 minuut en wordt overgedragen naar de minutenkolom."
      },
      {
        "question": "Kan deze tool vlucht- of videobewerkingstijdscodes berekenen?",
        "answer": "Ja. Het telt nauwkeurig meerdere takes, clips of vluchtsegmenten op in uren, minuten en seconden."
      },
      {
        "question": "Wat is sexagesimale rekenkunde?",
        "answer": "Sexagesimale rekenkunde is een talstelsel met 60 als basis. Het is ontstaan in het oude Sumer en Babylonië en wordt vandaag de dag nog steeds gebruikt voor het meten van tijd (60 seconden in een minuut, 60 minuten in een uur) en hoeken (360 graden in een cirkel)."
      }
    ],
    "breadcrumbName": "Tijdrekenmachine"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "nl",
    "name": "Datumcalculator",
    "category": "time-date",
    "badge": "Dagen Tussen Datums",
    "icon": "Calendar",
    "h1": "Datumcalculator",
    "seoTitle": "Datumcalculator – Dagen Tussen Datums & Dagen Toevoegen/Aftrekken",
    "seoDescription": "Gratis online datumcalculator. Bereken het exacte aantal dagen, weken en werkdagen tussen twee datums, of tel dagen op bij of trek dagen af van een willekeurige datum.",
    "primaryKeyword": "datumcalculator",
    "secondaryKeywords": [
      "verschil datums berekenen",
      "aantal dagen tussen datums",
      "datumberekening",
      "werkdagen berekenen",
      "dagen optellen datum"
    ],
    "heroSubtitle": "Bereken het exacte aantal kalenderdagen en werkdagen tussen twee datums, of projecteer toekomstige datums door dagen op te tellen of af te trekken.",
    "about": [
      "De Datumcalculator lost veelvoorkomende kalendervragen op: het vinden van het aantal dagen tussen twee specifieke datums, of het bepalen welke datum een bepaald aantal dagen, weken of maanden in de toekomst of het verleden valt.",
      "In tegenstelling tot eenvoudig kalender tellen, houdt deze tool nauwkeurig rekening met variaties in maandeinden, schrikkeljaren en scheidt het standaard weekenddagen van maandag-tot-vrijdag werkdagen – essentieel voor projectplanning, wettelijke termijnen, opzegtermijnen en aftellingen van evenementen."
    ],
    "formula": {
      "title": "Datumberekening",
      "formulaText": "Total Days = (End Date (ms) - Start Date (ms)) / (1000 × 60 × 60 × 24)\nWeeks = ⌊Total Days / 7⌋\nRemaining Days = Total Days mod 7",
      "explanation": "Berekent het epoch tijdstempelverschil tussen middernacht UTC-tijdstempels en telt de tussenliggende maandag-tot-vrijdag dagen voor zakelijke intervallen.",
      "variables": [
        {
          "name": "Startdatum",
          "desc": "De referentie begindatum"
        },
        {
          "name": "Einddatum",
          "desc": "De beoogde einddatum"
        },
        {
          "name": "Werkdagen",
          "desc": "Aantal weekdagen (maandag t/m vrijdag) exclusief weekenden"
        }
      ]
    },
    "howToCalculate": [
      "Kies modus: \"Dagen Tussen Datums\" of \"Dagen Toevoegen / Aftrekken\".",
      "Voor Datumverschil: Selecteer uw Startdatum en Einddatum.",
      "Vink \"Einddag Inclusief\" aan als uw tijdlijn inclusieve grens telling vereist.",
      "Bekijk het totale aantal dagen, weken, resterende dagen en maandag-tot-vrijdag werkdagen."
    ],
    "example": {
      "problem": "Hoeveel dagen en werkdagen zijn er tussen 5 januari 2026 en 20 februari 2026?",
      "steps": [
        "Stap 1: Totaal aantal verstreken kalenderdagen = 46 dagen.",
        "Stap 2: Gelijk aan 6 volle weken en 4 kalenderdagen.",
        "Stap 3: Exclusief zaterdag en zondag weekenden levert 34 werkdagen op."
      ],
      "result": "Er zijn 46 kalenderdagen (34 werkdagen) tussen de twee datums."
    },
    "notes": [
      "Standaard datumverschil berekent het aantal volledige dagen dat is verstreken tussen twee datums.",
      "Schrikkeljaren worden automatisch meegenomen (2028, 2032, etc. hebben 29 dagen in februari).",
      "Het aantal werkdagen omvat geen officiële nationale feestdagen, aangezien deze per land verschillen."
    ],
    "faqs": [
      {
        "question": "Telt de datumcalculator zowel de startdatum als de einddatum mee?",
        "answer": "Standaard telt de calculator het interval vanaf de startdatum tot de einddatum (verstreken tijd). U kunt \"Einddag Inclusief\" aanvinken om beide grensdata mee te tellen."
      },
      {
        "question": "Hoe worden werkdagen gedefinieerd?",
        "answer": "Werkdagen zijn maandag tot en met vrijdag. Zaterdagen en zondagen zijn uitgesloten als weekenddagen."
      },
      {
        "question": "Kan ik alleen werkdagen toevoegen?",
        "answer": "De optelfunctie voegt kalenderdagen toe; om projectopleveringen op basis van werkdagen te berekenen, moet u rekening houden met 2 weekenddagen per 5 werkdagen."
      },
      {
        "question": "Wat is het maximale datumbereik dat deze calculator kan verwerken?",
        "answer": "Deze calculator is ontworpen om een breed scala aan datums te verwerken, doorgaans van het begin van de 20e eeuw tot ver in de toekomst, wat nauwkeurigheid garandeert voor de meeste praktische toepassingen. Extreem verre datums kunnen onderhevig zijn aan systeembeperkingen, maar voor algemeen gebruik is het zeer betrouwbaar."
      }
    ],
    "breadcrumbName": "Datumcalculator"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "nl",
    "name": "Urenberekenaar",
    "category": "time-date",
    "badge": "Urenregistratie & Loon",
    "icon": "Timer",
    "h1": "Urenberekenaar",
    "seoTitle": "Urenberekenaar – Werkuren en Urenregistratie Berekenen",
    "seoDescription": "Gratis online urenberekenaar. Bereken totale werkuren, lunchpauzes, decimale uren en bruto loon tussen begin- en eindtijden voor urenstaten.",
    "primaryKeyword": "uren berekenen",
    "secondaryKeywords": [
      "urenregistratie calculator",
      "werkuren calculator",
      "gewerkte uren berekenen",
      "urenstaat calculator",
      "uren tussen tijden berekenen"
    ],
    "heroSubtitle": "Bereken dagelijkse werkuren, trek lunch- en rustpauzes af, converteer tijden naar decimale uren en bereken het bruto loon voor de salarisadministratie.",
    "about": [
      "De Urenberekenaar vereenvoudigt de tijdregistratie voor werknemers met een uurloon, aannemers, freelancers en salarisadministrateurs. Het omzetten van klokuren naar decimale uren (bijv. 7 uur 45 minuten naar 7,75 uur) is essentieel voor het vermenigvuldigen met uurloontarieven.",
      "De calculator ondersteunt nachtdiensten die over middernacht lopen (zoals 22:00 uur tot 06:00 uur) en trekt automatisch onbetaalde pauzes of lunches af om de zuivere betaalbare uren te rapporteren."
    ],
    "formula": {
      "title": "Formule voor Urenregistratie & Loon",
      "formulaText": "Bruto Minuten = Eindtijd - Begintijd (aangepast voor nachtdiensten)\nNetto Minuten = Bruto Minuten - Pauzeminuten\nDecimale Uren = Netto Minuten / 60\nTotaal Loon = Decimale Uren × Uurloon",
      "explanation": "Trek de begintijd af van de eindtijd, trek onbetaalde pauzeminuten af, deel door 60 om decimale uren te verkrijgen en vermenigvuldig met het uurloon.",
      "variables": [
        {
          "name": "Begintijd",
          "desc": "Kloktijd in"
        },
        {
          "name": "Eindtijd",
          "desc": "Kloktijd uit"
        },
        {
          "name": "Pauze",
          "desc": "Onbetaalde rust- of lunchduur in minuten"
        },
        {
          "name": "Uurloon",
          "desc": "Basis uurloon in euro's of lokale valuta"
        }
      ]
    },
    "howToCalculate": [
      "Voer de begintijd van uw dienst in (bijv. 08:30).",
      "Voer de eindtijd van uw dienst in (bijv. 17:00).",
      "Geef eventuele onbetaalde pauzetijd in minuten op (bijv. 45 minuten voor lunch).",
      "Voer optioneel uw uurloon in om het bruto loon te schatten.",
      "Klik op Berekenen om de netto uren, minuten, decimale uren en totale verdiensten te bekijken."
    ],
    "example": {
      "problem": "Een werknemer klokt in om 08:30, klokt uit om 17:15, neemt een lunchpauze van 45 minuten en verdient $24/uur.",
      "steps": [
        "Stap 1: Totale bruto tijd tussen 08:30 en 17:15 = 8 uur en 45 minuten (525 minuten).",
        "Stap 2: Trek 45 minuten lunch af: 525 - 45 = 480 netto minuten.",
        "Stap 3: Converteer naar decimaal: 480 ÷ 60 = 8,00 decimale uren.",
        "Stap 4: Vermenigvuldig met loon: 8,00 × $24 = $192,00."
      ],
      "result": "De werknemer werkte 8,00 uur en verdiende $192,00."
    },
    "notes": [
      "Salarissystemen vereisen decimale uren (bijv. 8,25 uur) in plaats van klokformaat (8u 15m).",
      "Diensten die over middernacht lopen, worden naadloos gedetecteerd en berekend zonder negatieve getallen.",
      "Berekeningen vertegenwoordigen het bruto loon vóór wettelijke inkomstenbelasting en salarisinhoudingen."
    ],
    "faqs": [
      {
        "question": "Hoe converteer je werkminuten naar decimale uren?",
        "answer": "Deel het aantal minuten door 60. Bijvoorbeeld, 15 minuten is 15/60 = 0,25 uur; 30 minuten is 0,5 uur; en 45 minuten is 0,75 uur."
      },
      {
        "question": "Hoe gaat de calculator om met nachtdiensten die over middernacht lopen?",
        "answer": "Als de eindtijd numeriek eerder is dan de begintijd (bijv. 23:00 uur tot 07:00 uur), voegt de calculator automatisch 24 uur toe om de correcte duur van de nachtdienst te bepalen."
      },
      {
        "question": "Kan ik met deze tool mijn weekloon berekenen?",
        "answer": "U kunt elke dagelijkse dienst berekenen. Voor geconsolideerde loonprojecties over meerdere weken kunt u onze Salaris Calculator gebruiken."
      },
      {
        "question": "Waarom zijn decimale uren belangrijk voor salarisadministratie?",
        "answer": "Decimale uren maken het eenvoudiger om het totale aantal gewerkte uren te vermenigvuldigen met het uurloon, wat cruciaal is voor nauwkeurige salarisberekeningen en -administratie. De meeste salarissystemen werken met decimale uren."
      }
    ],
    "breadcrumbName": "Uren Calculator"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "nl",
    "name": "BMI Calculator",
    "category": "fitness",
    "badge": "Lichaamsmassa-index",
    "icon": "Activity",
    "h1": "BMI Calculator",
    "seoTitle": "BMI Calculator – Bereken Online Uw Lichaamsmassa-index",
    "seoDescription": "Gratis online BMI calculator. Bereken de Lichaamsmassa-index voor volwassenen met metrische (cm/kg) of imperiale (ft/in/lbs) eenheden. Bekijk de gewichtscategorieën van de WHO en gezonde bereiken.",
    "primaryKeyword": "BMI calculator",
    "secondaryKeywords": [
      "BMI berekenen",
      "lichaamsmassa-index calculator",
      "BMI calculator volwassenen",
      "gezond gewichtsbereik",
      "metrische BMI calculator"
    ],
    "heroSubtitle": "Bereken uw Lichaamsmassa-index (BMI) met behulp van metrische of imperiale metingen om uw gewichtscategorie en gezonde gewichtsdoelen te begrijpen.",
    "about": [
      "De Lichaamsmassa-index (BMI) Calculator is een gestandaardiseerde screeningsmaatstaf, opgesteld door de Wereldgezondheidsorganisatie (WHO), om individuen te categoriseren op basis van hun gewichtsstatus ten opzichte van hun lengte. Het wordt veel gebruikt in de epidemiologie, algemene gezondheidscontroles en persoonlijke fitnessmonitoring.",
      "BMI wordt berekend door het lichaamsgewicht in kilogram te delen door het kwadraat van de lengte in meters. De calculator toont uw exacte score, de officiële WHO-classificatie (ondergewicht, normaal gewicht, overgewicht of obesitasklasse) en berekent uw gepersonaliseerde gezonde streefgewichtsbereik."
    ],
    "formula": {
      "title": "Standaard BMI Formules",
      "formulaText": "Metrische Formule: BMI = Gewicht (kg) / [Lengte (m)]²\nImperiale Formule: BMI = 703 × Gewicht (lbs) / [Lengte (inches)]²",
      "explanation": "Deel het gewicht door het kwadraat van de lengte. Voor imperiale eenheden (ponden en inches), vermenigvuldig de verhouding met conversiefactor 703.",
      "variables": [
        {
          "name": "Gewicht",
          "desc": "Lichaamsgewicht in kilogram (kg) of ponden (lbs)"
        },
        {
          "name": "Lengte",
          "desc": "Staande lengte in centimeters (cm) of voet & inches"
        },
        {
          "name": "703 Factor",
          "desc": "Standaard imperiale conversievermenigvuldiger"
        }
      ]
    },
    "howToCalculate": [
      "Kies uw voorkeurseenheidssysteem: Metrisch (cm en kg) of Imperiaal (voet, inches en ponden).",
      "Voer uw huidige staande lengte en lichaamsgewicht in.",
      "Klik op Berekenen om uw BMI-score, WHO-categorie en gezonde streefgewichtsbereik te zien.",
      "Bekijk het gezonde gewichtsbereik dat is ontworpen voor uw specifieke lengte."
    ],
    "example": {
      "problem": "Wat is de BMI van een persoon die 175 cm (1.75 m) lang is en 70 kg weegt?",
      "steps": [
        "Stap 1: Kwadrateer de lengte in meters: 1.75 × 1.75 = 3.0625 m².",
        "Stap 2: Deel het gewicht door het gekwadrateerde lengte: 70 ÷ 3.0625 = 22.86.",
        "Stap 3: Vergelijk met de WHO-drempels: 22.9 valt binnen 18.5 – 24.9 (Normaal Gewicht)."
      ],
      "result": "De persoon heeft een BMI van 22.9, wat geclassificeerd wordt als Normaal Gewicht."
    },
    "notes": [
      "BMI is een indicator voor bevolkingsscreening en maakt geen onderscheid tussen magere spiermassa en vetweefsel.",
      "Atleten, bodybuilders en zwangere vrouwen kunnen verhoogde BMI-scores hebben die geen overmatig lichaamsvet weerspiegelen.",
      "Deze tool is bedoeld voor algemene educatieve doeleinden en mag geen professionele klinische evaluatie vervangen."
    ],
    "faqs": [
      {
        "question": "Wat wordt beschouwd als een gezond BMI-bereik?",
        "answer": "Volgens de Wereldgezondheidsorganisatie (WHO) wordt een BMI tussen 18.5 en 24.9 beschouwd als de normale of gezonde gewichtscategorie voor volwassenen."
      },
      {
        "question": "Waarom kan BMI misleidend zijn voor gespierde atleten?",
        "answer": "BMI meet het totale gewicht ten opzichte van de lengte en kan geen onderscheid maken tussen spier- en vetweefsel. Omdat spieren dichter zijn dan vet, worden gespierde individuen vaak geclassificeerd als overgewicht of obesitas, ondanks een laag lichaamsvetpercentage."
      },
      {
        "question": "Hoe bereken ik BMI met ponden en inches?",
        "answer": "Vermenigvuldig uw gewicht in ponden met 703 en deel dit vervolgens door uw lengte in inches in het kwadraat: BMI = (lbs × 703) / (inches × inches)."
      },
      {
        "question": "Is BMI geschikt voor kinderen?",
        "answer": "Nee, de BMI-classificaties voor volwassenen zijn niet van toepassing op kinderen en adolescenten. Voor hen worden groeicurves en percentielgrafieken gebruikt die rekening houden met leeftijd en geslacht, omdat hun lichaam nog in ontwikkeling is."
      }
    ],
    "breadcrumbName": "BMI Calculator"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "nl",
    "name": "Tempocalculator",
    "category": "fitness",
    "badge": "Hardlopen & Wandelen",
    "icon": "Footprints",
    "h1": "Tempocalculator",
    "seoTitle": "Tempocalculator – Hardlooptempo, Snelheid en Tijd Berekenen",
    "seoDescription": "Gratis online tempocalculator voor hardlopen. Bereken tempo per kilometer (min/km), tempo per mijl (min/mi) en snelheid (km/u, mph) voor 5K, 10K, halve marathon en marathon.",
    "primaryKeyword": "tempocalculator",
    "secondaryKeywords": [
      "hardlooptempo calculator",
      "marathon tempo calculator",
      "hardloopsnelheid calculator",
      "5k tempo calculator",
      "minuten per km calculator"
    ],
    "heroSubtitle": "Bereken hardloop- en wandeltempo per kilometer en mijl, bepaal benodigde tussentijden en converteer direct tussen snelheid en tempo.",
    "about": [
      "De Tempocalculator is ontwikkeld voor hardlopers, joggers, triatleten en wandelaars die trainingslopen willen plannen of finishtijden willen voorspellen. Tempo meet de tijd die nodig is om een afstandseenheid af te leggen (zoals minuten per kilometer of minuten per mijl), terwijl snelheid de afgelegde afstand per tijdseenheid meet (km/u of mph).",
      "De calculator ondersteunt standaard wedstrijdafstanden, waaronder 5K, 10K, Halve Marathon (21.0975 km) en Volle Marathon (42.195 km), zodat u het doeltempo kunt bepalen dat nodig is om uw persoonlijke beste finishtijd te behalen."
    ],
    "formula": {
      "title": "Formules voor Tempo en Snelheid",
      "formulaText": "Pace = Time (seconds) / Distance\nSpeed (km/h) = Distance (km) / Time (hours)\nSpeed (mph) = Distance (miles) / Time (hours)",
      "explanation": "Tempo is het omgekeerde van snelheid: deel de totale verstreken tijd in minuten door de totale afgelegde afstand in kilometers of mijlen.",
      "variables": [
        {
          "name": "Tijd",
          "desc": "Totale verstreken duur in uren, minuten en seconden"
        },
        {
          "name": "Afstand",
          "desc": "Totale parcourslengte in kilometers of mijlen"
        },
        {
          "name": "Tempo",
          "desc": "Benodigde tijd per afstandseenheid (min/km of min/mi)"
        }
      ]
    },
    "howToCalculate": [
      "Voer de totale parcoursafstand in en selecteer de eenheid (km of mijlen).",
      "Voer de verstreken of beoogde Tijd in (uren, minuten en seconden).",
      "Klik op Berekenen om uw gemiddelde tempo per kilometer, tempo per mijl en snelheid in km/u en mph te bekijken.",
      "Pas tijden aan om tussentijden te voorspellen voor aankomende hardloopwedstrijden."
    ],
    "example": {
      "problem": "Welk tempo is nodig om een 10K (10 kilometer) race in 50 minuten te voltooien?",
      "steps": [
        "Stap 1: Totale tijd = 50 minuten = 3.000 seconden.",
        "Stap 2: Tempo per km: 50 minuten ÷ 10 km = 5:00 minuten per kilometer.",
        "Stap 3: Afstand in mijlen: 10 km ÷ 1.60934 = 6.2137 mijlen.",
        "Stap 4: Tempo per mijl: 50 minuten ÷ 6.2137 mijlen = 8:03 minuten per mijl (Snelheid: 12.0 km/u of 7.46 mph)."
      ],
      "result": "Het doeltempo is 5:00 min/km of 8:03 min/mijl."
    },
    "notes": [
      "1 mijl is ongeveer gelijk aan 1.60934 kilometer. 1 kilometer is gelijk aan 0.621371 mijl.",
      "Tempo wordt weergegeven als MM:SS (bijv. 4:30 min/km betekent 4 minuten en 30 seconden).",
      "Om tempo naar snelheid om te zetten: Snelheid (km/u) = 60 ÷ Tempo (in decimale minuten per km)."
    ],
    "faqs": [
      {
        "question": "Wat is het verschil tussen tempo en snelheid?",
        "answer": "Snelheid geeft aan hoe ver u reist in een bepaalde tijd (bijv. kilometers per uur), terwijl tempo aangeeft hoeveel tijd het kost om een vaste afstand af te leggen (bijv. minuten per kilometer)."
      },
      {
        "question": "Welk tempo is nodig voor een marathon onder de 4 uur?",
        "answer": "Om een volledige marathon (42.195 km / 26.219 mijl) onder de 4 uur te voltooien, heeft u een gemiddeld tempo nodig dat sneller is dan 5:41 min/km of 9:09 min/mijl."
      },
      {
        "question": "Hoe converteer ik min/km naar min/mijl?",
        "answer": "Vermenigvuldig uw tempo in minuten per kilometer met 1.60934. Bijvoorbeeld, 5:00 min/km (5.0) × 1.60934 = 8.046 minuten per mijl, wat ongeveer 8:03 min/mijl is."
      },
      {
        "question": "Waarom is het belangrijk om mijn tempo te kennen?",
        "answer": "Het kennen van uw tempo helpt u bij het plannen van trainingen, het stellen van realistische doelen voor wedstrijden en het monitoren van uw vooruitgang. Het stelt u in staat om efficiënter te trainen en blessures te voorkomen door niet te snel te starten."
      }
    ],
    "breadcrumbName": "Tempocalculator"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "nl",
    "name": "Brandstofkosten Calculator",
    "category": "utilities",
    "badge": "Reis- & Brandstofbudget",
    "icon": "Fuel",
    "h1": "Brandstofkosten Calculator",
    "seoTitle": "Brandstofkosten Calculator – Bereken Reiskosten en Brandstofverbruik",
    "seoDescription": "Gratis online brandstofkosten calculator. Bereken de totale reiskosten, benodigde brandstofhoeveelheid en kosten per kilometer op basis van voertuigefficiëntie en brandstofprijs.",
    "primaryKeyword": "brandstofkosten berekenen",
    "secondaryKeywords": [
      "benzinekosten berekenen",
      "brandstofverbruik berekenen",
      "reiskosten brandstof",
      "kilometerkosten auto",
      "rijkosten berekenen"
    ],
    "heroSubtitle": "Schat uw brandstofkosten voor een roadtrip, bereken het benodigde aantal liters of gallons en vind uw kosten per kilometer of mijl voordat u op reis gaat.",
    "about": [
      "De Brandstofkosten Calculator helpt forenzen, roadtrippers en logistieke operators bij het voorspellen van brandstofuitgaven voor elke rijafstand. Brandstof is een van de hoogste variabele kosten van voertuigbezit, beïnvloed door fluctuerende pompprijzen, snelheden op de snelweg en motorrendement.",
      "Deze tool ondersteunt kilometers met km/L of L/100km, evenals mijlen met Miles Per Gallon (MPG). Het berekent de totale benodigde brandstofhoeveelheid, de totale reiskosten en de eenheidskosten per kilometer of mijl."
    ],
    "formula": {
      "title": "Formule voor Brandstofverbruik en Kosten",
      "formulaText": "Benodigde Brandstof (L) = Afstand (km) / Verbruik (km/L)\nTotale Reiskosten = Benodigde Brandstof × Brandstofprijs per Eenheid\nKosten per Afstand = Totale Reiskosten / Afstand",
      "explanation": "Deel de totale reisafstand door het brandstofverbruik van het voertuig om de benodigde brandstofhoeveelheid te vinden, en vermenigvuldig dit vervolgens met de lokale brandstofprijs aan de pomp.",
      "variables": [
        {
          "name": "Afstand",
          "desc": "Lengte van de reis in kilometers of mijlen"
        },
        {
          "name": "Verbruik",
          "desc": "Brandstofverbruik van het voertuig (km/L, L/100km, of MPG)"
        },
        {
          "name": "Brandstofprijs",
          "desc": "Kosten van benzine, diesel of gas per liter of gallon"
        }
      ]
    },
    "howToCalculate": [
      "Voer de totale reisafstand in (bijv. 350 km).",
      "Selecteer uw voertuigverbruikseenheid (km/L, L/100km of MPG) en voer uw voertuigverbruik in.",
      "Voer de brandstofprijs per liter of per gallon in.",
      "Klik op Berekenen om de totale benodigde brandstof, de totale reiskosten en de kosten per afstandseenheid te zien."
    ],
    "example": {
      "problem": "Wat zijn de brandstofkosten voor een reis van 400 km in een auto die 16 km/L verbruikt, met een brandstofprijs van $1.50 per liter?",
      "steps": [
        "Stap 1: Benodigde brandstof = 400 km ÷ 16 km/L = 25 liter.",
        "Stap 2: Totale kosten = 25 liter × $1.50/L = $37.50.",
        "Stap 3: Kosten per kilometer = $37.50 ÷ 400 km = $0.094 per km."
      ],
      "result": "De reis vereist 25 liter brandstof en kost $37.50 ($0.094/km)."
    },
    "notes": [
      "Agressief accelereren, zware ladingen en dakdragers kunnen het brandstofverbruik op de snelweg met 15% tot 25% verminderen.",
      "Om L/100km om te zetten naar km/L: deel 100 door het L/100km-cijfer (bijv. 8 L/100km = 100 / 8 = 12.5 km/L).",
      "Voor rondreizen, vermenigvuldig de enkele reisafstand met 2 voordat u gaat berekenen."
    ],
    "faqs": [
      {
        "question": "Hoe bereken ik de brandstofkosten voor een roadtrip?",
        "answer": "Deel de afstand door het brandstofverbruik van uw voertuig (km/L of MPG) om de benodigde brandstofhoeveelheid te vinden, en vermenigvuldig die hoeveelheid vervolgens met de brandstofprijs per liter of gallon."
      },
      {
        "question": "Hoe converteer ik MPG naar km/L?",
        "answer": "1 US MPG is ongeveer 0.425 km/L. Om MPG naar km/L om te zetten, vermenigvuldigt u het MPG-getal met 0.425144."
      },
      {
        "question": "Hoe kan ik het brandstofverbruik van mijn voertuig verbeteren?",
        "answer": "Houd de aanbevolen bandenspanning aan, rijd met een constante snelheid op de snelweg, verwijder overtollig gewicht uit de kofferbak en vermijd snel remmen en accelereren."
      },
      {
        "question": "Wat betekent L/100km en hoe verhoudt het zich tot km/L?",
        "answer": "L/100km staat voor 'liter per 100 kilometer' en geeft aan hoeveel liter brandstof een voertuig verbruikt om 100 kilometer af te leggen. Km/L geeft aan hoeveel kilometer u kunt rijden met één liter brandstof. Om L/100km om te zetten naar km/L, deelt u 100 door het L/100km-cijfer."
      }
    ],
    "breadcrumbName": "Brandstofkosten Calculator"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "nl",
    "name": "Elektriciteitskosten Calculator",
    "category": "utilities",
    "badge": "Apparaten & Stroomrekening",
    "icon": "Zap",
    "h1": "Elektriciteitskosten Calculator",
    "seoTitle": "Elektriciteitskosten Calculator – Stroomverbruik Apparaten & Energierekening Berekenen",
    "seoDescription": "Gratis online elektriciteitskosten calculator. Bereken het stroomverbruik in kWh en de geschatte maandelijkse & jaarlijkse stroomkosten voor huishoudelijke apparaten op basis van het wattage.",
    "primaryKeyword": "elektriciteitskosten calculator",
    "secondaryKeywords": [
      "elektriciteitsverbruik calculator",
      "calculator stroomverbruik apparaten",
      "kWh calculator",
      "energiekosten calculator",
      "stroomrekening calculator"
    ],
    "heroSubtitle": "Bereken het stroomverbruik in kilowattuur (kWh) en schat de maandelijkse en jaarlijkse elektriciteitskosten voor elk huishoudelijk apparaat.",
    "about": [
      "De Elektriciteitskosten Calculator helpt huiseigenaren, huurders en facility managers te kwantificeren hoeveel elektriciteit huishoudelijke apparaten verbruiken en wat de gebruikskosten zijn. Van airconditioners en elektrische kachels tot crypto mining rigs en koelkastcompressoren, stroomverbruik kan de energierekening drastisch doen stijgen.",
      "Voer het wattage van het apparaat, de dagelijkse gebruiksuren en uw energietarief per kilowattuur (kWh) in om dagelijkse, maandelijkse en jaarlijkse kostenprognoses te ontvangen."
    ],
    "formula": {
      "title": "Formules voor Kilowattuur en Energiekosten",
      "formulaText": "Daily Energy (kWh) = (Appliance Watts × Hours per Day) / 1000\nCost = Energy (kWh) × Electricity Rate per kWh\nMonthly Cost = Daily Cost × 30 days\nYearly Cost = Daily Cost × 365 days",
      "explanation": "Zet het vermogen van het apparaat in watt om naar kilowatt door te delen door 1.000, vermenigvuldig met de dagelijkse bedrijfsuren en vermenigvuldig met het energietarief per kWh.",
      "variables": [
        {
          "name": "Wattage",
          "desc": "Nominaal stroomverbruik van het apparaat in Watt (W)"
        },
        {
          "name": "Uren/Dag",
          "desc": "Gemiddelde actieve gebruiksduur per 24-uurs cyclus"
        },
        {
          "name": "Tarief ($/kWh)",
          "desc": "Kosten van elektriciteit per kilowattuur"
        }
      ]
    },
    "howToCalculate": [
      "Zoek het wattage op het label of in de handleiding van het apparaat (bijv. 1500W voor een elektrische kachel).",
      "Voer het geschatte aantal uren in dat het apparaat dagelijks in gebruik is.",
      "Voer uw lokale energietarief per kWh in (controleer uw maandelijkse energierekening; een standaard tarief in Nederland is bijvoorbeeld €0,30/kWh).",
      "Klik op Berekenen om het dagelijkse, maandelijkse en jaarlijkse verbruik in kWh en de monetaire kosten te zien."
    ],
    "example": {
      "problem": "Wat kost het om een airconditioner van 1.200 Watt dagelijks 8 uur te laten draaien tegen een tarief van $0,15 per kWh gedurende een maand van 30 dagen?",
      "steps": [
        "Stap 1: Dagelijks kWh: (1.200 W × 8 uur) ÷ 1.000 = 9,6 kWh/dag.",
        "Stap 2: Maandelijks verbruik: 9,6 kWh × 30 dagen = 288 kWh.",
        "Stap 3: Maandelijkse kosten: 288 kWh × $0,15/kWh = $43,20.",
        "Stap 4: Jaarlijkse kosten: 9,6 kWh × 365 dagen × $0,15 = $525,60."
      ],
      "result": "De airconditioner verbruikt 288 kWh per maand en kost maandelijks $43,20 (jaarlijks $525,60)."
    },
    "notes": [
      "Apparaatlabels vermelden het maximale piekvermogen; apparaten met thermostaten (zoals koelkasten en airco's) schakelen aan en uit, wat het gemiddelde verbruik vermindert.",
      "1 Kilowatt (kW) = 1.000 Watt (W). 1 Megawatt (MW) = 1.000.000 Watt.",
      "Controleer uw energierekening voor gelaagde tarieven of piekuren (dal- en piekuren) tijdens de zomer en winter."
    ],
    "faqs": [
      {
        "question": "Hoe berekent u de stroomkosten van een apparaat?",
        "answer": "Vermenigvuldig het wattage van het apparaat met de dagelijkse uren, deel door 1.000 om het dagelijkse kWh te krijgen, en vermenigvuldig met uw energietarief per kWh."
      },
      {
        "question": "Waar vind ik het wattage van een apparaat?",
        "answer": "Het wattage van een apparaat staat meestal vermeld op een elektrisch certificeringslabel aan de achter- of onderkant van het apparaat, of in de handleiding."
      },
      {
        "question": "Welke huishoudelijke apparaten verbruiken de meeste elektriciteit?",
        "answer": "Verwarmings- en koelsystemen (centrale airco en warmtepompen), boilers, wasdrogers en elektrische ovens verbruiken de grootste hoeveelheid huishoudelijke stroom."
      },
      {
        "question": "Waarom is mijn elektriciteitsrekening zo hoog?",
        "answer": "Hoge elektriciteitsrekeningen kunnen worden veroorzaakt door inefficiënte apparaten, langdurig gebruik van apparaten met een hoog wattage, slechte isolatie of verhoogde elektriciteitstarieven. Een elektriciteitskosten calculator kan helpen bepalen welke apparaten het meest bijdragen aan uw rekening."
      }
    ],
    "breadcrumbName": "Elektriciteitskosten Calculator"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "nl",
    "name": "GPA Rekenmachine",
    "category": "education",
    "badge": "Cijfergemiddelde",
    "icon": "GraduationCap",
    "h1": "GPA Rekenmachine",
    "seoTitle": "GPA Rekenmachine – Bereken je HBO, WO & Middelbare School Cijfergemiddelde (4.0 schaal)",
    "seoDescription": "Gratis online GPA rekenmachine. Bereken je semester- en cumulatieve cijfergemiddelde op een 4.0 schaal met studiepunten en lettercijfers.",
    "primaryKeyword": "GPA rekenmachine",
    "secondaryKeywords": [
      "HBO WO GPA rekenmachine",
      "semester GPA berekenen",
      "cijfergemiddelde berekenen",
      "cumulatieve GPA rekenmachine",
      "4.0 GPA schaal"
    ],
    "heroSubtitle": "Bereken je semester- en cumulatieve cijfergemiddelde (GPA) op een standaard 4.0 schaal met behulp van lettercijfers en studiepunten.",
    "about": [
      "De Cijfergemiddelde (GPA) Rekenmachine berekent je academische status op de standaard 4.0 universitaire beoordelingsschaal. Hogescholen, universiteiten, middelbare scholen, beurscommissies en masterprogramma's gebruiken het cumulatieve GPA als een primaire maatstaf voor onderscheidingen, academische proeftijd en toelatingen.",
      "In tegenstelling tot een eenvoudig gemiddelde van cijfers, wordt het GPA gewogen op basis van studiepunten – wat betekent dat een vak van 4 studiepunten tweemaal zoveel invloed heeft op je uiteindelijke GPA vergeleken met een keuzevak van 2 studiepunten."
    ],
    "formula": {
      "title": "Formule voor Gewogen GPA",
      "formulaText": "Cijferpunten per Vak = Studiepunten × Waarde Cijferschaal\nGPA = Totaal Cijferpunten / Totaal Studiepunten",
      "explanation": "Vermenigvuldig elk studiepunt van een vak met de numerieke equivalent van het lettercijfer, tel de totale cijferpunten op en deel dit door het totaal aantal opgenomen studiepunten.",
      "variables": [
        {
          "name": "Cijferschaal (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Studiepunten",
          "desc": "Studiepunten of semestereenheden toegekend aan elk vak"
        }
      ]
    },
    "howToCalculate": [
      "Voeg elk vak toe dat je tijdens je semester of periode hebt gevolgd.",
      "Selecteer het behaalde lettercijfer (bijv. A, B+, B, C) of voer numerieke cijferpunten in.",
      "Voer de studiepunten van het vak in (bijv. 3 of 4 studiepunten).",
      "Klik op Berekenen om je gewogen GPA, totaal aantal studiepunten en totaal aantal behaalde cijferpunten te zien."
    ],
    "example": {
      "problem": "Bereken het semester GPA voor 4 vakken: Wiskunde (4 studiepunten, A), Geschiedenis (3 studiepunten, B), Biologie (4 studiepunten, B+), Engels (3 studiepunten, A-).",
      "steps": [
        "Stap 1: Wiskunde: 4 studiepunten × 4.0 (A) = 16.0 punten.",
        "Stap 2: Geschiedenis: 3 studiepunten × 3.0 (B) = 9.0 punten.",
        "Stap 3: Biologie: 4 studiepunten × 3.3 (B+) = 13.2 punten.",
        "Stap 4: Engels: 3 studiepunten × 3.7 (A-) = 11.1 punten.",
        "Stap 5: Totaal aantal punten = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 punten.",
        "Stap 6: Totaal aantal studiepunten = 4 + 3 + 4 + 3 = 14 studiepunten. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "Het semester GPA is 3.52."
    },
    "notes": [
      "Vakken met een 'Voldoende/Onvoldoende' beoordeling of auditvakken worden doorgaans uitgesloten van zowel cijferpunten als het totaal aantal studiepunten in GPA-berekeningen.",
      "Sommige middelbare scholen gebruiken gewogen 5.0 schalen voor AP- of Honours-vakken; standaard universitair GPA gebruikt de ongewogen 4.0 benchmark.",
      "Een cumulatief GPA combineert alle semesters door alle behaalde cijferpunten gedurende de gehele studie te delen door alle behaalde studiepunten gedurende de gehele studie."
    ],
    "faqs": [
      {
        "question": "Wat is de standaard 4.0 GPA-schaal?",
        "answer": "De standaard 4.0 schaal vertaalt zich als: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, en F = 0.0."
      },
      {
        "question": "Waarom worden studiepunten meegenomen in de GPA-berekening?",
        "answer": "Studiepunten vertegenwoordigen de zwaarte en het aantal wekelijkse onderwijsuren van een vak. Weging op basis van studiepunten zorgt ervoor dat een belangrijk hoorcollege van 4 studiepunten meer invloed heeft op je academische status dan een practicum van 1 studiepunt."
      },
      {
        "question": "Hoe verhoog ik mijn cumulatieve GPA?",
        "answer": "Het behalen van hoge cijfers (A of A-) in vakken met een hoger aantal studiepunten zal de grootste positieve invloed hebben op je algehele cumulatieve GPA."
      }
    ],
    "breadcrumbName": "GPA Rekenmachine"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "nl",
    "name": "Cijfercalculator",
    "category": "education",
    "badge": "Gewogen & Eindtoets",
    "icon": "Award",
    "h1": "Cijfercalculator",
    "seoTitle": "Cijfercalculator – Gewogen Cursuscijfer & Eindtoets Calculator",
    "seoDescription": "Gratis online cijfercalculator. Bereken je huidige gewogen cursuscijfer en ontdek welke score je nodig hebt op je eindtoets om je gewenste eindcijfer te behalen.",
    "primaryKeyword": "cijfercalculator",
    "secondaryKeywords": [
      "eindcijfer calculator",
      "welk cijfer heb ik nodig",
      "gewogen cijfercalculator",
      "cursuscijfer calculator",
      "eindtoets cijfercalculator"
    ],
    "heroSubtitle": "Bereken je huidige gewogen cursusgemiddelden en bepaal de exacte score die je nodig hebt op je eindtoets om je gewenste eindcijfer te behalen.",
    "about": [
      "De Cijfercalculator biedt twee essentiële academische modi: een Gewogen Cijfercalculator voor het combineren van opdrachten, quizzen, tussentijdse toetsen en participatie, en een Eindtoets Calculator die de vraag beantwoordt: \"Welke score heb ik nodig op de eindtoets om een A (of voldoende) te halen?\"",
      "Docenten en universiteitsprofessoren beoordelen cursussen vaak met percentages en toegewezen categoriegewichten (zoals Huiswerk 20%, Tussentijdse toetsen 30%, Eindtoets 50%). Deze calculator automatiseert de wiskunde van gewogen verdeling, zodat je je studietijd effectief kunt plannen."
    ],
    "formula": {
      "title": "Formules voor Gewogen Cijfer & Eindtoets",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Vermenigvuldig elke behaalde score met het percentage gewicht van de categorie. Om de vereiste eindscore te vinden, isoleer je het resterende onvoltooide gewichtspercentage ten opzichte van je streefcijfer.",
      "variables": [
        {
          "name": "Huidig Cijfer",
          "desc": "Gemiddeld percentage behaald op afgeronde cursussen"
        },
        {
          "name": "Streefcijfer",
          "desc": "Het minimaal gewenste cursuspercentage (bijv. 90% voor een A, 70% voor een C)"
        },
        {
          "name": "Gewicht Eindtoets",
          "desc": "Percentage van het totale cursuscijfer bepaald door de eindtoets"
        }
      ]
    },
    "howToCalculate": [
      "Om het huidige cursuscijfer te berekenen: Voer opdrachten in met scores (%) en hun respectievelijke categoriegewichten (%).",
      "Om te berekenen wat je nodig hebt voor de eindtoets: Schakel over naar \"Eindtoets Modus\", voer je Huidig Cijfer, Streefcijfer en Gewicht Eindtoets in.",
      "Klik op Berekenen om je vereiste toetsresultaat te zien en of die score haalbaar is."
    ],
    "example": {
      "problem": "Je hebt momenteel een 84% voor Scheikunde. De eindtoets telt voor 25% mee voor je cijfer. Wat heb je nodig op de eindtoets om af te sluiten met een A (90%)?",
      "steps": [
        "Stap 1: Gewicht huidig cijfer = 100% - 25% = 75% (0.75).",
        "Stap 2: Streefcijfer = 90%. Huidige bijdrage = 84% × 0.75 = 63%.",
        "Stap 3: Punten nodig van eindtoets: 90% - 63% = 27%.",
        "Stap 4: Delen door gewicht eindtoets: 27% ÷ 0.25 = 108%."
      ],
      "result": "Je hebt 108% nodig op de eindtoets (wat extra punten vereist) om een totaal van 90% in de cursus te behalen."
    },
    "notes": [
      "Als de vereiste eindscore boven de 100% ligt, is het streefcijfer wiskundig onmogelijk zonder extra credit of een curve.",
      "Zorg ervoor dat alle categoriegewichten optellen tot 100% voor een volledige balans van de studiegids.",
      "Verschillende onderwijsinstellingen hanteren verschillende cijfergrenzen; controleer je studiegids voor specifieke lettergrenzen."
    ],
    "faqs": [
      {
        "question": "Hoe bereken je een gewogen cursuscijfer?",
        "answer": "Vermenigvuldig elke cijfercategorie met het gewichtspercentage in decimale vorm, tel alle resulterende producten bij elkaar op en deel door de totale som van de gewichten."
      },
      {
        "question": "Wat moet ik doen als mijn gewichten niet optellen tot 100%?",
        "answer": "De calculator normaliseert automatisch de ingevoerde gewichten door de totale gewogen punten te delen door de som van de tot nu toe ingevoerde gewichten."
      },
      {
        "question": "Hoe wordt de score voor de eindtoets berekend?",
        "answer": "Trek de reeds behaalde punten af van je streefcijfer voor de cursus, en deel vervolgens de resterende punten door het gewichtspercentage van de eindtoets."
      },
      {
        "question": "Kan ik deze calculator gebruiken voor verschillende beoordelingsschalen (bijv. 1-10 in plaats van percentages)?",
        "answer": "Deze calculator is voornamelijk ontworpen voor op percentages gebaseerde beoordelingssystemen. Als je instelling een andere schaal gebruikt, moet je je scores eerst omzetten naar percentages om deze tool effectief te kunnen gebruiken."
      }
    ],
    "breadcrumbName": "Cijfercalculator"
  }
};

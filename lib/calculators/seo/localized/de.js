/**
 * lib/calculators/seo/localized/de.js
 * Complete German localized SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_DE = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "de",
    "name": "Kreditrechner",
    "category": "financial",
    "badge": "Monatsrate & Zinsen",
    "icon": "CreditCard",
    "h1": "Kreditrechner",
    "seoTitle": "Kreditrechner – Monatliche Kreditraten und Gesamtzinsen berechnen",
    "seoDescription": "Kostenloser Online-Kreditrechner. Berechnen Sie monatliche Kreditraten, gesamte Zinskosten und sehen Sie Tilgungspläne für Privat-, Auto- oder Geschäftskredite ein.",
    "primaryKeyword": "Kreditrechner",
    "secondaryKeywords": [
      "Kreditratenrechner",
      "Rechner für monatliche Kreditraten",
      "Zinsrechner",
      "Privatkreditrechner",
      "Autokreditrechner"
    ],
    "heroSubtitle": "Berechnen Sie monatliche Kreditraten, gesamte Zinskosten und die Gesamtrückzahlungskosten mit Tilgungsplänen für Privat-, Auto- und Studienkredite.",
    "about": [
      "Der Kreditrechner hilft Kreditnehmern, die Konditionen von Ratenkrediten zu bewerten, bevor sie Finanzierungsvereinbarungen mit Banken, Kreditgenossenschaften oder Online-Kreditgebern eingehen. Ratenkredite – einschließlich Autofinanzierungen, Privatkredite und Umschuldungspakete – basieren auf einer amortisierten Rückzahlungsformel.",
      "Durch Eingabe des ursprünglichen Kreditbetrags, des jährlichen Zinssatzes (APR) und der Kreditlaufzeit in Monaten oder Jahren berechnet der Rechner Ihre genaue monatliche Ratenzahlung, die über die gesamte Kreditlaufzeit gezahlten Gesamtzinsen und den gesamten Rückzahlungsbetrag."
    ],
    "formula": {
      "title": "Standard-Tilgungsformel für Kredite",
      "formulaText": "Monthly Payment (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nTotal Repayment = Monthly Payment × n\nTotal Interest = Total Repayment - PV",
      "explanation": "PV ist der ursprüngliche Kreditbetrag, r ist der periodische monatliche Zinssatz (Jahreszins / 12 / 100), und n ist die Gesamtzahl der monatlichen Zahlungen.",
      "variables": [
        {
          "name": "PV",
          "desc": "Barwert (Ursprünglicher Kreditbetrag)"
        },
        {
          "name": "r",
          "desc": "Monatlicher Zinssatz: Jahreszins ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Gesamtzahl der monatlichen Zahlungsperioden"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den gesamten Kreditbetrag (Kapital) ein, den Sie aufnehmen möchten.",
      "Geben Sie den jährlichen Zinssatz (APR in Prozent) ein.",
      "Wählen Sie die Kreditlaufzeit (in Jahren oder Monaten).",
      "Klicken Sie auf 'Berechnen', um Ihre monatliche Rate, die gesamten Zinskosten und die Aufschlüsselung von Tilgung und Zinsen zu sehen."
    ],
    "example": {
      "problem": "Wie hoch sind die monatliche Rate und die Gesamtzinsen für einen Autokredit von $25.000 bei einem jährlichen Zinssatz von 6,0% über eine Laufzeit von 5 Jahren (60 Monate)?",
      "steps": [
        "Schritt 1: Monatlicher Zinssatz r = 6% ÷ 1200 = 0.005.",
        "Schritt 2: Anzahl der Monate n = 5 × 12 = 60 Monate.",
        "Schritt 3: Faktor (1 + 0.005)⁶⁰ = 1.34885.",
        "Schritt 4: Monatliche Zahlung = [0.005 × 25,000 × 1.34885] ÷ [1.34885 - 1] = 168.606 ÷ 0.34885 = $483.32.",
        "Schritt 5: Gesamtzahlungen = $483.32 × 60 = $28,999.20. Gesamtzinsen = $28,999.20 - $25,000 = $3,999.20."
      ],
      "result": "Die monatliche Rate beträgt $483.32, und die über 5 Jahre gezahlten Gesamtzinsen belaufen sich auf $3.999.20."
    },
    "notes": [
      "Kreditgeber können Bearbeitungsgebühren, Dokumentengebühren oder Kreditversicherungen erheben, die den effektiven Jahreszins leicht erhöhen.",
      "Zusätzliche Sondertilgungen des Kapitals reduzieren die Gesamtzinsen erheblich und verkürzen die Kreditlaufzeit.",
      "Längere Kreditlaufzeiten senken die monatlichen Raten, erhöhen aber die kumulierten Zinskosten."
    ],
    "faqs": [
      {
        "question": "Wie berechnen Kreditgeber die monatlichen Kreditraten?",
        "answer": "Kreditgeber verwenden standardisierte Tilgungsformeln. Dabei wird jede monatliche Zahlung in einen Zinsanteil (berechnet auf den verbleibenden Restbetrag) und einen Tilgungsanteil (zur Reduzierung des Kapitals) aufgeteilt. Zu Beginn ist der Zinsanteil höher und der Tilgungsanteil geringer, was sich im Laufe der Zeit umkehrt."
      },
      {
        "question": "Was ist der Unterschied zwischen effektivem Jahreszins (APR) und Nominalzinssatz?",
        "answer": "Der Nominalzinssatz ist der grundlegende jährliche Zinssatz für die Geldleihe. Der effektive Jahreszins (APR – Annual Percentage Rate) hingegen umfasst nicht nur den Nominalzinssatz, sondern auch alle obligatorischen Gebühren und Kosten, die der Kreditgeber erhebt (z.B. Bearbeitungsgebühren). Er gibt somit die tatsächlichen jährlichen Kosten eines Kredits genauer wieder."
      },
      {
        "question": "Wie wirkt sich eine höhere Anzahlung auf einen Kredit aus?",
        "answer": "Eine höhere Anzahlung reduziert den ursprünglich geliehenen Kapitalbetrag (die Kreditsumme). Dies führt unmittelbar zu einer Senkung Ihrer monatlichen Raten und verringert gleichzeitig die über die gesamte Laufzeit zu zahlenden Gesamtzinsen, da weniger Kapital verzinst werden muss."
      },
      {
        "question": "Kann ich meinen Kredit vorzeitig zurückzahlen?",
        "answer": "Ja, viele Kreditverträge erlauben Sondertilgungen oder eine vollständige vorzeitige Rückzahlung. Dies kann die Gesamtzinskosten erheblich senken. Es ist jedoch wichtig, die Vertragsbedingungen zu prüfen, da einige Kreditgeber Vorfälligkeitsentschädigungen erheben können."
      }
    ],
    "breadcrumbName": "Kreditrechner"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "de",
    "name": "EMI Rechner",
    "category": "financial",
    "badge": "Gleichbleibende Monatsrate",
    "icon": "Calculator",
    "h1": "EMI Rechner",
    "seoTitle": "Kreditratenrechner – Monatsraten und Tilgungsplan online berechnen",
    "seoDescription": "Kostenloser Online-Kreditratenrechner. Berechnen Sie gleichbleibende Monatsraten (EMI) für Wohnungs-, Auto- und Privatkredite mit Zinsaufschlüsselung und Tilgungsplänen.",
    "primaryKeyword": "Kreditrechner",
    "secondaryKeywords": [
      "EMI Rechner Deutschland",
      "Monatsratenrechner",
      "Kreditratenrechner",
      "Baufinanzierung Rechner",
      "Autokredit Rechner"
    ],
    "heroSubtitle": "Berechnen Sie gleichbleibende Monatsraten (EMI), die gesamten zu zahlenden Zinsen und Tilgungspläne für Wohnungs-, Privat- und Fahrzeugkredite.",
    "about": [
      "Der Rechner für gleichbleibende Monatsraten (EMI) ist ein wichtiges Finanzinstrument, das weltweit und in indischen Bankensystemen verwendet wird, um die feste monatliche Zahlung zu berechnen, die einem Kreditgeber an einem bestimmten Kalendertag jeden Monat geschuldet wird.",
      "EMIs sind so strukturiert, dass in den ersten Monaten ein größerer Anteil jeder Rate für Zinszahlungen verwendet wird; während das Darlehenskapital im Laufe der Zeit abnimmt, reduziert ein wachsender Anteil jeder Zahlung den verbleibenden Kapitalbetrag."
    ],
    "formula": {
      "title": "Formel für die gleichbleibende Monatsrate",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal Payable = EMI × N\nTotal Interest = Total Payable - P",
      "explanation": "P ist die Darlehenshauptsumme, R ist der monatliche Zinssatz (Jahreszins / 12 / 100) und N ist die Laufzeit, ausgedrückt in Gesamtmonaten.",
      "variables": [
        {
          "name": "P",
          "desc": "Geliehener Kapitalbetrag"
        },
        {
          "name": "R",
          "desc": "Monatlicher Zinssatz: Jahreszins ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Laufzeit in Monaten (Jahre × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den Darlehenshauptbetrag ein.",
      "Geben Sie den jährlichen Zinssatz in Prozent ein, der von der Bank berechnet wird.",
      "Geben Sie die Darlehenslaufzeit in Jahren oder Monaten ein.",
      "Überprüfen Sie Ihre genaue EMI, den gesamten Zinsbetrag und den monatlichen Tilgungsplan."
    ],
    "example": {
      "problem": "Berechnen Sie die EMI für einen Privatkredit von ₹10,00,000 zu 10.5% Zinsen über eine Laufzeit von 3 Jahren (36 Monate).",
      "steps": [
        "Schritt 1: Kapital P = 10,00,000. Laufzeit N = 36 Monate.",
        "Schritt 2: Monatlicher Zinssatz R = 10.5 ÷ 1200 = 0.00875.",
        "Schritt 3: (1 + R)³⁶ = (1.00875)³⁶ = 1.3686.",
        "Schritt 4: EMI = [10,00,000 × 0.00875 × 1.3686] ÷ [1.3686 - 1] = ₹32,502.44.",
        "Schritt 5: Gesamtzinsen = (₹32,502.44 × 36) - ₹10,00,000 = ₹1,70,088."
      ],
      "result": "Die monatliche EMI beträgt ₹32,502, und die gesamten über 3 Jahre zu zahlenden Zinsen betragen ₹1,70,088."
    },
    "notes": [
      "Zusätzliche vorzeitige EMI-Zahlungen reduzieren direkt das Kapital und senken drastisch die langfristigen Zinskosten.",
      "Variable Zinssätze können die EMI-Beträge oder die Laufzeit des Darlehens im Laufe der Zeit ändern.",
      "Bearbeitungsgebühren und gesetzliche Steuern wie die GST auf Bankgebühren werden von den Kreditgebern separat in Rechnung gestellt."
    ],
    "faqs": [
      {
        "question": "Was ist eine gleichbleibende Monatsrate (EMI)?",
        "answer": "Eine EMI ist ein fester Geldbetrag, der von einem Kreditnehmer an einem bestimmten Datum jeden Monat an einen Finanzgeber gezahlt wird, um ein annuitätisches Darlehen über einen festgelegten Zeitraum abzuzahlen."
      },
      {
        "question": "Warum sind die Zinsen bei frühen EMI-Zahlungen höher?",
        "answer": "Weil Zinsen auf den ausstehenden Restbetrag berechnet werden, der zu Beginn des Darlehens am höchsten ist. Wenn Sie den Kapitalbetrag zurückzahlen, sinkt der monatliche Zinsanteil."
      },
      {
        "question": "Kann ich meine EMI senken?",
        "answer": "Sie können Ihre monatliche EMI senken, indem Sie die Darlehenslaufzeit verlängern, einen niedrigeren Zinssatz aushandeln oder eine Vorauszahlung auf das Kapital leisten."
      },
      {
        "question": "Was ist der Unterschied zwischen EMI und Kapital + Zinsen?",
        "answer": "Die EMI ist die feste monatliche Gesamtzahlung, die sowohl die Kapitalrückzahlung als auch die für diesen Monat fälligen Zinsen umfasst. Kapital + Zinsen bezieht sich auf die Bestandteile, aus denen die EMI besteht, wobei sich der Anteil von Kapital und Zinsen über die Darlehenslaufzeit ändert."
      }
    ],
    "breadcrumbName": "EMI Rechner"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "de",
    "name": "Hypothekenrechner",
    "category": "financial",
    "badge": "Immobiliendarlehen & Steuern",
    "icon": "Home",
    "h1": "Hypothekenrechner",
    "seoTitle": "Hypothekenrechner – Monatliche Raten für Immobiliendarlehen schätzen",
    "seoDescription": "Kostenloser Online-Hypothekenrechner. Schätzen Sie die gesamten monatlichen Wohnkosten einschließlich Tilgung, Zinsen, Grundsteuern, Hausratversicherung und Anzahlungen.",
    "primaryKeyword": "Hypothekenrechner",
    "secondaryKeywords": [
      "Hypothekenratenrechner",
      "Immobiliendarlehensrechner",
      "Monatlicher Hypothekenrechner",
      "Hauszahlungsrechner",
      "Immobilienkreditrechner"
    ],
    "heroSubtitle": "Schätzen Sie Ihre monatlichen Hypothekenzahlungen einschließlich Tilgung, Zinsen, Grundsteuern und Gebäudeversicherung.",
    "about": [
      "Der Hypothekenrechner liefert eine vollständige Schätzung der tatsächlichen monatlichen Kosten für Wohneigentum. Eine Immobilienhypothekenzahlung besteht selten nur aus Tilgung und Zinsen – Kreditgeber und Treuhanddienste verlangen routinemäßig Beiträge zur Grundsteuer und Prämien für die Gebäudeversicherung.",
      "Geben Sie den Kaufpreis der Immobilie, den Prozentsatz oder Betrag der Anzahlung, den Zinssatz und die Laufzeit (z.B. 15 oder 30 Jahre) ein, um Ihre monatliche Zahlung und die Finanzierungskosten über die gesamte Laufzeit zu schätzen."
    ],
    "formula": {
      "title": "Umfassende Formel für Hypothekenkosten",
      "formulaText": "Gesamte monatliche Zahlung = Tilgung & Zinsen (T&Z) + Monatliche Grundsteuer + Monatliche Versicherung + Hausgeld\nDarlehenshauptbetrag = Kaufpreis der Immobilie - Anzahlung",
      "explanation": "T&Z werden mit der Standard-Amortisationsformel auf den Nettodarlehensbetrag berechnet. Steuern und Versicherungen werden durch 12 geteilt und summiert, um die gesamte monatliche Treuhandverbindlichkeit zu ermitteln.",
      "variables": [
        {
          "name": "Kaufpreis der Immobilie",
          "desc": "Vereinbarter Kaufpreis der Wohnimmobilie"
        },
        {
          "name": "Anzahlung",
          "desc": "Vorauszahlung des Eigenkapitals bei Abschluss"
        },
        {
          "name": "T&Z",
          "desc": "Monatlicher Schuldendienst für Tilgung und Zinsen"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den gewünschten Kaufpreis der Immobilie ein.",
      "Geben Sie Ihre Anzahlung ein (als Dollarbetrag oder Prozentsatz).",
      "Geben Sie den jährlichen Hypothekenzinssatz und die Darlehenslaufzeit an (typischerweise 15 oder 30 Jahre).",
      "Fügen Sie optional jährliche Grundsteuern und die Gebäudeversicherung hinzu.",
      "Klicken Sie auf 'Berechnen', um Ihre vollständigen monatlichen Wohnkosten und die gesamten gezahlten Zinsen anzuzeigen."
    ],
    "example": {
      "problem": "Schätzen Sie die monatliche Zahlung für ein Haus im Wert von $400.000 mit 20% Anzahlung ($80.000) bei 6,5% Zinsen für ein festverzinsliches Darlehen über 30 Jahre, mit $4.800/Jahr Steuern und $1.200/Jahr Versicherung.",
      "steps": [
        "Schritt 1: Darlehenshauptbetrag = $400.000 - $80.000 = $320.000.",
        "Schritt 2: Monatliche T&Z für $320.000 bei 6,5% über 30 Jahre = $2.022,62.",
        "Schritt 3: Monatliche Grundsteuer = $4.800 ÷ 12 = $400,00.",
        "Schritt 4: Monatliche Versicherung = $1.200 ÷ 12 = $100,00.",
        "Schritt 5: Gesamte monatliche Zahlung = $2.022,62 + $400,00 + $100,00 = $2.522,62."
      ],
      "result": "Die gesamte geschätzte monatliche Wohnkostenbelastung beträgt $2.522,62 (T&Z: $2.022,62)."
    },
    "notes": [
      "Eine Anzahlung von weniger als 20% löst in der Regel eine private Hypothekenversicherung (PMI) aus, bis ein Eigenkapitalanteil von 20% erreicht ist.",
      "Eine 15-jährige Hypothek hat höhere monatliche Zahlungen, spart aber Zehntausende an Zinsen über die gesamte Laufzeit im Vergleich zu einer 30-jährigen Laufzeit.",
      "Grundsteuern schwanken je nach kommunalen Bewertungen und Abgaben der örtlichen Schulbezirke."
    ],
    "faqs": [
      {
        "question": "Was ist in einer monatlichen Hypothekenzahlung enthalten?",
        "answer": "Eine Standard-Hypothekenzahlung umfasst Tilgung, Zinsen, Grundsteuern und die Gebäudeversicherung (oft als PITI bezeichnet)."
      },
      {
        "question": "Warum sollte ich eine Anzahlung von 20% anstreben?",
        "answer": "Eine Anzahlung von mindestens 20% eliminiert die Notwendigkeit einer privaten Hypothekenversicherung (PMI), senkt Ihren Zinssatz und reduziert Ihre monatliche Schuldverpflichtung."
      },
      {
        "question": "Sollte ich eine 15-jährige oder 30-jährige Hypothek wählen?",
        "answer": "Eine 30-jährige Laufzeit bietet niedrigere, besser zu verwaltende monatliche Zahlungen. Eine 15-jährige Laufzeit hat höhere monatliche Zahlungen, berechnet aber über die gesamte Darlehenslaufzeit deutlich weniger Gesamtzinsen."
      }
    ],
    "breadcrumbName": "Hypothekenrechner"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "de",
    "name": "Zinseszinsrechner",
    "category": "financial",
    "badge": "Anlagewachstum",
    "icon": "TrendingUp",
    "h1": "Zinseszinsrechner",
    "seoTitle": "Zinseszinsrechner – Online Anlagewachstum berechnen",
    "seoDescription": "Kostenloser Online-Zinseszinsrechner. Berechnen Sie den zukünftigen Anlagewert, die erzielten Zinsen und den Vermögensaufbau mit monatlichen oder jährlichen Beiträgen.",
    "primaryKeyword": "zinseszinsrechner",
    "secondaryKeywords": [
      "zinseszinsrechner monatlich",
      "anlagerechner",
      "rechner für zinseszins-wachstum",
      "zukunftswertrechner",
      "sparrechner"
    ],
    "heroSubtitle": "Berechnen Sie den zukünftigen Vermögensaufbau, Zinseszinsgewinne und das Anlagewachstum mit regelmäßigen monatlichen oder jährlichen Beiträgen.",
    "about": [
      "Der Zinseszinsrechner visualisiert die Kraft des exponentiellen Finanzwachstums über die Zeit. Oft als das „achte Weltwunder“ beschrieben, bezieht sich der Zinseszins darauf, Zinsen nicht nur auf Ihre ursprüngliche Einlage (Kapital), sondern auch auf die angesammelten Zinsen aus früheren Perioden zu verdienen.",
      "Dieser Rechner ermöglicht es Ihnen, Altersvorsorgekonten (wie 401(k)s und IRAs), Indexfonds-Ersparnisse und Festgelder mit anpassbaren Zinseszinsperioden (täglich, monatlich, vierteljährlich oder jährlich) und wiederkehrenden monatlichen Beiträgen zu modellieren."
    ],
    "formula": {
      "title": "Zinseszinsformel mit regelmäßigen Beiträgen",
      "formulaText": "Future Value (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nTotal Interest = Future Value - (P + PMT × Total Periods)",
      "explanation": "P ist das Anfangskapital, r ist der jährliche Nominalzinssatz, n ist die Zinseszinsperiode pro Jahr, t ist die Zeit in Jahren und PMT ist der periodische Beitrag.",
      "variables": [
        {
          "name": "P",
          "desc": "Anfängliches Kapital"
        },
        {
          "name": "r",
          "desc": "Jährlicher Zinssatz in Dezimalform"
        },
        {
          "name": "n",
          "desc": "Zinseszinsperioden pro Jahr (12 = monatlich, 1 = jährlich)"
        },
        {
          "name": "PMT",
          "desc": "Periodischer wiederkehrender Geldbetrag"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Ihr anfängliches Anlagekapital ein.",
      "Geben Sie den prognostizierten jährlichen Zinssatz in Prozent an.",
      "Geben Sie den Anlagehorizont in Jahren ein.",
      "Geben Sie optional einen wiederkehrenden monatlichen Beitrag ein.",
      "Klicken Sie auf Berechnen, um den zukünftigen Portfoliowert, die insgesamt erzielten Zinsen und die jährlichen Wachstumsverläufe zu sehen."
    ],
    "example": {
      "problem": "Investieren Sie 10.000 $ bei einer jährlichen Rendite von 8 %, monatlich verzinst, über 20 Jahre mit monatlich 200 $ zusätzlichen Einzahlungen.",
      "steps": [
        "Schritt 1: Anfängliche 10.000 $ wachsen auf: 10.000 $ × (1 + 0.08/12)²⁴⁰ = 49.268,03 $.",
        "Schritt 2: Monatliche Beiträge von 200 $ wachsen auf: 200 $ × [((1 + 0.08/12)²⁴⁰ - 1) / (0.08/12)] = 117.804,09 $.",
        "Schritt 3: Gesamter zukünftiger Portfoliowert = 49.268,03 $ + 117.804,09 $ = 167.072,12 $.",
        "Schritt 4: Eingezahltes Gesamtkapital = 10.000 $ + (200 $ × 240) = 58.000 $. Insgesamt verdiente Zinsen = 109.072,12 $."
      ],
      "result": "Das Portfolio wächst auf 167.072,12 $, wobei 109.072,12 $ rein durch Zinseszinsen generiert wurden."
    },
    "notes": [
      "Zeit ist der größte Faktor beim Zinseszins: Eine Verdoppelung des Zeitrahmens verdreifacht oft die Anlagerenditen.",
      "Historisch gesehen haben breit gestreute Aktienmarkt-Indexfonds (wie der S&P 500) durchschnittlich ~10 % jährliche Nominalrenditen vor Inflation erzielt.",
      "Reales Vermögenswachstum sollte die langfristige Inflation (~2-3 % jährlich) berücksichtigen."
    ],
    "faqs": [
      {
        "question": "Was ist Zinseszins?",
        "answer": "Zinseszins sind Zinsen, die auf das anfängliche Kapital und zusätzlich auf die angesammelten Zinsen aus früheren Perioden berechnet werden, wodurch ein exponentielles Wachstum entsteht."
      },
      {
        "question": "Wie oft werden Zinsen auf Sparkonten verzinst?",
        "answer": "Die meisten modernen Hochzins-Sparkonten verzinsen täglich und schreiben die Zinsen am Ende jedes Monats Ihrem Guthaben gut."
      },
      {
        "question": "Was ist die 72er-Regel?",
        "answer": "Die 72er-Regel schätzt, wie viele Jahre es dauern wird, Ihr Geld zu verdoppeln: Teilen Sie 72 durch Ihren jährlichen Zinssatz (z.B. bei 8 % verdoppelt sich das Geld in ca. 9 Jahren)."
      },
      {
        "question": "Warum ist der Zinseszins so wichtig für den Vermögensaufbau?",
        "answer": "Der Zinseszins ist entscheidend, da er Ihr Geld exponentiell wachsen lässt. Sie verdienen nicht nur Zinsen auf Ihr ursprüngliches Kapital, sondern auch auf die bereits verdienten Zinsen. Über längere Zeiträume führt dies zu einem erheblich größeren Vermögenswachstum als bei einfachen Zinsen."
      }
    ],
    "breadcrumbName": "Zinseszinsrechner"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "de",
    "name": "Einfacher Zinsrechner",
    "category": "financial",
    "badge": "Lineare Zinsen",
    "icon": "PiggyBank",
    "h1": "Einfacher Zinsrechner",
    "seoTitle": "Einfacher Zinsrechner – Einfache Zinsen & Endwert berechnen",
    "seoDescription": "Kostenloser Online-Rechner für einfache Zinsen. Berechnen Sie einfache Zinsen und den gesamten Endbetrag mit der klassischen Formel I = P × R × T für Darlehen und Schuldscheine.",
    "primaryKeyword": "einfacher zinsrechner",
    "secondaryKeywords": [
      "formel einfache zinsen",
      "einfache zinsen berechnen",
      "darlehen einfache zinsen",
      "endwert rechner",
      "I = PRT"
    ],
    "heroSubtitle": "Berechnen Sie einfache Zinserträge und den gesamten Endwert mit der grundlegenden Formel I = P × R × T.",
    "about": [
      "Der Rechner für einfache Zinsen berechnet lineare Zinsen auf Schuldscheine, kurzfristige Darlehen, Einlagenzertifikate und für akademische Finanzprobleme. Im Gegensatz zu Zinseszinsen werden einfache Zinsen nicht auf bereits verdiente Zinsen berechnet – die Gebühr wird ausschließlich auf den ursprünglichen Kapitalbetrag erhoben.",
      "Diese Berechnung wird häufig bei kurzfristigen Peer-to-Peer-Darlehen, Pfandleihgeschäften, Autofinanzierungen und Ratenzahlungsplänen für Unterhaltungselektronik verwendet."
    ],
    "formula": {
      "title": "Formel für einfache Zinsen",
      "formulaText": "Zinsen (I) = (Kapital × Zinssatz × Zeit) / 100\nGesamter Endbetrag (A) = Kapital + Zinsen",
      "explanation": "Multiplizieren Sie das ursprüngliche Kapital mit dem jährlichen Zinssatz und der Zeitdauer in Jahren, und teilen Sie das Ergebnis dann durch 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Kapital ursprünglicher investierter oder geliehener Betrag"
        },
        {
          "name": "R",
          "desc": "Jährlicher Zinssatz in Prozent"
        },
        {
          "name": "T",
          "desc": "Zeitdauer in Jahren"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den anfänglichen Kapitalbetrag ein.",
      "Geben Sie den jährlichen Zinssatz in Prozent ein.",
      "Geben Sie die Dauer oder Laufzeit des Darlehens in Jahren ein.",
      "Klicken Sie auf Berechnen, um die generierten einfachen Zinsen und den gesamten Rückzahlungs- oder Endbetrag zu sehen."
    ],
    "example": {
      "problem": "Berechnen Sie die einfachen Zinsen für einen persönlichen Schuldschein über $5,000 bei einem jährlichen Zinssatz von 5.5% über 3 Jahre.",
      "steps": [
        "Schritt 1: Variablen identifizieren: P = 5,000, R = 5.5, T = 3.",
        "Schritt 2: Zinsen berechnen: I = (5,000 × 5.5 × 3) ÷ 100 = 82,500 ÷ 100 = $825.00.",
        "Schritt 3: Gesamtbetrag: $5,000 + $825 = $5,825.00."
      ],
      "result": "Die verdienten einfachen Zinsen betragen $825.00, was einem gesamten Endbetrag von $5,825.00 entspricht."
    },
    "notes": [
      "Wenn die Zeit in Monaten angegeben ist, teilen Sie durch 12 (z.B. 6 Monate = 0.5 Jahre). Wenn in Tagen angegeben, teilen Sie durch 365.",
      "Einfache Zinsen ergeben über identische Zeiträume weniger Gesamtgeld als Zinseszinsen.",
      "Formeln für einfache Zinsen sind der Maßstab für Commercial Paper und Schatzwechsel."
    ],
    "faqs": [
      {
        "question": "Wie lautet die Formel für einfache Zinsen?",
        "answer": "Die Formel lautet I = P × R × T / 100, wobei I die Zinsen, P das Kapital, R der jährliche Zinssatz und T die Zeit in Jahren ist."
      },
      {
        "question": "Wie unterscheiden sich einfache Zinsen von Zinseszinsen?",
        "answer": "Einfache Zinsen werden ausschließlich auf den ursprünglichen Kapitalbetrag berechnet. Zinseszinsen werden sowohl auf das Kapital als auch auf die zuvor angesammelten Zinsen berechnet."
      },
      {
        "question": "Wann werden einfache Zinsen verwendet?",
        "answer": "Einfache Zinsen werden typischerweise für kurzfristige Privatdarlehen, Autofinanzierungen, die Zinsanrechnung bei Studienkrediten während der tilgungsfreien Zeit und für Commercial Paper verwendet."
      },
      {
        "question": "Warum wird in der Formel für einfache Zinsen durch 100 geteilt?",
        "answer": "Die Division durch 100 erfolgt, weil der Zinssatz (R) in der Regel als Prozentsatz angegeben wird (z.B. 5.5 %). Um ihn in eine Dezimalzahl für die Berechnung umzuwandeln, muss er durch 100 geteilt werden. Wenn R bereits als Dezimalzahl (z.B. 0.055) eingegeben wird, entfällt die Division durch 100."
      }
    ],
    "breadcrumbName": "Einfacher Zinsrechner"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "de",
    "name": "GST-Rechner",
    "category": "financial",
    "badge": "Waren- und Dienstleistungssteuer",
    "icon": "Receipt",
    "h1": "GST-Rechner",
    "seoTitle": "GST-Rechner – Inklusive & Exklusive Beträge berechnen",
    "seoDescription": "Kostenloser Online GST-Rechner. Berechnen Sie GST-inklusive und GST-exklusive Preise, die Steueraufschlüsselung (CGST/SGST) und Nettobeträge für Standardsteuersätze (5%, 12%, 18%, 28%).",
    "primaryKeyword": "GST-Rechner",
    "secondaryKeywords": [
      "GST-Rechner Indien",
      "GST-Berechnung",
      "GST berechnen",
      "GST-inklusive Rechner",
      "GST-exklusive Rechner",
      "GST-Rückwärtsrechner"
    ],
    "heroSubtitle": "Berechnen Sie die Waren- und Dienstleistungssteuer (GST) für inklusive und exklusive Transaktionen, teilen Sie CGST und SGST auf und ermitteln Sie Nettorechnungspreise.",
    "about": [
      "Der Waren- und Dienstleistungssteuer (GST)-Rechner automatisiert die Steuerfakturierung für Geschäftsinhaber, Freiberufler, Buchhalter und Endverbraucher. Die GST ist eine umfassende, zielortbasierte Mehrwertsteuer, die auf die Herstellung, den Verkauf und den Verbrauch von Waren und Dienstleistungen erhoben wird.",
      "Dieses Tool unterstützt zwei gängige kommerzielle Modi: GST Exklusiv (Hinzufügen der Steuer zu einem Grundpreis) und GST Inklusiv (Rückwärtsberechnung des steuerfreien Grundpreises und des genauen Steueranteils aus einem Brutto-Verkaufspreis). Wählen Sie aus Standard-GST-Sätzen (wie 5%, 12%, 18%, 28%) oder geben Sie benutzerdefinierte Sätze ein."
    ],
    "formula": {
      "title": "GST-Formeln für inklusive & exklusive Beträge",
      "formulaText": "GST Exklusiv (GST hinzufügen):\nGST-Betrag = Grundpreis × (GST-Satz / 100)\nEndpreis = Grundpreis + GST-Betrag\n\nGST Inklusiv (GST entfernen):\nGrundpreis = Bruttobetrag / (1 + GST-Satz / 100)\nGST-Betrag = Bruttobetrag - Grundpreis",
      "explanation": "Um die GST hinzuzufügen, multiplizieren Sie den Grundbetrag mit dem Satz. Um die GST aus einem Gesamtbetrag zu extrahieren, teilen Sie die Bruttosumme durch 1 plus den Dezimalsatz.",
      "variables": [
        {
          "name": "Grundpreis",
          "desc": "Nettopreis des Produkts oder der Dienstleistung vor Steuern"
        },
        {
          "name": "GST-Satz",
          "desc": "Anwendbarer gesetzlicher Steuersatz in Prozent"
        },
        {
          "name": "CGST / SGST",
          "desc": "Zentrale und staatliche GST-Komponenten (jede entspricht 50% der gesamten GST in Indien)"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den Transaktionsbetrag ein.",
      "Wählen Sie, ob der Preis GST Exklusiv (Steuer hinzufügen) oder GST Inklusiv (Steuer entfernen) ist.",
      "Wählen Sie einen Standardsteuersatz (z.B. 5%, 12%, 18%, 28%) oder geben Sie einen benutzerdefinierten Satz ein.",
      "Klicken Sie auf 'Berechnen', um den steuerfreien Grundpreis, den GST-Steueranteil, die CGST/SGST-Aufteilung und den endgültigen Rechnungspreis zu sehen."
    ],
    "example": {
      "problem": "Berechnen Sie die Kosten vor Steuern und den Steuerbetrag eines Artikels, der für ₹1,180 mit einem inklusiven GST-Satz von 18% verkauft wird.",
      "steps": [
        "Schritt 1: Grundpreis = ₹1,180 ÷ (1 + 0.18) = ₹1,180 ÷ 1.18 = ₹1,000.00.",
        "Schritt 2: Gesamt-GST = ₹1,180 - ₹1,000 = ₹180.00.",
        "Schritt 3: CGST (9%) = ₹90.00, und SGST (9%) = ₹90.00."
      ],
      "result": "Der Nettogrundpreis beträgt ₹1,000.00 und die berechnete GST beträgt ₹180.00."
    },
    "notes": [
      "Bei innerstaatlichen Transaktionen in Indien wird die GST gleichmäßig zwischen CGST (Central GST) und SGST (State GST) aufgeteilt.",
      "Bei zwischenstaatlichen Verkäufen über Bundesstaatsgrenzen hinweg wird die gesamte Steuer als IGST (Integrated GST) bezeichnet.",
      "Wählbare Standard-GST-Sätze umfassen 0%, 5%, 12%, 18% und 28%."
    ],
    "faqs": [
      {
        "question": "Wie berechnet man einen GST-inklusiven Preis?",
        "answer": "Teilen Sie den gesamten inklusiven Preis durch (1 + GST-Satz / 100). Bei einem GST-Satz von 18% teilen Sie den Gesamtpreis durch 1.18, um den Grundpreis vor Steuern zu ermitteln."
      },
      {
        "question": "Was ist der Unterschied zwischen GST-inklusiv und GST-exklusiv?",
        "answer": "GST Exklusiv bedeutet, dass die Steuer noch nicht zum Preis hinzugefügt wurde. GST Inklusiv bedeutet, dass der angegebene Preis die Steuer bereits enthält."
      },
      {
        "question": "Was sind CGST, SGST und IGST?",
        "answer": "In Indien geht die CGST an die Zentralregierung, die SGST an die Landesregierung für lokale Verkäufe, und die IGST gilt für Verkäufe über Bundesstaatsgrenzen hinweg."
      },
      {
        "question": "Für welche Länder ist dieser GST-Rechner relevant?",
        "answer": "Dieser Rechner ist primär für die indische Waren- und Dienstleistungssteuer (GST) konzipiert, da er spezifische Komponenten wie CGST und SGST berücksichtigt. Die grundlegenden Berechnungsformeln können jedoch auch für ähnliche Mehrwertsteuersysteme in anderen Ländern angepasst werden."
      }
    ],
    "breadcrumbName": "GST-Rechner"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "de",
    "name": "Steuerrechner",
    "category": "financial",
    "badge": "Einkommen & Abzüge",
    "icon": "Scale",
    "h1": "Steuerrechner",
    "seoTitle": "Steuerrechner – Einkommensteuer & Nettoverdienst schätzen",
    "seoDescription": "Kostenloser Online-Einkommensteuerrechner. Schätzen Sie Ihr zu versteuerndes Einkommen, die Einkommensteuerklassen, den effektiven Steuersatz und Ihr monatliches Netto-Gehalt.",
    "primaryKeyword": "Steuerrechner",
    "secondaryKeywords": [
      "Einkommensteuerrechner",
      "Steuerschätzungsrechner",
      "Einkommensteuer berechnen",
      "Nettoverdienstrechner",
      "Rechner effektiver Steuersatz"
    ],
    "heroSubtitle": "Schätzen Sie Ihr zu versteuerndes Einkommen, Ihre Einkommensteuerschuld, den effektiven Steuersatz und Ihr monatliches Netto-Gehalt.",
    "about": [
      "Der Einkommensteuerrechner bietet einen generischen Schätzer für die progressive Besteuerung, um Arbeitnehmern und Selbstständigen zu helfen, ihre jährliche Steuerschuld und ihren Nettoverdienst zu prognostizieren. Progressive Steuersysteme wenden höhere Steuersätze nur auf Einkommensteile an, die bestimmte Schwellenwerte überschreiten.",
      "Geben Sie Ihr jährliches Bruttoeinkommen und zulässige Abzüge (wie Pauschbeträge, Altersvorsorgebeiträge oder Gesundheitskonten) ein, um die geschätzte Steuerschuld, den Grenzsteuersatz im Vergleich zum effektiven Steuersatz und das monatliche Nettoeinkommen anzuzeigen."
    ],
    "formula": {
      "title": "Progressives Einkommensteuersystem",
      "formulaText": "Zu versteuerndes Einkommen = Jährliches Bruttoeinkommen - Abzüge\nSteuer = ∑ (Zu versteuerndes Einkommen in Klammer × Klammersatz)\nEffektiver Steuersatz = (Gesamtsteuer / Bruttoeinkommen) × 100\nNettoverdienst = Bruttoeinkommen - Gesamtsteuer",
      "explanation": "Abzüge senken Ihre zu versteuernde Bemessungsgrundlage. Steuerklassen werden inkrementell angewendet – das Einkommen wird nicht mit einem einzigen pauschalen Höchstsatz besteuert.",
      "variables": [
        {
          "name": "Bruttoeinkommen",
          "desc": "Gesamteinkommen vor Steuern aus Anstellung oder Geschäftstätigkeit"
        },
        {
          "name": "Abzüge",
          "desc": "Zulässige Pauschbeträge oder steuerfreie Freibeträge"
        },
        {
          "name": "Effektiver Steuersatz",
          "desc": "Der tatsächliche durchschnittliche Prozentsatz des Einkommens, der als Steuer gezahlt wird"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Ihr jährliches Bruttoeinkommen ein.",
      "Geben Sie Ihre geschätzten jährlichen Abzüge ein (z. B. den Pauschbetrag oder Altersvorsorgebeiträge).",
      "Klicken Sie auf 'Berechnen', um Ihr geschätztes zu versteuerndes Einkommen, Ihre Steuerschuld, den effektiven Steuersatz und Ihr monatliches Netto-Gehalt anzuzeigen."
    ],
    "example": {
      "problem": "Schätzen Sie die Steuer für eine Person, die $85.000 verdient und einen Pauschbetrag von $14.600 hat.",
      "steps": [
        "Schritt 1: Zu versteuerndes Einkommen = $85.000 - $14.600 = $70.400.",
        "Schritt 2: 10% auf die ersten $11.600 = $1.160,00.",
        "Schritt 3: 12% auf ($47.150 - $11.600 = $35.550) = $4.266,00.",
        "Schritt 4: 22% auf den Rest ($70.400 - $47.150 = $23.250) = $5.115,00.",
        "Schritt 5: Geschätzte Gesamtsteuer = $1.160 + $4.266 + $5.115 = $10.541,00.",
        "Schritt 6: Effektiver Steuersatz = ($10.541 ÷ $85.000) × 100 = 12,40%."
      ],
      "result": "Die geschätzte Einkommensteuer beträgt $10.541,00 bei einem effektiven Steuersatz von 12,40% und einem Nettoverdienst von $74.459,00."
    },
    "notes": [
      "Dieses Tool liefert generische Informationsschätzungen und ersetzt keine offizielle Beratung durch einen zertifizierten Steuerberater oder Steuerfachmann.",
      "Landes-, Provinz-, Kommunalsteuern und Sozialversicherungsbeiträge werden separat berechnet.",
      "Der Grenzsteuersatz bezieht sich auf den Satz, der auf den zuletzt verdienten Euro gezahlt wird; der effektive Steuersatz ist Ihre tatsächliche durchschnittliche Steuerlast."
    ],
    "faqs": [
      {
        "question": "Was ist der Unterschied zwischen Grenzsteuersatz und effektivem Steuersatz?",
        "answer": "Ihr Grenzsteuersatz ist der höchste Steuersatz, der auf den letzten Euro Ihres Einkommens angewendet wird. Ihr effektiver Steuersatz ist der tatsächliche Gesamtprozentsatz Ihres gesamten Einkommens, der als Steuer gezahlt wird."
      },
      {
        "question": "Wie senken Abzüge meine Steuerschuld?",
        "answer": "Abzüge reduzieren Ihr zu versteuerndes Einkommen. Zum Beispiel reduziert ein Abzug von $10.000 für jemanden in einer 22%-Steuerklasse die tatsächlich geschuldete Steuer um $2.200."
      },
      {
        "question": "Beinhaltet dieser Rechner die Einkommensteuer der Bundesländer?",
        "answer": "Dieses Modell berechnet standardmäßige progressive Steuerklassen. Landes- und Kommunalsteuern variieren je nach Gerichtsbarkeit und sollten zusätzlich berücksichtigt werden."
      }
    ],
    "breadcrumbName": "Steuerrechner"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "de",
    "name": "Rabattrechner",
    "category": "financial",
    "badge": "Angebote & Ersparnisse",
    "icon": "Tag",
    "h1": "Rabattrechner",
    "seoTitle": "Rabattrechner – Verkaufspreis und prozentuale Ersparnis berechnen",
    "seoDescription": "Kostenloser Online-Rabattrechner. Berechnen Sie sofort Endverkaufspreise, gespartes Geld und prozentuale Rabatte, optional mit Mehrwertsteuerberechnung.",
    "primaryKeyword": "Rabattrechner",
    "secondaryKeywords": [
      "Prozent Rabatt Rechner",
      "Verkaufspreis berechnen",
      "Rabattprozentsatz berechnen",
      "wie viel spare ich",
      "Originalpreis bei Rabatt"
    ],
    "heroSubtitle": "Berechnen Sie reduzierte Verkaufspreise, die gesamte Ersparnis und die Endkosten inklusive Mehrwertsteuer für Einkäufe und Einzelhandelsaktionen.",
    "about": [
      "Der Rabattrechner hilft Käufern und Einzelhändlern, Preisnachlässe bei Verkaufsaktionen (wie Black Friday, Cyber Monday, saisonale Ausverkäufe und Aktionsgutscheine) schnell zu berechnen.",
      "Geben Sie den Originalpreis und den beworbenen prozentualen Rabatt ein, um sofort zu sehen, wie viel Geld Sie sparen, den reduzierten Preis und die endgültigen Kosten nach Anwendung der lokalen Mehrwertsteuer."
    ],
    "formula": {
      "title": "Formeln für Rabatt und Endverkaufspreis",
      "formulaText": "Ersparnis = Originalpreis × (Rabatt % / 100)\nReduzierter Preis = Originalpreis - Ersparnis\nEndpreis mit Steuer = Reduzierter Preis + (Reduzierter Preis × Steuer % / 100)",
      "explanation": "Multiplizieren Sie den Listenpreis mit dem Rabattprozentsatz, um die Ersparnis zu ermitteln, und ziehen Sie diesen Betrag dann vom Originalpreis ab.",
      "variables": [
        {
          "name": "Originalpreis",
          "desc": "Hersteller- oder Einzelhandels-Listenpreis vor dem Verkauf"
        },
        {
          "name": "Rabatt %",
          "desc": "Beworbener prozentualer Preisnachlass"
        },
        {
          "name": "Mehrwertsteuer %",
          "desc": "Optionaler staatlicher oder lokaler Mehrwertsteuersatz"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den Original-Listenpreis ein.",
      "Geben Sie den Rabattprozentsatz ein (z.B. 20% oder 35% Rabatt).",
      "Geben Sie optional Ihren lokalen Mehrwertsteuersatz ein.",
      "Klicken Sie auf 'Berechnen', um Ihre genaue Ersparnis und den Endpreis zu sehen."
    ],
    "example": {
      "problem": "Eine Winterjacke zum Preis von $180 ist mit 30% Rabatt im Angebot, zuzüglich 8% lokaler Mehrwertsteuer.",
      "steps": [
        "Schritt 1: Ersparnis = $180 × 0.30 = $54.00.",
        "Schritt 2: Reduzierter Preis = $180 - $54.00 = $126.00.",
        "Schritt 3: Mehrwertsteuer = $126.00 × 0.08 = $10.08.",
        "Schritt 4: Endpreis = $126.00 + $10.08 = $136.08."
      ],
      "result": "Sie sparen $54.00. Die Jacke kostet $126.00 vor Steuern und $136.08 nach Steuern."
    },
    "notes": [
      "Ein Rabatt von 50% bedeutet, dass Sie die Hälfte des Originalpreises zahlen.",
      "Das Stapeln von Rabatten (z.B. 20% Rabatt plus zusätzliche 10% Rabatt) entspricht nicht 30% Rabatt – der zweite Rabatt wird auf den bereits reduzierten Zwischensumme angewendet.",
      "Die Mehrwertsteuer wird auf den endgültigen reduzierten Preis erhoben, nicht auf den ursprünglichen Listenpreis."
    ],
    "faqs": [
      {
        "question": "Wie berechnet man einen Rabatt von 20% auf einen Artikel?",
        "answer": "Multiplizieren Sie den Preis mit 0.20, um die Ersparnis zu finden, oder multiplizieren Sie den Preis mit 0.80, um direkt den endgültigen Verkaufspreis zu erhalten."
      },
      {
        "question": "Wie funktioniert ein 'Kaufe eins, erhalte das zweite 50% günstiger'-Angebot in Prozent?",
        "answer": "Wenn zwei gleichpreisige Artikel gekauft werden, entspricht ein 'Kaufe eins, erhalte das zweite 50% günstiger'-Rabatt einem Gesamtrabatt von 25% auf beide Artikel."
      },
      {
        "question": "Wie berechne ich den Originalpreis aus einem reduzierten Verkaufspreis?",
        "answer": "Teilen Sie den Verkaufspreis durch (1 - Rabatt % / 100). Wenn ein Artikel beispielsweise nach einem Rabatt von 20% $80 kostet: $80 / 0.80 = $100 Originalpreis."
      },
      {
        "question": "Was ist der Unterschied zwischen einem Rabatt und einem Skonto?",
        "answer": "Ein Rabatt ist ein Preisnachlass, der in der Regel sofort beim Kauf gewährt wird. Skonto ist ein Preisnachlass, der für die frühzeitige Zahlung einer Rechnung gewährt wird, oft innerhalb einer bestimmten Frist."
      }
    ],
    "breadcrumbName": "Rabattrechner"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "de",
    "name": "Gewinnmargenrechner",
    "category": "financial",
    "badge": "Marge vs. Aufschlag",
    "icon": "BarChart3",
    "h1": "Gewinnmargenrechner",
    "seoTitle": "Gewinnmargenrechner – Bruttomarge & Aufschlag online berechnen",
    "seoDescription": "Kostenloser Online-Gewinnmargenrechner. Berechnen Sie Bruttogewinn, Gewinnmargenprozentsatz und Aufschlagsprozentsatz basierend auf Artikelkosten und Verkaufspreis.",
    "primaryKeyword": "gewinnmargenrechner",
    "secondaryKeywords": [
      "gewinnrechner",
      "margenrechner",
      "aufschlagrechner",
      "bruttogewinnmarge",
      "marge vs aufschlag"
    ],
    "heroSubtitle": "Berechnen Sie Bruttogewinn, Gewinnmargenprozentsatz und Einzelhandelsaufschlag, um Produkte profitabel zu bepreisen.",
    "about": [
      "Der Gewinnmargenrechner hilft Unternehmern, Einzelhändlern, Dropshippern und Kleinunternehmern, die Rentabilität genau zu bestimmen und zwischen Marge und Aufschlag zu unterscheiden. Die Verwechslung dieser beiden Kennzahlen ist einer der häufigsten Preisfehler im Handel.",
      "Die Bruttogewinnmarge gibt an, welcher Prozentsatz des Gesamtumsatzes nach Abzug der Wareneinsatzkosten (COGS) verbleibt. Der Aufschlag spiegelt die prozentuale Erhöhung wider, die über die Basiskosten angewendet wird, um den Einzelhandelsverkaufspreis festzulegen."
    ],
    "formula": {
      "title": "Formeln für Bruttomarge und Aufschlag",
      "formulaText": "Bruttogewinn = Umsatz - Kosten\nGewinnmarge (%) = (Bruttogewinn / Umsatz) × 100\nAufschlag (%) = (Bruttogewinn / Kosten) × 100",
      "explanation": "Die Marge wird relativ zum Umsatz (Verkaufspreis) berechnet, während der Aufschlag relativ zu den Produktkosten berechnet wird.",
      "variables": [
        {
          "name": "Kosten",
          "desc": "Kosten der verkauften Waren (COGS) für den Erwerb oder die Herstellung der Einheit"
        },
        {
          "name": "Umsatz",
          "desc": "Verkaufspreis, der dem Verbraucher berechnet wird"
        },
        {
          "name": "Bruttogewinn",
          "desc": "Nettoerlös, der nach Abzug der direkten Produktionskosten verbleibt"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie die Kosten für den Erwerb oder die Herstellung des Produkts ein (z.B. $40).",
      "Geben Sie den Umsatz oder den Zielverkaufspreis ein (z.B. $100).",
      "Klicken Sie auf Berechnen, um den Bruttogewinn in Dollar, den Gewinnmargenprozentsatz und den erforderlichen Aufschlagsprozentsatz anzuzeigen."
    ],
    "example": {
      "problem": "Ein Unternehmen kauft einen Artikel für $50 und verkauft ihn für $80. Wie hoch sind Bruttogewinn, Gewinnmarge und Aufschlag?",
      "steps": [
        "Schritt 1: Bruttogewinn = $80 (Umsatz) - $50 (Kosten) = $30.00.",
        "Schritt 2: Gewinnmarge = ($30 ÷ $80) × 100 = 37.5%.",
        "Schritt 3: Aufschlag = ($30 ÷ $50) × 100 = 60.0%."
      ],
      "result": "Der Bruttogewinn beträgt $30.00. Die Gewinnmarge beträgt 37.5%, und der Aufschlag beträgt 60.0%."
    },
    "notes": [
      "Die Marge kann niemals 100% überschreiten, während der Aufschlag 200%, 500% oder höher sein kann.",
      "Ein Aufschlag von 50% entspricht einer Marge von 33.3%. Ein Aufschlag von 100% entspricht einer Marge von 50%.",
      "Die Nettogewinnmarge zieht zusätzlich zu den direkten Produktionskosten auch Gemeinkosten, Marketing und Steuern ab."
    ],
    "faqs": [
      {
        "question": "Was ist der Hauptunterschied zwischen Marge und Aufschlag?",
        "answer": "Die Marge ist der Gewinn geteilt durch den Verkaufspreis (Umsatz). Der Aufschlag ist der Gewinn geteilt durch die Kosten. Die Marge misst, was Sie vom Umsatz behalten; der Aufschlag misst, was Sie zu den Kosten hinzufügen."
      },
      {
        "question": "Warum ist der Aufschlag für denselben Artikel immer höher als die Marge?",
        "answer": "Weil die Kosten für profitable Waren immer geringer sind als der Verkaufspreis. Wenn man denselben Gewinnbetrag durch die geringeren Kosten teilt, ergibt sich ein höherer Prozentsatz, als wenn man ihn durch den Umsatz teilt."
      },
      {
        "question": "Was ist eine gute Gewinnmarge für Einzelhandelsunternehmen?",
        "answer": "Eine gesunde Bruttogewinnmarge liegt im Einzelhandel und E-Commerce typischerweise zwischen 40% und 60%, während die Nettogewinnmargen typischerweise zwischen 10% und 20% liegen."
      },
      {
        "question": "Wie kann ich meine Gewinnmarge verbessern?",
        "answer": "Um Ihre Gewinnmarge zu verbessern, können Sie entweder Ihre Verkaufspreise erhöhen, Ihre Kosten senken (z.B. durch bessere Einkaufskonditionen oder effizientere Produktion) oder eine Kombination aus beidem anwenden. Auch die Optimierung des Produktmixes kann helfen."
      }
    ],
    "breadcrumbName": "Gewinnmargenrechner"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "de",
    "name": "Gehaltsrechner",
    "category": "financial",
    "badge": "Stunden-, Monats- & Jahresgehalt",
    "icon": "Wallet",
    "h1": "Gehaltsrechner",
    "seoTitle": "Gehaltsrechner – Stundenlohn, Wochen-, Monats- & Jahresgehalt umrechnen",
    "seoDescription": "Kostenloser Online-Gehaltsrechner. Rechnen Sie zwischen Stundenlohn, Wochenlohn, zweiwöchentlichem Gehalt, Monatseinkommen und Jahresgehalt mit individuellen Arbeitszeiten um.",
    "primaryKeyword": "gehaltsrechner",
    "secondaryKeywords": [
      "jahresgehaltsrechner",
      "monatsgehaltsrechner",
      "stundenlohnrechner",
      "stundenlohn in gehalt umrechnen",
      "lohnrechner"
    ],
    "heroSubtitle": "Wandeln Sie Ihr Einkommen um zwischen Jahresgehalt, Monatslohn, zweiwöchentlichen Zahlungen und Stundenlöhnen.",
    "about": [
      "Der Gehaltsrechner wandelt das Arbeitsentgelt über alle gängigen Abrechnungsperioden um: Jahresgehalt, Monatseinkommen, zweiwöchentliche Gehaltszahlungen, Wochenlöhne, Tagessätze und Stundenlöhne.",
      "Egal, ob Sie ein Jobangebot verhandeln, einen Auftragnehmerlohn von $30/Stunde in ein jährliches Äquivalent umrechnen oder monatliche Lebenshaltungskosten budgetieren – dieser Rechner bietet sofortige, standardisierte Gehaltsumrechnungen basierend auf Ihren wöchentlichen Arbeitsstunden."
    ],
    "formula": {
      "title": "Standard-Umrechnungsstandards für Gehälter",
      "formulaText": "Jahresgehalt = Stundenlohn × Stunden/Woche × Wochen/Jahr\nMonatsgehalt = Jahresgehalt / 12\nZweiwöchentliche Zahlung = Jahresgehalt / 26\nWöchentliche Zahlung = Jahresgehalt / 52\nStundenlohn = Jahresgehalt / (Stunden/Woche × Wochen/Jahr)",
      "explanation": "Basierend auf einer Standard-Arbeitswoche von 40 Stunden und 52 Arbeitswochen pro Jahr (2.080 jährliche Arbeitsstunden).",
      "variables": [
        {
          "name": "Standardstunden",
          "desc": "40 Stunden pro Woche"
        },
        {
          "name": "Standardwochen",
          "desc": "52 Wochen pro Kalenderjahr (insgesamt 2.080 Arbeitsstunden)"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Ihren Vergütungsbetrag ein.",
      "Wählen Sie die Zahlungsfrequenz: Jährlich, Monatlich, Zweiwöchentlich, Wöchentlich, Täglich oder Stündlich.",
      "Passen Sie die Arbeitsstunden pro Woche (Standard 40) oder die Arbeitswochen pro Jahr (Standard 52) an.",
      "Klicken Sie auf Berechnen, um eine vollständige Umrechnungstabelle für alle Zahlungsperioden anzuzeigen."
    ],
    "example": {
      "problem": "Rechnen Sie ein Jahresgehalt von $75.000 in Monats-, zweiwöchentliche, wöchentliche und stündliche Zahlungen um (40 Stunden/Woche, 52 Wochen).",
      "steps": [
        "Schritt 1: Monatsgehalt = $75.000 ÷ 12 = $6.250,00.",
        "Schritt 2: Zweiwöchentliche Zahlung (26 Zahlungsperioden) = $75.000 ÷ 26 = $2.884,62.",
        "Schritt 3: Wöchentliche Zahlung = $75.000 ÷ 52 = $1.442,31.",
        "Schritt 4: Stundenlohn = $75.000 ÷ 2.080 Stunden = $36,06/Stunde."
      ],
      "result": "Ein Jahresgehalt von $75.000 entspricht $6.250/Monat, $2.884,62 zweiwöchentlich und $36,06 pro Stunde."
    },
    "notes": [
      "Die Berechnungen spiegeln das Bruttoeinkommen vor Steuern und Abzügen für Sozialleistungen wider.",
      "Zweiwöchentliche Zahlungen erfolgen 26 Mal pro Jahr (was dazu führt, dass zwei Monate pro Jahr drei Gehaltsschecks haben). Halbmonatliche Zahlungen erfolgen 24 Mal pro Jahr.",
      "Für freiberufliche Auftragnehmer sind Selbstständigkeitssteuern und unbezahlte Urlaubswochen zu berücksichtigen."
    ],
    "faqs": [
      {
        "question": "Wie rechnet man Stundenlohn in Jahresgehalt um?",
        "answer": "Multiplizieren Sie Ihren Stundenlohn mit den pro Woche gearbeiteten Stunden und dann mit 52 Wochen. Für eine Vollzeitstelle mit 40 Stunden pro Woche multiplizieren Sie den Stundenlohn mit 2.080."
      },
      {
        "question": "Was ist der Unterschied zwischen zweiwöchentlicher und halbmonatlicher Gehaltszahlung?",
        "answer": "Zweiwöchentliche Zahlungen erfolgen alle zwei Wochen (26 Gehaltsschecks/Jahr). Halbmonatliche Zahlungen erfolgen zweimal im Monat an bestimmten Daten, z.B. am 1. und 15. (24 Gehaltsschecks/Jahr)."
      },
      {
        "question": "Wie viele Arbeitsstunden hat ein Standard-Arbeitsjahr?",
        "answer": "Ein Standard-Vollzeitmitarbeiter, der 40 Stunden pro Woche über 52 Wochen arbeitet, leistet insgesamt 2.080 Stunden pro Jahr."
      },
      {
        "question": "Warum ist es wichtig, mein Gehalt in verschiedene Frequenzen umrechnen zu können?",
        "answer": "Die Umrechnung Ihres Gehalts in verschiedene Frequenzen hilft Ihnen bei der Budgetplanung, der Bewertung von Jobangeboten (z.B. Vergleich eines Stundenlohns mit einem Jahresgehalt) und dem besseren Verständnis Ihrer finanziellen Situation, insbesondere bei der Planung von Ausgaben oder Ersparnissen."
      }
    ],
    "breadcrumbName": "Gehaltsrechner"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "de",
    "name": "Währungsrechner",
    "category": "financial",
    "badge": "Wechselkurse & Devisen",
    "icon": "Coins",
    "h1": "Währungsrechner",
    "seoTitle": "Währungsrechner – Devisenrechner & Live-Wechselkurse",
    "seoDescription": "Kostenloser Online-Währungsrechner. Konvertieren Sie zwischen USD, EUR, GBP, INR, CAD, AUD, JPY und wichtigen globalen Währungen mit Interbanken-Wechselkursen.",
    "primaryKeyword": "Währungsrechner",
    "secondaryKeywords": [
      "Währungsumrechner",
      "Wechselkursrechner",
      "USD in INR Rechner",
      "EUR in USD Rechner",
      "Devisenrechner"
    ],
    "heroSubtitle": "Konvertieren Sie Beträge zwischen globalen Währungen mit transparenten Interbanken-Referenzwechselkursen.",
    "about": [
      "Der Währungsrechner bietet zuverlässige Devisenumrechnungen für wichtige globale Währungen, darunter den US-Dollar (USD), Euro (EUR), Britisches Pfund (GBP), Indische Rupie (INR), Kanadischer Dollar (CAD), Australischer Dollar (AUD), Japanischer Yen (JPY) und Schweizer Franken (CHF).",
      "Egal, ob Sie eine Auslandsreise planen, internationale Freelancer-Rechnungen umrechnen oder internationale E-Commerce-Preise vergleichen – dieses Tool konvertiert Werte unter Verwendung der standardmäßigen Interbanken-Mittelkurs-Referenzraten."
    ],
    "formula": {
      "title": "Währungsumrechnung",
      "formulaText": "Zielbetrag = Ausgangsbetrag × Direkter Wechselkurs (Von Währung ⟶ Zu Währung)\nInverser Kurs = 1 / Direkter Wechselkurs",
      "explanation": "Konvertiert die Ausgangswährung in das USD-Basisäquivalent und skaliert dann mit dem Wechselkursmultiplikator der Zielwährung.",
      "variables": [
        {
          "name": "Ausgangsbetrag",
          "desc": "Der zu konvertierende Geldbetrag"
        },
        {
          "name": "Direkter Kurs",
          "desc": "Der Preis einer Einheit der Ausgangswährung in Bezug auf die Zielwährung"
        },
        {
          "name": "Inverser Kurs",
          "desc": "Der Kehrwert des Preises der Zielwährung in Bezug auf die Ausgangswährung"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den zu konvertierenden Geldbetrag ein.",
      "Wählen Sie die Ausgangswährung (z.B. USD, EUR, GBP).",
      "Wählen Sie die Zielwährung (z.B. INR, CAD, AUD).",
      "Klicken Sie auf 'Berechnen', um den umgerechneten Betrag, den aktuellen Referenzwechselkurs und den umgekehrten Umrechnungskurs anzuzeigen."
    ],
    "example": {
      "problem": "Wandeln Sie 500 USD in Euro (EUR) um, bei einem illustrativen Referenzwechselkurs von 1 USD = 0,8950 EUR.",
      "steps": [
        "Schritt 1: Ausgangsbetrag = 500 USD.",
        "Schritt 2: Multiplizieren Sie mit dem Wechselkurs: 500 × 0,8950 = 447,50 EUR.",
        "Schritt 3: Inverser Kurs = 1 ÷ 0,8950 = 1,1173 USD pro 1 EUR."
      ],
      "result": "500 USD entsprechen 447,50 EUR bei einem illustrativen Referenzwechselkurs von 0,8950."
    },
    "notes": [
      "Die Wechselkurse spiegeln die Interbanken-Mittelkurse wider; Verbraucherbanken und Einzelhandelskarten können eine zusätzliche Fremdwährungsgebühr von 1,5% bis 3,5% erheben.",
      "Die Wechselkurse schwanken während der globalen Devisenhandelszeiten kontinuierlich.",
      "Referenzkurse werden regelmäßig anhand von Interbanken-Referenzdaten aktualisiert."
    ],
    "faqs": [
      {
        "question": "Was ist der Mittelkurs (Mid-Market Rate)?",
        "answer": "Der Mittelkurs ist der Mittelwert zwischen den globalen Ankaufs- und Verkaufskursen an den Devisenmärkten. Er stellt den fairsten, unaufgeschlagenen Kurs dar."
      },
      {
        "question": "Warum unterscheiden sich Einzelhandelswechselkurse von Online-Umrechnern?",
        "answer": "Kommerzielle Banken und Wechselstuben an Flughäfen wenden einen Aufschlag (Spread) oder eine Provisionsgebühr an, um an Währungsumrechnungsgeschäften zu verdienen."
      },
      {
        "question": "Kann ich den umgekehrten Umrechnungskurs berechnen?",
        "answer": "Ja. Der Rechner zeigt den Kehrwert des inversen Kurses (z.B. 1 INR = 0,012 USD) zusammen mit dem primären Umrechnungsergebnis an."
      },
      {
        "question": "Wie aktuell sind die Wechselkurse?",
        "answer": "Die im Rechner verwendeten Referenzwechselkurse werden regelmäßig aktualisiert, um die aktuellen Interbanken-Mittelkurse widerzuspiegeln. Beachten Sie jedoch, dass sich die Kurse im Devisenhandel ständig ändern können."
      }
    ],
    "breadcrumbName": "Währungsrechner"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "de",
    "name": "Prozentrechner",
    "category": "math",
    "badge": "Schnelles Mathematik-Tool",
    "icon": "Percent",
    "h1": "Prozentrechner",
    "seoTitle": "Prozentrechner – Prozentsätze einfach online berechnen",
    "seoDescription": "Kostenloser Online-Prozentrechner. Berechnen Sie Prozentsätze einer Zahl, prozentuale Änderungen, Zunahmen, Abnahmen und prozentuale Differenzen sofort mit Formeln.",
    "primaryKeyword": "prozentrechner",
    "secondaryKeywords": [
      "prozentsatz berechnen",
      "prozent rechner",
      "prozentuale zunahme rechner",
      "prozentuale abnahme rechner",
      "prozentuale differenz"
    ],
    "heroSubtitle": "Berechnen Sie Prozentsätze von Werten, prozentuale Zunahmen und Abnahmen oder finden Sie heraus, wie viel Prozent eine Zahl von einer anderen ist, mit sofortiger mathematischer Präzision.",
    "about": [
      "Der Prozentrechner ist ein vielseitiges Online-Tool für Studenten, Käufer, Buchhalter und Analysten, die schnelle, fehlerfreie Prozentberechnungen benötigen. Prozentsätze stellen Bruchteile von 100 dar und bilden das Rückgrat alltäglicher quantitativer Aufgaben – von der Berechnung von Verkaufsrabatten und Handelsaufschlägen bis zur Analyse von Finanzanlagerenditen und Prüfungsergebnissen.",
      "Dieses Tool unterstützt vier wesentliche Berechnungsmodi: Ermittlung eines Prozentsatzes eines Gesamtwertes, Berechnung, wie viel Prozent eine Zahl von einer anderen darstellt, Berechnung der prozentualen Zunahme oder Abnahme zwischen zwei Zahlen und Bestimmung der relativen prozentualen Differenz zwischen zwei unabhängigen Werten."
    ],
    "formula": {
      "title": "Standard-Prozentformeln",
      "formulaText": "Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100",
      "explanation": "Um zu berechnen, welchen Bruchteil eines Ganzen eine Größe darstellt, teilen Sie den Teil durch das Ganze und multiplizieren Sie mit 100. Für prozentuale Änderungen teilen Sie die absolute Zunahme oder Abnahme durch den ursprünglichen Ausgangswert.",
      "variables": [
        {
          "name": "Teil",
          "desc": "Der zu bewertende Anteil oder Teilwert"
        },
        {
          "name": "Ganzes",
          "desc": "Die Basis oder die gesamte Referenzgröße"
        },
        {
          "name": "Alter Wert",
          "desc": "Die ursprüngliche Basisgröße vor der Änderung"
        },
        {
          "name": "Neuer Wert",
          "desc": "Die aktualisierte Größe nach der Änderung"
        }
      ]
    },
    "howToCalculate": [
      "Wählen Sie den Prozentberechnungsmodus, der Ihrer Frage entspricht (z.B. „Wie viel sind X% von Y“ oder „Prozentuale Änderung“).",
      "Geben Sie Ihre bekannten Zahlenwerte in die dafür vorgesehenen Eingabefelder ein.",
      "Sehen Sie sich das in Echtzeit berechnete Ergebnis, die formatierte Formel und die Bruchaufschlüsselung unten an.",
      "Verwenden Sie die Schaltfläche „Kopieren“, um Ihr Ergebnis schnell zu exportieren, oder „Zurücksetzen“, um eine neue Berechnung durchzuführen."
    ],
    "example": {
      "problem": "Wie viel sind 15% von 240, und wie hoch ist die prozentuale Zunahme von 200 auf 250?",
      "steps": [
        "Schritt 1 (Prozentsatz eines Wertes): (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Schritt 2 (Prozentuale Zunahme): Differenz = 250 - 200 = 50.",
        "Schritt 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% Zunahme."
      ],
      "result": "15% von 240 sind 36. Eine Zunahme von 200 auf 250 entspricht einem Gewinn von 25%."
    },
    "notes": [
      "Die prozentuale Änderung wird immer durch die ursprüngliche Ausgangszahl geteilt, nicht durch die Endzahl.",
      "Eine prozentuale Zunahme, gefolgt von einer äquivalenten prozentualen Abnahme, führt nicht zum ursprünglichen Wert zurück (z.B. +50% und dann -50% ergeben 75% des Ausgangswertes).",
      "Um eine Dezimalzahl in einen Prozentsatz umzuwandeln, multiplizieren Sie mit 100 (z.B. 0.85 = 85%). Um einen Prozentsatz in eine Dezimalzahl umzuwandeln, teilen Sie durch 100."
    ],
    "faqs": [
      {
        "question": "Wie berechne ich einen Prozentsatz einer Zahl?",
        "answer": "Um einen Prozentsatz einer Zahl zu berechnen, wandeln Sie den Prozentsatz in eine Dezimalzahl um, indem Sie ihn durch 100 teilen, und multiplizieren Sie diese Dezimalzahl dann mit der Gesamtzahl. Zum Beispiel sind 20% von 150: (20 / 100) × 150 = 30."
      },
      {
        "question": "Wie berechne ich die prozentuale Zunahme zwischen zwei Zahlen?",
        "answer": "Ziehen Sie den ursprünglichen Wert vom neuen Wert ab, um die Differenz zu ermitteln. Teilen Sie dann diese Differenz durch den ursprünglichen Wert und multiplizieren Sie mit 100. Zum Beispiel von 50 auf 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% Zunahme."
      },
      {
        "question": "Was ist der Unterschied zwischen prozentualer Änderung und prozentualer Differenz?",
        "answer": "Die prozentuale Änderung wird verwendet, wenn es einen „alten“ und einen „neuen“ Wert über die Zeit gibt, wobei durch den Anfangswert geteilt wird. Die prozentuale Differenz wird verwendet, wenn zwei gleichzeitige Werte verglichen werden, bei denen keiner der Referenzwert ist, indem die absolute Differenz durch ihren Durchschnitt geteilt wird."
      },
      {
        "question": "Kann eine prozentuale Änderung negativ sein?",
        "answer": "Ja. Wenn der Endwert kleiner ist als der Anfangswert, ist die prozentuale Änderung negativ und stellt eine prozentuale Abnahme dar."
      }
    ],
    "breadcrumbName": "Prozentrechner"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "de",
    "name": "Verhältnisrechner",
    "category": "math",
    "badge": "Proportionen & Vereinfachung",
    "icon": "Divide",
    "h1": "Verhältnisrechner",
    "seoTitle": "Verhältnisrechner – Verhältnisse online vereinfachen und lösen",
    "seoDescription": "Kostenloser Online-Verhältnisrechner. Vereinfachen Sie Verhältnisse auf die kleinsten ganzen Zahlen, finden Sie fehlende Glieder in Proportionen (A:B = C:D) und berechnen Sie Skalierungsfaktoren sofort.",
    "primaryKeyword": "verhältnisrechner",
    "secondaryKeywords": [
      "verhältnis vereinfachen",
      "verhältnisse kürzen",
      "äquivalenzverhältnis rechner",
      "proportion lösen",
      "seitenverhältnis rechner"
    ],
    "heroSubtitle": "Vereinfachen Sie zweiteilige Verhältnisse auf die kleinsten ganzen Zahlen, generieren Sie äquivalente Brüche und lösen Sie sofort nach fehlenden Proportionsvariablen auf.",
    "about": [
      "Der Verhältnisrechner ermöglicht es Ihnen, Verhältnisse auf ihre kleinsten ganzen Zahlen zu vereinfachen, Dezimalverhältnisse in saubere ganzzahlige Proportionen umzuwandeln und äquivalente Proportionsgleichungen der Form A : B = C : D zu lösen.",
      "Verhältnisse drücken die relative Größe von zwei oder mehr Größen aus. Sie sind allgegenwärtig bei der Skalierung von Rezepten, Seitenverhältnissen im Grafikdesign (wie 16:9 und 4:3), Finanzkennzahlen in Bilanzen (Current Ratio, Debt-to-Equity) und chemischen Lösungsgemischen."
    ],
    "formula": {
      "title": "Formeln zur Verhältnisvereinfachung & Proportionen",
      "formulaText": "Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C",
      "explanation": "Um ein Verhältnis zu vereinfachen, teilen Sie beide Glieder durch ihren größten gemeinsamen Teiler (ggT). Bei Proportionen ermöglicht die Kreuzmultiplikation das Auflösen nach jeder einzelnen fehlenden Variablen.",
      "variables": [
        {
          "name": "A & B",
          "desc": "Erstes Vorder- und Hinterglied des Verhältnisses"
        },
        {
          "name": "C & D",
          "desc": "Zweites Vorder- und Hinterglied der äquivalenten Proportion"
        },
        {
          "name": "GCD",
          "desc": "Größter gemeinsamer Teiler (ggT) zwischen den Zahlen"
        }
      ]
    },
    "howToCalculate": [
      "Um ein Verhältnis zu vereinfachen, geben Sie die Zahlen A und B ein und sehen Sie die irreduzible ganzzahlige Proportion.",
      "Um eine Proportion A:B = C:D zu lösen, geben Sie drei bekannte Werte ein und lassen Sie das Zielfeld leer.",
      "Der Rechner führt die Kreuzmultiplikation durch und kürzt die Terme sofort."
    ],
    "example": {
      "problem": "Vereinfachen Sie das Verhältnis 24 : 36 und lösen Sie nach X in 4 : 5 = X : 25 auf.",
      "steps": [
        "Schritt 1 (Vereinfachung): Finden Sie den ggT(24, 36) = 12.",
        "Schritt 2: 24 ÷ 12 = 2 und 36 ÷ 12 = 3. Das vereinfachte Verhältnis ist 2 : 3.",
        "Schritt 3 (Proportion): 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 vereinfacht sich zu 2:3. In 4:5 = X:25 ist X gleich 20."
    },
    "notes": [
      "Beide Seiten eines Verhältnisses können mit derselben von Null verschiedenen Zahl multipliziert oder dividiert werden, ohne ihren Wert zu ändern.",
      "Dezimalverhältnisse werden vor der Reduktion automatisch mit Zehnerpotenzen multipliziert, um ganzzahlige Ausgaben zu gewährleisten.",
      "Verhältnisse stellen vergleichende Beziehungen dar, keine absoluten Mengen. Ein Verhältnis von 2:3 könnte 2 und 3 Gegenstände oder 200 und 300 Gegenstände beschreiben."
    ],
    "faqs": [
      {
        "question": "Wie vereinfacht man ein Verhältnis auf die kleinsten ganzen Zahlen?",
        "answer": "Finden Sie den größten gemeinsamen Teiler (ggT) beider Zahlen und teilen Sie dann beide Zahlen durch diesen ggT. Zum Beispiel ist bei 15:25 der ggT 5, sodass das Teilen beider durch 5 das Verhältnis 3:5 ergibt."
      },
      {
        "question": "Wie löst man eine Proportion, wenn eine Zahl unbekannt ist?",
        "answer": "Verwenden Sie die Kreuzmultiplikation: Wenn A/B = C/D, dann ist A × D = B × C. Multiplizieren Sie die diagonalen Zahlen und teilen Sie durch die verbleibende Zahl gegenüber der Unbekannten."
      },
      {
        "question": "Können Verhältnisse Dezimalzahlen oder Brüche enthalten?",
        "answer": "Obwohl Verhältnisse anfänglich mit Dezimalzahlen (z.B. 1,5 : 2,5) geschrieben werden können, ist es die Standardkonvention, sie durch Skalierung beider Glieder mit positiven ganzen Zahlen auszudrücken."
      },
      {
        "question": "Was ist der Unterschied zwischen einem Verhältnis und einem Bruch?",
        "answer": "Ein Verhältnis vergleicht zwei oder mehr Grö��en (z.B. 2:3), während ein Bruch einen Teil eines Ganzen darstellt (z.B. 2/3 bedeutet 2 Teile von insgesamt 3). Ein Verhältnis kann als Bruch geschrieben werden, aber ein Bruch impliziert immer eine Teil-zu-Ganzes-Beziehung."
      }
    ],
    "breadcrumbName": "Verhältnisrechner"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "de",
    "name": "Bruchrechner",
    "category": "math",
    "badge": "Bruchoperationen",
    "icon": "Binary",
    "h1": "Bruchrechner",
    "seoTitle": "Bruchrechner – Brüche addieren, subtrahieren, multiplizieren & dividieren",
    "seoDescription": "Kostenloser Online-Bruchrechner. Addieren, subtrahieren, multiplizieren und dividieren Sie echte Brüche, unechte Brüche und gemischte Zahlen ganz einfach mit schrittweiser Vereinfachung.",
    "primaryKeyword": "Bruchrechner",
    "secondaryKeywords": [
      "Brüche addieren",
      "Brüche vereinfachen",
      "Brüche subtrahieren",
      "Brüche multiplizieren",
      "Brüche dividieren",
      "Rechner für gemischte Zahlen"
    ],
    "heroSubtitle": "Addieren, subtrahieren, multiplizieren und dividieren Sie Brüche und gemischte Zahlen mit automatischer Vereinfachung, gemeinsamen Nennern und Dezimalumwandlung.",
    "about": [
      "Der Bruchrechner bietet vollständige Schritt-für-Schritt-Lösungen zum Addieren, Subtrahieren, Multiplizieren und Dividieren von mathematischen Brüchen. Er verarbeitet echte Brüche (Zähler < Nenner), unechte Brüche (Zähler > Nenner) und gemischte Zahlen.",
      "Egal, ob Sie Hausaufgaben überprüfen, Kochrezepte skalieren oder technische Messungen berechnen, dieses Tool reduziert Ergebnisse auf ihre einfachste, unkürzbare Form und zeigt das Dezimaläquivalent an."
    ],
    "formula": {
      "title": "Regeln der Bruchrechnung",
      "formulaText": "Addition: (a/b) + (c/d) = (ad + bc) / bd\nSubtraktion: (a/b) - (c/d) = (ad - bc) / bd\nMultiplikation: (a/b) × (c/d) = (ac) / (bd)\nDivision: (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "Für Addition und Subtraktion wandeln Sie die Brüche in einen gemeinsamen Nenner um, bevor Sie die Zähler kombinieren. Für die Multiplikation multiplizieren Sie die Zähler und Nenner direkt. Für die Division multiplizieren Sie mit dem Kehrwert des zweiten Bruchs.",
      "variables": [
        {
          "name": "a & c",
          "desc": "Zähler (obere Zahlen der Brüche)"
        },
        {
          "name": "b & d",
          "desc": "Nenner (untere Zahlen, dürfen nicht Null sein)"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie den Zähler und Nenner für Ihren ersten Bruch ein.",
      "Wählen Sie die arithmetische Operation: Addition (+), Subtraktion (-), Multiplikation (×) oder Division (÷).",
      "Geben Sie den Zähler und Nenner für Ihren zweiten Bruch ein.",
      "Klicken Sie auf Berechnen, um den vereinfachten Bruch, die gemischte Zahl und die Dezimaldarstellung zu sehen."
    ],
    "example": {
      "problem": "Berechnen Sie 3/4 + 2/3.",
      "steps": [
        "Schritt 1: Der gemeinsame Nenner ist 4 × 3 = 12.",
        "Schritt 2: Zähler umwandeln: (3 × 3) / 12 = 9/12 und (2 × 4) / 12 = 8/12.",
        "Schritt 3: Zähler addieren: 9/12 + 8/12 = 17/12.",
        "Schritt 4: Unechten Bruch in eine gemischte Zahl umwandeln: 17 ÷ 12 = 1 mit einem Rest von 5, ergibt 1 5/12 (ca. 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, was 1 5/12 oder 1.4167 entspricht."
    },
    "notes": [
      "Ein Nenner darf niemals Null sein, da die Division durch Null mathematisch undefiniert ist.",
      "Negative Brüche werden standardisiert mit dem Minuszeichen im Zähler dargestellt (z.B. -3/4).",
      "Der Rechner findet automatisch den größten gemeinsamen Teiler, um die Ergebnisse auf die einfachste Form zu reduzieren."
    ],
    "faqs": [
      {
        "question": "Wie addiert man Brüche mit unterschiedlichen Nennern?",
        "answer": "Suchen Sie einen gemeinsamen Nenner (oft durch Multiplikation der beiden Nenner), passen Sie beide Zähler entsprechend an, addieren Sie die Zähler und vereinfachen Sie den resultierenden Bruch."
      },
      {
        "question": "Wie dividiert man zwei Brüche?",
        "answer": "Um Brüche zu dividieren, multiplizieren Sie den ersten Bruch mit dem Kehrwert (der umgekehrten Form) des zweiten Bruchs. Zum Beispiel: (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "Was ist eine gemischte Zahl?",
        "answer": "Eine gemischte Zahl besteht aus einer ganzen Zahl kombiniert mit einem echten Bruch, wie z.B. 2 1/2, was 2 + 1/2 (oder 5/2 als unechter Bruch) darstellt."
      },
      {
        "question": "Was ist ein unechter Bruch?",
        "answer": "Ein unechter Bruch ist ein Bruch, bei dem der Zähler größer oder gleich dem Nenner ist, wie z.B. 7/4. Er kann in eine gemischte Zahl umgewandelt werden."
      }
    ],
    "breadcrumbName": "Bruchrechner"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "de",
    "name": "Altersrechner",
    "category": "time-date",
    "badge": "Exaktes Alter & Tage",
    "icon": "Calendar",
    "h1": "Altersrechner",
    "seoTitle": "Altersrechner – Berechnen Sie Ihr genaues Alter nach Geburtsdatum",
    "seoDescription": "Kostenloser Online-Altersrechner. Ermitteln Sie Ihr genaues Alter in Jahren, Monaten, Wochen, Tagen und Stunden, basierend auf Ihrem Geburtsdatum bis heute oder einem beliebigen Zieldatum.",
    "primaryKeyword": "Altersrechner",
    "secondaryKeywords": [
      "Alter berechnen",
      "Wie alt bin ich",
      "Altersrechner nach Geburtsdatum",
      "Geburtstagsrechner",
      "Chronologischer Altersrechner"
    ],
    "heroSubtitle": "Berechnen Sie Ihr genaues Alter in Jahren, Monaten, Tagen, Stunden und finden Sie den Countdown zu Ihrem nächsten Geburtstag mit kalendarischer Präzision.",
    "about": [
      "Der Altersrechner ermittelt Ihr präzises chronologisches Alter basierend auf Ihrem Geburtsdatum. Während das herkömmliche Alter einfach in Jahren angegeben wird, unterteilt dieser Rechner Ihre Lebensspanne in exakte Jahre, Kalendermonate und verbleibende Tage, unter Berücksichtigung von Schaltjahren und schwankenden Monatslängen.",
      "Zusätzlich zum aktuellen Alter ermöglicht Ihnen das Tool, das Alter zu einem beliebigen vergangenen oder zukünftigen Datum zu bestimmen – nützlich für Schulzulassungen, rechtliche Altersüberprüfungen, Rentenmeilensteine sowie Pass- oder Visumanträge."
    ],
    "formula": {
      "title": "Methode zur Berechnung des chronologischen Alters",
      "formulaText": "Jahre = Zieldatum-Jahr - Geburtsjahr (angepasst für Monat/Tag)\nMonate = Zieldatum-Monat - Geburtsmonat (angepasst für Tag)\nTage = Zieldatum-Tag - Geburtstag (Tage vom Vormonat entleihen, falls negativ)",
      "explanation": "Die kalendergenaue Altersberechnung berücksichtigt unterschiedliche Monatsdauern (28 bis 31 Tage) und vierjährliche Schaltjahre, um eine taggenaue Präzision zu gewährleisten.",
      "variables": [
        {
          "name": "Geburtsdatum",
          "desc": "Das Ausgangsdatum der Geburt"
        },
        {
          "name": "Zieldatum",
          "desc": "Das Referenzdatum der Auswertung (standardmäßig heute)"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Ihr Geburtsdatum mithilfe der Auswahlfelder für Tag, Monat und Jahr ein.",
      "Geben Sie optional ein Zieldatum für die Berechnung an (Standard ist das heutige Datum).",
      "Klicken Sie auf 'Berechnen', um Ihr genaues Alter in Jahren, Monaten und Tagen zu sehen.",
      "Entdecken Sie Zusammenfassungen der gesamten Lebensspanne in Monaten, Wochen, Tagen und den Countdown zu Ihrem nächsten Geburtstag."
    ],
    "example": {
      "problem": "Wie alt ist eine Person, die am 15. Juni 1995 geboren wurde, genau, wenn das Alter am 8. Oktober 2026 bewertet wird?",
      "steps": [
        "Schritt 1: Differenz in Jahren: 2026 - 1995 = 31 Jahre.",
        "Schritt 2: Differenz in Monaten: Oktober (Monat 10) - Juni (Monat 6) = 4 Monate.",
        "Schritt 3: Differenz in Tagen: 8 - 15 ist negativ (-7), daher einen Monat entleihen (verbleiben 3 Monate) und die Tage des Septembers (30) hinzufügen: 8 + 30 - 15 = 23 Tage."
      ],
      "result": "Die Person ist genau 31 Jahre, 3 Monate und 23 Tage alt."
    },
    "notes": [
      "Die westliche Alterszählung betrachtet eine Person bei der Geburt als 0 Jahre alt und erhöht das Alter an jedem Geburtstag.",
      "Schaltjahre enthalten 366 statt 365 Tage; der Rechner berücksichtigt den 29. Februar, wann immer er durchlaufen wird.",
      "Die Gesamtzahl der Stunden und Tage wird unter Verwendung standardmäßiger astronomischer Kalendertagsintervalle berechnet."
    ],
    "faqs": [
      {
        "question": "Wie berücksichtigt der Altersrechner Schaltjahre?",
        "answer": "Der Rechner überprüft jedes Kalenderjahr im angegebenen Zeitraum und berücksichtigt den 29. Februar in Schaltjahren korrekt. Dies gewährleistet, dass die Gesamtzahl der Tage und die Jahrestage zu 100 % genau sind."
      },
      {
        "question": "Kann ich berechnen, wie alt ich in einem zukünftigen Jahr sein werde?",
        "answer": "Ja. Ändern Sie das Feld 'Alter zum Datum von' auf ein beliebiges zukünftiges Datum, um Ihr genaues Alter an diesem Tag zu erfahren."
      },
      {
        "question": "Wie wird der Countdown zum nächsten Geburtstag ermittelt?",
        "answer": "Der Rechner vergleicht das heutige Datum mit Ihrem bevorstehenden Geburtstag im aktuellen oder folgenden Kalenderjahr, um die exakt verbleibenden Tage zu berechnen."
      },
      {
        "question": "Warum wird mein Alter manchmal als 'X Jahre, Y Monate, Z Tage' anstatt nur 'X Jahre' angezeigt?",
        "answer": "Der Altersrechner liefert ein präzises chronologisches Alter, indem er Ihre Lebensspanne in exakte Jahre, Monate und Tage aufschlüsselt. Dieses Detailniveau ist für verschiedene offizielle Zwecke nützlich und bietet eine genauere Darstellung als nur ganze Jahre."
      }
    ],
    "breadcrumbName": "Altersrechner"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "de",
    "name": "Zeit-Rechner",
    "category": "time-date",
    "badge": "Zeit addieren & subtrahieren",
    "icon": "Clock",
    "h1": "Zeit-Rechner",
    "seoTitle": "Zeit-Rechner – Stunden, Minuten & Sekunden addieren und subtrahieren",
    "seoDescription": "Kostenloser Online-Zeit-Rechner. Addieren oder subtrahieren Sie Zeitdauern in Stunden, Minuten und Sekunden. Wandeln Sie Zeit in Dezimalstunden um und bereinigen Sie Zeitcodes.",
    "primaryKeyword": "Zeit-Rechner",
    "secondaryKeywords": [
      "Zeitdauer Rechner",
      "Zeit addieren Rechner",
      "Zeit subtrahieren Rechner",
      "Stunden Minuten Sekunden Rechner",
      "Zeit Addition"
    ],
    "heroSubtitle": "Addieren und subtrahieren Sie Zeitdauern in Stunden, Minuten und Sekunden mit automatischem Einheitenüberlauf und Umrechnungen in Dezimalstunden.",
    "about": [
      "Der Zeit-Rechner ermöglicht das schnelle Addieren und Subtrahieren von Zeitintervallen, die in Stunden, Minuten und Sekunden ausgedrückt werden. Da die Zeit auf einem Sexagesimalsystem (Basis 60) und nicht auf einem Dezimalsystem (Basis 10) basiert, führt das manuelle Addieren von Stunden und Minuten häufig zu Rundungsfehlern.",
      "Dieses Tool handhabt automatisch den Übertrag von 60 Sekunden und 60 Minuten, was es ideal für Videoeditoren macht, die die Laufzeit von Filmmaterial berechnen, Projektmanager, die abrechenbare Aufgaben verfolgen, Piloten, die Flugdauern protokollieren, und Sportler, die Trainingsabschnitte analysieren."
    ],
    "formula": {
      "title": "Formel zur sexagesimalen Zeitaddition",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "Alle eingegebenen Zeitblöcke werden in Gesamtsekunden umgewandelt, addiert oder subtrahiert und dann wieder in normalisierte Stunden, Minuten und Sekunden zurückkonvertiert.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Stunden, Minuten und Sekunden der ersten Dauer"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Stunden, Minuten und Sekunden der zweiten Dauer"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Stunden, Minuten und Sekunden für Zeit 1 ein.",
      "Wählen Sie die Operation: Addieren (+) oder Subtrahieren (-).",
      "Geben Sie Stunden, Minuten und Sekunden für Zeit 2 ein.",
      "Klicken Sie auf 'Berechnen', um die konsolidierten Stunden, Minuten, Sekunden und die gesamten Dezimalstunden anzuzeigen."
    ],
    "example": {
      "problem": "Addieren Sie 2 Stunden 45 Minuten 30 Sekunden und 3 Stunden 35 Minuten 45 Sekunden.",
      "steps": [
        "Schritt 1: Sekunden: 30 + 45 = 75 Sekunden = 1 Minute und 15 Sekunden.",
        "Schritt 2: Minuten: 45 + 35 + 1 (Übertrag) = 81 Minuten = 1 Stunde und 21 Minuten.",
        "Schritt 3: Stunden: 2 + 3 + 1 (Übertrag) = 6 Stunden."
      ],
      "result": "Die Gesamtdauer beträgt 6 Stunden, 21 Minuten und 15 Sekunden (6.3542 Dezimalstunden)."
    },
    "notes": [
      "Eine Minute hat 60 Sekunden und eine Stunde hat 60 Minuten.",
      "Um Minuten in Dezimalstunden umzurechnen, teilen Sie die Minuten durch 60 (z.B. 30 Minuten = 0.5 Stunden).",
      "Wenn eine größere Zeit von einer kleineren Zeit subtrahiert wird, wird das Ergebnis als negativer Zeitversatz angezeigt."
    ],
    "faqs": [
      {
        "question": "Wie rechnet man Minuten in Dezimalstunden um?",
        "answer": "Teilen Sie die Anzahl der Minuten durch 60. Zum Beispiel sind 45 Minuten geteilt durch 60 gleich 0.75 Stunden. Daher entsprechen 2 Stunden und 45 Minuten 2.75 Dezimalstunden."
      },
      {
        "question": "Was passiert, wenn Sekunden 60 überschreiten?",
        "answer": "Jeder Block von 60 Sekunden wird automatisch in 1 Minute umgewandelt und in die Minuten-Spalte übertragen."
      },
      {
        "question": "Kann dieses Tool Flug- oder Videoschnitt-Zeitcodes berechnen?",
        "answer": "Ja. Es summiert präzise mehrere Takes, Clips oder Flugabschnitte in Stunden, Minuten und Sekunden."
      },
      {
        "question": "Wofür kann ich den Zeit-Rechner im Alltag verwenden?",
        "answer": "Der Zeit-Rechner ist nützlich für die Planung von Projekten, die Verfolgung von Arbeitszeiten, die Berechnung von Reisezeiten, das Management von Trainingsplänen oder für jeden, der präzise Zeitintervalle addieren oder subtrahieren muss, ohne manuelle Fehler zu machen."
      }
    ],
    "breadcrumbName": "Zeit-Rechner"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "de",
    "name": "Datumsrechner",
    "category": "time-date",
    "badge": "Tage zwischen Daten",
    "icon": "Calendar",
    "h1": "Datumsrechner",
    "seoTitle": "Datumsrechner – Tage zwischen Daten & Tage addieren/subtrahieren",
    "seoDescription": "Kostenloser Online-Datumsrechner. Berechnen Sie die genaue Anzahl von Tagen, Wochen und Werktagen zwischen zwei Daten oder addieren/subtrahieren Sie Tage von einem beliebigen Datum.",
    "primaryKeyword": "Datumsrechner",
    "secondaryKeywords": [
      "Datumsdifferenz Rechner",
      "Tage zwischen Daten",
      "Datumsdauer Rechner",
      "Werktage Rechner",
      "Tage zu Datum hinzufügen"
    ],
    "heroSubtitle": "Berechnen Sie die genaue Anzahl der Kalendertage und Werktage zwischen zwei Daten oder prognostizieren Sie zukünftige Daten durch Addition oder Subtraktion von Tagen.",
    "about": [
      "Der Datumsrechner löst gängige Kalenderfragen: Er ermittelt, wie viele Tage zwischen zwei bestimmten Daten liegen, oder bestimmt, welches Datum eine bestimmte Anzahl von Tagen, Wochen oder Monaten in der Zukunft oder Vergangenheit liegt.",
      "Im Gegensatz zu einer einfachen Kalenderzählung berücksichtigt dieses Tool präzise Monatsendgrenzen, Schaltjahre und unterscheidet Standard-Wochenendtage von Montag bis Freitag Werktagen – unerlässlich für Projektplanung, gesetzliche Fristen, Kündigungsfristen und Event-Countdowns."
    ],
    "formula": {
      "title": "Datumsdauer-Berechnung",
      "formulaText": "Total Days = (End Date (ms) - Start Date (ms)) / (1000 × 60 × 60 × 24)\nWeeks = ⌊Total Days / 7⌋\nRemaining Days = Total Days mod 7",
      "explanation": "Berechnet die Epochen-Zeitstempel-Differenz zwischen Mitternachts-UTC-Zeitstempeln und zählt die dazwischenliegenden Montag-bis-Freitag-Tage für Geschäftsintervalle.",
      "variables": [
        {
          "name": "Startdatum",
          "desc": "Das Referenz-Anfangsdatum"
        },
        {
          "name": "Enddatum",
          "desc": "Das Ziel-Abschlussdatum"
        },
        {
          "name": "Werktage",
          "desc": "Anzahl der Wochentage (Montag bis Freitag) ohne Wochenenden"
        }
      ]
    },
    "howToCalculate": [
      "Modus wählen: „Tage zwischen Daten“ oder „Tage addieren / subtrahieren“.",
      "Für Datumsdifferenz: Wählen Sie Ihr Startdatum und Enddatum.",
      "Aktivieren Sie „Endtag einschließen“, wenn Ihre Zeitachse eine inklusive Zählung der Grenzen erfordert.",
      "Sehen Sie die Gesamtzahl der Tage, Wochen, verbleibenden Tage und Werktage (Montag bis Freitag)."
    ],
    "example": {
      "problem": "Wie viele Tage und Werktage liegen zwischen dem 5. Januar 2026 und dem 20. Februar 2026?",
      "steps": [
        "Schritt 1: Insgesamt verstrichene Kalendertage = 46 Tage.",
        "Schritt 2: Entspricht 6 vollen Wochen und 4 Kalendertagen.",
        "Schritt 3: Ohne Samstage und Sonntage ergeben sich 34 Werktage."
      ],
      "result": "Zwischen den beiden Daten liegen 46 Kalendertage (34 Werktage)."
    },
    "notes": [
      "Die Standard-Datumsdifferenz berechnet die vollen Tage, die zwischen zwei Daten verstrichen sind.",
      "Schaltjahre werden automatisch berücksichtigt (2028, 2032 usw. haben 29 Tage im Februar).",
      "Die Zählung der Werktage beinhaltet keine offiziellen nationalen Feiertage, da diese je nach Land variieren."
    ],
    "faqs": [
      {
        "question": "Zählt der Datumsrechner sowohl das Start- als auch das Enddatum?",
        "answer": "Standardmäßig zählt der Rechner das Intervall vom Startdatum bis zum Enddatum (verstrichene Zeit). Sie können die Option „Endtag einschließen“ aktivieren, um beide Grenzdaten zu berücksichtigen."
      },
      {
        "question": "Wie werden Werktage definiert?",
        "answer": "Werktage sind Montag bis Freitag. Samstage und Sonntage sind als Wochenendtage ausgeschlossen."
      },
      {
        "question": "Kann ich nur Werktage addieren?",
        "answer": "Das Additionstool addiert Kalendertage; um Projektergebnisse in Werktagen zu berechnen, berücksichtigen Sie 2 Wochenendtage pro 5 Werktage."
      },
      {
        "question": "Was ist der Unterschied zwischen Kalendertagen und Werktagen?",
        "answer": "Kalendertage umfassen alle Tage der Woche, einschließlich Samstage, Sonntage und Feiertage. Werktage hingegen sind in der Regel Montag bis Freitag und schließen Wochenenden sowie oft auch Feiertage aus. Unser Rechner kann beides separat ausweisen."
      }
    ],
    "breadcrumbName": "Datumsrechner"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "de",
    "name": "Stundenrechner",
    "category": "time-date",
    "badge": "Zeiterfassung & Lohn",
    "icon": "Timer",
    "h1": "Stundenrechner",
    "seoTitle": "Stundenrechner – Arbeitsstunden und Zeiterfassung berechnen",
    "seoDescription": "Kostenloser Online-Stundenrechner. Berechnen Sie die gesamten Arbeitsstunden, Mittagspausen, Dezimalstunden und den Bruttolohn zwischen Start- und Endzeiten für Stundenzettel.",
    "primaryKeyword": "stundenrechner",
    "secondaryKeywords": [
      "zeiterfassungsrechner",
      "arbeitsstundenrechner",
      "geleistete stunden rechner",
      "stundenzettel rechner",
      "stunden zwischen zeiten berechnen"
    ],
    "heroSubtitle": "Berechnen Sie tägliche Arbeitsstunden, ziehen Sie Mittagspausen und Ruhepausen ab, wandeln Sie Zeiten in Dezimalstunden um und ermitteln Sie den Bruttoverdienst für die Lohnabrechnung.",
    "about": [
      "Der Stundenrechner vereinfacht die Zeiterfassung für Stundenlohnempfänger, Auftragnehmer, Freiberufler und Lohnbuchhalter. Die Umrechnung von Uhrzeiten in Dezimalstunden (z.B. 7 Stunden 45 Minuten in 7,75 Stunden) ist unerlässlich für die Multiplikation mit Stundenlöhnen.",
      "Der Rechner unterstützt Nachtschichten, die über Mitternacht hinausgehen (z.B. von 22:00 Uhr bis 06:00 Uhr), und zieht automatisch unbezahlte Pausen oder Mittagessen ab, um die reine bezahlbare Arbeitszeit auszuweisen."
    ],
    "formula": {
      "title": "Formel für Arbeitszeiten & Lohn",
      "formulaText": "Bruttominuten = Endzeit - Startzeit (angepasst für Nachtschichten)\nNettominuten = Bruttominuten - Pausenminuten\nDezimalstunden = Nettominuten / 60\nGesamtlohn = Dezimalstunden × Stundenlohn",
      "explanation": "Ziehen Sie die Startzeit von der Endzeit ab, subtrahieren Sie unbezahlte Pausenminuten, teilen Sie durch 60, um Dezimalstunden zu erhalten, und multiplizieren Sie mit dem Stundenlohn.",
      "variables": [
        {
          "name": "Startzeit",
          "desc": "Arbeitsbeginn"
        },
        {
          "name": "Endzeit",
          "desc": "Arbeitsende"
        },
        {
          "name": "Pause",
          "desc": "Unbezahlte Ruhe- oder Mittagspausendauer in Minuten"
        },
        {
          "name": "Stundenlohn",
          "desc": "Grundstundenlohn in Dollar oder lokaler Währung"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Ihre Schicht-Startzeit ein (z.B. 08:30 Uhr).",
      "Geben Sie Ihre Schicht-Endzeit ein (z.B. 17:00 Uhr).",
      "Geben Sie unbezahlte Pausenzeit in Minuten an (z.B. 45 Minuten für Mittagessen).",
      "Geben Sie optional Ihren Stundenlohn ein, um den Bruttoverdienst zu schätzen.",
      "Klicken Sie auf Berechnen, um Netto-Stunden, Minuten, Dezimalstunden und den Gesamtverdienst anzuzeigen."
    ],
    "example": {
      "problem": "Ein Mitarbeiter stempelt um 08:30 Uhr ein, stempelt um 17:15 Uhr aus, macht eine 45-minütige Mittagspause und verdient 24 $/Stunde.",
      "steps": [
        "Schritt 1: Gesamte Bruttozeit zwischen 08:30 Uhr und 17:15 Uhr = 8 Stunden und 45 Minuten (525 Minuten).",
        "Schritt 2: 45-minütige Mittagspause abziehen: 525 - 45 = 480 Nettominuten.",
        "Schritt 3: In Dezimal umwandeln: 480 ÷ 60 = 8,00 Dezimalstunden.",
        "Schritt 4: Mit Lohn multiplizieren: 8,00 × 24 $ = 192,00 $."
      ],
      "result": "Der Mitarbeiter arbeitete 8,00 Stunden und verdiente 192,00 $."
    },
    "notes": [
      "Lohnabrechnungssysteme erfordern Dezimalstunden (z.B. 8,25 Stunden) anstelle des Uhrzeitformats (8h 15m).",
      "Schichten, die Mitternacht überschreiten, werden nahtlos erkannt und ohne negative Zahlen berechnet.",
      "Die Berechnungen stellen den Bruttolohn vor gesetzlicher Einkommensteuer und Lohnabzügen dar."
    ],
    "faqs": [
      {
        "question": "Wie rechnet man Arbeitsminuten in Dezimalstunden um?",
        "answer": "Teilen Sie die Anzahl der Minuten durch 60. Zum Beispiel sind 15 Minuten 15/60 = 0,25 Stunden; 30 Minuten sind 0,5 Stunden; und 45 Minuten sind 0,75 Stunden."
      },
      {
        "question": "Wie geht der Rechner mit Nachtschichten um, die über Mitternacht hinausgehen?",
        "answer": "Wenn die Endzeit numerisch früher als die Startzeit ist (z.B. 23:00 Uhr bis 07:00 Uhr), addiert der Rechner automatisch 24 Stunden, um die korrekte Dauer der Nachtschicht zu ermitteln."
      },
      {
        "question": "Kann ich mit diesem Tool den Wochenlohn berechnen?",
        "answer": "Sie können jede einzelne Tagesschicht berechnen oder den Gehaltsrechner für konsolidierte Lohnprognosen über mehrere Wochen verwenden."
      },
      {
        "question": "Warum ist die Umrechnung in Dezimalstunden wichtig?",
        "answer": "Die Umrechnung von Arbeitszeiten in Dezimalstunden ist entscheidend für die genaue Lohnabrechnung, da die meisten Gehaltsabrechnungssysteme Stundenlöhne mit Dezimalwerten multiplizieren. Dies vermeidet Fehler, die bei der direkten Multiplikation von Stunden und Minuten entstehen könnten."
      }
    ],
    "breadcrumbName": "Stundenrechner"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "de",
    "name": "BMI Rechner",
    "category": "fitness",
    "badge": "Body-Mass-Index",
    "icon": "Activity",
    "h1": "BMI Rechner",
    "seoTitle": "BMI Rechner – Berechnen Sie Ihren Body-Mass-Index online",
    "seoDescription": "Kostenloser Online-BMI-Rechner. Berechnen Sie den Body-Mass-Index für Erwachsene mit metrischen (cm/kg) oder imperialen (ft/in/lbs) Einheiten. Sehen Sie WHO-Gewichtskategorien & gesunde Bereiche ein.",
    "primaryKeyword": "BMI Rechner",
    "secondaryKeywords": [
      "BMI berechnen",
      "Body-Mass-Index Rechner",
      "BMI Rechner für Erwachsene",
      "gesunder Gewichtsbereich",
      "metrischer BMI Rechner"
    ],
    "heroSubtitle": "Berechnen Sie Ihren Body-Mass-Index (BMI) mit metrischen oder imperialen Maßen, um Ihre Gewichtskategorie und gesunde Gewichtsziele zu verstehen.",
    "about": [
      "Der Body-Mass-Index (BMI) Rechner ist eine standardisierte Screening-Metrik, die von der Weltgesundheitsorganisation (WHO) etabliert wurde, um Personen nach ihrem Gewichtsstatus im Verhältnis zur Körpergröße zu kategorisieren. Er wird häufig in der Epidemiologie, bei allgemeinen Gesundheitschecks und zur persönlichen Fitnessüberwachung eingesetzt.",
      "Der BMI wird berechnet, indem das Körpergewicht in Kilogramm durch das Quadrat der Körpergröße in Metern geteilt wird. Der Rechner zeigt Ihren genauen Wert, die offizielle WHO-Klassifikation (Untergewicht, Normalgewicht, Übergewicht oder Adipositas-Klasse) an und berechnet Ihren personalisierten gesunden Zielgewichtsbereich."
    ],
    "formula": {
      "title": "Standard-BMI-Formeln",
      "formulaText": "Metrische Formel: BMI = Gewicht (kg) / [Größe (m)]²\nImperiale Formel: BMI = 703 × Gewicht (lbs) / [Größe (inches)]²",
      "explanation": "Teilen Sie das Gewicht durch das Quadrat der Körpergröße. Für imperiale Einheiten (Pfund und Zoll) multiplizieren Sie das Verhältnis mit dem Umrechnungsfaktor 703.",
      "variables": [
        {
          "name": "Gewicht",
          "desc": "Körpergewicht in Kilogramm (kg) oder Pfund (lbs)"
        },
        {
          "name": "Größe",
          "desc": "Körpergröße in Zentimetern (cm) oder Fuß & Zoll"
        },
        {
          "name": "Faktor 703",
          "desc": "Standard-Umrechnungsfaktor für imperiale Einheiten"
        }
      ]
    },
    "howToCalculate": [
      "Wählen Sie Ihr bevorzugtes Einheitensystem: Metrisch (cm und kg) oder Imperial (Fuß, Zoll und Pfund).",
      "Geben Sie Ihre aktuelle Körpergröße und Ihr Körpergewicht ein.",
      "Klicken Sie auf 'Berechnen', um Ihren BMI-Wert, die WHO-Kategorie und den gesunden Zielgewichtsbereich zu sehen.",
      "Überprüfen Sie den gesunden Gewichtsbereich, der für Ihre spezifische Größe ausgelegt ist."
    ],
    "example": {
      "problem": "Wie hoch ist der BMI einer Person, die 175 cm (1,75 m) groß ist und 70 kg wiegt?",
      "steps": [
        "Schritt 1: Quadrieren Sie die Größe in Metern: 1,75 × 1,75 = 3,0625 m².",
        "Schritt 2: Teilen Sie das Gewicht durch die quadrierte Größe: 70 ÷ 3,0625 = 22,86.",
        "Schritt 3: Vergleichen Sie mit den WHO-Schwellenwerten: 22,9 liegt im Bereich von 18,5 – 24,9 (Normalgewicht)."
      ],
      "result": "Die Person hat einen BMI von 22,9, was als Normalgewicht klassifiziert wird."
    },
    "notes": [
      "Der BMI ist ein Indikator für das Bevölkerungsscreening und unterscheidet nicht zwischen magerer Muskelmasse und Fettgewebe.",
      "Sportler, Bodybuilder und schwangere Frauen können erhöhte BMI-Werte aufweisen, die kein übermäßiges Körperfett widerspiegeln.",
      "Dieses Tool dient der allgemeinen Aufklärung und sollte keine professionelle klinische Bewertung ersetzen."
    ],
    "faqs": [
      {
        "question": "Was gilt als gesunder BMI-Bereich?",
        "answer": "Laut der Weltgesundheitsorganisation (WHO) gilt ein BMI zwischen 18,5 und 24,9 als normaler oder gesunder Gewichtsbereich für Erwachsene."
      },
      {
        "question": "Warum kann der BMI für muskulöse Sportler irreführend sein?",
        "answer": "Der BMI misst das Gesamtgewicht im Verhältnis zur Körpergröße und kann Muskeln nicht von Fettgewebe unterscheiden. Da Muskeln dichter sind als Fett, werden muskulöse Personen oft als übergewichtig oder fettleibig eingestuft, obwohl sie einen geringen Körperfettanteil haben."
      },
      {
        "question": "Wie berechne ich den BMI mit Pfund und Zoll?",
        "answer": "Multiplizieren Sie Ihr Gewicht in Pfund mit 703 und teilen Sie das Ergebnis dann durch Ihre Körpergröße in Zoll zum Quadrat: BMI = (lbs × 703) / (inches × inches)."
      },
      {
        "question": "Ist der BMI für Kinder und Jugendliche geeignet?",
        "answer": "Nein, der BMI-Rechner für Erwachsene ist nicht direkt auf Kinder und Jugendliche anwendbar. Für diese Altersgruppen werden spezielle BMI-Perzentilkurven verwendet, die das Alter und Geschlecht berücksichtigen, da sich ihr Körper während des Wachstums ständig verändert. Konsultieren Sie für Kinder und Jugendliche immer einen Arzt."
      }
    ],
    "breadcrumbName": "BMI Rechner"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "de",
    "name": "Pace Rechner",
    "category": "fitness",
    "badge": "Laufen & Gehen",
    "icon": "Footprints",
    "h1": "Pace Rechner",
    "seoTitle": "Pace Rechner – Lauftempo, Geschwindigkeit und Zeit Rechner",
    "seoDescription": "Kostenloser Online Pace Rechner. Berechnen Sie das Tempo pro Kilometer (min/km), Tempo pro Meile (min/mi) und die Geschwindigkeit (km/h, mph) für 5K, 10K, Halbmarathon und Marathonläufe.",
    "primaryKeyword": "pace rechner",
    "secondaryKeywords": [
      "lauftempo rechner",
      "marathon pace rechner",
      "laufgeschwindigkeitsrechner"
    ],
    "heroSubtitle": "Berechnen Sie Ihr Lauf- und Gehtempo pro Kilometer und Meile, ermitteln Sie die benötigten Zwischenzeiten für Rennen und wandeln Sie Geschwindigkeit und Tempo sofort um.",
    "about": [
      "Der Pace Rechner wurde für Läufer, Jogger, Triathleten und Geher entwickelt, die ihre Trainingseinheiten planen oder ihre Rennzeiten vorhersagen möchten. Pace (Tempo) misst die Zeit, die benötigt wird, um eine Distanzeinheit zurückzulegen (z.B. Minuten pro Kilometer oder Minuten pro Meile), während Geschwindigkeit die pro Zeiteinheit zurückgelegte Distanz misst (km/h oder mph).",
      "Der Rechner unterstützt Standard-Renndistanzen wie 5K, 10K, Halbmarathon (21,0975 km) und Marathon (42,195 km), sodass Sie das benötigte Zieltempo ermitteln können, um Ihre persönliche Bestzeit zu erreichen."
    ],
    "formula": {
      "title": "Formeln für Pace und Geschwindigkeit",
      "formulaText": "Pace = Time (seconds) / Distance\nSpeed (km/h) = Distance (km) / Time (hours)\nSpeed (mph) = Distance (miles) / Time (hours)",
      "explanation": "Pace ist der Kehrwert der Geschwindigkeit: Teilen Sie die gesamte verstrichene Zeit in Minuten durch die gesamte zurückgelegte Distanz in Kilometern oder Meilen.",
      "variables": [
        {
          "name": "Zeit",
          "desc": "Gesamte verstrichene Dauer in Stunden, Minuten und Sekunden"
        },
        {
          "name": "Distanz",
          "desc": "Gesamte Streckenlänge in Kilometern oder Meilen"
        },
        {
          "name": "Pace",
          "desc": "Benötigte Zeit pro Distanzeinheit (min/km oder min/mi)"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie Ihre gesamte Streckenlänge (Distanz) ein und wählen Sie die Einheit (km oder Meilen).",
      "Geben Sie die verstrichene oder angestrebte Zeit (Stunden, Minuten und Sekunden) ein.",
      "Klicken Sie auf 'Berechnen', um Ihr durchschnittliches Tempo pro Kilometer, Tempo pro Meile und Ihre Geschwindigkeit in km/h und mph anzuzeigen.",
      "Passen Sie die Zeiten an, um die benötigten Zwischenzeiten für bevorstehende Laufrennen zu prognostizieren."
    ],
    "example": {
      "problem": "Welches Tempo ist erforderlich, um ein 10K-Rennen (10 Kilometer) in 50 Minuten zu absolvieren?",
      "steps": [
        "Schritt 1: Gesamtzeit = 50 Minuten = 3.000 Sekunden.",
        "Schritt 2: Tempo pro km: 50 Minuten ÷ 10 km = 5:00 Minuten pro Kilometer.",
        "Schritt 3: Distanz in Meilen: 10 km ÷ 1,60934 = 6,2137 Meilen.",
        "Schritt 4: Tempo pro Meile: 50 Minuten ÷ 6,2137 Meilen = 8:03 Minuten pro Meile (Geschwindigkeit: 12,0 km/h oder 7,46 mph)."
      ],
      "result": "Das Zieltempo beträgt 5:00 min/km oder 8:03 min/Meile."
    },
    "notes": [
      "1 Meile entspricht ungefähr 1,60934 Kilometern. 1 Kilometer entspricht 0,621371 Meilen.",
      "Das Tempo wird als MM:SS formatiert (z.B. 4:30 min/km bedeutet 4 Minuten und 30 Sekunden).",
      "Um Tempo in Geschwindigkeit umzurechnen: Geschwindigkeit (km/h) = 60 ÷ Pace (in Dezimalminuten pro km)."
    ],
    "faqs": [
      {
        "question": "Was ist der Unterschied zwischen Pace (Tempo) und Geschwindigkeit?",
        "answer": "Geschwindigkeit gibt an, wie weit Sie in einer bestimmten Zeit zurücklegen (z.B. Kilometer pro Stunde), während Pace (Tempo) angibt, wie viel Zeit Sie für eine feste Distanz benötigen (z.B. Minuten pro Kilometer)."
      },
      {
        "question": "Welches Tempo ist für einen Marathon unter 4 Stunden erforderlich?",
        "answer": "Um einen Marathon (42,195 km / 26,219 Meilen) unter 4 Stunden zu beenden, benötigen Sie ein durchschnittliches Tempo von schneller als 5:41 min/km oder 9:09 min/Meile."
      },
      {
        "question": "Wie rechne ich min/km in min/Meile um?",
        "answer": "Multiplizieren Sie Ihr Tempo in Minuten pro Kilometer mit 1,60934. Zum Beispiel: 5:00 min/km (5,0) × 1,60934 = 8,046 Minuten pro Meile, was ungefähr 8:03 min/Meile entspricht."
      },
      {
        "question": "Warum ist es wichtig, mein Tempo zu kennen?",
        "answer": "Das Wissen um Ihr Tempo hilft Ihnen, Trainingseinheiten zu planen, Ihre Leistung zu überwachen, realistische Ziele für Rennen zu setzen und Übertraining zu vermeiden. Es ermöglicht Ihnen auch, Ihre Fortschritte im Laufe der Zeit zu verfolgen."
      }
    ],
    "breadcrumbName": "Pace Rechner"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "de",
    "name": "Spritkostenrechner",
    "category": "utilities",
    "badge": "Reise- & Spritbudget",
    "icon": "Fuel",
    "h1": "Spritkostenrechner",
    "seoTitle": "Spritkostenrechner – Fahrtkosten & Kraftstoffverbrauch berechnen",
    "seoDescription": "Kostenloser Online-Spritkostenrechner. Berechnen Sie die gesamten Fahrtkosten, den benötigten Kraftstoff und die Kosten pro Kilometer basierend auf Fahrzeugeffizienz und Kraftstoffpreis.",
    "primaryKeyword": "Spritkostenrechner",
    "secondaryKeywords": [
      "Benzinkostenrechner",
      "Kraftstoffverbrauchsrechner",
      "Fahrtkostenrechner",
      "Kilometerkostenrechner",
      "Fahrkostenrechner"
    ],
    "heroSubtitle": "Schätzen Sie Ihre Spritkosten für die Reise, berechnen Sie den benötigten Kraftstoff in Litern oder Gallonen und ermitteln Sie Ihre Kosten pro Kilometer oder Meile, bevor Sie losfahren.",
    "about": [
      "Der Spritkostenrechner hilft Pendlern, Reisenden und Logistikunternehmen, die Kraftstoffkosten für jede Fahrstrecke zu prognostizieren. Kraftstoff ist eine der höchsten variablen Ausgaben beim Fahrzeugbesitz, beeinflusst durch schwankende Tankstellenpreise, Autobahngeschwindigkeiten und Motoreffizienz.",
      "Dieses Tool unterstützt Kilometer mit km/L oder L/100km sowie Meilen mit Miles Per Gallon (MPG). Es schlüsselt das benötigte Gesamt-Kraftstoffvolumen, die gesamten Fahrtkosten und die Stückkosten pro Kilometer oder Meile auf."
    ],
    "formula": {
      "title": "Formel für Kraftstoffverbrauch und Kosten",
      "formulaText": "Benötigter Kraftstoff (L) = Strecke (km) / Effizienz (km/L)\nGesamte Fahrtkosten = Benötigter Kraftstoff × Kraftstoffpreis pro Einheit\nKosten pro Strecke = Gesamte Fahrtkosten / Strecke",
      "explanation": "Teilen Sie die gesamte Fahrstrecke durch die Kraftstoffeffizienz des Fahrzeugs, um die benötigte Kraftstoffmenge zu ermitteln, und multiplizieren Sie diese dann mit dem lokalen Tankstellenpreis.",
      "variables": [
        {
          "name": "Strecke",
          "desc": "Länge der Fahrt in Kilometern oder Meilen"
        },
        {
          "name": "Effizienz",
          "desc": "Kraftstoffeffizienz des Fahrzeugs (km/L, L/100km oder MPG)"
        },
        {
          "name": "Kraftstoffpreis",
          "desc": "Kosten für Benzin, Diesel oder Gas pro Liter oder Gallone"
        }
      ]
    },
    "howToCalculate": [
      "Geben Sie die gesamte Fahrstrecke ein (z.B. 350 km).",
      "Wählen Sie Ihre Fahrzeugeffizienz-Einheit (km/L, L/100km oder MPG) und geben Sie den Wert Ihres Fahrzeugs ein.",
      "Geben Sie den Kraftstoffpreis pro Liter oder pro Gallone ein.",
      "Klicken Sie auf 'Berechnen', um den benötigten Gesamt-Kraftstoff, die gesamten Fahrtkosten und die Kosten pro Streckeneinheit zu sehen."
    ],
    "example": {
      "problem": "Wie hoch sind die Spritkosten für eine 400 km lange Fahrt in einem Auto, das 16 km/L verbraucht, bei einem Kraftstoffpreis von $1.50 pro Liter?",
      "steps": [
        "Schritt 1: Benötigter Kraftstoff = 400 km ÷ 16 km/L = 25 Liter.",
        "Schritt 2: Gesamtkosten = 25 Liter × $1.50/L = $37.50.",
        "Schritt 3: Kosten pro Kilometer = $37.50 ÷ 400 km = $0.094 pro km."
      ],
      "result": "Die Fahrt erfordert 25 Liter Kraftstoff und kostet $37.50 ($0.094/km)."
    },
    "notes": [
      "Aggressives Beschleunigen, schwere Ladung und Dachgepäckträger können die Kraftstoffeffizienz auf der Autobahn um 15% bis 25% reduzieren.",
      "Um L/100km in km/L umzurechnen: Teilen Sie 100 durch den L/100km-Wert (z.B. 8 L/100km = 100 / 8 = 12.5 km/L).",
      "Für Hin- und Rückfahrten multiplizieren Sie die einfache Strecke vor der Berechnung mit 2."
    ],
    "faqs": [
      {
        "question": "Wie berechne ich die Spritkosten für eine Reise?",
        "answer": "Teilen Sie die Strecke durch den Verbrauch Ihres Fahrzeugs (km/L oder MPG), um das benötigte Kraftstoffvolumen zu ermitteln, und multiplizieren Sie dieses Volumen dann mit dem Kraftstoffpreis pro Liter oder Gallone."
      },
      {
        "question": "Wie rechnet man MPG in km/L um?",
        "answer": "1 US MPG entspricht ungefähr 0.425 km/L. Um MPG in km/L umzurechnen, multiplizieren Sie den MPG-Wert mit 0.425144."
      },
      {
        "question": "Wie kann ich die Kraftstoffeffizienz meines Fahrzeugs verbessern?",
        "answer": "Halten Sie den empfohlenen Reifendruck ein, fahren Sie mit gleichmäßiger Geschwindigkeit auf Autobahnen, entfernen Sie unnötiges Gewicht aus dem Kofferraum und vermeiden Sie abruptes Bremsen und Beschleunigen."
      },
      {
        "question": "Warum schwanken die Spritpreise so stark?",
        "answer": "Spritpreise werden von vielen Faktoren beeinflusst, darunter Rohölpreise, Steuern, Raffineriekosten, Transportkosten, Wechselkurse und die Nachfrage. Geopolitische Ereignisse und saisonale Schwankungen spielen ebenfalls eine Rolle."
      }
    ],
    "breadcrumbName": "Spritkostenrechner"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "de",
    "name": "Stromkostenrechner",
    "category": "utilities",
    "badge": "Geräte & Stromrechnung",
    "icon": "Zap",
    "h1": "Stromkostenrechner",
    "seoTitle": "Stromkostenrechner – Geräte-Stromverbrauch & Energiekosten berechnen",
    "seoDescription": "Kostenloser Online-Stromkostenrechner. Berechnen Sie den Stromverbrauch in kWh und die geschätzten monatlichen & jährlichen Stromkosten für Haushaltsgeräte basierend auf der Wattzahl.",
    "primaryKeyword": "stromkostenrechner",
    "secondaryKeywords": [
      "stromverbrauch rechner",
      "stromverbrauch geräte berechnen",
      "kWh rechner",
      "energiekosten rechner",
      "stromrechnung rechner"
    ],
    "heroSubtitle": "Berechnen Sie den Stromverbrauch in Kilowattstunden (kWh) und schätzen Sie die monatlichen und jährlichen Stromkosten für jedes Haushaltsgerät.",
    "about": [
      "Der Stromkostenrechner hilft Hausbesitzern, Mietern und Facility Managern zu quantifizieren, wie viel Strom Haushaltsgeräte verbrauchen und welche Kosten dabei entstehen. Von Klimaanlagen und Heizlüftern bis hin zu Krypto-Mining-Rigs und Kühlschrankkompressoren kann der Stromverbrauch die Nebenkostenabrechnung drastisch erhöhen.",
      "Geben Sie die Wattzahl des Geräts, die täglichen Betriebsstunden und Ihren Stromtarif pro Kilowattstunde (kWh) ein, um tägliche, monatliche und jährliche Kostenprognosen zu erhalten."
    ],
    "formula": {
      "title": "Formeln für Kilowattstunden und Energiekosten",
      "formulaText": "Täglicher Energieverbrauch (kWh) = (Gerätewatt × Stunden pro Tag) / 1000\nKosten = Energie (kWh) × Strompreis pro kWh\nMonatliche Kosten = Tägliche Kosten × 30 Tage\nJährliche Kosten = Tägliche Kosten × 365 Tage",
      "explanation": "Wandeln Sie die Nennleistung des Geräts in Watt in Kilowatt um, indem Sie durch 1.000 teilen, multiplizieren Sie mit den täglichen Betriebsstunden und multiplizieren Sie mit dem Stromtarif pro kWh.",
      "variables": [
        {
          "name": "Wattzahl",
          "desc": "Nennleistungsaufnahme des Geräts in Watt (W)"
        },
        {
          "name": "Stunden/Tag",
          "desc": "Durchschnittliche aktive Betriebszeit pro 24-Stunden-Zyklus"
        },
        {
          "name": "Preis ($/kWh)",
          "desc": "Stromkosten pro Kilowattstunde (kWh) Ihres Versorgers"
        }
      ]
    },
    "howToCalculate": [
      "Suchen Sie die Wattzahl auf dem Geräteetikett oder im Handbuch (z.B. 1500W für einen Heizlüfter).",
      "Geben Sie die geschätzten Stunden ein, die das Gerät täglich in Betrieb ist.",
      "Geben Sie Ihre lokalen Stromkosten pro kWh ein (prüfen Sie Ihre monatliche Stromrechnung; der Standard-US-Tarif beträgt ~$0.16/kWh, UK ~£0.28/kWh).",
      "Klicken Sie auf 'Berechnen', um den täglichen, monatlichen und jährlichen Verbrauch in kWh und die monetären Kosten zu sehen."
    ],
    "example": {
      "problem": "Was kostet es, eine 1.200 Watt Klimaanlage 8 Stunden täglich bei einem Tarif von $0.15 pro kWh für einen 30-Tage-Monat zu betreiben?",
      "steps": [
        "Schritt 1: Täglicher kWh-Verbrauch: (1.200 W × 8 Stunden) ÷ 1.000 = 9.6 kWh/Tag.",
        "Schritt 2: Monatlicher Energieverbrauch: 9.6 kWh × 30 Tage = 288 kWh.",
        "Schritt 3: Monatliche Kosten: 288 kWh × $0.15/kWh = $43.20.",
        "Schritt 4: Jährliche Kosten: 9.6 kWh × 365 Tage × $0.15 = $525.60."
      ],
      "result": "Die Klimaanlage verbraucht 288 kWh pro Monat und kostet monatlich $43.20 (jährlich $525.60)."
    },
    "notes": [
      "Geräteetiketten geben die maximale Spitzenleistung an; Geräte mit Thermostaten (wie Kühlschränke und Klimaanlagen) schalten sich ein und aus, wodurch der durchschnittliche Verbrauch reduziert wird.",
      "1 Kilowatt (kW) = 1.000 Watt (W). 1 Megawatt (MW) = 1.000.000 Watt.",
      "Überprüfen Sie Ihre Stromrechnung auf gestaffelte oder zeitabhängige Tarife (TOU) während des Sommers und Winters."
    ],
    "faqs": [
      {
        "question": "Wie berechnet man die Stromkosten eines Geräts?",
        "answer": "Multiplizieren Sie die Wattzahl des Geräts mit den täglichen Stunden, teilen Sie durch 1.000, um den täglichen kWh-Verbrauch zu erhalten, und multiplizieren Sie mit Ihrem Stromtarif pro kWh."
      },
      {
        "question": "Wo finde ich die Wattzahl eines Geräts?",
        "answer": "Die Wattzahl eines Geräts ist typischerweise auf einem elektrischen Zertifizierungsetikett auf der Rückseite oder Unterseite des Geräts oder im Bedienungsanleitung angegeben."
      },
      {
        "question": "Welche Haushaltsgeräte verbrauchen am meisten Strom?",
        "answer": "Heiz- und Kühlsysteme (zentrale Klimaanlagen und Wärmepumpen), Warmwasserbereiter, Wäschetrockner und Elektroherde verbrauchen die größte Menge an Haushaltsstrom."
      },
      {
        "question": "Warum ist es wichtig, den Stromverbrauch von Geräten zu kennen?",
        "answer": "Das Wissen um den Stromverbrauch hilft Ihnen, Ihre Energiekosten besser zu verstehen und zu kontrollieren. Es ermöglicht Ihnen, energieeffizientere Entscheidungen zu treffen, unnötige Kosten zu senken und Ihren ökologischen Fußabdruck zu reduzieren."
      }
    ],
    "breadcrumbName": "Stromkostenrechner"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "de",
    "name": "GPA Rechner",
    "category": "education",
    "badge": "Notendurchschnitt",
    "icon": "GraduationCap",
    "h1": "GPA Rechner",
    "seoTitle": "GPA Rechner – Notendurchschnitt für Uni & Schule berechnen (4.0 Skala)",
    "seoDescription": "Kostenloser Online-GPA-Rechner. Berechnen Sie Ihren Semester- und kumulativen Notendurchschnitt auf einer 4.0-Skala unter Berücksichtigung von Leistungspunkten und Notenbuchstaben.",
    "primaryKeyword": "GPA Rechner",
    "secondaryKeywords": [
      "Uni GPA Rechner",
      "Semester GPA Rechner",
      "Notendurchschnittsrechner",
      "kumulativer GPA Rechner",
      "4.0 GPA Skala"
    ],
    "heroSubtitle": "Berechnen Sie Ihren Semester- und kumulativen Notendurchschnitt (GPA) auf einer standardisierten 4.0-Skala unter Verwendung von Notenbuchstaben und Leistungspunkten.",
    "about": [
      "Der Notendurchschnittsrechner (GPA-Rechner) ermittelt Ihren akademischen Stand auf der standardisierten 4.0-Notenskala für Hochschulen. Universitäten, Fachhochschulen, Schulen, Stipendienkomitees und Graduiertenprogramme nutzen den kumulativen GPA als primären Maßstab für Auszeichnungen, akademische Bewährung und Zulassungen.",
      "Im Gegensatz zu einem einfachen Notendurchschnitt wird der GPA nach Leistungspunkten gewichtet – das bedeutet, ein Kurs mit 4 Leistungspunkten hat den doppelten Einfluss auf Ihren endgültigen GPA im Vergleich zu einem Wahlfach mit 2 Leistungspunkten."
    ],
    "formula": {
      "title": "Formel für den gewichteten GPA",
      "formulaText": "Notenpunkte pro Kurs = Leistungspunkte des Kurses × Notenwert\nGPA = Gesamt-Notenpunkte / Gesamt-Leistungspunkte",
      "explanation": "Multiplizieren Sie die Leistungspunkte jedes Kurses mit dem numerischen Äquivalent seiner Buchstabennote, addieren Sie die gesamten Notenpunkte und teilen Sie diese durch die insgesamt belegten Leistungspunkte.",
      "variables": [
        {
          "name": "Notenskala (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Leistungspunkte",
          "desc": "Leistungspunkte oder Semesterwochenstunden, die jedem Kurs zugewiesen sind"
        }
      ]
    },
    "howToCalculate": [
      "Fügen Sie jeden Kurs hinzu, den Sie während Ihres Semesters oder Trimesters belegt haben.",
      "Wählen Sie die erreichte Buchstabennote (z.B. A, B+, B, C) oder geben Sie die numerischen Notenpunkte ein.",
      "Geben Sie die Leistungspunkte des Kurses ein (z.B. 3 oder 4 Leistungspunkte).",
      "Klicken Sie auf 'Berechnen', um Ihren gewichteten GPA, die gesamten Leistungspunkte und die insgesamt erreichten Notenpunkte zu sehen."
    ],
    "example": {
      "problem": "Berechnen Sie den Semester-GPA für 4 Kurse: Mathematik (4 Leistungspunkte, A), Geschichte (3 Leistungspunkte, B), Biologie (4 Leistungspunkte, B+), Englisch (3 Leistungspunkte, A-).",
      "steps": [
        "Schritt 1: Mathematik: 4 Leistungspunkte × 4.0 (A) = 16.0 Punkte.",
        "Schritt 2: Geschichte: 3 Leistungspunkte × 3.0 (B) = 9.0 Punkte.",
        "Schritt 3: Biologie: 4 Leistungspunkte × 3.3 (B+) = 13.2 Punkte.",
        "Schritt 4: Englisch: 3 Leistungspunkte × 3.7 (A-) = 11.1 Punkte.",
        "Schritt 5: Gesamtpunkte = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 Punkte.",
        "Schritt 6: Gesamt-Leistungspunkte = 4 + 3 + 4 + 3 = 14 Leistungspunkte. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "Der Semester-GPA beträgt 3.52."
    },
    "notes": [
      "Kurse mit 'Bestanden/Nicht bestanden' oder 'Audit' werden in der Regel sowohl von den Notenpunkten als auch von den Gesamt-Leistungspunkten bei der GPA-Berechnung ausgeschlossen.",
      "Einige Schulen verwenden gewichtete 5.0-Skalen für AP- oder Honors-Kurse; der Standard-GPA an Universitäten verwendet den ungewichteten 4.0-Maßstab.",
      "Ein kumulativer GPA fasst alle Semester zusammen, indem alle im Laufe des Studiums erworbenen Notenpunkte durch alle im Laufe des Studiums erworbenen Leistungspunkte geteilt werden."
    ],
    "faqs": [
      {
        "question": "Was ist die standardisierte 4.0 GPA-Skala?",
        "answer": "Die standardisierte 4.0-Skala ordnet zu: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0 und F = 0.0."
      },
      {
        "question": "Warum werden Leistungspunkte in die GPA-Berechnung einbezogen?",
        "answer": "Leistungspunkte (Credit Points) repräsentieren den Arbeitsaufwand und die wöchentlichen Unterrichtsstunden eines Kurses. Die Gewichtung nach Leistungspunkten stellt sicher, dass eine Hauptvorlesung mit 4 Leistungspunkten Ihren akademischen Stand stärker beeinflusst als ein Laborpraktikum mit 1 Leistungspunkt."
      },
      {
        "question": "Wie kann ich meinen kumulativen GPA verbessern?",
        "answer": "Das Erreichen hoher Noten (A oder A-) in Kursen mit einer höheren Anzahl von Leistungspunkten hat den größten positiven Einfluss auf Ihren gesamten kumulativen GPA."
      },
      {
        "question": "Was ist der Unterschied zwischen GPA und dem deutschen Notensystem?",
        "answer": "Das deutsche Notensystem reicht typischerweise von 1.0 (sehr gut) bis 4.0 (ausreichend) oder 5.0 (nicht bestanden), wobei niedrigere Zahlen besser sind. Der GPA hingegen verwendet eine Skala, bei der höhere Zahlen (bis 4.0) bessere Leistungen widerspiegeln. Ein GPA von 4.0 entspricht der Bestnote A, während eine deutsche 1.0 die Bestnote ist."
      }
    ],
    "breadcrumbName": "GPA Rechner"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "de",
    "name": "Notenrechner",
    "category": "education",
    "badge": "Gewichtete Noten & Abschlussprüfung",
    "icon": "Award",
    "h1": "Notenrechner",
    "seoTitle": "Notenrechner – Gewichtete Kursnote & Abschlussprüfungsrechner",
    "seoDescription": "Kostenloser Online-Notenrechner. Berechnen Sie aktuelle gewichtete Kursnoten und ermitteln Sie, welche Punktzahl Sie in Ihrer Abschlussprüfung benötigen, um Ihre gewünschte Gesamtnote zu erreichen.",
    "primaryKeyword": "Notenrechner",
    "secondaryKeywords": [
      "Abschlussnotenrechner",
      "Welche Note brauche ich",
      "gewichteter Notenrechner",
      "Kursnotenrechner",
      "Prüfungsnotenrechner"
    ],
    "heroSubtitle": "Berechnen Sie aktuelle gewichtete Kursdurchschnitte und ermitteln Sie die genaue Punktzahl, die Sie in Ihrer Abschlussprüfung benötigen, um Ihre gewünschte Gesamtnote zu erreichen.",
    "about": [
      "Der Notenrechner bietet zwei wichtige akademische Modi: einen Rechner für gewichtete Noten zur Kombination von Aufgaben, Tests, Zwischenprüfungen und Beteiligung sowie einen Abschlussprüfungsrechner, der die Frage beantwortet: „Welche Punktzahl benötige ich in der Abschlussprüfung, um eine Eins (oder zu bestehen)?“",
      "Lehrer und Universitätsprofessoren bewerten Kurse häufig mit Prozentangaben und zugewiesenen Kategoriegewichten (z. B. Hausaufgaben 20 %, Zwischenprüfungen 30 %, Abschlussprüfung 50 %). Dieser Rechner automatisiert die Mathematik der gewichteten Verteilung, damit Sie Ihre Lernzeit effektiv planen können."
    ],
    "formula": {
      "title": "Formeln für gewichtete Noten & Abschlussprüfung",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Multiplizieren Sie jede erreichte Punktzahl mit ihrem prozentualen Kategoriegewicht. Um die erforderliche Abschlussnote zu ermitteln, isolieren Sie den verbleibenden unvollständigen Gewichtsprozentsatz gegenüber Ihrer Zielnote.",
      "variables": [
        {
          "name": "Aktuelle Note",
          "desc": "Durchschnittliche Prozentzahl der abgeschlossenen Kursarbeiten"
        },
        {
          "name": "Zielnote",
          "desc": "Die gewünschte Mindestprozentzahl im Kurs (z. B. 90 % für eine Eins, 70 % zum Bestehen)"
        },
        {
          "name": "Gewichtung der Abschlussprüfung",
          "desc": "Prozentsatz der Gesamtnote des Kurses, der durch die Abschlussprüfung bestimmt wird"
        }
      ]
    },
    "howToCalculate": [
      "Um die aktuelle Kursnote zu berechnen: Geben Sie Aufgaben mit Punktzahlen (%) und deren jeweilige Kategoriegewichte (%) ein.",
      "Um zu berechnen, was Sie in der Abschlussprüfung benötigen: Wechseln Sie in den „Abschlussprüfungsmodus“, geben Sie Ihre aktuelle Note, Zielnote und die Gewichtung der Abschlussprüfung ein.",
      "Klicken Sie auf „Berechnen“, um Ihre erforderliche Prüfungsnote anzuzeigen und zu sehen, ob diese Note erreichbar ist."
    ],
    "example": {
      "problem": "Sie haben derzeit 84 % in Chemie. Die Abschlussprüfung macht 25 % Ihrer Note aus. Was benötigen Sie in der Abschlussprüfung, um mit einer Eins (90 %) abzuschließen?",
      "steps": [
        "Schritt 1: Gewichtung der aktuellen Note = 100 % - 25 % = 75 % (0,75).",
        "Schritt 2: Zielnote = 90 %. Aktueller Beitrag = 84 % × 0,75 = 63 %.",
        "Schritt 3: Benötigte Punkte aus der Abschlussprüfung: 90 % - 63 % = 27 %.",
        "Schritt 4: Teilen Sie durch die Gewichtung der Abschlussprüfung: 27 % ÷ 0,25 = 108 %."
      ],
      "result": "Sie benötigen 108 % in der Abschlussprüfung (was zusätzliche Bonuspunkte erfordert), um insgesamt 90 % im Kurs zu erreichen."
    },
    "notes": [
      "Wenn die erforderliche Abschlussnote über 100 % liegt, ist die Zielnote mathematisch unmöglich ohne zusätzliche Bonuspunkte.",
      "Stellen Sie sicher, dass alle Kategoriegewichte zusammen 100 % ergeben, um eine vollständige Lehrplanbalance zu gewährleisten.",
      "Verschiedene Hochschulen wenden unterschiedliche Notengrenzen an; überprüfen Sie Ihren Lehrplan für spezifische Notenschwellen."
    ],
    "faqs": [
      {
        "question": "Wie berechnet man eine gewichtete Kursnote?",
        "answer": "Multiplizieren Sie jede Notenkategorie mit ihrem Gewichtsprozentsatz in Dezimalform, addieren Sie alle resultierenden Produkte und teilen Sie durch die Summe der Gesamtgewichte. Dies ergibt Ihre gewichtete Durchschnittsnote."
      },
      {
        "question": "Was mache ich, wenn meine Gewichtungen nicht 100 % ergeben?",
        "answer": "Der Rechner normalisiert Ihre eingegebenen Gewichtungen automatisch, indem er die gesamten gewichteten Punkte durch die Summe der bisher eingegebenen Gewichtungen teilt. Es ist jedoch ratsam, die Gewichtungen so anzupassen, dass sie 100 % ergeben, um die Genauigkeit zu gewährleisten und Missverständnisse zu vermeiden."
      },
      {
        "question": "Wie wird die Abschlussprüfungsnote berechnet, die ich benötige?",
        "answer": "Ziehen Sie die bereits gesicherten Punkte von Ihrer gewünschten Kurszielnote ab und teilen Sie dann die verbleibenden Punkte durch den Gewichtsprozentsatz der Abschlussprüfung. Das Ergebnis ist die Mindestpunktzahl, die Sie in der Abschlussprüfung erreichen müssen, um Ihre Zielnote zu erzielen."
      },
      {
        "question": "Was ist der Unterschied zwischen einem gewichteten und einem ungewichteten Notensystem?",
        "answer": "In einem ungewichteten System zählen alle Aufgaben oder Prüfungen gleich viel für die Gesamtnote. Bei einem gewichteten System haben bestimmte Kategorien (z. B. Abschlussprüfungen, Hausaufgaben, Projekte) einen höheren oder niedrigeren Einfluss auf die Endnote, basierend auf ihrem zugewiesenen Prozentsatz, der im Lehrplan festgelegt ist."
      }
    ],
    "breadcrumbName": "Notenrechner"
  }
};

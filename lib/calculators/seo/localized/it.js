/**
 * lib/calculators/seo/localized/it.js
 * Complete Italian localized SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_IT = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "it",
    "name": "Calcolatore di Prestiti",
    "category": "financial",
    "badge": "Rata Mensile & Interessi",
    "icon": "CreditCard",
    "h1": "Calcolatore di Prestiti",
    "seoTitle": "Calcolatore di Prestiti – Stima le Rate Mensili e l'Interesse Totale",
    "seoDescription": "Calcolatore di prestiti online gratuito. Calcola le rate mensili del prestito, i costi totali degli interessi e visualizza i piani di rimborso del capitale per prestiti personali, auto o aziendali.",
    "primaryKeyword": "calcolatore di prestiti",
    "secondaryKeywords": [
      "calcolatore rata prestito",
      "calcolatore rata mensile prestito",
      "calcolatore interessi",
      "calcolatore prestito personale",
      "calcolatore prestito auto"
    ],
    "heroSubtitle": "Calcola le rate mensili del prestito, gli oneri totali degli interessi e i costi complessivi di rimborso con piani di ammortamento per prestiti personali, auto e studenteschi.",
    "about": [
      "Il Calcolatore di Prestiti aiuta i mutuatari a valutare i termini dei prestiti rateali prima di impegnarsi in accordi di finanziamento con banche, cooperative di credito o prestatori online. I prestiti rateali, inclusi i finanziamenti auto, i prestiti personali e i pacchetti di consolidamento debiti, sono strutturati attorno a una formula di rimborso ammortizzato.",
      "Inserendo il capitale del prestito, il tasso di interesse annuo percentuale (APR) e la durata del prestito in mesi o anni, il calcolatore calcola la rata mensile esatta, l'interesse totale pagato per tutta la durata del prestito e la cifra totale del rimborso."
    ],
    "formula": {
      "title": "Formula Standard di Ammortamento del Prestito",
      "formulaText": "Monthly Payment (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nTotal Repayment = Monthly Payment × n\nTotal Interest = Total Repayment - PV",
      "explanation": "PV è il capitale iniziale del prestito, r è il tasso di interesse mensile periodico (Tasso Annuo / 12 / 100) e n è il numero totale di pagamenti mensili.",
      "variables": [
        {
          "name": "PV",
          "desc": "Valore Attuale (Importo del capitale del prestito)"
        },
        {
          "name": "r",
          "desc": "Tasso di interesse mensile: Tasso Annuo ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Numero totale di periodi di pagamento mensili"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'Importo Totale del Prestito (Capitale) che intendi richiedere.",
      "Inserisci il tasso di interesse annuo (percentuale APR).",
      "Seleziona la durata del prestito (in anni o mesi).",
      "Clicca su Calcola per visualizzare la tua rata mensile, il costo totale degli interessi e la ripartizione tra capitale e interessi."
    ],
    "example": {
      "problem": "Qual è la rata mensile e l'interesse totale su un prestito auto di $25,000 con un interesse annuo del 6.0% su un periodo di 5 anni (60 mesi)?",
      "steps": [
        "Passo 1: Tasso di interesse mensile r = 6% ÷ 1200 = 0.005.",
        "Passo 2: Numero di mesi n = 5 × 12 = 60 mesi.",
        "Passo 3: Fattore (1 + 0.005)⁶⁰ = 1.34885.",
        "Passo 4: Rata mensile = [0.005 × 25,000 × 1.34885] ÷ [1.34885 - 1] = 168.606 ÷ 0.34885 = $483.32.",
        "Passo 5: Pagamenti totali = $483.32 × 60 = $28,999.20. Interessi totali = $28,999.20 - $25,000 = $3,999.20."
      ],
      "result": "La rata mensile è di $483.32 e l'interesse totale pagato in 5 anni è di $3,999.20."
    },
    "notes": [
      "I prestatori possono includere commissioni di istruttoria, spese di documentazione o assicurazione sul credito che aumentano leggermente l'APR Effettivo.",
      "Effettuare rimborsi anticipati aggiuntivi del capitale riduce significativamente gli interessi complessivi e accorcia la durata del rimborso del prestito.",
      "Durate del prestito più lunghe riducono le rate mensili ma aumentano gli interessi cumulativi pagati."
    ],
    "faqs": [
      {
        "question": "Come calcolano i prestatori le rate mensili del prestito?",
        "answer": "I prestatori utilizzano formule di ammortamento standard in cui ogni rata mensile è divisa tra interessi (calcolati sul saldo residuo) e riduzione del capitale."
      },
      {
        "question": "Qual è la differenza tra APR e tasso di interesse?",
        "answer": "Il tasso di interesse è il costo annuo base del prestito di denaro, mentre il Tasso Annuo Effettivo Globale (APR) include sia il tasso di interesse che eventuali commissioni o punti obbligatori del prestatore."
      },
      {
        "question": "In che modo un acconto maggiore influisce su un prestito?",
        "answer": "Un acconto maggiore riduce il capitale preso in prestito, il che diminuisce immediatamente sia la rata mensile che l'interesse totale pagato nel tempo."
      },
      {
        "question": "Posso estinguere il mio prestito in anticipo?",
        "answer": "La maggior parte dei prestiti rateali consente il rimborso anticipato senza penali, il che può farti risparmiare una notevole quantità di interessi totali. Tuttavia, è sempre consigliabile controllare il tuo specifico contratto di prestito per eventuali clausole o commissioni di rimborso anticipato."
      }
    ],
    "breadcrumbName": "Calcolatore di Prestiti"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "it",
    "name": "Calcolatore EMI",
    "category": "financial",
    "badge": "Rata Mensile Equiparata",
    "icon": "Calculator",
    "h1": "Calcolatore EMI",
    "seoTitle": "Calcolatore EMI – Calcola le Rate Mensili Equiparate Online",
    "seoDescription": "Calcolatore EMI online gratuito. Calcola le rate mensili equiparate per mutui, prestiti auto e prestiti personali con ripartizione degli interessi e piani di rimborso.",
    "primaryKeyword": "calcolatore EMI",
    "secondaryKeywords": [
      "calcolatore EMI Italia",
      "calcolatore EMI mensile",
      "calcolatore EMI prestito",
      "EMI mutuo",
      "calcolatore EMI prestito auto"
    ],
    "heroSubtitle": "Calcola le Rate Mensili Equiparate (EMI), l'interesse totale da pagare e i piani di ammortamento per mutui, prestiti personali e prestiti veicoli.",
    "about": [
      "Il Calcolatore della Rata Mensile Equiparata (EMI) è uno strumento finanziario essenziale utilizzato nei sistemi bancari globali e italiani per calcolare l'importo fisso del pagamento mensile dovuto a un creditore in una data specifica di ogni mese.",
      "Le EMI sono strutturate in modo tale che, nei mesi iniziali, una proporzione maggiore di ogni rata sia destinata al pagamento degli interessi; man mano che il capitale del prestito diminuisce nel tempo, una quota crescente di ogni pagamento riduce il saldo del capitale residuo."
    ],
    "formula": {
      "title": "Formula della Rata Mensile Equiparata",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal Payable = EMI × N\nTotal Interest = Total Payable - P",
      "explanation": "P è il capitale del prestito, R è il tasso di interesse mensile (Tasso Annuale / 12 / 100) e N è la durata espressa in mesi totali.",
      "variables": [
        {
          "name": "P",
          "desc": "Importo del capitale preso in prestito"
        },
        {
          "name": "R",
          "desc": "Tasso di interesse mensile: Tasso Annuale ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Durata in mesi (Anni × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'importo del capitale del prestito.",
      "Inserisci la percentuale del Tasso di Interesse Annuale applicato dalla banca.",
      "Inserisci la durata del prestito in anni o mesi.",
      "Visualizza la tua EMI esatta, l'importo totale degli interessi e la tabella di ammortamento mensile."
    ],
    "example": {
      "problem": "Calcola l'EMI su un prestito personale di ₹10,00,000 con un interesse del 10.5% per una durata di 3 anni (36 mesi).",
      "steps": [
        "Passo 1: Capitale P = 10,00,000. Durata N = 36 mesi.",
        "Passo 2: Tasso di interesse mensile R = 10.5 ÷ 1200 = 0.00875.",
        "Passo 3: (1 + R)³⁶ = (1.00875)³⁶ = 1.3686.",
        "Passo 4: EMI = [10,00,000 × 0.00875 × 1.3686] ÷ [1.3686 - 1] = ₹32,502.44.",
        "Passo 5: Interesse totale = (₹32,502.44 × 36) - ₹10,00,000 = ₹1,70,088."
      ],
      "result": "La rata mensile (EMI) è di ₹32,502, e l'interesse totale da pagare in 3 anni è di ₹1,70,088."
    },
    "notes": [
      "Il rimborso anticipato di rate EMI aggiuntive riduce direttamente il capitale e taglia drasticamente gli oneri di interesse a lungo termine.",
      "I tassi di interesse variabili possono modificare gli importi delle EMI o la durata del prestito nel tempo.",
      "Le commissioni di istruttoria e le tasse legali come l'IVA sulle spese bancarie sono fatturate separatamente dai creditori."
    ],
    "faqs": [
      {
        "question": "Che cos'è una Rata Mensile Equiparata (EMI)?",
        "answer": "Una EMI è un importo monetario fisso pagato da un mutuatario a un creditore finanziario in una data specifica di ogni mese per rimborsare un prestito ammortizzato per un periodo prestabilito."
      },
      {
        "question": "Perché gli interessi sono più alti nei primi pagamenti EMI?",
        "answer": "Perché gli interessi sono calcolati sul saldo residuo, che è più alto all'inizio del prestito. Man mano che si rimborsa il capitale, la quota mensile di interessi diminuisce."
      },
      {
        "question": "Posso ridurre la mia EMI?",
        "answer": "Puoi ridurre la tua EMI mensile estendendo la durata del prestito, negoziando un tasso di interesse più basso o effettuando un rimborso anticipato del capitale."
      },
      {
        "question": "Come funziona il calcolo dell'ammortamento di un prestito?",
        "answer": "Il calcolo dell'ammortamento distribuisce il rimborso del capitale e degli interessi su tutta la durata del prestito. Inizialmente, una parte maggiore della rata copre gli interessi, mentre verso la fine del periodo di rimborso, la maggior parte della rata è destinata alla riduzione del capitale."
      }
    ],
    "breadcrumbName": "Calcolatore EMI"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "it",
    "name": "Calcolatore Mutuo",
    "category": "financial",
    "badge": "Mutuo Casa & Tasse",
    "icon": "Home",
    "h1": "Calcolatore Mutuo",
    "seoTitle": "Calcolatore Mutuo – Stima le Rate Mensili del Prestito Casa",
    "seoDescription": "Calcolatore mutuo online gratuito. Stima i costi totali mensili dell'abitazione inclusi capitale, interessi, imposte sulla proprietà, assicurazione sulla casa e acconti.",
    "primaryKeyword": "calcolatore mutuo",
    "secondaryKeywords": [
      "calcolatore rata mutuo",
      "calcolatore prestito casa",
      "calcolatore mutuo mensile",
      "calcolatore rata casa",
      "calcolatore prestito immobiliare"
    ],
    "heroSubtitle": "Stima le tue rate mensili del mutuo includendo capitale, interessi, imposte sulla proprietà e assicurazione sulla casa.",
    "about": [
      "Il Calcolatore Mutuo fornisce una stima completa dei veri costi mensili di proprietà di una casa. Una rata di mutuo immobiliare raramente consiste solo di capitale e interessi: i prestatori e i servizi di deposito a garanzia richiedono regolarmente contributi per le imposte sulla proprietà e premi per l'assicurazione contro i rischi.",
      "Inserisci il prezzo di acquisto dell'immobile, la percentuale o l'importo dell'acconto, il tasso di interesse e la durata (ad esempio, 15 o 30 anni) per stimare la tua rata mensile e i costi di finanziamento totali."
    ],
    "formula": {
      "title": "Formula Completa del Costo del Mutuo",
      "formulaText": "Rata Mensile Totale = Capitale & Interessi (C&I) + Imposta Mensile sulla Proprietà + Assicurazione Mensile + Spese Condominiali\nCapitale del Prestito = Prezzo di Acquisto della Casa - Acconto",
      "explanation": "C&I è calcolato utilizzando la formula di ammortamento standard sull'importo netto del prestito. Tasse e assicurazione sono divise per 12 e sommate per la responsabilità totale mensile del deposito a garanzia.",
      "variables": [
        {
          "name": "Prezzo della Casa",
          "desc": "Prezzo di acquisto concordato dell'immobile residenziale"
        },
        {
          "name": "Acconto",
          "desc": "Capitale iniziale versato alla chiusura"
        },
        {
          "name": "C&I",
          "desc": "Servizio del debito mensile di base che copre capitale e interessi"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci il Prezzo di Acquisto della Casa desiderato.",
      "Inserisci il tuo Acconto (come importo in dollari o percentuale).",
      "Specifica il Tasso di Interesse annuale del mutuo e la Durata del Prestito (tipicamente 15 o 30 anni).",
      "Includi facoltativamente le Imposte sulla Proprietà annuali e l'Assicurazione sulla Casa.",
      "Clicca su Calcola per vedere la tua spesa abitativa mensile completa e gli interessi totali pagati."
    ],
    "example": {
      "problem": "Stima la rata mensile per una casa da $400,000 con un acconto del 20% ($80,000) al 6.5% di interesse su un mutuo a tasso fisso di 30 anni, con $4,800/anno di tasse e $1,200/anno di assicurazione.",
      "steps": [
        "Passo 1: Capitale del Prestito = $400,000 - $80,000 = $320,000.",
        "Passo 2: C&I Mensile su $320,000 al 6.5% per 30 anni = $2,022.62.",
        "Passo 3: Imposta Mensile sulla Proprietà = $4,800 ÷ 12 = $400.00.",
        "Passo 4: Assicurazione Mensile = $1,200 ÷ 12 = $100.00.",
        "Passo 5: Rata Mensile Totale = $2,022.62 + $400.00 + $100.00 = $2,522.62."
      ],
      "result": "La rata mensile totale stimata per l'abitazione è $2,522.62 (C&I: $2,022.62)."
    },
    "notes": [
      "Versare meno del 20% di acconto di solito attiva l'Assicurazione Mutuo Privata (PMI) fino al raggiungimento del 20% di capitale proprio.",
      "Un mutuo a 15 anni prevede rate mensili più elevate ma consente di risparmiare decine di migliaia in interessi totali rispetto a una durata di 30 anni.",
      "Le imposte sulla proprietà fluttuano in base alle valutazioni comunali e ai prelievi dei distretti scolastici locali."
    ],
    "faqs": [
      {
        "question": "Cosa è incluso in una rata mensile del mutuo?",
        "answer": "Una rata standard del mutuo include Capitale, Interessi, Imposte sulla Proprietà e Assicurazione sulla Casa (spesso indicati come PITI)."
      },
      {
        "question": "Perché dovrei puntare a un acconto del 20%?",
        "answer": "Versare almeno il 20% di acconto elimina il requisito per l'Assicurazione Mutuo Privata (PMI), abbassa il tasso di interesse e riduce il tuo obbligo di debito mensile."
      },
      {
        "question": "Dovrei scegliere un mutuo a 15 o 30 anni?",
        "answer": "Una durata di 30 anni offre rate mensili più basse e più gestibili. Una durata di 15 anni prevede rate mensili più elevate ma comporta un costo totale di interessi significativamente inferiore per tutta la durata del prestito."
      },
      {
        "question": "Quali fattori influenzano il tasso di interesse del mutuo?",
        "answer": "Il tasso di interesse del mutuo è influenzato da vari fattori, tra cui il tuo punteggio di credito, l'importo dell'acconto, la durata del prestito, le condizioni economiche generali e le politiche della banca centrale."
      }
    ],
    "breadcrumbName": "Calcolatore Mutuo"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "it",
    "name": "Calcolatore Interesse Composto",
    "category": "financial",
    "badge": "Crescita dell'Investimento",
    "icon": "TrendingUp",
    "h1": "Calcolatore Interesse Composto",
    "seoTitle": "Calcolatore Interesse Composto – Calcola la Crescita dell'Investimento Online",
    "seoDescription": "Calcolatore online gratuito di interesse composto. Calcola il valore futuro dell'investimento, gli interessi guadagnati e l'accumulo di ricchezza con contributi mensili o annuali.",
    "primaryKeyword": "calcolatore interesse composto",
    "secondaryKeywords": [
      "calcolatore interesse composto mensile",
      "calcolatore investimenti",
      "calcolatore crescita composta",
      "calcolatore valore futuro",
      "calcolatore risparmi"
    ],
    "heroSubtitle": "Calcola l'accumulo di ricchezza futura, i guadagni da interesse composto e la crescita dell'investimento con contributi regolari mensili o annuali.",
    "about": [
      "Il Calcolatore di Interesse Composto visualizza il potere della crescita finanziaria esponenziale nel tempo. Spesso descritto come l'\"ottava meraviglia del mondo\", l'interesse composto si riferisce al guadagno di interessi non solo sul deposito iniziale (capitale), ma anche sugli interessi accumulati dai periodi precedenti.",
      "Questo calcolatore ti permette di simulare conti pensionistici (come 401(k) e IRA), risparmi in fondi indicizzati e depositi a termine con frequenze di capitalizzazione personalizzabili (giornaliera, mensile, trimestrale o annuale) e contributi mensili ricorrenti."
    ],
    "formula": {
      "title": "Formula dell'Interesse Composto con Contributi Regolari",
      "formulaText": "Future Value (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nTotal Interest = Future Value - (P + PMT × Total Periods)",
      "explanation": "P è il capitale iniziale, r è il tasso nominale annuo, n è la frequenza di capitalizzazione, t è il tempo in anni e PMT è il contributo periodico.",
      "variables": [
        {
          "name": "P",
          "desc": "Capitale iniziale"
        },
        {
          "name": "r",
          "desc": "Tasso di interesse annuo in forma decimale"
        },
        {
          "name": "n",
          "desc": "Periodi di capitalizzazione all'anno (12 = mensile, 1 = annuale)"
        },
        {
          "name": "PMT",
          "desc": "Contributo in denaro periodico ricorrente"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci il saldo iniziale del tuo investimento (Capitale).",
      "Specifica la percentuale del Tasso di Interesse Annuo previsto.",
      "Inserisci l'Orizzonte Temporale dell'investimento in anni.",
      "Specifica facoltativamente un importo di Contributo Mensile ricorrente.",
      "Clicca su Calcola per visualizzare il valore futuro del portafoglio, gli interessi totali guadagnati e le traiettorie di crescita annuale."
    ],
    "example": {
      "problem": "Investi $10,000 con un rendimento annuo dell'8% capitalizzato mensilmente per 20 anni, aggiungendo $200 ogni mese.",
      "steps": [
        "Passo 1: I $10,000 iniziali crescono fino a: $10,000 × (1 + 0.08/12)²⁴⁰ = $49,268.03.",
        "Passo 2: I contributi mensili di $200 crescono fino a: $200 × [((1 + 0.08/12)²⁴⁰ - 1) / (0.08/12)] = $117,804.09.",
        "Passo 3: Valore totale futuro del portafoglio = $49,268.03 + $117,804.09 = $167,072.12.",
        "Passo 4: Contante totale depositato = $10,000 + ($200 × 240) = $58,000. Interesse totale guadagnato = $109,072.12."
      ],
      "result": "Il portafoglio cresce fino a $167,072.12 con $109,072.12 generati puramente dall'interesse composto."
    },
    "notes": [
      "Il tempo è il fattore più importante nella capitalizzazione composta: raddoppiare l'orizzonte temporale spesso più che triplica i rendimenti dell'investimento.",
      "Storicamente, i fondi indicizzati azionari ampi (come l'S&P 500) hanno registrato rendimenti nominali annui medi di circa il 10% prima dell'inflazione.",
      "La crescita reale della ricchezza dovrebbe tenere conto dell'inflazione a lungo termine (circa il 2-3% annuo)."
    ],
    "faqs": [
      {
        "question": "Cos'è l'interesse composto?",
        "answer": "L'interesse composto è l'interesse calcolato sul capitale iniziale e anche sugli interessi accumulati nei periodi precedenti, creando una crescita esponenziale."
      },
      {
        "question": "Con quale frequenza si capitalizzano gli interessi nei conti di risparmio?",
        "answer": "La maggior parte dei moderni conti di risparmio ad alto rendimento capitalizza gli interessi giornalmente e li accredita sul saldo alla fine di ogni mese."
      },
      {
        "question": "Cos'è la Regola del 72?",
        "answer": "La Regola del 72 stima quanti anni ci vorranno per raddoppiare il tuo denaro: dividi 72 per il tuo tasso di interesse annuo (es. all'8%, il denaro raddoppia in circa 9 anni)."
      },
      {
        "question": "Perché l'interesse composto è chiamato l'\"ottava meraviglia del mondo\"?",
        "answer": "Ad Albert Einstein viene spesso attribuita la frase che definisce l'interesse composto l'\"ottava meraviglia del mondo\" per la sua potente capacità di generare una ricchezza significativa nel tempo attraverso il reinvestimento dei guadagni."
      }
    ],
    "breadcrumbName": "Calcolatore Interesse Composto"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "it",
    "name": "Calcolatore di Interesse Semplice",
    "category": "financial",
    "badge": "Interesse Lineare",
    "icon": "PiggyBank",
    "h1": "Calcolatore di Interesse Semplice",
    "seoTitle": "Calcolatore di Interesse Semplice – Calcola Interesse Semplice e Valore a Scadenza",
    "seoDescription": "Calcolatore di interesse semplice online gratuito. Calcola l'interesse semplice e l'importo totale a scadenza utilizzando la classica formula I = P × R × T per prestiti e cambiali.",
    "primaryKeyword": "calcolatore interesse semplice",
    "secondaryKeywords": [
      "formula interesse semplice",
      "calcolare interesse semplice",
      "prestito interesse semplice",
      "calcolatore valore a scadenza",
      "I = PRT"
    ],
    "heroSubtitle": "Calcola i guadagni da interesse semplice e i valori totali a scadenza utilizzando la formula fondamentale I = P × R × T.",
    "about": [
      "Il Calcolatore di Interesse Semplice calcola l'interesse lineare su titoli di debito, prestiti a breve termine, certificati di deposito e problemi finanziari accademici. A differenza dell'interesse composto, l'interesse semplice non genera interesse sull'interesse—l'addebito è calcolato strettamente sulla somma principale originale.",
      "Questo calcolo è comunemente utilizzato nei prestiti peer-to-peer a breve termine, nelle transazioni di pegno, nelle strutture di finanziamento rateale auto e nei piani di rateizzazione per l'elettronica di consumo."
    ],
    "formula": {
      "title": "Formula dell'Interesse Semplice",
      "formulaText": "Interesse (I) = (Capitale × Tasso × Tempo) / 100\nImporto Totale a Scadenza (A) = Capitale + Interesse",
      "explanation": "Moltiplica il capitale originale per il tasso percentuale annuo e la durata in anni, quindi dividi per 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Capitale: somma originale investita o presa in prestito"
        },
        {
          "name": "R",
          "desc": "Tasso: percentuale di interesse annuo"
        },
        {
          "name": "T",
          "desc": "Tempo: orizzonte temporale in anni"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'importo del Capitale iniziale.",
      "Inserisci la percentuale del Tasso di Interesse Annuo.",
      "Inserisci la durata o la Scadenza del Prestito in anni.",
      "Clicca su Calcola per visualizzare l'interesse semplice generato e l'importo totale di rimborso o a scadenza."
    ],
    "example": {
      "problem": "Calcola l'interesse semplice su una cambiale personale di $5,000 con un interesse annuo del 5.5% per 3 anni.",
      "steps": [
        "Passo 1: Identifica le variabili: P = 5,000, R = 5.5, T = 3.",
        "Passo 2: Calcola l'interesse: I = (5,000 × 5.5 × 3) ÷ 100 = 82,500 ÷ 100 = $825.00.",
        "Passo 3: Importo totale: $5,000 + $825 = $5,825.00."
      ],
      "result": "L'interesse semplice guadagnato è $825.00, per un importo totale a scadenza di $5,825.00."
    },
    "notes": [
      "Se il tempo è espresso in mesi, dividi per 12 (es. 6 mesi = 0.5 anni). Se espresso in giorni, dividi per 365.",
      "L'interesse semplice produce meno denaro totale rispetto all'interesse composto su orizzonti temporali identici.",
      "Le formule dell'interesse semplice sono il riferimento per la carta commerciale e i Buoni del Tesoro."
    ],
    "faqs": [
      {
        "question": "Qual è la formula per l'interesse semplice?",
        "answer": "La formula è I = P × R × T / 100, dove I è l'Interesse, P è il Capitale, R è il tasso di interesse annuo e T è il tempo in anni."
      },
      {
        "question": "In cosa differisce l'interesse semplice dall'interesse composto?",
        "answer": "L'interesse semplice è calcolato esclusivamente sul saldo del capitale originale. L'interesse composto è calcolato sia sul capitale che sugli interessi precedentemente accumulati."
      },
      {
        "question": "Quando viene utilizzato l'interesse semplice?",
        "answer": "L'interesse semplice è tipicamente utilizzato per prestiti personali a breve termine, finanziamenti automobilistici, maturazione degli interessi sui prestiti studenteschi durante i periodi di grazia e carta commerciale."
      },
      {
        "question": "Perché la formula dell'interesse semplice include la divisione per 100?",
        "answer": "La divisione per 100 nella formula (I = P × R × T / 100) serve a convertire il tasso di interesse (R), che di solito è espresso come percentuale (es. 5%), nel suo equivalente decimale (es. 0.05) per il calcolo. Se il tasso fosse già inserito come decimale, la divisione per 100 non sarebbe necessaria."
      }
    ],
    "breadcrumbName": "Interesse Semplice"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "it",
    "name": "Calcolatore GST",
    "category": "financial",
    "badge": "Imposta su Beni e Servizi",
    "icon": "Receipt",
    "h1": "Calcolatore GST",
    "seoTitle": "Calcolatore IVA – Calcola Importi con IVA Inclusa ed Esclusa",
    "seoDescription": "Calcolatore IVA online gratuito. Calcola prezzi con IVA inclusa ed esclusa, la ripartizione dell'imposta (CGST/SGST) e gli importi netti per aliquote standard (5%, 12%, 18%, 28%).",
    "primaryKeyword": "calcolatore IVA",
    "secondaryKeywords": [
      "calcolatore GST India",
      "calcolo IVA",
      "calcolare IVA",
      "calcolatore IVA inclusa",
      "calcolatore IVA esclusa",
      "calcolatore IVA inversa"
    ],
    "heroSubtitle": "Calcola l'Imposta su Beni e Servizi (GST) per transazioni con IVA inclusa ed esclusa, suddividi CGST e SGST e determina i prezzi netti di fattura.",
    "about": [
      "Il Calcolatore dell'Imposta su Beni e Servizi (GST) automatizza la fatturazione fiscale per imprenditori, liberi professionisti, commercialisti e consumatori al dettaglio. La GST è un'imposta sul valore aggiunto completa, basata sulla destinazione, applicata alla produzione, vendita e consumo di beni e servizi.",
      "Questo strumento supporta due modalità commerciali standard: IVA Esclusa (aggiunta dell'imposta a un prezzo base) e IVA Inclusa (calcolo inverso del prezzo base al netto dell'imposta e della porzione esatta di imposta da un prezzo di vendita lordo). Seleziona tra le aliquote GST standard (come 5%, 12%, 18%, 28%) o inserisci aliquote personalizzate."
    ],
    "formula": {
      "title": "Formule per IVA Inclusa ed Esclusa",
      "formulaText": "IVA Esclusa (Aggiungi IVA):\nImporto IVA = Prezzo Base × (Aliquota IVA / 100)\nPrezzo Finale = Prezzo Base + Importo IVA\n\nIVA Inclusa (Rimuovi IVA):\nPrezzo Base = Importo Lordo / (1 + Aliquota IVA / 100)\nImporto IVA = Importo Lordo - Prezzo Base",
      "explanation": "Per aggiungere l'IVA, moltiplica l'importo base per l'aliquota. Per estrarre l'IVA da un totale, dividi la somma lorda per 1 più l'aliquota decimale.",
      "variables": [
        {
          "name": "Prezzo Base",
          "desc": "Prezzo netto del prodotto o servizio al netto dell'imposta"
        },
        {
          "name": "Aliquota IVA",
          "desc": "Percentuale dell'aliquota fiscale legale applicabile"
        },
        {
          "name": "CGST / SGST",
          "desc": "Componenti GST Centrale e Statale (ciascuno pari al 50% della GST totale in India)"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'Importo della transazione.",
      "Seleziona se il prezzo è IVA Esclusa (aggiungi imposta) o IVA Inclusa (rimuovi imposta).",
      "Seleziona un'aliquota fiscale standard (es. 5%, 12%, 18%, 28%) o inserisci un'aliquota personalizzata.",
      "Clicca Calcola per vedere il prezzo base al netto dell'imposta, la porzione di imposta GST, la ripartizione CGST/SGST e il prezzo finale di fattura."
    ],
    "example": {
      "problem": "Calcola il costo al netto dell'imposta e l'importo dell'imposta di un articolo venduto a ₹1.180 con un'aliquota GST inclusa del 18%.",
      "steps": [
        "Passo 1: Prezzo Base = ₹1.180 ÷ (1 + 0,18) = ₹1.180 ÷ 1,18 = ₹1.000,00.",
        "Passo 2: GST Totale = ₹1.180 - ₹1.000 = ₹180,00.",
        "Passo 3: CGST (9%) = ₹90,00 e SGST (9%) = ₹90,00."
      ],
      "result": "Il prezzo base netto è ₹1.000,00 e l'imposta GST addebitata è ₹180,00."
    },
    "notes": [
      "Per le transazioni intrastatali in India, la GST è divisa equamente tra CGST (GST Centrale) e SGST (GST Statale).",
      "Per le vendite interstatali tra confini statali, l'intera imposta è designata come IGST (GST Integrata).",
      "Le aliquote GST standard selezionabili includono 0%, 5%, 12%, 18% e 28%."
    ],
    "faqs": [
      {
        "question": "Come si calcola il prezzo con IVA inclusa?",
        "answer": "Dividi il prezzo totale inclusivo per (1 + Aliquota IVA / 100). Per un'aliquota IVA del 18%, dividi il prezzo totale per 1,18 per determinare il prezzo base al netto dell'imposta."
      },
      {
        "question": "Qual è la differenza tra IVA inclusa ed esclusa?",
        "answer": "IVA Esclusa significa che l'imposta non è ancora stata aggiunta al prezzo. IVA Inclusa significa che il prezzo indicato incorpora già l'imposta."
      },
      {
        "question": "Cosa sono CGST, SGST e IGST?",
        "answer": "In India, la CGST va al governo centrale, la SGST va al governo statale per le vendite locali e la IGST si applica alle vendite tra stati."
      }
    ],
    "breadcrumbName": "Calcolatore GST"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "it",
    "name": "Calcolatore Fiscale",
    "category": "financial",
    "badge": "Reddito e Deduzioni",
    "icon": "Scale",
    "h1": "Calcolatore Fiscale",
    "seoTitle": "Calcolatore Fiscale – Stima l'Imposta sul Reddito e il Netto in Busta Paga",
    "seoDescription": "Calcolatore online gratuito dell'imposta sul reddito. Stima il tuo reddito imponibile, le fasce di imposta sul reddito, l'aliquota fiscale effettiva e il salario netto mensile.",
    "primaryKeyword": "calcolatore fiscale",
    "secondaryKeywords": [
      "calcolatore imposta sul reddito",
      "calcolatore stima tasse",
      "calcolare imposta sul reddito",
      "calcolatore netto in busta paga",
      "calcolatore aliquota fiscale effettiva"
    ],
    "heroSubtitle": "Stima il tuo reddito imponibile, l'onere fiscale, l'aliquota fiscale effettiva e il salario netto mensile.",
    "about": [
      "Il Calcolatore dell'Imposta sul Reddito fornisce uno stimatore generico di tassazione progressiva per aiutare i lavoratori dipendenti e i professionisti autonomi a prevedere il loro onere fiscale annuale e i guadagni netti. I sistemi fiscali progressivi applicano percentuali di imposta più elevate solo alle porzioni di reddito che superano determinate soglie di fascia.",
      "Inserisci il tuo reddito annuo lordo e le deduzioni ammissibili (come deduzioni standard, contributi pensionistici o conti sanitari) per visualizzare le passività fiscali stimate, le aliquote fiscali marginali vs. effettive e il salario netto mensile."
    ],
    "formula": {
      "title": "Struttura dell'Imposta sul Reddito Progressiva",
      "formulaText": "Reddito Imponibile = Reddito Annuo Lordo - Deduzioni\nImposta = ∑ (Reddito Imponibile nella Fascia × Aliquota della Fascia)\nAliquota Fiscale Effettiva = (Imposta Totale / Reddito Lordo) × 100\nSalario Netto = Reddito Lordo - Imposta Totale",
      "explanation": "Le deduzioni abbassano la tua base imponibile. Le fasce fiscali si applicano in modo incrementale—il reddito non è tassato con un'unica aliquota massima fissa.",
      "variables": [
        {
          "name": "Reddito Lordo",
          "desc": "Guadagni totali al lordo delle imposte da lavoro dipendente o attività commerciale"
        },
        {
          "name": "Deduzioni",
          "desc": "Deduzioni standard ammissibili o esenzioni pre-imposta"
        },
        {
          "name": "Aliquota Effettiva",
          "desc": "La percentuale media effettiva di reddito pagata in tasse"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci il tuo Reddito Annuo Lordo totale.",
      "Inserisci le tue Deduzioni annuali stimate (come la deduzione standard o i risparmi previdenziali).",
      "Clicca su Calcola per visualizzare il tuo reddito imponibile stimato, l'onere fiscale, l'aliquota fiscale effettiva e il salario netto mensile."
    ],
    "example": {
      "problem": "Stima l'imposta per un individuo che guadagna $85,000 con una deduzione standard di $14,600.",
      "steps": [
        "Passo 1: Reddito Imponibile = $85,000 - $14,600 = $70,400.",
        "Passo 2: 10% sui primi $11,600 = $1,160.00.",
        "Passo 3: 12% su ($47,150 - $11,600 = $35,550) = $4,266.00.",
        "Passo 4: 22% sul restante ($70,400 - $47,150 = $23,250) = $5,115.00.",
        "Passo 5: Imposta totale stimata = $1,160 + $4,266 + $5,115 = $10,541.00.",
        "Passo 6: Aliquota fiscale effettiva = ($10,541 ÷ $85,000) × 100 = 12.40%."
      ],
      "result": "L'imposta sul reddito stimata è di $10,541.00 con un'aliquota effettiva del 12.40% e un salario netto di $74,459.00."
    },
    "notes": [
      "Questo strumento fornisce stime informative generiche e non sostituisce la consulenza ufficiale di un commercialista certificato o di un professionista fiscale.",
      "Le imposte statali, provinciali, comunali e i contributi previdenziali/FICA sono calcolati separatamente.",
      "L'aliquota fiscale marginale si riferisce all'aliquota pagata sull'ultimo dollaro guadagnato; l'aliquota fiscale effettiva è il tuo onere fiscale medio effettivo."
    ],
    "faqs": [
      {
        "question": "Qual è la differenza tra aliquota fiscale marginale e aliquota fiscale effettiva?",
        "answer": "La tua aliquota fiscale marginale è la fascia fiscale più alta applicata all'ultimo euro del tuo reddito. La tua aliquota fiscale effettiva è la percentuale complessiva reale del tuo reddito totale pagata in tasse."
      },
      {
        "question": "Come le deduzioni riducono il mio onere fiscale?",
        "answer": "Le deduzioni riducono il tuo reddito imponibile. Ad esempio, una deduzione di $10,000 per una persona in una fascia fiscale del 22% riduce l'imposta effettiva dovuta di $2,200."
      },
      {
        "question": "Questo calcolatore include le imposte sul reddito statali?",
        "answer": "Questo modello calcola le fasce progressive standard. Le imposte statali e locali variano a seconda della giurisdizione e dovrebbero essere considerate separatamente."
      },
      {
        "question": "A chi è utile questo calcolatore fiscale?",
        "answer": "Questo calcolatore è utile per lavoratori dipendenti e professionisti autonomi che desiderano stimare il proprio onere fiscale annuale e il reddito netto. Fornisce una panoramica generale basata sui sistemi fiscali progressivi."
      }
    ],
    "breadcrumbName": "Calcolatore Fiscale"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "it",
    "name": "Calcolatore di Sconti",
    "category": "financial",
    "badge": "Saldi e Risparmio",
    "icon": "Tag",
    "h1": "Calcolatore di Sconti",
    "seoTitle": "Calcolatore di Sconti – Calcola Prezzo Scontato e Percentuale di Sconto",
    "seoDescription": "Calcolatore di sconti online gratuito. Calcola istantaneamente prezzi finali scontati, denaro risparmiato e percentuali di sconto, con calcoli opzionali per l'imposta sulle vendite.",
    "primaryKeyword": "calcolatore di sconti",
    "secondaryKeywords": [
      "calcolatore sconto percentuale",
      "calcolo prezzo finale scontato",
      "calcolare sconto",
      "quanto si risparmia",
      "calcolatore sconto inverso"
    ],
    "heroSubtitle": "Calcola prezzi di vendita scontati, risparmio totale in denaro e costi finali con l'imposta sulle vendite per acquisti e promozioni al dettaglio.",
    "about": [
      "Il Calcolatore di Sconti aiuta acquirenti e commercianti al dettaglio a calcolare rapidamente le riduzioni di prezzo durante eventi di vendita (come Black Friday, Cyber Monday, saldi stagionali e coupon promozionali).",
      "Inserisci il prezzo originale e la percentuale di sconto pubblicizzata per vedere immediatamente quanto denaro risparmi, il prezzo scontato e il costo finale al checkout dopo l'applicazione dell'imposta sulle vendite locale."
    ],
    "formula": {
      "title": "Formule per Sconto e Prezzo Finale di Vendita",
      "formulaText": "Savings Amount = Original Price × (Discount % / 100)\nDiscounted Price = Original Price - Savings Amount\nFinal Price with Tax = Discounted Price + (Discounted Price × Tax % / 100)",
      "explanation": "Moltiplica il prezzo di listino per la percentuale di sconto per trovare il risparmio, quindi sottrai tale importo dal prezzo originale.",
      "variables": [
        {
          "name": "Prezzo Originale",
          "desc": "Prezzo di listino del produttore o al dettaglio prima dello sconto"
        },
        {
          "name": "Percentuale di Sconto",
          "desc": "Percentuale di riduzione del prezzo pubblicizzata"
        },
        {
          "name": "Percentuale Imposta sulle Vendite",
          "desc": "Aliquota opzionale dell'imposta sulle vendite statale o locale"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci il Prezzo di Listino Originale.",
      "Inserisci la Percentuale di Sconto (es. 20% o 35% di sconto).",
      "Inserisci facoltativamente la percentuale dell'Imposta sulle Vendite locale e clicca su Calcola per vedere il tuo risparmio esatto e il prezzo finale."
    ],
    "example": {
      "problem": "Una giacca invernale con un prezzo di $180 è in saldo con il 30% di sconto, con un'imposta sulle vendite locale dell'8%.",
      "steps": [
        "Passaggio 1-2: Risparmio = $180 × 0.30 = $54.00. Prezzo scontato = $180 - $54.00 = $126.00.",
        "Passaggio 3-4: Imposta sulle vendite = $126.00 × 0.08 = $10.08. Prezzo finale al checkout = $126.00 + $10.08 = $136.08."
      ],
      "result": "Risparmi $54.00. La giacca costa $126.00 prima delle tasse e $136.08 dopo le tasse."
    },
    "notes": [
      "Uno sconto del 50% significa che paghi la metà del prezzo originale.",
      "L'accumulo di sconti (es. 20% di sconto più un ulteriore 10% di sconto) non equivale a un 30% di sconto totale—il secondo sconto si applica al subtotale già scontato.",
      "L'imposta sulle vendite viene calcolata sul prezzo finale scontato, non sul prezzo di listino originale."
    ],
    "faqs": [
      {
        "question": "Come si calcola uno sconto del 20% su un articolo?",
        "answer": "Moltiplica il prezzo per 0.20 per trovare il risparmio, oppure moltiplica il prezzo per 0.80 per trovare direttamente il prezzo finale di vendita."
      },
      {
        "question": "Come funziona un'offerta \"compra uno, il secondo al 50% di sconto\" in termini percentuali?",
        "answer": "Se vengono acquistati due articoli di pari prezzo, uno sconto BOGO del 50% equivale a uno sconto complessivo del 25% su entrambi gli articoli."
      },
      {
        "question": "Come si calcola il prezzo originale da un prezzo scontato?",
        "answer": "Dividi il prezzo di vendita per (1 - Percentuale di Sconto / 100). Ad esempio, se un articolo costa $80 dopo uno sconto del 20%: $80 / 0.80 = $100 prezzo originale."
      },
      {
        "question": "Qual è la differenza tra uno sconto e un coupon?",
        "answer": "Uno sconto è una riduzione diretta del prezzo, spesso applicata automaticamente al checkout o pubblicizzata come percentuale di riduzione. Un coupon è tipicamente un buono o un codice che si presenta per ricevere uno sconto o un'offerta specifica, che può essere o meno una percentuale di sconto."
      }
    ],
    "breadcrumbName": "Calcolatore di Sconti"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "it",
    "name": "Calcolatore del Margine di Profitto",
    "category": "financial",
    "badge": "Margine vs Ricarico",
    "icon": "BarChart3",
    "h1": "Calcolatore del Margine di Profitto",
    "seoTitle": "Calcolatore del Margine di Profitto – Calcola Margine Lordo e Ricarico Online",
    "seoDescription": "Calcolatore online gratuito del margine di profitto. Calcola il profitto lordo, la percentuale del margine di profitto e la percentuale di ricarico dal costo dell'articolo e dal prezzo di vendita.",
    "primaryKeyword": "calcolatore margine di profitto",
    "secondaryKeywords": [
      "calcolatore profitto",
      "calcolatore margine",
      "calcolatore ricarico",
      "margine di profitto lordo",
      "margine vs ricarico"
    ],
    "heroSubtitle": "Calcola il profitto lordo, la percentuale del margine di profitto e la percentuale di ricarico al dettaglio per prezzare i prodotti in modo redditizio.",
    "about": [
      "Il Calcolatore del Margine di Profitto aiuta imprenditori, rivenditori, dropshipper e proprietari di piccole imprese a determinare con precisione la redditività e a distinguere tra Margine e Ricarico. Confondere queste due metriche è uno degli errori di prezzo più comuni nel commercio.",
      "Il Margine di Profitto Lordo indica quale percentuale del ricavo totale viene trattenuta dopo aver considerato il Costo delle Merci Vendute (COGS). Il Ricarico riflette l'aumento percentuale applicato sul costo base per stabilire il prezzo di vendita al dettaglio."
    ],
    "formula": {
      "title": "Formule del Margine Lordo e del Ricarico",
      "formulaText": "Profitto Lordo = Ricavo - Costo\nMargine di Profitto (%) = (Profitto Lordo / Ricavo) × 100\nRicarico (%) = (Profitto Lordo / Costo) × 100",
      "explanation": "Il margine è calcolato rispetto al ricavo (prezzo di vendita), mentre il ricarico è calcolato rispetto al costo del prodotto.",
      "variables": [
        {
          "name": "Costo",
          "desc": "Costo delle Merci Vendute (COGS) per acquisire o produrre l'unità"
        },
        {
          "name": "Ricavo",
          "desc": "Prezzo di vendita applicato al consumatore"
        },
        {
          "name": "Profitto Lordo",
          "desc": "Ricavo netto rimanente dopo aver dedotto il costo di produzione diretto"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci il Costo per acquisire o produrre il prodotto (es. 40 €).",
      "Inserisci il Ricavo o il Prezzo di Vendita target (es. 100 €).",
      "Clicca su Calcola per visualizzare il profitto lordo in euro, la percentuale del margine di profitto e la percentuale di ricarico richiesta."
    ],
    "example": {
      "problem": "Un'azienda acquista un articolo per 50 € e lo vende per 80 €. Quali sono il profitto lordo, il margine di profitto e il ricarico?",
      "steps": [
        "Passo 1: Profitto Lordo = 80 € (Ricavo) - 50 € (Costo) = 30,00 €.",
        "Passo 2: Margine di Profitto = (30 € ÷ 80 €) × 100 = 37,5%.",
        "Passo 3: Ricarico = (30 € ÷ 50 €) × 100 = 60,0%."
      ],
      "result": "Il profitto lordo è di 30,00 €. Il margine di profitto è del 37,5% e il ricarico è del 60,0%."
    },
    "notes": [
      "Il margine non può mai superare il 100%, mentre il ricarico può essere del 200%, 500% o superiore.",
      "Un ricarico del 50% corrisponde a un margine del 33,3%. Un ricarico del 100% corrisponde a un margine del 50%.",
      "Il margine di profitto netto deduce spese generali, marketing e tasse oltre ai costi di produzione diretti."
    ],
    "faqs": [
      {
        "question": "Qual è la differenza fondamentale tra margine e ricarico?",
        "answer": "Il margine è il profitto diviso per il prezzo di vendita (ricavo). Il ricarico è il profitto diviso per il costo. Il margine misura ciò che si trattiene dalle vendite; il ricarico misura ciò che si aggiunge ai costi."
      },
      {
        "question": "Perché il ricarico è sempre più alto del margine per lo stesso articolo?",
        "answer": "Perché il costo è sempre inferiore al prezzo di vendita per i beni redditizi. Dividere lo stesso profitto in euro per il costo inferiore produce una percentuale più alta rispetto alla divisione per il ricavo."
      },
      {
        "question": "Qual è un buon margine di profitto per le attività di vendita al dettaglio?",
        "answer": "Un margine di profitto lordo sano si aggira tipicamente tra il 40% e il 60% per il commercio al dettaglio e l'e-commerce, mentre i margini di profitto netti si attestano generalmente tra il 10% e il 20%."
      },
      {
        "question": "Come posso migliorare il mio margine di profitto?",
        "answer": "Per migliorare il margine di profitto, puoi aumentare i prezzi di vendita, ridurre i costi di produzione o di acquisizione, ottimizzare la gestione dell'inventario per minimizzare gli sprechi, o negoziare migliori condizioni con i fornitori. Anche l'aumento del volume delle vendite può contribuire, ma è fondamentale mantenere un equilibrio con i costi."
      }
    ],
    "breadcrumbName": "Calcolatore Margine di Profitto"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "it",
    "name": "Calcolatore di Stipendio",
    "category": "financial",
    "badge": "Orario, Mensile & Annuale",
    "icon": "Wallet",
    "h1": "Calcolatore di Stipendio",
    "seoTitle": "Calcolatore di Stipendio – Converti Paga Oraria, Settimanale, Mensile e Annuale",
    "seoDescription": "Calcolatore di stipendio online gratuito. Converti tra paga oraria, settimanale, bisettimanale, reddito mensile e retribuzione annuale con orari di lavoro personalizzati.",
    "primaryKeyword": "calcolatore stipendio",
    "secondaryKeywords": [
      "calcolatore stipendio annuale",
      "calcolatore stipendio mensile",
      "calcolatore stipendio orario",
      "conversione paga oraria stipendio",
      "calcolatore retribuzione"
    ],
    "heroSubtitle": "Converti la retribuzione tra stipendio annuale, paga mensile, pagamenti bisettimanali e tariffe orarie.",
    "about": [
      "Il Calcolatore di Stipendio converte la retribuzione lavorativa attraverso tutte le frequenze di pagamento standard: stipendio annuale, guadagni mensili, pagamenti bisettimanali, salari settimanali, tariffe giornaliere e paga oraria.",
      "Sia che tu stia negoziando un'offerta di lavoro, convertendo una tariffa da $30/ora per un collaboratore in un equivalente annuale, o pianificando le spese di vita mensili, questo calcolatore fornisce conversioni di retribuzione istantanee e standardizzate basate sulle tue ore di lavoro settimanali."
    ],
    "formula": {
      "title": "Standard di Conversione dello Stipendio",
      "formulaText": "Stipendio Annuale = Paga Oraria × Ore/Settimana × Settimane/Anno\nStipendio Mensile = Stipendio Annuale / 12\nPaga Bisettimanale = Stipendio Annuale / 26\nPaga Settimanale = Stipendio Annuale / 52\nPaga Oraria = Stipendio Annuale / (Ore/Settimana × Settimane/Anno)",
      "explanation": "Basato su una settimana lavorativa standard di 40 ore e 52 settimane lavorative all'anno (2.080 ore lavorative annuali).",
      "variables": [
        {
          "name": "Ore Standard",
          "desc": "40 ore a settimana"
        },
        {
          "name": "Settimane Standard",
          "desc": "52 settimane per anno solare (2.080 ore lavorative totali)"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'Importo della Retribuzione.",
      "Seleziona la frequenza di pagamento: Annuale, Mensile, Bisettimanale, Settimanale, Giornaliera o Oraria.",
      "Regola le ore di lavoro settimanali (predefinito 40) o le settimane lavorative all'anno (predefinito 52).",
      "Clicca su Calcola per visualizzare una tabella di conversione completa per tutti i periodi di pagamento."
    ],
    "example": {
      "problem": "Converti uno stipendio annuale di $75.000 in paga mensile, bisettimanale, settimanale e oraria (40 ore/settimana, 52 settimane).",
      "steps": [
        "Passo 1: Paga Mensile = $75.000 ÷ 12 = $6.250,00.",
        "Passo 2: Paga Bisettimanale (26 periodi di pagamento) = $75.000 ÷ 26 = $2.884,62.",
        "Passo 3: Paga Settimanale = $75.000 ÷ 52 = $1.442,31.",
        "Passo 4: Paga Oraria = $75.000 ÷ 2.080 ore = $36,06/ora."
      ],
      "result": "Uno stipendio di $75.000 equivale a $6.250/mese, $2.884,62 bisettimanali e $36,06 all'ora."
    },
    "notes": [
      "I calcoli riflettono il reddito lordo al lordo delle imposte, prima delle ritenute federali, statali e dei contributi previdenziali.",
      "La paga bisettimanale si verifica 26 volte all'anno (con due mesi all'anno che hanno tre pagamenti). La paga semimensile si verifica 24 volte all'anno.",
      "Per i collaboratori freelance, considera le tasse per il lavoro autonomo e le settimane di ferie non retribuite."
    ],
    "faqs": [
      {
        "question": "Come si converte la paga oraria in stipendio annuale?",
        "answer": "Moltiplica la tua paga oraria per le ore lavorate a settimana, quindi moltiplica per 52 settimane. Per un orario a tempo pieno di 40 ore, moltiplica la tariffa oraria per 2.080."
      },
      {
        "question": "Qual è la differenza tra paga bisettimanale e semimensile?",
        "answer": "La paga bisettimanale si verifica ogni due settimane (26 pagamenti/anno). La paga semimensile si verifica due volte al mese in date specifiche come il 1° e il 15 (24 pagamenti/anno)."
      },
      {
        "question": "Quante ore di lavoro ci sono in un anno lavorativo standard?",
        "answer": "Un dipendente a tempo pieno standard che lavora 40 ore a settimana per 52 settimane lavora un totale di 2.080 ore all'anno."
      },
      {
        "question": "Questo calcolatore considera le tasse o le detrazioni?",
        "answer": "No, questo calcolatore fornisce conversioni basate sul reddito lordo (prima delle tasse). Le tasse federali, statali e le detrazioni sui benefici variano notevolmente e non sono incluse nei calcoli."
      }
    ],
    "breadcrumbName": "Calcolatore di Stipendio"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "it",
    "name": "Calcolatore di Valuta",
    "category": "financial",
    "badge": "Tassi di Cambio e Forex",
    "icon": "Coins",
    "h1": "Calcolatore di Valuta",
    "seoTitle": "Calcolatore di Valuta – Convertitore di Cambio Estero e Tassi in Tempo Reale",
    "seoDescription": "Calcolatore di valuta online gratuito. Converti tra USD, EUR, GBP, INR, CAD, AUD, JPY e le principali valute globali con tassi di cambio interbancari.",
    "primaryKeyword": "calcolatore di valuta",
    "secondaryKeywords": [
      "convertitore di valuta",
      "calcolatore tassi di cambio",
      "calcolatore USD in INR",
      "calcolatore EUR in USD",
      "calcolatore di cambio estero"
    ],
    "heroSubtitle": "Converti importi tra valute globali con tassi di cambio interbancari di riferimento trasparenti.",
    "about": [
      "Il Calcolatore di Valuta fornisce conversioni di cambio estero affidabili tra le principali valute globali, inclusi il Dollaro USA (USD), l'Euro (EUR), la Sterlina Britannica (GBP), la Rupia Indiana (INR), il Dollaro Canadese (CAD), il Dollaro Australiano (AUD), lo Yen Giapponese (JPY) e il Franco Svizzero (CHF).",
      "Sia che tu stia pianificando un viaggio all'estero, convertendo fatture freelance internazionali o confrontando prezzi e-commerce internazionali, questo strumento converte i valori utilizzando i tassi di riferimento interbancari standard di metà mercato."
    ],
    "formula": {
      "title": "Conversione del Tasso di Cambio Valutario",
      "formulaText": "Importo Target = Importo Base × Tasso di Cambio Diretto (Dalla Valuta ⟶ Alla Valuta)\nTasso Inverso = 1 / Tasso di Cambio Diretto",
      "explanation": "Converte la valuta di origine nell'equivalente di base in USD, quindi scala in base al moltiplicatore del tasso di cambio della valuta target.",
      "variables": [
        {
          "name": "Importo Base",
          "desc": "La quantità monetaria da convertire"
        },
        {
          "name": "Tasso Diretto",
          "desc": "Il prezzo di un'unità di valuta di origine in termini di valuta target"
        },
        {
          "name": "Tasso Inverso",
          "desc": "Il prezzo reciproco della valuta target in termini di valuta di origine"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'Importo monetario da convertire.",
      "Seleziona la Valuta di Origine (es. USD, EUR, GBP).",
      "Seleziona la Valuta di Destinazione (es. INR, CAD, AUD).",
      "Clicca su Calcola per visualizzare l'importo convertito, il tasso di cambio di riferimento attuale e il tasso di conversione inverso."
    ],
    "example": {
      "problem": "Converti $500 USD in Euro (EUR) con un tasso di cambio di riferimento illustrativo di 1 USD = 0.8950 EUR.",
      "steps": [
        "Passo 1: Importo Base = 500 USD.",
        "Passo 2: Moltiplica per il tasso di cambio: 500 × 0.8950 = 447.50 EUR.",
        "Passo 3: Tasso inverso = 1 ÷ 0.8950 = 1.1173 USD per 1 EUR."
      ],
      "result": "$500 USD si convertono in 447.50 EUR con un tasso di cambio di riferimento illustrativo di 0.8950."
    },
    "notes": [
      "I tassi di cambio riflettono i tassi interbancari di metà mercato; le banche al dettaglio e le carte di credito/debito possono applicare una commissione di transazione estera aggiuntiva dell'1.5% al 3.5%.",
      "I tassi di cambio fluttuano continuamente durante gli orari di trading forex globali aperti.",
      "I tassi di riferimento vengono aggiornati regolarmente rispetto ai feed di riferimento interbancari."
    ],
    "faqs": [
      {
        "question": "Cos'è il tasso di cambio di metà mercato?",
        "answer": "Il tasso di metà mercato è il punto medio tra i tassi di acquisto e vendita globali sui mercati forex. Rappresenta il tasso più equo, senza maggiorazioni."
      },
      {
        "question": "Perché i tassi di cambio al dettaglio differiscono dai convertitori online?",
        "answer": "Le banche commerciali e gli uffici di cambio valuta negli aeroporti applicano uno spread o una commissione per trarre profitto dalle transazioni di conversione di valuta."
      },
      {
        "question": "Posso calcolare il tasso di conversione inverso?",
        "answer": "Sì. Il calcolatore mostra il tasso inverso reciproco (es. 1 INR = 0.012 USD) insieme al risultato della conversione principale."
      },
      {
        "question": "Con quale frequenza vengono aggiornati i tassi di cambio?",
        "answer": "I tassi di riferimento vengono aggiornati continuamente durante il giorno per riflettere le fluttuazioni del mercato in tempo reale, garantendo le informazioni più aggiornate disponibili."
      }
    ],
    "breadcrumbName": "Calcolatore di Valuta"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "it",
    "name": "Calcolatore di Percentuali",
    "category": "math",
    "badge": "Strumento Matematico Rapido",
    "icon": "Percent",
    "h1": "Calcolatore di Percentuali",
    "seoTitle": "Calcolatore di Percentuali – Calcola le Percentuali Facilmente Online",
    "seoDescription": "Calcolatore di percentuali online gratuito. Calcola la percentuale di un numero, la variazione percentuale, l'aumento, la diminuzione e le differenze percentuali istantaneamente con le formule.",
    "primaryKeyword": "calcolatore di percentuali",
    "secondaryKeywords": [
      "calcolare percentuale",
      "calcolatore percentuale",
      "calcolatore aumento percentuale",
      "calcolatore diminuzione percentuale",
      "differenza percentuale"
    ],
    "heroSubtitle": "Calcola le percentuali di valori, l'aumento e la diminuzione percentuale, o trova quale percentuale un numero rappresenta di un altro con precisione matematica istantanea.",
    "about": [
      "Il Calcolatore di Percentuali è uno strumento online versatile progettato per studenti, acquirenti, contabili e analisti che necessitano di calcoli percentuali rapidi e senza errori. Le percentuali rappresentano frazioni di 100 e costituiscono la spina dorsale delle attività quantitative quotidiane, dal calcolo degli sconti sulle vendite e dei ricarichi al dettaglio all'analisi dei rendimenti degli investimenti finanziari e dei punteggi degli esami.",
      "Questo strumento supporta quattro modalità di calcolo essenziali: trovare una percentuale di un totale, calcolare quale percentuale un numero rappresenta di un altro, calcolare l'aumento o la diminuzione percentuale tra due numeri e determinare la differenza percentuale relativa tra due valori indipendenti."
    ],
    "formula": {
      "title": "Formule Standard per le Percentuali",
      "formulaText": "Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100",
      "explanation": "Per calcolare quale frazione di un intero rappresenta una quantità, dividi la parte per il totale e moltiplica per 100. Per le variazioni percentuali, dividi l'aumento o la diminuzione assoluta per il valore di partenza di riferimento.",
      "variables": [
        {
          "name": "Parte",
          "desc": "La porzione o il valore del sottoinsieme in fase di valutazione"
        },
        {
          "name": "Intero",
          "desc": "La quantità di riferimento base o totale"
        },
        {
          "name": "Valore Iniziale",
          "desc": "La quantità di riferimento originale prima della variazione"
        },
        {
          "name": "Nuovo Valore",
          "desc": "La quantità aggiornata dopo la variazione"
        }
      ]
    },
    "howToCalculate": [
      "Seleziona la modalità di calcolo percentuale che corrisponde alla tua domanda (ad esempio, \"Quanto è il X% di Y\" o \"Variazione Percentuale\").",
      "Inserisci i tuoi valori numerici noti nei campi di input forniti.",
      "Visualizza il risultato calcolato in tempo reale, la formula formattata e la scomposizione frazionaria di seguito.",
      "Usa il pulsante Copia per esportare rapidamente il tuo risultato o Reset per eseguire un nuovo calcolo."
    ],
    "example": {
      "problem": "Quanto è il 15% di $240, e qual è l'aumento percentuale da $200 a $250?",
      "steps": [
        "Passo 1 (Percentuale di un valore): (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Passo 2 (Aumento percentuale): Differenza = 250 - 200 = 50.",
        "Passo 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% di aumento."
      ],
      "result": "Il 15% di 240 è 36. Un aumento da 200 a 250 è un guadagno del 25%."
    },
    "notes": [
      "La variazione percentuale si divide sempre per il numero di partenza originale, non per il numero finale.",
      "Un aumento percentuale seguito da una diminuzione percentuale equivalente non riporta al valore originale (ad esempio, +50% e poi -50% produce il 75% del valore di base).",
      "Per convertire un decimale in percentuale, moltiplica per 100 (ad esempio, 0.85 = 85%). Per convertire una percentuale in decimale, dividi per 100."
    ],
    "faqs": [
      {
        "question": "Come si calcola la percentuale di un numero?",
        "answer": "Per calcolare la percentuale di un numero, converti la percentuale in un decimale dividendola per 100, quindi moltiplica quel decimale per il numero totale. Ad esempio, il 20% di 150 è (20 / 100) × 150 = 30."
      },
      {
        "question": "Come si calcola l'aumento percentuale tra due numeri?",
        "answer": "Sottrai il valore originale dal nuovo valore per trovare la differenza. Quindi dividi quella differenza per il valore originale e moltiplica per 100. Ad esempio, da 50 a 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% di aumento."
      },
      {
        "question": "Qual è la differenza tra variazione percentuale e differenza percentuale?",
        "answer": "La variazione percentuale viene utilizzata quando c'è un valore \"vecchio\" e \"nuovo\" nel tempo, dividendo per il valore iniziale. La differenza percentuale viene utilizzata quando si confrontano due valori concomitanti in cui nessuno dei due è il punto di riferimento, dividendo la differenza assoluta per la loro media."
      },
      {
        "question": "La variazione percentuale può essere negativa?",
        "answer": "Sì. Se il valore finale è inferiore al valore iniziale, la variazione percentuale è negativa, rappresentando una diminuzione percentuale."
      }
    ],
    "breadcrumbName": "Calcolatore di Percentuali"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "it",
    "name": "Calcolatore di Rapporti",
    "category": "math",
    "badge": "Proporzioni e Semplificazione",
    "icon": "Divide",
    "h1": "Calcolatore di Rapporti",
    "seoTitle": "Calcolatore di Rapporti – Semplifica e Risolvi Rapporti Online",
    "seoDescription": "Calcolatore di rapporti online gratuito. Semplifica i rapporti ai minimi termini, trova i termini mancanti nelle proporzioni (A:B = C:D) e calcola istantaneamente i fattori di scala.",
    "primaryKeyword": "calcolatore di rapporti",
    "secondaryKeywords": [
      "semplificatore di rapporti",
      "semplificare rapporti",
      "calcolatore di rapporti equivalenti",
      "risolvere proporzioni",
      "calcolatore rapporto d'aspetto"
    ],
    "heroSubtitle": "Semplifica rapporti a due termini ai minimi interi, genera frazioni equivalenti e risolvi istantaneamente le variabili mancanti nelle proporzioni.",
    "about": [
      "Il Calcolatore di Rapporti ti permette di semplificare i rapporti ai loro termini interi più bassi, convertire rapporti decimali in proporzioni intere pulite e risolvere equazioni di proporzione equivalenti della forma A : B = C : D.",
      "I rapporti esprimono la dimensione relativa di due o più quantità. Sono onnipresenti nella scalatura di ricette, nei rapporti d'aspetto del design grafico (come 16:9 e 4:3), nelle metriche di bilancio finanziario (rapporto corrente, rapporto debito/capitale proprio) e nelle miscele di soluzioni chimiche."
    ],
    "formula": {
      "title": "Formule di Semplificazione dei Rapporti e delle Proporzioni",
      "formulaText": "Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C",
      "explanation": "Per semplificare un rapporto, dividi entrambi i termini per il loro Massimo Comune Divisore (MCD). Nelle proporzioni, la moltiplicazione incrociata permette di risolvere per qualsiasi singola variabile mancante.",
      "variables": [
        {
          "name": "A & B",
          "desc": "Primo antecedente e conseguente del rapporto"
        },
        {
          "name": "C & D",
          "desc": "Secondo antecedente e conseguente della proporzione equivalente"
        },
        {
          "name": "GCD",
          "desc": "Massimo Comune Divisore (MCD) tra i numeri"
        }
      ]
    },
    "howToCalculate": [
      "Per semplificare un rapporto, inserisci i numeri A e B e visualizza la proporzione intera irriducibile.",
      "Per risolvere una proporzione A:B = C:D, inserisci tre valori noti e lascia vuoto il campo del valore da trovare.",
      "Il calcolatore esegue la moltiplicazione incrociata e riduce i termini istantaneamente."
    ],
    "example": {
      "problem": "Semplifica il rapporto 24 : 36 e risolvi per X in 4 : 5 = X : 25.",
      "steps": [
        "Passo 1 (Semplificazione): Trova il MCD(24, 36) = 12.",
        "Passo 2: 24 ÷ 12 = 2 e 36 ÷ 12 = 3. Il rapporto semplificato è 2 : 3.",
        "Passo 3 (Proporzione): 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 si riduce a 2:3. In 4:5 = X:25, X è uguale a 20."
    },
    "notes": [
      "Entrambi i termini di un rapporto possono essere moltiplicati o divisi per lo stesso numero diverso da zero senza alterarne il valore.",
      "I rapporti decimali vengono automaticamente moltiplicati per potenze di 10 prima della riduzione per garantire risultati interi.",
      "I rapporti rappresentano relazioni comparative, non quantità assolute. Un rapporto 2:3 potrebbe descrivere 2 e 3 elementi o 200 e 300 elementi."
    ],
    "faqs": [
      {
        "question": "Come si semplifica un rapporto ai minimi termini?",
        "answer": "Per semplificare un rapporto ai minimi termini, devi trovare il Massimo Comune Divisore (MCD) di entrambi i numeri e poi dividere ciascun numero per il MCD. Ad esempio, nel rapporto 15:25, il MCD è 5. Dividendo entrambi i termini per 5, otteniamo il rapporto semplificato 3:5."
      },
      {
        "question": "Come si risolve una proporzione quando un termine è sconosciuto?",
        "answer": "Per risolvere una proporzione con un termine sconosciuto, si usa la proprietà fondamentale delle proporzioni, ovvero la moltiplicazione incrociata. Se A/B = C/D, allora A × D = B × C. Moltiplica i numeri in diagonale e dividi per il numero rimanente opposto all'incognita per trovare il valore mancante."
      },
      {
        "question": "I rapporti possono contenere decimali o frazioni?",
        "answer": "Sì, inizialmente i rapporti possono essere scritti con decimali (ad esempio, 1.5 : 2.5) o frazioni. Tuttavia, la convenzione standard è di esprimerli con numeri interi positivi, moltiplicando entrambi i termini per un fattore comune per eliminare decimali o denominatori."
      },
      {
        "question": "Qual è la differenza tra un rapporto e una proporzione?",
        "answer": "Un rapporto è un confronto tra due quantità (es. 2:3). Una proporzione è un'affermazione che due rapporti sono uguali (es. 2:3 = 4:6). In altre parole, una proporzione è un'uguaglianza tra due rapporti."
      }
    ],
    "breadcrumbName": "Calcolatore di Rapporti"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "it",
    "name": "Calcolatrice di Frazioni",
    "category": "math",
    "badge": "Operazioni con Frazioni",
    "icon": "Binary",
    "h1": "Calcolatrice di Frazioni",
    "seoTitle": "Calcolatrice di Frazioni – Somma, Sottrai, Moltiplica e Dividi Frazioni",
    "seoDescription": "Calcolatrice di frazioni online gratuita. Somma, sottrai, moltiplica e dividi facilmente frazioni proprie, improprie e numeri misti con riduzione passo-passo alla forma più semplice.",
    "primaryKeyword": "calcolatrice frazioni",
    "secondaryKeywords": [
      "sommare frazioni",
      "semplificatore di frazioni",
      "sottrarre frazioni",
      "moltiplicare frazioni",
      "dividere frazioni",
      "calcolatrice numeri misti"
    ],
    "heroSubtitle": "Somma, sottrai, moltiplica e dividi frazioni e numeri misti con semplificazione automatica, denominatori comuni e conversione decimale.",
    "about": [
      "La Calcolatrice di Frazioni fornisce soluzioni complete passo-passo per sommare, sottrarre, moltiplicare e dividere frazioni matematiche. Gestisce frazioni proprie (numeratore < denominatore), frazioni improprie (numeratore > denominatore) e numeri misti.",
      "Sia che tu stia controllando i compiti, adattando ricette culinarie o calcolando misure ingegneristiche, questo strumento riduce i risultati alla loro forma irriducibile più semplice e mostra l'equivalente decimale."
    ],
    "formula": {
      "title": "Regole dell'Aritmetica delle Frazioni",
      "formulaText": "Addition: (a/b) + (c/d) = (ad + bc) / bd\nSubtraction: (a/b) - (c/d) = (ad - bc) / bd\nMultiplication: (a/b) × (c/d) = (ac) / (bd)\nDivision: (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "Per addizione e sottrazione, converti a un denominatore comune prima di combinare i numeratori. Per la moltiplicazione, moltiplica in orizzontale. Per la divisione, moltiplica per il reciproco della seconda frazione.",
      "variables": [
        {
          "name": "a & c",
          "desc": "Numeratori (numeri superiori delle frazioni)"
        },
        {
          "name": "b & d",
          "desc": "Denominatori (numeri inferiori, non devono essere zero)"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci il numeratore e il denominatore per la tua prima frazione.",
      "Seleziona l'operazione aritmetica: Addizione (+), Sottrazione (-), Moltiplicazione (×) o Divisione (÷).",
      "Inserisci il numeratore e il denominatore per la tua seconda frazione.",
      "Clicca su Calcola per vedere la frazione semplificata, il numero misto e la rappresentazione decimale."
    ],
    "example": {
      "problem": "Calculate 3/4 + 2/3.",
      "steps": [
        "Passo 1: Il denominatore comune è 4 × 3 = 12.",
        "Passo 2: Converti i numeratori: (3 × 3) / 12 = 9/12, e (2 × 4) / 12 = 8/12.",
        "Passo 3: Somma i numeratori: 9/12 + 8/12 = 17/12.",
        "Passo 4: Converti la frazione impropria in numero misto: 17 ÷ 12 = 1 con un resto di 5, ottenendo 1 5/12 (circa 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, che equivale a 1 5/12 o 1.4167."
    },
    "notes": [
      "Un denominatore non può mai essere zero perché la divisione per zero è matematicamente indefinita.",
      "Le frazioni negative sono standardizzate con il segno meno nel numeratore (es. -3/4).",
      "La calcolatrice trova automaticamente il Massimo Comune Divisore per ridurre i risultati alla forma più semplice."
    ],
    "faqs": [
      {
        "question": "Come si sommano frazioni con denominatori diversi?",
        "answer": "Trova un denominatore comune (spesso moltiplicando i due denominatori), adatta entrambi i numeratori di conseguenza, somma i numeratori e semplifica la frazione risultante."
      },
      {
        "question": "Come si dividono due frazioni?",
        "answer": "Per dividere le frazioni, moltiplica la prima frazione per il reciproco (la forma invertita) della seconda frazione. Ad esempio, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "Cos'è un numero misto?",
        "answer": "Un numero misto è composto da un numero intero combinato con una frazione propria, come 2 1/2, che rappresenta 2 + 1/2 (o 5/2 come frazione impropria)."
      },
      {
        "question": "Cosa significa semplificare una frazione?",
        "answer": "Semplificare una frazione significa ridurla ai minimi termini. Questo si fa dividendo sia il numeratore che il denominatore per il loro massimo comune divisore (MCD). Ad esempio, 4/6 si semplifica a 2/3 dividendo entrambi per 2."
      }
    ],
    "breadcrumbName": "Calcolatrice Frazioni"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "it",
    "name": "Calcolatore di Età",
    "category": "time-date",
    "badge": "Età Esatta & Giorni",
    "icon": "Calendar",
    "h1": "Calcolatore di Età",
    "seoTitle": "Calcolatore di Età – Calcola la Tua Età Esatta dalla Data di Nascita",
    "seoDescription": "Calcolatore di età online gratuito. Scopri la tua età esatta in anni, mesi, settimane, giorni e ore dalla tua data di nascita ad oggi o a qualsiasi data specificata.",
    "primaryKeyword": "calcolatore età",
    "secondaryKeywords": [
      "calcolare età",
      "quanti anni ho",
      "calcolatore età data di nascita",
      "calcolatore compleanno",
      "calcolatore età cronologica"
    ],
    "heroSubtitle": "Calcola la tua età esatta in anni, mesi, giorni, ore e scopri il conto alla rovescia per il tuo prossimo compleanno con precisione calendaria.",
    "about": [
      "Il Calcolatore di Età calcola la tua età cronologica precisa basandosi sulla tua data di nascita. Mentre l'età convenzionale è espressa semplicemente in anni, questo calcolatore scompone la tua vita in anni esatti, mesi di calendario e giorni rimanenti, tenendo conto degli anni bisestili e delle diverse durate dei mesi.",
      "Oltre all'età attuale, lo strumento ti permette di misurare l'età a qualsiasi data specificata, passata o futura – utile per iscrizioni scolastiche, verifiche dell'età legale, traguardi pensionistici e domande di passaporto o visto."
    ],
    "formula": {
      "title": "Metodo di Calcolo dell'Età Cronologica",
      "formulaText": "Anni = Anno di Destinazione - Anno di Nascita (aggiustato per mese/giorno)\nMesi = Mese di Destinazione - Mese di Nascita (aggiustato per giorno)\nGiorni = Giorno di Destinazione - Giorno di Nascita (prendendo in prestito giorni dal mese precedente se negativo)",
      "explanation": "Il calcolo dell'età accurato al calendario tiene conto delle diverse durate dei mesi (da 28 a 31 giorni) e degli anni bisestili quadriennali, garantendo una precisione giorno per giorno.",
      "variables": [
        {
          "name": "Data di Nascita",
          "desc": "La data di inizio della nascita"
        },
        {
          "name": "Data di Destinazione",
          "desc": "La data di riferimento per la valutazione (predefinita a oggi)"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci la tua data di nascita utilizzando i selettori di giorno, mese e anno.",
      "Specifica facoltativamente una data di valutazione (l'impostazione predefinita è la data odierna).",
      "Clicca su Calcola per vedere la tua età esatta in anni, mesi e giorni.",
      "Esplora i riepiloghi della durata totale della vita in mesi, settimane, giorni e il conto alla rovescia per il tuo prossimo compleanno."
    ],
    "example": {
      "problem": "Qual è l'età esatta di una persona nata il 15 giugno 1995 valutata l'8 ottobre 2026?",
      "steps": [
        "Passo 1: Differenza in anni: 2026 - 1995 = 31 anni.",
        "Passo 2: Differenza in mesi: Ottobre (mese 10) - Giugno (mese 6) = 4 mesi.",
        "Passo 3: Differenza in giorni: 8 - 15 è negativo (-7), quindi si prende in prestito 1 mese (lasciando 3 mesi) e si aggiungono i giorni di settembre (30): 8 + 30 - 15 = 23 giorni."
      ],
      "result": "La persona ha esattamente 31 anni, 3 mesi e 23 giorni."
    },
    "notes": [
      "Il calcolo dell'età occidentale considera una persona di 0 anni alla nascita e incrementa ad ogni anniversario di compleanno.",
      "Gli anni bisestili contengono 366 giorni invece di 365; il calcolatore include il 29 febbraio ogni volta che viene attraversato.",
      "Le ore totali e i giorni totali sono calcolati utilizzando intervalli di giorni del calendario astronomico standard."
    ],
    "faqs": [
      {
        "question": "Come gestisce gli anni bisestili il calcolatore di età?",
        "answer": "Il calcolatore verifica ogni anno solare nell'intervallo e include correttamente il 29 febbraio negli anni bisestili, garantendo che i giorni totali e gli anniversari siano accurati al 100%."
      },
      {
        "question": "Posso calcolare quanti anni avrò in un anno futuro?",
        "answer": "Sì. Modifica il campo \"Età alla data del\" a qualsiasi data futura per scoprire la tua età esatta in quella data."
      },
      {
        "question": "Come viene determinato il conto alla rovescia per il prossimo compleanno?",
        "answer": "Il calcolatore confronta la data odierna con il tuo prossimo compleanno nell'anno solare corrente o successivo per calcolare i giorni esatti rimanenti."
      },
      {
        "question": "Perché è importante conoscere l'età esatta in giorni e ore?",
        "answer": "Conoscere l'età esatta in giorni e ore può essere utile per scopi legali, medici, per calcolare scadenze precise o semplicemente per curiosità personale, offrendo una prospettiva più dettagliata sulla durata della vita."
      }
    ],
    "breadcrumbName": "Calcolatore di Età"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "it",
    "name": "Calcolatore di Tempo",
    "category": "time-date",
    "badge": "Aggiungi e Sottrai Tempo",
    "icon": "Clock",
    "h1": "Calcolatore di Tempo",
    "seoTitle": "Calcolatore di Tempo – Aggiungi e Sottrai Ore, Minuti e Secondi",
    "seoDescription": "Calcolatore di tempo online gratuito. Aggiungi o sottrai facilmente durate di tempo in ore, minuti e secondi. Converti il tempo in ore decimali e pulisci i timecode.",
    "primaryKeyword": "calcolatore di tempo",
    "secondaryKeywords": [
      "calcolatore durata tempo",
      "calcolatore somma tempo",
      "calcolatore sottrazione tempo",
      "calcolatore ore minuti secondi",
      "somma di tempo"
    ],
    "heroSubtitle": "Aggiungi e sottrai durate di tempo in ore, minuti e secondi con gestione automatica del riporto delle unità e conversioni in ore decimali.",
    "about": [
      "Il Calcolatore di Tempo permette di sommare e sottrarre rapidamente intervalli di tempo espressi in ore, minuti e secondi. Poiché il tempo utilizza l'aritmetica in base 60 (sessagesimale) anziché in base 10, l'aggiunta manuale di ore e minuti porta spesso a errori di raggruppamento.",
      "Questo strumento gestisce automaticamente i riporti di 60 secondi e 60 minuti, rendendolo ideale per i montatori video che calcolano la durata del metraggio, i project manager che tracciano le attività fatturabili, i piloti che registrano le durate dei voli e gli atleti che analizzano i tempi di allenamento."
    ],
    "formula": {
      "title": "Formula di Somma del Tempo Sessagesimale",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "Tutti i blocchi di tempo inseriti vengono convertiti in secondi totali, sommati o sottratti, e quindi riconvertiti in ore, minuti e secondi normalizzati.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Ore, minuti e secondi della prima durata"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Ore, minuti e secondi della seconda durata"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci ore, minuti e secondi per il Tempo 1.",
      "Scegli l'operazione: Aggiungi (+) o Sottrai (-).",
      "Inserisci ore, minuti e secondi per il Tempo 2.",
      "Clicca su Calcola per vedere le ore, i minuti, i secondi consolidati e le ore decimali totali."
    ],
    "example": {
      "problem": "Sommare 2 ore 45 minuti 30 secondi e 3 ore 35 minuti 45 secondi.",
      "steps": [
        "Passo 1: Secondi: 30 + 45 = 75 secondi = 1 minuto e 15 secondi.",
        "Passo 2: Minuti: 45 + 35 + 1 (riportato) = 81 minuti = 1 ora e 21 minuti.",
        "Passo 3: Ore: 2 + 3 + 1 (riportato) = 6 ore."
      ],
      "result": "La durata totale è di 6 ore, 21 minuti e 15 secondi (6.3542 ore decimali)."
    },
    "notes": [
      "Ci sono 60 secondi in un minuto e 60 minuti in un'ora.",
      "Per convertire i minuti in ore decimali, dividi i minuti per 60 (es. 30 minuti = 0.5 ore).",
      "Se si sottrae un tempo maggiore da uno minore, il risultato viene visualizzato come un offset di tempo negativo."
    ],
    "faqs": [
      {
        "question": "Come si convertono i minuti in ore decimali?",
        "answer": "Dividi il numero di minuti per 60. Ad esempio, 45 minuti diviso 60 fa 0.75 ore. Pertanto, 2 ore e 45 minuti equivalgono a 2.75 ore decimali."
      },
      {
        "question": "Cosa succede quando i secondi superano 60?",
        "answer": "Ogni blocco di 60 secondi si converte automaticamente in 1 minuto e viene riportato nella colonna dei minuti."
      },
      {
        "question": "Questo strumento può calcolare i timecode per voli o editing video?",
        "answer": "Sì. Somma con precisione più riprese, clip o tratte di volo in ore, minuti e secondi."
      },
      {
        "question": "Qual è la differenza tra il tempo sessagesimale e il tempo decimale?",
        "answer": "Il tempo sessagesimale è il formato tradizionale (ore, minuti, secondi) basato sulla base 60. Il tempo decimale rappresenta le frazioni di un'ora come numeri decimali (es. 1 ora e 30 minuti = 1.5 ore), semplificando i calcoli matematici standard."
      }
    ],
    "breadcrumbName": "Calcolatore di Tempo"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "it",
    "name": "Calcolatore di Date",
    "category": "time-date",
    "badge": "Giorni tra le Date",
    "icon": "Calendar",
    "h1": "Calcolatore di Date",
    "seoTitle": "Calcolatore di Date – Giorni tra le Date e Aggiungi/Sottrai Giorni",
    "seoDescription": "Calcolatore di date online gratuito. Calcola il numero esatto di giorni, settimane e giorni lavorativi tra due date, oppure aggiungi/sottrai giorni da qualsiasi data.",
    "primaryKeyword": "calcolatore di date",
    "secondaryKeywords": [
      "calcolatore differenza date",
      "giorni tra due date",
      "calcolatore durata date",
      "calcolatore giorni lavorativi",
      "aggiungere giorni a una data"
    ],
    "heroSubtitle": "Calcola i giorni di calendario esatti e i giorni lavorativi tra due date, oppure proietta date future aggiungendo o sottraendo giorni.",
    "about": [
      "Il Calcolatore di Date risolve comuni quesiti di calendario: trovare quanti giorni intercorrono tra due date specifiche, o determinare quale data si verifica un dato numero di giorni, settimane o mesi nel futuro o nel passato.",
      "A differenza di un semplice conteggio del calendario, questo strumento riflette accuratamente le variazioni dei confini di fine mese, gli anni bisestili e separa i giorni del fine settimana standard dai giorni lavorativi dal lunedì al venerdì, essenziale per la pianificazione di progetti, scadenze legali, periodi di preavviso e countdown di eventi."
    ],
    "formula": {
      "title": "Matematica della Durata delle Date",
      "formulaText": "Total Days = (End Date (ms) - Start Date (ms)) / (1000 × 60 × 60 × 24)\nWeeks = ⌊Total Days / 7⌋\nRemaining Days = Total Days mod 7",
      "explanation": "Calcola il delta del timestamp epoch tra i timestamp UTC di mezzanotte e conta i giorni dal lunedì al venerdì intercorrenti per gli intervalli lavorativi.",
      "variables": [
        {
          "name": "Data di Inizio",
          "desc": "La data di riferimento iniziale"
        },
        {
          "name": "Data di Fine",
          "desc": "La data di completamento desiderata"
        },
        {
          "name": "Giorni Lavorativi",
          "desc": "Conteggio dei giorni feriali (dal lunedì al venerdì) esclusi i fine settimana"
        }
      ]
    },
    "howToCalculate": [
      "Scegli la Modalità: \"Giorni tra le Date\" o \"Aggiungi / Sottrai Giorni\".",
      "Per la Differenza di Date: Seleziona la Data di Inizio e la Data di Fine.",
      "Spunta \"Includi Giorno Finale\" se la tua tempistica richiede un conteggio inclusivo dei confini.",
      "Visualizza giorni totali, settimane, giorni rimanenti e giorni lavorativi dal lunedì al venerdì."
    ],
    "example": {
      "problem": "Quanti giorni e giorni lavorativi intercorrono tra il 5 gennaio 2026 e il 20 febbraio 2026?",
      "steps": [
        "Passo 1: Giorni di calendario totali trascorsi = 46 giorni.",
        "Passo 2: Equivalente a 6 settimane complete e 4 giorni di calendario.",
        "Passo 3: Escludendo i fine settimana (sabato e domenica) si ottengono 34 giorni lavorativi."
      ],
      "result": "Ci sono 46 giorni di calendario (34 giorni lavorativi) tra le due date."
    },
    "notes": [
      "La differenza di data standard calcola i giorni interi trascorsi tra due date.",
      "Gli anni bisestili sono automaticamente inclusi (2028, 2032, ecc. hanno 29 giorni a febbraio).",
      "Il conteggio dei giorni lavorativi non include le festività nazionali ufficiali poiché queste variano a seconda del paese."
    ],
    "faqs": [
      {
        "question": "Il calcolatore di date include sia la data di inizio che quella di fine?",
        "answer": "Per impostazione predefinita, il calcolatore conta l'intervallo dalla data di inizio fino alla data di fine (tempo trascorso). Puoi attivare \"Includi giorno finale\" per includere entrambi i giorni limite."
      },
      {
        "question": "Come vengono definiti i giorni lavorativi?",
        "answer": "I giorni lavorativi rappresentano dal lunedì al venerdì. Sabato e domenica sono esclusi come giorni del fine settimana."
      },
      {
        "question": "Posso aggiungere solo giorni lavorativi?",
        "answer": "Lo strumento di aggiunta aggiunge giorni di calendario; per calcolare le consegne di progetti in giorni lavorativi, considera 2 giorni di fine settimana ogni 5 giorni lavorativi."
      },
      {
        "question": "Il calcolatore tiene conto dei fusi orari?",
        "answer": "No, il calcolatore opera su date senza considerare l'ora specifica del giorno o i fusi orari, calcolando gli intervalli in base ai giorni interi."
      }
    ],
    "breadcrumbName": "Calcolatore di Date"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "it",
    "name": "Calcolatore Ore Lavorate",
    "category": "time-date",
    "badge": "Rilevazione Presenze e Paga",
    "icon": "Timer",
    "h1": "Calcolatore Ore Lavorate",
    "seoTitle": "Calcolatore Ore Lavorate – Calcola Ore di Lavoro e Scheda Presenze",
    "seoDescription": "Calcolatore ore online gratuito. Calcola le ore di lavoro totali, le pause pranzo, le ore decimali e la retribuzione lorda tra l'ora di inizio e fine per i fogli presenze.",
    "primaryKeyword": "calcolatore ore lavorate",
    "secondaryKeywords": [
      "calcolatore scheda presenze",
      "calcolatore ore di lavoro",
      "calcolatore ore lavorate",
      "calcolatore foglio presenze",
      "calcolare ore tra orari"
    ],
    "heroSubtitle": "Calcola le ore di lavoro giornaliere, detrai le pause pranzo e riposo, converti gli orari in ore decimali e calcola i guadagni lordi per il libro paga.",
    "about": [
      "Il Calcolatore Ore semplifica il monitoraggio del tempo per dipendenti a ore, appaltatori, liberi professionisti e responsabili delle buste paga. Convertire le ore in formato orologio in ore decimali (ad esempio, 7 ore e 45 minuti in 7.75 ore) è essenziale per moltiplicare per le tariffe orarie.",
      "Il calcolatore supporta turni notturni che si estendono oltre la mezzanotte (come dalle 22:00 alle 06:00) e detrae automaticamente le pause non retribuite o i pranzi per riportare le ore nette pagabili."
    ],
    "formula": {
      "title": "Formula Ore Scheda Presenze e Retribuzione",
      "formulaText": "Minuti Lordi = Ora Fine - Ora Inizio (aggiustato per turni notturni)\nMinuti Netti = Minuti Lordi - Minuti Pausa\nOre Decimali = Minuti Netti / 60\nRetribuzione Totale = Ore Decimali × Tariffa Oraria",
      "explanation": "Sottrai l'ora di inizio dall'ora di fine, sottrai i minuti di pausa non retribuita, dividi per 60 per ottenere le ore decimali e moltiplica per la tariffa oraria.",
      "variables": [
        {
          "name": "Ora Inizio",
          "desc": "Ora di timbratura in entrata"
        },
        {
          "name": "Ora Fine",
          "desc": "Ora di timbratura in uscita"
        },
        {
          "name": "Pausa",
          "desc": "Durata della pausa non retribuita o del pranzo in minuti"
        },
        {
          "name": "Tariffa Oraria",
          "desc": "Tariffa oraria base in dollari o valuta locale"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci l'Ora di Inizio del tuo turno (es. 08:30).",
      "Inserisci l'Ora di Fine del tuo turno (es. 17:00).",
      "Specifica l'eventuale tempo di pausa non retribuita in minuti (es. 45 minuti per il pranzo).",
      "Facoltativamente, inserisci la tua tariffa oraria per stimare la retribuzione lorda.",
      "Clicca su Calcola per visualizzare ore nette, minuti, ore decimali e guadagni totali."
    ],
    "example": {
      "problem": "Un dipendente timbra in entrata alle 08:30, timbra in uscita alle 17:15, fa una pausa pranzo di 45 minuti e guadagna $24/ora.",
      "steps": [
        "Passo 1: Tempo lordo totale tra le 08:30 e le 17:15 = 8 ore e 45 minuti (525 minuti).",
        "Passo 2: Dedurre 45 minuti di pranzo: 525 - 45 = 480 minuti netti.",
        "Passo 3: Convertire in decimale: 480 ÷ 60 = 8.00 ore decimali.",
        "Passo 4: Moltiplicare per la retribuzione: 8.00 × $24 = $192.00."
      ],
      "result": "Il dipendente ha lavorato 8.00 ore e ha guadagnato $192.00."
    },
    "notes": [
      "I sistemi di buste paga richiedono ore decimali (es. 8.25 ore) piuttosto che il formato orologio (8h 15m).",
      "I turni che attraversano la mezzanotte vengono rilevati e calcolati senza problemi, senza numeri negativi.",
      "I calcoli rappresentano i salari lordi prima delle imposte sul reddito e delle detrazioni previdenziali."
    ],
    "faqs": [
      {
        "question": "Come si convertono i minuti di lavoro in ore decimali?",
        "answer": "Dividi il numero di minuti per 60. Ad esempio, 15 minuti sono 15/60 = 0.25 ore; 30 minuti sono 0.5 ore; e 45 minuti sono 0.75 ore."
      },
      {
        "question": "Come gestisce il calcolatore i turni notturni che superano la mezzanotte?",
        "answer": "Se l'ora di fine è numericamente precedente all'ora di inizio (es. dalle 23:00 alle 07:00), il calcolatore aggiunge automaticamente 24 ore per determinare la corretta durata del turno notturno."
      },
      {
        "question": "Posso calcolare la retribuzione settimanale con questo strumento?",
        "answer": "Puoi calcolare ogni singolo turno giornaliero o utilizzare il Calcolatore Stipendio per proiezioni di retribuzione consolidate su più settimane."
      },
      {
        "question": "Perché è importante convertire le ore in formato decimale per il libro paga?",
        "answer": "Convertire le ore in formato decimale (ad esempio, 7 ore e 30 minuti in 7.5 ore) semplifica i calcoli per il libro paga, poiché la maggior parte dei sistemi di buste paga e dei software di contabilità utilizza numeri decimali per le retribuzioni orarie. Questo previene errori e garantisce pagamenti accurati."
      }
    ],
    "breadcrumbName": "Calcolatore Ore Lavorate"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "it",
    "name": "Calcolatore BMI",
    "category": "fitness",
    "badge": "Indice di Massa Corporea",
    "icon": "Activity",
    "h1": "Calcolatore BMI",
    "seoTitle": "Calcolatore BMI – Calcola il Tuo Indice di Massa Corporea Online",
    "seoDescription": "Calcolatore BMI online gratuito. Calcola l'Indice di Massa Corporea per adulti usando unità metriche (cm/kg) o imperiali (piedi/pollici/libbre). Visualizza le categorie di peso OMS e gli intervalli sani.",
    "primaryKeyword": "calcolatore BMI",
    "secondaryKeywords": [
      "calcolare BMI",
      "calcolatore indice di massa corporea",
      "calcolatore BMI per adulti",
      "intervallo di peso sano",
      "calcolatore BMI metrico"
    ],
    "heroSubtitle": "Calcola il tuo Indice di Massa Corporea (BMI) utilizzando misurazioni metriche o imperiali per comprendere la tua categoria di peso e gli obiettivi di peso sano.",
    "about": [
      "Il Calcolatore dell'Indice di Massa Corporea (BMI) è una metrica di screening standardizzata stabilita dall'Organizzazione Mondiale della Sanità (OMS) per classificare gli individui in base allo stato ponderale rispetto all'altezza. È ampiamente utilizzato in epidemiologia, nei controlli sanitari generali e nel monitoraggio della forma fisica personale.",
      "Il BMI viene calcolato dividendo il peso corporeo in chilogrammi per il quadrato dell'altezza in metri. Il calcolatore presenta il tuo punteggio esatto, la classificazione ufficiale dell'OMS (sottopeso, normopeso, sovrappeso o classe di obesità) e calcola il tuo intervallo di peso sano personalizzato."
    ],
    "formula": {
      "title": "Formule Standard del BMI",
      "formulaText": "Formula Metrica: BMI = Peso (kg) / [Altezza (m)]²\nFormula Imperiale: BMI = 703 × Peso (libbre) / [Altezza (pollici)]²",
      "explanation": "Dividi il peso per il quadrato dell'altezza. Per le unità imperiali (libbre e pollici), moltiplica il rapporto per il fattore di conversione 703.",
      "variables": [
        {
          "name": "Peso",
          "desc": "Peso corporeo in chilogrammi (kg) o libbre (lbs)"
        },
        {
          "name": "Altezza",
          "desc": "Altezza in centimetri (cm) o piedi e pollici"
        },
        {
          "name": "Fattore 703",
          "desc": "Standard del moltiplicatore di conversione imperiale"
        }
      ]
    },
    "howToCalculate": [
      "Scegli il tuo sistema di unità preferito: Metrico (cm e kg) o Imperiale (piedi, pollici e libbre).",
      "Inserisci la tua altezza attuale e il peso corporeo.",
      "Clicca su Calcola per visualizzare il tuo punteggio BMI, la categoria OMS e l'intervallo di peso sano target.",
      "Rivedi l'intervallo di peso sano progettato per la tua altezza specifica."
    ],
    "example": {
      "problem": "Qual è il BMI di un individuo alto 175 cm (1.75 m) e che pesa 70 kg?",
      "steps": [
        "Passo 1: Eleva al quadrato l'altezza in metri: 1.75 × 1.75 = 3.0625 m².",
        "Passo 2: Dividi il peso per l'altezza al quadrato: 70 ÷ 3.0625 = 22.86.",
        "Passo 3: Confronta con le soglie dell'OMS: 22.9 rientra tra 18.5 – 24.9 (Normopeso)."
      ],
      "result": "L'individuo ha un BMI di 22.9, classificato come Normopeso."
    },
    "notes": [
      "Il BMI è un indicatore di screening della popolazione e non distingue tra massa muscolare magra e tessuto adiposo.",
      "Atleti, culturisti e donne in gravidanza possono registrare punteggi BMI elevati che non riflettono un eccesso di grasso corporeo.",
      "Questo strumento è inteso per la consapevolezza educativa generale e non deve sostituire una valutazione clinica professionale."
    ],
    "faqs": [
      {
        "question": "Qual è considerato un intervallo BMI sano?",
        "answer": "Secondo l'Organizzazione Mondiale della Sanità (OMS), un BMI tra 18.5 e 24.9 è considerato la categoria di peso normale o sano per gli adulti."
      },
      {
        "question": "Perché il BMI può essere fuorviante per gli atleti muscolosi?",
        "answer": "Il BMI misura il peso totale rispetto all'altezza e non può distinguere il muscolo dal grasso adiposo. Poiché il muscolo è più denso del grasso, gli individui muscolosi sono spesso classificati come sovrappeso o obesi nonostante abbiano una bassa percentuale di grasso corporeo."
      },
      {
        "question": "Come si calcola il BMI usando libbre e pollici?",
        "answer": "Moltiplica il tuo peso in libbre per 703, quindi dividi per il quadrato della tua altezza in pollici: BMI = (libbre × 703) / (pollici × pollici)."
      },
      {
        "question": "Il BMI è adatto a tutti?",
        "answer": "No, il BMI è un indicatore generale e potrebbe non essere accurato per tutti. Ad esempio, non è raccomandato per bambini, donne in gravidanza, anziani o atleti con una massa muscolare elevata, poiché non distingue tra massa grassa e massa muscolare."
      }
    ],
    "breadcrumbName": "Calcolatore BMI"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "it",
    "name": "Calcolatore di Andatura",
    "category": "fitness",
    "badge": "Corsa e Camminata",
    "icon": "Footprints",
    "h1": "Calcolatore di Andatura",
    "seoTitle": "Calcolatore di Andatura – Calcola Andatura, Velocità e Tempo di Corsa",
    "seoDescription": "Calcolatore di andatura online gratuito. Calcola l'andatura al chilometro (min/km), l'andatura al miglio (min/mi) e la velocità (km/h, mph) per gare di 5K, 10K, mezza maratona e maratona.",
    "primaryKeyword": "calcolatore andatura",
    "secondaryKeywords": [
      "calcolatore andatura corsa",
      "calcolatore andatura maratona",
      "calcolatore velocità corsa",
      "calcolatore andatura 5k",
      "calcolatore minuti al km"
    ],
    "heroSubtitle": "Calcola l'andatura di corsa e camminata al chilometro e al miglio, determina i parziali di gara necessari e converti istantaneamente tra velocità e andatura.",
    "about": [
      "Il Calcolatore di Andatura è stato creato per corridori, jogger, triatleti e camminatori che desiderano pianificare gli allenamenti o prevedere i tempi di arrivo in gara. L'andatura misura il tempo necessario per coprire un'unità di distanza (come minuti al chilometro o minuti al miglio), mentre la velocità misura la distanza coperta per unità di tempo (km/h o mph).",
      "Il calcolatore supporta le distanze di gara standard, inclusi 5K, 10K, Mezza Maratona (21.0975 km) e Maratona Completa (42.195 km), permettendoti di determinare l'andatura target necessaria per raggiungere il tuo obiettivo di miglior tempo personale."
    ],
    "formula": {
      "title": "Formule di Andatura e Velocità",
      "formulaText": "Pace = Time (seconds) / Distance\nSpeed (km/h) = Distance (km) / Time (hours)\nSpeed (mph) = Distance (miles) / Time (hours)",
      "explanation": "L'andatura è l'inverso della velocità: dividi il tempo totale trascorso in minuti per la distanza totale coperta in chilometri o miglia.",
      "variables": [
        {
          "name": "Tempo",
          "desc": "Durata totale trascorsa in ore, minuti e secondi"
        },
        {
          "name": "Distanza",
          "desc": "Lunghezza totale del percorso in chilometri o miglia"
        },
        {
          "name": "Andatura",
          "desc": "Tempo impiegato per unità di distanza (min/km o min/mi)"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci la Distanza totale del percorso e seleziona l'unità (km o miglia).",
      "Inserisci il Tempo trascorso o target (ore, minuti e secondi).",
      "Clicca su Calcola per visualizzare la tua andatura media al chilometro, l'andatura al miglio e la velocità in km/h e mph.",
      "Regola i tempi per prevedere i requisiti dei parziali per le prossime gare di corsa."
    ],
    "example": {
      "problem": "Quale andatura è necessaria per completare una gara di 10K (10 chilometri) in 50 minuti?",
      "steps": [
        "Passo 1: Tempo totale = 50 minuti = 3.000 secondi.",
        "Passo 2: Andatura al km: 50 minuti ÷ 10 km = 5:00 minuti al chilometro.",
        "Passo 3: Distanza in miglia: 10 km ÷ 1.60934 = 6.2137 miglia.",
        "Passo 4: Andatura al miglio: 50 minuti ÷ 6.2137 miglia = 8:03 minuti al miglio (Velocità: 12.0 km/h o 7.46 mph)."
      ],
      "result": "L'andatura target è 5:00 min/km o 8:03 min/miglio."
    },
    "notes": [
      "1 miglio equivale a circa 1.60934 chilometri. 1 chilometro equivale a 0.621371 miglia.",
      "L'andatura è formattata come MM:SS (es. 4:30 min/km significa 4 minuti e 30 secondi).",
      "Per convertire l'andatura in velocità: Velocità (km/h) = 60 ÷ Andatura (in minuti decimali al km)."
    ],
    "faqs": [
      {
        "question": "Qual è la differenza tra andatura e velocità?",
        "answer": "La velocità indica quanto lontano si viaggia in un dato tempo (es. chilometri all'ora), mentre l'andatura indica quanto tempo ci vuole per percorrere una distanza fissa (es. minuti al chilometro)."
      },
      {
        "question": "Quale andatura è necessaria per una maratona sotto le 4 ore?",
        "answer": "Per completare una maratona completa (42.195 km / 26.219 miglia) in meno di 4 ore, è necessaria un'andatura media più veloce di 5:41 min/km o 9:09 min/miglio."
      },
      {
        "question": "Come si converte min/km in min/miglio?",
        "answer": "Moltiplica la tua andatura in minuti al chilometro per 1.60934. Ad esempio, 5:00 min/km (5.0) × 1.60934 = 8.046 minuti al miglio, che è circa 8:03 min/miglio."
      },
      {
        "question": "Come posso migliorare la mia andatura di corsa?",
        "answer": "Per migliorare la tua andatura, puoi integrare allenamenti a intervalli, corse a tempo (tempo runs), e sessioni di corsa lunga nel tuo programma. Anche il rafforzamento muscolare e una corretta alimentazione sono fondamentali."
      }
    ],
    "breadcrumbName": "Calcolatore di Andatura"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "it",
    "name": "Calcolatore Costo Carburante",
    "category": "utilities",
    "badge": "Budget Viaggio e Carburante",
    "icon": "Fuel",
    "h1": "Calcolatore Costo Carburante",
    "seoTitle": "Calcolatore Costo Carburante – Calcolo Spese Viaggio e Consumo per Chilometro",
    "seoDescription": "Calcolatore costo carburante online gratuito. Calcola la spesa totale del viaggio, il volume di carburante necessario e il costo per chilometro in base all'efficienza del veicolo e al prezzo del carburante.",
    "primaryKeyword": "calcolatore costo carburante",
    "secondaryKeywords": [
      "calcolatore costo benzina",
      "calcolatore consumo carburante",
      "calcolatore carburante viaggio",
      "calcolatore costo per chilometro",
      "calcolatore costo di guida"
    ],
    "heroSubtitle": "Stima i costi del carburante per il tuo viaggio su strada, calcola i litri o i galloni necessari e scopri il costo per chilometro o miglio prima di partire.",
    "about": [
      "Il Calcolatore Costo Carburante aiuta pendolari, viaggiatori e operatori logistici a prevedere le spese di carburante per qualsiasi distanza di guida. Il carburante è una delle spese variabili più elevate della proprietà di un veicolo, influenzata dai prezzi fluttuanti alla pompa, dalle velocità autostradali e dall'efficienza del motore.",
      "Questo strumento supporta i chilometri con km/L o L/100km, così come le miglia con Miglia Per Gallone (MPG). Dettaglia il volume totale di carburante richiesto, la spesa complessiva del viaggio e il costo unitario per chilometro o miglio."
    ],
    "formula": {
      "title": "Formula per il Consumo e il Costo del Carburante",
      "formulaText": "Carburante Necessario (L) = Distanza (km) / Efficienza (km/L)\nCosto Totale Viaggio = Carburante Necessario × Prezzo Carburante per Unità\nCosto per Distanza = Costo Totale Viaggio / Distanza",
      "explanation": "Dividi la distanza totale del viaggio per l'efficienza del carburante del veicolo per trovare la quantità di carburante, quindi moltiplica per il prezzo del carburante alla pompa locale.",
      "variables": [
        {
          "name": "Distanza",
          "desc": "Lunghezza del viaggio in chilometri o miglia"
        },
        {
          "name": "Efficienza",
          "desc": "Valutazione del consumo del veicolo (km/L, L/100km o MPG)"
        },
        {
          "name": "Prezzo Carburante",
          "desc": "Costo di benzina, diesel o gas per litro o gallone"
        }
      ]
    },
    "howToCalculate": [
      "Inserisci la Distanza totale del viaggio (es. 350 km).",
      "Seleziona l'unità di efficienza del tuo veicolo (km/L, L/100km o MPG) e inserisci il valore del tuo veicolo.",
      "Inserisci il prezzo del carburante alla pompa per litro o per gallone.",
      "Clicca su Calcola per vedere il carburante totale richiesto, la spesa totale del viaggio e il costo per unità di distanza."
    ],
    "example": {
      "problem": "Qual è il costo del carburante per un viaggio di 400 km in un'auto che fa 16 km/L con carburante al prezzo di $1.50 al litro?",
      "steps": [
        "Passo 1: Carburante necessario = 400 km ÷ 16 km/L = 25 litri.",
        "Passo 2: Costo totale = 25 litri × $1.50/L = $37.50.",
        "Passo 3: Costo per chilometro = $37.50 ÷ 400 km = $0.094 per km."
      ],
      "result": "Il viaggio richiede 25 litri di carburante e costa $37.50 ($0.094/km)."
    },
    "notes": [
      "Accelerazioni aggressive, carichi pesanti e portapacchi possono ridurre l'efficienza del carburante in autostrada dal 15% al 25%.",
      "Per convertire L/100km in km/L: dividi 100 per il valore in L/100km (es. 8 L/100km = 100 / 8 = 12.5 km/L).",
      "Per i viaggi di andata e ritorno, moltiplica la distanza di sola andata per 2 prima di calcolare."
    ],
    "faqs": [
      {
        "question": "Come si calcola il costo del carburante per un viaggio su strada?",
        "answer": "Dividi la distanza per il consumo del tuo veicolo (km/L o MPG) per trovare il volume di carburante necessario, quindi moltiplica quel volume per il prezzo del carburante al litro o al gallone."
      },
      {
        "question": "Come si converte MPG in km/L?",
        "answer": "1 MPG (USA) equivale a circa 0.425 km/L. Per convertire MPG in km/L, moltiplica il numero MPG per 0.425144."
      },
      {
        "question": "Come posso migliorare l'efficienza del carburante del mio veicolo?",
        "answer": "Mantieni la pressione degli pneumatici raccomandata, rispetta i limiti di velocità costanti in autostrada, rimuovi il peso in eccesso dal bagagliaio ed evita frenate e accelerazioni brusche."
      }
    ],
    "breadcrumbName": "Calcolatore Costo Carburante"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "it",
    "name": "Calcolatore Costo Elettricità",
    "category": "utilities",
    "badge": "Elettrodomestici e Bolletta Energetica",
    "icon": "Zap",
    "h1": "Calcolatore Costo Elettricità",
    "seoTitle": "Calcolatore Costo Elettricità – Calcolo Consumo Elettrodomestici e Bolletta Energetica",
    "seoDescription": "Calcolatore online gratuito del costo dell'elettricità. Calcola il consumo energetico in kWh e le bollette elettriche mensili e annuali stimate per gli elettrodomestici in base alla potenza (wattaggio).",
    "primaryKeyword": "calcolatore costo elettricità",
    "secondaryKeywords": [
      "calcolatore consumo elettrico",
      "calcolatore elettricità elettrodomestici",
      "calcolatore kWh",
      "calcolatore costo energia",
      "calcolatore bolletta elettrica"
    ],
    "heroSubtitle": "Calcola il consumo energetico in kilowattora (kWh) e stima i costi mensili e annuali dell'elettricità per qualsiasi elettrodomestico.",
    "about": [
      "Il Calcolatore Costo Elettricità aiuta proprietari di casa, affittuari e gestori di strutture a quantificare quanta elettricità consumano gli elettrodomestici e quanto costa farli funzionare. Dai condizionatori d'aria e stufe elettriche alle piattaforme di mining di criptovalute e ai compressori di frigoriferi, il consumo energetico può gonfiare drasticamente le bollette.",
      "Inserisci la potenza dell'elettrodomestico (wattaggio), le ore di funzionamento giornaliero e la tariffa elettrica della tua utenza per kilowattora (kWh) per ricevere proiezioni di costo giornaliere, mensili e annuali."
    ],
    "formula": {
      "title": "Formule per Kilowattora e Costo Energetico",
      "formulaText": "Energia Giornaliera (kWh) = (Watt Elettrodomestico × Ore al Giorno) / 1000\nCosto = Energia (kWh) × Tariffa Elettrica per kWh\nCosto Mensile = Costo Giornaliero × 30 giorni\nCosto Annuale = Costo Giornaliero × 365 giorni",
      "explanation": "Converti la potenza nominale dell'elettrodomestico da watt a kilowatt dividendo per 1.000, moltiplica per le ore di funzionamento giornaliero e moltiplica per la tariffa dell'utenza per kWh.",
      "variables": [
        {
          "name": "Wattaggio",
          "desc": "Consumo di potenza nominale dell'elettrodomestico in Watt (W)"
        },
        {
          "name": "Ore/Giorno",
          "desc": "Tempo medio di funzionamento attivo per ciclo di 24 ore"
        },
        {
          "name": "Tariffa (€/kWh)",
          "desc": "Costo dell'elettricità per kilowattora dell'utenza"
        }
      ]
    },
    "howToCalculate": [
      "Individua la potenza nominale (wattaggio) sull'etichetta o nel manuale dell'elettrodomestico (es. 1500W per una stufa elettrica).",
      "Inserisci le ore stimate di funzionamento giornaliero dell'elettrodomestico.",
      "Inserisci il costo locale della tua utenza per kWh (controlla la tua bolletta elettrica mensile).",
      "Clicca su Calcola per visualizzare il consumo giornaliero, mensile e annuale in kWh e il costo monetario."
    ],
    "example": {
      "problem": "Quanto costa far funzionare un condizionatore d'aria da 1.200 Watt per 8 ore al giorno a una tariffa di $0.15 per kWh per un mese di 30 giorni?",
      "steps": [
        "Passo 1: kWh giornalieri: (1.200 W × 8 ore) ÷ 1.000 = 9.6 kWh/giorno.",
        "Passo 2: Energia mensile: 9.6 kWh × 30 giorni = 288 kWh.",
        "Passo 3: Costo mensile: 288 kWh × $0.15/kWh = $43.20.",
        "Passo 4: Costo annuale: 9.6 kWh × 365 giorni × $0.15 = $525.60."
      ],
      "result": "Il condizionatore d'aria consuma 288 kWh al mese e costa $43.20 mensilmente ($525.60 annualmente)."
    },
    "notes": [
      "Le etichette degli elettrodomestici indicano il wattaggio massimo di picco; gli elettrodomestici con termostato (come frigoriferi e condizionatori) si accendono e spengono ciclicamente, riducendo il consumo medio.",
      "1 Kilowatt (kW) = 1.000 Watt (W). 1 Megawatt (MW) = 1.000.000 Watt.",
      "Controlla la tua bolletta per tariffe a scaglioni o tariffe orarie (TOU) durante l'estate e l'inverno."
    ],
    "faqs": [
      {
        "question": "Come si calcola il costo energetico di un elettrodomestico?",
        "answer": "Moltiplica la potenza (wattaggio) dell'elettrodomestico per le ore giornaliere, dividi per 1.000 per ottenere i kWh giornalieri e moltiplica per la tariffa della tua utenza per kWh."
      },
      {
        "question": "Dove posso trovare il wattaggio di un elettrodomestico?",
        "answer": "Il wattaggio di un elettrodomestico è solitamente stampato su un'etichetta di certificazione elettrica situata sul retro o sul fondo del dispositivo, o all'interno del manuale di istruzioni."
      },
      {
        "question": "Quali elettrodomestici consumano più elettricità?",
        "answer": "I sistemi di riscaldamento e raffreddamento (condizionatori centralizzati e pompe di calore), gli scaldabagni, le asciugatrici e i forni elettrici consumano la maggiore quantità di energia domestica."
      },
      {
        "question": "Perché la mia bolletta elettrica è così alta?",
        "answer": "Una bolletta elettrica elevata può essere causata da diversi fattori, tra cui l'uso frequente di elettrodomestici ad alto consumo energetico (come condizionatori, scaldabagni), apparecchi vecchi e inefficienti, isolamento insufficiente della casa, o tariffe energetiche elevate. Utilizzare questo calcolatore può aiutarti a identificare i maggiori consumatori nella tua casa."
      }
    ],
    "breadcrumbName": "Calcolatore Costo Elettricità"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "it",
    "name": "Calcolatore GPA",
    "category": "education",
    "badge": "Media Ponderata dei Voti",
    "icon": "GraduationCap",
    "h1": "Calcolatore GPA",
    "seoTitle": "Calcolatore GPA – Calcola la Media Ponderata Universitaria e della Scuola Superiore su Scala 4.0",
    "seoDescription": "Calcolatore GPA online gratuito. Calcola la tua Media Ponderata (GPA) semestrale e cumulativa su una scala 4.0 con pesi dei crediti e voti in lettere.",
    "primaryKeyword": "calcolatore GPA",
    "secondaryKeywords": [
      "calcolatore GPA universitario",
      "calcolatore GPA semestrale",
      "calcolatore media ponderata voti",
      "calcolatore GPA cumulativo",
      "scala GPA 4.0"
    ],
    "heroSubtitle": "Calcola la Media Ponderata (GPA) semestrale e cumulativa su una scala standard 4.0 utilizzando voti in lettere e crediti formativi.",
    "about": [
      "Il Calcolatore della Media Ponderata (GPA) calcola il tuo rendimento accademico sulla scala di valutazione universitaria standard 4.0. College, università, scuole superiori, comitati per borse di studio e programmi di laurea magistrale utilizzano il GPA cumulativo come parametro principale per onorificenze, probazione accademica e ammissioni.",
      "A differenza di una semplice media dei voti, il GPA è ponderato in base ai crediti formativi del corso, il che significa che un corso da 4 crediti ha il doppio dell'influenza sul tuo GPA finale rispetto a un corso elettivo da 2 crediti."
    ],
    "formula": {
      "title": "Formula del GPA Ponderato",
      "formulaText": "Punti Voto per Corso = Crediti del Corso × Valore della Scala Voti\nGPA = Punti Voto Totali / Crediti del Corso Totali",
      "explanation": "Moltiplica i crediti di ogni corso per l'equivalente numerico del suo voto in lettere, somma i punti voto totali e dividi per i crediti totali tentati.",
      "variables": [
        {
          "name": "Scala Voti (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Crediti",
          "desc": "Crediti formativi o unità semestrali assegnate a ciascun corso"
        }
      ]
    },
    "howToCalculate": [
      "Aggiungi ogni corso frequentato durante il tuo semestre o periodo.",
      "Seleziona il Voto in Lettere ottenuto (es. A, B+, B, C) o inserisci i punti voto numerici.",
      "Inserisci i Crediti Formativi del corso (es. 3 o 4 crediti).",
      "Clicca su Calcola per visualizzare il tuo GPA ponderato, i crediti formativi totali e i punti voto totali ottenuti."
    ],
    "example": {
      "problem": "Calcola il GPA semestrale per 4 corsi: Matematica (4 crediti, A), Storia (3 crediti, B), Biologia (4 crediti, B+), Inglese (3 crediti, A-).",
      "steps": [
        "Passo 1: Matematica: 4 crediti × 4.0 (A) = 16.0 punti.",
        "Passo 2: Storia: 3 crediti × 3.0 (B) = 9.0 punti.",
        "Passo 3: Biologia: 4 crediti × 3.3 (B+) = 13.2 punti.",
        "Passo 4: Inglese: 3 crediti × 3.7 (A-) = 11.1 punti.",
        "Passo 5: Punti totali = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 punti.",
        "Passo 6: Crediti totali = 4 + 3 + 4 + 3 = 14 crediti. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "Il GPA semestrale è 3.52."
    },
    "notes": [
      "I corsi con valutazione Pass/Fail o Audit sono tipicamente esclusi sia dai punti voto che dai totali dei crediti formativi nei calcoli del GPA.",
      "Alcune scuole superiori utilizzano scale ponderate 5.0 per corsi AP o Honors; il GPA universitario standard utilizza il benchmark non ponderato 4.0.",
      "Un GPA cumulativo combina tutti i semestri dividendo tutti i punti voto guadagnati nel corso della vita per tutti i crediti formativi totali."
    ],
    "faqs": [
      {
        "question": "Qual è la scala GPA standard 4.0?",
        "answer": "La scala standard 4.0 mappa: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0 e F = 0.0."
      },
      {
        "question": "Perché i crediti formativi sono inclusi nel calcolo del GPA?",
        "answer": "I crediti formativi rappresentano il rigore e le ore di lezione settimanali di un corso. La ponderazione per crediti assicura che una lezione importante da 4 crediti influenzi il tuo rendimento accademico più di un laboratorio da 1 credito."
      },
      {
        "question": "Come posso aumentare il mio GPA cumulativo?",
        "answer": "Ottenere voti alti (A o A-) nei corsi con un numero maggiore di crediti avrà il maggiore impatto positivo sul tuo GPA cumulativo complessivo."
      },
      {
        "question": "Qual è la differenza tra GPA semestrale e GPA cumulativo?",
        "answer": "Il GPA semestrale riflette il tuo rendimento accademico per un singolo periodo accademico (es. semestre autunnale). Il GPA cumulativo, invece, rappresenta il tuo rendimento accademico complessivo in tutti i corsi frequentati durante l'intera carriera accademica presso un'istituzione."
      }
    ],
    "breadcrumbName": "Calcolatore GPA"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "it",
    "name": "Calcolatore di Voti",
    "category": "education",
    "badge": "Ponderato e Esame Finale",
    "icon": "Award",
    "h1": "Calcolatore di Voti",
    "seoTitle": "Calcolatore Voti – Calcolo Media Ponderata e Voto Esame Finale",
    "seoDescription": "Calcolatore di voti online gratuito. Calcola la media ponderata attuale del corso e scopri quale punteggio ti serve all'esame finale per raggiungere il voto desiderato.",
    "primaryKeyword": "calcolatore voti",
    "secondaryKeywords": [
      "calcolatore voto finale",
      "quale voto devo prendere",
      "calcolatore media ponderata",
      "calcolatore media corso",
      "calcolatore voto esame"
    ],
    "heroSubtitle": "Calcola le medie ponderate attuali del corso e determina il punteggio esatto necessario all'esame finale per raggiungere il voto desiderato.",
    "about": [
      "Il Calcolatore di Voti offre due modalità accademiche essenziali: un Calcolatore di Voti Ponderati per combinare compiti, quiz, esami intermedi e partecipazione, e un Calcolatore dell'Esame Finale che risponde alla domanda: \"Che punteggio devo ottenere all'esame finale per avere un A (o superare l'esame)?\"",
      "Insegnanti e professori universitari spesso valutano i corsi utilizzando percentuali con pesi assegnati per categoria (come Compiti a casa 20%, Esami intermedi 30%, Esame finale 50%). Questo calcolatore automatizza il calcolo della distribuzione ponderata in modo da poter pianificare il tempo di studio in modo efficace."
    ],
    "formula": {
      "title": "Formule per il Voto Ponderato e l'Esame Finale",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Moltiplica ogni punteggio ottenuto per il peso percentuale della sua categoria. Per trovare il punteggio finale richiesto, isola la percentuale di peso rimanente non completata rispetto al tuo voto obiettivo.",
      "variables": [
        {
          "name": "Voto Attuale",
          "desc": "Media percentuale ottenuta sui lavori del corso completati"
        },
        {
          "name": "Voto Obiettivo",
          "desc": "La percentuale minima desiderata per il corso (es. 90% per un A, 70% per un C)"
        },
        {
          "name": "Peso Esame Finale",
          "desc": "Percentuale del voto complessivo del corso determinata dall'esame finale"
        }
      ]
    },
    "howToCalculate": [
      "Per calcolare il voto attuale del corso: Inserisci i compiti con i punteggi (%) e i rispettivi pesi di categoria (%).",
      "Per calcolare cosa ti serve all'esame finale: Passa alla \"Modalità Esame Finale\", inserisci il tuo Voto Attuale, il Voto Obiettivo e il Peso dell'Esame Finale.",
      "Clicca su Calcola per visualizzare il punteggio richiesto per l'esame e se tale punteggio è raggiungibile."
    ],
    "example": {
      "problem": "Attualmente hai un 84% in Chimica. L'esame finale vale il 25% del tuo voto. Cosa ti serve all'esame finale per ottenere un A (90%)?",
      "steps": [
        "Passo 1: Peso del voto attuale = 100% - 25% = 75% (0.75).",
        "Passo 2: Voto obiettivo = 90%. Contributo attuale = 84% × 0.75 = 63%.",
        "Passo 3: Punti necessari dall'esame finale: 90% - 63% = 27%.",
        "Passo 4: Dividi per il peso dell'esame finale: 27% ÷ 0.25 = 108%."
      ],
      "result": "Hai bisogno del 108% all'esame finale (il che richiede crediti extra) per raggiungere un 90% complessivo nel corso."
    },
    "notes": [
      "Se il punteggio finale richiesto supera il 100%, il voto obiettivo è matematicamente impossibile senza punti extra o una curva di valutazione.",
      "Assicurati che tutti i pesi delle categorie sommino il 100% per un equilibrio completo del programma.",
      "Diverse università applicano diverse soglie di voto; controlla il tuo programma per i tagli specifici delle lettere."
    ],
    "faqs": [
      {
        "question": "Come si calcola un voto ponderato del corso?",
        "answer": "Moltiplica ogni categoria di voto per la sua percentuale di peso in forma decimale, somma tutti i prodotti risultanti e dividi per la somma totale dei pesi."
      },
      {
        "question": "Cosa devo fare se i miei pesi non sommano il 100%?",
        "answer": "Il calcolatore normalizza automaticamente i pesi inseriti dividendo i punti ponderati totali per la somma dei pesi inseriti finora."
      },
      {
        "question": "Come si calcola il punteggio dell'esame finale?",
        "answer": "Sottrai i punti voto che hai già ottenuto dal tuo voto obiettivo del corso, quindi dividi i punti rimanenti per la percentuale di peso dell'esame finale."
      },
      {
        "question": "Cosa significa se il punteggio richiesto per l'esame finale supera il 100%?",
        "answer": "Se il calcolatore indica un punteggio superiore al 100% per l'esame finale, significa che, in base ai tuoi voti attuali e al peso dell'esame, è matematicamente impossibile raggiungere il tuo voto obiettivo senza crediti extra o una curva di valutazione applicata dal docente."
      }
    ],
    "breadcrumbName": "Calcolatore di Voti"
  }
};

/**
 * lib/calculators/seo/localized/fr.js
 * Complete French localized SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_FR = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "fr",
    "name": "Simulateur de Prêt",
    "category": "financial",
    "badge": "Mensualité & Intérêts",
    "icon": "CreditCard",
    "h1": "Simulateur de Prêt",
    "seoTitle": "Simulateur de Prêt – Estimez vos Mensualités et le Coût Total des Intérêts",
    "seoDescription": "Simulateur de prêt en ligne gratuit. Calculez vos mensualités, le coût total des intérêts et visualisez les tableaux d'amortissement pour les prêts personnels, auto ou professionnels.",
    "primaryKeyword": "simulateur de prêt",
    "secondaryKeywords": [
      "simulateur de mensualités",
      "calculateur d'intérêts",
      "simulateur de prêt personnel",
      "simulateur de prêt auto"
    ],
    "heroSubtitle": "Calculez vos mensualités, le coût total des intérêts et le coût global de votre remboursement avec les tableaux d'amortissement pour les prêts personnels, auto et étudiants.",
    "about": [
      "Le Simulateur de Prêt aide les emprunteurs à évaluer les conditions des prêts à tempérament avant de s'engager dans des accords de financement avec des banques, des coopératives de crédit ou des prêteurs en ligne. Les prêts à tempérament – y compris le financement automobile, les prêts personnels et les regroupements de dettes – sont structurés autour d'une formule de remboursement amorti.",
      "En saisissant le capital emprunté, le taux d'intérêt annuel (TAEG) et la durée du prêt en mois ou en années, le simulateur calcule votre mensualité exacte, le total des intérêts payés sur la durée du prêt et le montant total à rembourser."
    ],
    "formula": {
      "title": "Formule Standard d'Amortissement de Prêt",
      "formulaText": "Mensualité (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nRemboursement Total = Mensualité × n\nIntérêts Totaux = Remboursement Total - PV",
      "explanation": "PV est le capital initial du prêt, r est le taux d'intérêt mensuel périodique (Taux Annuel / 12 / 100), et n est le nombre total de mensualités.",
      "variables": [
        {
          "name": "PV",
          "desc": "Valeur Actuelle (Montant du capital emprunté)"
        },
        {
          "name": "r",
          "desc": "Taux d'intérêt mensuel : Taux Annuel ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Nombre total de périodes de paiement mensuel"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le Montant Total du Prêt (Capital) que vous prévoyez d'emprunter.",
      "Saisissez le taux d'intérêt annuel (pourcentage du TAEG).",
      "Sélectionnez la durée du prêt (en années ou en mois).",
      "Cliquez sur Calculer pour voir votre mensualité, le coût total des intérêts et la répartition capital/intérêts."
    ],
    "example": {
      "problem": "Quelle est la mensualité et le total des intérêts pour un prêt automobile de 25,000 $ à un taux d'intérêt annuel de 6.0 % sur une durée de 5 ans (60 mois) ?",
      "steps": [
        "Étape 1 : Taux d'intérêt mensuel r = 6% ÷ 1200 = 0.005.",
        "Étape 2 : Nombre de mois n = 5 × 12 = 60 mois.",
        "Étape 3 : Facteur (1 + 0.005)⁶⁰ = 1.34885.",
        "Étape 4 : Mensualité = [0.005 × 25,000 × 1.34885] ÷ [1.34885 - 1] = 168.606 ÷ 0.34885 = 483.32 $.",
        "Étape 5 : Paiements totaux = 483.32 $ × 60 = 28,999.20 $. Intérêts totaux = 28,999.20 $ - 25,000 $ = 3,999.20 $."
      ],
      "result": "La mensualité est de 483.32 $, et le total des intérêts payés sur 5 ans est de 3,999.20 $."
    },
    "notes": [
      "Les prêteurs peuvent inclure des frais de dossier, des frais de documentation ou une assurance-crédit, ce qui augmente légèrement le TAEG effectif.",
      "Effectuer des remboursements anticipés supplémentaires du capital réduit considérablement les intérêts globaux et raccourcit la durée de remboursement du prêt.",
      "Des durées de prêt plus longues réduisent les mensualités mais augmentent les intérêts cumulés payés."
    ],
    "faqs": [
      {
        "question": "Comment les prêteurs calculent-ils les mensualités d'un prêt ?",
        "answer": "Les prêteurs utilisent des formules d'amortissement standard où chaque mensualité est divisée entre les intérêts (calculés sur le solde restant dû) et la réduction du capital."
      },
      {
        "question": "Quelle est la différence entre le TAEG et le taux d'intérêt ?",
        "answer": "Le taux d'intérêt est le coût annuel de base de l'emprunt d'argent, tandis que le Taux Annuel Effectif Global (TAEG) inclut à la fois le taux d'intérêt et tous les frais ou points obligatoires du prêteur."
      },
      {
        "question": "Comment un apport personnel plus important affecte-t-il un prêt ?",
        "answer": "Un apport personnel plus important réduit le capital emprunté, ce qui diminue immédiatement votre mensualité et le total des intérêts payés au fil du temps."
      },
      {
        "question": "Qu'est-ce qu'un tableau d'amortissement ?",
        "answer": "Un tableau d'amortissement est un tableau détaillant chaque paiement périodique d'un prêt amortissable. Il indique la part du capital et des intérêts contenue dans chaque paiement jusqu'au remboursement complet du prêt."
      }
    ],
    "breadcrumbName": "Simulateur de Prêt"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "fr",
    "name": "Simulateur de Prêt (EMI)",
    "category": "financial",
    "badge": "Mensualité Constante",
    "icon": "Calculator",
    "h1": "Calculateur EMI",
    "seoTitle": "Calculateur EMI – Calculez vos mensualités de prêt en ligne",
    "seoDescription": "Calculateur EMI gratuit en ligne. Calculez vos mensualités constantes pour les prêts immobiliers, prêts auto et prêts personnels, avec le détail des intérêts et le tableau d'amortissement.",
    "primaryKeyword": "simulateur de prêt",
    "secondaryKeywords": [
      "calculateur mensualité",
      "calculateur de crédit",
      "mensualité prêt immobilier",
      "calculateur prêt auto",
      "mensualité constante"
    ],
    "heroSubtitle": "Calculez vos mensualités constantes (EMI), le total des intérêts à payer et les tableaux d'amortissement pour vos prêts immobiliers, personnels et véhicules.",
    "about": [
      "Le Calculateur de Mensualités Constantes (EMI) est un outil financier essentiel utilisé dans les systèmes bancaires mondiaux pour déterminer le montant fixe du paiement mensuel dû à un prêteur à une date précise chaque mois.",
      "Les EMI sont structurées de manière à ce que, pendant les premiers mois, une plus grande partie de chaque versement soit consacrée au paiement des intérêts ; à mesure que le capital du prêt diminue avec le temps, une part croissante de chaque paiement réduit le solde du capital restant."
    ],
    "formula": {
      "title": "Formule de la Mensualité Constante (EMI)",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal Payable = EMI × N\nTotal Interest = Total Payable - P",
      "explanation": "P est le capital emprunté, R est le taux d'intérêt mensuel (Taux Annuel / 12 / 100), et N est la durée exprimée en nombre total de mois.",
      "variables": [
        {
          "name": "P",
          "desc": "Montant du capital emprunté"
        },
        {
          "name": "R",
          "desc": "Taux d'intérêt mensuel : Taux Annuel ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Durée en mois (Années × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le montant du capital emprunté.",
      "Saisissez le pourcentage du taux d'intérêt annuel appliqué par la banque.",
      "Saisissez la durée du prêt en années ou en mois.",
      "Consultez votre EMI exact, le montant total des intérêts et le tableau d'amortissement mensuel."
    ],
    "example": {
      "problem": "Calculez l'EMI pour un prêt personnel de ₹10,00,000 à un taux d'intérêt de 10.5% sur une durée de 3 ans (36 mois).",
      "steps": [
        "Étape 1 : Capital P = 10,00,000. Durée N = 36 mois.",
        "Étape 2 : Taux d'intérêt mensuel R = 10.5 ÷ 1200 = 0.00875.",
        "Étape 3 : (1 + R)³⁶ = (1.00875)³⁶ = 1.3686.",
        "Étape 4 : EMI = [10,00,000 × 0.00875 × 1.3686] ÷ [1.3686 - 1] = ₹32,502.44.",
        "Étape 5 : Intérêt total = (₹32,502.44 × 36) - ₹10,00,000 = ₹1,70,088."
      ],
      "result": "La mensualité (EMI) est de ₹32,502, et l'intérêt total à payer sur 3 ans est de ₹1,70,088."
    },
    "notes": [
      "Le remboursement anticipé de mensualités supplémentaires réduit directement le capital et diminue considérablement les frais d'intérêt à long terme.",
      "Les taux d'intérêt variables peuvent modifier le montant des mensualités ou la durée du prêt au fil du temps.",
      "Les frais de dossier et les taxes légales comme la TVA sur les frais bancaires sont facturés séparément par les prêteurs."
    ],
    "faqs": [
      {
        "question": "Qu'est-ce qu'une Mensualité Constante (EMI) ?",
        "answer": "Une EMI est un montant monétaire fixe payé par un emprunteur à un prêteur financier à une date précise chaque mois pour rembourser un prêt amortissable sur une période définie."
      },
      {
        "question": "Pourquoi les intérêts sont-ils plus élevés au début du remboursement ?",
        "answer": "Parce que les intérêts sont calcul��s sur le capital restant dû, qui est le plus élevé au début du prêt. À mesure que vous remboursez le capital, la part des intérêts mensuels diminue."
      },
      {
        "question": "Puis-je réduire mes mensualités (EMI) ?",
        "answer": "Vous pouvez réduire vos mensualités (EMI) en prolongeant la durée du prêt, en négociant un taux d'intérêt plus bas, ou en effectuant un remboursement anticipé du capital."
      },
      {
        "question": "Comment fonctionne le tableau d'amortissement ?",
        "answer": "Le tableau d'amortissement détaille chaque mensualité, en indiquant la part du capital remboursé et la part des intérêts payés. Il montre comment le capital restant dû diminue progressivement au fil du temps."
      }
    ],
    "breadcrumbName": "Calculateur EMI"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "fr",
    "name": "Simulateur de Crédit Immobilier",
    "category": "financial",
    "badge": "Crédit Immobilier & Impôts",
    "icon": "Home",
    "h1": "Simulateur de Crédit Immobilier",
    "seoTitle": "Simulateur de Crédit Immobilier – Estimez vos Mensualités de Prêt Immobilier",
    "seoDescription": "Simulateur de crédit immobilier gratuit en ligne. Estimez le coût total mensuel de votre logement, incluant le capital, les intérêts, les taxes foncières, l'assurance habitation et l'apport personnel.",
    "primaryKeyword": "simulateur crédit immobilier",
    "secondaryKeywords": [
      "calculateur mensualité prêt immobilier",
      "simulateur prêt immobilier"
    ],
    "heroSubtitle": "Estimez vos mensualités de prêt immobilier incluant le capital, les intérêts, les taxes foncières et l'assurance habitation.",
    "about": [
      "Le simulateur de crédit immobilier fournit une estimation complète des coûts mensuels réels de possession d'un logement. Une mensualité de prêt immobilier se compose rarement uniquement du capital et des intérêts ; les prêteurs et les services de séquestre exigent régulièrement des contributions pour les taxes foncières et les primes d'assurance habitation.",
      "Saisissez le prix d'achat du bien, le pourcentage ou le montant de l'apport personnel, le taux d'intérêt et la durée (par exemple, 15 ou 30 ans) pour estimer votre mensualité et le coût total du financement sur la durée du prêt."
    ],
    "formula": {
      "title": "Formule Complète du Coût du Crédit Immobilier",
      "formulaText": "Paiement Mensuel Total = Capital & Intérêts (C&I) + Taxe Foncière Mensuelle + Assurance Mensuelle + HOA\nCapital Emprunté = Prix d'Achat du Logement - Apport Personnel",
      "explanation": "Le C&I est calculé à l'aide de la formule d'amortissement standard sur le montant net du prêt. Les taxes et l'assurance sont divisées par 12 et additionnées pour obtenir le total des charges mensuelles en séquestre.",
      "variables": [
        {
          "name": "Prix du Logement",
          "desc": "Prix d'achat convenu du bien immobilier résidentiel"
        },
        {
          "name": "Apport Personnel",
          "desc": "Fonds propres versés au moment de la signature"
        },
        {
          "name": "C&I (Capital & Intérêts)",
          "desc": "Service de la dette mensuel de base couvrant le capital et les intérêts"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le prix d'achat du logement souhaité.",
      "Indiquez votre apport personnel (en montant ou en pourcentage).",
      "Spécifiez le taux d'intérêt annuel du prêt immobilier et la durée du prêt (généralement 15 ou 30 ans).",
      "Incluez facultativement les taxes foncières annuelles et l'assurance habitation.",
      "Cliquez sur Calculer pour voir votre dépense mensuelle totale de logement et le total des intérêts pay��s."
    ],
    "example": {
      "problem": "Estimez la mensualité pour une maison de 400 000 $ avec 20 % d'apport (80 000 $) à un taux d'intérêt de 6,5 % sur un prêt fixe de 30 ans, avec 4 800 $/an de taxes et 1 200 $/an d'assurance.",
      "steps": [
        "Étape 1 : Capital Emprunté = 400 000 $ - 80 000 $ = 320 000 $.",
        "Étape 2 : C&I Mensuel sur 320 000 $ à 6,5 % sur 30 ans = 2 022,62 $.",
        "Étape 3 : Taxe Foncière Mensuelle = 4 800 $ ÷ 12 = 400,00 $.",
        "Étape 4 : Assurance Mensuelle = 1 200 $ ÷ 12 = 100,00 $.",
        "Étape 5 : Paiement Mensuel Total = 2 022,62 $ + 400,00 $ + 100,00 $ = 2 522,62 $."
      ],
      "result": "Le paiement mensuel total estimé pour le logement est de 2 522,62 $ (C&I : 2 022,62 $)."
    },
    "notes": [
      "Un apport inférieur à 20 % déclenche généralement une assurance prêt hypothécaire privée (PMI) jusqu'à ce que 20 % de fonds propres soient atteints.",
      "Un prêt immobilier sur 15 ans entraîne des mensualités plus élevées mais permet d'économiser des dizaines de milliers de dollars en intérêts sur la durée du prêt par rapport à un terme de 30 ans.",
      "Les taxes foncières varient en fonction des évaluations municipales et des prélèvements des districts scolaires locaux."
    ],
    "faqs": [
      {
        "question": "Que comprend une mensualité de prêt immobilier ?",
        "answer": "Une mensualité de prêt immobilier standard comprend le capital, les intérêts, les taxes foncières et l'assurance habitation (souvent désigné par l'acronyme CITI en français pour Capital, Intérêts, Taxes, Assurance)."
      },
      {
        "question": "Pourquoi viser un apport personnel de 20 % ?",
        "answer": "Verser au moins 20 % d'apport personnel élimine l'exigence d'une assurance prêt hypothécaire privée (PMI), réduit votre taux d'intérêt et diminue votre obligation de dette mensuelle."
      },
      {
        "question": "Dois-je choisir un prêt immobilier sur 15 ou 30 ans ?",
        "answer": "Une durée de 30 ans offre des mensualités plus basses et plus gérables. Une durée de 15 ans implique des mensualités plus élevées mais génère beaucoup moins d'intérêts totaux sur la durée du prêt."
      },
      {
        "question": "Comment les taxes foncières et l'assurance habitation affectent-elles ma mensualité ?",
        "answer": "Les taxes foncières et l'assurance habitation sont souvent incluses dans votre paiement hypothécaire mensuel via un compte séquestre. Elles augmentent le montant total de votre mensualité, mais simplifient la gestion de ces dépenses annuelles en les répartissant sur 12 mois."
      }
    ],
    "breadcrumbName": "Simulateur de Crédit Immobilier"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "fr",
    "name": "Calculateur d'intérêts composés",
    "category": "financial",
    "badge": "Croissance des investissements",
    "icon": "TrendingUp",
    "h1": "Calculateur d'intérêts composés",
    "seoTitle": "Calculateur d'intérêts composés – Calculez la croissance de vos investissements en ligne",
    "seoDescription": "Calculateur d'intérêts composés gratuit en ligne. Calculez la valeur future de vos investissements, les intérêts générés et l'accumulation de patrimoine avec des contributions mensuelles ou annuelles.",
    "primaryKeyword": "calculateur d'int��rêts composés",
    "secondaryKeywords": [
      "calculateur d'intérêts composés mensuels",
      "simulateur d'investissement",
      "calculateur de croissance composée",
      "calculateur de valeur future",
      "calculateur d'épargne"
    ],
    "heroSubtitle": "Calculez l'accumulation future de patrimoine, les gains d'intérêts composés et la croissance de vos investissements avec des contributions mensuelles ou annuelles régulières.",
    "about": [
      "Le Calculateur d'intérêts composés visualise la puissance de la croissance financière exponentielle au fil du temps. Souvent décrit comme la « huitième merveille du monde », l'intérêt composé fait référence au fait de gagner des intérêts non seulement sur votre dépôt initial (capital), mais aussi sur les intérêts accumulés des périodes précédentes.",
      "Ce calculateur vous permet de simuler des comptes de retraite (tels que les 401(k) et IRA), des fonds indiciels et des dépôts à terme avec des fréquences de capitalisation personnalisables (quotidienne, mensuelle, trimestrielle ou annuelle) et des contributions mensuelles récurrentes."
    ],
    "formula": {
      "title": "Formule des intérêts composés avec contributions régulières",
      "formulaText": "Future Value (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nTotal Interest = Future Value - (P + PMT × Total Periods)",
      "explanation": "P est le capital initial, r est le taux nominal annuel, n est la fréquence de capitalisation, t est le temps en années, et PMT est la contribution périodique.",
      "variables": [
        {
          "name": "P",
          "desc": "Solde du capital initial"
        },
        {
          "name": "r",
          "desc": "Taux d'intérêt annuel sous forme décimale"
        },
        {
          "name": "n",
          "desc": "Périodes de capitalisation par an (12 = mensuel, 1 = annuel)"
        },
        {
          "name": "PMT",
          "desc": "Contribution financière périodique récurrente"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez votre capital initial d'investissement.",
      "Spécifiez le pourcentage du taux d'intérêt annuel projeté.",
      "Saisissez l'horizon temporel de l'investissement en années.",
      "Spécifiez facultativement un montant de contribution mensuelle récurrente.",
      "Cliquez sur Calculer pour voir la valeur future du portefeuille, le total des intérêts générés et les trajectoires de croissance annuelle."
    ],
    "example": {
      "problem": "Investissez 10 000 $ avec un rendement annuel de 8 % capitalisé mensuellement pendant 20 ans, avec 200 $ ajoutés chaque mois.",
      "steps": [
        "Étape 1 : Le capital initial de 10 000 $ passe à : 10 000 $ × (1 + 0,08/12)²⁴⁰ = 49 268,03 $.",
        "Étape 2 : Les contributions mensuelles de 200 $ passent à : 200 $ × [((1 + 0,08/12)²⁴⁰ - 1) / (0,08/12)] = 117 804,09 $.",
        "Étape 3 : La valeur totale future du portefeuille = 49 268,03 $ + 117 804,09 $ = 167 072,12 $.",
        "Étape 4 : Total des fonds déposés = 10 000 $ + (200 $ × 240) = 58 000 $. Total des intérêts générés = 109 072,12 $."
      ],
      "result": "Le portefeuille atteint 167 072,12 $, dont 109 072,12 $ générés uniquement par les intérêts composés."
    },
    "notes": [
      "Le temps est le facteur le plus important dans la capitalisation : doubler la durée de l'investissement multiplie souvent par plus de trois les rendements.",
      "Historiquement, les fonds indiciels boursiers larges (comme le S&P 500) ont affiché des rendements nominaux annuels moyens d'environ 10 % avant inflation.",
      "La croissance réelle du patrimoine devrait tenir compte de l'inflation à long terme (environ 2-3 % par an)."
    ],
    "faqs": [
      {
        "question": "Qu'est-ce que l'intérêt composé ?",
        "answer": "L'intérêt composé est l'intérêt calculé sur le capital initial et aussi sur les intérêts accumulés des périodes précédentes, créant une croissance exponentielle par capitalisation."
      },
      {
        "question": "À quelle fréquence les intérêts sont-ils composés sur les comptes d'épargne ?",
        "answer": "La plupart des comptes d'épargne à rendement élevé modernes composent les intérêts quotidiennement et les créditent à votre solde à la fin de chaque mois."
      },
      {
        "question": "Qu'est-ce que la Règle de 72 ?",
        "answer": "La Règle de 72 estime le nombre d'années qu'il faudra pour doubler votre argent : divisez 72 par votre taux d'intérêt annuel (par exemple, à 8 %, l'argent double en environ 9 ans)."
      },
      {
        "question": "Pourquoi utiliser un calculateur d'intérêts composés ?",
        "answer": "Un calculateur d'intérêts composés vous aide à visualiser l'impact de la capitalisation sur vos investissements au fil du temps. Il permet de planifier votre épargne, d'estimer la valeur future de vos placements et de comprendre comment les contributions régulières et la fréquence de capitalisation influencent votre patrimoine."
      }
    ],
    "breadcrumbName": "Calculateur d'intérêts composés"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "fr",
    "name": "Simulateur d'Intérêt Simple",
    "category": "financial",
    "badge": "Intérêt Linéaire",
    "icon": "PiggyBank",
    "h1": "Simulateur d'Intérêt Simple",
    "seoTitle": "Simulateur d'Intérêt Simple – Calculez l'Intérêt Simple et la Valeur à l'Échéance",
    "seoDescription": "Calculateur d'intérêt simple gratuit en ligne. Calculez l'intérêt simple et le montant total à l'échéance en utilisant la formule classique I = P × R × T pour les prêts et les billets.",
    "primaryKeyword": "simulateur d'intérêt simple",
    "secondaryKeywords": [
      "formule intérêt simple",
      "calculer intérêt simple",
      "prêt à intérêt simple",
      "calculateur valeur à l'échéance",
      "I = PRT"
    ],
    "heroSubtitle": "Calculez les gains d'intérêt simple et les valeurs totales à l'échéance en utilisant la formule fondamentale I = P × R × T.",
    "about": [
      "Le simulateur d'intérêt simple calcule l'intérêt linéaire sur les billets de dette, les prêts à court terme, les certificats de dépôt et les problèmes financiers académiques. Contrairement à l'intérêt composé, l'intérêt simple ne génère pas d'intérêt sur l'intérêt – le coût est calculé strictement sur le capital initial.",
      "Ce calcul est couramment utilisé pour les prêts entre particuliers à court terme, les transactions de prêteurs sur gages, les structures de financement automobile à tempérament et les plans de paiement échelonné pour l'électronique grand public."
    ],
    "formula": {
      "title": "Formule de l'Intérêt Simple",
      "formulaText": "Intérêt (I) = (Capital × Taux × Temps) / 100\nMontant total à l'échéance (A) = Capital + Intérêt",
      "explanation": "Multipliez le capital initial par le taux d'intérêt annuel et la durée en années, puis divisez par 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Capital : somme initiale investie ou empruntée"
        },
        {
          "name": "R",
          "desc": "Taux d'intérêt annuel en pourcentage"
        },
        {
          "name": "T",
          "desc": "Durée en années"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le montant du capital initial.",
      "Saisissez le taux d'intérêt annuel en pourcentage.",
      "Saisissez la durée ou la période du prêt en années.",
      "Cliquez sur Calculer pour voir l'intérêt simple généré et le montant total de remboursement ou à l'échéance."
    ],
    "example": {
      "problem": "Calculez l'intérêt simple sur un billet personnel de 5 000 $ à un taux d'intérêt annuel de 5,5 % sur 3 ans.",
      "steps": [
        "Étape 1 : Identifiez les variables : P = 5 000, R = 5,5, T = 3.",
        "Étape 2 : Calculez l'intérêt : I = (5 000 × 5,5 × 3) ÷ 100 = 82 500 ÷ 100 = 825,00 $.",
        "Étape 3 : Montant total : 5 000 $ + 825 $ = 5 825,00 $."
      ],
      "result": "L'intérêt simple généré est de 825,00 $, ce qui donne un montant total à l'échéance de 5 825,00 $."
    },
    "notes": [
      "Si la durée est donnée en mois, divisez par 12 (par exemple, 6 mois = 0,5 ans). Si elle est donnée en jours, divisez par 365.",
      "L'intérêt simple génère moins d'argent total que l'intérêt composé sur des durées identiques.",
      "Les formules d'intérêt simple sont la référence pour les effets de commerce et les bons du Trésor."
    ],
    "faqs": [
      {
        "question": "Quelle est la formule de l'intérêt simple ?",
        "answer": "La formule est I = P × R × T / 100, où I représente l'intérêt, P le capital, R le taux d'intérêt annuel et T la durée en années."
      },
      {
        "question": "En quoi l'intérêt simple diffère-t-il de l'intérêt composé ?",
        "answer": "L'intérêt simple est calculé exclusivement sur le solde du capital initial. L'intérêt composé est calculé à la fois sur le capital et sur les intérêts précédemment accumulés."
      },
      {
        "question": "Quand l'intérêt simple est-il utilisé ?",
        "answer": "L'intérêt simple est généralement utilisé pour les prêts personnels à court terme, le financement automobile, l'accumulation d'intérêts sur les prêts étudiants pendant les périodes de grâce et les effets de commerce."
      },
      {
        "question": "Pourquoi est-il important de comprendre l'intérêt simple ?",
        "answer": "Comprendre l'intérêt simple est crucial car il s'agit d'un concept financier fondamental qui s'applique à de nombreux produits financiers, notamment les prêts à court terme et certains investissements. Il aide à évaluer le coût réel d'un emprunt ou le rendement d'un placement sans la complexité de la capitalisation."
      }
    ],
    "breadcrumbName": "Simulateur d'Intérêt Simple"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "fr",
    "name": "Calculateur de TPS",
    "category": "financial",
    "badge": "Taxe sur les Biens et Services",
    "icon": "Receipt",
    "h1": "Calculateur de TPS",
    "seoTitle": "Calculateur de TPS – Calculez les montants avec et sans TPS/TVA",
    "seoDescription": "Calculateur de TPS en ligne gratuit. Calculez les prix avec et sans TPS/TVA, la répartition de la taxe (CGST/SGST) et les montants nets pour les taux standards (5%, 12%, 18%, 28%).",
    "primaryKeyword": "calculateur de TPS",
    "secondaryKeywords": [
      "calculateur de TPS Canada",
      "calculateur de TVA",
      "calcul de TPS",
      "calculer la TPS",
      "calculateur de TPS incluse",
      "calculateur de TPS exclusive",
      "calculateur de TPS inversée"
    ],
    "heroSubtitle": "Calculez la Taxe sur les Biens et Services (TPS) pour les transactions inclusives et exclusives, séparez la CGST et la SGST, et déterminez les prix nets de facture.",
    "about": [
      "Le Calculateur de Taxe sur les Biens et Services (TPS) automatise la facturation fiscale pour les propriétaires d'entreprise, les entrepreneurs indépendants, les comptables et les consommateurs. La TPS est une taxe sur la valeur ajoutée complète, basée sur la destination, appliquée à la fabrication, la vente et la consommation de biens et services.",
      "Cet outil prend en charge deux modes commerciaux standards : TPS Exclusive (ajout de la taxe à un prix de base) et TPS Inclusive (calcul inverse du prix de base avant impôt et de la portion exacte de la taxe à partir d'un prix de vente brut affiché). Sélectionnez parmi les tranches de TPS standards (telles que 5%, 12%, 18%, 28%) ou entrez des taux personnalisés."
    ],
    "formula": {
      "title": "Formules de calcul de TPS incluse et exclusive",
      "formulaText": "TPS Exclusive (Ajouter la TPS) :\nMontant de la TPS = Prix de base × (Taux de TPS / 100)\nPrix final = Prix de base + Montant de la TPS\n\nTPS Inclusive (Retirer la TPS) :\nPrix de base = Montant brut / (1 + Taux de TPS / 100)\nMontant de la TPS = Montant brut - Prix de base",
      "explanation": "Pour ajouter la TPS, multipliez le montant de base par le taux. Pour extraire la TPS d'un total, divisez la somme brute par 1 plus le taux décimal.",
      "variables": [
        {
          "name": "Prix de base",
          "desc": "Prix net avant impôt du produit ou service"
        },
        {
          "name": "Taux de TPS",
          "desc": "Pourcentage de taxe légal applicable"
        },
        {
          "name": "CGST / SGST",
          "desc": "Composantes de la TPS centrale et étatique (chacune égale à 50% de la TPS totale en Inde)"
        }
      ]
    },
    "howToCalculate": [
      "Entrez le montant de la transaction.",
      "Sélectionnez si le prix est TPS Exclusive (ajouter la taxe) ou TPS Inclusive (retirer la taxe).",
      "Sélectionnez un taux de taxe standard (par exemple, 5%, 12%, 18%, 28%) ou entrez un taux personnalisé.",
      "Cliquez sur Calculer pour voir le prix de base avant impôt, la portion de taxe TPS, la répartition CGST/SGST et le prix final de la facture."
    ],
    "example": {
      "problem": "Calculez le coût avant impôt et le montant de la taxe d'un article vendu pour ₹1,180 avec un taux de TPS inclus de 18%.",
      "steps": [
        "Étape 1 : Prix de base = ₹1,180 ÷ (1 + 0.18) = ₹1,180 ÷ 1.18 = ₹1,000.00.",
        "Étape 2 : TPS totale = ₹1,180 - ₹1,000 = ₹180.00.",
        "Étape 3 : CGST (9%) = ₹90.00, et SGST (9%) = ₹90.00."
      ],
      "result": "Le prix de base net est de ₹1,000.00 et la taxe TPS facturée est de ₹180.00."
    },
    "notes": [
      "Pour les transactions intra-étatiques en Inde, la TPS est divisée également entre la CGST (TPS centrale) et la SGST (TPS étatique).",
      "Pour les ventes inter-étatiques à travers les frontières des États, la taxe entière est désignée comme IGST (TPS intégrée).",
      "Les taux de TPS standards sélectionnables incluent 0%, 5%, 12%, 18% et 28%."
    ],
    "faqs": [
      {
        "question": "Comment calculer un prix TTC (Toutes Taxes Comprises) ?",
        "answer": "Divisez le prix total inclus par (1 + Taux de TPS / 100). Pour un taux de TPS de 18%, divisez le prix total par 1.18 pour déterminer le prix de base avant impôt."
      },
      {
        "question": "Quelle est la différence entre un prix TTC et un prix HT (Hors Taxes) ?",
        "answer": "Un prix TPS Exclusive (ou HT) signifie que la taxe n'est pas encore ajoutée au prix. Un prix TPS Inclusive (ou TTC) signifie que le prix affiché intègre déjà la taxe."
      },
      {
        "question": "Que signifient CGST, SGST et IGST ?",
        "answer": "En Inde, la CGST est destinée au gouvernement central, la SGST est destinée au gouvernement de l'État pour les ventes locales, et l'IGST s'applique aux ventes entre différents États."
      },
      {
        "question": "Ce calculateur est-il applicable à la TVA en France ou en Belgique ?",
        "answer": "Oui, bien que les termes CGST, SGST et IGST soient spécifiques au système fiscal indien, les principes de calcul de la Taxe sur les Biens et Services (TPS) ou de la Taxe sur la Valeur Ajoutée (TVA) sont universels. Vous pouvez utiliser ce calculateur en entrant le taux de TVA applicable dans votre pays (par exemple, 20% en France) pour calculer les montants HT et TTC."
      }
    ],
    "breadcrumbName": "Calculateur de TPS"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "fr",
    "name": "Simulateur d'Impôt",
    "category": "financial",
    "badge": "Revenus & Déductions",
    "icon": "Scale",
    "h1": "Simulateur d'Impôt",
    "seoTitle": "Simulateur d'Impôt – Estimez l'Impôt sur le Revenu & le Salaire Net",
    "seoDescription": "Calculateur d'impôt sur le revenu gratuit en ligne. Estimez votre revenu imposable, les barèmes d'imposition, le taux d'imposition effectif et le salaire net mensuel.",
    "primaryKeyword": "simulateur d'impôt",
    "secondaryKeywords": [
      "calculateur d'impôt sur le revenu",
      "simulateur d'estimation d'impôt",
      "calculer l'impôt sur le revenu",
      "calculateur de salaire net",
      "calculateur de taux d'imposition effectif"
    ],
    "heroSubtitle": "Estimez votre revenu imposable, votre obligation fiscale, votre taux d'imposition effectif et votre salaire net mensuel.",
    "about": [
      "Le Simulateur d'Impôt sur le Revenu offre un estimateur générique de taxation progressive pour aider les salariés et les professionnels indépendants à projeter leur obligation fiscale annuelle et leurs revenus nets. Les systèmes fiscaux progressifs appliquent des pourcentages d'impôt plus élevés uniquement aux portions de revenu dépassant des seuils de tranche spécifiés.",
      "Saisissez votre revenu annuel brut et vos déductions autorisées (telles que les déductions standard, les cotisations de retraite ou les comptes de santé) pour visualiser les obligations fiscales estimées, les taux d'imposition marginaux vs effectifs, et le salaire net mensuel."
    ],
    "formula": {
      "title": "Cadre de l'Impôt sur le Revenu Progressif",
      "formulaText": "Revenu Imposable = Revenu Annuel Brut - Déductions\nImpôt = ∑ (Revenu Imposable dans la Tranche × Taux de la Tranche)\nTaux d'Imposition Effectif = (Impôt Total / Revenu Brut) × 100\nSalaire Net = Revenu Brut - Impôt Total",
      "explanation": "Les déductions réduisent votre base imposable. Les tranches d'imposition s'appliquent de manière incrémentielle – le revenu n'est pas imposé à un taux maximal unique et forfaitaire.",
      "variables": [
        {
          "name": "Revenu Brut",
          "desc": "Total des gains avant impôts provenant de l'emploi ou d'une activité commerciale"
        },
        {
          "name": "Déductions",
          "desc": "Déductions standard autorisées ou exemptions avant impôts"
        },
        {
          "name": "Taux Effectif",
          "desc": "Le pourcentage moyen réel du revenu payé en impôts"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez votre Revenu Annuel Brut total.",
      "Saisissez vos Déductions annuelles estimées (telles que la déduction standard ou l'épargne-retraite).",
      "Cliquez sur Calculer pour voir votre revenu imposable estimé, votre obligation fiscale, votre taux d'imposition effectif et votre salaire net mensuel."
    ],
    "example": {
      "problem": "Estimez l'impôt pour un individu gagnant 85 000 $ avec une déduction standard de 14 600 $.",
      "steps": [
        "Étape 1 : Revenu Imposable = 85 000 $ - 14 600 $ = 70 400 $.",
        "Étape 2 : 10 % sur les premiers 11 600 $ = 1 160,00 $.",
        "Étape 3 : 12 % sur (47 150 $ - 11 600 $ = 35 550 $) = 4 266,00 $.",
        "Étape 4 : 22 % sur le reste (70 400 $ - 47 150 $ = 23 250 $) = 5 115,00 $.",
        "Étape 5 : Impôt total estimé = 1 160 $ + 4 266 $ + 5 115 $ = 10 541,00 $.",
        "Étape 6 : Taux d'imposition effectif = (10 541 $ ÷ 85 000 $) × 100 = 12,40 %."
      ],
      "result": "L'impôt sur le revenu estimé est de 10 541,00 $ avec un taux effectif de 12,40 % et un salaire net de 74 459,00 $."
    },
    "notes": [
      "Cet outil fournit des estimations informatives génériques et ne remplace pas les conseils officiels d'un expert-comptable certifié ou d'un professionnel de la fiscalité.",
      "Les impôts d'État, provinciaux, municipaux et les cotisations de sécurité sociale/FICA sont calculés séparément.",
      "Le taux d'imposition marginal fait référence au taux payé sur votre dernier dollar gagné ; le taux d'imposition effectif est votre charge fiscale moyenne réelle."
    ],
    "faqs": [
      {
        "question": "Quelle est la différence entre les taux d'imposition marginal et effectif ?",
        "answer": "Votre taux d'imposition marginal est la tranche d'imposition la plus élevée appliquée à votre dernier dollar de revenu. Votre taux d'imposition effectif est le pourcentage global réel de votre revenu total payé en impôts."
      },
      {
        "question": "Comment les déductions réduisent-elles ma facture fiscale ?",
        "answer": "Les déductions réduisent votre revenu imposable. Par exemple, une déduction de 10 000 $ pour une personne dans une tranche d'imposition de 22 % réduit l'impôt réel dû de 2 200 $."
      },
      {
        "question": "Ce simulateur inclut-il les impôts sur le revenu des États ?",
        "answer": "Ce modèle calcule les barèmes progressifs standard. Les impôts d'État et locaux varient selon la juridiction et doivent être pris en compte en supplément."
      },
      {
        "question": "Qui peut utiliser ce simulateur d'impôt ?",
        "answer": "Ce simulateur est conçu pour les particuliers afin d'estimer leur obligation fiscale sur le revenu basée sur un système d'imposition progressif. Il est utile pour les employés et les travailleurs indépendants pour avoir une idée générale de leur charge fiscale et de leur revenu net."
      }
    ],
    "breadcrumbName": "Simulateur d'Impôt"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "fr",
    "name": "Calculateur de Remise",
    "category": "financial",
    "badge": "Promotions & Économies",
    "icon": "Tag",
    "h1": "Calculateur de Remise",
    "seoTitle": "Calculateur de Remise – Calculez le Prix Soldé et le Pourcentage de Réduction",
    "seoDescription": "Calculateur de remise en ligne gratuit. Calculez instantanément les prix soldés finaux, l'argent économisé et les pourcentages de réduction, avec des calculs de taxe de vente optionnels.",
    "primaryKeyword": "calculateur de remise",
    "secondaryKeywords": [
      "calculateur de pourcentage de remise",
      "calculateur de prix soldé",
      "calculateur de pourcentage de réduction",
      "combien j'économise",
      "calculateur de remise inversé"
    ],
    "heroSubtitle": "Calculez les prix soldés, le montant total économisé et les coûts finaux avec la taxe de vente pour vos achats et promotions commerciales.",
    "about": [
      "Le Calculateur de Remise aide les acheteurs et les commerçants à calculer rapidement les réductions de prix lors d'événements promotionnels (tels que le Black Friday, le Cyber Monday, les liquidations saisonnières et les coupons de réduction).",
      "Saisissez le prix original et le pourcentage de réduction annoncé pour voir immédiatement combien d'argent vous économisez, le prix réduit et le coût final à la caisse après application de la taxe de vente locale."
    ],
    "formula": {
      "title": "Formules de Remise et de Prix Final Soldé",
      "formulaText": "Montant Économisé = Prix Original × (Pourcentage de Remise / 100)\nPrix Réduit = Prix Original - Montant Économisé\nPrix Final avec Taxe = Prix Réduit + (Prix Réduit × Pourcentage de Taxe / 100)",
      "explanation": "Multipliez le prix affiché par le pourcentage de remise pour trouver les économies, puis soustrayez ce montant du prix original.",
      "variables": [
        {
          "name": "Prix Original",
          "desc": "Prix affiché par le fabricant ou le détaillant avant la vente"
        },
        {
          "name": "Pourcentage de Remise",
          "desc": "Pourcentage de réduction de prix annoncé"
        },
        {
          "name": "Pourcentage de Taxe de Vente",
          "desc": "Taux de taxe de vente étatique ou locale facultatif"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le Prix Original affiché.",
      "Saisissez le Pourcentage de Remise (par exemple, 20% ou 35% de réduction).",
      "Saisissez facultativement votre pourcentage de Taxe de Vente locale.",
      "Cliquez sur Calculer pour voir vos économies exactes en dollars et le prix final."
    ],
    "example": {
      "problem": "Une veste d'hiver affichée à 180 $ est en solde avec 30% de réduction, et une taxe de vente locale de 8%.",
      "steps": [
        "Étape 1 : Économies = 180 $ × 0.30 = 54.00 $.",
        "Étape 2 : Prix réduit = 180 $ - 54.00 $ = 126.00 $.",
        "Étape 3 : Taxe de vente = 126.00 $ × 0.08 = 10.08 $.",
        "Étape 4 : Prix final à la caisse = 126.00 $ + 10.08 $ = 136.08 $."
      ],
      "result": "Vous économisez 54.00 $. La veste coûte 126.00 $ avant taxes et 136.08 $ après taxes."
    },
    "notes": [
      "Une remise de 50% signifie que vous payez la moitié du prix original.",
      "L'empilement de remises (par exemple, 20% de réduction plus 10% supplémentaires) ne correspond pas à 30% de réduction au total — la deuxième remise s'applique au sous-total déjà réduit.",
      "La taxe de vente est calculée sur le prix final réduit, et non sur le prix original affiché."
    ],
    "faqs": [
      {
        "question": "Comment calculer une remise de 20% sur un article ?",
        "answer": "Multipliez le prix par 0.20 pour trouver ce que vous économisez, ou multipliez le prix par 0.80 pour trouver directement le prix de vente final."
      },
      {
        "question": "Comment fonctionne une offre « achetez-en un, le deuxième à 50% » en termes de pourcentage ?",
        "answer": "Si deux articles de prix égal sont achetés, une remise « achetez-en un, le deuxième à 50% » équivaut à une réduction globale de 25% sur les deux articles."
      },
      {
        "question": "Comment calculer le prix original à partir d'un prix soldé ?",
        "answer": "Divisez le prix soldé par (1 - Pourcentage de Remise / 100). Par exemple, si un article coûte 80 $ après une remise de 20% : 80 $ / 0.80 = 100 $ prix original."
      },
      {
        "question": "Quelle est la différence entre une remise et un rabais ?",
        "answer": "Une remise est une réduction directe du prix au moment de l'achat, tandis qu'un rabais est un remboursement partiel offert par le fabricant après l'achat, nécessitant généralement l'envoi d'un formulaire."
      }
    ],
    "breadcrumbName": "Calculateur de Remise"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "fr",
    "name": "Calculateur de Marge Bénéficiaire",
    "category": "financial",
    "badge": "Marge vs Taux de Marque",
    "icon": "BarChart3",
    "h1": "Calculateur de Marge Bénéficiaire",
    "seoTitle": "Calculateur de Marge Bénéficiaire – Calculez la Marge Brute et le Taux de Marque en Ligne",
    "seoDescription": "Calculateur de marge bénéficiaire gratuit en ligne. Calculez le bénéfice brut, le pourcentage de marge bénéficiaire et le pourcentage de taux de marque à partir du coût d'un article et de son prix de vente.",
    "primaryKeyword": "calculateur de marge bénéficiaire",
    "secondaryKeywords": [
      "calculateur de profit",
      "calculateur de marge",
      "calculateur de taux de marque",
      "marge bénéficiaire brute",
      "marge vs taux de marque"
    ],
    "heroSubtitle": "Calculez le bénéfice brut, le pourcentage de marge bénéficiaire et le pourcentage de taux de marque pour fixer des prix rentables pour vos produits.",
    "about": [
      "Le Calculateur de Marge Bénéficiaire aide les entrepreneurs, les détaillants, les dropshippers et les propriétaires de petites entreprises à déterminer avec précision la rentabilité et à distinguer la Marge du Taux de Marque. Confondre ces deux métriques est l'une des erreurs de tarification les plus courantes dans le commerce.",
      "La Marge Bénéficiaire Brute indique quel pourcentage du revenu total est conservé après avoir pris en compte le Coût des Marchandises Vendues (CMV). Le Taux de Marque reflète l'augmentation en pourcentage appliquée sur le coût de base pour établir le prix de vente au détail."
    ],
    "formula": {
      "title": "Formules de la Marge Brute et du Taux de Marque",
      "formulaText": "Gross Profit = Revenue - Cost\nProfit Margin (%) = (Gross Profit / Revenue) × 100\nMarkup (%) = (Gross Profit / Cost) × 100",
      "explanation": "La marge est calculée par rapport au revenu (prix de vente), tandis que le taux de marque est calculé par rapport au coût du produit.",
      "variables": [
        {
          "name": "Coût",
          "desc": "Coût des Marchandises Vendues (CMV) pour acquérir ou produire l'unité"
        },
        {
          "name": "Revenu",
          "desc": "Prix de vente facturé au consommateur"
        },
        {
          "name": "Bénéfice Brut",
          "desc": "Revenu net restant après déduction du coût de production direct"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le Coût d'acquisition ou de production du produit (par exemple, $40).",
      "Saisissez le Revenu ou le Prix de Vente cible (par exemple, $100).",
      "Cliquez sur Calculer pour voir le bénéfice brut en dollars, le pourcentage de marge bénéficiaire et le pourcentage de taux de marque requis."
    ],
    "example": {
      "problem": "Une entreprise achète un article pour $50 et le vend pour $80. Quels sont le bénéfice brut, la marge bénéficiaire et le taux de marque ?",
      "steps": [
        "Étape 1 : Bénéfice Brut = $80 (Revenu) - $50 (Coût) = $30.00.",
        "Étape 2 : Marge Bénéficiaire = ($30 ÷ $80) × 100 = 37.5%.",
        "Étape 3 : Taux de Marque = ($30 ÷ $50) × 100 = 60.0%."
      ],
      "result": "Le bénéfice brut est de $30.00. La marge bénéficiaire est de 37.5%, et le taux de marque est de 60.0%."
    },
    "notes": [
      "La marge ne peut jamais dépasser 100%, tandis que le taux de marque peut être de 200%, 500% ou plus.",
      "Un taux de marque de 50% correspond à une marge de 33.3%. Un taux de marque de 100% correspond à une marge de 50%.",
      "La marge bénéficiaire nette déduit les frais généraux, le marketing et les taxes en plus des coûts de production directs."
    ],
    "faqs": [
      {
        "question": "Quelle est la différence clé entre la marge et le taux de marque ?",
        "answer": "La marge est le bénéfice divisé par le prix de vente (revenu). Le taux de marque est le bénéfice divisé par le coût. La marge mesure ce que vous conservez des ventes ; le taux de marque mesure ce que vous ajoutez aux coûts."
      },
      {
        "question": "Pourquoi le taux de marque est-il toujours plus élevé que la marge pour le même article ?",
        "answer": "Parce que le coût est toujours inférieur au prix de vente pour les biens rentables. Diviser le même bénéfice en dollars par le coût plus petit donne un pourcentage plus élevé que de le diviser par le revenu."
      },
      {
        "question": "Quelle est une bonne marge bénéficiaire pour les entreprises de vente au détail ?",
        "answer": "Une marge bénéficiaire brute saine se situe généralement entre 40% et 60% pour le commerce de détail et l'e-commerce, tandis que les marges bénéficiaires nettes varient généralement entre 10% et 20%."
      }
    ],
    "breadcrumbName": "Calculateur de Marge Bénéficiaire"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "fr",
    "name": "Simulateur de Salaire",
    "category": "financial",
    "badge": "Horaire, Mensuel & Annuel",
    "icon": "Wallet",
    "h1": "Simulateur de Salaire",
    "seoTitle": "Simulateur de Salaire – Convertir Rémunération Horaire, Hebdomadaire, Mensuelle & Annuelle",
    "seoDescription": "Calculateur de salaire en ligne gratuit. Convertissez votre salaire horaire, hebdomadaire, bimensuel, revenu mensuel et rémunération annuelle avec des heures de travail personnalisées.",
    "primaryKeyword": "simulateur de salaire",
    "secondaryKeywords": [
      "calculateur salaire annuel",
      "calculateur salaire mensuel",
      "calculateur salaire horaire",
      "salaire horaire en annuel",
      "calculateur de rémunération"
    ],
    "heroSubtitle": "Convertissez votre rémunération entre salaire annuel, paie mensuelle, chèques bimensuels et taux de salaire horaire.",
    "about": [
      "Le Simulateur de Salaire convertit la rémunération de l'emploi selon toutes les fréquences de paie standard : salaire annuel, revenus mensuels, paies bimensuelles, salaires hebdomadaires, taux journaliers et paie horaire.",
      "Que vous négociiez une offre d'emploi, convertissiez un taux de contractuel de 30 $/heure en équivalent annuel, ou budgétisiez vos dépenses mensuelles, ce calculateur fournit des conversions de paie instantanées et standardisées basées sur vos heures de travail hebdomadaires."
    ],
    "formula": {
      "title": "Normes de Conversion de Salaire Standard",
      "formulaText": "Salaire Annuel = Taux Horaire × Heures/Semaine × Semaines/An\nSalaire Mensuel = Salaire Annuel / 12\nPaie Bimensuelle = Salaire Annuel / 26\nPaie Hebdomadaire = Salaire Annuel / 52\nTaux Horaire = Salaire Annuel / (Heures/Semaine × Semaines/An)",
      "explanation": "Basé sur une semaine de travail standard de 40 heures et 52 semaines de travail par an (2 080 heures de travail annuelles).",
      "variables": [
        {
          "name": "Heures Standard",
          "desc": "40 heures par semaine"
        },
        {
          "name": "Semaines Standard",
          "desc": "52 semaines par année civile (2 080 heures de travail au total)"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le montant de votre rémunération.",
      "Sélectionnez la fréquence de paie : Annuelle, Mensuelle, Bimensuelle, Hebdomadaire, Journalière ou Horaire.",
      "Ajustez les heures de travail par semaine (par défaut 40) ou les semaines de travail par an (par défaut 52).",
      "Cliquez sur Calculer pour voir un tableau de conversion complet pour toutes les périodes de paie."
    ],
    "example": {
      "problem": "Convertissez un salaire annuel de 75,000 $ en paie mensuelle, bimensuelle, hebdomadaire et horaire (40 heures/semaine, 52 semaines).",
      "steps": [
        "Étape 1 : Paie Mensuelle = 75,000 $ ÷ 12 = 6,250.00 $.",
        "Étape 2 : Paie Bimensuelle (26 périodes de paie) = 75,000 $ ÷ 26 = 2,884.62 $.",
        "Étape 3 : Paie Hebdomadaire = 75,000 $ ÷ 52 = 1,442.31 $.",
        "Étape 4 : Taux Horaire = 75,000 $ ÷ 2,080 heures = 36.06 $/heure."
      ],
      "result": "Un salaire de 75,000 $ équivaut à 6,250 $/mois, 2,884.62 $ bimensuellement et 36.06 $ par heure."
    },
    "notes": [
      "Les calculs reflètent le revenu brut avant impôts, avant les retenues fédérales, étatiques et les avantages sociaux obligatoires.",
      "La paie bimensuelle a lieu 26 fois par an (ce qui signifie que deux mois par an comportent trois chèques de paie). La paie semi-mensuelle a lieu 24 fois par an.",
      "Pour les contractuels indépendants, tenez compte des impôts sur le travail indépendant et des semaines de vacances non rémunérées."
    ],
    "faqs": [
      {
        "question": "Comment convertir un salaire horaire en salaire annuel ?",
        "answer": "Multipliez votre taux horaire par le nombre d'heures travaillées par semaine, puis multipliez par 52 semaines. Pour un horaire à temps plein de 40 heures, multipliez le taux horaire par 2,080."
      },
      {
        "question": "Quelle est la différence entre une paie bimensuelle et une paie semi-mensuelle ?",
        "answer": "La paie bimensuelle a lieu toutes les deux semaines (26 chèques de paie/an). La paie semi-mensuelle a lieu deux fois par mois à des dates précises comme le 1er et le 15 (24 chèques de paie/an)."
      },
      {
        "question": "Combien d'heures de travail y a-t-il dans une année de travail standard ?",
        "answer": "Un employé à temps plein standard travaillant 40 heures par semaine pendant 52 semaines travaille un total de 2,080 heures par an."
      },
      {
        "question": "Pourquoi utiliser un simulateur de salaire ?",
        "answer": "Un simulateur de salaire vous aide à comprendre rapidement vos revenus selon différentes fréquences de paie (horaire, hebdomadaire, mensuelle, annuelle). Il est utile pour établir un budget, comparer des offres d'emploi ou convertir des taux de contractuels en équivalent annuel."
      }
    ],
    "breadcrumbName": "Simulateur de Salaire"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "fr",
    "name": "Convertisseur de Devises",
    "category": "financial",
    "badge": "Taux de Change & Forex",
    "icon": "Coins",
    "h1": "Convertisseur de Devises",
    "seoTitle": "Convertisseur de Devises – Taux de Change en Direct & Conversion Monétaire",
    "seoDescription": "Convertisseur de devises en ligne gratuit. Convertissez entre USD, EUR, GBP, INR, CAD, AUD, JPY et les principales devises mondiales avec les taux de change interbancaires.",
    "primaryKeyword": "convertisseur de devises",
    "secondaryKeywords": [
      "calculateur de monnaie",
      "calculateur de taux de change",
      "calculateur USD vers INR",
      "calculateur EUR vers USD",
      "calculateur de change",
      "taux de change en direct"
    ],
    "heroSubtitle": "Convertissez des montants entre les devises mondiales avec des taux de change interbancaires de référence transparents.",
    "about": [
      "Le Convertisseur de Devises offre des conversions fiables entre les principales devises mondiales, y compris le Dollar Américain (USD), l'Euro (EUR), la Livre Sterling (GBP), la Roupie Indienne (INR), le Dollar Canadien (CAD), le Dollar Australien (AUD), le Yen Japonais (JPY) et le Franc Suisse (CHF).",
      "Que vous prépariez un budget de voyage à l'étranger, convertissiez des factures de freelance internationales ou compariez les prix du commerce électronique international, cet outil convertit les valeurs en utilisant les taux de référence interbancaires standard du marché moyen."
    ],
    "formula": {
      "title": "Conversion du Taux de Change",
      "formulaText": "Montant Cible = Montant de Base × Taux de Change Direct (De la Devise ⟶ À la Devise)\nTaux Inverse = 1 / Taux de Change Direct",
      "explanation": "Convertit la devise source en équivalent de base USD, puis l'adapte en fonction du multiplicateur du taux de change de la devise cible.",
      "variables": [
        {
          "name": "Montant de Base",
          "desc": "La quantité monétaire à convertir"
        },
        {
          "name": "Taux Direct",
          "desc": "Le prix d'une unité de la devise source en termes de devise cible"
        },
        {
          "name": "Taux Inverse",
          "desc": "Le prix réciproque de la devise cible en termes de devise source"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le Montant monétaire à convertir.",
      "Sélectionnez la Devise Source (par exemple, USD, EUR, GBP).",
      "Sélectionnez la Devise de Destination (par exemple, INR, CAD, AUD).",
      "Cliquez sur Calculer pour voir le montant converti, le taux de change de référence actuel et le taux de conversion inverse."
    ],
    "example": {
      "problem": "Convertissez 500 USD en Euros (EUR) avec un taux de change de référence illustratif de 1 USD = 0,8950 EUR.",
      "steps": [
        "Étape 1 : Montant de Base = 500 USD.",
        "Étape 2 : Multipliez par le taux de change : 500 × 0,8950 = 447,50 EUR.",
        "Étape 3 : Taux inverse = 1 ÷ 0,8950 = 1,1173 USD pour 1 EUR."
      ],
      "result": "500 USD se convertissent en 447,50 EUR avec un taux de change de référence illustratif de 0,8950."
    },
    "notes": [
      "Les taux de change reflètent les taux interbancaires du marché moyen ; les banques de détail et les cartes bancaires peuvent facturer des frais de transaction étrangers supplémentaires de 1,5 % à 3,5 %.",
      "Les taux de change fluctuent continuellement pendant les heures d'ouverture des marchés mondiaux du Forex.",
      "Les taux de référence sont mis à jour régulièrement à partir des flux de référence interbancaires."
    ],
    "faqs": [
      {
        "question": "Qu'est-ce que le taux de change du marché moyen ?",
        "answer": "Le taux du marché moyen est le point médian entre les taux d'achat et de vente mondiaux sur les marchés des changes (Forex). Il représente le taux le plus juste, sans majoration."
      },
      {
        "question": "Pourquoi les taux de change des banques de détail diffèrent-ils de ceux des convertisseurs en ligne ?",
        "answer": "Les banques commerciales et les bureaux de change des aéroports appliquent une marge ou des frais de commission pour réaliser un profit sur les transactions de conversion de devises."
      },
      {
        "question": "Puis-je calculer le taux de conversion inverse ?",
        "answer": "Oui. Le calculateur affiche le taux inverse réciproque (par exemple, 1 INR = 0,012 USD) à côté du résultat de la conversion principale."
      },
      {
        "question": "À quelle fréquence les taux de change sont-ils mis à jour ?",
        "answer": "Nos taux de référence sont mis à jour régulièrement, souvent en temps réel ou quasi-réel, à partir des flux de référence interbancaires pour fournir les données de marché les plus actuelles disponibles."
      }
    ],
    "breadcrumbName": "Convertisseur de Devises"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "fr",
    "name": "Calculateur de Pourcentage",
    "category": "math",
    "badge": "Outil Mathématique Rapide",
    "icon": "Percent",
    "h1": "Calculateur de Pourcentage",
    "seoTitle": "Calculateur de Pourcentage – Calculez Facilement les Pourcentages en Ligne",
    "seoDescription": "Calculateur de pourcentage gratuit en ligne. Calculez instantanément le pourcentage d'un nombre, la variation en pourcentage, l'augmentation, la diminution et les différences de pourcentage avec des formules.",
    "primaryKeyword": "calculateur de pourcentage",
    "secondaryKeywords": [
      "calculer un pourcentage",
      "calculateur de pourcent",
      "calculateur d'augmentation en pourcentage",
      "calculateur de diminution en pourcentage",
      "différence en pourcentage"
    ],
    "heroSubtitle": "Calculez les pourcentages de valeurs, l'augmentation et la diminution en pourcentage, ou déterminez quel pourcentage un nombre représente d'un autre avec une précision mathématique instantanée.",
    "about": [
      "Le Calculateur de Pourcentage est un outil en ligne polyvalent conçu pour les étudiants, les acheteurs, les comptables et les analystes qui ont besoin de calculs de pourcentage rapides et sans erreur. Les pourcentages représentent des fractions de 100 et constituent l'épine dorsale des tâches quantitatives quotidiennes – du calcul des remises sur les ventes et des marges commerciales à l'analyse des rendements des investissements financiers et des scores aux examens.",
      "Cet outil prend en charge quatre modes de calcul essentiels : trouver un pourcentage d'un total, calculer quel pourcentage un nombre représente d'un autre, calculer l'augmentation ou la diminution en pourcentage entre deux nombres, et déterminer la différence de pourcentage relative entre deux valeurs indépendantes."
    ],
    "formula": {
      "title": "Formules de Pourcentage Standard",
      "formulaText": "Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100",
      "explanation": "Pour calculer la fraction d'un tout que représente une quantité, divisez la partie par le total et multipliez par 100. Pour les variations en pourcentage, divisez l'augmentation ou la diminution absolue par la valeur de départ de référence.",
      "variables": [
        {
          "name": "Partie",
          "desc": "La portion ou la sous-valeur évaluée"
        },
        {
          "name": "Total",
          "desc": "La base ou la quantité de référence totale"
        },
        {
          "name": "Ancienne Valeur",
          "desc": "La quantité de base originale avant le changement"
        },
        {
          "name": "Nouvelle Valeur",
          "desc": "La quantité mise à jour après le changement"
        }
      ]
    },
    "howToCalculate": [
      "Sélectionnez le mode de calcul de pourcentage correspondant à votre question (par exemple, « Qu'est-ce que X% de Y » ou « Variation en pourcentage »).",
      "Saisissez vos valeurs numériques connues dans les champs de saisie fournis.",
      "Visualisez le résultat calculé en temps réel, la formule formatée et la décomposition fractionnaire ci-dessous.",
      "Utilisez le bouton Copier pour exporter rapidement votre résultat ou Réinitialiser pour effectuer un nouveau calcul."
    ],
    "example": {
      "problem": "Quel est 15% de 240 $, et quelle est l'augmentation en pourcentage de 200 $ à 250 $ ?",
      "steps": [
        "Étape 1 (Pourcentage d'une valeur) : (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Étape 2 (Augmentation en pourcentage) : Différence = 250 - 200 = 50.",
        "Étape 3 : (50 ÷ 200) × 100 = 0.25 × 100 = 25% d'augmentation."
      ],
      "result": "15% de 240 est 36. Une augmentation de 200 à 250 représente un gain de 25%."
    },
    "notes": [
      "La variation en pourcentage divise toujours par le nombre de départ original, et non par le nombre final.",
      "Une augmentation en pourcentage suivie d'une diminution en pourcentage équivalente ne ramène pas à la valeur originale (par exemple, +50% puis -50% donne 75% de la valeur de base).",
      "Pour convertir un décimal en pourcentage, multipliez par 100 (par exemple, 0.85 = 85%). Pour convertir un pourcentage en décimal, divisez par 100."
    ],
    "faqs": [
      {
        "question": "Comment calculer le pourcentage d'un nombre ?",
        "answer": "Pour calculer le pourcentage d'un nombre, convertissez le pourcentage en décimal en le divisant par 100, puis multipliez ce décimal par le nombre total. Par exemple, 20% de 150 est (20 / 100) × 150 = 30."
      },
      {
        "question": "Comment calculer l'augmentation en pourcentage entre deux nombres ?",
        "answer": "Soustraire la valeur originale de la nouvelle valeur pour trouver la différence. Ensuite, divisez cette différence par la valeur originale et multipliez par 100. Par exemple, de 50 à 75 : (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% d'augmentation."
      },
      {
        "question": "Quelle est la différence entre la variation en pourcentage et la différence en pourcentage ?",
        "answer": "La variation en pourcentage est utilisée lorsqu'il y a une « ancienne » et une « nouvelle » valeur au fil du temps, en divisant par la valeur initiale. La différence en pourcentage est utilisée lors de la comparaison de deux valeurs concurrentes où aucune n'est la référence, en divisant la différence absolue par leur moyenne."
      },
      {
        "question": "La variation en pourcentage peut-elle être négative ?",
        "answer": "Oui. Si la valeur finale est inférieure à la valeur initiale, la variation en pourcentage est négative, représentant une diminution en pourcentage."
      }
    ],
    "breadcrumbName": "Calculateur de Pourcentage"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "fr",
    "name": "Calculateur de Ratio",
    "category": "math",
    "badge": "Proportion et Simplification",
    "icon": "Divide",
    "h1": "Calculateur de Ratio",
    "seoTitle": "Calculateur de Ratio – Simplifiez et Résolvez des Ratios en Ligne",
    "seoDescription": "Calculateur de ratio en ligne gratuit. Simplifiez les ratios à leurs termes les plus bas, trouvez les termes manquants dans les proportions (A:B = C:D) et calculez instantanément les facteurs d'échelle.",
    "primaryKeyword": "calculateur de ratio",
    "secondaryKeywords": [
      "simplifier un ratio",
      "simplification de ratio",
      "calculateur de ratios équivalents",
      "résoudre une proportion",
      "calculateur de rapport d'aspect"
    ],
    "heroSubtitle": "Simplifiez les ratios à deux termes en entiers les plus simples, générez des fractions équivalentes et résolvez instantanément les variables de proportion manquantes.",
    "about": [
      "Le Calculateur de Ratio vous permet de simplifier les ratios à leurs termes entiers les plus bas, de convertir les ratios décimaux en proportions entières claires et de résoudre des équations de proportion équivalentes de la forme A : B = C : D.",
      "Les ratios expriment la taille relative de deux ou plusieurs quantités. Ils sont omniprésents dans l'ajustement des recettes, les rapports d'aspect en conception graphique (tels que 16:9 et 4:3), les métriques de bilan financier (ratio de liquidité générale, ratio d'endettement) et les mélanges de solutions en chimie."
    ],
    "formula": {
      "title": "Formules de Simplification de Ratio et de Proportion",
      "formulaText": "Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C",
      "explanation": "Pour simplifier un ratio, divisez les deux termes par leur Plus Grand Commun Diviseur (PGCD). Dans les proportions, la multiplication croisée permet de résoudre n'importe quelle variable manquante.",
      "variables": [
        {
          "name": "A & B",
          "desc": "Premier antécédent et conséquent du ratio"
        },
        {
          "name": "C & D",
          "desc": "Deuxième antécédent et conséquent de la proportion équivalente"
        },
        {
          "name": "GCD",
          "desc": "PGCD (Plus Grand Commun Diviseur) entre les nombres"
        }
      ]
    },
    "howToCalculate": [
      "Pour simplifier un ratio, entrez les nombres A et B et visualisez la proportion entière irréductible.",
      "Pour résoudre une proportion A:B = C:D, entrez trois valeurs connues et laissez le champ cible vide.",
      "Le calculateur effectue la multiplication croisée et réduit les termes instantanément."
    ],
    "example": {
      "problem": "Simplifiez le ratio 24 : 36, et résolvez pour X dans 4 : 5 = X : 25.",
      "steps": [
        "Étape 1 (Simplification) : Trouvez le PGCD(24, 36) = 12.",
        "Étape 2 : 24 ÷ 12 = 2, et 36 ÷ 12 = 3. Le ratio simplifié est 2 : 3.",
        "Étape 3 (Proportion) : 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 se réduit à 2:3. Dans 4:5 = X:25, X est égal à 20."
    },
    "notes": [
      "Les deux termes d'un ratio peuvent être multipliés ou divisés par le même nombre non nul sans en changer la valeur.",
      "Les ratios décimaux sont automatiquement multipliés par des puissances de 10 avant la réduction pour garantir des résultats entiers.",
      "Les ratios représentent des relations comparatives, et non des quantités absolues. Un ratio de 2:3 pourrait décrire 2 et 3 éléments ou 200 et 300 éléments."
    ],
    "faqs": [
      {
        "question": "Comment simplifier un ratio à ses termes les plus bas ?",
        "answer": "Trouvez le Plus Grand Commun Diviseur (PGCD) des deux nombres, puis divisez les deux nombres par ce PGCD. Par exemple, dans 15:25, le PGCD est 5, donc diviser les deux par 5 donne 3:5."
      },
      {
        "question": "Comment résoudre une proportion lorsqu'un nombre est inconnu ?",
        "answer": "Utilisez la multiplication croisée : si A/B = C/D, alors A × D = B × C. Multipliez les nombres en diagonale et divisez par le nombre restant opposé à l'inconnu."
      },
      {
        "question": "Les ratios peuvent-ils contenir des décimales ou des fractions ?",
        "answer": "Bien que les ratios puissent initialement être écrits avec des décimales (par exemple, 1.5 : 2.5), la convention standard est de les exprimer avec des entiers positifs en mettant à l'échelle les deux termes."
      },
      {
        "question": "Dans quels domaines les ratios sont-ils couramment utilisés ?",
        "answer": "Les ratios sont utilisés dans de nombreux domaines : en cuisine pour ajuster les recettes, en design graphique pour les rapports d'aspect (ex: 16:9), en finance pour analyser la santé d'une entreprise (ratios financiers), en chimie pour les mélanges de solutions, et en cartographie pour les échelles."
      }
    ],
    "breadcrumbName": "Calculateur de Ratio"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "fr",
    "name": "Calculatrice de Fractions",
    "category": "math",
    "badge": "Opérations sur les Fractions",
    "icon": "Binary",
    "h1": "Calculatrice de Fractions",
    "seoTitle": "Calculatrice de Fractions – Additionner, Soustraire, Multiplier et Diviser des Fractions",
    "seoDescription": "Calculatrice de fractions gratuite en ligne. Additionnez, soustrayez, multipliez et divisez facilement des fractions propres, impropres et des nombres mixtes avec réduction étape par étape à la forme la plus simple.",
    "primaryKeyword": "calculatrice de fractions",
    "secondaryKeywords": [
      "addition de fractions",
      "simplificateur de fractions",
      "soustraction de fractions",
      "multiplication de fractions",
      "division de fractions",
      "calculatrice de nombres mixtes"
    ],
    "heroSubtitle": "Additionnez, soustrayez, multipliez et divisez des fractions et des nombres mixtes avec simplification automatique, dénominateurs communs et conversion décimale.",
    "about": [
      "La Calculatrice de Fractions fournit des solutions complètes étape par étape pour l'addition, la soustraction, la multiplication et la division de fractions mathématiques. Elle gère les fractions propres (numérateur < dénominateur), les fractions impropres (numérateur > dénominateur) et les nombres mixtes.",
      "Que vous vérifiiez vos devoirs, adaptiez des recettes culinaires ou calculiez des mesures d'ingénierie, cet outil réduit les résultats à leur forme irréductible la plus simple et affiche l'équivalent décimal."
    ],
    "formula": {
      "title": "Règles d'Arithmétique des Fractions",
      "formulaText": "Addition : (a/b) + (c/d) = (ad + bc) / bd\nSoustraction : (a/b) - (c/d) = (ad - bc) / bd\nMultiplication : (a/b) × (c/d) = (ac) / (bd)\nDivision : (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "Pour l'addition et la soustraction, convertissez les fractions à un dénominateur commun avant de combiner les numérateurs. Pour la multiplication, multipliez les numérateurs entre eux et les dénominateurs entre eux. Pour la division, multipliez la première fraction par l'inverse de la deuxième fraction.",
      "variables": [
        {
          "name": "a et c",
          "desc": "Numérateurs (nombres du haut des fractions)"
        },
        {
          "name": "b et d",
          "desc": "Dénominateurs (nombres du bas, ne doivent pas être égaux à zéro)"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez le numérateur et le dénominateur de votre première fraction.",
      "Sélectionnez l'opération arithmétique : Addition (+), Soustraction (-), Multiplication (×) ou Division (÷).",
      "Saisissez le numérateur et le dénominateur de votre deuxième fraction.",
      "Cliquez sur Calculer pour voir la fraction simplifiée, le nombre mixte et la représentation décimale."
    ],
    "example": {
      "problem": "Calculer 3/4 + 2/3.",
      "steps": [
        "Étape 1 : Le dénominateur commun est 4 × 3 = 12.",
        "Étape 2 : Convertissez les numérateurs : (3 × 3) / 12 = 9/12, et (2 × 4) / 12 = 8/12.",
        "Étape 3 : Additionnez les numérateurs : 9/12 + 8/12 = 17/12.",
        "Étape 4 : Convertissez la fraction impropre en nombre mixte : 17 ÷ 12 = 1 avec un reste de 5, ce qui donne 1 5/12 (environ 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, ce qui équivaut à 1 5/12 ou 1.4167."
    },
    "notes": [
      "Un dénominateur ne peut jamais être zéro car la division par zéro est mathématiquement indéfinie.",
      "Les fractions négatives sont standardisées avec le signe moins au numérateur (par exemple, -3/4).",
      "La calculatrice trouve automatiquement le Plus Grand Commun Diviseur pour réduire les résultats à leur forme la plus simple."
    ],
    "faqs": [
      {
        "question": "Comment additionner des fractions avec des dénominateurs différents ?",
        "answer": "Trouvez un dénominateur commun (souvent en multipliant les deux dénominateurs), ajustez les deux numérateurs en conséquence, additionnez les numérateurs et simplifiez la fraction résultante."
      },
      {
        "question": "Comment diviser deux fractions ?",
        "answer": "Pour diviser des fractions, multipliez la première fraction par l'inverse (la forme inversée) de la deuxième fraction. Par exemple, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "Qu'est-ce qu'un nombre mixte ?",
        "answer": "Un nombre mixte est composé d'un nombre entier combiné à une fraction propre, comme 2 1/2, qui représente 2 + 1/2 (ou 5/2 comme fraction impropre)."
      },
      {
        "question": "Qu'est-ce qu'une fraction impropre ?",
        "answer": "Une fraction impropre est une fraction dont le numérateur est supérieur ou égal au dénominateur, comme 7/4 ou 5/5. Elle peut être convertie en nombre mixte."
      }
    ],
    "breadcrumbName": "Calculatrice de Fractions"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "fr",
    "name": "Calculateur d'âge",
    "category": "time-date",
    "badge": "Âge exact & Jours",
    "icon": "Calendar",
    "h1": "Calculateur d'âge",
    "seoTitle": "Calculateur d'âge – Calculez votre âge exact à partir de votre date de naissance",
    "seoDescription": "Calculateur d'âge en ligne gratuit. Trouvez votre âge exact en années, mois, semaines, jours et heures, de votre date de naissance à aujourd'hui ou à toute date cible.",
    "primaryKeyword": "calculateur d'âge",
    "secondaryKeywords": [
      "calculer l'âge",
      "quel âge j'ai",
      "calculateur d'âge par date de naissance",
      "calculateur d'anniversaire",
      "calculateur d'âge chronologique"
    ],
    "heroSubtitle": "Calculez votre âge exact en années, mois, jours, heures, et découvrez le compte à rebours jusqu'à votre prochain anniversaire avec une précision calendaire.",
    "about": [
      "Le Calculateur d'âge calcule votre âge chronologique précis en fonction de votre date de naissance. Alors que l'âge conventionnel est simplement exprimé en années, ce calculateur décompose votre durée de vie en années exactes, mois calendaires et jours restants, en tenant compte des années bissextiles et des durées de mois variables.",
      "En plus de l'âge actuel, l'outil vous permet de mesurer l'âge à toute date passée ou future spécifiée – utile pour les admissions scolaires, les vérifications d'âge légal, les étapes de retraite et les demandes de passeport ou de visa."
    ],
    "formula": {
      "title": "Méthode de calcul de l'âge chronologique",
      "formulaText": "Années = Année Cible - Année de Naissance (ajusté pour le mois/jour)\nMois = Mois Cible - Mois de Naissance (ajusté pour le jour)\nJours = Jour Cible - Jour de Naissance (emprunt de jours au mois précédent si négatif)",
      "explanation": "Le calcul de l'âge précis au calendrier tient compte des durées de mois différentes (28 à 31 jours) et des années bissextiles quadriennales, assurant une précision au jour près.",
      "variables": [
        {
          "name": "Date de Naissance",
          "desc": "La date de début de la vie"
        },
        {
          "name": "Date Cible",
          "desc": "La date de référence de l'évaluation (par défaut : aujourd'hui)"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez votre date de naissance à l'aide des sélecteurs de jour, mois et année.",
      "Spécifiez facultativement une date d'évaluation cible (la date d'aujourd'hui par défaut).",
      "Cliquez sur Calculer pour voir votre âge exact en années, mois et jours.",
      "Explorez les récapitulatifs de la durée de vie totale en mois, semaines, jours, et le compte à rebours jusqu'à votre prochain anniversaire."
    ],
    "example": {
      "problem": "Quel est l'âge exact d'une personne née le 15 juin 1995, évalué le 8 octobre 2026 ?",
      "steps": [
        "Étape 1 : Différence en années : 2026 - 1995 = 31 ans.",
        "Étape 2 : Différence en mois : Octobre (mois 10) - Juin (mois 6) = 4 mois.",
        "Étape 3 : Différence en jours : 8 - 15 est négatif (-7), donc empruntez 1 mois (il reste 3 mois) et ajoutez les jours de septembre (30) : 8 + 30 - 15 = 23 jours."
      ],
      "result": "La personne a exactement 31 ans, 3 mois et 23 jours."
    },
    "notes": [
      "Le calcul de l'âge occidental considère une personne comme ayant 0 an à la naissance et l'incrémente à chaque anniversaire.",
      "Les années bissextiles contiennent 366 jours au lieu de 365 jours ; le calculateur inclut le 29 février chaque fois qu'il est traversé.",
      "Le total des heures et des jours est calculé en utilisant les intervalles de jours calendaires astronomiques standard."
    ],
    "faqs": [
      {
        "question": "Comment le calculateur d'âge gère-t-il les années bissextiles ?",
        "answer": "Le calculateur vérifie chaque année civile dans la plage et inclut correctement le 29 février dans les années bissextiles, garantissant que le nombre total de jours et les anniversaires sont précis à 100 %."
      },
      {
        "question": "Puis-je calculer quel âge j'aurai dans une année future ?",
        "answer": "Oui. Modifiez le champ « Âge à la date du » pour toute date future afin de connaître votre âge exact à cette date."
      },
      {
        "question": "Comment le compte à rebours du prochain anniversaire est-il déterminé ?",
        "answer": "Le calculateur compare la date d'aujourd'hui à votre prochain anniversaire dans l'année civile en cours ou suivante pour calculer le nombre exact de jours restants."
      }
    ],
    "breadcrumbName": "Calculateur d'âge"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "fr",
    "name": "Calculateur de Temps",
    "category": "time-date",
    "badge": "Ajouter et Soustraire du Temps",
    "icon": "Clock",
    "h1": "Calculateur de Temps",
    "seoTitle": "Calculateur de Temps – Ajouter et Soustraire Heures, Minutes et Secondes",
    "seoDescription": "Calculateur de temps en ligne gratuit. Ajoutez ou soustrayez facilement des durées en heures, minutes et secondes. Convertissez le temps en heures décimales et nettoyez les timecodes.",
    "primaryKeyword": "calculateur de temps",
    "secondaryKeywords": [
      "calculateur de durée",
      "calculateur d'addition de temps",
      "calculateur de soustraction de temps",
      "calculateur heures minutes secondes",
      "addition de temps"
    ],
    "heroSubtitle": "Ajoutez et soustrayez des durées en heures, minutes et secondes avec gestion automatique des dépassements d'unité et conversions en heures décimales.",
    "about": [
      "Le Calculateur de Temps permet d'additionner et de soustraire rapidement des intervalles de temps exprimés en heures, minutes et secondes. Étant donné que le temps utilise une arithmétique en base 60 (sexagésimale) plutôt qu'en base 10, l'addition manuelle d'heures et de minutes entraîne fréquemment des erreurs de regroupement.",
      "Cet outil gère automatiquement les dépassements de 60 secondes et 60 minutes, ce qui le rend idéal pour les monteurs vidéo calculant la durée des séquences, les chefs de projet suivant les tâches facturables, les pilotes enregistrant les durées de vol et les athlètes analysant leurs temps d'entraînement."
    ],
    "formula": {
      "title": "Formule de Sommation du Temps Sexagésimal",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "Tous les blocs de temps saisis sont convertis en secondes totales, additionnés ou soustraits, puis reconvertis en heures, minutes et secondes normalisées.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Heures, minutes et secondes de la première durée"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Heures, minutes et secondes de la deuxième durée"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez les heures, minutes et secondes pour le Temps 1.",
      "Choisissez l'opération : Ajouter (+) ou Soustraire (-).",
      "Saisissez les heures, minutes et secondes pour le Temps 2.",
      "Cliquez sur Calculer pour voir les heures, minutes, secondes consolidées et le total en heures décimales."
    ],
    "example": {
      "problem": "Additionnez 2 heures 45 minutes 30 secondes et 3 heures 35 minutes 45 secondes.",
      "steps": [
        "Étape 1 : Secondes : 30 + 45 = 75 secondes = 1 minute et 15 secondes.",
        "Étape 2 : Minutes : 45 + 35 + 1 (reporté) = 81 minutes = 1 heure et 21 minutes.",
        "Étape 3 : Heures : 2 + 3 + 1 (reporté) = 6 heures."
      ],
      "result": "La durée totale est de 6 heures, 21 minutes et 15 secondes (6.3542 heures décimales)."
    },
    "notes": [
      "Il y a 60 secondes dans une minute et 60 minutes dans une heure.",
      "Pour convertir les minutes en heures décimales, divisez les minutes par 60 (par exemple, 30 minutes = 0.5 heures).",
      "Si vous soustrayez un temps plus grand d'un temps plus petit, le résultat est affiché comme un décalage horaire négatif."
    ],
    "faqs": [
      {
        "question": "Comment convertir les minutes en heures décimales ?",
        "answer": "Divisez le nombre de minutes par 60. Par exemple, 45 minutes divisées par 60 donnent 0.75 heures. Ainsi, 2 heures et 45 minutes équivalent à 2.75 heures décimales."
      },
      {
        "question": "Que se passe-t-il lorsque les secondes dépassent 60 ?",
        "answer": "Chaque bloc de 60 secondes est automatiquement converti en 1 minute et reporté dans la colonne des minutes."
      },
      {
        "question": "Cet outil peut-il calculer les timecodes de vol ou de montage vidéo ?",
        "answer": "Oui. Il additionne précisément plusieurs prises, clips ou segments de vol en heures, minutes et secondes."
      },
      {
        "question": "Que signifie un résultat de temps négatif ?",
        "answer": "Un résultat de temps négatif indique que le temps soustrait était supérieur au temps initial. Par exemple, si vous soustrayez 3 heures de 2 heures, le résultat sera -1 heure."
      }
    ],
    "breadcrumbName": "Calculateur de Temps"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "fr",
    "name": "Calculateur de Dates",
    "category": "time-date",
    "badge": "Jours entre deux dates",
    "icon": "Calendar",
    "h1": "Calculateur de Dates",
    "seoTitle": "Calculateur de Dates en Ligne – Jours entre deux dates et ajout/soustraction de jours",
    "seoDescription": "Calculateur de dates gratuit en ligne. Calculez le nombre exact de jours, semaines et jours ouvrés entre deux dates, ou ajoutez/soustrayez des jours à n'importe quelle date.",
    "primaryKeyword": "calculateur de dates",
    "secondaryKeywords": [
      "calculateur de différence de dates",
      "jours entre deux dates",
      "calculateur de durée entre dates",
      "calculateur de jours ouvrés",
      "ajouter des jours à une date"
    ],
    "heroSubtitle": "Calculez le nombre exact de jours calendaires et de jours ouvrés entre deux dates, ou projetez des dates futures en ajoutant ou soustrayant des jours.",
    "about": [
      "Le Calculateur de Dates résout les questions courantes liées au calendrier : trouver combien de jours séparent deux dates spécifiques, ou déterminer quelle date correspond à un certain nombre de jours, semaines ou mois dans le futur ou le passé.",
      "Contrairement à un simple comptage manuel, cet outil prend en compte avec précision les variations de fin de mois, les années bissextiles, et distingue les jours de week-end standards des jours ouvrés (du lundi au vendredi) – essentiel pour la planification de projets, les échéances légales, les périodes de préavis et les comptes à rebours d'événements."
    ],
    "formula": {
      "title": "Calcul de la Durée entre Dates",
      "formulaText": "Jours Totaux = (Date de Fin (ms) - Date de Début (ms)) / (1000 × 60 × 60 × 24)\nSemaines = ⌊Jours Totaux / 7⌋\nJours Restants = Jours Totaux mod 7",
      "explanation": "Calcule la différence de timestamp epoch entre les horodatages UTC de minuit et compte les jours du lundi au vendredi pour les intervalles ouvrés.",
      "variables": [
        {
          "name": "Date de Début",
          "desc": "La date de référence initiale"
        },
        {
          "name": "Date de Fin",
          "desc": "La date d'achèvement cible"
        },
        {
          "name": "Jours Ouvrés",
          "desc": "Nombre de jours de semaine (du lundi au vendredi) excluant les week-ends"
        }
      ]
    },
    "howToCalculate": [
      "Choisissez le mode : \"Jours entre deux dates\" ou \"Ajouter / Soustraire des jours\".",
      "Pour la différence de dates : Sélectionnez votre Date de Début et Date de Fin.",
      "Cochez \"Inclure le jour de fin\" si votre échéancier nécessite un comptage inclusif des bornes.",
      "Visualisez le total des jours, des semaines, des jours restants et des jours ouvrés (du lundi au vendredi)."
    ],
    "example": {
      "problem": "Combien de jours et de jours ouvrés y a-t-il entre le 5 janvier 2026 et le 20 février 2026 ?",
      "steps": [
        "Étape 1 : Nombre total de jours calendaires écoulés = 46 jours.",
        "Étape 2 : Équivaut à 6 semaines complètes et 4 jours calendaires.",
        "Étape 3 : En excluant les week-ends (samedi et dimanche), on obtient 34 jours ouvrés."
      ],
      "result": "Il y a 46 jours calendaires (dont 34 jours ouvrés) entre les deux dates."
    },
    "notes": [
      "La différence de date standard calcule les jours complets écoulés entre deux dates.",
      "Les années bissextiles sont automatiquement prises en compte (2028, 2032, etc. ont 29 jours en février).",
      "Le calcul des jours ouvrés n'inclut pas les jours fériés nationaux officiels, car ceux-ci varient selon les pays."
    ],
    "faqs": [
      {
        "question": "Le calculateur de dates inclut-il la date de début et la date de fin ?",
        "answer": "Par défaut, le calculateur compte l'intervalle depuis la date de début jusqu'à la date de fin (temps écoulé). Vous pouvez activer l'option \"Inclure le jour de fin\" pour inclure les deux jours limites."
      },
      {
        "question": "Comment sont définis les jours ouvrés ?",
        "answer": "Les jours ouvrés correspondent du lundi au vendredi. Les samedis et dimanches sont exclus en tant que jours de week-end."
      },
      {
        "question": "Puis-je ajouter uniquement des jours ouvrés ?",
        "answer": "Non, l'outil d'ajout fonctionne avec des jours calendaires. Si vous devez projeter une date en ajoutant uniquement des jours ouvrés, vous devrez estimer manuellement les jours de week-end à inclure ou utiliser un outil spécialisé pour cela."
      },
      {
        "question": "Comment le calculateur gère-t-il les années bissextiles ?",
        "answer": "Le calculateur de dates intègre automatiquement la logique des années bissextiles. Ainsi, si votre intervalle inclut un 29 février d'une année bissextile (comme 2024, 2028, etc.), ce jour supplémentaire sera correctement comptabilisé dans le total des jours."
      }
    ],
    "breadcrumbName": "Calculateur de Dates"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "fr",
    "name": "Calculateur d'heures",
    "category": "time-date",
    "badge": "Feuille de temps & Paie",
    "icon": "Timer",
    "h1": "Calculateur d'heures",
    "seoTitle": "Calculateur d'heures – Calcul des heures de travail et feuille de temps",
    "seoDescription": "Calculateur d'heures en ligne gratuit. Calculez le total des heures de travail, les pauses déjeuner, les heures décimales et le salaire brut entre les heures de début et de fin pour les feuilles de temps.",
    "primaryKeyword": "calculateur d'heures",
    "secondaryKeywords": [
      "calculateur de feuille de temps",
      "calculateur d'heures de travail",
      "calculateur d'heures travaillées",
      "calculateur de fiche de temps",
      "calculer les heures entre deux heures"
    ],
    "heroSubtitle": "Calculez les heures de travail quotidiennes, déduisez les pauses déjeuner et de repos, convertissez les heures en format décimal et estimez les revenus bruts pour la paie.",
    "about": [
      "Le Calculateur d'heures simplifie le suivi du temps pour les employés horaires, les contractuels, les freelances et les gestionnaires de paie. La conversion des heures horloge en heures décimales (par exemple, 7 heures 45 minutes en 7,75 heures) est essentielle pour la multiplication par les taux de salaire horaire.",
      "Le calculateur prend en charge les quarts de nuit qui s'étendent au-delà de minuit (par exemple, de 22h00 à 6h00) et déduit automatiquement les pauses ou déjeuners non rémunérés pour rapporter les heures payables nettes."
    ],
    "formula": {
      "title": "Formule des heures de feuille de temps et du salaire",
      "formulaText": "Gross Minutes = End Time - Start Time (adjusted for overnight shifts)\nNet Minutes = Gross Minutes - Break Minutes\nDecimal Hours = Net Minutes / 60\nTotal Pay = Decimal Hours × Hourly Rate",
      "explanation": "Soustrayez l'heure de début de l'heure de fin, soustrayez les minutes de pause non rémunérées, divisez par 60 pour obtenir les heures décimales, et multipliez par le taux de salaire horaire.",
      "variables": [
        {
          "name": "Heure de début",
          "desc": "Heure d'arrivée"
        },
        {
          "name": "Heure de fin",
          "desc": "Heure de départ"
        },
        {
          "name": "Pause",
          "desc": "Durée de la pause repas ou de repos non rémunérée en minutes"
        },
        {
          "name": "Taux horaire",
          "desc": "Salaire horaire de base en dollars ou en devise locale"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez l'heure de début de votre quart de travail (par exemple, 08:30).",
      "Saisissez l'heure de fin de votre quart de travail (par exemple, 17:00).",
      "Indiquez toute durée de pause non rémunérée en minutes (par exemple, 45 minutes pour le déjeuner).",
      "Saisissez facultativement votre taux de salaire horaire pour estimer le salaire brut.",
      "Cliquez sur Calculer pour afficher les heures nettes, les minutes, les heures décimales et le total des gains."
    ],
    "example": {
      "problem": "Un employé pointe à 08:30, dépointe à 17:15, prend une pause déjeuner de 45 minutes et gagne 24 $/heure.",
      "steps": [
        "Étape 1 : Temps brut total entre 08:30 et 17:15 = 8 heures et 45 minutes (525 minutes).",
        "Étape 2 : Déduisez 45 minutes de pause déjeuner : 525 - 45 = 480 minutes nettes.",
        "Étape 3 : Convertissez en décimal : 480 ÷ 60 = 8,00 heures décimales.",
        "Étape 4 : Multipliez par le salaire : 8,00 × 24 $ = 192,00 $."
      ],
      "result": "L'employé a travaillé 8,00 heures et a gagné 192,00 $."
    },
    "notes": [
      "Les systèmes de paie exigent des heures décimales (par exemple, 8,25 heures) plutôt que le format horloge (8h 15m).",
      "Les quarts de travail qui traversent minuit sont détectés et calculés de manière transparente sans nombres négatifs.",
      "Les calculs représentent les salaires bruts avant l'impôt sur le revenu légal et les retenues sur la paie."
    ],
    "faqs": [
      {
        "question": "Comment convertir les minutes de travail en heures décimales ?",
        "answer": "Divisez le nombre de minutes par 60. Par exemple, 15 minutes équivalent à 15/60 = 0,25 heure ; 30 minutes à 0,5 heure ; et 45 minutes à 0,75 heure."
      },
      {
        "question": "Comment le calculateur gère-t-il les quarts de nuit qui traversent minuit ?",
        "answer": "Si l'heure de fin est numériquement antérieure à l'heure de début (par exemple, de 23h00 à 7h00), le calculateur ajoute automatiquement 24 heures pour déterminer la durée correcte du quart de nuit."
      },
      {
        "question": "Puis-je calculer la paie hebdomadaire avec cet outil ?",
        "answer": "Vous pouvez calculer chaque quart de travail quotidien ou utiliser le Calculateur de salaire pour des projections de paie consolidées sur plusieurs semaines."
      },
      {
        "question": "Pourquoi est-il important de convertir les heures en format décimal pour la paie ?",
        "answer": "Les systèmes de paie et les logiciels de comptabilité utilisent généralement les heures décimales pour un calcul plus simple et plus précis des salaires. Par exemple, 7 heures et 30 minutes correspondent à 7,5 heures, ce qui simplifie la multiplication par un taux horaire."
      }
    ],
    "breadcrumbName": "Calculateur d'heures"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "fr",
    "name": "Calculateur d'IMC",
    "category": "fitness",
    "badge": "Indice de Masse Corporelle",
    "icon": "Activity",
    "h1": "Calculateur d'IMC",
    "seoTitle": "Calculateur d'IMC – Calculez Votre Indice de Masse Corporelle en Ligne",
    "seoDescription": "Calculateur d'IMC gratuit en ligne. Calculez l'Indice de Masse Corporelle pour adultes en utilisant les unités métriques (cm/kg) ou impériales (pieds/pouces/livres). Consultez les catégories de poids de l'OMS et les fourchettes saines.",
    "primaryKeyword": "calculateur IMC",
    "secondaryKeywords": [
      "calculer IMC",
      "calculateur indice de masse corporelle",
      "calculateur IMC pour adultes",
      "fourchette de poids saine",
      "calculateur IMC métrique"
    ],
    "heroSubtitle": "Calculez votre Indice de Masse Corporelle (IMC) en utilisant les mesures métriques ou impériales pour comprendre votre catégorie de poids et vos objectifs de poids sain.",
    "about": [
      "Le Calculateur d'Indice de Masse Corporelle (IMC) est un indicateur de dépistage standardisé établi par l'Organisation Mondiale de la Santé (OMS) pour classer les individus selon leur statut pondéral par rapport à leur taille. Il est largement utilisé en épidémiologie, lors des bilans de santé généraux et pour le suivi de la condition physique personnelle.",
      "L'IMC est calculé en divisant le poids corporel en kilogrammes par la taille en mètres carrés. Le calculateur affiche votre score exact, la classification officielle de l'OMS (insuffisance pondérale, poids normal, surpoids ou classe d'obésité), et calcule votre fourchette de poids sain personnalisée."
    ],
    "formula": {
      "title": "Formules Standard de l'IMC",
      "formulaText": "Formule Métrique : IMC = Poids (kg) / [Taille (m)]²\nFormule Impériale : IMC = 703 × Poids (lbs) / [Taille (pouces)]²",
      "explanation": "Divisez le poids par le carré de la taille. Pour les unités impériales (livres et pouces), multipliez le rapport par le facteur de conversion 703.",
      "variables": [
        {
          "name": "Poids",
          "desc": "Poids corporel en kilogrammes (kg) ou en livres (lbs)"
        },
        {
          "name": "Taille",
          "desc": "Taille debout en centimètres (cm) ou en pieds et pouces"
        },
        {
          "name": "Facteur 703",
          "desc": "Multiplicateur de conversion impérial standard"
        }
      ]
    },
    "howToCalculate": [
      "Choisissez votre système d'unités préféré : Métrique (cm et kg) ou Impérial (pieds, pouces et livres).",
      "Saisissez votre taille actuelle et votre poids corporel.",
      "Cliquez sur Calculer pour voir votre score IMC, votre catégorie OMS et votre fourchette de poids cible saine.",
      "Examinez la fourchette de poids sain conçue pour votre taille spécifique."
    ],
    "example": {
      "problem": "Quel est l'IMC d'un individu mesurant 175 cm (1,75 m) et pesant 70 kg ?",
      "steps": [
        "Étape 1 : Mettez la taille en mètres au carré : 1,75 × 1,75 = 3,0625 m².",
        "Étape 2 : Divisez le poids par la taille au carré : 70 ÷ 3,0625 = 22,86.",
        "Étape 3 : Comparez aux seuils de l'OMS : 22,9 se situe entre 18,5 et 24,9 (Poids Normal)."
      ],
      "result": "L'individu a un IMC de 22,9, ce qui est classé comme Poids Normal."
    },
    "notes": [
      "L'IMC est un indicateur de dépistage populationnel et ne fait pas de distinction entre la masse musculaire maigre et le tissu adipeux.",
      "Les athlètes, les culturistes et les femmes enceintes peuvent enregistrer des scores IMC élevés qui ne reflètent pas un excès de graisse corporelle.",
      "Cet outil est destiné à des fins d'information générale et ne doit pas remplacer une évaluation clinique professionnelle."
    ],
    "faqs": [
      {
        "question": "Quelle est la fourchette d'IMC considérée comme saine ?",
        "answer": "Selon l'Organisation Mondiale de la Santé (OMS), un IMC compris entre 18,5 et 24,9 est considéré comme la catégorie de poids normal ou sain pour les adultes."
      },
      {
        "question": "Pourquoi l'IMC peut-il être trompeur pour les athlètes musclés ?",
        "answer": "L'IMC mesure le poids total par rapport à la taille et ne peut pas différencier le muscle de la graisse adipeuse. Comme le muscle est plus dense que la graisse, les individus musclés sont souvent classés en surpoids ou obèses malgré un faible pourcentage de graisse corporelle."
      },
      {
        "question": "Comment calculer l'IMC en utilisant les livres et les pouces ?",
        "answer": "Multipliez votre poids en livres par 703, puis divisez par votre taille en pouces au carré : IMC = (lbs × 703) / (pouces × pouces)."
      }
    ],
    "breadcrumbName": "Calculateur d'IMC"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "fr",
    "name": "Calculateur d'allure",
    "category": "fitness",
    "badge": "Course à pied et marche",
    "icon": "Footprints",
    "h1": "Calculateur d'allure",
    "seoTitle": "Calculateur d'allure – Rythme de course, vitesse et temps",
    "seoDescription": "Calculateur d'allure de course gratuit en ligne. Calculez votre allure au kilomètre (min/km), allure au mile (min/mile) et vitesse (km/h, mph) pour les courses 5K, 10K, semi-marathon et marathon.",
    "primaryKeyword": "calculateur d'allure",
    "secondaryKeywords": [
      "calculateur d'allure de course",
      "calculateur d'allure marathon",
      "calculateur de vitesse de course",
      "calculateur d'allure 5k",
      "calculateur min par km"
    ],
    "heroSubtitle": "Calculez votre allure de course et de marche au kilomètre et au mile, déterminez les temps de passage nécessaires et convertissez instantanément entre vitesse et allure.",
    "about": [
      "Le Calculateur d'allure est conçu pour les coureurs, joggeurs, triathlètes et marcheurs qui souhaitent planifier leurs entraînements ou prédire leurs temps de course. L'allure mesure le temps nécessaire pour parcourir une unité de distance (comme les minutes par kilomètre ou les minutes par mile), tandis que la vitesse mesure la distance parcourue par unité de temps (km/h ou mph).",
      "Le calculateur prend en charge les distances de course standard, y compris le 5K, le 10K, le semi-marathon (21,0975 km) et le marathon complet (42,195 km), vous permettant de déterminer l'allure cible nécessaire pour atteindre votre objectif de record personnel."
    ],
    "formula": {
      "title": "Formules d'allure et de vitesse",
      "formulaText": "Pace = Time (seconds) / Distance\nSpeed (km/h) = Distance (km) / Time (hours)\nSpeed (mph) = Distance (miles) / Time (hours)",
      "explanation": "L'allure est l'inverse de la vitesse : divisez le temps total écoulé en minutes par la distance totale parcourue en kilomètres ou en miles.",
      "variables": [
        {
          "name": "Temps",
          "desc": "Durée totale écoulée en heures, minutes et secondes"
        },
        {
          "name": "Distance",
          "desc": "Longueur totale du parcours en kilomètres ou en miles"
        },
        {
          "name": "Allure",
          "desc": "Temps pris par unité de distance (min/km ou min/mile)"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez la Distance totale de votre parcours et sélectionnez l'unité (km ou miles).",
      "Saisissez le Temps écoulé ou ciblé (heures, minutes et secondes).",
      "Cliquez sur Calculer pour afficher votre allure moyenne par kilomètre, allure par mile et vitesse en km/h et mph.",
      "Ajustez les temps pour prévoir les temps de passage nécessaires pour les prochaines courses à pied."
    ],
    "example": {
      "problem": "Quelle allure est nécessaire pour terminer une course de 10K (10 kilomètres) en 50 minutes ?",
      "steps": [
        "Étape 1 : Temps total = 50 minutes = 3 000 secondes.",
        "Étape 2 : Allure par km : 50 minutes ÷ 10 km = 5:00 minutes par kilomètre.",
        "Étape 3 : Distance en miles : 10 km ÷ 1,60934 = 6,2137 miles.",
        "Étape 4 : Allure par mile : 50 minutes ÷ 6,2137 miles = 8:03 minutes par mile (Vitesse : 12,0 km/h ou 7,46 mph)."
      ],
      "result": "L'allure cible est de 5:00 min/km ou 8:03 min/mile."
    },
    "notes": [
      "1 mile équivaut approximativement à 1,60934 kilomètres. 1 kilomètre équivaut à 0,621371 miles.",
      "L'allure est formatée en MM:SS (par exemple, 4:30 min/km signifie 4 minutes et 30 secondes).",
      "Pour convertir l'allure en vitesse : Vitesse (km/h) = 60 ÷ Allure (en minutes décimales par km)."
    ],
    "faqs": [
      {
        "question": "Quelle est la différence entre l'allure et la vitesse ?",
        "answer": "La vitesse indique la distance que vous parcourez dans un temps donné (par exemple, kilomètres par heure), tandis que l'allure indique le temps qu'il faut pour parcourir une distance fixe (par exemple, minutes par kilomètre)."
      },
      {
        "question": "Quelle allure est nécessaire pour un marathon en moins de 4 heures ?",
        "answer": "Pour terminer un marathon complet (42,195 km / 26,219 miles) en moins de 4 heures, vous avez besoin d'une allure moyenne plus rapide que 5:41 min/km ou 9:09 min/mile."
      },
      {
        "question": "Comment convertir des min/km en min/mile ?",
        "answer": "Multipliez votre allure en minutes par kilomètre par 1,60934. Par exemple, 5:00 min/km (5,0) × 1,60934 = 8,046 minutes par mile, ce qui est approximativement 8:03 min/mile."
      },
      {
        "question": "Pourquoi l'allure est-elle importante pour les coureurs ?",
        "answer": "L'allure est cruciale pour les coureurs car elle permet de gérer l'effort, d'atteindre des objectifs de temps spécifiques et d'optimiser l'entraînement. Connaître votre allure vous aide à éviter de partir trop vite ou trop lentement, et à maintenir un rythme constant pour améliorer vos performances."
      }
    ],
    "breadcrumbName": "Calculateur d'allure"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "fr",
    "name": "Calculateur de Coût de Carburant",
    "category": "utilities",
    "badge": "Budget Trajet & Essence",
    "icon": "Fuel",
    "h1": "Calculateur de Coût de Carburant",
    "seoTitle": "Calculateur de Coût de Carburant – Simulateur de Coût de Trajet et de Consommation d'Essence",
    "seoDescription": "Calculateur de coût de carburant gratuit en ligne. Calculez le coût total de votre trajet, le volume de carburant nécessaire et le coût par kilomètre ou par mile en fonction de l'efficacité du véhicule et du prix du carburant.",
    "primaryKeyword": "calculateur de coût de carburant",
    "secondaryKeywords": [
      "calculateur de coût d'essence",
      "simulateur de consommation de carburant",
      "calculateur de carburant pour voyage",
      "calculateur de coût au kilomètre",
      "calculateur de coût de trajet"
    ],
    "heroSubtitle": "Estimez vos coûts de carburant pour un voyage en voiture, calculez les litres ou gallons nécessaires, et déterminez votre coût par kilomètre ou par mile avant de partir.",
    "about": [
      "Le Calculateur de Coût de Carburant aide les navetteurs, les voyageurs et les opérateurs logistiques à prévoir les dépenses de carburant pour toute distance de conduite. Le carburant est l'une des dépenses variables les plus importantes de la possession d'un véhicule, influencée par les prix fluctuants à la pompe, les vitesses sur autoroute et l'efficacité du moteur.",
      "Cet outil prend en charge les kilomètres avec km/L ou L/100km, ainsi que les miles avec Miles Par Gallon (MPG). Il détaille le volume total de carburant requis, la dépense totale du trajet et le coût unitaire par kilomètre ou par mile."
    ],
    "formula": {
      "title": "Formule de Consommation et de Coût de Carburant",
      "formulaText": "Carburant Requis (L) = Distance (km) / Efficacité (km/L)\nCoût Total du Trajet = Carburant Requis × Prix du Carburant par Unité\nCoût par Distance = Coût Total du Trajet / Distance",
      "explanation": "Divisez la distance totale du trajet par l'efficacité énergétique du véhicule pour trouver la quantité de carburant, puis multipliez par le prix du carburant à la pompe locale.",
      "variables": [
        {
          "name": "Distance",
          "desc": "Longueur du trajet en kilomètres ou en miles"
        },
        {
          "name": "Efficacité",
          "desc": "Consommation de carburant du véhicule (km/L, L/100km ou MPG)"
        },
        {
          "name": "Prix du Carburant",
          "desc": "Coût de l'essence, du diesel ou du gaz par litre ou par gallon"
        }
      ]
    },
    "howToCalculate": [
      "Saisissez la distance totale du trajet (par exemple, 350 km).",
      "Sélectionnez l'unité d'efficacité de votre véhicule (km/L, L/100km ou MPG) et saisissez sa consommation.",
      "Saisissez le prix du carburant à la pompe par litre ou par gallon.",
      "Cliquez sur Calculer pour voir le carburant total requis, la dépense totale du trajet et le coût par unité de distance."
    ],
    "example": {
      "problem": "Quel est le coût du carburant pour un trajet de 400 km dans une voiture consommant 16 km/L avec un carburant au prix de 1,50 $ par litre ?",
      "steps": [
        "Étape 1 : Carburant nécessaire = 400 km ÷ 16 km/L = 25 litres.",
        "Étape 2 : Coût total = 25 litres × 1,50 $/L = 37,50 $.",
        "Étape 3 : Coût par kilomètre = 37,50 $ ÷ 400 km = 0,094 $ par km."
      ],
      "result": "Le trajet nécessite 25 litres de carburant et coûte 37,50 $ (0,094 $/km)."
    },
    "notes": [
      "Une accélération agressive, des charges lourdes et des galeries de toit peuvent réduire l'efficacité énergétique sur autoroute de 15 % à 25 %.",
      "Pour convertir des L/100km en km/L : divisez 100 par le chiffre en L/100km (par exemple, 8 L/100km = 100 / 8 = 12,5 km/L).",
      "Pour les allers-retours, multipliez la distance aller simple par 2 avant de calculer."
    ],
    "faqs": [
      {
        "question": "Comment calculer le coût du carburant pour un voyage en voiture ?",
        "answer": "Divisez la distance par la consommation de votre véhicule (km/L ou MPG) pour trouver le volume de carburant nécessaire, puis multipliez ce volume par le prix du carburant par litre ou par gallon."
      },
      {
        "question": "Comment convertir les MPG en km/L ?",
        "answer": "1 MPG américain équivaut approximativement à 0,425 km/L. Pour convertir les MPG en km/L, multipliez le nombre de MPG par 0,425144."
      },
      {
        "question": "Comment puis-je améliorer l'efficacité énergétique de mon véhicule ?",
        "answer": "Maintenez la pression des pneus recommandée, respectez les limites de vitesse stables sur autoroute, retirez le poids excessif du coffre et évitez les freinages et accélérations brusques."
      },
      {
        "question": "Quelle est la différence entre km/L et L/100km ?",
        "answer": "Le km/L indique combien de kilomètres votre véhicule peut parcourir avec un litre de carburant. Le L/100km indique combien de litres de carburant votre véhicule consomme pour parcourir 100 kilomètres. Ce sont des mesures inverses de l'efficacité énergétique."
      }
    ],
    "breadcrumbName": "Calculateur de Coût de Carburant"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "fr",
    "name": "Calculateur de Coût d'Électricité",
    "category": "utilities",
    "badge": "Appareils & Facture d'Électricité",
    "icon": "Zap",
    "h1": "Calculateur de Coût d'Électricité",
    "seoTitle": "Calculateur de Coût d'Électricité – Simulateur de Consommation et Facture d'Énergie des Appareils",
    "seoDescription": "Calculateur de coût d'électricité gratuit en ligne. Calculez la consommation électrique en kWh et estimez les factures d'électricité mensuelles et annuelles pour les appareils ménagers en fonction de leur puissance.",
    "primaryKeyword": "calculateur coût électricité",
    "secondaryKeywords": [
      "calculateur consommation électrique",
      "calculateur électricité appareil",
      "calculateur kWh",
      "calculateur coût énergie",
      "calculateur facture électricité"
    ],
    "heroSubtitle": "Calculez la consommation électrique en kilowattheures (kWh) et estimez les coûts d'électricité mensuels et annuels pour tout appareil ménager.",
    "about": [
      "Le Calculateur de Coût d'Électricité aide les propriétaires, les locataires et les gestionnaires d'installations à quantifier la quantité d'électricité consommée par les appareils ménagers et leur coût de fonctionnement. Des climatiseurs et chauffages d'appoint aux rigs de minage de crypto et compresseurs de réfrigérateur, la consommation d'énergie peut gonfler considérablement les factures de services publics.",
      "Saisissez la puissance en watts de l'appareil, les heures de fonctionnement quotidiennes et le tarif d'électricité de votre fournisseur par kilowattheure (kWh) pour recevoir des projections de coûts journaliers, mensuels et annuels."
    ],
    "formula": {
      "title": "Formules de Calcul des Kilowattheures et du Coût de l'Énergie",
      "formulaText": "Énergie Quotidienne (kWh) = (Puissance de l'Appareil en Watts × Heures par Jour) / 1000\nCoût = Énergie (kWh) × Tarif d'Électricité par kWh\nCoût Mensuel = Coût Quotidien × 30 jours\nCoût Annuel = Coût Quotidien × 365 jours",
      "explanation": "Convertissez la puissance nominale de l'appareil en watts en kilowatts en divisant par 1 000, multipliez par les heures de fonctionnement quotidien, puis multipliez par le tarif du fournisseur par kWh.",
      "variables": [
        {
          "name": "Puissance (Watts)",
          "desc": "Consommation électrique nominale de l'appareil en Watts (W)"
        },
        {
          "name": "Heures/Jour",
          "desc": "Durée de fonctionnement active moyenne par cycle de 24 heures"
        },
        {
          "name": "Tarif ($/kWh)",
          "desc": "Coût de l'électricité par kilowattheure"
        }
      ]
    },
    "howToCalculate": [
      "Localisez la puissance nominale en watts sur l'étiquette ou le manuel de l'appareil (par exemple, 1500W pour un chauffage d'appoint).",
      "Saisissez le nombre estimé d'heures de fonctionnement quotidien de l'appareil.",
      "Saisissez le coût local de votre fournisseur par kWh (vérifiez votre facture d'électricité mensuelle ; le tarif standard aux États-Unis est d'environ 0,16 $/kWh, au Royaume-Uni d'environ 0,28 £/kWh).",
      "Cliquez sur Calculer pour voir la consommation journalière, mensuelle et annuelle en kWh et le coût monétaire."
    ],
    "example": {
      "problem": "Combien coûte le fonctionnement d'un climatiseur de 1 200 Watts pendant 8 heures par jour à un tarif de 0,15 $ par kWh pour un mois de 30 jours ?",
      "steps": [
        "Étape 1 : kWh quotidiens : (1 200 W × 8 heures) ÷ 1 000 = 9,6 kWh/jour.",
        "Étape 2 : Énergie mensuelle : 9,6 kWh × 30 jours = 288 kWh.",
        "Étape 3 : Coût mensuel : 288 kWh × 0,15 $/kWh = 43,20 $.",
        "Étape 4 : Coût annuel : 9,6 kWh × 365 jours × 0,15 $ = 525,60 $."
      ],
      "result": "Le climatiseur utilise 288 kWh par mois et coûte 43,20 $ mensuellement (525,60 $ annuellement)."
    },
    "notes": [
      "Les étiquettes des appareils indiquent la puissance maximale ; les appareils avec thermostats (comme les réfrigérateurs et les climatiseurs) s'allument et s'éteignent par cycles, réduisant la consommation moyenne.",
      "1 Kilowatt (kW) = 1 000 Watts (W). 1 Mégawatt (MW) = 1 000 000 Watts.",
      "Vérifiez votre facture de services publics pour les tarifs échelonnés ou les tarifs heures pleines/creuses (TOU) pendant l'été et l'hiver."
    ],
    "faqs": [
      {
        "question": "Comment calculer le coût de l'électricité d'un appareil ?",
        "answer": "Multipliez la puissance en watts de l'appareil par les heures quotidiennes, divisez par 1 000 pour obtenir les kWh quotidiens, puis multipliez par le tarif de votre fournisseur par kWh."
      },
      {
        "question": "Où puis-je trouver la puissance en watts d'un appareil ?",
        "answer": "La puissance en watts d'un appareil est généralement estampillée sur une étiquette de certification électrique située à l'arrière ou sous l'appareil, ou dans le manuel d'instructions."
      },
      {
        "question": "Quels appareils ménagers consomment le plus d'électricité ?",
        "answer": "Les systèmes de chauffage et de climatisation (climatisation centrale et pompes à chaleur), les chauffe-eau, les sèche-linge et les fours électriques consomment la plus grande quantité d'énergie domestique."
      },
      {
        "question": "Comment réduire ma facture d'électricité ?",
        "answer": "Pour réduire votre facture d'électricité, vous pouvez utiliser des appareils plus économes en énergie, éteindre les lumières et les appareils non utilisés, débrancher les chargeurs, optimiser l'isolation de votre logement, et utiliser des thermostats intelligents pour gérer le chauffage et la climatisation."
      }
    ],
    "breadcrumbName": "Calculateur de Coût d'Électricité"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "fr",
    "name": "Calculateur de GPA",
    "category": "education",
    "badge": "Moyenne Pondérée",
    "icon": "GraduationCap",
    "h1": "Calculateur de GPA",
    "seoTitle": "Calculateur de GPA – Calculez votre moyenne pondérée (4.0) pour l'université et le lycée",
    "seoDescription": "Calculateur de GPA gratuit en ligne. Calculez votre moyenne pondérée (GPA) par semestre et cumulative sur une échelle de 4.0, en tenant compte des crédits et des notes littérales.",
    "primaryKeyword": "calculateur de GPA",
    "secondaryKeywords": [
      "calculateur de GPA universitaire",
      "calculateur de GPA par semestre",
      "calculateur de moyenne pondérée",
      "calculateur de GPA cumulatif",
      "échelle de GPA 4.0"
    ],
    "heroSubtitle": "Calculez votre moyenne pondérée (GPA) par semestre et cumulative sur une échelle standard de 4.0, en utilisant les notes littérales et les crédits de cours.",
    "about": [
      "Le Calculateur de Moyenne Pondérée (GPA) évalue votre performance académique sur l'échelle de notation universitaire standard de 4.0. Les collèges, universités, lycées, comités de bourses et programmes d'études supérieures utilisent le GPA cumulatif comme référence principale pour les distinctions honorifiques, la probation académique et les admissions.",
      "Contrairement à une simple moyenne de notes, le GPA est pondéré par les heures de crédit de cours – ce qui signifie qu'un cours de 4 crédits a deux fois plus d'influence sur votre GPA final qu'un cours à option de 2 crédits."
    ],
    "formula": {
      "title": "Formule de calcul du GPA pondéré",
      "formulaText": "Points de note par cours = Crédits de cours × Valeur de l'échelle de notes\nGPA = Total des points de note / Total des crédits de cours",
      "explanation": "Multipliez les heures de crédit de chaque cours par l'équivalent numérique de sa note littérale, additionnez le total des points de note, puis divisez par le total des crédits tentés.",
      "variables": [
        {
          "name": "Échelle de notes (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Crédits",
          "desc": "Heures de crédit ou unités semestrielles attribuées à chaque cours"
        }
      ]
    },
    "howToCalculate": [
      "Ajoutez chaque cours suivi pendant votre semestre ou trimestre.",
      "Sélectionnez la note littérale obtenue (par exemple, A, B+, B, C) ou entrez les points de note numériques.",
      "Entrez les heures de crédit du cours (par exemple, 3 ou 4 crédits).",
      "Cliquez sur Calculer pour voir votre GPA pondéré, le total des heures de crédit et le total des points de note obtenus."
    ],
    "example": {
      "problem": "Calculez le GPA semestriel pour 4 cours : Mathématiques (4 crédits, A), Histoire (3 crédits, B), Biologie (4 cr��dits, B+), Anglais (3 crédits, A-).",
      "steps": [
        "Étape 1 : Mathématiques : 4 crédits × 4.0 (A) = 16.0 points.",
        "Étape 2 : Histoire : 3 crédits × 3.0 (B) = 9.0 points.",
        "Étape 3 : Biologie : 4 crédits × 3.3 (B+) = 13.2 points.",
        "Étape 4 : Anglais : 3 crédits × 3.7 (A-) = 11.1 points.",
        "Étape 5 : Total des points = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 points.",
        "Étape 6 : Total des crédits = 4 + 3 + 4 + 3 = 14 crédits. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "Le GPA semestriel est de 3.52."
    },
    "notes": [
      "Les cours « Réussite/Échec » (Pass/Fail) ou « Auditeur libre » sont généralement exclus des points de note et du total des heures de crédit dans les calculs de GPA.",
      "Certains lycées utilisent des échelles pondérées de 5.0 pour les cours AP ou honorifiques ; le GPA universitaire standard utilise la référence non pondérée de 4.0.",
      "Un GPA cumulatif combine tous les semestres en divisant tous les points de note obtenus au cours de la vie étudiante par tous les crédits obtenus au cours de la vie étudiante."
    ],
    "faqs": [
      {
        "question": "Qu'est-ce que l'échelle de GPA standard de 4.0 ?",
        "answer": "L'échelle standard de 4.0 correspond à : A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, et F = 0.0."
      },
      {
        "question": "Pourquoi les crédits de cours sont-ils inclus dans le calcul du GPA ?",
        "answer": "Les crédits de cours représentent la charge de travail et les heures d'enseignement hebdomadaires d'une matière. La pondération par les crédits garantit qu'un cours magistral important de 4 crédits a un impact plus significatif sur votre dossier académique qu'un laboratoire d'1 crédit."
      },
      {
        "question": "Comment puis-je améliorer mon GPA cumulatif ?",
        "answer": "Obtenir des notes élevées (A ou A-) dans les cours ayant un nombre de crédits plus important aura le plus grand impact positif sur votre GPA cumulatif global."
      },
      {
        "question": "Qu'est-ce qu'un bon GPA ?",
        "answer": "Un bon GPA se situe généralement entre 3.0 et 4.0 sur une échelle de 4.0. Un GPA de 3.5 ou plus est souvent considéré comme excellent et peut ouvrir des portes aux bourses d'études, aux programmes d'études supérieures et aux distinctions académiques. Cependant, ce qui est 'bon' peut varier selon l'établissement et le programme d'études."
      }
    ],
    "breadcrumbName": "Calculateur de GPA"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "fr",
    "name": "Calculateur de Notes",
    "category": "education",
    "badge": "Pondéré & Examen Final",
    "icon": "Award",
    "h1": "Calculateur de Notes",
    "seoTitle": "Calculateur de Notes – Calculateur de Moyenne Pondérée et d'Examen Final",
    "seoDescription": "Calculateur de notes en ligne gratuit. Calculez votre moyenne pondérée actuelle et déterminez la note nécessaire à l'examen final pour atteindre votre objectif de moyenne.",
    "primaryKeyword": "calculateur de notes",
    "secondaryKeywords": [
      "calculateur de note finale",
      "quelle note dois-je avoir",
      "calculateur de moyenne pondérée",
      "calculateur de notes de cours",
      "calculateur de note d'examen"
    ],
    "heroSubtitle": "Calculez vos moyennes pondérées actuelles et déterminez la note exacte nécessaire à l'examen final pour atteindre votre objectif de moyenne générale.",
    "about": [
      "Le Calculateur de Notes propose deux modes académiques essentiels : un Calculateur de Moyenne Pondérée pour combiner les devoirs, les quiz, les examens de mi-parcours et la participation, et un Calculateur d'Examen Final qui répond à la question : « Quelle note dois-je obtenir à l'examen final pour avoir un A (ou réussir) ? »",
      "Les enseignants et professeurs d'université notent fréquemment les cours en utilisant des pourcentages avec des pondérations de catégories attribuées (par exemple, Devoirs 20%, Partiels 30%, Examen Final 50%). Ce calculateur automatise le calcul de la distribution pondérée afin que vous puissiez planifier votre temps d'étude efficacement."
    ],
    "formula": {
      "title": "Formules de la Moyenne Pondérée et de l'Examen Final",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Multipliez chaque note obtenue par le pourcentage de pondération de sa catégorie. Pour trouver la note finale requise, isolez le pourcentage de pondération restant non complété par rapport à votre note cible.",
      "variables": [
        {
          "name": "Moyenne Actuelle",
          "desc": "Pourcentage moyen obtenu sur les travaux terminés"
        },
        {
          "name": "Note Cible",
          "desc": "Le pourcentage minimum souhaité pour le cours (par exemple, 90% pour un A, 70% pour un C)"
        },
        {
          "name": "Pondération Finale",
          "desc": "Pourcentage de la note globale du cours déterminé par l'examen final"
        }
      ]
    },
    "howToCalculate": [
      "Pour calculer la moyenne actuelle du cours : Saisissez les devoirs avec leurs notes (%) et leurs pondérations de catégorie respectives (%).",
      "Pour calculer ce dont vous avez besoin à l'examen final : Passez en « Mode Examen Final », saisissez votre Moyenne Actuelle, votre Note Cible et la Pondération de l'Examen Final.",
      "Cliquez sur Calculer pour voir la note requise à l'examen et si cette note est atteignable."
    ],
    "example": {
      "problem": "Vous avez actuellement 84% en Chimie. L'examen final compte pour 25% de votre note. Quelle note devez-vous obtenir à l'examen final pour terminer avec un A (90%) ?",
      "steps": [
        "Étape 1 : Pondération de la note actuelle = 100% - 25% = 75% (0.75).",
        "Étape 2 : Note cible = 90%. Contribution actuelle = 84% × 0.75 = 63%.",
        "Étape 3 : Points nécessaires de l'examen final : 90% - 63% = 27%.",
        "Étape 4 : Diviser par la pondération de l'examen final : 27% ÷ 0.25 = 108%."
      ],
      "result": "Vous avez besoin de 108% à l'examen final (ce qui nécessite des points bonus) pour obtenir une moyenne générale de 90% dans le cours."
    },
    "notes": [
      "Si la note finale requise est supérieure à 100%, la note cible est mathématiquement impossible sans points bonus ou ajustement de la courbe.",
      "Assurez-vous que toutes les pondérations de catégorie totalisent 100% pour un équilibre complet du programme.",
      "Différentes universités appliquent différentes barèmes de notes ; consultez votre programme pour les seuils spécifiques des lettres."
    ],
    "faqs": [
      {
        "question": "Comment calcule-t-on une moyenne pondérée ?",
        "answer": "Multipliez chaque catégorie de note par son pourcentage de pondération sous forme décimale, additionnez tous les produits résultants, puis divisez par la somme totale des pondérations."
      },
      {
        "question": "Que faire si mes pondérations ne totalisent pas 100% ?",
        "answer": "Le calculateur normalise automatiquement les pondérations saisies en divisant le total des points pondérés par la somme des pondérations entrées jusqu'à présent."
      },
      {
        "question": "Comment la note de l'examen final est-elle calculée ?",
        "answer": "Soustrayez les points de note que vous avez déjà obtenus de votre note cible pour le cours, puis divisez les points restants par le pourcentage de pondération de l'examen final."
      }
    ],
    "breadcrumbName": "Calculateur de Notes"
  }
};

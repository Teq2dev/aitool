/**
 * lib/calculators/seo/localized/en.js
 * Complete English SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_EN = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "en",
    "name": "Loan Calculator",
    "category": "financial",
    "badge": "Monthly Payment & Interest",
    "icon": "CreditCard",
    "h1": "Loan Calculator",
    "seoTitle": "Loan Calculator – Estimate Monthly Loan Payments and Total Interest",
    "seoDescription": "Free online loan calculator. Calculate monthly loan payments, total interest costs, and view principal repayment schedules for personal, auto, or business loans.",
    "primaryKeyword": "loan calculator",
    "secondaryKeywords": [
      "loan payment calculator",
      "monthly loan payment calculator",
      "interest calculator",
      "personal loan calculator",
      "auto loan calculator"
    ],
    "heroSubtitle": "Calculate monthly loan payments, total interest charges, and overall repayment costs with amortization schedules for personal, auto, and student loans.",
    "about": [
      "The Loan Calculator helps borrowers evaluate installment loan terms before committing to financing agreements with banks, credit unions, or online lenders. Installment loans—including auto financing, personal loans, and debt consolidation packages—are structured around an amortized repayment formula.",
      "By entering the principal loan balance, annual percentage interest rate (APR), and loan term length in months or years, the calculator computes your exact monthly installment payment, the total interest paid over the life of the loan, and the total repayment figure."
    ],
    "formula": {
      "title": "Standard Loan Amortization Formula",
      "formulaText": "Monthly Payment (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nTotal Repayment = Monthly Payment × n\nTotal Interest = Total Repayment - PV",
      "explanation": "PV is the initial loan principal, r is the periodic monthly interest rate (Annual Rate / 12 / 100), and n is the total number of monthly payments.",
      "variables": [
        {
          "name": "PV",
          "desc": "Present Value (Principal loan amount borrowed)"
        },
        {
          "name": "r",
          "desc": "Monthly interest rate: Annual Rate ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Total number of monthly payment periods"
        }
      ]
    },
    "howToCalculate": [
      "Enter the total Loan Amount (Principal) you plan to borrow.",
      "Enter the annual interest rate (APR percentage).",
      "Select the loan term duration (in years or months).",
      "Click Calculate to see your monthly payment, total interest cost, and principal-to-interest breakdown."
    ],
    "example": {
      "problem": "What is the monthly payment and total interest on a $25,000 car loan at 6.0% annual interest over a 5-year (60 months) term?",
      "steps": [
        "Step 1: Monthly interest rate r = 6% ÷ 1200 = 0.005.",
        "Step 2: Number of months n = 5 × 12 = 60 months.",
        "Step 3: Factor (1 + 0.005)⁶⁰ = 1.34885.",
        "Step 4: Monthly payment = [0.005 × 25,000 × 1.34885] ÷ [1.34885 - 1] = 168.606 ÷ 0.34885 = $483.32.",
        "Step 5: Total payments = $483.32 × 60 = $28,999.20. Total interest = $28,999.20 - $25,000 = $3,999.20."
      ],
      "result": "The monthly payment is $483.32, and the total interest paid over 5 years is $3,999.20."
    },
    "notes": [
      "Lenders may include origination fees, document fees, or credit insurance which slightly increase the Effective APR.",
      "Making additional principal prepayments significantly reduces overall interest and shortens loan payoff duration.",
      "Longer loan terms lower monthly payments but increase the cumulative interest paid."
    ],
    "faqs": [
      {
        "question": "How do lenders calculate monthly loan payments?",
        "answer": "Lenders use standard amortization formulas where each monthly payment is divided between interest (calculated on the remaining balance) and principal reduction."
      },
      {
        "question": "What is the difference between APR and interest rate?",
        "answer": "The interest rate is the basic annual cost of borrowing money, whereas the Annual Percentage Rate (APR) includes both the interest rate and any mandatory lender fees or points."
      },
      {
        "question": "How does a larger down payment affect a loan?",
        "answer": "A larger down payment lowers the principal borrowed, which immediately decreases both your monthly payment and total interest paid over time."
      }
    ],
    "breadcrumbName": "Loan Calculator"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "en",
    "name": "EMI Calculator",
    "category": "financial",
    "badge": "Equated Monthly Installment",
    "icon": "Calculator",
    "h1": "EMI Calculator",
    "seoTitle": "EMI Calculator – Calculate Equated Monthly Installments Online",
    "seoDescription": "Free online EMI calculator. Calculate equated monthly installments for home loans, car loans, and personal loans with interest breakdowns and repayment schedules.",
    "primaryKeyword": "EMI calculator",
    "secondaryKeywords": [
      "EMI calculator India",
      "monthly EMI calculator",
      "loan EMI calculator",
      "home loan EMI",
      "car loan EMI calculator"
    ],
    "heroSubtitle": "Calculate Equated Monthly Installments (EMI), total interest payable, and amortization schedules for home, personal, and vehicle loans.",
    "about": [
      "The Equated Monthly Installment (EMI) Calculator is a vital financial tool used across global and Indian banking systems to compute the fixed monthly payment amount owed to a lender on a specified calendar date each month.",
      "EMIs are structured so that during the initial months, a larger proportion of each installment goes towards interest payments; as the loan principal diminishes over time, a growing share of each payment reduces the remaining principal balance."
    ],
    "formula": {
      "title": "Equated Monthly Installment Formula",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal Payable = EMI × N\nTotal Interest = Total Payable - P",
      "explanation": "P is the principal loan sum, R is the monthly interest rate (Annual Rate / 12 / 100), and N is the tenure expressed in total months.",
      "variables": [
        {
          "name": "P",
          "desc": "Principal amount borrowed"
        },
        {
          "name": "R",
          "desc": "Monthly interest rate: Annual Rate ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Tenure in months (Years × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Enter the Principal loan amount.",
      "Enter the Annual Interest Rate percentage charged by the bank.",
      "Enter the Loan Tenure in years or months.",
      "Review your exact EMI, total interest amount, and monthly amortization table."
    ],
    "example": {
      "problem": "Calculate the EMI on a ₹10,00,000 personal loan at 10.5% interest for a tenure of 3 years (36 months).",
      "steps": [
        "Step 1: Principal P = 10,00,000. Tenure N = 36 months.",
        "Step 2: Monthly interest rate R = 10.5 ÷ 1200 = 0.00875.",
        "Step 3: (1 + R)³⁶ = (1.00875)³⁶ = 1.3686.",
        "Step 4: EMI = [10,00,000 × 0.00875 × 1.3686] ÷ [1.3686 - 1] = ₹32,502.44.",
        "Step 5: Total interest = (₹32,502.44 × 36) - ₹10,00,000 = ₹1,70,088."
      ],
      "result": "The monthly EMI is ₹32,502, and total interest payable over 3 years is ₹1,70,088."
    },
    "notes": [
      "Prepaying additional EMI installments directly reduces principal and drastically cuts long-term interest charges.",
      "Floating interest rates may alter EMI amounts or loan tenure duration over time.",
      "Processing fees and statutory taxes like GST on bank charges are billed separately by lenders."
    ],
    "faqs": [
      {
        "question": "What is an Equated Monthly Installment (EMI)?",
        "answer": "An EMI is a fixed monetary amount paid by a borrower to a financial lender on a specific date every month to pay off an amortized loan over a set period."
      },
      {
        "question": "Why is interest higher in early EMI payments?",
        "answer": "Because interest is calculated on the outstanding balance, which is highest at the beginning of the loan. As you pay down the principal balance, the monthly interest portion decreases."
      },
      {
        "question": "Can I lower my EMI?",
        "answer": "You can lower your monthly EMI by extending the loan tenure, negotiating a lower interest rate, or making an upfront prepayment towards principal."
      }
    ],
    "breadcrumbName": "EMI Calculator"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "en",
    "name": "Mortgage Calculator",
    "category": "financial",
    "badge": "Home Loan & Taxes",
    "icon": "Home",
    "h1": "Mortgage Calculator",
    "seoTitle": "Mortgage Calculator – Estimate Monthly Home Loan Payments",
    "seoDescription": "Free online mortgage calculator. Estimate total monthly housing costs including principal, interest, property taxes, home insurance, and down payments.",
    "primaryKeyword": "mortgage calculator",
    "secondaryKeywords": [
      "mortgage payment calculator",
      "home loan calculator",
      "monthly mortgage calculator",
      "house payment calculator",
      "real estate loan calculator"
    ],
    "heroSubtitle": "Estimate your monthly mortgage payments including principal, interest, property taxes, and homeowners insurance.",
    "about": [
      "The Mortgage Calculator provides a complete estimate of true monthly homeownership costs. A real estate mortgage payment rarely consists solely of principal and interest—lenders and escrow services routinely require property tax contributions and hazard insurance premiums.",
      "Enter the property purchase price, down payment percentage or dollar amount, interest rate, and term (e.g., 15 or 30 years) to estimate your monthly payment and lifetime financing costs."
    ],
    "formula": {
      "title": "Comprehensive Mortgage Cost Formula",
      "formulaText": "Total Monthly Payment = Principal & Interest (P&I) + Monthly Property Tax + Monthly Insurance + HOA\nLoan Principal = Home Purchase Price - Down Payment",
      "explanation": "P&I is calculated using the standard amortization formula on the net loan amount. Taxes and insurance are divided by 12 and summed for total monthly escrow liability.",
      "variables": [
        {
          "name": "Home Price",
          "desc": "Agreed purchase price of the residential property"
        },
        {
          "name": "Down Payment",
          "desc": "Upfront cash equity contributed at closing"
        },
        {
          "name": "P&I",
          "desc": "Base monthly debt service covering principal and interest"
        }
      ]
    },
    "howToCalculate": [
      "Enter the target Home Purchase Price.",
      "Enter your Down Payment (as a dollar amount or percentage).",
      "Specify the annual mortgage Interest Rate and Loan Term (typically 15 or 30 years).",
      "Optionally include annual Property Taxes and Homeowners Insurance.",
      "Click Calculate to see your complete monthly housing expense and total interest paid."
    ],
    "example": {
      "problem": "Estimate monthly payment for a $400,000 home with 20% down ($80,000) at 6.5% interest on a 30-year fixed loan, with $4,800/year taxes and $1,200/year insurance.",
      "steps": [
        "Step 1: Loan Principal = $400,000 - $80,000 = $320,000.",
        "Step 2: Monthly P&I on $320,000 at 6.5% for 30 years = $2,022.62.",
        "Step 3: Monthly Property Tax = $4,800 ÷ 12 = $400.00.",
        "Step 4: Monthly Insurance = $1,200 ÷ 12 = $100.00.",
        "Step 5: Total Monthly Payment = $2,022.62 + $400.00 + $100.00 = $2,522.62."
      ],
      "result": "The total estimated monthly housing payment is $2,522.62 (P&I: $2,022.62)."
    },
    "notes": [
      "Putting down less than 20% typically triggers Private Mortgage Insurance (PMI) until 20% equity is reached.",
      "A 15-year mortgage features higher monthly payments but saves tens of thousands in lifetime interest compared to a 30-year term.",
      "Property taxes fluctuate based on municipal assessments and local school district levies."
    ],
    "faqs": [
      {
        "question": "What is included in a monthly mortgage payment?",
        "answer": "A standard mortgage payment includes Principal, Interest, Property Taxes, and Homeowners Insurance (often referred to as PITI)."
      },
      {
        "question": "Why should I aim for a 20% down payment?",
        "answer": "Putting down at least 20% eliminates the requirement for Private Mortgage Insurance (PMI), lowers your interest rate, and reduces your monthly debt obligation."
      },
      {
        "question": "Should I choose a 15-year or 30-year mortgage?",
        "answer": "A 30-year term offers lower, more manageable monthly payments. A 15-year term features higher monthly payments but charges significantly less total interest over the life of the loan."
      }
    ],
    "breadcrumbName": "Mortgage Calculator"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "en",
    "name": "Compound Interest Calculator",
    "category": "financial",
    "badge": "Investment Growth",
    "icon": "TrendingUp",
    "h1": "Compound Interest Calculator",
    "seoTitle": "Compound Interest Calculator – Calculate Investment Growth Online",
    "seoDescription": "Free online compound interest calculator. Calculate future investment value, interest earned, and wealth accumulation with monthly or annual contributions.",
    "primaryKeyword": "compound interest calculator",
    "secondaryKeywords": [
      "compound interest calculator monthly",
      "investment calculator",
      "compound growth calculator",
      "future value calculator",
      "savings calculator"
    ],
    "heroSubtitle": "Calculate future wealth accumulation, compounding interest gains, and investment growth with regular monthly or annual contributions.",
    "about": [
      "The Compound Interest Calculator visualizes the power of exponential financial growth over time. Often described as the \"eighth wonder of the world,\" compound interest refers to earning interest not only on your initial deposit (principal), but also on accumulated interest from previous periods.",
      "This calculator enables you to model retirement accounts (such as 401(k)s and IRAs), index fund savings, and fixed deposits with customizable compounding frequencies (daily, monthly, quarterly, or annually) and recurring monthly contributions."
    ],
    "formula": {
      "title": "Compound Interest Formula with Regular Contributions",
      "formulaText": "Future Value (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nTotal Interest = Future Value - (P + PMT × Total Periods)",
      "explanation": "P is principal, r is annual nominal rate, n is compounding frequency, t is time in years, and PMT is periodic contribution.",
      "variables": [
        {
          "name": "P",
          "desc": "Initial principal balance"
        },
        {
          "name": "r",
          "desc": "Annual interest rate in decimal form"
        },
        {
          "name": "n",
          "desc": "Compounding periods per year (12 = monthly, 1 = annually)"
        },
        {
          "name": "PMT",
          "desc": "Periodic recurring cash contribution"
        }
      ]
    },
    "howToCalculate": [
      "Enter your starting Principal investment balance.",
      "Specify the projected Annual Interest Rate percentage.",
      "Enter the investment Time Horizon in years.",
      "Optionally specify a recurring Monthly Contribution amount.",
      "Click Calculate to see future portfolio value, total interest earned, and yearly growth trajectories."
    ],
    "example": {
      "problem": "Invest $10,000 at an 8% annual return compounded monthly for 20 years with $200 added each month.",
      "steps": [
        "Step 1: Initial $10,000 grows to: $10,000 × (1 + 0.08/12)²⁴⁰ = $49,268.03.",
        "Step 2: $200 monthly contributions grow to: $200 × [((1 + 0.08/12)²⁴⁰ - 1) / (0.08/12)] = $117,804.09.",
        "Step 3: Total future portfolio value = $49,268.03 + $117,804.09 = $167,072.12.",
        "Step 4: Total cash deposited = $10,000 + ($200 × 240) = $58,000. Total interest earned = $109,072.12."
      ],
      "result": "The portfolio grows to $167,072.12 with $109,072.12 generated purely from compound interest."
    },
    "notes": [
      "Time is the greatest factor in compounding: doubling the timeline often more than triples investment returns.",
      "Historically, broad stock market index funds (like the S&P 500) have averaged ~10% annual nominal returns before inflation.",
      "Real wealth growth should factor in long-term inflation (~2-3% annually)."
    ],
    "faqs": [
      {
        "question": "What is compound interest?",
        "answer": "Compound interest is interest calculated on the initial principal balance and also on the accumulated interest of previous periods, creating compounding exponential growth."
      },
      {
        "question": "How often does interest compound in savings accounts?",
        "answer": "Most modern high-yield savings accounts compound interest daily and credit it to your balance at the end of each month."
      },
      {
        "question": "What is the Rule of 72?",
        "answer": "The Rule of 72 estimates how many years it will take to double your money: divide 72 by your annual interest rate (e.g., at 8%, money doubles in ~9 years)."
      }
    ],
    "breadcrumbName": "Compound Interest Calculator"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "en",
    "name": "Simple Interest Calculator",
    "category": "financial",
    "badge": "Linear Interest",
    "icon": "PiggyBank",
    "h1": "Simple Interest Calculator",
    "seoTitle": "Simple Interest Calculator – Calculate Simple Interest & Maturity Value",
    "seoDescription": "Free online simple interest calculator. Calculate simple interest and total maturity amount using the classic I = P × R × T formula for loans and notes.",
    "primaryKeyword": "simple interest calculator",
    "secondaryKeywords": [
      "simple interest formula",
      "calculate simple interest",
      "simple interest loan",
      "maturity value calculator",
      "I = PRT"
    ],
    "heroSubtitle": "Calculate simple interest earnings and total maturity values using the foundational formula I = P × R × T.",
    "about": [
      "The Simple Interest Calculator computes linear interest on debt notes, short-term promissory loans, certificates of deposit, and academic financial problems. Unlike compound interest, simple interest does not earn interest upon interest—the charge is assessed strictly on the original principal sum.",
      "This calculation is commonly utilized in short-term peer-to-peer loans, pawn shop transactions, auto installment finance structures, and consumer electronics installment plans."
    ],
    "formula": {
      "title": "Simple Interest Formula",
      "formulaText": "Interest (I) = (Principal × Rate × Time) / 100\nTotal Maturity Amount (A) = Principal + Interest",
      "explanation": "Multiply the original principal by the annual percentage rate and time duration in years, then divide by 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Principal original sum invested or borrowed"
        },
        {
          "name": "R",
          "desc": "Annual interest rate percentage"
        },
        {
          "name": "T",
          "desc": "Time horizon in years"
        }
      ]
    },
    "howToCalculate": [
      "Enter the starting Principal amount.",
      "Enter the Annual Interest Rate percentage.",
      "Enter the duration or Loan Tenure in years.",
      "Click Calculate to see the simple interest generated and the total repayment or maturity sum."
    ],
    "example": {
      "problem": "Calculate the simple interest on a $5,000 personal note at 5.5% annual interest over 3 years.",
      "steps": [
        "Step 1: Identify variables: P = 5,000, R = 5.5, T = 3.",
        "Step 2: Compute interest: I = (5,000 × 5.5 × 3) ÷ 100 = 82,500 ÷ 100 = $825.00.",
        "Step 3: Total amount: $5,000 + $825 = $5,825.00."
      ],
      "result": "The simple interest earned is $825.00, giving a total maturity amount of $5,825.00."
    },
    "notes": [
      "If time is given in months, divide by 12 (e.g., 6 months = 0.5 years). If given in days, divide by 365.",
      "Simple interest yields less total money than compound interest over identical time horizons.",
      "Simple interest formulas are the benchmark in commercial paper and Treasury Bills."
    ],
    "faqs": [
      {
        "question": "What is the formula for simple interest?",
        "answer": "The formula is I = P × R × T / 100, where I is Interest, P is Principal, R is the annual interest rate, and T is time in years."
      },
      {
        "question": "How does simple interest differ from compound interest?",
        "answer": "Simple interest is calculated exclusively on the original principal balance. Compound interest is calculated on both the principal and previously accumulated interest."
      },
      {
        "question": "When is simple interest used?",
        "answer": "Simple interest is typically used for short-term personal loans, automobile financing, student loan interest accrual during grace periods, and commercial paper."
      }
    ],
    "breadcrumbName": "Simple Interest Calculator"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "en",
    "name": "GST Calculator",
    "category": "financial",
    "badge": "Goods & Services Tax",
    "icon": "Receipt",
    "h1": "GST Calculator",
    "seoTitle": "GST Calculator – Calculate GST Inclusive & Exclusive Amounts",
    "seoDescription": "Free online GST calculator. Calculate GST inclusive and GST exclusive prices, tax breakdown (CGST/SGST), and net amounts for standard rates (5%, 12%, 18%, 28%).",
    "primaryKeyword": "GST calculator",
    "secondaryKeywords": [
      "GST calculator India",
      "GST calculation",
      "calculate GST",
      "GST inclusive calculator",
      "GST exclusive calculator",
      "reverse GST calculator"
    ],
    "heroSubtitle": "Calculate Goods and Services Tax (GST) for inclusive and exclusive transactions, split CGST and SGST, and determine net invoice prices.",
    "about": [
      "The Goods and Services Tax (GST) Calculator automates tax invoicing for business owners, freelance contractors, accountants, and retail consumers. GST is a comprehensive destination-based value-added tax applied to the manufacture, sale, and consumption of goods and services.",
      "This tool supports two standard commercial modes: GST Exclusive (adding tax to a base price) and GST Inclusive (reverse-calculating the pre-tax base price and exact tax portion from a gross retail sticker price). Select from standard GST brackets (such as 5%, 12%, 18%, 28%) or enter custom rates."
    ],
    "formula": {
      "title": "GST Inclusive & Exclusive Formulas",
      "formulaText": "GST Exclusive (Add GST):\nGST Amount = Base Price × (GST Rate / 100)\nFinal Price = Base Price + GST Amount\n\nGST Inclusive (Remove GST):\nBase Price = Gross Amount / (1 + GST Rate / 100)\nGST Amount = Gross Amount - Base Price",
      "explanation": "To add GST, multiply base amount by rate. To extract GST from a total, divide the gross sum by 1 plus the decimal rate.",
      "variables": [
        {
          "name": "Base Price",
          "desc": "Pre-tax net price of the product or service"
        },
        {
          "name": "GST Rate",
          "desc": "Applicable statutory tax percentage bracket"
        },
        {
          "name": "CGST / SGST",
          "desc": "Central and State GST components (each equals 50% of total GST in India)"
        }
      ]
    },
    "howToCalculate": [
      "Enter the transaction Amount.",
      "Select whether the price is GST Exclusive (add tax) or GST Inclusive (remove tax).",
      "Select a standard tax rate (e.g., 5%, 12%, 18%, 28%) or enter a custom rate.",
      "Click Calculate to see the pre-tax base price, GST tax portion, CGST/SGST split, and final invoice price."
    ],
    "example": {
      "problem": "Calculate the pre-tax cost and tax amount of an item selling for ₹1,180 with an 18% inclusive GST rate.",
      "steps": [
        "Step 1: Base Price = ₹1,180 ÷ (1 + 0.18) = ₹1,180 ÷ 1.18 = ₹1,000.00.",
        "Step 2: Total GST = ₹1,180 - ₹1,000 = ₹180.00.",
        "Step 3: CGST (9%) = ₹90.00, and SGST (9%) = ₹90.00."
      ],
      "result": "The net base price is ₹1,000.00 and the GST tax charged is ₹180.00."
    },
    "notes": [
      "For intrastate transactions in India, GST is divided equally between CGST (Central GST) and SGST (State GST).",
      "For interstate sales across state boundaries, the entire tax is designated as IGST (Integrated GST).",
      "Selectable standard GST rates include 0%, 5%, 12%, 18%, and 28%."
    ],
    "faqs": [
      {
        "question": "How do you calculate GST inclusive price?",
        "answer": "Divide the total inclusive price by (1 + GST Rate / 100). For an 18% GST rate, divide the total price by 1.18 to determine the base price before tax."
      },
      {
        "question": "What is the difference between GST inclusive and exclusive?",
        "answer": "GST Exclusive means tax is not yet added to the price. GST Inclusive means the listed price already incorporates the tax."
      },
      {
        "question": "What are CGST, SGST, and IGST?",
        "answer": "In India, CGST goes to the central government, SGST goes to the state government for local sales, and IGST applies to sales across state lines."
      }
    ],
    "breadcrumbName": "GST Calculator"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "en",
    "name": "Tax Calculator",
    "category": "financial",
    "badge": "Income & Deductions",
    "icon": "Scale",
    "h1": "Tax Calculator",
    "seoTitle": "Tax Calculator – Estimate Income Tax & Take-Home Pay",
    "seoDescription": "Free online income tax calculator. Estimate your taxable income, federal income tax brackets, effective tax rate, and monthly take-home salary.",
    "primaryKeyword": "tax calculator",
    "secondaryKeywords": [
      "income tax calculator",
      "tax estimate calculator",
      "calculate income tax",
      "take home pay calculator",
      "effective tax rate calculator"
    ],
    "heroSubtitle": "Estimate your taxable income, income tax liability, effective tax rate, and monthly take-home pay.",
    "about": [
      "The Income Tax Calculator provides a generic progressive taxation estimator to help wage earners and self-employed professionals project their annual tax liability and net take-home earnings. Progressive tax systems apply higher tax percentages only to portions of income exceeding specified bracket thresholds.",
      "Enter your gross annual income and allowable deductions (such as standard deductions, retirement contributions, or healthcare accounts) to view estimated tax liabilities, marginal vs. effective tax rates, and monthly net pay."
    ],
    "formula": {
      "title": "Progressive Income Tax Framework",
      "formulaText": "Taxable Income = Gross Annual Income - Deductions\nTax = ∑ (Taxable Income in Bracket × Bracket Rate)\nEffective Tax Rate = (Total Tax / Gross Income) × 100\nTake-Home Pay = Gross Income - Total Tax",
      "explanation": "Deductions lower your taxable baseline. Tax brackets apply incrementally—income is not taxed at a single flat maximum rate.",
      "variables": [
        {
          "name": "Gross Income",
          "desc": "Total pre-tax earnings from employment or business"
        },
        {
          "name": "Deductions",
          "desc": "Allowable standard deductions or pre-tax exemptions"
        },
        {
          "name": "Effective Rate",
          "desc": "The actual blended average percentage of income paid in tax"
        }
      ]
    },
    "howToCalculate": [
      "Enter your total Annual Gross Income.",
      "Enter your estimated annual Deductions (such as the standard deduction or retirement savings).",
      "Click Calculate to see your estimated taxable income, tax liability, effective tax rate, and monthly net take-home salary."
    ],
    "example": {
      "problem": "Estimate the tax for an individual earning $85,000 with a $14,600 standard deduction.",
      "steps": [
        "Step 1: Taxable Income = $85,000 - $14,600 = $70,400.",
        "Step 2: 10% on first $11,600 = $1,160.00.",
        "Step 3: 12% on ($47,150 - $11,600 = $35,550) = $4,266.00.",
        "Step 4: 22% on remaining ($70,400 - $47,150 = $23,250) = $5,115.00.",
        "Step 5: Total estimated tax = $1,160 + $4,266 + $5,115 = $10,541.00.",
        "Step 6: Effective tax rate = ($10,541 ÷ $85,000) × 100 = 12.40%."
      ],
      "result": "The estimated income tax is $10,541.00 with an effective rate of 12.40% and take-home pay of $74,459.00."
    },
    "notes": [
      "This tool provides generic informational estimates and does not replace official advice from a certified CPA or tax professional.",
      "State, provincial, municipal taxes, and social security/FICA payroll contributions are calculated separately.",
      "Marginal tax rate refers to the rate paid on your last dollar earned; effective tax rate is your actual blended average tax burden."
    ],
    "faqs": [
      {
        "question": "What is the difference between marginal and effective tax rates?",
        "answer": "Your marginal tax rate is the highest tax bracket applied to your top dollar of income. Your effective tax rate is the actual overall percentage of your total income paid in tax."
      },
      {
        "question": "How do deductions lower my tax bill?",
        "answer": "Deductions reduce your taxable income. For example, a $10,000 deduction for someone in a 22% tax bracket reduces actual tax owed by $2,200."
      },
      {
        "question": "Does this calculator include state income taxes?",
        "answer": "This model calculates standard progressive brackets. State and local taxes vary by jurisdiction and should be factored in additionally."
      }
    ],
    "breadcrumbName": "Tax Calculator"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "en",
    "name": "Discount Calculator",
    "category": "financial",
    "badge": "Sales & Savings",
    "icon": "Tag",
    "h1": "Discount Calculator",
    "seoTitle": "Discount Calculator – Calculate Sale Price and Percentage Off",
    "seoDescription": "Free online discount calculator. Calculate final sale prices, money saved, and percentage discounts instantly with optional sales tax calculations.",
    "primaryKeyword": "discount calculator",
    "secondaryKeywords": [
      "percentage discount calculator",
      "sale price calculator",
      "discount percentage calculator",
      "how much do I save",
      "reverse discount calculator"
    ],
    "heroSubtitle": "Calculate discounted sale prices, total dollars saved, and final costs with sales tax for shopping and retail promotions.",
    "about": [
      "The Discount Calculator helps shoppers and retail merchants quickly calculate price reductions during sales events (such as Black Friday, Cyber Monday, seasonal clearances, and promotional coupons).",
      "Enter the original price and the advertised percentage off to immediately see how much cash you save, the discounted price, and the final checkout cost after local sales tax is applied."
    ],
    "formula": {
      "title": "Discount & Final Sale Price Formulas",
      "formulaText": "Savings Amount = Original Price × (Discount % / 100)\nDiscounted Price = Original Price - Savings Amount\nFinal Price with Tax = Discounted Price + (Discounted Price × Tax % / 100)",
      "explanation": "Multiply the sticker price by the discount percentage to find savings, then subtract that amount from the original price.",
      "variables": [
        {
          "name": "Original Price",
          "desc": "Pre-sale manufacturer or retail sticker price"
        },
        {
          "name": "Discount %",
          "desc": "Advertised price reduction percentage"
        },
        {
          "name": "Sales Tax %",
          "desc": "Optional state or local sales tax rate"
        }
      ]
    },
    "howToCalculate": [
      "Enter the Original Sticker Price.",
      "Enter the Discount Percentage (e.g., 20% or 35% off).",
      "Optionally enter your local Sales Tax percentage.",
      "Click Calculate to see your exact dollar savings and the final price."
    ],
    "example": {
      "problem": "A winter jacket priced at $180 is on sale for 30% off, with an 8% local sales tax.",
      "steps": [
        "Step 1: Savings = $180 × 0.30 = $54.00.",
        "Step 2: Discounted price = $180 - $54.00 = $126.00.",
        "Step 3: Sales tax = $126.00 × 0.08 = $10.08.",
        "Step 4: Final checkout price = $126.00 + $10.08 = $136.08."
      ],
      "result": "You save $54.00. The jacket costs $126.00 before tax and $136.08 after tax."
    },
    "notes": [
      "A 50% discount means you pay half the original price.",
      "Stacking discounts (e.g., 20% off plus an extra 10% off) is not 30% off—the second discount applies to the already discounted subtotal.",
      "Sales tax is assessed on the final discounted price, not the original sticker price."
    ],
    "faqs": [
      {
        "question": "How do you calculate a 20% discount on an item?",
        "answer": "Multiply the price by 0.20 to find what you save, or multiply the price by 0.80 to directly find the final sale price."
      },
      {
        "question": "How does a \"buy one, get one 50% off\" deal work in percentage terms?",
        "answer": "If two equally priced items are purchased, a BOGO 50% discount equates to an overall 25% discount across both items."
      },
      {
        "question": "How do I calculate the original price from a sale price?",
        "answer": "Divide the sale price by (1 - Discount % / 100). For example, if an item costs $80 after a 20% discount: $80 / 0.80 = $100 original price."
      }
    ],
    "breadcrumbName": "Discount Calculator"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "en",
    "name": "Profit Margin Calculator",
    "category": "financial",
    "badge": "Margin vs Markup",
    "icon": "BarChart3",
    "h1": "Profit Margin Calculator",
    "seoTitle": "Profit Margin Calculator – Calculate Gross Margin & Markup Online",
    "seoDescription": "Free online profit margin calculator. Calculate gross profit, profit margin percentage, and markup percentage from item cost and selling price.",
    "primaryKeyword": "profit margin calculator",
    "secondaryKeywords": [
      "profit calculator",
      "margin calculator",
      "markup calculator",
      "gross profit margin",
      "margin vs markup"
    ],
    "heroSubtitle": "Calculate gross profit, profit margin percentage, and retail markup percentage to price products profitably.",
    "about": [
      "The Profit Margin Calculator helps entrepreneurs, retailers, dropshippers, and small business owners accurately determine profitability and distinguish between Margin and Markup. Confusing these two metrics is one of the most common pricing mistakes in commerce.",
      "Gross Profit Margin indicates what percentage of total revenue is retained after accounting for the Cost of Goods Sold (COGS). Markup reflects the percentage increase applied over the baseline cost to establish the retail selling price."
    ],
    "formula": {
      "title": "Gross Margin and Markup Formulas",
      "formulaText": "Gross Profit = Revenue - Cost\nProfit Margin (%) = (Gross Profit / Revenue) × 100\nMarkup (%) = (Gross Profit / Cost) × 100",
      "explanation": "Margin is calculated relative to revenue (selling price), whereas markup is calculated relative to product cost.",
      "variables": [
        {
          "name": "Cost",
          "desc": "Cost of Goods Sold (COGS) to acquire or produce the unit"
        },
        {
          "name": "Revenue",
          "desc": "Selling price charged to the consumer"
        },
        {
          "name": "Gross Profit",
          "desc": "Net revenue remaining after deducting direct production cost"
        }
      ]
    },
    "howToCalculate": [
      "Enter the Cost to acquire or produce the product (e.g., $40).",
      "Enter the Revenue or target Selling Price (e.g., $100).",
      "Click Calculate to see gross profit dollars, profit margin percentage, and required markup percentage."
    ],
    "example": {
      "problem": "A business buys an item for $50 and sells it for $80. What are the gross profit, profit margin, and markup?",
      "steps": [
        "Step 1: Gross Profit = $80 (Revenue) - $50 (Cost) = $30.00.",
        "Step 2: Profit Margin = ($30 ÷ $80) × 100 = 37.5%.",
        "Step 3: Markup = ($30 ÷ $50) × 100 = 60.0%."
      ],
      "result": "Gross profit is $30.00. The profit margin is 37.5%, and the markup is 60.0%."
    },
    "notes": [
      "Margin can never exceed 100%, whereas markup can be 200%, 500%, or higher.",
      "A 50% markup corresponds to a 33.3% margin. A 100% markup corresponds to a 50% margin.",
      "Net profit margin deducts overhead, marketing, and taxes in addition to direct production costs."
    ],
    "faqs": [
      {
        "question": "What is the key difference between margin and markup?",
        "answer": "Margin is profit divided by selling price (revenue). Markup is profit divided by cost. Margin measures what you keep from sales; markup measures what you add to costs."
      },
      {
        "question": "Why is markup always higher than margin for the same item?",
        "answer": "Because cost is always smaller than selling price for profitable goods. Dividing the same profit dollar by the smaller cost yields a higher percentage than dividing by revenue."
      },
      {
        "question": "What is a good profit margin for retail businesses?",
        "answer": "A healthy gross profit margin typically ranges from 40% to 60% for retail and e-commerce, while net profit margins typically range from 10% to 20%."
      }
    ],
    "breadcrumbName": "Profit Margin Calculator"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "en",
    "name": "Salary Calculator",
    "category": "financial",
    "badge": "Hourly, Monthly & Annual",
    "icon": "Wallet",
    "h1": "Salary Calculator",
    "seoTitle": "Salary Calculator – Convert Hourly, Weekly, Monthly & Annual Pay",
    "seoDescription": "Free online salary calculator. Convert between hourly wage, weekly pay, bi-weekly salary, monthly income, and annual compensation with customized work hours.",
    "primaryKeyword": "salary calculator",
    "secondaryKeywords": [
      "annual salary calculator",
      "monthly salary calculator",
      "hourly salary calculator",
      "hourly to salary",
      "wage calculator"
    ],
    "heroSubtitle": "Convert compensation between annual salary, monthly pay, bi-weekly checks, and hourly wage rates.",
    "about": [
      "The Salary Calculator converts employment compensation across all standard payroll frequencies: annual salary, monthly earnings, bi-weekly paychecks, weekly wages, daily rates, and hourly pay.",
      "Whether you are negotiating a job offer, converting a $30/hour contractor rate to an annual equivalent, or budgeting monthly living expenses, this calculator provides instant, standardized payroll conversions based on your weekly working hours."
    ],
    "formula": {
      "title": "Standard Salary Conversion Standards",
      "formulaText": "Annual Salary = Hourly Wage × Hours/Week × Weeks/Year\nMonthly Salary = Annual Salary / 12\nBi-Weekly Pay = Annual Salary / 26\nWeekly Pay = Annual Salary / 52\nHourly Wage = Annual Salary / (Hours/Week × Weeks/Year)",
      "explanation": "Based on a standard 40-hour work week and 52 work weeks per year (2,080 annual working hours).",
      "variables": [
        {
          "name": "Standard Hours",
          "desc": "40 hours per week"
        },
        {
          "name": "Standard Weeks",
          "desc": "52 weeks per calendar year (2,080 working hours total)"
        }
      ]
    },
    "howToCalculate": [
      "Enter your Compensation Amount.",
      "Select the pay frequency: Annual, Monthly, Bi-Weekly, Weekly, Daily, or Hourly.",
      "Adjust working hours per week (default 40) or working weeks per year (default 52).",
      "Click Calculate to see a complete conversion chart across all pay periods."
    ],
    "example": {
      "problem": "Convert an annual salary of $75,000 to monthly, bi-weekly, weekly, and hourly pay (40 hours/week, 52 weeks).",
      "steps": [
        "Step 1: Monthly Pay = $75,000 ÷ 12 = $6,250.00.",
        "Step 2: Bi-Weekly Pay (26 pay periods) = $75,000 ÷ 26 = $2,884.62.",
        "Step 3: Weekly Pay = $75,000 ÷ 52 = $1,442.31.",
        "Step 4: Hourly Wage = $75,000 ÷ 2,080 hours = $36.06/hour."
      ],
      "result": "A $75,000 salary equals $6,250/month, $2,884.62 bi-weekly, and $36.06 per hour."
    },
    "notes": [
      "Calculations reflect gross pre-tax income prior to federal, state, and statutory benefits withholdings.",
      "Bi-weekly pay occurs 26 times per year (resulting in two months per year having three paychecks). Semi-monthly pay occurs 24 times per year.",
      "For freelance contractors, factor in self-employment taxes and unpaid vacation weeks."
    ],
    "faqs": [
      {
        "question": "How do you convert hourly wage to annual salary?",
        "answer": "Multiply your hourly wage by the hours worked per week, then multiply by 52 weeks. For a full-time 40-hour schedule, multiply hourly rate by 2,080."
      },
      {
        "question": "What is the difference between bi-weekly and semi-monthly pay?",
        "answer": "Bi-weekly pay occurs every two weeks (26 paychecks/year). Semi-monthly pay occurs twice a month on specific dates like the 1st and 15th (24 paychecks/year)."
      },
      {
        "question": "How many work hours are in a standard working year?",
        "answer": "A standard full-time employee working 40 hours per week for 52 weeks works 2,080 total hours per year."
      }
    ],
    "breadcrumbName": "Salary Calculator"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "en",
    "name": "Currency Calculator",
    "category": "financial",
    "badge": "Exchange Rates & Forex",
    "icon": "Coins",
    "h1": "Currency Calculator",
    "seoTitle": "Currency Calculator – Foreign Exchange Converter & Live Rates",
    "seoDescription": "Free online currency calculator. Convert between USD, EUR, GBP, INR, CAD, AUD, JPY, and major global currencies with interbank exchange rates.",
    "primaryKeyword": "currency calculator",
    "secondaryKeywords": [
      "currency converter",
      "exchange rate calculator",
      "USD to INR calculator",
      "EUR to USD calculator",
      "foreign exchange calculator"
    ],
    "heroSubtitle": "Convert amounts across global currencies with transparent benchmark interbank exchange rates.",
    "about": [
      "The Currency Calculator provides reliable foreign exchange conversions across major global currencies, including the US Dollar (USD), Euro (EUR), British Pound (GBP), Indian Rupee (INR), Canadian Dollar (CAD), Australian Dollar (AUD), Japanese Yen (JPY), and Swiss Franc (CHF).",
      "Whether you are budgeting overseas travel, converting international freelance invoices, or comparing international e-commerce pricing, this tool converts values using standard mid-market interbank benchmark rates."
    ],
    "formula": {
      "title": "Currency Exchange Rate Conversion",
      "formulaText": "Target Amount = Base Amount × Direct Exchange Rate (From Currency ⟶ To Currency)\nInverse Rate = 1 / Direct Exchange Rate",
      "explanation": "Converts source currency into USD baseline equivalent, then scales by target currency exchange rate multiplier.",
      "variables": [
        {
          "name": "Base Amount",
          "desc": "The monetary quantity to convert"
        },
        {
          "name": "Direct Rate",
          "desc": "The price of one unit of source currency in terms of target currency"
        },
        {
          "name": "Inverse Rate",
          "desc": "The reciprocal price of target currency in terms of source currency"
        }
      ]
    },
    "howToCalculate": [
      "Enter the monetary Amount to convert.",
      "Select the Source Currency (e.g., USD, EUR, GBP).",
      "Select the Destination Currency (e.g., INR, CAD, AUD).",
      "Click Calculate to see the converted amount, current benchmark exchange rate, and reverse conversion rate."
    ],
    "example": {
      "problem": "Convert $500 USD to Euros (EUR) at an illustrative reference exchange rate of 1 USD = 0.8950 EUR.",
      "steps": [
        "Step 1: Base Amount = 500 USD.",
        "Step 2: Multiply by exchange rate: 500 × 0.8950 = 447.50 EUR.",
        "Step 3: Inverse rate = 1 ÷ 0.8950 = 1.1173 USD per 1 EUR."
      ],
      "result": "$500 USD converts to 447.50 EUR at an illustrative reference exchange rate of 0.8950."
    },
    "notes": [
      "Exchange rates reflect interbank mid-market rates; consumer banks and retail cards may charge an additional 1.5% to 3.5% foreign transaction fee.",
      "Exchange rates fluctuate continuously during open global forex trading hours.",
      "Benchmark rates are updated regularly against interbank reference feeds."
    ],
    "faqs": [
      {
        "question": "What is the mid-market exchange rate?",
        "answer": "The mid-market rate is the midpoint between global buy and sell rates on forex markets. It represents the fairest, un-marked-up rate."
      },
      {
        "question": "Why do retail exchange rates differ from online converters?",
        "answer": "Commercial banks and airport currency exchange booths apply a markup spread or commission fee to profit on currency conversion transactions."
      },
      {
        "question": "Can I calculate the reverse conversion rate?",
        "answer": "Yes. The calculator displays the reciprocal inverse rate (e.g., 1 INR = 0.012 USD) alongside the primary conversion result."
      }
    ],
    "breadcrumbName": "Currency Calculator"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "en",
    "name": "Percentage Calculator",
    "category": "math",
    "badge": "Quick Math Tool",
    "icon": "Percent",
    "h1": "Percentage Calculator",
    "seoTitle": "Percentage Calculator – Calculate Percentages Easily Online",
    "seoDescription": "Free online percentage calculator. Calculate percentage of a number, percentage change, increase, decrease, and percentage differences instantly with formulas.",
    "primaryKeyword": "percentage calculator",
    "secondaryKeywords": [
      "calculate percentage",
      "percent calculator",
      "percentage increase calculator",
      "percentage decrease calculator",
      "percentage difference"
    ],
    "heroSubtitle": "Calculate percentages of values, percentage increase and decrease, or find what percent one number is of another with instant mathematical precision.",
    "about": [
      "The Percentage Calculator is a versatile online tool designed for students, shoppers, accountants, and analysts who need fast, error-free percentage computations. Percentages represent fractions of 100 and form the backbone of everyday quantitative tasks—from calculating sales discounts and retail markups to analyzing financial investment returns and exam test scores.",
      "This tool supports four essential calculation modes: finding a percentage of a total, calculating what percentage one number represents of another, computing the percentage increase or decrease between two numbers, and determining the relative percentage difference between two independent values."
    ],
    "formula": {
      "title": "Standard Percentage Formulas",
      "formulaText": "Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100",
      "explanation": "To compute what fraction of a whole a quantity represents, divide the part by the total and multiply by 100. For percentage changes, divide the absolute increase or decrease by the baseline starting value.",
      "variables": [
        {
          "name": "Part",
          "desc": "The portion or subset value being evaluated"
        },
        {
          "name": "Whole",
          "desc": "The base or total reference quantity"
        },
        {
          "name": "Old Value",
          "desc": "The original baseline quantity before change"
        },
        {
          "name": "New Value",
          "desc": "The updated quantity after change"
        }
      ]
    },
    "howToCalculate": [
      "Select the percentage calculation mode matching your question (e.g., \"What is X% of Y\" or \"Percentage Change\").",
      "Enter your known numerical values into the provided input fields.",
      "View the real-time calculated result, formatted formula, and fractional breakdown below.",
      "Use the Copy button to quickly export your result or Reset to perform a new calculation."
    ],
    "example": {
      "problem": "What is 15% of $240, and what is the percentage increase from $200 to $250?",
      "steps": [
        "Step 1 (Percentage of value): (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Step 2 (Percentage increase): Difference = 250 - 200 = 50.",
        "Step 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% increase."
      ],
      "result": "15% of 240 is 36. An increase from 200 to 250 is a 25% gain."
    },
    "notes": [
      "Percentage change always divides by the original starting number, not the final number.",
      "A percentage increase followed by an equivalent percentage decrease does not return to the original value (e.g., +50% then -50% yields 75% of baseline).",
      "To convert a decimal to a percentage, multiply by 100 (e.g., 0.85 = 85%). To convert a percentage to a decimal, divide by 100."
    ],
    "faqs": [
      {
        "question": "How do I calculate a percentage of a number?",
        "answer": "To calculate a percentage of a number, convert the percentage into a decimal by dividing it by 100, then multiply that decimal by the total number. For example, 20% of 150 is (20 / 100) × 150 = 30."
      },
      {
        "question": "How do I calculate percentage increase between two numbers?",
        "answer": "Subtract the original value from the new value to find the difference. Then divide that difference by the original value and multiply by 100. For instance, from 50 to 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% increase."
      },
      {
        "question": "What is the difference between percentage change and percentage difference?",
        "answer": "Percentage change is used when there is an \"old\" and \"new\" value over time, dividing by the initial value. Percentage difference is used when comparing two concurrent values where neither is the benchmark, dividing the absolute difference by their average."
      },
      {
        "question": "Can percentage change be negative?",
        "answer": "Yes. If the final value is smaller than the initial value, the percentage change is negative, representing a percentage decrease."
      }
    ],
    "breadcrumbName": "Percentage Calculator"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "en",
    "name": "Ratio Calculator",
    "category": "math",
    "badge": "Proportion & Simplification",
    "icon": "Divide",
    "h1": "Ratio Calculator",
    "seoTitle": "Ratio Calculator – Simplify and Solve Ratios Online",
    "seoDescription": "Free online ratio calculator. Simplify ratios to lowest terms, find missing terms in proportions (A:B = C:D), and calculate scaling factors instantly.",
    "primaryKeyword": "ratio calculator",
    "secondaryKeywords": [
      "ratio simplifier",
      "simplify ratios",
      "equivalent ratio calculator",
      "solve proportion",
      "aspect ratio calculator"
    ],
    "heroSubtitle": "Simplify two-part ratios to simplest integers, generate equivalent fractions, and solve for missing proportion variables instantly.",
    "about": [
      "The Ratio Calculator enables you to simplify ratios to their lowest whole number terms, convert decimal ratios to clean integer proportions, and solve equivalent proportion equations of the form A : B = C : D.",
      "Ratios express the relative size of two or more quantities. They are ubiquitous in recipe scaling, graphic design aspect ratios (such as 16:9 and 4:3), financial balance sheet metrics (current ratio, debt-to-equity), and chemistry solution mixtures."
    ],
    "formula": {
      "title": "Ratio Simplification & Proportion Formulas",
      "formulaText": "Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C",
      "explanation": "To simplify a ratio, divide both terms by their Greatest Common Divisor (GCD). In proportions, cross-multiplication allows solving for any single missing variable.",
      "variables": [
        {
          "name": "A & B",
          "desc": "First antecedent and consequent of the ratio"
        },
        {
          "name": "C & D",
          "desc": "Second antecedent and consequent of the equivalent proportion"
        },
        {
          "name": "GCD",
          "desc": "Greatest Common Divisor between the numbers"
        }
      ]
    },
    "howToCalculate": [
      "To simplify a ratio, input numbers A and B and view the irreducible integer proportion.",
      "To solve a proportion A:B = C:D, enter any three known values and leave the target field empty.",
      "The calculator executes cross-multiplication and reduces terms instantaneously."
    ],
    "example": {
      "problem": "Simplify the ratio 24 : 36, and solve for X in 4 : 5 = X : 25.",
      "steps": [
        "Step 1 (Simplification): Find GCD(24, 36) = 12.",
        "Step 2: 24 ÷ 12 = 2, and 36 ÷ 12 = 3. Simplified ratio is 2 : 3.",
        "Step 3 (Proportion): 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 reduces to 2:3. In 4:5 = X:25, X equals 20."
    },
    "notes": [
      "Both sides of a ratio can be multiplied or divided by the same non-zero number without changing its value.",
      "Decimal ratios are automatically multiplied by powers of 10 prior to reduction to guarantee integer outputs.",
      "Ratios represent comparative relationships, not absolute amounts. A 2:3 ratio could describe 2 and 3 items or 200 and 300 items."
    ],
    "faqs": [
      {
        "question": "How do you simplify a ratio to lowest terms?",
        "answer": "Find the Greatest Common Divisor (GCD) of both numbers, then divide both numbers by that GCD. For example, in 15:25, the GCD is 5, so dividing both by 5 gives 3:5."
      },
      {
        "question": "How do you solve a proportion when one number is unknown?",
        "answer": "Use cross-multiplication: if A/B = C/D, then A × D = B × C. Multiply the diagonal numbers and divide by the remaining number opposite the unknown."
      },
      {
        "question": "Can ratios contain decimals or fractions?",
        "answer": "While ratios can initially be written with decimals (e.g., 1.5 : 2.5), standard convention is to express them with positive integers by scaling both terms."
      }
    ],
    "breadcrumbName": "Ratio Calculator"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "en",
    "name": "Fraction Calculator",
    "category": "math",
    "badge": "Fraction Operations",
    "icon": "Binary",
    "h1": "Fraction Calculator",
    "seoTitle": "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    "seoDescription": "Free online fraction calculator. Easily add, subtract, multiply, and divide proper, improper, and mixed fractions with step-by-step reduction to simplest form.",
    "primaryKeyword": "fraction calculator",
    "secondaryKeywords": [
      "adding fractions",
      "fraction simplifier",
      "subtracting fractions",
      "multiplying fractions",
      "dividing fractions",
      "mixed numbers calculator"
    ],
    "heroSubtitle": "Add, subtract, multiply, and divide fractions and mixed numbers with automatic simplification, common denominators, and decimal conversion.",
    "about": [
      "The Fraction Calculator provides complete step-by-step solutions for adding, subtracting, multiplying, and dividing mathematical fractions. It handles proper fractions (numerator < denominator), improper fractions (numerator > denominator), and mixed numbers.",
      "Whether you are checking homework, scaling culinary recipes, or computing engineering measurements, this tool reduces results to their simplest irreducible form and displays the decimal equivalent."
    ],
    "formula": {
      "title": "Fraction Arithmetic Rules",
      "formulaText": "Addition: (a/b) + (c/d) = (ad + bc) / bd\nSubtraction: (a/b) - (c/d) = (ad - bc) / bd\nMultiplication: (a/b) × (c/d) = (ac) / (bd)\nDivision: (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "For addition and subtraction, convert to a common denominator before combining numerators. For multiplication, multiply across. For division, multiply by the reciprocal of the second fraction.",
      "variables": [
        {
          "name": "a & c",
          "desc": "Numerators (top numbers of the fractions)"
        },
        {
          "name": "b & d",
          "desc": "Denominators (bottom numbers, must not equal zero)"
        }
      ]
    },
    "howToCalculate": [
      "Enter the numerator and denominator for your first fraction.",
      "Select the arithmetic operation: Addition (+), Subtraction (-), Multiplication (×), or Division (÷).",
      "Enter the numerator and denominator for your second fraction.",
      "Click Calculate to see the simplified fraction, mixed number, and decimal representation."
    ],
    "example": {
      "problem": "Calculate 3/4 + 2/3.",
      "steps": [
        "Step 1: Common denominator is 4 × 3 = 12.",
        "Step 2: Convert numerators: (3 × 3) / 12 = 9/12, and (2 × 4) / 12 = 8/12.",
        "Step 3: Add numerators: 9/12 + 8/12 = 17/12.",
        "Step 4: Convert improper fraction to mixed number: 17 ÷ 12 = 1 with a remainder of 5, giving 1 5/12 (approx 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, which equals 1 5/12 or 1.4167."
    },
    "notes": [
      "A denominator can never be zero because division by zero is mathematically undefined.",
      "Negative fractions are standardized with the minus sign in the numerator (e.g., -3/4).",
      "The calculator automatically finds the Greatest Common Divisor to reduce outputs to simplest form."
    ],
    "faqs": [
      {
        "question": "How do you add fractions with different denominators?",
        "answer": "Find a common denominator (often by multiplying the two denominators), adjust both numerators accordingly, add the numerators together, and simplify the resulting fraction."
      },
      {
        "question": "How do you divide two fractions?",
        "answer": "To divide fractions, multiply the first fraction by the reciprocal (the inverted form) of the second fraction. For example, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "What is a mixed number?",
        "answer": "A mixed number consists of a whole number combined with a proper fraction, such as 2 1/2, which represents 2 + 1/2 (or 5/2 as an improper fraction)."
      }
    ],
    "breadcrumbName": "Fraction Calculator"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "en",
    "name": "Age Calculator",
    "category": "time-date",
    "badge": "Exact Age & Days",
    "icon": "Calendar",
    "h1": "Age Calculator",
    "seoTitle": "Age Calculator – Calculate Your Exact Age by Date of Birth",
    "seoDescription": "Free online age calculator. Find your exact age in years, months, weeks, days, and hours from your birth date to today or any target date.",
    "primaryKeyword": "age calculator",
    "secondaryKeywords": [
      "calculate age",
      "how old am i",
      "age calculator by date of birth",
      "birthday calculator",
      "chronological age calculator"
    ],
    "heroSubtitle": "Calculate your exact age in years, months, days, hours, and find the countdown to your next birthday with calendar precision.",
    "about": [
      "The Age Calculator computes your precise chronological age based on your date of birth. While conventional age is stated simply in years, this calculator breaks down your life span into exact years, calendar months, and remaining days, accounting for leap years and fluctuating month lengths.",
      "In addition to current age, the tool allows you to measure age at any specified past or future date—useful for school admissions, legal age verifications, retirement milestones, and passport or visa applications."
    ],
    "formula": {
      "title": "Chronological Age Calculation Method",
      "formulaText": "Years = Target Year - Birth Year (adjusted for month/day)\nMonths = Target Month - Birth Month (adjusted for day)\nDays = Target Day - Birth Day (borrowing days from previous month if negative)",
      "explanation": "Calendar-accurate age calculation accounts for differing month durations (28 to 31 days) and quadrennial leap years, ensuring day-to-day precision.",
      "variables": [
        {
          "name": "Birth Date",
          "desc": "The starting date of birth"
        },
        {
          "name": "Target Date",
          "desc": "The benchmark date of evaluation (defaults to today)"
        }
      ]
    },
    "howToCalculate": [
      "Enter your date of birth using the day, month, and year selectors.",
      "Optionally specify a target evaluation date (default is today’s date).",
      "Click Calculate to see your exact age in years, months, and days.",
      "Explore total lifespan summaries in months, weeks, days, and the countdown to your next birthday."
    ],
    "example": {
      "problem": "What is the exact age of someone born on June 15, 1995 evaluated on October 8, 2026?",
      "steps": [
        "Step 1: Difference in years: 2026 - 1995 = 31 years.",
        "Step 2: Difference in months: October (month 10) - June (month 6) = 4 months.",
        "Step 3: Difference in days: 8 - 15 is negative (-7), so borrow 1 month (leaving 3 months) and add September days (30): 8 + 30 - 15 = 23 days."
      ],
      "result": "The person is exactly 31 years, 3 months, and 23 days old."
    },
    "notes": [
      "Western age reckoning considers a person 0 years old at birth and increments on each birthday anniversary.",
      "Leap years contain 366 days instead of 365 days; the calculator includes February 29th whenever traversed.",
      "Total hours and total days are computed using standard astronomical calendar day intervals."
    ],
    "faqs": [
      {
        "question": "How does the age calculator handle leap years?",
        "answer": "The calculator checks every calendar year in the range and properly includes February 29th in leap years, ensuring total days and anniversaries are 100% accurate."
      },
      {
        "question": "Can I calculate how old I will be in a future year?",
        "answer": "Yes. Change the \"Age at the Date of\" field to any future date to find out your exact age on that date."
      },
      {
        "question": "How is the next birthday countdown determined?",
        "answer": "The calculator compares today’s date against your upcoming birthday in the current or subsequent calendar year to compute exact days remaining."
      }
    ],
    "breadcrumbName": "Age Calculator"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "en",
    "name": "Time Calculator",
    "category": "time-date",
    "badge": "Add & Subtract Time",
    "icon": "Clock",
    "h1": "Time Calculator",
    "seoTitle": "Time Calculator – Add and Subtract Hours, Minutes & Seconds",
    "seoDescription": "Free online time calculator. Easily add or subtract time durations in hours, minutes, and seconds. Convert time to decimal hours and clean timecodes.",
    "primaryKeyword": "time calculator",
    "secondaryKeywords": [
      "time duration calculator",
      "add time calculator",
      "subtract time calculator",
      "hours minutes seconds calculator",
      "time addition"
    ],
    "heroSubtitle": "Add and subtract time durations in hours, minutes, and seconds with automatic unit overflow and decimal hour conversions.",
    "about": [
      "The Time Calculator enables fast addition and subtraction of time intervals expressed in hours, minutes, and seconds. Because time uses base-60 (sexagesimal) arithmetic rather than base-10, adding hours and minutes manually frequently leads to regrouping errors.",
      "This tool automatically handles 60-second and 60-minute rollovers, making it ideal for video editors calculating footage runtime, project managers tracking billable tasks, pilots logging flight durations, and athletes analyzing workout splits."
    ],
    "formula": {
      "title": "Sexagesimal Time Summation Formula",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "All input time blocks are converted to total seconds, added or subtracted, and then converted back into normalized hours, minutes, and seconds.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Hours, minutes, and seconds of the first duration"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Hours, minutes, and seconds of the second duration"
        }
      ]
    },
    "howToCalculate": [
      "Enter hours, minutes, and seconds for Time 1.",
      "Choose the operation: Add (+) or Subtract (-).",
      "Enter hours, minutes, and seconds for Time 2.",
      "Click Calculate to see the consolidated hours, minutes, seconds, and total decimal hours."
    ],
    "example": {
      "problem": "Add 2 hours 45 minutes 30 seconds and 3 hours 35 minutes 45 seconds.",
      "steps": [
        "Step 1: Seconds: 30 + 45 = 75 seconds = 1 minute and 15 seconds.",
        "Step 2: Minutes: 45 + 35 + 1 (carried over) = 81 minutes = 1 hour and 21 minutes.",
        "Step 3: Hours: 2 + 3 + 1 (carried over) = 6 hours."
      ],
      "result": "The total duration is 6 hours, 21 minutes, and 15 seconds (6.3542 decimal hours)."
    },
    "notes": [
      "There are 60 seconds in a minute and 60 minutes in an hour.",
      "To convert minutes to decimal hours, divide the minutes by 60 (e.g., 30 minutes = 0.5 hours).",
      "If subtracting a larger time from a smaller time, the result is displayed as a negative time offset."
    ],
    "faqs": [
      {
        "question": "How do you convert minutes into decimal hours?",
        "answer": "Divide the number of minutes by 60. For example, 45 minutes divided by 60 is 0.75 hours. Therefore, 2 hours and 45 minutes equals 2.75 decimal hours."
      },
      {
        "question": "What happens when seconds exceed 60?",
        "answer": "Every block of 60 seconds automatically converts into 1 minute and carries over into the minutes column."
      },
      {
        "question": "Can this tool calculate flight or video editing timecodes?",
        "answer": "Yes. It precisely sums multiple takes, clips, or flight legs in hours, minutes, and seconds."
      }
    ],
    "breadcrumbName": "Time Calculator"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "en",
    "name": "Date Calculator",
    "category": "time-date",
    "badge": "Days Between Dates",
    "icon": "Calendar",
    "h1": "Date Calculator",
    "seoTitle": "Date Calculator – Days Between Dates & Add/Subtract Days",
    "seoDescription": "Free online date calculator. Calculate the exact number of days, weeks, and business days between two dates, or add/subtract days from any date.",
    "primaryKeyword": "date calculator",
    "secondaryKeywords": [
      "date difference calculator",
      "days between dates",
      "date duration calculator",
      "business days calculator",
      "add days to date"
    ],
    "heroSubtitle": "Calculate exact calendar days and working business days between two dates, or project future dates by adding or subtracting days.",
    "about": [
      "The Date Calculator solves common calendar queries: finding how many days remain between two specific dates, or determining what date occurs a given number of days, weeks, or months into the future or past.",
      "Unlike simple calendar counting, this tool accurately reflects month-end boundary variations, leap years, and separates standard weekend days from Monday-through-Friday business working days—essential for project planning, legal deadlines, notice periods, and event countdowns."
    ],
    "formula": {
      "title": "Date Duration Math",
      "formulaText": "Total Days = (End Date (ms) - Start Date (ms)) / (1000 × 60 × 60 × 24)\nWeeks = ⌊Total Days / 7⌋\nRemaining Days = Total Days mod 7",
      "explanation": "Calculates the epoch timestamp delta between midnight UTC timestamps and counts intervening Monday-through-Friday days for business intervals.",
      "variables": [
        {
          "name": "Start Date",
          "desc": "The reference beginning date"
        },
        {
          "name": "End Date",
          "desc": "The target completion date"
        },
        {
          "name": "Business Days",
          "desc": "Count of weekdays (Monday through Friday) excluding weekends"
        }
      ]
    },
    "howToCalculate": [
      "Choose Mode: \"Days Between Dates\" or \"Add / Subtract Days\".",
      "For Date Difference: Select your Start Date and End Date.",
      "Check \"Include End Day\" if your timeline requires inclusive boundary counting.",
      "View total days, weeks, remaining days, and Monday-to-Friday business days."
    ],
    "example": {
      "problem": "How many days and business days exist between January 5, 2026 and February 20, 2026?",
      "steps": [
        "Step 1: Total calendar days elapsed = 46 days.",
        "Step 2: Equivalent to 6 full weeks and 4 calendar days.",
        "Step 3: Excluding Saturday and Sunday weekends yields 34 business weekdays."
      ],
      "result": "There are 46 calendar days (34 business days) between the two dates."
    },
    "notes": [
      "Standard date difference calculates full days elapsed between two dates.",
      "Leap years are automatically factored in (2028, 2032, etc. have 29 days in February).",
      "Business day counts do not include official national public holidays as those vary by country."
    ],
    "faqs": [
      {
        "question": "Does the date calculator count both the start date and end date?",
        "answer": "By default, the calculator counts the interval from the start date up to the end date (elapsed time). You can toggle \"Include end day\" to include both boundary days."
      },
      {
        "question": "How are business days defined?",
        "answer": "Business days represent Monday through Friday. Saturdays and Sundays are excluded as weekend days."
      },
      {
        "question": "Can I add business days only?",
        "answer": "The addition tool adds calendar days; to calculate business day project deliverables, factor in 2 weekend days per 5 business days."
      }
    ],
    "breadcrumbName": "Date Calculator"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "en",
    "name": "Hours Calculator",
    "category": "time-date",
    "badge": "Time Card & Pay",
    "icon": "Timer",
    "h1": "Hours Calculator",
    "seoTitle": "Hours Calculator – Work Hours and Time Card Calculator",
    "seoDescription": "Free online hours calculator. Calculate total work hours, lunch breaks, decimal hours, and gross pay between start and end times for timesheets.",
    "primaryKeyword": "hours calculator",
    "secondaryKeywords": [
      "time card calculator",
      "work hours calculator",
      "hours worked calculator",
      "timesheet calculator",
      "calculate hours between times"
    ],
    "heroSubtitle": "Calculate daily work hours, deduct lunch and rest breaks, convert times to decimal hours, and compute gross earnings for payroll.",
    "about": [
      "The Hours Calculator simplifies time tracking for hourly employees, contractors, freelancers, and payroll managers. Converting clock hours into decimal hours (e.g., 7 hours 45 minutes into 7.75 hours) is essential for multiplying by hourly wage rates.",
      "The calculator supports overnight shifts spanning past midnight (such as 10:00 PM to 6:00 AM) and automatically deducts unpaid breaks or lunches to report clean payable hours."
    ],
    "formula": {
      "title": "Time Card Hours & Wage Formula",
      "formulaText": "Gross Minutes = End Time - Start Time (adjusted for overnight shifts)\nNet Minutes = Gross Minutes - Break Minutes\nDecimal Hours = Net Minutes / 60\nTotal Pay = Decimal Hours × Hourly Rate",
      "explanation": "Subtract start time from end time, subtract unpaid break minutes, divide by 60 to obtain decimal hours, and multiply by hourly pay rate.",
      "variables": [
        {
          "name": "Start Time",
          "desc": "Clock-in time"
        },
        {
          "name": "End Time",
          "desc": "Clock-out time"
        },
        {
          "name": "Break",
          "desc": "Unpaid rest or lunch duration in minutes"
        },
        {
          "name": "Hourly Rate",
          "desc": "Base hourly wage in dollars or local currency"
        }
      ]
    },
    "howToCalculate": [
      "Enter your shift Start Time (e.g., 08:30).",
      "Enter your shift End Time (e.g., 17:00).",
      "Specify any unpaid break time in minutes (e.g., 45 minutes for lunch).",
      "Optionally enter your hourly wage rate to estimate gross pay.",
      "Click Calculate to view net hours, minutes, decimal hours, and total earnings."
    ],
    "example": {
      "problem": "An employee clocks in at 08:30, clocks out at 17:15, takes a 45-minute lunch, and earns $24/hour.",
      "steps": [
        "Step 1: Total gross time between 08:30 and 17:15 = 8 hours and 45 minutes (525 minutes).",
        "Step 2: Deduct 45-minute lunch: 525 - 45 = 480 net minutes.",
        "Step 3: Convert to decimal: 480 ÷ 60 = 8.00 decimal hours.",
        "Step 4: Multiply by wage: 8.00 × $24 = $192.00."
      ],
      "result": "The employee worked 8.00 hours and earned $192.00."
    },
    "notes": [
      "Payroll systems require decimal hours (e.g., 8.25 hours) rather than clock format (8h 15m).",
      "Shifts crossing midnight are detected and calculated seamlessly without negative numbers.",
      "Calculations represent gross wages before statutory income tax and payroll deductions."
    ],
    "faqs": [
      {
        "question": "How do you convert work minutes to decimal hours?",
        "answer": "Divide the number of minutes by 60. For example, 15 minutes is 15/60 = 0.25 hours; 30 minutes is 0.5 hours; and 45 minutes is 0.75 hours."
      },
      {
        "question": "How does the calculator handle night shifts that cross midnight?",
        "answer": "If the end time is numerically earlier than the start time (e.g., 11:00 PM to 7:00 AM), the calculator automatically adds 24 hours to determine the correct overnight span."
      },
      {
        "question": "Can I calculate weekly pay using this tool?",
        "answer": "You can calculate each daily shift or use the Salary Calculator for consolidated multi-week pay projections."
      }
    ],
    "breadcrumbName": "Hours Calculator"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "en",
    "name": "BMI Calculator",
    "category": "fitness",
    "badge": "Body Mass Index",
    "icon": "Activity",
    "h1": "BMI Calculator",
    "seoTitle": "BMI Calculator – Calculate Your Body Mass Index Online",
    "seoDescription": "Free online BMI calculator. Calculate Body Mass Index for adults using metric (cm/kg) or imperial (ft/in/lbs) units. View WHO weight categories & healthy ranges.",
    "primaryKeyword": "BMI calculator",
    "secondaryKeywords": [
      "calculate BMI",
      "body mass index calculator",
      "BMI calculator for adults",
      "healthy weight range",
      "metric BMI calculator"
    ],
    "heroSubtitle": "Calculate your Body Mass Index (BMI) using metric or imperial measurements to understand your weight category and healthy weight targets.",
    "about": [
      "The Body Mass Index (BMI) Calculator is a standardized screening metric established by the World Health Organization (WHO) to categorize individuals by weight status relative to height. It is widely utilized in epidemiology, general healthcare checkups, and personal fitness monitoring.",
      "BMI is calculated by dividing body weight in kilograms by height in meters squared. The calculator presents your exact score, official WHO classification (underweight, normal weight, overweight, or obesity class), and computes your personalized healthy weight target range."
    ],
    "formula": {
      "title": "Standard BMI Formulas",
      "formulaText": "Metric Formula: BMI = Weight (kg) / [Height (m)]²\nImperial Formula: BMI = 703 × Weight (lbs) / [Height (inches)]²",
      "explanation": "Divide weight by the square of height. For imperial units (pounds and inches), multiply the ratio by conversion factor 703.",
      "variables": [
        {
          "name": "Weight",
          "desc": "Body weight in kilograms (kg) or pounds (lbs)"
        },
        {
          "name": "Height",
          "desc": "Standing height in centimeters (cm) or feet & inches"
        },
        {
          "name": "703 Factor",
          "desc": "Imperial conversion multiplier standard"
        }
      ]
    },
    "howToCalculate": [
      "Choose your preferred unit system: Metric (cm and kg) or Imperial (feet, inches, and pounds).",
      "Input your current standing height and body weight.",
      "Click Calculate to see your BMI score, WHO category, and healthy target weight bracket.",
      "Review the healthy weight range designed for your specific height."
    ],
    "example": {
      "problem": "What is the BMI of an individual who is 175 cm (1.75 m) tall and weighs 70 kg?",
      "steps": [
        "Step 1: Square the height in meters: 1.75 × 1.75 = 3.0625 m².",
        "Step 2: Divide weight by squared height: 70 ÷ 3.0625 = 22.86.",
        "Step 3: Compare against WHO thresholds: 22.9 falls within 18.5 – 24.9 (Normal Weight)."
      ],
      "result": "The individual has a BMI of 22.9, which is classified as Normal Weight."
    },
    "notes": [
      "BMI is a population screening indicator and does not differentiate between lean muscle mass and fat tissue.",
      "Athletes, bodybuilders, and pregnant women may register elevated BMI scores that do not reflect excess body fat.",
      "This tool is intended for general educational awareness and should not replace professional clinical evaluation."
    ],
    "faqs": [
      {
        "question": "What is considered a healthy BMI range?",
        "answer": "According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered the normal or healthy weight category for adults."
      },
      {
        "question": "Why can BMI be misleading for muscular athletes?",
        "answer": "BMI measures total weight relative to height and cannot differentiate muscle from adipose fat. Because muscle is denser than fat, muscular individuals often classify as overweight or obese despite having low body fat."
      },
      {
        "question": "How do I calculate BMI using pounds and inches?",
        "answer": "Multiply your weight in pounds by 703, then divide by your height in inches squared: BMI = (lbs × 703) / (inches × inches)."
      }
    ],
    "breadcrumbName": "BMI Calculator"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "en",
    "name": "Pace Calculator",
    "category": "fitness",
    "badge": "Running & Walking",
    "icon": "Footprints",
    "h1": "Pace Calculator",
    "seoTitle": "Pace Calculator – Running Pace, Speed, and Time Calculator",
    "seoDescription": "Free online running pace calculator. Calculate pace per kilometer (min/km), pace per mile (min/mi), and speed (km/h, mph) for 5K, 10K, half marathon, and marathon races.",
    "primaryKeyword": "pace calculator",
    "secondaryKeywords": [
      "running pace calculator",
      "marathon pace calculator",
      "running speed calculator",
      "5k pace calculator",
      "min per km calculator"
    ],
    "heroSubtitle": "Calculate running and walking pace per kilometer and mile, determine required race splits, and convert between speed and pace instantly.",
    "about": [
      "The Pace Calculator is built for runners, joggers, triathletes, and walkers who want to plan training runs or predict race finishes. Pace measures the time required to cover a unit of distance (such as minutes per kilometer or minutes per mile), while speed measures distance covered per unit of time (km/h or mph).",
      "The calculator supports standard race distances including 5K, 10K, Half Marathon (21.0975 km), and Full Marathon (42.195 km), allowing you to determine the target pace needed to achieve your personal best finish goal."
    ],
    "formula": {
      "title": "Pace and Speed Formulas",
      "formulaText": "Pace = Time (seconds) / Distance\nSpeed (km/h) = Distance (km) / Time (hours)\nSpeed (mph) = Distance (miles) / Time (hours)",
      "explanation": "Pace is the inverse of speed: divide total elapsed time in minutes by the total distance covered in kilometers or miles.",
      "variables": [
        {
          "name": "Time",
          "desc": "Total elapsed duration in hours, minutes, and seconds"
        },
        {
          "name": "Distance",
          "desc": "Total course length in kilometers or miles"
        },
        {
          "name": "Pace",
          "desc": "Time taken per unit distance (min/km or min/mi)"
        }
      ]
    },
    "howToCalculate": [
      "Enter your total course Distance and select the unit (km or miles).",
      "Enter the elapsed or targeted Time (hours, minutes, and seconds).",
      "Click Calculate to view your average pace per kilometer, pace per mile, and speed in km/h and mph.",
      "Adjust times to forecast split requirements for upcoming running races."
    ],
    "example": {
      "problem": "What pace is needed to complete a 10K (10 kilometers) race in 50 minutes?",
      "steps": [
        "Step 1: Total time = 50 minutes = 3,000 seconds.",
        "Step 2: Pace per km: 50 minutes ÷ 10 km = 5:00 minutes per kilometer.",
        "Step 3: Distance in miles: 10 km ÷ 1.60934 = 6.2137 miles.",
        "Step 4: Pace per mile: 50 minutes ÷ 6.2137 miles = 8:03 minutes per mile (Speed: 12.0 km/h or 7.46 mph)."
      ],
      "result": "The target pace is 5:00 min/km or 8:03 min/mile."
    },
    "notes": [
      "1 mile equals approximately 1.60934 kilometers. 1 kilometer equals 0.621371 miles.",
      "Pace is formatted as MM:SS (e.g., 4:30 min/km means 4 minutes and 30 seconds).",
      "To convert pace to speed: Speed (km/h) = 60 ÷ Pace (in decimal minutes per km)."
    ],
    "faqs": [
      {
        "question": "What is the difference between pace and speed?",
        "answer": "Speed indicates how far you travel in a given time (e.g., kilometers per hour), whereas pace indicates how much time it takes to travel a fixed distance (e.g., minutes per kilometer)."
      },
      {
        "question": "What pace is needed for a sub-4 hour marathon?",
        "answer": "To finish a full marathon (42.195 km / 26.219 miles) under 4 hours, you need an average pace faster than 5:41 min/km or 9:09 min/mile."
      },
      {
        "question": "How do I convert min/km to min/mile?",
        "answer": "Multiply your pace in minutes per kilometer by 1.60934. For example, 5:00 min/km (5.0) × 1.60934 = 8.046 minutes per mile, which is approximately 8:03 min/mile."
      }
    ],
    "breadcrumbName": "Pace Calculator"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "en",
    "name": "Fuel Cost Calculator",
    "category": "utilities",
    "badge": "Trip & Gas Budget",
    "icon": "Fuel",
    "h1": "Fuel Cost Calculator",
    "seoTitle": "Fuel Cost Calculator – Gas Trip and Mileage Cost Calculator",
    "seoDescription": "Free online fuel cost calculator. Calculate total gas trip expense, fuel volume needed, and cost per mile or kilometer based on vehicle efficiency and fuel price.",
    "primaryKeyword": "fuel cost calculator",
    "secondaryKeywords": [
      "gas cost calculator",
      "fuel consumption calculator",
      "trip fuel calculator",
      "mileage cost calculator",
      "driving cost calculator"
    ],
    "heroSubtitle": "Estimate your road trip fuel costs, calculate liters or gallons needed, and find your cost per kilometer or mile before you travel.",
    "about": [
      "The Fuel Cost Calculator helps commuters, road-trippers, and logistics operators forecast fuel expenses for any driving distance. Fuel is one of the highest variable expenses of vehicle ownership, influenced by fluctuating pump prices, highway speeds, and engine efficiency.",
      "This tool supports kilometers with km/L or L/100km, as well as miles with Miles Per Gallon (MPG). It breaks down total fuel volume required, overall trip expenditure, and unit cost per kilometer or mile."
    ],
    "formula": {
      "title": "Fuel Consumption and Cost Formula",
      "formulaText": "Fuel Required (L) = Distance (km) / Efficiency (km/L)\nTotal Trip Cost = Fuel Required × Fuel Price per Unit\nCost per Distance = Total Trip Cost / Distance",
      "explanation": "Divide the total trip distance by vehicle fuel efficiency to find fuel quantity, then multiply by local pump fuel price.",
      "variables": [
        {
          "name": "Distance",
          "desc": "Length of the journey in kilometers or miles"
        },
        {
          "name": "Efficiency",
          "desc": "Vehicle mileage rating (km/L, L/100km, or MPG)"
        },
        {
          "name": "Fuel Price",
          "desc": "Cost of petrol, diesel, or gas per liter or gallon"
        }
      ]
    },
    "howToCalculate": [
      "Enter total trip Distance (e.g., 350 km).",
      "Select your vehicle efficiency unit (km/L, L/100km, or MPG) and enter your vehicle rating.",
      "Enter the pump fuel price per liter or per gallon.",
      "Click Calculate to see total fuel required, total trip expense, and cost per unit distance."
    ],
    "example": {
      "problem": "What is the fuel cost for a 400 km trip in a car achieving 16 km/L with fuel priced at $1.50 per liter?",
      "steps": [
        "Step 1: Fuel needed = 400 km ÷ 16 km/L = 25 liters.",
        "Step 2: Total cost = 25 liters × $1.50/L = $37.50.",
        "Step 3: Cost per kilometer = $37.50 ÷ 400 km = $0.094 per km."
      ],
      "result": "The trip requires 25 liters of fuel and costs $37.50 ($0.094/km)."
    },
    "notes": [
      "Aggressive acceleration, heavy cargo loads, and roof racks can reduce highway fuel efficiency by 15% to 25%.",
      "To convert L/100km to km/L: divide 100 by the L/100km figure (e.g., 8 L/100km = 100 / 8 = 12.5 km/L).",
      "For round trips, multiply one-way distance by 2 before calculating."
    ],
    "faqs": [
      {
        "question": "How do I calculate fuel cost for a road trip?",
        "answer": "Divide the distance by your vehicle’s mileage (km/L or MPG) to find fuel volume needed, then multiply that volume by the fuel price per liter or gallon."
      },
      {
        "question": "How do you convert MPG to km/L?",
        "answer": "1 US MPG is approximately 0.425 km/L. To convert MPG to km/L, multiply the MPG number by 0.425144."
      },
      {
        "question": "How can I improve my vehicle’s fuel efficiency?",
        "answer": "Maintain recommended tire pressure, observe steady highway speed limits, remove excess trunk weight, and avoid rapid braking and acceleration."
      }
    ],
    "breadcrumbName": "Fuel Cost Calculator"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "en",
    "name": "Electricity Cost Calculator",
    "category": "utilities",
    "badge": "Appliance & Power Bill",
    "icon": "Zap",
    "h1": "Electricity Cost Calculator",
    "seoTitle": "Electricity Cost Calculator – Appliance Power and Energy Bill Calculator",
    "seoDescription": "Free online electricity cost calculator. Calculate power consumption in kWh and estimated monthly & yearly power bills for home appliances based on wattage.",
    "primaryKeyword": "electricity cost calculator",
    "secondaryKeywords": [
      "electricity usage calculator",
      "appliance electricity calculator",
      "kWh calculator",
      "energy cost calculator",
      "power bill calculator"
    ],
    "heroSubtitle": "Calculate power consumption in kilowatt-hours (kWh) and estimate monthly and annual electricity costs for any home appliance.",
    "about": [
      "The Electricity Cost Calculator helps homeowners, renters, and facility managers quantify how much electricity household appliances consume and what they cost to run. From air conditioners and space heaters to crypto mining rigs and refrigerator compressors, power consumption can dramatically inflate utility bills.",
      "Enter the appliance wattage, daily runtime hours, and your utility electricity tariff rate per kilowatt-hour (kWh) to receive daily, monthly, and yearly cost projections."
    ],
    "formula": {
      "title": "Kilowatt-Hour and Energy Cost Formulas",
      "formulaText": "Daily Energy (kWh) = (Appliance Watts × Hours per Day) / 1000\nCost = Energy (kWh) × Electricity Rate per kWh\nMonthly Cost = Daily Cost × 30 days\nYearly Cost = Daily Cost × 365 days",
      "explanation": "Convert appliance power rating in watts to kilowatts by dividing by 1,000, multiply by hours of daily operation, and multiply by utility rate per kWh.",
      "variables": [
        {
          "name": "Wattage",
          "desc": "Rated power consumption of the appliance in Watts (W)"
        },
        {
          "name": "Hours/Day",
          "desc": "Average active runtime per 24-hour cycle"
        },
        {
          "name": "Rate ($/kWh)",
          "desc": "Electricity utility cost per kilowatt-hour"
        }
      ]
    },
    "howToCalculate": [
      "Locate the wattage rating on the appliance label or manual (e.g., 1500W for a space heater).",
      "Enter the estimated hours the appliance operates each day.",
      "Enter your local utility cost per kWh (check your monthly electric bill; standard US rate is ~$0.16/kWh, UK ~£0.28/kWh).",
      "Click Calculate to see daily, monthly, and yearly consumption in kWh and monetary cost."
    ],
    "example": {
      "problem": "What does it cost to run a 1,200 Watt air conditioner for 8 hours daily at a rate of $0.15 per kWh for a 30-day month?",
      "steps": [
        "Step 1: Daily kWh: (1,200 W × 8 hours) ÷ 1,000 = 9.6 kWh/day.",
        "Step 2: Monthly energy: 9.6 kWh × 30 days = 288 kWh.",
        "Step 3: Monthly cost: 288 kWh × $0.15/kWh = $43.20.",
        "Step 4: Annual cost: 9.6 kWh × 365 days × $0.15 = $525.60."
      ],
      "result": "The air conditioner uses 288 kWh per month and costs $43.20 monthly ($525.60 annually)."
    },
    "notes": [
      "Appliance labels list maximum peak wattage; appliances with thermostats (like refrigerators and ACs) cycle on and off, reducing average consumption.",
      "1 Kilowatt (kW) = 1,000 Watts (W). 1 Megawatt (MW) = 1,000,000 Watts.",
      "Check your utility bill for tiered or peak time-of-use (TOU) rates during summer and winter."
    ],
    "faqs": [
      {
        "question": "How do you calculate appliance power cost?",
        "answer": "Multiply appliance wattage by daily hours, divide by 1,000 to get daily kWh, and multiply by your utility rate per kWh."
      },
      {
        "question": "Where can I find the wattage of an appliance?",
        "answer": "Appliance wattage is typically stamped on an electrical certification label located on the back or bottom of the device, or inside the instruction handbook."
      },
      {
        "question": "Which home appliances use the most electricity?",
        "answer": "Heating and cooling systems (central AC and heat pumps), water heaters, clothes dryers, and electric ovens consume the highest amount of household power."
      }
    ],
    "breadcrumbName": "Electricity Cost Calculator"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "en",
    "name": "GPA Calculator",
    "category": "education",
    "badge": "Grade Point Average",
    "icon": "GraduationCap",
    "h1": "GPA Calculator",
    "seoTitle": "GPA Calculator – Calculate College & High School 4.0 GPA",
    "seoDescription": "Free online GPA calculator. Calculate your semester and cumulative Grade Point Average on a 4.0 scale with credit weights and letter grades.",
    "primaryKeyword": "GPA calculator",
    "secondaryKeywords": [
      "college GPA calculator",
      "semester GPA calculator",
      "grade point average calculator",
      "cumulative GPA calculator",
      "4.0 GPA scale"
    ],
    "heroSubtitle": "Calculate semester and cumulative Grade Point Average (GPA) on a standard 4.0 scale using letter grades and course credits.",
    "about": [
      "The Grade Point Average (GPA) Calculator computes your academic standing on the standard 4.0 collegiate grading scale. Colleges, universities, high schools, scholarship committees, and graduate programs use cumulative GPA as a primary benchmark for honors, academic probation, and admissions.",
      "Unlike a simple average of grades, GPA is weighted by course credit hours—meaning a 4-credit course has double the influence on your final GPA compared to a 2-credit elective course."
    ],
    "formula": {
      "title": "Weighted GPA Formula",
      "formulaText": "Grade Points per Course = Course Credits × Grade Scale Value\nGPA = Total Grade Points / Total Course Credits",
      "explanation": "Multiply each course credit hour by the numeric equivalent of its letter grade, sum the total grade points, and divide by total credits attempted.",
      "variables": [
        {
          "name": "Grade Scale (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Credits",
          "desc": "Credit hours or semester units assigned to each course"
        }
      ]
    },
    "howToCalculate": [
      "Add each course taken during your semester or term.",
      "Select the earned Letter Grade (e.g., A, B+, B, C) or enter numeric grade points.",
      "Enter the course Credit Hours (e.g., 3 or 4 credits).",
      "Click Calculate to see your weighted GPA, total credit hours, and total grade points earned."
    ],
    "example": {
      "problem": "Calculate the semester GPA for 4 courses: Math (4 credits, A), History (3 credits, B), Biology (4 credits, B+), English (3 credits, A-).",
      "steps": [
        "Step 1: Math: 4 credits × 4.0 (A) = 16.0 points.",
        "Step 2: History: 3 credits × 3.0 (B) = 9.0 points.",
        "Step 3: Biology: 4 credits × 3.3 (B+) = 13.2 points.",
        "Step 4: English: 3 credits × 3.7 (A-) = 11.1 points.",
        "Step 5: Total points = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 points.",
        "Step 6: Total credits = 4 + 3 + 4 + 3 = 14 credits. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "The semester GPA is 3.52."
    },
    "notes": [
      "Pass/Fail or Audit courses are typically excluded from both grade points and credit hour totals in GPA calculations.",
      "Some high schools use weighted 5.0 scales for AP or Honors courses; standard university GPA uses the unweighted 4.0 benchmark.",
      "A cumulative GPA combines all semesters by dividing all lifetime earned grade points by all lifetime credits."
    ],
    "faqs": [
      {
        "question": "What is the standard 4.0 GPA scale?",
        "answer": "The standard 4.0 scale maps: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, and F = 0.0."
      },
      {
        "question": "Why are course credits included in GPA calculation?",
        "answer": "Course credits represent the rigor and weekly instructional hours of a class. Weighting by credits ensures that a major 4-credit lecture impacts your academic standing more than a 1-credit lab."
      },
      {
        "question": "How do I raise my cumulative GPA?",
        "answer": "Earning high grades (A or A-) in courses with higher credit counts will have the largest upward impact on your overall cumulative GPA."
      }
    ],
    "breadcrumbName": "GPA Calculator"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "en",
    "name": "Grade Calculator",
    "category": "education",
    "badge": "Weighted & Final Exam",
    "icon": "Award",
    "h1": "Grade Calculator",
    "seoTitle": "Grade Calculator – Weighted Course Grade & Final Exam Calculator",
    "seoDescription": "Free online grade calculator. Calculate current weighted course grades and find what score you need on your final exam to earn your target class grade.",
    "primaryKeyword": "grade calculator",
    "secondaryKeywords": [
      "final grade calculator",
      "what grade do I need",
      "weighted grade calculator",
      "class grade calculator",
      "exam grade calculator"
    ],
    "heroSubtitle": "Calculate current weighted course averages and determine the exact score needed on your final exam to achieve your target class grade.",
    "about": [
      "The Grade Calculator features two vital academic modes: a Weighted Grade Calculator for combining assignments, quizzes, midterms, and participation, and a Final Exam Calculator that answers the question: \"What score do I need on the final exam to get an A (or pass)?\"",
      "Teachers and university professors frequently grade courses using percentages with assigned category weights (such as Homework 20%, Midterms 30%, Final 50%). This calculator automates weighted distribution math so you can plan your study time effectively."
    ],
    "formula": {
      "title": "Weighted Grade & Final Exam Formulas",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Multiply each earned score by its category percentage weight. To find the required final score, isolate the remaining uncompleted weight percentage against your target grade.",
      "variables": [
        {
          "name": "Current Grade",
          "desc": "Average percentage earned on completed coursework"
        },
        {
          "name": "Target Grade",
          "desc": "The minimum course percentage desired (e.g., 90% for an A, 70% for a C)"
        },
        {
          "name": "Final Weight",
          "desc": "Percentage of the overall class grade determined by the final exam"
        }
      ]
    },
    "howToCalculate": [
      "To calculate current course grade: Enter assignments with scores (%) and their respective category weights (%).",
      "To calculate what you need on the final: Switch to \"Final Exam Mode\", enter your Current Grade, Target Grade, and Final Exam Weight.",
      "Click Calculate to view your required exam score and whether that score is attainable."
    ],
    "example": {
      "problem": "You currently have an 84% in Chemistry. The final exam is worth 25% of your grade. What do you need on the final to finish with an A (90%)?",
      "steps": [
        "Step 1: Current grade weight = 100% - 25% = 75% (0.75).",
        "Step 2: Target grade = 90%. Current contribution = 84% × 0.75 = 63%.",
        "Step 3: Points needed from final: 90% - 63% = 27%.",
        "Step 4: Divide by final exam weight: 27% ÷ 0.25 = 108%."
      ],
      "result": "You need 108% on the final exam (which requires extra credit) to achieve an overall 90% in the class."
    },
    "notes": [
      "If the required final score is over 100%, the target grade is mathematically impossible without extra credit curve points.",
      "Make sure that all category weights sum up to 100% for full syllabus balance.",
      "Different colleges apply different grade boundaries; check your syllabus for specific letter cutoffs."
    ],
    "faqs": [
      {
        "question": "How do you calculate a weighted class grade?",
        "answer": "Multiply each grade category by its weight percentage in decimal form, add all the resulting products together, and divide by the total weight sum."
      },
      {
        "question": "What do I do if my weights do not add up to 100%?",
        "answer": "The calculator automatically normalizes your entered weights by dividing the total weighted points by the sum of weights entered so far."
      },
      {
        "question": "How is the final exam score calculated?",
        "answer": "Subtract the grade points you have already secured from your target course grade, then divide the remaining points by the final exam’s weight percentage."
      }
    ],
    "breadcrumbName": "Grade Calculator"
  }
};

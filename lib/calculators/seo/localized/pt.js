/**
 * lib/calculators/seo/localized/pt.js
 * Complete Portuguese localized SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_PT = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "pt",
    "name": "Calculadora de Empréstimos",
    "category": "financial",
    "badge": "Pagamento Mensal e Juros",
    "icon": "CreditCard",
    "h1": "Calculadora de Empréstimos",
    "seoTitle": "Calculadora de Empréstimos – Estime Pagamentos Mensais e Juros Totais",
    "seoDescription": "Calculadora de empréstimos online gratuita. Calcule pagamentos mensais de empréstimos, custos totais de juros e visualize cronogramas de amortização para empréstimos pessoais, automotivos ou empresariais.",
    "primaryKeyword": "calculadora de empréstimos",
    "secondaryKeywords": [
      "calculadora de pagamento de empréstimo",
      "calculadora de prestação mensal",
      "calculadora de juros",
      "calculadora de empréstimo pessoal",
      "calculadora de empréstimo automotivo"
    ],
    "heroSubtitle": "Calcule pagamentos mensais de empréstimos, encargos totais de juros e custos totais de reembolso com cronogramas de amortização para empréstimos pessoais, automotivos e estudantis.",
    "about": [
      "A Calculadora de Empréstimos ajuda os mutuários a avaliar os termos de empréstimos parcelados antes de se comprometerem com acordos de financiamento com bancos, cooperativas de crédito ou credores online. Empréstimos parcelados – incluindo financiamento automotivo, empréstimos pessoais e pacotes de consolidação de dívidas – são estruturados em torno de uma fórmula de amortização.",
      "Ao inserir o saldo principal do empréstimo, a taxa de juros anual (APR) e o prazo do empréstimo em meses ou anos, a calculadora calcula o seu pagamento mensal exato, o total de juros pagos durante a vida útil do empréstimo e o valor total do reembolso."
    ],
    "formula": {
      "title": "Fórmula Padrão de Amortização de Empr��stimos",
      "formulaText": "Monthly Payment (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nTotal Repayment = Monthly Payment × n\nTotal Interest = Total Repayment - PV",
      "explanation": "PV é o principal inicial do empréstimo, r é a taxa de juros mensal periódica (Taxa Anual / 12 / 100), e n é o número total de pagamentos mensais.",
      "variables": [
        {
          "name": "PV",
          "desc": "Valor Presente (Valor principal do empréstimo)"
        },
        {
          "name": "r",
          "desc": "Taxa de juros mensal: Taxa Anual ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Número total de períodos de pagamento mensais"
        }
      ]
    },
    "howToCalculate": [
      "Insira o Valor Total do Empréstimo (Principal) que você planeja tomar.",
      "Insira a taxa de juros anual (porcentagem APR).",
      "Selecione a duração do prazo do empréstimo (em anos ou meses).",
      "Clique em Calcular para ver seu pagamento mensal, custo total de juros e a discriminação entre principal e juros."
    ],
    "example": {
      "problem": "Qual é o pagamento mensal e o juro total de um empréstimo de carro de $25,000 com juros anuais de 6.0% ao longo de um prazo de 5 anos (60 meses)?",
      "steps": [
        "Passo 1: Taxa de juros mensal r = 6% ÷ 1200 = 0.005.",
        "Passo 2: Número de meses n = 5 × 12 = 60 meses.",
        "Passo 3: Fator (1 + 0.005)⁶⁰ = 1.34885.",
        "Passo 4: Pagamento mensal = [0.005 × 25,000 × 1.34885] ÷ [1.34885 - 1] = 168.606 ÷ 0.34885 = $483.32.",
        "Passo 5: Pagamentos totais = $483.32 × 60 = $28,999.20. Juros totais = $28,999.20 - $25,000 = $3,999.20."
      ],
      "result": "O pagamento mensal é de $483.32, e o juro total pago ao longo de 5 anos é de $3,999.20."
    },
    "notes": [
      "Os credores podem incluir taxas de originação, taxas de documentação ou seguro de crédito que aumentam ligeiramente a APR Efetiva.",
      "Fazer pagamentos antecipados adicionais do principal reduz significativamente os juros totais e encurta a duração do pagamento do empréstimo.",
      "Prazos de empréstimo mais longos diminuem os pagamentos mensais, mas aumentam os juros cumulativos pagos."
    ],
    "faqs": [
      {
        "question": "Como os credores calculam os pagamentos mensais de empréstimos?",
        "answer": "Os credores utilizam fórmulas de amortização padrão onde cada pagamento mensal é dividido entre juros (calculados sobre o saldo restante) e redução do principal."
      },
      {
        "question": "Qual é a diferença entre APR e taxa de juros?",
        "answer": "A taxa de juros é o custo anual básico de tomar dinheiro emprestado, enquanto a Taxa Anual Efetiva (APR) inclui tanto a taxa de juros quanto quaisquer taxas ou pontos obrigatórios do credor."
      },
      {
        "question": "Como um adiantamento maior afeta um empréstimo?",
        "answer": "Um adiantamento maior diminui o principal emprestado, o que reduz imediatamente tanto o seu pagamento mensal quanto o total de juros pagos ao longo do tempo."
      },
      {
        "question": "Para que serve uma calculadora de empréstimos?",
        "answer": "Uma calculadora de empréstimos permite que você simule diferentes cenários de empréstimo, ajustando o valor, a taxa de juros e o prazo. Isso ajuda a entender o impacto dessas variáveis no seu pagamento mensal e no custo total do empréstimo, auxiliando no planejamento financeiro e na tomada de decisões."
      }
    ],
    "breadcrumbName": "Calculadora de Empréstimos"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "pt",
    "name": "Calculadora de EMI",
    "category": "financial",
    "badge": "Parcela Mensal Equivalente",
    "icon": "Calculator",
    "h1": "Calculadora de EMI",
    "seoTitle": "Calculadora de EMI – Calcule Parcelas Mensais Equivalentes Online",
    "seoDescription": "Calculadora de EMI online gratuita. Calcule parcelas mensais equivalentes para empréstimos imobiliários, financiamentos de veículos e empréstimos pessoais com detalhamento de juros e cronogramas de pagamento.",
    "primaryKeyword": "calculadora de EMI",
    "secondaryKeywords": [
      "calculadora de parcela mensal",
      "simulador de empréstimo",
      "cálculo de financiamento",
      "EMI de financiamento imobiliário",
      "EMI de financiamento de veículo",
      "calculadora de juros de empréstimo"
    ],
    "heroSubtitle": "Calcule as Parcelas Mensais Equivalentes (EMI), o total de juros a pagar e os cronogramas de amortização para empréstimos imobiliários, pessoais e financiamentos de veículos.",
    "about": [
      "A Calculadora de Parcela Mensal Equivalente (EMI) é uma ferramenta financeira vital utilizada em sistemas bancários globais e brasileiros para calcular o valor fixo do pagamento mensal devido a um credor em uma data específica de cada mês.",
      "As EMIs são estruturadas de forma que, nos meses iniciais, uma proporção maior de cada parcela seja destinada ao pagamento de juros; à medida que o principal do empréstimo diminui ao longo do tempo, uma parcela crescente de cada pagamento reduz o saldo principal restante."
    ],
    "formula": {
      "title": "Fórmula da Parcela Mensal Equivalente",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal a Pagar = EMI × N\nTotal de Juros = Total a Pagar - P",
      "explanation": "P é o valor principal do empréstimo, R é a taxa de juros mensal (Taxa Anual / 12 / 100), e N é o prazo expresso em total de meses.",
      "variables": [
        {
          "name": "P",
          "desc": "Valor principal emprestado"
        },
        {
          "name": "R",
          "desc": "Taxa de juros mensal: Taxa Anual ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Prazo em meses (Anos × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Insira o valor principal do empréstimo.",
      "Insira a taxa de juros anual percentual cobrada pelo banco.",
      "Insira o prazo do empréstimo em anos ou meses.",
      "Revise sua EMI exata, o valor total dos juros e a tabela de amortização mensal."
    ],
    "example": {
      "problem": "Calcule a EMI de um empréstimo pessoal de ₹1.000.000 com juros de 10,5% por um prazo de 3 anos (36 meses).",
      "steps": [
        "Passo 1: Principal P = 1.000.000. Prazo N = 36 meses.",
        "Passo 2: Taxa de juros mensal R = 10,5 ÷ 1200 = 0,00875.",
        "Passo 3: (1 + R)³⁶ = (1,00875)³⁶ = 1,3686.",
        "Passo 4: EMI = [1.000.000 × 0,00875 × 1,3686] ÷ [1,3686 - 1] = ₹32.502,44.",
        "Passo 5: Total de juros = (₹32.502,44 × 36) - ₹1.000.000 = ₹170.088."
      ],
      "result": "A EMI mensal é de ₹32.502, e o total de juros a pagar ao longo de 3 anos é de ₹170.088."
    },
    "notes": [
      "O pagamento antecipado de parcelas adicionais da EMI reduz diretamente o principal e diminui drasticamente os encargos de juros a longo prazo.",
      "Taxas de juros flutuantes podem alterar os valores da EMI ou a duração do prazo do empréstimo ao longo do tempo.",
      "Taxas de processamento e impostos aplicáveis sobre encargos bancários são cobrados separadamente pelos credores."
    ],
    "faqs": [
      {
        "question": "O que é uma Parcela Mensal Equivalente (EMI)?",
        "answer": "Uma EMI é um valor monetário fixo pago por um mutuário a um credor financeiro em uma data específica a cada mês para quitar um empréstimo amortizado ao longo de um período determinado."
      },
      {
        "question": "Por que os juros são maiores nos primeiros pagamentos da EMI?",
        "answer": "Porque os juros são calculados sobre o saldo devedor, que é o mais alto no início do empréstimo. À medida que você amortiza o saldo principal, a parcela mensal de juros diminui."
      },
      {
        "question": "Posso reduzir minha EMI?",
        "answer": "Você pode reduzir sua EMI mensal estendendo o prazo do empréstimo, negociando uma taxa de juros mais baixa ou fazendo um pagamento antecipado do principal."
      },
      {
        "question": "Como uma calculadora de EMI pode me ajudar?",
        "answer": "Uma calculadora de EMI ajuda você a planejar suas finanças, fornecendo uma estimativa precisa de seus pagamentos mensais de empréstimo. Ela permite comparar diferentes cenários de empréstimo (variando principal, taxas de juros e prazos) para encontrar um plano de pagamento que se ajuste ao seu orçamento."
      }
    ],
    "breadcrumbName": "Calculadora de EMI"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "pt",
    "name": "Calculadora de Empréstimo Imobiliário",
    "category": "financial",
    "badge": "Financiamento Imobiliário e Impostos",
    "icon": "Home",
    "h1": "Calculadora de Empréstimo Imobiliário",
    "seoTitle": "Calculadora de Empréstimo Imobiliário – Estime Pagamentos Mensais da Casa",
    "seoDescription": "Calculadora de empréstimo imobiliário online gratuita. Estime os custos totais mensais da sua casa, incluindo principal, juros, impostos sobre a propriedade, seguro residencial e entrada.",
    "primaryKeyword": "calculadora de financiamento imobiliário",
    "secondaryKeywords": [
      "calculadora de prestação imobiliária",
      "simulador de empréstimo imobiliário",
      "calculadora de crédito habitação",
      "calculadora de juros de financiamento",
      "simulador de financiamento de imóveis"
    ],
    "heroSubtitle": "Estime os seus pagamentos mensais de empréstimo imobiliário, incluindo principal, juros, impostos sobre a propriedade e seguro residencial.",
    "about": [
      "A Calculadora de Empréstimo Imobiliário fornece uma estimativa completa dos verdadeiros custos mensais de possuir uma casa. Um pagamento de financiamento imobiliário raramente consiste apenas em principal e juros — credores e serviços de custódia rotineiramente exigem contribuições para impostos sobre a propriedade e prémios de seguro contra riscos.",
      "Insira o preço de compra do imóvel, a percentagem ou valor da entrada, a taxa de juros e o prazo (por exemplo, 15 ou 30 anos) para estimar o seu pagamento mensal e os custos totais de financiamento ao longo da vida do empréstimo."
    ],
    "formula": {
      "title": "Fórmula Abrangente do Custo do Empréstimo Imobiliário",
      "formulaText": "Pagamento Mensal Total = Principal e Juros (P&J) + Imposto Predial Mensal + Seguro Mensal + Condomínio\nPrincipal do Empréstimo = Preço de Compra da Casa - Entrada",
      "explanation": "P&J é calculado usando a fórmula de amortização padrão sobre o valor líquido do empréstimo. Impostos e seguro são divididos por 12 e somados para a responsabilidade total mensal de custódia.",
      "variables": [
        {
          "name": "Preço da Casa",
          "desc": "Preço de compra acordado do imóvel residencial"
        },
        {
          "name": "Entrada",
          "desc": "Capital próprio em dinheiro contribuído no fechamento do negócio"
        },
        {
          "name": "P&J",
          "desc": "Serviço de dívida mensal base cobrindo principal e juros"
        }
      ]
    },
    "howToCalculate": [
      "Insira o Preço de Compra da Casa desejado.",
      "Insira a sua Entrada (como um valor em dólares ou percentagem).",
      "Especifique a Taxa de Juros anual do empréstimo imobiliário e o Prazo do Empréstimo (tipicamente 15 ou 30 anos).",
      "Opcionalmente, inclua os Impostos Prediais anuais e o Seguro Residencial.",
      "Clique em Calcular para ver a sua despesa mensal completa com a casa e o total de juros pagos."
    ],
    "example": {
      "problem": "Estime o pagamento mensal para uma casa de $400.000 com 20% de entrada ($80.000) a 6,5% de juros num empréstimo fixo de 30 anos, com $4.800/ano de impostos e $1.200/ano de seguro.",
      "steps": [
        "Passo 1: Principal do Empréstimo = $400.000 - $80.000 = $320.000.",
        "Passo 2: P&J Mensal sobre $320.000 a 6,5% por 30 anos = $2.022,62.",
        "Passo 3: Imposto Predial Mensal = $4.800 ÷ 12 = $400,00.",
        "Passo 4: Seguro Mensal = $1.200 ÷ 12 = $100,00.",
        "Passo 5: Pagamento Mensal Total = $2.022,62 + $400,00 + $100,00 = $2.522,62."
      ],
      "result": "O pagamento mensal total estimado da casa é de $2.522,62 (P&J: $2.022,62)."
    },
    "notes": [
      "Uma entrada inferior a 20% geralmente aciona o Seguro Hipotecário Privado (PMI) até que 20% de capital próprio seja atingido.",
      "Um empréstimo imobiliário de 15 anos apresenta pagamentos mensais mais altos, mas economiza dezenas de milhares em juros ao longo da vida do empréstimo em comparação com um prazo de 30 anos.",
      "Os impostos sobre a propriedade flutuam com base nas avaliações municipais e nas taxas dos distritos escolares locais."
    ],
    "faqs": [
      {
        "question": "O que está incluído num pagamento mensal de empréstimo imobiliário?",
        "answer": "Um pagamento padrão de empréstimo imobiliário inclui Principal, Juros, Impostos sobre a Propriedade e Seguro Residencial (frequentemente referido como PITI)."
      },
      {
        "question": "Por que devo procurar uma entrada de 20%?",
        "answer": "Dar uma entrada de pelo menos 20% elimina a exigência de Seguro Hipotecário Privado (PMI), reduz a sua taxa de juros e diminui a sua obrigação de dívida mensal."
      },
      {
        "question": "Devo escolher um empréstimo imobiliário de 15 ou 30 anos?",
        "answer": "Um prazo de 30 anos oferece pagamentos mensais mais baixos e mais gerenciáveis. Um prazo de 15 anos apresenta pagamentos mensais mais altos, mas cobra significativamente menos juros totais ao longo da vida do empréstimo."
      },
      {
        "question": "O que é o Seguro Hipotecário Privado (PMI)?",
        "answer": "O PMI é uma apólice de seguro que protege o credor caso você não cumpra o pagamento do seu empréstimo imobiliário. Geralmente é exigido se a sua entrada for inferior a 20% do preço de compra da casa."
      }
    ],
    "breadcrumbName": "Calculadora de Empréstimo Imobiliário"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "pt",
    "name": "Calculadora de Juros Compostos",
    "category": "financial",
    "badge": "Crescimento de Investimento",
    "icon": "TrendingUp",
    "h1": "Calculadora de Juros Compostos",
    "seoTitle": "Calculadora de Juros Compostos – Calcule o Crescimento do Investimento Online",
    "seoDescription": "Calculadora de juros compostos online gratuita. Calcule o valor futuro do investimento, os juros ganhos e o acúmulo de riqueza com contribuições mensais ou anuais.",
    "primaryKeyword": "calculadora de juros compostos",
    "secondaryKeywords": [
      "calculadora de juros compostos mensais",
      "calculadora de investimento",
      "calculadora de crescimento composto",
      "calculadora de valor futuro",
      "calculadora de poupança"
    ],
    "heroSubtitle": "Calcule o acúmulo de riqueza futura, os ganhos de juros compostos e o crescimento do investimento com contribuições mensais ou anuais regulares.",
    "about": [
      "A Calculadora de Juros Compostos visualiza o poder do crescimento financeiro exponencial ao longo do tempo. Frequentemente descrito como a \"oitava maravilha do mundo\", o juro composto refere-se a ganhar juros não apenas sobre o seu depósito inicial (principal), mas também sobre os juros acumulados de períodos anteriores.",
      "Esta calculadora permite modelar contas de aposentadoria (como 401(k)s e IRAs), poupanças em fundos de índice e depósitos a prazo com frequências de capitalização personalizáveis (diária, mensal, trimestral ou anual) e contribuições mensais recorrentes."
    ],
    "formula": {
      "title": "Fórmula de Juros Compostos com Contribuições Regulares",
      "formulaText": "Valor Futuro (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nJuros Totais = Valor Futuro - (P + PMT × Períodos Totais)",
      "explanation": "P é o principal, r é a taxa nominal anual, n é a frequência de capitalização, t é o tempo em anos e PMT é a contribuição periódica.",
      "variables": [
        {
          "name": "P",
          "desc": "Saldo principal inicial"
        },
        {
          "name": "r",
          "desc": "Taxa de juros anual em forma decimal"
        },
        {
          "name": "n",
          "desc": "Períodos de capitalização por ano (12 = mensal, 1 = anual)"
        },
        {
          "name": "PMT",
          "desc": "Contribuição em dinheiro periódica recorrente"
        }
      ]
    },
    "howToCalculate": [
      "Insira o seu saldo de investimento principal inicial.",
      "Especifique a percentagem da Taxa de Juros Anual projetada.",
      "Insira o Horizonte de Tempo do investimento em anos.",
      "Opcionalmente, especifique um valor de Contribuição Mensal recorrente.",
      "Clique em Calcular para ver o valor futuro do portfólio, os juros totais ganhos e as trajetórias de crescimento anual."
    ],
    "example": {
      "problem": "Invista $10.000 com um retorno anual de 8% capitalizado mensalmente por 20 anos com $200 adicionados a cada mês.",
      "steps": [
        "Passo 1: Os $10.000 iniciais crescem para: $10.000 × (1 + 0.08/12)²⁴⁰ = $49.268,03.",
        "Passo 2: As contribuições mensais de $200 crescem para: $200 × [((1 + 0.08/12)²⁴⁰ - 1) / (0.08/12)] = $117.804,09.",
        "Passo 3: Valor total futuro do portfólio = $49.268,03 + $117.804,09 = $167.072,12.",
        "Passo 4: Total de dinheiro depositado = $10.000 + ($200 × 240) = $58.000. Juros totais ganhos = $109.072,12."
      ],
      "result": "O portfólio cresce para $167.072,12 com $109.072,12 gerados puramente a partir de juros compostos."
    },
    "notes": [
      "O tempo é o maior fator na capitalização: duplicar o prazo muitas vezes mais do que triplica os retornos do investimento.",
      "Historicamente, fundos de índice de mercado de ações amplos (como o S&P 500) têm tido uma média de ~10% de retornos nominais anuais antes da inflação.",
      "O crescimento real da riqueza deve considerar a inflação de longo prazo (~2-3% anualmente)."
    ],
    "faqs": [
      {
        "question": "O que são juros compostos?",
        "answer": "Juros compostos são juros calculados sobre o saldo principal inicial e também sobre os juros acumulados de períodos anteriores, criando um crescimento exponencial capitalizado."
      },
      {
        "question": "Com que frequência os juros são capitalizados em contas poupança?",
        "answer": "A maioria das contas poupança de alto rendimento modernas capitaliza os juros diariamente e os credita ao seu saldo no final de cada mês."
      },
      {
        "question": "O que é a Regra dos 72?",
        "answer": "A Regra dos 72 estima quantos anos levará para duplicar o seu dinheiro: divida 72 pela sua taxa de juros anual (por exemplo, a 8%, o dinheiro duplica em ~9 anos)."
      },
      {
        "question": "Por que os juros compostos são importantes para investimentos?",
        "answer": "Os juros compostos são cruciais porque permitem que o seu dinheiro cresça exponencialmente ao longo do tempo. Ao reinvestir os juros ganhos, você começa a ganhar juros sobre os juros, acelerando significativamente o acúmulo de riqueza em comparação com juros simples."
      }
    ],
    "breadcrumbName": "Calculadora de Juros Compostos"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "pt",
    "name": "Calculadora de Juros Simples",
    "category": "financial",
    "badge": "Juros Lineares",
    "icon": "PiggyBank",
    "h1": "Calculadora de Juros Simples",
    "seoTitle": "Calculadora de Juros Simples – Calcule Juros Simples e Valor de Vencimento",
    "seoDescription": "Calculadora de juros simples online gratuita. Calcule juros simples e o valor total de vencimento usando a fórmula clássica J = C × i × t para empréstimos e notas.",
    "primaryKeyword": "calculadora de juros simples",
    "secondaryKeywords": [
      "fórmula de juros simples",
      "calcular juros simples",
      "empréstimo com juros simples",
      "calculadora de valor de vencimento",
      "J = Cit"
    ],
    "heroSubtitle": "Calcule os ganhos de juros simples e os valores totais de vencimento usando a fórmula fundamental J = C × i × t.",
    "about": [
      "A Calculadora de Juros Simples calcula juros lineares sobre notas de dívida, empréstimos promissórios de curto prazo, certificados de depósito e problemas financeiros acadêmicos. Ao contrário dos juros compostos, os juros simples não geram juros sobre juros — o encargo é avaliado estritamente sobre o valor principal original.",
      "Este cálculo é comumente utilizado em empréstimos peer-to-peer de curto prazo, transações de penhor, estruturas de financiamento de parcelas de automóveis e planos de parcelamento de eletrônicos de consumo."
    ],
    "formula": {
      "title": "Fórmula de Juros Simples",
      "formulaText": "Juros (I) = (Principal × Taxa × Tempo) / 100\nMontante Total (A) = Principal + Juros",
      "explanation": "Multiplique o principal original pela taxa percentual anual e pela duração do tempo em anos, depois divida por 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Soma principal original investida ou emprestada"
        },
        {
          "name": "R",
          "desc": "Taxa de juros anual percentual"
        },
        {
          "name": "T",
          "desc": "Horizonte de tempo em anos"
        }
      ]
    },
    "howToCalculate": [
      "Insira o valor Principal inicial.",
      "Insira a taxa de juros anual percentual.",
      "Insira a duração ou o prazo do empréstimo em anos.",
      "Clique em Calcular para ver os juros simples gerados e o valor total de reembolso ou vencimento."
    ],
    "example": {
      "problem": "Calcule os juros simples de uma nota pessoal de $5.000 com juros anuais de 5,5% ao longo de 3 anos.",
      "steps": [
        "Passo 1: Identifique as variáveis: P = 5.000, R = 5.5, T = 3.",
        "Passo 2: Calcule os juros: I = (5.000 × 5.5 × 3) ÷ 100 = 82.500 ÷ 100 = $825.00.",
        "Passo 3: Montante total: $5.000 + $825 = $5.825.00."
      ],
      "result": "Os juros simples ganhos são de $825.00, resultando em um montante total de vencimento de $5.825.00."
    },
    "notes": [
      "Se o tempo for dado em meses, divida por 12 (por exemplo, 6 meses = 0,5 anos). Se for dado em dias, divida por 365.",
      "Juros simples rendem menos dinheiro total do que juros compostos em horizontes de tempo idênticos.",
      "As fórmulas de juros simples são o padrão em papel comercial e Títulos do Tesouro."
    ],
    "faqs": [
      {
        "question": "Qual é a fórmula para juros simples?",
        "answer": "A fórmula é I = P × R × T / 100, onde I são os Juros, P é o Principal, R é a taxa de juros anual e T é o tempo em anos."
      },
      {
        "question": "Como os juros simples diferem dos juros compostos?",
        "answer": "Os juros simples são calculados exclusivamente sobre o saldo principal original. Os juros compostos são calculados tanto sobre o principal quanto sobre os juros acumulados anteriormente."
      },
      {
        "question": "Quando os juros simples são utilizados?",
        "answer": "Os juros simples são tipicamente usados para empréstimos pessoais de curto prazo, financiamento de automóveis, acumulação de juros de empréstimos estudantis durante períodos de carência e papel comercial."
      },
      {
        "question": "Os juros simples são melhores que os juros compostos?",
        "answer": "Para os mutuários, os juros simples são geralmente mais favoráveis, pois o valor total a ser pago é menor. Para os investidores, os juros compostos são geralmente preferidos porque permitem que os ganhos cresçam exponencialmente ao longo do tempo."
      }
    ],
    "breadcrumbName": "Calculadora de Juros Simples"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "pt",
    "name": "Calculadora de GST",
    "category": "financial",
    "badge": "Imposto sobre Bens e Serviços",
    "icon": "Receipt",
    "h1": "Calculadora de GST",
    "seoTitle": "Calculadora de GST – Calcule Valores com e sem GST",
    "seoDescription": "Calculadora de GST online gratuita. Calcule preços com e sem GST, detalhamento do imposto (CGST/SGST) e valores líquidos para taxas padrão (5%, 12%, 18%, 28%).",
    "primaryKeyword": "calculadora de GST",
    "secondaryKeywords": [
      "calculadora de GST Índia",
      "cálculo de GST",
      "calcular GST",
      "calculadora de GST inclusivo",
      "calculadora de GST exclusivo",
      "calculadora de GST reverso"
    ],
    "heroSubtitle": "Calcule o Imposto sobre Bens e Serviços (GST) para transações inclusivas e exclusivas, divida CGST e SGST e determine os preços líquidos da fatura.",
    "about": [
      "A Calculadora de Imposto sobre Bens e Serviços (GST) automatiza a emissão de faturas fiscais para proprietários de empresas, contratados autônomos, contadores e consumidores de varejo. O GST é um imposto abrangente sobre valor agregado, baseado no destino, aplicado à fabricação, venda e consumo de bens e serviços.",
      "Esta ferramenta suporta dois modos comerciais padrão: GST Exclusivo (adicionar imposto a um preço base) e GST Inclusivo (calcular inversamente o preço base antes do imposto e a porção exata do imposto a partir de um preço de varejo bruto). Selecione entre as faixas de GST padrão (como 5%, 12%, 18%, 28%) ou insira taxas personalizadas."
    ],
    "formula": {
      "title": "Fórmulas de GST Inclusivo e Exclusivo",
      "formulaText": "GST Exclusivo (Adicionar GST):\nValor do GST = Preço Base × (Taxa de GST / 100)\nPreço Final = Preço Base + Valor do GST\n\nGST Inclusivo (Remover GST):\nPreço Base = Valor Bruto / (1 + Taxa de GST / 100)\nValor do GST = Valor Bruto - Preço Base",
      "explanation": "Para adicionar GST, multiplique o valor base pela taxa. Para extrair o GST de um total, divida a soma bruta por 1 mais a taxa decimal.",
      "variables": [
        {
          "name": "Preço Base",
          "desc": "Preço líquido antes do imposto do produto ou serviço"
        },
        {
          "name": "Taxa de GST",
          "desc": "Percentagem fiscal estatutária aplicável"
        },
        {
          "name": "CGST / SGST",
          "desc": "Componentes do GST Central e Estadual (cada um equivale a 50% do GST total na Índia)"
        }
      ]
    },
    "howToCalculate": [
      "Insira o Valor da transação.",
      "Selecione se o preço é GST Exclusivo (adicionar imposto) ou GST Inclusivo (remover imposto).",
      "Selecione uma taxa de imposto padrão (por exemplo, 5%, 12%, 18%, 28%) ou insira uma taxa personalizada.",
      "Clique em Calcular para ver o preço base antes do imposto, a porção do imposto GST, a divisão CGST/SGST e o preço final da fatura."
    ],
    "example": {
      "problem": "Calcule o custo antes do imposto e o valor do imposto de um item vendido por ₹1,180 com uma taxa de GST inclusiva de 18%.",
      "steps": [
        "Passo 1: Preço Base = ₹1,180 ÷ (1 + 0.18) = ₹1,180 ÷ 1.18 = ₹1,000.00.",
        "Passo 2: GST Total = ₹1,180 - ₹1,000 = ₹180.00.",
        "Passo 3: CGST (9%) = ₹90.00, e SGST (9%) = ₹90.00."
      ],
      "result": "O preço base líquido é ₹1,000.00 e o imposto GST cobrado é ₹180.00."
    },
    "notes": [
      "Para transações intraestaduais na Índia, o GST é dividido igualmente entre CGST (GST Central) e SGST (GST Estadual).",
      "Para vendas interestaduais entre fronteiras estaduais, o imposto total é designado como IGST (GST Integrado).",
      "As taxas de GST padrão selecionáveis incluem 0%, 5%, 12%, 18% e 28%."
    ],
    "faqs": [
      {
        "question": "Como se calcula o preço com GST incluído?",
        "answer": "Divida o preço total inclusivo por (1 + Taxa de GST / 100). Para uma taxa de GST de 18%, divida o preço total por 1.18 para determinar o preço base antes do imposto."
      },
      {
        "question": "Qual a diferença entre GST inclusivo e exclusivo?",
        "answer": "GST Exclusivo significa que o imposto ainda não foi adicionado ao preço. GST Inclusivo significa que o preço listado já incorpora o imposto."
      },
      {
        "question": "O que são CGST, SGST e IGST?",
        "answer": "Na Índia, o CGST vai para o governo central, o SGST vai para o governo estadual para vendas locais, e o IGST se aplica a vendas entre estados."
      },
      {
        "question": "Posso usar esta calculadora para outros países além da Índia?",
        "answer": "Sim, embora os exemplos e termos específicos como CGST/SGST sejam específicos da Índia, você pode usar o recurso de taxa personalizada para calcular o GST para qualquer pa��s que utilize um sistema de Imposto sobre Bens e Serviços semelhante, simplesmente inserindo a taxa de imposto aplicável."
      }
    ],
    "breadcrumbName": "Calculadora de GST"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "pt",
    "name": "Calculadora de Imposto de Renda",
    "category": "financial",
    "badge": "Renda e Deduções",
    "icon": "Scale",
    "h1": "Calculadora de Imposto de Renda",
    "seoTitle": "Calculadora de Imposto de Renda – Estime o Imposto e o Salário Líquido",
    "seoDescription": "Calculadora de imposto de renda online gratuita. Estime sua renda tributável, faixas de imposto de renda federal, alíquota efetiva e salário líquido mensal.",
    "primaryKeyword": "calculadora de imposto de renda",
    "secondaryKeywords": [
      "calcular imposto de renda",
      "estimativa de imposto",
      "calculadora de salário líquido",
      "alíquota efetiva de imposto"
    ],
    "heroSubtitle": "Estime sua renda tributável, sua obrigação fiscal, a alíquota efetiva e o salário líquido mensal.",
    "about": [
      "A Calculadora de Imposto de Renda oferece um estimador genérico de tributação progressiva para ajudar assalariados e profissionais autônomos a projetar sua obrigação fiscal anual e seus ganhos líquidos. Sistemas de imposto progressivo aplicam percentuais de imposto mais altos apenas às porções da renda que excedem os limites de faixas especificadas.",
      "Insira sua renda bruta anual e deduções permitidas (como deduções padrão, contribuições para aposentadoria ou contas de saúde) para visualizar as obrigações fiscais estimadas, as alíquotas marginais vs. efetivas e o salário líquido mensal."
    ],
    "formula": {
      "title": "Estrutura do Imposto de Renda Progressivo",
      "formulaText": "Renda Tributável = Renda Bruta Anual - Deduções\nImposto = ∑ (Renda Tributável na Faixa × Alíquota da Faixa)\nAlíquota Efetiva de Imposto = (Imposto Total / Renda Bruta) × 100\nSalário Líquido = Renda Bruta - Imposto Total",
      "explanation": "Deduções diminuem sua base tributável. As faixas de imposto são aplicadas incrementalmente — a renda não é tributada a uma única alíquota máxima fixa.",
      "variables": [
        {
          "name": "Renda Bruta",
          "desc": "Ganhos totais antes dos impostos de emprego ou negócio"
        },
        {
          "name": "Deduções",
          "desc": "Deduções padrão permitidas ou isenções pré-imposto"
        },
        {
          "name": "Alíquota Efetiva",
          "desc": "A porcentagem média real combinada da renda paga em imposto"
        }
      ]
    },
    "howToCalculate": [
      "Insira sua Renda Bruta Anual total.",
      "Insira suas Deduções anuais estimadas (como a dedução padrão ou poupança para aposentadoria).",
      "Clique em Calcular para ver sua renda tributável estimada, obrigação fiscal, alíquota efetiva e salário líquido mensal."
    ],
    "example": {
      "problem": "Estime o imposto para um indivíduo que ganha $85.000 com uma dedução padrão de $14.600.",
      "steps": [
        "Passo 1: Renda Tributável = $85.000 - $14.600 = $70.400.",
        "Passo 2: 10% sobre os primeiros $11.600 = $1.160,00.",
        "Passo 3: 12% sobre ($47.150 - $11.600 = $35.550) = $4.266,00.",
        "Passo 4: 22% sobre o restante ($70.400 - $47.150 = $23.250) = $5.115,00.",
        "Passo 5: Imposto total estimado = $1.160 + $4.266 + $5.115 = $10.541,00.",
        "Passo 6: Alíquota efetiva de imposto = ($10.541 ÷ $85.000) × 100 = 12,40%."
      ],
      "result": "O imposto de renda estimado é de $10.541,00 com uma alíquota efetiva de 12,40% e um salário líquido de $74.459,00."
    },
    "notes": [
      "Esta ferramenta fornece estimativas informativas genéricas e não substitui o aconselhamento oficial de um contador certificado ou profissional de impostos.",
      "Impostos estaduais, provinciais, municipais e contribuições previdenciárias/FICA são calculados separadamente.",
      "A alíquota marginal refere-se à alíquota paga sobre o último dólar ganho; a alíquota efetiva é a sua carga tributária média real combinada."
    ],
    "faqs": [
      {
        "question": "Qual a diferença entre alíquota marginal e alíquota efetiva de imposto?",
        "answer": "Sua alíquota marginal é a faixa de imposto mais alta aplicada ao seu último dólar de renda. Sua alíquota efetiva é a porcentagem geral real do seu rendimento total pago em imposto."
      },
      {
        "question": "Como as deduções reduzem minha conta de imposto?",
        "answer": "As deduções reduzem sua renda tributável. Por exemplo, uma dedução de $10.000 para alguém em uma faixa de imposto de 22% reduz o imposto real devido em $2.200."
      },
      {
        "question": "Esta calculadora inclui impostos de renda estaduais?",
        "answer": "Este modelo calcula faixas progressivas padrão. Os impostos estaduais e locais variam por jurisdição e devem ser considerados adicionalmente."
      },
      {
        "question": "O que é renda tributável?",
        "answer": "Renda tributável é a porção da sua renda bruta que está sujeita a imposto após a aplicação de todas as deduções e isenções permitidas. É sobre este valor que as alíquotas de imposto são calculadas."
      }
    ],
    "breadcrumbName": "Calculadora de Imposto de Renda"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "pt",
    "name": "Calculadora de Desconto",
    "category": "financial",
    "badge": "Promoções e Economia",
    "icon": "Tag",
    "h1": "Calculadora de Desconto",
    "seoTitle": "Calculadora de Desconto – Calcule Preço de Venda e Percentual de Desconto",
    "seoDescription": "Calculadora de desconto online gratuita. Calcule preços de venda finais, dinheiro economizado e percentuais de desconto instantaneamente com cálculos opcionais de imposto sobre vendas.",
    "primaryKeyword": "calculadora de desconto",
    "secondaryKeywords": [
      "calculadora de percentual de desconto",
      "calculadora de preço de venda",
      "calculadora de percentagem de desconto",
      "quanto eu economizo",
      "calculadora de desconto reverso"
    ],
    "heroSubtitle": "Calcule preços de venda com desconto, o total economizado e os custos finais com imposto sobre vendas para compras e promoções de varejo.",
    "about": [
      "A Calculadora de Desconto ajuda compradores e comerciantes de varejo a calcular rapidamente as reduções de preço durante eventos de vendas (como Black Friday, Cyber Monday, liquidações sazonais e cupons promocionais).",
      "Insira o preço original e o percentual de desconto anunciado para ver imediatamente quanto dinheiro você economiza, o preço com desconto e o custo final no caixa após a aplicação do imposto sobre vendas local."
    ],
    "formula": {
      "title": "Fórmulas de Desconto e Preço de Venda Final",
      "formulaText": "Valor Economizado = Preço Original × (Desconto % / 100)\nPreço com Desconto = Preço Original - Valor Economizado\nPreço Final com Imposto = Preço com Desconto + (Preço com Desconto × Imposto % / 100)",
      "explanation": "Multiplique o preço de etiqueta pelo percentual de desconto para encontrar a economia, então subtraia esse valor do preço original.",
      "variables": [
        {
          "name": "Preço Original",
          "desc": "Preço de etiqueta do fabricante ou varejo antes da venda"
        },
        {
          "name": "Desconto %",
          "desc": "Percentual de redução de preço anunciado"
        },
        {
          "name": "Imposto sobre Vendas %",
          "desc": "Taxa opcional de imposto sobre vendas estadual ou local"
        }
      ]
    },
    "howToCalculate": [
      "Insira o Preço de Etiqueta Original.",
      "Insira o Percentual de Desconto (por exemplo, 20% ou 35% de desconto).",
      "Opcionalmente, insira o percentual do seu Imposto sobre Vendas local.",
      "Clique em Calcular para ver sua economia exata em dinheiro e o preço final."
    ],
    "example": {
      "problem": "Uma jaqueta de inverno com preço de $180 está em promoção com 30% de desconto, com um imposto sobre vendas local de 8%.",
      "steps": [
        "Passo 1: Economia = $180 × 0.30 = $54.00.",
        "Passo 2: Preço com desconto = $180 - $54.00 = $126.00.",
        "Passo 3: Imposto sobre vendas = $126.00 × 0.08 = $10.08.",
        "Passo 4: Preço final no caixa = $126.00 + $10.08 = $136.08."
      ],
      "result": "Você economiza $54.00. A jaqueta custa $126.00 antes do imposto e $136.08 depois do imposto."
    },
    "notes": [
      "Um desconto de 50% significa que você paga metade do preço original.",
      "Acumular descontos (por exemplo, 20% de desconto mais um 10% extra de desconto) não é 30% de desconto — o segundo desconto se aplica ao subtotal já com desconto.",
      "O imposto sobre vendas é calculado sobre o preço final com desconto, não sobre o preço de etiqueta original."
    ],
    "faqs": [
      {
        "question": "Como se calcula um desconto de 20% em um item?",
        "answer": "Multiplique o preço por 0.20 para encontrar o valor que você economiza, ou multiplique o preço por 0.80 para encontrar diretamente o preço final de venda."
      },
      {
        "question": "Como funciona uma promoção 'compre um, leve o segundo com 50% de desconto' em termos percentuais?",
        "answer": "Se dois itens com o mesmo preço forem comprados, um desconto BOGO de 50% equivale a um desconto geral de 25% em ambos os itens."
      },
      {
        "question": "Como calculo o preço original a partir de um preço de venda?",
        "answer": "Divida o preço de venda por (1 - Desconto % / 100). Por exemplo, se um item custa $80 após um desconto de 20%: $80 / 0.80 = $100 preço original."
      }
    ],
    "breadcrumbName": "Calculadora de Desconto"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "pt",
    "name": "Calculadora de Margem de Lucro",
    "category": "financial",
    "badge": "Margem vs. Markup",
    "icon": "BarChart3",
    "h1": "Calculadora de Margem de Lucro",
    "seoTitle": "Calculadora de Margem de Lucro – Calcule Margem Bruta e Markup Online",
    "seoDescription": "Calculadora de margem de lucro online gratuita. Calcule o lucro bruto, a percentagem da margem de lucro e a percentagem do markup a partir do custo do item e do preço de venda.",
    "primaryKeyword": "calculadora de margem de lucro",
    "secondaryKeywords": [
      "calculadora de lucro",
      "calculadora de margem",
      "calculadora de markup",
      "margem de lucro bruta",
      "margem vs markup"
    ],
    "heroSubtitle": "Calcule o lucro bruto, a percentagem da margem de lucro e a percentagem do markup de varejo para precificar produtos de forma lucrativa.",
    "about": [
      "A Calculadora de Margem de Lucro ajuda empreendedores, varejistas, dropshippers e proprietários de pequenas empresas a determinar com precisão a lucratividade e a distinguir entre Margem e Markup. Confundir essas duas métricas é um dos erros de precificação mais comuns no comércio.",
      "A Margem de Lucro Bruta indica qual percentagem da receita total é retida após contabilizar o Custo dos Produtos Vendidos (CPV). O Markup reflete o aumento percentual aplicado sobre o custo base para estabelecer o preço de venda no varejo."
    ],
    "formula": {
      "title": "Fórmulas de Margem Bruta e Markup",
      "formulaText": "Lucro Bruto = Receita - Custo\nMargem de Lucro (%) = (Lucro Bruto / Receita) × 100\nMarkup (%) = (Lucro Bruto / Custo) × 100",
      "explanation": "A margem é calculada em relação à receita (preço de venda), enquanto o markup é calculado em relação ao custo do produto.",
      "variables": [
        {
          "name": "Custo",
          "desc": "Custo dos Produtos Vendidos (CPV) para adquirir ou produzir a unidade"
        },
        {
          "name": "Receita",
          "desc": "Preço de venda cobrado do consumidor"
        },
        {
          "name": "Lucro Bruto",
          "desc": "Receita líquida restante após deduzir o custo de produção direto"
        }
      ]
    },
    "howToCalculate": [
      "Insira o Custo para adquirir ou produzir o produto (ex: $40).",
      "Insira a Receita ou o Preço de Venda alvo (ex: $100).",
      "Clique em Calcular para ver o lucro bruto em dólares, a percentagem da margem de lucro e a percentagem do markup necessário."
    ],
    "example": {
      "problem": "Uma empresa compra um item por $50 e o vende por $80. Quais são o lucro bruto, a margem de lucro e o markup?",
      "steps": [
        "Passo 1: Lucro Bruto = $80 (Receita) - $50 (Custo) = $30.00.",
        "Passo 2: Margem de Lucro = ($30 ÷ $80) × 100 = 37.5%.",
        "Passo 3: Markup = ($30 ÷ $50) × 100 = 60.0%."
      ],
      "result": "O lucro bruto é de $30.00. A margem de lucro é de 37.5%, e o markup é de 60.0%."
    },
    "notes": [
      "A margem nunca pode exceder 100%, enquanto o markup pode ser de 200%, 500% ou superior.",
      "Um markup de 50% corresponde a uma margem de 33.3%. Um markup de 100% corresponde a uma margem de 50%.",
      "A margem de lucro líquida deduz despesas gerais, marketing e impostos, além dos custos diretos de produção."
    ],
    "faqs": [
      {
        "question": "Qual é a principal diferença entre margem e markup?",
        "answer": "A margem é o lucro dividido pelo preço de venda (receita). O markup é o lucro dividido pelo custo. A margem mede o que você retém das vendas; o markup mede o que você adiciona aos custos."
      },
      {
        "question": "Por que o markup é sempre maior que a margem para o mesmo item?",
        "answer": "Porque o custo é sempre menor que o preço de venda para produtos lucrativos. Dividir o mesmo lucro em dólares pelo custo menor resulta em uma percentagem maior do que dividir pela receita."
      },
      {
        "question": "Qual é uma boa margem de lucro para negócios de varejo?",
        "answer": "Uma margem de lucro bruta saudável geralmente varia de 40% a 60% para varejo e e-commerce, enquanto as margens de lucro líquidas geralmente variam de 10% a 20%."
      },
      {
        "question": "Como posso usar a calculadora de margem de lucro para otimizar meus preços?",
        "answer": "A calculadora permite que você experimente diferentes custos e preços de venda para ver o impacto na sua margem e markup. Isso ajuda a definir preços competitivos que garantam a lucratividade desejada, ajustando-se às condições de mercado e aos custos de aquisição."
      }
    ],
    "breadcrumbName": "Calculadora de Margem de Lucro"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "pt",
    "name": "Calculadora de Salário",
    "category": "financial",
    "badge": "Por Hora, Mensal e Anual",
    "icon": "Wallet",
    "h1": "Calculadora de Salário",
    "seoTitle": "Calculadora de Salário – Converter Pagamento Horário, Semanal, Mensal e Anual",
    "seoDescription": "Calculadora de salário online gratuita. Converta entre salário por hora, pagamento semanal, salário quinzenal, renda mensal e remuneração anual com horas de trabalho personalizadas.",
    "primaryKeyword": "calculadora de salário",
    "secondaryKeywords": [
      "calculadora de salário anual",
      "calculadora de salário mensal",
      "calculadora de salário por hora",
      "converter salário por hora em anual",
      "calculadora de vencimento"
    ],
    "heroSubtitle": "Converta a remuneração entre salário anual, pagamento mensal, pagamentos quinzenais e taxas de salário por hora.",
    "about": [
      "A Calculadora de Salário converte a remuneração do emprego em todas as frequências de folha de pagamento padrão: salário anual, ganhos mensais, pagamentos quinzenais, salários semanais, taxas diárias e pagamento por hora.",
      "Seja para negociar uma oferta de emprego, converter uma taxa de contratado de $30/hora para um equivalente anual, ou orçar despesas mensais de vida, esta calculadora fornece conversões de folha de pagamento instantâneas e padronizadas com base nas suas horas de trabalho semanais."
    ],
    "formula": {
      "title": "Padrões de Conversão de Salário Padrão",
      "formulaText": "Salário Anual = Salário por Hora × Horas/Semana × Semanas/Ano\nSalário Mensal = Salário Anual / 12\nPagamento Quinzenal = Salário Anual / 26\nPagamento Semanal = Salário Anual / 52\nSalário por Hora = Salário Anual / (Horas/Semana × Semanas/Ano)",
      "explanation": "Baseado numa semana de trabalho padrão de 40 horas e 52 semanas de trabalho por ano (2.080 horas de trabalho anuais).",
      "variables": [
        {
          "name": "Horas Padrão",
          "desc": "40 horas por semana"
        },
        {
          "name": "Semanas Padrão",
          "desc": "52 semanas por ano civil (2.080 horas de trabalho totais)"
        }
      ]
    },
    "howToCalculate": [
      "Insira o seu Valor de Remuneração.",
      "Selecione a frequência de pagamento: Anual, Mensal, Quinzenal, Semanal, Diário ou Por Hora.",
      "Ajuste as horas de trabalho por semana (padrão 40) ou semanas de trabalho por ano (padrão 52) e clique em Calcular para ver a tabela de conversão."
    ],
    "example": {
      "problem": "Converta um salário anual de $75.000 para pagamento mensal, quinzenal, semanal e por hora (40 horas/semana, 52 semanas).",
      "steps": [
        "Passo 1: Pagamento Mensal = $75.000 ÷ 12 = $6.250,00. Pagamento Quinzenal (26 períodos) = $75.000 ÷ 26 = $2.884,62.",
        "Passo 2: Pagamento Semanal = $75.000 ÷ 52 = $1.442,31. Salário por Hora = $75.000 ÷ 2.080 horas = $36,06/hora."
      ],
      "result": "Um salário de $75.000 equivale a $6.250,00/mês, $2.884,62 quinzenalmente e $36,06 por hora."
    },
    "notes": [
      "Os cálculos refletem o rendimento bruto antes dos impostos federais, estaduais e retenções de benefícios estatutários.",
      "O pagamento quinzenal ocorre 26 vezes por ano (resultando em dois meses por ano com três pagamentos). O pagamento bimensal (duas vezes por mês) ocorre 24 vezes por ano.",
      "Para contratados freelancers, considere os impostos de autônomo e semanas de férias não remuneradas."
    ],
    "faqs": [
      {
        "question": "Como converter salário por hora em salário anual?",
        "answer": "Multiplique o seu salário por hora pelas horas trabalhadas por semana e, em seguida, multiplique por 52 semanas. Para um horário de tempo integral de 40 horas, multiplique a taxa horária por 2.080."
      },
      {
        "question": "Qual a diferença entre pagamento quinzenal e pagamento bimensal (duas vezes por mês)?",
        "answer": "O pagamento quinzenal ocorre a cada duas semanas (26 pagamentos/ano). O pagamento bimensal (duas vezes por mês) ocorre duas vezes por mês em datas específicas, como o dia 1 e o dia 15 (24 pagamentos/ano)."
      },
      {
        "question": "Quantas horas de trabalho há num ano de trabalho padrão?",
        "answer": "Um funcionário padrão em tempo integral que trabalha 40 horas por semana durante 52 semanas trabalha um total de 2.080 horas por ano."
      }
    ],
    "breadcrumbName": "Calculadora de Salário"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "pt",
    "name": "Calculadora de Moedas",
    "category": "financial",
    "badge": "Taxas de Câmbio e Forex",
    "icon": "Coins",
    "h1": "Calculadora de Moedas",
    "seoTitle": "Calculadora de Moedas – Conversor de Câmbio e Taxas ao Vivo",
    "seoDescription": "Calculadora de moedas online gratuita. Converta entre USD, EUR, GBP, INR, CAD, AUD, JPY e as principais moedas globais com taxas de câmbio interbancárias.",
    "primaryKeyword": "calculadora de moedas",
    "secondaryKeywords": [
      "conversor de moedas",
      "calculadora de taxa de câmbio",
      "calculadora USD para INR",
      "calculadora EUR para USD",
      "calculadora de câmbio"
    ],
    "heroSubtitle": "Converta valores entre moedas globais com taxas de câmbio interbancárias de referência transparentes.",
    "about": [
      "A Calculadora de Moedas oferece conversões de câmbio confiáveis entre as principais moedas globais, incluindo Dólar Americano (USD), Euro (EUR), Libra Esterlina (GBP), Rupia Indiana (INR), Dólar Canadense (CAD), Dólar Australiano (AUD), Iene Japonês (JPY) e Franco Suíço (CHF).",
      "Seja para orçar viagens internacionais, converter faturas de freelancers internacionais ou comparar preços de e-commerce global, esta ferramenta converte valores usando taxas de referência interbancárias padrão de mercado médio."
    ],
    "formula": {
      "title": "Conversão de Taxa de Câmbio",
      "formulaText": "Valor Alvo = Valor Base × Taxa de Câmbio Direta (Da Moeda ⟶ Para Moeda)\nTaxa Inversa = 1 / Taxa de Câmbio Direta",
      "explanation": "Converte a moeda de origem para o equivalente em USD de referência e, em seguida, escala pelo multiplicador da taxa de câmbio da moeda alvo.",
      "variables": [
        {
          "name": "Valor Base",
          "desc": "A quantidade monetária a ser convertida"
        },
        {
          "name": "Taxa Direta",
          "desc": "O preço de uma unidade da moeda de origem em termos da moeda alvo"
        },
        {
          "name": "Taxa Inversa",
          "desc": "O preço recíproco da moeda alvo em termos da moeda de origem"
        }
      ]
    },
    "howToCalculate": [
      "Insira o Valor monetário a ser convertido.",
      "Selecione a Moeda de Origem (ex: USD, EUR, GBP).",
      "Selecione a Moeda de Destino (ex: INR, CAD, AUD).",
      "Clique em Calcular para ver o valor convertido, a taxa de câmbio de referência atual e a taxa de conversão inversa."
    ],
    "example": {
      "problem": "Converta $500 USD para Euros (EUR) a uma taxa de câmbio de referência ilustrativa de 1 USD = 0.8950 EUR.",
      "steps": [
        "Passo 1: Valor Base = 500 USD.",
        "Passo 2: Multiplique pela taxa de câmbio: 500 × 0.8950 = 447.50 EUR.",
        "Passo 3: Taxa inversa = 1 ÷ 0.8950 = 1.1173 USD por 1 EUR."
      ],
      "result": "$500 USD convertem para 447.50 EUR a uma taxa de câmbio de referência ilustrativa de 0.8950."
    },
    "notes": [
      "As taxas de câmbio refletem as taxas interbancárias de mercado médio; bancos de consumo e cartões de varejo podem cobrar uma taxa de transação estrangeira adicional de 1.5% a 3.5%.",
      "As taxas de câmbio flutuam continuamente durante o horário de negociação do mercado cambial global aberto.",
      "As taxas de referência são atualizadas regularmente com base em feeds de referência interbancários."
    ],
    "faqs": [
      {
        "question": "O que é a taxa de câmbio de mercado médio?",
        "answer": "A taxa de mercado médio é o ponto médio entre as taxas globais de compra e venda nos mercados cambiais (forex). Ela representa a taxa mais justa, sem margem de lucro."
      },
      {
        "question": "Por que as taxas de câmbio de varejo diferem dos conversores online?",
        "answer": "Bancos comerciais e casas de câmbio em aeroportos aplicam um spread de margem ou taxa de comissão para lucrar com as transações de conversão de moeda."
      },
      {
        "question": "Posso calcular a taxa de conversão inversa?",
        "answer": "Sim. A calculadora exibe a taxa inversa recíproca (ex: 1 INR = 0.012 USD) juntamente com o resultado da conversão principal."
      }
    ],
    "breadcrumbName": "Calculadora de Moedas"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "pt",
    "name": "Calculadora de Porcentagem",
    "category": "math",
    "badge": "Ferramenta Matemática Rápida",
    "icon": "Percent",
    "h1": "Calculadora de Porcentagem",
    "seoTitle": "Calculadora de Porcentagem – Calcule Porcentagens Facilmente Online",
    "seoDescription": "Calculadora de porcentagem online gratuita. Calcule a porcentagem de um número, variação percentual, aumento, diminuição e diferenças percentuais instantaneamente com fórmulas.",
    "primaryKeyword": "calculadora de porcentagem",
    "secondaryKeywords": [
      "calcular porcentagem",
      "calculadora de percentual",
      "calculadora de aumento percentual",
      "calculadora de diminuição percentual",
      "diferença percentual"
    ],
    "heroSubtitle": "Calcule porcentagens de valores, aumento e diminuição percentual, ou descubra qual porcentagem um número representa de outro com precisão matemática instantânea.",
    "about": [
      "A Calculadora de Porcentagem é uma ferramenta online versátil projetada para estudantes, compradores, contadores e analistas que precisam de cálculos de porcentagem rápidos e sem erros. As porcentagens representam frações de 100 e formam a espinha dorsal das tarefas quantitativas diárias — desde o cálculo de descontos de vendas e margens de lucro no varejo até a análise de retornos de investimentos financeiros e pontuações de testes de exames.",
      "Esta ferramenta suporta quatro modos de cálculo essenciais: encontrar uma porcentagem de um total, calcular qual porcentagem um número representa de outro, computar o aumento ou diminuição percentual entre dois números e determinar a diferença percentual relativa entre dois valores independentes."
    ],
    "formula": {
      "title": "Fórmulas Padrão de Porcentagem",
      "formulaText": "Percentage = (Part / Whole) × 100\nPercentage of Value = (Percent / 100) × Total\nPercentage Change = ((New Value - Old Value) / |Old Value|) × 100",
      "explanation": "Para calcular qual fração de um todo uma quantidade representa, divida a parte pelo total e multiplique por 100. Para variações percentuais, divida o aumento ou diminuição absoluta pelo valor inicial de referência.",
      "variables": [
        {
          "name": "Parte",
          "desc": "A porção ou subconjunto de valor sendo avaliado"
        },
        {
          "name": "Total",
          "desc": "A quantidade de referência base ou total"
        },
        {
          "name": "Valor Antigo",
          "desc": "A quantidade de referência original antes da mudança"
        },
        {
          "name": "Novo Valor",
          "desc": "A quantidade atualizada após a mudança"
        }
      ]
    },
    "howToCalculate": [
      "Selecione o modo de cálculo de porcentagem que corresponde à sua pergunta (por exemplo, \"Quanto é X% de Y\" ou \"Variação Percentual\").",
      "Insira seus valores numéricos conhecidos nos campos de entrada fornecidos.",
      "Visualize o resultado calculado em tempo real, a fórmula formatada e a decomposição fracionária abaixo.",
      "Use o botão Copiar para exportar rapidamente seu resultado ou Redefinir para realizar um novo cálculo."
    ],
    "example": {
      "problem": "Quanto é 15% de $240, e qual é o aumento percentual de $200 para $250?",
      "steps": [
        "Passo 1 (Porcentagem de um valor): (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Passo 2 (Aumento percentual): Diferença = 250 - 200 = 50.",
        "Passo 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% de aumento."
      ],
      "result": "15% de 240 é 36. Um aumento de 200 para 250 é um ganho de 25%."
    },
    "notes": [
      "A variação percentual sempre divide pelo número inicial original, não pelo número final.",
      "Um aumento percentual seguido por uma diminuição percentual equivalente não retorna ao valor original (por exemplo, +50% e depois -50% resulta em 75% do valor base).",
      "Para converter um decimal em porcentagem, multiplique por 100 (por exemplo, 0.85 = 85%). Para converter uma porcentagem em decimal, divida por 100."
    ],
    "faqs": [
      {
        "question": "Como calculo a porcentagem de um número?",
        "answer": "Para calcular a porcentagem de um número, converta a porcentagem em um decimal dividindo-a por 100 e, em seguida, multiplique esse decimal pelo número total. Por exemplo, 20% de 150 é (20 / 100) × 150 = 30."
      },
      {
        "question": "Como calculo o aumento percentual entre dois números?",
        "answer": "Subtraia o valor original do novo valor para encontrar a diferença. Em seguida, divida essa diferença pelo valor original e multiplique por 100. Por exemplo, de 50 para 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% de aumento."
      },
      {
        "question": "Qual a diferença entre variação percentual e diferença percentual?",
        "answer": "A variação percentual é usada quando há um valor \"antigo\" e um \"novo\" ao longo do tempo, dividindo pelo valor inicial. A diferença percentual é usada ao comparar dois valores concorrentes onde nenhum é o ponto de referência, dividindo a diferença absoluta pela sua média."
      },
      {
        "question": "A variação percentual pode ser negativa?",
        "answer": "Sim. Se o valor final for menor que o valor inicial, a variação percentual é negativa, representando uma diminuição percentual."
      }
    ],
    "breadcrumbName": "Calculadora de Porcentagem"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "pt",
    "name": "Calculadora de Razão",
    "category": "math",
    "badge": "Proporção e Simplificação",
    "icon": "Divide",
    "h1": "Calculadora de Razão",
    "seoTitle": "Calculadora de Razão – Simplifique e Resolva Proporções Online",
    "seoDescription": "Calculadora de razão online grátis. Simplifique razões para os termos mais baixos, encontre termos ausentes em proporções (A:B = C:D) e calcule fatores de escala instantaneamente.",
    "primaryKeyword": "calculadora de razão",
    "secondaryKeywords": [
      "simplificar razões",
      "resolver proporções",
      "razões equivalentes",
      "proporção de tela"
    ],
    "heroSubtitle": "Simplifique razões de duas partes para os inteiros mais simples, gere frações equivalentes e resolva variáveis de proporção ausentes instantaneamente.",
    "about": [
      "A Calculadora de Razão permite simplificar razões para os seus termos inteiros mais baixos, converter razões decimais em proporções inteiras claras e resolver equações de proporção equivalentes da forma A : B = C : D.",
      "Razões expressam o tamanho relativo de duas ou mais quantidades. Elas são ubíquas na escala de receitas, proporções de aspecto em design gráfico (como 16:9 e 4:3), métricas de balanço financeiro (razão corrente, dívida/capital próprio) e misturas de soluções químicas."
    ],
    "formula": {
      "title": "Fórmulas de Simplificação de Razão e Proporção",
      "formulaText": "Razão Simplificada = (A / MDC(A, B)) : (B / MDC(A, B))\nEquação de Proporção: A / B = C / D ⟹ A × D = B × C",
      "explanation": "Para simplificar uma razão, divida ambos os termos pelo seu Máximo Divisor Comum (MDC). Em proporções, a multiplicação cruzada permite resolver qualquer variável ausente.",
      "variables": [
        {
          "name": "A & B",
          "desc": "Primeiro antecedente e consequente da razão"
        },
        {
          "name": "C & D",
          "desc": "Segundo antecedente e consequente da proporção equivalente"
        },
        {
          "name": "MDC",
          "desc": "Máximo Divisor Comum entre os números"
        }
      ]
    },
    "howToCalculate": [
      "Para simplificar uma razão, insira os números A e B e visualize a proporção inteira irredutível.",
      "Para resolver uma proporção A:B = C:D, insira quaisquer três valores conhecidos e deixe o campo alvo vazio.",
      "A calculadora executa a multiplicação cruzada e reduz os termos instantaneamente."
    ],
    "example": {
      "problem": "Simplifique a razão 24 : 36 e resolva para X em 4 : 5 = X : 25.",
      "steps": [
        "Passo 1 (Simplificação): Encontre o MDC(24, 36) = 12.",
        "Passo 2: 24 ÷ 12 = 2, e 36 ÷ 12 = 3. A razão simplificada é 2 : 3.",
        "Passo 3 (Proporção): 4 / 5 = X / 25 ⟹ 5 × X = 4 × 25 = 100 ⟹ X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 reduz para 2:3. Em 4:5 = X:25, X é igual a 20."
    },
    "notes": [
      "Ambos os lados de uma razão podem ser multiplicados ou divididos pelo mesmo número não-zero sem alterar o seu valor.",
      "Razões decimais são automaticamente multiplicadas por potências de 10 antes da redução para garantir saídas inteiras.",
      "Razões representam relações comparativas, não quantidades absolutas. Uma razão de 2:3 pode descrever 2 e 3 itens ou 200 e 300 itens."
    ],
    "faqs": [
      {
        "question": "Como simplificar uma razão para os termos mais baixos?",
        "answer": "Encontre o Máximo Divisor Comum (MDC) de ambos os números e, em seguida, divida ambos os números por esse MDC. Por exemplo, em 15:25, o MDC é 5, então dividir ambos por 5 resulta em 3:5."
      },
      {
        "question": "Como resolver uma proporção quando um número é desconhecido?",
        "answer": "Use a multiplicação cruzada: se A/B = C/D, então A × D = B × C. Multiplique os números diagonais e divida pelo número restante oposto ao desconhecido."
      },
      {
        "question": "Razões podem conter decimais ou frações?",
        "answer": "Embora as razões possam ser inicialmente escritas com decimais (por exemplo, 1.5 : 2.5), a convenção padrão é expressá-las com inteiros positivos, escalando ambos os termos."
      },
      {
        "question": "Qual a diferença entre razão e proporção?",
        "answer": "Uma razão é uma comparação entre duas quantidades (ex: 2:3), enquanto uma proporção é uma declaração de que duas razões são iguais (ex: 2:3 = 4:6)."
      }
    ],
    "breadcrumbName": "Calculadora de Razão"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "pt",
    "name": "Calculadora de Frações",
    "category": "math",
    "badge": "Operações com Frações",
    "icon": "Binary",
    "h1": "Calculadora de Frações",
    "seoTitle": "Calculadora de Frações – Somar, Subtrair, Multiplicar e Dividir Frações",
    "seoDescription": "Calculadora de frações online gratuita. Adicione, subtraia, multiplique e divida facilmente frações próprias, impróprias e mistas com redução passo a passo à forma mais simples.",
    "primaryKeyword": "calculadora de frações",
    "secondaryKeywords": [
      "somar frações",
      "simplificador de frações",
      "subtrair frações",
      "multiplicar frações",
      "dividir frações",
      "calculadora de números mistos"
    ],
    "heroSubtitle": "Adicione, subtraia, multiplique e divida frações e números mistos com simplificação automática, denominadores comuns e conversão decimal.",
    "about": [
      "A Calculadora de Frações oferece soluções completas passo a passo para somar, subtrair, multiplicar e dividir frações matemáticas. Ela lida com frações próprias (numerador < denominador), frações impróprias (numerador > denominador) e números mistos.",
      "Seja para verificar a lição de casa, ajustar receitas culinárias ou calcular medidas de engenharia, esta ferramenta reduz os resultados à sua forma irredutível mais simples e exibe o equivalente decimal."
    ],
    "formula": {
      "title": "Regras da Aritmética de Frações",
      "formulaText": "Addition: (a/b) + (c/d) = (ad + bc) / bd\nSubtraction: (a/b) - (c/d) = (ad - bc) / bd\nMultiplication: (a/b) × (c/d) = (ac) / (bd)\nDivision: (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "Para adição e subtração, converta para um denominador comum antes de combinar os numeradores. Para multiplicação, multiplique diretamente. Para divisão, multiplique pela recíproca da segunda fração.",
      "variables": [
        {
          "name": "a & c",
          "desc": "Numeradores (números superiores das frações)"
        },
        {
          "name": "b & d",
          "desc": "Denominadores (números inferiores, não devem ser zero)"
        }
      ]
    },
    "howToCalculate": [
      "Insira o numerador e o denominador para a sua primeira fração.",
      "Selecione a operação aritmética: Adição (+), Subtração (-), Multiplicação (×) ou Divisão (÷).",
      "Insira o numerador e o denominador para a sua segunda fração.",
      "Clique em Calcular para ver a fração simplificada, o número misto e a representação decimal."
    ],
    "example": {
      "problem": "Calcule 3/4 + 2/3.",
      "steps": [
        "Passo 1: O denominador comum é 4 × 3 = 12.",
        "Passo 2: Converta os numeradores: (3 × 3) / 12 = 9/12, e (2 × 4) / 12 = 8/12.",
        "Passo 3: Some os numeradores: 9/12 + 8/12 = 17/12.",
        "Passo 4: Converta a fração imprópria para número misto: 17 ÷ 12 = 1 com um resto de 5, resultando em 1 5/12 (aprox. 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, que é igual a 1 5/12 ou 1.4167."
    },
    "notes": [
      "Um denominador nunca pode ser zero porque a divisão por zero é matematicamente indefinida.",
      "Frações negativas são padronizadas com o sinal de menos no numerador (por exemplo, -3/4).",
      "A calculadora encontra automaticamente o Máximo Divisor Comum para reduzir os resultados à forma mais simples."
    ],
    "faqs": [
      {
        "question": "Como se somam frações com denominadores diferentes?",
        "answer": "Encontre um denominador comum (geralmente multiplicando os dois denominadores), ajuste ambos os numeradores de acordo, some os numeradores e simplifique a fração resultante."
      },
      {
        "question": "Como se dividem duas frações?",
        "answer": "Para dividir frações, multiplique a primeira fração pelo recíproco (a forma invertida) da segunda fração. Por exemplo, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "O que é um número misto?",
        "answer": "Um número misto consiste em um número inteiro combinado com uma fração própria, como 2 1/2, que representa 2 + 1/2 (ou 5/2 como uma fração imprópria)."
      },
      {
        "question": "Qual a diferença entre uma fração própria e uma fração imprópria?",
        "answer": "Uma fração própria tem o numerador menor que o denominador (por exemplo, 1/2, 3/4). Uma fração imprópria tem o numerador igual ou maior que o denominador (por exemplo, 5/4, 7/3). Frações impróprias podem ser convertidas em números mistos."
      }
    ],
    "breadcrumbName": "Calculadora de Frações"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "pt",
    "name": "Calculadora de Idade",
    "category": "time-date",
    "badge": "Idade Exata e Dias",
    "icon": "Calendar",
    "h1": "Calculadora de Idade",
    "seoTitle": "Calculadora de Idade – Calcule Sua Idade Exata pela Data de Nascimento",
    "seoDescription": "Calculadora de idade online gratuita. Descubra sua idade exata em anos, meses, semanas, dias e horas, desde sua data de nascimento até hoje ou qualquer data alvo.",
    "primaryKeyword": "calculadora de idade",
    "secondaryKeywords": [
      "calcular idade",
      "quantos anos eu tenho",
      "calculadora de idade pela data de nascimento",
      "calculadora de aniversário",
      "calculadora de idade cronológica"
    ],
    "heroSubtitle": "Calcule sua idade exata em anos, meses, dias, horas e descubra a contagem regressiva para o seu próximo aniversário com precisão de calendário.",
    "about": [
      "A Calculadora de Idade calcula sua idade cronológica precisa com base na sua data de nascimento. Enquanto a idade convencional é simplesmente expressa em anos, esta calculadora detalha sua vida em anos exatos, meses de calendário e dias restantes, considerando anos bissextos e durações de meses variáveis.",
      "Além da idade atual, a ferramenta permite que você meça a idade em qualquer data passada ou futura especificada — útil para admissões escolares, verificações de idade legal, marcos de aposentadoria e solicitações de passaporte ou visto."
    ],
    "formula": {
      "title": "Método de Cálculo da Idade Cronológica",
      "formulaText": "Anos = Ano Alvo - Ano de Nascimento (ajustado para mês/dia)\nMeses = Mês Alvo - Mês de Nascimento (ajustado para dia)\nDias = Dia Alvo - Dia de Nascimento (emprestando dias do mês anterior se negativo)",
      "explanation": "O cálculo da idade com precisão de calendário considera as diferentes durações dos meses (28 a 31 dias) e os anos bissextos quadrienais, garantindo precisão dia a dia.",
      "variables": [
        {
          "name": "Data de Nascimento",
          "desc": "A data de início do nascimento"
        },
        {
          "name": "Data Alvo",
          "desc": "A data de referência para avaliação (padrão é hoje)"
        }
      ]
    },
    "howToCalculate": [
      "Insira sua data de nascimento usando os seletores de dia, mês e ano.",
      "Opcionalmente, especifique uma data alvo para avaliação (o padrão é a data de hoje).",
      "Clique em Calcular para ver sua idade exata em anos, meses e dias.",
      "Explore os resumos da vida total em meses, semanas, dias e a contagem regressiva para o seu próximo aniversário."
    ],
    "example": {
      "problem": "Qual é a idade exata de alguém nascido em 15 de junho de 1995, avaliada em 8 de outubro de 2026?",
      "steps": [
        "Passo 1: Diferença em anos: 2026 - 1995 = 31 anos.",
        "Passo 2: Diferença em meses: Outubro (mês 10) - Junho (mês 6) = 4 meses.",
        "Passo 3: Diferença em dias: 8 - 15 é negativo (-7), então 'empreste' 1 mês (restam 3 meses) e adicione os dias de setembro (30): 8 + 30 - 15 = 23 dias."
      ],
      "result": "A pessoa tem exatamente 31 anos, 3 meses e 23 dias de idade."
    },
    "notes": [
      "A contagem de idade ocidental considera uma pessoa com 0 anos ao nascer e incrementa a cada aniversário.",
      "Anos bissextos contêm 366 dias em vez de 365 dias; a calculadora inclui 29 de fevereiro sempre que atravessado.",
      "O total de horas e o total de dias são calculados usando intervalos de dias do calendário astronômico padrão."
    ],
    "faqs": [
      {
        "question": "Como a calculadora de idade lida com anos bissextos?",
        "answer": "A calculadora verifica cada ano civil no intervalo e inclui corretamente o dia 29 de fevereiro nos anos bissextos, garantindo que o total de dias e aniversários seja 100% preciso."
      },
      {
        "question": "Posso calcular quantos anos terei em um ano futuro?",
        "answer": "Sim. Altere o campo \"Idade na Data de\" para qualquer data futura para descobrir sua idade exata nessa data."
      },
      {
        "question": "Como é determinada a contagem regressiva para o próximo aniversário?",
        "answer": "A calculadora compara a data de hoje com o seu próximo aniversário no ano civil atual ou subsequente para calcular os dias exatos restantes."
      },
      {
        "question": "Por que a idade exata é importante e como ela difere da idade convencional?",
        "answer": "A idade exata é crucial para documentos legais, admissões escolares, aposentadoria e outras situações onde a precisão é fundamental. Ao contrário da idade convencional (apenas em anos), a idade exata considera meses, dias e até horas, fornecendo uma medida muito mais precisa do tempo vivido, incluindo o impacto dos anos bissextos."
      }
    ],
    "breadcrumbName": "Calculadora de Idade"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "pt",
    "name": "Calculadora de Tempo",
    "category": "time-date",
    "badge": "Adicionar e Subtrair Tempo",
    "icon": "Clock",
    "h1": "Calculadora de Tempo",
    "seoTitle": "Calculadora de Tempo Online – Adicionar e Subtrair Horas, Minutos e Segundos",
    "seoDescription": "Calculadora de tempo online gratuita. Adicione ou subtraia durações de tempo em horas, minutos e segundos facilmente. Converta tempo para horas decimais e limpe timecodes.",
    "primaryKeyword": "calculadora de tempo",
    "secondaryKeywords": [
      "calculadora de duração de tempo",
      "calculadora de adicionar tempo",
      "calculadora de subtrair tempo",
      "calculadora de horas minutos segundos",
      "adição de tempo",
      "somar tempo",
      "subtrair horas"
    ],
    "heroSubtitle": "Adicione e subtraia durações de tempo em horas, minutos e segundos com transbordamento automático de unidades e conversões para horas decimais.",
    "about": [
      "A Calculadora de Tempo permite a adição e subtração rápidas de intervalos de tempo expressos em horas, minutos e segundos. Como o tempo utiliza aritmética de base 60 (sexagesimal) em vez de base 10, adicionar horas e minutos manualmente frequentemente leva a erros de reagrupamento.",
      "Esta ferramenta lida automaticamente com as transições de 60 segundos e 60 minutos, tornando-a ideal para editores de vídeo que calculam a duração de filmagens, gerentes de projeto que acompanham tarefas faturáveis, pilotos que registram durações de voo e atletas que analisam divisões de treino."
    ],
    "formula": {
      "title": "Fórmula de Soma de Tempo Sexagesimal",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "Todos os blocos de tempo de entrada são convertidos para segundos totais, adicionados ou subtraídos, e depois convertidos de volta para horas, minutos e segundos normalizados.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Horas, minutos e segundos da primeira duração"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Horas, minutos e segundos da segunda duração"
        }
      ]
    },
    "howToCalculate": [
      "Insira as horas, minutos e segundos para o Tempo 1.",
      "Escolha a operação: Adicionar (+) ou Subtrair (-).",
      "Insira as horas, minutos e segundos para o Tempo 2.",
      "Clique em Calcular para ver as horas, minutos, segundos consolidados e o total de horas decimais."
    ],
    "example": {
      "problem": "Adicione 2 horas 45 minutos 30 segundos e 3 horas 35 minutos 45 segundos.",
      "steps": [
        "Passo 1: Segundos: 30 + 45 = 75 segundos = 1 minuto e 15 segundos.",
        "Passo 2: Minutos: 45 + 35 + 1 (transportado) = 81 minutos = 1 hora e 21 minutos.",
        "Passo 3: Horas: 2 + 3 + 1 (transportado) = 6 horas."
      ],
      "result": "A duração total é de 6 horas, 21 minutos e 15 segundos (6.3542 horas decimais)."
    },
    "notes": [
      "Há 60 segundos em um minuto e 60 minutos em uma hora.",
      "Para converter minutos em horas decimais, divida os minutos por 60 (por exemplo, 30 minutos = 0.5 horas).",
      "Se subtrair um tempo maior de um tempo menor, o resultado é exibido como um deslocamento de tempo negativo."
    ],
    "faqs": [
      {
        "question": "Como converter minutos em horas decimais?",
        "answer": "Divida o número de minutos por 60. Por exemplo, 45 minutos divididos por 60 é 0.75 horas. Assim, 2 horas e 45 minutos equivalem a 2.75 horas decimais."
      },
      {
        "question": "O que acontece quando os segundos excedem 60?",
        "answer": "Cada bloco de 60 segundos é automaticamente convertido em 1 minuto e transportado para a coluna dos minutos."
      },
      {
        "question": "Esta ferramenta pode calcular timecodes para voos ou edição de vídeo?",
        "answer": "Sim. Ela soma precisamente múltiplas tomadas, clipes ou trechos de voo em horas, minutos e segundos."
      },
      {
        "question": "Por que é difícil somar ou subtrair tempo manualmente?",
        "answer": "É difícil somar ou subtrair tempo manualmente porque o sistema de tempo é sexagesimal (base 60), não decimal (base 10). Isso significa que, ao invés de 'transportar' 10 unidades, você transporta 60, o que pode levar a erros de cálculo e reagrupamento."
      }
    ],
    "breadcrumbName": "Calculadora de Tempo"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "pt",
    "name": "Calculadora de Datas",
    "category": "time-date",
    "badge": "Dias Entre Datas",
    "icon": "Calendar",
    "h1": "Calculadora de Datas",
    "seoTitle": "Calculadora de Datas – Dias Entre Datas e Adicionar/Subtrair Dias",
    "seoDescription": "Calculadora de datas online gratuita. Calcule o número exato de dias, semanas e dias úteis entre duas datas, ou adicione/subtraia dias de qualquer data.",
    "primaryKeyword": "calculadora de datas",
    "secondaryKeywords": [
      "calculadora de diferença de datas",
      "dias entre datas",
      "calculadora de duração de datas",
      "calculadora de dias úteis",
      "adicionar dias a uma data"
    ],
    "heroSubtitle": "Calcule os dias corridos exatos e os dias úteis entre duas datas, ou projete datas futuras adicionando ou subtraindo dias.",
    "about": [
      "A Calculadora de Datas resolve consultas comuns de calendário: encontrar quantos dias faltam entre duas datas específicas, ou determinar qual data ocorre um determinado número de dias, semanas ou meses no futuro ou no passado.",
      "Ao contrário da contagem simples de calendário, esta ferramenta reflete com precisão as variações de fim de mês, anos bissextos e separa os dias de fim de semana padrão dos dias úteis de segunda a sexta-feira — essencial para planejamento de projetos, prazos legais, períodos de aviso e contagens regressivas de eventos."
    ],
    "formula": {
      "title": "Matemática da Duração da Data",
      "formulaText": "Total de Dias = (Data Final (ms) - Data Inicial (ms)) / (1000 × 60 × 60 × 24)\nSemanas = ⌊Total de Dias / 7⌋\nDias Restantes = Total de Dias mod 7",
      "explanation": "Calcula o delta do timestamp de época entre os timestamps UTC da meia-noite e conta os dias úteis de segunda a sexta-feira para intervalos comerciais.",
      "variables": [
        {
          "name": "Data Inicial",
          "desc": "A data de início de referência"
        },
        {
          "name": "Data Final",
          "desc": "A data de conclusão alvo"
        },
        {
          "name": "Dias Úteis",
          "desc": "Contagem de dias da semana (segunda a sexta-feira) excluindo fins de semana"
        }
      ]
    },
    "howToCalculate": [
      "Escolha o Modo: \"Dias Entre Datas\" ou \"Adicionar / Subtrair Dias\".",
      "Para Diferença de Datas: Selecione sua Data Inicial e Data Final.",
      "Marque \"Incluir Dia Final\" se sua linha do tempo exigir contagem de limite inclusiva.",
      "Visualize o total de dias, semanas, dias restantes e dias úteis de segunda a sexta-feira."
    ],
    "example": {
      "problem": "Quantos dias e dias úteis existem entre 5 de janeiro de 2026 e 20 de fevereiro de 2026?",
      "steps": [
        "Passo 1: Total de dias corridos = 46 dias.",
        "Passo 2: Equivalente a 6 semanas completas e 4 dias corridos.",
        "Passo 3: Excluindo os fins de semana (sábado e domingo) resultam em 34 dias úteis."
      ],
      "result": "Existem 46 dias corridos (34 dias úteis) entre as duas datas."
    },
    "notes": [
      "A diferença de data padrão calcula os dias completos decorridos entre duas datas.",
      "Anos bissextos são automaticamente considerados (2028, 2032, etc. têm 29 dias em fevereiro).",
      "A contagem de dias úteis não inclui feriados nacionais oficiais, pois estes variam por país."
    ],
    "faqs": [
      {
        "question": "A calculadora de datas conta tanto a data de início quanto a data final?",
        "answer": "Por padrão, a calculadora conta o intervalo da data de início até a data final (tempo decorrido). Você pode ativar a opção \"Incluir dia final\" para incluir ambos os dias limites."
      },
      {
        "question": "Como os dias úteis são definidos?",
        "answer": "Dias úteis representam de segunda a sexta-feira. Sábados e domingos são excluídos como dias de fim de semana."
      },
      {
        "question": "Posso adicionar apenas dias úteis?",
        "answer": "A ferramenta de adição adiciona dias corridos; para calcular entregas de projetos em dias úteis, considere 2 dias de fim de semana para cada 5 dias úteis."
      }
    ],
    "breadcrumbName": "Calculadora de Datas"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "pt",
    "name": "Calculadora de Horas",
    "category": "time-date",
    "badge": "Controle de Horas e Pagamento",
    "icon": "Timer",
    "h1": "Calculadora de Horas",
    "seoTitle": "Calculadora de Horas – Horas Trabalhadas e Cartão de Ponto Online",
    "seoDescription": "Calculadora de horas online gratuita. Calcule o total de horas trabalhadas, pausas para almoço, horas decimais e salário bruto entre horários de início e fim para folhas de ponto.",
    "primaryKeyword": "calculadora de horas",
    "secondaryKeywords": [
      "calculadora de cartão de ponto",
      "calculadora de horas trabalhadas",
      "calcular horas trabalhadas",
      "calculadora de folha de ponto",
      "calcular horas entre horários"
    ],
    "heroSubtitle": "Calcule as horas de trabalho diárias, deduza pausas para almoço e descanso, converta horários para horas decimais e calcule os ganhos brutos para a folha de pagamento.",
    "about": [
      "A Calculadora de Horas simplifica o controle de tempo para funcionários horistas, contratados, freelancers e gerentes de folha de pagamento. Converter horas de relógio em horas decimais (por exemplo, 7 horas e 45 minutos em 7.75 horas) é essencial para multiplicar pelas taxas de salário por hora.",
      "A calculadora suporta turnos noturnos que se estendem após a meia-noite (como das 22:00 às 06:00) e deduz automaticamente pausas ou almoços não remunerados para reportar horas pagáveis líquidas."
    ],
    "formula": {
      "title": "Fórmula de Horas e Salário do Cartão de Ponto",
      "formulaText": "Minutos Brutos = Hora Final - Hora Inicial (ajustado para turnos noturnos)\nMinutos Líquidos = Minutos Brutos - Minutos de Pausa\nHoras Decimais = Minutos Líquidos / 60\nPagamento Total = Horas Decimais × Taxa Horária",
      "explanation": "Subtraia a hora de início da hora de fim, subtraia os minutos de pausa não remunerados, divida por 60 para obter as horas decimais e multiplique pela taxa de pagamento por hora.",
      "variables": [
        {
          "name": "Hora de Início",
          "desc": "Hora de entrada"
        },
        {
          "name": "Hora Final",
          "desc": "Hora de saída"
        },
        {
          "name": "Pausa",
          "desc": "Duração do descanso ou almoço não remunerado em minutos"
        },
        {
          "name": "Taxa Horária",
          "desc": "Salário base por hora em dólares ou moeda local"
        }
      ]
    },
    "howToCalculate": [
      "Insira a Hora de Início do seu turno (ex: 08:30).",
      "Insira a Hora Final do seu turno (ex: 17:00).",
      "Especifique qualquer tempo de pausa não remunerado em minutos (ex: 45 minutos para almoço).",
      "Opcionalmente, insira sua taxa de salário por hora para estimar o pagamento bruto.",
      "Clique em Calcular para ver as horas líquidas, minutos, horas decimais e ganhos totais."
    ],
    "example": {
      "problem": "Um funcionário entra às 08:30, sai às 17:15, faz uma pausa para almoço de 45 minutos e ganha $24/hora.",
      "steps": [
        "Passo 1: Tempo bruto total entre 08:30 e 17:15 = 8 horas e 45 minutos (525 minutos).",
        "Passo 2: Deduzir 45 minutos de almoço: 525 - 45 = 480 minutos líquidos.",
        "Passo 3: Converter para decimal: 480 ÷ 60 = 8.00 horas decimais.",
        "Passo 4: Multiplicar pelo salário: 8.00 × $24 = $192.00."
      ],
      "result": "O funcionário trabalhou 8.00 horas e ganhou $192.00."
    },
    "notes": [
      "Sistemas de folha de pagamento exigem horas decimais (ex: 8.25 horas) em vez do formato de relógio (8h 15m).",
      "Turnos que cruzam a meia-noite são detectados e calculados sem problemas, sem números negativos.",
      "Os cálculos representam salários brutos antes do imposto de renda legal e deduções da folha de pagamento."
    ],
    "faqs": [
      {
        "question": "Como converter minutos de trabalho em horas decimais?",
        "answer": "Divida o número de minutos por 60. Por exemplo, 15 minutos são 15/60 = 0.25 horas; 30 minutos são 0.5 horas; e 45 minutos são 0.75 horas."
      },
      {
        "question": "Como a calculadora lida com turnos noturnos que cruzam a meia-noite?",
        "answer": "Se a hora final for numericamente anterior à hora de início (ex: das 23:00 às 07:00), a calculadora adiciona automaticamente 24 horas para determinar o período noturno correto."
      },
      {
        "question": "Posso calcular o pagamento semanal usando esta ferramenta?",
        "answer": "Você pode calcular cada turno diário ou usar a Calculadora de Salário para projeções de pagamento consolidadas de várias semanas."
      },
      {
        "question": "Para que serve uma calculadora de horas?",
        "answer": "Uma calculadora de horas serve para determinar o tempo exato trabalhado por um indivíduo, deduzindo pausas e convertendo o tempo para um formato decimal, facilitando o cálculo de salários e a gestão de folhas de ponto."
      }
    ],
    "breadcrumbName": "Calculadora de Horas"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "pt",
    "name": "Calculadora de IMC",
    "category": "fitness",
    "badge": "Índice de Massa Corporal",
    "icon": "Activity",
    "h1": "Calculadora de IMC",
    "seoTitle": "Calculadora de IMC – Calcule Seu Índice de Massa Corporal Online",
    "seoDescription": "Calculadora de IMC online gratuita. Calcule o Índice de Massa Corporal para adultos usando unidades métricas (cm/kg) ou imperiais (pés/pol/libras). Veja as categorias de peso da OMS e faixas saudáveis.",
    "primaryKeyword": "calculadora de IMC",
    "secondaryKeywords": [
      "calcular IMC",
      "calculadora de índice de massa corporal",
      "calculadora de IMC para adultos",
      "faixa de peso saudável",
      "calculadora de IMC métrica"
    ],
    "heroSubtitle": "Calcule seu Índice de Massa Corporal (IMC) usando medidas métricas ou imperiais para entender sua categoria de peso e metas de peso saudável.",
    "about": [
      "A Calculadora de Índice de Massa Corporal (IMC) é uma métrica de triagem padronizada estabelecida pela Organização Mundial da Saúde (OMS) para categorizar indivíduos pelo status de peso em relação à altura. É amplamente utilizada em epidemiologia, exames de saúde gerais e monitoramento de fitness pessoal.",
      "O IMC é calculado dividindo o peso corporal em quilogramas pela altura em metros ao quadrado. A calculadora apresenta sua pontuação exata, a classificação oficial da OMS (baixo peso, peso normal, sobrepeso ou classe de obesidade) e calcula sua faixa de peso saudável personalizada."
    ],
    "formula": {
      "title": "Fórmulas Padrão de IMC",
      "formulaText": "Fórmula Métrica: IMC = Peso (kg) / [Altura (m)]²\nFórmula Imperial: IMC = 703 × Peso (lbs) / [Altura (polegadas)]²",
      "explanation": "Divida o peso pelo quadrado da altura. Para unidades imperiais (libras e polegadas), multiplique a razão pelo fator de conversão 703.",
      "variables": [
        {
          "name": "Peso",
          "desc": "Peso corporal em quilogramas (kg) ou libras (lbs)"
        },
        {
          "name": "Altura",
          "desc": "Altura em centímetros (cm) ou pés e polegadas"
        },
        {
          "name": "Fator 703",
          "desc": "Padrão multiplicador de conversão imperial"
        }
      ]
    },
    "howToCalculate": [
      "Escolha seu sistema de unidades preferido: Métrico (cm e kg) ou Imperial (pés, polegadas e libras).",
      "Insira sua altura e peso corporal atuais.",
      "Clique em Calcular para ver sua pontuação de IMC, categoria da OMS e faixa de peso saudável alvo.",
      "Revise a faixa de peso saudável projetada para sua altura específica."
    ],
    "example": {
      "problem": "Qual é o IMC de um indivíduo com 175 cm (1.75 m) de altura e 70 kg de peso?",
      "steps": [
        "Passo 1: Eleve a altura em metros ao quadrado: 1.75 × 1.75 = 3.0625 m².",
        "Passo 2: Divida o peso pela altura ao quadrado: 70 ÷ 3.0625 = 22.86.",
        "Passo 3: Compare com os limites da OMS: 22.9 se enquadra entre 18.5 – 24.9 (Peso Normal)."
      ],
      "result": "O indivíduo tem um IMC de 22.9, que é classificado como Peso Normal."
    },
    "notes": [
      "O IMC é um indicador de triagem populacional e não diferencia entre massa muscular magra e tecido adiposo.",
      "Atletas, fisiculturistas e mulheres grávidas podem registrar pontuações de IMC elevadas que não refletem excesso de gordura corporal.",
      "Esta ferramenta destina-se à conscientização educacional geral e não deve substituir a avaliação clínica profissional."
    ],
    "faqs": [
      {
        "question": "Qual é considerada uma faixa de IMC saudável?",
        "answer": "De acordo com a Organização Mundial da Saúde (OMS), um IMC entre 18.5 e 24.9 é considerado a categoria de peso normal ou saudável para adultos."
      },
      {
        "question": "Por que o IMC pode ser enganoso para atletas musculosos?",
        "answer": "O IMC mede o peso total em relação à altura e não consegue diferenciar músculo de gordura adiposa. Como o músculo é mais denso que a gordura, indivíduos musculosos frequentemente são classificados como sobrepeso ou obesos, apesar de terem pouca gordura corporal."
      },
      {
        "question": "Como calculo o IMC usando libras e polegadas?",
        "answer": "Multiplique seu peso em libras por 703 e, em seguida, divida pela sua altura em polegadas ao quadrado: IMC = (lbs × 703) / (polegadas × polegadas)."
      },
      {
        "question": "O IMC é aplicável a crianças?",
        "answer": "Para crianças e adolescentes, o IMC é interpretado de forma diferente, usando gráficos de crescimento específicos por idade e sexo, pois seus corpos estão em constante desenvolvimento. Esta calculadora é destinada apenas para adultos."
      }
    ],
    "breadcrumbName": "Calculadora de IMC"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "pt",
    "name": "Calculadora de Ritmo",
    "category": "fitness",
    "badge": "Corrida e Caminhada",
    "icon": "Footprints",
    "h1": "Calculadora de Ritmo",
    "seoTitle": "Calculadora de Ritmo – Calcule o Ritmo de Corrida, Velocidade e Tempo",
    "seoDescription": "Calculadora de ritmo de corrida online gratuita. Calcule o ritmo por quilômetro (min/km), ritmo por milha (min/mi) e velocidade (km/h, mph) para corridas de 5K, 10K, meia maratona e maratona.",
    "primaryKeyword": "calculadora de ritmo",
    "secondaryKeywords": [
      "calculadora de ritmo de corrida",
      "calculadora de ritmo de maratona",
      "calculadora de velocidade de corrida",
      "calculadora de ritmo 5k",
      "calculadora min por km"
    ],
    "heroSubtitle": "Calcule o ritmo de corrida e caminhada por quilômetro e milha, determine os parciais de corrida necessários e converta entre velocidade e ritmo instantaneamente.",
    "about": [
      "A Calculadora de Ritmo foi desenvolvida para corredores, praticantes de jogging, triatletas e caminhantes que desejam planejar treinos ou prever tempos de chegada em corridas. O ritmo mede o tempo necessário para percorrer uma unidade de distância (como minutos por quilômetro ou minutos por milha), enquanto a velocidade mede a distância percorrida por unidade de tempo (km/h ou mph).",
      "A calculadora suporta distâncias de corrida padrão, incluindo 5K, 10K, Meia Maratona (21.0975 km) e Maratona Completa (42.195 km), permitindo que você determine o ritmo alvo necessário para alcançar seu melhor tempo pessoal."
    ],
    "formula": {
      "title": "Fórmulas de Ritmo e Velocidade",
      "formulaText": "Ritmo = Tempo (segundos) / Distância\nVelocidade (km/h) = Distância (km) / Tempo (horas)\nVelocidade (mph) = Distância (milhas) / Tempo (horas)",
      "explanation": "O ritmo é o inverso da velocidade: divida o tempo total decorrido em minutos pela distância total percorrida em quilômetros ou milhas.",
      "variables": [
        {
          "name": "Tempo",
          "desc": "Duração total decorrida em horas, minutos e segundos"
        },
        {
          "name": "Distância",
          "desc": "Comprimento total do percurso em quilômetros ou milhas"
        },
        {
          "name": "Ritmo",
          "desc": "Tempo gasto por unidade de distância (min/km ou min/mi)"
        }
      ]
    },
    "howToCalculate": [
      "Insira a Distância total do seu percurso e selecione a unidade (km ou milhas).",
      "Insira o Tempo decorrido ou alvo (horas, minutos e segundos).",
      "Clique em Calcular para ver seu ritmo médio por quilômetro, ritmo por milha e velocidade em km/h e mph.",
      "Ajuste os tempos para prever os requisitos de parciais para as próximas corridas."
    ],
    "example": {
      "problem": "Qual ritmo é necessário para completar uma corrida de 10K (10 quilômetros) em 50 minutos?",
      "steps": [
        "Passo 1: Tempo total = 50 minutos = 3.000 segundos.",
        "Passo 2: Ritmo por km: 50 minutos ÷ 10 km = 5:00 minutos por quilômetro.",
        "Passo 3: Distância em milhas: 10 km ÷ 1.60934 = 6.2137 milhas.",
        "Passo 4: Ritmo por milha: 50 minutos ÷ 6.2137 milhas = 8:03 minutos por milha (Velocidade: 12.0 km/h ou 7.46 mph)."
      ],
      "result": "O ritmo alvo é 5:00 min/km ou 8:03 min/milha."
    },
    "notes": [
      "1 milha equivale a aproximadamente 1.60934 quilômetros. 1 quilômetro equivale a 0.621371 milhas.",
      "O ritmo é formatado como MM:SS (por exemplo, 4:30 min/km significa 4 minutos e 30 segundos).",
      "Para converter ritmo em velocidade: Velocidade (km/h) = 60 ÷ Ritmo (em minutos decimais por km)."
    ],
    "faqs": [
      {
        "question": "Qual a diferença entre ritmo e velocidade?",
        "answer": "A velocidade indica a distância percorrida em um determinado tempo (por exemplo, quilômetros por hora), enquanto o ritmo indica o tempo necessário para percorrer uma distância fixa (por exemplo, minutos por quilômetro)."
      },
      {
        "question": "Qual ritmo é necessário para uma maratona abaixo de 4 horas?",
        "answer": "Para terminar uma maratona completa (42.195 km / 26.219 milhas) em menos de 4 horas, você precisa de um ritmo médio mais rápido que 5:41 min/km ou 9:09 min/milha."
      },
      {
        "question": "Como converter min/km para min/milha?",
        "answer": "Multiplique seu ritmo em minutos por quilômetro por 1.60934. Por exemplo, 5:00 min/km (5.0) × 1.60934 = 8.046 minutos por milha, o que é aproximadamente 8:03 min/milha."
      },
      {
        "question": "Qual é um bom ritmo de corrida para iniciantes?",
        "answer": "Para iniciantes, um ritmo confortável pode variar muito. Geralmente, um ritmo entre 6:00 a 7:30 min/km (9:40 a 12:00 min/milha) é considerado bom para começar, focando mais na consistência e na forma do que na velocidade."
      }
    ],
    "breadcrumbName": "Calculadora de Ritmo"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "pt",
    "name": "Calculadora de Custo de Combustível",
    "category": "utilities",
    "badge": "Orçamento de Viagem e Combustível",
    "icon": "Fuel",
    "h1": "Calculadora de Custo de Combustível",
    "seoTitle": "Calculadora de Custo de Combustível – Viagem, Gás e Consumo por Quilometragem",
    "seoDescription": "Calculadora de custo de combustível online grátis. Calcule o gasto total da viagem, o volume de combustível necessário e o custo por quilômetro ou milha com base na eficiência do veículo e no preço do combustível.",
    "primaryKeyword": "calculadora de custo de combustível",
    "secondaryKeywords": [
      "calculadora de custo de gasolina",
      "calculadora de consumo de combustível",
      "calculadora de combustível para viagem",
      "calculadora de custo por quilometragem",
      "calculadora de custo de viagem de carro"
    ],
    "heroSubtitle": "Estime os custos de combustível da sua viagem de carro, calcule os litros ou galões necessários e descubra o custo por quilômetro ou milha antes de viajar.",
    "about": [
      "A Calculadora de Custo de Combustível ajuda motoristas, viajantes e operadores de logística a prever os gastos com combustível para qualquer distância de condução. O combustível é uma das maiores despesas variáveis da posse de um veículo, influenciada pelos preços flutuantes da bomba, velocidades em autoestradas e eficiência do motor.",
      "Esta ferramenta suporta quilômetros com km/L ou L/100km, bem como milhas com Milhas Por Galão (MPG). Ela detalha o volume total de combustível necessário, o gasto total da viagem e o custo unitário por quilômetro ou milha."
    ],
    "formula": {
      "title": "Fórmula de Consumo e Custo de Combustível",
      "formulaText": "Combustível Necessário (L) = Distância (km) / Eficiência (km/L)\nCusto Total da Viagem = Combustível Necessário × Preço do Combustível por Unidade\nCusto por Distância = Custo Total da Viagem / Distância",
      "explanation": "Divida a distância total da viagem pela eficiência de combustível do veículo para encontrar a quantidade de combustível, depois multiplique pelo preço do combustível na bomba local.",
      "variables": [
        {
          "name": "Distância",
          "desc": "Comprimento da viagem em quilômetros ou milhas"
        },
        {
          "name": "Eficiência",
          "desc": "Classificação de consumo do veículo (km/L, L/100km, ou MPG)"
        },
        {
          "name": "Preço do Combustível",
          "desc": "Custo da gasolina, diesel ou gás por litro ou galão"
        }
      ]
    },
    "howToCalculate": [
      "Insira a Distância total da viagem (ex: 350 km).",
      "Selecione a unidade de eficiência do seu veículo (km/L, L/100km, ou MPG) e insira a classificação do seu veículo.",
      "Insira o preço do combustível na bomba por litro ou por galão.",
      "Clique em Calcular para ver o combustível total necessário, o gasto total da viagem e o custo por unidade de distância."
    ],
    "example": {
      "problem": "Qual é o custo de combustível para uma viagem de 400 km num carro que faz 16 km/L com o combustível a $1.50 por litro?",
      "steps": [
        "Passo 1: Combustível necessário = 400 km ÷ 16 km/L = 25 litros.",
        "Passo 2: Custo total = 25 litros × $1.50/L = $37.50.",
        "Passo 3: Custo por quilômetro = $37.50 ÷ 400 km = $0.094 por km."
      ],
      "result": "A viagem requer 25 litros de combustível e custa $37.50 ($0.094/km)."
    },
    "notes": [
      "Aceleração agressiva, cargas pesadas e bagageiros de teto podem reduzir a eficiência de combustível em autoestradas em 15% a 25%.",
      "Para converter L/100km para km/L: divida 100 pelo valor em L/100km (ex: 8 L/100km = 100 / 8 = 12.5 km/L).",
      "Para viagens de ida e volta, multiplique a distância de ida por 2 antes de calcular."
    ],
    "faqs": [
      {
        "question": "Como calculo o custo de combustível para uma viagem de carro?",
        "answer": "Divida a distância pela autonomia do seu veículo (km/L ou MPG) para encontrar o volume de combustível necessário, depois multiplique esse volume pelo preço do combustível por litro ou galão."
      },
      {
        "question": "Como converter MPG para km/L?",
        "answer": "1 MPG (milhas por galão) dos EUA é aproximadamente 0.425 km/L. Para converter MPG para km/L, multiplique o número de MPG por 0.425144."
      },
      {
        "question": "Como posso melhorar a eficiência de combustível do meu veículo?",
        "answer": "Mantenha a pressão dos pneus recomendada, respeite os limites de velocidade constantes em autoestradas, remova o peso excessivo do porta-malas e evite travagens e acelerações bruscas."
      },
      {
        "question": "Que fatores influenciam o consumo de combustível?",
        "answer": "A velocidade do veículo, a pressão dos pneus, a manutenção do motor, o estilo de condução (agressivo vs. suave), o peso da carga e o uso do ar condicionado influenciam significativamente o consumo de combustível."
      }
    ],
    "breadcrumbName": "Calculadora de Custo de Combustível"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "pt",
    "name": "Calculadora de Custo de Eletricidade",
    "category": "utilities",
    "badge": "Consumo de Aparelhos e Conta de Energia",
    "icon": "Zap",
    "h1": "Calculadora de Custo de Eletricidade",
    "seoTitle": "Calculadora de Custo de Eletricidade – Consumo de Aparelhos e Conta de Energia Elétrica",
    "seoDescription": "Calculadora de custo de eletricidade online gratuita. Calcule o consumo de energia em kWh e as contas de energia mensais e anuais estimadas para eletrodomésticos com base na potência.",
    "primaryKeyword": "calculadora de custo de eletricidade",
    "secondaryKeywords": [
      "calculadora de consumo de energia elétrica",
      "calculadora de consumo de eletrodomésticos",
      "calculadora de kWh",
      "calculadora de custo de energia",
      "calculadora de conta de luz"
    ],
    "heroSubtitle": "Calcule o consumo de energia em quilowatts-hora (kWh) e estime os custos mensais e anuais de eletricidade para qualquer eletrodoméstico.",
    "about": [
      "A Calculadora de Custo de Eletricidade ajuda proprietários de imóveis, inquilinos e gerentes de instalações a quantificar quanta eletricidade os eletrodomésticos consomem e quanto custa operá-los. Desde aparelhos de ar condicionado e aquecedores elétricos até plataformas de mineração de criptomoedas e compressores de geladeiras, o consumo de energia pode inflacionar drasticamente as contas de energia.",
      "Insira a potência do aparelho, as horas de funcionamento diário e a tarifa de eletricidade da sua concessionária por quilowatt-hora (kWh) para receber projeções de custo diárias, mensais e anuais."
    ],
    "formula": {
      "title": "Fórmulas de Quilowatt-Hora e Custo de Energia",
      "formulaText": "Daily Energy (kWh) = (Appliance Watts × Hours per Day) / 1000\nCost = Energy (kWh) × Electricity Rate per kWh\nMonthly Cost = Daily Cost × 30 days\nYearly Cost = Daily Cost × 365 days",
      "explanation": "Converta a potência nominal do aparelho em watts para quilowatts dividindo por 1.000, multiplique pelas horas de operação diária e multiplique pela tarifa da concessionária por kWh.",
      "variables": [
        {
          "name": "Potência (Watts)",
          "desc": "Consumo de energia nominal do aparelho em Watts (W)"
        },
        {
          "name": "Horas/Dia",
          "desc": "Tempo médio de funcionamento ativo por ciclo de 24 horas"
        },
        {
          "name": "Tarifa ($/kWh)",
          "desc": "Custo da eletricidade da concessionária por quilowatt-hora"
        }
      ]
    },
    "howToCalculate": [
      "Localize a potência nominal na etiqueta ou manual do aparelho (por exemplo, 1500W para um aquecedor elétrico).",
      "Insira as horas estimadas de funcionamento diário do aparelho.",
      "Insira o custo da sua concessionária local por kWh (verifique sua conta de luz mensal; a tarifa padrão dos EUA é de ~$0.16/kWh, Reino Unido ~£0.28/kWh).",
      "Clique em Calcular para ver o consumo diário, mensal e anual em kWh e o custo monetário."
    ],
    "example": {
      "problem": "Quanto custa operar um ar condicionado de 1.200 Watts por 8 horas diárias a uma tarifa de $0.15 por kWh durante um mês de 30 dias?",
      "steps": [
        "Passo 1: kWh diário: (1.200 W × 8 horas) ÷ 1.000 = 9,6 kWh/dia.",
        "Passo 2: Energia mensal: 9,6 kWh × 30 dias = 288 kWh.",
        "Passo 3: Custo mensal: 288 kWh × $0,15/kWh = $43,20.",
        "Passo 4: Custo anual: 9,6 kWh × 365 dias × $0,15 = $525,60."
      ],
      "result": "O ar condicionado consome 288 kWh por mês e custa $43,20 mensalmente ($525,60 anualmente)."
    },
    "notes": [
      "As etiquetas dos aparelhos listam a potência máxima de pico; aparelhos com termostatos (como geladeiras e ares condicionados) ligam e desligam, reduzindo o consumo médio.",
      "1 Quilowatt (kW) = 1.000 Watts (W). 1 Megawatt (MW) = 1.000.000 Watts.",
      "Verifique sua conta de energia para tarifas escalonadas ou de horário de pico (TOU) durante o verão e o inverno."
    ],
    "faqs": [
      {
        "question": "Como calcular o custo de energia de um aparelho?",
        "answer": "Multiplique a potência do aparelho pelas horas diárias, divida por 1.000 para obter o kWh diário e multiplique pela tarifa da sua concessionária por kWh."
      },
      {
        "question": "Onde posso encontrar a potência de um aparelho?",
        "answer": "A potência do aparelho geralmente está impressa em uma etiqueta de certificação elétrica localizada na parte traseira ou inferior do dispositivo, ou dentro do manual de instruções."
      },
      {
        "question": "Quais eletrodomésticos consomem mais eletricidade?",
        "answer": "Sistemas de aquecimento e refrigeração (ar condicionado central e bombas de calor), aquecedores de água, secadoras de roupa e fornos elétricos consomem a maior quantidade de energia doméstica."
      },
      {
        "question": "Como posso reduzir o custo da minha conta de eletricidade?",
        "answer": "Para reduzir o custo da sua conta de eletricidade, você pode usar aparelhos mais eficientes em termos de energia, desligar luzes e aparelhos quando não estiverem em uso, otimizar o uso de sistemas de aquecimento e refrigeração, e aproveitar a luz natural."
      }
    ],
    "breadcrumbName": "Calculadora de Custo de Eletricidade"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "pt",
    "name": "Calculadora de GPA",
    "category": "education",
    "badge": "Média de Notas (GPA)",
    "icon": "GraduationCap",
    "h1": "Calculadora de GPA",
    "seoTitle": "Calculadora de GPA – Calcule seu GPA 4.0 para Faculdade e Ensino Médio",
    "seoDescription": "Calculadora de GPA online gratuita. Calcule sua Média de Notas (GPA) semestral e acumulada em uma escala 4.0, considerando pesos de crédito e notas por letras.",
    "primaryKeyword": "calculadora de GPA",
    "secondaryKeywords": [
      "calculadora de GPA universitário",
      "calculadora de GPA semestral",
      "calculadora de média de notas",
      "calculadora de GPA acumulado",
      "escala GPA 4.0"
    ],
    "heroSubtitle": "Calcule sua Média de Notas (GPA) semestral e acumulada em uma escala padrão 4.0, utilizando notas por letras e créditos das disciplinas.",
    "about": [
      "A Calculadora de Média de Notas (GPA) calcula seu desempenho acadêmico na escala padrão de 4.0 pontos utilizada em instituições de ensino superior. Faculdades, universidades, escolas de ensino médio, comitês de bolsas de estudo e programas de pós-graduação utilizam o GPA acumulado como um referencial primário para honras, período probatório acadêmico e admissões.",
      "Ao contrário de uma simples média de notas, o GPA é ponderado pelas horas de crédito da disciplina — o que significa que uma disciplina de 4 créditos tem o dobro da influência no seu GPA final em comparação com uma disciplina eletiva de 2 créditos."
    ],
    "formula": {
      "title": "Fórmula do GPA Ponderado",
      "formulaText": "Pontos de Nota por Disciplina = Créditos da Disciplina × Valor da Escala de Notas\nGPA = Total de Pontos de Nota / Total de Créditos da Disciplina",
      "explanation": "Multiplique as horas de crédito de cada disciplina pelo equivalente numérico de sua nota por letra, some o total de pontos de nota e divida pelo total de créditos tentados.",
      "variables": [
        {
          "name": "Escala de Notas (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Créditos",
          "desc": "Horas de crédito ou unidades semestrais atribuídas a cada disciplina"
        }
      ]
    },
    "howToCalculate": [
      "Adicione cada disciplina cursada durante seu semestre ou período.",
      "Selecione a Nota por Letra obtida (ex: A, B+, B, C) ou insira os pontos numéricos da nota.",
      "Insira as Horas de Crédito da disciplina (ex: 3 ou 4 créditos).",
      "Clique em Calcular para ver seu GPA ponderado, total de horas de crédito e total de pontos de nota obtidos."
    ],
    "example": {
      "problem": "Calcule o GPA semestral para 4 disciplinas: Matemática (4 créditos, A), História (3 créditos, B), Biologia (4 créditos, B+), Inglês (3 créditos, A-).",
      "steps": [
        "Passo 1: Matemática: 4 créditos × 4.0 (A) = 16.0 pontos.",
        "Passo 2: História: 3 créditos × 3.0 (B) = 9.0 pontos.",
        "Passo 3: Biologia: 4 créditos × 3.3 (B+) = 13.2 pontos.",
        "Passo 4: Inglês: 3 créditos × 3.7 (A-) = 11.1 pontos.",
        "Passo 5: Total de pontos = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 pontos.",
        "Passo 6: Total de créditos = 4 + 3 + 4 + 3 = 14 créditos. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "O GPA semestral é 3.52."
    },
    "notes": [
      "Disciplinas com aprovação/reprovação (Pass/Fail) ou auditoria são tipicamente excluídas tanto dos pontos de nota quanto dos totais de horas de crédito nos cálculos de GPA.",
      "Algumas escolas de ensino médio utilizam escalas ponderadas de 5.0 para disciplinas AP ou de Honra; o GPA universitário padrão utiliza o referencial não ponderado de 4.0.",
      "Um GPA acumulado combina todos os semestres dividindo todos os pontos de nota obtidos ao longo da vida acadêmica pelo total de créditos ao longo da vida acadêmica."
    ],
    "faqs": [
      {
        "question": "Qual é a escala padrão de GPA 4.0?",
        "answer": "A escala padrão 4.0 mapeia: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0 e F = 0.0."
      },
      {
        "question": "Por que os créditos das disciplinas são incluídos no cálculo do GPA?",
        "answer": "Os créditos das disciplinas representam o rigor e as horas de instrução semanais de uma aula. A ponderação por créditos garante que uma aula principal de 4 créditos impacte seu desempenho acadêmico mais do que um laboratório de 1 crédito."
      },
      {
        "question": "Como posso aumentar meu GPA acumulado?",
        "answer": "Obter notas altas (A ou A-) em disciplinas com maior número de créditos terá o maior impacto positivo no seu GPA acumulado geral."
      },
      {
        "question": "Qual a diferença entre GPA semestral e GPA acumulado?",
        "answer": "O GPA semestral reflete seu desempenho acadêmico em um único período (semestre ou trimestre). O GPA acumulado, por outro lado, é a média de todas as notas obtidas em todas as disciplinas cursadas ao longo de toda a sua trajetória acadêmica, desde o início dos estudos."
      }
    ],
    "breadcrumbName": "Calculadora de GPA"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "pt",
    "name": "Calculadora de Notas",
    "category": "education",
    "badge": "Ponderada e Exame Final",
    "icon": "Award",
    "h1": "Calculadora de Notas",
    "seoTitle": "Calculadora de Notas – Média Ponderada e Nota do Exame Final",
    "seoDescription": "Calculadora de notas online grátis. Calcule a média ponderada atual do curso e descubra qual nota você precisa no exame final para atingir a nota desejada na disciplina.",
    "primaryKeyword": "calculadora de notas",
    "secondaryKeywords": [
      "calculadora de nota final",
      "que nota preciso",
      "calculadora de média ponderada",
      "calculadora de nota da disciplina",
      "calculadora de nota de exame"
    ],
    "heroSubtitle": "Calcule as médias ponderadas atuais do curso e determine a pontuação exata necessária no seu exame final para alcançar a nota desejada na disciplina.",
    "about": [
      "A Calculadora de Notas oferece dois modos acadêmicos essenciais: uma Calculadora de Notas Ponderadas para combinar trabalhos, questionários, provas intermediárias e participação, e uma Calculadora de Exame Final que responde à pergunta: \"Que nota preciso tirar no exame final para conseguir um A (ou passar)?\"",
      "Professores e docentes universitários frequentemente avaliam cursos usando porcentagens com pesos de categoria atribuídos (como Trabalhos de Casa 20%, Provas Intermediárias 30%, Final 50%). Esta calculadora automatiza o cálculo da distribuição ponderada para que você possa planejar seu tempo de estudo de forma eficaz."
    ],
    "formula": {
      "title": "Fórmulas de Nota Ponderada e Exame Final",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Multiplique cada nota obtida pelo peso percentual de sua categoria. Para encontrar a nota final necessária, isole a porcentagem de peso restante não concluída em relação à sua nota alvo.",
      "variables": [
        {
          "name": "Nota Atual",
          "desc": "Porcentagem média obtida em trabalhos concluídos"
        },
        {
          "name": "Nota Alvo",
          "desc": "A porcentagem mínima desejada no curso (por exemplo, 90% para um A, 70% para um C)"
        },
        {
          "name": "Peso Final",
          "desc": "Porcentagem da nota geral da disciplina determinada pelo exame final"
        }
      ]
    },
    "howToCalculate": [
      "Para calcular a nota atual do curso: Insira os trabalhos com as notas (%) e seus respectivos pesos de categoria (%).",
      "Para calcular o que você precisa no exame final: Mude para o \"Modo Exame Final\", insira sua Nota Atual, Nota Alvo e Peso do Exame Final.",
      "Clique em Calcular para ver sua nota de exame necessária e se essa nota é atingível."
    ],
    "example": {
      "problem": "Você tem atualmente 84% em Química. O exame final vale 25% da sua nota. O que você precisa tirar no exame final para terminar com um A (90%)?",
      "steps": [
        "Passo 1: Peso da nota atual = 100% - 25% = 75% (0.75).",
        "Passo 2: Nota alvo = 90%. Contribuição atual = 84% × 0.75 = 63%.",
        "Passo 3: Pontos necessários do exame final: 90% - 63% = 27%.",
        "Passo 4: Divida pelo peso do exame final: 27% ÷ 0.25 = 108%."
      ],
      "result": "Você precisa de 108% no exame final (o que exige pontos extras) para atingir uma nota geral de 90% na disciplina."
    },
    "notes": [
      "Se a nota final necessária for superior a 100%, a nota alvo é matematicamente impossível sem pontos extras ou curva de nota.",
      "Certifique-se de que todos os pesos das categorias somem 100% para um equilíbrio completo do plano de estudos.",
      "Diferentes instituições aplicam limites de notas distintos; verifique seu plano de estudos para os cortes específicos das letras."
    ],
    "faqs": [
      {
        "question": "Como se calcula uma nota de disciplina ponderada?",
        "answer": "Multiplique cada categoria de nota pela sua porcentagem de peso em formato decimal, some todos os produtos resultantes e divida pela soma total dos pesos."
      },
      {
        "question": "O que faço se meus pesos não somam 100%?",
        "answer": "A calculadora normaliza automaticamente os pesos inseridos, dividindo o total de pontos ponderados pela soma dos pesos inseridos até o momento."
      },
      {
        "question": "Como é calculada a nota do exame final?",
        "answer": "Subtraia os pontos de nota que você já garantiu da sua nota alvo do curso e, em seguida, divida os pontos restantes pela porcentagem de peso do exame final."
      },
      {
        "question": "Para que serve uma calculadora de notas?",
        "answer": "Uma calculadora de notas ajuda estudantes a acompanhar seu desempenho acadêmico, calcular médias ponderadas e determinar a nota necessária em exames futuros para alcançar um objetivo específico, como passar na disciplina ou obter uma nota alta."
      }
    ],
    "breadcrumbName": "Calculadora de Notas"
  }
};

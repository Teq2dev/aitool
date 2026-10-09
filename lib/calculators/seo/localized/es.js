/**
 * lib/calculators/seo/localized/es.js
 * Complete Spanish localized SEO content and educational profiles for all 24 calculators.
 */

export const CALCULATORS_ES = {
  "loan-calculator": {
    "slug": "loan-calculator",
    "lang": "es",
    "name": "Calculadora de Préstamos",
    "category": "financial",
    "badge": "Pago Mensual e Intereses",
    "icon": "CreditCard",
    "h1": "Calculadora de Préstamos",
    "seoTitle": "Calculadora de Préstamos – Estima Cuotas Mensuales y el Interés Total",
    "seoDescription": "Calculadora de préstamos online gratuita. Calcula las cuotas mensuales, el coste total de los intereses y visualiza los planes de amortización para préstamos personales, de coche o empresariales.",
    "primaryKeyword": "calculadora de préstamos",
    "secondaryKeywords": [
      "calculadora de cuotas de préstamo",
      "calculadora de pago mensual de préstamo",
      "calculadora de intereses",
      "calculadora de préstamos personales",
      "calculadora de préstamos para coche"
    ],
    "heroSubtitle": "Calcula las cuotas mensuales del préstamo, los cargos totales por intereses y los costes de amortización generales con tablas de amortización para préstamos personales, de coche y estudiantiles.",
    "about": [
      "La Calculadora de Préstamos ayuda a los prestatarios a evaluar las condiciones de los préstamos a plazos antes de comprometerse con acuerdos de financiación con bancos, cooperativas de crédito o prestamistas online. Los préstamos a plazos, incluyendo la financiación de automóviles, préstamos personales y paquetes de consolidación de deuda, se estructuran en torno a una fórmula de amortización.",
      "Al introducir el saldo principal del préstamo, la tasa de interés anual (TAE) y la duración del plazo del préstamo en meses o años, la calculadora calcula tu cuota mensual exacta, el interés total pagado durante la vida del préstamo y la cifra total a devolver."
    ],
    "formula": {
      "title": "Fórmula Estándar de Amortización de Préstamos",
      "formulaText": "Monthly Payment (P) = [ r × PV × (1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]\nTotal Repayment = Monthly Payment × n\nTotal Interest = Total Repayment - PV",
      "explanation": "PV es el capital inicial del préstamo, r es la tasa de interés mensual periódica (Tasa Anual / 12 / 100), y n es el número total de pagos mensuales.",
      "variables": [
        {
          "name": "PV",
          "desc": "Valor Presente (Cantidad principal del préstamo solicitado)"
        },
        {
          "name": "r",
          "desc": "Tasa de interés mensual: Tasa Anual ÷ 1200"
        },
        {
          "name": "n",
          "desc": "Número total de períodos de pago mensuales"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el importe total del préstamo (capital) que planeas solicitar.",
      "Introduce la tasa de interés anual (porcentaje TAE).",
      "Selecciona la duración del plazo del préstamo (en años o meses).",
      "Haz clic en Calcular para ver tu cuota mensual, el coste total de los intereses y el desglose de capital e intereses."
    ],
    "example": {
      "problem": "¿Cuál es la cuota mensual y el interés total de un préstamo de coche de $25,000 con un interés anual del 6.0% a un plazo de 5 años (60 meses)?",
      "steps": [
        "Paso 1: Tasa de interés mensual r = 6% ÷ 1200 = 0.005.",
        "Paso 2: Número de meses n = 5 × 12 = 60 meses.",
        "Paso 3: Factor (1 + 0.005)⁶⁰ = 1.34885.",
        "Paso 4: Cuota mensual = [0.005 × 25,000 × 1.34885] ÷ [1.34885 - 1] = 168.606 ÷ 0.34885 = $483.32.",
        "Paso 5: Pagos totales = $483.32 × 60 = $28,999.20. Interés total = $28,999.20 - $25,000 = $3,999.20."
      ],
      "result": "La cuota mensual es de $483.32, y el interés total pagado durante 5 años es de $3,999.20."
    },
    "notes": [
      "Los prestamistas pueden incluir comisiones de apertura, gastos de gestión o seguros de crédito que aumentan ligeramente la TAE efectiva.",
      "Realizar pagos anticipados adicionales al capital reduce significativamente el interés total y acorta la duración del préstamo.",
      "Plazos de préstamo más largos reducen las cuotas mensuales, pero aumentan el interés acumulado pagado."
    ],
    "faqs": [
      {
        "question": "¿Cómo calculan los prestamistas las cuotas mensuales de los préstamos?",
        "answer": "Los prestamistas utilizan fórmulas de amortización estándar donde cada cuota mensual se divide entre intereses (calculados sobre el saldo restante) y la reducción del capital."
      },
      {
        "question": "¿Cuál es la diferencia entre la TAE y la tasa de interés?",
        "answer": "La tasa de interés es el coste anual básico de pedir dinero prestado, mientras que la Tasa Anual Equivalente (TAE) incluye tanto la tasa de interés como cualquier comisión o punto obligatorio del prestamista."
      },
      {
        "question": "¿Cómo afecta un pago inicial mayor a un préstamo?",
        "answer": "Un pago inicial mayor reduce el capital prestado, lo que disminuye inmediatamente tanto tu cuota mensual como el interés total pagado a lo largo del tiempo."
      }
    ],
    "breadcrumbName": "Calculadora de Préstamos"
  },
  "emi-calculator": {
    "slug": "emi-calculator",
    "lang": "es",
    "name": "Calculadora de EMI",
    "category": "financial",
    "badge": "Cuota Mensual Equivalente",
    "icon": "Calculator",
    "h1": "Calculadora de EMI",
    "seoTitle": "Calculadora de EMI – Calcula Cuotas Mensuales Equivalentes de Préstamos Online",
    "seoDescription": "Calculadora de EMI online gratuita. Calcula las cuotas mensuales equivalentes (EMI) para préstamos hipotecarios, de coche y personales, con desglose de intereses y tablas de amortización.",
    "primaryKeyword": "calculadora de EMI",
    "secondaryKeywords": [
      "calculadora de cuotas de préstamo",
      "simulador de préstamo",
      "calculadora de hipoteca",
      "calculadora de préstamo personal",
      "calculadora de EMI mensual"
    ],
    "heroSubtitle": "Calcula tus Cuotas Mensuales Equivalentes (EMI), el interés total a pagar y los calendarios de amortización para préstamos hipotecarios, personales y de vehículos.",
    "about": [
      "La Calculadora de Cuota Mensual Equivalente (EMI) es una herramienta financiera vital utilizada en sistemas bancarios a nivel global para calcular el monto fijo de pago mensual adeudado a un prestamista en una fecha específica de cada mes.",
      "Las EMI están estructuradas de tal manera que, durante los meses iniciales, una mayor proporción de cada cuota se destina al pago de intereses; a medida que el capital del préstamo disminuye con el tiempo, una parte creciente de cada pago reduce el saldo principal restante."
    ],
    "formula": {
      "title": "Fórmula de la Cuota Mensual Equivalente (EMI)",
      "formulaText": "EMI = [ P × R × (1 + R)ᴺ ] / [ (1 + R)ᴺ - 1 ]\nTotal Payable = EMI × N\nTotal Interest = Total Payable - P",
      "explanation": "P es el capital principal del préstamo, R es la tasa de interés mensual (Tasa Anual / 12 / 100), y N es el plazo expresado en el total de meses.",
      "variables": [
        {
          "name": "P",
          "desc": "Monto principal prestado"
        },
        {
          "name": "R",
          "desc": "Tasa de interés mensual: Tasa Anual ÷ 12 ÷ 100"
        },
        {
          "name": "N",
          "desc": "Plazo en meses (Años × 12)"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el monto principal del préstamo.",
      "Introduce el porcentaje de la Tasa de Interés Anual cobrada por el banco.",
      "Introduce el Plazo del Préstamo en años o meses.",
      "Revisa tu EMI exacto, el monto total de intereses y la tabla de amortización mensual."
    ],
    "example": {
      "problem": "Calcula la EMI de un préstamo personal de ₹10,00,000 con un interés del 10.5% a un plazo de 3 años (36 meses).",
      "steps": [
        "Paso 1: Principal P = 10,00,000. Plazo N = 36 meses.",
        "Paso 2: Tasa de interés mensual R = 10.5 ÷ 1200 = 0.00875.",
        "Paso 3: (1 + R)³⁶ = (1.00875)³⁶ = 1.3686.",
        "Paso 4: EMI = [10,00,000 × 0.00875 × 1.3686] ÷ [1.3686 - 1] = ₹32,502.44.",
        "Paso 5: Interés total = (₹32,502.44 × 36) - ₹10,00,000 = ₹1,70,088."
      ],
      "result": "La EMI mensual es de ₹32,502, y el interés total a pagar durante 3 años es de ₹1,70,088."
    },
    "notes": [
      "Realizar pagos anticipados de cuotas adicionales reduce directamente el capital y recorta drásticamente los cargos por intereses a largo plazo.",
      "Las tasas de interés variables pueden alterar los montos de la EMI o la duración del plazo del préstamo con el tiempo.",
      "Las comisiones de procesamiento y los impuestos legales como el IVA (o GST) sobre los cargos bancarios son facturados por separado por los prestamistas."
    ],
    "faqs": [
      {
        "question": "¿Qué es una Cuota Mensual Equivalente (EMI)?",
        "answer": "Una EMI es una cantidad monetaria fija que un prestatario paga a un prestamista financiero en una fecha específica cada mes para saldar un préstamo amortizado durante un período determinado."
      },
      {
        "question": "¿Por qué los intereses son más altos en los primeros pagos de la EMI?",
        "answer": "Porque los intereses se calculan sobre el saldo pendiente, que es el más alto al inicio del préstamo. A medida que se amortiza el capital, la porción mensual de intereses disminuye."
      },
      {
        "question": "¿Puedo reducir mi EMI?",
        "answer": "Puedes reducir tu EMI mensual extendiendo el plazo del préstamo, negociando una tasa de interés más baja o realizando un pago anticipado al capital."
      },
      {
        "question": "¿Qué tipos de préstamos utilizan el cálculo de EMI?",
        "answer": "El cálculo de EMI se utiliza comúnmente para préstamos hipotecarios, préstamos para automóviles, préstamos personales, préstamos educativos y otros tipos de financiación a largo plazo donde los pagos se distribuyen uniformemente a lo largo del tiempo."
      }
    ],
    "breadcrumbName": "Calculadora de EMI"
  },
  "mortgage-calculator": {
    "slug": "mortgage-calculator",
    "lang": "es",
    "name": "Calculadora de Hipotecas",
    "category": "financial",
    "badge": "Préstamo Hipotecario y Vivienda",
    "icon": "Home",
    "h1": "Calculadora de Hipotecas",
    "seoTitle": "Calculadora de Hipotecas – Estima tus Cuotas Mensuales de Préstamo Hipotecario",
    "seoDescription": "Calculadora de hipotecas online gratuita. Estima los costes mensuales totales de tu vivienda, incluyendo capital, intereses, impuestos sobre la propiedad, seguro de hogar y pagos iniciales.",
    "primaryKeyword": "calculadora de hipotecas",
    "secondaryKeywords": [
      "calculadora de cuota hipotecaria",
      "calculadora de préstamo hipotecario",
      "calculadora hipoteca mensual",
      "calculadora de pago de vivienda",
      "calculadora de préstamo inmobiliario"
    ],
    "heroSubtitle": "Estima tus pagos mensuales de hipoteca, incluyendo capital, intereses, impuestos sobre la propiedad y seguro de hogar.",
    "about": [
      "La Calculadora de Hipotecas proporciona una estimación completa de los verdaderos costes mensuales de ser propietario de una vivienda. Un pago de hipoteca rara vez consiste únicamente en capital e intereses; los prestamistas y los servicios de depósito en garantía (escrow) suelen requerir contribuciones para impuestos sobre la propiedad y primas de seguro de riesgos.",
      "Introduce el precio de compra de la propiedad, el porcentaje o la cantidad del pago inicial, la tasa de interés y el plazo (por ejemplo, 15 o 30 años) para estimar tu pago mensual y los costes de financiación a lo largo de la vida del préstamo."
    ],
    "formula": {
      "title": "Fórmula Completa del Coste Hipotecario",
      "formulaText": "Pago Mensual Total = Capital e Intereses (C&I) + Impuesto Mensual sobre la Propiedad + Seguro Mensual + Cuota de Comunidad\nCapital del Préstamo = Precio de Compra de la Vivienda - Pago Inicial",
      "explanation": "C&I se calcula utilizando la fórmula de amortización estándar sobre el importe neto del préstamo. Los impuestos y el seguro se dividen por 12 y se suman para obtener la responsabilidad mensual total del depósito en garantía (escrow).",
      "variables": [
        {
          "name": "Precio de la Vivienda",
          "desc": "Precio de compra acordado de la propiedad residencial"
        },
        {
          "name": "Pago Inicial",
          "desc": "Capital en efectivo aportado por adelantado en el cierre"
        },
        {
          "name": "C&I",
          "desc": "Servicio de deuda mensual base que cubre capital e intereses"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el Precio de Compra de la Vivienda.",
      "Introduce tu Pago Inicial (como cantidad en dólares o porcentaje).",
      "Especifica la Tasa de Interés hipotecaria anual y el Plazo del Préstamo (normalmente 15 o 30 años).",
      "Opcionalmente, incluye los Impuestos anuales sobre la Propiedad y el Seguro de Hogar.",
      "Haz clic en Calcular para ver tu gasto mensual completo de vivienda y el total de intereses pagados."
    ],
    "example": {
      "problem": "Estima el pago mensual para una vivienda de $400,000 con un 20% de pago inicial ($80,000) a un interés del 6.5% en un préstamo fijo a 30 años, con $4,800/año de impuestos y $1,200/año de seguro.",
      "steps": [
        "Paso 1: Capital del Préstamo = $400,000 - $80,000 = $320,000.",
        "Paso 2: C&I Mensual sobre $320,000 al 6.5% durante 30 años = $2,022.62.",
        "Paso 3: Impuesto Mensual sobre la Propiedad = $4,800 ÷ 12 = $400.00.",
        "Paso 4: Seguro Mensual = $1,200 ÷ 12 = $100.00.",
        "Paso 5: Pago Mensual Total = $2,022.62 + $400.00 + $100.00 = $2,522.62."
      ],
      "result": "El pago mensual total estimado de la vivienda es de $2,522.62 (C&I: $2,022.62)."
    },
    "notes": [
      "Un pago inicial inferior al 20% suele activar el Seguro Hipotecario Privado (PMI) hasta que se alcanza el 20% de capital propio.",
      "Una hipoteca a 15 años implica pagos mensuales más altos, pero ahorra decenas de miles en intereses a lo largo de la vida del préstamo en comparación con un plazo de 30 años.",
      "Los impuestos sobre la propiedad fluctúan según las valoraciones municipales y los gravámenes de los distritos escolares locales."
    ],
    "faqs": [
      {
        "question": "¿Qué incluye un pago mensual de hipoteca?",
        "answer": "Un pago hipotecario estándar incluye Capital, Intereses, Impuestos sobre la Propiedad y Seguro de Hogar (a menudo conocido como PITI)."
      },
      {
        "question": "¿Por qué debería aspirar a un pago inicial del 20%?",
        "answer": "Aportar al menos un 20% elimina el requisito del Seguro Hipotecario Privado (PMI), reduce tu tasa de interés y disminuye tu obligación de deuda mensual."
      },
      {
        "question": "¿Debería elegir una hipoteca a 15 o 30 años?",
        "answer": "Un plazo de 30 años ofrece pagos mensuales más bajos y manejables. Un plazo de 15 años implica pagos mensuales más altos, pero cobra significativamente menos intereses totales a lo largo de la vida del préstamo."
      },
      {
        "question": "¿Qué es el PMI y cuándo se aplica?",
        "answer": "El Seguro Hipotecario Privado (PMI) es un tipo de seguro que protege al prestamista si no cumples con los pagos de tu hipoteca. Generalmente se requiere si tu pago inicial es inferior al 20% del precio de compra de la vivienda. Una vez que alcanzas el 20% de capital en tu vivienda, puedes solicitar la eliminación del PMI."
      }
    ],
    "breadcrumbName": "Calculadora de Hipotecas"
  },
  "compound-interest-calculator": {
    "slug": "compound-interest-calculator",
    "lang": "es",
    "name": "Calculadora de Interés Compuesto",
    "category": "financial",
    "badge": "Crecimiento de Inversiones",
    "icon": "TrendingUp",
    "h1": "Calculadora de Interés Compuesto",
    "seoTitle": "Calculadora de Interés Compuesto – Calcula el Crecimiento de tu Inversión Online",
    "seoDescription": "Calculadora de interés compuesto online gratuita. Calcula el valor futuro de tu inversión, los intereses ganados y la acumulación de riqueza con aportaciones mensuales o anuales.",
    "primaryKeyword": "calculadora de interés compuesto",
    "secondaryKeywords": [
      "calculadora interés compuesto mensual",
      "calculadora de inversiones",
      "calculadora de crecimiento compuesto",
      "calculadora valor futuro",
      "calculadora de ahorros"
    ],
    "heroSubtitle": "Calcula la acumulación de riqueza futura, las ganancias por interés compuesto y el crecimiento de tus inversiones con aportaciones mensuales o anuales regulares.",
    "about": [
      "La Calculadora de Interés Compuesto visualiza el poder del crecimiento financiero exponencial a lo largo del tiempo. A menudo descrito como la \"octava maravilla del mundo\", el interés compuesto se refiere a la obtención de intereses no solo sobre tu depósito inicial (capital), sino también sobre los intereses acumulados de períodos anteriores.",
      "Esta calculadora te permite modelar cuentas de jubilación (como 401(k)s e IRAs), ahorros en fondos indexados y depósitos a plazo fijo con frecuencias de capitalización personalizables (diaria, mensual, trimestral o anual) y aportaciones mensuales recurrentes."
    ],
    "formula": {
      "title": "Fórmula del Interés Compuesto con Aportaciones Regulares",
      "formulaText": "Future Value (A) = P × (1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ - 1) / (r/n) ]\nTotal Interest = Future Value - (P + PMT × Total Periods)",
      "explanation": "P es el capital inicial, r es la tasa nominal anual, n es la frecuencia de capitalización, t es el tiempo en años y PMT es la aportación periódica.",
      "variables": [
        {
          "name": "P",
          "desc": "Saldo de capital inicial"
        },
        {
          "name": "r",
          "desc": "Tasa de interés anual en forma decimal"
        },
        {
          "name": "n",
          "desc": "Períodos de capitalización por año (12 = mensual, 1 = anual)"
        },
        {
          "name": "PMT",
          "desc": "Aportación periódica recurrente en efectivo"
        }
      ]
    },
    "howToCalculate": [
      "Introduce tu saldo de capital inicial de inversión.",
      "Especifica el porcentaje de la Tasa de Interés Anual proyectada.",
      "Introduce el horizonte temporal de la inversión en años.",
      "Opcionalmente, especifica una cantidad de Aportación Mensual recurrente.",
      "Haz clic en Calcular para ver el valor futuro de la cartera, el interés total ganado y las trayectorias de crecimiento anual."
    ],
    "example": {
      "problem": "Invierte $10,000 con una rentabilidad anual del 8% capitalizada mensualmente durante 20 años, añadiendo $200 cada mes.",
      "steps": [
        "Paso 1: Los $10,000 iniciales crecen a: $10,000 × (1 + 0.08/12)²⁴⁰ = $49,268.03.",
        "Paso 2: Las aportaciones mensuales de $200 crecen a: $200 × [((1 + 0.08/12)²⁴⁰ - 1) / (0.08/12)] = $117,804.09.",
        "Paso 3: Valor total futuro de la cartera = $49,268.03 + $117,804.09 = $167,072.12.",
        "Paso 4: Efectivo total depositado = $10,000 + ($200 × 240) = $58,000. Intereses totales ganados = $109,072.12."
      ],
      "result": "La cartera crece hasta $167,072.12, con $109,072.12 generados puramente por interés compuesto."
    },
    "notes": [
      "El tiempo es el factor más importante en la capitalización: duplicar el horizonte temporal a menudo más que triplica los rendimientos de la inversión.",
      "Históricamente, los fondos indexados de mercado de valores amplios (como el S&P 500) han promediado ~10% de rendimientos nominales anuales antes de la inflación.",
      "El crecimiento real de la riqueza debe tener en cuenta la inflación a largo plazo (~2-3% anual)."
    ],
    "faqs": [
      {
        "question": "¿Qué es el interés compuesto?",
        "answer": "El interés compuesto es el interés calculado sobre el saldo de capital inicial y también sobre los intereses acumulados de períodos anteriores, creando un crecimiento exponencial compuesto."
      },
      {
        "question": "¿Con qué frecuencia se capitalizan los intereses en las cuentas de ahorro?",
        "answer": "La mayoría de las cuentas de ahorro de alto rendimiento modernas capitalizan los intereses diariamente y los abonan a tu saldo al final de cada mes."
      },
      {
        "question": "¿Qué es la Regla del 72?",
        "answer": "La Regla del 72 estima cuántos años tardará tu dinero en duplicarse: divide 72 por tu tasa de interés anual (por ejemplo, al 8%, el dinero se duplica en ~9 años)."
      },
      {
        "question": "¿Cuál es la diferencia entre interés simple e interés compuesto?",
        "answer": "El interés simple se calcula únicamente sobre el capital inicial, mientras que el interés compuesto se calcula sobre el capital inicial más los intereses acumulados de períodos anteriores, lo que genera un crecimiento mucho mayor a largo plazo."
      }
    ],
    "breadcrumbName": "Calculadora de Interés Compuesto"
  },
  "simple-interest-calculator": {
    "slug": "simple-interest-calculator",
    "lang": "es",
    "name": "Calculadora de Interés Simple",
    "category": "financial",
    "badge": "Interés Lineal",
    "icon": "PiggyBank",
    "h1": "Calculadora de Interés Simple",
    "seoTitle": "Calculadora de Interés Simple – Calcula Interés Simple y Valor de Vencimiento",
    "seoDescription": "Calculadora de interés simple online gratuita. Calcula el interés simple y el monto total de vencimiento usando la fórmula clásica I = P × R × T para préstamos y pagarés.",
    "primaryKeyword": "calculadora de interés simple",
    "secondaryKeywords": [
      "fórmula interés simple",
      "calcular interés simple",
      "préstamo interés simple",
      "calculadora valor vencimiento",
      "I = PRT"
    ],
    "heroSubtitle": "Calcula las ganancias por interés simple y los valores totales de vencimiento utilizando la fórmula fundamental I = P × R × T.",
    "about": [
      "La Calculadora de Interés Simple calcula el interés lineal sobre pagarés, préstamos a corto plazo, certificados de depósito y problemas financieros académicos. A diferencia del interés compuesto, el interés simple no genera intereses sobre intereses; el cargo se evalúa estrictamente sobre el capital original.",
      "Este cálculo se utiliza comúnmente en préstamos entre particulares a corto plazo, transacciones de casas de empeño, estructuras de financiación a plazos de automóviles y planes de pago a plazos de productos electrónicos de consumo."
    ],
    "formula": {
      "title": "Fórmula del Interés Simple",
      "formulaText": "Interés (I) = (Capital × Tasa × Tiempo) / 100\nMonto Total de Vencimiento (A) = Capital + Interés",
      "explanation": "Multiplica el capital original por la tasa de porcentaje anual y la duración del tiempo en años, luego divide por 100.",
      "variables": [
        {
          "name": "P",
          "desc": "Capital: suma original invertida o prestada"
        },
        {
          "name": "R",
          "desc": "Tasa: porcentaje de interés anual"
        },
        {
          "name": "T",
          "desc": "Tiempo: horizonte temporal en años"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el monto del Capital inicial.",
      "Introduce el porcentaje de la Tasa de Interés Anual.",
      "Introduce la duración o Plazo del Préstamo en años.",
      "Haz clic en Calcular para ver el interés simple generado y la suma total a pagar o de vencimiento."
    ],
    "example": {
      "problem": "Calcula el interés simple de un pagaré personal de $5,000 con un interés anual del 5.5% durante 3 años.",
      "steps": [
        "Paso 1: Identifica las variables: P = 5,000, R = 5.5, T = 3.",
        "Paso 2: Calcula el interés: I = (5,000 × 5.5 × 3) ÷ 100 = 82,500 ÷ 100 = $825.00.",
        "Paso 3: Monto total: $5,000 + $825 = $5,825.00."
      ],
      "result": "El interés simple ganado es de $825.00, lo que da un monto total de vencimiento de $5,825.00."
    },
    "notes": [
      "Si el tiempo se da en meses, divide por 12 (ej., 6 meses = 0.5 años). Si se da en días, divide por 365.",
      "El interés simple genera menos dinero total que el interés compuesto en horizontes temporales idénticos.",
      "Las fórmulas de interés simple son el punto de referencia en papel comercial y Letras del Tesoro."
    ],
    "faqs": [
      {
        "question": "¿Cuál es la fórmula del interés simple?",
        "answer": "La fórmula es I = P × R × T / 100, donde I es el Interés, P es el Capital, R es la tasa de interés anual y T es el tiempo en años."
      },
      {
        "question": "¿En qué se diferencia el interés simple del interés compuesto?",
        "answer": "El interés simple se calcula exclusivamente sobre el saldo del capital original. El interés compuesto se calcula tanto sobre el capital como sobre los intereses acumulados previamente."
      },
      {
        "question": "¿Cuándo se utiliza el interés simple?",
        "answer": "El interés simple se utiliza típicamente para préstamos personales a corto plazo, financiación de autom��viles, acumulación de intereses de préstamos estudiantiles durante períodos de gracia y papel comercial."
      },
      {
        "question": "¿Cómo se mide el 'Tiempo' (T) en la fórmula del interés simple?",
        "answer": "En la fórmula del interés simple, 'T' representa la duración del tiempo en años. Si el tiempo se da en meses, debes dividirlo por 12. Si se da en días, divídelo por 365 (o 360 en algunos contextos comerciales, pero 365 es el estándar para cálculos generales)."
      }
    ],
    "breadcrumbName": "Calculadora de Interés Simple"
  },
  "gst-calculator": {
    "slug": "gst-calculator",
    "lang": "es",
    "name": "Calculadora de GST",
    "category": "financial",
    "badge": "Impuesto sobre Bienes y Servicios",
    "icon": "Receipt",
    "h1": "Calculadora de GST",
    "seoTitle": "Calculadora de GST – Calcula montos con GST incluido y excluido",
    "seoDescription": "Calculadora de GST gratuita en línea. Calcula precios con GST incluido y excluido, desglose de impuestos (CGST/SGST) y montos netos para tasas estándar (5%, 12%, 18%, 28%).",
    "primaryKeyword": "calculadora GST",
    "secondaryKeywords": [
      "calculadora GST India",
      "cálculo GST",
      "calcular GST",
      "calculadora GST incluido",
      "calculadora GST excluido",
      "calculadora GST inversa"
    ],
    "heroSubtitle": "Calcula el Impuesto sobre Bienes y Servicios (GST) para transacciones con y sin impuestos, desglosa CGST y SGST, y determina los precios netos de factura.",
    "about": [
      "La Calculadora de Impuesto sobre Bienes y Servicios (GST) automatiza la facturación de impuestos para propietarios de negocios, contratistas independientes, contadores y consumidores minoristas. El GST es un impuesto integral al valor agregado basado en el destino, aplicado a la fabricación, venta y consumo de bienes y servicios.",
      "Esta herramienta soporta dos modos comerciales estándar: GST Excluido (añadir impuesto a un precio base) y GST Incluido (calcular inversamente el precio base antes de impuestos y la porción exacta del impuesto a partir de un precio de venta bruto). Selecciona entre los tramos de GST estándar (como 5%, 12%, 18%, 28%) o introduce tasas personalizadas."
    ],
    "formula": {
      "title": "Fórmulas de GST Incluido y Excluido",
      "formulaText": "GST Excluido (Añadir GST):\nMonto de GST = Precio Base × (Tasa de GST / 100)\nPrecio Final = Precio Base + Monto de GST\n\nGST Incluido (Eliminar GST):\nPrecio Base = Monto Bruto / (1 + Tasa de GST / 100)\nMonto de GST = Monto Bruto - Precio Base",
      "explanation": "Para añadir el GST, multiplica el monto base por la tasa. Para extraer el GST de un total, divide la suma bruta por 1 más la tasa decimal.",
      "variables": [
        {
          "name": "Precio Base",
          "desc": "Precio neto antes de impuestos del producto o servicio"
        },
        {
          "name": "Tasa de GST",
          "desc": "Porcentaje de tramo impositivo legal aplicable"
        },
        {
          "name": "CGST / SGST",
          "desc": "Componentes de GST Central y Estatal (cada uno equivale al 50% del GST total en India)"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el Monto de la transacción.",
      "Selecciona si el precio es GST Excluido (añadir impuesto) o GST Incluido (eliminar impuesto).",
      "Selecciona una tasa de impuesto estándar (ej. 5%, 12%, 18%, 28%) o introduce una tasa personalizada.",
      "Haz clic en Calcular para ver el precio base antes de impuestos, la porción de impuesto GST, el desglose de CGST/SGST y el precio final de la factura."
    ],
    "example": {
      "problem": "Calcula el costo antes de impuestos y el monto del impuesto de un artículo que se vende por ₹1,180 con una tasa de GST incluido del 18%.",
      "steps": [
        "Paso 1: Precio Base = ₹1,180 ÷ (1 + 0.18) = ₹1,180 ÷ 1.18 = ₹1,000.00.",
        "Paso 2: GST Total = ₹1,180 - ₹1,000 = ₹180.00.",
        "Paso 3: CGST (9%) = ₹90.00, y SGST (9%) = ₹90.00."
      ],
      "result": "El precio base neto es ₹1,000.00 y el impuesto GST cobrado es ₹180.00."
    },
    "notes": [
      "Para transacciones intraestatales en India, el GST se divide equitativamente entre CGST (GST Central) y SGST (GST Estatal).",
      "Para ventas interestatales a través de fronteras estatales, el impuesto completo se designa como IGST (GST Integrado).",
      "Las tasas de GST estándar seleccionables incluyen 0%, 5%, 12%, 18% y 28%."
    ],
    "faqs": [
      {
        "question": "¿Cómo se calcula el precio con GST incluido?",
        "answer": "Divide el precio total con GST incluido por (1 + Tasa de GST / 100). Para una tasa de GST del 18%, divide el precio total por 1.18 para determinar el precio base antes de impuestos."
      },
      {
        "question": "¿Cuál es la diferencia entre GST incluido y excluido?",
        "answer": "GST Excluido significa que el impuesto aún no se ha añadido al precio. GST Incluido significa que el precio listado ya incorpora el impuesto."
      },
      {
        "question": "¿Qué son CGST, SGST e IGST?",
        "answer": "En India, el CGST se destina al gobierno central, el SGST al gobierno estatal para ventas locales, y el IGST se aplica a ventas entre estados."
      },
      {
        "question": "¿Para qué sirve una calculadora de GST?",
        "answer": "Una calculadora de GST simplifica el proceso de determinar el monto exacto del impuesto sobre bienes y servicios, ya sea para añadirlo a un precio base o para extraerlo de un precio total. Esto ayuda a empresas y consumidores a entender el desglose de los costos y a cumplir con las obligaciones fiscales."
      }
    ],
    "breadcrumbName": "Calculadora de GST"
  },
  "tax-calculator": {
    "slug": "tax-calculator",
    "lang": "es",
    "name": "Calculadora de Impuestos",
    "category": "financial",
    "badge": "Ingresos y Deducciones",
    "icon": "Scale",
    "h1": "Calculadora de Impuestos",
    "seoTitle": "Calculadora de Impuestos – Estima el Impuesto sobre la Renta y Salario Neto",
    "seoDescription": "Calculadora de impuestos online gratuita. Estima tus ingresos imponibles, tramos del impuesto federal, tasa impositiva efectiva y salario neto mensual.",
    "primaryKeyword": "calculadora de impuestos",
    "secondaryKeywords": [
      "calculadora de impuesto sobre la renta",
      "calculadora estimación impuestos",
      "calcular impuesto sobre la renta",
      "calculadora salario neto",
      "calculadora tasa impositiva efectiva"
    ],
    "heroSubtitle": "Estima tus ingresos imponibles, la obligación tributaria, la tasa impositiva efectiva y el salario neto mensual.",
    "about": [
      "La Calculadora de Impuestos sobre la Renta ofrece un estimador genérico de tributación progresiva para ayudar a asalariados y profesionales autónomos a proyectar su obligación tributaria anual y sus ingresos netos. Los sistemas fiscales progresivos aplican porcentajes impositivos más altos solo a las porciones de ingresos que superan los umbrales de tramo especificados.",
      "Introduce tus ingresos brutos anuales y las deducciones permitidas (como deducciones estándar, contribuciones a la jubilación o cuentas de salud) para ver las obligaciones fiscales estimadas, las tasas impositivas marginales frente a las efectivas y el salario neto mensual."
    ],
    "formula": {
      "title": "Marco de Impuesto sobre la Renta Progresivo",
      "formulaText": "Ingresos Imponibles = Ingresos Brutos Anuales - Deducciones\nImpuesto = ∑ (Ingresos Imponibles en Tramo × Tasa del Tramo)\nTasa Impositiva Efectiva = (Impuesto Total / Ingresos Brutos) × 100\nSalario Neto = Ingresos Brutos - Impuesto Total",
      "explanation": "Las deducciones reducen tu base imponible. Los tramos impositivos se aplican de forma incremental; los ingresos no se gravan a una única tasa máxima fija.",
      "variables": [
        {
          "name": "Ingresos Brutos",
          "desc": "Ganancias totales antes de impuestos por empleo o negocio"
        },
        {
          "name": "Deducciones",
          "desc": "Deducciones estándar permitidas o exenciones antes de impuestos"
        },
        {
          "name": "Tasa Efectiva",
          "desc": "El porcentaje promedio real combinado de ingresos pagados en impuestos"
        }
      ]
    },
    "howToCalculate": [
      "Introduce tus Ingresos Brutos Anuales totales.",
      "Introduce tus Deducciones anuales estimadas (como la deducción estándar o el ahorro para la jubilación).",
      "Haz clic en Calcular para ver tus ingresos imponibles estimados, la obligación tributaria, la tasa impositiva efectiva y el salario neto mensual."
    ],
    "example": {
      "problem": "Estima el impuesto para un individuo que gana $85,000 con una deducción estándar de $14,600.",
      "steps": [
        "Paso 1: Ingresos Imponibles = $85,000 - $14,600 = $70,400.",
        "Paso 2: 10% sobre los primeros $11,600 = $1,160.00.",
        "Paso 3: 12% sobre ($47,150 - $11,600 = $35,550) = $4,266.00.",
        "Paso 4: 22% sobre el restante ($70,400 - $47,150 = $23,250) = $5,115.00.",
        "Paso 5: Impuesto total estimado = $1,160 + $4,266 + $5,115 = $10,541.00.",
        "Paso 6: Tasa impositiva efectiva = ($10,541 ÷ $85,000) × 100 = 12.40%."
      ],
      "result": "El impuesto sobre la renta estimado es de $10,541.00 con una tasa efectiva del 12.40% y un salario neto de $74,459.00."
    },
    "notes": [
      "Esta herramienta proporciona estimaciones informativas genéricas y no reemplaza el asesoramiento oficial de un contador público certificado (CPA) o un profesional de impuestos.",
      "Los impuestos estatales, provinciales, municipales y las contribuciones a la seguridad social/FICA se calculan por separado.",
      "La tasa impositiva marginal se refiere a la tasa pagada sobre el último dólar ganado; la tasa impositiva efectiva es tu carga fiscal promedio real combinada."
    ],
    "faqs": [
      {
        "question": "¿Cuál es la diferencia entre la tasa impositiva marginal y la efectiva?",
        "answer": "Tu tasa impositiva marginal es el tramo impositivo más alto aplicado a tu último dólar de ingresos. Tu tasa impositiva efectiva es el porcentaje global real de tus ingresos totales pagado en impuestos."
      },
      {
        "question": "¿Cómo reducen las deducciones mi factura de impuestos?",
        "answer": "Las deducciones reducen tus ingresos imponibles. Por ejemplo, una deducción de $10,000 para alguien en un tramo impositivo del 22% reduce el impuesto real adeudado en $2,200."
      },
      {
        "question": "¿Esta calculadora incluye impuestos sobre la renta estatales?",
        "answer": "Este modelo calcula los tramos progresivos estándar. Los impuestos estatales y locales varían según la jurisdicción y deben tenerse en cuenta adicionalmente."
      },
      {
        "question": "¿Para qué países o sistemas fiscales es aplicable esta calculadora?",
        "answer": "Esta calculadora está diseñada para ilustrar un sistema de impuestos progresivo genérico, similar al de muchos países. Sin embargo, las leyes fiscales específicas, los tramos y las deducciones varían significativamente por país y región. Siempre consulta la legislación fiscal local o a un profesional para obtener información precisa."
      }
    ],
    "breadcrumbName": "Calculadora de Impuestos"
  },
  "discount-calculator": {
    "slug": "discount-calculator",
    "lang": "es",
    "name": "Calculadora de Descuentos",
    "category": "financial",
    "badge": "Ofertas y Ahorros",
    "icon": "Tag",
    "h1": "Calculadora de Descuentos",
    "seoTitle": "Calculadora de Descuentos – Calcula Precio Final y Porcentaje de Descuento",
    "seoDescription": "Calculadora de descuentos online gratuita. Calcula precios finales de venta, dinero ahorrado y porcentajes de descuento al instante, con cálculo opcional de impuestos.",
    "primaryKeyword": "calculadora de descuentos",
    "secondaryKeywords": [
      "calculadora de porcentaje de descuento",
      "calculadora de precio rebajado",
      "calculadora de descuento porcentual",
      "¿cuánto me ahorro?",
      "calculadora de descuento inverso"
    ],
    "heroSubtitle": "Calcula precios de venta con descuento, el total de dinero ahorrado y los costos finales con impuestos para compras y promociones minoristas.",
    "about": [
      "La Calculadora de Descuentos ayuda a compradores y comerciantes minoristas a calcular rápidamente las reducciones de precio durante eventos de ventas (como Black Friday, Cyber Monday, liquidaciones de temporada y cupones promocionales).",
      "Introduce el precio original y el porcentaje de descuento anunciado para ver inmediatamente cuánto dinero ahorras, el precio con descuento y el costo final en caja después de aplicar el impuesto sobre las ventas local."
    ],
    "formula": {
      "title": "Fórmulas de Descuento y Precio Final de Venta",
      "formulaText": "Cantidad Ahorrada = Precio Original × (Descuento % / 100)\nPrecio con Descuento = Precio Original - Cantidad Ahorrada\nPrecio Final con Impuestos = Precio con Descuento + (Precio con Descuento × Impuesto % / 100)",
      "explanation": "Multiplica el precio de etiqueta por el porcentaje de descuento para encontrar el ahorro, luego resta esa cantidad del precio original.",
      "variables": [
        {
          "name": "Precio Original",
          "desc": "Precio de etiqueta del fabricante o minorista antes de la venta"
        },
        {
          "name": "Descuento %",
          "desc": "Porcentaje de reducción de precio anunciado"
        },
        {
          "name": "Impuesto sobre Ventas %",
          "desc": "Tasa de impuesto sobre ventas estatal o local opcional"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el Precio de Etiqueta Original.",
      "Introduce el Porcentaje de Descuento (ej. 20% o 35% de descuento).",
      "Opcionalmente, introduce tu porcentaje de Impuesto sobre Ventas local.",
      "Haz clic en Calcular para ver tu ahorro exacto en dólares y el precio final."
    ],
    "example": {
      "problem": "Una chaqueta de invierno con un precio de $180 está en oferta con un 30% de descuento, y un 8% de impuesto sobre ventas local.",
      "steps": [
        "Paso 1: Ahorro = $180 × 0.30 = $54.00.",
        "Paso 2: Precio con descuento = $180 - $54.00 = $126.00.",
        "Paso 3: Impuesto sobre ventas = $126.00 × 0.08 = $10.08.",
        "Paso 4: Precio final en caja = $126.00 + $10.08 = $136.08."
      ],
      "result": "Ahorras $54.00. La chaqueta cuesta $126.00 antes de impuestos y $136.08 después de impuestos."
    },
    "notes": [
      "Un descuento del 50% significa que pagas la mitad del precio original.",
      "Apilar descuentos (ej. 20% de descuento más un 10% adicional) no equivale a un 30% de descuento; el segundo descuento se aplica al subtotal ya rebajado.",
      "El impuesto sobre ventas se calcula sobre el precio final con descuento, no sobre el precio de etiqueta original."
    ],
    "faqs": [
      {
        "question": "¿Cómo se calcula un 20% de descuento en un artículo?",
        "answer": "Multiplica el precio por 0.20 para encontrar lo que ahorras, o multiplica el precio por 0.80 para encontrar directamente el precio final de venta."
      },
      {
        "question": "¿Cómo funciona una oferta de \"compra uno y llévate el segundo con 50% de descuento\" en términos porcentuales?",
        "answer": "Si se compran dos artículos de igual precio, un descuento de \"compra uno y llévate el segundo con 50% de descuento\" equivale a un descuento total del 25% en ambos artículos."
      },
      {
        "question": "¿Cómo calculo el precio original a partir de un precio de oferta?",
        "answer": "Divide el precio de oferta entre (1 - Descuento % / 100). Por ejemplo, si un artículo cuesta $80 después de un 20% de descuento: $80 / 0.80 = $100 precio original."
      },
      {
        "question": "¿Cuál es la diferencia entre un descuento y un reembolso?",
        "answer": "Un descuento es una reducción del precio en el momento de la compra, lo que significa que pagas menos al instante. Un reembolso es una devolución parcial del precio de compra después de la venta, que generalmente requiere que envíes un formulario para recibir el dinero de vuelta más tarde."
      }
    ],
    "breadcrumbName": "Calculadora de Descuentos"
  },
  "profit-margin-calculator": {
    "slug": "profit-margin-calculator",
    "lang": "es",
    "name": "Calculadora de Margen de Beneficio",
    "category": "financial",
    "badge": "Margen vs. Recargo",
    "icon": "BarChart3",
    "h1": "Calculadora de Margen de Beneficio",
    "seoTitle": "Calculadora de Margen de Beneficio – Calcula Margen Bruto y Recargo Online",
    "seoDescription": "Calculadora de margen de beneficio online gratuita. Calcula el beneficio bruto, el porcentaje de margen de beneficio y el porcentaje de recargo a partir del coste del artículo y el precio de venta.",
    "primaryKeyword": "calculadora de margen de beneficio",
    "secondaryKeywords": [
      "calculadora de beneficio",
      "calculadora de margen",
      "calculadora de recargo",
      "margen de beneficio bruto",
      "margen vs recargo"
    ],
    "heroSubtitle": "Calcula el beneficio bruto, el porcentaje de margen de beneficio y el porcentaje de recargo minorista para fijar precios de productos de forma rentable.",
    "about": [
      "La Calculadora de Margen de Beneficio ayuda a emprendedores, minoristas, dropshippers y propietarios de pequeñas empresas a determinar con precisión la rentabilidad y a distinguir entre Margen y Recargo. Confundir estas dos métricas es uno de los errores de fijación de precios más comunes en el comercio.",
      "El Margen de Beneficio Bruto indica qué porcentaje de los ingresos totales se retiene después de contabilizar el Costo de Bienes Vendidos (COGS). El Recargo refleja el aumento porcentual aplicado sobre el costo base para establecer el precio de venta al público."
    ],
    "formula": {
      "title": "Fórmulas de Margen Bruto y Recargo",
      "formulaText": "Beneficio Bruto = Ingresos - Costo\nMargen de Beneficio (%) = (Beneficio Bruto / Ingresos) × 100\nRecargo (%) = (Beneficio Bruto / Costo) × 100",
      "explanation": "El margen se calcula en relación con los ingresos (precio de venta), mientras que el recargo se calcula en relación con el costo del producto.",
      "variables": [
        {
          "name": "Costo",
          "desc": "Costo de Bienes Vendidos (COGS) para adquirir o producir la unidad"
        },
        {
          "name": "Ingresos",
          "desc": "Precio de venta cobrado al consumidor"
        },
        {
          "name": "Beneficio Bruto",
          "desc": "Ingresos netos restantes después de deducir el costo de producción directo"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el Costo para adquirir o producir el producto (ej., $40).",
      "Introduce los Ingresos o el Precio de Venta objetivo (ej., $100).",
      "Haz clic en Calcular para ver el beneficio bruto en dólares, el porcentaje de margen de beneficio y el porcentaje de recargo requerido."
    ],
    "example": {
      "problem": "Una empresa compra un artículo por $50 y lo vende por $80. ¿Cuáles son el beneficio bruto, el margen de beneficio y el recargo?",
      "steps": [
        "Paso 1: Beneficio Bruto = $80 (Ingresos) - $50 (Costo) = $30.00.",
        "Paso 2: Margen de Beneficio = ($30 ÷ $80) × 100 = 37.5%.",
        "Paso 3: Recargo = ($30 ÷ $50) × 100 = 60.0%."
      ],
      "result": "El beneficio bruto es de $30.00. El margen de beneficio es del 37.5%, y el recargo es del 60.0%."
    },
    "notes": [
      "El margen nunca puede exceder el 100%, mientras que el recargo puede ser del 200%, 500% o superior.",
      "Un recargo del 50% corresponde a un margen del 33.3%. Un recargo del 100% corresponde a un margen del 50%.",
      "El margen de beneficio neto deduce los gastos generales, marketing e impuestos, además de los costos directos de producción."
    ],
    "faqs": [
      {
        "question": "¿Cuál es la diferencia clave entre margen y recargo?",
        "answer": "El margen es el beneficio dividido por el precio de venta (ingresos). El recargo es el beneficio dividido por el costo. El margen mide lo que retienes de las ventas; el recargo mide lo que añades a los costos."
      },
      {
        "question": "¿Por qué el recargo siempre es mayor que el margen para el mismo artículo?",
        "answer": "Porque el costo siempre es menor que el precio de venta para productos rentables. Dividir el mismo beneficio en dólares por el costo menor produce un porcentaje más alto que dividirlo por los ingresos."
      },
      {
        "question": "¿Cuál es un buen margen de beneficio para negocios minoristas?",
        "answer": "Un margen de beneficio bruto saludable suele oscilar entre el 40% y el 60% para el comercio minorista y electrónico, mientras que los márgenes de beneficio neto suelen estar entre el 10% y el 20%."
      },
      {
        "question": "¿Por qué es importante para las empresas entender tanto el margen de beneficio como el recargo?",
        "answer": "Comprender ambas métricas es crucial para estrategias de precios efectivas. El margen de beneficio ayuda a evaluar la rentabilidad general de las ventas, mientras que el recargo es esencial para establecer precios competitivos basados en los costos del producto y asegurar los niveles de beneficio deseados."
      }
    ],
    "breadcrumbName": "Calculadora de Margen de Beneficio"
  },
  "salary-calculator": {
    "slug": "salary-calculator",
    "lang": "es",
    "name": "Calculadora de Salario",
    "category": "financial",
    "badge": "Por Hora, Mensual y Anual",
    "icon": "Wallet",
    "h1": "Calculadora de Salario",
    "seoTitle": "Calculadora de Salario: Convierte Pago por Hora, Semanal, Mensual y Anual",
    "seoDescription": "Calculadora de salario online gratuita. Convierte entre salario por hora, pago semanal, salario quincenal, ingresos mensuales y compensación anual con horas de trabajo personalizadas.",
    "primaryKeyword": "calculadora de salario",
    "secondaryKeywords": [
      "calculadora de salario anual",
      "calculadora de salario mensual",
      "calculadora de salario por hora",
      "convertir salario por hora a anual",
      "calculadora de sueldo"
    ],
    "heroSubtitle": "Convierte la compensación entre salario anual, pago mensual, cheques quincenales y tarifas de salario por hora.",
    "about": [
      "La Calculadora de Salario convierte la compensación laboral a través de todas las frecuencias de pago estándar: salario anual, ingresos mensuales, pagos quincenales, salarios semanales, tarifas diarias y pago por hora.",
      "Ya sea que estés negociando una oferta de trabajo, convirtiendo una tarifa de contratista de $30/hora a un equivalente anual, o presupuestando gastos de vida mensuales, esta calculadora proporciona conversiones de nómina instantáneas y estandarizadas basadas en tus horas de trabajo semanales."
    ],
    "formula": {
      "title": "Estándares de Conversión Salarial",
      "formulaText": "Salario Anual = Salario por Hora × Horas/Semana × Semanas/Año\nSalario Mensual = Salario Anual / 12\nPago Quincenal = Salario Anual / 26\nPago Semanal = Salario Anual / 52\nSalario por Hora = Salario Anual / (Horas/Semana × Semanas/Año)",
      "explanation": "Basado en una semana laboral estándar de 40 horas y 52 semanas laborales por año (2,080 horas de trabajo anuales).",
      "variables": [
        {
          "name": "Horas Estándar",
          "desc": "40 horas por semana"
        },
        {
          "name": "Semanas Estándar",
          "desc": "52 semanas por año calendario (2,080 horas de trabajo totales)"
        }
      ]
    },
    "howToCalculate": [
      "Introduce tu Cantidad de Compensación.",
      "Selecciona la frecuencia de pago: Anual, Mensual, Quincenal, Semanal, Diaria o Por Hora.",
      "Ajusta las horas de trabajo por semana (predeterminado 40) o las semanas de trabajo por año (predeterminado 52).",
      "Haz clic en Calcular para ver una tabla de conversión completa para todos los períodos de pago."
    ],
    "example": {
      "problem": "Convierte un salario anual de $75,000 a pago mensual, quincenal, semanal y por hora (40 horas/semana, 52 semanas).",
      "steps": [
        "Paso 1: Pago Mensual = $75,000 ÷ 12 = $6,250.00.",
        "Paso 2: Pago Quincenal (26 períodos de pago) = $75,000 ÷ 26 = $2,884.62.",
        "Paso 3: Pago Semanal = $75,000 ÷ 52 = $1,442.31.",
        "Paso 4: Salario por Hora = $75,000 ÷ 2,080 horas = $36.06/hora."
      ],
      "result": "Un salario de $75,000 equivale a $6,250/mes, $2,884.62 quincenal y $36.06 por hora."
    },
    "notes": [
      "Los cálculos reflejan el ingreso bruto antes de impuestos y retenciones de beneficios federales, estatales y legales.",
      "El pago quincenal ocurre 26 veces al año (lo que resulta en dos meses al año con tres cheques de pago). El pago semi-mensual ocurre 24 veces al año.",
      "Para contratistas autónomos, considera los impuestos de autoempleo y las semanas de vacaciones no remuneradas."
    ],
    "faqs": [
      {
        "question": "¿Cómo se convierte el salario por hora a salario anual?",
        "answer": "Multiplica tu salario por hora por las horas trabajadas por semana, luego multiplica por 52 semanas. Para un horario de tiempo completo de 40 horas, multiplica la tarifa por hora por 2,080."
      },
      {
        "question": "¿Cuál es la diferencia entre pago quincenal y pago semi-mensual?",
        "answer": "El pago quincenal ocurre cada dos semanas (26 cheques de pago/año). El pago semi-mensual ocurre dos veces al mes en fechas específicas como el 1 y el 15 (24 cheques de pago/año)."
      },
      {
        "question": "¿Cuántas horas de trabajo hay en un año laboral estándar?",
        "answer": "Un empleado estándar a tiempo completo que trabaja 40 horas por semana durante 52 semanas trabaja un total de 2,080 horas al año."
      },
      {
        "question": "¿Por qué es importante conocer mi salario en diferentes frecuencias?",
        "answer": "Comprender tu salario en términos por hora, semanal, mensual y anual ayuda con la elaboración de presupuestos, la comparación de ofertas de trabajo, la negociación y la planificación financiera. Ofrece una imagen más clara de tus ingresos en varios períodos."
      }
    ],
    "breadcrumbName": "Calculadora de Salario"
  },
  "currency-calculator": {
    "slug": "currency-calculator",
    "lang": "es",
    "name": "Calculadora de Divisas",
    "category": "financial",
    "badge": "Tipos de Cambio y Forex",
    "icon": "Coins",
    "h1": "Calculadora de Divisas",
    "seoTitle": "Calculadora de Divisas – Conversor de Moneda Extranjera y Tasas en Vivo",
    "seoDescription": "Calculadora de divisas online gratuita. Convierta entre USD, EUR, GBP, INR, CAD, AUD, JPY y las principales monedas globales con tipos de cambio interbancarios.",
    "primaryKeyword": "calculadora de divisas",
    "secondaryKeywords": [
      "conversor de divisas",
      "calculadora tipo de cambio",
      "calculadora USD a INR",
      "calculadora EUR a USD",
      "calculadora de cambio de moneda"
    ],
    "heroSubtitle": "Convierta cantidades entre monedas globales con tipos de cambio interbancarios de referencia transparentes.",
    "about": [
      "La Calculadora de Divisas proporciona conversiones de moneda extranjera fiables entre las principales divisas globales, incluyendo el Dólar Estadounidense (USD), Euro (EUR), Libra Esterlina (GBP), Rupia India (INR), Dólar Canadiense (CAD), Dólar Australiano (AUD), Yen Japonés (JPY) y Franco Suizo (CHF).",
      "Ya sea que esté presupuestando viajes al extranjero, convirtiendo facturas de freelance internacionales o comparando precios de comercio electrónico internacional, esta herramienta convierte valores utilizando las tasas de referencia interbancarias estándar del mercado medio."
    ],
    "formula": {
      "title": "Conversión de Tipos de Cambio de Divisas",
      "formulaText": "Cantidad Objetivo = Cantidad Base × Tipo de Cambio Directo (De Moneda ⟶ A Moneda)\nTasa Inversa = 1 / Tipo de Cambio Directo",
      "explanation": "Convierte la moneda de origen a su equivalente en USD como base, luego escala por el multiplicador del tipo de cambio de la moneda objetivo.",
      "variables": [
        {
          "name": "Cantidad Base",
          "desc": "La cantidad monetaria a convertir"
        },
        {
          "name": "Tipo Directo",
          "desc": "El precio de una unidad de la moneda de origen en términos de la moneda objetivo"
        },
        {
          "name": "Tipo Inverso",
          "desc": "El precio recíproco de la moneda objetivo en términos de la moneda de origen"
        }
      ]
    },
    "howToCalculate": [
      "Introduzca la Cantidad monetaria a convertir.",
      "Seleccione la Moneda de Origen (ej., USD, EUR, GBP).",
      "Seleccione la Moneda de Destino (ej., INR, CAD, AUD).",
      "Haga clic en Calcular para ver la cantidad convertida, el tipo de cambio de referencia actual y el tipo de cambio inverso."
    ],
    "example": {
      "problem": "Convierta 500 USD a Euros (EUR) con un tipo de cambio de referencia ilustrativo de 1 USD = 0.8950 EUR.",
      "steps": [
        "Paso 1: Cantidad Base = 500 USD.",
        "Paso 2: Multiplicar por el tipo de cambio: 500 × 0.8950 = 447.50 EUR.",
        "Paso 3: Tipo inverso = 1 ÷ 0.8950 = 1.1173 USD por 1 EUR."
      ],
      "result": "500 USD se convierten en 447.50 EUR con un tipo de cambio de referencia ilustrativo de 0.8950."
    },
    "notes": [
      "Los tipos de cambio reflejan las tasas interbancarias del mercado medio; los bancos de consumo y las tarjetas minoristas pueden cobrar una comisión adicional por transacción extranjera del 1.5% al 3.5%.",
      "Los tipos de cambio fluctúan continuamente durante las horas de operación del mercado global de divisas (forex).",
      "Las tasas de referencia se actualizan regularmente a partir de fuentes de referencia interbancarias."
    ],
    "faqs": [
      {
        "question": "¿Qué es el tipo de cambio del mercado medio?",
        "answer": "El tipo de cambio del mercado medio es el punto intermedio entre las tasas globales de compra y venta en los mercados de divisas (forex). Representa la tasa más justa y sin recargos."
      },
      {
        "question": "¿Por qué los tipos de cambio minoristas difieren de los conversores online?",
        "answer": "Los bancos comerciales y las casas de cambio en aeropuertos aplican un margen de beneficio o una comisión para lucrarse con las transacciones de conversión de divisas."
      },
      {
        "question": "¿Puedo calcular el tipo de cambio inverso?",
        "answer": "Sí. La calculadora muestra el tipo inverso recíproco (ej., 1 INR = 0.012 USD) junto con el resultado de la conversión principal."
      },
      {
        "question": "¿Con qué frecuencia se actualizan los tipos de cambio?",
        "answer": "Los tipos de cambio en esta calculadora se actualizan en tiempo real o con una frecuencia muy alta, basándose en fuentes de datos interbancarias para reflejar las condiciones actuales del mercado."
      }
    ],
    "breadcrumbName": "Calculadora de Divisas"
  },
  "percentage-calculator": {
    "slug": "percentage-calculator",
    "lang": "es",
    "name": "Calculadora de Porcentajes",
    "category": "math",
    "badge": "Herramienta Matemática Rápida",
    "icon": "Percent",
    "h1": "Calculadora de Porcentajes",
    "seoTitle": "Calculadora de Porcentajes – Calcula Porcentajes Fácilmente Online",
    "seoDescription": "Calculadora de porcentajes online gratuita. Calcula el porcentaje de un número, el cambio porcentual, aumentos, disminuciones y diferencias porcentuales al instante con fórmulas.",
    "primaryKeyword": "calculadora de porcentajes",
    "secondaryKeywords": [
      "calcular porcentaje",
      "calculadora de tanto por ciento",
      "calculadora de aumento porcentual",
      "calculadora de disminución porcentual",
      "diferencia porcentual"
    ],
    "heroSubtitle": "Calcula porcentajes de valores, aumentos y disminuciones porcentuales, o averigua qué porcentaje representa un número de otro con precisión matemática instantánea.",
    "about": [
      "La Calculadora de Porcentajes es una herramienta online versátil diseñada para estudiantes, compradores, contables y analistas que necesitan cálculos porcentuales rápidos y sin errores. Los porcentajes representan fracciones de 100 y son la base de tareas cuantitativas diarias, desde el cálculo de descuentos en ventas y márgenes de beneficio minoristas hasta el análisis de rendimientos de inversiones financieras y puntuaciones de exámenes.",
      "Esta herramienta admite cuatro modos de cálculo esenciales: encontrar un porcentaje de un total, calcular qué porcentaje representa un número de otro, computar el aumento o disminución porcentual entre dos números y determinar la diferencia porcentual relativa entre dos valores independientes."
    ],
    "formula": {
      "title": "Fórmulas Est��ndar de Porcentaje",
      "formulaText": "Porcentaje = (Parte / Total) × 100\nPorcentaje de un Valor = (Porcentaje / 100) × Total\nCambio Porcentual = ((Nuevo Valor - Valor Antiguo) / |Valor Antiguo|) × 100",
      "explanation": "Para calcular qué fracción de un total representa una cantidad, divide la parte por el total y multiplica por 100. Para los cambios porcentuales, divide el aumento o disminución absoluto por el valor inicial de referencia.",
      "variables": [
        {
          "name": "Parte",
          "desc": "La porción o subconjunto de valor que se está evaluando"
        },
        {
          "name": "Total",
          "desc": "La base o cantidad de referencia total"
        },
        {
          "name": "Valor Antiguo",
          "desc": "La cantidad de referencia original antes del cambio"
        },
        {
          "name": "Nuevo Valor",
          "desc": "La cantidad actualizada después del cambio"
        }
      ]
    },
    "howToCalculate": [
      "Selecciona el modo de cálculo de porcentaje que coincida con tu pregunta (por ejemplo, \"¿Qué es el X% de Y?\" o \"Cambio Porcentual\").",
      "Introduce tus valores numéricos conocidos en los campos de entrada proporcionados.",
      "Visualiza el resultado calculado en tiempo real, la fórmula formateada y el desglose fraccional a continuación.",
      "Usa el botón Copiar para exportar rápidamente tu resultado o Restablecer para realizar un nuevo cálculo."
    ],
    "example": {
      "problem": "¿Qué es el 15% de $240, y cuál es el aumento porcentual de $200 a $250?",
      "steps": [
        "Paso 1 (Porcentaje de un valor): (15 ÷ 100) × 240 = 0.15 × 240 = 36.",
        "Paso 2 (Aumento porcentual): Diferencia = 250 - 200 = 50.",
        "Paso 3: (50 ÷ 200) × 100 = 0.25 × 100 = 25% de aumento."
      ],
      "result": "El 15% de 240 es 36. Un aumento de 200 a 250 es una ganancia del 25%."
    },
    "notes": [
      "El cambio porcentual siempre se divide por el número inicial original, no por el número final.",
      "Un aumento porcentual seguido de una disminución porcentual equivalente no devuelve al valor original (por ejemplo, +50% y luego -50% resulta en el 75% del valor base).",
      "Para convertir un decimal a un porcentaje, multiplica por 100 (por ejemplo, 0.85 = 85%). Para convertir un porcentaje a un decimal, divide por 100."
    ],
    "faqs": [
      {
        "question": "¿Cómo calculo el porcentaje de un número?",
        "answer": "Para calcular el porcentaje de un número, convierte el porcentaje a un decimal dividiéndolo por 100, luego multiplica ese decimal por el número total. Por ejemplo, el 20% de 150 es (20 / 100) × 150 = 30."
      },
      {
        "question": "¿Cómo calculo el aumento porcentual entre dos números?",
        "answer": "Resta el valor original del nuevo valor para encontrar la diferencia. Luego divide esa diferencia por el valor original y multiplica por 100. Por ejemplo, de 50 a 75: (75 - 50) / 50 = 25 / 50 = 0.50 × 100 = 50% de aumento."
      },
      {
        "question": "¿Cuál es la diferencia entre cambio porcentual y diferencia porcentual?",
        "answer": "El cambio porcentual se usa cuando hay un valor \"antiguo\" y un \"nuevo\" a lo largo del tiempo, dividiendo por el valor inicial. La diferencia porcentual se usa al comparar dos valores concurrentes donde ninguno es el punto de referencia, dividiendo la diferencia absoluta por su promedio."
      },
      {
        "question": "¿Puede ser negativo el cambio porcentual?",
        "answer": "Sí. Si el valor final es menor que el valor inicial, el cambio porcentual es negativo, lo que representa una disminución porcentual."
      }
    ],
    "breadcrumbName": "Calculadora de Porcentajes"
  },
  "ratio-calculator": {
    "slug": "ratio-calculator",
    "lang": "es",
    "name": "Calculadora de Razones y Proporciones",
    "category": "math",
    "badge": "Proporción y Simplificación",
    "icon": "Divide",
    "h1": "Calculadora de Razones",
    "seoTitle": "Calculadora de Razones – Simplifica y Resuelve Proporciones Online",
    "seoDescription": "Calculadora de razones online gratuita. Simplifica razones a su mínima expresión, encuentra términos desconocidos en proporciones (A:B = C:D) y calcula factores de escala al instante.",
    "primaryKeyword": "calculadora de razones",
    "secondaryKeywords": [
      "simplificador de razones",
      "simplificar razones",
      "calculadora de razones equivalentes",
      "resolver proporciones",
      "calculadora de relación de aspecto"
    ],
    "heroSubtitle": "Simplifica razones de dos partes a enteros más simples, genera fracciones equivalentes y resuelve variables desconocidas en proporciones al instante.",
    "about": [
      "La Calculadora de Razones te permite simplificar razones a su mínima expresión en números enteros, convertir razones decimales a proporciones enteras limpias y resolver ecuaciones de proporciones equivalentes de la forma A : B = C : D.",
      "Las razones expresan el tamaño relativo de dos o más cantidades. Son omnipresentes en el escalado de recetas, relaciones de aspecto en diseño gráfico (como 16:9 y 4:3), métricas de balances financieros (razón corriente, deuda-capital) y mezclas de soluciones químicas."
    ],
    "formula": {
      "title": "Fórmulas de Simplificación de Razones y Proporciones",
      "formulaText": "Simplified Ratio = (A / GCD(A, B)) : (B / GCD(A, B))\nProportion Equation: A / B = C / D  ⟹  A × D = B × C",
      "explanation": "Para simplificar una razón, divide ambos términos por su Máximo Común Divisor (MCD). En proporciones, la multiplicación cruzada permite resolver cualquier variable desconocida.",
      "variables": [
        {
          "name": "A & B",
          "desc": "Primer antecedente y consecuente de la razón"
        },
        {
          "name": "C & D",
          "desc": "Segundo antecedente y consecuente de la proporción equivalente"
        },
        {
          "name": "GCD",
          "desc": "Máximo Común Divisor entre los números"
        }
      ]
    },
    "howToCalculate": [
      "Para simplificar una razón, introduce los números A y B y visualiza la proporción entera irreducible.",
      "Para resolver una proporción A:B = C:D, introduce tres valores conocidos y deja el campo objetivo vacío.",
      "La calculadora ejecuta la multiplicación cruzada y reduce los términos instantáneamente."
    ],
    "example": {
      "problem": "Simplifica la razón 24 : 36, y resuelve X en 4 : 5 = X : 25.",
      "steps": [
        "Paso 1 (Simplificación): Encuentra el MCD(24, 36) = 12.",
        "Paso 2: 24 ÷ 12 = 2, y 36 ÷ 12 = 3. La razón simplificada es 2 : 3.",
        "Paso 3 (Proporción): 4 / 5 = X / 25  ⟹  5 × X = 4 × 25 = 100  ⟹  X = 100 ÷ 5 = 20."
      ],
      "result": "24:36 se reduce a 2:3. En 4:5 = X:25, X es igual a 20."
    },
    "notes": [
      "Ambos lados de una razón pueden multiplicarse o dividirse por el mismo número no nulo sin cambiar su valor.",
      "Las razones decimales se multiplican automáticamente por potencias de 10 antes de la reducción para garantizar resultados enteros.",
      "Las razones representan relaciones comparativas, no cantidades absolutas. Una razón de 2:3 podría describir 2 y 3 elementos o 200 y 300 elementos."
    ],
    "faqs": [
      {
        "question": "¿Cómo se simplifica una razón a su mínima expresión?",
        "answer": "Encuentra el Máximo Común Divisor (MCD) de ambos números, luego divide ambos números por ese MCD. Por ejemplo, en 15:25, el MCD es 5, así que al dividir ambos por 5 se obtiene 3:5."
      },
      {
        "question": "¿Cómo se resuelve una proporción cuando un número es desconocido?",
        "answer": "Usa la multiplicación cruzada: si A/B = C/D, entonces A × D = B × C. Multiplica los números en diagonal y divide por el número restante opuesto a la incógnita."
      },
      {
        "question": "¿Pueden las razones contener decimales o fracciones?",
        "answer": "Aunque las razones pueden escribirse inicialmente con decimales (ej. 1.5 : 2.5), la convención estándar es expresarlas con enteros positivos escalando ambos términos."
      },
      {
        "question": "¿Cuál es la diferencia entre una razón y una proporción?",
        "answer": "Una razón compara dos cantidades (ej. 2:3). Una proporción establece que dos razones son iguales (ej. 2:3 = 4:6). Las razones son expresiones, mientras que las proporciones son ecuaciones."
      }
    ],
    "breadcrumbName": "Calculadora de Razones"
  },
  "fraction-calculator": {
    "slug": "fraction-calculator",
    "lang": "es",
    "name": "Calculadora de Fracciones",
    "category": "math",
    "badge": "Operaciones con Fracciones",
    "icon": "Binary",
    "h1": "Calculadora de Fracciones",
    "seoTitle": "Calculadora de Fracciones – Sumar, Restar, Multiplicar y Dividir Fracciones",
    "seoDescription": "Calculadora de fracciones online gratuita. Suma, resta, multiplica y divide fácilmente fracciones propias, impropias y números mixtos con reducción paso a paso a la forma más simple.",
    "primaryKeyword": "calculadora de fracciones",
    "secondaryKeywords": [
      "sumar fracciones",
      "simplificador de fracciones",
      "restar fracciones",
      "multiplicar fracciones",
      "dividir fracciones",
      "calculadora de números mixtos"
    ],
    "heroSubtitle": "Suma, resta, multiplica y divide fracciones y números mixtos con simplificación automática, denominadores comunes y conversión decimal.",
    "about": [
      "La Calculadora de Fracciones proporciona soluciones completas paso a paso para sumar, restar, multiplicar y dividir fracciones matemáticas. Maneja fracciones propias (numerador < denominador), fracciones impropias (numerador > denominador) y números mixtos.",
      "Ya sea que estés revisando tareas, escalando recetas culinarias o calculando medidas de ingeniería, esta herramienta reduce los resultados a su forma irreducible más simple y muestra el equivalente decimal."
    ],
    "formula": {
      "title": "Reglas de Aritmética de Fracciones",
      "formulaText": "Addition: (a/b) + (c/d) = (ad + bc) / bd\nSubtraction: (a/b) - (c/d) = (ad - bc) / bd\nMultiplication: (a/b) × (c/d) = (ac) / (bd)\nDivision: (a/b) ÷ (c/d) = (ad) / (bc)",
      "explanation": "Para la suma y la resta, convierte a un denominador común antes de combinar los numeradores. Para la multiplicación, multiplica directamente. Para la división, multiplica por el recíproco de la segunda fracción.",
      "variables": [
        {
          "name": "a & c",
          "desc": "Numeradores (números superiores de las fracciones)"
        },
        {
          "name": "b & d",
          "desc": "Denominadores (números inferiores, no deben ser cero)"
        }
      ]
    },
    "howToCalculate": [
      "Introduce el numerador y el denominador para tu primera fracción.",
      "Selecciona la operación aritmética: Suma (+), Resta (-), Multiplicación (×) o División (÷).",
      "Introduce el numerador y el denominador para tu segunda fracción.",
      "Haz clic en Calcular para ver la fracción simplificada, el número mixto y la representación decimal."
    ],
    "example": {
      "problem": "Calculate 3/4 + 2/3.",
      "steps": [
        "Paso 1: El denominador común es 4 × 3 = 12.",
        "Paso 2: Convierte los numeradores: (3 × 3) / 12 = 9/12, y (2 × 4) / 12 = 8/12.",
        "Paso 3: Suma los numeradores: 9/12 + 8/12 = 17/12.",
        "Paso 4: Convierte la fracción impropia a número mixto: 17 ÷ 12 = 1 con un resto de 5, lo que da 1 5/12 (aprox. 1.4167)."
      ],
      "result": "3/4 + 2/3 = 17/12, which equals 1 5/12 or 1.4167."
    },
    "notes": [
      "Un denominador nunca puede ser cero porque la división por cero es matemáticamente indefinida.",
      "Las fracciones negativas se estandarizan con el signo menos en el numerador (ej., -3/4).",
      "La calculadora encuentra automáticamente el Máximo Común Divisor para reducir los resultados a su forma más simple."
    ],
    "faqs": [
      {
        "question": "¿Cómo se suman fracciones con diferentes denominadores?",
        "answer": "Encuentra un denominador común (a menudo multiplicando los dos denominadores), ajusta ambos numeradores en consecuencia, suma los numeradores y simplifica la fracción resultante."
      },
      {
        "question": "¿Cómo se dividen dos fracciones?",
        "answer": "Para dividir fracciones, multiplica la primera fracción por el recíproco (la forma invertida) de la segunda fracción. Por ejemplo, (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6 = 2/3."
      },
      {
        "question": "¿Qué es un número mixto?",
        "answer": "Un número mixto consiste en un número entero combinado con una fracción propia, como 2 1/2, que representa 2 + 1/2 (o 5/2 como fracción impropia)."
      },
      {
        "question": "¿Cómo se simplifica una fracción a su mínima expresión?",
        "answer": "Para simplificar una fracción, divide tanto el numerador como el denominador por su Máximo Común Divisor (MCD). Por ejemplo, para 6/9, el MCD es 3, por lo que 6÷3 / 9÷3 = 2/3."
      }
    ],
    "breadcrumbName": "Calculadora de Fracciones"
  },
  "age-calculator": {
    "slug": "age-calculator",
    "lang": "es",
    "name": "Calculadora de Edad",
    "category": "time-date",
    "badge": "Edad Exacta y Días",
    "icon": "Calendar",
    "h1": "Calculadora de Edad",
    "seoTitle": "Calculadora de Edad – Calcula tu Edad Exacta por Fecha de Nacimiento",
    "seoDescription": "Calculadora de edad online gratuita. Descubre tu edad exacta en años, meses, semanas, días y horas desde tu fecha de nacimiento hasta hoy o cualquier fecha objetivo.",
    "primaryKeyword": "calculadora de edad",
    "secondaryKeywords": [
      "calcular edad",
      "¿cuántos años tengo?",
      "calculadora de edad por fecha de nacimiento",
      "calculadora de cumpleaños",
      "calculadora de edad cronológica"
    ],
    "heroSubtitle": "Calcula tu edad exacta en años, meses, días, horas y descubre la cuenta atrás para tu próximo cumpleaños con precisión de calendario.",
    "about": [
      "La Calculadora de Edad calcula tu edad cronológica precisa basándose en tu fecha de nacimiento. Mientras que la edad convencional se expresa simplemente en años, esta calculadora desglosa tu vida en años exactos, meses naturales y días restantes, teniendo en cuenta los años bisiestos y las diferentes duraciones de los meses.",
      "Además de la edad actual, la herramienta te permite medir la edad en cualquier fecha pasada o futura especificada, útil para admisiones escolares, verificaciones de edad legal, hitos de jubilación y solicitudes de pasaporte o visado."
    ],
    "formula": {
      "title": "Método de Cálculo de la Edad Cronológica",
      "formulaText": "Años = Año Objetivo - Año de Nacimiento (ajustado por mes/día)\nMeses = Mes Objetivo - Mes de Nacimiento (ajustado por día)\nDías = Día Objetivo - Día de Nacimiento (tomando días prestados del mes anterior si es negativo)",
      "explanation": "El cálculo de la edad, preciso según el calendario, tiene en cuenta las diferentes duraciones de los meses (de 28 a 31 días) y los años bisiestos cuatrienales, asegurando una precisión día a día.",
      "variables": [
        {
          "name": "Fecha de Nacimiento",
          "desc": "La fecha de inicio del nacimiento"
        },
        {
          "name": "Fecha Objetivo",
          "desc": "La fecha de referencia para la evaluación (por defecto es hoy)"
        }
      ]
    },
    "howToCalculate": [
      "Introduce tu fecha de nacimiento utilizando los selectores de día, mes y año.",
      "Opcionalmente, especifica una fecha de evaluación objetivo (la fecha actual por defecto).",
      "Haz clic en Calcular para ver tu edad exacta en años, meses y días.",
      "Explora los resúmenes de la vida total en meses, semanas, días y la cuenta atrás para tu próximo cumpleaños."
    ],
    "example": {
      "problem": "¿Cuál es la edad exacta de alguien nacido el 15 de junio de 1995 evaluada el 8 de octubre de 2026?",
      "steps": [
        "Paso 1: Diferencia en años: 2026 - 1995 = 31 años.",
        "Paso 2: Diferencia en meses: Octubre (mes 10) - Junio (mes 6) = 4 meses.",
        "Paso 3: Diferencia en días: 8 - 15 es negativo (-7), así que se toma prestado 1 mes (quedando 3 meses) y se añaden los días de septiembre (30): 8 + 30 - 15 = 23 días."
      ],
      "result": "La persona tiene exactamente 31 años, 3 meses y 23 días."
    },
    "notes": [
      "El cómputo de la edad occidental considera que una persona tiene 0 años al nacer y se incrementa en cada aniversario de cumpleaños.",
      "Los años bisiestos contienen 366 días en lugar de 365; la calculadora incluye el 29 de febrero siempre que se atraviese.",
      "El total de horas y el total de días se calculan utilizando intervalos de días del calendario astronómico estándar."
    ],
    "faqs": [
      {
        "question": "¿Cómo maneja la calculadora de edad los años bisiestos?",
        "answer": "La calculadora verifica cada año calendario en el rango e incluye correctamente el 29 de febrero en los años bisiestos, asegurando que el total de días y los aniversarios sean 100% precisos."
      },
      {
        "question": "¿Puedo calcular qué edad tendr�� en un año futuro?",
        "answer": "Sí. Cambia el campo \"Edad a la fecha de\" a cualquier fecha futura para averiguar tu edad exacta en esa fecha."
      },
      {
        "question": "¿Cómo se determina la cuenta atrás para el próximo cumpleaños?",
        "answer": "La calculadora compara la fecha actual con tu próximo cumpleaños en el año calendario actual o siguiente para calcular los días exactos restantes."
      },
      {
        "question": "¿Por qué mi edad a veces se muestra con una ligera diferencia en días en comparación con otras calculadoras?",
        "answer": "Nuestra calculadora utiliza un método cronológico preciso que tiene en cuenta el número exacto de días de cada mes y los años bisiestos, garantizando la máxima exactitud. Algunas calculadoras más simples podrían usar una duración promedio del mes, lo que lleva a pequeñas discrepancias."
      }
    ],
    "breadcrumbName": "Calculadora de Edad"
  },
  "time-calculator": {
    "slug": "time-calculator",
    "lang": "es",
    "name": "Calculadora de Tiempo",
    "category": "time-date",
    "badge": "Sumar y Restar Tiempo",
    "icon": "Clock",
    "h1": "Calculadora de Tiempo",
    "seoTitle": "Calculadora de Tiempo – Sumar y Restar Horas, Minutos y Segundos",
    "seoDescription": "Calculadora de tiempo online gratuita. Suma o resta duraciones de tiempo en horas, minutos y segundos fácilmente. Convierte tiempo a horas decimales y limpia códigos de tiempo.",
    "primaryKeyword": "calculadora de tiempo",
    "secondaryKeywords": [
      "calculadora de duración de tiempo",
      "calculadora para sumar tiempo",
      "calculadora para restar tiempo",
      "calculadora de horas minutos segundos",
      "suma de tiempo"
    ],
    "heroSubtitle": "Suma y resta duraciones de tiempo en horas, minutos y segundos con desbordamiento automático de unidades y conversiones a horas decimales.",
    "about": [
      "La Calculadora de Tiempo permite sumar y restar rápidamente intervalos de tiempo expresados en horas, minutos y segundos. Dado que el tiempo utiliza aritmética de base 60 (sexagesimal) en lugar de base 10, sumar horas y minutos manualmente a menudo conduce a errores de reagrupación.",
      "Esta herramienta maneja automáticamente los desbordamientos de 60 segundos y 60 minutos, lo que la hace ideal para editores de video que calculan la duración del metraje, gerentes de proyectos que rastrean tareas facturables, pilotos que registran duraciones de vuelo y atletas que analizan sus divisiones de entrenamiento."
    ],
    "formula": {
      "title": "Fórmula de Suma de Tiempo Sexagesimal",
      "formulaText": "Total Seconds = (H1 × 3600 + M1 × 60 + S1) ± (H2 × 3600 + M2 × 60 + S2)\nHours = ⌊Total Seconds / 3600⌋\nMinutes = ⌊(Total Seconds mod 3600) / 60⌋\nSeconds = Total Seconds mod 60",
      "explanation": "Todos los bloques de tiempo de entrada se convierten a segundos totales, se suman o restan, y luego se vuelven a convertir en horas, minutos y segundos normalizados.",
      "variables": [
        {
          "name": "H1, M1, S1",
          "desc": "Horas, minutos y segundos de la primera duración"
        },
        {
          "name": "H2, M2, S2",
          "desc": "Horas, minutos y segundos de la segunda duración"
        }
      ]
    },
    "howToCalculate": [
      "Introduce las horas, minutos y segundos para el Tiempo 1.",
      "Elige la operación: Sumar (+) o Restar (-).",
      "Introduce las horas, minutos y segundos para el Tiempo 2.",
      "Haz clic en Calcular para ver las horas, minutos, segundos consolidados y el total de horas decimales."
    ],
    "example": {
      "problem": "Suma 2 horas 45 minutos 30 segundos y 3 horas 35 minutos 45 segundos.",
      "steps": [
        "Paso 1: Segundos: 30 + 45 = 75 segundos = 1 minuto y 15 segundos.",
        "Paso 2: Minutos: 45 + 35 + 1 (arrastrado) = 81 minutos = 1 hora y 21 minutos.",
        "Paso 3: Horas: 2 + 3 + 1 (arrastrado) = 6 horas."
      ],
      "result": "La duración total es de 6 horas, 21 minutos y 15 segundos (6.3542 horas decimales)."
    },
    "notes": [
      "Hay 60 segundos en un minuto y 60 minutos en una hora.",
      "Para convertir minutos a horas decimales, divide los minutos por 60 (por ejemplo, 30 minutos = 0.5 horas).",
      "Si se resta un tiempo mayor de uno menor, el resultado se muestra como un desfase de tiempo negativo."
    ],
    "faqs": [
      {
        "question": "¿Cómo se convierten los minutos a horas decimales?",
        "answer": "Divide el número de minutos por 60. Por ejemplo, 45 minutos divididos por 60 son 0.75 horas. Por lo tanto, 2 horas y 45 minutos equivalen a 2.75 horas decimales."
      },
      {
        "question": "¿Qué sucede cuando los segundos exceden los 60?",
        "answer": "Cada bloque de 60 segundos se convierte automáticamente en 1 minuto y se arrastra a la columna de minutos."
      },
      {
        "question": "¿Puede esta herramienta calcular códigos de tiempo para vuelos o edición de video?",
        "answer": "Sí. Suma con precisión múltiples tomas, clips o tramos de vuelo en horas, minutos y segundos."
      },
      {
        "question": "¿Por qué el cálculo de tiempo es a veces complicado?",
        "answer": "El tiempo utiliza un sistema de base 60 (sexagesimal) para minutos y segundos, a diferencia del sistema de base 10 que usamos para la mayoría de los otros cálculos. Esto significa que cuando se alcanzan 60 segundos, se convierten en 1 minuto, y cuando se alcanzan 60 minutos, se convierten en 1 hora, lo que requiere una reagrupación cuidadosa que esta calculadora maneja automáticamente."
      }
    ],
    "breadcrumbName": "Calculadora de Tiempo"
  },
  "date-calculator": {
    "slug": "date-calculator",
    "lang": "es",
    "name": "Calculadora de Fechas",
    "category": "time-date",
    "badge": "Días entre Fechas",
    "icon": "Calendar",
    "h1": "Calculadora de Fechas",
    "seoTitle": "Calculadora de Fechas – Días entre Fechas y Sumar/Restar Días",
    "seoDescription": "Calculadora de fechas online gratuita. Calcula el número exacto de días, semanas y días hábiles entre dos fechas, o suma/resta días a cualquier fecha.",
    "primaryKeyword": "calculadora de fechas",
    "secondaryKeywords": [
      "calculadora de diferencia de fechas",
      "días entre fechas",
      "calculadora de duración de fechas",
      "calculadora de días hábiles",
      "sumar días a una fecha"
    ],
    "heroSubtitle": "Calcula los días naturales exactos y los días hábiles laborables entre dos fechas, o proyecta fechas futuras sumando o restando días.",
    "about": [
      "La Calculadora de Fechas resuelve consultas comunes del calendario: encontrar cuántos días quedan entre dos fechas específicas, o determinar qué fecha ocurre un número dado de días, semanas o meses en el futuro o en el pasado.",
      "A diferencia del simple conteo de calendario, esta herramienta refleja con precisión las variaciones de fin de mes, los años bisiestos y separa los días de fin de semana estándar de los días hábiles laborables de lunes a viernes, esencial para la planificación de proyectos, plazos legales, períodos de aviso y cuentas regresivas de eventos."
    ],
    "formula": {
      "title": "Cálculo de la Duración de Fechas",
      "formulaText": "Total Days = (End Date (ms) - Start Date (ms)) / (1000 × 60 × 60 × 24)\nWeeks = ⌊Total Days / 7⌋\nRemaining Days = Total Days mod 7",
      "explanation": "Calcula la diferencia de tiempo (delta) entre las marcas de tiempo de época UTC de medianoche y cuenta los días intermedios de lunes a viernes para los intervalos hábiles.",
      "variables": [
        {
          "name": "Fecha de Inicio",
          "desc": "La fecha de inicio de referencia"
        },
        {
          "name": "Fecha de Fin",
          "desc": "La fecha de finalización objetivo"
        },
        {
          "name": "Días Hábiles",
          "desc": "Conteo de días laborables (de lunes a viernes) excluyendo fines de semana"
        }
      ]
    },
    "howToCalculate": [
      "Elige el Modo: \"Días entre Fechas\" o \"Sumar / Restar Días\".",
      "Para la Diferencia de Fechas: Selecciona tu Fecha de Inicio y Fecha de Fin.",
      "Marca \"Incluir Día Final\" si tu cronograma requiere un conteo inclusivo de los límites.",
      "Visualiza el total de días, semanas, días restantes y días hábiles de lunes a viernes."
    ],
    "example": {
      "problem": "¿Cuántos días y días hábiles hay entre el 5 de enero de 2026 y el 20 de febrero de 2026?",
      "steps": [
        "Paso 1: Total de días naturales transcurridos = 46 días.",
        "Paso 2: Equivalente a 6 semanas completas y 4 días naturales.",
        "Paso 3: Excluyendo los fines de semana (sábado y domingo) se obtienen 34 días hábiles laborables."
      ],
      "result": "Hay 46 días naturales (34 días hábiles) entre las dos fechas."
    },
    "notes": [
      "La diferencia de fechas estándar calcula los días completos transcurridos entre dos fechas.",
      "Los años bisiestos se tienen en cuenta automáticamente (2028, 2032, etc. tienen 29 días en febrero).",
      "El conteo de días hábiles no incluye los días festivos nacionales oficiales, ya que estos varían según el país."
    ],
    "faqs": [
      {
        "question": "¿La calculadora de fechas cuenta tanto la fecha de inicio como la fecha de fin?",
        "answer": "Por defecto, la calculadora cuenta el intervalo desde la fecha de inicio hasta la fecha de fin (tiempo transcurrido). Puedes activar \"Incluir día final\" para incluir ambos días límite."
      },
      {
        "question": "¿Cómo se definen los días hábiles?",
        "answer": "Los días hábiles representan de lunes a viernes. Los sábados y domingos se excluyen como días de fin de semana."
      },
      {
        "question": "¿Puedo añadir solo días hábiles?",
        "answer": "La herramienta de adición suma días naturales; para calcular entregables de proyectos en días hábiles, considera 2 días de fin de semana por cada 5 días hábiles."
      },
      {
        "question": "¿Qué es un año bisiesto y cómo afecta el cálculo?",
        "answer": "Un año bisiesto ocurre cada cuatro años (con algunas excepciones) y tiene 366 días en lugar de 365, añadiendo un día extra en febrero (el 29 de febrero). Nuestra calculadora lo tiene en cuenta automáticamente para asegurar la precisión en los cálculos de fechas."
      }
    ],
    "breadcrumbName": "Calculadora de Fechas"
  },
  "hours-calculator": {
    "slug": "hours-calculator",
    "lang": "es",
    "name": "Calculadora de Horas",
    "category": "time-date",
    "badge": "Control Horario y Salario",
    "icon": "Timer",
    "h1": "Calculadora de Horas",
    "seoTitle": "Calculadora de Horas – Calcula Horas de Trabajo y Control Horario",
    "seoDescription": "Calculadora de horas online gratuita. Calcula el total de horas de trabajo, pausas para comer, horas decimales y salario bruto entre horas de inicio y fin para hojas de control horario.",
    "primaryKeyword": "calculadora de horas",
    "secondaryKeywords": [
      "calculadora de control horario",
      "calculadora de horas trabajadas",
      "calculadora de horas de trabajo",
      "calculadora de registro horario",
      "calcular horas entre horas"
    ],
    "heroSubtitle": "Calcula las horas de trabajo diarias, deduce las pausas para comer y descansar, convierte las horas a formato decimal y calcula las ganancias brutas para la nómina.",
    "about": [
      "La Calculadora de Horas simplifica el control del tiempo para empleados por horas, contratistas, autónomos y gestores de nóminas. Convertir las horas de reloj a horas decimales (por ejemplo, 7 horas y 45 minutos a 7.75 horas) es esencial para multiplicarlas por las tarifas salariales por hora.",
      "La calculadora admite turnos nocturnos que se extienden más allá de la medianoche (como de 22:00 a 06:00) y deduce automáticamente las pausas no remuneradas o los almuerzos para informar las horas netas pagaderas."
    ],
    "formula": {
      "title": "Fórmula de Horas de Control Horario y Salario",
      "formulaText": "Minutos Brutos = Hora de Fin - Hora de Inicio (ajustado para turnos nocturnos)\nMinutos Netos = Minutos Brutos - Minutos de Pausa\nHoras Decimales = Minutos Netos / 60\nPago Total = Horas Decimales × Tarifa por Hora",
      "explanation": "Resta la hora de inicio de la hora de fin, resta los minutos de pausa no remunerada, divide por 60 para obtener las horas decimales y multiplica por la tarifa salarial por hora.",
      "variables": [
        {
          "name": "Hora de Inicio",
          "desc": "Hora de entrada"
        },
        {
          "name": "Hora de Fin",
          "desc": "Hora de salida"
        },
        {
          "name": "Pausa",
          "desc": "Duración del descanso o almuerzo no remunerado en minutos"
        },
        {
          "name": "Tarifa por Hora",
          "desc": "Salario base por hora en dólares o moneda local"
        }
      ]
    },
    "howToCalculate": [
      "Introduce la Hora de Inicio de tu turno (ej. 08:30).",
      "Introduce la Hora de Fin de tu turno (ej. 17:00).",
      "Especifica cualquier tiempo de pausa no remunerado en minutos (ej. 45 minutos para el almuerzo).",
      "Opcionalmente, introduce tu tarifa salarial por hora para estimar el salario bruto.",
      "Haz clic en Calcular para ver las horas netas, minutos, horas decimales y ganancias totales."
    ],
    "example": {
      "problem": "Un empleado ficha a las 08:30, sale a las 17:15, toma un almuerzo de 45 minutos y gana $24/hora.",
      "steps": [
        "Paso 1: Tiempo bruto total entre las 08:30 y las 17:15 = 8 horas y 45 minutos (525 minutos).",
        "Paso 2: Deduce 45 minutos de almuerzo: 525 - 45 = 480 minutos netos.",
        "Paso 3: Convierte a decimal: 480 ÷ 60 = 8.00 horas decimales.",
        "Paso 4: Multiplica por el salario: 8.00 × $24 = $192.00."
      ],
      "result": "El empleado trabajó 8.00 horas y ganó $192.00."
    },
    "notes": [
      "Los sistemas de nóminas requieren horas decimales (ej. 8.25 horas) en lugar del formato de reloj (8h 15m).",
      "Los turnos que cruzan la medianoche se detectan y calculan sin problemas, sin números negativos.",
      "Los cálculos representan el salario bruto antes de impuestos sobre la renta y deducciones de nómina."
    ],
    "faqs": [
      {
        "question": "¿Cómo se convierten los minutos de trabajo a horas decimales?",
        "answer": "Divide el número de minutos por 60. Por ejemplo, 15 minutos son 15/60 = 0.25 horas; 30 minutos son 0.5 horas; y 45 minutos son 0.75 horas."
      },
      {
        "question": "¿Cómo maneja la calculadora los turnos nocturnos que cruzan la medianoche?",
        "answer": "Si la hora de fin es numéricamente anterior a la hora de inicio (ej. de 23:00 a 07:00), la calculadora añade automáticamente 24 horas para determinar el lapso nocturno correcto."
      },
      {
        "question": "¿Puedo calcular el salario semanal con esta herramienta?",
        "answer": "Puedes calcular cada turno diario o usar la Calculadora de Salario para proyecciones de pago consolidadas de varias semanas."
      },
      {
        "question": "¿La calculadora tiene en cuenta las horas extras?",
        "answer": "No, esta calculadora está diseñada para calcular las horas trabajadas y el salario bruto base. Para calcular las horas extras, deberás aplicar las tarifas correspondientes manualmente después de obtener las horas netas."
      }
    ],
    "breadcrumbName": "Calculadora de Horas"
  },
  "bmi-calculator": {
    "slug": "bmi-calculator",
    "lang": "es",
    "name": "Calculadora de IMC",
    "category": "fitness",
    "badge": "Índice de Masa Corporal",
    "icon": "Activity",
    "h1": "Calculadora de IMC",
    "seoTitle": "Calculadora de IMC – Calcula tu Índice de Masa Corporal Online",
    "seoDescription": "Calculadora de IMC online gratuita. Calcula el Índice de Masa Corporal para adultos usando unidades métricas (cm/kg) o imperiales (pies/pulgadas/libras). Consulta las categorías de peso de la OMS y los rangos saludables.",
    "primaryKeyword": "calculadora de IMC",
    "secondaryKeywords": [
      "calcular IMC",
      "calculadora de índice de masa corporal",
      "calculadora de IMC para adultos",
      "rango de peso saludable",
      "calculadora de IMC métrica"
    ],
    "heroSubtitle": "Calcula tu Índice de Masa Corporal (IMC) utilizando medidas métricas o imperiales para entender tu categoría de peso y tus objetivos de peso saludable.",
    "about": [
      "La Calculadora del Índice de Masa Corporal (IMC) es una métrica de cribado estandarizada establecida por la Organización Mundial de la Salud (OMS) para categorizar a los individuos según su estado de peso en relación con la altura. Es ampliamente utilizada en epidemiología, chequeos de salud generales y seguimiento de la condición física personal.",
      "El IMC se calcula dividiendo el peso corporal en kilogramos por la altura en metros al cuadrado. La calculadora presenta tu puntuación exacta, la clasificación oficial de la OMS (bajo peso, peso normal, sobrepeso o clase de obesidad), y calcula tu rango de peso saludable personalizado."
    ],
    "formula": {
      "title": "Fórmulas Estándar del IMC",
      "formulaText": "Fórmula Métrica: IMC = Peso (kg) / [Altura (m)]²\nFórmula Imperial: IMC = 703 × Peso (lbs) / [Altura (pulgadas)]²",
      "explanation": "Divide el peso por el cuadrado de la altura. Para unidades imperiales (libras y pulgadas), multiplica la relación por el factor de conversión 703.",
      "variables": [
        {
          "name": "Peso",
          "desc": "Peso corporal en kilogramos (kg) o libras (lbs)"
        },
        {
          "name": "Altura",
          "desc": "Altura de pie en centímetros (cm) o pies y pulgadas"
        },
        {
          "name": "Factor 703",
          "desc": "Estándar del multiplicador de conversión imperial"
        }
      ]
    },
    "howToCalculate": [
      "Elige tu sistema de unidades preferido: Métrico (cm y kg) o Imperial (pies, pulgadas y libras).",
      "Introduce tu altura actual y tu peso corporal.",
      "Haz clic en Calcular para ver tu puntuación de IMC, la categoría de la OMS y el rango de peso saludable objetivo.",
      "Revisa el rango de peso saludable diseñado para tu altura específica."
    ],
    "example": {
      "problem": "¿Cuál es el IMC de un individuo que mide 175 cm (1.75 m) de altura y pesa 70 kg?",
      "steps": [
        "Paso 1: Eleva al cuadrado la altura en metros: 1.75 × 1.75 = 3.0625 m².",
        "Paso 2: Divide el peso por la altura al cuadrado: 70 ÷ 3.0625 = 22.86.",
        "Paso 3: Compara con los umbrales de la OMS: 22.9 se encuentra dentro de 18.5 – 24.9 (Peso Normal)."
      ],
      "result": "El individuo tiene un IMC de 22.9, lo que se clasifica como Peso Normal."
    },
    "notes": [
      "El IMC es un indicador de cribado poblacional y no diferencia entre masa muscular magra y tejido graso.",
      "Atletas, culturistas y mujeres embarazadas pueden registrar puntuaciones de IMC elevadas que no reflejan un exceso de grasa corporal.",
      "Esta herramienta está destinada a la concienciación educativa general y no debe reemplazar una evaluación clínica profesional."
    ],
    "faqs": [
      {
        "question": "¿Cuál se considera un rango de IMC saludable?",
        "answer": "Según la Organización Mundial de la Salud (OMS), un IMC entre 18.5 y 24.9 se considera la categoría de peso normal o saludable para adultos."
      },
      {
        "question": "¿Por qué el IMC puede ser engañoso para atletas musculosos?",
        "answer": "El IMC mide el peso total en relación con la altura y no puede diferenciar el músculo de la grasa adiposa. Debido a que el músculo es más denso que la grasa, los individuos musculosos a menudo se clasifican como con sobrepeso u obesidad a pesar de tener un bajo porcentaje de grasa corporal."
      },
      {
        "question": "¿Cómo calculo el IMC usando libras y pulgadas?",
        "answer": "Multiplica tu peso en libras por 703, luego divide por tu altura en pulgadas al cuadrado: IMC = (lbs × 703) / (pulgadas × pulgadas)."
      },
      {
        "question": "¿Para quién está diseñada la calculadora de IMC?",
        "answer": "La calculadora de IMC está diseñada principalmente para adultos (mayores de 18 años) y es una herramienta de cribado general. No es adecuada para niños, adolescentes, mujeres embarazadas, atletas de alto rendimiento o personas con mucha masa muscular, ya que sus resultados podrían no ser precisos para estos grupos."
      }
    ],
    "breadcrumbName": "Calculadora de IMC"
  },
  "pace-calculator": {
    "slug": "pace-calculator",
    "lang": "es",
    "name": "Calculadora de Ritmo",
    "category": "fitness",
    "badge": "Correr y Caminar",
    "icon": "Footprints",
    "h1": "Calculadora de Ritmo",
    "seoTitle": "Calculadora de Ritmo – Calcula Ritmo de Carrera, Velocidad y Tiempo",
    "seoDescription": "Calculadora de ritmo de carrera online gratuita. Calcula el ritmo por kilómetro (min/km), ritmo por milla (min/milla) y la velocidad (km/h, mph) para carreras de 5K, 10K, media maratón y maratón.",
    "primaryKeyword": "calculadora de ritmo",
    "secondaryKeywords": [
      "calculadora de ritmo de carrera",
      "calculadora de ritmo maratón",
      "calculadora de velocidad de carrera",
      "calculadora de ritmo 5k",
      "calculadora min por km"
    ],
    "heroSubtitle": "Calcula el ritmo de carrera y caminata por kilómetro y milla, determina los parciales de carrera necesarios y convierte entre velocidad y ritmo al instante.",
    "about": [
      "La Calculadora de Ritmo está diseñada para corredores, trotadores, triatletas y caminantes que desean planificar sus entrenamientos o predecir sus tiempos de llegada en carreras. El ritmo mide el tiempo necesario para cubrir una unidad de distancia (como minutos por kilómetro o minutos por milla), mientras que la velocidad mide la distancia cubierta por unidad de tiempo (km/h o mph).",
      "La calculadora soporta distancias de carrera estándar incluyendo 5K, 10K, Media Maratón (21.0975 km) y Maratón Completa (42.195 km), permitiéndote determinar el ritmo objetivo necesario para alcanzar tu mejor marca personal."
    ],
    "formula": {
      "title": "Fórmulas de Ritmo y Velocidad",
      "formulaText": "Ritmo = Tiempo (segundos) / Distancia\nVelocidad (km/h) = Distancia (km) / Tiempo (horas)\nVelocidad (mph) = Distancia (millas) / Tiempo (horas)",
      "explanation": "El ritmo es el inverso de la velocidad: divide el tiempo total transcurrido en minutos por la distancia total recorrida en kilómetros o millas.",
      "variables": [
        {
          "name": "Tiempo",
          "desc": "Duración total transcurrida en horas, minutos y segundos"
        },
        {
          "name": "Distancia",
          "desc": "Longitud total del recorrido en kilómetros o millas"
        },
        {
          "name": "Ritmo",
          "desc": "Tiempo empleado por unidad de distancia (min/km o min/milla)"
        }
      ]
    },
    "howToCalculate": [
      "Introduce la Distancia total de tu recorrido y selecciona la unidad (km o millas).",
      "Introduce el Tiempo transcurrido o el objetivo (horas, minutos y segundos).",
      "Haz clic en Calcular para ver tu ritmo promedio por kilómetro, ritmo por milla y velocidad en km/h y mph.",
      "Ajusta los tiempos para pronosticar los requisitos de parciales para futuras carreras."
    ],
    "example": {
      "problem": "¿Qué ritmo se necesita para completar una carrera de 10K (10 kilómetros) en 50 minutos?",
      "steps": [
        "Paso 1: Tiempo total = 50 minutos = 3,000 segundos.",
        "Paso 2: Ritmo por km: 50 minutos ÷ 10 km = 5:00 minutos por kilómetro.",
        "Paso 3: Distancia en millas: 10 km ÷ 1.60934 = 6.2137 millas.",
        "Paso 4: Ritmo por milla: 50 minutos ÷ 6.2137 millas = 8:03 minutos por milla (Velocidad: 12.0 km/h o 7.46 mph)."
      ],
      "result": "El ritmo objetivo es 5:00 min/km o 8:03 min/milla."
    },
    "notes": [
      "1 milla equivale aproximadamente a 1.60934 kilómetros. 1 kilómetro equivale a 0.621371 millas.",
      "El ritmo se formatea como MM:SS (por ejemplo, 4:30 min/km significa 4 minutos y 30 segundos).",
      "Para convertir ritmo a velocidad: Velocidad (km/h) = 60 ÷ Ritmo (en minutos decimales por km)."
    ],
    "faqs": [
      {
        "question": "¿Cuál es la diferencia entre ritmo y velocidad?",
        "answer": "La velocidad indica qué tan lejos viajas en un tiempo determinado (por ejemplo, kilómetros por hora), mientras que el ritmo indica cuánto tiempo te lleva recorrer una distancia fija (por ejemplo, minutos por kilómetro)."
      },
      {
        "question": "¿Qué ritmo se necesita para una maratón por debajo de las 4 horas?",
        "answer": "Para terminar una maratón completa (42.195 km / 26.219 millas) en menos de 4 horas, necesitas un ritmo promedio más rápido que 5:41 min/km o 9:09 min/milla."
      },
      {
        "question": "¿Cómo convierto min/km a min/milla?",
        "answer": "Multiplica tu ritmo en minutos por kilómetro por 1.60934. Por ejemplo, 5:00 min/km (5.0) × 1.60934 = 8.046 minutos por milla, lo que equivale aproximadamente a 8:03 min/milla."
      },
      {
        "question": "¿Por qué es importante el ritmo para los corredores?",
        "answer": "Comprender tu ritmo te ayuda a gestionar tu energía, prevenir el sobreesfuerzo y alcanzar objetivos específicos de entrenamiento o tiempos de carrera. Es una métrica clave para el seguimiento y la mejora del rendimiento."
      }
    ],
    "breadcrumbName": "Calculadora de Ritmo"
  },
  "fuel-cost-calculator": {
    "slug": "fuel-cost-calculator",
    "lang": "es",
    "name": "Calculadora de Costo de Combustible",
    "category": "utilities",
    "badge": "Presupuesto de Viaje y Combustible",
    "icon": "Fuel",
    "h1": "Calculadora de Costo de Combustible",
    "seoTitle": "Calculadora de Costo de Combustible – Gasto de Viaje y Consumo de Gasolina",
    "seoDescription": "Calculadora de costo de combustible online gratuita. Calcula el gasto total de gasolina para tu viaje, el volumen de combustible necesario y el costo por kilómetro o milla según la eficiencia del vehículo y el precio del combustible.",
    "primaryKeyword": "calculadora de costo de combustible",
    "secondaryKeywords": [
      "calculadora de gasto de gasolina",
      "calculadora de consumo de combustible",
      "calculadora de combustible para viaje",
      "calculadora de costo por kilómetro",
      "calcular gasto de coche"
    ],
    "heroSubtitle": "Estima los costos de combustible para tu viaje por carretera, calcula los litros o galones necesarios y averigua tu costo por kilómetro o milla antes de viajar.",
    "about": [
      "La Calculadora de Costo de Combustible ayuda a viajeros diarios, excursionistas y operadores logísticos a pronosticar los gastos de combustible para cualquier distancia de conducción. El combustible es uno de los gastos variables más altos de la propiedad de un vehículo, influenciado por la fluctuación de los precios en el surtidor, las velocidades en carretera y la eficiencia del motor.",
      "Esta herramienta admite kilómetros con km/L o L/100km, así como millas con Millas Por Galón (MPG). Desglosa el volumen total de combustible requerido, el gasto total del viaje y el costo unitario por kilómetro o milla."
    ],
    "formula": {
      "title": "Fórmula de Consumo y Costo de Combustible",
      "formulaText": "Combustible Requerido (L) = Distancia (km) / Eficiencia (km/L)\nCosto Total del Viaje = Combustible Requerido × Precio del Combustible por Unidad\nCosto por Distancia = Costo Total del Viaje / Distancia",
      "explanation": "Divide la distancia total del viaje por la eficiencia de combustible del vehículo para encontrar la cantidad de combustible, luego multiplica por el precio local del combustible en el surtidor.",
      "variables": [
        {
          "name": "Distancia",
          "desc": "Longitud del trayecto en kilómetros o millas"
        },
        {
          "name": "Eficiencia",
          "desc": "Clasificación de rendimiento del vehículo (km/L, L/100km o MPG)"
        },
        {
          "name": "Precio del Combustible",
          "desc": "Costo de la gasolina, diésel o gas por litro o galón"
        }
      ]
    },
    "howToCalculate": [
      "Introduce la Distancia total del viaje (ej. 350 km).",
      "Selecciona tu unidad de eficiencia del vehículo (km/L, L/100km o MPG) e introduce la clasificación de tu vehículo.",
      "Introduce el precio del combustible en el surtidor por litro o por galón.",
      "Haz clic en Calcular para ver el combustible total requerido, el gasto total del viaje y el costo por unidad de distancia."
    ],
    "example": {
      "problem": "¿Cuál es el costo de combustible para un viaje de 400 km en un coche que rinde 16 km/L con el combustible a $1.50 por litro?",
      "steps": [
        "Paso 1: Combustible necesario = 400 km ÷ 16 km/L = 25 litros.",
        "Paso 2: Costo total = 25 litros × $1.50/L = $37.50.",
        "Paso 3: Costo por kilómetro = $37.50 ÷ 400 km = $0.094 por km."
      ],
      "result": "El viaje requiere 25 litros de combustible y cuesta $37.50 ($0.094/km)."
    },
    "notes": [
      "La aceleración agresiva, las cargas pesadas y las bacas de techo pueden reducir la eficiencia del combustible en carretera entre un 15% y un 25%.",
      "Para convertir L/100km a km/L: divide 100 por la cifra de L/100km (ej. 8 L/100km = 100 / 8 = 12.5 km/L).",
      "Para viajes de ida y vuelta, multiplica la distancia de ida por 2 antes de calcular."
    ],
    "faqs": [
      {
        "question": "¿Cómo calculo el costo de combustible para un viaje por carretera?",
        "answer": "Para calcular el costo de combustible, primero divide la distancia total del viaje por el rendimiento de tu vehículo (expresado en km/L o MPG) para obtener el volumen de combustible necesario. Luego, multiplica ese volumen por el precio actual del combustible por litro o galón. Nuestra calculadora simplifica este proceso automáticamente."
      },
      {
        "question": "¿Cómo se convierte MPG a km/L?",
        "answer": "La conversión de Millas Por Galón (MPG) a kilómetros por litro (km/L) depende del tipo de galón (estadounidense o imperial). Generalmente, 1 MPG estadounidense equivale aproximadamente a 0.425 km/L. Para una conversión precisa, multiplica el número de MPG por 0.425144."
      },
      {
        "question": "¿Cómo puedo mejorar la eficiencia de combustible de mi vehículo?",
        "answer": "Puedes mejorar la eficiencia de combustible de tu vehículo manteniendo la presión de los neumáticos recomendada, observando límites de velocidad constantes en carretera, retirando el peso excesivo del maletero, evitando frenadas y aceleraciones bruscas, y realizando un mantenimiento regular del motor."
      },
      {
        "question": "¿Qué factores influyen en el consumo real de combustible de mi coche?",
        "answer": "Varios factores pueden afectar el consumo real de combustible, como el estilo de conducción (aceleraciones y frenadas bruscas), la velocidad (mayor velocidad, mayor consumo), el mantenimiento del vehículo (neumáticos desinflados, filtros sucios), la carga (peso adicional), el uso del aire acondicionado y las condiciones climáticas (viento, temperatura)."
      }
    ],
    "breadcrumbName": "Calculadora de Costo de Combustible"
  },
  "electricity-cost-calculator": {
    "slug": "electricity-cost-calculator",
    "lang": "es",
    "name": "Calculadora de Consumo Eléctrico",
    "category": "utilities",
    "badge": "Consumo de Electrodomésticos y Factura Eléctrica",
    "icon": "Zap",
    "h1": "Calculadora de Consumo Eléctrico",
    "seoTitle": "Calculadora de Consumo Eléctrico – Costo de Energía y Factura de Luz de Electrodomésticos",
    "seoDescription": "Calculadora de costo de electricidad online gratuita. Calcula el consumo de energía en kWh y las facturas de luz mensuales y anuales estimadas para electrodomésticos según su potencia.",
    "primaryKeyword": "calculadora de consumo eléctrico",
    "secondaryKeywords": [
      "calculadora de costo de electricidad",
      "calculadora de kWh"
    ],
    "heroSubtitle": "Calcula el consumo de energía en kilovatios-hora (kWh) y estima los costos mensuales y anuales de electricidad para cualquier electrodoméstico.",
    "about": [
      "La Calculadora de Consumo Eléctrico ayuda a propietarios de viviendas, inquilinos y administradores de instalaciones a cuantificar cuánta electricidad consumen los electrodomésticos del hogar y cuánto cuesta operarlos. Desde aires acondicionados y calefactores hasta equipos de minería de criptomonedas y compresores de refrigeradores, el consumo de energía puede inflar drásticamente las facturas de servicios públicos.",
      "Introduce la potencia del electrodoméstico en vatios, las horas de funcionamiento diarias y la tarifa eléctrica de tu compañía por kilovatio-hora (kWh) para obtener proyecciones de costos diarias, mensuales y anuales."
    ],
    "formula": {
      "title": "Fórmulas de Kilovatio-Hora y Costo de Energía",
      "formulaText": "Energía Diaria (kWh) = (Vatios del Electrodoméstico × Horas al Día) / 1000\nCosto = Energ��a (kWh) × Tarifa Eléctrica por kWh\nCosto Mensual = Costo Diario × 30 días\nCosto Anual = Costo Diario × 365 días",
      "explanation": "Convierte la potencia nominal del electrodoméstico de vatios a kilovatios dividiendo por 1.000, multiplica por las horas de funcionamiento diario y multiplica por la tarifa de tu compañía por kWh.",
      "variables": [
        {
          "name": "Potencia (Vatios)",
          "desc": "Consumo de energía nominal del electrodoméstico en Vatios (W)"
        },
        {
          "name": "Horas/Día",
          "desc": "Tiempo de funcionamiento activo promedio por ciclo de 24 horas"
        },
        {
          "name": "Tarifa ($/kWh)",
          "desc": "Costo de la electricidad de la compañía por kilovatio-hora"
        }
      ]
    },
    "howToCalculate": [
      "Localiza la potencia nominal en vatios en la etiqueta o el manual del electrodoméstico (ej., 1500W para un calefactor).",
      "Introduce las horas estimadas de funcionamiento diario del electrodoméstico.",
      "Introduce el costo local de tu compañía por kWh (consulta tu factura de luz mensual; la tarifa estándar en EE. UU. es de ~$0.16/kWh, en el Reino Unido ~£0.28/kWh).",
      "Haz clic en Calcular para ver el consumo diario, mensual y anual en kWh y el costo monetario."
    ],
    "example": {
      "problem": "¿Cuánto cuesta operar un aire acondicionado de 1,200 Vatios durante 8 horas diarias a una tarifa de $0.15 por kWh durante un mes de 30 días?",
      "steps": [
        "Paso 1: kWh diarios: (1,200 W × 8 horas) ÷ 1,000 = 9.6 kWh/día.",
        "Paso 2: Energía mensual: 9.6 kWh × 30 días = 288 kWh.",
        "Paso 3: Costo mensual: 288 kWh × $0.15/kWh = $43.20.",
        "Paso 4: Costo anual: 9.6 kWh × 365 días × $0.15 = $525.60."
      ],
      "result": "El aire acondicionado consume 288 kWh al mes y cuesta $43.20 mensualmente ($525.60 anualmente)."
    },
    "notes": [
      "Las etiquetas de los electrodomésticos indican la potencia máxima; los electrodomésticos con termostatos (como refrigeradores y aires acondicionados) se encienden y apagan, reduciendo el consumo promedio.",
      "1 Kilovatio (kW) = 1,000 Vatios (W). 1 Megavatio (MW) = 1,000,000 Vatios.",
      "Consulta tu factura de servicios públicos para conocer las tarifas escalonadas o las tarifas por tiempo de uso (TOU) en horas pico durante el verano y el invierno."
    ],
    "faqs": [
      {
        "question": "¿Cómo se calcula el costo de energía de un electrodoméstico?",
        "answer": "Multiplica la potencia del electrodoméstico por las horas diarias, divide por 1.000 para obtener los kWh diarios y multiplica por la tarifa de tu compañía por kWh."
      },
      {
        "question": "¿Dónde puedo encontrar la potencia en vatios de un electrodoméstico?",
        "answer": "La potencia en vatios de un electrodoméstico suele estar impresa en una etiqueta de certificación eléctrica ubicada en la parte posterior o inferior del dispositivo, o dentro del manual de instrucciones."
      },
      {
        "question": "¿Qué electrodomésticos del hogar consumen más electricidad?",
        "answer": "Los sistemas de calefacción y refrigeración (aire acondicionado central y bombas de calor), los calentadores de agua, las secadoras de ropa y los hornos eléctricos consumen la mayor cantidad de energía en el hogar."
      },
      {
        "question": "¿Cómo puedo reducir mi consumo de electricidad?",
        "answer": "Para reducir tu consumo, identifica los electrodomésticos que más energía gastan, desenchúfalos cuando no los uses, utiliza bombillas LED, optimiza el uso de la calefacción y el aire acondicionado, y considera electrodomésticos de alta eficiencia energética."
      }
    ],
    "breadcrumbName": "Calculadora de Consumo Eléctrico"
  },
  "gpa-calculator": {
    "slug": "gpa-calculator",
    "lang": "es",
    "name": "Calculadora de GPA",
    "category": "education",
    "badge": "Promedio de Calificaciones",
    "icon": "GraduationCap",
    "h1": "Calculadora de GPA",
    "seoTitle": "Calculadora de GPA – Calcula tu Promedio Universitario y de Bachillerato (Escala 4.0)",
    "seoDescription": "Calculadora de GPA online gratuita. Calcula tu Promedio de Calificaciones semestral y acumulado en una escala de 4.0 con ponderación de créditos y calificaciones por letra.",
    "primaryKeyword": "calculadora de GPA",
    "secondaryKeywords": [
      "calculadora de GPA universitario",
      "calculadora de GPA semestral",
      "calculadora de promedio de calificaciones",
      "calculadora de GPA acumulado",
      "escala GPA 4.0",
      "calculadora de nota media"
    ],
    "heroSubtitle": "Calcula tu Promedio de Calificaciones (GPA) semestral y acumulado en una escala estándar de 4.0 usando calificaciones por letra y créditos de curso.",
    "about": [
      "La Calculadora de Promedio de Calificaciones (GPA) calcula tu rendimiento académico en la escala de calificación universitaria estándar de 4.0. Universidades, institutos, comités de becas y programas de posgrado utilizan el GPA acumulado como un indicador principal para honores, período de prueba académico y admisiones.",
      "A diferencia de un simple promedio de calificaciones, el GPA se pondera por las horas de crédito del curso, lo que significa que un curso de 4 créditos tiene el doble de influencia en tu GPA final en comparación con un curso electivo de 2 créditos."
    ],
    "formula": {
      "title": "Fórmula del GPA Ponderado",
      "formulaText": "Puntos de Calificación por Curso = Créditos del Curso × Valor de la Escala de Calificación\nGPA = Puntos de Calificación Totales / Créditos Totales del Curso",
      "explanation": "Multiplica las horas de crédito de cada curso por el equivalente numérico de su calificación por letra, suma los puntos de calificación totales y divide por el total de créditos intentados.",
      "variables": [
        {
          "name": "Escala de Calificación (4.0)",
          "desc": "A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0.0"
        },
        {
          "name": "Créditos",
          "desc": "Horas de crédito o unidades semestrales asignadas a cada curso"
        }
      ]
    },
    "howToCalculate": [
      "Añade cada curso realizado durante tu semestre o período.",
      "Selecciona la Calificación por Letra obtenida (ej., A, B+, B, C) o introduce los puntos de calificación numéricos.",
      "Introduce las Horas de Crédito del curso (ej., 3 o 4 créditos).",
      "Haz clic en Calcular para ver tu GPA ponderado, el total de horas de crédito y el total de puntos de calificación obtenidos."
    ],
    "example": {
      "problem": "Calcula el GPA semestral para 4 cursos: Matemáticas (4 créditos, A), Historia (3 créditos, B), Biología (4 créditos, B+), Inglés (3 créditos, A-).",
      "steps": [
        "Paso 1: Matemáticas: 4 créditos × 4.0 (A) = 16.0 puntos.",
        "Paso 2: Historia: 3 créditos × 3.0 (B) = 9.0 puntos.",
        "Paso 3: Biología: 4 créditos × 3.3 (B+) = 13.2 puntos.",
        "Paso 4: Inglés: 3 créditos × 3.7 (A-) = 11.1 puntos.",
        "Paso 5: Puntos totales = 16.0 + 9.0 + 13.2 + 11.1 = 49.3 puntos.",
        "Paso 6: Créditos totales = 4 + 3 + 4 + 3 = 14 créditos. GPA = 49.3 ÷ 14 = 3.52."
      ],
      "result": "El GPA semestral es 3.52."
    },
    "notes": [
      "Los cursos de Aprobado/Reprobado (Pass/Fail) o de Auditoría suelen excluirse tanto de los puntos de calificación como de los totales de horas de crédito en los cálculos de GPA.",
      "Algunos institutos utilizan escalas ponderadas de 5.0 para cursos AP u Honores; el GPA universitario estándar utiliza el punto de referencia no ponderado de 4.0.",
      "Un GPA acumulado combina todos los semestres dividiendo todos los puntos de calificación obtenidos a lo largo de la vida académica por todos los créditos de por vida."
    ],
    "faqs": [
      {
        "question": "��Cuál es la escala estándar de GPA 4.0?",
        "answer": "La escala estándar de 4.0 se mapea así: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, y F = 0.0."
      },
      {
        "question": "¿Por qué se incluyen los créditos de los cursos en el cálculo del GPA?",
        "answer": "Los créditos de los cursos representan la rigurosidad y las horas de instrucción semanales de una clase. La ponderación por créditos asegura que una asignatura principal de 4 créditos impacte tu rendimiento académico más que un laboratorio de 1 crédito."
      },
      {
        "question": "¿Cómo puedo mejorar mi GPA acumulado?",
        "answer": "Obtener calificaciones altas (A o A-) en cursos con mayor número de créditos tendrá el mayor impacto positivo en tu GPA acumulado general."
      },
      {
        "question": "¿Existe una diferencia entre el GPA semestral y el GPA acumulado?",
        "answer": "Sí, el GPA semestral se calcula solo para los cursos tomados en un semestre o período específico, mientras que el GPA acumulado es el promedio de todas las calificaciones obtenidas en todos los cursos y semestres a lo largo de tu trayectoria académica."
      }
    ],
    "breadcrumbName": "Calculadora de GPA"
  },
  "grade-calculator": {
    "slug": "grade-calculator",
    "lang": "es",
    "name": "Calculadora de Calificaciones",
    "category": "education",
    "badge": "Ponderada y Examen Final",
    "icon": "Award",
    "h1": "Calculadora de Calificaciones",
    "seoTitle": "Calculadora de Notas – Calificación Ponderada del Curso y Examen Final",
    "seoDescription": "Calculadora de notas online gratuita. Calcula tus calificaciones ponderadas actuales y descubre qué puntuación necesitas en tu examen final para alcanzar la nota deseada.",
    "primaryKeyword": "calculadora de notas",
    "secondaryKeywords": [
      "calculadora nota final",
      "qué nota necesito",
      "calculadora de notas ponderadas",
      "calculadora de calificación de asignatura",
      "calculadora de nota de examen"
    ],
    "heroSubtitle": "Calcula tus promedios ponderados actuales del curso y determina la puntuación exacta que necesitas en tu examen final para alcanzar la calificación deseada.",
    "about": [
      "La Calculadora de Calificaciones ofrece dos modos académicos vitales: una Calculadora de Notas Ponderadas para combinar tareas, cuestionarios, exámenes parciales y participación, y una Calculadora de Examen Final que responde a la pregunta: \"¿Qué puntuación necesito en el examen final para obtener una A (o aprobar)?\"",
      "Profesores y catedráticos universitarios suelen calificar cursos utilizando porcentajes con pesos asignados a cada categoría (como Tareas 20%, Exámenes Parciales 30%, Examen Final 50%). Esta calculadora automatiza los cálculos de distribución ponderada para que puedas planificar tu tiempo de estudio de manera efectiva."
    ],
    "formula": {
      "title": "Fórmulas de Calificación Ponderada y Examen Final",
      "formulaText": "Current Grade = ∑(Assignment Score × Weight) / ∑(Weights)\nRequired Final Score = [Target Grade - (Current Grade × (1 - Final Weight%))] / Final Weight%",
      "explanation": "Multiplica cada puntuación obtenida por el peso porcentual de su categoría. Para encontrar la puntuación final requerida, aísla el porcentaje de peso restante no completado en relación con tu calificación objetivo.",
      "variables": [
        {
          "name": "Calificación Actual",
          "desc": "Porcentaje promedio obtenido en los trabajos del curso completados"
        },
        {
          "name": "Calificación Objetivo",
          "desc": "El porcentaje mínimo deseado en el curso (ej. 90% para una A, 70% para una C)"
        },
        {
          "name": "Peso del Examen Final",
          "desc": "Porcentaje de la calificación general de la clase determinado por el examen final"
        }
      ]
    },
    "howToCalculate": [
      "Para calcular la calificación actual del curso: Introduce las tareas con sus puntuaciones (%) y sus respectivos pesos de categoría (%).",
      "Para calcular lo que necesitas en el examen final: Cambia al \"Modo Examen Final\", introduce tu Calificación Actual, Calificación Objetivo y el Peso del Examen Final.",
      "Haz clic en Calcular para ver la puntuación requerida en el examen y si esa puntuación es alcanzable."
    ],
    "example": {
      "problem": "Actualmente tienes un 84% en Química. El examen final vale el 25% de tu nota. ¿Qué necesitas en el examen final para terminar con una A (90%)?",
      "steps": [
        "Paso 1: Peso de la calificación actual = 100% - 25% = 75% (0.75).",
        "Paso 2: Calificación objetivo = 90%. Contribución actual = 84% × 0.75 = 63%.",
        "Paso 3: Puntos necesarios del examen final: 90% - 63% = 27%.",
        "Paso 4: Divide por el peso del examen final: 27% ÷ 0.25 = 108%."
      ],
      "result": "Necesitas un 108% en el examen final (lo que requiere puntos extra) para alcanzar un 90% general en la asignatura."
    },
    "notes": [
      "Si la puntuación final requerida es superior al 100%, la calificación objetivo es matemáticamente imposible sin puntos extra o una curva de calificación.",
      "Asegúrate de que todos los pesos de las categorías sumen 100% para un equilibrio completo del programa de estudios.",
      "Diferentes universidades aplican distintos límites de calificación; consulta tu programa de estudios para conocer los cortes específicos de las letras."
    ],
    "faqs": [
      {
        "question": "¿Cómo se calcula una calificación ponderada de clase?",
        "answer": "Multiplica cada categoría de calificación por su porcentaje de peso en formato decimal, suma todos los productos resultantes y divide por la suma total de los pesos. Esto te dará la calificación promedio ponderada del curso."
      },
      {
        "question": "¿Qué hago si mis pesos no suman 100%?",
        "answer": "La calculadora normaliza automáticamente los pesos introducidos dividiendo los puntos ponderados totales por la suma de los pesos introducidos hasta el momento. Esto asegura que el cálculo sea preciso incluso si la suma inicial no es 100%."
      },
      {
        "question": "¿Cómo se calcula la puntuación del examen final?",
        "answer": "Para calcular la puntuación necesaria en el examen final, resta los puntos de calificación que ya has asegurado de tu calificación objetivo del curso, luego divide los puntos restantes por el porcentaje de peso del examen final. El resultado es el porcentaje que necesitas obtener en el examen."
      },
      {
        "question": "¿Qué significa una calificación ponderada?",
        "answer": "Una calificación ponderada asigna diferentes niveles de importancia a distintas tareas, exámenes o categorías de trabajo. Por ejemplo, un examen final puede valer más que una tarea diaria, reflejando su mayor impacto en la nota global del curso. Esto permite que el profesor enfatice ciertos aspectos del aprendizaje."
      }
    ],
    "breadcrumbName": "Calculadora de Calificaciones"
  }
};

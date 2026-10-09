import {
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  FileCode2
} from 'lucide-react';

const SECTION_I18N = {
  en: {
    guideOverview: 'Guide & Overview',
    aboutHeading: (name) => `About the ${name}`,
    stepInstructions: 'Step-by-Step Instructions',
    howToHeading: (name) => `How to Calculate ${name}`,
    mathPrecision: 'Mathematical Precision',
    formulaDef: 'Formula Definition',
    varDesc: 'Variable Descriptions',
    walkthrough: 'Practical Walkthrough',
    workedExample: 'Worked Example',
    scenario: 'Scenario',
    result: 'Result',
    tipsHeading: 'Important Considerations & Tips',
    faqBadge: 'Search Questions Answered',
    faqHeading: 'Frequently Asked Questions'
  },
  es: {
    guideOverview: 'Guía y Descripción',
    aboutHeading: (name) => `Acerca de: ${name}`,
    stepInstructions: 'Instrucciones Paso a Paso',
    howToHeading: (name) => `Cómo Calcular ${name}`,
    mathPrecision: 'Precisión Matemática',
    formulaDef: 'Definición de la Fórmula',
    varDesc: 'Descripción de Variables',
    walkthrough: 'Ejemplo Práctico Paso a Paso',
    workedExample: 'Ejemplo Resuelto',
    scenario: 'Caso de Estudio',
    result: 'Resultado',
    tipsHeading: 'Consejos y Consideraciones Clave',
    faqBadge: 'Preguntas Frecuentes Resueltas',
    faqHeading: 'Preguntas Frecuentes'
  },
  fr: {
    guideOverview: 'Guide & Présentation',
    aboutHeading: (name) => `À Propos : ${name}`,
    stepInstructions: 'Instructions Étape par Étape',
    howToHeading: (name) => `Comment Calculer ${name}`,
    mathPrecision: 'Précision Mathématique',
    formulaDef: 'Définition de la Formule',
    varDesc: 'Description des Variables',
    walkthrough: 'Exemple Pratique Détaillé',
    workedExample: 'Exemple Résolu',
    scenario: 'Scénario',
    result: 'Résultat',
    tipsHeading: 'Conseils et Considérations Essentielles',
    faqBadge: 'Réponses à vos Questions',
    faqHeading: 'Foire Aux Questions'
  },
  de: {
    guideOverview: 'Leitfaden & Übersicht',
    aboutHeading: (name) => `Über den ${name}`,
    stepInstructions: 'Schritt-für-Schritt-Anleitung',
    howToHeading: (name) => `So berechnen Sie ${name}`,
    mathPrecision: 'Mathematische Präzision',
    formulaDef: 'Formeldefinition',
    varDesc: 'Variablenbeschreibung',
    walkthrough: 'Praktisches Rechenbeispiel',
    workedExample: 'Berechnungsbeispiel',
    scenario: 'Szenario',
    result: 'Ergebnis',
    tipsHeading: 'Wichtige Hinweise & Tipps',
    faqBadge: 'Häufig gestellte Fragen',
    faqHeading: 'Häufig gestellte Fragen (FAQ)'
  },
  pt: {
    guideOverview: 'Guia e Visão Geral',
    aboutHeading: (name) => `Sobre a ${name}`,
    stepInstructions: 'Instruções Passo a Passo',
    howToHeading: (name) => `Como Calcular ${name}`,
    mathPrecision: 'Precisão Matemática',
    formulaDef: 'Definição da Fórmula',
    varDesc: 'Descrição das Variáveis',
    walkthrough: 'Exemplo Prático Detalhado',
    workedExample: 'Exemplo Resolvido',
    scenario: 'Cenário',
    result: 'Resultado',
    tipsHeading: 'Dicas e Considerações Importantes',
    faqBadge: 'Perguntas Frequentes Respondidas',
    faqHeading: 'Perguntas Frecuentes'
  },
  ar: {
    guideOverview: 'دليل ونظرة عامة',
    aboutHeading: (name) => `حول ${name}`,
    stepInstructions: 'خطوات الحساب التفصيلية',
    howToHeading: (name) => `طريقة حساب ${name}`,
    mathPrecision: 'الدقة الرياضية',
    formulaDef: 'صيغة المعادلة الرياضية',
    varDesc: 'شرح المتغيرات',
    walkthrough: 'مثال عملي تطبيقي',
    workedExample: 'مثال تطبيقي محلول',
    scenario: 'السيناريو',
    result: 'النتيجة',
    tipsHeading: 'نصائح واعتبارات هامة',
    faqBadge: 'إجابات الأسئلة الشائعة',
    faqHeading: 'الأسئلة الشائعة'
  },
  ru: {
    guideOverview: 'Руководство и обзор',
    aboutHeading: (name) => `О калькуляторе: ${name}`,
    stepInstructions: 'Пошаговая инструкция',
    howToHeading: (name) => `Как рассчитать ${name}`,
    mathPrecision: 'Математическая точность',
    formulaDef: 'Математическая формула',
    varDesc: 'Описание переменных',
    walkthrough: 'Практический пример',
    workedExample: 'Решенный пример',
    scenario: 'Условие задачи',
    result: 'Результат',
    tipsHeading: 'Важные советы и особенности',
    faqBadge: 'Ответы на популярные вопросы',
    faqHeading: 'Часто задаваемые вопросы'
  },
  ja: {
    guideOverview: 'ガイド＆概要',
    aboutHeading: (name) => `${name}について`,
    stepInstructions: 'ステップ別計算手順',
    howToHeading: (name) => `${name}の計算方法`,
    mathPrecision: '計算式と数学的精度',
    formulaDef: '計算式の定義',
    varDesc: '変数の説明',
    walkthrough: '実践的な計算例',
    workedExample: '計算実例',
    scenario: '具体例',
    result: '計算結果',
    tipsHeading: '重要ポイント＆注意点',
    faqBadge: 'よくあるご質問の解説',
    faqHeading: 'よくある質問 (FAQ)'
  },
  zh: {
    guideOverview: '使用指南与概述',
    aboutHeading: (name) => `关于 ${name}`,
    stepInstructions: '分步计算指南',
    howToHeading: (name) => `如何计算 ${name}`,
    mathPrecision: '数学公式与计算精度',
    formulaDef: '数学计算公式',
    varDesc: '变量说明',
    walkthrough: '实际应用范例',
    workedExample: '计算范例',
    scenario: '应用场景',
    result: '计算结果',
    tipsHeading: '重要注意事项与实用建议',
    faqBadge: '搜索常见问题解答',
    faqHeading: '常见问题解答 (FAQ)'
  },
  it: {
    guideOverview: 'Guida e Panoramica',
    aboutHeading: (name) => `Informazioni su: ${name}`,
    stepInstructions: 'Istruzioni Passo Passo',
    howToHeading: (name) => `Come Calcolare ${name}`,
    mathPrecision: 'Precisione Matematica',
    formulaDef: 'Definizione della Formula',
    varDesc: 'Descrizione delle Variabili',
    walkthrough: 'Esempio Pratico Guidato',
    workedExample: 'Esempio Risolto',
    scenario: 'Scenario',
    result: 'Risultato',
    tipsHeading: 'Consigli e Considerazioni Importanti',
    faqBadge: 'Risposte alle Domande Più Frequenti',
    faqHeading: 'Domande Frequenti (FAQ)'
  },
  nl: {
    guideOverview: 'Gids & Overzicht',
    aboutHeading: (name) => `Over de ${name}`,
    stepInstructions: 'Stap-voor-stap Instructies',
    howToHeading: (name) => `Hoe ${name} te berekenen`,
    mathPrecision: 'Wiskundige Precisie',
    formulaDef: 'Formuledefinitie',
    varDesc: 'Variabelenbeschrijving',
    walkthrough: 'Praktisch Rekenvoorbeeld',
    workedExample: 'Uitgewerkt Voorbeeld',
    scenario: 'Scenario',
    result: 'Resultaat',
    tipsHeading: 'Belangrijke Tips & Overwegingen',
    faqBadge: 'Veelgestelde Vragen Beantwoord',
    faqHeading: 'Veelgestelde Vragen (FAQ)'
  }
};

export default function CalculatorContentSection({ data }) {
  if (!data) return null;

  const lang = data.lang || 'en';
  const isRtl = lang === 'ar';
  const i18n = SECTION_I18N[lang] || SECTION_I18N.en;

  const {
    name,
    about = [],
    formula,
    howToCalculate = [],
    example,
    notes = [],
    faqs = []
  } = data;

  return (
    <div className="mt-14 space-y-12 text-slate-800" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* 1. About / Overview */}
      {about.length > 0 && (
        <section aria-labelledby="about-heading" className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{i18n.guideOverview}</span>
          </div>
          <h2 id="about-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {i18n.aboutHeading(name)}
          </h2>
          <div className="space-y-3.5 text-slate-600 leading-relaxed text-sm sm:text-base">
            {about.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* 2. How to Use / How to Calculate */}
      {howToCalculate.length > 0 && (
        <section aria-labelledby="how-to-heading" className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{i18n.stepInstructions}</span>
          </div>
          <h2 id="how-to-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {i18n.howToHeading(name.replace(' Calculator', ''))}
          </h2>
          <div className="grid grid-cols-1 gap-3.5 pt-2">
            {howToCalculate.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {idx + 1}
                </span>
                <p className="text-sm sm:text-base text-slate-700 font-medium pt-0.5 leading-snug">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Mathematical Formula */}
      {formula && (
        <section aria-labelledby="formula-heading" className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <FileCode2 className="w-4 h-4" />
            <span>{i18n.mathPrecision}</span>
          </div>
          <h2 id="formula-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {formula.title || `${name} Formula`}
          </h2>

          <div className="rounded-2xl bg-slate-900 text-slate-100 p-5 sm:p-6 shadow-md border border-slate-800" dir="ltr">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              {i18n.formulaDef}
            </div>
            <pre className="font-mono text-sm sm:text-base text-blue-300 whitespace-pre-wrap leading-relaxed overflow-x-auto text-left">
              {formula.formulaText}
            </pre>
          </div>

          {formula.explanation && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {formula.explanation}
            </p>
          )}

          {formula.variables && formula.variables.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {i18n.varDesc}
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {formula.variables.map((v, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <dt className="font-bold text-slate-900 font-mono text-xs text-blue-600">
                      {v.name}
                    </dt>
                    <dd className="text-slate-600 text-xs mt-0.5">
                      {v.desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>
      )}

      {/* 4. Worked Example */}
      {example && (
        <section aria-labelledby="example-heading" className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>{i18n.walkthrough}</span>
          </div>
          <h2 id="example-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {i18n.workedExample}
          </h2>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-200/80 p-5 sm:p-7 space-y-4">
            <div className="font-semibold text-slate-900 text-base sm:text-lg">
              {i18n.scenario}: {example.problem}
            </div>

            <div className={`space-y-2 py-1 ${isRtl ? 'border-r-2 border-blue-400 pr-4' : 'border-l-2 border-blue-400 pl-4'}`}>
              {example.steps.map((step, idx) => (
                <div key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {step}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-xs">
                <span>{i18n.result}:</span>
                <span dir="ltr">{example.result}</span>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 5. Important Notes */}
      {notes.length > 0 && (
        <section aria-labelledby="notes-heading" className="space-y-4">
          <h2 id="notes-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {i18n.tipsHeading}
          </h2>
          <ul className="space-y-2.5">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 6. Frequently Asked Questions (FAQ) */}
      {faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>{i18n.faqBadge}</span>
          </div>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {i18n.faqHeading}
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-shadow hover:shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

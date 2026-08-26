import en from './translations/en';
import { getTranslation, loaders } from './translations';

export { getTranslation, loaders };

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
];

// Lightweight fallback for English / Server Components
export const TRANSLATIONS = {
  en
};

export function getLocalizedPricing(pricing, lang = 'en', dict = null) {
  const activeDict = dict || (lang === 'en' ? en : null);
  if (activeDict) {
    if (pricing === 'Free') return activeDict.pricingFree || 'Free';
    if (pricing === 'Paid') return activeDict.pricingPaid || 'Paid';
    if (pricing === 'Freemium') return activeDict.pricingFreemium || 'Freemium';
  }
  return pricing;
}

export function getLocalizedBadge(badge, lang = 'en', dict = null) {
  const activeDict = dict || (lang === 'en' ? en : null);
  if (activeDict) {
    if (badge === 'Featured') return activeDict.badgeFeatured || 'Featured';
    if (badge === 'Trending') return activeDict.badgeTrending || 'Trending';
  }
  return badge;
}

export function getLocalizedProsList(primaryCategory, rating, lang = 'en') {
  const cat = (primaryCategory || 'general').replace(/-/g, ' ');

  switch (lang) {
    case 'es':
      return [
        `Proporciona flujos de trabajo dedicados y adaptados a tareas de ${cat}.`,
        `Permite una iteración rápida y exportación de proyectos en múltiples formatos.`,
        `Incluye controles de parámetros precisos para ajustar los resultados generados.`
      ];
    case 'fr':
      return [
        `Fournit des flux de travail dédiés et adaptés aux tâches de ${cat}.`,
        `Permet une itération rapide et l'exportation de projets sous plusieurs formats.`,
        `Comprend des contrôles de paramètres précis pour ajuster les résultats.`
      ];
    case 'de':
      return [
        `Bietet spezialisierte Arbeitsabläufe, die auf ${cat}-Aufgaben zugeschnitten sind.`,
        `Ermöglicht schnelle Iterationen und Multi-Format-Projektexporte.`,
        `Enthält präzise Parametersteuerungen zur Feinabstimmung der Ergebnisse.`
      ];
    case 'pt':
      return [
        `Oferece fluxos de trabalho dedicados e adaptados para tarefas de ${cat}.`,
        `Permite iteração ágil e exportação de projetos em múltiplos formatos.`,
        `Inclui controles de parâmetros detalhados para refinar os resultados.`
      ];
    case 'ar':
      return [
        `يوفر تدفقات عمل مخصصة ومصممة خصيصاً لمهام ${cat}.`,
        `يتيح تكراراً سريعاً للمشاريع وتصديراً بتنسيقات متعددة.`,
        `يتضمن أدوات تحكم دقيقة في المعلمات لضبط المخرجات.`
      ];
    case 'ru':
      return [
        `Предоставляет специализированные рабочие процессы для задач в категории ${cat}.`,
        `Обеспечивает быстрое редактирование и экспорт проектов в различных форматах.`,
        `Включает точные элементы управления параметрами для настройки результатов.`
      ];
    case 'ja':
      return [
        `${cat}タスクに特化して設計された専用の自動化ワークフローを提供。`,
        `迅速な反復作業とマルチフォーマットでのプロジェクトエクスポートに対応。`,
        `生成結果を微調整するための詳細なパラメータ調整機能を搭載。`
      ];
    case 'zh':
      return [
        `针对 ${cat} 任务场景提供深度定制的专业处理流程。`,
        `支持快速迭代优化，并提供多种标准生产格式导出。`,
        `内置细粒度的参数调节选项，便于对生成结果进行精准微调。`
      ];
    case 'it':
      return [
        `Fornisce flussi di lavoro dedicati e ottimizzati per attività di ${cat}.`,
        `Consente un'iterazione rapida ed esportazione dei progetti in più formati.`,
        `Include controlli di parametro accurati per perfezionare i risultati.`
      ];
    case 'nl':
      return [
        `Biedt gespecialiseerde workflows afgestemd op ${cat}-taken.`,
        `Maakt snelle iteraties en projectexport in meerdere formaten mogelijk.`,
        `Bevat nauwkeurige parameterinstellingen voor het verfijnen van resultaten.`
      ];
    default:
      return [
        `Provides specialized automation workflows tailored specifically to ${cat} tasks.`,
        `Enables rapid project iteration and versatile multi-format asset exports.`,
        `Includes granular parameter controls for fine-tuning generated outputs.`
      ];
  }
}

export function getLocalizedConsList(lang = 'en') {
  switch (lang) {
    case 'es':
      return [
        `La precisión del resultado depende de proporcionar instrucciones iniciales claras y detalladas.`,
        `El procesamiento de lotes de gran volumen requiere asignaciones de créditos de nivel superior.`
      ];
    case 'fr':
      return [
        `La précision du résultat dépend de la clarté et des détails des instructions initiales.`,
        `Le traitement de gros volumes nécessite des allocations de crédits supérieures.`
      ];
    case 'de':
      return [
        `Die Ausgabequalität hängt direkt von präzisen und detaillierten Prompt-Vorgaben ab.`,
        `Die Verarbeitung großer Datenmengen erfordert höher gestufte Kontingente.`
      ];
    case 'pt':
      return [
        `A precisão do resultado depende do fornecimento de instruções detalhadas e claras.`,
        `O processamento em lote de alto volume requer alocações de créditos superiores.`
      ];
    case 'ar':
      return [
        `تعتمد دقة المخرجات وجودتها بشكل مباشر على تقديم تعليمات أولية واضحة ومفصلة.`,
        `تتطلب معالجة الدفعات ذات الحجم الكبير تخصيص أرصدة من مستويات أعلى.`
      ];
    case 'ru':
      return [
        `Точность результатов напрямую зависит от предоставления четких и подробных инструкций.`,
        `Пакетная обработка больших объемов требует тарифных планов с повышенным лимитом.`
      ];
    case 'ja':
      return [
        `出力の精度と品質は、初期プロンプトの具体性と明確さに依存します。`,
        `大量の一括生成や商用バッチ処理には上位プランのクレジット枠が必要となります。`
      ];
    case 'zh':
      return [
        `最终生成结果的精准度直接取决于初始提示词或输入指令的详尽程度。`,
        `大规模批量生成或高频处理需要更高规格的账户配额支持。`
      ];
    case 'it':
      return [
        `La precisione del risultato dipende dalla chiarezza delle istruzioni iniziali fornite.`,
        `L'elaborazione in batch ad alto volume richiede allocazioni di crediti superiori.`
      ];
    case 'nl':
      return [
        `De nauwkeurigheid van de uitvoer is afhankelijk van duidelijke en gedetailleerde invoer.`,
        `Verwerking van grote volumes vereist hogere creditbundels.`
      ];
    default:
      return [
        `Domain accuracy and output quality depend directly on providing clear, detailed initial prompt guidance.`,
        `High-volume batch processing and heavy generation workloads require higher-tier credit allocations.`
      ];
  }
}

export function getLocalizedDescription(tool, lang = 'en') {
  if (lang === 'en' || !tool) {
    return {
      shortDescription: tool?.shortDescription || tool?.description,
      description: tool?.description
    };
  }

  const name = tool.name || 'AI Tool';
  const cat = (tool.categories?.[0] || 'general').replace(/-/g, ' ');

  const templates = {
    es: {
      short: `${name} es una herramienta de inteligencia artificial de primer nivel diseñada para optimizar tareas de ${cat}.`,
      full: `${name} es una solución avanzada de IA especializada en ${cat}. Ayuda a profesionales y creativos a automatizar procesos, mejorar la productividad y lograr resultados de alta calidad de manera eficiente. Explora sus funciones, precios y opiniones.`
    },
    fr: {
      short: `${name} est un outil d'intelligence artificielle de premier ordre conçu pour optimiser les tâches de ${cat}.`,
      full: `${name} est une solution IA avancée spécialisée dans le domaine de ${cat}. Il aide les professionnels et créateurs à automatiser leurs processus et à améliorer leur productivité de manière efficace. Découvrez ses fonctionnalités et tarifs.`
    },
    de: {
      short: `${name} ist ein führendes KI-Tool zur Optimierung von ${cat}-Aufgaben.`,
      full: `${name} ist eine fortschrittliche KI-Lösung, die auf ${cat} spezialisiert ist. Sie hilft Fachleuten und Kreativen, Prozesse zu automatisieren, die Produktivität zu steigern und qualitativ hochwertige Ergebnisse zu erzielen.`
    },
    pt: {
      short: `${name} é uma ferramenta de inteligência artificial de ponta projetada para otimizar tarefas de ${cat}.`,
      full: `${name} é uma solução avançada de IA especializada em ${cat}. Ela ajuda profissionais e criadores a automatizar processos, aumentar a produtividade e alcançar resultados de alta qualidade.`
    },
    ar: {
      short: `${name} هي أداة ذكاء اصطناعي رائدة مصممة لتحسين وتسهيل مهام ${cat}.`,
      full: `${name} هي حل متقدم بالذكاء الاصطناعي متخصص في مجال ${cat}. تتيح للمستخدمين والمحترفين أتمتة الأعمال وزيادة الإنتاجية وتحقيق نتائج عالية الجودة بكفاءة.`
    },
    ru: {
      short: `${name} — это ведущий инструмент искусственного интеллекта для оптимизации задач в категории ${cat}.`,
      full: `${name} — это передовое ИИ-решение, предназначенное для автоматизации и повышения продуктивности в сфере ${cat}. Позволяет быстро достигать профессиональных результатов.`
    },
    ja: {
      short: `${name}は、${cat}関連タスクを最適化するために設計された最先端のAIツールです。`,
      full: `${name}は${cat}分野に特化した高度なAIソリューションです。プロフェッショナルやクリエイターの作業プロセスを自動化し、生産性を劇的に向上させます。`
    },
    zh: {
      short: `${name} 是一款旨在优化 ${cat} 工作流程的顶级人工智能工具。`,
      full: `${name} 是专注于 ${cat} 领域的先进 AI 解决方案。它帮助专业人士与创作者实现流程自动化，显着提升工作效率并获得高质量产出。`
    },
    it: {
      short: `${name} è uno strumento di intelligenza artificiale leader progettato per ottimizzare le attività di ${cat}.`,
      full: `${name} è una soluzione IA avanzata specializzata in ${cat}. Aiuta professionisti e creativi ad automatizzare i processi e migliorare la produttività.`
    },
    nl: {
      short: `${name} is een geavanceerde AI-tool ontworpen om ${cat}-taken te optimaliseren.`,
      full: `${name} is een geavanceerde AI-oplossing gespecialiseerd in ${cat}. Het helpt professionals en makers processen te automatiseren en de productiviteit te verhogen.`
    }
  };

  const t = templates[lang] || templates.es;
  return {
    shortDescription: t.short,
    description: t.full
  };
}

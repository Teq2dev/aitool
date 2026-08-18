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
  const r = rating || '4.5';

  switch (lang) {
    case 'es':
      return [
        `Proporciona capacidades de IA especializadas para tareas de ${cat}.`,
        `Interfaz basada en navegador accesible al instante sin necesidad de instalación.`,
        `Alta puntuación de satisfacción (${r}/5) basada en opiniones de la comunidad.`
      ];
    case 'fr':
      return [
        `Offre des fonctionnalités IA spécialisées pour les tâches de ${cat}.`,
        `Interface web accessible instantanément sans installation de logiciel.`,
        `Score de satisfaction élevé (${r}/5) basé sur les avis de la communauté.`
      ];
    case 'de':
      return [
        `Bietet spezialisierte KI-Funktionen für ${cat}-Aufgaben.`,
        `Browserbasierte Benutzeroberfläche ohne Softwareinstallation sofort verfügbar.`,
        `Hohe Zufriedenheitsbewertung (${r}/5) basierend auf Nutzerbewertungen.`
      ];
    case 'pt':
      return [
        `Oferece recursos de IA especializados para tarefas de ${cat}.`,
        `Interface no navegador acessível instantaneamente sem instalação de software.`,
        `Alta pontuação de satisfação (${r}/5) com base em avaliações da comunidade.`
      ];
    case 'ar':
      return [
        `يوفر قدرات ذكاء اصطناعي متخصصة لمهام ${cat}.`,
        `واجهة تعمل عبر المتصفح متاحة فوراً دون الحاجة لتثبيت برامج.`,
        `درجة رضا عالية (${r}/5) استناداً إلى مراجعات المستخدمين.`
      ];
    case 'ru':
      return [
        `Предоставляет специализированные ИИ-возможности для задач в категории ${cat}.`,
        `Веб-интерфейс доступен мгновенно без установки программного обеспечения.`,
        `Высокая оценка удовлетворенности (${r}/5) на основе отзывов пользователей.`
      ];
    case 'ja':
      return [
        `${cat}タスクに特化した高度なAI機能を提供。`,
        `ソフトウェアのインストール不要で、ブラウザから即座に利用可能。`,
        `コミュニティレビューに基づく高い満足度スコア（${r}/5）。`
      ];
    case 'zh':
      return [
        `针对 ${cat} 任务提供专业的高效 AI 处理能力。`,
        `基于浏览器的便携界面，无需下载安装即可立即使用。`,
        `基于用户真实社区评价的极高满意度评分（${r}/5）。`
      ];
    case 'it':
      return [
        `Offre funzionalità IA specializzate per attività di ${cat}.`,
        `Interfaccia basata su browser accessibile all'istante senza installazione.`,
        `Punteggio di soddisfazione elevato (${r}/5) basato su recensioni.`
      ];
    case 'nl':
      return [
        `Bietet gespecialiseerde AI-mogelijkheden voor ${cat}-taken.`,
        `Browsergebaseerde interface direct toegankelijk zonder software-installatie.`,
        `Hoge tevredenheidsscore (${r}/5) op basis van beoordelingen.`
      ];
    default:
      return [
        `Delivers specialized AI capabilities for ${cat} tasks.`,
        `Browser-based interface accessible instantly without software installation.`,
        `High satisfaction score (${r}/5) based on community reviews.`
      ];
  }
}

export function getLocalizedConsList(lang = 'en') {
  switch (lang) {
    case 'es':
      return [
        `Requiere una conexión a Internet estable para la ejecución de IA en la nube.`,
        `Las funciones avanzadas o los límites ampliados pueden requerir planes de pago.`
      ];
    case 'fr':
      return [
        `Nécessite une connexion Internet stable pour l'exécution de l'IA dans le cloud.`,
        `Les fonctionnalités avancées peuvent nécessiter une mise à niveau du forfait.`
      ];
    case 'de':
      return [
        `Benötigt eine stabile Internetverbindung für die Cloud-KI-Ausführung.`,
        `Erweiterte Funktionen erfordern möglicherweise kostenpflichtige Upgrades.`
      ];
    case 'pt':
      return [
        `Requer conexão estável com a internet para execução de IA na nuvem.`,
        `Recursos avançados ou limites expandidos podem exigir planos pagos.`
      ];
    case 'ar':
      return [
        `يتطلب اتصالاً مستقراً بالإنترنت لتشغيل الذكاء الاصطناعي السحابي.`,
        `قد تتطلب الميزات المتقدمة أو زيادة حدود الاستخدام ترقية الاشتراك.`
      ];
    case 'ru':
      return [
        `Требуется стабильное интернет-соединение для облачной работы ИИ.`,
        `Расширенные функции могут потребовать платной подписки.`
      ];
    case 'ja':
      return [
        `クラウドAI処理のため、安定したインターネット接続が必要。`,
        `高度な機能や無制限利用には有料プランへのアップグレードが必要な場合があります。`
      ];
    case 'zh':
      return [
        `依赖于稳定的网络连接以进行云端 AI 模型计算。`,
        `高级功能或更多使用额度可能需要升级至付费订阅方案。`
      ];
    case 'it':
      return [
        `Richiede una connessione Internet stabile per l'esecuzione dell'IA in cloud.`,
        `Le funzionalità avanzate potrebbero richiedere l'aggiornamento a un piano a pagamento.`
      ];
    case 'nl':
      return [
        `Vereist een stabiele internetverbinding voor AI-uitvoering in de cloud.`,
        `Geavanceerde functies kunnen een betaalde upgrade vereisen.`
      ];
    default:
      return [
        `Requires steady internet connectivity for cloud AI execution.`,
        `Advanced features or expanded usage limits may require plan upgrades.`
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

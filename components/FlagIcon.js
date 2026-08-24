export default function FlagIcon({ code, className = "w-4 h-3 rounded-[2px] shadow-sm inline-block object-cover flex-shrink-0" }) {
  const c = code?.toLowerCase();
  
  switch (c) {
    case 'en':
    case 'us':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#bd3d44" d="M0 0h640v480H0z"/>
          <path fill="#fff" d="M0 37h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 73h640v37H0zm0 74h640v37H0z"/>
          <path fill="#192f5d" d="M0 0h280v222H0z"/>
          <g fill="#fff">
            <circle cx="35" cy="25" r="7"/>
            <circle cx="70" cy="25" r="7"/>
            <circle cx="105" cy="25" r="7"/>
            <circle cx="140" cy="25" r="7"/>
            <circle cx="175" cy="25" r="7"/>
            <circle cx="210" cy="25" r="7"/>
            <circle cx="245" cy="25" r="7"/>
            <circle cx="52" cy="50" r="7"/>
            <circle cx="87" cy="50" r="7"/>
            <circle cx="122" cy="50" r="7"/>
            <circle cx="157" cy="50" r="7"/>
            <circle cx="192" cy="50" r="7"/>
            <circle cx="227" cy="50" r="7"/>
            <circle cx="35" cy="75" r="7"/>
            <circle cx="70" cy="75" r="7"/>
            <circle cx="105" cy="75" r="7"/>
            <circle cx="140" cy="75" r="7"/>
            <circle cx="175" cy="75" r="7"/>
            <circle cx="210" cy="75" r="7"/>
            <circle cx="245" cy="75" r="7"/>
            <circle cx="52" cy="100" r="7"/>
            <circle cx="87" cy="100" r="7"/>
            <circle cx="122" cy="100" r="7"/>
            <circle cx="157" cy="100" r="7"/>
            <circle cx="192" cy="100" r="7"/>
            <circle cx="227" cy="100" r="7"/>
            <circle cx="35" cy="125" r="7"/>
            <circle cx="70" cy="125" r="7"/>
            <circle cx="105" cy="125" r="7"/>
            <circle cx="140" cy="125" r="7"/>
            <circle cx="175" cy="125" r="7"/>
            <circle cx="210" cy="125" r="7"/>
            <circle cx="245" cy="125" r="7"/>
            <circle cx="52" cy="150" r="7"/>
            <circle cx="87" cy="150" r="7"/>
            <circle cx="122" cy="150" r="7"/>
            <circle cx="157" cy="150" r="7"/>
            <circle cx="192" cy="150" r="7"/>
            <circle cx="227" cy="150" r="7"/>
            <circle cx="35" cy="175" r="7"/>
            <circle cx="70" cy="175" r="7"/>
            <circle cx="105" cy="175" r="7"/>
            <circle cx="140" cy="175" r="7"/>
            <circle cx="175" cy="175" r="7"/>
            <circle cx="210" cy="175" r="7"/>
            <circle cx="245" cy="175" r="7"/>
            <circle cx="52" cy="200" r="7"/>
            <circle cx="87" cy="200" r="7"/>
            <circle cx="122" cy="200" r="7"/>
            <circle cx="157" cy="200" r="7"/>
            <circle cx="192" cy="200" r="7"/>
            <circle cx="227" cy="200" r="7"/>
          </g>
        </svg>
      );
    case 'es':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#c60b1e" d="M0 0h640v480H0z"/>
          <path fill="#ffc400" d="M0 120h640v240H0z"/>
        </svg>
      );
    case 'fr':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#002654" d="M0 0h213.3v480H0z"/>
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
          <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
        </svg>
      );
    case 'de':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#000" d="M0 0h640v160H0z"/>
          <path fill="#d00" d="M0 160h640v160H0z"/>
          <path fill="#ffce00" d="M0 320h640v160H0z"/>
        </svg>
      );
    case 'pt':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#006600" d="M0 0h256v480H0z"/>
          <path fill="#cc0000" d="M256 0h384v480H256z"/>
          <circle cx="256" cy="240" r="60" fill="#ffcc00"/>
          <circle cx="256" cy="240" r="36" fill="#ffffff" stroke="#cc0000" strokeWidth="8"/>
        </svg>
      );
    case 'ar':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#006c35" d="M0 0h640v480H0z"/>
          <path fill="#fff" d="M160 290h320v16H160zm50-50h220v16H210z"/>
        </svg>
      );
    case 'ru':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#fff" d="M0 0h640v160H0z"/>
          <path fill="#0039a6" d="M0 160h640v160H0z"/>
          <path fill="#d52b1e" d="M0 320h640v160H0z"/>
        </svg>
      );
    case 'ja':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#fff" d="M0 0h640v480H0z"/>
          <circle cx="320" cy="240" r="120" fill="#bc002d"/>
        </svg>
      );
    case 'zh':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#de2910" d="M0 0h640v480H0z"/>
          <polygon fill="#ffde00" points="100,50 115,95 160,95 125,120 140,165 100,140 60,165 75,120 40,95 85,95"/>
          <circle cx="180" cy="55" r="12" fill="#ffde00"/>
          <circle cx="210" cy="90" r="12" fill="#ffde00"/>
          <circle cx="210" cy="135" r="12" fill="#ffde00"/>
          <circle cx="180" cy="170" r="12" fill="#ffde00"/>
        </svg>
      );
    case 'it':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#009246" d="M0 0h213.3v480H0z"/>
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
        </svg>
      );
    case 'nl':
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#ae1c28" d="M0 0h640v160H0z"/>
          <path fill="#fff" d="M0 160h640v160H0z"/>
          <path fill="#21468b" d="M0 320h640v160H0z"/>
        </svg>
      );
    default:
      return <span className="text-xs">🌐</span>;
  }
}

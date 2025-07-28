import { useEffect, useState } from "preact/hooks";
import { RouteManager } from "@lib/navigation/routeManager";

export default function LangSwitcher({ 
  initialLang = "es",
  routeManagerData
}) {
  const [currentLang, setCurrentLang] = useState(initialLang);
  const [switchUrl, setSwitchUrl] = useState("/en");
  const [routeManager, setRouteManager] = useState(null);

  // Inicializar RouteManager en el cliente
  useEffect(() => {
    if (routeManagerData) {
      const manager = new RouteManager(routeManagerData.config, routeManagerData.context);
      setRouteManager(manager);
    }
  }, [routeManagerData]);

  useEffect(() => {
    const updateLanguageInfo = () => {
      const url = new URL(window.location.href);
      
      if (routeManager) {
        // Usar la instancia específica del RouteManager
        const routeInfo = routeManager.analyzeUrl(url);
        const lang = routeInfo.currentLang;
        const target = lang === "es" ? "en" : "es";

        setCurrentLang(lang);
        setSwitchUrl(routeManager.getRouteForLang(routeInfo, target));
      }
    };

    // Solo ejecutar si routeManager está disponible
    if (routeManager) {
      updateLanguageInfo();

      document.addEventListener('astro:page-load', updateLanguageInfo);
      
      // Cleanup
      return () => {
        document.removeEventListener('astro:page-load', updateLanguageInfo);
      };
    }
  }, [routeManager]);

  return (
    <div className="select-none flex items-center justify-between w-full h-full text-center bg-[--bg-color] touch-manipulation">
      {currentLang === "es" ? (
        <LangSelected text="ES" />
      ) : (
        <LangSelectable url={switchUrl} text="ES" />
      )}
      {currentLang === "en" ? (
        <LangSelected text="EN" />
      ) : (
        <LangSelectable url={switchUrl} text="EN" />
      )}
    </div>
  );
}

export function LangSelected({ text }) {
  return (
    <span className="flex items-center cursor-default h-full opacity-100 select-none">
      <span className="w-fit px-2 font-semibold">{text}</span>
    </span>
  );
}

export function LangSelectable({ url, text }) {

  return (
    <a
      href={url}
      className="flex items-center cursor-pointer h-full bg-[--border-button-color] select-none touch-manipulation"
      draggable="false"
      onClick={(e) => playSound()}
      data-target-url={url}

    >
      <span className="px-2 w-fit">{text}</span>
    </a>
  );
}

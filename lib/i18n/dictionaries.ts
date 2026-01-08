
export type Language = 'en' | 'pl' | 'es';

export type Dictionary = {
  common: {
    loading: string;
    error: string;
    processing: string;
    executeImport: string;
    clearReset: string;
    footer: string;
  };
  home: {
    title: string;
    tokenLabel: string;
    tokenPlaceholder: string;
    tokenHelp: string;
    ownerLabel: string;
    ownerPlaceholder: string;
    repoLabel: string;
    repoPlaceholder: string;
    projectLabel: string;
    projectPlaceholder: string;
    fileLabel: string;
    fileHelp: string;
    loadedRows: (count: number) => string;
    reportTitle: string;
    created: string;
    errors: string;
    errorLogs: string;
    lastCreated: string;
    dataPreview: string;
    tableHeaders: {
      number: string;
      title: string;
      labels: string;
      assignee: string;
      milestone: string;
    };
    moreRows: (count: number) => string;
  };
  modal: {
    buttonTitle: string;
    title: string;
    byokTitle: string;
    byokText1: string;
    byokList: string[];
    importTitle: string;
    importList: string[];
    openSourceTitle: string;
    openSourceText: string;
    viewSource: string;
    closeButton: string;
  };
};

export const dictionaries: Record<Language, Dictionary> = {
  en: {
    common: {
      loading: "Loading...",
      error: "[ERROR]",
      processing: "Processing...",
      executeImport: "Execute Import",
      clearReset: "< Clear and Reset",
      footer: "© TymonPawelczyk 2026",
    },
    home: {
      title: "GitHub Issue Importer",
      tokenLabel: "Personal Access Token",
      tokenPlaceholder: "ghp_...",
      tokenHelp: "Token is used only for this request and is not stored. Requires `repo` and `project` scopes.",
      ownerLabel: "Repo Owner",
      ownerPlaceholder: "Your GitHub username",
      repoLabel: "Repo Name",
      repoPlaceholder: "Your repository name",
      projectLabel: "Project ID",
      projectPlaceholder: "e.g. 12",
      fileLabel: "Source File (CSV / XLSX)",
      fileHelp: "Required: Title. Optional: Description, Labels, Assignee, Milestone.",
      loadedRows: (count) => `Loaded ${count} rows.`,
      reportTitle: "Execution Report",
      created: "Created",
      errors: "Errors",
      errorLogs: "Error Logs:",
      lastCreated: "Last Created:",
      dataPreview: "Data Preview (First 50)",
      tableHeaders: {
        number: "#",
        title: "Title",
        labels: "Labels",
        assignee: "Assignee",
        milestone: "Milestone",
      },
      moreRows: (count) => `...and ${count} more.`,
    },
    modal: {
      buttonTitle: "Security & How it works",
      title: "Security & How it Works",
      byokTitle: "🔐 Bring Your Own Key (BYOK)",
      byokText1: "This application operates on a stateless model. We do not have a database. Your Personal Access Token is:",
      byokList: [
        "Sent directly from your browser to the backend via encrypted HTTPS.",
        "Kept in the server's RAM only for the duration of the request (seconds).",
        "Permanently discarded immediately after the operation completes."
      ],
      importTitle: "🚀 How the Import Works",
      importList: [
        "Parsing: Your CSV/Excel file is processed securely to extract titles, descriptions, labels, and milestones.",
        "Setup: The app checks if the necessary Labels and Milestones exist in your repo. If not, it creates them for you automatically.",
        "Creation: Issues are created via the official GitHub API. If you provided a Project ID, tasks are added to your project and moved to the 'Backlog' column."
      ],
      openSourceTitle: "✅ Open Source Transparency",
      openSourceText: "The source code is completely transparent. You can verify exactly how your token is handled by inspecting the repository. This ensures that no hidden data collection occurs.",
      viewSource: "View Source on GitHub",
      closeButton: "I Understand, Let's Import!",
    }
  },
  pl: {
    common: {
      loading: "Ładowanie...",
      error: "[BŁĄD]",
      processing: "Przetwarzanie...",
      executeImport: "Wykonaj Import",
      clearReset: "< Wyczyść i Resetuj",
      footer: "© TymonPawelczyk 2026",
    },
    home: {
      title: "Importer Zgłoszeń GitHub",
      tokenLabel: "Osobisty Token Dostępu",
      tokenPlaceholder: "ghp_...",
      tokenHelp: "Token jest używany tylko dla tego żądania i nie jest przechowywany. Wymaga uprawnień `repo` i `project`.",
      ownerLabel: "Właściciel Repozytorium",
      ownerPlaceholder: "Twoja nazwa użytkownika GitHub",
      repoLabel: "Nazwa Repozytorium",
      repoPlaceholder: "Nazwa twojego repozytorium",
      projectLabel: "ID Projektu",
      projectPlaceholder: "np. 12",
      fileLabel: "Plik Źródłowy (CSV / XLSX)",
      fileHelp: "Wymagane: Tytuł. Opcjonalne: Opis, Etykiety, Przypisany, Kamień milowy.",
      loadedRows: (count) => `Załadowano ${count} wierszy.`,
      reportTitle: "Raport Wykonania",
      created: "Utworzono",
      errors: "Błędy",
      errorLogs: "Dziennik Błędów:",
      lastCreated: "Ostatnio Utworzono:",
      dataPreview: "Podgląd Danych (Pierwsze 50)",
      tableHeaders: {
        number: "Lp.",
        title: "Tytuł",
        labels: "Etykiety",
        assignee: "Przypisany",
        milestone: "Kamień milowy",
      },
      moreRows: (count) => `...oraz ${count} więcej.`,
    },
    modal: {
      buttonTitle: "Bezpieczeństwo i Zasada Działania",
      title: "Bezpieczeństwo i Zasada Działania",
      byokTitle: "🔐 Własny Klucz (BYOK)",
      byokText1: "Ta aplikacja działa w modelu bezstanowym. Nie posiadamy bazy danych. Twój Osobisty Token Dostępu jest:",
      byokList: [
        "Wysyłany bezpośrednio z przeglądarki do backendu przez szyfrowane połączenie HTTPS.",
        "Przechowywany w pamięci RAM serwera tylko przez czas trwania żądania (sekundy).",
        "Trwale usuwany natychmiast po zakończeniu operacji."
      ],
      importTitle: "🚀 Jak działa Import",
      importList: [
        "Przetwarzanie: Twój plik CSV/Excel jest bezpiecznie przetwarzany w celu wyodrębnienia tytułów, opisów, etykiet i kamieni milowych.",
        "Konfiguracja: Aplikacja sprawdza, czy w Twoim repozytorium istnieją niezbędne Etykiety i Kamienie milowe. Jeśli nie, tworzy je automatycznie.",
        "Tworzenie: Zgłoszenia są tworzone za pośrednictwem oficjalnego API GitHub. Jeśli podano ID Projektu, zadania są dodawane do projektu i przenoszone do kolumny 'Backlog'."
      ],
      openSourceTitle: "✅ Przejrzystość Open Source",
      openSourceText: "Kod źródłowy jest całkowicie przejrzysty. Możesz zweryfikować, w jaki sposób obsługiwany jest Twój token, przeglądając repozytorium. Gwarantuje to brak ukrytego gromadzenia danych.",
      viewSource: "Zobacz Kod na GitHub",
      closeButton: "Rozumiem, Importujmy!",
    }
  },
  es: {
    common: {
      loading: "Cargando...",
      error: "[ERROR]",
      processing: "Procesando...",
      executeImport: "Ejecutar Importación",
      clearReset: "< Limpiar y Reiniciar",
      footer: "© TymonPawelczyk 2026",
    },
    home: {
      title: "Importador de Problemas de GitHub",
      tokenLabel: "Token de Acceso Personal",
      tokenPlaceholder: "ghp_...",
      tokenHelp: "El token se usa solo para esta solicitud y no se almacena. Requiere permisos `repo` y `project`.",
      ownerLabel: "Dueño del Repositorio",
      ownerPlaceholder: "Tu nombre de usuario de GitHub",
      repoLabel: "Nombre del Repositorio",
      repoPlaceholder: "Nombre de tu repositorio",
      projectLabel: "ID del Proyecto",
      projectPlaceholder: "ej. 12",
      fileLabel: "Archivo Fuente (CSV / XLSX)",
      fileHelp: "Requerido: Título. Opcional: Descripción, Etiquetas, Asignado, Hito.",
      loadedRows: (count) => `Se cargaron ${count} filas.`,
      reportTitle: "Informe de Ejecución",
      created: "Creados",
      errors: "Errores",
      errorLogs: "Registros de Error:",
      lastCreated: "Último Creado:",
      dataPreview: "Vista Previa de Datos (Primeros 50)",
      tableHeaders: {
        number: "#",
        title: "Título",
        labels: "Etiquetas",
        assignee: "Asignado",
        milestone: "Hito",
      },
      moreRows: (count) => `...y ${count} más.`,
    },
    modal: {
      buttonTitle: "Seguridad y Cómo Funciona",
      title: "Seguridad y Cómo Funciona",
      byokTitle: "🔐 Trae Tu Propia Clave (BYOK)",
      byokText1: "Esta aplicación opera en un modelo sin estado. No tenemos base de datos. Tu Token de Acceso Personal es:",
      byokList: [
        "Enviado directamente desde tu navegador al backend a través de HTTPS encriptado.",
        "Mantenido en la RAM del servidor solo durante la duración de la solicitud (segundos).",
        "Descartado permanentemente inmediatamente después de que se completa la operación."
      ],
      importTitle: "🚀 Cómo Funciona la Importación",
      importList: [
        "Procesamiento: Tu archivo CSV/Excel se procesa de forma segura para extraer títulos, descripciones, etiquetas e hitos.",
        "Configuración: La aplicación verifica si las Etiquetas e Hitos necesarios existen en tu repositorio. Si no, los crea automáticamente.",
        "Creación: Los problemas se crean a través de la API oficial de GitHub. Si proporcionaste un ID de Proyecto, las tareas se agregan a tu proyecto y se mueven a la columna 'Backlog'."
      ],
      openSourceTitle: "✅ Transparencia de Código Abierto",
      openSourceText: "El código fuente es completamente transparente. Puedes verificar exactamente cómo se maneja tu token inspeccionando el repositorio. Esto asegura que no ocurra recopilación oculta de datos.",
      viewSource: "Ver Código en GitHub",
      closeButton: "¡Entendido, Importemos!",
    }
  }
};

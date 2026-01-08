import { Dictionary } from '../types';

export const pl: Dictionary = {
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
    tokenCreateLabel: "Wygeneruj go tutaj",
    ownerLabel: "Właściciel Repozytorium",
    ownerPlaceholder: "Twoja nazwa użytkownika GitHub",
    repoLabel: "Nazwa Repozytorium",
    repoPlaceholder: "Nazwa twojego repozytorium",
    projectLabel: "ID Projektu",
    projectPlaceholder: "np. 12",
    fileLabel: "Plik Źródłowy (CSV / XLSX)",
    fileHelp: "Wymagane: Tytuł. Opcjonalne: Opis, Etykiety, Przypisany, Kamień milowy.",
    chooseFile: "Wybierz Plik",
    noFileSelected: "Nie wybrano pliku",
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
};

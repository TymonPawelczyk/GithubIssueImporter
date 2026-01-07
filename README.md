# GitHub Issue Importer

Narzędzie do masowego importu zadań do GitHub Issues z plików CSV i Excel.

## Funkcje

- Obsługa plików `.csv` oraz `.xlsx`.
- Automatyczne tworzenie brakujących Labeli (z deterministycznym kolorem).
- Automatyczne tworzenie brakujących Milestone'ów.
- Przypisywanie użytkowników (Assignees).
- Ograniczenie współbieżności API (Rate Limiting).

## Wymagania

- Node.js 18+
- Token GitHub (Personal Access Token) z uprawnieniami `repo`.

## Instalacja

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Skonfiguruj token:
   Utwórz plik `.env.local` w głównym katalogu:
   ```ini
   GITHUB_TOKEN=twoj_token_github_z_uprawnieniami_repo
   ```

## Uruchomienie

```bash
npm run dev
```
Aplikacja dostępna pod [http://localhost:3000](http://localhost:3000).

## Format Pliku

Aplikacja oczekuje nagłówków (wielkość znaków dowolna):
- **Title** (wymagane)
- **Description**
- **Labels** (rozdzielone przecinkami, np. "bug, high")
- **Assignee** (login lub lista loginów rozdzielona przecinkami)
- **Milestone** (nazwa milestone'a)

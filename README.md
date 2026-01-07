# GitHub Issue Importer

A modern, secure, and user-friendly tool to bulk import issues into GitHub Repositories from CSV and Excel files. Features a "Matrix" dark mode, automatic label creation, and GitHub Projects V2 integration.

![App Screenshot](https://via.placeholder.com/800x400?text=App+Preview+Placeholder)

## 🚀 Features

-   **File Support:** Imports `.csv` and `.xlsx` files.
-   **Smart Parsing:** Handles labels, assignees, and markdown descriptions.
-   **Automated Setup:**
    -   Creates missing **Labels** (with deterministic colors).
    -   Creates missing **Milestones**.
-   **GitHub Projects V2:** Optionally adds issues to a Project and moves them to the "Backlog" column.
-   **Secure (BYOK):** "Bring Your Own Key" architecture. Tokens are processed in-memory and never stored.
-   **Themes:** Switch between a Clean Light Mode and a Hacker/Matrix Dark Mode.

## 🛠️ Tech Stack

-   **Framework:** Next.js 16 (App Router)
-   **Styling:** Tailwind CSS v4
-   **Logic:** TypeScript, Octokit, Zod
-   **Validation:** Robust error handling and input validation.

## 📦 Installation & Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/github-issue-importer.git
    cd github-issue-importer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000).

## 📝 Usage Guide

### 1. Prepare your Token
Generate a **Classic Personal Access Token** on GitHub Settings with the following scopes:
-   `repo` (Required for creating issues/labels).
-   `project` (Optional: Required only if using Projects V2 integration).

### 2. Prepare your Data File
The application expects the following columns (case-insensitive):

| Column | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| **Title** | Yes | The issue title. | `Fix login bug` |
| **Description** | No | Body text (supports Markdown). | `**Steps:** 1. Open app...` |
| **Labels** | No | Comma or semicolon separated list. | `bug; high priority` |
| **Assignee** | No | GitHub username(s). | `TymonPawelczyk` |
| **Milestone** | No | Milestone title. | `v1.0` |

*Tip: If using CSV, use semicolons (`;`) for lists to avoid conflicts with comma delimiters.*

### 3. Import
1.  Enter your **Repo Owner** (e.g., `facebook`) and **Repo Name** (e.g., `react`).
2.  (Optional) Enter a **Project Number** (from the URL `projects/<number>`).
3.  Upload your file and click **Execute Import**.

## 🔒 Security

This application is designed with a **Stateless** architecture for maximum security:
-   **No Database:** We do not store any user data.
-   **Ephemeral Tokens:** Your GitHub Token is sent via HTTPS, used strictly for the import request, and immediately discarded from memory.
-   **Open Source:** You can audit the code to verify how your data is handled.

## 📄 License

MIT © TymonPawelczyk 2026
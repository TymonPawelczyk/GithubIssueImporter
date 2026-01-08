import { Dictionary } from '../types';

export const es: Dictionary = {
  common: {
    loading: "Cargando...",
    error: "[ERROR]",
    processing: "Procesando...",
    executeImport: "Ejecutar Importación",
    clearReset: "< Limpiar y Reiniciar",
    footer: "© TymonPawelczyk 2026",
  },
  home: {
    title: "GitHub Issue Importer",
    tokenLabel: "Token de Acceso Personal",
    tokenPlaceholder: "ghp_...",
    tokenHelp: "El token se usa solo para esta solicitud y no se almacena. Requiere permisos `repo` i `project`.",
    tokenCreateLabel: "Genéralo aquí",
    ownerLabel: "Dueño del Repositorio",
    ownerPlaceholder: "Tu nombre de usuario de GitHub",
    repoLabel: "Nombre del Repositorio",
    repoPlaceholder: "Nombre de tu repositorio",
    projectLabel: "ID del Proyecto",
    projectPlaceholder: "ej. 12",
    fileLabel: "Archivo Fuente (CSV / XLSX)",
    fileHelp: "Requerido: Título. Opcional: Descripción, Etiquetas, Asignado, Hito.",
    chooseFile: "Seleccionar Archivo",
    noFileSelected: "Ningún archivo seleccionado",
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
};

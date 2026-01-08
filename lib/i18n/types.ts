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
    chooseFile: string;
    noFileSelected: string;
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

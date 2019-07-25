export const STORAGE_KEYS = {
  DIRECTORY: "id",
  USER_ID: "otherId"
};

export const getDirectoryStorageKey = () => {
  return STORAGE_KEYS.DIRECTORY;
};

export const getUserIdStorageKey = directoryId => {
  return `${STORAGE_KEYS.USER_ID}[${directoryId}]`;
};

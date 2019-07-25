export const getListMetadataStatsTotal = metadata => {
  if (!metadata || !metadata.stats || !metadata.stats.total) {
    return null;
  }
  return metadata.stats.total;
};

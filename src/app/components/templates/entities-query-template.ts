export const entitiesQueryTemplate = {
  select: ['geo', 'geo.name', 'geo.world_4region'],
  where: {'geo.is--country': true}
};

// src/routes/+page.ts
import type { PageLoad } from './$types';
import { loadCsv }    from '$lib/utils/loadCsv';
import { base }       from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
  const occupations           = await loadCsv(`${base}/data/occupations.csv`,          fetch);
  const occupationTechnologies = await loadCsv(`${base}/data/occupation_technologies.csv`, fetch);
  const technologies           = await loadCsv(`${base}/data/technologies.csv`,          fetch);
  const stateWages             = await loadCsv(`${base}/data/state_wages.csv`,          fetch);

  return { occupations, occupationTechnologies, technologies, stateWages };
};

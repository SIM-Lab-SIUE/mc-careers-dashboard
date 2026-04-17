// src/routes/+page.ts
import type { PageLoad } from './$types';
import { loadCsv }    from '$lib/utils/loadCsv';
import { base }       from '$app/paths';

export const load: PageLoad = async ({ fetch }) => {
  const [
    occupations,
    occupationTechnologies,
    technologies,
    stateWages,
    courses,
    courseJobRatings
  ] = await Promise.all([
    loadCsv(`${base}/data/occupations.csv`, fetch),
    loadCsv(`${base}/data/occupation_technologies.csv`, fetch),
    loadCsv(`${base}/data/technologies.csv`, fetch),
    loadCsv(`${base}/data/state_wages.csv`, fetch),
    loadCsv(`${base}/data/courses.csv`, fetch),
    loadCsv(`${base}/data/course_job_ratings.csv`, fetch)
  ]);

  return {
    occupations,
    occupationTechnologies,
    technologies,
    stateWages,
    courses,
    courseJobRatings
  };
};

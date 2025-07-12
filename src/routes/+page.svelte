<script lang="ts">
  import type { PageData } from './$types';
  import WageDistributionChart from '$lib/components/WageDistributionChart.svelte';

  export let data: PageData;
  const { occupations, occupationTechnologies, technologies, stateWages } = data;

  let selectedTrack = '';
  const trackOptions = Array.from(new Set(occupations.map(o => o.Track))).sort();
  let titleOptions: string[] = [];
  let selectedTitleAlt = '';
  let filteredOccupation: any = null;
  let techTools: any[] = [];
  let filteredWages: any[] = [];

  function onTrackChange() {
    selectedTitleAlt = '';
    filteredOccupation = null;
    techTools = [];
    filteredWages = [];
    titleOptions = occupations
      .filter(o => o.Track === selectedTrack)
      .map(o => o['Title - Alt'])
      .sort();
  }

  function onTitleChange() {
    filteredOccupation = occupations.find(o => o['Title - Alt'] === selectedTitleAlt);
    const linkedIDs = occupationTechnologies
      .filter(j => j['Title - Alt'] === selectedTitleAlt)
      .map(j => Number(j.Tech_ID));
    techTools = technologies.filter(t => linkedIDs.includes(Number(t.Tech_ID)));
    filteredWages = stateWages.filter(w => w.OCC_CODE === filteredOccupation.OCC_CODE);
  }
</script>

<h1>Mass Communications Careers Dashboard</h1>

<div class="layout">
  <!-- LEFT COLUMN -->
  <div class="left">
    <h2>Career Explorer</h2>

    <label for="track">Select Track:</label>
    <select id="track" bind:value={selectedTrack} on:change={onTrackChange}>
      <option disabled value="">-- Select a Track --</option>
      {#each trackOptions as t}
        <option value={t}>{t}</option>
      {/each}
    </select>

    {#if titleOptions.length}
      <label for="career">Select Career:</label>
      <select id="career" bind:value={selectedTitleAlt} on:change={onTitleChange}>
        <option disabled value="">-- Select a Career --</option>
        {#each titleOptions as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
    {/if}

    {#if filteredOccupation}
      <h3>{filteredOccupation['Title - Alt']}</h3>
      <p>{filteredOccupation.Alt_Description}</p>

      <h4>Wage Distribution by State</h4>
      <WageDistributionChart wageData={filteredWages} />
    {/if}
  </div>

  <!-- RIGHT COLUMN -->
  <div class="right">
    {#if techTools.length}
      <h3>Key Technology Tools</h3>
      <div class="tech-grid">
        {#each techTools as tool}
          <div class="tech-card">
            <strong>{tool['Commodity Title']}</strong>
            <p>{tool.Examples}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  /* Base */
  h1 { font-size: 1.75rem; margin-bottom: 1rem; }
  select {
    width: 100%; padding: 0.5rem; margin: 0.5rem 0 1rem;
    font-size: 1rem;
  }

  /* Two-column for desktop */
  .layout {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: start;
  }
  .left, .right { padding: 1rem; }

  /* Tech grid */
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 1rem;
    margin-top: 0.5rem;
  }
  .tech-card {
    background: #fff;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 4px;
  }

  /* Tablet */
  @media (max-width: 768px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .tech-grid {
      grid-template-columns: repeat(2,1fr);
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    h1 { font-size: 1.5rem; }
    select { font-size: 0.9rem; }
    .tech-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
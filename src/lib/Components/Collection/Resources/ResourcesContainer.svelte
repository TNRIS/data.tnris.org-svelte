<script>
  import { useQuery } from "@sveltestack/svelte-query";
  import * as rscs from "../../../Api/Collections/getAreas";
  import SearchSelect from "../../General/SearchSelect.svelte";
  import mapStore from "../../Map/mapStore";
  import AreaTypeSelect from "./AreaTypeSelect.svelte";
  import ResourceAreaItem from "./ResourceAreaItem.svelte";
  import ResourceAreasMapLayer from "./ResourceAreasMapLayer.svelte";

  export let collection_id = null;

  let map = mapStore;

  const areas250k = useQuery(
    ["250k-areas", collection_id],
    async () => await rscs.get250kByCollectionId(collection_id)
  );
  const areasBlock = useQuery(
    ["block-areas", collection_id],
    async () => await rscs.getBlocksByCollectionId(collection_id)
  );
  const areasCounty = useQuery(
    ["county-areas", collection_id],
    async () => await rscs.getCountiesByCollectionId(collection_id)
  );
  const areasQuad = useQuery(
    ["quad-areas", collection_id],
    async () => await rscs.getQuadsByCollectionId(collection_id)
  );
  const areasQQuad = useQuery(
    ["qquad-areas", collection_id],
    async () => await rscs.getQQuadsByCollectionId(collection_id)
  );
  const areasState = useQuery(
    ["state-areas", collection_id],
    async () => await rscs.getStateByCollectionId(collection_id)
  );

  let areaTypeSelection;

  //variable to store id of map resource area currently hovered over
  let hoverAreaTypeId = null;
  //variable to store area-type selections
  let areaSelections = [];

  const removeSelection = (opt) =>
    (areaSelections = areaSelections.filter((cur) => cur.value != opt.value));
  const addSelection = (opt) => (areaSelections = [...areaSelections, opt]);
  const toggleSelection = (opt) => {
    if (areaSelections.some((cur) => cur.value == opt.value)) {
      removeSelection(opt);
    } else {
      addSelection(opt);
    }
  };

  const onAreaClick = (e) => {
    let new_selection = {
      value: e.features[0].id,
      label: e.features[0].properties.area_type_name,
    };
    toggleSelection(new_selection);
  };
</script>

<section id="collection-resources-container">
  <div id="collection-resources-area-select">
    <AreaTypeSelect
      bind:areaTypeSelection
      {areas250k}
      {areasBlock}
      {areasCounty}
      {areasQQuad}
      {areasQuad}
      {areasState}
    />
    {#if areaTypeSelection == "State"}
      <SearchSelect
        options={$areasState.data.features
          .map((v) => {
            return {
              label: v.properties.area_type_name,
              value: v.properties.area_type_id,
            };
          })
          .sort((a, b) => {
            if (a.label > b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            if (a.label == b.label) {
              return 0;
            }
          })}
        bind:selections={areaSelections}
      />
      <ResourceAreasMapLayer
        map={$map}
        data={$areasState.data}
        layerId={"tnris-resources-areas"}
        {onAreaClick}
        selections={areaSelections}
        bind:hoverAreaTypeId
      />
    {/if}
    {#if areaTypeSelection == "County"}
      <SearchSelect
        options={$areasCounty.data.features.map((v) => {
          return {
            label: v.properties.area_type_name,
            value: v.properties.area_type_id,
          };
        })}
        bind:selections={areaSelections}
      />
      <ResourceAreasMapLayer
        map={$map}
        data={$areasCounty.data}
        layerId={"tnris-resources-areas"}
        {onAreaClick}
        selections={areaSelections}
        bind:hoverAreaTypeId
      />
    {/if}
    {#if areaTypeSelection == "Block"}
      <SearchSelect
        options={$areasBlock.data.features.map((v) => {
          return {
            label: v.properties.area_type_name,
            value: v.properties.area_type_id,
          };
        })}
        bind:selections={areaSelections}
      />
      <ResourceAreasMapLayer
        map={$map}
        data={$areasBlock.data}
        layerId={"tnris-resources-areas"}
        {onAreaClick}
        selections={areaSelections}
        bind:hoverAreaTypeId
      />
    {/if}
    {#if areaTypeSelection == "250k"}
      <SearchSelect
        options={$areas250k.data.features.map((v) => {
          return {
            label: v.properties.area_type_name,
            value: v.properties.area_type_id,
          };
        })}
        bind:selections={areaSelections}
      />
      <ResourceAreasMapLayer
        map={$map}
        data={$areas250k.data}
        layerId={"tnris-resources-areas"}
        {onAreaClick}
        selections={areaSelections}
        bind:hoverAreaTypeId
      />
    {/if}
    {#if areaTypeSelection == "Quad"}
      <SearchSelect
        options={$areasQuad.data.features.map((v) => {
          return {
            label: v.properties.area_type_name,
            value: v.properties.area_type_id,
          };
        })}
        bind:selections={areaSelections}
      />
      <ResourceAreasMapLayer
        map={$map}
        data={$areasQuad.data}
        layerId={"tnris-resources-areas"}
        {onAreaClick}
        selections={areaSelections}
        bind:hoverAreaTypeId
      />
    {/if}
    {#if areaTypeSelection == "QQuad"}
      <SearchSelect
        options={$areasQQuad.data.features.map((v) => {
          return {
            label: v.properties.area_type_name,
            value: v.properties.area_type_id,
          };
        })}
        bind:selections={areaSelections}
      />
      <ResourceAreasMapLayer
        map={$map}
        data={$areasQQuad.data}
        layerId={"tnris-resources-areas"}
        {onAreaClick}
        selections={areaSelections}
        bind:hoverAreaTypeId
      />
    {/if}
  </div>

  <section id="area-selections-resource-list-container">
    {#each areaSelections as area}
      <ResourceAreaItem
        resourceAreaId={area.value}
        resourceAreaName={area.label}
        collectionId={collection_id}
        removeResourceSelectionFn={removeSelection}
        bind:hoverAreaTypeId
      />
    {/each}
  </section>
</section>

<style lang="scss">
  #collection-resources-container {
    display: grid;
    grid-template-rows: auto 1fr;
    max-height: 100%;
    overflow-y: auto;

    #collection-resources-area-select {
      display: grid;
      grid-template-columns: auto 1fr;
      :global(#area-type-select) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      :global(.select-search input) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
      }
    }
    #area-selections-resource-list-container {
      display: grid;
      gap: 0.5rem;
      justify-content: stretch;
      align-content: flex-start;
      overflow-y: scroll;
    }
  }
</style>

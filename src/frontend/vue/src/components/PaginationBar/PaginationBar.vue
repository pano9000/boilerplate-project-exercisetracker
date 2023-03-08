<template>

  <nav class="ui-pagination_nav">
    <h3>Pages</h3>
    <section class="ui-pagination_row-buttons">
      <button class="ui-pagination_btn" :disabled="!ui_previousPossible" @click="ui_activePage--" title="Previous Page">&lt;</button>
      <button 
        class="ui-pagination_btn"
        type="button"
        v-for="(pg) in visibleBtns"
        @click="ui_activePage=pg"
        :class="(pg == ui_activePage) ? 'ui-pagination_btn-activePg' : ''"
        :disabled="pg == '…'"
        :title="`Page ${pg}`"
      >
        {{ pg }}
      </button>
      <button class="ui-pagination_btn" :disabled="!ui_forwardPossible" @click="ui_activePage++" title="Next Page">&gt;</button>
    </section>
    <div class="ui-pagination_row-actions">

      <div>
        <label for="ui-pagination_showEntryQty">Show max. entries</label>
        <select id="ui-pagination_showEntryQty" class="ui-pagination_showEntryQty" v-model="ui_showentryqty" @change="updateActivePage" title="Number of entries  to show">
          <option v-for="value in [5, 10, 25, 50, 100]" :key="value"> {{value}}</option>
        </select>

      </div>

      <div>
        <label for="ui-pagination_goToPage">Go To Page</label>
        <input 
          id="ui-pagination_goToPage"
          class="ui-pagination_goToPage"
          type="number"
          min="1"
          :max="totalPages"
          @keydown.enter="goToPageHandler"
          v-model="ui_goToPage"
        >
        <button :disabled="!validPageSelection" @click="goToPageHandler">Go</button>
      </div>

    </div>
    <p>Showing entries {{ ui_qtyVisible }}  of total {{ listToPaginate.length }}</p>

  </nav>

</template>


<script setup>


import { ref, onMounted, computed, toRefs, watch } from "vue";

  const props = defineProps(["listToPaginate", "allowSelection"]);
  const emit = defineEmits(["updatePaginatedList"]);
  const { listToPaginate, allowSelection } = toRefs(props);



  const ui_activePage = ref(1);
  const ui_goToPage = ref(1)
  const ui_showentryqty = ref(5);
  const ui_forwardPossible = computed( () => (ui_activePage.value < totalPages.value) ? true : false);
  const ui_previousPossible = computed( () => (ui_activePage.value > 1) ? true : false); 
  const totalPages = computed( () => Math.ceil(listToPaginate.value.length / ui_showentryqty.value));

  const validPageSelection = computed( () => {
    return (Number.isInteger(ui_goToPage.value) 
            && ui_goToPage.value <= totalPages.value 
            && ui_goToPage.value > 0) ? true : false
  });

  const ui_qtyVisible = computed( () => {
    const from = (ui_showentryqty.value * (ui_activePage.value-1)) + 1;
    const calcTo = ui_showentryqty.value * ui_activePage.value;
    const to = (calcTo > listToPaginate.value.length) ? listToPaginate.value.length : calcTo;
    return `${from}–${to}`
  });

  const paginatedListComp = computed( () => {
    const listStart = ui_showentryqty.value*(ui_activePage.value-1);
    const listEnd = ui_showentryqty.value*ui_activePage.value;
    const paginatedList = listToPaginate.value.slice(listStart,listEnd)
    if (allowSelection.value!==true) {
      return paginatedList
    }
    return paginatedList.map(elem => { 
      elem.selected = false;
      return elem
    })
  });

  const totalBtns = computed( () => {
    const totalBtns = [];
    for (let i=1; i<=totalPages.value; i++) {
      totalBtns.push(i);
    };
    return totalBtns;
  });

  const visibleBtns = computed( () => {

    /**
     * always show: "<" | "first page" | "last page" | ">" 
     * middle part with 2 pages before and 2 pages after for easier access
     * e.g.: < 1 ... 3 4 `5` 6 7 ... 10 >
     */
    //TODO: Refactor and simplify - looks ugly and hackish
    const visibleBtns = [[], [], []];
    if (totalPages.value < 7) {
      visibleBtns[0] = totalBtns.value.slice(0, (totalPages.value>5) ? 6 : totalPages.value)
      return visibleBtns.flatMap(elem => elem);

    }
    if (ui_activePage.value < 5) {
      visibleBtns[0] = totalBtns.value.slice(0, (totalPages.value>5) ? 6 : totalPages.value)
      visibleBtns[1] = ["…"]
      visibleBtns[2] = totalBtns.value.slice(totalPages.value-1, totalPages.value)
    }
    else if (ui_activePage.value > totalPages.value-4) {
      visibleBtns[0] = totalBtns.value.slice(0, 1);
      visibleBtns[1] = ["…"]
      visibleBtns[2] = totalBtns.value.slice(totalPages.value - 6, totalPages.value)

    } else {

      visibleBtns[0] = totalBtns.value.slice(0, 1)
      visibleBtns[1] = totalBtns.value.slice(ui_activePage.value - 3, ui_activePage.value + 2)
      visibleBtns[2] = totalBtns.value.slice(totalPages.value-1, totalPages.value)
      visibleBtns[1].push("…");
      visibleBtns[1].unshift("…");
      
    }
    return visibleBtns.flatMap(elem => elem);

  })

  function updateActivePage() {
    if (ui_activePage.value > totalPages.value) {
      ui_activePage.value = totalPages.value
    }
  }


  function goToPageHandler() {
    if (validPageSelection.value) {
      ui_activePage.value = ui_goToPage.value
    }
  }

  watch(ui_activePage, () => {
    emit("updatePaginatedList", paginatedListComp)
  })

  onMounted( () => {
    emit("updatePaginatedList", paginatedListComp)
  })


</script>







<style>

.ui-pagination_nav select, .ui-pagination_nav input, .ui-pagination_nav button {
  text-align: center;
}

.ui-pagination_nav label {
  display: inline-block
}

.ui-pagination_btn-activePg {
  font-weight: 700;
}

.ui-pagination_btn {
  min-width: 4.25rem;
}

.ui-pagination_goToPage {
  width: 4ch;
  padding: 0.5rem;
}

.ui-pagination_showEntryQty {
  padding: 0.5rem;
}

.ui-pagination_nav {
  display: block;
}

.ui-pagination_row-actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.ui-pagination_row-actions > * > * {
  margin: 0rem 0.5rem;
}

</style>
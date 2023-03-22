<template>

  <nav class="ui-pagination_nav" aria-label="Pagination Navigation">
    <section class="ui-pagination_row-buttons">
      <button class="ui-pagination_btn ui-pagination_btn-arrow ui-pagination_btn-arrow_left" :disabled="!ui_previousPossible" @click="ui_activePage--" title="Previous Page" aria-label="Previous Page">
        <IconChevronLeft size="16" stroke-width="4"></IconChevronLeft>
      </button>
      <button 
        class="ui-pagination_btn"
        type="button"
        v-for="(pg) in visibleBtns"
        @click="ui_activePage=pg"
        :class="(pg == ui_activePage) ? 'ui-pagination_btn-activePg' : ''"
        :aria-current="pg == ui_activePage"
        :disabled="pg == '…'"
        :title="`Go to Page ${pg}`"
        :aria-label="(pg == ui_activePage) ? `Current Page, Page ${pg}` : `Go to Page ${pg}`"
      >
        {{ pg }}
      </button>
      <button class="ui-pagination_btn ui-pagination_btn-arrow ui-pagination_btn-arrow_right" :disabled="!ui_forwardPossible" @click="ui_activePage++" title="Next Page" aria-label="Next Page">
        <IconChevronRight size="16" stroke-width="4"></IconChevronRight>
      </button>
    </section>
    <div class="ui-pagination_row-actions">

      <div>
        <label for="ui-pagination_showEntryQty">Show per Page</label>
        <select id="ui-pagination_showEntryQty" class="ui-pagination_showEntryQty" v-model="ui_showentryqty" @change="updateActivePage" title="Number of entries to show per page" aria-label="Number of entries to show per page">
          <option v-for="value in [5, 10, 25, 50, 100]" :key="value"> {{value}}</option>
        </select>
      </div>

      <div>
        <label for="ui-pagination_goToPage">Go To Page</label>
        <input 
          id="ui-pagination_goToPage"
          class="ui-pagination_goToPage"
          type="number"
          size="5"
          :max="totalPages"
          @keydown.enter="goToPageHandler"
          v-model="ui_goToPage"
          aria-label="Enter the page number to go to"
        >
        <button :disabled="!validPageSelection" @click="goToPageHandler" :aria-label="`Go to Page ${ui_goToPage}`">Go</button>
      </div>

    </div>
    <p>Entries {{ ui_qtyVisible }} of {{ listToPaginate.length }}</p>

  </nav>

</template>


<script setup>


import { ref, onMounted, computed, toRefs, watch } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

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

  //@TODO: move this to DataTable instead?
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


  //TODO: add arguments -> caution: refs pass values only, reactive pass the proxy object, which is what we want here
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

.ui-pagination_btn-arrow svg {
  transition: transform 0.25s;
}

.ui-pagination_btn-arrow_right:hover svg {
  transform: translate(.25rem, 0);
}

.ui-pagination_btn-arrow_left:hover svg {
  transform: translate(-.25rem, 0);
}

</style>
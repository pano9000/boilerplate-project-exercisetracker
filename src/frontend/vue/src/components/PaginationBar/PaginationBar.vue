<template>

  <nav class="ui_pagination-nav">

    <div class="ui_pagination-row-buttons">
      <button :disabled="!ui_previousPossible" @click="ui_activePage--">&lt;</button>
      <button 
        class="btn-pagination"
        type="button"
        v-for="(pg) in visibleBtns"
        @click="ui_activePage=pg"
        :class="(pg == ui_activePage) ? 'activePg' : ''"
        :disabled="pg == '…'"
      >
        {{ pg }}
      </button>
      <button :disabled="!ui_forwardPossible" @click="ui_activePage++">&gt;</button>
    </div>
    <div class="ui_pagination-row-actions">
      <div>

        <label for="admin-ui_showentryqty">Show max. entries</label>
        <select id="admin-ui_showentryqty" v-model="ui_showentryqty" @change="updateActivePage">
          <option v-for="value in [5, 10, 25, 50, 100]" :key="value"> {{value}}</option>
        </select>

      </div>

      <div>
        <label>Page</label>
        <input 
          class="ui-jumpToPage"
          type="number"
          min="1"
          :max="totalPages"
          @keydown.enter="jumpToPageHandler"
          v-model="ui_jumpToPage"
        >
        <button :disabled="!validPageSelection" @click="jumpToPageHandler">Jump to Page</button>
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
  const ui_jumpToPage = ref(1)
  const ui_showentryqty = ref(5);
  const ui_forwardPossible = computed( () => (ui_activePage.value < totalPages.value) ? true : false);
  const ui_previousPossible = computed( () => (ui_activePage.value > 1) ? true : false); 
  const totalPages = computed( () => Math.ceil(listToPaginate.value.length / ui_showentryqty.value));

  const validPageSelection = computed( () => {
    return (Number.isInteger(ui_jumpToPage.value) 
            && ui_jumpToPage.value <= totalPages.value 
            && ui_jumpToPage.value > 0) ? true : false
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


  function jumpToPageHandler() {
    if (validPageSelection.value) {
      ui_activePage.value = ui_jumpToPage.value
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

.activePg {
  font-weight: 700;
}

.btn-pagination {
  min-width: 4.25rem;
}

.ui-jumpToPage {
  width: 4ch;
}

.ui_pagination-nav {
  display: block;
}

.ui_pagination-row-actions {
  display: flex;
  justify-content: center;
}

</style>
<template>


  <nav class="ui-pagination_nav" aria-label="Pagination Navigation">
      <ol class="ui-pagination_pagebuttons">
        <button 
          class="ui-pagination_btn ui-pagination_btn-arrow ui-pagination_btn-arrow_left"
          :disabled="!ui_previousPossible"
          title="Previous Page"
          aria-label="Previous Page"
          @click="props.listToPaginate.currentPage--"
        >
          <IconChevronLeft size="16" stroke-width="4"></IconChevronLeft>
        </button>

        <button 
          class="ui-pagination_btn"
          type="button"
          v-for="(pg) in visibleBtns"
          @click="props.listToPaginate.currentPage=pg"
          :class="[
            (pg == props.listToPaginate.currentPage) ? 'ui-pagination_btn-activePg' : null, 
            (pg == '…') ? 'ui-pagination_btn-placeholder' : null
          ]"
          :aria-current="pg == props.listToPaginate.currentPage"
          :disabled="pg == '…'"
          :title="`Go to Page ${pg}`"
          :aria-label="(pg == props.listToPaginate.currentPage) ? `Current Page, Page ${pg}` : `Go to Page ${pg}`"
        >
          {{ pg }}
        </button>

        <button
          class="ui-pagination_btn ui-pagination_btn-arrow ui-pagination_btn-arrow_right"
          :disabled="!ui_forwardPossible"
          title="Next Page"
          aria-label="Next Page"
          @click="props.listToPaginate.currentPage++"
        >
          <IconChevronRight size="16" stroke-width="4"></IconChevronRight>
        </button>
      </ol>

    <div class="ui-pagination_goToPage">
      <label for="ui-pagination_goToPage-input">Go To</label>
      <input 
        id="ui-pagination_goToPage-input"
        type="number"
        min="1"
        :max="props.listToPaginate.totalPages"
        @keydown.enter="goToPageHandler"
        v-model="ui_goToPage"
        aria-label="Enter the page number to go to"
      >
      <button :disabled="!validPageSelection" @click="goToPageHandler" :aria-label="`Go to Page ${ui_goToPage}`">Go</button>
    </div>

    <div class="ui-pagination_showEntryQty">
      <label for="ui-pagination_showEntryQty-select">Show</label>
      <select id="ui-pagination_showEntryQty-select" v-model="ui_showentryqty" @change="updateActivePage" title="Number of entries to show per page" aria-label="Number of entries to show per page">
        <option v-for="value in [5, 10, 25, 50, 100]" :key="value"> {{value}}</option>
      </select>
    </div>
    <div class="ui-pagination_entriesinfo">
      <span>{{ ui_qtyVisible }} of {{ props.listToPaginate.totalEntries }} entries</span>
    </div>


  </nav>

</template>


<script setup>


import { ref, onMounted, computed, toRefs, watch } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

  const props = defineProps(["listToPaginate", "allowSelection"]);
  const emit = defineEmits(["updateCurrentPage"]);
  const { listToPaginate, allowSelection } = toRefs(props);


  const ui_goToPage = ref(1)
  const ui_showentryqty = ref(5);
  const ui_forwardPossible = computed( () => (props.listToPaginate.currentPage < props.listToPaginate.totalPages) ? true : false);
  const ui_previousPossible = computed( () => (props.listToPaginate.currentPage > 1) ? true : false); 

  const validPageSelection = computed( () => {
    return (Number.isInteger(ui_goToPage.value) 
            && ui_goToPage.value <= props.listToPaginate.totalPages 
            && ui_goToPage.value > 0) ? true : false
  });

  const ui_qtyVisible = computed( () => {
    const from = (ui_showentryqty.value * (props.listToPaginate.currentPage-1)) + 1;
    const calcTo = ui_showentryqty.value * props.listToPaginate.currentPage;
    const to = (calcTo > props.listToPaginate.totalEntries) ? props.listToPaginate.totalEntries : calcTo;
    return `${from}–${to}`
  });

  const totalBtns = computed( () => {
    const totalBtns = [];
    for (let i=1; i<=props.listToPaginate.totalPages; i++) {
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
    if (props.listToPaginate.totalPages < 7) {
      visibleBtns[0] = totalBtns.value.slice(0, (props.listToPaginate.totalPages>5) ? 6 : props.listToPaginate.totalPages)
      return visibleBtns.flatMap(elem => elem);

    }
    if (props.listToPaginate.currentPage < 5) {
      visibleBtns[0] = totalBtns.value.slice(0, (props.listToPaginate.totalPages>5) ? 6 : props.listToPaginate.totalPages)
      visibleBtns[1] = ["…"]
      visibleBtns[2] = totalBtns.value.slice(props.listToPaginate.totalPages-1, props.listToPaginate.totalPages)
    }
    else if (props.listToPaginate.currentPage > props.listToPaginate.totalPages-4) {
      visibleBtns[0] = totalBtns.value.slice(0, 1);
      visibleBtns[1] = ["…"]
      visibleBtns[2] = totalBtns.value.slice(props.listToPaginate.totalPages - 6, props.listToPaginate.totalPages)

    } else {

      visibleBtns[0] = totalBtns.value.slice(0, 1)
      visibleBtns[1] = totalBtns.value.slice(props.listToPaginate.currentPage - 3, props.listToPaginate.currentPage + 2)
      visibleBtns[2] = totalBtns.value.slice(props.listToPaginate.totalPages-1, props.listToPaginate.totalPages)
      visibleBtns[1].push("…");
      visibleBtns[1].unshift("…");

    }
    return visibleBtns.flatMap(elem => elem);

  })

  function updateActivePage() {
    if (props.listToPaginate.currentPage > props.listToPaginate.totalPages) {
      props.listToPaginate.currentPage = props.listToPaginate.totalPages
    }
  }


  //TODO: add arguments -> caution: refs pass values only, reactive pass the proxy object, which is what we want here
  function goToPageHandler() {
    if (validPageSelection.value) {
      props.listToPaginate.currentPage = ui_goToPage.value
    }
  }

  watch(props.listToPaginate.currentPage, () => {
    emit("updateCurrentPage", props.listToPaginate.currentPage)
  })

  onMounted( () => {

  })


</script>







<style>

.ui-pagination_nav {
  background-color: lightgrey;
  border-radius: var(--border-radius);
  box-shadow: inset var(--box-shadow);
  display: flex;
  gap: .75rem;
  justify-content: start;
  margin: 1rem 0rem;
  padding: 0.5rem;
}

.ui-pagination_nav select, .ui-pagination_nav input, .ui-pagination_nav button {
  text-align: center;
}

.ui-pagination_nav ol {
  margin: 0;
  text-align: center;
}

.ui-pagination_nav label {
  display: inline-block
}

.ui-pagination_entriesinfo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.ui-pagination_pagebuttons, 
.ui-pagination_goToPage,
.ui-pagination_showEntryQty,
.ui-pagination_entriesinfo {
  padding: 0.75rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: azure;
}

.ui-pagination_btn-activePg {
  font-weight: 700;
}

.ui-pagination_btn {
  /*min-width: 4.25rem;*/
  padding: 0.6rem 0.8rem;
}

.ui-pagination_goToPage input {
  width: 4rem;
}

.ui-pagination_goToPage button,
.ui-pagination_showEntryQty select {
  padding: 0.6rem 0.8rem;
  margin: 0rem .5rem;
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


@media screen and (max-width: 600px)  {
  .ui-pagination_nav {
    flex-direction: column;
  }
  .ui-pagination_entriesinfo {
    margin-left: 0;
  }

}

</style>
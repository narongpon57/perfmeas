<template>
  <transition name="modal1-fade">
    <div class="modal1-backdrop">
      <div class="modal1"
        role="dialog"
        aria-labelledby="modal1Title"
        aria-describedby="modal1Description">
        <header class="modal1-header" id="modal1Title">
          <slot name="header">
            Organization Unit
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close modal1"
            >
              x
            </button>
          </slot>
        </header>
        <section
          class="modal1-body"
          id="modal1Description"
        >
          <slot name="body">
            <div class="container">
              <div class="row">
                <table class="table table-bg">
                  <thead class="table-head">
                    <th>Code</th>
                    <th>Type</th>
                    <th>Name</th>
                  </thead>
                  <tbody class="text-left">
                    <tr v-for="ou in organizationUnit" :key="ou.id">
                      <td>{{ ou.code }}</td>
                      <td>{{ ou.type }}</td>
                      <td>{{ ou.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </slot>
        </section>
        <footer class="modal1-footer">
          <slot name="footer">
           <button class="btn btn-info" @click="close">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>

export default {
  props: {
    organizationUnit: Array,
    default: null
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
  .modal1-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal1 {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 65%;
  }

  .modal1-header,
  .modal1-footer {
    padding: 15px;
    display: flex;
  }

  .modal1-header {
    border-bottom: 1px solid #eeeeee;
    color: #fff;
    font-weight: bold;
    justify-content: space-between;
    background-color: #2e9ad0;
    min-height: 55px;
  }

  .modal1-footer {
    min-height: 70px;
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal1-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #2e9ad0;
    border: 1px solid #2e9ad0;
    border-radius: 2px;
  }
  .table {
    font-size: 0.85rem;
    .desc {
      width: 55%;
    }
    .risk-type,
    .risk-group {
      width: 8%;
    }
  }
</style>

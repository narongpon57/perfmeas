<template>
  <transition name="modal1-fade">
    <div class="modal1-backdrop">
      <div class="modal1"
        role="dialog"
        aria-labelledby="modal1Title"
        aria-describedby="modal1Description">
        <header class="modal1-header" id="modal1Title">
          <slot name="header">
            {{ approve.status }}
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
              <div class="row form-group">
                <div class="col-md-12 text-left">
                  <label for="" class="font-normal">Comment</label>
                  <textarea v-model="approve.description" class="form-control" rows="5"></textarea>
                </div>
              </div>
            </div>
          </slot>
        </section>
        <footer class="modal1-footer">
          <slot name="footer">
            <button class="btn btn-info" @click="save">Save</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import CONSTANTS from '@/constants/assessment_status'

export default {
  data () {
    return {}
  },
  methods: {
    close () {
      this.$emit('close')
    },
    save () {
      const user = JSON.parse(localStorage.getItem('user'))
      let status = null
      if (parseInt(user.is_admin)) {
        status = this.approve.status.toLowerCase() === 'approve' ? CONSTANTS.QIKM_APPROVE : CONSTANTS.QIKM_REVIEW
      } else {
        status = this.approve.status.toLowerCase() === 'approve' ? CONSTANTS.MANAGER_APPROVE : CONSTANTS.MANAGER_REVIEW
      }
      const payload = {
        status: status,
        description: this.approve.description,
        assessment_id: this.assessment.id,
        approve_by: parseInt(user.is_admin) ? parseInt(user.id) : null,
        is_admin: parseInt(user.is_admin)
      }
      this.$store.dispatch('riskAssessment/approve', payload)
      this.$emit('close')
    }
  },
  computed: {
    ...mapFields('riskAssessment', [
      'approve',
      'assessment'
    ])
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
    height: 50%;
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

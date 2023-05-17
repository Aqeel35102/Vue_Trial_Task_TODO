<template>
  <div v-if="showModal" id="exampleModalLive" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: block; padding-right: 17px;" aria-modal="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{header}}</h5>
        </div>
        <div class="modal-body">
          <p>{{title}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
          @click="$emit('modalResponse', false)"
          >
            Close
          </button>
          <button type="button" class="btn btn-danger"
          @click="$emit('modalResponse', true)"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "deleteModal",
  props: {
    showModal: {
      type: Boolean,
      default:false
    },
    title: {
      type: String,
      default: "Are you sure You want to delete this item?",
    },
    header: {
      type: String,
      default: "Delete",
    },
  },
};
</script>
<style>
.modal{
    display: block !important;
}
</style>
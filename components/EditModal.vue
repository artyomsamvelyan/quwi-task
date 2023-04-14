<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>Edit form</p>
      <div class="edit-form">
        <div>
          <input v-model="inputValue" type="text" placeholder="Enter your new project name">
        </div>
        <div class="edit-button-area">
          <button class="close-button" @click="$emit('close')">Close</button>
          <button class="edit-button" type="submit" @click="$emit('submit')">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModal',

  props: {
    value: {
      type: String,
      default: ''
    },
  },
  
  data() {
    return {
      projectName: '',
    }
  },

  computed: {
    inputValue: {
      get() {
        return this.value
      },

      set(val) {
        this.$emit('input', val)
      }
    }
  },
}
</script>


<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  .modal {
    background-color: #fff;
    height: fit-content;
    border-radius: 10px;
    padding: 35px;
    margin-top: 10%;
    p {
      text-align: center;
      margin-bottom: 7px;
    }
    .edit-form {
      div {
        input {
          width: 100%;
          height: 60px;
          border: none;
          padding: 10px;
          border: 1px solid #888;
          border-radius: 7px;
        }
        input:focus {
          outline: none;
        }
      }
      .edit-button-area {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 25px;
        button {
          width: 100px;
          text-align: center;
          height: 40px;
          border: none;
          border-radius: 7px;
          color: #fff;
          cursor: pointer;
        }
        .edit-button {
          background-color: #51b057;
        }
        .close-button {
          background-color: #ea4335;
        }
      }
    }
  }
}
</style>
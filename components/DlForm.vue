<template>
  <div class="bg-gradient-to-r from-red-500 to-red-700 h-auto ">
    <div class=" max-w-2xl mx-auto">

      <h1 class="text-4xl text-center  font-semibold text-white  pt-3">{{headLine}}</h1>
      <h2 class=" text-center  font-medium text-white  pb-3">
        Download Pinterest video, Image and Gif online
      </h2>

      <form
        method="post"
        @submit.prevent="navToDl"
        class="flex p-2"
        autocomplete="on"
      >

        <input
          oninvalid="this.setCustomValidity('Please Enter Valid Link')"
          onvalid="this.setCustomValidity('')"
          required="required"
          type="text"
          v-on:input="updateValue($event.target.value)"
          onchange="this.setCustomValidity('')"
          placeholder="Enter Pinterest Link"
          class=" items-center w-full  m-0 p-4 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400 "
        >
        <button
          type="submit"
          class="focus:outline-transparent items-center font-medium text-red-500 w-28 text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
        >
          Download
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: { pinLink: String, navToDl: Function, headLine: String },
  data() {
    return {
      newvalue: this.pinLink,
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
  },
}
</script>


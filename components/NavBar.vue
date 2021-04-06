<template>
  <nav class="flex fixed w-full items-center shadow-md shadow-inner justify-center px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10 ">
    <NuxtLink to="/">
      <h4 class="text-center text-2xl font-bold font-mono"><span class="text-red-500">▶</span>Save<span class="text-red-500">⇣Roid</span><span class="">.com</span><span class="text-red-500">◀</span></h4>
    </NuxtLink>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty('overflow', 'hidden')
          else document.body.style.removeProperty('overflow')
        }
      },
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false
    })
  },
}
</script>
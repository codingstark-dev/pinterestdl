<template>
  <div class="pt-15">
    <dl-form
      v-model="pinLink"
      :navToDl="navToDl"
      headLine="Pinterest Video Downloader"
    />
    <br>
    <div v-if="errorAPi != null">
      <div v-if="errorAPi == true">
        <div
          v-if=" dataUrls.video
      !=undefined
      &&
      dataUrls.video
      !=null
      &&
      dataUrls.image
      !=undefined
      &&
      dataUrls.image
      !=null"
          class="max-w-md mx-auto"
        >

          <div class="flex justify-center mx-10 items-center content-center">

            <video
              :src="dataUrls.video.url"
              controls
              class="w-auto rounded-lg shadow-lg focus:outline-transparent "
            ></video>
          </div>
          <br>
          <div class="mx-5 mb-2">
            <a
              :href="'https://api.saveroid.com/download/'+randomNumber+'.mp4?url='+dataUrls.video.url"
              download
            ><button
                type="submit"
                class="focus:outline-transparent items-center font-medium text-red-500 w-full text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
              >
                Download Video In HD
              </button></a>
          </div>

          <div class="mx-5">
            <a
              :href="'https://api.saveroid.com/download/'+randomNumber+'.png?url='+dataUrls.image.url"
              download
            > <button
                type="submit"
                class="focus:outline-transparent items-center font-medium text-red-500 w-full text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
              >
                Download Image In HD </button></a>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-center mx-10 items-center content-center">

            <img
              :src="dataUrls.image.url"
              class="w-auto rounded-lg shadow-lg focus:outline-transparent "
            >
          </div>
          <br>
          <div class="mx-5">
            <a
              :href="'https://api.saveroid.com/download/'+randomNumber+'.mp4?url='+dataUrls.image.url"
              download
            ><button
                type="submit"
                class="focus:outline-transparent items-center font-medium text-red-500 w-full text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
              >
                Download Image In HD </button></a>
          </div>
        </div>
      </div>
      <div
        v-else-if="errorAPi == false"
        class="max-w-sm mx-auto"
      >
        <div
          class="mx-1 shadow bg-red-500 border-l-7 border-red-200 text-white p-4 rounded-md"
          role="alert"
        >
          <p class="font-bold">Error!! Incorrect Url.</p>
          <p class="text-sm">Please Check Your Url <b>"{{decodeURIComponent($route.query.dl)}}"</b></p>
        </div><br>
        <div
          class="mx-1 shadow bg-blue-500 border-l-7 border-blue-200 text-white p-4  rounded-md overflow-hidden"
          role="alert"
        >
          <p class="font-bold">Your Link Should Look Like This. </p>
          <p class="text-sm">
            https://in.pinterest.com/pin/585468020308380417/
            or
            https://pin.it/4tDmsbR</p>

        </div> {{dataUrls}}
      </div>
    </div>
    <br>
    <nuxt-content
      :document="content"
      class="prose-lg max-w-sm lg:max-w-5xl mx-auto"
    />

  </div>

</template>


<script>
export default {
  // middleware: 'pinterest',
  // computed: {
  //   errorAPi() {
  //     return this.$store.state.link.error
  //   },
  //   dataUrls() {
  //     return this.$store.state.link.list
  //   },
  // },

  data() {
    return {
      errorAPi: null,
      randomNumber: null,
      pinLink: '',
      dataUrls: null,
      // errorAPi: false,
    }
  },
  mounted() {
    console.log(process.env.BASE_URL)
    try {
      const queryData = decodeURIComponent(this.$route.query.dl)
      console.log(queryData)
      if (
        queryData.includes('pinterest.com/pin/') ||
        queryData.includes('pin.it')
      ) {
        if (queryData.includes('pin.it')) {
          var configExpandUrl = {
            method: 'get',
            url: process.env.BASE_URL + 'expandurl',
            headers: {
              url: queryData,
            },
          }
          return this.$axios(configExpandUrl)
            .then((result) => {
              if (
                result.data !== {} &&
                result.data != null &&
                result.data != ''
              ) {
                const pinID = result.data.split('/')[4]

                var config1 = {
                  method: 'get',
                  url: process.env.BASE_URL + 'pin',
                  headers: {
                    id: pinID,
                  },
                }
                return this.$axios(config1)
                  .then((result) => {
                    if (
                      result.data !== {} &&
                      result.data != null &&
                      result.data != ''
                    ) {
                      this.dataUrls = result.data
                      this.errorAPi = true
                      this.randomNumber = Math.floor(Math.random() * 1000) + 1
                    } else {
                      this.dataUrls = result.data
                      this.errorAPi = false
                      this.randomNumber = Math.floor(Math.random() * 1000) + 1
                    }
                  })
                  .catch((err) => {
                    console.error(err)
                    this.errorAPi = false
                    this.randomNumber = Math.floor(Math.random() * 1000) + 1
                  })
              } else {
                this.errorAPi = false
              }
            })
            .catch((err) => {
              console.error(err)
              this.errorAPi = false
            })
        } else if (queryData.includes('pinterest.com/pin/')) {
          const pinID = queryData.split('/')[4]
          var config2 = {
            method: 'get',
            url: process.env.BASE_URL + 'pin',
            headers: {
              id: pinID,
            },
          }
          return this.$axios(config2)
            .then((result) => {
              if (
                result.data !== {} &&
                result.data != null &&
                result.data != ''
              ) {
                console.log(result.data)
                this.dataUrls = result.data
                this.errorAPi = true
                this.randomNumber = Math.floor(Math.random() * 1000) + 1
              } else {
                this.dataUrls = result.data
                this.errorAPi = false
                this.randomNumber = Math.floor(Math.random() * 1000) + 1
              }
            })
            .catch((err) => {
              console.error(err)
              this.errorAPi = false
            })
        }
        this.errorAPi = false
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    navToDl() {
      window.location.href = `?dl=${this.pinLink}`

      // this.$router.push({
      //   path: 'pinterest-video-downloader',
      //   query: { dl: encodeURIComponent(this.pinLink) },
      // })
      // setTimeout(() => {
      //   window.location.reload()
      // }, 500)
    },
  },
  async asyncData({
    $content,
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    const content = await $content('blog/pinterest').fetch()
    return {
      content,
    }
  },
  // asyncData({
  //   $axios,
  //   isDev,
  //   route,
  //   store,
  //   env,
  //   params,
  //   query,
  //   req,
  //   res,
  //   redirect,
  //   error,
  // }) {
  //   try {
  //     const queryData = decodeURIComponent(query.dl)
  //     console.log(queryData)
  //     if (
  //       queryData.includes('pinterest.com/pin/') ||
  //       queryData.includes('pin.it')
  //     ) {
  //       if (queryData.includes('pin.it')) {
  //         var configExpandUrl = {
  //           method: 'get',
  //           url: env.BASE_URL + 'expandurl',
  //           headers: {
  //             url: queryData,
  //           },
  //         }
  //         return $axios(configExpandUrl)
  //           .then((result) => {
  //             if (
  //               result.data !== {} &&
  //               result.data != null &&
  //               result.data != ''
  //             ) {
  //               const pinID = result.data.split('/')[4]

  //               var config1 = {
  //                 method: 'get',
  //                 url: env.BASE_URL + 'pin',
  //                 headers: {
  //                   id: pinID,
  //                 },
  //               }
  //               return $axios(config1)
  //                 .then((result) => {
  //                   if (
  //                     result.data !== {} &&
  //                     result.data != null &&
  //                     result.data != ''
  //                   ) {
  //                     return {
  //                       dataUrls: result.data,
  //                       errorAPi: true,
  //                       randomNumber: Math.floor(Math.random() * 1000) + 1,
  //                     }
  //                   } else {
  //                     return {
  //                       dataUrls: result.data,
  //                       errorAPi: false,
  //                       randomNumber: Math.floor(Math.random() * 1000) + 1,
  //                     }
  //                   }
  //                 })
  //                 .catch((err) => {
  //                   error({ statusCode: 500, message: err })
  //                   console.error(err)
  //                   return {
  //                     errorAPi: false,
  //                     randomNumber: Math.floor(Math.random() * 1000) + 1,
  //                   }
  //                 })
  //             } else {
  //               return { errorAPi: false }
  //             }
  //           })
  //           .catch((err) => {
  //             error({ statusCode: 500, message: err })

  //             console.error(err)
  //             return { errorAPi: false }
  //           })
  //       } else if (queryData.includes('pinterest.com/pin/')) {
  //         const pinID = queryData.split('/')[4]
  //         var config2 = {
  //           method: 'get',
  //           url: env.BASE_URL + 'pin',
  //           headers: {
  //             id: pinID,
  //           },
  //         }
  //         return $axios(config2)
  //           .then((result) => {
  //             if (
  //               result.data !== {} &&
  //               result.data != null &&
  //               result.data != ''
  //             ) {
  //               return {
  //                 dataUrls: result.data,
  //                 errorAPi: true,
  //                 randomNumber: Math.floor(Math.random() * 1000) + 1,
  //               }
  //             } else {
  //               return {
  //                 dataUrls: result.data,
  //                 errorAPi: false,
  //                 randomNumber: Math.floor(Math.random() * 1000) + 1,
  //               }
  //             }
  //           })
  //           .catch((err) => {
  //             error({ statusCode: 500, message: err })
  //             console.error(err)
  //             return { errorAPi: false }
  //           })
  //       }
  //     } else {
  //       return { errorAPi: false }
  //     }
  //   } catch (error) {
  //     error({ statusCode: 500, message: error })
  //   }
  // },
}
</script>
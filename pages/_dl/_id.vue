<template>
  <div class=" pt-15">
    <nuxt-child :key="$route.fullPath"></nuxt-child>

    <div class="bg-gradient-to-r from-red-500 to-red-700 h-auto ">

      <h1 class="text-3xl text-center  font-semibold text-white  pt-3">Pinterest Video Downloader
      </h1>
      <h2 class=" text-center  font-medium text-white  pb-3">
        Download Pinterest video, Image and Gif online
      </h2>

      <form
        method="post"
        @submit.prevent="navToDl"
        class="flex p-2"
      >

        <input
          oninvalid="this.setCustomValidity('Please Enter Valid Link')"
          onvalid="this.setCustomValidity('')"
          required="required"
          type="text"
          v-model="pinLink"
          onchange="this.setCustomValidity('')"
          placeholder="Enter Pinterest Link"
          class=" items-center w-full  m-0 p-4 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400 "
        >
        <!-- <NuxtLink :to="{
          name:'tools-dl',
          params: { dl: pinLink}
          }"></NuxtLink> -->

        <button
          type="submit"
          class="focus:outline-transparent items-center font-medium text-red-500 w-28 text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
        >
          Download
        </button>

      </form>
    </div>
    <br>
    <div v-if="errorAPi == true">
      <div v-if=" dataUrls.video
      !=undefined
      &&
      dataUrls.video
      !=null
      &&
      dataUrls.image
      !=undefined
      &&
      dataUrls.image
      !=null">

        <div class="flex justify-center mx-10 items-center content-center">

          <video
            :src="dataUrls.video.url"
            controls
            class="w-auto rounded-lg shadow-lg focus:outline-transparent "
          ></video>
        </div>
        <br>
        <div class="mx-5 mb-2">
          <a :href="'https://test.filemay.com/download/'+randomNumber+'.mp4?url='+dataUrls.video.url"><button
              type="submit"
              class="focus:outline-transparent items-center font-medium text-red-500 w-full text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
            >
              Download Video In HD
            </button></a>
        </div>

        <div class="mx-5">
          <a
            :href="'blob:'+dataUrls.image.url"
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
            :href="'blob:'+dataUrls.image.url"
            download
          > <button
              type="submit"
              class="focus:outline-transparent items-center font-medium text-red-500 w-full text-center  p-1 h-12  outline-transparent bg-white border-4 rounded-2xl border-red-400  mx-2 text-md hover:(bg-red-500 text-white)"
            >
              Download Image In HD </button></a>
        </div>
      </div>
    </div>
    <div v-else-if="errorAPi == false">

      <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-red-500">
          <svg
            class="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <client-only>
              <span class="font-semibold text-red-500 dark:text-red-400">Error Incorrect Url</span>
              <p class="text-sm text-gray-600 dark:text-gray-200">Please Check Your Url <b>"{{decodeURIComponent($route.query.dl)}}"</b></p>
            </client-only>
          </div>
        </div>

      </div><br>
      <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-center w-12 bg-blue-500">
          <svg
            class="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <span class="font-semibold text-blue-500 dark:text-blue-400">Your Link Should Look Like This
            </span>
            <p class="text-sm text-gray-600 dark:text-gray-200">
              https://in.pinterest.com/pin/585468020308380417/
              or
              https://pin.it/4tDmsbR
            </p>
          </div>
        </div>
      </div>
    </div>
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
      randomNumber: null,
      pinLink: '',
      // dataUrls: null,
      // errorAPi: false,
    }
  },

  methods: {
    navToDl() {
      this.$router.push({
        path: 'dl',
        query: { dl: encodeURIComponent(this.pinLink) },
      })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
  },
  asyncData({
    $axios,
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
    console.log(Math.floor(Math.random() * 6) + 1)
    const queryData = decodeURIComponent(query.dl)
    if (
      queryData.includes('pinterest.com/pin/') ||
      queryData.includes('pin.it')
    ) {
      if (queryData.includes('pin.it')) {
        var configExpandUrl = {
          method: 'get',
          url: 'https://test.filemay.com/expandurl',
          headers: {
            url: queryData,
          },
        }
        return $axios(configExpandUrl)
          .then((result) => {
            if (
              result.data !== {} &&
              result.data != null &&
              result.data != ''
            ) {
              const pinID = result.data.split('/')[4]

              var config1 = {
                method: 'get',
                url: 'https://test.filemay.com/pin',
                headers: {
                  id: pinID,
                },
              }
              return $axios(config1)
                .then((result) => {
                  if (
                    result.data !== {} &&
                    result.data != null &&
                    result.data != ''
                  ) {
                    return {
                      dataUrls: result.data,
                      errorAPi: true,
                      randomNumber: Math.floor(Math.random() * 1000) + 1,
                    }
                  } else {
                    return {
                      dataUrls: result.data,
                      errorAPi: false,
                      randomNumber: Math.floor(Math.random() * 1000) + 1,
                    }
                  }
                })
                .catch((err) => {
                  console.error(err)
                  return {
                    errorAPi: false,
                    randomNumber: Math.floor(Math.random() * 1000) + 1,
                  }
                })
            } else {
              return { errorAPi: false }
            }
          })
          .catch((err) => {
            console.error(err)
            return { errorAPi: false }
          })
      } else if (queryData.includes('pinterest.com/pin/')) {
        const pinID = queryData.split('/')[4]
        var config2 = {
          method: 'get',
          url: 'https://test.filemay.com/pin',
          headers: {
            id: pinID,
          },
        }
        return $axios(config2)
          .then((result) => {
            if (
              result.data !== {} &&
              result.data != null &&
              result.data != ''
            ) {
              return {
                dataUrls: result.data,
                errorAPi: true,
                randomNumber: Math.floor(Math.random() * 1000) + 1,
              }
            } else {
              return {
                dataUrls: result.data,
                errorAPi: false,
                randomNumber: Math.floor(Math.random() * 1000) + 1,
              }
            }
          })
          .catch((err) => {
            console.error(err)
            return { errorAPi: false }
          })
      }
    } else {
      return { errorAPi: false }
    }
  },
}
</script><style>
.custom-shape-divider-top-1617389945 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1617389945 svg {
  position: relative;
  display: block;
  width: calc(115% + 1.3px);
  height: 101px;
}

.custom-shape-divider-top-1617389945 .shape-fill {
  fill: #ffffff;
}
</style>
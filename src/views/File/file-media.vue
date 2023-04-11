<template>
  <DashboardHeader title="All Media" description="" :icon="icon.fileIcon">
    <template v-slot:aside>
      <button
        type="button"
        class="bg-[#4E8D6D] md:px-6 px-4 py-2 rounded-[0.327rem] flex items-center"
      >
        <span
          class="font-poppins font-semibold md:text-[1rem] text-[0.8rem] text-[#fff] flex"
        >
          <img
            src="../../assets/plus-icon.png"
            class="md:w-[1rem] w-[0.6rem] md:h-[1rem] h-[0.6rem] mt-1 mr-2"
            alt=""
          />
          Add Media</span
        >
      </button>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div
      class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto"
    >
      <DashboardTableTitle v-if="propLoaded" :pageNumber="page" :ApiData="FilesList" @handleNext="handlleNext" @handlePrev="handlePrev">
        <template v-slot:section>
          <div class="md:w-[30%] w-[50%]">
            <label class="relative block">
              <span class="sr-only">Search</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img
                  src="../../assets/search-icon.png"
                  alt=""
                  class="w-[1rem] h-[1rem]"
                />
              </span>
              <input
                class="font-normal block w-full rounded-md py-2 pl-9 pr-3 placeholder:text-[#374957] md:text-[0.9rem] text-[0.7rem] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="Search media"
                type="text"
                name="search"
              />
            </label>
          </div>
        </template>
      </DashboardTableTitle>
      <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
        <template v-slot:tableBodyData>
          <div
            v-for="item in FilesList"
            :key="item.id"
            class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]"
          >
            <td>
              <div class="flex items-center">
                <div
                  class="bg-[#F3F6F9] w-[2.806rem] h-[2.806rem] rounded-[0.337rem] flex items-center justify-center"
                >
                  <img
                    v-if="item.file_type"
                    :src="
                      item.file_type === 'Image'
                        ? require('../../assets/image.png')
                        : item.file_type === 'Video'
                        ? require('../../assets/video.png')
                        : require('../../assets/document.png')
                    "
                    :alt="item.realm_name"
                    class="w-[1.1rem] h-[1.100rem]"
                  />
                </div>
                <div class="flex flex-col ml-3">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.realm_name
                  }}</span>
                  <span>{{ item.realm }}</span>
                </div>
              </div>
            </td>
            <td>
              <span class="text-[#464E5F]">{{ item.file_type }}</span>
            </td>
            <td>
              <div class="flex flex-col">
                <span class="capitalize text-[#464E5F] mb-0.5">{{
                  item.status
                }}</span>
              </div>
            </td>
            <td>
              <button v-if="item.file"
                type="button"
                class="bg-[#4E8D6D] px-6 py-2 rounded-[0.327rem] flex items-center"
              >
                <span
                  class="font-poppins font-semibold text-[10.28px] text-[#fff] flex"
                  v-on:click="downloadFile(item.file,item.file_type)"
                  >Download</span
                >
              </button>
            </td>
            <td> 
              <div class="flex items-center justify-end">
                <div
                  v-for="item in routerTableIcons"
                  :key="item.content"
                  class="bg-[#F3F6F9] w-[2rem] h-[2rem] rounded-[0.375rem] flex items-center justify-center ml-2"
                >
                  <button>
                    <img
                      :src="item.content"
                      alt="africa"
                      class="w-[1.125rem] h-[1.067rem]"
                    />
                  </button>
                </div>
              </div>
            </td>
          </div>
        </template>
      </SmeTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import { dashboard_routes } from "../../helpers/stub_data/dashboard_routes";
import {
  fileMedia as _fileMedia,
  fileMediaTableHeaders as _fileMediaTableHeaders,
  fileMediaTableIcons as _fileMediaTableIcons,
  dashboardHeadericon,
} from "../../helpers/stub_data/dashboard_routers";

import SmeTable from "../../components/reusable/SmeTable.vue";
import DashboardHeader from "../../components/markup/DashboardHeader.vue";
import DashboardTableTitle from "../../components/markup/DashboardTableTitle.vue";
import moment from "moment";
import axios from "axios";

export default defineComponent({
  name: "DashboardPage",
  components: {
    DashboardTableTitle,
    SmeTable,
    DashboardHeader,
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Realm");

    const routers = ref([..._fileMedia]);
    const routerTableHeaders = ref([..._fileMediaTableHeaders]);
    const routerTableIcons = ref([..._fileMediaTableIcons]);

    const center = ref({ lat: -1.8899577, lng: 30.0634073 });
    const markers = ref([
      {
        position: { lat: -1.8899577, lng: 30.0634073 },
      },
    ]);
    const isOpenModal = ref(false);
    return {
      routers,
      routerTableHeaders,
      routerTableIcons,
      center,
      markers,
      isOpenModal,
      tableName,
      icon,
    };
  },

  data() {
    return {
      propLoaded:false,
      page:1,
      perSize:10,
      FilesList: [
        {
          id: "",
          file_type: "",
          realm: "",
          realm_name: "",
          file: "",
          status: "",
          icon: "",
        },
      ],
    };
  },
  computed: {
    today() {
      return moment(Date.now()).format("MMMM Do");
    },
  },
  methods: {
    handlePrev(data: any){
      this.page--;
      this.getFilesData()
    },
    handlleNext(data:any){
      this.page++;
      this.getFilesData()
    },
    handleLogout() {
      router.push({ path: "/" });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },
    handleOpenOrCloseModal() {
      this.isOpenModal = !this.isOpenModal;
    },
    handleCloseModal() {
      if (this.isOpenModal) {
        this.isOpenModal = false;
      }
    },
    downloadFile(file: string,fileType:string) {
      axios({
        url: file,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileUrl;
        fileType === 'Image'?fileLink.setAttribute("download", "file.png"):fileType === 'Video'?fileLink.setAttribute("download", "file.mp4"):fileType === 'App'?fileLink.setAttribute("download", "file.zip"):fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    getFilesData() {
      axios
        .get("https://dev.api.shirikihub.com/api/v1/files/")
        .then((response) => {
          this.FilesList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getFilesData();
  },
});
</script>

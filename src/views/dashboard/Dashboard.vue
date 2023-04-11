<template>
  <DashboardHeader title="Allocated Routers" description="Home/routers" :icon="icon.router">
    <template v-slot:aside>
      <div class="bg-[#DCE9E3] px-3 py-2 rounded-[0.327rem] flex items-center">
        <span class="font-poppins font-medium md:text-[1rem] text-[0.60rem] text-[#959CBD]">Today:
          <span class="text-[#4E8D6D] font-semibold">{{ today }}</span></span>
        <img src="../../assets/today.png" alt="africa" class="w-[1.099rem] h-[1.062rem] rounded ml-1" />
      </div>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto">
      <DashboardTableTitle v-if="propLoaded" :perPageItems="perSize" :pageNumber="page" :ApiData="apiData"
        @handleNext="handlleNext" @handlePrev="handlePrev">
        <template v-slot:section>
          <div>
            <span class="font-poppins font-semibold md:text-[1.01rem] text-[0.9rem] text-[#212121]">Routers</span>
            <div class="flex items-center">
              <span class="text-[#B5B5C3] font-poppins font-medium text-[0.673rem]">Rows per page</span><span
                class="bg-[#F3F6F9] w-[1.739rem] h-[1.178rem] flex items-center justify-center ml-1 rounded-[0.337rem] text-[#464E5F] font-poppins font-semibold text-[0.673rem]">
                <select id="my-select" v-model="selectedOption" @change="onChange">
                  <option v-for="(option, index) in pageOptions" :value="option.value" :key="index">{{ option.value }}</option>
                </select></span>
            </div>
          </div>
        </template>
      </DashboardTableTitle>
      <SmeTable :tableHeaderData="routerTableHeaders" :table-name="tableName">
        <template v-slot:tableBodyData>
          <div v-for="item in routerList" :key="item.id"
            class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
            <td>
              <div class="flex items-center">
                <div class="bg-[#F3F6F9] w-[2.806rem] h-[2.806rem] rounded-[0.337rem] flex items-center justify-center">
                  <img
                    :src="item.location === 'In Transit' ? require('../../assets/router.png') : item.location === 'Manufacturer' ? require('../../assets/transit_router.png') : require('../../assets/active_router.png')"
                    :alt="item.nasidentifier" class="w-[1.89rem] h-[1.779rem]" />
                </div>
                <div class="flex flex-col ml-3">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.nasidentifier
                  }}</span>
                  <span>{{ item.serial_number }}</span>
                </div>
              </div>
            </td>
            <td>
              <span class="text-[#464E5F]">{{ item.imei }}</span>
            </td>
            <td>
              <div class="flex flex-col">
                <span class="capitalize text-[#464E5F] mb-0.5">{{
                  item.os_version_name
                }}</span>
                <span>version {{ item.os_version_id }}</span>
              </div>
            </td>
            <td>
              <span class="text-[#464E5F]">{{ item.model_number }}</span>
            </td>
            <td>
              <div class="flex flex-col">
                <span class="capitalize text-[#464E5F] mb-0.5">{{
                  item.ip_address
                }}</span>
                <span>{{ item.last_contact_ip }}</span>
              </div>
            </td>
            <td>
              <span class="text-[#464E5F]">{{ item.created }}</span>
            </td>
            <td>
              <div class="flex items-center justify-end">
                <div v-for="item in routerTableIcons" :key="item"
                  class="bg-[#F3F6F9] w-[2rem] h-[2rem] rounded-[0.375rem] flex items-center justify-center ml-2">
                  <button>
                    <img :src="item" alt="africa" class="w-[1.125rem] h-[1.067rem]" />
                  </button>
                </div>
              </div>
            </td>
          </div>
        </template>
      </SmeTable>
    </div>
    <div class="w-full lg:flex my-6 justify-between">
      <SmeAnalytics />
      <div class="bg-white lg:w-[29%] min-h-[21.432rem] rounded-[0.938rem] py-3 px-6 shadow lg:mb-0 mb-5">
        <span class="font-poppins font-semibold text-[0.9rem] text-[#212121]">Map</span>
        <div class="w-full mt-6">
          <GMapMap :center="center" :zoom="1" map-type-id="terrain" style="width: 100%; height: 25.75rem">
            <GMapCluster>
              <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                :draggable="true" @click="center = m.position" />
            </GMapCluster>
          </GMapMap>
        </div>
      </div>
      <SmeAds />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import {
  routers as _routers,
  routerTableHeaders as _routerTableHeaders,
  routerTableIcons as _routerTableIcons,
  dashboardHeadericon,
} from "../../helpers/stub_data/dashboard_routers";

import SmeTable from "../../components/reusable/SmeTable.vue";

import DashboardTableTitle from "../../components/markup/DashboardTableTitle.vue";
import SmeAnalytics from "../../components/markup/SmeAnalytics.vue";
import SmeAds from "../../components/markup/SmeAds.vue";
import DashboardHeader from "../../components/markup/DashboardHeader.vue";
import moment from "moment";
import axios from "axios";
import instance from '../../axios-interceptor';



export default defineComponent({
  name: "DashboardPage",
  components: {
    DashboardTableTitle,
    SmeTable,
    SmeAnalytics,
    SmeAds,
    DashboardHeader,
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Serial Number");

    const routers = ref([..._routers]);
    const routerTableHeaders = ref([..._routerTableHeaders]);
    const routerTableIcons = ref([..._routerTableIcons]);
    const center = ref({ lat: -1.8899577, lng: 30.0634073 });
    const markers = ref([
      {
        position: { lat: -1.8899577, lng: 30.0634073 },
      },
    ]);
    return {
      routers,
      routerTableHeaders,
      routerTableIcons,
      center,
      markers,
      tableName,
      icon,
    };
  },
  computed: {
    today() {
      return moment(Date.now()).format("MMMM Do");
    },
  },

  data() {
    return {
      pageOptions: [
        {value: 25 },
        {value: 10 },
        {value: 20 },
        {value: 30 },
        {value: 40 },
        {value: 50 }
      ],
      selectedOption: 10,
      apiData: [],
      propLoaded: false,
      page: 1,
      perSize: 10,
      routerList: [
        {
          id: '',
          nasidentifier: '',
          serial_number: '',
          icon: '',
          imei: '',
          os_version_name: '',
          os_version_id: '',
          location: '',
          model_number: '',
          ip_address: '',
          last_contact_ip: '',
          created: '',
        },
      ],
    };
  },

  methods: {
    handlePrev(data: any) {
      this.page--;
      this.getRouterData()
    },
    handlleNext(data: any) {
      this.page++;
      this.getRouterData()
    },
    handleLogout() {
      router.push({ path: "/" });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },
    getRouterData() {
      instance.get(`routers/?sme=1&page=${this.page}&page_size=${this.perSize}`)
        .then((response: { data: any; }) => {
          this.routerList = response.data.results;
          this.apiData = response.data
          this.propLoaded = true;
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
    onChange() {
      console.log(this.selectedOption);
      this.perSize = this.selectedOption// Do something with the selected option value
    }
  },
  mounted() {
    this.getRouterData();
  },
});
</script>

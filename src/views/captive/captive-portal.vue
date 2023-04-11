<template>
  <DashboardHeader title="Captive Portal" description="Home/routers" :icon="icon.captiveportal">
          <template v-slot:aside>
            <div class="bg-[#DCE9E3] px-3 py-2 rounded-[0.327rem] flex items-center">
              <span class="font-poppins font-medium md:text-[1rem] text-[0.60rem] text-[#959CBD]">Today: <span
                  class="text-[#4E8D6D] font-semibold">{{
                    today }}</span></span>
              <img src="../../assets/today.png" alt="africa" class="w-[1.099rem] h-[1.062rem] rounded ml-1" />
            </div>
          </template>
        </DashboardHeader>
   <div class="w-full my-3">
          <div class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3 md:px-6 px-3 shadow overflow-auto">
            <DashboardTableTitle>
              <template v-slot:section>
                <div>
                  <span class="font-poppins font-semibold md:text-[1.01rem] text-[0.9rem] text-[#212121]">Captive Portal templates</span>
                  <div class="flex items-center">
                    <span class="text-[#B5B5C3] font-poppins font-medium text-[0.673rem]">Management of captive portal
                      templates.</span>
                  </div>
                </div>
              </template>
            </DashboardTableTitle>
            <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
              <template v-slot:tableBodyData>
                <div v-for="item in routers" :key="item.id"
                  class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
                  <td>
                  <div class="flex items-center">
                    <div
                      class="bg-[#F3F6F9] w-[1.8rem] h-[1.8rem] rounded-[0.337rem] flex items-center justify-center">
                    </div>
                    <div class="flex flex-col ml-3">
                      <span class="capitalize text-[#464E5F] mb-0.5">{{
                        item.router.name
                      }}</span>
                      <span>{{ item.router.number }}</span>
                    </div>
                  </div>
                </td>
              <td>
                  <div class="flex flex-col">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.lastContactIp.ipAddress
                    }}</span>
                  </div>
                </td>
              <td>
                  <span class="text-[#464E5F]">{{ item.modelNumber }}</span>
                </td>
              <td>
                <div class="flex items-center justify-end">
                  <div v-for="item in routerTableIcons" :key="item.content"
                      class="bg-[#F3F6F9] rounded-[0.375rem] flex items-center justify-center ml-2">
                      <button v-if="item.type == 'img'" class="w-[2rem] h-[2rem] text-center">
                        <img :src="item.content" alt="africa" class="w-[1.125rem] h-[1.067rem] mx-auto" />
                      </button>
                      <button v-if="item.type == 'text'"
                        class="bg-[#F3F6F9] text-[#4E8D6D] rounded-[0.375rem] font-semibold rounded-[0.432rem] py-2 px-3">
                        {{ item.content }}
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
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { dashboard_routes } from '../../helpers/stub_data/dashboard_routes';
import {
  captive as _captive,
  captiveTableHeaders as _captiveTableHeaders,
  captiveTableIcons as _captiveTableIcons,
  dashboardHeadericon
} from '../../helpers/stub_data/dashboard_routers';
import SmeTable from '../../components/reusable/SmeTable.vue';
import DashboardTableTitle from '../../components/markup/DashboardTableTitle.vue';
import moment from 'moment';
import DashboardHeader from '../../components/markup/DashboardHeader.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardTableTitle,
    SmeTable,
    DashboardHeader
  },
  setup() {
    const icon = ref({...dashboardHeadericon});
    const tableName = ref("Name")
    const routers = ref([..._captive]);
    const routerTableHeaders = ref([..._captiveTableHeaders]);
    const routerTableIcons = ref([..._captiveTableIcons]);
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
      icon
    };
  },
  computed: {
    today() {
      return moment(Date.now()).format('MMMM Do');
    },
  },
  methods: {
    handleLogout() {
      router.push({ path: '/' });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },
    
  },
});
</script>

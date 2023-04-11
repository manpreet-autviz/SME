<template>
  
  <DashboardHeader title="All Vouchers" description="" :icon="icon.voucher">
          <template v-slot:aside>
            <button type="button" class="bg-[#4E8D6D] md:px-6 px-4 py-2 rounded-[0.327rem] flex items-center">
              <span class="font-poppins font-semibold md:text-[1rem] text-[0.8rem] text-[#fff] flex"><img
                  src="../../assets/plus-icon.png" class="md:w-[1rem] w-[0.6rem] md:h-[1rem] h-[0.6rem] mt-1 mr-2" alt=""> Generate new voucher (s)</span>
              </button>
          </template>
        </DashboardHeader>
  <div class="w-full my-3">
          <div class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3  md:px-6 px-3 shadow overflow-auto">
            <DashboardTableTitle>
              <template v-slot:section>
                <div class="md:w-[30%] w-[50%]">
                  <label class="relative block">
                    <span class="sr-only">Search</span>
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                      <img src="../../assets/search-icon.png" alt="" class="w-[1rem] h-[1rem]">
                    </span>
                    <input
                      class="font-normal block  w-full rounded-md py-2 pl-9 pr-3 placeholder:text-[#374957] md:text-[0.9rem] text-[0.7rem] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                      placeholder="Search vouchers" type="text" name="search" />
                  </label>
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
                      class="bg-[#F3F6F9] w-[2.806rem] h-[2.806rem] rounded-[0.337rem] flex items-center justify-center">
                      <img :src="item.router.icon" :alt="item.router.name" class="w-[1.89rem] h-[1.100rem]" />
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
                  <span class="text-[#464E5F]">{{ item.modelNumber }}</span>
                </td>
              <td>
                  <div class="flex flex-col">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.lastContactIp.ipAddress
                    }}</span>
                    <span>{{ item.lastContactIp.details }}</span>
                  </div>
                </td>
              <td>
                  <span class="text-[#464E5F]">{{
                    getDate(item.date)
                  }}</span>
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

        </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { dashboard_routes } from '../../helpers/stub_data/dashboard_routes';
import {
  vouchers as _vouchers,
  voucherTableHeaders as _voucherTableHeaders,
  voucherTableIcons as _voucherTableIcons,
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
    const tableName = ref("Vouchers Code")
    const routes = ref([...dashboard_routes]);
    const routers = ref([..._vouchers]);
    const routerTableHeaders = ref([..._voucherTableHeaders]);
    const routerTableIcons = ref([..._voucherTableIcons]);
    const activeId = ref(1);
    const center = ref({ lat: -1.8899577, lng: 30.0634073 });
    const markers = ref([
      {
        position: { lat: -1.8899577, lng: 30.0634073 },
      },
    ]);
    const isOpenModal = ref(false);
    return {
      routes,
      activeId,
      routers,
      routerTableHeaders,
      routerTableIcons,
      center,
      markers,
      isOpenModal,
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
    handleSetActive(id: number) {
      this.activeId = id;
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
  },
  
});
</script>

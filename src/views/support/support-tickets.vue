<template>
  <DashboardHeader title="Support Tickets" description="" :icon="icon.SupportTickets">
    <template v-slot:aside>
      <button type="button" class="bg-[#4E8D6D] md:px-6 px-4 py-2 rounded-[0.327rem] flex items-center">
        <span class="font-poppins font-semibold md:text-[1rem] text-[0.8rem] text-[#fff] flex"><img
            src="../../assets/plus-icon.png" class="md:w-[1rem] w-[0.6rem] md:h-[1rem] h-[0.6rem] mt-1 mr-2" alt=""> Add
          Media</span>
      </button>
    </template>
  </DashboardHeader>
  <div class="w-full my-3">
    <div class="bg-white w-full min-h-[25rem] rounded-[0.938rem] py-3  md:px-6 px-3 shadow overflow-auto">
      <DashboardTableTitle v-if="propLoaded" :perPageItems="perSize" :pageNumber="page" :ApiData="apiData"
        @handleNext="handlleNext" @handlePrev="handlePrev">
        <template v-slot:section>
          <div class="md:w-[30%] w-[50%]">
            <label class="relative block">
              <span class="sr-only">Search</span>
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="../../assets/search-icon.png" alt="" class="w-[1rem] h-[1rem]">
              </span>
              <input
                class="font-normal block  w-full rounded-md py-2 pl-9 pr-3 placeholder:text-[#374957] md:text-[0.9rem] text-[0.7rem] placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full focus:ring-1"
                placeholder="Search Tickets" type="text" name="search" />
            </label>
          </div>
        </template>
      </DashboardTableTitle>
      <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
        <template v-slot:tableBodyData>
          <div v-for="item in supportTicketList" :key="item.id"
            class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
            <td>
              <div class="flex items-center">
                <div v-if="item.ticketId" class="bg-[#F3F6F9] w-[1.8rem] h-[1.8rem] rounded-[0.337rem] flex items-center justify-center">
                </div>
                <div class="flex flex-col ml-3">
                  <span class="capitalize text-[#464E5F] mb-0.5">{{
                    item.ticketId
                  }}</span>

                </div>
              </div>
            </td>
            <td>
              <div class="flex flex-col">
                <span class="capitalize text-[#464E5F] mb-0.5">{{
                  item.message
                }}</span>
              </div>
            </td>
            <td>
              <span class="text-[#464E5F]">{{ item.created }}</span>
            </td>
            <td>
              <span class="text-[#464E5F]">{{ item.status }}</span>
            </td>
            <td v-if="item.ticketId">
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
    <div class="w-full md:flex my-6 justify-between">
      <div  class="bg-white md:w-[49%] min-h-[21.432rem] rounded-[0.938rem] py-4 px-6 shadow md:mb-0 mb-4 overflow-auto">
        <span class="font-poppins font-semibold text-[0.8rem] text-[#212121]">ROUTER DEPARTMENT</span>
        <div class="w-full mt-6">
          <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
            <template v-slot:tableBodyData>
              <div v-for="item in supportRouterTicketList" :key="item.id"
                class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
                <td>
                  <div class="flex items-center">
                    <div v-if="item.ticketId" class="bg-[#F3F6F9] w-[1.8rem] h-[1.8rem] rounded-[0.337rem] flex items-center justify-center">
                    </div>
                    <div class="flex flex-col ml-3">
                      <span class="capitalize text-[#464E5F] mb-0.5">{{
                        item.ticketId
                      }}</span>

                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.message
                    }}</span>
                  </div>
                </td>
                <td>
                  <span class="text-[#464E5F]">{{ item.created }}</span>
                </td>
                <td>
                  <span class="text-[#464E5F]">{{ item.status }}</span>
                </td>
                <td v-if="item.ticketId">
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
      <div class="bg-white md:w-[49%] min-h-[21.432rem] rounded-[0.938rem] py-4 px-6 shadow md:mb-0 mb-3  overflow-auto">
        <span class="font-poppins font-semibold text-[0.8rem] text-[#212121]">OTHERS</span>
        <div class="w-full mt-6">
          <SmeTable :tableName="tableName" :tableHeaderData="routerTableHeaders">
            <template v-slot:tableBodyData>
              <div v-for="item in supportOtheTicketList" :key="item.id"
                class="table-layout-tr py-2 my-3 uppercase rounded-[0.337rem] flex items-center justify-between text-[#B5B5C3] font-poppins font-semibold text-[0.673rem]">
                <td>
                  <div class="flex items-center">
                    <div v-if="item.ticketId" class="bg-[#F3F6F9] w-[1.8rem] h-[1.8rem] rounded-[0.337rem] flex items-center justify-center">
                    </div>
                    <div class="flex flex-col ml-3">
                      <span class="capitalize text-[#464E5F] mb-0.5">{{
                        item.ticketId
                      }}</span>

                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex flex-col">
                    <span class="capitalize text-[#464E5F] mb-0.5">{{
                      item.message
                    }}</span>
                  </div>
                </td>
                <td>
                  <span class="text-[#464E5F]">{{ item.created }}</span>
                </td>
                <td>
                  <span class="text-[#464E5F]">{{ item.status }}</span>
                </td>
                <td v-if="item.ticketId">
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
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import router from '@/router';
import { dashboard_routes } from '../../helpers/stub_data/dashboard_routes';
import {
  support as _support,
  supportTableHeaders as _supportTableHeaders,
  supportTableIcons as _supportTableIcons,
  dashboardHeadericon
} from '../../helpers/stub_data/dashboard_routers';
import SmeTable from '../../components/reusable/SmeTable.vue';
import DashboardTableTitle from '../../components/markup/DashboardTableTitle.vue';
import moment from 'moment';
import DashboardHeader from '../../components/markup/DashboardHeader.vue'
import instance from '@/axios-interceptor';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardTableTitle,
    SmeTable,
    DashboardHeader
  },
  setup() {
    const icon = ref({ ...dashboardHeadericon });
    const tableName = ref("Ticket ID")
    const routers = ref([..._support]);
    const routerTableHeaders = ref([..._supportTableHeaders]);
    const routerTableIcons = ref([..._supportTableIcons]);
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

  data() {
    return {
      apiData: [],
      propLoaded: false,
      page: 1,
      perSize: 10,
      supportTicketList: [
        {
          id: '',
          ticketId: '',
          message: '',
          status: '',
          created: '',
        },
      ],
      supportRouterTicketList: [
        {
          id: '',
          ticketId: '',
          message: '',
          status: '',
          created: '',
        },
      ],
      supportOtheTicketList: [
        {
          id: '',
          ticketId: '',
          message: '',
          status: '',
          created: '',
        },
      ],
    };
  },
  methods: {
    handleLogout() {
      router.push({ path: '/' });
    },
    getDate(date: Date | number) {
      return moment(date).calendar();
    },
    handlePrev(data: any) {
      this.page--;
      this.getSupportData()
    },
    handlleNext(data: any) {
      this.page++;
      this.getSupportData()
    },
    getSupportData() {
      instance.get(`tickets/?user__sme=1&page=${this.page}&page_size=${this.perSize}`)
        .then((response: { data: any; }) => {
          this.supportTicketList = response.data;
          this.apiData = response.data
          this.propLoaded = true;
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
    getSupportRouterData() {
      instance.get(`tickets/?user__sme=1&page=${this.page}&page_size=${this.perSize}`)
        .then((response: { data: any; }) => {
          this.supportRouterTicketList = response.data;
          this.apiData = response.data
          this.propLoaded = true;
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
    getSupportOtherData() {
      instance.get(`tickets/?user__sme=1&page=${this.page}&page_size=${this.perSize}`)
        .then((response: { data: any; }) => {
          this.supportOtheTicketList = response.data;
          this.apiData = response.data
          this.propLoaded = true;
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
    mounted() {
      this.getSupportData();
      this.getSupportRouterData();
      this.getSupportOtherData();
    },
  },
});
</script>

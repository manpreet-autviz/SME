<template>
  <div class="bg-white max-h-[4.188rem] flex py-3">
    <div class="md:w-[8vw] w-[18vw] md:flex items-center justify-center">
      <img src="../../assets/ared-africa.png" alt="africa" class="w-[3.188rem]" />
    </div>
    <div class="flex w-full justify-between items-center lg:mx-12 mx-3">
      <button type="button"
        class="max-w-[21.438rem] md:px-6 px-4 md:h-[2.938rem] h-[1.938rem] bg-light rounded-md text-primary font-poppins font-semibold md:text-[1.062rem] text-[0.60rem]">
        ARED SME PORTAL - {{ companyLabel }}
      </button>
      <div class="min-w-[10vw] flex items-center justify-between relative md:flex hidden">
        <img src="../../assets/usa-flag.png" alt="africa" class="w-[1.388rem] rounded md:mx-12 md:block hidden" />
        <button class="flex flex-row items-center z-10" @click.stop="handleOpenOrCloseModal">
          <div class="flex flex-col items-end justify-end mr-2">
            <span class="text-textLight font-medium text-[0.75rem] font-poppins">Hello</span>
            <span class="font-semibold text-[0.75rem] font-poppins text-black">{{ full_name}}
            </span>
          </div>
          <img :src="profile_pic" alt="africa" class="w-[2rem] h-[2rem] rounded-[1rem]" />
        </button>
        <div v-if="isOpenModal"
          class="absolute w-[10vw] min-h-[5vh] bg-white shadow top-[3.188rem] right-0 flex items-center justify-end">
          <button @click.stop="handleLogout"
            class="px-3 py-2 hover:bg-light hover:text-primary w-full font-bold text-[0.75rem] font-poppins">
            Sign Out
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between relative block lg:hidden toggle-btn" @click.stop="onToggle" >
        <span @click="toggleActive" :class="[isToggleicon ? 'open' : 'close']"></span>
      </div>
    </div> 
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import router from '@/router';
import { User } from '../../helpers/types/user';
import axios from 'axios';
import instance from '@/axios-interceptor';

export default defineComponent({
  name: 'DashboardTopNav',
  props: {
    isOpenModal: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    companyLabel: {
      type: String as PropType<string>,
      default: 'RESTAURANT 1',
    },
    user: {
      type: Object as PropType<User>,
      default: () => {
        return {
          name: `${process.env.VUE_APP_TEST_USER_FIRST_NAME} ${process.env.VUE_APP_TEST_USER_LAST_NAME}`,
          country: `${process.env.VUE_APP_TEST_USER_COUNTRY}`,
          avatar: `${process.env.VUE_APP_TEST_USER_AVATAR}`,
        };
      },
    },
  },
  setup() {
    const flag = ref<string>('');
    const isToggleicon = ref(false);
    return {
      flag,
      isToggleicon
    };
  },
  data(){
    return{
      full_name:'',
      profile_pic:require('../../assets/avatar.png')
    }
  },
  async created() {
    const response = await instance.get(
      `India?fields=flags`
    );
    this.flag = response.data[0].flags.png;
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('access_token');
      router.push({ path: '/' });
    },
    handleOpenOrCloseModal() {
      this.$emit('handleOpenOrCloseModal');
    },
    onToggle(){
      this.$emit('onToggle');
    },
    toggleActive() {
      this.isToggleicon = !this.isToggleicon;
    },

    getuserData() {
      instance.get(`auth/users/me/`)
        .then((response: { data: any; }) => {  
          this.full_name = response.data.full_name;
          this.profile_pic = response.data.profile_pic|| this.profile_pic
        })
        .catch((error: any) => {
          console.error(error);
        });
    },
  },
  
  mounted() {
    this.getuserData();
  }
});
</script>

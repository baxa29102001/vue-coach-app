import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './coaches/CoachDetail.vue';
import CoachesList from './coaches/CoachesList.vue';
import CoachRegister from './coaches/CoachRegister.vue';
import ContactCoach from './requests/ContactCoach.vue';
import RequestRecive from './requests/RequestRecive.vue';
import NotFound from './NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    { path: '/register', component: CoachRegister },
    { path: '/requests', component: RequestRecive },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});
export default router;

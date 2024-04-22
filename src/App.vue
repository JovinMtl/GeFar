<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { 
  IonApp, IonRouterOutlet,
} from '@ionic/vue';
export default{
  components:{
    IonRouterOutlet, IonApp,
  }
}
</script>

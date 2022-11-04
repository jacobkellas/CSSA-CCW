import { onBeforeUnmount, onMounted } from 'vue';

/**
 * useInterval composable which emits every x milliseconds
 * @param delay number in milliseconds
 */
export default function useInterval(fn, delay: number) {
  let interval;

  onMounted(() => {
    interval = window.setInterval(fn, delay);
  });

  onBeforeUnmount(() => window.clearInterval(interval));
}

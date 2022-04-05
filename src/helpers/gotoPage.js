import eventBus from '@/eventBus';

export default function gotoPage(page, params) {
  eventBus.$emit('gotoPage', page, params);
}

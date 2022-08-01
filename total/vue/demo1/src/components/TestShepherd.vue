<template>
  <div>
    Testing
  </div>
</template>

<script>
  export default {
    name: 'ShepherdExample',
    mounted() {
      this.$nextTick(() => {
        const tour = this.$shepherd({
          useModalOverlay: true,
          confirmCancel: true,
          confirmCancelMessage: '确定取消吗？',

        });

        tour.addStep({
          attachTo: { element: this.$el, on: 'bottom' },
          text: 'Test',
          buttons: [
            {
                action(){return this.cancel()},
                text:'cancel',
                classes: 'back-button'
            },
            {
                action(){return this.next()},
                text: 'next'
            }
            ],
            classes:'container',
            when: {
                show: function() {
                    window.scrollTo(0,0)
                }
            },
        });

        tour.start();
      });
    }
  };
</script>

<style>
@import '~shepherd.js/dist/css/shepherd.css';
</style>
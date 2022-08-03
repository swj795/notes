<template>
  <div class="container">
    <div class="one box">one</div>
    <div class="two box">two</div>
    <div class="three box">three</div>
  </div>
</template>

<script>
export default {
  name: "ShepherdExample",
  mounted() {
    this.$nextTick(() => {
      const tour = this.$shepherd({
        useModalOverlay: true,
        confirmCancel: true,
        confirmCancelMessage: "确定要退出吗？",
        exitOnEsc: true,
        classPrefix: "my-tour-",
        defaultStepOptions: {
          classes: "shepherd-theme-custom",
          cancelIcon: {
            enabled: true,
          },
          scrollTo: {
            behavior: "smooth",
            block: "center",
          },
        },
      });

      tour.addSteps([
        {
          //   arrow: false,
          attachTo: { element: ".one", on: "bottom" },
          title: "one",
          text: "We can go next or skip",
          buttons: [
            {
              action() {
                return this.hide();
              },
              text: "skip",
              secondary: true,
              classes: "skip-button",
            },
            {
              action() {
                return this.next();
              },
              text: "next",
              secondary: true,
            },
          ],
        },
        {
          attachTo: { element: ".two", on: "right" },
          title: "two",
          text: "We can go back or go next ",
          buttons: [
            {
              action() {
                return this.back();
              },
              text: "back",
              classes: "back-button",
              secondary: true,
            },
            {
              action() {
                return this.next();
              },
              text: "next",
              secondary: true,
            },
          ],
        },
        {
          attachTo: { element: ".three", on: "bottom" },
          title: "three",
          text: "We can complete or go back",
          buttons: [
            {
              action() {
                return this.back();
              },
              text: "back",
              classes: "back-button",
              secondary: true,
            },
            {
              action() {
                return this.complete();
              },
              text: "done",
              secondary: true,
            },
          ],
        },
      ]);

      tour.start();
    });
  },
};
</script>

<style>
@import "~shepherd.js/dist/css/shepherd.css";
.container {
  display: flex;
  justify-content: space-between;
}
.box {
  width: 200px;
  height: 200px;
}

.one {
  background-color: aqua;
}

.two {
  background-color: antiquewhite;
}

.three {
  background-color: aquamarine;
}
.shepherd-footer {
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 .75rem .75rem;
}
.shepherd-footer .shepherd-button:last-child {
    margin-right: 0;
  }
.shepherd-footer .shepherd-progress {
    font-size: .8rem;
  }
</style>

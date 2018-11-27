<template>
    <div class="askDelModel card">
      <div class="card-body">
        <h5 class="permatently">Are you sure you want to permanently delete this project?</h5>
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.askDelModel {
  width: 400px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 20px;
  z-index: 100;
}
.askdel-fade {
  position: absolute;
  background: rgba(0, 0, 0, 0.685);
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
}
.askdel-enter-active {
  animation: slideInDownModel 700ms;
}
.askdel-leave-active {
  animation: slideOutUpModel 700ms;
}
.askDelModel h5 {
  line-height: 28px;
}
@-webkit-keyframes slideInDownModel {
  from {
    -webkit-transform: translate3d(0, -100%, 0) translate(-50%);
    transform: translate3d(0, -100%, 0) translate(-50%);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0) translate(-50%);
    transform: translate3d(0, 0, 0) translate(-50%);
  }
}

@keyframes slideInDownModel {
  from {
    -webkit-transform: translate3d(0, -100%, 0) translate(-50%);
    transform: translate3d(0, -100%, 0) translate(-50%);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0) translate(-50%);
    transform: translate3d(0, 0, 0) translate(-50%);
  }
}

@-webkit-keyframes slideOutUpModel {
  from {
    -webkit-transform: translate3d(0, 0, 0) translate(-50%);
    transform: translate3d(0, 0, 0) translate(-50%);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0) translate(-50%);
    transform: translate3d(0, -100%, 0) translate(-50%);
  }
}

@keyframes slideOutUpModel {
  from {
    -webkit-transform: translate3d(0, 0, 0) translate(-50%);
    transform: translate3d(0, 0, 0) translate(-50%);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -110%, 0) translate(-50%);
    transform: translate3d(0, -110%, 0) translate(-50%);
  }
}
</style>

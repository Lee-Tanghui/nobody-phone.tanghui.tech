var randomNumberGenerator = (length) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  )
};``

var app2 = new Vue({
  el: '#app',
  mounted() {
    this.number = this.getRandomNumber();
    this.initType(this.number);

    // 初始化复制
    this.clipboard = new ClipboardJS('.copy-icon');
  },
  data: {
    number: '',
    typed: null,
    clipboard: null,
  },
  methods: {
    getRandomNumber() {
      const prefix = ['10', '11', '12', '14'][Math.floor(Math.random() * 4)];
      return prefix + randomNumberGenerator(9);
    },
    initType(number) {
      this.typed = new Typed('.number_input', {
        strings: [number], //输入内容, 支持html标签
        typeSpeed: 60,
        backSpeed: 50,
      });
    },
    copy() {
      const copyIcon = document.querySelector('.copy-icon');
      copyIcon.setAttribute('aria-label', '复制成功');
      setTimeout(() => {
        copyIcon.setAttribute('aria-label', '复制');
      }, 2000);
    },
    refresh() {
      const refreshIcon = document.querySelector('.refresh-icon');
      this.number = this.getRandomNumber();
      // this.typed.strings.push('xxx')
      // refreshIcon.setAttribute('aria-label', '刷新成功');
      // setTimeout(() => {
      //   refreshIcon.setAttribute('aria-label', '刷新');
      // }, 2000);
    }
  }
})
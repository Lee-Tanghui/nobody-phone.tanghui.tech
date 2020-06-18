var randomNumberGenerator = (length) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  )
};

var db = {
  container: '.db-container',
  KEY: 'NOBODY_NUMBER_DB',
  getAll() {
    try {
      const dbRes = localStorage.getItem(db.KEY);
      return dbRes ? JSON.parse(dbRes) : [];
    } catch(err) {
      localStorage.setItem(db.KEY, JSON.stringify([]));
      return [];
    }
  },
  set(number) {
    const dbRes = this.getAll();
    if (dbRes.indexOf(number) !== -1) {
      dbRes.splice(dbRes.indexOf(number), 1);
    }
    dbRes.unshift(number);
    if (dbRes.length > 10) {
      dbRes.splice(10)
    }
    localStorage.setItem(db.KEY, JSON.stringify(dbRes));
  },
}

var app2 = new Vue({
  el: '#app',
  mounted() {
    this.number = this.getRandomNumber();
    this.initType(this.number);
    this.dbList = db.getAll();
  },
  data: {
    number: '',
    typed: null,
    clipboard: null,
    dbList: []
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
      db.set(this.number);
      this.dbList = db.getAll();
      copyIcon.setAttribute('aria-label', '复制成功');
      setTimeout(() => {
        copyIcon.setAttribute('aria-label', '复制');
      }, 1200);
    },
    refresh() {
      const refreshIcon = document.querySelector('.refresh-icon');
      this.number = this.getRandomNumber();
      this.typed.destroy();
      this.initType(this.number)
      refreshIcon.setAttribute('aria-label', '刷新成功');
      setTimeout(() => {
        refreshIcon.setAttribute('aria-label', '刷新');
      }, 1200);
    },
    copyCache(index) {
      this.$copyText(this.dbList[index]).then(() => {
        const copyIcon = document.querySelector(`[data-index="${index}"]`)
        copyIcon.setAttribute('aria-label', '复制成功');
        setTimeout(() => {
          copyIcon.setAttribute('aria-label', '复制');
        }, 1200);
      })
    }
  }
})
//汽车列表
const carList = [
  {
    "key": "B",
    "row": [{
      "code": "brand-30",
      "img": "http://img.souche.com/files/tangeche/n7s5lnUKD9.png",
      "name": "别克",
      "price": 20000
    },
    {
      "code": "brand-23",
      "img": "http://img.souche.com/files/tangeche/218K7dxQWe.png",
      "name": "北京汽车",
      "price": 10000
    },
    {
      "code": "brand-534",
      "img": "http://img.souche.com/files/tangeche/hy6753ghfM.png",
      "name": "北汽绅宝",
      "price": 10000
    },
    {
      "code": "brand-26",
      "img": "http://img.souche.com/files/tangeche/2zMZPwkriv.png",
      "name": "奔腾",
      "price": 12000
    },
    {
      "code": "brand-25",
      "img": "http://img.souche.com/files/tangeche/pbKe6ALC2Z.png",
      "name": "奔驰",
      "price": 22200
    },
    {
      "code": "brand-20",
      "img": "http://img.souche.com/files/tangeche/se4CGU1icU.png",
      "name": "宝马",
      "price": 30000
    },
    {
      "code": "brand-18",
      "img": "http://img.souche.com/files/tangeche/QU4w7CeF31.png",
      "name": "宝骏",
      "price": 10000
    },
    {
      "code": "brand-27",
      "img": "http://img.souche.com/files/tangeche/4NMdX1NErQ.png",
      "name": "本田",
      "price": 12000
    },
    {
      "code": "brand-29",
      "img": "http://img.souche.com/files/tangeche/Ay8uVvsuPA.png",
      "name": "标致",
      "price": 22200
    },
    {
      "code": "brand-28",
      "img": "http://img.souche.com/files/tangeche/GCKgPNizjk.png",
      "name": "比亚迪",
      "price": 30000
    }]
  },
  {
    "key": "C",
    "row": [{
      "code": "brand-164",
      "img": "http://img.souche.com/files/tangeche/k7gZIDTHVE.png",
      "name": "长安",
      "price": 10000
    },
    {
      "code": "brand-526",
      "img": "http://img.souche.com/files/tangeche/30A7wRIyKv.png",
      "name": "长安欧尚",
      "price": 140000
    }]
  },
  {
    "key": "D",
    "row": [{
      "code": "brand-522",
      "img": "http://img.souche.com/files/tangeche/ePAxQRnjt7.png",
      "name": "东风风神",
      "price": 10000
    },
    {
      "code": "brand-574",
      "img": "http://img.souche.com/files/tangeche/V1uYw3dt9C.png",
      "name": "东风风行",
      "price": 10000
    },
    {
      "code": "brand-41",
      "img": "http://img.souche.com/files/tangeche/lMQ7DAjvSF.png",
      "name": "大众",
      "price": 10000
    }]
  },
  {
    "key": "F",
    "row": [{
      "code": "brand-49",
      "img": "http://img.souche.com/files/tangeche/GGKgBIoaRg.png",
      "name": "丰田",
      "price": 1000
    },
    {
      "code": "brand-53",
      "img": "http://img.souche.com/files/tangeche/4V8qf0BDNQ.png",
      "name": "福特",
      "price": 1000
    }]
  },
  {
    "key": "G",
    "row": [{
      "code": "brand-56",
      "img": "http://img.souche.com/files/tangeche/OU80kTufNy.png",
      "name": "广汽传祺",
      "price": 1000
    },
    {
      "code": "brand-1001-n",
      "img": "http://img.souche.com/files/tangeche/t0gp270C0s.png",
      "name": "观致",
      "price": 1000
    }]
  },
  {
    "key": "H",
    "row": [{
      "code": "brand-530",
      "img": "http://img.souche.com/files/tangeche/tzamqNcFUt.png",
      "name": "哈弗",
      "price": 1000
    }]
  },
  {
    "key": "J",
    "row": [{
      "code": "brand-74",
      "img": "http://img.souche.com/files/tangeche/64cNLCWnCO.png",
      "name": "Jeep",
      "price": 1000
    },
    {
      "code": "brand-72",
      "img": "http://img.souche.com/files/tangeche/YW8wMAytMG.png",
      "name": "吉利汽车",
      "price": 1000
    },
    {
      "code": "brand-75",
      "img": "http://img.souche.com/files/tangeche/2rKQFQ2po7.png",
      "name": "江淮",
      "price": 1000
    }]
  },
  {
    "key": "L",
    "row": [{
      "code": "brand-99",
      "img": "http://img.souche.com/files/tangeche/xsuUgp34wn.png",
      "name": "路虎",
      "price": 1000
    },
    {
      "code": "brand-93",
      "img": "http://img.souche.com/files/tangeche/CJMNrz043K.png",
      "name": "雷诺",
      "price": 1000
    }]
  },
  {
    "key": "M",
    "row": [{
      "code": "brand-109",
      "img": "http://img.souche.com/files/tangeche/tzg5K4SeOJ.png",
      "name": "MG",
      "price": 1000
    },
    {
      "code": "brand-108",
      "img": "http://img.souche.com/files/tangeche/zJ4knqOAyC.png",
      "name": "MINI",
      "price": 1000
    },
    {
      "code": "brand-102",
      "img": "http://img.souche.com/files/tangeche/4JqqMuZF2X.png",
      "name": "马自达",
      "price": 1000
    }]
  },
  {
    "key": "Q",
    "row": [{
      "code": "brand-520",
      "img": "http://img.souche.com/files/tangeche/Vc6JLqvC3u.png",
      "name": "启辰",
      "price": 1000
    },
    {
      "code": "brand-119",
      "img": "http://img.souche.com/files/tangeche/lowjHQ8BOs.png",
      "name": "起亚",
      "price": 1000
    }]
  },
  {
    "key": "R",
    "row": [{
      "code": "brand-121",
      "img": "http://img.souche.com/files/tangeche/oXqQfOLA7x.png",
      "name": "日产",
      "price": 1000
    },
    {
      "code": "brand-122",
      "img": "http://img.souche.com/files/tangeche/r9QL1ahNVo.png",
      "name": "荣威",
      "price": 1000
    }]
  },
  {
    "key": "S",
    "row": [{
      "code": "brand-126",
      "img": "http://img.souche.com/files/tangeche/EUgnLFf9ea.png",
      "name": "三菱",
      "price": 10000
    },
    {
      "code": "brand-135",
      "img": "http://img.souche.com/files/tangeche/68c1L866lY.png",
      "name": "斯柯达",
      "price": 103000
    }]
  },
  {
    "key": "T",
    "row": [{
      "code": "brand-510",
      "img": "http://img.souche.com/files/tangeche/ReueJYkAG5.png",
      "name": "特斯拉",
      "price": 1000
    }]
  },
  {
    "key": "W",
    "row": [{
      "code": "brand-148",
      "img": "http://img.souche.com/files/tangeche/4zAjvdII58.png",
      "name": "五菱汽车",
      "price": 1000
    }]
  },
  {
    "key": "X",
    "row": [{
      "code": "brand-151",
      "img": "http://img.souche.com/files/tangeche/7VOQCwvHJ1.png",
      "name": "现代",
      "price": 1000
    },
    {
      "code": "brand-154",
      "img": "http://img.souche.com/files/tangeche/TD8si8cV40.png",
      "name": "雪佛兰",
      "price": 1000
    },
    {
      "code": "brand-155",
      "img": "http://img.souche.com/files/tangeche/h8u6r3RUOn.png",
      "name": "雪铁龙",
      "price": 1000
    }]
  },
  {
    "key": "Y",
    "row": [{
      "code": "brand-158",
      "img": "http://img.souche.com/files/tangeche/5Rs7xXYDij.png",
      "name": "英菲尼迪",
      "price": 1000
    }]
  },
  {
    "key": "Z",
    "row": [{
      "code": "brand-172",
      "img": "http://img.souche.com/files/tangeche/tReQknwhfV.png",
      "name": "众泰",
      "price": 1000
    }]
  }]

module.exports = {
  carList
}
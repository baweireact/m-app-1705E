const { bookNavData, bookMallData, mockDataList } = require('./data.js')

module.exports = {
  lintOnSave:false,
  devServer: {
    contentBase: [__dirname + '/img'],
    open: true,
    before(app) {
      app.get('/api/banner', (req, res) => {
        res.send({
          code: 200,
          data: [{
            id: '0',
            image: '/banner01.jpg'
          }, {
            id: '1',
            image: 'https://n4-q.mafengwo.net/s14/M00/24/E6/wKgE2l1s1IaAVzLiAAW1OYt5QcI723.jpg?imageMogr2%2Fthumbnail%2F%21750x422r%2Fgravity%2FCenter%2Fcrop%2F%21750x422%2Fquality%2F90'
          }, {
            id: '2',
            image: 'https://b2-q.mafengwo.net/s14/M00/5A/AE/wKgE2l1pF4GAK-1bAAfLOLBwax0713.jpg?imageMogr2%2Fthumbnail%2F%21750x422r%2Fgravity%2FCenter%2Fcrop%2F%21750x422%2Fquality%2F90'
          }],
          message: 'banner'
        })
      })

      app.get('/api/book_nav', (req, res) => {
        res.send({
          code: 200,
          data: bookNavData,
          message: '导航'
        })
      })

      app.get('/api/book_list', (req, res) => {
        let { id } = req.query
        console.log(req.query)
        let data = bookMallData.find(item => item.id == id)
        res.send({
          code: 200,
          data: data,
          message: '列表'
        })
      })

      app.get('/api/mock_data', (req, res) => {
        let { page, size } = req.query
        let start = (page - 1) * size
        let end = start + Number(size)
        console.log(start, end)
        let data = mockDataList.slice(start, end)

        res.send({
          code: 200,
          data: data,
          message: '列表'
        })
      })
    }
  }
}
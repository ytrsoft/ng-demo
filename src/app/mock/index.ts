import Mock from 'mockjs'

Mock.mock('/getToken', 'post', () => {
  return Mock.Random.string('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 32)
})

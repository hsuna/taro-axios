import './index.css'
import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { axios, FileData, PostData } from '@hsuna/taro-axios'
import { Button, Text, View } from '@tarojs/components'

const axiosWithBaseUrl = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='page'>
        {/* GET */}
        <View className='h1'>GET</View>
        <Button
          className='button'
          onClick={async () => {
            Taro.showLoading({ title: '请求中...' })
            const res = await axios.get(
              'https://jsonplaceholder.typicode.com/todos',
              {
                params: {
                  userId: 2,
                },
              },
            )
            console.log(res)
            Taro.hideLoading()
            Taro.showModal({
              title: '返回结果',
              content: JSON.stringify(res.data),
            })
          }}>
          <Text>发送 GET 请求(200)</Text>
        </Button>
        <Button
          className='button'
          onClick={async () => {
            Taro.showLoading({ title: '请求中...' })
            const res = await axiosWithBaseUrl.get('/todos', {
              params: {
                userId: 2,
              },
            })
            console.log(res)
            Taro.hideLoading()
            Taro.showModal({
              title: '返回结果',
              content: JSON.stringify(res.data),
            })
          }}>
          <Text>发送 GET 请求(200) | with baseUrl</Text>
        </Button>

        {/* POST */}
        <View className='h1'>POST</View>
        <Button
          className='button'
          onClick={async () => {
            Taro.showLoading({ title: '请求中...' })
            const res = await axios.post(
              'https://jsonplaceholder.typicode.com/todos',
              {
                test: 1,
              },
            )
            console.log(res)
            Taro.hideLoading()
            Taro.showModal({
              title: '返回结果',
              content: JSON.stringify(res.data),
            })
          }}>
          <Text>发送 POST 请求(201)</Text>
        </Button>
        <Button
          className='button'
          onClick={async () => {
            Taro.showLoading({ title: '请求中...' })
            const res = await axios.post('http://httpstat.us/302')
            console.log(res)
            Taro.hideLoading()
            Taro.showModal({
              title: '返回结果',
              content: JSON.stringify(res.data),
            })
          }}>
          <Text>发送 POST 请求(302)</Text>
        </Button>
        <Button
          className='button'
          onClick={async () => {
            Taro.showLoading({ title: '请求中...' })
            const res = await axios.post('http://httpstat.us/500')
            console.log(res)
            Taro.hideLoading()
            Taro.showModal({
              title: '返回结果',
              content: JSON.stringify(res.data),
            })
          }}>
          <Text>发送 POST 请求(500)</Text>
        </Button>
        <Button
          className='button'
          onClick={async () => {
            const { tempFilePaths } = await Taro.chooseImage({ count: 1 })
            Taro.showLoading({ title: '图片上传中...' })
            const res = await axios.post(
              'https://sm.ms/api/upload',
              new PostData({
                smfile: new FileData(tempFilePaths[0]),
                ssl: true,
                format: 'json',
              }),
            )
            Taro.hideLoading()
            Taro.showModal({
              title: '返回结果',
              content: JSON.stringify(res.data),
            })
          }}>
          <Text>上传文件</Text>
        </Button>
      </View>
    )
  }
}

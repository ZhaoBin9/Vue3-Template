<template>
  <div class="image-upload-wrapper">
    <el-upload
      :class="['image-uploader', { 'disable-upload': this.fileList.length >= this.limit }]"
      action="#"
      :auto-upload="false"
      :show-file-list="true"
      list-type="picture-card"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="onChange"
      accept="image/png, image/jpeg"
      multiple
    >
      <div class="tips-box">
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <p class="tips-text">{{ uploadText }}</p>
      </div>
    </el-upload>
    <p v-if="tooltip" class="tooltip">{{ tooltip }}</p>
  </div>
</template>

<script>
/* 图片上传组件 */
import { OssClient } from '@/utils'
export default {
  name: 'ImageUploader',
  props: {
    // 已有图片地址列表(编辑时的初始数据)
    photos: {
      type: Array,
      default() {
        return []
      },
    },
    // 上传按钮提示文案
    uploadText: {
      type: String,
      default: '上传图片',
    },
    // 图片数量限制
    limit: {
      type: Number,
      default: 1,
    },
    // 上传组件说明文案
    tooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      addImageEl: null, // 添加图片按钮元素
      // 文件列表
      fileList: [
        // 已上传 oss 的图片数据结构（编辑已有农场信息时展示用）
        // {
        //   url: '', // oss 图片地址
        // },
        // 未上传 oss 的图片数据结构（需要上传至oss）
        // {
        // 	name: '', // 文件名称
        // 	url: '', // 用于展示的本地图片地址
        // 	rawData: '', // 文件原始 File 类型数据
        // },
      ],
    }
  },
  watch: {
    fileList(newVal, oldVal) {
      // 控制添加图片按钮显示/隐藏
      if (newVal.length >= this.limit) {
        this.addImageEl.style.display = 'none'
      } else {
        this.addImageEl.style.display = 'inline-block'
      }
      // 将文件列表状态emit到父组件
      if (newVal.length > 0) {
        this.$emit('change', true)
      } else {
        this.$emit('change', false)
      }
    },
    photos(newVal) {
      // 监听到有默认图片时，添加到 fileList 中展示
      if (newVal.length > 0) {
        this.fileList = [...this.photos.map((item) => ({ url: item }))]
      }
    },
  },
  mounted() {
    this.addImageEl = document.querySelector('.image-uploader .el-upload.el-upload--picture-card')
  },
  methods: {
    // 文件超出个数限制时的处理钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    // 监听文件状态改变
    onChange(file) {
      const { name, raw } = file
      const url = URL.createObjectURL(raw)
      this.fileList.push({ name, url, rawData: raw })
    },
    // 移除文件
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 提交图片上传
    uploadToOss() {
      console.log('------------uploadToOss fileList: ', this.fileList)
      const notNeedUploadList = this.fileList.filter((item) => !item.rawData).map((item) => item.url)
      const needUploadList = this.fileList.filter((item) => !!item.rawData)
      console.log('-----------notNeedUploadList: ', notNeedUploadList)
      console.log('-----------needUploadList: ', needUploadList)

      return new Promise(async (resolve, reject) => {
        if (needUploadList.length === 0) {
          resolve(notNeedUploadList)
          return
        }

        let finalList = []
        const oss = new OssClient()
        const isSuccess = await oss.getOssInfo()
        if (isSuccess) {
          oss
            .ossUpStream(needUploadList)
            .then((res) => {
              console.log('get-oss-urls: ', res)
              finalList = [...notNeedUploadList, ...res]
              resolve(finalList)
            })
            .catch((err) => {
              console.log('oss-err: ', err)
              reject({ message: err })
            })
        } else {
          reject({ message: '图片上传失败' })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.image-upload-wrapper {
  .tooltip {
    font-size: 14px;
    color: #bfbfbf;
    line-height: 22px;
  }

  .image-uploader {
    /deep/.tips-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .avatar-uploader-icon {
        width: 24px !important;
        height: 24px !important;
        font-size: 24px !important;
        line-height: 24px !important;
        color: #16b05b;
      }
      .tips-text {
        margin-top: 4px;
        font-size: 14px;
        line-height: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
    &.disable-upload {
      /deep/.el-upload--picture-card {
        pointer-events: none;
        cursor: not-allowed;
        background-color: #e5e7ea;
        border-color: #e5e7ea;
      }
    }
    /deep/.el-upload--picture-card {
      margin-bottom: 8px;
      width: 120px;
      height: 120px;
      line-height: 1;
      border-radius: 4px;
      &:hover {
        cursor: pointer;
      }
    }
    /deep/.el-upload-list--picture-card {
      display: inline-flex;
      .el-upload-list__item {
        width: 120px;
        height: 120px;
        .el-upload-list__item-status-label {
          display: none;
        }
      }
      .el-upload-list__item-thumbnail {
        object-fit: cover;
      }
    }
  }
  .img-list {
    margin-top: 10px;
    .img-list-item {
      margin-right: 10px;
      width: 100px;
      height: 100px;
      border-radius: 4px;
    }
  }
}
</style>

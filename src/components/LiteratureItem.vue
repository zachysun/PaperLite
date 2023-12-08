<template>
  <div class="literature-item">
    <el-input type="textarea" :rows="2" v-model="localData.name" @blur="updateDocumentName" :readonly="isReadOnlyDocument"
      @dblclick.native="toEditDocument" placeholder="Input the paper..." class="input-document" resize="none" />
    <span class="btn-container">
      <el-button-group class="btn-group-right">
        <el-button @click="toggle" type="primary" size="small" plain>
          <i :class="['el-icon-arrow-down', rotateIcon ? 'rotate' : none]"></i>show/hide papers
        </el-button>
        <el-button @click="deleteDocument" type="danger" icon="el-icon-delete" size="small" plain>delete</el-button>
      </el-button-group>
    </span>
    <el-collapse-transition>
      <div v-show="isOpen">
        <div v-html="compiledMarkdown" class="markdownShow" @dblclick="toEdit"></div>
        <el-input v-show="isEdit" type="textarea" :rows="6" v-model="localData.content" @blur="updateDocumentContent"
          @input="updateMarkdown" placeholder="Input the note..." class="input-content" resize="none"
          ref="inputContent" />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { marked } from 'marked';
var _ = require('lodash');

export default {
  name: 'LiteratureItem',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
      isReadOnlyDocument: true,
      localData: { ...this.data },
      compiledMarkdown: '',
      isEdit: false,
      rotateIcon: false,
    };
  },

  watch: {
    data(newVal) {
      this.localData = { ...newVal };
    },
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      this.rotateIcon = !this.rotateIcon;
    },

    updateDocumentName() {
      this.isReadOnlyDocument = true;
      this.$emit('update-document', this.localData);
    },

    updateMarkdown: _.debounce(function () {
      this.compiledMarkdown = marked(this.localData.content);
    }, 300),

    updateDocumentContent() {
      this.isReadOnlyContent = true;
      this.$emit('update-document', this.localData);
      this.isEdit = false;
    },

    deleteDocument() {
      this.$emit('delete-document', this.localData);
    },

    toEditDocument() {
      this.isReadOnlyDocument = false;
    },

    toEdit() {
      this.isEdit = true;
      this.$nextTick(function () {
        this.$refs.inputContent.focus();
      });
    }
  },

  mounted() {
    this.compiledMarkdown = marked(this.localData.content);
  },
};
</script>

<style scoped>
.literature-item {
  background-color: #f3f9f1;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 5px;
}

::v-deep .input-document .el-textarea__inner {
  font-size: 18px;
  font-family: "Source Sans Pro";
}

.input-content {
  font-size: 14px;
}

.markdownShow {
  height: 200px;
  font-size: 14px;
  background-color: #fffffc;
  overflow: auto;
  font-family: "Roboto";
}

.el-icon-arrow-down {
  transition: transform 0.5s;
}
.rotate {
  transform: rotate(180deg);
}
</style>
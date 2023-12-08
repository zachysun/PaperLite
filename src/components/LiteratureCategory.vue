<template>
  <div class="literature-category">
    <el-input type="text" v-model="localData.name" @blur="updateCategoryName" placeholder="Input the category..."
      :readonly="isReadOnly" @dblclick.native="toEdit" class="input-category" prefix-icon="el-icon-s-flag" />
    <span class="btn-container">
      <el-button-group class="btn-group-left">
        <el-button @click="toggle" type="primary" size="small" plain>
          <i :class="['el-icon-arrow-down', rotateIcon ? 'rotate' : none]"></i>show/hide papers
        </el-button>
        <el-button @click="deleteCategory" type="danger" icon="el-icon-delete" size="small" plain>delete</el-button>
      </el-button-group>
    </span>
    <el-collapse-transition>
      <div v-show="isOpen">
        <LiteratureItem v-for="document in localData.documents" :key="document.id" :data="document"
          @update-document="updateDocument" @delete-document="deleteDocument" />
        <span class="btn-container">
          <el-button-group class="btn-group-right">
            <el-button @click="addDocument" type="warning" icon="el-icon-plus" size="small" plain>Add Paper</el-button>
          </el-button-group>
        </span>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import LiteratureItem from './LiteratureItem.vue';

export default {
  name: 'LiteratureCategory',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  components: {
    LiteratureItem,
  },

  data() {
    return {
      isOpen: false,
      isReadOnly: true,
      localData: { ...this.data },
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

    addDocument() {
      const newDocument = {
        id: Date.now(),
        name: '',
        content: '',
      };
      this.localData.documents.push(newDocument);
      this.$emit('update-category', this.localData);
    },

    updateCategoryName() {
      this.isReadOnly = true;
      this.$emit('update-category', this.localData);
    },

    deleteCategory() {
      this.$emit('delete-category', this.localData.id);
    },

    updateDocument(updatedDocument) {
      const documentIndex = this.localData.documents.findIndex(
        (doc) => doc.id === updatedDocument.id
      );
      this.localData.documents.splice(documentIndex, 1, updatedDocument);
      this.$emit('update-category', this.localData);
    },

    deleteDocument(paperData) {
      if (confirm(`Are you sure you want to delete it`)) {
        this.localData.documents = this.localData.documents.filter((paper) => paper.id !== paperData.id);
        this.$emit('update-category', this.localData);
      }
    },

    toEdit() {
      this.isReadOnly = false;
    }
  },
};
</script>

<style scoped>
.literature-category {
  background-color: #e0eee8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

::v-deep .input-category .el-input__inner {
  font-size: 20px;
  font-weight: bold;
  font-family: "Roboto Slab";
}

.el-icon-arrow-down {
  transition: transform 0.3s;
}
.rotate {
  transform: rotate(180deg);
}
</style>
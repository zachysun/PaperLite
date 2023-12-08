<template>
  <div id="app">
    <pageHeader />
    <section>
      <div class="literature-category-list">
        <LiteratureCategory v-for="category in categories" :key="category.id" :data="category"
          @update-category="updateCategory" @delete-category="deleteCategory" />
        <span class="btn-container">
          <el-button-group class="btn-group-left">
            <el-button @click="addCategory" type="warning" icon="el-icon-plus" size="small" plain>Add Category</el-button>
          </el-button-group>
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import LiteratureCategory from './components/LiteratureCategory.vue';
import pageHeader from './components/pageHeader.vue';

export default {
  name: 'App',

  components: {
    LiteratureCategory,
    pageHeader,
  },

  data() {
    return {
      categories: [],
    };
  },

  created() {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      this.categories = JSON.parse(savedCategories);
    }
  },

  methods: {
    addCategory() {
      const newCategory = {
        id: Date.now(),
        name: '',
        documents: [],
      };
      this.categories.push(newCategory);
      this.saveCategoriesToLocalStorage();
    },

    updateCategory(newCategoryData) {
      const categoryId = this.categories.findIndex(
        (cat) => cat.id === newCategoryData.id
      );
      this.categories.splice(categoryId, 1, newCategoryData);
      this.saveCategoriesToLocalStorage();
    },

    deleteCategory(categoryId) {
      if (confirm(`Are you sure you want to delete it`)) {
        this.categories = this.categories.filter((cat) => cat.id !== categoryId);
        this.saveCategoriesToLocalStorage();
      }
    },

    saveCategoriesToLocalStorage() {
      localStorage.setItem('categories', JSON.stringify(this.categories));
    },
  },
};
</script>

<style>
body {
  background-color: #F2F6FC;
  overflow-y: scroll
}

section {
  margin: 0 auto;
}

.btn-group-left {
  float: left;
  margin-top: 5px;
}

.btn-group-right {
  float: right;
  margin-top: 5px;
}

.btn-container {
  min-height: 50px;
  display: block;
}

@media screen and (max-device-width: 620px) {
  section {
    width: 96%;
    padding: 0 2%;
  }
}

@media screen and (min-width: 620px) {
  section {
    width: 800px;
    padding: 0 10px;
  }
}
</style>
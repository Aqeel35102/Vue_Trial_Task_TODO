<template>
  <section class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">My Todos</a
      ><button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
        </ul>
        <button class="btn btn-outline-danger my-2 my-sm-0" type="button" @click="Logout()">
          Logout
        </button>
      </div>
    </nav>
    <div class="wrapper container">
      <div>
        <div class="container-fluid">
          <div class="row justify-content-between my-4 ">
            <h3 class="text-center text-primary">Todo List</h3>
            <form class="form-inline my-2 my-lg-0" @submit.prevent="e=>{}">
              <input
                class="form-control mr-sm-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                style="min-width: 300px;"
                v-model="search"
                @keyup.enter="AllTodos()"
              /><button
                class="btn btn-primary my-2 my-sm-0"
                type="button"
                @click="AllTodos()"
              >
                Search
              </button>
              <button
              v-if="search!=''"
                class="btn btn-secondary my-2 my-sm-0 ml-2"
                type="button"
                @click="search='',AllTodos()"
              >
                Clear
              </button>
            </form>
            <router-link class="btn btn-primary" to="/addTodo">Add Todo +</router-link>


          </div>
          <div class="row" style="overflow-y: auto; max-height: 460px"  ref="scrollable" @scroll="handleScroll">
            <!-- for loop on todo array -->
            <div class="col-md-4 p-1 mx-0" v-for="todo in todos" :key="todo.id">
              <div class="p-0 mx-0 card mb-3 border-primary">
                <div class="card-header">
                  Todo
                  <span class="float-right">
                    <span class="badge rounded p-1 badge-primary"> </span
                  ></span>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{todo.title}}</h5>
                  <p class="card-text">{{todo.description}}</p>
                </div>
                <div
                  class="card-footer bg-transparent border-primary text-center"
                >
                <!-- for edit todo -->
              <router-link class="btn btn-sm mx-3 btn-primary" :to="`/updateTodo/${todo.id}`" v-if="!this.isLogged"><i class="fa fa-edit"></i> Edit</router-link>

                <!-- for delete todo -->
                  <button class="btn btn-sm mx-3 btn-danger" @click="deleteItem(todo)"> <i class="fa fa-trash"></i> Delete</button>
                </div>
              </div>
            </div>
            
          </div>
          <p class="text-danger text-center h4" v-if="isLoading"> Loading...</p>
        </div>
      </div>
    </div>
    <div
      class="footer d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
    >
      
      <div class="text-white mb-3 mb-md-0">
        Copyright © 2023. All rights reserved.
      </div>
      <div class="text-white mb-3 mb-md-0">Developed by M. AQEEL.</div>
      

      <!-- Right -->
      <div>
        <a href="#" class="text-white mr-4">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="text-white mr-4">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="text-white mr-4">
          <i class="fab fa-google"></i>
        </a>
        <a href="#" class="text-white">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
      <!-- Right -->
    </div>
    <delete-modal :showModal="showDeleteModal" @cancel="showDeleteModal=false" @modalResponse="modalResponse" header="Delete Todo" title="Are you sure? you want to delete this Todo."></delete-modal>
  </section>
</template>
  
<script>
import { mapGetters } from "vuex";
import deleteModal from "./modals/deleteModal";

export default {
  name: "todoList",
  components: {
    deleteModal
  },
  computed: {
        ...mapGetters({
            todos: 'todoModule/allTodos',

        })
    },
    data () {
        return {
            search: '',
            please_wait:false,
            perPage:10,
            showDeleteModal:false,
            itemToDelete: {},
            isLoading: false,
        }
    },
    async created () {
    this.AllTodos();
    },
    mounted () {
        
    },
    methods: {
      async AllTodos () {

        try {
            if (this.isLoading) {
          return; // Don't trigger another request if one is already in progress
        }

        this.isLoading = true;
        // Fetch all todos
          await this.$store.dispatch("todoModule/getAllTodos", {page: 1, perPage: this.perPage,search:this.search})
        this.perPage=this.perPage+10;
        } catch (error) {
          console.log("Error loading more data:", error);
        } finally {
          this.isLoading = false;
        }
      },
      deleteItem(item){

        this.showDeleteModal = true;
        this.itemToDelete = item;
      },
      async modalResponse(response) {

        this.showDeleteModal = false;
        if (response) {
          // delete this selected todo
          await this.$store.dispatch('todoModule/deleteTodo', {toast:this,id:this.itemToDelete.id})

        }

      },
    async handleScroll() {
      // infinite scroll bar to fetch new records
      const scrollableElement = this.$refs.scrollable;

      const scrollTop = scrollableElement.scrollTop;
      const scrollHeight = scrollableElement.scrollHeight;
      const clientHeight = scrollableElement.clientHeight;

      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      if (isAtBottom && !this.isLoading) {
        // call function AllTodos
       await this.AllTodos();
      }
    },

    async Logout () {
      // logout the user
            this.please_wait=true;
            await this.$store.dispatch('loginModule/logout',{toast:this})
            this.please_wait=false;
        }
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.badge {
  display: inline-block;
}

.wrapper {
  min-height: 100%;
  /* Adjust the padding or margin to leave space for the footer */
  padding-bottom: 60px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  /* Customize the appearance of the footer */
  background-color: #f5f5f5;
}
</style>
  
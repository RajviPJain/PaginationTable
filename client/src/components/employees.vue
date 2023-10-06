<template>
  <div class="container border shadow-sm bg-body rounded">
    <h1>Employees</h1>
    <button class="btn btn-primary d-flex justify-content-start" @click="reset">Reset Filter</button>
    <div class="input-group mb-3 p-2 d-flex justify-content-end">
      <input
        type="text"
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        style="width: 20%"
        v-model="search"
        @input="getEmployees()"
      />
      <button class="btn btn-outline-primary" type="button" id="button-addon2">
        <i class="bi bi-search"></i>
      </button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="table-dark table-hover">
          <th scope="col">
            ID<i
              :class="
                activeSortId ? 'bi bi-chevron-compact-up' : 'bi bi-chevron-down'
              "
              @click="  this.activeSortId = !this.activeSortId; sortItems('empId',activeSortId)"
            ></i>
          </th>
          <th scope="col">
            NAME<i
              :class="
                activeSortName
                  ? 'bi bi-chevron-compact-up'
                  : 'bi bi-chevron-down'
              "
              @click="this.activeSortName = !this.activeSortName; sortItems('firstname',activeSortName)"
            ></i>
          </th>
          <th scope="col">
            EMAIL<i
              :class="
                activeSortEmail
                  ? 'bi bi-chevron-compact-up'
                  : 'bi bi-chevron-down'
              "
              @click="activeSortEmail!=activeSortEmail; sortItems('email',activeSortEmail)"
            ></i>
          </th>
          <th scope="col">DEPARTMENT</th>
          <th scope="col">DESIGNATION</th>
          <th scope="col">
            DATE OF JOINING<i
              :class="
                activeSortDate
                  ? 'bi bi-chevron-compact-up'
                  : 'bi bi-chevron-down'
              "
              @click="activeSortDate=!activeSortDate; sortItems('joiningData',activeSortDate)"
            ></i>
          </th>
          <th scope="col">
            PROJECT COUNTS<i
              :class="
                activeSortCount
                  ? 'bi bi-chevron-compact-up'
                  : 'bi bi-chevron-down'
              "
              @click="activeSortCount=!activeSortCount; sortItems('projectCount',activeSortCount)"
            ></i>
          </th>
        </tr>
      </thead>
      <h6 v-if="employees.length === 0">No Record Found</h6>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <th scope="row">{{ employee.empId }}</th>
          <td>{{ employee.fullName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.designation }}</td>
          <td>{{ employee.joiningDate }}</td>
          <td>{{ employee.projectCount }}</td>
        </tr>
      </tbody>
    </table>

    <JwPagination
      v-if="total"
      :total="total"
      :items="employees"
      @changePage="onChangePage"
      @newitems="newItems"
    ></JwPagination>
  </div>
</template>

<script>
import api from "../services/api";

import JwPagination from "./JwPagination.vue";

export default {
  data() {
    return {
      employees: [],
      search: "",
      total: null,
      pageOfItems: [],
      activeSortId: false,
      activeSortName: false,
      activeSortEmail: false,
      activeSortDate:false,
      activeSortCount: false,

      sortBy: {},
      sort: [],
      page: 1,
    };
  },
  components: {
    JwPagination,
  },
  computed: {
    // direction(activeSort){
    //   return activeSort?'DESC':'ASC'
    // }
  },
  methods: {
    reset(){
          this.sort=[]
          this.activeSortId=false
      this.activeSortName=false
      this.activeSortEmail=false
      this.activeSortDate=false
      this.activeSortCount=false

      this.getEmployees()
    },
    async getEmployees() {


      await api
        .get("/", {
          params: { page: this.page, search: this.search, sort: this.sort },
        })
        .then((response) => {
          
          this.employees = response.data.rows;

          this.total = response.data.count;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    onChangePage(pageOfItems) {
      // update page of items

      this.pageOfItems = pageOfItems;
    },
    newItems(page) {
     
      this.page = page;
      this.getEmployees();
    },
  
    sortItems(sort, activeSort) {
      function filterSort(arr, value) {
        return arr.filter((subArray) =>
          subArray.every((element) => element !== value)
        );
      }
      if (activeSort) {
      
        this.sort = filterSort(this.sort, sort);
        this.sort.push([sort, "DESC"]);
        this.getEmployees();
      } else {
        this.sort = filterSort(this.sort, sort);

        this.sort.push([sort, "ASC"]);
        this.getEmployees();
      }
    },
  },

  created() {
    this.getEmployees();
  },
};
</script>

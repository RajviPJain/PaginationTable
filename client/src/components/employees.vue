<template>
  <div class="container border shadow-sm bg-body rounded">
 
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
          <th scope="col">ID<i :class="activeSortId?'bi bi-chevron-compact-up':'bi bi-chevron-down'" @click="sortData('activeSortId')"></i></th>
          <th scope="col">NAME<i :class="activeSortName?'bi bi-chevron-compact-up':'bi bi-chevron-down'"  @click="sortData('activeSortName')"></i></th>
          <th scope="col">EMAIL<i :class="activeSortEmail?'bi bi-chevron-compact-up':'bi bi-chevron-down'"  @click="sortData('activeSortEmail')"></i></th>
          <th scope="col">DEPARTMENT</th>
          <th scope="col">DESIGNATION</th>
          <th scope="col">DATE OF JOINING<i :class="activeSortDate?'bi bi-chevron-compact-up':'bi bi-chevron-down'"  @click="sortData('activeSortDate')"></i></th>
          <th scope="col">PROJECT COUNTS<i :class="activeSortCount?'bi bi-chevron-compact-up':'bi bi-chevron-down'"  @click="sortData('activeSortCount')"></i></th>
        </tr>
      </thead>
      <h6 v-if="employees.length===0">No Record Found</h6>
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
   
    <JwPagination v-if="total" :total="total" :items="employees" @changePage="onChangePage"   @newitems="newItems" ></JwPagination>
  </div>
</template>

<script>
import api from "../services/api";

import JwPagination from './JwPagination.vue'

export default {
  data() {
    return {
      employees: [],
      search:'',
      total:null,
      pageOfItems:[],
      activeSortId:true,
      activeSortName:true,
      activeSortEmail:true,
      activeSortDate:true,
      activeSortCount:true,
      
      sortBy:{},
      sort:[],
      page:1,

     
    };
  },
  components:{
     JwPagination
  },
  computed:{
      // direction(activeSort){
      //   return activeSort?'DESC':'ASC'
      // }

  
  },
  methods: {
 

   async getEmployees(){
         console.log('fikter',this.page)
        
            await api
        .get("/", {
          params: { page: this.page,search:this.search,sort:this.sort},
        })
        .then((response) => {
        console.log("response page: ",this.page)
          this.employees = response.data.rows;
     

          this.total=response.data.count
        
    
        
        })
        .catch(function (error) {
          console.log(error);
        });
       
    }, 
   onChangePage(pageOfItems) {
            // update page of items
            
            this.pageOfItems = pageOfItems;
            
        },
    newItems(page){
      console.log("inNewItems: ", page, this.page)
      this.page=page
        this.getEmployees()
   
    },
    sortData(activeSort){
      console.log(activeSort)
        if(activeSort==='activeSortId'){
           this.activeSortId=!this.activeSortId
        
           this.sortItems('empId',this.activeSortId)
           console.log(this.sort)
          this.getEmployees()
        } 
        if(activeSort==='activeSortName'){
           this.activeSortName=!this.activeSortName
           this.sortItems('firstname',this.activeSortName)
           console.log(this.sort)
          this.getEmployees()
        }
        if(activeSort==='activeSortEmail'){
           this.activeSortEmail=!this.activeSortEmail
           this.sortItems('email',this.activeSortEmail)
          this.getEmployees()
        }
        if(activeSort==='activeSortDate'){
           this.activeSortDate=!this.activeSortDate
           this.sortItems('joiningDate',this.activeSortEmail)
          this.getEmployees()
        }

        if(activeSort==='activeSortCount'){
          this.activeSortCount=!this.activeSortCount
          this.sortItems('projectCount',this.activeSortEmail)
          this.getEmployees()
        }
         
        //  this.sort=this.sort.push()

       
         
    },
    sortItems(sort,activeSort){
      function filterSort(arr, value) {
  return arr.filter(subArray => subArray.every(element => element !== value));
}
        if(activeSort){
          console.log('filter',filterSort(this.sort,sort))
          this.sort=filterSort(this.sort,sort)
          this.sort.push([sort,'DESC'])
          
        }
        else{
          this.sort=filterSort(this.sort,sort)
          // console.log('filter',filterSort(this.sort,sort))
          // console.log('Inside',this.sort)
          this.sort.push([sort,'ASC'])
        }
      }


  },

  // watch: {
  //   page1(value) {
  //     if (value === 1) {
  //       this.disabledPrevious = true;
  //     }
  //   },
  // },

  created() {
   
    this.getEmployees();
   
  },
};
</script>
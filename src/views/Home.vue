<template>
  <div class="hello">
    <h1 v-if="dataFlag === ''">Sample CRUD Operation</h1>
    <span v-if="dataFlag == 'ADD'"><h1>User Registration Form</h1></span>
    <span v-if="dataFlag == 'EDIT'"><h1>Edit Registration Form</h1></span>

    <!-- {{ msg }} -->
    <div>
      <button
        type="button"
        @click="addRecord()"
        class="btn btn-primary"
        v-if="dataFlag == ''"
      >
        ADD USER
      </button>
    </div>
    <table
      v-if="tableflag == true"
      class="table table-bordered table-condensed table-striped"
    >
      <thead>
        <tr>
          <th scope="col">Employee ID</th>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">Date of joining</th>
          <th scope="col">Country Name</th>
          <th scope="col">State Name</th>
          <th scope="col">City Name</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr scope="row" v-for="(item, index) in users" :key="index">
          <td scope="row">{{ item.empId }}</td>
          <td scope="row">{{ item.email }}</td>
          <td scope="row">{{ item.name }}</td>
          <td scope="row">{{ item.gender }}</td>
          <td scope="row">{{ item.date }}</td>
          <td scope="row">{{ item.countryName }}</td>
          <td scope="row">{{ item.stateName }}</td>
          <td scope="row">{{ item.cityName }}</td>

          <td scope="row">
            <span
              ><button
                class="btn btn-primary"
                @click="activeInactiveRecord(item)"
                v-if="item.status === true"
              >
                Active
              </button></span
            >
            <span
              ><button
                class="btn btn-danger"
                @click="activeInactiveRecord(item)"
                v-if="item.status === false"
              >
                InActive
              </button></span
            >
          </td>
          <td scope="row">
            <span class="text-center"
              ><button @click="editRecord(item)" class="btn btn-primary">
                Edit
              </button></span
            >
            &nbsp;&nbsp;<span class="text-start"
              ><button @click="deleteRecord(item)" class="btn btn-danger">
                Delete
              </button></span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div v-if="Addflag == true">
      <div class="container">
        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6">
              <label for="id">Employoee ID</label>
              <input
                type="text"
                id="id"
                v-model="empid"
                :disabled="empIdFlag"
                required
                class="form-control"
                placeholder="Please Enter Employee Id"
              />
            </div>
            <div class="col-md-6">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                v-model="email"
                class="form-control"
                required
                placeholder="Please Enter Email"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="title">Name:</label>
              <input
                type="text"
                id="title"
                v-model="name"
                class="form-control"
                required
                placeholder="Please Enter Name"
              />
            </div>
            <div class="col-md-6">
              <label for="title">Date of Joining:</label>
              <input
                type="date"
                id="date"
                v-model="dateofjoining"
                class="form-control"
                required
                placeholder="Please Enter Date of Joining "
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <label for="title">Country Name:</label>
              <select class="form-select" v-model="country">
                <option value="India" selected>India</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="title">State Name:</label>
              <select class="form-select" v-model="statedata"  @change="getCity($event)">
                <option disabled value="">Please enter a State Name</option>
                <option v-for="state in stateArr" :value="state.stateId" :key="state.stateId" >{{ state.stateName }}</option>
              </select>
            </div><div class="col-md-4">
              <label for="title">City Name:</label>
              <select class="form-select" v-model="citydata" :disabled="cityFlag" @change="getCitySelectedRecords($event)" >
                <option disabled value="">Please enter a City Name</option>
                <option v-for="city in cityArr" :value="city.cityId" :key="city.cityId">{{city.cityName }}</option>
              </select>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-4">
              {{ this.country }}
              <label for="Gender"><b>Gender:</b></label
              >&nbsp;&nbsp;&nbsp;
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="male"
                  value="Male"
                  v-model="gender"
                />
                <label class="form-check-label" for="Gender">Male</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="female"
                  value="Female"
                  v-model="gender"
                />
                <label class="form-check-label" for="Gender">Female</label>
              </div>
            </div>
            <div class="col-md-4">
              <label for="title"><b>Active/InActive</b></label>
              <b-form-checkbox v-model="isChecked"></b-form-checkbox>
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-primary form-control">
                Submit
              </button>
            </div>
            <div class="col-md-2">
              <button
                @click="cancelRecord()"
                class="btn btn-danger form-control"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import datepicker from "vue-datepicker";
import { BFormCheckbox, BFormRadio } from "bootstrap-vue";
import { Validator } from 'vee-validate';
export default {
  components: {
    datepicker,
    BFormCheckbox,
    BFormRadio,
    Validator,

  },
  created() {},
  name: "Home",
  data() {
    return {
      users: [],
      Addflag: false,
      tableflag: true,
      id: "",
      userid: "",
      title: "",
      dataFlag: "",
      empid: "",
      name: "",
      email: "",
      gender: "",
      isChecked: true,
      dateofjoining: "",
      isStatus: "",
      empIdFlag: false,
      country:'India',
      stateArr:[],
      statedata:'',
      selectStateId:'',
      selectStateName:'',
      selectCityId:'',
      selectCityName:'',
      citydata:'',
      cityArr:[],
      cityFlag:true
    };
  },

  async mounted() {
    this.getUserData();
   await  this.getState();

    console.log("******", this.users);
  },
  props: {
    msg: String,
  },

  methods: {
    getUserData() {
      axios
        .get(
          "https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/employee/employees"
        )
        .then((response) => {
          response.data.forEach((ele) => {
            var todayDate = new Date(ele.date).toISOString().slice(0, 10);

            let obj = {
              date: todayDate,
              email: ele.email,
              empId: ele.empId,
              gender: ele.gender,
              name: ele.name,
              status: ele.status,
              countryName:ele.countryName,
              stateName:ele.stateName,
              cityName:ele.cityName
            };

            this.users.push(obj);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

   async  getState(objsetState) {
      console.log("objsetState", objsetState)
      axios
        .get(
          "https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/state/states"
        )
        .then((response) => {
          console.log('response',response);
          this.stateArr = [];
          if(objsetState){
            response.data.forEach(ele => {
              if(ele.stateName === objsetState){
                this.statedata = ele.stateId;
              }
            });
            this.getCity(this.statedata);

          }
          this.stateArr = response.data;
        })
        .catch((error) => {
          this.stateArr = [];
          console.error(error);
        });
    },
    getCity(event,statedata) {

      if(statedata ==''){
        this.selectStateId = event.target.value
        this.selectStateName = event.target.options[event.target.options.selectedIndex].text;
      }else{
        this.selectStateId = statedata;
      }
     
        axios
        .get(
          `https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/city/${this.selectStateId}`
        )
        .then((response) => {
          this.cityArr = response.data;
          this.cityFlag =  false
        })
        .catch((error) => {
          this.cityArr = [];
          console.error(error);
        });
      
    },
    getCitySelectedRecords(event){
      this.selectCityId = event.target.value
      this.selectCityName = event.target.options[event.target.options.selectedIndex].text;
    
    },
    deleteRecord(item) {
      let id = item.empId;

      console.log("id-------------", id);

      axios
        .delete(
          `https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/employee/${id}`
        )
        .then((response) => {
          if (response.data == "Employee Delete!") {
            alert(`Employee deleted Successfully`);
          }
          this.users = [];
          this.getUserData();

          console.log("Response", response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    activeInactiveRecord(item) {
      // console.log("statussss", )

      var status = item.status === true ? false : true;
      if (this.status == true) {
        this.isStatus = "Active";
      } else {
        this.isStatus = "Inactive";
      }
      if (confirm(`Do you really want to ${this.isStatus} the user?`)) {
        fetch(
          `https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/employee/active/${item.empId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              empId: item.empId,
              status: status,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((result) => {
            console.log("result-----------------", result);
            alert(`User ${this.isStatus} SuccessFully!`);
            this.tableflag = true;
            this.Addflag = false;
            this.resetForm();
            this.getUserData();

          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    },
    addRecord() {
      this.dataFlag = "ADD";
      this.Addflag = true;
      this.tableflag = false;
    },

    cancelRecord() {
      this.dataFlag = "";
      this.tableflag = true;
      this.Addflag = false;
      this.resetForm();
    },

   async  editRecord(item) {
      this.tableflag = false;
      this.Addflag = true;
      this.dataFlag = "EDIT";
      this.empIdFlag = true;
      this.empid = item.empId;
      this.name = item.name;
      this.email = item.email;
      this.dateofjoining = item.date;
      this.gender = item.gender;
      this.isChecked = item.status;
      this.country = item.countryName;
      await this.getState(item.stateName);
      console.log("this.statedata-------------", this.statedata)

    },

    submitForm() {
      if (this.dataFlag === "ADD") {
        console.log("Add");

        fetch(
          "https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/employee",
          {
            method: "POST",
            body: JSON.stringify({
              empId: this.empid,
              email: this.email,
              name: this.name,
              date: this.dateofjoining,
              status: this.isChecked,
              gender: this.gender,
              stateName:this.selectStateName,
              cityName:this.selectCityName,
              countryName:this.country
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((result) => {
            alert("Employee Registration successfully.!");
            this.tableflag = true;
            this.Addflag = false;
            this.resetForm();
            this.getUserData();
          })
          .catch((err) => {
            console.log("err", err);
          });
      } else {
        console.log("Edit");
        fetch(
          "https://b9b3kpo2o6.execute-api.ap-south-1.amazonaws.com/prod/employee",
          {
            method: "PUT",
            body: JSON.stringify({
              empId: this.empid,
              email: this.email,
              name: this.name,
              date: this.dateofjoining,
              status: this.isChecked,
              gender: this.gender,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((result) => {
            alert("EDIT SuccessFully!");
            this.tableflag = true;
            this.Addflag = false;
            this.resetForm();
            this.getUserData();
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    },
    resetForm() {
      this.empid = "";
      this.email = "";
      this.name = "";
      this.tableflag = true;
      this.Addflag = false;
      this.dataFlag = "";
      this.empIdFlag = false;
      this.gender = "";
      this.isChecked = true;
      this.dateofjoining = "";
      this.users = [];
      this.statedata = '';
      this.stateArr = [];
      this.citydata = '';
      this.cityArr = [];
      this.cityFlag = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

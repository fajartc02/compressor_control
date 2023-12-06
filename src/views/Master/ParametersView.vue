<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/html-indent -->
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>
                        <v-row no-gutters>
                            <v-col cols="4">
                              Master Parameters
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="1">
                                <v-btn color="primary" @click="dialog = true">+</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-heading></v-heading>
                    <v-data-table
                        v-if="userData.length > 0"
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="userData"
                    >
                    <template #item.actions="{ item }">
                      <v-row>
                        <v-col cols="3">
                          <v-btn color="warning" @click="fetchDetail(item.columns.user_id)">
                            <v-icon
                              size="small"
                            >
                              mdi-pencil
                            </v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="3">
                          <v-btn color="pink-lighten-1" @click="deleteConf(item.columns.user_id)">
                            <v-icon
                              size="small"
                            >
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </template>
                    </v-data-table>
                    <div v-else>
                      <v-row>
                        <v-col class="text-center">
                          <h2>Tidak Ada Data</h2>
                        </v-col>
                      </v-row>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
          v-model="dialog"
          width="50%"
          persistent
        >
          <v-card>
            <v-card-title>
              <h3>Form User</h3>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Name" v-model="form.user_nm" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Noreg" v-model="form.noreg" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Phone Number" v-model="form.phone_no" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-if="!userDetail"
                    label="Password"
                    v-model="password"
                    variant="outlined"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col cols="3">
                  <v-btn color="success" outlined @click="submitData()">Submit</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn color="pink-darken-1" @click="() => {
                    dialog = false
                    form = {
                      user_nm: null,
                      noreg: null,
                      phone_no: null
                    }
                    password = null
                  }">Close</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import Swal from 'sweetalert2'
import {mapGetters} from 'vuex'
export default {
    name: "UsersView",
    data () {
      return {
        showPassword: false,
        itemsPerPage: 5,
        headers: [],
        userData: [],
        dialog: false,
        form: {
          user_nm: null,
          noreg: null,
          phone_no: null
        },
        password: null,
        dialogDelete: false
      }
    },
    watch: {
        users: function() {
          if(this.users) {
            this.mapParameters()
          }
        },
        userDetail: function() {
          if(this.userDetail) {
            this.dialog = true
            this.form = this.userDetail
          }
        }
    },
    methods: {
        async mapParameters() {
            let mapHeaders = []
            for (const key in this.users[0]) {
                let objHead = {
                    title: key,
                    key: key
                }
                mapHeaders.push(objHead)
            }
            mapHeaders.push({key: 'actions', title: 'Actions'})
            this.headers = mapHeaders
            this.userData = this.users
        },
        async fetchDetail(id) {
          await this.$store.dispatch("FETCH_USERS", id)
        },
        async submitData() {
          try {
            if(this.userDetail) {
              await this.$store.dispatch('EDIT_USER', this.userDetail)
              Swal.fire('Berhasil Mengubah', '', 'success')
            } else {
              this.form.password = this.password
              await this.$store.dispatch('ADD_USER', this.form)
              this.password = null
            }
            this.dialog = false
            this.form = {
              user_nm: null,
              noreg: null,
              phone_no: null
            }
            await this.$store.dispatch("FETCH_USERS")
          } catch (error) {
            console.log(error);
          }
        },
        deleteConf(id) {
          console.log(id);
          Swal.fire({
            title: 'Kamu yakin ingin menghapus data ini?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            if (result.isConfirmed) {
              this.deleteData(id)
            }
          })
        },
        async deleteData(id) {
          try {
            await this.$store.dispatch("DELETE_USER", id)
            // Swal.fire('Berhasil menghapus', '', 'success')
            await this.$store.dispatch("FETCH_USERS")
          } catch (error) {
            Swal.fire('Gagal menghapus', '', 'error')
          }
        }
    },
    mounted() {
      this.$store.dispatch("FETCH_USERS")
    },
    computed: {
        ...mapGetters(["users", "userDetail"]),
    },
}
</script>

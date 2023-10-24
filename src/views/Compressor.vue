<template>
  <div>
    <AppBar />
    <Toaster />
    <v-row style="margin: 3px">
      <v-col cols="12">
        <v-card
          class="mx-auto rounded-lg"
          color="#36393f"
          min-height="350"
          theme="dark"
          variant="flat"
        >
          <v-sheet
            color="#202225"
            class="pa-4 d-flex justify-space-between align-center"
          >
            <div>
              <v-icon icon="mdi-calendar" start></v-icon>
              {{ plants.length }} Plants
            </div>
            <v-btn
              class="text-none text-subtitle-1 rounded-lg"
              color="#5865f2"
              variant="flat"
              @click="addPlantDialog = true"
            >
              Add Plant
            </v-btn>
          </v-sheet>

          <v-alert
            v-if="!plants"
            class="ma-4"
            color="#E8EAF6"
            theme="dark"
            icon="mdi-information-outline"
            border
          >
            <strong>Empty.</strong> You don't have any plants data
          </v-alert>

          <div v-else class="d-flex">
            <v-card
              class="my-5 ml-3"
              color="#2f3136"
              rounded="lg"
              variant="flat"
              max-width="300"
              v-for="plant in plants"
              :key="plant.uuid"
            >
              <v-card-item>
                <div class="py-2">
                  <div class="text-h6">
                    {{ plant.plant_nm }}
                  </div>

                  <div class="font-weight-light text-medium-emphasis">
                    {{ plant?.linesData?.length }} lines
                  </div>
                </div>
              </v-card-item>

              <v-divider></v-divider>

              <div class="pa-4 d-flex align-center">
                <router-link :to="{ path: `/compressor/${plant.uuid}` }">
                  <v-btn class="me-2 text-none" variant="text">
                    Open plant
                  </v-btn>
                </router-link>
                <v-btn
                  @click="deletePlant(plant.uuid)"
                  icon="mdi-delete"
                  variant="text"
                ></v-btn>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-col>

      <!-- add plant dialog -->
      <v-dialog persistent v-model="addPlantDialog" width="auto">
        <v-card
          class="mx-auto rounded-lg"
          color="#fff"
          min-width="500"
          variant="flat"
        >
          <v-sheet
            color="#f5f5f5"
            class="py-1 px-5 d-flex justify-space-between align-center"
          >
            <div>
              <h3>Create plant</h3>
            </div>
            <v-btn
              @click="addPlantDialog = false"
              icon="mdi-close"
              variant="text"
            ></v-btn>
          </v-sheet>

          <div class="w-full mt-5 mb-10 mx-5">
            <div>
              <p class="form-label">Plant name</p>
              <input type="text" v-model="plant_name" class="form-input" />
            </div>
            <div class="mt-4">
              <p class="form-label">Plant map background</p>
              <input type="file" @change="uploadFile" ref="file" />
            </div>
          </div>

          <v-sheet
            class="py-3 px-5 d-flex justify-space-between align-center"
            style="border-top: 1px solid #f3f4f6"
          >
            <div></div>
            <div>
              <v-btn
                class="text-none text-subtitle-1 rounded-lg float-right"
                color="#5865f2"
                variant="flat"
                @click="createPlant"
                :loading="isLoading"
              >
                Create Plant
              </v-btn>
              <v-btn
                class="text-none text-subtitle-1 rounded-lg mr-2 float-right"
                color="#f3f4f6"
                variant="flat"
                @click="addPlantDialog = false"
              >
                Cancel
              </v-btn>
            </div>
          </v-sheet>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
    
<script>
import { mapGetters } from "vuex";
import { toast } from "vue-sonner";
import AppBar from "@/layouts/AppBar.vue";

export default {
  name: "CompressorView",
  components: { AppBar },
  data() {
    return {
      addPlantDialog: false,
      isLoading: false,
      plant_name: "",
      plant_image: null,
    };
  },
  methods: {
    uploadFile() {
      this.plant_image = this.$refs.file.files[0];
    },
    async createPlant() {
      if (!this.plant_name && !this.plant_image) {
        toast.error("Please fill all the required fields");
      } else {
        try {
          const formData = new FormData();
          formData.append("company_id", "3377fee7-53c0-4e48-876e-6071ed1352bb");
          formData.append("plant_nm", this.plant_name);
          formData.append("background", this.plant_image);

          await this.$store.dispatch("ADD_PLANT", formData);
        } catch (error) {
          console.log(error);
        } finally {
          this.addPlantDialog = false;
          this.plant_name = "";
        }
      }
    },
    deletePlant(plantId) {
      toast("Are you sure to delete this plant?", {
        action: {
          label: "Sure",
          onClick: async () =>
            await this.$store.dispatch("DELETE_PLANT", plantId),
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch("FETCH_PLANT");
  },
  computed: {
    ...mapGetters(["plants"]),
  },
};
</script>
  
<style scoped>
.main-area {
  border-radius: 10px;
  width: 100%;
  height: 800px;
  margin: 10px;
  background-color: #eaeaea;
}
</style>

<style>
.form-label {
  color: #6b7280;
  margin-bottom: 6px !important;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}
.form-input {
  background-color: #f9fafb;
  color: #111827;
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  border: 1.8px solid #d1d5db;
  outline: none;
  box-sizing: border-box;
}
.form-input:focus {
  border: 1.8px solid #9ca3af;
}

::placeholder {
  color: #9ca3af;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder {
  /* Edge 12 -18 */
  color: #9ca3af;
}
</style>
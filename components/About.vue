<template>
  <v-container>
	  <v-row>
		  <v-col
			  cols="12"
        align="center"
			>
			  <v-card light color="ghostwhite">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h6">
    					  ทะเบียนพาณิชย์
    					</v-card-title>
              <v-card-text>
    					  <p>
    						  ทะเบียนพาณิชย์เลขที่ 0025559005841
    						</p>
    					  <p>
    					    <v-btn
                    color="primary"
                    dark
                    rounded
                    block
                    @click.stop="dialogTP = true"
                  >
                    ดูภาพทะเบียนแบบเต็ม!
                  </v-btn>
                  <v-dialog
                    v-model="dialogTP"
                    max-width="400"
                  >
                    <v-card light>
                      <v-img
                        src="https://res.cloudinary.com/dzre5cq2d/image/upload/v1658499357/public/tp-test_c7bw5a.jpg"
                        height="auto"
                      ></v-img>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="error"
                          dark
                          @click="dialogTP = false"
                        >
                          ปิด
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
    						</p>
  					  </v-card-text>
            </div>
            <v-avatar
              class="ma-1"
              max-width="180"
              height="auto"
              tile
            >
              <v-img src="`/assets/images/tp-test.jpg"></v-img>
            </v-avatar>
          </div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
  name: 'AboutComponent',

  data () {
    return {
      dialogTP: false
    };
  }
};
</script>

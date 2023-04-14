<template>
  <div>
    <div class="projects-block" v-if="projectsList.length">
      <div class="projects-block-content" v-for="project in projectsList" :key="project.id">
        <div class="project-user">
          <div class="project-user-img">
            <img :src="project.logo_url">
          </div>
          <div class="project-user-name">
            <p @click="openModal(project)">{{ project.name }}</p>
          </div>
        </div>
        <div class="project-condition">
          <p v-if="project.is_active == 1" class="isActive">Active</p>
          <p v-else class="isNotActive">No active</p>
        </div>
        <div class="project-time">
          <div>
            <table>
              <tbody>
                <tr>
                  <td>time this week</td>
                  <td><b>00:00:00</b></td>
                </tr>
                <tr>
                  <td>this month</td> 
                  <td><b>00:00:00</b></td>
                </tr>
                <tr>
                  <td>total</td>
                  <td><b>00:00:00</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <EditModal 
      v-if="showModal"
      v-model="editingName"
      @close="showModal = false"
      @submit="editProject()"
    />
  </div>
</template>

<script>
import EditModal from '../components/EditModal.vue'

export default {
  name: 'Projects',

  components: {
    EditModal,
  },

  data() {
    return {
      editingProjectId: null,
      editingName: '',
      showModal: false
    }
  },

  async asyncData({ req, $axios, nuxtState }) {
    let access = req?.headers?.cookie ? req.headers.cookie : document.cookie
    const cookies = Object.fromEntries(
      `${access}`.split("; ").map((cookie) => cookie.split("="))
    )
    const token = nuxtState?.data?.[0].token || cookies['token']
    const { projects } = await $axios.$get(
        "/projects-manage/index?filters[is_active]=1&sort=dta_create",
        { headers: {"Authorization" : `Bearer ${token}`} }
      )
    return  { token, projectsList: projects || [] }
  },

  methods: {
    openModal(project) {
      this.editingProjectId = project.id
      this.editingName = project.name
      this.showModal = true
    },
    
    async editProject() {
      try {
        const payload = { name: this.editingName }
        await this.$axios.$post(`/projects-manage/update?id=${this.editingProjectId}`, payload, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }).then(() => {
          this.showModal = false
          this.$nuxt.refresh();
        })
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>

<style lang="scss">
.projects-block {
  width: 100%;
  margin: 50px auto;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 7px;
  .projects-block-content {
    display: flex;
    justify-content: space-between;
    .project-user {
      display: flex;
      align-items: center;
      justify-content: center;
      .project-user-img {
        img {
          width: 100%;
          border-radius: 7px;
          display: block;
        }
      }
      .project-user-name {
        p {
          margin-left: 10px;
          font-weight: bold;
          font-size: 18px;
          color: #000;
          cursor: pointer;
        }
      }
    }
    .project-condition {
      display: flex;
      align-items: center;
      justify-content: center;
      .isActive {
        color: #14A800;
        font-weight: bold;
      }
      .isNotActive {
        color: #d9534f;
        font-weight: bold;
      }
    }
    .project-time {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        table {
          font-family: arial, sans-serif;
          color: #000;
          border-collapse: collapse;
          width: 100%;
        }
        td, th {
          text-align: left;
          padding: 8px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .projects-block-content {
    flex-direction: column;
  }
}
</style>
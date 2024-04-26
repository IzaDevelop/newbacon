<template>
  <section>
    <div class="header">
      <h1>Usuários</h1>
      <button @click="toggleCreateForm" :class="showCreateForm ? 'true-button' : 'false-button'">
        {{ showCreateForm ? 'Cancelar' : 'Novo Usuário' }}
      </button>

    </div>
    <div v-if="showCreateForm" class="create-user-form">
      <form @submit.prevent="createUser">
        <div>
          <label for="userName">Nome do Usuário:</label>
          <input type="text" id="userName" placeholder="George Bluth" v-model="newUser.name" required>
        </div>
        <div>
          <label for="userRole">Função do Usuário:</label>
          <select id="userRole" v-model="newUser.role" required>
            <option value="" disabled selected>Selecione a função</option>
            <option value="desenvolvedor">Desenvolvedor</option>
            <option value="gerente">Gerente de Projetos</option>
            <option value="techLead">Tech Lead</option>
            <option value="designer">UI/UX Designer</option>
          </select>
        </div>
        <button type="submit">Salvar dados do usuário</button>
      </form>
    </div>

    <div class="card" v-for="user in users" :key="user.id">
      <div class="card-image">
        <img :src="user.avatar" alt="Avatar">
      </div>
      <div class="card-content">
        <span>#{{ user.id }}</span>
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        <p>{{ user.email }}</p>
      </div>
      <div class="card-icons">
        <button @click="detailUser(user.id)">
          <img src="edit.png" alt="">
        </button>

        <button @click="deleteUser(user.id)">
          <img src="delete.png" alt="">
        </button>

        <button @click="updateUser(user.id)">
          <img src="view.png" alt="">
        </button>
      </div>
    </div>

  </section>
</template>

<script>
import api from '@/service/api';

export default {
  data() {
    return {
      showCreateForm: false,
      users: [],
      newUser: {
        name: '',
        role: ''
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    detailUser(userId) {
      this.$router.push({ name: 'UserDetail', params: { id: userId } });
    },
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;
    },
    cancelCreate() {
      this.showCreateForm = false;
      this.newUser.name = '';
      this.newUser.role = '';
    },
    async fetchData() {
      try {
        const response = await api.get('/api/users/', {
          params: {
            page: 2,
          },
        });
        this.users = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    },
    async deleteUser(userId) {
      try {
        const response = await api.delete(`/api/users/${userId}`);
        console.log('Usuário excluído com sucesso:', response.data);
        this.fetchData();
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
      }
    },
    async updateUser(userId) {
      try {
        const response = await api.put(`/api/users/${userId}`);
        console.log('Usuário atualizado com sucesso:', response.data);
        this.fetchData();
      } catch (error) {
        console.error('Erro ao atualizar o usuário', error)
      }
    },
    async createUser() {
      try {
        const response = await api.post('/api/users', {
          name: this.newUser.name,
          role: this.newUser.role
        });
        console.log('Novo usuário criado com sucesso:', response.data);
        this.newUser.name = '';
        this.newUser.role = '';
        this.fetchData();
      } catch (error) {
        console.error('Erro ao criar novo usuário:', error);
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  width: 100%;
  max-width: 588px;
  margin: 0 auto;
}

.header h1 {
  color: #000;
  font-size: 50px;
  font-weight: 700;
  margin: 0;
}

.false-button {
  padding: 20px 60px;
  background-color: #000;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.true-button {
  padding: 20px 60px;
  background-color: #F7F7F7;
  color: #000;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.create-user-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 588px;
  margin: 0 auto;
}

.create-user-form form {
  width: 100%;
}

.create-user-form label {
  color: #000;
  display: block;
  margin-bottom: 10px;
}

.create-user-form input[type="text"],
.create-user-form select {
  width: 100%;
  padding: 10px;
  border: none;
  border: 1px solid #797979;
  border-radius: 5px;
  background-color: transparent;
  color: #000;
  margin-bottom: 20px;
}

.create-user-form input[type="text"]::placeholder {
  color: #797979;
}

.create-user-form button {
  width: 100%;
  padding: 20px;
  color: #fff;
  background-color: #000;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 400;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 588px;
  height: 120px;
  padding: 20px 60px;
  margin: 20px auto;
  background-color: #F7F7F7;
  border-radius: 5px;
  overflow: hidden;
}

.card-image {
  flex: 0 0 auto;
  margin-right: 20px;
}

.card-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.card-content {
  flex: 1 1 auto;
}

.card-content h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.card-content p {
  font-size: 14px;
  color: #666;
}

.card-icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.card-icons button {
  margin-left: 10px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
}
</style>


<!-- <script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>  -->
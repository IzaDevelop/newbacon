<template>
    <section>
        <div class='user-details' v-if="user">
            <div class='initial-content'>
                <span># {{ user.id }}</span>

                <button @click="userList">
                    Voltar
                </button>
            </div>

            <div class='middle-content'>
                <figure>
                    <img :src="user.avatar" alt="Avatar">
                </figure>
                <div class='data-content'>
                    <div>
                        <p>Primiero nome</p>
                        <span> {{ user.first_name }} </span>
                    </div>
                    <div>
                        <p>Último nome</p>
                        <span>{{ user.last_name }}</span>
                    </div>
                </div>
            </div>

            <div class='final-content'>
                <div>
                    <p>Endereço de e-mail</p>
                    <span>{{ user.email }}</span>
                </div>

                <div>
                    <p>Link do avatar</p>
                    <span>{{ user.avatar }}</span>
                </div>

                <div>
                    <p>Link de suporte</p>
                    <span>{{ support.url }}</span>
                </div>

                <div>
                    <p>Descrição do usuário</p>
                    <span>{{ support.text }}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import api from '@/service/api';

export default {
    data() {
        return {
            user: null,
            support: null,
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        userList() {
            this.$router.push('/');
        },
        async fetchUser() {
            const userId = this.$route.params.id;

            try {
                const response = await api.get(`/api/users/${userId}`);
                this.user = response.data.data;
                this.support = response.data.support;
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    }
};
</script>

<style scoped>
.user-details {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    width: 100%;
    max-width: 588px;
    margin: auto;
    height: 100vh;
}

.user-details .initial-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 20px;
}

.user-details .initial-content span {
    color: #000;
    font-size: 50px;
    font-weight: 700;
    margin: 0;
}

.user-details .initial-content button {
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

.middle-content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    padding-bottom: 20px;
}

.middle-content img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
}

.middle-content .data-content {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.middle-content div p,
.final-content div p {
    font-size: 18px;
    color: #797979;
    padding-bottom: 10px ;
}

.middle-content div span,
.final-content div span {
    font-size: 18px;
    font-weight: 600;
}

.final-content div {
    padding-bottom: 20px;
}

@media screen and (max-width: 425px) {
    .user-details .initial-content span {
        font-size: 28px;
    }
    
    .user-details .initial-content button {
        font-size: 12px;
    }
    
    .middle-content img {
        width: 80px;
        height: 80px;
    }
    
    .middle-content div p,
    .final-content div p,
    .middle-content div span,
    .final-content div span {
        font-size: 14px;
        padding-bottom: 5px ;
    }
}
</style>
export default {
    template: `
    <div class="modal" v-if="show">
        <div class="modal-content">
            <h3>Entrenadores seleccionados:</h3>
            <ul>
                <li v-for="cancha in selectedCanchas" :key="cancha.id">{{ cancha.nombre }}</li>
            </ul>
            <button class="btnwar" @click="initiateCombat" :disabled="selectedCanchas.length !== 2">Iniciar Combate</button>
        </div>
    </div>
    `,
    props: {
        show: {
            type: Boolean,
            required: true
        },
        selectedCanchas: {
            type: Array,
            required: true
        }
    },
    methods: {
        initiateCombat() {
            if (this.selectedCanchas.length === 2) {
                this.$emit('initiateCombat');
            }
        }
    },
    name: 'Modal'
}

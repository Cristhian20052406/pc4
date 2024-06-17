export default {
    template: `
    <div class="modal" v-if="show">
        <div class="modal-content">
            <h3>¡Combate en curso!</h3>
            <div class="combatinfo">
            <div class="e1">
            <img class="ent" :src="selectedCanchas[0].foto">
            <p>{{ selectedCanchas[0].nombre }}</p>
            </div>
            <div class="e2">
            <img class="ent" :src="selectedCanchas[1].foto">
            <p>{{ selectedCanchas[1].nombre }}</p>
            </div>
            </div>
            <button  class="btnwar" @click="closeCombat">Cerrar Combate</button>
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
        closeCombat() {
            this.$emit('closeCombat');
        }
    },
    name: 'CombatModal'
}

export default {
    template: `
    <main>
        <h1>Entrenadores</h1>
        <div class="listCanchas">
            <ul v-if="iscanchas">
                <li class="lipr" v-for="cancha in canchasWithVisibility" :key="cancha.id">
                    <i></i>
                    <div class="info">
                        <img class="fen" :src="cancha.foto" :alt="cancha.foto">  
                        <div class="ord-info">
                            <section class="cont-id">  
                                <span class="id-en">{{ cancha.id }}</span> 
                            </section>   
                            <span>{{ cancha.nombre }}</span>
                        </div>
                    </div>
                    <div class="contebtn">
                        <button class="poke-button" @click="togglePokemons(cancha.id)">
                            <img src="imagenes/pokebola.png" alt="Pokebola" class="imgbtn poke-button-image">
                            <span class="poke-button-text">{{ cancha.showPokemons ? 'Ocultar Pokémon' : 'Mostrar Pokémon' }}</span>
                        </button>
                        <button class="add-combat-button" @click="selectForCombat(cancha.id)">
                             <img src="imagenes/combate.png" alt="Pokebola" class="imgbtn poke-button-image">
                             <span class="poke-button-text">{{ isSelected(cancha.id) ? 'Quitar de combate' : 'Añadir a combate' }}</span>
                        </button>
                    </div>
                    <ul class="showpoke" v-if="cancha.showPokemons">
                        <li class="cardpoke" v-for="pokemon in cancha.pokemons" :key="pokemon.nombre">
                            <img class="pokimg" :src="pokemon.foto" :alt="pokemon.nombre">
                            <div class="infopk">
                                <span class="nompoke">Nombre: {{ pokemon.nombre }}</span>
                                <span class="nompoke">Tipo: {{ pokemon.tipo }}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <p v-else="iscanchas" class="notCanchas">
                No hay canchas
            </p>
        </div>
    </main>
    `,
    props: {
        canchas: {
            type: Array,
            required: true
        },
        iscanchas: {
            type: Boolean,
            required: true
        },
        selectedCanchas: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            canchasWithVisibility: []
        };
    },
    watch: {
        canchas: {
            immediate: true,
            handler(newCanchas) {
                this.canchasWithVisibility = newCanchas.map(cancha => ({ ...cancha, showPokemons: false }));
            }
        }
    },
    methods: {
        togglePokemons(id) {
            const cancha = this.canchasWithVisibility.find(cancha => cancha.id === id);
            if (cancha) {
                cancha.showPokemons = !cancha.showPokemons;
            }
        },
        selectForCombat(canchaId) {
            this.$emit("selectforcombat", canchaId);
        },
        isSelected(canchaId) {
            return this.selectedCanchas.some(cancha => cancha.id === canchaId);
        }
    },
    name: 'Cancha',
}

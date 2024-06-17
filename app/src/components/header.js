export default {    
    template: 
        `
        <header>
            <img class="logo" src="imagenes/pokemon.png">
            <div class="right">            
                <p>Hola {{ nombre }} {{ apellido }}</p>
                <div class="menu">
                    <i></i>
                </div>
            </div>
        </header>
        `,
    props: {
        nombre: {
            type: String,
            requerid: true
        },
        apellido: {
            type: String,
            requerid: true
        },
        canchas: {
            type: Array,
            requerid: true
        },
        isselecciona: {
            type: Boolean,
            requerid: true
        }
    },
    methods: {
        clickHanderdl(id) {
            this.$emit("clickcancharemove", id);
        }
    },
    name: 'Header',
}
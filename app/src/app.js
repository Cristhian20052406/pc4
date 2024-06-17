import Header from '../src/components/header.js';
import Cancha from '../src/components/cancha.js';
import Modal from '../src/components/modal.js';
import CombatModal from '../src/components/combatModal.js';
import Servicios from './services/api.js';

var app = new Vue({
    el: '#app',
    data: {
        myNombre: 'Cristhian',
        myApellido: 'Paquirachin',
        isCanchas: true,
        myCanchas: [],
        myCanchasSeleccionadas: [],
        isSelecciona: false,
        selectedCanchas: [],
        showModal: false,
        showCombatModal: false
    },
    components: {
        Cancha,
        Header,
        Modal,
        CombatModal
    },
    methods: {
        initMenssage: function () {
            console.log("Bienvenidos a la clase 2 de Vue.js");
        },
        async fetchData () {
            const apiurl = 'app/json/chanchas.json';  
            const servicio = new Servicios();            
            servicio.fetchData((error, response) => {
                if (error) {
                    console.error('Error al obtener canchas:', error);
                } else {
                    this.myCanchas = response;
                    this.isCanchas = (this.myCanchas.length > 0) ? true : false; 
                }
            });
        },
        handerdlCancha: function(id) {            
            this.myCanchas.forEach(cancha => {
                if (cancha.id == id) {
                    let valida = true;
                    this.myCanchasSeleccionadas.forEach(cc => {
                        if (cc.id == id) {
                            valida = false;
                        }
                    });
                    if (valida) {
                        this.myCanchasSeleccionadas.push(cancha); 
                    }                   
                }
            });
            this.isSelecciona = true;
        },
        handerlRemoveCancha: function(id) {
            this.myCanchasSeleccionadas.forEach((item, index) => {
                if (item.id === id) {
                    this.myCanchasSeleccionadas.splice(index, 1);
                }
            });            
            if (this.myCanchasSeleccionadas.length == 0) {
                this.isSelecciona = false;  
            }            
        },
        handleSelectForCombat(canchaId) {
            const selectedCancha = this.myCanchas.find(cancha => cancha.id === canchaId);

            if (this.selectedCanchas.some(cancha => cancha.id === canchaId)) {
                this.selectedCanchas = this.selectedCanchas.filter(cancha => cancha.id !== canchaId);
            } else {
                if (this.selectedCanchas.length < 2) {
                    this.selectedCanchas.push(selectedCancha);
                }
            }
            this.showModal = this.selectedCanchas.length > 0;
        },
        initiateCombat() {
            if (this.selectedCanchas.length === 2) {
                console.log('Iniciando combate entre:', this.selectedCanchas);
                this.showModal = false;
                this.showCombatModal = true;
            } else {
                alert('Selecciona exactamente dos entrenadores para iniciar el combate');
            }
        },
        closeCombat() {
            this.showCombatModal = false;
            this.selectedCanchas = [];
        }
    },
    mounted() {
        this.fetchData();       
        this.initMenssage();
    },
    template: `
        <div>
            <Header :nombre="myNombre" :apellido="myApellido" :isselecciona="isSelecciona" :canchas="myCanchasSeleccionadas" @clickcancharemove="handerlRemoveCancha"/>
            <Cancha :canchas="myCanchas" :iscanchas="isCanchas" :selectedCanchas="selectedCanchas" @selectforcombat="handleSelectForCombat" />
            <Modal :show="showModal" :selectedCanchas="selectedCanchas" @initiateCombat="initiateCombat"/>
            <CombatModal :show="showCombatModal" :selectedCanchas="selectedCanchas" @closeCombat="closeCombat"/>
        </div>
    `
});

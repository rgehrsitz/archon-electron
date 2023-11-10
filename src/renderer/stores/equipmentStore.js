import { defineStore } from 'pinia';
import { Equipment } from '../models/equipment';

export const useEquipmentStore = defineStore({
    id: 'equipment',
    state: () => ({
        rootEquipment: null,
    }),
    actions: {
        setRootEquipment (equipment) {
            this.rootEquipment = equipment;
        },
    },
});

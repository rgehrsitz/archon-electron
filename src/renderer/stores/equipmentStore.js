import { defineStore } from 'pinia';

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

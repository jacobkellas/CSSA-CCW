import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { WeaponInfoType } from '@shared-utils/types/defaultTypes';

export const useWeaponsStore = defineStore('weapons', () => {
  const weapons = ref([] as Array<WeaponInfoType>);
  const getWeapons = computed(() => weapons.value);

  function setWeapons(payload) {
    weapons.value = payload;
  }

  function addWeapons(weapon: WeaponInfoType) {
    weapons.value.unshift(weapon);
  }

  function updateWeapons(weapon: WeaponInfoType) {
    const index = weapons.value.indexOf(weapon);
    weapons.value.splice(index, 1, weapon);
  }

  function deleteWeapons(weapon: WeaponInfoType) {
    const index = weapons.value.indexOf(weapon);
    weapons.value.splice(index, 1);
  }

  return {
    weapons,
    getWeapons,
    addWeapons,
    setWeapons,
    updateWeapons,
    deleteWeapons,
  };
});

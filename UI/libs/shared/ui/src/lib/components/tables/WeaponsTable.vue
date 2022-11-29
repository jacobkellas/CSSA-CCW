<template>
  <v-container fluid>
    <v-simple-table class="text-left my-3">
      <template #default>
        <thead>
          <tr>
            <th>
              {{ $t('Make') }}
            </th>
            <th>
              {{ $t('Model') }}
            </th>
            <th>
              {{ $t('Caliper') }}
            </th>
            <th>
              {{ $t('Serial Number') }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(weapon, index) in weapons"
            :key="index"
          >
            <td>
              {{ weapon.make }}
            </td>
            <td>
              {{ weapon.model }}
            </td>
            <td>
              {{ weapon.caliber }}
            </td>
            <td>
              {{ weapon.serialNumber }}
            </td>
            <td>
              <v-btn
                text
                color="error"
                @click="handleDelete(index)"
              >
                <v-icon color="error"> mdi-close-circle </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script setup lang="ts">
import { WeaponInfoType } from '@shared-utils/types/defaultTypes';

interface IWeaponTableProps {
  weapons: Array<WeaponInfoType>;
}

const emit = defineEmits(['delete']);

const props = defineProps<IWeaponTableProps>();

function handleDelete(index) {
  emit('delete', index);
}
</script>

<template>
  <div>
    <v-dialog v-model="state.dialog">
      <template #activator="{ on, attrs }">
        <v-btn
          id="add-weapon-btn"
          color="primary my-5"
          v-bind="attrs"
          v-on="on"
        >
          {{ $t('Add Weapon') }}
        </v-btn>
      </template>
      <div class="weapon-container">
        <v-form
          ref="form"
          v-model="state.valid"
          class="form-container"
        >
          <v-row>
            <v-col>
              <TextInput
                :label="'Make'"
                :target="'make'"
                :rule="[v => !!v || 'Make is required']"
                @input="
                  (v, t) => {
                    handleInput(v, t);
                  }
                "
              />
            </v-col>
            <v-col>
              <TextInput
                :label="'Model'"
                :target="'model'"
                :rule="[v => !!v || 'Model is required']"
                @input="
                  (v, t) => {
                    handleInput(v, t);
                  }
                "
              />
            </v-col>
            <v-col>
              <TextInput
                :label="'Caliber'"
                :target="'caliber'"
                :rule="[v => !!v || 'Caliber is required']"
                @input="
                  (v, t) => {
                    handleInput(v, t);
                  }
                "
              />
            </v-col>
            <v-col>
              <TextInput
                :label="'Serial number'"
                :target="'serialNumber'"
                :rule="[v => !!v || 'Serial number is required']"
                @input="
                  (v, t) => {
                    handleInput(v, t);
                  }
                "
              />
            </v-col>
          </v-row>
        </v-form>
        <v-divider />
        <div class="btn-container">
          <v-btn
            id="submit-btn"
            color="primary"
            @click="handleSubmit"
            class="mr-2"
            :disabled="!state.valid"
          >
            {{ $t('Submit') }}
          </v-btn>
          <v-btn
            color="error"
            @click="state.dialog = false"
          >
            {{ $t('Close') }}
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { WeaponInfoType } from '@shared-ui/types/defaultTypes';
import TextInput from '@shared-ui/components/inputs/TextInput.vue';

interface IWeaponsDialogProps {
  saveWeapon: (weapon) => void;
}

const props = defineProps<IWeaponsDialogProps>();

const state = reactive({
  weapon: {} as WeaponInfoType,
  dialog: false,
  valid: false,
});

function handleInput(value, target) {
  switch (target) {
    case 'make':
      state.weapon.make = value;
      break;
    case 'model':
      state.weapon.model = value;
      break;
    case 'caliber':
      state.weapon.caliber = value;
      break;
    case 'serialNumber':
      state.weapon.serialNumber = value;
      break;
    default:
      return;
  }
}
function handleSubmit() {
  props.saveWeapon(state.weapon);
  state.dialog = false;
}
</script>

<style lang="scss" scoped>
.weapon-container {
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  height: 50vh;
  width: 90%;
  justify-content: center;
  align-items: center;
  background: aliceblue;
  border-radius: 12px;
}
.btn-container {
  display: flex;
  width: 75%;
  justify-content: flex-end;
  margin-top: 1rem;
}
.form-container {
  width: 90%;
  margin-bottom: 1rem;
}
</style>
